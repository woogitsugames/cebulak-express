import { COUNTRY_NAME, UI, fill, localized } from '../content/i18n';
import { cityNameForShare, localizedCityName } from '../content/lang/cities';
import type { City, HomeCountry } from '../core/route';

/** Polskie napisy karty; EN/NL/DE/FR w słownikach (CARD). */
export const CARD_TEXT = {
  headlineArrived: 'DOLECIAŁEM DO DOMU!',
  headlineOver: 'KONIEC TRASY!',
  kilometres: 'KILOMETRÓW',
  route: 'Z {from} do {to}',
  arrivedTitle: 'CEL OSIĄGNIĘTY!',
  overTitle: 'CO MNIE ZATRZYMAŁO?',
  arrivedDetail: 'Mama już nakrywa do stołu.',
  fallbackCause: 'Kombi chciało lecieć, ale droga miała inne plany.',
  league: 'LIGA POLONII · {country}',
  place: '{place}. miejsce',
  placeSoon: 'Pozycja wkrótce',
  daily: 'WYZWANIE DNIA · {title}',
  footerArrived: 'W {sec} s! · Spróbuj mnie pobić',
  footerOver: 'Jeszcze raz? · Spróbuj mnie pobić',
} as const;

function texts(): Record<keyof typeof CARD_TEXT, string> {
  return localized('CARD') ?? CARD_TEXT;
}

/** Dane wyłącznie z ukończonego przejazdu i jego trasy. */
export interface CardData {
  km: number;
  totalKm: number;
  arrived: boolean;
  seconds: number;
  from: City;
  to: City;
  home: HomeCountry;
  /** Krótki, pogodny żart po kolizji (np. z FAIL_JOKES). */
  causeText: string;
  /** Pozycja kraju w Lidze Polonii, jeśli ranking został pobrany. */
  leaguePosition?: number;
  /** Nazwa wyzwania dnia, np. „Piątkowy powrót do Polski”. */
  daily?: string;
}

export type CardFormat = 'story' | 'square';
type CardContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export const CARD_DIMENSIONS: Record<CardFormat, { width: number; height: number }> = {
  story: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};

export function roundedKilometres(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

export function formatKilometres(value: number): string {
  return String(roundedKilometres(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Tekst komunikatu do udostępnienia; polska odmiana pochodzi z route.ts, inne języki — mianownik. */
export function cardShareText(data: CardData): string {
  const from = cityNameForShare(data.from, 'from');
  const to = cityNameForShare(data.to, 'to');
  const text = data.arrived
    ? fill(UI.shareArrivedText, { from, to, sec: roundedKilometres(data.seconds) })
    : fill(UI.shareText, { km: formatKilometres(data.km), from, to });
  return data.daily?.trim() ? text + ' ' + data.daily.trim() : text;
}

function roundedPath(ctx: CardContext, x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function panel(ctx: CardContext, x: number, y: number, w: number, h: number, color = 'rgba(13,61,56,0.88)'): void {
  ctx.save();
  ctx.shadowColor = 'rgba(11,36,35,0.35)';
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 12;
  roundedPath(ctx, x, y, w, h, 38);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255,255,255,0.38)';
  ctx.stroke();
  ctx.restore();
}

interface TextOptions {
  color?: string;
  weight?: number;
  minSize?: number;
  align?: CanvasTextAlign;
  outline?: boolean;
}

/** Tekst zostaje na kanwie także przy bardzo długich nazwach miast. */
function fittedText(
  ctx: CardContext, value: string, x: number, baseline: number,
  maxWidth: number, fontSize: number, options: TextOptions = {},
): void {
  ctx.save();
  const weight = options.weight ?? 800;
  let size = fontSize;
  const font = (s: number): string => weight + ' ' + s + 'px system-ui, "Arial Black", sans-serif';
  ctx.font = font(size);
  while (size > (options.minSize ?? 26) && ctx.measureText(value).width > maxWidth) {
    size -= 2;
    ctx.font = font(size);
  }
  let text = value;
  if (ctx.measureText(text).width > maxWidth) {
    while (text.length > 1 && ctx.measureText(text + '…').width > maxWidth) text = text.slice(0, -1);
    text += '…';
  }
  ctx.textAlign = options.align ?? 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = options.color ?? '#fffdf0';
  if (options.outline) {
    ctx.strokeStyle = '#145542';
    ctx.lineWidth = Math.max(8, Math.round(size * 0.045));
    ctx.lineJoin = 'round';
    ctx.strokeText(text, x, baseline);
  }
  ctx.fillText(text, x, baseline);
  ctx.restore();
}

function ellipse(ctx: CardContext, x: number, y: number, rx: number, ry: number, color: string): void {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/** Ilustracyjna zaślepka; pliki z zadania 10 zastąpią ją bez zmiany API. */
function placeholderBackground(ctx: CardContext, height: number): void {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#64bde2');
  sky.addColorStop(0.66, '#ffe4a1');
  sky.addColorStop(1, '#ffc66c');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1080, height);
  ellipse(ctx, 138, height * 0.18, 86, 86, '#ffed9a');
  ellipse(ctx, 138, height * 0.18, 62, 62, '#fff6b7');
  for (const [x, y, scale] of [
    [810, 0.15, 1], [250, 0.36, 0.75], [960, 0.49, 0.55],
  ]) {
    const yy = height * y;
    ellipse(ctx, x, yy, 102 * scale, 30 * scale, 'rgba(255,255,255,0.57)');
    ellipse(ctx, x - 52 * scale, yy - 20 * scale, 65 * scale, 33 * scale, 'rgba(255,255,255,0.57)');
    ellipse(ctx, x + 46 * scale, yy - 16 * scale, 82 * scale, 40 * scale, 'rgba(255,255,255,0.57)');
  }
  ctx.fillStyle = '#7aaa77';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.82);
  ctx.quadraticCurveTo(220, height * 0.72, 540, height * 0.81);
  ctx.quadraticCurveTo(800, height * 0.68, 1080, height * 0.78);
  ctx.lineTo(1080, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.fillStyle = '#427e63';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.91);
  ctx.quadraticCurveTo(400, height * 0.81, 730, height * 0.9);
  ctx.quadraticCurveTo(910, height * 0.83, 1080, height * 0.86);
  ctx.lineTo(1080, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.fillStyle = '#33464c';
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(190, height * 0.935);
  ctx.lineTo(890, height * 0.935);
  ctx.lineTo(1080, height);
  ctx.fill();
}

function placeholderLogo(ctx: CardContext, top: number, height: number): void {
  panel(ctx, 93, top, 894, height, '#135e49');
  fittedText(ctx, 'CEBULAK EXPRESS', 540, top + height * 0.61, 825,
    height > 150 ? 80 : 68, { color: '#ffda54', minSize: 38, weight: 900 });
  fittedText(ctx, 'KIERUNEK POLSKA', 540, top + height * 0.87, 750,
    height > 150 ? 33 : 26, { color: '#ffffff', weight: 850, minSize: 22 });
}

function drawLogo(ctx: CardContext, image: HTMLImageElement | null, story: boolean): void {
  const top = story ? 92 : 42;
  const height = story ? 183 : 148;
  if (!image) {
    placeholderLogo(ctx, top, height);
    return;
  }
  const width = Math.min(900, image.naturalWidth * height / image.naturalHeight);
  const drawHeight = Math.min(height, image.naturalHeight * 900 / image.naturalWidth);
  panel(ctx, 93, top, 894, height, 'rgba(16,75,56,0.75)');
  ctx.drawImage(image, (1080 - width) / 2, top + (height - drawHeight) / 2, width, drawHeight);
}

function drawProgress(ctx: CardContext, data: CardData, story: boolean): void {
  const y = story ? 1020 : 645;
  const h = story ? 192 : 124;
  panel(ctx, 72, y, 936, h);
  const nameY = y + (story ? 55 : 40);
  fittedText(ctx, localizedCityName(data.from), 130, nameY, 350, story ? 38 : 31,
    { align: 'left', weight: 750, minSize: 23 });
  fittedText(ctx, localizedCityName(data.to), 947, nameY, 350, story ? 38 : 31,
    { align: 'right', weight: 750, minSize: 23 });
  const total = roundedKilometres(data.totalKm);
  const ratio = total > 0 ? Math.min(1, roundedKilometres(data.km) / total) : 0;
  const barY = y + (story ? 86 : 57);
  roundedPath(ctx, 130, barY, 820, story ? 28 : 18, 14);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fill();
  if (ratio > 0) {
    roundedPath(ctx, 130, barY, 820 * ratio, story ? 28 : 18, 14);
    ctx.fillStyle = '#ffd055';
    ctx.fill();
  }
  const done = formatKilometres(data.km) + ' / ' + formatKilometres(data.totalKm) + ' km';
  fittedText(ctx, done, 540, y + (story ? 158 : 108), 840, story ? 41 : 30,
    { minSize: 25, weight: 850 });
}

function drawCause(ctx: CardContext, data: CardData, story: boolean): void {
  const y = story ? 1262 : 786;
  const h = story ? 226 : 114;
  panel(ctx, 72, y, 936, h, 'rgba(255,249,225,0.96)');
  const T = texts();
  const title = data.arrived ? T.arrivedTitle : T.overTitle;
  fittedText(ctx, title, 540, y + (story ? 65 : 40), 820, story ? 45 : 31,
    { color: '#145a48', weight: 900 });
  const detail = data.arrived
    ? T.arrivedDetail
    : data.causeText.trim() || T.fallbackCause;
  fittedText(ctx, detail, 540, y + (story ? 144 : 84), 840, story ? 42 : 30,
    { color: '#354849', minSize: 23, weight: 650 });
}

function drawLeague(ctx: CardContext, data: CardData, story: boolean): void {
  const y = story ? 1538 : 915;
  const h = story ? 135 : 72;
  panel(ctx, 72, y, 936, h, 'rgba(14,87,72,0.94)');
  const T = texts();
  const league = fill(T.league, { country: COUNTRY_NAME[data.home] });
  const position = data.leaguePosition;
  const validPosition = position !== undefined && Number.isFinite(position) && position > 0;
  if (story) {
    fittedText(ctx, league, 540, y + 50, 850, 37, { color: '#ffdf71', minSize: 27 });
    fittedText(ctx, validPosition ? fill(T.place, { place: Math.floor(position) }) : T.placeSoon,
      540, y + 107, 850, 58, { minSize: 34, weight: 900 });
  } else {
    fittedText(ctx, validPosition ? league + ' · ' + fill(T.place, { place: Math.floor(position) }) : league,
      540, y + 50, 855, 35, { minSize: 26, weight: 850 });
  }
}

function drawCardContent(ctx: CardContext, data: CardData, story: boolean, logo: HTMLImageElement | null): void {
  const T = texts();
  drawLogo(ctx, logo, story);
  const daily = data.daily?.trim();
  if (daily) {
    const y = story ? 308 : 211;
    panel(ctx, 160, y, 760, story ? 73 : 45, 'rgba(255,223,104,0.96)');
    fittedText(ctx, fill(T.daily, { title: daily }), 540, y + (story ? 51 : 33),
      710, story ? 34 : 24, { color: '#214c45', minSize: 20 });
  }
  fittedText(ctx, data.arrived ? T.headlineArrived : T.headlineOver,
    540, story ? 470 : 297, 920, story ? 65 : 54, { color: '#145240', minSize: 39, weight: 900 });
  fittedText(ctx, formatKilometres(data.km), 540, story ? 778 : 480,
    950, story ? 255 : 195, { color: '#fffdf2', minSize: 100, weight: 900, outline: true });
  fittedText(ctx, T.kilometres, 540, story ? 857 : 536, 850,
    story ? 64 : 48, { color: '#144c3f', minSize: 34, weight: 900 });
  fittedText(ctx, fill(T.route, { from: cityNameForShare(data.from, 'from'), to: cityNameForShare(data.to, 'to') }), 540,
    story ? 947 : 602, 930, story ? 62 : 46, { color: '#12483c', minSize: 29, weight: 850 });
  drawProgress(ctx, data, story);
  drawCause(ctx, data, story);
  drawLeague(ctx, data, story);
  const footer = data.arrived
    ? fill(T.footerArrived, { sec: roundedKilometres(data.seconds) })
    : T.footerOver;
  fittedText(ctx, footer, 540, story ? 1804 : 1040, 925, story ? 47 : 32,
    { color: '#ffffff', minSize: 27, weight: 900 });
}

async function optionalImage(path: string): Promise<HTMLImageElement | null> {
  if (typeof Image === 'undefined') return null;
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.naturalWidth > 0 ? image : null);
    image.onerror = () => resolve(null);
    image.src = path;
  });
}

async function pngBlob(canvas: OffscreenCanvas | HTMLCanvasElement): Promise<Blob> {
  if ('convertToBlob' in canvas) {
    try {
      return await canvas.convertToBlob({ type: 'image/png' });
    } catch {
      // Część przeglądarek udostępnia OffscreenCanvas, ale nie jego eksport.
    }
  }
  let htmlCanvas: HTMLCanvasElement;
  if (canvas instanceof HTMLCanvasElement) {
    htmlCanvas = canvas;
  } else {
    if (typeof document === 'undefined') throw new Error('Brak obsługi eksportu PNG');
    htmlCanvas = document.createElement('canvas');
    htmlCanvas.width = canvas.width;
    htmlCanvas.height = canvas.height;
    const context = htmlCanvas.getContext('2d');
    if (!context) throw new Error('Brak kontekstu Canvas 2D');
    context.drawImage(canvas, 0, 0);
  }
  return new Promise((resolve, reject) => {
    htmlCanvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Nie udało się utworzyć PNG')), 'image/png');
  });
}

/** Generuje pełnowymiarowy PNG na niewidocznej kanwie; działa także bez zasobów T10. */
export async function renderCard(data: CardData, format: CardFormat): Promise<Blob> {
  const { width, height } = CARD_DIMENSIONS[format];
  if (!width || !height) throw new Error('Nieznany format karty wyniku');
  if (typeof document !== 'undefined' && document.fonts) {
    try { await document.fonts.ready; } catch { /* Czcionka systemowa pozostaje dostępna. */ }
  }
  let canvas: OffscreenCanvas | HTMLCanvasElement;
  let ctx: CardContext | null;
  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext('2d');
  } else {
    if (typeof document === 'undefined') throw new Error('Canvas 2D jest niedostępny');
    const htmlCanvas = document.createElement('canvas');
    htmlCanvas.width = width;
    htmlCanvas.height = height;
    canvas = htmlCanvas;
    ctx = htmlCanvas.getContext('2d');
  }
  if (!ctx) throw new Error('Brak kontekstu Canvas 2D');
  const [background, logo] = await Promise.all([
    optionalImage('/assets/brand/card-bg-1080x' + height + '.png'),
    optionalImage('/assets/brand/logo-small.png'),
  ]);
  if (background) ctx.drawImage(background, 0, 0, width, height);
  else placeholderBackground(ctx, height);
  // Logo jest dobrowolnym zasobem T10 — po jego wgraniu podmieniamy zaślepkę.
  drawCardContent(ctx, data, format === 'story', logo);
  return pngBlob(canvas);
}
