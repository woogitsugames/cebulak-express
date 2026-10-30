import { afterAll, beforeAll, describe, it } from 'vitest';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { collection, doc, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';
import { seasonKey } from '../../src/core/rules';

// Publiczne zestawienia są kluczowane sezonem (wersją zasad), np. r2_2026-W50.
const WEEK = seasonKey('2026-W50');
const DAY = seasonKey('2026-12-01');

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
    await assertFails(setDoc(doc(db, 'league', WEEK), { countries: {} }));
    await assertFails(setDoc(doc(db, 'leaderboard', WEEK, 'entries', 'alice'), { bestKm: 99999 }));
  });

  it('pozwalają przeczytać własny dokument gracza, ale nie cudzy', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertSucceeds(getDoc(doc(db, 'players', 'alice')));
    await assertFails(getDoc(doc(db, 'players', 'bob')));
    await assertFails(setDoc(doc(db, 'players', 'alice'), { bestKm: 99999 }));
  });

  it('pozwalają czytać publiczne wyniki (także daily), lecz nie runs', async () => {
    const db = env.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(db, 'league', WEEK)));
    await assertSucceeds(getDoc(doc(db, 'leaderboard', WEEK, 'entries', 'alice')));
    await assertFails(getDoc(doc(db, 'runs', 'run-123')));
    await assertSucceeds(getDoc(doc(db, 'daily', DAY, 'entries', 'alice')));
  });

  it('odrzucają nieograniczone i zbyt duże listy, ale pozwalają na limit 100', async () => {
    const db = env.unauthenticatedContext().firestore();
    for (const ref of [
      collection(db, 'league'),
      collection(db, 'leaderboard', WEEK, 'entries'),
      collection(db, 'daily', DAY, 'entries'),
    ]) {
      await assertFails(getDocs(ref));
      await assertFails(getDocs(query(ref, limit(101))));
      await assertSucceeds(getDocs(query(ref, limit(100))));
    }
  });
});
