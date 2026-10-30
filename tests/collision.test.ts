import { describe, expect, it } from 'vitest';
import { rectCircleOverlap, rectsOverlap } from '../src/core/collision';

describe('kolizje', () => {
  const r = { x: 0, y: 0, w: 10, h: 10 };

  it('prostokąty nachodzące', () => {
    expect(rectsOverlap(r, { x: 5, y: 5, w: 10, h: 10 })).toBe(true);
  });

  it('prostokąty stykające się krawędzią nie kolidują', () => {
    expect(rectsOverlap(r, { x: 10, y: 0, w: 5, h: 5 })).toBe(false);
  });

  it('koło przy rogu', () => {
    expect(rectCircleOverlap(r, 13, 13, 4)).toBe(false);
    expect(rectCircleOverlap(r, 12, 12, 4)).toBe(true);
  });

  it('koło w środku', () => {
    expect(rectCircleOverlap(r, 5, 5, 1)).toBe(true);
  });
});
