import { TICK } from './core/config';
import { dailyKey, dailyRoute, dailySeed, dailyTitle } from './core/daily';
import { Game, type GameEvent, type Mode } from './core/game';
import { RULES_VERSION, rankedGameOptions } from './core/rules';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, reverseRoute, type HomeCountry, type Route } from './core/route';
import { seasonAt } from './core/season';
import type { Progress } from './meta/progress';
import type { CountryCueCode } from './audio/country-cues';
import {
  ARRIVAL_TEXTS, BORDER_TEXTS, COUNTRY_LOCATIVE, COUNTRY_NAME, FAIL_JOKES, MILESTONE_TEXTS,
  OBSTACLE_NAME, PICKUP_TEXTS, UI, WIGILIA_TEXTS, fill, onLanguageChange,
} from './content/i18n';
import { localizedCityName } from './content/lang/cities';
import { RETURN_ARRIVAL_TEXTS, RETURN_CITY_LOCATIVE, RETURN_DEPARTURE_TEXTS } from './content/pl';
import { GHOST_TEXTS } from './content/lang/pl';
import { randomNickChoices } from './content/nicks';
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
import { warsawWeekKey } from './net/week';
import { configureAnalytics, track, type AnalyticsHome } from './analytics/track';
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

const params = new URLSearchParams(location.search);
/** Gracz, który już kiedyś grał, nie dostaje ekranu pierwszego uruchomienia. */
const returningPlayer = (() => { try { return localStorage.getItem('ce.settings') !== null; } catch { return false; } })();
let settings = load<Settings>('ce.settings', DEFAULTS);
// Link z karty wyniku lub osadzenia w portalu ustawia kraj i miasto startu.
const prefill = parseGameParams(params);
if (prefill) settings = { ...settings, home: prefill.home, from: prefill.from };
if (!settings.nickId) {
  settings.nickId = randomNickChoices(Math.random, 1, settings.home)[0];
  save('ce.settings', settings);
}

let route: Route = safeRoute(settings);
let game: Game | null = null;
/** Wyzwanie dnia: klucz daty (Europe/Warsaw) albo null dla zwykłego przejazdu. */
let daily: string | null = null;
let runId: string | null = null;
let overAt = 0;
let toastTimer = 0;
let lastMilestone = 0;
let cardImage: Promise<Blob> | null = null;
let pendingReload: (() => void) | null = null;
let closeLeague: (() => void) | null = null;
let closeGarage: (() => void) | null = null;
let overLeagueRequest = 0;
/** Lot powrotny: auto cięższe od startu (słoiki od mamy); bez rankingu, dopóki serwer nie zna tych zasad. */
const RETURN_WEIGHT = 0.25;
let returnTrip = false;
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
/** Duch bieżącego przejazdu; null po rozjechaniu się z grą. */
let ghostRunner: GhostRunner | null = null;
let ghostDrawFailed = false;
/** Link „Wyzwij znajomego” przygotowany po zakończeniu przejazdu. */
let challengeLink: Promise<{ url: string; text: string } | null> | null = null;
const winter = seasonAt(new Date(), location.search) === 'winter';
renderer.winter = winter;
const progressModule = () => import('./meta/progress');
void progressModule().then((m) => m.loadProgress()).then((p) => {
  progress = p;
  // Auta za kilometry (zlecenie 72): wybrane auto wraca dopiero, gdy wiadomo, ile przejechano.
  setHeroSkin(normalizeHeroSkin(settings.skin, totalKm()), totalKm());
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
  });
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
configureAnalytics({ endpoint: String(import.meta.env.VITE_ANALYTICS_ENDPOINT ?? '') });
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
  ui.dailyInfo.textContent = fill(UI.dailyHint, { title: dailyTitle(dailyKey(new Date())) });
  ui.btnSettings.setAttribute('aria-label', UI.settingsOpen);
  ui.btnSettings.title = UI.settingsTitle;
}
// Menu jest jedynym właścicielem pól trasy: po zmianie języka (także po dociągnięciu
// słownika) przerysowuje je samo, zamiast pozwalać modułom leniwym poprawiać opcje.
onLanguageChange(() => fillMenu());

function dropGhostChallenge(): void {
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
$('btn-league').addEventListener('click', () => {
  ui.menu.hidden = true;
  ui.league.hidden = false;
  void import('./ui/league').then(({ mountLeague }) => {
    return net.then(({ api }) => { if (!ui.league.hidden) closeLeague = mountLeague(ui.leagueBody, api, settings.home); });
  });
  track('league_open');
});
$('btn-league-close').addEventListener('click', () => showMenu());
$('btn-garage').addEventListener('click', () => {
  ui.menu.hidden = true;
  ui.garage.hidden = false;
  void import('./ui/garage').then(({ mountGarage }) => {
  if (ui.garage.hidden) return;
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
  });
});
$('btn-album').addEventListener('click', () => {
  ui.menu.hidden = true;
  ui.album.hidden = false;
  void progressModule().then((m) => m.loadProgress()).then((p) => {
    progress = p;
    return import('./ui/collection').then(({ mountCollection }) => {
      if (ui.album.hidden) return;
      closeCollection = mountCollection(ui.album, p, () => showMenu());
    });
  });
});
ui.btnSettings.addEventListener('click', () => void openSettings());
$('btn-again').addEventListener('click', () => void newRun(returnTrip));
$('btn-return-flight').addEventListener('click', () => void newRun(true));
$('btn-menu').addEventListener('click', () => showMenu());
$('btn-share').addEventListener('click', () => void share());
ui.btnChallenge.addEventListener('click', () => void shareChallenge());
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
  returnTrip = reverse && !daily;
  // Wyzwanie z linku: czekamy na zdekodowanie (zwykle gotowe dużo wcześniej niż klik).
  if (!returnTrip && !daily && ghostLoad) await ghostLoad;
  const challenge = !returnTrip && !daily ? ghostChallenge : null;
  ghostRunner = null;
  ghostDrawFailed = false;
  renderer.ghost = null;
  const runRoute = challenge ? challenge.route : returnTrip ? reverseRoute(route) : daily ? dailyRoute(daily) : route;
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
      runId = start.runId;
      seed = start.seed;
    } catch {
      /* bez sieci gramy lokalnie, bez rankingu */
    }
  }

  // Ranking: dokładnie te same opcje co replay na serwerze (bez baseWeight).
  game = new Game(mode === 'ranked'
    ? rankedGameOptions(seed, runRoute)
    : { seed, mode, route: runRoute, ...(returnTrip ? { baseWeight: RETURN_WEIGHT } : {}) });
  if (challenge && ghostMod) ghostRunner = ghostMod.createGhostRunner(challenge);
  lastMilestone = 0;
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
  ui.hint.textContent = returnTrip ? pick(RETURN_DEPARTURE_TEXTS) : daily ? dailyTitle(daily) : UI.tapToStart;
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
  ui.lives.setAttribute('aria-label', 'Pozostało żyć: ' + Math.max(0, game.lives));
}

function toast(text: string): void {
  ui.toast.textContent = text;
  ui.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (ui.toast.hidden = true), 1600);
}

function handleEvents(g: Game): void {
  for (const e of g.drainEvents()) {
    feedback(e);
    if (e.type === 'pickup') {
      toast(fill(pick(PICKUP_TEXTS[e.kind]), { km: e.bonusKm }));
      track('pickup', { kind: e.kind, mode: g.mode });
    }
    else if (e.type === 'border') toast(pick(BORDER_TEXTS[e.country]) ?? fill(UI.welcome, { where: COUNTRY_LOCATIVE[e.country] }));
    else if (e.type === 'waypoint') toast(e.waypoint.text);
    else if (e.type === 'over' || e.type === 'arrived') showOver(g);
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
    ...(daily ? { daily: dailyTitle(daily) } : {}),
  };
}

let lastCard: CardData | null = null;

function showOver(g: Game): void {
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
  ui.overRoute.textContent = g.route.from.name + ' → ' + g.route.to.name;
  const cause = g.cause ?? 'ground';
  const causeIcon = arrived ? 'assets/ui/icon-jar.png'
    : cause === 'ground' ? 'assets/ui/icon-map.png' : 'assets/obstacles/' + cause + '-end.png';
  ui.overCauseIcon.src = import.meta.env.BASE_URL + causeIcon;
  ui.overCauseIcon.alt = '';
  let joke: string;
  if (arrived) {
    joke = g.baseWeight > 0
      ? fill(pick(RETURN_ARRIVAL_TEXTS), { city: RETURN_CITY_LOCATIVE[g.route.to.id] ?? g.route.to.name })
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
  // Lot powrotny: po dojechaniu do Polski (nie po samym powrocie) można od razu ruszyć z powrotem.
  const canReturn = arrived && g.baseWeight === 0 && !daily;
  ui.btnReturnFlight.hidden = !canReturn;
  if (canReturn) save('ce.returnUnlocked', true);

  // Medale i pocztówki: liczą się wszystkie przejazdy (także łagodne i powrotne).
  if (progress) void progressModule().then(({ applyRun, saveProgress, summarizeRun }) => {
    if (!progress) return;
    // Powrót za granicę to nie „dojazd do domu” — medale za dojazd liczymy tylko w stronę Polski.
    const homeward = g.baseWeight === 0;
    const kmBefore = progress.stats.totalKm;
    const change = applyRun(progress, summarizeRun({ route: g.route, km: g.km, jars: g.jars, parcels: g.parcels,
      phase: homeward ? g.phase : 'over' }, winter && arrived && homeward));
    progress = change.progress;
    void saveProgress(progress);
    const kmAfter = progress.stats.totalKm;
    void import('./meta/unlocks').then(({ applyRunKm, unlockAnnouncement }) => {
      const cars = applyRunKm({ totalKm: kmBefore }, kmAfter - kmBefore).newlyUnlocked;
      cars.forEach((id, i) => window.setTimeout(() => toast(unlockAnnouncement(id)), 400 + i * 1800));
    });
    if (change.newMedals.length || change.newPostcards.length) {
      void import('./ui/collection').then(({ medalToast, postcardToast }) => {
        const news = [...change.newMedals.map(medalToast), ...change.newPostcards.map(postcardToast)];
        news.slice(0, 3).forEach((text, i) => window.setTimeout(() => toast(text), 700 + i * 1800));
      });
    }
  });

  // Po pierwszym przejeździe dociągamy w tle grafiki wszystkich krajów (tryb offline).
  void prefetchPwaAssetsAfterRun();
  // Błędy sieci i brak wyników nie powinny zostawiać pustej tabeli.
  const leagueRequest = ++overLeagueRequest;
  ui.overMiniLeague.hidden = true;
  ui.overLeagueList.replaceChildren();
  // Bez skonfigurowanego Firebase ranking to atrapa z przykładowymi liczbami — nie pokazujemy jej graczom.
  void net.then(({ api, isMock }) => (!isMock || params.get('test') === '1') ? api.getLeague(warsawWeekKey()) : Promise.reject(new Error('mock'))).then((data) => {
    if (leagueRequest !== overLeagueRequest || ui.over.hidden) return;
    const top = HOME_COUNTRIES
      .map((home) => ({ home, km: data.countries[home]?.km ?? 0 }))
      .filter((entry) => Number.isFinite(entry.km) && entry.km > 0)
      .sort((a, b) => b.km - a.km)
      .slice(0, 3);
    if (!top.length) return;
    const rows = top.map(({ home, km }, index) => {
      const li = document.createElement('li');
      if (home === g.route.home) li.classList.add('is-home');
      const place = document.createElement('span');
      place.className = 'mini-league__place';
      place.textContent = String(index + 1) + '.';
      const flag = document.createElement('img');
      flag.src = import.meta.env.BASE_URL + 'assets/ui/flag-' + home.toLowerCase() + '.png';
      flag.alt = '';
      const name = document.createElement('span');
      name.textContent = COUNTRY_NAME[home];
      const score = document.createElement('strong');
      score.className = 'mini-league__score';
      score.textContent = new Intl.NumberFormat('pl-PL').format(km) + ' km';
      li.append(place, flag, name, score);
      return li;
    });
    ui.overLeagueList.replaceChildren(...rows);
    ui.overMiniLeague.hidden = false;
  }).catch(() => { if (leagueRequest === overLeagueRequest) ui.overMiniLeague.hidden = true; });

  // Kartę renderujemy od razu, żeby kliknięcie „Udostępnij” zachowało gest użytkownika.
  lastCard = cardData(g, joke);
  const card = lastCard;
  cardImage = import('./share/card').then(({ renderCard }) => renderCard(card, 'story')).catch(() => null as unknown as Blob);
  void import('./share/share');
  prepareChallenge(g, card);

  track('run_end', {
    km: g.km, seconds, cause: arrived ? 'arrived' : g.cause ?? 'ground', mode: g.mode, home: g.route.home as AnalyticsHome,
  });
  if (runId && settings.nickId) {
    const run = {
      runId, flapTicks: [...g.flapTicks], ticks: g.ticks, km: g.km, nickId: settings.nickId, rulesVersion: RULES_VERSION,
    };
    void net.then(({ api, queue, submitOrQueue }) => submitOrQueue(api, queue, run));
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
    const url = gm.buildChallengeLink(shareMod.shareUrl(card), g, settings.nickId);
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
    if (game.phase === 'playing') updateHud();
    const drawGhost = !ghostDrawFailed && ghostRunner && ghostMod?.isGhostVisible(ghostRunner, game) ? ghostRunner : null;
    renderer.ghost = drawGhost;
    renderer.draw(game, now / 1000);
    // Renderer zeruje ducha po błędzie rysowania — wtedy nie próbujemy ponownie w tym przejeździe.
    if (drawGhost && !renderer.ghost) ghostDrawFailed = true;
    // Żart z tablicy nie nachodzi na komunikat o mieście lub granicy.
    signJoke?.show(game.phase === 'playing' && ui.toast.hidden ? renderer.signJoke : null);
  } else {
    renderer.draw(previewGame, now / 1000);
  }
  requestAnimationFrame(frame);
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
window.setTimeout(() => void import('./ui/record').then(({ createRecordControl }) => {
  recordControl = createRecordControl({
    canvas,
    getAudio: () => (audioCtx && audioMix ? { context: audioCtx, source: audioMix } : undefined),
    overlay: () => ({ km: game?.km ?? 0, route: `${(game?.route ?? route).from.name} → ${(game?.route ?? route).to.name}` }),
    portalUrl: () => portalLink(settings.home, 'video'),
    shareVideo: (file, text, url) => platform.share(file, text, url),
  });
  $('stage').appendChild(recordControl.element);
  syncRecordVisibility();
}), 800);
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
      if (!challenge) return;
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
  if (returningPlayer) {
    void platform.storage.set(ONBOARDING_STORAGE_KEY, '1');
    return;
  }
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
