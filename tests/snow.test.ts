import { afterEach, describe, expect, it, vi } from 'vitest';
import { WORLD } from '../src/core/config';
import { createSnow, type SnowEffect } from '../src/render/snow';

type Flake = [number, number, number];

function capture(effect: SnowEffect): { flakes: Flake[]; fills: string[] } {
  const flakes: Flake[] = [];
  const fills: string[] = [];
  const ctx = {
    fillStyle: '',
    save() {},
    restore() {},
    beginPath() {},
    moveTo() {},
    arc(x: number, y: number, radius: number) { flakes.push([x, y, radius]); },
    fill() { fills.push(this.fillStyle); },
  } as unknown as CanvasRenderingContext2D;
  effect.draw(ctx);
  return { flakes, fills };
}

afterEach(() => vi.unstubAllGlobals());

describe('opad śniegu', () => {
  it('rysuje 96 płatków w dwóch warstwach o różnych rozmiarach i jasności', () => {
    const { flakes, fills } = capture(createSnow(7));
    expect(flakes).toHaveLength(96);
    expect(fills).toEqual(['rgba(255,255,255,0.64)', 'rgba(255,255,255,0.94)']);
    expect(flakes.slice(0, 60).every((f) => f[2] >= 0.55 && f[2] <= 1.15)).toBe(true);
    expect(flakes.slice(60).every((f) => f[2] >= 1.3 && f[2] <= 2.3)).toBe(true);
  });

  it('jest powtarzalny dla ziarna i nie używa Math.random w animacji', () => {
    const a = createSnow(7);
    const b = createSnow(7);
    const c = createSnow(8);
    expect(capture(a).flakes).toEqual(capture(b).flakes);
    expect(capture(a).flakes).not.toEqual(capture(c).flakes);
    const random = vi.spyOn(Math, 'random').mockImplementation(() => { throw new Error('Nie używaj Math.random'); });
    a.update(0.016);
    b.update(0.016);
    a.update(1 / 30);
    b.update(1 / 30);
    expect(capture(a).flakes).toEqual(capture(b).flakes);
    random.mockRestore();
  });

  it('zawija płatki także po długiej przerwie i ignoruje błędny dt', () => {
    const snow = createSnow(27);
    const initial = capture(snow).flakes;
    for (const dt of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) snow.update(dt);
    expect(capture(snow).flakes).toEqual(initial);
    snow.update(270);
    const moved = capture(snow).flakes;
    expect(moved).not.toEqual(initial);
    for (const [x, y] of moved) {
      expect(x).toBeGreaterThanOrEqual(-12);
      expect(x).toBeLessThan(WORLD.width + 12);
      expect(y).toBeGreaterThanOrEqual(-12);
      expect(y).toBeLessThan(WORLD.height + 12);
    }
  });

  it('szanuje prefers-reduced-motion także po zmianie ustawienia', () => {
    const preference = { matches: false };
    const matcher = vi.fn(() => preference);
    vi.stubGlobal('matchMedia', matcher);
    const snow = createSnow(7);
    const initial = capture(snow).flakes;
    expect(matcher).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    preference.matches = true;
    snow.update(10);
    expect(capture(snow).flakes).toEqual([]);
    preference.matches = false;
    expect(capture(snow).flakes).toEqual(initial);
    snow.update(0.1);
    expect(capture(snow).flakes).not.toEqual(initial);
  });
});
