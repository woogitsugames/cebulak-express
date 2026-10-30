import { PLAYER, WORLD } from '../core/config';
import type { Game } from '../core/game';
import type { BottomKind, TopKind } from '../core/obstacles';

/**
 * Sprite'y bohatera i przeszkód (zlecenia 01 i 03). Pliki są @3x — rysujemy je
 * w jednostkach logicznych, a transformacja renderera skaluje do ekranu,
 * więc na HiDPI używamy pełnej rozdzielczości. Brak pliku = grafika zastępcza.
 */
const SCALE = 3;

const cache = new Map<string, HTMLImageElement>();

function image(path: string): HTMLImageElement | undefined {
  let img = cache.get(path);
  if (!img) {
    img = new Image();
    img.decoding = 'async';
    img.src = path;
    cache.set(path, img);
  }
  return img.complete && img.naturalWidth > 0 ? img : undefined;
}

/** Ładuje z wyprzedzeniem, żeby pierwszy przejazd nie mrugał zaślepkami. */
export function preloadSprites(): void {
  for (const p of HERO_FILES) image(p);
  for (const kind of [...TOPS, ...BOTTOMS]) {
    image(obstaclePath(kind, 'end'));
    image(obstaclePath(kind, 'tile'));
  }
}

const HERO = 'assets/hero/';
const HERO_FILES = [
  `${HERO}kombi-body.png`, `${HERO}kombi-wheel.png`, `${HERO}kombi-crash.png`,
  `${HERO}kombi-flame-1.png`, `${HERO}kombi-flame-2.png`,
  `${HERO}luggage-1.png`, `${HERO}luggage-2.png`, `${HERO}luggage-3.png`, `${HERO}luggage-4.png`,
];
/** Punkt odniesienia w pliku @3x (środek hitboxu) — z hero.json. */
const ANCHOR = { x: 144, y: 90 };
const WHEELS = [{ x: -53, y: 43 }, { x: 63, y: 43 }];

/** Rysuje bohatera ze sprite'ów. Zwraca false, gdy pliki jeszcze się nie wczytały. */
export function drawHeroSprite(ctx: CanvasRenderingContext2D, game: Game, t: number): boolean {
  const crashed = game.phase === 'over';
  const body = image(`${HERO}${crashed ? 'kombi-crash' : 'kombi-body'}.png`);
  const wheel = image(`${HERO}kombi-wheel.png`);
  if (!body || (!crashed && !wheel)) return false;

  const tilt = Math.max(-0.35, Math.min(0.5, game.vy / 900));
  ctx.save();
  ctx.translate(PLAYER.x, game.y);
  ctx.rotate(tilt);
  const ax = -ANCHOR.x / SCALE;
  const ay = -ANCHOR.y / SCALE;

  if (!crashed && game.vy < -150) {
    const flame = image(`${HERO}kombi-flame-${Math.floor(t * 14) % 2 ? 2 : 1}.png`);
    if (flame) ctx.drawImage(flame, ax, ay, flame.naturalWidth / SCALE, flame.naturalHeight / SCALE);
  }
  if (!crashed && wheel) {
    const spin = (game.distancePx / 6) % (Math.PI * 2);
    for (const w of WHEELS) {
      ctx.save();
      ctx.translate(w.x / SCALE, w.y / SCALE);
      ctx.rotate(spin);
      ctx.drawImage(wheel, -6, -6, 12, 12);
      ctx.restore();
    }
  }
  ctx.drawImage(body, ax, ay, body.naturalWidth / SCALE, body.naturalHeight / SCALE);

  // Im większy chwilowy ciężar, tym wyższy stos bagażu (1 = zawsze trochę bagażu).
  const level = Math.min(4, 1 + Math.floor(game.weight * 4));
  const luggage = !crashed && image(`${HERO}luggage-${level}.png`);
  if (luggage) ctx.drawImage(luggage, ax, ay, luggage.naturalWidth / SCALE, luggage.naturalHeight / SCALE);
  ctx.restore();
  return true;
}

const TOPS: readonly TopKind[] = ['viaduct', 'sign', 'crane'];
const BOTTOMS: readonly BottomKind[] = ['roadworks', 'barrier', 'truck'];
const OBSTACLES = 'assets/obstacles/';
/** Płótno ma 240 px, pas kolizji 192 px — grafika wystaje 24 px (8 logicznych) z każdej strony. */
const SIDE = 24 / SCALE;
const END_H = 192 / SCALE;
const TILE_H = 96 / SCALE;
const WIDTH = 240 / SCALE;

function obstaclePath(kind: TopKind | BottomKind, part: 'end' | 'tile'): string {
  return `${OBSTACLES}${kind}-${part}.png`;
}

/** Górna przeszkoda: zakończenie dotyka górnej krawędzi szczeliny, kolumna sięga ponad ekran. */
export function drawTopSprite(ctx: CanvasRenderingContext2D, kind: TopKind, x: number, gapTop: number, offscreen: number): boolean {
  const end = image(obstaclePath(kind, 'end'));
  const tile = image(obstaclePath(kind, 'tile'));
  if (!end || !tile) return false;
  const left = x - SIDE;
  const endY = gapTop - END_H;
  for (let y = endY - TILE_H; y > -offscreen - TILE_H; y -= TILE_H) ctx.drawImage(tile, left, y, WIDTH, TILE_H);
  ctx.drawImage(end, left, endY, WIDTH, END_H);
  return true;
}

/** Dolna przeszkoda: zakończenie od strony szczeliny, kolumna do asfaltu. */
export function drawBottomSprite(ctx: CanvasRenderingContext2D, kind: BottomKind, x: number, gapBottom: number): boolean {
  const end = image(obstaclePath(kind, 'end'));
  const tile = image(obstaclePath(kind, 'tile'));
  if (!end || !tile) return false;
  const left = x - SIDE;
  // Część poniżej asfaltu zasłoni droga rysowana po przeszkodach.
  for (let y = gapBottom + END_H; y < WORLD.groundY; y += TILE_H) ctx.drawImage(tile, left, y, WIDTH, TILE_H);
  ctx.drawImage(end, left, gapBottom, WIDTH, END_H);
  return true;
}
