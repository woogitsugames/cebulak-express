import { COUNTRY_NAME, localized } from '../content/i18n';
import { localizedCityName } from '../content/lang/cities';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, type City, type HomeCountry } from '../core/route';
import { platform } from '../platform';
import './onboarding.css';

export const ONBOARDING_STORAGE_KEY = 'ce.onboarding.v1.done';

/** Propozycja tekstów do przeniesienia do UI w src/content/pl.ts przez koordynatora. */
export const ONBOARDING_TEXT = {
  dialog: 'Pierwsze uruchomienie',
  stepCountry: '1 / 2',
  stepCity: '2 / 2',
  countryTitle: 'Skąd lecisz do domu?',
  countryHint: 'Wybierz kraj, w którym mieszkasz.',
  countryChoose: 'Wybierz kraj',
  cityTitle: 'Dokąd w Polsce?',
  cityHint: 'Wybierz miasto i od razu ruszamy!',
  origin: 'Startujesz z',
  search: 'Wyszukaj miasto w Polsce',
  searchPlaceholder: 'Wpisz nazwę miasta…',
  popular: 'Najpopularniejsze',
  other: 'Pozostałe miasta',
  results: 'Pasujące miasta',
  noResults: 'Nie znaleziono miasta. Spróbuj innej nazwy.',
  back: 'Wróć do wyboru kraju',
  direction: 'Kierunek: Polska',
} as const;

export interface OnboardingOptions {
  onDone(home: HomeCountry, from: string, to: string): void;
}

/** Link z wyniku pomija onboarding niezależnie od wartości `r`. */
export async function shouldShowOnboarding(search: string | URLSearchParams): Promise<boolean> {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  if (params.has('r') || params.get('redakcja') === '1' || params.get('test') === '1') return false;
  return (await platform.storage.get(ONBOARDING_STORAGE_KEY)) !== '1';
}

const POPULAR = [
  'warszawa', 'krakow', 'wroclaw', 'poznan', 'gdansk', 'lodz', 'katowice', 'szczecin',
] as const;
const popularOrder = new Map<string, number>(POPULAR.map((id, index) => [id, index]));

/** Sortowanie stabilne semantycznie: duże miasta, potem alfabet PL. */
export function sortedOnboardingCities(cities: readonly City[] = PL_CITIES): City[] {
  return [...cities].sort((a, b) =>
    (popularOrder.get(a.id) ?? Infinity) - (popularOrder.get(b.id) ?? Infinity)
    || a.name.localeCompare(b.name, 'pl'),
  );
}

export function searchOnboardingCities(query: string, cities: readonly City[] = PL_CITIES): City[] {
  const normalized = (value: string): string => value
    .toLocaleLowerCase('pl').replace(/ł/g, 'l').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').trim();
  const needle = normalized(query);
  return sortedOnboardingCities(cities).filter((city) =>
    normalized(city.name).includes(needle) || normalized(localizedCityName(city)).includes(needle));
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K, cls: string, value?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = cls;
  if (value !== undefined) node.textContent = value;
  return node;
}

function image(path: string, cls: string): HTMLImageElement {
  const img = element('img', cls);
  const base = (import.meta.env?.BASE_URL ?? '/').replace(/\/?$/, '/');
  img.src = base + 'assets/' + path;
  img.alt = '';
  img.decoding = 'async';
  img.setAttribute('aria-hidden', 'true');
  return img;
}

/** Dwa ekrany DOM, bez ingerencji w silnik. Zwraca idempotentny disposer. */
export function mountOnboarding(container: HTMLElement, opts: OnboardingOptions): () => void {
  let disposed = false;
  const T = localized('ONBOARDING') ?? ONBOARDING_TEXT;
  let step: 'country' | 'city' = 'country';
  let selectedHome: HomeCountry = HOME_COUNTRIES[0];
  let selectedFrom = START_CITIES[selectedHome][0].id;
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const root = element('section', 'ce-onboarding');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', T.dialog);
  root.addEventListener('pointerdown', (event) => event.stopPropagation());
  // Aktywne menu w tle nie może przejąć klawiszy podczas wyboru.
  root.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      if (step === 'city') renderCountry();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = [...root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled])',
      )].filter((node) => node.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  const card = element('div', 'ce-onboarding__card');
  root.append(element('div', 'ce-onboarding__sun'), element('div', 'ce-onboarding__cloud'), card);
  container.append(root);

  function heading(title: string, hint: string, progress: string): HTMLElement {
    const section = element('header', 'ce-onboarding__heading');
    section.append(
      element('span', 'ce-onboarding__step', progress),
      element('h1', 'ce-onboarding__title', title),
      element('p', 'ce-onboarding__hint', hint),
    );
    return section;
  }

  function renderCountry(): void {
    if (disposed) return;
    step = 'country';
    card.classList.add('ce-onboarding__card--country');
    const header = heading(T.countryTitle, T.countryHint, T.stepCountry);
    const hero = element('div', 'ce-onboarding__hero');
    hero.append(image('hero/kombi-body.png', 'ce-onboarding__car'));
    hero.setAttribute('aria-hidden', 'true');
    const grid = element('div', 'ce-onboarding__flags');
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', T.countryChoose);
    const buttons = HOME_COUNTRIES.map((home) => {
      const button = element('button', 'ce-onboarding__flag');
      button.type = 'button';
      button.dataset.home = home;
      button.setAttribute('aria-label', `${T.countryChoose}: ${COUNTRY_NAME[home]}`);
      button.append(image(`ui/flag-${home.toLowerCase()}.png`, 'ce-onboarding__flag-image'),
        element('span', 'ce-onboarding__flag-name', COUNTRY_NAME[home]));
      button.addEventListener('click', () => {
        selectedHome = home;
        selectedFrom = START_CITIES[home][0].id;
        renderCity();
      });
      return button;
    });
    grid.append(...buttons);
    const footer = element('div', 'ce-onboarding__footer', T.direction);
    footer.prepend(image('ui/flag-pl.png', 'ce-onboarding__footer-flag'));
    card.replaceChildren(header, hero, grid, footer);
    root.scrollTop = 0;
    buttons[0]?.focus({ preventScroll: true });
  }

  function renderCity(): void {
    if (disposed) return;
    step = 'city';
    card.classList.remove('ce-onboarding__card--country');
    const back = element('button', 'ce-onboarding__back', '‹');
    back.type = 'button';
    back.setAttribute('aria-label', T.back);
    back.addEventListener('click', renderCountry);
    const country = element('div', 'ce-onboarding__selected-country');
    country.append(image(`ui/flag-${selectedHome.toLowerCase()}.png`, ''),
      element('span', '', COUNTRY_NAME[selectedHome]));
    const nav = element('div', 'ce-onboarding__nav');
    nav.append(back, country);
    const header = heading(T.cityTitle, T.cityHint, T.stepCity);

    const originLabel = element('label', 'ce-onboarding__field-label', T.origin);
    const origin = element('select', 'ce-onboarding__origin');
    for (const city of START_CITIES[selectedHome]) {
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = localizedCityName(city);
      origin.append(option);
    }
    origin.value = selectedFrom;
    originLabel.append(origin);
    origin.addEventListener('change', () => { selectedFrom = origin.value; });

    const searchLabel = element('label', 'ce-onboarding__field-label', T.search);
    const input = element('input', 'ce-onboarding__search');
    input.type = 'search';
    input.autocomplete = 'off';
    input.placeholder = T.searchPlaceholder;
    input.setAttribute('aria-label', T.search);
    searchLabel.append(input);

    const cities = element('div', 'ce-onboarding__cities');
    cities.setAttribute('role', 'group');
    cities.setAttribute('aria-label', T.cityTitle);
    const scroller = element('div', 'ce-onboarding__scroll');
    scroller.append(cities);

    function finish(to: string): void {
      if (disposed) return;
      // Nie zapisujemy ukończenia, jeżeli callback rzuci wyjątek.
      opts.onDone(selectedHome, selectedFrom, to);
      void platform.storage.set(ONBOARDING_STORAGE_KEY, '1');
      dispose();
    }

    function renderList(): void {
      const matches = searchOnboardingCities(input.value);
      const buttons: HTMLElement[] = [];
      if (!matches.length) {
        cities.replaceChildren(element('p', 'ce-onboarding__empty', T.noResults));
        return;
      }
      function addGroup(title: string, items: City[]): void {
        if (!items.length) return;
        const titleNode = element('p', 'ce-onboarding__group-title', title);
        buttons.push(titleNode);
        for (const city of items) {
          const button = element('button', 'ce-onboarding__city', localizedCityName(city));
          button.type = 'button';
          button.dataset.cityId = city.id;
          button.addEventListener('click', () => finish(city.id));
          buttons.push(button);
        }
      }
      if (input.value.trim()) {
        addGroup(T.results, matches);
      } else {
        addGroup(T.popular, matches.filter((city) => popularOrder.has(city.id)));
        addGroup(T.other, matches.filter((city) => !popularOrder.has(city.id)));
      }
      cities.replaceChildren(...buttons);
    }

    input.addEventListener('input', () => { renderList(); scroller.scrollTop = 0; });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const first = searchOnboardingCities(input.value)[0];
        if (first) { event.preventDefault(); finish(first.id); }
      } else if (event.key === 'ArrowDown') {
        const first = cities.querySelector<HTMLButtonElement>('button');
        if (first) { event.preventDefault(); first.focus(); }
      }
    });
    cities.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const buttons = [...cities.querySelectorAll<HTMLButtonElement>('button')];
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (at < 0) return;
      event.preventDefault();
      buttons[Math.max(0, Math.min(buttons.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1)))].focus();
    });
    const content = element('div', 'ce-onboarding__city-content');
    content.append(originLabel, searchLabel, scroller);
    card.replaceChildren(nav, header, content);
    renderList();
    root.scrollTop = 0;
    // Nie otwieramy klawiatury ekranowej automatycznie na telefonie.
    back.focus({ preventScroll: true });
  }

  function onCountryKeys(event: KeyboardEvent): void {
    if (step !== 'country' || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const buttons = [...root.querySelectorAll<HTMLButtonElement>('.ce-onboarding__flag')];
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    const columns = typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 650px)').matches ? 4 : 2;
    const delta = event.key === 'ArrowDown' ? columns : event.key === 'ArrowUp' ? -columns : event.key === 'ArrowRight' ? 1 : -1;
    event.preventDefault();
    buttons[Math.max(0, Math.min(buttons.length - 1, index + delta))].focus();
  }
  root.addEventListener('keydown', onCountryKeys);

  function dispose(): void {
    if (disposed) return;
    disposed = true;
    root.remove();
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  }

  renderCountry();
  return dispose;
}
