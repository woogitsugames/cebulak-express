import { describe, expect, it } from 'vitest';
import { PICKUPS, PLAYER, TICK } from '../src/core/config';
import { Game, replay } from '../src/core/game';
import {
  HOME_COUNTRIES, PL_CITIES, START_CITIES, countryAt, makeRoute, reverseRoute, type Route,
} from '../src/core/route';
import { playWithBot, ROUTE } from './helpers';

const RETURN_WEIGHT = 0.4;

function countrySequence(route: Route): string[] {
  return route.waypoints.map((w) => w.country).filter((c, i, all) => i === 0 || c !== all[i - 1]);
}

describe('Lot powrotny — trasa', () => {
  it('odwraca punkty, kilometry, kraje i metę dla wszystkich miast ośmiu krajów', () => {
    for (const home of HOME_COUNTRIES) {
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          const outbound = makeRoute(home, from.id, to.id);
          const back = reverseRoute(outbound);
          expect(back.home).toBe(home);
          expect(back.from).toEqual(to);
          expect(back.to).toEqual(from);
          expect(back.totalKm).toBe(outbound.totalKm);
          expect(back.waypoints.map((w) => w.id)).toEqual([...outbound.waypoints].reverse().map((w) => w.id));
          expect(back.waypoints[0].km).toBe(0);
          expect(back.waypoints.at(-1)!.km).toBe(back.totalKm);
          expect(back.waypoints.map((w) => w.km)).toEqual(
            [...outbound.waypoints].reverse().map((w) => outbound.totalKm - w.km),
          );
          expect(countrySequence(back)).toEqual([...countrySequence(outbound)].reverse());
          expect(countryAt(back, 0)).toBe('PL');
          expect(countryAt(back, back.totalKm)).toBe(home);
          for (let i = 1; i < back.waypoints.length; i++) {
            expect(back.waypoints[i].km).toBeGreaterThanOrEqual(back.waypoints[i - 1].km);
          }
        }
      }
    }
  });

  it('nie zmienia oryginalnej trasy i zachowuje dane motywów jako kopie', () => {
    const outbound = makeRoute('BE', 'bruksela', 'rzeszow');
    const before = JSON.stringify(outbound);
    const back = reverseRoute(outbound);
    expect(JSON.stringify(outbound)).toBe(before);
    expect(back.waypoints[0]).not.toBe(outbound.waypoints.at(-1));
    expect(back.waypoints[0].motifs).not.toBe(outbound.waypoints.at(-1)!.motifs);
    expect(reverseRoute(back).waypoints.map((w) => w.country)).toEqual(outbound.waypoints.map((w) => w.country));
  });

  it('po przekroczeniu granicy na powrocie zmienia kraj na poprzedni', () => {
    const outbound = makeRoute('UK', 'londyn', 'warszawa');
    const back = reverseRoute(outbound);
    const forwardCountries = countrySequence(outbound);
    expect(forwardCountries).toEqual(['UK', 'FR', 'BE', 'NL', 'DE', 'PL']);
    expect(countrySequence(back)).toEqual(['PL', 'DE', 'NL', 'BE', 'FR', 'UK']);
  });
});

describe('Lot powrotny — ciężar i odtwarzanie', () => {
  it('bez parametru dodatkowy ciężar jest zerowy', () => {
    const game = new Game({ seed: 1, mode: 'ranked', route: ROUTE });
    expect(game.baseWeight).toBe(0);
    expect(game.totalWeight).toBe(0);
  });

  it('stały ciężar zwiększa przyspieszenie od pierwszego ticku', () => {
    const light = new Game({ seed: 1, mode: 'ranked', route: ROUTE });
    const heavy = new Game({ seed: 1, mode: 'ranked', route: ROUTE, baseWeight: RETURN_WEIGHT });
    light.flap();
    heavy.flap();
    light.tick();
    heavy.tick();
    expect(heavy.vy - light.vy).toBeCloseTo(PLAYER.gravity * PICKUPS.gravityPerWeight * RETURN_WEIGHT * TICK, 9);
    expect(heavy.y).toBeGreaterThan(light.y);
    expect(heavy.baseWeight).toBe(RETURN_WEIGHT);
  });

  it('ciężar stały nie zanika, a chwilowy zanika; ich suma nie przekracza 1', () => {
    const game = new Game({ seed: 1, mode: 'ranked', route: ROUTE, baseWeight: 0.7 });
    game.weight = 0.5;
    expect(game.totalWeight).toBe(1);
    game.flap();
    game.tick();
    expect(game.baseWeight).toBe(0.7);
    expect(game.weight).toBeLessThan(0.5);
    expect(game.totalWeight).toBe(1);

    const saturated = new Game({ seed: 1, mode: 'ranked', route: ROUTE, baseWeight: 1 });
    saturated.flap();
    saturated.tick();
    expect(game.vy).toBe(saturated.vy);
    expect(game.y).toBe(saturated.y);
  });

  it('odrzuca niepoprawny ciężar bazowy', () => {
    for (const weight of [-0.01, 1.01, NaN, Infinity, -Infinity]) {
      expect(() => new Game({ seed: 1, mode: 'ranked', route: ROUTE, baseWeight: weight })).toThrow(RangeError);
    }
  });

  it('replay z tym samym seedem, trasą i tapnięciami daje identyczną fizykę i wynik', () => {
    const route = reverseRoute(makeRoute('BE', 'bruksela', 'rzeszow'));
    const opts = { seed: 77, mode: 'ranked' as const, route, baseWeight: RETURN_WEIGHT };
    const live = new Game(opts);
    playWithBot(live, 120 * 40);
    const copy = replay(opts, live.flapTicks, live.ticks);
    expect(copy.flapTicks).toEqual(live.flapTicks);
    expect(copy.ticks).toBe(live.ticks);
    expect(copy.phase).toBe(live.phase);
    expect(copy.km).toBe(live.km);
    expect(copy.y).toBe(live.y);
    expect(copy.vy).toBe(live.vy);
    expect(copy.weight).toBe(live.weight);
    expect(copy.totalWeight).toBe(live.totalWeight);
    expect(copy.country).toBe(live.country);
    expect(copy.jars).toBe(live.jars);
    expect(copy.parcels).toBe(live.parcels);
  });
});

describe('Lot powrotny — przelotność generatora', () => {
  it('autopilot przelatuje trasy powrotne z ośmiu krajów na 20 ziarnach', () => {
    const failures: string[] = [];
    for (const home of HOME_COUNTRIES) {
      const route = reverseRoute(makeRoute(home, START_CITIES[home][0].id, 'warszawa'));
      for (let seed = 1; seed <= 20; seed++) {
        const game = new Game({ seed, mode: 'ranked', route, baseWeight: RETURN_WEIGHT });
        playWithBot(game, 120 * 60 * 10);
        if (game.phase !== 'arrived') failures.push(home + ':' + seed + ':' + game.phase);
      }
    }
    expect(failures).toEqual([]);
  }, 180_000);
});
