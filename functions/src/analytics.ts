/**
 * Odbiorca prywatnościowej analityki. Tylko dobowe sumy w stats/YYYY-MM-DD;
 * brak trwałego zapisu zdarzeń, identyfikatorów, adresów IP i nagłówków.
 * Eksport w indeksie Firebase Functions należy dodać podczas integracji:
 * export { collectEvents } from './analytics';
 */
import { getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { analyticsRateLimited, originPermitted } from './abuse';
import { countEvents, keys, object, validateEvent, type ValidEvent } from './analytics-events';

const MAX_BATCH = 40;
const MAX_BYTES = 16 * 1024;

// CORS nie jest mechanizmem uwierzytelnienia; domeny należy ograniczyć w produkcji.
const allowedOrigins = (process.env.ANALYTICS_ALLOWED_ORIGINS ?? '')
  .split(',').map((x) => x.trim()).filter(Boolean);

function parseBody(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return null; }
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
  if (!originPermitted(origin, allowedOrigins)) {
    response.status(403).end();
    return;
  }
  // Parsujemy tekst/plain, by zwykłe sendBeacon nie wymagało preflight.
  const raw = request.rawBody;
  const bytes = raw?.byteLength ?? Buffer.byteLength(
    typeof request.body === 'string' ? request.body : JSON.stringify(request.body ?? null),
  );
  if (bytes > MAX_BYTES) {
    response.status(413).end();
    return;
  }
  // Nie bazujemy na podanym przez klienta X-Forwarded-For; request.ip jest
  // adresem wyznaczonym przez warstwę HTTP funkcji.
  if (analyticsRateLimited(request.ip || request.socket.remoteAddress || 'unknown')) {
    response.set('Retry-After', '60').status(429).end();
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
