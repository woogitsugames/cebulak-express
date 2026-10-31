import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeRoute } from '../src/core/route';
import {
  CARD_DIMENSIONS, cardBackgroundPaths, cardShareText, firstImage, formatKilometres, renderCard,
  roundedKilometres, type CardData,
} from '../src/share/card';
import { seasonAt } from '../src/core/season';

const route = makeRoute('BE', 'antwerpia', 'rzeszow');
const result: CardData = {
  km: 684.6,
  totalKm: route.totalKm,
  arrived: false,
  seconds: 46.5,
  from: route.from,
  to: route.to,
  home: 'BE',
  causeText: 'Za dużo słoików, za mało lotu.',
  leaguePosition: 3,
};

describe('polskie teksty karty wyniku', () => {
  it('pobiera odmianę miast z route.ts, nie z nazw w mianowniku', () => {
    expect(cardShareText(result)).toBe(
      'Przeleciałem 685 km z Antwerpii w stronę Rzeszowa! Dasz radę dalej?',
    );
    const second = makeRoute('BE', 'bruksela', 'siemiatycze');
    expect(cardShareText({ ...result, from: second.from, to: second.to })).toContain(
      'z Brukseli w stronę Siemiatycz',
    );
  });

  it('dla dojazdu do celu podaje rzeczywisty czas po zaokrągleniu', () => {
    expect(cardShareText({ ...result, arrived: true })).toBe(
      'Doleciałem z Antwerpii do Rzeszowa w 47 s! A Ty?',
    );
  });

  it('dołącza nazwę wyzwania dnia tylko gdy jest podana', () => {
    expect(cardShareText({ ...result, daily: 'Piątkowy powrót' })).toBe(
      'Przeleciałem 685 km z Antwerpii w stronę Rzeszowa! Dasz radę dalej? Piątkowy powrót',
    );
    expect(cardShareText({ ...result, daily: '  ' })).toBe(cardShareText(result));
  });

  it('zaokrągla km, odrzuca NaN i ujemne odległości, formatuje tysiące', () => {
    expect(roundedKilometres(684.5)).toBe(685);
    expect(roundedKilometres(-2)).toBe(0);
    expect(roundedKilometres(Number.NaN)).toBe(0);
    expect(formatKilometres(1234.5)).toBe('1 235');
    expect(formatKilometres(Number.POSITIVE_INFINITY)).toBe('0');
  });

  it('wspiera oba żądane rozmiary', () => {
    expect(CARD_DIMENSIONS.story).toEqual({ width: 1080, height: 1920 });
    expect(CARD_DIMENSIONS.square).toEqual({ width: 1080, height: 1080 });
  });
});

afterEach(() => vi.unstubAllGlobals());

describe('eksport PNG', () => {
  it.each(['story', 'square'] as const)('generuje Blob PNG przez OffscreenCanvas (%s)', async (format) => {
    const made: Array<{ width: number; height: number }> = [];
    const gradient = { addColorStop: () => undefined };
    const context = new Proxy({} as Record<string, unknown>, {
      get(_target, property) {
        if (property === 'createLinearGradient') return () => gradient;
        if (property === 'measureText') return (text: string) => ({ width: text.length * 12 });
        return () => undefined;
      },
      set() { return true; },
    });
    vi.stubGlobal('OffscreenCanvas', class {
      constructor(public width: number, public height: number) {
        made.push({ width, height });
      }
      getContext() { return context; }
      async convertToBlob() { return new Blob(['png'], { type: 'image/png' }); }
    });
    // W Vitest (node) nie ma Image ani document, więc działa grafika zastępcza.
    const blob = await renderCard(result, format);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(made).toEqual([CARD_DIMENSIONS[format]]);
  });
});

describe('tło karty zależne od sezonu', () => {
  it('latem używa tylko letniego tła', () => {
    expect(cardBackgroundPaths(1920, 'regular')).toEqual(['/assets/brand/card-bg-1080x1920.png']);
    expect(cardBackgroundPaths(1080, 'regular')).toEqual(['/assets/brand/card-bg-1080x1080.png']);
  });

  it('zimą najpierw próbuje tła zimowego, potem letniego', () => {
    expect(cardBackgroundPaths(1920, 'winter')).toEqual([
      '/assets/brand/card-bg-zima-1080x1920.png',
      '/assets/brand/card-bg-1080x1920.png',
    ]);
    expect(cardBackgroundPaths(1080, 'winter')[0]).toBe('/assets/brand/card-bg-zima-1080x1080.png');
  });

  it('gdy zimowe tło się nie wczyta, bierze letnie; gdy żadne — null', async () => {
    const summer = { naturalWidth: 1080 } as HTMLImageElement;
    const tried: string[] = [];
    const load = async (path: string) => {
      tried.push(path);
      return path.includes('-zima-') ? null : summer;
    };
    await expect(firstImage(cardBackgroundPaths(1920, 'winter'), load)).resolves.toBe(summer);
    expect(tried).toEqual(['/assets/brand/card-bg-zima-1080x1920.png', '/assets/brand/card-bg-1080x1920.png']);
    await expect(firstImage(cardBackgroundPaths(1920, 'winter'), async () => null)).resolves.toBeNull();
  });

  it('zimowe tło wczytane od razu — letniego nie pobiera', async () => {
    const winter = { naturalWidth: 1080 } as HTMLImageElement;
    const load = vi.fn(async () => winter);
    await expect(firstImage(cardBackgroundPaths(1080, 'winter'), load)).resolves.toBe(winter);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('sezon karty liczy się jak tło gry (seasonAt, z ?sezon=)', () => {
    expect(cardBackgroundPaths(1920, seasonAt(new Date('2026-12-10T12:00:00Z')))[0]).toContain('-zima-');
    expect(cardBackgroundPaths(1920, seasonAt(new Date('2026-12-27T12:00:00Z')))).toHaveLength(1);
    expect(cardBackgroundPaths(1920, seasonAt(new Date('2026-07-01T12:00:00Z'), '?sezon=zima'))[0])
      .toContain('-zima-');
    expect(cardBackgroundPaths(1920, seasonAt(new Date('2026-12-10T12:00:00Z'), '?sezon=lato'))).toHaveLength(1);
  });
});
