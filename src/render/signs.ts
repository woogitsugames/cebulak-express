import { WORLD } from '../core/config';
import type { CountryCode } from '../core/route';
import type { Waypoint } from '../content/waypoints';
import { FUNNY_PLACES, type FunnyPlace, type FunnyPlaceKind } from '../content/funny-places';
import { PARALLAX, waypointScreenX } from './background';

/** Znaki sa dekoracja: nie uczestnicza w symulacji, kolizjach ani rankingu. */
export interface RoadSign {
  readonly id: string;
  readonly name: string;
  readonly country: CountryCode;
  readonly kind: FunnyPlaceKind;
  readonly km: number;
  readonly joke: string;
}

export interface SignsState {
  readonly progressKm: number;
  readonly timeSec: number;
  readonly waypoints: readonly Waypoint[];
}

export interface SignsFrame {
  /** Dokladnie jedna lub zadna widoczna tablica. */
  readonly sign: RoadSign | null;
  /** Tekst do osobnego dymka DOM; null oznacza ukrycie. */
  readonly joke: string | null;
}

export const SIGN_JOKE_SECONDS = 2.5;
export const SIGN_TOP_Y = 437;
export const SIGN_HEIGHT = 44;
export const SIGN_PANORAMA_GAP = 7;

const NAVY = '#16323d';
const BORDER = '#fff2d5';
const MIN_WIDTH = 100;
const MAX_WIDTH = 196;
const PANORAMA_FAR_WIDTH = 330;
const PANORAMA_NEAR_WIDTH = 180;

/** Nazwy zostaja podlaczone do km konkretnego wariantu trasy. */
export function signsForWaypoints(
  waypoints: readonly Waypoint[], places: readonly FunnyPlace[] = FUNNY_PLACES,
): RoadSign[] {
  const anchors = new Map<string, Waypoint>();
  for (const waypoint of waypoints) anchors.set(waypoint.id, waypoint);
  const signs: RoadSign[] = [];
  for (const place of places) {
    const anchor = anchors.get(place.waypointId);
    if (!anchor || anchor.country !== place.country || !Number.isFinite(place.offsetKm)) continue;
    const km = anchor.km + place.offsetKm;
    if (!Number.isFinite(km) || km < 0) continue;
    if (!place.name.trim() || !place.joke.trim()) continue;
    signs.push({ id: place.id, name: place.name, country: place.country, kind: place.kind, km, joke: place.joke });
  }
  return signs.sort((a, b) => a.km - b.km || a.id.localeCompare(b.id));
}

/** Ta sama paralaksa co near; progi i renderer uzywaja jednej funkcji. */
export function signScreenX(signKm: number, progressKm: number): number {
  return waypointScreenX(signKm, progressKm, PARALLAX.near);
}

/** Stala geometria tablicy; Canvas dopasowuje font zamiast rozciagac panel. */
export function signPanelWidth(name: string): number {
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, 32 + Array.from(name).length * 11));
}

/**
 * Bez nakladania sie z panorama miasta/granicy: wolimy ukryc znak
 * niz pokazac dwie ilustracje w tym samym kadrze.
 * Sprawdzamy wszystkie pobliskie punkty, takze w trakcie przenikania panoram.
 */
export function overlapsWaypointPanorama(
  sign: RoadSign, progressKm: number, waypoints: readonly Waypoint[],
): boolean {
  const signX = signScreenX(sign.km, progressKm);
  const signHalf = signPanelWidth(sign.name) / 2;
  for (const waypoint of waypoints) {
    const isNear = waypoint.kind === 'border' || waypoint.kind === 'rest';
    const waypointX = waypointScreenX(
      waypoint.km, progressKm, isNear ? PARALLAX.near : PARALLAX.far,
    );
    const landmarkHalf = (isNear ? PANORAMA_NEAR_WIDTH : PANORAMA_FAR_WIDTH) / 2;
    // Brak kolizji dla obiektow zupelnie poza kadrem.
    if (waypointX + landmarkHalf < 0 || waypointX - landmarkHalf > WORLD.width) continue;
    if (Math.abs(signX - waypointX) < signHalf + landmarkHalf + SIGN_PANORAMA_GAP) return true;
  }
  return false;
}

/** Wybiera co najwyzej jedna tablice, tylko w granicach kadru i bez panoram. */
export function selectNearestSign(
  signs: readonly RoadSign[], progressKm: number, waypoints: readonly Waypoint[],
): RoadSign | null {
  if (!Number.isFinite(progressKm)) return null;
  let selected: RoadSign | null = null;
  let best = Number.POSITIVE_INFINITY;
  for (const sign of signs) {
    const x = signScreenX(sign.km, progressKm);
    const half = signPanelWidth(sign.name) / 2;
    if (x + half < 0 || x - half > WORLD.width) continue;
    if (overlapsWaypointPanorama(sign, progressKm, waypoints)) continue;
    const delta = Math.abs(x - WORLD.width / 2);
    if (delta < best || (delta === best && selected !== null && sign.km < selected.km)) {
      selected = sign;
      best = delta;
    }
  }
  return selected;
}

interface SignColors { face: string; text: string; accent: string }

/** Pochodne palety kraju, bez kopiowania urzedowych znakow. */
export function signColors(kind: FunnyPlaceKind, country: CountryCode): SignColors {
  if (kind === 'exit') {
    return { face: country === 'UK' ? '#24649b' : '#2b659b', text: '#fff8e8', accent: '#acd0df' };
  }
  if (kind === 'town') {
    const yellow = country === 'DE' || country === 'NL' || country === 'SE' || country === 'PL';
    return { face: yellow ? '#f5d67b' : '#fff0d1', text: NAVY, accent: yellow ? '#eaa64d' : '#f9c881' };
  }
  const green = country === 'NL' || country === 'UK' || country === 'NO' || country === 'DK' || country === 'PL';
  return { face: green ? '#367856' : '#87613f', text: '#fff6e5', accent: green ? '#9ac69b' : '#dbb287' };
}

/** Wlasny rounded rect: zachowuje kompatybilnosc z WebView i mockami Canvas. */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.closePath();
}

/** Rysuje jeden znak z grubym konturem i prostym cieniem z lewej-gory. */
export function drawRoadSign(ctx: CanvasRenderingContext2D, sign: RoadSign, x: number): void {
  const width = signPanelWidth(sign.name);
  const left = -width / 2;
  const colors = signColors(sign.kind, sign.country);
  ctx.save();
  ctx.translate(x, 0);

  // Dwa slupki dla szerokich znakow, jeden dla malych dzielnic.
  const posts = width > 125 ? [-width * 0.27, width * 0.27] : [0];
  for (const px of posts) {
    ctx.fillStyle = '#667d84';
    ctx.fillRect(px - 4, SIGN_TOP_Y + 36, 8, WORLD.groundY - SIGN_TOP_Y - 36);
    ctx.fillStyle = '#a2b4b1';
    ctx.fillRect(px - 3, SIGN_TOP_Y + 36, 2, WORLD.groundY - SIGN_TOP_Y - 36);
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(px - 4, SIGN_TOP_Y + 36, 8, WORLD.groundY - SIGN_TOP_Y - 36);
  }

  // Rzucany cien w prawo i w dol; jasny kant sugeruje slonce z lewej gory.
  ctx.fillStyle = '#16323d55';
  roundedRect(ctx, left + 4, SIGN_TOP_Y + 5, width, SIGN_HEIGHT, 9);
  ctx.fill();
  ctx.fillStyle = colors.face;
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 3.5;
  roundedRect(ctx, left, SIGN_TOP_Y, width, SIGN_HEIGHT, 9);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(left + 10, SIGN_TOP_Y + 6);
  ctx.lineTo(left + width - 10, SIGN_TOP_Y + 6);
  ctx.stroke();

  // Maly, asymetryczny detal ilustracyjny zamiast autentycznego piktogramu.
  ctx.fillStyle = BORDER;
  ctx.beginPath();
  ctx.arc(left + 10, SIGN_TOP_Y + SIGN_HEIGHT - 10, 2.2, 0, Math.PI * 2);
  ctx.arc(left + width - 10, SIGN_TOP_Y + SIGN_HEIGHT - 10, 2.2, 0, Math.PI * 2);
  ctx.fill();

  const availableWidth = width - 26;
  const font = 'system-ui, -apple-system, "Segoe UI", sans-serif';
  let fontSize = 18;
  do {
    ctx.font = `900 ${fontSize}px ${font}`;
    if (ctx.measureText(sign.name).width <= availableWidth || fontSize <= 13) break;
    fontSize--;
  } while (true);
  let label = sign.name;
  while (ctx.measureText(label).width > availableWidth && Array.from(label).length > 1) {
    label = Array.from(label).slice(0, -2).join('') + '…';
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = colors.text;
  ctx.fillText(label, 0, SIGN_TOP_Y + 25);
  ctx.restore();
}

/** Warstwa rysowana PO near i PRZED przeszkodami. */
export class SignsRenderer {
  private lastWaypoints: readonly Waypoint[] | null = null;
  private signs: RoadSign[] = [];
  private previousKm: number | null = null;
  private previousTime: number | null = null;
  private jokeUntil = Number.NEGATIVE_INFINITY;
  private jokeText: string | null = null;

  constructor(private readonly places: readonly FunnyPlace[] = FUNNY_PLACES) {}

  reset(): void {
    this.lastWaypoints = null;
    this.signs = [];
    this.previousKm = null;
    this.previousTime = null;
    this.jokeText = null;
    this.jokeUntil = Number.NEGATIVE_INFINITY;
  }

  draw(ctx: CanvasRenderingContext2D, state: SignsState): SignsFrame {
    const restarted = this.previousKm !== null && state.progressKm < this.previousKm;
    const rewoundTime = this.previousTime !== null && state.timeSec < this.previousTime;
    if (this.lastWaypoints !== state.waypoints || restarted || rewoundTime) {
      this.signs = signsForWaypoints(state.waypoints, this.places);
      this.lastWaypoints = state.waypoints;
      this.previousKm = null;
      this.jokeText = null;
      this.jokeUntil = Number.NEGATIVE_INFINITY;
    }
    const sign = selectNearestSign(this.signs, state.progressKm, state.waypoints);
    if (sign) drawRoadSign(ctx, sign, signScreenX(sign.km, state.progressKm));
    if (sign && this.previousKm !== null && this.previousKm < sign.km && state.progressKm >= sign.km) {
      this.jokeText = sign.joke;
      this.jokeUntil = state.timeSec + SIGN_JOKE_SECONDS;
    }
    this.previousKm = state.progressKm;
    this.previousTime = state.timeSec;
    if (state.timeSec >= this.jokeUntil) this.jokeText = null;
    return { sign, joke: this.jokeText };
  }
}

/** Dymek w #hud: stale >=13 CSS px, bez przechwytywania tapow i HTML z danych. */
export interface SignJokeBubble {
  show(text: string | null): void;
  destroy(): void;
}

export function mountSignJoke(hud: HTMLElement): SignJokeBubble {
  const bubble = document.createElement('div');
  bubble.className = 'ce-sign-joke';
  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-live', 'polite');
  Object.assign(bubble.style, {
    position: 'absolute',
    top: 'clamp(78px, 14vh, 125px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
    maxWidth: 'min(88vw, 340px)',
    boxSizing: 'border-box',
    padding: '9px 13px',
    background: '#fff2d5',
    color: NAVY,
    border: `3px solid ${NAVY}`,
    borderRadius: '14px',
    boxShadow: '3px 5px 0 #16323d55',
    textAlign: 'center',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSize: 'clamp(13px, 3.8vw, 17px)',
    fontWeight: '800',
    lineHeight: '1.25',
    overflowWrap: 'anywhere',
    pointerEvents: 'none',
    zIndex: '3',
  });
  const label = document.createElement('span');
  const tail = document.createElement('span');
  tail.setAttribute('aria-hidden', 'true');
  Object.assign(tail.style, {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    width: '14px',
    height: '14px',
    background: '#fff2d5',
    borderRight: `3px solid ${NAVY}`,
    borderBottom: `3px solid ${NAVY}`,
    transform: 'translateX(-50%) rotate(45deg)',
  });
  bubble.append(label, tail);
  bubble.hidden = true;
  hud.append(bubble);
  return {
    show(text) {
      if (!text) {
        bubble.hidden = true;
        return;
      }
      if (label.textContent !== text) label.textContent = text;
      bubble.hidden = false;
    },
    destroy() { bubble.remove(); },
  };
}
