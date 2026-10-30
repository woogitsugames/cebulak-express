import { describe, expect, it, vi } from 'vitest';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, countryAt, makeRoute, type HomeCountry } from '../src/core/route';
import { COUNTRY_LOCATIVE, COUNTRY_NAME, BORDER_TEXTS } from '../src/content/pl';
import { ROUTE_WAYPOINTS, type Waypoint } from '../src/content/waypoints';
import { PALETTES } from '../src/render/palette';
import { BackgroundRenderer } from '../src/render/background';
import { type AssetLoader } from '../src/render/assets';

const NEW_HOMES = ['IE', 'ES', 'IT', 'AT', 'SE', 'FI', 'LU'] as const satisfies readonly HomeCountry[];
const TRANSIT = ['CZ', 'EE', 'LV', 'LT'] as const;
const CORRIDORS = {
  IE: ['rosslare', 'prom-irlandia-francja', 'cherbourg', 'granica-jedrzychowice'],
  ES: ['barcelona', 'perpignan', 'lyon', 'drezno', 'granica-jedrzychowice'],
  IT: ['tarvisio', 'villach', 'graz', 'brno', 'granica-cieszyn'],
  AT: ['wieden', 'brno', 'ostrawa', 'granica-cieszyn'],
  SE: ['ystad', 'prom-baltyk', 'swinoujscie', 'stacja-swinoujscie'],
  FI: ['prom-zatoka-finska', 'tallinn', 'ryga', 'kowno', 'stacja-budzisko'],
  LU: ['trier', 'frankfurt-main', 'drezno', 'stacja-jedrzychowice'],
} as const;

describe('zlecenie 55 — kraje, trasy, km i fallback', () => {
  it('ma dokładnie siedem nowych krajów zamieszkania i po trzy miasta', () => {
    expect(HOME_COUNTRIES).toHaveLength(15);
    for (const home of NEW_HOMES) {
      expect(HOME_COUNTRIES).toContain(home);
      expect(START_CITIES[home]).toHaveLength(3);
      expect(COUNTRY_NAME[home]).toBeTruthy();
      expect(COUNTRY_LOCATIVE[home]).toBeTruthy();
      expect(BORDER_TEXTS[home]).toHaveLength(4);
      expect(PALETTES[home]).toBeDefined();
      expect(new Set(START_CITIES[home].map((city) => city.id)).size).toBe(3);
    }
    for (const code of TRANSIT) {
      expect(COUNTRY_NAME[code]).toBeTruthy();
      expect(COUNTRY_LOCATIVE[code]).toBeTruthy();
      expect(BORDER_TEXTS[code]).toHaveLength(4);
      expect(PALETTES[code]).toBeDefined();
    }
  });

  it('zachowuje prawidłową kolejność miast, promów i km w korytarzach', () => {
    for (const home of NEW_HOMES) {
      const points = ROUTE_WAYPOINTS[home];
      expect(points[0].km).toBe(0);
      expect(points.at(-1)?.kind).toBe('rest');
      expect(points.at(-1)?.country).toBe('PL');
      for (let i = 1; i < points.length; i++) {
        expect(points[i].km).toBeGreaterThan(points[i - 1].km);
      }
      const seq = CORRIDORS[home].map((id) => points.findIndex((p) => p.id === id));
      expect(seq.every((index) => index >= 0)).toBe(true);
      for (let i = 1; i < seq.length; i++) expect(seq[i]).toBeGreaterThan(seq[i - 1]);
      for (const point of points) {
        expect(point.text.length).toBeGreaterThan(0);
        expect(point.motifs.length).toBeGreaterThan(0);
      }
    }
  });

  it('sprawdza wszystkie nowe kombinacje startów i polskich celów', () => {
    for (const home of NEW_HOMES) {
      for (const city of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const r = makeRoute(home, city.id, to.id);
          expect(r.home).toBe(home);
          expect(r.waypoints[0].id).toBe(city.id);
          expect(r.waypoints[0].km).toBe(0);
          expect(r.waypoints.at(-1)?.id).toBe('dom-' + to.id);
          expect(r.totalKm).toBeGreaterThan(150);
          expect(r.totalKm).toBeLessThan(3800);
          expect(r.totalKm % 10).toBe(0);
          const stops = r.waypoints.filter(p => p.kind === 'rest');
          expect(stops).toHaveLength(1);
          expect(stops[0].country).toBe('PL');
          for (let i = 1; i < r.waypoints.length; i++) {
            expect(r.waypoints[i].km, home + ' ' + city.id + ' ' + to.id).toBeGreaterThanOrEqual(r.waypoints[i-1].km);
          }
          expect(countryAt(r, r.totalKm)).toBe('PL');
        }
      }
    }
  });

  it('sprawdza realne przeprawy i wejścia do Polski', () => {
    const se = makeRoute('SE', 'sztokholm', 'gdansk');
    expect(se.waypoints.some(p => p.id === 'ystad' && p.kind === 'crossing')).toBe(true);
    expect(se.waypoints.some(p => p.id === 'swinoujscie' && p.country === 'PL')).toBe(true);
    const fi = makeRoute('FI', 'helsinki', 'warszawa');
    expect(fi.waypoints.some(p => p.id === 'prom-zatoka-finska' && p.country === 'FI')).toBe(true);
    for (const code of ['EE','LV','LT','PL']) expect(fi.waypoints.some(p => p.country === code)).toBe(true);
    expect(fi.waypoints.some(p => p.id === 'stacja-budzisko')).toBe(true);
    const ie = makeRoute('IE', 'dublin', 'warszawa');
    expect(ie.waypoints.some(p => p.id === 'prom-irlandia-francja')).toBe(true);
    expect(ie.waypoints.some(p => p.id === 'cherbourg' && p.country === 'FR')).toBe(true);
    const it = makeRoute('IT', 'mediolan', 'krakow');
    expect(it.waypoints.some(p => p.country === 'AT')).toBe(true);
    expect(it.waypoints.some(p => p.country === 'CZ')).toBe(true);
    expect(it.waypoints.some(p => p.id === 'stacja-cieszyn')).toBe(true);
  });

  it('zachowuje modelowe dystanse wzorcowe i zróżnicowane starty', () => {
    const samples = [
      ['IE','dublin','2193'], ['ES','barcelona','1808'],
      ['IT','mediolan','1185'], ['AT','wieden','305'],
      ['SE','sztokholm','795'], ['FI','helsinki','790'],
      ['LU','luksemburg','888'],
    ] as const;
    for (const [home, from, rest] of samples) {
      const points = makeRoute(home, from, 'warszawa').waypoints;
      expect(points.find(p => p.kind === 'rest')?.km).toBe(Number(rest));
    }
    expect(makeRoute('IE','cork','warszawa').totalKm).not.toBe(makeRoute('IE','dublin','warszawa').totalKm);
    expect(makeRoute('IT','rzym','warszawa').totalKm).toBeGreaterThan(makeRoute('IT','mediolan','warszawa').totalKm);
  });

  it('renderer nie wymaga PNG do nowych krajów: rysuje zaślepki Canvas', () => {
    const assets = {
      prime: vi.fn(),
      getCountryLayer: vi.fn(() => undefined),
      getLandmark: vi.fn(() => undefined),
      getBorderNear: vi.fn(() => undefined),
    } as unknown as AssetLoader;
    const gradient = { addColorStop: vi.fn() };
    const ctx = {
      save: vi.fn(), restore: vi.fn(), fillRect: vi.fn(), beginPath: vi.fn(),
      moveTo: vi.fn(), lineTo: vi.fn(), arc: vi.fn(), closePath: vi.fn(),
      fill: vi.fn(), createLinearGradient: vi.fn(() => gradient),
      fillStyle: '', globalAlpha: 1,
    };
    const renderer = new BackgroundRenderer(assets);
    for (let i = 0; i < NEW_HOMES.length; i++) {
      expect(() => renderer.drawBackground(ctx as unknown as CanvasRenderingContext2D, {
        country: NEW_HOMES[i], distancePx: 0, progressKm: 0,
        waypoints: [] as Waypoint[], timeSec: i * 2,
      })).not.toThrow();
    }
    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.createLinearGradient).toHaveBeenCalled();
  });
});
