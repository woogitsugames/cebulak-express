import { describe, expect, it } from 'vitest';
import { seasonAt } from '../src/core/season';

describe('sezon zimowy: data w Warszawie', () => {
  it('zaczyna się dokładnie 1 grudnia o północy warszawskiej', () => {
    expect(seasonAt(new Date('2026-11-30T22:59:59.999Z'))).toBe('regular');
    expect(seasonAt(new Date('2026-11-30T23:00:00.000Z'))).toBe('winter');
  });

  it('kończy się 26 grudnia o 23:59:59.999 czasu warszawskiego', () => {
    expect(seasonAt(new Date('2026-12-26T22:59:59.999Z'))).toBe('winter');
    expect(seasonAt(new Date('2026-12-26T23:00:00.000Z'))).toBe('regular');
    expect(seasonAt(new Date('2027-01-01T00:00:00.000Z'))).toBe('regular');
  });

  it('działa tak samo w kolejnych latach i poza grudniem', () => {
    expect(seasonAt(new Date('2027-12-01T12:00:00.000Z'))).toBe('winter');
    expect(seasonAt(new Date('2028-12-26T12:00:00.000Z'))).toBe('winter');
    expect(seasonAt(new Date('2028-02-29T12:00:00.000Z'))).toBe('regular');
  });

  it('parametry URL wymuszają tryb niezależnie od daty', () => {
    expect(seasonAt(new Date('2026-07-01T12:00:00.000Z'), '?sezon=zima&test=1&seed=7')).toBe('winter');
    expect(seasonAt(new Date('2026-12-24T12:00:00.000Z'), '?sezon=lato')).toBe('regular');
    expect(seasonAt(new Date('2026-12-24T12:00:00.000Z'), '?sezon=nieznany')).toBe('winter');
    expect(seasonAt(new Date('2026-07-01T12:00:00.000Z'), '?sezon=zima&sezon=lato')).toBe('winter');
  });

  it('odrzuca niepoprawną datę również przy wymuszeniu sezonu', () => {
    expect(() => seasonAt(new Date(Number.NaN), '?sezon=zima')).toThrow(RangeError);
  });
});
