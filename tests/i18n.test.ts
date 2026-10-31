import { afterEach, describe, expect, it } from 'vitest';
import {
  ARRIVAL_TEXTS, BORDER_TEXTS, COUNTRY_NAME, FAIL_JOKES, GHOST_TEXTS, LANGUAGES,
  MILESTONE_TEXTS, NEAR_MISS_TEXTS, PICKUP_TEXTS, POWERUP_NAME, RETURN_ARRIVAL_TEXTS,
  RETURN_DEPARTURE_TEXTS, UI, WIGILIA_TEXTS,
  getLanguage, getTexts, loadLanguage, onLanguageChange, setLanguage, t,
} from '../src/content/i18n';
import { cityNameForShare, localizedCityName } from '../src/content/lang/cities';
import { PL_MENU, type ForeignLocale } from '../src/content/lang/schema';
import { waypointText } from '../src/content/waypoint-text';
import * as ALL_WAYPOINTS from '../src/content/waypoints';
import { FUNNY_PLACES } from '../src/content/funny-places';
import { AUSFAHRT_JOKES } from '../src/render/signs';
import { DAILY_TITLE_TEXTS, dailyTitle } from '../src/core/daily';
import { PL_CITIES, START_CITIES, makeRoute } from '../src/core/route';
import { MEDAL_IDS, POSTCARDS } from '../src/meta/progress';
import { UNLOCK_TEXT, UNLOCKABLE_CARS, unlockAnnouncement, unlockHint } from '../src/meta/unlocks';
import { CARD_TEXT, cardShareText } from '../src/share/card';
import { SHARE_TEXT } from '../src/share/share';
import { COLLECTION_TEXT } from '../src/ui/collection-text';
import { LEAGUE_TEXT } from '../src/ui/league';
import { ONBOARDING_TEXT } from '../src/ui/onboarding';
import * as pl from '../src/content/pl';

const initial = getLanguage();
afterEach(() => setLanguage(initial));

describe('Wersje językowe 58', () => {
  for (const language of LANGUAGES) {
    it(`ma pełne słowniki i poprawne placeholdery: ${language}`, async () => {
      setLanguage(language);
      await loadLanguage(language);
      const dict = getTexts();
      expect(Object.keys(dict.UI).sort()).toEqual(Object.keys(pl.UI).sort());
      expect(Object.keys(dict.COUNTRY_NAME).sort()).toEqual(Object.keys(pl.COUNTRY_NAME).sort());
      expect(Object.keys(dict.FAIL_JOKES).sort()).toEqual(Object.keys(pl.FAIL_JOKES).sort());
      expect(Object.keys(dict.BORDER_TEXTS).sort()).toEqual(Object.keys(pl.BORDER_TEXTS).sort());

      expect(Object.values(dict.FAIL_JOKES).every((pool) => pool.length >= 8)).toBe(true);
      expect(Object.values(dict.BORDER_TEXTS).every((pool) => pool.length >= 4)).toBe(true);
      expect([...dict.PICKUP_TEXTS.parcel, ...dict.PICKUP_TEXTS.jar].every((text) => text.includes('{km}'))).toBe(true);
      expect(dict.MILESTONE_TEXTS.every((text) => text.includes('{km}'))).toBe(true);
      expect(t('best', { km: 123 })).toContain('123');
      expect(t('menu.start').length).toBeGreaterThan(0);
      expect(t('country.BE')).toBe(dict.COUNTRY_NAME.BE);
      expect(t('obstacle.ground')).toBe(dict.OBSTACLE_NAME.ground);
      expect(t('ui.welcome', { where: dict.COUNTRY_LOCATIVE.BE })).toContain(dict.COUNTRY_LOCATIVE.BE);

      for (const toast of [
        ...Object.values(dict.BORDER_TEXTS).flat(), ...dict.NEAR_MISS_TEXTS,
        ...[...dict.PICKUP_TEXTS.parcel, ...dict.PICKUP_TEXTS.jar], ...dict.MILESTONE_TEXTS,
        ...dict.WIGILIA_TEXTS,
      ]) {
        expect(Array.from(toast.replaceAll('{km}', '999999')).length, toast).toBeLessThanOrEqual(60);
      }
    });
  }

  it('udostępnia bieżący język również przez dawne obiekty i tablice', async () => {
    setLanguage('en');
    await loadLanguage('en');
    expect(COUNTRY_NAME.BE).toBe('Belgium');
    expect(UI.over).toBe('End of the road!');
    expect(ARRIVAL_TEXTS[0]).toContain('home');
    expect(FAIL_JOKES.ground[0]).toContain('Gravity');
    expect(BORDER_TEXTS.NL[0]).toContain('Netherlands');
    expect(PICKUP_TEXTS.jar[0]).toContain('{km}');
    expect(MILESTONE_TEXTS[0]).toContain('Coffee');
    expect(NEAR_MISS_TEXTS.length).toBeGreaterThan(8);
    expect(WIGILIA_TEXTS.length).toBeGreaterThan(15);
    setLanguage('pl');
    expect(UI.over).toBe(pl.UI.over);
    expect(ARRIVAL_TEXTS[0]).toBe(pl.ARRIVAL_TEXTS[0]);
  });

  it('odmienia wyłącznie polskie nazwy miast', () => {
    const antwerp = START_CITIES.BE.find((city) => city.id === 'antwerpia')!;
    const warsaw = PL_CITIES.find((city) => city.id === 'warszawa')!;
    expect(cityNameForShare(antwerp, 'from', 'pl')).toBe('Antwerpii');
    expect(cityNameForShare(warsaw, 'to', 'pl')).toBe('Warszawy');
    expect(cityNameForShare(antwerp, 'from', 'en')).toBe('Antwerp');
    expect(cityNameForShare(antwerp, 'to', 'nl')).toBe('Antwerpen');
    expect(cityNameForShare(antwerp, 'from', 'fr')).toBe('Anvers');
    expect(localizedCityName(warsaw, 'de')).toBe('Warschau');
  });

  it('powiadamia o zmianie i pozwala usunąć subskrypcję', () => {
    setLanguage('pl');
    const observed: string[] = [];
    const unsubscribe = onLanguageChange((lang) => observed.push(lang));
    setLanguage('fr');
    unsubscribe();
    setLanguage('en');
    expect(observed).toEqual(['fr']);
  });
});

// --- Wszystkie teksty dla gracza przez i18n (sekcje dotąd wyłącznie po polsku) ---

/** Polskie teksty punktów trasy wg klucza tłumaczenia (textKey ?? id). */
function polishWaypointTexts(): Map<string, string> {
  const texts = new Map<string, string>();
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (!value || typeof value !== 'object') return;
    const point = value as { id?: unknown; text?: unknown; textKey?: string };
    if (typeof point.id === 'string' && typeof point.text === 'string') {
      const key = point.textKey ?? point.id;
      const known = texts.get(key);
      // Ten sam klucz musi zawsze oznaczać ten sam polski tekst — inaczej potrzebny nowy textKey.
      expect(known === undefined || known === point.text, `${key}: ${known} / ${point.text}`).toBe(true);
      texts.set(key, point.text);
      return;
    }
    Object.values(value).forEach(visit);
  };
  visit(Object.values(ALL_WAYPOINTS));
  return texts;
}

const placeholders = (text: string): string[] => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
/**
 * Słowo zaczynające się małą literą z polskim znakiem = nieprzetłumaczone polskie zdanie.
 * Nazwy własne (Łódź, Świnoujście) piszemy wielką literą, więc ich nie liczymy.
 */
const polishWord = (language: string): RegExp => language === 'en' || language === 'nl'
  ? /(?<![\p{L}])\p{Ll}*[ąęłńóśźż]\p{L}*/u
  : /(?<![\p{L}])\p{Ll}*[ąęłńśźż]\p{L}*/u;
const FORBIDDEN = /(^|[^\p{L}])(cebulak\p{L}*|beer|bier|wine|wijn|wein|vin|bière|vodka|wodka|whisky|alcohol|alkohol|alcool)(?=$|[^\p{L}])/iu;

async function foreign(language: 'en' | 'nl' | 'de' | 'fr'): Promise<ForeignLocale> {
  setLanguage(language);
  await loadLanguage(language);
  return getTexts() as ForeignLocale;
}

function expectSameShape(label: string, dict: Readonly<Record<string, string>>, source: Readonly<Record<string, string>>): void {
  expect(Object.keys(dict).sort(), label).toEqual(Object.keys(source).sort());
  for (const [key, value] of Object.entries(source)) {
    expect(placeholders(dict[key]), `${label}.${key}`).toEqual(placeholders(value));
    expect(dict[key].trim().length, `${label}.${key}`).toBeGreaterThan(0);
  }
}

/** Wszystkie nowe teksty języka (do wspólnych kontroli treści). */
function newTexts(dict: ForeignLocale): string[] {
  return [
    ...Object.values(dict.WAYPOINTS), ...Object.values(dict.FUNNY_PLACES),
    ...dict.DAILY_TITLES.regular, ...dict.DAILY_TITLES.friday,
    ...Object.values(dict.DAILY_TITLES.dates), ...Object.values(dict.DAILY_TITLES.monthDays),
    ...Object.values(dict.ONBOARDING), ...Object.values(dict.COLLECTION),
    ...Object.values(dict.MEDALS).flatMap((medal) => [medal.name, medal.description]),
    ...Object.values(dict.CARS), ...Object.values(dict.UNLOCK), ...Object.values(dict.LEAGUE),
    ...Object.values(dict.CARD), ...Object.values(dict.SHARE), ...Object.values(dict.GHOST_TEXTS),
    ...Object.values(dict.POWERUP_NAME), ...dict.RETURN_DEPARTURE_TEXTS, ...dict.RETURN_ARRIVAL_TEXTS,
    dict.UI.lives, dict.UI.waypointStart, dict.UI.waypointHome,
    dict.MENU.mainMenu, dict.MENU.distanceLabel, dict.MENU.miniLeague,
  ];
}

describe('Teksty spoza dawnych słowników — kompletne w każdym języku', () => {
  const waypoints = polishWaypointTexts();

  for (const language of ['en', 'nl', 'de', 'fr'] as const) {
    it(`ma wszystkie klucze i zgodne {placeholdery}: ${language}`, async () => {
      const dict = await foreign(language);

      expect(Object.keys(dict.WAYPOINTS).sort()).toEqual([...waypoints.keys()].sort());
      for (const [key, text] of Object.entries(dict.WAYPOINTS)) {
        expect(text, key).not.toBe(waypoints.get(key));
        expect(Array.from(text).length, text).toBeLessThanOrEqual(64);
      }
      expect(Object.keys(dict.FUNNY_PLACES).sort()).toEqual([
        ...FUNNY_PLACES.map((place) => place.id), ...AUSFAHRT_JOKES.map((_, i) => 'de-ausfahrt-' + i),
      ].sort());
      for (const place of FUNNY_PLACES) {
        const joke = dict.FUNNY_PLACES[place.id];
        // Prawdziwa nazwa z tablicy zostaje; zmienia się tylko dymek.
        expect(joke.startsWith(place.name.split(' ')[0]), joke).toBe(true);
        expect(joke).not.toBe(place.joke);
        expect(Array.from(joke).length, joke).toBeLessThanOrEqual(90);
      }
      const postcardIds = new Set(POSTCARDS.map((card) => card.id));
      for (const id of Object.keys(dict.PLACE_NAMES)) expect(postcardIds.has(id), id).toBe(true);

      expect(dict.DAILY_TITLES.regular).toHaveLength(DAILY_TITLE_TEXTS.regular.length);
      expect(dict.DAILY_TITLES.friday).toHaveLength(DAILY_TITLE_TEXTS.friday.length);
      expect(new Set(dict.DAILY_TITLES.regular).size).toBe(dict.DAILY_TITLES.regular.length);
      expectSameShape('DAILY_TITLES.dates', dict.DAILY_TITLES.dates, DAILY_TITLE_TEXTS.dates);
      expectSameShape('DAILY_TITLES.monthDays', dict.DAILY_TITLES.monthDays, DAILY_TITLE_TEXTS.monthDays);

      expectSameShape('ONBOARDING', dict.ONBOARDING, ONBOARDING_TEXT);
      expectSameShape('COLLECTION', dict.COLLECTION, COLLECTION_TEXT);
      expectSameShape('UNLOCK', dict.UNLOCK, UNLOCK_TEXT);
      expectSameShape('LEAGUE', dict.LEAGUE, LEAGUE_TEXT);
      expectSameShape('CARD', dict.CARD, CARD_TEXT);
      expectSameShape('SHARE', dict.SHARE, SHARE_TEXT);
      expectSameShape('GHOST_TEXTS', dict.GHOST_TEXTS, pl.GHOST_TEXTS);
      expectSameShape('POWERUP_NAME', dict.POWERUP_NAME, pl.POWERUP_NAME);
      expectSameShape('UI', dict.UI, pl.UI);
      expectSameShape('MENU', dict.MENU, PL_MENU);
      expect(Object.keys(dict.MEDALS).sort()).toEqual([...MEDAL_IDS].sort());
      expect(Object.keys(dict.CARS).sort()).toEqual(UNLOCKABLE_CARS.map((car) => car.id).sort());

      expect(dict.RETURN_DEPARTURE_TEXTS.length).toBe(pl.RETURN_DEPARTURE_TEXTS.length);
      expect(dict.RETURN_ARRIVAL_TEXTS.length).toBe(pl.RETURN_ARRIVAL_TEXTS.length);
      expect(dict.RETURN_DEPARTURE_TEXTS.every((text) => placeholders(text).length === 0)).toBe(true);
      expect(dict.RETURN_ARRIVAL_TEXTS.every((text) => placeholders(text).join() === 'city')).toBe(true);
    });

    it(`nie zwraca polskich zdań ani zakazanych słów: ${language}`, async () => {
      const dict = await foreign(language);
      const pattern = polishWord(language);
      for (const text of newTexts(dict)) {
        expect(text.match(pattern)?.[0], text).toBeUndefined();
        expect(FORBIDDEN.test(text), text).toBe(false);
      }
    });
  }

  it('podmienia teksty w działającej grze po zmianie języka', async () => {
    const route = makeRoute('BE', 'antwerpia', 'rzeszow');
    const first = route.waypoints[0];
    const home = route.waypoints[route.waypoints.length - 1];
    const card = {
      km: 684.6, totalKm: route.totalKm, arrived: false, seconds: 46.5,
      from: route.from, to: route.to, home: 'BE' as const, causeText: '',
    };

    setLanguage('pl');
    expect(waypointText(first)).toBe(first.text);
    expect(waypointText(home)).toBe('Rzeszów. Jesteś w domu!');
    expect(dailyTitle('2026-12-24')).toBe('Na Wigilię!');
    expect(unlockAnnouncement('kompakt-szwagra')).toBe('Nowe auto w garażu: Kompakt od szwagra!');
    expect(GHOST_TEXTS.challengeButton).toBe(pl.GHOST_TEXTS.challengeButton);

    const en = await foreign('en');
    expect(waypointText(first)).toBe(en.WAYPOINTS.antwerpia);
    expect(waypointText(home)).toBe("Rzeszów. You're home!");
    expect(waypointText({ id: 'gandawa', name: 'Gandawa', text: 'x', textKey: 'start' })).toBe('Ghent. Heading home!');
    expect(waypointText({ id: 'reims', name: 'Reims', text: 'x', textKey: 'reims-2' })).toBe(en.WAYPOINTS['reims-2']);
    expect(dailyTitle('2026-12-24', en.DAILY_TITLES)).toBe('Home for Christmas Eve!');
    for (const key of ['2026-12-02', '2026-12-04', '2027-01-15']) {
      const polish = dailyTitle(key);
      const pool: readonly string[] = DAILY_TITLE_TEXTS.regular.includes(polish as never)
        ? DAILY_TITLE_TEXTS.regular : DAILY_TITLE_TEXTS.friday;
      const translated = pool === DAILY_TITLE_TEXTS.regular ? en.DAILY_TITLES.regular : en.DAILY_TITLES.friday;
      expect(dailyTitle(key, en.DAILY_TITLES)).toBe(translated[pool.indexOf(polish)]);
    }
    expect(unlockAnnouncement('kompakt-szwagra')).toBe("New car in the garage: Brother-in-law's compact!");
    expect(unlockHint('kompakt-szwagra', 1_180)).toBe('Unlocks at 1 500 km in total (320 km to go)');
    expect(cardShareText(card)).toBe('I flew 685 km from Antwerp towards Rzeszów! Beat that?');
    expect(POWERUP_NAME.tailwind).toBe('Tailwind');
    expect(RETURN_ARRIVAL_TEXTS.every((text) => text.includes('{city}'))).toBe(true);
    expect(RETURN_DEPARTURE_TEXTS[0]).toContain('Mum');
    expect(localizedCityName({ id: 'norymberga', name: 'Norymberga' })).toBe('Nuremberg');

    await foreign('de');
    expect(localizedCityName({ id: 'norymberga', name: 'Norymberga' })).toBe('Nürnberg');
    expect(localizedCityName({ id: 'norymberga', name: 'Norymberga' }, 'pl')).toBe('Norymberga');
    expect(GHOST_TEXTS.challengeButton).toBe('Freunde herausfordern');
  });
});
