import { describe, expect, it } from 'vitest';
import { replay } from '../../src/core/game';
import { ANALYTICS_RATE_LIMIT, analyticsRateLimited, originPermitted, regularTapRhythm } from '../src/abuse';
import { isValidNickId, randomNickChoices } from '../../src/content/nicks';
import { makeRoute } from '../../src/core/route';
import { isCalendarDay, verifyReplay, warsawDay, warsawWeek } from '../src/validation';

const run = { seed: 77, home: 'BE' as const, from: 'bruksela', to: 'rzeszow' };

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
