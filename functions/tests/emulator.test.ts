import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { initializeApp as initAdmin, getApps as getAdminApps } from 'firebase-admin/app';
import { getFirestore as adminFirestore } from 'firebase-admin/firestore';
import { deleteApp, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, signInAnonymously } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { Game, replay } from '../../src/core/game';
import { randomNickChoices } from '../../src/content/nicks';
import { makeRoute } from '../../src/core/route';

const projectId = 'demo-cebulak-express';
const apps: FirebaseApp[] = [];

interface RunStart { runId: string; seed: number; issuedAt: number }
interface RunResult {
  accepted: boolean;
  km: number;
  reason?: string;
  week: string;
  countryRankKm?: number;
  playerBestKm?: number;
}

beforeAll(() => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    throw new Error('Test wymaga emulators:exec, aby nigdy nie zapisywać wyników do produkcji.');
  }
  if (!getAdminApps().length) initAdmin({ projectId });
});

afterAll(async () => {
  await Promise.all(apps.map((app) => deleteApp(app)));
});

async function session() {
  const app = initializeApp({ apiKey: 'demo-api-key', projectId, appId: 'demo-web' }, 'test-' + randomUUID());
  apps.push(app);
  const auth = getAuth(app);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  const { user } = await signInAnonymously(auth);
  const functions = getFunctions(app, 'europe-west1');
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  return {
    uid: user.uid,
    start: httpsCallable<{ mode: 'ranked' | 'daily'; home: 'BE'; from: string; to: string; daily?: string }, RunStart>(functions, 'startRun'),
    submit: httpsCallable<{ runId: string; flapTicks: number[]; ticks: number; km: number; nickId: string }, RunResult>(functions, 'submitRun'),
  };
}

function finishedRun(seed: number) {
  const game = replay({
    seed, mode: 'ranked', route: makeRoute('BE', 'bruksela', 'rzeszow'),
  }, [0]);
  expect(game.phase).toBe('over');
  return { flapTicks: [0], ticks: game.ticks, km: game.km, nickId: randomNickChoices(() => 0.12, 1, 'BE')[0] };
}


function regularRun(seed: number) {
  const game = new Game({ seed, mode: 'ranked', route: makeRoute('BE', 'bruksela', 'rzeszow') });
  for (let tick = 0; tick < 120 * 30 && game.phase !== 'over' && game.phase !== 'arrived'; tick++) {
    if (tick === 0 || (tick % 8 === 0 && tick < 360)) game.flap();
    game.tick();
  }
  expect(game.phase).toBe('over');
  expect(game.flapTicks.length).toBeGreaterThanOrEqual(16);
  return { flapTicks: [...game.flapTicks], ticks: game.ticks, km: game.km,
    nickId: randomNickChoices(() => 0.12, 1, 'BE')[0] };
}

async function ageRun(runId: string, delayMs = 10_000): Promise<void> {
  await adminFirestore().doc('runs/' + runId).update({ issuedAt: Date.now() - delayMs });
}

describe.sequential('callable Functions na emulatorze', () => {
  it('przyjmuje autentyczny wynik i aktualizuje Ligę oraz rekord', async () => {
    const ctx = await session();
    const started = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    await ageRun(started.runId);
    const run = finishedRun(started.seed);
    const reply = (await ctx.submit({ runId: started.runId, ...run })).data;
    expect(reply).toMatchObject({ accepted: true, km: run.km });
    expect(reply.countryRankKm).toBeGreaterThanOrEqual(run.km);
    expect(reply.playerBestKm).toBe(run.km);
    const player = await adminFirestore().doc('players/' + ctx.uid).get();
    expect(player.get('bestKm')).toBe(run.km);
    const entry = await adminFirestore().doc('leaderboard/' + reply.week + '/entries/' + ctx.uid).get();
    expect(entry.get('bestKm')).toBe(run.km);
    const league = await adminFirestore().doc('league/' + reply.week).get();
    expect(league.get('countries.BE.runs')).toBeGreaterThanOrEqual(1);
    const savedRun = await adminFirestore().doc('runs/' + started.runId).get();
    expect(savedRun.get('flagged')).toBe(false);
  });

  it('odrzuca podmienione tapnięcia jako replay_mismatch', async () => {
    const ctx = await session();
    const start = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    await ageRun(start.runId);
    const run = finishedRun(start.seed);
    const reply = (await ctx.submit({ runId: start.runId, ...run, flapTicks: [0, 40] })).data;
    expect(reply).toMatchObject({ accepted: false, reason: 'replay_mismatch' });
  });

  it('odrzuca zgłoszenie szybsze niż czas symulacji', async () => {
    const ctx = await session();
    const start = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    await adminFirestore().doc('runs/' + start.runId).update({ issuedAt: Date.now() + 10_000 });
    const reply = (await ctx.submit({ runId: start.runId, ...finishedRun(start.seed) })).data;
    expect(reply).toMatchObject({ accepted: false, reason: 'too_fast' });
  });

  it('nie dodaje przejazdu drugi raz', async () => {
    const ctx = await session();
    const start = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    await ageRun(start.runId);
    const payload = { runId: start.runId, ...finishedRun(start.seed) };
    expect((await ctx.submit(payload)).data.accepted).toBe(true);
    expect((await ctx.submit(payload)).data.reason).toBe('duplicate');
  });


  it('flaguje regularną sekwencję bez automatycznego odrzucenia wyniku', async () => {
    const ctx = await session();
    const start = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    const run = regularRun(start.seed);
    await ageRun(start.runId, 60_000);
    const result = (await ctx.submit({ runId: start.runId, ...run })).data;
    expect(result.accepted).toBe(true);
    const saved = await adminFirestore().doc('runs/' + start.runId).get();
    expect(saved.get('status')).toBe('accepted');
    expect(saved.get('flagged')).toBe(true);
    expect(saved.get('flagReasons')).toContain('regular_taps');
  });

  it('nie zalicza daily do sum kraju i używa wspólnego ziarna', async () => {
    const ctx = await session();
    const start = (await ctx.start({ mode: 'daily', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    const other = await session();
    const second = (await other.start({ mode: 'daily', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    expect(second.seed).toBe(start.seed);
    await ageRun(start.runId);
    const reply = (await ctx.submit({ runId: start.runId, ...finishedRun(start.seed) })).data;
    expect(reply.accepted).toBe(true);
    expect(reply.countryRankKm).toBeUndefined();
    expect((await adminFirestore().doc('daily/' + new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Warsaw' }) + '/entries/' + ctx.uid).get()).exists).toBe(true);
  });
});
