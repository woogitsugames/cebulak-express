import { describe, expect, it } from 'vitest';
import { TICK } from '../src/core/config';
import type { Game } from '../src/core/game';
import { PoseHistory, interpolatePose, renderAlpha } from '../src/render/interpolation';
import { botStep, newGame } from './helpers';

/** Pętla jak w main.ts (stały krok + akumulator) przy idealnym vsync o częstotliwości hz. */
function simulate(hz: number, frames: number, interpolate: boolean): { xs: number[]; game: Game } {
  const game = newGame(7, 'cozy');
  const history = new PoseHistory<Game>();
  game.flap();
  let acc = 0;
  const xs: number[] = [];
  for (let f = 0; f < frames; f++) {
    acc += 1 / hz;
    let steps = 0;
    while (acc >= TICK && steps < 24) {
      history.beforeTick(game);
      botStep(game);
      game.tick();
      acc -= TICK;
      steps++;
    }
    xs.push(interpolate ? history.pose(game, renderAlpha(acc, TICK)).distancePx : game.distancePx);
  }
  return { xs, game };
}

/** Odchylenie przyrostów na klatkę względem średniej; pomija ruszanie z miejsca w pierwszych klatkach. */
function unevenness(all: number[]): number {
  const xs = all.slice(3);
  const dx = xs.slice(1).map((x, i) => x - xs[i]);
  const mean = dx.reduce((a, b) => a + b, 0) / dx.length;
  const std = Math.sqrt(dx.reduce((a, b) => a + (b - mean) ** 2, 0) / dx.length);
  return std / mean;
}

describe('interpolacja renderu', () => {
  it('liczy pozycję pośrednią i obcina alfę do 0..1', () => {
    const prev = { distancePx: 100, y: 200, vy: -50 };
    const cur = { distancePx: 102, y: 196, vy: -40 };
    expect(interpolatePose(prev, cur, 0.25)).toEqual({ distancePx: 100.5, y: 199, vy: -47.5 });
    expect(interpolatePose(prev, cur, -1)).toEqual(prev);
    expect(interpolatePose(prev, cur, 7)).toEqual(cur);
    expect(interpolatePose(prev, cur, Number.NaN)).toEqual(cur);
    expect(interpolatePose(null, cur, 0.5)).toEqual(cur);
    expect(renderAlpha(TICK / 2, TICK)).toBeCloseTo(0.5);
    expect(renderAlpha(-1e-12, TICK)).toBe(0);
    expect(renderAlpha(TICK * 3, TICK)).toBe(1);
  });

  it('nowa instancja gry nie dziedziczy pozycji poprzedniego przejazdu', () => {
    const history = new PoseHistory<Game>();
    const a = newGame(1);
    a.flap();
    for (let i = 0; i < 50; i++) { history.beforeTick(a); a.tick(); }
    const b = newGame(1);
    expect(history.pose(b, 0)).toMatchObject({ distancePx: 0, y: b.y });
  });

  for (const hz of [60, 90, 120, 144]) {
    it(`${hz} Hz: przesuw tła na klatkę jest równy, a rozgrywka bez zmian`, () => {
      const frames = Math.round(hz * 1.5);
      const plain = simulate(hz, frames, false);
      const smooth = simulate(hz, frames, true);
      // Logika gry identyczna: ta sama pozycja, tick i wynik po tej samej liczbie klatek.
      expect(smooth.game.ticks).toBe(plain.game.ticks);
      expect(smooth.game.distancePx).toBe(plain.game.distancePx);
      expect(smooth.game.y).toBe(plain.game.y);
      // Bez interpolacji 90/144 Hz daje kroki 1-1-2 / 1-1-0… ticku (odchylenie ≥ 30%).
      if (hz === 90 || hz === 144) expect(unevenness(plain.xs)).toBeGreaterThan(0.3);
      expect(unevenness(smooth.xs)).toBeLessThan(0.01);
    });
  }
});
