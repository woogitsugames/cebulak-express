/**
 * Odbiorca prywatnościowej analityki. Tylko dobowe sumy w stats/YYYY-MM-DD;
 * brak trwałego zapisu zdarzeń, identyfikatorów, adresów IP i nagłówków.
 * Eksport w indeksie Firebase Functions należy dodać podczas integracji:
 * export { collectEvents } from './analytics';
 */
import { getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';

const HOMES = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK'] as const;
const MODES = ['ranked', 'cozy'] as const;
const CAUSES = ['arrived', 'ground', 'viaduct', 'sign', 'crane', 'roadworks', 'barrier', 'truck'] as const;
const FORMATS = ['native', 'clipboard', 'image', 'link'] as const;
const PLACEMENTS = ['menu', 'result', 'league', 'footer'] as const;
const NAMES = ['app_open', 'run_start', 'run_end', 'share_click', 'portal_click', 'league_open', 'install_prompt'] as const;
const RETENTION = ['new', 'd1', 'd7'] as const;
const MAX_BATCH = 40;
const MAX_BYTES = 16 * 1024;

// CORS nie jest mechanizmem uwierzytelnienia; domeny należy ograniczyć w produkcji.
const allowedOrigins = (process.env.ANALYTICS_ALLOWED_ORIGINS ?? '')
  .split(',').map((x) => x.trim()).filter(Boolean);

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function keys(value: unknown, names: readonly string[]): boolean {
  const obj = object(value);
  return obj !== null && Object.keys(obj).length === names.length &&
    Object.keys(obj).every((name) => names.includes(name));
}

function member<const T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.some((item) => item === value);
}

function metric(value: unknown, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= max;
}

type Name = typeof NAMES[number];
interface ValidEvent {
  event: Name;
  props?: Record<string, unknown>;
  retention?: typeof RETENTION[number];
}

/** Pełna allowlista. Dodatkowe pola (w tym e-mail, URL, ID) odrzucają żądanie. */
function validateEvent(value: unknown): value is ValidEvent {
  const e = object(value);
  if (!e || !member(NAMES, e.event)) return false;
  if (e.event === 'app_open') {
    return keys(e, ['event']) ||
      (keys(e, ['event', 'retention']) && member(RETENTION, e.retention));
  }
  if (e.event === 'league_open' || e.event === 'install_prompt') return keys(e, ['event']);
  if (!keys(e, ['event', 'props'])) return false;
  const p = object(e.props);
  if (!p) return false;
  switch (e.event) {
    case 'run_start':
      return keys(p, ['mode', 'home']) && member(MODES, p.mode) && member(HOMES, p.home);
    case 'run_end':
      return keys(p, ['km', 'seconds', 'cause', 'mode', 'home']) &&
        metric(p.km, 10000) && metric(p.seconds, 3600) &&
        member(CAUSES, p.cause) && member(MODES, p.mode) && member(HOMES, p.home);
    case 'share_click':
      return keys(p, ['format']) && member(FORMATS, p.format);
    case 'portal_click':
      return keys(p, ['placement', 'home']) && member(PLACEMENTS, p.placement) && member(HOMES, p.home);
    default:
      return false;
  }
}

function parseBody(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return null; }
}

/** Dopiero po walidacji zamieniamy zdarzenia na sumy w pamięci funkcji. */
function countEvents(events: ValidEvent[]): Record<string, number> {
  const counts: Record<string, number> = Object.create(null) as Record<string, number>;
  const add = (key: string, amount = 1): void => { counts[key] = (counts[key] ?? 0) + amount; };
  for (const e of events) {
    add('events.' + e.event);
    if (e.event === 'app_open' && e.retention) add('retention.' + e.retention);
    const p = e.props;
    if (!p) continue;
    switch (e.event) {
      case 'run_start':
        add('runs.starts.byMode.' + String(p.mode));
        add('runs.starts.byHome.' + String(p.home));
        break;
      case 'run_end': {
        add('runs.ends.kmSum', p.km as number);
        add('runs.ends.secondsSum', p.seconds as number);
        add('runs.ends.byMode.' + String(p.mode));
        add('runs.ends.byHome.' + String(p.home));
        add('runs.ends.byCause.' + String(p.cause));
        const seconds = p.seconds as number;
        const bucket = seconds <= 10 ? 'lte10' : seconds <= 25 ? 'lte25' :
          seconds <= 60 ? 'lte60' : 'gt60';
        add('runs.ends.durationBuckets.' + bucket);
        break;
      }
      case 'share_click':
        add('shares.byFormat.' + String(p.format));
        break;
      case 'portal_click':
        add('portals.byPlacement.' + String(p.placement));
        add('portals.byHome.' + String(p.home));
        break;
    }
  }
  return counts;
}

/** Buduje zagnieżdżoną mapę, żeby Firestore merge aktualizował tylko liczniki. */
function increments(counts: Record<string, number>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, count] of Object.entries(counts)) {
    const parts = key.split('.');
    let node = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const segment = parts[i];
      if (!Object.hasOwn(node, segment)) node[segment] = {};
      node = node[segment] as Record<string, unknown>;
    }
    node[parts[parts.length - 1]] = FieldValue.increment(count);
  }
  return result;
}

if (!getApps().length) initializeApp();

export const collectEvents = onRequest({
  region: 'europe-west1',
  cors: allowedOrigins.length ? allowedOrigins : true,
  maxInstances: 10,
}, async (request, response) => {
  response.set('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.set('Allow', 'POST').status(405).end();
    return;
  }
  const origin = request.headers.origin;
  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) {
    response.status(403).end();
    return;
  }
  // Parsujemy tekst/plain, by zwykłe sendBeacon nie wymagało preflight.
  const raw = request.rawBody;
  if (raw && raw.byteLength > MAX_BYTES) {
    response.status(413).end();
    return;
  }
  const body = object(parseBody(raw ? new TextDecoder().decode(raw) : request.body));
  const events = body?.events;
  if (!body || !keys(body, ['version', 'events']) || body.version !== 1 ||
    !Array.isArray(events) || events.length < 1 || events.length > MAX_BATCH ||
    !events.every(validateEvent)) {
    response.status(400).end();
    return;
  }
  const day = new Date().toISOString().slice(0, 10);
  const counters = countEvents(events as ValidEvent[]);
  try {
    await getFirestore().doc('stats/' + day).set({
      ...increments(counters),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    response.status(204).end();
  } catch {
    // Bez logowania treści żądania ani nagłówków.
    response.status(503).end();
  }
});
