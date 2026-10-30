import { describe, expect, it } from 'vitest';
import { Game, replay } from '../../src/core/game';
import { ANALYTICS_RATE_LIMIT, analyticsRateLimited, originPermitted, regularTapRhythm } from '../src/abuse';
import { countEvents, validateEvent } from '../src/analytics-events';
import { isValidNickId, randomNickChoices } from '../../src/content/nicks';
import { botStep } from '../../tests/helpers';
import { HOME_COUNTRIES, makeRoute, PL_CITIES, START_CITIES, type HomeCountry } from '../../src/core/route';
import { RULES_VERSION, rankedGameOptions, seasonKey } from '../../src/core/rules';
import { isCalendarDay, parseRoute, verifyReplay, warsawDay, warsawWeek } from '../src/validation';

const run = { seed: 77, home: 'BE' as const, from: 'bruksela', to: 'rzeszow', rulesVersion: RULES_VERSION };

/**
 * Ścieżka klienta: tak jak pętla w src/main.ts — gra z rankedGameOptions,
 * wejście (tu autopilot z testów rdzenia) przed krokiem symulacji, aż do końca przejazdu.
 */
function clientRun(seed: number, home: HomeCountry, from: string, to: string, baseWeight?: number) {
  const options = rankedGameOptions(seed, makeRoute(home, from, to));
  const game = new Game(baseWeight === undefined ? options : { ...options, baseWeight });
  game.flap();
  while (game.phase === 'playing' && game.ticks < 120 * 60 * 10) {
    botStep(game);
    game.tick();
  }
  return { flapTicks: [...game.flapTicks], ticks: game.ticks, km: game.km, phase: game.phase };
}

describe('weryfikator symulacji', () => {
  it('akceptuje rzeczywiście zakończony przejazd', () => {
    const result = replay({ seed: run.seed, mode: 'ranked', route: makeRoute(run.home, run.from, run.to) }, [0]);
    expect(result.phase).toBe('over');
    expect(verifyReplay(run, [0], result.ticks, result.km)).toBe(true);
  });

  it('odrzuca spreparowane wejścia, niedokończony przejazd i wynik', () => {
    const result = replay({ seed: run.seed, mode: 'ranked', route: makeRoute(run.home, run.from, run.to) }, [0]);
    expect(verifyReplay(run, [0, 40], result.ticks, result.km)).toBe(false);
    expect(verifyReplay(run, [0, 0], result.ticks, result.km)).toBe(false);
    expect(verifyReplay(run, [0], result.ticks - 1, result.km)).toBe(false);
    expect(verifyReplay(run, [0], result.ticks, result.km + 1)).toBe(false);
    expect(verifyReplay(run, [0], 72001, result.km)).toBe(false);
    expect(verifyReplay(run, [], result.ticks, result.km)).toBe(false);
  });
});

describe('wersja zasad (sezon rankingu) i wspólne opcje gry', () => {
  it('ten sam seed i te same tapnięcia dają te same km po stronie klienta i serwera', () => {
    const cases: Array<[HomeCountry, string, string]> = [
      ['BE', 'bruksela', 'rzeszow'], ['IE', 'dublin', 'warszawa'], ['FI', 'helsinki', 'gdansk'], ['LU', 'luksemburg', 'krakow'],
    ];
    for (const [home, from, to] of cases) {
      for (const seed of [1, 77, 0xdeadbeef]) {
        const client = clientRun(seed, home, from, to);
        expect(client.phase === 'over' || client.phase === 'arrived').toBe(true);
        expect(client.km).toBeGreaterThan(100);
        const server = replay(rankedGameOptions(seed, makeRoute(home, from, to)), client.flapTicks, client.ticks);
        expect(server.km).toBe(client.km);
        expect(server.ticks).toBe(client.ticks);
        expect(verifyReplay({ seed, home, from, to, rulesVersion: RULES_VERSION },
          client.flapTicks, client.ticks, client.km)).toBe(true);
      }
    }
  });

  it('opcje rankingu nie zawierają baseWeight lotu powrotnego', () => {
    const options = rankedGameOptions(5, makeRoute('BE', 'bruksela', 'rzeszow'));
    expect(options).toEqual({ seed: 5, mode: 'ranked', route: options.route });
    expect(new Game(options).baseWeight).toBe(0);
    // Przejazd z bagażem powrotnym nie przechodzi weryfikacji rankingowej.
    let rejected = 0;
    for (const seed of [3, 4, 5, 6, 7]) {
      const heavy = clientRun(seed, 'BE', 'bruksela', 'rzeszow', 0.4);
      if (!verifyReplay({ ...run, seed }, heavy.flapTicks, heavy.ticks, heavy.km)) rejected++;
    }
    expect(rejected).toBeGreaterThan(0);
  });

  it('odrzuca przejazd ze starszą lub brakującą wersją zasad', () => {
    const result = replay(rankedGameOptions(run.seed, makeRoute(run.home, run.from, run.to)), [0]);
    expect(verifyReplay(run, [0], result.ticks, result.km)).toBe(true);
    expect(verifyReplay({ ...run, rulesVersion: RULES_VERSION - 1 }, [0], result.ticks, result.km)).toBe(false);
    expect(verifyReplay({ ...run, rulesVersion: undefined }, [0], result.ticks, result.km)).toBe(false);
    expect(verifyReplay({ ...run, rulesVersion: RULES_VERSION + 1 }, [0], result.ticks, result.km)).toBe(false);
  });

  it('akceptuje wszystkie 15 krajów domowych, ich miasta i cele ze wspólnych danych', () => {
    expect(HOME_COUNTRIES).toHaveLength(15);
    for (const home of HOME_COUNTRIES) {
      for (const from of START_CITIES[home]) {
        for (const to of PL_CITIES) {
          expect(parseRoute(home, from.id, to.id)?.home).toBe(home);
        }
      }
    }
    const ie = replay(rankedGameOptions(42, makeRoute('IE', 'cork', 'wroclaw')), [0]);
    expect(verifyReplay({ seed: 42, home: 'IE', from: 'cork', to: 'wroclaw', rulesVersion: RULES_VERSION },
      [0], ie.ticks, ie.km)).toBe(true);
  });

  it('odrzuca nieznany kraj i miasto spoza kraju domowego', () => {
    expect(parseRoute('PL', 'warszawa', 'krakow')).toBeNull();
    expect(parseRoute('__proto__', 'bruksela', 'krakow')).toBeNull();
    expect(parseRoute('IE', 'bruksela', 'krakow')).toBeNull();
    expect(parseRoute('IE', 'dublin', 'dublin')).toBeNull();
    expect(parseRoute('IE', 'dublin', 42)).toBeNull();
    expect(verifyReplay({ ...run, home: 'IE', from: 'bruksela' }, [0], 100, 1)).toBe(false);
  });

  it('klucz sezonu oddziela tygodnie i dni różnych wersji zasad', () => {
    expect(seasonKey('2026-W44')).toBe('r' + RULES_VERSION + '_2026-W44');
    expect(seasonKey('2026-10-30', 1)).toBe('r1_2026-10-30');
    expect(seasonKey('2026-W44', 1)).not.toBe(seasonKey('2026-W44'));
  });
});

describe('allowlista analityki', () => {
  it('przyjmuje nowe kraje, bramkę bagażową i bonusy', () => {
    for (const home of ['IE', 'ES', 'IT', 'AT', 'SE', 'FI', 'LU']) {
      expect(validateEvent({ event: 'run_start', props: { mode: 'ranked', home } })).toBe(true);
      expect(validateEvent({ event: 'portal_click', props: { placement: 'menu', home } })).toBe(true);
    }
    expect(validateEvent({ event: 'run_end', props: {
      km: 120, seconds: 30, cause: 'baggage-gate', mode: 'cozy', home: 'SE' } })).toBe(true);
    for (const kind of ['parcel', 'jar', 'boarding', 'tailwind', 'mamcall']) {
      expect(validateEvent({ event: 'pickup', props: { kind, mode: 'ranked' } })).toBe(true);
    }
    expect(countEvents([{ event: 'pickup', props: { kind: 'mamcall', mode: 'cozy' } }]))
      .toMatchObject({ 'events.pickup': 1, 'pickups.byKind.mamcall': 1, 'pickups.byMode.cozy': 1 });
  });

  it('nadal odrzuca nieznane wartości i dodatkowe pola', () => {
    expect(validateEvent({ event: 'run_start', props: { mode: 'ranked', home: 'PL' } })).toBe(false);
    expect(validateEvent({ event: 'pickup', props: { kind: 'rocket', mode: 'ranked' } })).toBe(false);
    expect(validateEvent({ event: 'pickup', props: { kind: 'jar', mode: 'ranked', uid: 'x' } })).toBe(false);
  });
});

describe('strefa Warszawy i format nicków', () => {
  it('zmienia tydzień dokładnie w poniedziałek o 00:00 w Polsce', () => {
    expect(warsawWeek(Date.UTC(2026, 11, 27, 22, 59))).toBe('2026-W52');
    expect(warsawWeek(Date.UTC(2026, 11, 27, 23, 1))).toBe('2026-W53');
    expect(warsawWeek(Date.UTC(2027, 0, 3, 22, 59))).toBe('2026-W53');
    expect(warsawWeek(Date.UTC(2027, 0, 3, 23, 1))).toBe('2027-W01');
    expect(warsawDay(Date.UTC(2026, 9, 30, 23, 10))).toBe('2026-10-31');
  });

  it('odrzuca błędne daty i niebezpieczne nicki', () => {
    expect(isCalendarDay('2026-10-30')).toBe(true);
    expect(isCalendarDay('2026-02-30')).toBe(false);
    expect(isCalendarDay('2026-2-5')).toBe(false);
    const validId = randomNickChoices(() => 0.12, 1, 'BE')[0];
    expect(isValidNickId(validId)).toBe(true);
    expect(isValidNickId('bocian-z-gandawy-423')).toBe(false);
    expect(isValidNickId('Ala ma kota!')).toBe(false);
    expect(isValidNickId('../other')).toBe(false);
    expect(isValidNickId(validId.slice(0, -1) + (validId.endsWith('0') ? '1' : '0'))).toBe(false);
  });
});

describe('sygnały antybotowe i ruch analityki', () => {
  it('wykrywa regularność dopiero po wielu tapnięciach', () => {
    expect(regularTapRhythm(Array.from({ length: 20 }, (_, i) => i * 12))).toBe(true);
    expect(regularTapRhythm(Array.from({ length: 10 }, (_, i) => i * 12))).toBe(false);
    expect(regularTapRhythm([0, 12, 35, 50, 85, 112, 140, 175, 190, 222, 240, 275, 301, 338, 358, 393])).toBe(false);
    expect(regularTapRhythm([0, 8, 16, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112])).toBe(false);
  });

  it('limit liczy osobno IP-hash i wygasa po minucie', () => {
    const ip = '198.51.100.196';
    for (let i = 0; i < ANALYTICS_RATE_LIMIT; i++) {
      expect(analyticsRateLimited(ip, 100_000)).toBe(false);
    }
    expect(analyticsRateLimited(ip, 100_000)).toBe(true);
    expect(analyticsRateLimited('198.51.100.197', 100_000)).toBe(false);
    expect(analyticsRateLimited(ip, 160_001)).toBe(false);
  });

  it('w produkcji wymaga poprawnego Origin, także gdy nagłówka brak', () => {
    const allowlist = ['https://example.test', 'capacitor://localhost'];
    expect(originPermitted('https://example.test', allowlist)).toBe(true);
    expect(originPermitted('https://evil.test', allowlist)).toBe(false);
    expect(originPermitted(undefined, allowlist)).toBe(false);
    expect(originPermitted(undefined, [])).toBe(true);
  });
});
