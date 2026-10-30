import { TICK } from './core/config';
import { Game, type Mode } from './core/game';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, type HomeCountry, type Route } from './core/route';
import { COUNTRY_LOCATIVE, COUNTRY_NAME, FAIL_JOKES, OBSTACLE_NAME, PICKUP_TOAST, UI, fill } from './content/pl';
import { Renderer } from './render/renderer';

interface Settings {
  home: HomeCountry;
  from: string;
  to: string;
  mode: Mode;
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
  selHome: $<HTMLSelectElement>('sel-home'),
  selFrom: $<HTMLSelectElement>('sel-from'),
  selTo: $<HTMLSelectElement>('sel-to'),
  routeInfo: $('route-info'),
  overTitle: $('over-title'),
  overKm: $('over-km'),
  overRoute: $('over-route'),
  overCause: $('over-cause'),
  overJoke: $('over-joke'),
  overBest: $('over-best'),
};

let settings = load<Settings>('ce.settings', DEFAULTS);
let route: Route = safeRoute(settings);
let game: Game | null = null;
let overAt = 0;
let toastTimer = 0;

function safeRoute(s: Settings): Route {
  try {
    return makeRoute(s.home, s.from, s.to);
  } catch {
    settings = { ...DEFAULTS, mode: s.mode };
    return makeRoute(settings.home, settings.from, settings.to);
  }
}

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
  ui.selTo.replaceChildren(...PL_CITIES.map((c) => option(c.id, c.name)));
  ui.selTo.value = settings.to;
  for (const b of document.querySelectorAll<HTMLButtonElement>('.mode')) {
    b.setAttribute('aria-checked', String(b.dataset.mode === settings.mode));
  }
  route = safeRoute(settings);
  ui.routeInfo.textContent = `${route.from.name} → ${route.to.name}: ${route.totalKm} km`;
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
  newRun();
});
$('btn-again').addEventListener('click', () => newRun());
$('btn-menu').addEventListener('click', () => showMenu());
$('btn-share').addEventListener('click', () => share());

function showMenu(): void {
  game = null;
  ui.over.hidden = true;
  ui.hud.hidden = true;
  ui.menu.hidden = false;
  fillMenu();
}

function newRun(): void {
  const seed = (Math.random() * 2 ** 32) >>> 0;
  game = new Game({ seed, mode: settings.mode, route });
  ui.menu.hidden = true;
  ui.over.hidden = true;
  ui.hud.hidden = false;
  ui.hint.hidden = false;
  ui.hint.textContent = UI.tapToStart;
  ui.toast.hidden = true;
  updateHud();
}

// --- Sterowanie: dotyk, klik, spacja ---
function tap(): void {
  if (!game) return;
  if (game.phase === 'over' || game.phase === 'arrived') {
    if (performance.now() - overAt > 600) newRun();
    return;
  }
  game.flap();
  ui.hint.hidden = true;
}

$('stage').addEventListener('pointerdown', (e) => {
  if ((e.target as HTMLElement).closest('.panel')) return;
  e.preventDefault();
  tap();
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    if (!ui.menu.hidden) return;
    tap();
  }
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
  toastTimer = window.setTimeout(() => (ui.toast.hidden = true), 1400);
}

function handleEvents(g: Game): void {
  for (const e of g.drainEvents()) {
    if (e.type === 'pickup') toast(fill(PICKUP_TOAST[e.kind], { km: e.bonusKm }));
    else if (e.type === 'border') toast(fill(UI.welcome, { where: COUNTRY_LOCATIVE[e.country] }));
    else if (e.type === 'over' || e.type === 'arrived') showOver(g);
  }
}

function showOver(g: Game): void {
  overAt = performance.now();
  const bestKey = `ce.best.${g.mode}`;
  const prevBest = load<{ km: number }>(bestKey, { km: 0 }).km;
  const isBest = g.km > prevBest;
  if (isBest) save(bestKey, { km: g.km });

  const arrived = g.phase === 'arrived';
  ui.overTitle.textContent = arrived ? UI.arrived : UI.over;
  ui.overKm.textContent = fill(UI.distance, { km: g.km });
  ui.overRoute.textContent = `${route.from.name} → ${route.to.name}`;
  if (arrived) {
    ui.overCause.textContent = UI.arrivedSub;
    ui.overJoke.textContent = `${Math.round(g.seconds)} s`;
  } else {
    const cause = g.cause ?? 'ground';
    const jokes = FAIL_JOKES[cause];
    ui.overCause.textContent = fill(UI.stoppedBy, { what: OBSTACLE_NAME[cause].toLowerCase() });
    ui.overJoke.textContent = `„${jokes[Math.floor(Math.random() * jokes.length)]}”`;
  }
  ui.overBest.textContent = isBest ? UI.newBest : fill(UI.best, { km: Math.max(prevBest, g.km) });
  ui.hud.hidden = true;
  ui.over.hidden = false;
}

async function share(): Promise<void> {
  if (!game) return;
  const text =
    game.phase === 'arrived'
      ? fill(UI.shareArrivedText, { from: route.from.fromName, to: route.to.toName, sec: Math.round(game.seconds) })
      : fill(UI.shareText, { km: game.km, from: route.from.fromName, to: route.to.toName });
  const url = location.href.split('#')[0];
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Cebulak Express', text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    toastOver('Skopiowano do schowka');
  } catch {
    /* anulowane przez gracza */
  }
}

function toastOver(text: string): void {
  ui.overBest.textContent = text;
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
fillMenu();
requestAnimationFrame(frame);
