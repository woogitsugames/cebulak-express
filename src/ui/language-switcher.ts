import {
  GHOST_TEXTS, LANGUAGE_NAMES, LANGUAGES, getLanguage, initializeLanguage, onLanguageChange,
  setLanguage, t, type Language,
} from '../content/i18n';
import { localizedCityName } from '../content/lang/cities';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, type City } from '../core/route';

const LANGUAGE_LABEL: Record<Language, string> = {
  pl: 'Język', en: 'Language', nl: 'Taal', de: 'Sprache', fr: 'Langue',
};

/**
 * Lokalizuje teksty wpisane w index.html bez modyfikowania jego struktury.
 * Koordynator powinien wywołać tę funkcję po inicjalizacji menu i po zmianie języka.
 */
export function localizeStaticScreens(root: ParentNode = document): void {
  const text = (selector: string, value: string): void => {
    const node = root.querySelector<HTMLElement>(selector);
    if (node) node.textContent = value;
  };
  const label = (selector: string, value: string): void => {
    const element = root.querySelector<HTMLSelectElement>(selector);
    const container = element?.closest('label');
    if (!container) return;
    const prefix = [...container.childNodes].find((node) => node.nodeType === 3);
    if (prefix) prefix.textContent = value + ' ';
  };

  // Logo ma polski napis „Kierunek Polska”; w innych językach tłumaczymy go w podtytule.
  const subtitle = root.querySelector<HTMLElement>('#menu .menu-subtitle');
  if (subtitle) {
    subtitle.dataset.pl ??= subtitle.textContent ?? '';
    subtitle.textContent = getLanguage() === 'pl' ? subtitle.dataset.pl : t('menu.tagline');
  }
  root.querySelector('#menu .menu-logo img')?.setAttribute('alt', t('menu.gameLabel'));
  label('#sel-home', t('menu.homeLabel'));
  label('#sel-from', t('menu.fromLabel'));
  label('#sel-to', t('menu.toLabel'));
  const modes = root.querySelector<HTMLElement>('#menu .modes');
  modes?.setAttribute('aria-label', t('menu.modeLabel'));
  text('.mode[data-mode="ranked"]', t('modeRanked'));
  text('.mode[data-mode="cozy"]', t('modeCozy'));
  text('#btn-start', t('menu.start'));
  text('#btn-daily', t('daily'));
  text('#btn-league', t('league'));
  text('#btn-garage', t('menu.garageButton'));
  text('#btn-league-close', t('close'));
  text('#btn-again', t('again'));
  text('#btn-share', t('share'));
  text('#btn-menu', t('menu.backToMenu'));
  text('#route-toggle strong', t('menu.backToMenu'));
  text('#btn-album', t('menu.albumButton'));
  text('#btn-return-flight', t('returnFlight'));
  text('#btn-challenge', GHOST_TEXTS.challengeButton);
  text('#over .over-eyebrow', t('menu.distanceLabel'));
  const aria = (selector: string, value: string): void => root.querySelector(selector)?.setAttribute('aria-label', value);
  aria('#menu', t('menu.mainMenu'));
  aria('#league', t('league'));
  aria('#garage', t('garage'));
  aria('#album', t('menu.albumButton'));
  aria('#over-mini-league', t('menu.miniLeague'));
  // Nagłówek mini-ligi ma ikonę i znacznik TOP 3 — podmieniamy tylko węzeł tekstowy.
  const miniTitle = [...(root.querySelector('#over-mini-league h3')?.childNodes ?? [])]
    .find((node) => node.nodeType === 3 && node.textContent?.trim());
  if (miniTitle) miniTitle.textContent = ' ' + t('league') + ' ';
  if (root.querySelector<HTMLElement>('#over')?.hidden) {
    text('#over-title', t('over'));
  }
  root.querySelector('#game')?.setAttribute('aria-label', t('menu.gameLabel'));
}

/**
 * Samodzielny kontroler ustawień języka. Nie dotyka logiki symulacji gry.
 * refresh przelicza zależne od języka dane menu (np. etykiety krajów i miast).
 */
export function mountLanguageSwitcher(container: HTMLElement, refresh?: () => void): () => void {
  const label = document.createElement('label');
  label.className = 'ce-language-setting';
  label.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin:10px auto;font:inherit';
  const title = document.createElement('span');
  const select = document.createElement('select');
  select.id = 'ce-language';
  select.name = 'language';
  select.setAttribute('aria-label', LANGUAGE_LABEL[getLanguage()]);
  select.style.cssText = 'font:inherit;max-width:100%;padding:6px 10px;border-radius:8px';
  for (const language of LANGUAGES) {
    const option = document.createElement('option');
    option.value = language;
    option.textContent = LANGUAGE_NAMES[language];
    select.add(option);
  }
  label.append(title, select);
  container.append(label);

  const sync = (): void => {
    select.value = getLanguage();
    title.textContent = LANGUAGE_LABEL[getLanguage()] + ':';
    select.setAttribute('aria-label', LANGUAGE_LABEL[getLanguage()]);
    localizeStaticScreens();
    refresh?.();
  };
  const changed = (): void => {
    const language = LANGUAGES.find((item) => item === select.value);
    if (language) setLanguage(language);
  };
  select.addEventListener('change', changed);
  const unsubscribe = onLanguageChange(sync);
  sync();
  void initializeLanguage().then(sync);

  return () => {
    select.removeEventListener('change', changed);
    unsubscribe();
    label.remove();
  };
}

/**
 * Bootstrap samodzielnego modułu: jedyna zmiana w main.ts to import.
 * Nie modyfikuje stanu gry, tras ani zdarzeń symulacji.
 */
export function enableLanguageUi(): () => void {
  const menu = document.getElementById('menu');
  if (!menu) return () => {};

  const allCities: City[] = [...HOME_COUNTRIES.flatMap((country) => START_CITIES[country]), ...PL_CITIES];
  const findCity = (name: string): City | undefined =>
    allCities.find((city) => city.name === name || LANGUAGES.some((language) => localizedCityName(city, language) === name));
  const display = (city: City | undefined, fallback: string): string =>
    city ? localizedCityName(city) : fallback;

  const refreshResult = (): void => {
    const result = document.getElementById('over-route');
    const match = result?.textContent?.match(/^(.+?)\s*→\s*(.+?)$/);
    if (!result || !match) return;
    const translated = `${display(findCity(match[1]), match[1])} → ${display(findCity(match[2]), match[2])}`;
    if (result.textContent !== translated) result.textContent = translated;
  };

  // Pola trasy (#sel-home/#sel-from/#sel-to, #route-info) należą wyłącznie do menu w main.ts,
  // które samo przerysowuje je po zmianie języka. Ten moduł ładuje się leniwie po pierwszej
  // klatce, więc nie może ich dotykać: poprawianie tekstów opcji w trakcie wyboru kraju
  // przeliczało w WebKit zaznaczenie pól (pusta lub cofnięta wartość).
  const disposeSwitcher = mountLanguageSwitcher(menu, refreshResult);
  const overRoute = document.getElementById('over-route');
  const observer = typeof MutationObserver !== 'undefined' && overRoute
    ? new MutationObserver(refreshResult)
    : undefined;
  if (observer && overRoute) observer.observe(overRoute, { childList: true, characterData: true, subtree: true });
  // Sygnał gotowości menu: przełącznik zamontowany, zapisany język wczytany i teksty
  // zlokalizowane (sync w mountLanguageSwitcher subskrybuje initializeLanguage wcześniej).
  // Od tej chwili leniwy moduł nie zmienia już układu menu — testy i automaty czekają na to.
  void initializeLanguage().then(() => { menu.dataset.ready = 'true'; });
  return () => {
    delete menu.dataset.ready;
    observer?.disconnect();
    disposeSwitcher();
  };
}

// main.ts ładuje ten moduł wyłącznie importem, bez zmian w istniejącej logice.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enableLanguageUi(), { once: true });
  } else {
    queueMicrotask(() => enableLanguageUi());
  }
}
