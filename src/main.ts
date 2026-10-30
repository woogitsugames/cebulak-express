import { TICK } from './core/config';
import { dailyKey, dailyRoute, dailySeed, dailyTitle } from './core/daily';
import { Game, type GameEvent, type Mode } from './core/game';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, type HomeCountry, type Route } from './core/route';
import {
  ARRIVAL_TEXTS, BORDER_TEXTS, COUNTRY_LOCATIVE, COUNTRY_NAME, FAIL_JOKES, MILESTONE_TEXTS,
  OBSTACLE_NAME, PICKUP_TEXTS, UI, WIGILIA_TEXTS, fill,
} from './content/pl';
import { randomNickChoices } from './content/nicks';
import { portalLink } from './content/portals';
import { Renderer } from './render/renderer';
import { normalizeHeroSkin, preloadSprites, setHeroSkin } from './render/sprites';
import { mountGarage } from './ui/garage';
import { createRecordControl } from './ui/record';
import { saveRecordedVideo } from './record/recorder';
import { createSfx, sfxForGameEvent, type SfxPlayer } from './audio/sfx';
import { createHaptics, hapticForGameEvent } from './audio/haptics';
import { createMusic, type MusicPlayer } from './audio/music';
import { renderCard, type CardData } from './share/card';
import { setNativeShareAdapter, shareResult } from './share/share';
import { parseGameParams } from './net/params';
import { createRankingApi } from './net/api';
import { OfflineRunQueue, submitOrQueue, watchQueueOnline } from './net/queue';
import { mountLeague } from './ui/league';
import { configureAnalytics, track, type AnalyticsHome } from './analytics/track';
import { registerPwa } from './pwa/register';
import { platform } from './platform';

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
};

const params = new URLSearchParams(location.search);
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
  music = createMusic(audioCtx, { destination: mix, volume: 0.5 });
  void sfx.unlock();
  void music.unlock();
}

// --- Ranking (bez konfiguracji Firebase działa na mocku) ---
const api = createRankingApi();
const queue = new OfflineRunQueue();
watchQueueOnline(queue, api);

// --- Analityka (wyłączona, gdy brak adresu) ---
configureAnalytics({ endpoint: String(import.meta.env.VITE_ANALYTICS_ENDPOINT ?? '') });
track('app_open');

// --- Menu ---
function option(value: string, label: string): HTMLOptionElement {
  const o = document.createElement('option');
  o.value = value;
  o.textContent = label;
  return o;
}

function fillMenu(): void {
  ui.selHome.replaceChildren(...HOME_COUNTRIES.map((c) => option(c, COUNTRY_NAME[c])));
  ui.selHome.value = settings.home;
  ui.selFrom.replaceChildren(...START_CITIES[settings.home].map((c) => option(c.id, c.name)));
  ui.selFrom.value = settings.from;
  const sorted = [...PL_CITIES].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
  ui.selTo.replaceChildren(...sorted.map((c) => option(c.id, c.name)));
  ui.selTo.value = settings.to;
  for (const b of document.querySelectorAll<HTMLButtonElement>('.mode')) {
    b.setAttribute('aria-checked', String(b.dataset.mode === settings.mode));
  }
  route = safeRoute(settings);
  ui.routeInfo.textContent = `${route.from.name} → ${route.to.name}: ${route.totalKm} km`;
  ui.dailyInfo.textContent = fill(UI.dailyHint, { title: dailyTitle(dailyKey(new Date())) });
}

ui.selHome.addEventListener('change', () => {
  const home = ui.selHome.value as HomeCountry;
  settings = { ...settings, home, from: START_CITIES[home][0].id };
  fillMenu();
});
ui.selFrom.addEventListener('change', () => {
  settings = { ...settings, from: ui.selFrom.value };
  fillMenu();
});
ui.selTo.addEventListener('change', () => {
  settings = { ...settings, to: ui.selTo.value };
  fillMenu();
});
for (const b of document.querySelectorAll<HTMLButtonElement>('.mode')) {
  b.addEventListener('click', () => {
    settings = { ...settings, mode: b.dataset.mode as Mode };
    fillMenu();
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
  closeLeague = mountLeague(ui.leagueBody, api, settings.home);
  track('league_open');
});
$('btn-league-close').addEventListener('click', () => showMenu());
$('btn-garage').addEventListener('click', () => {
  ui.menu.hidden = true;
  ui.garage.hidden = false;
  closeGarage = mountGarage(ui.garage, {
    home: settings.home,
    skin: normalizeHeroSkin(settings.skin),
    nickId: settings.nickId,
    onChange: (sel) => {
      settings = { ...settings, skin: sel.skin, nickId: sel.nickId };
      save('ce.settings', settings);
      setHeroSkin(sel.skin);
    },
    onClose: () => showMenu(),
  });
});
$('btn-again').addEventListener('click', () => void newRun());
$('btn-menu').addEventListener('click', () => showMenu());
$('btn-share').addEventListener('click', () => void share());
ui.overPortal.addEventListener('click', () => track('portal_click', { placement: 'result', home: settings.home as AnalyticsHome }));

function showMenu(): void {
  if (pendingReload) return pendingReload();
  game = null;
  music?.stop();
  closeLeague?.();
  closeLeague = null;
  closeGarage?.();
  closeGarage = null;
  ui.over.hidden = true;
  ui.hud.hidden = true;
  ui.league.hidden = true;
  ui.garage.hidden = true;
  ui.menu.hidden = false;
  fillMenu();
}

/** Tryb gry dla rdzenia: wyzwanie dnia zawsze rankingowe. */
function currentMode(): Mode {
  return daily ? 'ranked' : settings.mode;
}

async function newRun(): Promise<void> {
  const runRoute = daily ? dailyRoute(daily) : route;
  const mode = currentMode();
  let seed = (Math.random() * 2 ** 32) >>> 0;
  if (daily) seed = dailySeed(daily);
  // Hak testowy dla E2E: stałe ziarno tylko z ?test=1.
  if (params.get('test') === '1' && params.has('seed')) seed = Number(params.get('seed')) >>> 0;

  runId = null;
  if (mode === 'ranked') {
    try {
      const start = await api.startRun({
        mode: daily ? 'daily' : 'ranked', home: runRoute.home, from: runRoute.from.id, to: runRoute.to.id,
        ...(daily ? { daily } : {}),
      });
      runId = start.runId;
      seed = start.seed;
    } catch {
      /* bez sieci gramy lokalnie, bez rankingu */
    }
  }

  game = new Game({ seed, mode, route: runRoute });
  lastMilestone = 0;
  cardImage = null;
  music?.setSeason(daily && dailyTitle(daily) === 'Na Wigilię!' ? 'holiday' : 'regular');
  ui.menu.hidden = true;
  ui.over.hidden = true;
  ui.league.hidden = true;
  ui.hud.hidden = false;
  ui.hint.hidden = false;
  ui.hint.textContent = daily ? dailyTitle(daily) : UI.tapToStart;
  ui.toast.hidden = true;
  updateHud();
}

// --- Sterowanie: dotyk, klik, spacja ---
function tap(): void {
  unlockAudio();
  if (!game) return;
  if (game.phase === 'over' || game.phase === 'arrived') {
    if (performance.now() - overAt > 600) void newRun();
    return;
  }
  if (game.phase === 'ready') {
    music?.start();
    track('run_start', { mode: game.mode, home: game.route.home as AnalyticsHome });
  }
  game.flap();
  ui.hint.hidden = true;
}

$('stage').addEventListener('pointerdown', (e) => {
  unlockAudio();
  if ((e.target as HTMLElement).closest('.panel, .ce-record-control')) return;
  e.preventDefault();
  tap();
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    if (!ui.menu.hidden || !ui.league.hidden || !ui.garage.hidden) return;
    tap();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) music?.pause();
  else if (game?.phase === 'playing') music?.resume();
});

// Przycisk wstecz (Android) / Escape: z gry do menu, z menu wyjście z aplikacji.
platform.onBack(() => {
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
    if (e.type === 'pickup') toast(fill(pick(PICKUP_TEXTS[e.kind]), { km: e.bonusKm }));
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
  const bestKey = `ce.best.${g.mode}`;
  const prevBest = load<{ km: number }>(bestKey, { km: 0 }).km;
  const isBest = g.km > prevBest;
  if (isBest) save(bestKey, { km: g.km });

  const arrived = g.phase === 'arrived';
  const seconds = Math.round(g.ticks * TICK);
  ui.overTitle.textContent = arrived ? UI.arrived : UI.over;
  ui.overKm.textContent = fill(UI.distance, { km: g.km });
  ui.overRoute.textContent = `${g.route.from.name} → ${g.route.to.name}`;
  let joke: string;
  if (arrived) {
    joke = pick(ARRIVAL_TEXTS);
    ui.overCause.textContent = joke;
    ui.overJoke.textContent = `${seconds} s`;
  } else {
    const cause = g.cause ?? 'ground';
    joke = pick(FAIL_JOKES[cause]);
    ui.overCause.textContent = fill(UI.stoppedBy, { what: OBSTACLE_NAME[cause].toLowerCase() });
    ui.overJoke.textContent = `„${joke}”`;
  }
  ui.overBest.textContent = isBest ? UI.newBest : fill(UI.best, { km: Math.max(prevBest, g.km) });

  const link = portalLink(g.route.home, 'result');
  ui.overPortal.hidden = !link;
  if (link) {
    ui.overPortal.href = link;
    ui.overPortal.textContent = fill(UI.portal, { where: COUNTRY_LOCATIVE[g.route.home] });
  }
  ui.hud.hidden = true;
  ui.over.hidden = false;

  // Kartę renderujemy od razu, żeby kliknięcie „Udostępnij” zachowało gest użytkownika.
  lastCard = cardData(g, joke);
  cardImage = renderCard(lastCard, 'story').catch(() => null as unknown as Blob);

  track('run_end', {
    km: g.km, seconds, cause: arrived ? 'arrived' : g.cause ?? 'ground', mode: g.mode, home: g.route.home as AnalyticsHome,
  });
  if (runId && settings.nickId) {
    void submitOrQueue(api, queue, { runId, flapTicks: [...g.flapTicks], ticks: g.ticks, km: g.km, nickId: settings.nickId });
    runId = null;
  }
}

// Natywnie udostępnia platforma (zlecenie 24); jej wynik mapujemy na wyjątki,
// których oczekuje shareResult (zlecenie 14), żeby działał łańcuch zapasowy.
setNativeShareAdapter({
  async share(file, text, url) {
    const result = await platform.share(file, text, url);
    if (result === 'cancelled') throw new DOMException('Anulowano', 'AbortError');
    if (result === 'unavailable') throw new Error('Udostępnianie natywne niedostępne');
  },
});

async function share(): Promise<void> {
  if (!lastCard) return;
  const image = (await cardImage) ?? undefined;
  const outcome = await shareResult(lastCard, { image });
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
      acc -= TICK;
      steps++;
    }
    if (steps === 24) acc = 0;
    handleEvents(game);
    if (game.phase === 'playing') updateHud();
    renderer.draw(game, now / 1000);
  } else {
    renderer.draw(previewGame, now / 1000);
  }
  requestAnimationFrame(frame);
}

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
const recordControl = createRecordControl({
  canvas,
  getAudio: () => (audioCtx && audioMix ? { context: audioCtx, source: audioMix } : undefined),
  overlay: () => ({ km: game?.km ?? 0, route: `${(game?.route ?? route).from.name} → ${(game?.route ?? route).to.name}` }),
  portalUrl: () => portalLink(settings.home, 'video'),
  shareVideo: (file, text, url) => platform.share(file, text, url),
  saveVideo: (video) => saveRecordedVideo(video),
});
$('stage').appendChild(recordControl.element);
function syncRecordVisibility(): void {
  const playing = game?.phase === 'playing';
  const recording = recordControl.element.getAttribute('data-phase') === 'recording';
  recordControl.element.hidden = (playing && !recording) || !ui.garage.hidden || !ui.league.hidden;
}
setInterval(syncRecordVisibility, 250);
fillMenu();
requestAnimationFrame(frame);
void platform.initialize();
// Aktualizacja PWA przeładowuje grę dopiero przy powrocie do menu.
void registerPwa((reload) => {
  if (!ui.menu.hidden) reload();
  else {
    pendingReload = reload;
    toast(UI.updateReady);
  }
});
