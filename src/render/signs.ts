import { WORLD } from '../core/config';
import { localized } from '../content/i18n';
import type { CountryCode } from '../core/route';
import type { Waypoint } from '../content/waypoints';
import { FUNNY_PLACES, type FunnyPlace, type FunnyPlaceKind } from '../content/funny-places';
import { LANDMARK_FAR_WIDTH, PARALLAX, waypointScreenX } from './background';

/** Znaki sa dekoracja: nie uczestnicza w symulacji, kolizjach ani rankingu. */
export interface RoadSign {
  readonly id: string;
  readonly name: string;
  readonly country: CountryCode;
  readonly kind: FunnyPlaceKind;
  readonly km: number;
  readonly joke: string;
  /** Klucz tłumaczenia żartu (FUNNY_PLACES w słownikach); domyślnie id. */
  readonly jokeKey?: string;
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
const MIN_WIDTH = 100;
const MAX_WIDTH = 196;
const PANORAMA_NEAR_WIDTH = 180;

/** Nazwy zostaja podlaczone do km konkretnego wariantu trasy. */
export function signsForWaypoints(
  waypoints: readonly Waypoint[], places: readonly FunnyPlace[] = FUNNY_PLACES,
): RoadSign[] {
  const anchors = new Map<string, Waypoint>();
  for (const waypoint of waypoints) anchors.set(waypoint.id, waypoint);
  const signs: RoadSign[] = [];
  for (const place of places) {
    const anchor = anchors.get(place.near);
    if (!anchor || anchor.country !== place.country || !Number.isFinite(place.offsetKm)) continue;
    const km = anchor.km + place.offsetKm;
    if (!Number.isFinite(km) || km < 0) continue;
    if (!place.name.trim() || !place.joke.trim()) continue;
    signs.push({ id: place.id, name: place.name, country: place.country, kind: place.sign, km, joke: place.joke });
  }
  signs.push(...ausfahrtSigns(waypoints, signs));
  return signs.sort((a, b) => a.km - b.km || a.id.localeCompare(b.id));
}

/** Żart właściciela: „Ausfahrt” to największe miasto w Niemczech — zjazdy do niego są wszędzie. */
export const AUSFAHRT_JOKES: readonly string[] = [
  'Ausfahrt — największe miasto w Niemczech. Zjazdy do niego są co kawałek!',
  'Znowu Ausfahrt? To miasto ma chyba więcej zjazdów niż mieszkańców.',
  'Ausfahrt: jedyne miasto, do którego można zjechać z każdej autostrady.',
];
/** Odległość znaku za miastem i minimalny odstęp od innych tablic (km trasy). */
const AUSFAHRT_AFTER_KM = 35;
const AUSFAHRT_CLEAR_KM = 12;

/**
 * Niebieskie „Ausfahrt” co jakiś czas na niemieckim odcinku: za co drugim miastem DE,
 * tylko gdy do następnego punktu trasy jest daleko i nie stoi tam inna tablica.
 */
export function ausfahrtSigns(waypoints: readonly Waypoint[], existing: readonly RoadSign[] = []): RoadSign[] {
  const out: RoadSign[] = [];
  let cityIndex = 0;
  for (let i = 0; i < waypoints.length; i++) {
    const w = waypoints[i];
    if (w.country !== 'DE' || w.kind !== 'city') continue;
    if (cityIndex++ % 2 !== 0) continue;
    const km = w.km + AUSFAHRT_AFTER_KM;
    const next = waypoints[i + 1];
    if (!next || next.country !== 'DE' || next.km - km < AUSFAHRT_CLEAR_KM + 8) continue;
    if (existing.some((sign) => Math.abs(sign.km - km) < AUSFAHRT_CLEAR_KM)) continue;
    const n = out.length;
    out.push({
      id: 'de-ausfahrt-' + w.id,
      name: 'Ausfahrt',
      country: 'DE',
      kind: 'exit',
      km,
      joke: AUSFAHRT_JOKES[n % AUSFAHRT_JOKES.length],
      jokeKey: 'de-ausfahrt-' + (n % AUSFAHRT_JOKES.length),
    });
  }
  return out;
}

/** Ta sama paralaksa co near; progi i renderer uzywaja jednej funkcji. */
export function signScreenX(signKm: number, progressKm: number): number {
  return waypointScreenX(signKm, progressKm, PARALLAX.near);
}

/** Stala geometria tablicy; Canvas dopasowuje font zamiast rozciagac panel. */
export function signPanelWidth(name: string): number {
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, 32 + Array.from(name).length * 11));
}

/** Szpic strzałki znaku zjazdu (część szerokości panelu). */
const ARROW_TIP = 18;

/**
 * Bez nakladania sie ze stacja lub granica przy drodze: wolimy ukryc znak
 * niz pokazac dwie ilustracje bliskiego planu w tym samym kadrze.
 * Sprawdzamy wszystkie pobliskie punkty, takze w trakcie przenikania panoram.
 */
export function overlapsWaypointPanorama(
  sign: RoadSign, progressKm: number, waypoints: readonly Waypoint[],
): boolean {
  const signX = signScreenX(sign.km, progressKm);
  const signHalf = signPanelWidth(sign.name) / 2;
  for (const waypoint of waypoints) {
    const isNear = waypoint.kind === 'border' || waypoint.kind === 'rest';
    // Tablica stoi na bliskim planie przed panoramą miasta (jak prawdziwy znak z miastem w tle);
    // ustępuje tylko stacjom i przejściom granicznym, które też stoją przy drodze.
    if (!isNear) continue;
    const waypointX = waypointScreenX(
      waypoint.km, progressKm, isNear ? PARALLAX.near : PARALLAX.far,
    );
    const landmarkHalf = (isNear ? PANORAMA_NEAR_WIDTH : LANDMARK_FAR_WIDTH) / 2;
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

export interface SignColors {
  /** Tło znaku. */
  face: string;
  /** Napis. */
  text: string;
  /** Wewnętrzna ramka (jak na prawdziwych tablicach). */
  accent: string;
  /** Kształt: tablica prostokątna albo strzałka zjazdu. */
  shape: 'rect' | 'arrow';
}

const WHITE = '#ffffff';
const BLACK = '#141414';
const RED = '#d22630';
/** Tablice miejscowości wzorowane na prawdziwych znakach danego kraju (kolory i ramka). */
const TOWN_SIGNS: Readonly<Record<CountryCode, Omit<SignColors, 'shape'>>> = {
  PL: { face: '#00923f', text: WHITE, accent: WHITE }, // E-17a: zielona, biała ramka
  DE: { face: '#f7d117', text: BLACK, accent: BLACK }, // Ortstafel: żółta, czarna ramka
  NL: { face: '#1f5ea8', text: WHITE, accent: WHITE }, // plaatsnaambord: niebieska
  BE: { face: WHITE, text: BLACK, accent: BLACK },     // biała, czarna ramka
  LU: { face: WHITE, text: BLACK, accent: BLACK },
  FR: { face: WHITE, text: BLACK, accent: RED },       // EB10: biała, czerwona ramka
  CH: { face: '#1f5ea8', text: WHITE, accent: WHITE }, // Ortstafel: niebieska
  AT: { face: WHITE, text: BLACK, accent: BLACK },
  IT: { face: WHITE, text: BLACK, accent: BLACK },
  ES: { face: WHITE, text: BLACK, accent: BLACK },
  UK: { face: WHITE, text: BLACK, accent: BLACK },
  IE: { face: WHITE, text: BLACK, accent: BLACK },
  SE: { face: '#1f5ea8', text: WHITE, accent: WHITE },
  NO: { face: '#1f5ea8', text: WHITE, accent: WHITE },
  FI: { face: '#1f5ea8', text: WHITE, accent: WHITE },
  DK: { face: WHITE, text: BLACK, accent: BLACK },
  CZ: { face: WHITE, text: BLACK, accent: BLACK },
  EE: { face: WHITE, text: BLACK, accent: BLACK },
  LV: { face: WHITE, text: BLACK, accent: BLACK },
  LT: { face: WHITE, text: BLACK, accent: BLACK },
};

export function signColors(kind: FunnyPlaceKind, country: CountryCode): SignColors {
  if (kind === 'exit') {
    // Zjazd z autostrady: niebieska strzałka (w CH i IT autostrady mają zielone znaki).
    const green = country === 'CH' || country === 'IT';
    return { face: green ? '#00804a' : '#0a6fc2', text: WHITE, accent: WHITE, shape: 'arrow' };
  }
  return { ...(TOWN_SIGNS[country] ?? TOWN_SIGNS.BE), shape: 'rect' };
}

/** Własny rounded rect: zachowuje kompatybilność z WebView i mockami Canvas. */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Strzałka w prawo (znak zjazdu): prostokąt z ostrym szpicem. */
function arrowPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const tip = Math.min(ARROW_TIP, w / 4);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - tip, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w - tip, y + h);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Rysuje jeden znak: kształt i barwy jak prawdziwa tablica, kontur A+ dookoła. */
export function drawRoadSign(ctx: CanvasRenderingContext2D, sign: RoadSign, x: number): void {
  const width = signPanelWidth(sign.name);
  const left = -width / 2;
  const colors = signColors(sign.kind, sign.country);
  const path = colors.shape === 'arrow' ? arrowPath : roundedRect;
  ctx.save();
  ctx.translate(x, 0);

  // Dwa słupki dla szerokich znaków, jeden dla małych dzielnic.
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

  // Rzucany cień w prawo i w dół.
  ctx.fillStyle = '#16323d55';
  path(ctx, left + 4, SIGN_TOP_Y + 5, width, SIGN_HEIGHT, 5);
  ctx.fill();
  // Tablica: biały brzeg, kontur A+, potem pole w kolorze kraju i wewnętrzna ramka.
  ctx.fillStyle = WHITE;
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 3;
  path(ctx, left, SIGN_TOP_Y, width, SIGN_HEIGHT, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = colors.face;
  path(ctx, left + 2.5, SIGN_TOP_Y + 2.5, width - 5, SIGN_HEIGHT - 5, 4);
  ctx.fill();
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 2;
  path(ctx, left + 5.5, SIGN_TOP_Y + 5.5, width - 11, SIGN_HEIGHT - 11, 3);
  ctx.stroke();

  const arrowRoom = colors.shape === 'arrow' ? ARROW_TIP : 0;
  const availableWidth = width - 26 - arrowRoom;
  // Krój zbliżony do tablicowego (DIN / Transport): wąski, pogrubiony bezszeryfowy.
  const font = '"DIN Alternate", "Bahnschrift", "Roboto Condensed", "Arial Narrow", system-ui, sans-serif';
  let fontSize = 21;
  do {
    ctx.font = `700 ${fontSize}px ${font}`;
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
  ctx.fillText(label, arrowRoom ? -arrowRoom / 2 : 0, SIGN_TOP_Y + 23);
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
      // Polski żart słowny nie przekłada się na inne języki — tam krótki, ciepły dymek ze słownika.
      this.jokeText = localized('FUNNY_PLACES')?.[sign.jokeKey ?? sign.id] ?? sign.joke;
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
