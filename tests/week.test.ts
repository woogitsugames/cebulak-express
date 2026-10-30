import { describe, expect, it } from 'vitest';
import { warsawDateKey, warsawWeekKey } from '../src/net/week';

describe('tydzień ISO w strefie Europe/Warsaw', () => {
  it('przełącza tydzień o północy w Warszawie, nie o północy UTC', () => {
    expect(warsawWeekKey(new Date('2021-01-03T22:59:59Z'))).toBe('2020-W53');
    expect(warsawWeekKey(new Date('2021-01-03T23:00:00Z'))).toBe('2021-W01');
  });
  it('obsługuje rok z 53 tygodniami i datę z końca grudnia należącą do kolejnego roku', () => {
    expect(warsawWeekKey(new Date('2020-12-31T12:00:00Z'))).toBe('2020-W53');
    expect(warsawWeekKey(new Date('2018-12-31T12:00:00Z'))).toBe('2019-W01');
  });
  it('stosuje czas letni i zimowy dla granicy daty', () => {
    expect(warsawDateKey(new Date('2026-07-01T21:59:59Z'))).toBe('2026-07-01');
    expect(warsawDateKey(new Date('2026-07-01T22:00:00Z'))).toBe('2026-07-02');
    expect(warsawDateKey(new Date('2026-10-25T22:59:59Z'))).toBe('2026-10-25');
    expect(warsawDateKey(new Date('2026-10-25T23:00:00Z'))).toBe('2026-10-26');
  });
});
