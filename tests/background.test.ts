import { describe, expect, it } from 'vitest';
import { KM_PER_PX, WORLD } from '../src/core/config';
import type { Waypoint } from '../src/content/waypoints';
import {
  PARALLAX, COUNTRY_FADE_SECONDS, crossedWaypoints, fadeProgress, layerOffset,
  tilePositions, visibleWaypoints, waypointScreenX,
} from '../src/render/background';

const waypoints: Waypoint[] = [
  { id: 'start', name: 'Start', km: 0, country: 'BE', kind: 'city', motifs: [], text: '' },
  { id: 'leuven', name: 'Leuven', km: 28, country: 'BE', kind: 'city', motifs: [], text: '' },
  { id: 'granica', name: 'Granica', km: 45, country: 'DE', kind: 'border', motifs: [], text: '' },
  { id: 'miasto', name: 'Miasto', km: 70, country: 'DE', kind: 'city', motifs: [], text: '' },
];

describe('tło: matematyka niezależna od Canvas', () => {
  it('przesunięcia paralaksy odpowiadają dokładnie współczynnikom', () => {
    expect(PARALLAX).toEqual({ sky: 0, clouds: 0.15, far: 0.25, near: 0.5, road: 1 });
    for (const factor of Object.values(PARALLAX)) {
      expect(layerOffset(100, factor, 720)).toBeCloseTo(100 * factor);
    }
    expect(layerOffset(-10, 1, 360)).toBe(350);
    expect(layerOffset(1440, 0.5, 720)).toBe(0);
  });

  it('kafelki wypełniają ekran również na granicy powtórzenia', () => {
    for (const distance of [0, 1, 360, 720, 123_456, -25]) {
      const positions = tilePositions(distance, PARALLAX.road, 360);
      expect(positions.length).toBeGreaterThanOrEqual(1);
      expect(positions[0]).toBeLessThanOrEqual(0);
      for (let i = 1; i < positions.length; i++) expect(positions[i] - positions[i - 1]).toBe(360);
      expect(positions.at(-1)! + 360).toBeGreaterThanOrEqual(WORLD.width);
    }
    expect(tilePositions(10, 0.25, 0)).toEqual([]);
  });

  it('sylwetka trafia dokładnie w środek ekranu przy swoim km', () => {
    for (const w of waypoints) {
      expect(waypointScreenX(w.km, w.km)).toBe(WORLD.width / 2);
    }
    const shifted = waypointScreenX(28, 27);
    expect(shifted).toBeCloseTo(WORLD.width / 2 + PARALLAX.far / KM_PER_PX);
    expect(waypointScreenX(28, 29)).toBeLessThan(WORLD.width / 2);
  });

  it('nie renderuje sylwetek poza ekranem z marginesem panoramy', () => {
    expect(visibleWaypoints(waypoints, 28).map((w) => w.id)).toContain('leuven');
    expect(visibleWaypoints(waypoints, 28, 0).map((w) => w.id)).not.toContain('miasto');
    expect(visibleWaypoints(waypoints, 500)).toEqual([]);
  });

  it('wykrywa wszystkie przekroczone punkty bez duplikatów', () => {
    expect(crossedWaypoints(waypoints, 0, 28).map((w) => w.id)).toEqual(['leuven']);
    expect(crossedWaypoints(waypoints, 28, 28)).toEqual([]);
    expect(crossedWaypoints(waypoints, 28, 80).map((w) => w.id)).toEqual(['granica', 'miasto']);
    expect(crossedWaypoints(waypoints, 45, 0)).toEqual([]);
  });

  it('przenikanie trwa 1,5 sekundy i jest ograniczone do 0..1', () => {
    expect(COUNTRY_FADE_SECONDS).toBe(1.5);
    expect(fadeProgress(1, 2)).toBe(0);
    expect(fadeProgress(2, 2)).toBe(0);
    expect(fadeProgress(2.75, 2)).toBe(0.5);
    expect(fadeProgress(3.5, 2)).toBe(1);
    expect(fadeProgress(100, 2)).toBe(1);
    expect(fadeProgress(2, 2, 0)).toBe(1);
  });
});
