import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAnalyticsTracker, type AnalyticsTracker } from '../src/analytics/track';

const ENDPOINT = 'https://example.test/collectEvents';
const collected: Array<{ version: number; events: Array<Record<string, unknown>> }> = [];
let tracker: AnalyticsTracker | undefined;
let memory: Map<string, string>;
let sendBeacon: ReturnType<typeof vi.fn>;
let sendFetch: ReturnType<typeof vi.fn>;
let bytes = 1;

async function settle(): Promise<void> {
  for (let i = 0; i < 12; i++) await Promise.resolve();
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
  vi.setSystemTime(new Date('2026-10-30T12:00:00Z'));
  collected.length = 0;
  memory = new Map();
  bytes = 1;
  const store = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => { memory.set(key, value); },
  };
  sendBeacon = vi.fn(() => false);
  sendFetch = vi.fn(async (_endpoint: string, options: { body: string }) => {
    collected.push(JSON.parse(options.body) as typeof collected[number]);
    return { ok: true };
  });
  const fakeCrypto = {
    getRandomValues: (array: Uint8Array) => { array.fill(bytes); return array; },
    subtle: {
      digest: async (_algorithm: string, data: Uint8Array) => {
        const sum = data.reduce((acc, value) => (acc * 31 + value) >>> 0, 1);
        const result = new Uint8Array(32);
        for (let i = 0; i < result.length; i++) result[i] = (sum >>> ((i % 4) * 8)) & 255;
        return result.buffer;
      },
    },
  };
  vi.stubGlobal('crypto', fakeCrypto);
  vi.stubGlobal('localStorage', store);
  vi.stubGlobal('navigator', { sendBeacon });
  vi.stubGlobal('fetch', sendFetch);
});

afterEach(() => {
  tracker?.dispose();
  tracker = undefined;
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('analityka prywatnościowa', () => {
  it('buforuje zdarzenia i wysyła paczkę dopiero przy limicie', async () => {
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, batchSize: 3 });
    tracker.track('run_start', { mode: 'ranked', home: 'BE' });
    tracker.track('league_open');
    expect(sendFetch).not.toHaveBeenCalled();
    tracker.track('install_prompt');
    await settle();
    expect(sendFetch).toHaveBeenCalledTimes(1);
    expect(collected[0].events.map((e) => e.event)).toEqual(['run_start', 'league_open', 'install_prompt']);
  });

  it('używa sendBeacon i nie wykonuje wtedy fetch', async () => {
    sendBeacon.mockReturnValue(true);
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, batchSize: 1 });
    tracker.track('share_click', { format: 'native' });
    await settle();
    expect(sendBeacon).toHaveBeenCalledOnce();
    expect(sendFetch).not.toHaveBeenCalled();
    const blob = sendBeacon.mock.calls[0][1] as Blob;
    expect(blob.type).toBe('text/plain;charset=utf-8');
    expect(JSON.parse(await blob.text())).toEqual({
      version: 1, events: [{ event: 'share_click', props: { format: 'native' } }],
    });
  });

  it('wysyła wyłącznie pola z allowlisty; nie przekazuje e-maili, ID ani URL', async () => {
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, batchSize: 20 });
    const startWithExtra = { mode: 'cozy' as const, home: 'DE' as const, email: 'abc@example.com', uid: '42' };
    const clickWithExtra = { placement: 'result' as const, home: 'DE' as const, url: 'https://private.example' };
    tracker.track('run_start', startWithExtra);
    tracker.track('portal_click', clickWithExtra);
    tracker.track('run_end', { km: 123, seconds: 23.7, cause: 'truck', mode: 'cozy', home: 'DE' });
    tracker.track('share_click', { format: 'image' });
    await tracker.flush();
    const body = JSON.stringify(collected);
    expect(body).not.toContain('abc@example.com');
    expect(body).not.toContain('private.example');
    expect(body).not.toContain('uid');
    expect(body).not.toContain('installId');
    expect(collected[0].events).toHaveLength(4);
  });

  it('odrzuca nieprawidłowe metryki i nieznane wartości', async () => {
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT });
    tracker.track('run_end', { km: Infinity, seconds: 10, cause: 'truck', mode: 'cozy', home: 'NL' });
    tracker.track('run_start', { mode: 'ranked', home: 'XX' as 'BE' });
    tracker.track('run_end', { km: 10, seconds: 12, cause: 'arrived', mode: 'ranked', home: 'BE' });
    await tracker.flush();
    expect(collected[0].events).toHaveLength(1);
    expect(collected[0].events[0].event).toBe('run_end');
  });

  it('próbkuje stabilnie na poziomie instalacji, a rate=0 całkowicie wyłącza pomiar', async () => {
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, sampleRate: 0 });
    tracker.track('league_open');
    await tracker.flush();
    expect(sendFetch).not.toHaveBeenCalled();
    tracker.dispose();
    bytes = 255;
    memory.clear();
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, sampleRate: 0.5 });
    tracker.track('league_open');
    await tracker.flush();
    expect(sendFetch).not.toHaveBeenCalled();
    tracker.dispose();
    bytes = 1;
    memory.clear();
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT, sampleRate: 0.5 });
    tracker.track('league_open');
    await tracker.flush();
    expect(sendFetch).toHaveBeenCalledTimes(1);
  });

  it('liczy D0, D1 i D7 lokalnie raz dziennie, bez wysyłania skrótu', async () => {
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT });
    tracker.track('app_open');
    tracker.track('app_open');
    await settle();
    await tracker.flush();
    expect(collected[0].events).toEqual([
      { event: 'app_open', retention: 'new' },
      { event: 'app_open' },
    ]);
    expect(memory.get('ce.analytics.install.v1')).toContain('lastDayHash');
    tracker.dispose();

    vi.setSystemTime(new Date('2026-10-31T12:00:00Z'));
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT });
    tracker.track('app_open');
    await settle();
    await tracker.flush();
    expect(collected[1].events).toEqual([{ event: 'app_open', retention: 'd1' }]);
    tracker.dispose();

    vi.setSystemTime(new Date('2026-11-06T12:00:00Z'));
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT });
    tracker.track('app_open');
    await settle();
    await tracker.flush();
    expect(collected[2].events).toEqual([{ event: 'app_open', retention: 'd7' }]);
    expect(JSON.stringify(collected)).not.toContain('lastDayHash');
    expect(JSON.stringify(collected)).not.toContain('id');
  });

  it('zachowuje bufor po błędzie fetch i ponawia wysyłkę', async () => {
    sendFetch.mockRejectedValueOnce(new Error('offline'));
    tracker = createAnalyticsTracker({ endpoint: ENDPOINT });
    tracker.track('portal_click', { placement: 'menu', home: 'FR' });
    await tracker.flush();
    expect(sendFetch).toHaveBeenCalledTimes(1);
    await tracker.flush();
    expect(sendFetch).toHaveBeenCalledTimes(2);
    expect(collected[0].events).toEqual([{ event: 'portal_click', props: { placement: 'menu', home: 'FR' } }]);
  });

  it('odrzuca błędne próbkowanie i niebezpieczny adres HTTP', () => {
    expect(() => createAnalyticsTracker({ endpoint: ENDPOINT, sampleRate: 2 })).toThrow();
    expect(() => createAnalyticsTracker({ endpoint: 'http://example.com/collect' })).toThrow();
  });
});
