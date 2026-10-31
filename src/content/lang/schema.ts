import type * as pl from './pl';
import type { DAILY_TITLE_TEXTS } from '../../core/daily';
import type { MedalId } from '../../meta/progress';
import type { UNLOCK_TEXT, UnlockableSkinId } from '../../meta/unlocks';
import type { CARD_TEXT } from '../../share/card';
import type { SHARE_TEXT } from '../../share/share';
import type { COLLECTION_TEXT } from '../../ui/collection-text';
import type { LEAGUE_TEXT } from '../../ui/league';
import type { ONBOARDING_TEXT } from '../../ui/onboarding';

/** Napisy dotychczas wpisane bezpośrednio w index.html. */
export const PL_MENU = {
  tagline: 'Kierunek Polska',
  homeLabel: 'Mieszkam w',
  fromLabel: 'Startuję z',
  toLabel: 'Lecę do',
  modeLabel: 'Tryb gry',
  start: 'Lecimy!',
  garageButton: 'Garaż',
  backToMenu: 'Zmień trasę',
  gameLabel: 'Gra Cebulak Express',
  mainMenu: 'Menu główne',
  albumButton: 'Album',
  distanceLabel: 'Przejechany dystans',
  miniLeague: 'Pierwsza trójka Ligi Polonii',
} as const;

type StringMap<T> = { [K in keyof T]: string };
type StringListMap<T> = { [K in keyof T]: readonly string[] };

/** Kompletność słowników jest weryfikowana podczas typecheck (również dla zagnieżdżonych kluczy). */
export interface CoreLocale {
  COUNTRY_NAME: StringMap<typeof pl.COUNTRY_NAME>;
  COUNTRY_LOCATIVE: StringMap<typeof pl.COUNTRY_LOCATIVE>;
  OBSTACLE_NAME: StringMap<typeof pl.OBSTACLE_NAME>;
  FAIL_JOKES: StringListMap<typeof pl.FAIL_JOKES>;
  PICKUP_TOAST: StringMap<typeof pl.PICKUP_TOAST>;
  POWERUP_NAME: StringMap<typeof pl.POWERUP_NAME>;
  BORDER_TEXTS: StringListMap<typeof pl.BORDER_TEXTS>;
  ARRIVAL_TEXTS: readonly string[];
  /** Zapowiedź lotu powrotnego (mama pakuje słoiki). */
  RETURN_DEPARTURE_TEXTS: readonly string[];
  /**
   * Meta lotu powrotnego. PL: {city} w miejscowniku (RETURN_CITY_LOCATIVE);
   * EN/NL/DE/FR: {city} w formie podstawowej, więc zdania nie mogą wymagać odmiany.
   */
  RETURN_ARRIVAL_TEXTS: readonly string[];
  NEAR_MISS_TEXTS: readonly string[];
  PICKUP_TEXTS: StringListMap<typeof pl.PICKUP_TEXTS>;
  MILESTONE_TEXTS: readonly string[];
  WIGILIA_TEXTS: readonly string[];
  GHOST_TEXTS: StringMap<typeof pl.GHOST_TEXTS>;
  UI: StringMap<typeof pl.UI>;
  MENU: StringMap<typeof PL_MENU>;
}

/**
 * Sekcje, których polski oryginał mieszka w module, który ich używa (często leniwym),
 * żeby główny pakiet nie rósł. Obce słowniki muszą mieć je wszystkie (ForeignLocale);
 * dla polskiego odczyt zwraca undefined i moduł bierze własny tekst.
 */
export interface LazyLocale {
  /** Komunikaty nad miastami trasy; klucz = Waypoint.textKey ?? Waypoint.id. */
  WAYPOINTS: Readonly<Record<string, string>>;
  /** Dymki zabawnych tablic (FunnyPlace.id). Nazwa na tablicy zostaje prawdziwa. */
  FUNNY_PLACES: Readonly<Record<string, string>>;
  /** Nazwy miast trasy, które w tym języku brzmią inaczej niż w danych (polskie egzonimy). */
  PLACE_NAMES: Readonly<Record<string, string>>;
  DAILY_TITLES: {
    regular: readonly string[];
    friday: readonly string[];
    dates: StringMap<typeof DAILY_TITLE_TEXTS.dates>;
    monthDays: StringMap<typeof DAILY_TITLE_TEXTS.monthDays>;
  };
  ONBOARDING: StringMap<typeof ONBOARDING_TEXT>;
  COLLECTION: StringMap<typeof COLLECTION_TEXT>;
  MEDALS: Record<MedalId, { name: string; description: string }>;
  CARS: Record<UnlockableSkinId, string>;
  UNLOCK: StringMap<typeof UNLOCK_TEXT>;
  LEAGUE: StringMap<typeof LEAGUE_TEXT>;
  CARD: StringMap<typeof CARD_TEXT>;
  SHARE: StringMap<typeof SHARE_TEXT>;
}

/** Część obcego słownika trzymana w osobnym pliku (<język>-extra.ts) — ten sam leniwy pakiet. */
export type LocaleExtras = LazyLocale
  & Pick<CoreLocale, 'POWERUP_NAME' | 'RETURN_DEPARTURE_TEXTS' | 'RETURN_ARRIVAL_TEXTS' | 'GHOST_TEXTS'>;

export type GameLocale = CoreLocale & Partial<LazyLocale>;
export type ForeignLocale = CoreLocale & LazyLocale;
