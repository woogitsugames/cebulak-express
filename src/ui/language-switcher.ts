import {
  LANGUAGE_NAMES, LANGUAGES, getLanguage, initializeLanguage, onLanguageChange,
  setLanguage, t, type Language,
} from '../content/i18n';

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

  text('#menu .tagline', t('menu.tagline'));
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
