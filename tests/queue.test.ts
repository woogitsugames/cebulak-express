import { describe, expect, it } from 'vitest';
import { MAX_PENDING_RUNS, OfflineRunQueue, submitOrQueue } from '../src/net/queue';
import type { SubmitRunRequest } from '../src/net/api';

const item = (i: number): SubmitRunRequest => ({
  runId: `run-${i}`, flapTicks: [0, 16, 32], ticks: 100, km: 20 + i, nickId: 'bocian-z-gandawy',
});
function memoryStore() {
  const items = new Map<string, string>();
  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => { items.set(key, value); },
  };
}
describe('kolejka wyników offline', () => {
  it('zapisuje i odtwarza FIFO, bez duplikatów, maksymalnie 20 pozycji', () => {
    const storage = memoryStore();
    const queue = new OfflineRunQueue({ storage });
    for (let i = 1; i <= 25; i++) queue.enqueue(item(i));
    queue.enqueue(item(25));
    expect(queue.length).toBe(MAX_PENDING_RUNS);
    const restored = new OfflineRunQueue({ storage });
    expect(restored.pending.map((run) => run.runId)).toEqual(Array.from({ length: 20 }, (_, i) => `run-${i + 6}`));
    const copy = restored.pending;
    copy[0].flapTicks[0] = 90;
    expect(restored.pending[0].flapTicks[0]).toBe(0);
  });
  it('przeżywa niedostępny localStorage i uszkodzony zapis', () => {
    const broken = {
      getItem: () => { throw new Error('SecurityError'); },
      setItem: () => { throw new Error('QuotaExceededError'); },
    };
    const queue = new OfflineRunQueue({ storage: broken });
    expect(() => queue.enqueue(item(1))).not.toThrow();
    expect(queue.length).toBe(1);
    const invalid = { getItem: () => '{oops', setItem: () => {} };
    expect(new OfflineRunQueue({ storage: invalid }).length).toBe(0);
  });
  it('zatrzymuje się na awarii i ponawia później, usuwając duplicate i expired', async () => {
    const queue = new OfflineRunQueue({ storage: null });
    queue.enqueue(item(1)); queue.enqueue(item(2)); queue.enqueue(item(3));
    const down = { submitRun: async () => { throw new Error('offline'); } };
    expect(await queue.flush(down)).toEqual({ sent: 0, discarded: 0, pending: 3 });
    const calls: string[] = [];
    const api = { submitRun: async (run: SubmitRunRequest) => {
      calls.push(run.runId);
      if (run.runId === 'run-1') return { accepted: false, reason: 'duplicate' as const, week: '2026-W44', km: 20 };
      if (run.runId === 'run-2') return { accepted: false, reason: 'expired' as const, week: '2026-W44', km: 21 };
      return { accepted: true, week: '2026-W44', km: 22 };
    } };
    expect(await queue.flush(api)).toEqual({ sent: 2, discarded: 1, pending: 0 });
    expect(calls).toEqual(['run-1', 'run-2', 'run-3']);
  });
  it('przy rate_limited zachowuje zgłoszenie i zgłasza po kolejnym flush', async () => {
    const queue = new OfflineRunQueue({ storage: null });
    queue.enqueue(item(1));
    const rateLimited = { submitRun: async () => ({ accepted: false, reason: 'rate_limited' as const, km: 20, week: '2026-W44' }) };
    expect((await queue.flush(rateLimited)).pending).toBe(1);
    const ok = { submitRun: async () => ({ accepted: true, km: 20, week: '2026-W44' }) };
    const [a, b] = await Promise.all([queue.flush(ok), queue.flush(ok)]);
    expect(a).toEqual({ sent: 1, discarded: 0, pending: 0 });
    expect(b).toEqual(a);
  });
  it('submitOrQueue nie gubi wyniku przy błędzie sieci', async () => {
    const queue = new OfflineRunQueue({ storage: null });
    const down = { submitRun: async () => { throw new Error('offline'); } };
    expect((await submitOrQueue(down, queue, item(4))).status).toBe('queued');
    expect(queue.pending[0].runId).toBe('run-4');
  });
});
