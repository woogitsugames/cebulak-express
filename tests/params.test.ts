import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, START_CITIES } from '../src/core/route';
import { parseGameParams, shareRouteCode } from '../src/net/params';

describe('parametry osadzenia i karty wyniku', () => {
  it('czyta kraj i miasto z adresu iframe', () => {
    expect(parseGameParams('?kraj=be&z=antwerpia')).toEqual({ home: 'BE', from: 'antwerpia' });
  });

  it('czyta r z karty wyniku', () => {
    expect(parseGameParams('?r=be-antwerpia')).toEqual({ home: 'BE', from: 'antwerpia' });
  });

  it('poprawne r ma pierwszeństwo przed kraj i z', () => {
    expect(parseGameParams('?kraj=nl&z=rotterdam&r=de-berlin')).toEqual({ home: 'DE', from: 'berlin' });
  });

  it('niepoprawne r nie zasłania poprawnych parametrów iframe', () => {
    expect(parseGameParams('?r=be-nieznane&kraj=nl&z=eindhoven')).toEqual({ home: 'NL', from: 'eindhoven' });
  });

  it('brak z i nieznane miasto dają pierwszy start kraju', () => {
    expect(parseGameParams('?kraj=be')).toEqual({ home: 'BE', from: 'bruksela' });
    expect(parseGameParams('?kraj=be&z=nie-znane')).toEqual({ home: 'BE', from: 'bruksela' });
  });

  it('nie zmienia wielkości liter w bazie miast', () => {
    expect(parseGameParams('?kraj=DE&z=HAMBURG')).toEqual({ home: 'DE', from: 'hamburg' });
  });

  it('odrzuca nieobsługiwane kraje i wstrzyknięte parametry', () => {
    expect(parseGameParams('?kraj=pl&z=warszawa')).toBeNull();
    expect(parseGameParams('?r=be-..%2F&kraj=xxx')).toBeNull();
    expect(parseGameParams('')).toBeNull();
  });

  it('działa dla wszystkich krajów i miast startowych', () => {
    for (const home of HOME_COUNTRIES) {
      for (const city of START_CITIES[home]) {
        const code = shareRouteCode(home, city.id);
        expect(parseGameParams(`?r=${code}`)).toEqual({ home, from: city.id });
      }
    }
  });

  it('generowanie kodu r odrzuca obce miasto', () => {
    expect(() => shareRouteCode('BE', 'oslo')).toThrow();
  });

  it('akceptuje URLSearchParams jako wejście', () => {
    expect(parseGameParams(new URLSearchParams({ kraj: 'uk', z: 'londyn' }))).toEqual({ home: 'UK', from: 'londyn' });
  });
});
