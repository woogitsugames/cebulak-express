import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, LEGS, PL_CITIES, START_CITIES, countryAt, haversineKm, makeRoute } from '../src/core/route';

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

  it('każdy kraj ma miasta i odcinki sumujące się do 1, kończące się w Polsce', () => {
    for (const home of HOME_COUNTRIES) {
      expect(START_CITIES[home].length).toBeGreaterThanOrEqual(3);
      const sum = LEGS[home].reduce((s, l) => s + l.share, 0);
      expect(sum).toBeCloseTo(1, 9);
      expect(LEGS[home][0].country).toBe(home);
      expect(LEGS[home].at(-1)!.country).toBe('PL');
    }
  });

  it('countryAt przechodzi przez kraje po kolei', () => {
    const r = makeRoute('BE', 'bruksela', 'warszawa');
    expect(countryAt(r, 0)).toBe('BE');
    expect(countryAt(r, r.totalKm * 0.3)).toBe('DE');
    expect(countryAt(r, r.totalKm * 0.9)).toBe('PL');
    expect(countryAt(r, r.totalKm + 100)).toBe('PL');
  });

  it('nieznane miasto rzuca błąd', () => {
    expect(() => makeRoute('BE', 'xxx', 'rzeszow')).toThrow();
  });
});
