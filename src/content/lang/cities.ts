import type { City } from '../../core/route';
import { getLanguage, type Language } from '../i18n';

/** Odmiany polskie pozostają w rdzeniu. W pozostałych językach używamy form podstawowych. */
const CITY_NAMES: Record<string, Partial<Record<Language, string>>> = {
  bruksela: { en: 'Brussels', nl: 'Brussel', de: 'Brüssel', fr: 'Bruxelles' },
  antwerpia: { en: 'Antwerp', nl: 'Antwerpen', de: 'Antwerpen', fr: 'Anvers' },
  gandawa: { en: 'Ghent', nl: 'Gent', de: 'Gent', fr: 'Gand' },
  berlin: { nl: 'Berlijn' },
  monachium: { en: 'Munich', nl: 'München', de: 'München', fr: 'Munich' },
  kolonia: { en: 'Cologne', nl: 'Keulen', de: 'Köln', fr: 'Cologne' },
  hamburg: { fr: 'Hambourg' },
  londyn: { en: 'London', nl: 'Londen', de: 'London', fr: 'Londres' },
  edynburg: { en: 'Edinburgh', nl: 'Edinburgh', de: 'Edinburgh', fr: 'Édimbourg' },
  paryz: { en: 'Paris', nl: 'Parijs', de: 'Paris', fr: 'Paris' },
  lille: { nl: 'Rijsel' },
  zurych: { en: 'Zurich', nl: 'Zürich', de: 'Zürich', fr: 'Zurich' },
  genewa: { en: 'Geneva', nl: 'Genève', de: 'Genf', fr: 'Genève' },
  bazylea: { en: 'Basel', nl: 'Bazel', de: 'Basel', fr: 'Bâle' },
  kopenhaga: { en: 'Copenhagen', nl: 'Kopenhagen', de: 'Kopenhagen', fr: 'Copenhague' },
  warszawa: { en: 'Warsaw', nl: 'Warschau', de: 'Warschau', fr: 'Varsovie' },
  krakow: { en: 'Kraków', nl: 'Krakau', de: 'Krakau', fr: 'Cracovie' },
  wroclaw: { de: 'Breslau' },
  gdansk: { de: 'Danzig' },
  szczecin: { de: 'Stettin' },
};

/** Nazwy niewymienione w tabeli zachowują polską/lokalną postać z City.name. */
export function localizedCityName(city: Pick<City, 'id' | 'name'>, language: Language = getLanguage()): string {
  return language === 'pl' ? city.name : CITY_NAMES[city.id]?.[language] ?? city.name;
}

/**
 * Na karcie udostępnienia używamy istniejącej polskiej odmiany wyłącznie dla PL.
 * EN/NL/DE/FR nie otrzymują nigdy form fromName/toName.
 */
export function cityNameForShare(city: City, position: 'from' | 'to', language: Language = getLanguage()): string {
  if (language === 'pl') return position === 'from' ? city.fromName : city.toName;
  return localizedCityName(city, language);
}
