/**
 * Analityka wyłącznie agregatowa. Identyfikator instalacji i jego dzienny skrót
 * nigdy nie opuszczają urządzenia. Moduł nie używa ciasteczek ani API reklamowych.
 */

export type AnalyticsHome = 'BE' | 'NL' | 'DE' | 'UK' | 'FR' | 'CH' | 'NO' | 'DK';
export type AnalyticsMode = 'ranked' | 'cozy';
export type RunEndCause = 'arrived' | 'ground' | 'viaduct' | 'sign' | 'crane' | 'roadworks' | 'barrier' | 'truck' | 'baggage-gate';
export type ShareFormat = 'native' | 'clipboard' | 'image' | 'link';
export type PortalPlacement = 'menu' | 'result' | 'league' | 'footer';

export interface EventProps {
  app_open: undefined;
  run_start: { mode: AnalyticsMode; home: AnalyticsHome };
  run_end: { km: number; seconds: number; cause: RunEndCause; mode: AnalyticsMode; home: AnalyticsHome };
  share_click: { format: ShareFormat };
  portal_click: { placement: PortalPlacement; home: AnalyticsHome };
  league_open: undefined;
  install_prompt: undefined;
}

export type EventName = keyof EventProps;
type Args<K extends EventName> = EventProps[K] extends undefined ? [] : [props: EventProps[K]];
type Retention = 'new' | 'd1' | 'd7';

type SanitizedProps = Record<string, string | number>;
interface WireEvent {
  event: EventName;
  props?: SanitizedProps;
  retention?: Retention;
}
interface InstallState {
  id: string;
  firstDay: string;
  lastDayHash?: string;
}

export interface AnalyticsOptions {
  /** Adres HTTPS funkcji collectEvents; pusty wyłącza wysyłkę. */
  endpoint: string;
  /** 0..1, stała decyzja na poziomie instalacji (domyślnie 1). */
  sampleRate?: number;
  batchSize?: number;
  flushIntervalMs?: number;
  maxBufferSize?: number;
}

export interface AnalyticsTracker {
  track<K extends EventName>(event: K, ...args: Args<K>): void;
  flush(): Promise<void>;
  dispose(): void;
}

const STORAGE_KEY = 'ce.analytics.install.v1';
const HOMES: readonly AnalyticsHome[] = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK'];
const MODES: readonly AnalyticsMode[] = ['ranked', 'cozy'];
const CAUSES: readonly RunEndCause[] = [
  'arrived', 'ground', 'viaduct', 'sign', 'crane', 'roadworks', 'barrier', 'truck', 'baggage-gate',
];
const FORMATS: readonly ShareFormat[] = ['native', 'clipboard', 'image', 'link'];
const PLACEMENTS: readonly PortalPlacement[] = ['menu', 'result', 'league', 'footer'];

function member<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && values.some((item) => item === value);
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function finite(value: unknown, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= max;
}

/** Kopiujemy wyłącznie dozwolone pola; nadmiarowe dane są usuwane. */
function sanitize(event: EventName, value: unknown): WireEvent | null {
  if (event === 'app_open' || event === 'league_open' || event === 'install_prompt') return { event };
  const p = record(value);
  if (!p) return null;
  switch (event) {
    case 'run_start':
      if (!member(MODES, p.mode) || !member(HOMES, p.home)) return null;
      return { event, props: { mode: p.mode, home: p.home } };
    case 'run_end':
      if (!finite(p.km, 10000) || !finite(p.seconds, 3600) ||
        !member(CAUSES, p.cause) || !member(MODES, p.mode) || !member(HOMES, p.home)) return null;
      return { event, props: {
        km: p.km, seconds: p.seconds, cause: p.cause, mode: p.mode, home: p.home,
      } };
    case 'share_click':
      if (!member(FORMATS, p.format)) return null;
      return { event, props: { format: p.format } };
    case 'portal_click':
      if (!member(PLACEMENTS, p.placement) || !member(HOMES, p.home)) return null;
      return { event, props: { placement: p.placement, home: p.home } };
    default:
      return null;
  }
}

function dayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function validDay(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    new Date(value + 'T00:00:00.000Z').toISOString().slice(0, 10) === value;
}

function newId(): string | null {
  try {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return [...bytes].map((x) => x.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

function storage(): Storage | null {
  try { return globalThis.localStorage; } catch { return null; }
}

function getInstallation(): { state: InstallState | null; store: Storage | null; persistent: boolean } {
  const store = storage();
  const today = dayUTC();
  try {
    const raw = store?.getItem(STORAGE_KEY);
    if (raw) {
      const candidate: unknown = JSON.parse(raw);
      const value = record(candidate);
      if (value && typeof value.id === 'string' && /^[a-f0-9]{32}$/.test(value.id) &&
        validDay(value.firstDay) && value.firstDay <= today &&
        (value.lastDayHash === undefined ||
          (typeof value.lastDayHash === 'string' && /^[a-f0-9]{64}$/.test(value.lastDayHash)))) {
        return { state: value as unknown as InstallState, store, persistent: true };
      }
    }
  } catch {
    // Zablokowany localStorage lub uszkodzony wpis: pozostałe zdarzenia nadal działają.
  }
  const id = newId();
  if (!id) return { state: null, store: null, persistent: false };
  const state: InstallState = { id, firstDay: today };
  try {
    store?.setItem(STORAGE_KEY, JSON.stringify(state));
    return { state, store, persistent: !!store };
  } catch {
    return { state, store: null, persistent: false };
  }
}

/** SHA-256 służy wyłącznie lokalnemu oznaczeniu pierwszego otwarcia danego dnia. */
async function localRetention(state: InstallState, store: Storage | null): Promise<Retention | undefined> {
  if (!store || !globalThis.crypto?.subtle) return undefined;
  const today = dayUTC();
  const input = new TextEncoder().encode(state.id + ':' + today);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', input);
  const hash = [...new Uint8Array(digest)].map((x) => x.toString(16).padStart(2, '0')).join('');
  if (state.lastDayHash === hash) return undefined;
  const delta = Math.round((Date.parse(today + 'T00:00:00Z') -
    Date.parse(state.firstDay + 'T00:00:00Z')) / 86400000);
  // Znacznik zapisujemy przed wysyłką: mniej duplikatów, ale możliwe niedoliczenie przy awarii sieci.
  try {
    store.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastDayHash: hash }));
    state.lastDayHash = hash;
  } catch {
    return undefined;
  }
  if (delta === 0) return 'new';
  if (delta === 1) return 'd1';
  if (delta === 7) return 'd7';
  return undefined;
}

function validEndpoint(endpoint: string): boolean {
  try {
    const url = new URL(endpoint, typeof location === 'undefined' ? undefined : location.href);
    return url.protocol === 'https:' || (url.protocol === 'http:' &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1'));
  } catch {
    return false;
  }
}

export function createAnalyticsTracker(options: AnalyticsOptions): AnalyticsTracker {
  const endpoint = options.endpoint.trim();
  if (!endpoint || !validEndpoint(endpoint)) throw new Error('Analityka wymaga poprawnego adresu HTTPS.');
  const sampleRate = options.sampleRate ?? 1;
  if (!Number.isFinite(sampleRate) || sampleRate < 0 || sampleRate > 1) {
    throw new RangeError('sampleRate musi należeć do zakresu 0..1.');
  }
  for (const [name, value] of Object.entries({
    batchSize: options.batchSize, maxBufferSize: options.maxBufferSize, flushIntervalMs: options.flushIntervalMs,
  })) {
    if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
      throw new RangeError(name + ' musi być dodatnią liczbą.');
    }
  }
  if (sampleRate === 0) {
    // Nie zapisujemy nawet lokalnego identyfikatora, gdy pomiar jest wyłączony.
    return { track: () => {}, flush: async () => {}, dispose: () => {} };
  }
  const batchSize = Math.max(1, Math.min(40, Math.floor(options.batchSize ?? 20)));
  const maxBufferSize = Math.max(batchSize, Math.min(400, Math.floor(options.maxBufferSize ?? 100)));
  const flushIntervalMs = Math.max(1000, Math.floor(options.flushIntervalMs ?? 15000));
  const installation = getInstallation();
  // Pierwsze 32 losowe bity stałe dla danej instalacji; ta sama próba dla D0/D1/D7.
  const inSample = sampleRate === 1 || (sampleRate > 0 && installation.state !== null &&
    parseInt(installation.state.id.slice(0, 8), 16) / 0x100000000 < sampleRate);
  const queue: WireEvent[] = [];
  let disposed = false;
  let sending = false;
  let openChain: Promise<void> = Promise.resolve();

  function enqueue(event: WireEvent): void {
    if (disposed || !inSample) return;
    if (queue.length === maxBufferSize) queue.shift();
    queue.push(event);
    if (queue.length >= batchSize) void flush();
  }

  async function flush(): Promise<void> {
    if (sending || !queue.length || disposed) return;
    sending = true;
    try {
      while (queue.length && !disposed) {
        const batch = queue.splice(0, batchSize);
        const body = JSON.stringify({ version: 1, events: batch });
        let accepted = false;
        try {
          accepted = typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function' &&
            navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
        } catch {
          // Niektóre WebView wyłączają sendBeacon; próbujemy fetch bez poświadczeń.
        }
        if (accepted) continue;
        try {
          const response = await fetch(endpoint, {
            method: 'POST', body, headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            credentials: 'omit', cache: 'no-store', keepalive: true, mode: 'cors',
          });
          if (!response.ok) throw new Error('Odbiorca odrzucił paczkę.');
        } catch {
          // Retransmisja w następnej próbie, bez zapisywania kolejki na dysku.
          queue.unshift(...batch);
          while (queue.length > maxBufferSize) queue.pop();
          break;
        }
      }
    } finally {
      sending = false;
    }
  }

  function track<K extends EventName>(event: K, ...args: Args<K>): void {
    if (disposed || !inSample) return;
    const sanitized = sanitize(event, args[0]);
    if (!sanitized) return;
    if (event !== 'app_open') {
      enqueue(sanitized);
      return;
    }
    // Serializujemy kolejne otwarcia, żeby dwa szybkie wywołania nie policzyły D1/D7 dwa razy.
    openChain = openChain.then(async () => {
      let retention: Retention | undefined;
      try {
        if (installation.persistent && installation.state) {
          retention = await localRetention(installation.state, installation.store);
        }
      } catch {
        // Brak Web Crypto: app_open pozostaje zdarzeniem bez identyfikatora.
      }
      enqueue(retention ? { event: 'app_open', retention } : { event: 'app_open' });
    });
  }

  const onPageHide = (): void => { void flush(); };
  const onVisibility = (): void => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') void flush();
  };
  const timer = setInterval(() => { void flush(); }, flushIntervalMs);
  if (typeof window !== 'undefined') window.addEventListener('pagehide', onPageHide);
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisibility);

  function dispose(): void {
    disposed = true;
    clearInterval(timer);
    if (typeof window !== 'undefined') window.removeEventListener('pagehide', onPageHide);
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility);
    queue.length = 0;
  }

  return { track, flush, dispose };
}

let active: AnalyticsTracker | null = null;

/** Wywołać raz przy uruchomieniu UI; nie uruchamia żadnego automatycznego śledzenia. */
export function configureAnalytics(options: AnalyticsOptions): void {
  active?.dispose();
  active = options.endpoint.trim() ? createAnalyticsTracker(options) : null;
}

/** Prosty interfejs dla ekranu gry: track('run_start', { mode, home }). */
export function track<K extends EventName>(event: K, ...args: Args<K>): void {
  active?.track(event, ...args);
}

export async function flushAnalytics(): Promise<void> {
  await active?.flush();
}
