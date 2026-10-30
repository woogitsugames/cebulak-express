import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { initializeApp as initAdmin, getApps as getAdminApps } from 'firebase-admin/app';
import { FieldValue, getFirestore as adminFirestore } from 'firebase-admin/firestore';
import { deleteApp, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, signInAnonymously } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { Game, replay } from '../../src/core/game';
import { randomNickChoices } from '../../src/content/nicks';
import { makeRoute, type HomeCountry } from '../../src/core/route';
import { RULES_VERSION, rankedGameOptions, seasonKey } from '../../src/core/rules';

const projectId = 'demo-cebulak-express';
const apps: FirebaseApp[] = [];

interface RunStart { runId: string; seed: number; issuedAt: number; rulesVersion: number }
interface RunResult {
  accepted: boolean;
  km: number;
  reason?: string;
  week: string;
  rulesVersion: number;
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
  type StartReq = { mode: 'ranked' | 'daily'; home: HomeCountry; from: string; to: string; daily?: string; rulesVersion?: number };
  type SubmitReq = { runId: string; flapTicks: number[]; ticks: number; km: number; nickId: string; rulesVersion?: number };
  const rawStart = httpsCallable<StartReq, RunStart>(functions, 'startRun');
  const rawSubmit = httpsCallable<SubmitReq, RunResult>(functions, 'submitRun');
  return {
    uid: user.uid,
    rawStart,
    // Jak klient (src/net/api.ts): bieżąca wersja zasad, o ile test jej nie nadpisze.
    start: (data: StartReq) => rawStart({ rulesVersion: RULES_VERSION, ...data }),
    submit: (data: SubmitReq) => rawSubmit({ rulesVersion: RULES_VERSION, ...data }),
  };
}

function finishedRun(seed: number, home: HomeCountry = 'BE', from = 'bruksela', to = 'rzeszow') {
  const game = replay(rankedGameOptions(seed, makeRoute(home, from, to)), [0]);
  expect(game.phase).toBe('over');
  return { flapTicks: [0], ticks: game.ticks, km: game.km, nickId: randomNickChoices(() => 0.12, 1, 'BE')[0] };
}


function regularRun(seed: number) {
  const game = new Game(rankedGameOptions(seed, makeRoute('BE', 'bruksela', 'rzeszow')));
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
    expect(reply).toMatchObject({ accepted: true, km: run.km, rulesVersion: RULES_VERSION });
    expect(started.rulesVersion).toBe(RULES_VERSION);
    expect(reply.countryRankKm).toBeGreaterThanOrEqual(run.km);
    expect(reply.playerBestKm).toBe(run.km);
    const player = await adminFirestore().doc('players/' + ctx.uid).get();
    expect(player.get('bestKm')).toBe(run.km);
    expect(player.get('rulesVersion')).toBe(RULES_VERSION);
    const entry = await adminFirestore().doc('leaderboard/' + seasonKey(reply.week) + '/entries/' + ctx.uid).get();
    expect(entry.get('bestKm')).toBe(run.km);
    expect(entry.get('rulesVersion')).toBe(RULES_VERSION);
    const league = await adminFirestore().doc('league/' + seasonKey(reply.week)).get();
    expect(league.get('countries.BE.runs')).toBeGreaterThanOrEqual(1);
    expect(league.get('rulesVersion')).toBe(RULES_VERSION);
    // Dokument bez prefiksu sezonu (stare zasady) nie jest już zapisywany.
    expect((await adminFirestore().doc('leaderboard/' + reply.week + '/entries/' + ctx.uid).get()).exists).toBe(false);
    const savedRun = await adminFirestore().doc('runs/' + started.runId).get();
    expect(savedRun.get('flagged')).toBe(false);
    expect(savedRun.get('rulesVersion')).toBe(RULES_VERSION);
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
    const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Warsaw' });
    expect((await adminFirestore().doc('daily/' + seasonKey(today) + '/entries/' + ctx.uid).get()).exists).toBe(true);
  });

  it('startRun odrzuca klienta bez wersji zasad lub ze starszą wersją', async () => {
    const ctx = await session();
    const route = { mode: 'ranked' as const, home: 'BE' as const, from: 'bruksela', to: 'rzeszow' };
    await expect(ctx.rawStart(route)).rejects.toMatchObject({ code: 'functions/failed-precondition' });
    await expect(ctx.rawStart({ ...route, rulesVersion: RULES_VERSION - 1 }))
      .rejects.toMatchObject({ code: 'functions/failed-precondition' });
  });

  it('submitRun odrzuca przejazd ze starszą wersją zasad jako old_rules', async () => {
    const ctx = await session();
    const legacy = (await ctx.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    // Przejazd sprzed wersjonowania: dokument runs bez pola rulesVersion.
    await adminFirestore().doc('runs/' + legacy.runId).update({
      issuedAt: Date.now() - 10_000, rulesVersion: FieldValue.delete(),
    });
    const reply = (await ctx.submit({ runId: legacy.runId, ...finishedRun(legacy.seed) })).data;
    expect(reply).toMatchObject({ accepted: false, reason: 'old_rules' });

    const other = await session();
    const started = (await other.start({ mode: 'ranked', home: 'BE', from: 'bruksela', to: 'rzeszow' })).data;
    await ageRun(started.runId);
    const stale = (await other.submit({ runId: started.runId, ...finishedRun(started.seed), rulesVersion: RULES_VERSION - 1 })).data;
    expect(stale).toMatchObject({ accepted: false, reason: 'old_rules' });
  });

  it('przyjmuje nowy kraj (IE) i zaczyna rekord gracza od zera w nowym sezonie', async () => {
    const ctx = await session();
    // Rekord z poprzedniego sezonu nie przechodzi do nowego.
    await adminFirestore().doc('players/' + ctx.uid).set({ nickId: 'x', home: 'BE', bestKm: 99_999, perfectStreak: 4 });
    const started = (await ctx.start({ mode: 'ranked', home: 'IE', from: 'dublin', to: 'warszawa' })).data;
    await ageRun(started.runId);
    const run = finishedRun(started.seed, 'IE', 'dublin', 'warszawa');
    const reply = (await ctx.submit({ runId: started.runId, ...run })).data;
    expect(reply).toMatchObject({ accepted: true, km: run.km, playerBestKm: run.km });
    const league = await adminFirestore().doc('league/' + seasonKey(reply.week)).get();
    expect(league.get('countries.IE.runs')).toBeGreaterThanOrEqual(1);
    await expect(ctx.start({ mode: 'ranked', home: 'IE', from: 'bruksela', to: 'warszawa' }))
      .rejects.toMatchObject({ code: 'functions/invalid-argument' });
  });
});
