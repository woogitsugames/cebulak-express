import { KM_PER_PX, WORLD } from '../core/config';
import type { Waypoint } from '../content/waypoints';
import type { CountryCode, Route } from '../core/route';
import { PALETTES } from './palette';
import { ASSET_SIZES, AssetLoader, drawableHeight, drawableWidth, type BackgroundLayer, type DrawableAsset, type Season } from './assets';
import { AdaptiveQuality, storedPerformanceMode, type PerformanceMode } from './performance';

export const PARALLAX = { sky: 0, clouds: 0.15, far: 0.25, near: 0.5, road: 1 } as const;
export const COUNTRY_FADE_SECONDS = 1.5;
export const WAYPOINT_FADE_SECONDS = 0.4;

/**
 * Kotwice w pikselach logicznych, zgodne z previews krajów:
 * clouds y=110, far y=255, near y=418, road y=530.
 * W road pierwsze 50 px stanowi pobocze/barierę; asfalt i linia kolizji
 * zaczynają się dokładnie na WORLD.groundY = 580.
 */
export const LAYER_Y = {
  sky: 0,
  clouds: 110,
  far: 255,
  near: 418,
  road: WORLD.groundY - 50,
} as const;

const LANDMARK_FAR_WIDTH = 330;
const LANDMARK_FAR_HEIGHT = 183;
const LANDMARK_NEAR_WIDTH = 180;
const LANDMARK_NEAR_HEIGHT = 100;
const FAR_BASE_Y = LAYER_Y.far + ASSET_SIZES.far.height;

export interface BackgroundWaypointEvent {
  type: 'waypoint';
  waypoint: Waypoint;
}

export interface BackgroundState {
  country: CountryCode;
  distancePx: number;
  /** Wynik Game.km, uwzględniający premie. */
  progressKm: number;
  waypoints: readonly Waypoint[];
  timeSec: number;
  /** false: drogę narysuj osobno PO przeszkodach. */
  includeRoad?: boolean;
  /** Grudzień: PL zima z fallbackiem do wariantu letniego. */
  season?: Season;
  onWaypoint?: (event: BackgroundWaypointEvent) => void;
}

export function layerOffset(distancePx: number, parallax: number, tileWidth: number): number {
  if (tileWidth <= 0 || !Number.isFinite(distancePx)) return 0;
  return (((distancePx * parallax) % tileWidth) + tileWidth) % tileWidth;
}

/** Pomoc do testów/preview; renderer kafelkuje pętlą, nie alokuje tablicy. */
export function tilePositions(distancePx: number, parallax: number, tileWidth: number, viewportWidth = WORLD.width): number[] {
  if (!(tileWidth > 0 && viewportWidth > 0)) return [];
  const start = -layerOffset(distancePx, parallax, tileWidth);
  const positions: number[] = [];
  for (let x = start; x < viewportWidth; x += tileWidth) positions.push(x);
  return positions;
}

export function waypointScreenX(waypointKm: number, progressKm: number, parallax: number = PARALLAX.far): number {
  return WORLD.width / 2 + ((waypointKm - progressKm) / KM_PER_PX) * parallax;
}

export function visibleWaypoints(waypoints: readonly Waypoint[], progressKm: number, margin = LANDMARK_FAR_WIDTH / 2): Waypoint[] {
  return waypoints.filter((point) => {
    const x = waypointScreenX(point.km, progressKm);
    return x >= -margin && x <= WORLD.width + margin;
  });
}

/** Zawsze tylko najbliższy środkowi punkt; remis: wcześniejszy w trasie. */
export function selectNearestWaypoint(waypoints: readonly Waypoint[], progressKm: number): Waypoint | null {
  if (!Number.isFinite(progressKm)) return null;
  let closest: Waypoint | null = null;
  let best = Number.POSITIVE_INFINITY;
  for (const point of waypoints) {
    // Punkt near przewija się 2x szybciej niż far: porównuj odległość
    // od środka EKRANU, nie same kilometry.
    const parallax = point.kind === 'border' || point.kind === 'rest' ? PARALLAX.near : PARALLAX.far;
    const delta = Math.abs(point.km - progressKm) * parallax;
    if (delta < best) {
      best = delta;
      closest = point;
    }
  }
  return closest;
}

/** Czyste API do testów; w pętli renderowania zdarzenia są emitowane bez filter. */
export function crossedWaypoints(waypoints: readonly Waypoint[], previousKm: number, nextKm: number): Waypoint[] {
  if (nextKm <= previousKm) return [];
  return waypoints.filter((point) => point.km > previousKm && point.km <= nextKm);
}

export function fadeProgress(nowSec: number, startSec: number, durationSec = COUNTRY_FADE_SECONDS): number {
  if (durationSec <= 0) return 1;
  return Math.max(0, Math.min(1, (nowSec - startSec) / durationSec));
}

/** Wymienny near na granicy; po 18 km z obu stron, 6 km miękkiej krawędzi. */
export function borderNearOpacity(progressKm: number, borderKm: number, restKm: number): number {
  if (!Number.isFinite(borderKm) || !Number.isFinite(restKm)) return 0;
  const from = borderKm - 18;
  const to = Math.max(borderKm, restKm) + 18;
  return Math.max(0, Math.min(1, (progressKm - from) / 6, (to - progressKm) / 6));
}

/** Renderer niezależny od Game, z asynchronicznymi PNG i fallbackiem Canvas. */
export class BackgroundRenderer {
  private fromCountry: CountryCode | null = null;
  private toCountry: CountryCode | null = null;
  private fadeStartSec = 0;
  private countryFade = 1;
  private activeWaypoint: Waypoint | null = null;
  private outgoingWaypoint: Waypoint | null = null;
  private waypointFadeStartSec = 0;
  private waypointFade = 1;
  private previousKm = 0;
  private previousWaypoints: readonly Waypoint[] | null = null;
  private primedWaypoints: readonly Waypoint[] | null = null;
  private primedSeason: Season = 'summer';
  private borderKm = Number.NaN;
  private restKm = Number.NaN;
  private borderAlpha = 0;
  private gradientCtx: CanvasRenderingContext2D | null = null;
  private readonly gradients = new Map<CountryCode, CanvasGradient>();
  private readonly quality = new AdaptiveQuality(storedPerformanceMode());

  /** Do powiązania z przyszłym przełącznikiem w ustawieniach (zlecenie 49). */
  setPerformanceMode(mode: PerformanceMode): void { this.quality.setMode(mode); }
  getPerformanceMode(): PerformanceMode { return this.quality.preference; }
  isReducedQuality(): boolean { return this.quality.reduced; }

  constructor(readonly assets: AssetLoader = new AssetLoader()) {}

  drawBackground(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
    this.quality.sample(state.timeSec * 1_000, typeof document === 'undefined' || !document.hidden);
    const season = this.quality.reduced ? 'summer' : (state.season ?? 'summer');
    if (this.primedWaypoints !== state.waypoints || this.primedSeason !== season) {
      this.primedWaypoints = state.waypoints;
      this.primedSeason = season;
      this.assets.prime(state.country, state.waypoints, undefined, season);
    }
    this.updateRouteAndWaypoints(state);
    this.updateCountry(state.country, state.timeSec);
    this.assets.setVisibleCountries?.(state.country,
      this.fromCountry !== this.toCountry ? this.fromCountry : null, season);
    this.borderAlpha = season === 'winter' ? 0 : borderNearOpacity(state.progressKm, this.borderKm, this.restKm);
    this.drawPair(ctx, 'sky', state.distancePx, season);
    if (!this.quality.reduced) this.drawPair(ctx, 'clouds', state.distancePx, season);
    this.drawPair(ctx, 'far', state.distancePx, season);
    this.drawWaypoints(ctx, state, 'far');
    this.drawPair(ctx, 'near', state.distancePx, season);
    this.drawWaypoints(ctx, state, 'near');
    if (state.includeRoad !== false) this.drawPair(ctx, 'road', state.distancePx, season);
  }

  /** Rysowanie asfaltu po przeszkodach, przed pojazdem. */
  drawRoad(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
    this.updateCountry(state.country, state.timeSec);
    this.drawPair(ctx, 'road', state.distancePx, this.quality.reduced ? 'summer' : (state.season ?? 'summer'));
  }

  /**
   * Przedłużenie obrazu poza świat 9:16 (ctx z transformacją WORLD):
   * minY=-offsetY/scale, maxY=(canvas.height-offsetY)/scale.
   * Górę próbkujemy z 3 pierwszych wierszy sky, dół z 3 ostatnich road.
   */
  drawOutsideWorld(
    ctx: CanvasRenderingContext2D,
    country: CountryCode,
    distancePx: number,
    timeSec: number,
    minY: number,
    maxY: number,
    season: Season = 'summer',
  ): void {
    this.updateCountry(country, timeSec);
    if (this.quality.reduced) season = 'summer';
    this.assets.setVisibleCountries?.(country,
      this.fromCountry !== this.toCountry ? this.fromCountry : null, season);
    if (minY >= 0 && maxY <= WORLD.height) return;
    if (this.fromCountry) this.drawOutsideCountry(ctx, this.fromCountry, distancePx, minY, maxY, season);
    if (this.toCountry && this.toCountry !== this.fromCountry) {
      ctx.save();
      ctx.globalAlpha *= this.countryFade;
      this.drawOutsideCountry(ctx, this.toCountry, distancePx, minY, maxY, season);
      ctx.restore();
    }
  }

  private drawOutsideCountry(
    ctx: CanvasRenderingContext2D, country: CountryCode, distancePx: number,
    minY: number, maxY: number, season: Season,
  ): void {
    if (minY < 0) {
      ctx.fillStyle = PALETTES[country].skyTop;
      ctx.fillRect(0, minY, WORLD.width, -minY);
      const sky = this.assets.getCountryLayer(country, 'sky', season);
      if (sky) {
        const rows = Math.min(3, drawableHeight(sky));
        ctx.drawImage(sky, 0, 0, drawableWidth(sky), rows, 0, minY, WORLD.width, -minY);
      }
    }
    if (maxY > WORLD.height) {
      ctx.fillStyle = '#4a5157';
      ctx.fillRect(0, WORLD.height, WORLD.width, maxY - WORLD.height);
      const road = this.assets.getCountryLayer(country, 'road', season);
      if (road) {
        const rows = Math.min(3, drawableHeight(road));
        for (let x = -layerOffset(distancePx, PARALLAX.road, ASSET_SIZES.road.width);
          x < WORLD.width; x += ASSET_SIZES.road.width) {
          ctx.drawImage(road, 0, drawableHeight(road) - rows, drawableWidth(road), rows,
            x, WORLD.height, ASSET_SIZES.road.width, maxY - WORLD.height);
        }
      }
    }
  }

  private updateRouteAndWaypoints(state: BackgroundState): void {
    if (this.previousWaypoints !== state.waypoints || state.progressKm < this.previousKm) {
      this.previousWaypoints = state.waypoints;
      this.previousKm = state.progressKm;
      this.activeWaypoint = null;
      this.outgoingWaypoint = null;
      this.waypointFade = 1;
      this.fromCountry = null;
      this.toCountry = null;
      this.borderKm = Number.NaN;
      this.restKm = Number.NaN;
      let foundBorder = false;
      for (const point of state.waypoints) {
        if (!foundBorder && point.kind === 'border' && point.country === 'PL') {
          this.borderKm = point.km;
          foundBorder = true;
        } else if (foundBorder && point.kind === 'rest' && point.country === 'PL') {
          this.restKm = point.km;
          break;
        }
      }
    } else if (state.onWaypoint && state.progressKm > this.previousKm) {
      for (const point of state.waypoints) {
        if (point.km > this.previousKm && point.km <= state.progressKm) {
          state.onWaypoint({ type: 'waypoint', waypoint: point });
        }
      }
    }
    this.previousKm = state.progressKm;

    const next = selectNearestWaypoint(state.waypoints, state.progressKm);
    if (!this.activeWaypoint) {
      this.activeWaypoint = next;
      this.outgoingWaypoint = null;
      this.waypointFade = 1;
    } else if (next?.id !== this.activeWaypoint.id) {
      this.outgoingWaypoint = this.activeWaypoint;
      this.activeWaypoint = next;
      this.waypointFadeStartSec = state.timeSec;
    }
    if (this.outgoingWaypoint) {
      this.waypointFade = fadeProgress(state.timeSec, this.waypointFadeStartSec, WAYPOINT_FADE_SECONDS);
      if (this.waypointFade >= 1) this.outgoingWaypoint = null;
    } else this.waypointFade = 1;
  }

  private updateCountry(country: CountryCode, timeSec: number): void {
    if (!this.toCountry) {
      this.fromCountry = country;
      this.toCountry = country;
    } else if (this.toCountry !== country) {
      this.fromCountry = this.toCountry;
      this.toCountry = country;
      this.fadeStartSec = timeSec;
    }
    this.countryFade = this.fromCountry === this.toCountry ? 1 : fadeProgress(timeSec, this.fadeStartSec);
    if (this.countryFade >= 1) this.fromCountry = this.toCountry;
  }

  private drawPair(ctx: CanvasRenderingContext2D, layer: BackgroundLayer, distancePx: number, season: Season): void {
    const from = this.fromCountry;
    const to = this.toCountry;
    if (!to) return;
    if (!from || from === to) {
      this.drawLayer(ctx, to, layer, distancePx, season);
      return;
    }
    ctx.save();
    if (layer !== 'sky' && layer !== 'road') ctx.globalAlpha *= 1 - this.countryFade;
    this.drawLayer(ctx, from, layer, distancePx, season);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha *= this.countryFade;
    this.drawLayer(ctx, to, layer, distancePx, season);
    ctx.restore();
  }

  private drawLayer(
    ctx: CanvasRenderingContext2D, country: CountryCode, layer: BackgroundLayer,
    distancePx: number, season: Season,
  ): void {
    const image = this.assets.getCountryLayer(country, layer, season);
    if (layer === 'near' && country === 'PL' && season !== 'winter' && this.borderAlpha > 0) {
      const special = this.assets.getBorderNear();
      if (special) {
        ctx.save();
        ctx.globalAlpha *= 1 - this.borderAlpha;
        this.drawImageOrFallback(ctx, image, country, layer, distancePx);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha *= this.borderAlpha;
        this.drawAssetLayer(ctx, special, layer, distancePx);
        ctx.restore();
        return;
      }
    }
    this.drawImageOrFallback(ctx, image, country, layer, distancePx);
  }

  private drawImageOrFallback(
    ctx: CanvasRenderingContext2D, image: DrawableAsset | undefined,
    country: CountryCode, layer: BackgroundLayer, distancePx: number,
  ): void {
    if (image) this.drawAssetLayer(ctx, image, layer, distancePx);
    else this.drawFallbackLayer(ctx, country, layer, distancePx);
  }

  private drawAssetLayer(
    ctx: CanvasRenderingContext2D, image: DrawableAsset, layer: BackgroundLayer, distancePx: number,
  ): void {
    const { width, height } = ASSET_SIZES[layer];
    if (layer === 'sky') {
      ctx.drawImage(image, 0, LAYER_Y.sky, width, height);
      return;
    }
    // Bez downscale do Canvas 1x: @3x jest próbkowane dopiero przez drawImage.
    // Warstwa nie może wyjść poniżej świata (640) — tam pas poza światem maluje przedłużenie drogi.
    const y = LAYER_Y[layer];
    const visible = Math.min(height, WORLD.height - y);
    if (visible <= 0) return;
    const srcH = (visible / height) * drawableHeight(image);
    for (let x = -layerOffset(distancePx, PARALLAX[layer], width); x < WORLD.width; x += width) {
      ctx.drawImage(image, 0, 0, drawableWidth(image), srcH, x, y, width, visible);
    }
  }

  private drawFallbackLayer(
    ctx: CanvasRenderingContext2D, country: CountryCode, layer: BackgroundLayer, distancePx: number,
  ): void {
    const pal = PALETTES[country];
    if (layer === 'sky') {
      if (this.gradientCtx !== ctx) {
        this.gradientCtx = ctx;
        this.gradients.clear();
      }
      let sky = this.gradients.get(country);
      if (!sky) {
        sky = ctx.createLinearGradient(0, 0, 0, WORLD.groundY);
        sky.addColorStop(0, pal.skyTop);
        sky.addColorStop(1, pal.skyBottom);
        this.gradients.set(country, sky);
      }
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
    } else drawFallbackRoad(ctx, distancePx);
  }

  private drawWaypoints(ctx: CanvasRenderingContext2D, state: BackgroundState, layer: 'far' | 'near'): void {
    if (this.outgoingWaypoint) this.drawWaypoint(ctx, state, layer, this.outgoingWaypoint, 1 - this.waypointFade);
    if (this.activeWaypoint) this.drawWaypoint(ctx, state, layer, this.activeWaypoint, this.waypointFade);
  }

  private drawWaypoint(
    ctx: CanvasRenderingContext2D, state: BackgroundState, layer: 'far' | 'near',
    point: Waypoint, alpha: number,
  ): void {
    if (alpha <= 0) return;
    const onNear = point.kind === 'border' || point.kind === 'rest';
    if (onNear !== (layer === 'near')) return;
    const width = onNear ? LANDMARK_NEAR_WIDTH : LANDMARK_FAR_WIDTH;
    const height = onNear ? LANDMARK_NEAR_HEIGHT : LANDMARK_FAR_HEIGHT;
    const x = waypointScreenX(point.km, state.progressKm, onNear ? PARALLAX.near : PARALLAX.far);
    if (x < -width / 2 || x > WORLD.width + width / 2) return;

    // Stacja jest już w near granicy; unikamy podwójnej stacji w tym samym kadrze.
    if (onNear && point.kind === 'rest' && state.season !== 'winter' &&
      this.borderAlpha >= 0.75 && this.assets.getBorderNear()) return;

    ctx.save();
    ctx.globalAlpha *= alpha;
    const image = this.assets.getLandmark(point, state.season ?? 'summer');
    if (image) {
      const baseY = onNear ? WORLD.groundY : FAR_BASE_Y;
      ctx.drawImage(image, x - width / 2, baseY - height, width, height);
    } else if (point.kind === 'rest') drawFallbackStation(ctx, x);
    else if (point.kind === 'border') drawFallbackBorder(ctx, x);
    else if (point.kind === 'crossing') drawFallbackFerry(ctx, x);
    else drawFallbackSkyline(ctx, point.id, x);
    ctx.restore();
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
  ctx.fillRect(0, WORLD.groundY, WORLD.width, WORLD.height - WORLD.groundY);
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

// Wspólny singleton do integracji bez bezpośredniej instancji BackgroundRenderer.
const defaultRenderer = new BackgroundRenderer();

export function drawBackground(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
  defaultRenderer.drawBackground(ctx, state);
}

export function drawBackgroundRoad(ctx: CanvasRenderingContext2D, state: BackgroundState): void {
  defaultRenderer.drawRoad(ctx, state);
}

export function drawBackgroundBars(
  ctx: CanvasRenderingContext2D, country: CountryCode, distancePx: number,
  timeSec: number, minY: number, maxY: number, season: Season = 'summer',
): void {
  defaultRenderer.drawOutsideWorld(ctx, country, distancePx, timeSec, minY, maxY, season);
}

export function preloadBackgroundAssets(
  country: CountryCode, heroPaths?: readonly string[],
  route?: Pick<Route, 'waypoints'>, season: Season = 'summer',
): void {
  defaultRenderer.assets.prime(country, route, heroPaths, season);
}
