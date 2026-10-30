import { describe, expect, it } from 'vitest';
import { Rng, seedFromString } from '../src/core/rng';

describe('Rng', () => {
  it('ten sam seed daje ten sam ciąg', () => {
    const a = new Rng(42);
    const b = new Rng(42);
    for (let i = 0; i < 100; i++) expect(a.next()).toBe(b.next());
  });

  it('różne seedy dają różne ciągi', () => {
    expect(new Rng(1).next()).not.toBe(new Rng(2).next());
  });

  it('wartości w [0, 1)', () => {
    const r = new Rng(7);
    for (let i = 0; i < 10000; i++) {
      const v = r.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('seed z daty jest stabilny', () => {
    expect(seedFromString('2026-12-01')).toBe(seedFromString('2026-12-01'));
    expect(seedFromString('2026-12-01')).not.toBe(seedFromString('2026-12-02'));
  });
});
