import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { collection, doc, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';

const projectId = 'demo-cebulak-express';
let env: RulesTestEnvironment;

beforeAll(async () => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    throw new Error('Test reguł wymaga emulatora Firestore.');
  }
  env = await initializeTestEnvironment({
    projectId,
    firestore: { host: '127.0.0.1', port: 8080 },
  });
});

afterAll(async () => {
  await env.cleanup();
});

describe('reguły Firestore', () => {
  it('blokują każdy zapis klienta do league i leaderboard', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(setDoc(doc(db, 'league', '2026-W50'), { countries: {} }));
    await assertFails(setDoc(doc(db, 'leaderboard', '2026-W50', 'entries', 'alice'), { bestKm: 99999 }));
  });

  it('pozwalają przeczytać własny dokument gracza, ale nie cudzy', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertSucceeds(getDoc(doc(db, 'players', 'alice')));
    await assertFails(getDoc(doc(db, 'players', 'bob')));
    await assertFails(setDoc(doc(db, 'players', 'alice'), { bestKm: 99999 }));
  });

  it('pozwalają czytać publiczne wyniki (także daily), lecz nie runs', async () => {
    const db = env.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(db, 'league', '2026-W50')));
    await assertSucceeds(getDoc(doc(db, 'leaderboard', '2026-W50', 'entries', 'alice')));
    await assertFails(getDoc(doc(db, 'runs', 'run-123')));
    await assertSucceeds(getDoc(doc(db, 'daily', '2026-12-01', 'entries', 'alice')));
  });

  it('odrzucają nieograniczone i zbyt duże listy, ale pozwalają na limit 100', async () => {
    const db = env.unauthenticatedContext().firestore();
    for (const ref of [
      collection(db, 'league'),
      collection(db, 'leaderboard', '2026-W50', 'entries'),
      collection(db, 'daily', '2026-12-01', 'entries'),
    ]) {
      await assertFails(getDocs(ref));
      await assertFails(getDocs(query(ref, limit(101))));
      await assertSucceeds(getDocs(query(ref, limit(100))));
    }
  });
});
