import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeRoute } from '../src/core/route';
import {
  CARD_DIMENSIONS, cardShareText, formatKilometres, renderCard, roundedKilometres,
  type CardData,
} from '../src/share/card';

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
