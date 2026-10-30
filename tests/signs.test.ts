import { describe, expect, it, vi } from 'vitest';
import { KM_PER_PX, WORLD } from '../src/core/config';
import type { Waypoint } from '../src/content/waypoints';
import type { FunnyPlace } from '../src/content/funny-places';
import { PARALLAX, waypointScreenX } from '../src/render/background';
import {
  SIGN_HEIGHT, SIGN_JOKE_SECONDS, SIGN_TOP_Y, SignsRenderer, drawRoadSign,
  overlapsWaypointPanorama, selectNearestSign, signColors, signPanelWidth,
  signScreenX, signsForWaypoints,
} from '../src/render/signs';

const place: FunnyPlace = {
  id: 'be-deurne', name: 'Deurne', country: 'BE', sign: 'district',
  near: 'antwerpia', offsetKm: 45, soundsLike: 'durne', source: 'https://example.org', joke: 'Deurne? Bagażnik pełny!',
};

const route: Waypoint[] = [
  { id: 'antwerpia', name: 'Antwerpia', country: 'BE', km: 0, kind: 'city', motifs: [], text: '' },
  { id: 'eindhoven', name: 'Eindhoven', country: 'NL', km: 90, kind: 'city', motifs: [], text: '' },
];

function fakeCanvas() {
  return {
    fillRect: vi.fn(), strokeRect: vi.fn(),
    fill: vi.fn(), stroke: vi.fn(),
    save: vi.fn(), restore: vi.fn(), translate: vi.fn(),
    beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(),
    arcTo: vi.fn(), arc: vi.fn(), closePath: vi.fn(),
    fillText: vi.fn(), measureText: vi.fn((text: string) => ({ width: text.length * 11 })),
    lineWidth: 0, fillStyle: '', strokeStyle: '', font: '', textAlign: 'start', textBaseline: 'alphabetic',
  };
}

const asCanvas = (ctx: ReturnType<typeof fakeCanvas>) => ctx as unknown as CanvasRenderingContext2D;

describe('tablice: km i paralaksa near', () => {
  it('przypisuje offset do punktu w wybranej trasie, a nie do dystansu globalnego', () => {
    expect(signsForWaypoints(route, [place])).toEqual([{
      id: 'be-deurne', name: 'Deurne', country: 'BE', kind: 'district', km: 45, joke: place.joke,
    }]);
    const shifted = route.map((point) => ({ ...point, km: point.km + 120 }));
    expect(signsForWaypoints(shifted, [place])[0].km).toBe(165);
    expect(signsForWaypoints([], [place])).toEqual([]);
    expect(signsForWaypoints(route, [{ ...place, country: 'FR' }])).toEqual([]);
    expect(signsForWaypoints(route, [{ ...place, offsetKm: Number.NaN }])).toEqual([]);
    expect(signsForWaypoints(route, [{ ...place, offsetKm: -50 }])).toEqual([]);
  });

  it('pozycja znaku jest obliczana identycznie jak punkt na near', () => {
    expect(signScreenX(45, 45)).toBe(WORLD.width / 2);
    expect(signScreenX(45, 40)).toBeCloseTo(180 + (5 / KM_PER_PX) * PARALLAX.near);
    expect(signScreenX(45, 46)).toBeLessThan(WORLD.width / 2);
    expect(signScreenX(45, 40)).toBe(waypointScreenX(45, 40, PARALLAX.near));
    expect(signPanelWidth('Deurne')).toBe(100);
  });

  it('wybiera jedna najblizsza tablice; remis wygrywa wczesniejszy km', () => {
    const signs = signsForWaypoints(route, [
      { ...place, id: 'a', offsetKm: 40 },
      { ...place, id: 'b', offsetKm: 50 },
    ]);
    expect(selectNearestSign(signs, 45, [])?.id).toBe('a');
    expect(selectNearestSign(signs, 49, [])?.id).toBe('b');
    expect(selectNearestSign(signs, 150, [])).toBeNull();
    expect(selectNearestSign(signs, Number.NaN, [])).toBeNull();
    expect(selectNearestSign([], 45, [])).toBeNull();
  });
});

describe('tablice: brak kolizji z panoramami', () => {
  it('Deurne nie nachodzi na panoramy Antwerpii i Eindhoven w centralnym kadrze', () => {
    const sign = signsForWaypoints(route, [place])[0];
    expect(overlapsWaypointPanorama(sign, 45, route)).toBe(false);
    expect(selectNearestSign([sign], 45, route)).toEqual(sign);
  });

  it('stoi przed panoramą miasta w tle (bliski plan), więc jej nie ukrywa', () => {
    const sign = signsForWaypoints(route, [{ ...place, offsetKm: 10 }])[0];
    expect(overlapsWaypointPanorama(sign, 10, route)).toBe(false);
    expect(selectNearestSign([sign], 10, route)).toEqual(sign);
  });

  it('near granicy i stacji tez wypiera znak, bez przelamywania zasad renderera', () => {
    const border: Waypoint = { id: 'granica', name: 'Granica', km: 45, country: 'PL', kind: 'border', motifs: [], text: '' };
    const sign = signsForWaypoints(route, [place])[0];
    expect(overlapsWaypointPanorama(sign, 45, [...route, border])).toBe(true);
    expect(selectNearestSign([sign], 45, [...route, border])).toBeNull();
  });

});

describe('tablice: wyglad i czas dymka', () => {
  it('kolory rozrozniaja typy i kraje bez oficjalnych logotypow', () => {
    expect(signColors('exit', 'UK').face).toMatch(/^#2/);
    expect(signColors('exit', 'FR').text).toBe('#fff8e8');
    expect(signColors('town', 'DE').face).not.toBe(signColors('town', 'FR').face);
    expect(signColors('district', 'UK').face).not.toBe(signColors('district', 'BE').face);
  });

  it('rysuje slupki, obrys, dopasowany tekst i nie wychodzi ponizej drogi', () => {
    const ctx = fakeCanvas();
    const sign = signsForWaypoints(route, [place])[0];
    drawRoadSign(asCanvas(ctx), sign, 180);
    expect(ctx.translate).toHaveBeenCalledWith(180, 0);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.measureText).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalledWith('Deurne', 0, SIGN_TOP_Y + 25);
    expect(SIGN_TOP_Y + SIGN_HEIGHT).toBeLessThan(WORLD.groundY);
    expect(ctx.fillRect.mock.calls.some(([x, y, w, h]) => x === -4 && y === SIGN_TOP_Y + 36 && w === 8 && y + h === WORLD.groundY)).toBe(true);
  });

  it('dymek pojawia sie po minieciu srodka i gasnie po 2,5 s', () => {
    const ctx = fakeCanvas();
    const renderer = new SignsRenderer([place]);
    const draw = (progressKm: number, timeSec: number, waypoints = route) =>
      renderer.draw(asCanvas(ctx), { progressKm, timeSec, waypoints });
    expect(draw(44.8, 10).joke).toBeNull();
    const crossed = draw(45.1, 10.1);
    expect(crossed.sign?.name).toBe('Deurne');
    expect(crossed.joke).toBe(place.joke);
    expect(draw(55, 12.59).joke).toBe(place.joke);
    expect(draw(56, 12.6).joke).toBeNull();
    expect(SIGN_JOKE_SECONDS).toBe(2.5);
  });

  it('zmiana trasy lub cofniecie resetuje dymek bez ponownego naliczania', () => {
    const renderer = new SignsRenderer([place]);
    const ctx = fakeCanvas();
    const draw = (waypoints: Waypoint[], progressKm: number, timeSec: number) =>
      renderer.draw(asCanvas(ctx), { waypoints, progressKm, timeSec });
    draw(route, 44, 1);
    expect(draw(route, 45, 1.2).joke).toBe(place.joke);
    expect(draw(route, 0, 1.3).joke).toBeNull();
    draw(route, 44, 2);
    expect(draw(route, 45, 2.2).joke).toBe(place.joke);
    expect(draw([], 45, 2.4).joke).toBeNull();
    renderer.reset();
    expect(draw(route, 45, 3).joke).toBeNull();
  });
});
