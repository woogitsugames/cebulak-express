import { describe, expect, it } from 'vitest';
import { BAGGAGE_GATE, DIFFICULTY, KM_PER_PX, OBSTACLE, PLAYER, WORLD } from '../src/core/config';
import { ObstacleField, effectiveGapH, reachableShift } from '../src/core/obstacles';

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

  it('co około 300 km pojawia się bramka, z malejącą szczeliną dla wag 0 i 1', () => {
    const f = new ObstacleField(17);
    f.ensureAhead(50000, 0.75);
    const gates = f.obstacles.filter((o) => o.gate);
    expect(gates.length).toBeGreaterThanOrEqual(3);
    const intervalPx = BAGGAGE_GATE.everyKm / KM_PER_PX;
    gates.forEach((gate, index) => {
      expect(gate.x).toBeGreaterThanOrEqual((index + 1) * intervalPx);
      expect(gate.x).toBeLessThan((index + 1) * intervalPx + DIFFICULTY.spacing[0] + 1);
      expect(effectiveGapH(gate, 1)).toBeLessThan(effectiveGapH(gate, 0));
      for (const weight of [0, 1]) {
        const h = effectiveGapH(gate, weight);
        expect(h).toBeGreaterThan(PLAYER.hitH + 90);
        expect(gate.gapY - h / 2).toBeGreaterThan(WORLD.ceilingY);
        expect(gate.gapY + h / 2).toBeLessThan(WORLD.groundY);
      }
    });
  });

  it('dopuszczalna zmiana środka szczeliny uwzględnia w pełni ciężką bramkę', () => {
    for (const difficulty of [0, 0.5, 1]) {
      const field = new ObstacleField(7);
      field.ensureAhead(25000, difficulty);
      const spacing = DIFFICULTY.spacing[0] + (DIFFICULTY.spacing[1] - DIFFICULTY.spacing[0]) * difficulty;
      const speed = DIFFICULTY.speed[0] + (DIFFICULTY.speed[1] - DIFFICULTY.speed[0]) * difficulty;
      const safeReach = reachableShift(spacing, speed, BAGGAGE_GATE.minGapH);
      const obstacles = field.obstacles;
      for (let i = 1; i < obstacles.length; i++) {
        if (!obstacles[i].gate && !obstacles[i - 1].gate) continue;
        const shift = obstacles[i].gapY - obstacles[i - 1].gapY;
        expect(shift).toBeGreaterThanOrEqual(-safeReach.up - 1e-8);
        // Cięższy bagaż zwiększa opadanie, więc limit w dół nie jest ostrzejszy.
        expect(shift).toBeLessThanOrEqual(
          reachableShift(spacing, speed, BAGGAGE_GATE.minGapH, PLAYER.gravity * 1.45).down + 1e-8,
        );
      }
    }
  });

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
