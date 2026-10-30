import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { createPlaceholderIcon } from '../scripts/pwa-plugin';

const scope = 'https://game.example.test/play/';
const workerSource = readFileSync(new URL('../src/pwa/sw.js', import.meta.url), 'utf8');

interface TestResponse {
  ok: boolean;
  type: string;
  text: () => Promise<string>;
  clone: () => TestResponse;
}

function reply(text: string): TestResponse {
  return { ok: true, type: 'basic', text: async () => text, clone: () => reply(text) };
}

function makeWorker() {
  const handlers = new Map<string, (event: never) => void>();
  const buckets = new Map<string, Map<string, TestResponse>>();
  const requests: string[] = [];
  let online = true;
  let html = '<html>pierwsza wersja</html>';
  let skipWaiting = false;
  let claimed = false;

  const key = (request: string | { url: string }, ignoreSearch = false): string => {
    const value = typeof request === 'string' ? request : request.url;
    const url = new URL(value);
    if (ignoreSearch) url.search = '';
    return url.href;
  };
  const fetchMock = async (request: string | { url: string }): Promise<TestResponse> => {
    const url = key(request);
    requests.push(url);
    if (!online) throw new Error('Brak sieci');
    return reply((new URL(url).pathname.endsWith('index.html') || new URL(url).pathname.endsWith('/play/')) ? html : `dane:${url}`);
  };
  const cachesMock = {
    async keys(): Promise<string[]> { return [...buckets.keys()]; },
    async delete(name: string): Promise<boolean> { return buckets.delete(name); },
    async open(name: string) {
      if (!buckets.has(name)) buckets.set(name, new Map());
      const bucket = buckets.get(name)!;
      return {
        async addAll(items: Array<{ url: string }>) {
          const results = await Promise.all(items.map(async (item) => [key(item), await fetchMock(item)] as const));
          for (const [url, response] of results) bucket.set(url, response);
        },
        async match(request: string | { url: string }, options?: { ignoreSearch?: boolean }) {
          const normalized = key(request, options?.ignoreSearch);
          if (!options?.ignoreSearch) return bucket.get(normalized);
          return [...bucket].find(([name]) => key(name, true) === normalized)?.[1];
        },
        async put(request: string | { url: string }, response: TestResponse) { bucket.set(key(request), response); },
        async keys() { return [...bucket.keys()].map((url) => ({ url })); },
        async delete(request: { url: string }) { return bucket.delete(key(request)); },
      };
    },
  };

  const source = workerSource
    .replace('__CE_BUILD_VERSION__', 'test-v2')
    .replace('__CE_PRECACHE_LIST__', JSON.stringify(['index.html', 'assets/main-a.js', 'manifest.webmanifest']));
  runInNewContext(source, {
    self: {
      registration: { scope },
      location: { origin: new URL(scope).origin },
      addEventListener: (type: string, fn: (event: never) => void) => handlers.set(type, fn),
      skipWaiting: async () => { skipWaiting = true; },
      clients: { claim: async () => { claimed = true; } },
    },
    caches: cachesMock,
    fetch: fetchMock,
    URL, Request, Response, console,
  });

  const lifecycle = async (type: string): Promise<void> => {
    let wait: Promise<unknown> | undefined;
    handlers.get(type)!({ waitUntil: (promise: Promise<unknown>) => { wait = promise; } } as never);
    await wait;
  };
  const serve = async (url: string, mode: 'navigate' | 'cors' = 'cors'): Promise<TestResponse | undefined> => {
    let response: Promise<TestResponse> | undefined;
    handlers.get('fetch')!({
      request: { url, method: 'GET', mode },
      respondWith(promise: Promise<TestResponse>) { response = promise; },
    } as never);
    return response;
  };

  return {
    lifecycle, serve, caches: cachesMock, buckets, requests,
    setOnline(value: boolean) { online = value; },
    setHtml(value: string) { html = value; },
    wasActivated() { return skipWaiting && claimed; },
  };
}

describe('PWA: manifest i ikony', () => {
  it('ma nazwę, identyfikator, portret i kolory gry', () => {
    const manifest = JSON.parse(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'));
    expect(manifest.name).toBe('Cebulak Express');
    expect(manifest.display).toBe('fullscreen');
    expect(manifest.orientation).toBe('portrait');
    expect(manifest.start_url).toBe('./');
    expect(manifest.scope).toBe('./');
    expect(manifest.theme_color).toBe('#1b2733');
    expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(['192x192', '1024x1024', '512x512']);
  });

  it('generuje poprawne PNG o zadanych wymiarach', () => {
    const icon = createPlaceholderIcon(192);
    expect(icon.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
    expect(icon.readUInt32BE(16)).toBe(192);
    expect(icon.readUInt32BE(20)).toBe(192);
  });
});

describe('PWA: service worker', () => {
  it('uruchamia grę bez internetu po zakończonej pierwszej instalacji', async () => {
    const sw = makeWorker();
    await sw.lifecycle('install');
    sw.setOnline(false);
    const html = await sw.serve(`${scope}?kraj=be`, 'navigate');
    expect(await html?.text()).toContain('pierwsza wersja');
    const js = await sw.serve(`${scope}assets/main-a.js`);
    expect(await js?.text()).toContain('main-a.js');
  });

  it('preferuje aktualny HTML online, a pliki statyczne zachowuje cache-first', async () => {
    const sw = makeWorker();
    await sw.lifecycle('install');
    sw.setHtml('<html>nowsza wersja</html>');
    expect(await (await sw.serve(scope, 'navigate'))?.text()).toContain('nowsza wersja');
    sw.setOnline(false);
    expect(await (await sw.serve(`${scope}assets/main-a.js`))?.text()).toContain('main-a.js');
  });

  it('zapisuje dynamiczne assety do cache i nie przechwytuje API/Firebase', async () => {
    const sw = makeWorker();
    await sw.lifecycle('install');
    await sw.serve(`${scope}assets/new-background.png`);
    sw.setOnline(false);
    expect(await (await sw.serve(`${scope}assets/new-background.png`))?.text()).toContain('new-background.png');
    expect(await sw.serve(`${scope}api/ranking`)).toBeUndefined();
    expect(await sw.serve(`${scope}__/auth/handler`)).toBeUndefined();
    expect(await sw.serve('https://firestore.googleapis.com/v1/projects/xyz')).toBeUndefined();
    expect(sw.requests.some((request) => request.includes('firestore.googleapis.com'))).toBe(false);
  });

  it('czyści stare cache własnego scope i przejmuje kontrolę', async () => {
    const sw = makeWorker();
    await sw.caches.open(`ce-pwa:${scope}:shell-test-v1`);
    await sw.caches.open('inny-projekt');
    await sw.lifecycle('install');
    await sw.lifecycle('activate');
    const names = await sw.caches.keys();
    expect(names).not.toContain(`ce-pwa:${scope}:shell-test-v1`);
    expect(names).toContain(`ce-pwa:${scope}:shell-test-v2`);
    expect(names).toContain('inny-projekt');
    expect(sw.wasActivated()).toBe(true);
  });
});
