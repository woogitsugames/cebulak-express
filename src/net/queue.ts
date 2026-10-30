import type { RankingApi, SubmitRunRequest, SubmitRunResponse } from './api';
const STORAGE_KEY = 'ce.ranking.pending.v1';
export const MAX_PENDING_RUNS = 20;
const MAX_STORAGE_LENGTH = 1_000_000;
type Store = Pick<Storage, 'getItem' | 'setItem'>;
export interface QueueFlushResult { sent: number; discarded: number; pending: number }
export type DispatchResult =
  | { status: 'accepted'; response: SubmitRunResponse }
  | { status: 'queued' }
  | { status: 'rejected'; response: SubmitRunResponse };

function defaultStorage(): Store | null {
  try { return typeof localStorage === 'undefined' ? null : localStorage; }
  catch { return null; }
}
function validRequest(value: unknown): value is SubmitRunRequest {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SubmitRunRequest>;
  return typeof item.runId === 'string' && item.runId.length > 0 && item.runId.length <= 128 &&
    typeof item.nickId === 'string' && /^[a-z0-9-]{3,40}$/.test(item.nickId) &&
    Number.isSafeInteger(item.ticks) && (item.ticks ?? 0) > 0 &&
    Number.isSafeInteger(item.km) && (item.km ?? -1) >= 0 &&
    Array.isArray(item.flapTicks) && item.flapTicks.length <= 12_000 &&
    item.flapTicks.every((tick) => Number.isSafeInteger(tick) && tick >= 0);
}
function clone(request: SubmitRunRequest): SubmitRunRequest {
  return { ...request, flapTicks: [...request.flapTicks] };
}
/** FIFO z localStorage; wyjątki SecurityError/QuotaExceededError nie blokują gry. */
export class OfflineRunQueue {
  private readonly store: Store | null;
  private readonly key: string;
  private items: SubmitRunRequest[] = [];
  private inFlight?: Promise<QueueFlushResult>;
  constructor(options: { storage?: Store | null; key?: string } = {}) {
    this.store = options.storage === undefined ? defaultStorage() : options.storage;
    this.key = options.key ?? STORAGE_KEY;
    try {
      const raw = this.store?.getItem(this.key);
      if (raw && raw.length <= MAX_STORAGE_LENGTH) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.items = parsed.filter(validRequest).slice(-MAX_PENDING_RUNS).map(clone);
        }
      }
    } catch { /* Pamięć niedostępna albo uszkodzona: kolejka w RAM. */ }
  }
  get length(): number { return this.items.length; }
  get pending(): SubmitRunRequest[] { return this.items.map(clone); }
  enqueue(request: SubmitRunRequest): void {
    if (!validRequest(request)) throw new TypeError('Niepoprawne zgłoszenie wyniku');
    if (this.items.some((item) => item.runId === request.runId)) return;
    this.items.push(clone(request));
    if (this.items.length > MAX_PENDING_RUNS) this.items.shift();
    this.save();
  }
  private save(): void {
    try { this.store?.setItem(this.key, JSON.stringify(this.items)); }
    catch { /* Brak zapisu, ale zachowujemy pozycje w RAM. */ }
  }
  /** Nie ponawiamy błędnych wyników. Błąd łączności lub limitu zatrzymuje FIFO. */
  flush(api: Pick<RankingApi, 'submitRun'>): Promise<QueueFlushResult> {
    if (this.inFlight) return this.inFlight;
    const task = async (): Promise<QueueFlushResult> => {
      let sent = 0;
      let discarded = 0;
      while (this.items.length > 0) {
        if (typeof navigator !== 'undefined' && navigator.onLine === false) break;
        const current = this.items[0];
        let response: SubmitRunResponse;
        try { response = await api.submitRun(clone(current)); }
        catch { break; }
        if (response.accepted || response.reason === 'duplicate') {
          sent++;
        } else if (response.reason === 'expired' || response.reason === 'replay_mismatch' || response.reason === 'bad_nick') {
          discarded++;
        } else {
          break;
        }
        this.items.shift();
        this.save();
      }
      return { sent, discarded, pending: this.items.length };
    };
    this.inFlight = task().finally(() => { this.inFlight = undefined; });
    return this.inFlight;
  }
}
/** Przy utracie sieci i ograniczeniu tempa zgłoszenie trafia do kolejki. */
export async function submitOrQueue(
  api: Pick<RankingApi, 'submitRun'>, queue: OfflineRunQueue, request: SubmitRunRequest,
): Promise<DispatchResult> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    queue.enqueue(request);
    return { status: 'queued' };
  }
  try {
    const response = await api.submitRun(request);
    if (response.accepted || response.reason === 'duplicate') return { status: 'accepted', response };
    if (response.reason === 'rate_limited' || response.reason === 'too_fast') {
      queue.enqueue(request);
      return { status: 'queued' };
    }
    return { status: 'rejected', response };
  } catch {
    queue.enqueue(request);
    return { status: 'queued' };
  }
}
/** Zwolnij nasłuch przy demontażu gry. */
export function watchQueueOnline(queue: OfflineRunQueue, api: Pick<RankingApi, 'submitRun'>): () => void {
  if (typeof window === 'undefined') return () => {};
  const flush = () => { void queue.flush(api); };
  const visible = () => { if (document.visibilityState === 'visible') flush(); };
  window.addEventListener('online', flush);
  document.addEventListener('visibilitychange', visible);
  flush();
  return () => {
    window.removeEventListener('online', flush);
    document.removeEventListener('visibilitychange', visible);
  };
}
