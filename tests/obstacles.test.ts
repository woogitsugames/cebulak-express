import { describe, expect, it } from 'vitest';
import { DIFFICULTY, OBSTACLE, WORLD } from '../src/core/config';
import { ObstacleField } from '../src/core/obstacles';

describe('generator przeszkód', () => {
  it('ten sam seed = identyczny układ (wyzwanie dnia)', () => {
    const a = new ObstacleField(123);
    const b = new ObstacleField(123);
    a.ensureAhead(20000, 0.5);
    b.ensureAhead(20000, 0.5);
    expect(a.obstacles).toEqual(b.obstacles);
    expect(a.pickups).toEqual(b.pickups);
  });

  it('inny seed = inny układ', () => {
    const a = new ObstacleField(1);
    const b = new ObstacleField(2);
    a.ensureAhead(5000, 0);
    b.ensureAhead(5000, 0);
    expect(a.obstacles.map((o) => o.gapY)).not.toEqual(b.obstacles.map((o) => o.gapY));
  });

  it('pierwsza przeszkoda daleko od startu', () => {
    const f = new ObstacleField(5);
    f.ensureAhead(2000, 0);
    expect(f.obstacles[0].x).toBe(OBSTACLE.firstX);
  });

  for (const difficulty of [0, 0.5, 1]) {
    it(`szczeliny zawsze w obszarze gry i z ograniczonym skokiem (trudność ${difficulty})`, () => {
      for (let seed = 1; seed <= 50; seed++) {
        const f = new ObstacleField(seed);
        f.ensureAhead(60000, difficulty);
        const maxShift = DIFFICULTY.maxGapShift[0] + (DIFFICULTY.maxGapShift[1] - DIFFICULTY.maxGapShift[0]) * difficulty;
        let prev = WORLD.groundY / 2;
        for (const o of f.obstacles) {
          expect(o.gapY - o.gapH / 2).toBeGreaterThan(WORLD.ceilingY);
          expect(o.gapY + o.gapH / 2).toBeLessThan(WORLD.groundY);
          expect(Math.abs(o.gapY - prev)).toBeLessThanOrEqual(maxShift + 1e-9);
          prev = o.gapY;
        }
      }
    });
  }

  it('znajdźki między przeszkodami, nie w nich', () => {
    const f = new ObstacleField(9);
    f.ensureAhead(30000, 0.5);
    expect(f.pickups.length).toBeGreaterThan(10);
    for (const p of f.pickups) {
      const inside = f.obstacles.some((o) => p.x > o.x && p.x < o.x + OBSTACLE.width);
      expect(inside).toBe(false);
    }
  });

  it('prune usuwa obiekty za ekranem', () => {
    const f = new ObstacleField(3);
    f.ensureAhead(10000, 0);
    f.prune(5000);
    expect(f.obstacles.every((o) => o.x + OBSTACLE.width >= 5000)).toBe(true);
  });
});
