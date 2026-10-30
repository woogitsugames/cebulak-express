import { describe, expect, it } from 'vitest';
import { TICK } from '../src/core/config';
import { randomNickChoices } from '../src/content/nicks';
import { Game } from '../src/core/game';
import { makeRoute } from '../src/core/route';
import { seedFromString } from '../src/core/rng';
import { MockRankingApi, createRankingApi, type SubmitRunRequest } from '../src/net/api';

const validNickId = randomNickChoices(() => 0.12, 1, 'BE')[0];

function finishedRun(seed: number, runId: string): { ticks: number; km: number; flapTicks: number[]; nickId: string; runId: string } {
  const game = new Game({ seed, mode: 'ranked', route: makeRoute('BE', 'antwerpia', 'rzeszow') });
  game.flap();
  while (game.phase === 'playing' && game.ticks < 120 * 60) game.tick();
  expect(game.phase).toBe('over');
  return { runId, flapTicks: [...game.flapTicks], ticks: game.ticks, km: game.km, nickId: validNickId };
}

describe('wybór klienta', () => {
  it('bez kompletnej konfiguracji nie próbuje inicjalizować Firebase', () => {
    expect(createRankingApi({}).kind).toBe('mock');
    expect(createRankingApi({ VITE_FIREBASE_API_KEY: 'test' }).kind).toBe('mock');
    expect(createRankingApi({
      VITE_FIREBASE_API_KEY: 'key', VITE_FIREBASE_AUTH_DOMAIN: 'domain',
      VITE_FIREBASE_PROJECT_ID: 'project', VITE_FIREBASE_APP_ID: 'app',
    }).kind).toBe('firebase');
  });
});

describe('MockRankingApi', () => {
  it('przyjmuje poprawny przejazd, aktualizuje ligę i blokuje duplikat', async () => {
    let now = Date.parse('2026-10-30T12:00:00Z');
    const api = new MockRankingApi({ demo: false, now: () => now, seed: () => 77 });
    const start = await api.startRun({ mode: 'ranked', home: 'BE', from: 'antwerpia', to: 'rzeszow' });
    expect(start.seed).toBe(77);
    const result = finishedRun(start.seed, start.runId);
    expect((await api.submitRun(result)).reason).toBe('too_fast');
    now += Math.ceil(result.ticks * TICK * 1000) + 1500;
    const accepted = await api.submitRun(result);
    expect(accepted.accepted).toBe(true);
    expect(accepted.playerBestKm).toBe(result.km);
    expect((await api.submitRun(result)).reason).toBe('duplicate');
    const league = await api.getLeague(accepted.week);
    expect(league.countries.BE).toEqual({ km: result.km, runs: 1, players: 1 });
    expect((await api.getLeaderboard(accepted.week, 5))[0]).toMatchObject({ nickId: validNickId, home: 'BE', bestKm: result.km });
    expect((await api.getDaily('2026-10-30')).entries).toEqual([]);
    league.countries.BE!.km = 99999;
    expect((await api.getLeague(accepted.week)).countries.BE!.km).toBe(result.km);
  });
  it('wyzwanie dnia ma stabilne ziarno, nie zwiększa sumy ligi', async () => {
    let now = Date.parse('2026-10-30T12:00:00Z');
    const api = new MockRankingApi({ demo: false, now: () => now });
    const req = { mode: 'daily' as const, home: 'BE' as const, from: 'antwerpia', to: 'rzeszow', daily: '2026-10-30' };
    const first = await api.startRun(req);
    const second = await api.startRun(req);
    expect(first.seed).toBe(seedFromString('daily:2026-10-30'));
    expect(second.seed).toBe(first.seed);
    const run = finishedRun(first.seed, first.runId);
    now += Math.ceil(run.ticks * TICK * 1000) + 1500;
    const submitted = await api.submitRun(run);
    expect(submitted.accepted).toBe(true);
    expect((await api.getDaily(req.daily)).entries[0].km).toBe(run.km);
    expect((await api.getLeague(submitted.week)).countries).toEqual({});
  });
  it('odrzuca fałszywy wynik i nick spoza poprawnego formatu', async () => {
    let now = Date.parse('2026-10-30T12:00:00Z');
    const api = new MockRankingApi({ demo: false, now: () => now, seed: () => 42 });
    const start = await api.startRun({ mode: 'ranked', home: 'BE', from: 'antwerpia', to: 'rzeszow' });
    const run = finishedRun(start.seed, start.runId);
    now += Math.ceil(run.ticks * TICK * 1000) + 1500;
    expect((await api.submitRun({ ...run, nickId: 'dowolne imię gracza' })).reason).toBe('bad_nick');
    expect((await api.submitRun({ ...run, km: run.km + 500 } satisfies SubmitRunRequest)).reason).toBe('replay_mismatch');
    expect((await api.submitRun(run)).accepted).toBe(true);
  });
});
