import { describe, expect, it } from 'vitest';
import {
  ARRIVAL_TEXTS,
  BORDER_TEXTS,
  COUNTRY_LOCATIVE,
  COUNTRY_NAME,
  FAIL_JOKES,
  MILESTONE_TEXTS,
  NEAR_MISS_TEXTS,
  OBSTACLE_NAME,
  PICKUP_TEXTS,
  PICKUP_TOAST,
  UI,
  WIGILIA_TEXTS,
  fill,
} from '../src/content/pl';
import { PL_TRANSIT, ROUTE_WAYPOINTS } from '../src/content/waypoints';
import type { ObstacleKind, PickupKind } from '../src/core/obstacles';
import type { CountryCode } from '../src/core/route';

const COUNTRIES = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK', 'SE', 'PL'] as const satisfies readonly CountryCode[];
const OBSTACLES = ['viaduct', 'sign', 'crane', 'roadworks', 'barrier', 'truck', 'baggage-gate', 'ground'] as const satisfies readonly ObstacleKind[];
const PICKUPS = ['parcel', 'jar', 'boarding', 'tailwind', 'mamcall'] as const satisfies readonly PickupKind[];

/**
 * Kategorie zakazane określa docs/zlecenia/WSPOLNE.md.
 * Lista przykładowych marek nie jest wyczerpująca; uzupełniaj ją przy nowych tekstach.
 */
const FORBIDDEN_WORDS = [
  'cebulak',
  'ryanair', 'wizz air', 'easyjet', 'lufthansa', 'dfds', 'stena line',
  'orlen', 'shell', 'circle k', 'lidl', 'biedronka', 'żabka',
  'fiat', 'łada', 'polonez', 'volkswagen', 'mercedes', 'bmw', 'volvo', 'toyota', 'tesla',
  'milka', 'haribo', 'coca-cola', 'pepsi', 'nutella', 'ikea',
  'alkohol', 'piwo', 'piwko', 'wino', 'wódka', 'whisky', 'szampan', 'cydr', 'drink',
  'kurwa', 'chuj', 'pierdolić', 'jebać', 'dupa',
  'polityka', 'partia', 'prezydent', 'premier', 'minister', 'poseł', 'parlament', 'wybory',
  'kościół', 'ksiądz', 'msza', 'kazanie',
] as const;

// Nie używamy granic ASCII: polskie litery muszą być częścią tego samego wyrazu.
const FORBIDDEN_PATTERNS = FORBIDDEN_WORDS.map((word) => ({
  word,
  pattern: new RegExp('(^|[^\\p{L}\\p{N}])' + word + '(?=$|[^\\p{L}\\p{N}])', 'iu'),
}));

const waypointTexts = [
  ...Object.values(ROUTE_WAYPOINTS).flatMap((waypoints) => waypoints.map((point) => point.text)),
  ...PL_TRANSIT.map((point) => point.text),
];

const toastTexts = [
  ...Object.values(BORDER_TEXTS).flat(),
  ...NEAR_MISS_TEXTS,
  ...Object.values(PICKUP_TEXTS).flat(),
  ...MILESTONE_TEXTS,
  ...WIGILIA_TEXTS,
  ...waypointTexts,
  PICKUP_TOAST.parcel,
  PICKUP_TOAST.jar,
  UI.welcome,
];

const endScreenTexts = [
  ...Object.values(FAIL_JOKES).flat(),
  ...ARRIVAL_TEXTS,
  UI.over,
  UI.arrived,
  UI.arrivedSub,
  UI.stoppedBy,
];

const playerTexts = [
  ...Object.values(COUNTRY_NAME),
  ...Object.values(COUNTRY_LOCATIVE),
  ...Object.values(OBSTACLE_NAME),
  // Etykieta dokumentu prawnego nie jest tekstem fabuły ani komunikatem gry.
  ...Object.entries(UI).filter(([key]) => key !== 'settingsPrivacy').map(([, value]) => value),
  ...toastTexts,
  ...endScreenTexts,
];

describe('Polskie teksty gry', () => {
  it('ma przynajmniej 8 unikatowych żartów dla każdej przeszkody', () => {
    expect(Object.keys(FAIL_JOKES).sort()).toEqual([...OBSTACLES].sort());
    for (const kind of OBSTACLES) {
      expect(FAIL_JOKES[kind].length).toBeGreaterThanOrEqual(8);
      expect(new Set(FAIL_JOKES[kind]).size).toBe(FAIL_JOKES[kind].length);
    }
  });

  it('ma 4 różne powitania na każdy kraj, w tym Szwecję i Polskę', () => {
    expect(Object.keys(BORDER_TEXTS).sort()).toEqual([...COUNTRIES].sort());
    for (const code of COUNTRIES) {
      expect(BORDER_TEXTS[code].length).toBeGreaterThanOrEqual(4);
      expect(new Set(BORDER_TEXTS[code]).size).toBe(BORDER_TEXTS[code].length);
    }
  });

  it('ma wystarczająco rozbudowane pule mety, o włos, sezonu i kilometrów', () => {
    expect(ARRIVAL_TEXTS.length).toBeGreaterThanOrEqual(10);
    expect(NEAR_MISS_TEXTS.length).toBeGreaterThanOrEqual(8);
    expect(MILESTONE_TEXTS.length).toBeGreaterThanOrEqual(15);
    expect(WIGILIA_TEXTS.length).toBeGreaterThanOrEqual(15);
    for (const pool of [ARRIVAL_TEXTS, NEAR_MISS_TEXTS, MILESTONE_TEXTS, WIGILIA_TEXTS]) {
      expect(new Set(pool).size).toBe(pool.length);
    }
  });

  it('ma odrębne komunikaty dla bagaży z km i trzech bonusów czasowych', () => {
    expect(Object.keys(PICKUP_TEXTS).sort()).toEqual([...PICKUPS].sort());
    for (const kind of PICKUPS) {
      const pool = PICKUP_TEXTS[kind];
      expect(pool.length).toBeGreaterThanOrEqual(6);
      expect(new Set(pool).size).toBe(pool.length);
      for (const text of pool) {
        if (kind === 'parcel' || kind === 'jar') {
          expect(text).toContain('{km}');
          expect(fill(text, { km: 15 })).toContain('15');
        } else {
          expect(text).not.toContain('{km}');
        }
      }
    }
  });

  it('umożliwia pokazywanie postępu co 100 km', () => {
    for (const text of MILESTONE_TEXTS) {
      expect(text).toContain('{km}');
      expect(fill(text, { km: 100 })).toContain('100');
    }
  });

  it('nie zawiera zakazanych określeń w tekstach pokazywanych graczowi', () => {
    for (const text of playerTexts) {
      for (const { word, pattern } of FORBIDDEN_PATTERNS) {
        expect(text, 'Niedozwolone słowo: ' + word).not.toMatch(pattern);
      }
    }
  });

  it('ogranicza każdy toast do 60 znaków, także po podstawieniu wartości', () => {
    for (const text of toastTexts) {
      const actual = fill(text, { km: 999999, where: 'w Wielkiej Brytanii' });
      expect(Array.from(actual).length, text).toBeLessThanOrEqual(60);
    }
  });

  it('ogranicza teksty ekranu mety i porażki do 90 znaków', () => {
    for (const text of endScreenTexts) {
      const actual = fill(text, { km: 999999, what: 'wielki znak drogowy' });
      expect(Array.from(actual).length, text).toBeLessThanOrEqual(90);
    }
  });
});
