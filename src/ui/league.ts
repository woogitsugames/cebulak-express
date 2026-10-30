import { COUNTRY_NAME } from '../content/pl';
import { HOME_COUNTRIES, type HomeCountry } from '../core/route';
import type { DailyEntry, LeagueData, PlayerEntry, RankingApi } from '../net/api';
import { warsawDateKey, warsawWeekKey } from '../net/week';
import './league.css';

type Tab = 'countries' | 'players' | 'daily';
const TABS: ReadonlyArray<{ id: Tab; title: string }> = [
  { id: 'countries', title: 'Kraje' },
  { id: 'players', title: 'Gracze' },
  { id: 'daily', title: 'Wyzwanie dnia' },
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
  const section = element('section');
  const totalKm = HOME_COUNTRIES.reduce((sum, country) => sum + (league.countries[country]?.km ?? 0), 0);
  const summary = element('div', 'ce-league__total');
  summary.append(element('span', '', 'Polonia przejechała razem'), element('strong', '', kilometers(totalKm)));
  section.append(summary, heading('Liga krajów', 'Każdy przejazd rankingowy dodaje kilometry do kraju.'));
  if (totalKm === 0) section.append(emptyMessage('Jeszcze nie ma wyników w tym tygodniu.'));
  const { table: ranking, body } = table(['#', 'Kraj', 'Kilometry', 'Przejazdy']);
  const ordered = HOME_COUNTRIES.map((country, index) => ({
    country, order: index, stats: league.countries[country] ?? { km: 0, runs: 0, players: 0 },
  })).sort((a, b) => b.stats.km - a.stats.km || a.order - b.order);
  ordered.forEach(({ country, stats }, i) => {
    const row = element('tr', country === home ? 'ce-league__ours' : undefined);
    if (country === home) row.setAttribute('aria-label', `${COUNTRY_NAME[country]}, Twój kraj`);
    row.append(cell(String(i + 1), 'ce-league__place'));
    const title = cell(COUNTRY_NAME[country], 'ce-league__country');
    if (country === home) title.append(element('span', 'ce-league__you', 'Twój kraj'));
    row.append(title, cell(kilometers(stats.km), 'ce-league__value'), cell(number.format(stats.runs), 'ce-league__value'));
    body.append(row);
  });
  section.append(ranking);
  return section;
}

function playerTable(entries: ReadonlyArray<{ nickId: string; home: HomeCountry; km: number }>, home: HomeCountry): HTMLElement {
  const { table: ranking, body } = table(['#', 'Gracz', 'Kraj', 'Kilometry']);
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
  const section = element('section');
  section.append(heading('Najlepsi w tygodniu', 'Najdłuższy zweryfikowany przejazd każdego gracza.'));
  if (entries.length === 0) section.append(emptyMessage('Brak wyników graczy w tym tygodniu.'));
  else section.append(playerTable(entries.map(({ nickId, home: country, bestKm }) => ({ nickId, home: country, km: bestKm })), home));
  return section;
}
function dailyView(date: string, entries: DailyEntry[], home: HomeCountry): HTMLElement {
  const section = element('section');
  section.append(heading(`Wyzwanie dnia · ${date}`, 'Ten sam układ trasy dla wszystkich. Liczy się najlepszy wynik dnia.'));
  if (entries.length === 0) section.append(emptyMessage('Dziś nikt jeszcze nie zgłosił wyniku.'));
  else section.append(playerTable(entries, home));
  return section;
}

/** Samodzielny ekran DOM. Funkcja zwrotna usuwa widok i nasłuchy. */
export function mountLeague(container: HTMLElement, api: RankingApi, home: HomeCountry): () => void {
  const suffix = ++nextId;
  const root = element('section', 'ce-league');
  root.setAttribute('aria-label', 'Liga Polonii');
  const header = element('header', 'ce-league__header');
  header.append(element('p', 'ce-league__eyebrow', 'Razem bliżej domu'), element('h2', '', 'Liga Polonii'));
  const period = element('p', 'ce-league__period');
  header.append(period);
  root.append(header);
  if (api.kind === 'mock') root.append(element('p', 'ce-league__demo', 'Wersja pokazowa · wyniki tylko w tej sesji'));
  const tabs = element('div', 'ce-league__tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Kategorie rankingu');
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
    period.textContent = selected === 'daily' ? `Dziś · ${date} · czas polski` : `Tydzień ${week} · czas polski`;
    const status = element('p', 'ce-league__loading', 'Pobieranie wyników…');
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
      error.append(element('p', '', 'Nie udało się pobrać wyników. Sprawdź połączenie z internetem.'));
      const retry = element('button', 'ce-league__retry', 'Spróbuj ponownie');
      retry.type = 'button';
      retry.addEventListener('click', () => load(selected), { once: true });
      error.append(retry);
      panel.replaceChildren(error);
    });
  }
  for (const { id, title } of TABS) {
    const button = element('button', 'ce-league__tab', title);
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
