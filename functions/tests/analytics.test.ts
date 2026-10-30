import { beforeAll, describe, expect, it } from 'vitest';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ANALYTICS_RATE_LIMIT } from '../src/abuse';

const projectId = 'demo-cebulak-express';
const endpoint = 'http://127.0.0.1:5001/' + projectId + '/europe-west1/collectEvents';
const body = JSON.stringify({ version: 1, events: [{ event: 'league_open' }] });

beforeAll(() => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error('Test wymaga emulatora Firebase.');
  if (!getApps().length) initializeApp({ projectId });
});

function post(data: string): Promise<Response> {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain', Origin: 'https://example.test' },
    body: data,
  });
}

describe.sequential('collectEvents na emulatorze', () => {
  it('przyjmuje poprawną paczkę i zapisuje wyłącznie sumy', async () => {
    const response = await post(body);
    expect(response.status).toBe(204);
    const day = new Date().toISOString().slice(0, 10);
    const snap = await getFirestore().doc('stats/' + day).get();
    expect(snap.get('events.league_open')).toBeGreaterThanOrEqual(1);
  });

  it('odrzuca duże paczki i zły format', async () => {
    const large = await post('x'.repeat(16 * 1024 + 1));
    expect(large.status).toBe(413);
    const tooMany = await post(JSON.stringify({
      version: 1, events: Array.from({ length: 41 }, () => ({ event: 'league_open' })),
    }));
    expect(tooMany.status).toBe(400);
    const bad = await post(JSON.stringify({ version: 1, events: [{ event: 'portal_click', props: { email: 'a@b.c' } }] }));
    expect(bad.status).toBe(400);
  });

  it('zwraca 429 przy przekroczeniu limitu żądań z jednego IP', async () => {
    let rejected = 0;
    for (let i = 0; i < ANALYTICS_RATE_LIMIT + 3; i++) {
      const response = await post(body);
      if (response.status === 429) {
        rejected++;
        expect(response.headers.get('retry-after')).toBe('60');
      } else {
        expect(response.status).toBe(204);
      }
    }
    expect(rejected).toBeGreaterThan(0);
  });
});
