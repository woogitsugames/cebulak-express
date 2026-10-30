import { KM_PER_PX, WORLD } from '../core/config';
import type { Waypoint } from '../content/waypoints';
import type { CountryCode } from '../core/route';
import { PALETTES } from './palette';
import { ASSET_SIZES, AssetLoader, type BackgroundLayer, type DrawableAsset } from './assets';

export const PARALLAX = { sky: 0, clouds: 0.15, far: 0.25, near: 0.5, road: 1 } as const;
export const COUNTRY_FADE_SECONDS = 1.5;
const VIEW_MARGIN = ASSET_SIZES.landmark.width / 2;
const OFFSCREEN = 400;

export interface BackgroundWaypointEvent {
  type: 'waypoint';
  waypoint: Waypoint;
}

export interface BackgroundState {
  /** Bieżący kraj z Game.country. */
  country: CountryCode;
  /** Dystans fizyczny symulacji, w pikselach świata. */
  distancePx: number;
  /** Wynik Game.km (uwzględnia premie za znajdźki). */
  progressKm: number;
  waypoints: readonly Waypoint[];
  /** Monotoniczny czas np. requestAnimationFrame(now) / 1000. */
  timeSec: number;
  /** false: drogę narysuj osobno PO przeszkodach przez drawRoad. */
  includeRoad?: boolean;
  /** Opcjonalne; w src/main.ts istnieją już równoważne zdarzenia GameEvent. */
  onWaypoint?: (event: BackgroundWaypointEvent) => void;
}

/** Dodatnie przesunięcie, również dla worldX < 0. */
export function layerOffset(distancePx: number, parallax: number, tileWidth: number): number {
  if (tileWidth <= 0 || !Number.isFinite(distancePx)) return 0;
  return (((distancePx * parallax) % tileWidth) + tileWidth) % tileWidth;
}

/** Pozycje kafelków bez szczelin i kumulacji błędu po wielu kilometrach. */
export function tilePositions(distancePx: number, parallax: number, tileWidth: number, viewportWidth = WORLD.width): number[] {
  if (!(tileWidth > 0 && viewportWidth > 0)) return [];
  const start = -layerOffset(distancePx, parallax, tileWidth);
  const positions: number[] = [];
  for (let x = start; x < viewportWidth; x += tileWidth) positions.push(x);
  return positions;
}

/** W chwili przejechania w.km środek panoramy wypada w połowie ekranu. */
export function waypointScreenX(waypointKm: number, progressKm: number, parallax = PARALLAX.far): number {
  return WORLD.width / 2 + ((waypointKm - progressKm) / KM_PER_PX) * parallax;
}

export function visibleWaypoints(waypoints: readonly Waypoint[], progressKm: number, margin = VIEW_MARGIN): Waypoint[] {
  return waypoints.filter((point) => {
    const x = waypointScreenX(point.km, progressKm);
    return x >= -margin && x <= WORLD.width + margin;
  });
}

/** Zdarzenia dokładnie raz przy przekroczeniu progu; obsługa skoku wielu km w jednej klatce. */
export function crossedWaypoints(waypoints: readonly Waypoint[], previousKm: number, nextKm: number): Waypoint[] {
  if (nextKm <= previousKm) return [];
  return waypoints.filter((point) => point.km > previousKm && point.km <= nextKm);
}

export function fadeProgress(nowSec: number, startSec: number, durationSec = COUNTRY_FADE_SECONDS): number {
  if (durationSec <= 0) return 1;
  return Math.max(0, Math.min(1, (nowSec - startSec) / durationSec));
}

interface CountryBlend {
  from: CountryCode;
  to: CountryCode;
  progress: number;
}

/**
 * Moduł nie zależy od Game, nie zmienia stanu symulacji ani napisów UI.
 * Wywołanie drawBackground nie czeka na sieć: brakująca warstwa ma fallback Canvas.
 */
export class BackgroundRenderer {
  private fromCountry: CountryCode | null = null;
  private toCountry: CountryCode | null = null;
  private fadeStartSec = 0;
  private previousKm = 0;
  private previousWaypoints: readonly Waypoint[] | null = null;
  private primed = false;

  constructor(readonly assets: AssetLoader = new AssetLoader()) {}

  drawBackground(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
    if (!this.primed) {
      this.primed = true;
      this.assets.prime(state.country);
    }
    const blend = this.updateCountry(state.country, state.timeSec);
    this.emitWaypoints(state);
    this.drawPair(ctx, blend, 'sky', state.distancePx);
    this.drawPair(ctx, blend, 'clouds', state.distancePx);
    this.drawPair(ctx, blend, 'far', state.distancePx);
    this.drawWaypoints(ctx, state, 'far');
    this.drawPair(ctx, blend, 'near', state.distancePx);
    this.drawWaypoints(ctx, state, 'near');
    if (state.includeRoad !== false) this.drawPair(ctx, blend, 'road', state.distancePx);
  }

  /** Oddzielny render drogi pozwala zachować kolejność: tło → przeszkody → droga → bohater. */
  drawRoad(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
    this.drawPair(ctx, this.updateCountry(state.country, state.timeSec), 'road', state.distancePx);
  }

  private updateCountry(country: CountryCode, timeSec: number): CountryBlend {
    if (this.toCountry === null) {
      this.toCountry = country;
      this.fromCountry = country;
    } else if (this.toCountry !== country) {
      this.fromCountry = this.toCountry;
      this.toCountry = country;
      this.fadeStartSec = timeSec;
    }
    const progress = this.fromCountry === this.toCountry
      ? 1 : fadeProgress(timeSec, this.fadeStartSec);
    if (progress >= 1) this.fromCountry = this.toCountry;
    return { from: this.fromCountry!, to: this.toCountry, progress };
  }

  private emitWaypoints(state: BackgroundState): void {
    if (this.previousWaypoints === state.waypoints && state.progressKm >= this.previousKm && state.onWaypoint) {
      for (const waypoint of crossedWaypoints(state.waypoints, this.previousKm, state.progressKm)) {
        state.onWaypoint({ type: 'waypoint', waypoint });
      }
    }
    this.previousWaypoints = state.waypoints;
    this.previousKm = state.progressKm;
  }

  private drawPair(ctx: CanvasRenderingContext2D, blend: CountryBlend, layer: BackgroundLayer, distancePx: number): void {
    const { from, to, progress } = blend;
    if (from === to || progress >= 1) {
      this.drawLayer(ctx, to, layer, distancePx);
      return;
    }
    // Niebo/droga są nieprzezroczyste; reszta warstw ma kanał alfa.
    const opaque = layer === 'sky' || layer === 'road';
    ctx.save();
    ctx.globalAlpha *= opaque ? 1 : 1 - progress;
    this.drawLayer(ctx, from, layer, distancePx);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha *= progress;
    this.drawLayer(ctx, to, layer, distancePx);
    ctx.restore();
  }

  private drawLayer(ctx: CanvasRenderingContext2D, country: CountryCode, layer: BackgroundLayer, distancePx: number): void {
    const image = this.assets.getCountryLayer(country, layer);
    if (image) {
      this.drawAssetLayer(ctx, image, layer, distancePx);
    } else {
      this.drawFallbackLayer(ctx, country, layer, distancePx);
    }
  }

  private drawAssetLayer(ctx: CanvasRenderingContext2D, image: DrawableAsset, layer: BackgroundLayer, distancePx: number): void {
    const { width, height } = ASSET_SIZES[layer];
    if (layer === 'sky') {
      ctx.drawImage(image, 0, 0, width, height);
      return;
    }
    const y = layer === 'clouds' ? 20
      : layer === 'road' ? WORLD.groundY - 6 : WORLD.groundY - height;
    // Bez alokacji tablic podczas każdej klatki animacji.
    for (let x = -layerOffset(distancePx, PARALLAX[layer], width); x < WORLD.width; x += width) {
      ctx.drawImage(image, x, y, width, height);
    }
  }

  private drawFallbackLayer(ctx: CanvasRenderingContext2D, country: CountryCode, layer: BackgroundLayer, distancePx: number): void {
    const pal = PALETTES[country];
    if (layer === 'sky') {
      ctx.fillStyle = pal.skyTop;
      ctx.fillRect(0, -OFFSCREEN, WORLD.width, OFFSCREEN);
      const sky = ctx.createLinearGradient(0, 0, 0, WORLD.groundY);
      sky.addColorStop(0, pal.skyTop);
      sky.addColorStop(1, pal.skyBottom);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    } else if (layer === 'clouds') {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 4; i++) {
        const x = layerOffset(i * 140 - distancePx * PARALLAX.clouds, 1, WORLD.width + 120) - 60;
        const y = 70 + ((i * 53) % 120);
        drawCloud(ctx, x, y, 1 + (i % 2) * 0.4);
      }
    } else if (layer === 'far') {
      drawHills(ctx, distancePx * PARALLAX.far, 470, 40, 0.012, pal.hillsFar);
    } else if (layer === 'near') {
      drawHills(ctx, distancePx * PARALLAX.near, 520, 30, 0.02, pal.hillsNear);
    } else {
      drawFallbackRoad(ctx, distancePx);
    }
  }

  private drawWaypoints(ctx: CanvasRenderingContext2D, state: BackgroundState, layer: 'far' | 'near'): void {
    for (const point of state.waypoints) {
      const x = waypointScreenX(point.km, state.progressKm);
      if (x < -VIEW_MARGIN || x > WORLD.width + VIEW_MARGIN) continue;
      const image = this.assets.getLandmark(point);
      const nearFallback = !image && (point.kind === 'rest' || point.kind === 'border');
      if (nearFallback !== (layer === 'near')) continue;
      if (image) {
        ctx.drawImage(image, x - ASSET_SIZES.landmark.width / 2,
          WORLD.groundY - ASSET_SIZES.landmark.height, ASSET_SIZES.landmark.width, ASSET_SIZES.landmark.height);
      } else if (point.kind === 'rest') {
        drawFallbackStation(ctx, x);
      } else if (point.kind === 'border') {
        drawFallbackBorder(ctx, x);
      } else if (point.kind === 'crossing') {
        drawFallbackFerry(ctx, x);
      } else {
        drawFallbackSkyline(ctx, point.id, x);
      }
    }
  }
}

function drawHills(ctx: CanvasRenderingContext2D, shift: number, baseY: number, amp: number, freq: number, color: string): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, WORLD.groundY);
  for (let x = 0; x <= WORLD.width; x += 8) {
    const t = (x + shift) * freq;
    ctx.lineTo(x, baseY - amp * (0.6 * Math.sin(t) + 0.4 * Math.sin(t * 2.3 + 1)));
  }
  ctx.lineTo(WORLD.width, WORLD.groundY);
  ctx.closePath();
  ctx.fill();
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number): void {
  ctx.beginPath();
  ctx.arc(x, y, 14 * s, 0, Math.PI * 2);
  ctx.arc(x + 16 * s, y - 6 * s, 18 * s, 0, Math.PI * 2);
  ctx.arc(x + 34 * s, y, 13 * s, 0, Math.PI * 2);
  ctx.fill();
}

function drawFallbackRoad(ctx: CanvasRenderingContext2D, worldX: number): void {
  ctx.fillStyle = '#9aa3a8';
  ctx.fillRect(0, WORLD.groundY - 6, WORLD.width, 6);
  ctx.fillStyle = '#4a5157';
  ctx.fillRect(0, WORLD.groundY, WORLD.width, WORLD.height - WORLD.groundY + OFFSCREEN);
  ctx.fillStyle = '#f4f4f4';
  for (let x = -layerOffset(worldX, 1, 60); x < WORLD.width; x += 60) ctx.fillRect(x, WORLD.groundY + 28, 32, 4);
}

function drawFallbackSkyline(ctx: CanvasRenderingContext2D, id: string, cx: number): void {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  h >>>= 0;
  const next = () => ((h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0) % 1000) / 1000;
  ctx.fillStyle = 'rgba(70, 90, 110, 0.55)';
  for (let x = cx - 75; x < cx + 75;) {
    const width = 10 + next() * 16;
    const height = 20 + next() * 50;
    ctx.fillRect(x, 470 - height, width - 2, height + 30);
    if (next() > 0.75) {
      ctx.beginPath();
      ctx.moveTo(x, 470 - height);
      ctx.lineTo(x + (width - 2) / 2, 470 - height - 18 - next() * 30);
      ctx.lineTo(x + width - 2, 470 - height);
      ctx.fill();
    }
    x += width;
  }
  ctx.fillRect(cx - 4, 360, 8, 110);
  ctx.beginPath();
  ctx.arc(cx, 375, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawFallbackStation(ctx: CanvasRenderingContext2D, cx: number): void {
  const top = WORLD.groundY - 92;
  ctx.fillStyle = '#6b7378';
  ctx.fillRect(cx - 62, top + 14, 6, 78);
  ctx.fillRect(cx + 56, top + 14, 6, 78);
  ctx.fillStyle = '#fff';
  ctx.fillRect(cx - 74, top, 148, 18);
  ctx.fillStyle = '#d6202a';
  ctx.fillRect(cx - 74, top + 9, 148, 9);
  ctx.fillStyle = '#e9e4da';
  ctx.fillRect(cx - 40, WORLD.groundY - 40, 80, 40);
  ctx.fillStyle = '#d6202a';
  ctx.fillRect(cx - 40, WORLD.groundY - 44, 80, 6);
  ctx.fillStyle = '#9fd0ea';
  ctx.fillRect(cx - 32, WORLD.groundY - 32, 28, 20);
  for (const dx of [-58, 44]) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(cx + dx, WORLD.groundY - 26, 12, 26);
    ctx.fillStyle = '#d6202a';
    ctx.fillRect(cx + dx, WORLD.groundY - 26, 12, 6);
  }
}

function drawFallbackBorder(ctx: CanvasRenderingContext2D, cx: number): void {
  ctx.fillStyle = '#6b7378';
  ctx.fillRect(cx - 2, WORLD.groundY - 70, 4, 70);
  ctx.fillStyle = '#1d4fa3';
  ctx.fillRect(cx - 40, WORLD.groundY - 96, 80, 34);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 ? '#d6202a' : '#fff';
    ctx.fillRect(cx + 52, WORLD.groundY - 60 + i * 10, 8, 10);
  }
}

function drawFallbackFerry(ctx: CanvasRenderingContext2D, cx: number): void {
  ctx.fillStyle = 'rgba(40, 90, 140, 0.5)';
  ctx.fillRect(cx - 120, 464, 240, 40);
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.moveTo(cx - 70, 464);
  ctx.lineTo(cx + 80, 464);
  ctx.lineTo(cx + 64, 482);
  ctx.lineTo(cx - 60, 482);
  ctx.fill();
  ctx.fillRect(cx - 40, 440, 80, 24);
  ctx.fillStyle = '#2f5d8a';
  ctx.fillRect(cx - 40, 448, 80, 4);
}

// Gotowe API funkcji dla koordynatora; klasę można również instancjonować per scena.
const defaultRenderer = new BackgroundRenderer();

export function drawBackground(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
  defaultRenderer.drawBackground(ctx, state);
}

export function drawBackgroundRoad(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
  defaultRenderer.drawRoad(ctx, state);
}

export function preloadBackgroundAssets(country: CountryCode, heroPaths?: readonly string[]): void {
  defaultRenderer.assets.prime(country, heroPaths);
}
