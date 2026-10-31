import { COUNTRY_NAME, fill, localized } from '../content/i18n';
import { HOME_COUNTRIES, type HomeCountry } from '../core/route';
import type { DailyEntry, LeagueData, PlayerEntry, RankingApi } from '../net/api';
import { warsawDateKey, warsawWeekKey } from '../net/week';
import './league.css';

/** Polskie teksty ligi; EN/NL/DE/FR w słownikach (LEAGUE). */
export const LEAGUE_TEXT = {
  title: 'Liga Polonii',
  eyebrow: 'Razem bliżej domu',
  demo: 'Wersja pokazowa · wyniki tylko w tej sesji',
  tabsLabel: 'Kategorie rankingu',
  tabCountries: 'Kraje',
  tabPlayers: 'Gracze',
  tabDaily: 'Wyzwanie dnia',
  periodDaily: 'Dziś · {date} · czas polski',
  periodWeek: 'Tydzień {week} · czas polski',
  loading: 'Pobieranie wyników…',
  error: 'Nie udało się pobrać wyników. Sprawdź połączenie z internetem.',
  retry: 'Spróbuj ponownie',
  total: 'Polonia przejechała razem',
  countriesTitle: 'Liga krajów',
  countriesDetail: 'Każdy przejazd rankingowy dodaje kilometry do kraju.',
  countriesEmpty: 'Jeszcze nie ma wyników w tym tygodniu.',
  yourCountry: 'Twój kraj',
  yourCountryLabel: '{country}, Twój kraj',
  colCountry: 'Kraj',
  colKm: 'Kilometry',
  colRuns: 'Przejazdy',
  colPlayer: 'Gracz',
  playersTitle: 'Najlepsi w tygodniu',
  playersDetail: 'Najdłuższy zweryfikowany przejazd każdego gracza.',
  playersEmpty: 'Brak wyników graczy w tym tygodniu.',
  dailyTitle: 'Wyzwanie dnia · {date}',
  dailyDetail: 'Ten sam układ trasy dla wszystkich. Liczy się najlepszy wynik dnia.',
  dailyEmpty: 'Dziś nikt jeszcze nie zgłosił wyniku.',
} as const;

function texts(): Record<keyof typeof LEAGUE_TEXT, string> {
  return localized('LEAGUE') ?? LEAGUE_TEXT;
}

type Tab = 'countries' | 'players' | 'daily';
const TABS: ReadonlyArray<{ id: Tab; title: 'tabCountries' | 'tabPlayers' | 'tabDaily' }> = [
  { id: 'countries', title: 'tabCountries' },
  { id: 'players', title: 'tabPlayers' },
  { id: 'daily', title: 'tabDaily' },
];
const number = new Intl.NumberFormat('pl-PL');
let nextId = 0;

function element<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}
function kilometers(km: number): string { return `${number.format(km)} km`; }
function nickname(nickId: string): string {
  // Do zamiany na etykiety z src/content/nicks.ts po scaleniu zlecenia 13.
  return nickId.replace(/-/g, ' ').replace(/(^|\s)\p{L}/gu, (part) => part.toLocaleUpperCase('pl-PL'));
}
function heading(text: string, detail: string): HTMLElement {
  const group = element('div', 'ce-league__section-head');
  group.append(element('h3', '', text), element('p', '', detail));
  return group;
}
function table(headers: string[]): { table: HTMLTableElement; body: HTMLTableSectionElement } {
  const result = element('table', 'ce-league__table');
  const head = element('thead');
  const line = element('tr');
  for (const label of headers) line.append(element('th', '', label));
  head.append(line);
  const body = element('tbody');
  result.append(head, body);
  return { table: result, body };
}
function cell(text: string, cls?: string): HTMLTableCellElement { return element('td', cls, text); }
function emptyMessage(text: string): HTMLElement { return element('p', 'ce-league__empty', text); }

function countriesView(league: LeagueData, home: HomeCountry): HTMLElement {
  const T = texts();
  const section = element('section');
  const totalKm = HOME_COUNTRIES.reduce((sum, country) => sum + (league.countries[country]?.km ?? 0), 0);
  const summary = element('div', 'ce-league__total');
  summary.append(element('span', '', T.total), element('strong', '', kilometers(totalKm)));
  section.append(summary, heading(T.countriesTitle, T.countriesDetail));
  if (totalKm === 0) section.append(emptyMessage(T.countriesEmpty));
  const { table: ranking, body } = table(['#', T.colCountry, T.colKm, T.colRuns]);
  const ordered = HOME_COUNTRIES.map((country, index) => ({
    country, order: index, stats: league.countries[country] ?? { km: 0, runs: 0, players: 0 },
  })).sort((a, b) => b.stats.km - a.stats.km || a.order - b.order);
  ordered.forEach(({ country, stats }, i) => {
    const row = element('tr', country === home ? 'ce-league__ours' : undefined);
    if (country === home) row.setAttribute('aria-label', fill(T.yourCountryLabel, { country: COUNTRY_NAME[country] }));
    row.append(cell(String(i + 1), 'ce-league__place'));
    const title = cell(COUNTRY_NAME[country], 'ce-league__country');
    if (country === home) title.append(element('span', 'ce-league__you', T.yourCountry));
    row.append(title, cell(kilometers(stats.km), 'ce-league__value'), cell(number.format(stats.runs), 'ce-league__value'));
    body.append(row);
  });
  section.append(ranking);
  return section;
}

function playerTable(entries: ReadonlyArray<{ nickId: string; home: HomeCountry; km: number }>, home: HomeCountry): HTMLElement {
  const T = texts();
  const { table: ranking, body } = table(['#', T.colPlayer, T.colCountry, T.colKm]);
  entries.forEach((entry, i) => {
    const row = element('tr', entry.home === home ? 'ce-league__same-home' : undefined);
    row.append(
      cell(String(i + 1), 'ce-league__place'),
      cell(nickname(entry.nickId), 'ce-league__nick'),
      cell(entry.home, 'ce-league__code'),
      cell(kilometers(entry.km), 'ce-league__value'),
    );
    body.append(row);
  });
  return ranking;
}

function playersView(entries: PlayerEntry[], home: HomeCountry): HTMLElement {
  const T = texts();
  const section = element('section');
  section.append(heading(T.playersTitle, T.playersDetail));
  if (entries.length === 0) section.append(emptyMessage(T.playersEmpty));
  else section.append(playerTable(entries.map(({ nickId, home: country, bestKm }) => ({ nickId, home: country, km: bestKm })), home));
  return section;
}
function dailyView(date: string, entries: DailyEntry[], home: HomeCountry): HTMLElement {
  const T = texts();
  const section = element('section');
  section.append(heading(fill(T.dailyTitle, { date }), T.dailyDetail));
  if (entries.length === 0) section.append(emptyMessage(T.dailyEmpty));
  else section.append(playerTable(entries, home));
  return section;
}

/** Samodzielny ekran DOM. Funkcja zwrotna usuwa widok i nasłuchy. */
export function mountLeague(container: HTMLElement, api: RankingApi, home: HomeCountry): () => void {
  const suffix = ++nextId;
  const T = texts();
  const root = element('section', 'ce-league');
  root.setAttribute('aria-label', T.title);
  const header = element('header', 'ce-league__header');
  header.append(element('p', 'ce-league__eyebrow', T.eyebrow), element('h2', '', T.title));
  const period = element('p', 'ce-league__period');
  header.append(period);
  root.append(header);
  if (api.kind === 'mock') root.append(element('p', 'ce-league__demo', T.demo));
  const tabs = element('div', 'ce-league__tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', T.tabsLabel);
  const buttons = new Map<Tab, HTMLButtonElement>();
  let selected: Tab = 'countries';
  let disposed = false;
  let requestId = 0;

  const panel = element('div', 'ce-league__content');
  panel.id = `ce-league-panel-${suffix}`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-live', 'polite');
  root.append(tabs, panel);
  container.append(root);

  function updateTabs(): void {
    for (const [id, button] of buttons) {
      const active = id === selected;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    }
    panel.setAttribute('aria-labelledby', `ce-league-tab-${suffix}-${selected}`);
  }
  function load(tab: Tab): void {
    if (disposed) return;
    selected = tab;
    updateTabs();
    const current = ++requestId;
    const week = warsawWeekKey();
    const date = warsawDateKey();
    period.textContent = selected === 'daily' ? fill(T.periodDaily, { date }) : fill(T.periodWeek, { week });
    const status = element('p', 'ce-league__loading', T.loading);
    status.setAttribute('role', 'status');
    panel.replaceChildren(status);
    const fetch = async (): Promise<HTMLElement> => {
      if (tab === 'countries') return countriesView(await api.getLeague(week), home);
      if (tab === 'players') return playersView(await api.getLeaderboard(week, 30), home);
      return dailyView(date, (await api.getDaily(date)).entries, home);
    };
    void fetch().then((content) => {
      if (!disposed && requestId === current) panel.replaceChildren(content);
    }).catch(() => {
      if (disposed || requestId !== current) return;
      const error = element('div', 'ce-league__error');
      error.setAttribute('role', 'alert');
      error.append(element('p', '', T.error));
      const retry = element('button', 'ce-league__retry', T.retry);
      retry.type = 'button';
      retry.addEventListener('click', () => load(selected), { once: true });
      error.append(retry);
      panel.replaceChildren(error);
    });
  }
  for (const { id, title } of TABS) {
    const button = element('button', 'ce-league__tab', T[title]);
    button.type = 'button';
    button.id = `ce-league-tab-${suffix}-${id}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panel.id);
    button.addEventListener('click', () => load(id));
    tabs.append(button);
    buttons.set(id, button);
  }
  function handleKeys(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !tabs.contains(target)) return;
    event.preventDefault();
    const i = TABS.findIndex(({ id }) => id === selected);
    const next = TABS[(i + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length].id;
    buttons.get(next)?.focus();
    load(next);
  }
  tabs.addEventListener('keydown', handleKeys);
  load('countries');
  return () => {
    if (disposed) return;
    disposed = true;
    requestId++;
    tabs.removeEventListener('keydown', handleKeys);
    root.remove();
  };
}
