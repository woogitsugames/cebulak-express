import type * as pl from './pl';

/** Napisy dotychczas wpisane bezpośrednio w index.html. */
export const PL_MENU = {
  tagline: 'Kierunek Polska',
  homeLabel: 'Mieszkam w',
  fromLabel: 'Startuję z',
  toLabel: 'Lecę do',
  modeLabel: 'Tryb gry',
  start: 'Lecimy!',
  garageButton: 'Garaż: postać i nick',
  backToMenu: 'Zmień trasę',
  gameLabel: 'Gra Cebulak Express',
} as const;

type StringMap<T> = { [K in keyof T]: string };
type StringListMap<T> = { [K in keyof T]: readonly string[] };

/** Kompletność słowników jest weryfikowana podczas typecheck (również dla zagnieżdżonych kluczy). */
export interface GameLocale {
  COUNTRY_NAME: StringMap<typeof pl.COUNTRY_NAME>;
  COUNTRY_LOCATIVE: StringMap<typeof pl.COUNTRY_LOCATIVE>;
  OBSTACLE_NAME: StringMap<typeof pl.OBSTACLE_NAME>;
  FAIL_JOKES: StringListMap<typeof pl.FAIL_JOKES>;
  PICKUP_TOAST: StringMap<typeof pl.PICKUP_TOAST>;
  BORDER_TEXTS: StringListMap<typeof pl.BORDER_TEXTS>;
  ARRIVAL_TEXTS: readonly string[];
  NEAR_MISS_TEXTS: readonly string[];
  PICKUP_TEXTS: StringListMap<typeof pl.PICKUP_TEXTS>;
  MILESTONE_TEXTS: readonly string[];
  WIGILIA_TEXTS: readonly string[];
  UI: StringMap<typeof pl.UI>;
  MENU: StringMap<typeof PL_MENU>;
}
