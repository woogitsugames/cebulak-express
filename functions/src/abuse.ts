import { createHmac, randomBytes } from 'node:crypto';

// Licznik obowiązuje w obrębie instancji; nigdy nie zapisujemy adresu IP do bazy ani logów.
export const ANALYTICS_RATE_LIMIT = 30;
const WINDOW_MS = 60_000;
const MAX_KEYS = 4_096;
const salt = randomBytes(32);
const hits = new Map<string, { since: number; count: number }>();
let requests = 0;

export function originPermitted(origin: string | undefined, allowed: readonly string[]): boolean {
  // Bez allowlisty (lokalne środowisko) akceptujemy brak Origin.
  // Po ustawieniu allowlisty nie pozwalamy ominąć jej przez pominięcie nagłówka.
  return allowed.length === 0 || (typeof origin === 'string' && allowed.includes(origin));
}

/** Ograniczenie best-effort: wiele instancji ma niezależne liczniki. */
export function analyticsRateLimited(ip: string, now = Date.now()): boolean {
  const hash = createHmac('sha256', salt).update(ip || 'unknown').digest('hex');
  // Usuwamy stare klucze także przy ruchu generowanym z wielu adresów.
  if (++requests % 64 === 0 || hits.size >= MAX_KEYS) {
    for (const [key, value] of hits) {
      if (now < value.since || now - value.since >= WINDOW_MS) hits.delete(key);
    }
  }
  let state = hits.get(hash);
  if (!state) {
    if (hits.size >= MAX_KEYS) return true;
    state = { since: now, count: 0 };
    hits.set(hash, state);
  }
  if (now < state.since || now - state.since >= WINDOW_MS) {
    state.since = now;
    state.count = 0;
  }
  if (state.count >= ANALYTICS_RATE_LIMIT) return true;
  state.count++;
  return false;
}

/** Sygnał do ręcznego przeglądu, nie dowód oszustwa ani powód odrzucenia wyniku. */
export function regularTapRhythm(flapTicks: unknown): boolean {
  if (!Array.isArray(flapTicks) || flapTicks.length < 16) return false;
  const gaps: number[] = [];
  for (let i = 1; i < flapTicks.length; i++) {
    const prev: unknown = flapTicks[i - 1];
    const current: unknown = flapTicks[i];
    if (!Number.isSafeInteger(prev) || !Number.isSafeInteger(current)) return false;
    const gap = (current as number) - (prev as number);
    if (gap < 6) return false;
    gaps.push(gap);
  }
  const sorted = [...gaps].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  return gaps.filter((gap) => Math.abs(gap - median) <= 1).length >= Math.ceil(gaps.length * 0.92);
}
