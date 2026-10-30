import { platform } from '../platform';
import * as pl from './lang/pl';
import en from './lang/en';
import nl from './lang/nl';
import de from './lang/de';
import fr from './lang/fr';
import { PL_MENU, type GameLocale } from './lang/schema';
import type { CountryCode } from '../core/route';
import type { ObstacleKind } from '../core/obstacles';

export const LANGUAGES = ['pl', 'en', 'nl', 'de', 'fr'] as const;
export type Language = (typeof LANGUAGES)[number];
export const LANGUAGE_NAMES: Record<Language, string> = {
  pl: 'Polski', en: 'English', nl: 'Nederlands', de: 'Deutsch', fr: 'Français',
};

export const LANGUAGE_STORAGE_KEY = 'ce.language';

const dictionaries = {
  pl: {
    COUNTRY_NAME: pl.COUNTRY_NAME, COUNTRY_LOCATIVE: pl.COUNTRY_LOCATIVE,
    OBSTACLE_NAME: pl.OBSTACLE_NAME, FAIL_JOKES: pl.FAIL_JOKES,
    PICKUP_TOAST: pl.PICKUP_TOAST, BORDER_TEXTS: pl.BORDER_TEXTS,
    ARRIVAL_TEXTS: pl.ARRIVAL_TEXTS, NEAR_MISS_TEXTS: pl.NEAR_MISS_TEXTS,
    PICKUP_TEXTS: pl.PICKUP_TEXTS, MILESTONE_TEXTS: pl.MILESTONE_TEXTS,
    WIGILIA_TEXTS: pl.WIGILIA_TEXTS, UI: pl.UI, MENU: PL_MENU,
  }, en, nl, de, fr,
} satisfies Record<Language, GameLocale>;

export type UiKey = Extract<keyof GameLocale['UI'], string>;
export type MenuKey = Extract<keyof GameLocale['MENU'], string>;
export type TranslationKey = UiKey | `ui.${UiKey}` | `menu.${MenuKey}`
  | `country.${CountryCode}` | `obstacle.${ObstacleKind}`;

/** Pełny kod języka albo prefiks języka systemowego (np. fr-BE, nl_BE). */
function parseLanguage(value: string | null | undefined): Language | undefined {
  if (!value) return undefined;
  const prefix = value.trim().toLowerCase().split(/[-_]/, 1)[0];
  return LANGUAGES.find((language) => language === prefix);
}

/** W pamięci akceptujemy tylko dokładny kod zapisany przez grę. */
function parseStoredLanguage(value: string | null): Language | undefined {
  return LANGUAGES.find((language) => language === value);
}

function queryLanguage(): Language | undefined {
  if (typeof location === 'undefined') return undefined;
  try {
    return parseLanguage(new URLSearchParams(location.search).get('lang'));
  } catch {
    return undefined;
  }
}

/**
 * Domyślnie zawsze polski: gra jest dla Polonii, a wielu graczy ma telefon
 * po angielsku, niderlandzku czy niemiecku. Inny język tylko z wyboru w menu lub ?lang=.
 */
function browserLanguage(): Language {
  return 'pl';
}

/** Web: synchroniczny odczyt przed pierwszym renderem; natywnie używamy Preferences. */
function browserStoredLanguage(): Language | undefined {
  if (platform.isNative || typeof localStorage === 'undefined') return undefined;
  try {
    return parseStoredLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return undefined;
  }
}

const queryOverride = queryLanguage();
let current: Language = queryOverride ?? browserStoredLanguage() ?? browserLanguage();
let selectionVersion = 0;
const subscribers = new Set<(language: Language) => void>();
let initialLoad: Promise<Language> | undefined;

function apply(language: Language): void {
  if (language === current) return;
  current = language;
  if (typeof document !== 'undefined') document.documentElement.lang = language;
  for (const callback of [...subscribers]) callback(language);
}

/**
 * Pierwszy wybór: ?lang=..., zapis użytkownika, język systemu, polski.
 * Wczytanie Preferences nie nadpisze wyboru dokonanego w międzyczasie.
 */
export function initializeLanguage(): Promise<Language> {
  if (initialLoad) return initialLoad;
  const version = selectionVersion;
  initialLoad = platform.storage.get(LANGUAGE_STORAGE_KEY).then((value) => {
    if (version === selectionVersion && !queryOverride) {
      const saved = parseStoredLanguage(value);
      if (saved) apply(saved);
    }
    if (typeof document !== 'undefined') document.documentElement.lang = current;
    return current;
  });
  return initialLoad;
}

export function getLanguage(): Language {
  return current;
}

export function setLanguage(language: Language): void {
  if (!LANGUAGES.includes(language)) throw new RangeError('Nieobsługiwany język: ' + language);
  selectionVersion++;
  apply(language);
  void platform.storage.set(LANGUAGE_STORAGE_KEY, language);
}

export function onLanguageChange(callback: (language: Language) => void): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function getTexts(): GameLocale {
  return dictionaries[current];
}

export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  const dict = getTexts();
  let template: string;
  if (key.startsWith('ui.')) template = dict.UI[key.slice(3) as UiKey];
  else if (key.startsWith('menu.')) template = dict.MENU[key.slice(5) as MenuKey];
  else if (key.startsWith('country.')) template = dict.COUNTRY_NAME[key.slice(8) as CountryCode];
  else if (key.startsWith('obstacle.')) template = dict.OBSTACLE_NAME[key.slice(9) as ObstacleKind];
  else template = dict.UI[key as UiKey];
  return pl.fill(template, vars ?? {});
}

/** Istniejąca logika korzysta z obiektów/typów tablic: Proxy odczytuje bieżący słownik. */
function liveSection<K extends keyof GameLocale>(key: K, original: GameLocale[K]): GameLocale[K] {
  return new Proxy(original, {
    get(_target, property) { return Reflect.get(getTexts()[key], property); },
  });
}

export const COUNTRY_NAME = liveSection('COUNTRY_NAME', pl.COUNTRY_NAME);
export const COUNTRY_LOCATIVE = liveSection('COUNTRY_LOCATIVE', pl.COUNTRY_LOCATIVE);
export const OBSTACLE_NAME = liveSection('OBSTACLE_NAME', pl.OBSTACLE_NAME);
export const FAIL_JOKES = liveSection('FAIL_JOKES', pl.FAIL_JOKES);
export const PICKUP_TOAST = liveSection('PICKUP_TOAST', pl.PICKUP_TOAST);
export const BORDER_TEXTS = liveSection('BORDER_TEXTS', pl.BORDER_TEXTS);
export const ARRIVAL_TEXTS = liveSection('ARRIVAL_TEXTS', pl.ARRIVAL_TEXTS);
export const NEAR_MISS_TEXTS = liveSection('NEAR_MISS_TEXTS', pl.NEAR_MISS_TEXTS);
export const PICKUP_TEXTS = liveSection('PICKUP_TEXTS', pl.PICKUP_TEXTS);
export const MILESTONE_TEXTS = liveSection('MILESTONE_TEXTS', pl.MILESTONE_TEXTS);
export const WIGILIA_TEXTS = liveSection('WIGILIA_TEXTS', pl.WIGILIA_TEXTS);
export const UI = liveSection('UI', pl.UI);
export const MENU = liveSection('MENU', PL_MENU);
export { fill } from './lang/pl';

// Ładuje zapisany wybór również w aplikacjach natywnych bez zmian w bootstrapie.
void initializeLanguage();
