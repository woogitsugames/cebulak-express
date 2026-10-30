import { describe, expect, it } from 'vitest';
import { DAILY_TITLES, dailyKey, dailyRoute, dailySeed, dailyTitle } from '../src/core/daily';
import { ObstacleField } from '../src/core/obstacles';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES } from '../src/core/route';
import { seedFromString } from '../src/core/rng';

describe('wyzwanie dnia', () => {
  it('używa dnia w Warszawie, nie daty UTC ani strefy urządzenia', () => {
    expect(dailyKey(new Date('2026-12-01T00:30:00+01:00'))).toBe('2026-12-01');
    expect(dailyKey(new Date('2026-11-30T23:30:00Z'))).toBe('2026-12-01');
    expect(dailyKey(new Date('2026-12-31T22:59:59Z'))).toBe('2026-12-31');
    expect(dailyKey(new Date('2026-12-31T23:00:00Z'))).toBe('2027-01-01');
    expect(() => dailyKey(new Date(Number.NaN))).toThrow(RangeError);
  });

  it('zmienia dzień o północy w Warszawie przed i po przejściu na czas letni', () => {
    expect(dailyKey(new Date('2027-03-27T22:59:59Z'))).toBe('2027-03-27');
    expect(dailyKey(new Date('2027-03-27T23:00:00Z'))).toBe('2027-03-28');
    expect(dailyKey(new Date('2027-03-28T00:59:59Z'))).toBe('2027-03-28');
    expect(dailyKey(new Date('2027-03-28T01:00:00Z'))).toBe('2027-03-28');
    expect(dailyKey(new Date('2027-03-28T21:59:59Z'))).toBe('2027-03-28');
    expect(dailyKey(new Date('2027-03-28T22:00:00Z'))).toBe('2027-03-29');
  });

  it('nie gubi ani nie dubluje wyzwania przy powtórzonej godzinie jesienią', () => {
    expect(dailyKey(new Date('2027-10-30T21:59:59Z'))).toBe('2027-10-30');
    expect(dailyKey(new Date('2027-10-30T22:00:00Z'))).toBe('2027-10-31');
    expect(dailyKey(new Date('2027-10-31T00:59:59Z'))).toBe('2027-10-31');
    expect(dailyKey(new Date('2027-10-31T01:00:00Z'))).toBe('2027-10-31');
    expect(dailyKey(new Date('2027-10-31T22:59:59Z'))).toBe('2027-10-31');
    expect(dailyKey(new Date('2027-10-31T23:00:00Z'))).toBe('2027-11-01');
  });

  it('seed jest dokładnie hashem daily:YYYY-MM-DD i jest stabilny', () => {
    const key = '2027-03-28';
    const seed = dailySeed(key);
    expect(seed).toBe(seedFromString('daily:' + key));
    expect(seed).toBe(dailySeed(key));
    expect(Number.isInteger(seed)).toBe(true);
    expect(seed).toBeGreaterThanOrEqual(0);
    expect(seed).toBeLessThan(2 ** 32);
    expect(seed).not.toBe(dailySeed('2027-03-29'));
  });

  it('ten sam dzień daje identyczną trasę i układ przeszkód', () => {
    const key = '2026-12-10';
    expect(dailyRoute(key)).toEqual(dailyRoute(key));

    const a = new ObstacleField(dailySeed(key));
    const b = new ObstacleField(dailySeed(key));
    a.ensureAhead(4000, 0.3);
    b.ensureAhead(4000, 0.3);
    expect(a.obstacles).toEqual(b.obstacles);
    expect(a.pickups).toEqual(b.pickups);
    expect(a.obstacles.length).toBeGreaterThan(5);
  });

  it('rotuje wszystkie 15 krajów, miasta startowe i polskie cele', () => {
    const keys = Array.from({ length: 45 }, (_, i) =>
      new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10),
    );
    const routes = keys.map(dailyRoute);
    expect(new Set(routes.slice(0, 15).map((r) => r.home))).toEqual(new Set(HOME_COUNTRIES));
    expect(routes[0].home).toBe(routes[15].home);
    expect(routes[0].from.id).not.toBe(routes[15].from.id);
    expect(new Set(routes.map((r) => r.to.id)).size).toBe(45);
    for (const route of routes) {
      expect(START_CITIES[route.home].some((city) => city.id === route.from.id)).toBe(true);
      expect(PL_CITIES.some((city) => city.id === route.to.id)).toBe(true);
      expect(route.waypoints.at(-1)?.km).toBe(route.totalKm);
    }
  });

  it('ma co najmniej 30 neutralnych tytułów, a piątek ma własną pulę', () => {
    expect(DAILY_TITLES.length).toBeGreaterThanOrEqual(30);
    expect(new Set(DAILY_TITLES).size).toBe(DAILY_TITLES.length);
    expect([
      'Piątkowy powrót do Polski',
      'Wielki korek przed weekendem',
      'Piątek, walizki i do domu!',
      'Weekendowy kurs do Polski',
      'Piątkowa wyprawa po pierogi',
      'Kombi rusza na weekend',
    ]).toContain(dailyTitle('2026-12-04'));
    expect(dailyTitle('2026-12-02')).toBe(dailyTitle('2026-12-02'));
  });

  it('uwzględnia Wigilię, koniec roku, Wielkanoc 2027 i majówkę', () => {
    expect(dailyTitle('2026-12-24')).toBe('Na Wigilię!');
    expect(dailyTitle('2027-12-24')).toBe('Na Wigilię!');
    expect(dailyTitle('2026-12-31')).toBe('Ostatni kurs w roku!');
    expect(dailyTitle('2027-03-27')).toBe('Przedświąteczny kurs do domu');
    expect(dailyTitle('2027-03-28')).toBe('Rodzinny stół już czeka!');
    expect(dailyTitle('2027-03-29')).toBe('Jeszcze chwila przy rodzinnym stole');
    expect(dailyTitle('2027-04-30')).toBe('Start majówkowego weekendu!');
    expect(dailyTitle('2027-05-01')).toBe('Majówka, kierunek Polska!');
    expect(dailyTitle('2027-05-02')).toBe('Majówka w trasie!');
    expect(dailyTitle('2027-05-03')).toBe('Ostatnia prosta majówki!');
    expect(dailyTitle('2028-05-01')).toBe('Majówka, kierunek Polska!');
  });

  it('odrzuca błędne i niekanoniczne klucze zamiast tworzyć inną trasę', () => {
    for (const key of ['2027-02-29', '2027-13-01', '2027-04-31', '2027-5-1', 'jutro']) {
      expect(() => dailyRoute(key)).toThrow(RangeError);
      expect(() => dailyTitle(key)).toThrow(RangeError);
    }
  });
});
