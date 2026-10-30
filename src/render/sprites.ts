import { PLAYER, WORLD } from '../core/config';
import type { Game } from '../core/game';
import type { BottomKind, TopKind } from '../core/obstacles';
import { unlockedSkins } from '../meta/unlocks';

/** Identyfikatory zapisywane w settings.skin; po publikacji pozostają stałe. */
export const HERO_SKINS = [
  'default', 'pan-cebulek', 'pani-cebulka', 'bus-kurierski',
  'mala-japonka', 'kompakt-szwagra', 'dieselek-dziadka', 'pradziak-z-oslo',
  'furgonetka-pl', 'kamper-wakacje', 'kombi-prezesa',
] as const;
export type HeroSkinId = (typeof HERO_SKINS)[number];
type SkinId = Exclude<HeroSkinId, 'default'>;
type LayerName = 'body' | 'wheel' | 'crash' | 'flame-1' | 'flame-2' |
  'luggage-1' | 'luggage-2' | 'luggage-3' | 'luggage-4';
type Point = Readonly<{ x: number; y: number }>;
type Layer = Readonly<{ path: string; anchor: Point }>;
export interface SkinLayout {
  readonly id: HeroSkinId;
  readonly anchor: Point;
  readonly wheels: readonly [Point, Point];
  readonly layers: Readonly<Partial<Record<LayerName, Layer>>>;
}

const SCALE = 3;
const NAMES: Readonly<Record<LayerName, string>> = {
  body: 'body.png', wheel: 'wheel.png', crash: 'crash.png',
  'flame-1': 'flame-1.png', 'flame-2': 'flame-2.png',
  'luggage-1': 'luggage-1.png', 'luggage-2': 'luggage-2.png',
  'luggage-3': 'luggage-3.png', 'luggage-4': 'luggage-4.png',
};
const DEFAULT_NAMES: Readonly<Record<LayerName, string>> = {
  body: 'kombi-body.png', wheel: 'kombi-wheel.png', crash: 'kombi-crash.png',
  'flame-1': 'kombi-flame-1.png', 'flame-2': 'kombi-flame-2.png',
  'luggage-1': 'luggage-1.png', 'luggage-2': 'luggage-2.png',
  'luggage-3': 'luggage-3.png', 'luggage-4': 'luggage-4.png',
};
const LAYERS = Object.keys(NAMES) as LayerName[];
const CENTER: Point = { x: 144, y: 90 };
const DEFAULT: SkinLayout = {
  id: 'default', anchor: CENTER,
  wheels: [{ x: 91, y: 133 }, { x: 207, y: 133 }],
  layers: Object.fromEntries(LAYERS.map((name) => [name, {
    path: 'assets/hero/' + DEFAULT_NAMES[name],
    anchor: name === 'wheel' ? { x: 18, y: 18 } : CENTER,
  }])) as Record<LayerName, Layer>,
};

function assetUrl(path: string): string {
  const base = import.meta.env?.BASE_URL ?? './';
  return base.replace(/\/?$/, '/') + path;
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function point(value: unknown): Point | null {
  if (!record(value) || typeof value.x !== 'number' || typeof value.y !== 'number' ||
      !Number.isFinite(value.x) || !Number.isFinite(value.y) ||
      Math.abs(value.x) > 1000 || Math.abs(value.y) > 1000) return null;
  return { x: value.x, y: value.y };
}
function anchor(value: unknown): Point | null {
  return record(value) ? point({ x: value.anchorX, y: value.anchorY }) : null;
}

/** Z manifestu przyjmujemy wyłącznie pliki o ustalonych nazwach (bez path traversal). */
export function parseSkinLayout(id: SkinId, raw: unknown): SkinLayout | null {
  if (!record(raw) || raw.id !== id || raw.scale !== SCALE ||
      !record(raw.hitbox) || !record(raw.wheelCenters) || !record(raw.layers)) return null;
  const bodyAnchor = anchor(raw.hitbox);
  const rear = point(raw.wheelCenters.rear);
  const front = point(raw.wheelCenters.front);
  if (!bodyAnchor || !rear || !front) return null;
  const layers: Partial<Record<LayerName, Layer>> = {};
  for (const name of LAYERS) {
    const item = raw.layers[name];
    if (!record(item) || item.file !== NAMES[name]) continue;
    const at = anchor(item);
    if (at) layers[name] = { path: 'assets/skins/' + id + '/' + NAMES[name], anchor: at };
  }
  return layers.body ? { id, anchor: bodyAnchor, wheels: [rear, front], layers } : null;
}

/** Zapisany identyfikator jest wybieralny dopiero po osiągnięciu progu km. */
export function normalizeHeroSkin(value: unknown, totalKm = 0): HeroSkinId {
  const id = HERO_SKINS.find((candidate) => candidate === value);
  return id && unlockedSkins(totalKm).includes(id) ? id : 'default';
}
let selected: HeroSkinId = 'default';
const loaded = new Map<string, SkinLayout | null>();
const pending = new Map<string, Promise<SkinLayout | null>>();
const images = new Map<string, HTMLImageElement>();

function image(path: string): HTMLImageElement | undefined {
  if (typeof Image === 'undefined') return undefined;
  let img = images.get(path);
  if (!img) {
    img = new Image();
    img.decoding = 'async';
    img.src = assetUrl(path);
    images.set(path, img);
  }
  return img.complete && img.naturalWidth > 0 ? img : undefined;
}
async function loadSkin(id: SkinId): Promise<SkinLayout | null> {
  if (loaded.has(id)) return loaded.get(id) ?? null;
  const inFlight = pending.get(id);
  if (inFlight) return inFlight;
  const promise = (async () => {
    try {
      if (typeof fetch !== 'function') return null;
      const response = await fetch(assetUrl('assets/skins/' + id + '/skin.json'));
      return response.ok ? parseSkinLayout(id, await response.json()) : null;
    } catch { return null; }
  })().then((layout) => {
    pending.delete(id);
    loaded.set(id, layout);
    if (layout) for (const item of Object.values(layout.layers)) if (item) image(item.path);
    return layout;
  });
  pending.set(id, promise);
  return promise;
}
/** Ustawienie działa od razu; niezaładowane/nieobecne pliki pokazują domyślne kombi. */
export function setHeroSkin(id: HeroSkinId, totalKm = 0): void {
  selected = normalizeHeroSkin(id, totalKm);
  if (selected === 'default') preloadSprites();
  else {
    if (loaded.get(selected) === null) loaded.delete(selected); // retry po zmianie z offline
    void loadSkin(selected);
  }
}
export function getHeroSkin(): HeroSkinId { return selected; }

function activeLayout(): SkinLayout {
  if (selected === 'default') return DEFAULT;
  const layout = loaded.get(selected);
  const body = layout?.layers.body;
  // Nie łączymy kół nowej skórki z karoserią domyślną podczas ładowania.
  return body && image(body.path) ? layout : DEFAULT;
}
function sprite(layout: SkinLayout, name: LayerName): { img: HTMLImageElement; anchor: Point } | null {
  const preferred = layout.layers[name];
  if (preferred) {
    const img = image(preferred.path);
    if (img) return { img, anchor: preferred.anchor };
  }
  const backup = DEFAULT.layers[name];
  if (!backup) return null;
  const img = image(backup.path);
  return img ? { img, anchor: backup.anchor } : null;
}
export function preloadSprites(): void {
  for (const item of Object.values(DEFAULT.layers)) if (item) image(item.path);
  for (const kind of [...TOPS, ...BOTTOMS]) {
    image(obstaclePath(kind, 'end'));
    image(obstaclePath(kind, 'tile'));
  }
  if (selected !== 'default') void loadSkin(selected);
}
function layerDraw(ctx: CanvasRenderingContext2D, asset: { img: HTMLImageElement; anchor: Point }): void {
  const { img, anchor: at } = asset;
  ctx.drawImage(img, -at.x / SCALE, -at.y / SCALE, img.naturalWidth / SCALE, img.naturalHeight / SCALE);
}
export function drawHeroSprite(ctx: CanvasRenderingContext2D, game: Game, t: number): boolean {
  const layout = activeLayout();
  const crashed = game.phase === 'over';
  const body = sprite(layout, crashed ? 'crash' : 'body');
  const wheel = crashed ? null : sprite(layout, 'wheel');
  if (!body || (!crashed && !wheel)) return false;
  const tilt = Math.max(-0.35, Math.min(0.5, game.vy / 900));
  ctx.save();
  ctx.translate(PLAYER.x, game.y);
  ctx.rotate(tilt);
  if (!crashed && game.vy < -150) {
    const flame = sprite(layout, Math.floor(t * 14) % 2 ? 'flame-2' : 'flame-1');
    if (flame) layerDraw(ctx, flame);
  }
  const drawWheels = (): void => {
    if (!wheel) return;
    const spin = (game.distancePx / 6) % (Math.PI * 2);
    for (const pos of layout.wheels) {
      ctx.save();
      ctx.translate((pos.x - layout.anchor.x) / SCALE, (pos.y - layout.anchor.y) / SCALE);
      ctx.rotate(spin);
      layerDraw(ctx, wheel);
      ctx.restore();
    }
  };
  if (layout.id === 'default') drawWheels();
  layerDraw(ctx, body);
  if (layout.id !== 'default') drawWheels();
  const level = Math.min(4, 1 + Math.floor(game.weight * 4)) as 1 | 2 | 3 | 4;
  const luggage = !crashed && sprite(layout, ('luggage-' + level) as LayerName);
  if (luggage) layerDraw(ctx, luggage);
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
