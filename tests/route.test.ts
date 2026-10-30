import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, countryAt, haversineKm, makeRoute } from '../src/core/route';

describe('trasy i dystans', () => {
  it('haversine: Warszawa–Kraków ok. 250 km w linii prostej', () => {
    const waw = PL_CITIES.find((c) => c.id === 'warszawa')!;
    const krk = PL_CITIES.find((c) => c.id === 'krakow')!;
    const d = haversineKm(waw, krk);
    expect(d).toBeGreaterThan(240);
    expect(d).toBeLessThan(260);
  });

  it('Antwerpia → Rzeszów: rozsądny dystans drogowy', () => {
    const r = makeRoute('BE', 'antwerpia', 'rzeszow');
    expect(r.totalKm).toBeGreaterThan(1200);
    expect(r.totalKm).toBeLessThan(1600);
    expect(r.totalKm % 10).toBe(0);
  });

  it('każda trasa z każdego miasta do każdego celu jest poprawna', () => {
    for (const home of HOME_COUNTRIES) {
      expect(START_CITIES[home].length).toBeGreaterThanOrEqual(3);
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const r = makeRoute(home, from.id, to.id);
          const wps = r.waypoints;
          expect(wps[0].km).toBe(0);
          expect(wps.at(-1)!.id).toBe(`dom-${to.id}`);
          expect(wps.at(-1)!.km).toBe(r.totalKm);
          for (let i = 1; i < wps.length; i++) expect(wps[i].km).toBeGreaterThanOrEqual(wps[i - 1].km);
          expect(wps.some((w) => w.kind === 'rest' && w.country === 'PL')).toBe(true);
          expect(r.totalKm).toBeGreaterThan(150);
          expect(r.totalKm).toBeLessThan(3800);
        }
      }
    }
  });

  it('id miast są unikalne', () => {
    const ids = PL_CITIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Bruksela → Siemiatycze: przez Kolonię, Hanower, Berlin, Świecko', () => {
    const r = makeRoute('BE', 'bruksela', 'siemiatycze');
    const ids = r.waypoints.map((w) => w.id);
    for (const id of ['kolonia', 'dusseldorf', 'hanower', 'berlin', 'granica-swiecko', 'stacja-swiecko']) expect(ids).toContain(id);
    expect(ids).toContain('warszawa');
    expect(ids.at(-1)).toBe('dom-siemiatycze');
  });

  it('Monachium dołącza do trasy przez Norymbergę i Drezno', () => {
    const r = makeRoute('DE', 'monachium', 'wroclaw');
    const ids = r.waypoints.map((w) => w.id);
    expect(ids[0]).toBe('monachium');
    expect(ids).toContain('norymberga');
    expect(ids).toContain('granica-jedrzychowice');
  });

  it('countryAt przechodzi przez kraje po kolei', () => {
    const r = makeRoute('BE', 'bruksela', 'warszawa');
    expect(countryAt(r, 0)).toBe('BE');
    expect(countryAt(r, 300)).toBe('DE');
    expect(countryAt(r, r.totalKm - 50)).toBe('PL');
    expect(countryAt(r, r.totalKm + 100)).toBe('PL');
  });

  it('nieznane miasto rzuca błąd', () => {
    expect(() => makeRoute('BE', 'xxx', 'rzeszow')).toThrow();
  });
});
