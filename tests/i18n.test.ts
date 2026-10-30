import { afterEach, describe, expect, it } from 'vitest';
import {
  ARRIVAL_TEXTS, BORDER_TEXTS, COUNTRY_NAME, FAIL_JOKES, LANGUAGES,
  MILESTONE_TEXTS, NEAR_MISS_TEXTS, PICKUP_TEXTS, UI, WIGILIA_TEXTS,
  getLanguage, getTexts, loadLanguage, onLanguageChange, setLanguage, t,
} from '../src/content/i18n';
import { cityNameForShare, localizedCityName } from '../src/content/lang/cities';
import { PL_CITIES, START_CITIES } from '../src/core/route';
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
