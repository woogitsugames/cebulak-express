import { TICK } from './core/config';
import { dailyKey, dailyRoute, dailySeed, dailyTitle } from './core/daily';
import { Game, type GameEvent, type Mode } from './core/game';
import { RULES_VERSION, rankedGameOptions } from './core/rules';
import { RETURN_WEIGHT, returnFlightRoute } from './core/return-trip';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, reverseRoute, type HomeCountry, type Route } from './core/route';
import { seasonAt } from './core/season';
import type { Progress } from './meta/progress';
import type { CountryCueCode } from './audio/country-cues';
import {
  ARRIVAL_TEXTS, BORDER_TEXTS, COUNTRY_LOCATIVE, COUNTRY_NAME, FAIL_JOKES, GHOST_TEXTS, MILESTONE_TEXTS,
  OBSTACLE_NAME, PICKUP_TEXTS, RETURN_ARRIVAL_TEXTS, RETURN_DEPARTURE_TEXTS, UI, WIGILIA_TEXTS, fill,
  getLanguage, initializeLanguage, loadLanguage, localized, onLanguageChange,
} from './content/i18n';
import { localizedCityName } from './content/lang/cities';
import { RETURN_CITY_LOCATIVE } from './content/lang/pl';
import { waypointText } from './content/waypoint-text';
import { portalLink } from './content/portals';
import { Renderer } from './render/renderer';
import type { SignJokeBubble } from './render/signs';
import { installStoreShotHooks } from './test-hooks';
import { normalizeHeroSkin, preloadSprites, setHeroSkin } from './render/sprites';
import { createSfx, sfxForGameEvent, type SfxPlayer } from './audio/sfx';
import { createHaptics, hapticForGameEvent } from './audio/haptics';
import type { MusicPlayer } from './audio/music';
import type { CardData } from './share/card';
import type { GhostChallenge, GhostRunner } from './share/ghost-session';
import { parseGameParams } from './net/params';
import type { RankingApi } from './net/api';
import type { AnalyticsHome, track as TrackFn } from './analytics/track';
import { registerPwa } from './pwa/register';
import { prefetchPwaAssetsAfterRun } from './pwa/offline';
import { platform } from './platform';
import {
  DEFAULT_SETTINGS as DEFAULT_PREFERENCES, applyPreferences, applyReducedMotion, loadSettings as loadPreferences,
  saveSettings as savePreferences, watchReducedMotion, type Settings as Preferences,
} from './meta/preferences';
import { savePerformanceMode, storedPerformanceMode } from './render/performance';
import type { TutorialControl } from './ui/tutorial';

interface Settings {
  home: HomeCountry;
  from: string;
  to: string;
  mode: Mode;
  nickId?: string;
  skin?: string;
}

const DEFAULTS: Settings = { home: 'BE', from: 'antwerpia', to: 'rzeszow', mode: 'ranked' };

// --- Pamięć lokalna (może być niedostępna w iframe / trybie prywatnym) ---
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* brak pamięci — gramy dalej bez zapisu */
  }
}

/** Leniwy chunk bez sieci: funkcja po prostu nie działa, bez nieobsłużonego wyjątku. */
const quiet = (): void => undefined;
const pick = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const canvas = $<HTMLCanvasElement>('game');
const renderer = new Renderer(canvas);
const ui = {
  hud: $('hud'),
  km: $('hud-km'),
  lives: $('hud-lives'),
  remaining: $('hud-remaining'),
  toast: $('toast'),
  hint: $('hint'),
  menu: $('menu'),
  over: $('over'),
  league: $('league'),
  garage: $('garage'),
  routeSummary: $('route-summary'),
  routeFlag: $<HTMLImageElement>('route-flag'),
  overCauseIcon: $<HTMLImageElement>('over-cause-icon'),
  overMiniLeague: $('over-mini-league'),
  overLeagueList: $('over-league-list'),
  leagueBody: $('league-body'),
  selHome: $<HTMLSelectElement>('sel-home'),
  selFrom: $<HTMLSelectElement>('sel-from'),
  selTo: $<HTMLSelectElement>('sel-to'),
  routeInfo: $('route-info'),
  dailyInfo: $('daily-info'),
  overTitle: $('over-title'),
  overKm: $('over-km'),
  overRoute: $('over-route'),
  overCause: $('over-cause'),
  overJoke: $('over-joke'),
  overBest: $('over-best'),
  overPortal: $<HTMLAnchorElement>('over-portal'),
  btnReturnFlight: $<HTMLButtonElement>('btn-return-flight'),
  btnChallenge: $<HTMLButtonElement>('btn-challenge'),
  overGhost: $('over-ghost'),
  ghostInfo: $('ghost-info'),
  album: $('album'),
  btnSettings: $<HTMLButtonElement>('btn-settings'),
};
ui.btnChallenge.textContent = GHOST_TEXTS.challengeButton;
/** Tytuł wyzwania dnia w bieżącym języku (logika sezonu porównuje polski dailyTitle). */
const dailyTitleText = (key: string): string => dailyTitle(key, localized('DAILY_TITLES'));

const params = new URLSearchParams(location.search);
/** Ślady dla e2e (?test=1): komunikat konsoli dociera do Playwrighta, nawet gdy wątek potem stanie. */
const breadcrumb = params.get('test') === '1'
  ? (label: string): void => console.debug('[ce]', Math.round(performance.now()), label)
  : (): void => {};
/**
 * Gracz, który już kiedyś grał, nie dostaje ekranu pierwszego uruchomienia. Samo ce.settings tego nie
 * dowodzi: zapisujemy je przy pierwszym starcie (nick), zanim gracz cokolwiek wybierze.
 */
const returningPlayer = (() => {
  try { return ['ce.best.ranked', 'ce.best.cozy'].some((key) => localStorage.getItem(key) !== null); } catch { return false; }
})();
let settings = load<Settings>('ce.settings', DEFAULTS);
// Link z karty wyniku lub osadzenia w portalu ustawia kraj i miasto startu.
const prefill = parseGameParams(params);
if (prefill) settings = { ...settings, home: prefill.home, from: prefill.from };
// Nick z listy losujemy w tle (moduł nicków nie jest potrzebny do pierwszej klatki).
// Nick spoza zamkniętej listy (stary zapis, ręczna edycja) serwer odrzuca, a kolejka offline rzuca wyjątkiem —
// dlatego przed zgłoszeniem wyniku zawsze czekamy na sprawdzony nick (ensureNick), a nie na settings.nickId.
function ensureNick(): Promise<string> {
  return import('./content/nicks').then(({ isValidNickId, randomNickChoices }) => {
    if (!settings.nickId || !isValidNickId(settings.nickId)) {
      settings = { ...settings, nickId: randomNickChoices(Math.random, 1, settings.home)[0] };
      save('ce.settings', settings);
    }
    return settings.nickId as string;
  });
}
if (!settings.nickId) void ensureNick().catch(quiet);

let route: Route = safeRoute(settings);
let game: Game | null = null;
/** Wyzwanie dnia: klucz daty (Europe/Warsaw) albo null dla zwykłego przejazdu. */
let daily: string | null = null;
let runId: string | null = null;
let overAt = 0;
/** Tylko ?test=1: tyle klatek po ekranie końca zostawia ślady w konsoli. */
let postOverFrames = 0;
let toastTimer = 0;
let lastMilestone = 0;
let cardImage: Promise<Blob> | null = null;
let pendingReload: (() => void) | null = null;
let closeLeague: (() => void) | null = null;
let closeGarage: (() => void) | null = null;
let overLeagueRequest = 0;
let returnTrip = false;
/** Trasa lotu powrotnego: proponowana po dojeździe i jeżdżona ponownie przy „Zagraj ponownie”. */
let offeredReturn: Route | null = null;
let returnRoute: Route | null = null;
/** Każdy start przejazdu i powrót do menu unieważnia wcześniejszy, jeszcze czekający newRun(). */
let runRequest = 0;
/** newRun() czekający na ranking/ducha (menu jeszcze widoczne) — „wstecz” go anuluje. */
let startingRun = 0;
/** Otwarcie panelu menu (liga, garaż, album) i powrót do menu unieważniają czekający montaż. */
let panelRequest = 0;
/** Toasty po przejeździe (medale, auta) należą do tego jednego ekranu końca. */
let overSerial = 0;
let progress: Progress | null = null;
let closeCollection: (() => void) | null = null;
let closeSettings: (() => void) | null = null;
/** Samouczek z dłonią (zlecenie 64) — ładowany po pierwszej klatce, poza testami i trybem redakcji. */
let tutorial: TutorialControl | null = null;
// --- Duch znajomego (zlecenie 59): wyzwanie z linku ?g= ---
// Dekodowanie odtwarza cały przejazd nadawcy, więc moduł i replay ruszają dopiero po pierwszej klatce.
type GhostModule = typeof import('./share/ghost-session');
let ghostMod: GhostModule | null = null;
const ghostModule = (): Promise<GhostModule> => import('./share/ghost-session').then((m) => (ghostMod = m));
/** Wczytane wyzwanie — przejazdy z „Lecimy!” i „Zagraj ponownie” jadą z duchem, dopóki gracz nie zmieni trasy. */
let ghostChallenge: GhostChallenge | null = null;
/** Ładowanie wyzwania z linku (null, gdy link go nie ma). */
let ghostLoad: Promise<void> | null = null;
/** Gracz zmienił trasę lub tryb — wyzwanie zdekodowane później już nie wraca. */
let ghostDropped = false;
/** Duch bieżącego przejazdu; null po rozjechaniu się z grą. */
let ghostRunner: GhostRunner | null = null;
let ghostDrawFailed = false;
/** Link „Wyzwij znajomego” przygotowany po zakończeniu przejazdu. */
let challengeLink: Promise<{ url: string; text: string } | null> | null = null;
const winter = seasonAt(new Date(), location.search) === 'winter';
renderer.winter = winter;
const progressModule = () => import('./meta/progress');
/** Postęp wczytujemy raz; potem źródłem prawdy jest pamięć RAM (zapis może się nie udać). */
const progressReady = progressModule().then((m) => m.loadProgress()).then((p) => {
  progress = p;
  // Auta za kilometry (zlecenie 72): wybrane auto wraca dopiero, gdy wiadomo, ile przejechano.
  setHeroSkin(normalizeHeroSkin(settings.skin, totalKm()), totalKm());
  return p;
});
/** Suma km ze wszystkich przejazdów (album/medale) — z niej odblokowujemy auta. */
function totalKm(): number {
  return progress?.stats.totalKm ?? 0;
}

function safeRoute(s: Settings): Route {
  try {
    return makeRoute(s.home, s.from, s.to);
  } catch {
    settings = { ...DEFAULTS, mode: s.mode, nickId: s.nickId };
    return makeRoute(settings.home, settings.from, settings.to);
  }
}

// --- Dźwięk: jeden AudioContext i wspólny miks, tworzone przy pierwszym geście ---
let audioCtx: AudioContext | undefined;
/** Wspólny miks efektów i muzyki — także źródło dźwięku nagrywanej rolki. */
let audioMix: GainNode | undefined;
let sfx: SfxPlayer = createSfx();
let music: MusicPlayer | undefined;
const haptics = createHaptics({ vibrate: (pattern) => platform.vibrate(pattern) });

// --- Preferencje (ekran ustawień): dźwięk, muzyka, wibracje, mniej animacji ---
let preferences: Preferences = { ...DEFAULT_PREFERENCES };
function applyAudioPreferences(): void {
  applyPreferences(preferences, { sfx, music, haptics });
}
void loadPreferences(platform.storage).then((loaded) => {
  preferences = loaded;
  applyAudioPreferences();
  applyReducedMotion(preferences, document.documentElement);
});
watchReducedMotion(() => preferences, document.documentElement);

function unlockAudio(): void {
  if (audioCtx) return;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;
  try {
    audioCtx = new Ctor();
  } catch {
    return;
  }
  const mix = audioCtx.createGain();
  mix.connect(audioCtx.destination);
  audioMix = mix;
  sfx = createSfx(audioCtx, mix);
  sfx.setMuted(!preferences.soundEffects);
  void sfx.unlock();
  const ctx = audioCtx;
  void import('./audio/music').then(({ createMusic }) => {
    music = createMusic(ctx, { destination: mix, volume: preferences.musicVolume, enabled: preferences.music });
    void music.unlock();
    if (game?.phase === 'playing') music.start();
  }).catch(quiet);
}

// --- Ranking (bez konfiguracji Firebase działa na mocku) ---
// Ranking i kolejka offline ładują się osobno — nie są potrzebne do pierwszej klatki.
const net = Promise.all([import('./net/api'), import('./net/queue')]).then(([apiMod, queueMod]) => {
  const api: RankingApi = apiMod.createRankingApi();
  const queue = new queueMod.OfflineRunQueue();
  queueMod.watchQueueOnline(queue, api);
  return { api, queue, isMock: api instanceof apiMod.MockRankingApi, submitOrQueue: queueMod.submitOrQueue };
});

// --- Analityka (wyłączona, gdy brak adresu) ---
// Analityka ładuje się po pierwszej klatce (budżet startu); zdarzenia sprzed tego czekają w kolejce.
type TrackArgs = Parameters<typeof TrackFn>;
const pendingTrack: TrackArgs[] = [];
let realTrack: typeof TrackFn | null = null;
const track = ((...args: TrackArgs) => {
  if (realTrack) realTrack(...args);
  else pendingTrack.push(args);
}) as typeof TrackFn;
requestAnimationFrame(() => void import('./analytics/track').then((m) => {
  m.configureAnalytics({ endpoint: String(import.meta.env.VITE_ANALYTICS_ENDPOINT ?? '') });
  realTrack = m.track;
  for (const args of pendingTrack.splice(0)) m.track(...args);
}).catch(() => undefined));
track('app_open');

// --- Menu ---
/**
 * Ustawia listę opcji pola wyboru jednym, atomowym krokiem.
 * Gdy wartości się nie zmieniły, poprawia tylko teksty (bez podmiany węzłów),
 * w przeciwnym razie buduje nowe opcje z już ustawionym zaznaczeniem i wymienia je naraz.
 * Dzięki temu pole nigdy nie zostaje bez wybranej wartości (WebKit przy zmianie
 * tekstu lub węzłów opcji potrafi przeliczyć zaznaczenie na nowo).
 */
function setOptions(select: HTMLSelectElement, items: ReadonlyArray<readonly [value: string, label: string]>, value: string): void {
  const selected = items.some(([v]) => v === value) ? value : items[0]?.[0] ?? '';
  const current = [...select.options];
  const sameValues = current.length === items.length && current.every((o, i) => o.value === items[i][0]);
  if (sameValues) {
    current.forEach((o, i) => {
      if (o.textContent !== items[i][1]) o.textContent = items[i][1];
    });
  } else {
    select.replaceChildren(...items.map(([v, label]) => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      o.selected = v === selected;
      return o;
    }));
  }
  if (select.value !== selected) select.value = selected;
}

function fillMenu(): void {
  // Poprawiamy nieaktualne ustawienia przed wyrenderowaniem kontrolek.
  route = safeRoute(settings);
  setOptions(ui.selHome, HOME_COUNTRIES.map((c) => [c, COUNTRY_NAME[c]] as const), settings.home);
  setOptions(ui.selFrom, START_CITIES[settings.home].map((c) => [c.id, localizedCityName(c)] as const), settings.from);
  const sorted = [...PL_CITIES].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
  setOptions(ui.selTo, sorted.map((c) => [c.id, localizedCityName(c)] as const), settings.to);

  for (const b of document.querySelectorAll<HTMLButtonElement>('.mode')) {
    b.setAttribute('aria-checked', String(b.dataset.mode === settings.mode));
  }
  const routeText = localizedCityName(route.from) + ' → ' + localizedCityName(route.to);
  ui.routeInfo.textContent = routeText + ': ' + route.totalKm + ' km';
  ui.routeSummary.textContent = routeText;
  ui.routeFlag.src = import.meta.env.BASE_URL + 'assets/ui/flag-' + settings.home.toLowerCase() + '.png';
  ui.routeFlag.alt = COUNTRY_NAME[settings.home];
  ui.dailyInfo.textContent = fill(UI.dailyHint, { title: dailyTitleText(dailyKey(new Date())) });
  ui.btnChallenge.textContent = GHOST_TEXTS.challengeButton;
  ui.btnSettings.setAttribute('aria-label', UI.settingsOpen);
  ui.btnSettings.title = UI.settingsTitle;
}
// Menu jest jedynym właścicielem pól trasy: po zmianie języka (także po dociągnięciu
// słownika) przerysowuje je samo, zamiast pozwalać modułom leniwym poprawiać opcje.
onLanguageChange(() => fillMenu());

function dropGhostChallenge(): void {
  ghostDropped = true;
  ghostChallenge = null;
  ui.ghostInfo.hidden = true;
}

ui.selHome.addEventListener('change', () => {
  dropGhostChallenge();
  const home = ui.selHome.value as HomeCountry;
  settings = { ...settings, home, from: START_CITIES[home][0].id };
  fillMenu();
});
ui.selFrom.addEventListener('change', () => {
  dropGhostChallenge();
  settings = { ...settings, from: ui.selFrom.value };
  fillMenu();
});
ui.selTo.addEventListener('change', () => {
  dropGhostChallenge();
  settings = { ...settings, to: ui.selTo.value };
  fillMenu();
});
for (const b of document.querySelectorAll<HTMLButtonElement>('.mode')) {
  b.addEventListener('click', () => {
    if ((b.dataset.mode as Mode) !== settings.mode) dropGhostChallenge();
    settings = { ...settings, mode: b.dataset.mode as Mode };
    fillMenu();
  });
  b.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const other = document.querySelector<HTMLButtonElement>('.mode:not([data-mode="' + b.dataset.mode + '"])');
    other?.focus();
    other?.click();
  });
}

$('btn-start').addEventListener('click', () => {
  save('ce.settings', settings);
  daily = null;
  void newRun();
});
$('btn-daily').addEventListener('click', () => {
  daily = dailyKey(new Date());
  void newRun();
});
/** Otwiera panel menu; zwraca sprawdzenie, czy ten panel jest nadal aktualny po leniwym imporcie. */
function openPanel(panel: HTMLElement): () => boolean {
  runRequest++;
  const request = ++panelRequest;
  ui.menu.hidden = true;
  panel.hidden = false;
  return () => request === panelRequest && !panel.hidden;
}
$('btn-league').addEventListener('click', () => {
  const current = openPanel(ui.league);
  void import('./ui/league').then(({ mountLeague }) => {
    return net.then(({ api }) => { if (current()) closeLeague = mountLeague(ui.leagueBody, api, settings.home); });
  }).catch(quiet);
  track('league_open');
});
$('btn-league-close').addEventListener('click', () => showMenu());
$('btn-garage').addEventListener('click', () => {
  const current = openPanel(ui.garage);
  // Zamki aut zależą od sumy km — bez wczytanego postępu garaż pokazałby same startery.
  void Promise.all([import('./ui/garage'), progressReady]).then(([{ mountGarage }]) => {
  if (!current()) return;
  closeGarage = mountGarage(ui.garage, {
    home: settings.home,
    skin: normalizeHeroSkin(settings.skin, totalKm()),
    totalKm: totalKm(),
    nickId: settings.nickId,
    onChange: (sel) => {
      settings = { ...settings, skin: sel.skin, nickId: sel.nickId };
      save('ce.settings', settings);
      setHeroSkin(sel.skin, totalKm());
    },
    onClose: () => showMenu(),
  });
  }).catch(quiet);
});
$('btn-album').addEventListener('click', () => {
  const current = openPanel(ui.album);
  // Album pokazuje postęp z pamięci RAM: ponowny odczyt cofnąłby go, gdy zapis się nie udał.
  void Promise.all([import('./ui/collection'), progressReady]).then(([{ mountCollection }, loaded]) => {
    if (current()) closeCollection = mountCollection(ui.album, progress ?? loaded, () => showMenu());
  }).catch(quiet);
});
ui.btnSettings.addEventListener('click', () => void openSettings().catch(quiet));
$('btn-again').addEventListener('click', () => void newRun(returnTrip));
$('btn-return-flight').addEventListener('click', () => {
  if (!offeredReturn) return;
  returnRoute = offeredReturn;
  void newRun(true);
});
$('btn-menu').addEventListener('click', () => showMenu());
$('btn-share').addEventListener('click', () => void share().catch(quiet));
ui.btnChallenge.addEventListener('click', () => void shareChallenge().catch(quiet));
ui.overPortal.addEventListener('click', () => track('portal_click', { placement: 'result', home: settings.home as AnalyticsHome }));

/** Ekran ustawień: modalny panel nad menu, moduł ładowany dopiero po kliknięciu. */
async function openSettings(): Promise<void> {
  if (closeSettings) return;
  const { mountSettings } = await import('./ui/settings');
  if (closeSettings || ui.menu.hidden) return;
  closeSettings = mountSettings($('stage'), {
    get: () => preferences,
    set: (next) => {
      preferences = next;
      applyAudioPreferences();
      void savePreferences(platform.storage, next);
    },
    performance: {
      get: storedPerformanceMode,
      set: (mode) => {
        savePerformanceMode(mode);
        renderer.background.setPerformanceMode(mode);
      },
    },
    onClose: () => { closeSettings = null; },
  });
}

function hideSettings(): void {
  const close = closeSettings;
  closeSettings = null;
  close?.();
}

function showMenu(): void {
  if (pendingReload) return pendingReload();
  const menuWasHidden = ui.menu.hidden;
  runRequest++;
  panelRequest++;
  overSerial++;
  ui.toast.hidden = true;
  game = null;
  ghostRunner = null;
  renderer.ghost = null;
  music?.stop();
  closeLeague?.();
  closeLeague = null;
  closeGarage?.();
  closeGarage = null;
  closeCollection?.();
  closeCollection = null;
  tutorial?.hide();
  ui.album.hidden = true;
  ui.over.hidden = true;
  ui.hud.hidden = true;
  ui.league.hidden = true;
  ui.garage.hidden = true;
  ui.menu.hidden = false;
  fillMenu();
  if (menuWasHidden) $('btn-start').focus();
}

/** Tryb gry dla rdzenia: wyzwanie dnia zawsze rankingowe. */
function currentMode(): Mode {
  return daily ? 'ranked' : settings.mode;
}

async function newRun(reverse = false): Promise<void> {
  const request = ++runRequest;
  startingRun = request;
  const runDaily = daily;
  const reverseTrip = reverse && !runDaily;
  // Wyzwanie z linku: czekamy na zdekodowanie (zwykle gotowe dużo wcześniej niż klik).
  if (!reverseTrip && !runDaily && ghostLoad) await ghostLoad;
  // W trakcie czekania gracz mógł wrócić do menu, otworzyć panel albo kliknąć start drugi raz.
  if (request !== runRequest) return;
  returnTrip = reverseTrip;
  const challenge = !returnTrip && !daily ? ghostChallenge : null;
  ghostRunner = null;
  ghostDrawFailed = false;
  renderer.ghost = null;
  const runRoute = challenge ? challenge.route : returnTrip ? returnRoute ?? reverseRoute(route) : daily ? dailyRoute(daily) : route;
  const mode = challenge ? challenge.mode : returnTrip ? 'cozy' : currentMode();
  let seed = (Math.random() * 2 ** 32) >>> 0;
  if (daily) seed = dailySeed(daily);
  // Hak testowy dla E2E: stałe ziarno tylko z ?test=1.
  if (params.get('test') === '1' && params.has('seed')) seed = Number(params.get('seed')) >>> 0;
  if (challenge) seed = challenge.seed;

  runId = null;
  // Przejazdy z duchem nie trafiają do rankingu (ziarno pochodzi z linku, nie z serwera).
  if (mode === 'ranked' && !challenge) {
    try {
      const { api } = await net;
      const start = await api.startRun({
        mode: daily ? 'daily' : 'ranked', home: runRoute.home, from: runRoute.from.id, to: runRoute.to.id,
        ...(daily ? { daily } : {}), rulesVersion: RULES_VERSION,
      });
      if (request !== runRequest) return;
      runId = start.runId;
      seed = start.seed;
    } catch {
      /* bez sieci gramy lokalnie, bez rankingu */
    }
    if (request !== runRequest) return;
  }

  // Ranking: dokładnie te same opcje co replay na serwerze (bez baseWeight).
  startingRun = 0;
  game = new Game(mode === 'ranked'
    ? rankedGameOptions(seed, runRoute)
    : { seed, mode, route: runRoute, ...(returnTrip ? { baseWeight: RETURN_WEIGHT } : {}) });
  if (challenge && ghostMod) ghostRunner = ghostMod.createGhostRunner(challenge);
  lastMilestone = 0;
  overSerial++;
  cardImage = null;
  challengeLink = null;
  music?.setSeason(winter || (daily && dailyTitle(daily) === 'Na Wigilię!') ? 'holiday' : 'regular');
  ui.menu.hidden = true;
  ui.over.hidden = true;
  ui.league.hidden = true;
  ui.garage.hidden = true;
  ui.album.hidden = true;
  ui.hud.hidden = false;
  ui.hint.hidden = false;
  ui.hint.textContent = returnTrip ? pick(RETURN_DEPARTURE_TEXTS) : daily ? dailyTitleText(daily) : UI.tapToStart;
  hideSettings();
  tutorial?.resetRun();
  syncTutorialHint();
  ui.toast.hidden = true;
  // Po kliknięciu „Start” fokus zostaje na ukrytym przycisku — spacja ma sterować autem,
  // a nie ponownie „klikać” niewidoczny start (keyup na fokusowanym przycisku w WebKit).
  releaseHiddenFocus();
  updateHud();
}

// --- Sterowanie: dotyk, klik, spacja ---
function tap(): void {
  unlockAudio();
  if (!game) return;
  if (game.phase === 'over' || game.phase === 'arrived') {
    if (performance.now() - overAt > 600) void newRun(returnTrip);
    return;
  }
  if (game.phase === 'ready') {
    music?.start();
    track('run_start', { mode: game.mode, home: game.route.home as AnalyticsHome });
  }
  game.flap();
  tutorial?.onTap();
  ui.hint.hidden = true;
}

/** Dłoń samouczka zastępuje zwykłą podpowiedź startu (dwie dłonie naraz to za dużo). */
function syncTutorialHint(): void {
  if (tutorial?.visible && game?.phase === 'ready' && ui.hint.textContent === UI.tapToStart) ui.hint.hidden = true;
}

$('stage').addEventListener('pointerdown', (e) => {
  unlockAudio();
  if ((e.target as HTMLElement).closest('.panel, .ce-record-control')) return;
  e.preventDefault();
  tap();
});
window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
  // Spacja musi nadal aktywować przyciski, pola formularza i rozwijanie trasy.
  if (!ui.menu.hidden || !ui.league.hidden || !ui.garage.hidden || !ui.album.hidden) return;
  // …ale tylko widoczne. Fokus potrafi zostać na ukrytym już #btn-start (WebKit nie zdejmuje
  // fokusu z elementu schowanego w [hidden]); taki przycisk nie jest kontrolką, tylko grą.
  const control = (e.target as HTMLElement | null)?.closest?.('button, select, input, textarea, a, summary, [role="radio"]');
  if (control && isRendered(control)) return;
  // preventDefault na keydown blokuje też „kliknięcie” fokusowanego przycisku przy keyup.
  e.preventDefault();
  tap();
});

/** Element faktycznie wyrenderowany (nie w ukrytym panelu, nie display:none). */
function isRendered(element: Element): boolean {
  return !element.closest('[hidden]') && element.getClientRects().length > 0;
}

/** Zdejmuje fokus z kontrolki w panelu, który właśnie schowaliśmy. */
function releaseHiddenFocus(): void {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body && !isRendered(active)) active.blur();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) music?.pause();
  else if (game?.phase === 'playing') music?.resume();
});

// Przycisk wstecz (Android) / Escape: z gry do menu, z menu wyjście z aplikacji.
platform.onBack(() => {
  if (closeSettings) {
    hideSettings();
    return true;
  }
  if (startingRun && startingRun === runRequest) {
    runRequest++;
    startingRun = 0;
    return true;
  }
  if (ui.menu.hidden) {
    showMenu();
    return true;
  }
  return false;
});

// --- HUD i komunikaty ---
function updateHud(): void {
  if (!game) return;
  ui.km.textContent = fill(UI.distance, { km: game.km });
  ui.remaining.textContent = fill(UI.remaining, { km: game.remainingKm });
  ui.lives.hidden = game.mode !== 'cozy';
  ui.lives.textContent = '🫙'.repeat(Math.max(0, game.lives));
  ui.lives.setAttribute('aria-label', fill(UI.lives, { n: Math.max(0, game.lives) }));
}

function toast(text: string): void {
  ui.toast.textContent = text;
  ui.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (ui.toast.hidden = true), 1600);
}

function handleEvents(g: Game): void {
  for (const e of g.drainEvents()) {
    // drainEvents oddaje zdarzenie raz: wyjątek w dźwięku/wibracji/muzyce nie może zjeść końca przejazdu.
    const important = e.type === 'hit' || e.type === 'over' || e.type === 'arrived';
    if (important) breadcrumb('event:' + e.type);
    try { feedback(e); } catch (error) { console.error('[feedback]', e.type, error); }
    if (important) breadcrumb('feedback-done:' + e.type);
    if (e.type === 'pickup') {
      toast(fill(pick(PICKUP_TEXTS[e.kind]), { km: e.bonusKm }));
      track('pickup', { kind: e.kind, mode: g.mode });
    }
    else if (e.type === 'border') toast(pick(BORDER_TEXTS[e.country]) ?? fill(UI.welcome, { where: COUNTRY_LOCATIVE[e.country] }));
    else if (e.type === 'waypoint') toast(waypointText(e.waypoint));
    else if (e.type === 'over' || e.type === 'arrived') {
      try { showOver(g); } catch (error) {
        // Ekran końca musi się pokazać nawet przy błędzie dodatków (opis, duch, link do portalu).
        console.error('[showOver]', error);
        ui.hud.hidden = true;
        ui.over.hidden = false;
      }
    }
  }
  const milestone = Math.floor(g.km / 100) * 100;
  if (g.phase === 'playing' && milestone > lastMilestone && milestone > 0) {
    lastMilestone = milestone;
    if (ui.toast.hidden) {
      const pool = daily && dailyTitle(daily) === 'Na Wigilię!' ? WIGILIA_TEXTS : MILESTONE_TEXTS;
      toast(fill(pick(pool), { km: milestone }));
    }
  }
}

function feedback(e: GameEvent): void {
  const sound = sfxForGameEvent(e);
  if (sound) sfx.play(sound);
  const haptic = hapticForGameEvent(e);
  if (haptic) haptics.play(haptic);
  // Kraje bez własnego akcentu (np. tranzytowe) są ignorowane w playCountryCue.
  if (e.type === 'border') music?.playCountryCue(e.country as CountryCueCode);
  if (e.type === 'arrived') music?.playFinishJingle();
  else if (e.type === 'over') music?.stop();
}

function cardData(g: Game, joke: string): CardData {
  return {
    km: g.km,
    totalKm: g.route.totalKm,
    arrived: g.phase === 'arrived',
    seconds: Math.round(g.ticks * TICK),
    from: g.route.from,
    to: g.route.to,
    home: g.route.home,
    causeText: joke,
    ...(daily ? { daily: dailyTitleText(daily) } : {}),
  };
}

let lastCard: CardData | null = null;

function showOver(g: Game): void {
  breadcrumb('showOver:start');
  if (params.get('test') === '1') postOverFrames = 5;
  overAt = performance.now();
  const bestKey = 'ce.best.' + g.mode;
  const prevBest = load<{ km: number }>(bestKey, { km: 0 }).km;
  const isBest = g.km > prevBest;
  if (isBest) save(bestKey, { km: g.km });

  const arrived = g.phase === 'arrived';
  const seconds = Math.round(g.ticks * TICK);
  // Samouczek wraca po trzech szybkich wypadkach z rzędu (dojazd liczy się jak długi lot).
  tutorial?.onCrash(g.ticks * TICK);
  ui.over.classList.toggle('is-arrived', arrived);
  ui.overTitle.textContent = arrived ? UI.arrived : UI.over;
  ui.overKm.textContent = fill(UI.distance, { km: g.km });
  ui.overRoute.textContent = localizedCityName(g.route.from) + ' → ' + localizedCityName(g.route.to);
  const cause = g.cause ?? 'ground';
  const causeIcon = arrived ? 'assets/ui/icon-jar.png'
    : cause === 'ground' ? 'assets/ui/icon-map.png' : 'assets/obstacles/' + cause + '-end.png';
  ui.overCauseIcon.src = import.meta.env.BASE_URL + causeIcon;
  ui.overCauseIcon.alt = '';
  let joke: string;
  if (arrived) {
    joke = g.baseWeight > 0
      ? fill(pick(RETURN_ARRIVAL_TEXTS), {
        // Polski: miejscownik; inne języki mają zdania bez odmiany, więc wystarczy nazwa miasta.
        city: getLanguage() === 'pl' ? RETURN_CITY_LOCATIVE[g.route.to.id] ?? g.route.to.name : localizedCityName(g.route.to),
      })
      : pick(ARRIVAL_TEXTS);
    ui.overCause.textContent = joke;
    ui.overJoke.textContent = seconds + ' s';
  } else {
    joke = pick(FAIL_JOKES[cause]);
    ui.overCause.textContent = fill(UI.stoppedBy, { what: OBSTACLE_NAME[cause].toLowerCase() });
    ui.overJoke.textContent = '„' + joke + '”';
  }
  ui.overBest.textContent = isBest ? UI.newBest : fill(UI.best, { km: Math.max(prevBest, g.km) });
  const ghostText = ghostRunner && ghostMod ? ghostMod.ghostOutcomeText(ghostRunner, g) : null;
  ui.overGhost.hidden = !ghostText;
  ui.overGhost.textContent = ghostText ?? '';

  const link = portalLink(g.route.home, 'result');
  ui.overPortal.hidden = !link;
  if (link) {
    ui.overPortal.href = link;
    ui.overPortal.textContent = fill(UI.portal, { where: COUNTRY_LOCATIVE[g.route.home] });
  }
  ui.hud.hidden = true;
  ui.over.hidden = false;
  breadcrumb('showOver:visible');
  // Lot powrotny: po dojechaniu do Polski (nie po samym powrocie) można od razu ruszyć z powrotem.
  offeredReturn = returnFlightRoute(g, daily);
  ui.btnReturnFlight.hidden = !offeredReturn;
  if (offeredReturn) save('ce.returnUnlocked', true);

  // Medale i pocztówki: liczą się wszystkie przejazdy (także łagodne i powrotne).
  // Toasty tylko na tym ekranie końca: po „Zagraj ponownie” lub powrocie do menu przepadają.
  const serial = overSerial;
  void Promise.all([progressModule(), progressReady]).then(([{ applyRun, saveProgress, summarizeRun }]) => {
    breadcrumb('progress:start');
    if (!progress) return;
    const kmBefore = progress.stats.totalKm;
    // Powrót za granicę to nie „dojazd do domu” — summarizeRun rozpoznaje go po baseWeight.
    const change = applyRun(progress, summarizeRun(g, winter));
    progress = change.progress;
    void saveProgress(progress);
    const kmAfter = progress.stats.totalKm;
    // Teksty toastów z leniwych chunków: bez sieci przepadają, ale postęp jest już policzony.
    breadcrumb('progress:applied');
    return Promise.all([import('./meta/unlocks'), import('./ui/collection')]).then(([unlocks, { medalToast, postcardToast }]) => {
      breadcrumb('progress:toasts');
      const cars = unlocks.applyRunKm({ totalKm: kmBefore }, kmAfter - kmBefore).newlyUnlocked;
      // Jedna kolejka: nowe auto najpierw, medal nie może go przykryć po 300 ms.
      const news = [...cars.map(unlocks.unlockAnnouncement), ...change.newMedals.map(medalToast), ...change.newPostcards.map(postcardToast)];
      news.slice(0, 3).forEach((text, i) => window.setTimeout(() => {
        if (serial === overSerial && !ui.over.hidden) toast(text);
      }, 500 + i * 1800));
    });
  }).catch(quiet);

  // Po pierwszym przejeździe dociągamy w tle grafiki wszystkich krajów (tryb offline).
  void prefetchPwaAssetsAfterRun();
  // Błędy sieci i brak wyników nie powinny zostawiać pustej tabeli.
  const leagueRequest = ++overLeagueRequest;
  ui.overMiniLeague.hidden = true;
  ui.overLeagueList.replaceChildren();
  // Bez skonfigurowanego Firebase ranking to atrapa z przykładowymi liczbami — nie pokazujemy jej graczom.
  void net.then(({ api, isMock }) => (!isMock || params.get('test') === '1')
    ? import('./ui/mini-league').then(({ miniLeagueRows }) => { breadcrumb('league:start'); return miniLeagueRows(api, g.route.home); }) : []).then((rows) => {
    breadcrumb('league:done');
    if (leagueRequest !== overLeagueRequest || ui.over.hidden || !rows.length) return;
    ui.overLeagueList.replaceChildren(...rows);
    ui.overMiniLeague.hidden = false;
  }).catch(() => { if (leagueRequest === overLeagueRequest) ui.overMiniLeague.hidden = true; });

  // Kartę renderujemy od razu, żeby kliknięcie „Udostępnij” zachowało gest użytkownika.
  lastCard = cardData(g, joke);
  const card = lastCard;
  cardImage = import('./share/card').then(({ renderCard }) => { breadcrumb('card:start'); return renderCard(card, 'story'); })
    .then((blob) => { breadcrumb('card:done'); return blob; })
    .catch(() => null as unknown as Blob);
  void import('./share/share').catch(quiet);
  prepareChallenge(g, card);
  breadcrumb('showOver:end');
  if (params.get('test') === '1') {
    // Bicie serca: ostatni ślad przed ciszą wskazuje moment zawieszenia wątku.
    let beats = 0;
    const heartbeat = window.setInterval(() => {
      breadcrumb('hb');
      if (++beats >= 40) window.clearInterval(heartbeat);
    }, 250);
  }

  breadcrumb('track:start');
  track('run_end', {
    km: g.km, seconds, cause: arrived ? 'arrived' : g.cause ?? 'ground', mode: g.mode, home: g.route.home as AnalyticsHome,
  });
  breadcrumb('track:done');
  // Nick ładuje się leniwie: wynik zgłaszamy po jego sprawdzeniu, zamiast pomijać, gdy jeszcze go nie ma.
  if (runId) {
    const run = { runId, flapTicks: [...g.flapTicks], ticks: g.ticks, km: g.km, rulesVersion: RULES_VERSION };
    void Promise.all([net, ensureNick()])
      .then(([{ api, queue, submitOrQueue }, nickId]) => { breadcrumb('submit:start'); return submitOrQueue(api, queue, { ...run, nickId }); })
      .then(() => breadcrumb('submit:done'))
      .catch(quiet);
    runId = null;
  }
}

// Natywnie udostępnia platforma (zlecenie 24); jej wynik mapujemy na wyjątki,
// których oczekuje shareResult (zlecenie 14), żeby działał łańcuch zapasowy.
let shareAdapterSet = false;

async function share(): Promise<void> {
  if (!lastCard) return;
  const image = (await cardImage) ?? undefined;
  const { setNativeShareAdapter, shareResult } = await import('./share/share');
  if (!shareAdapterSet) {
    shareAdapterSet = true;
    setNativeShareAdapter({
      async share(file, text, url) {
        const result = await platform.share(file, text, url);
        if (result === 'cancelled') throw new DOMException('Anulowano', 'AbortError');
        if (result === 'unavailable') throw new Error('Udostępnianie natywne niedostępne');
      },
    });
  }
  const outcome = await shareResult(lastCard, { image });
  if (outcome.method !== 'cancelled') {
    const format = outcome.method === 'native' ? 'native' : outcome.method === 'clipboard' ? 'clipboard' : outcome.method === 'web-link' ? 'link' : 'image';
    track('share_click', { format });
  }
}

/**
 * „Wyzwij znajomego”: kod g= powstaje z replay całego przejazdu, więc liczymy go zaraz
 * po końcu gry (w tle), a nie po kliknięciu — wtedy udostępnianie zachowuje gest gracza.
 */
function prepareChallenge(g: Game, card: CardData): void {
  ui.btnChallenge.hidden = true;
  if (g.baseWeight !== 0) return;
  const request = Promise.all([import('./share/share'), ghostModule()]).then(([shareMod, gm]) => {
    breadcrumb('challenge:start');
    const url = gm.buildChallengeLink(shareMod.shareUrl(card), g, settings.nickId);
    breadcrumb('challenge:done');
    return url ? { url, text: gm.challengeShareText(g) } : null;
  }).catch(() => null);
  challengeLink = request;
  void request.then((link) => {
    if (link && challengeLink === request && !ui.over.hidden) ui.btnChallenge.hidden = false;
  });
}

async function shareChallenge(): Promise<void> {
  const card = lastCard;
  const link = await challengeLink;
  if (!card || !link) return;
  const image = (await cardImage) ?? undefined;
  const { shareResult } = await import('./share/share');
  const outcome = await shareResult(card, { image, url: link.url, text: link.text });
  if (outcome.method !== 'cancelled') {
    const format = outcome.method === 'native' ? 'native' : outcome.method === 'clipboard' ? 'clipboard' : outcome.method === 'web-link' ? 'link' : 'image';
    track('share_click', { format });
  }
}

// --- Pętla: stały krok symulacji, render co klatkę ---
let last = performance.now();
let acc = 0;

function frame(now: number): void {
  // Następna klatka zawsze — jeden wyjątek nie może zatrzymać całej gry.
  requestAnimationFrame(frame);
  step(now);
}

/**
 * Strażnik pętli: gdy przeglądarka wstrzyma requestAnimationFrame przy widocznej stronie
 * (zawieszony kompozytor, część WebView na Androidzie, headless Chromium w CI), logika gry
 * idzie dalej z timera — przejazd się kończy, ekran końca się pokazuje. Po powrocie klatek
 * strażnik milknie sam. Ukryta karta: nic nie liczymy (gra ma stać w tle).
 */
const FRAME_STALL_MS = 400;
window.setInterval(() => {
  if (document.visibilityState !== 'visible') return;
  const now = performance.now();
  if (now - last > FRAME_STALL_MS) step(now);
}, FRAME_STALL_MS / 2);

function step(now: number): void {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (game) {
    acc += dt;
    let steps = 0;
    while (acc >= TICK && steps < 24) {
      game.tick();
      // Duch musi dostać każdy tick gracza; rozjechanie się wyłącza go po cichu.
      if (ghostRunner && ghostMod) ghostRunner = ghostMod.syncGhost(ghostRunner, game);
      acc -= TICK;
      steps++;
    }
    if (steps === 24) acc = 0;
    handleEvents(game);
    const traceFrame = postOverFrames > 0;
    if (traceFrame) { postOverFrames--; breadcrumb('frame:events-done'); }
    if (game.phase === 'playing') updateHud();
    const drawGhost = !ghostDrawFailed && ghostRunner && ghostMod?.isGhostVisible(ghostRunner, game) ? ghostRunner : null;
    renderer.ghost = drawGhost;
    if (traceFrame) breadcrumb('frame:draw-start');
    renderer.draw(game, now / 1000);
    if (traceFrame) breadcrumb('frame:draw-done');
    // Renderer zeruje ducha po błędzie rysowania — wtedy nie próbujemy ponownie w tym przejeździe.
    if (drawGhost && !renderer.ghost) ghostDrawFailed = true;
    // Żart z tablicy nie nachodzi na komunikat o mieście lub granicy.
    signJoke?.show(game.phase === 'playing' && ui.toast.hidden ? renderer.signJoke : null);
    if (traceFrame) breadcrumb('frame:end');
  } else {
    renderer.draw(previewGame, now / 1000);
  }
}

let signJoke: SignJokeBubble | null = null;
void import('./render/signs').then(({ mountSignJoke }) => { signJoke = mountSignJoke(ui.hud); });
// Haki tylko dla ?test=1 (zrzuty do sklepu, e2e) — w zwykłej sesji nic nie robią.
void net.then(({ api }) => installStoreShotHooks(() => game, api));

/** Gra w tle menu (stoi w miejscu). */
const previewGame = new Game({ seed: 1, mode: 'ranked', route });

function resize(): void {
  renderer.resize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resize);
resize();
setHeroSkin(normalizeHeroSkin(settings.skin));
preloadSprites();

// Nagrywanie rolki 15 s (przycisk widoczny poza samym lotem; ?redakcja=1 — tryb redakcji).
let recordControl: { element: HTMLElement } | null = null;
// Moduł rolek ładujemy po pierwszej klatce — nie spowalnia startu na słabym internecie.
// Bez sieci import się nie uda — próbujemy ponownie po powrocie połączenia (bez nieobsłużonego wyjątku).
function loadRecordControl(): void {
  void import('./ui/record').then(mountRecordControl).catch(() => {
    window.addEventListener('online', loadRecordControl, { once: true });
  });
}
window.setTimeout(loadRecordControl, 800);
function mountRecordControl({ createRecordControl }: typeof import('./ui/record')): void {
  if (recordControl) return;
  recordControl = createRecordControl({
    canvas,
    getAudio: () => (audioCtx && audioMix ? { context: audioCtx, source: audioMix } : undefined),
    overlay: () => ({ km: game?.km ?? 0, route: `${localizedCityName((game?.route ?? route).from)} → ${localizedCityName((game?.route ?? route).to)}` }),
    portalUrl: () => portalLink(settings.home, 'video'),
    shareVideo: (file, text, url) => platform.share(file, text, url),
  });
  $('stage').appendChild(recordControl.element);
  syncRecordVisibility();
}
function syncRecordVisibility(): void {
  if (!recordControl) return;
  const playing = game?.phase === 'playing';
  const recording = recordControl.element.getAttribute('data-phase') === 'recording';
  recordControl.element.hidden = (playing && !recording) || !ui.garage.hidden || !ui.league.hidden || !ui.album.hidden;
}
setInterval(syncRecordVisibility, 250);
fillMenu();
requestAnimationFrame(frame);
// Wyzwanie z linku dekodujemy po pierwszej klatce (replay do 72 000 ticków nie może opóźnić startu).
if (params.has('g')) {
  ghostLoad = new Promise<void>((resolve) => requestAnimationFrame(() => window.setTimeout(resolve, 0)))
    .then(() => ghostModule())
    .then((gm) => {
      const challenge = gm.loadGhostChallenge(params);
      if (!challenge || ghostDropped) return;
      ghostChallenge = challenge;
      ui.ghostInfo.textContent = gm.ghostMenuInfo(challenge);
      ui.ghostInfo.hidden = false;
    })
    .catch(() => undefined);
}
// Przełącznik języków (i tłumaczenie menu) po pierwszej klatce — nie spowalnia startu.
requestAnimationFrame(() => void import('./ui/language-switcher'));
// Ikona zębatki też po pierwszej klatce: na wolnym internecie nie konkuruje z kodem gry.
requestAnimationFrame(() => {
  const icon = ui.btnSettings.querySelector('img');
  if (icon) icon.src = import.meta.env.BASE_URL + 'assets/ui/icon-settings.png';
});

// Samouczek bez słów: dłoń przy pierwszych lotach. Testy i redakcja mają go wyłączony (chyba że ?tutorial=1).
const TUTORIAL_STORAGE_KEY = 'ce.tutorial.v1.done';
const tutorialAllowed = params.get('tutorial') === '1' || (params.get('test') !== '1' && params.get('redakcja') !== '1');
if (tutorialAllowed) {
  requestAnimationFrame(() => void Promise.all([import('./ui/tutorial'), platform.storage.get(TUTORIAL_STORAGE_KEY)])
    .then(([{ mountTutorial }, done]) => {
      tutorial = mountTutorial(ui.hud, {
        dismissed: done === '1' && params.get('tutorial') !== '1',
        onDismiss: () => void platform.storage.set(TUTORIAL_STORAGE_KEY, '1'),
      });
      if (game?.phase === 'ready') syncTutorialHint();
      else tutorial.hide();
    })
    .catch(() => undefined));
}

// Pierwsze uruchomienie: wybór kraju i miasta. Kto już grał (ma zapisane ustawienia), nie widzi go wcześniej.
void import('./ui/onboarding').then(async ({ ONBOARDING_STORAGE_KEY, mountOnboarding, shouldShowOnboarding }) => {
  if (!(await shouldShowOnboarding(params))) return;
  // Onboarding w języku z ?lang= lub zapisu, a nie po polsku z chwilowym dociąganiem słownika.
  await initializeLanguage();
  await loadLanguage(getLanguage());
  if (returningPlayer) {
    void platform.storage.set(ONBOARDING_STORAGE_KEY, '1');
    return;
  }
  // Na wolnej sieci gracz mógł już wystartować (albo otworzyć panel) — nie zasłaniamy gry.
  if (ui.menu.hidden || startingRun) return;
  const close = mountOnboarding($('stage'), {
    onDone(home, from, to) {
      close();
      settings = { ...settings, home, from, to };
      save('ce.settings', settings);
      route = safeRoute(settings);
      fillMenu();
    },
  });
}).catch(() => undefined);
void platform.initialize();
// Aktualizacja PWA przeładowuje grę dopiero przy powrocie do menu.
void registerPwa((reload) => {
  if (!ui.menu.hidden) reload();
  else {
    pendingReload = reload;
    toast(UI.updateReady);
  }
});
