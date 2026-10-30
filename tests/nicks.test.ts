import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, type HomeCountry } from '../src/core/route';
import {
  NICK_ADJECTIVES,
  NICK_NOUNS,
  isValidNickId,
  randomNickChoices,
  renderNick,
  type NickGender,
  type NickRng,
} from '../src/content/nicks';

const sequence = (values: readonly number[]): NickRng => {
  let index = 0;
  return () => values[index++ % values.length];
};

const FORMS: readonly NickGender[] = ['m', 'f'];
const FORBIDDEN = [
  'cebulak', 'pijak', 'piwo', 'wódka', 'alkohol', 'narkotyk', 'idiota', 'głupek',
  'polityk', 'partia', 'wojna', 'rasista', 'religia',
];

// Wymuszamy konkretny indeks miasta bez kopiowania listy miejsc do modułu nicków.
const choiceForCity = (home: HomeCountry, cityIndex: number, polish: boolean, gender: NickGender): string => {
  const cities = polish ? PL_CITIES : START_CITIES[home];
  const rng = sequence([0, 0, polish ? 0.75 : 0.25, (cityIndex + 0.5) / cities.length, 0]);
  return randomNickChoices(rng, 1, home, gender)[0];
};

describe('słowniki nicków', () => {
  it('mają co najmniej 40 przymiotników i 25 rzeczowników, z obiema formami', () => {
    expect(NICK_ADJECTIVES.length).toBeGreaterThanOrEqual(40);
    expect(NICK_NOUNS.length).toBeGreaterThanOrEqual(25);
    expect(NICK_ADJECTIVES.length).toBeLessThan(99); // a99 = brak przymiotnika
    expect(NICK_NOUNS.length).toBeLessThan(100);
    for (const word of [...NICK_ADJECTIVES, ...NICK_NOUNS]) {
      expect(word.m).toMatch(/^\p{Lu}[\p{L}]+$/u);
      expect(word.f).toMatch(/^\p{Lu}[\p{L}]+$/u);
      expect(word.m).not.toBe(word.f);
    }
  });

  it('nie zawierają słów z czarnej listy', () => {
    for (const word of [...NICK_ADJECTIVES, ...NICK_NOUNS]) {
      for (const gender of FORMS) {
        const value = word[gender].toLocaleLowerCase('pl-PL');
        for (const forbidden of FORBIDDEN) expect(value).not.toContain(forbidden);
      }
    }
  });
});

describe('generator i walidacja', () => {
  it('generuje prawidłowe ID, które można wyrenderować, dla wszystkich krajów i obu rodzajów', () => {
    for (const home of HOME_COUNTRIES) {
      for (const gender of FORMS) {
        const ids = randomNickChoices(sequence([0.12, 0.87, 0.3, 0.65, 0.9]), 75, home, gender);
        expect(ids).toHaveLength(75);
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) {
          expect(isValidNickId(id)).toBe(true);
          expect(renderNick(id)).toMatch(/^[^#]+ #\d{3}$/);
          const firstWords = renderNick(id).split(' ');
          if (id.startsWith('a99-')) {
            expect(NICK_NOUNS.some((word) => word[gender] === firstWords[0])).toBe(true);
          } else {
            expect(NICK_ADJECTIVES.some((word) => word[gender] === firstWords[0])).toBe(true);
            expect(NICK_NOUNS.some((word) => word[gender] === firstWords[1])).toBe(true);
          }
        }
      }
    }
  });

  it('potrafi wygenerować sam rzeczownik bez przymiotnika', () => {
    const rng = sequence([0.999, 1.5 / NICK_NOUNS.length, 0.25, 2.5 / START_CITIES.BE.length, 323.5 / 900]);
    const id = randomNickChoices(rng, 1, 'BE', 'm')[0];
    expect(id.startsWith('a99-n01-c-gandawa-g-m-423-h')).toBe(true);
    expect(isValidNickId(id)).toBe(true);
    expect(renderNick(id)).toBe('Bocian z Gandawy #423');
  });

  it('zwraca deterministyczne wyniki dla identycznej sekwencji RNG', () => {
    const values = [0.12, 0.37, 0.78, 0.91, 0.42, 0.55];
    expect(randomNickChoices(sequence(values), 30, 'BE')).toEqual(randomNickChoices(sequence(values), 30, 'BE'));
  });

  it('nie zapętla się, nawet gdy RNG stale zwraca zero', () => {
    const ids = randomNickChoices(() => 0, 1000, 'BE', 'f');
    expect(new Set(ids).size).toBe(1000);
    expect(ids.every(isValidNickId)).toBe(true);
  });

  it('odrzuca identyfikatory błędne, spreparowane i zmienione choćby o znak', () => {
    const id = randomNickChoices(() => 0, 1, 'BE', 'f')[0];
    const invalid = [
      '', 'a12-n05-c-antwerpia-g-f-123', 'dowolny tekst', '<script>alert(1)</script>',
      'a99-n99-c-nie-ma-g-f-123-h0000000',
      id.replace('-g-f-', '-g-m-'),
      id.replace('-c-bruksela-', '-c-antwerpia-'),
      id.replace('-100-h', '-999-h'),
      id.slice(0, -1) + (id.at(-1) === 'a' ? 'b' : 'a'),
      id.toUpperCase(),
    ];
    for (const value of invalid) {
      expect(isValidNickId(value)).toBe(false);
      expect(() => renderNick(value)).toThrow('Nieprawidłowy nickId');
    }
  });

  it('odrzuca złe parametry wejściowe i zwraca [] dla count=0', () => {
    expect(randomNickChoices(() => 0, 0, 'BE')).toEqual([]);
    for (const count of [-1, 1.5, Infinity, NaN, 1001]) {
      expect(() => randomNickChoices(() => 0, count, 'BE')).toThrow(RangeError);
    }
    for (const value of [-0.1, 1, NaN, Infinity]) {
      expect(() => randomNickChoices(() => value, 1, 'BE')).toThrow(RangeError);
    }
    expect(() => randomNickChoices(() => 0, 1, 'PL' as HomeCountry)).toThrow(RangeError);
    expect(() => randomNickChoices(() => 0, 1, 'BE', 'x' as NickGender)).toThrow(RangeError);
  });
});

describe('odmiana wszystkich miast', () => {
  it('obejmuje każde miasto Polski i startów ośmiu krajów', () => {
    const visited = new Set<string>();
    const expected = [...Object.values(START_CITIES).flat(), ...PL_CITIES];
    expect(new Set(expected.map((city) => city.id)).size).toBe(expected.length);

    for (const home of HOME_COUNTRIES) {
      for (let i = 0; i < START_CITIES[home].length; i++) {
        for (const gender of FORMS) {
          const city = START_CITIES[home][i];
          const id = choiceForCity(home, i, false, gender);
          expect(isValidNickId(id)).toBe(true);
          expect(renderNick(id)).toContain(` ${city.fromName} #100`);
          visited.add(city.id);
        }
      }
    }
    for (let i = 0; i < PL_CITIES.length; i++) {
      for (const gender of FORMS) {
        const city = PL_CITIES[i];
        const id = choiceForCity('BE', i, true, gender);
        expect(isValidNickId(id)).toBe(true);
        expect(renderNick(id)).toContain(` ${city.fromName} #100`);
        visited.add(city.id);
      }
    }
    expect(visited.size).toBe(expected.length);
  });

  it('używa „ze” przed trudnymi zbitkami, a „z” przed pozostałymi', () => {
    const special = [
      ['szczecin', 'ze Szczecina'],
      ['slupsk', 'ze Słupska'],
      ['strzelce-opolskie', 'ze Strzelec Opolskich'],
      ['skarzysko-kamienna', 'ze Skarżyska-Kamiennej'],
      ['stalowa-wola', 'ze Stalowej Woli'],
      ['siemiatycze', 'z Siemiatycz'],
      ['wroclaw', 'z Wrocławia'],
    ] as const;
    for (const [cityId, expected] of special) {
      const index = PL_CITIES.findIndex((city) => city.id === cityId);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(renderNick(choiceForCity('BE', index, true, 'm'))).toContain(` ${expected} #100`);
    }
    const antwerp = START_CITIES.BE.findIndex((city) => city.id === 'antwerpia');
    expect(renderNick(choiceForCity('BE', antwerp, false, 'f'))).toBe('Zaradna Kierowczyni z Antwerpii #100');
  });

  it('łączy poprawne formy wszystkich słów dla obu rodzajów', () => {
    for (const gender of FORMS) {
      for (let a = 0; a < NICK_ADJECTIVES.length; a++) {
        for (let n = 0; n < NICK_NOUNS.length; n++) {
          const rng = sequence([(a + 0.5) / NICK_ADJECTIVES.length, (n + 0.5) / NICK_NOUNS.length, 0, 0, 0]);
          const id = randomNickChoices(rng, 1, 'BE', gender)[0];
          expect(renderNick(id)).toBe(`${NICK_ADJECTIVES[a][gender]} ${NICK_NOUNS[n][gender]} z Brukseli #100`);
        }
      }
    }
  });
});
