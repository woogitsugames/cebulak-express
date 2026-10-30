import { KM_PER_PX, OBSTACLE, PICKUPS, PLAYER, WORLD } from '../core/config';
import type { Waypoint } from '../content/waypoints';
import type { Game } from '../core/game';
import type { BottomKind, Obstacle, Pickup, TopKind } from '../core/obstacles';
import { PALETTES } from './palette';

/**
 * Render na Canvas 2D w logicznej rozdzielczości świata (360×640), skalowany do ekranu.
 * Grafika zastępcza rysowana kodem — docelowe sprite'y podmienią funkcje draw*.
 */
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D niedostępny');
    this.ctx = ctx;
  }

  /** Dopasowanie do kontenera z zachowaniem proporcji 9:16 i ostrości na ekranach HiDPI. */
  resize(cssWidth: number, cssHeight: number): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    this.canvas.width = Math.round(cssWidth * dpr);
    this.canvas.height = Math.round(cssHeight * dpr);
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;
    this.scale = Math.min(this.canvas.width / WORLD.width, this.canvas.height / WORLD.height);
    this.offsetX = (this.canvas.width - WORLD.width * this.scale) / 2;
    this.offsetY = (this.canvas.height - WORLD.height * this.scale) / 2;
  }

  draw(game: Game, timeSec: number): void {
    const { ctx } = this;
    // Pasy poza światem 9:16 (wysokie telefony, desktop) wypełniamy niebem i asfaltem.
    const pal = PALETTES[game.country];
    const groundScreenY = this.offsetY + WORLD.groundY * this.scale;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = pal.skyTop;
    ctx.fillRect(0, 0, this.canvas.width, groundScreenY);
    ctx.fillStyle = '#4a5157';
    ctx.fillRect(0, groundScreenY, this.canvas.width, this.canvas.height - groundScreenY);
    ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
    ctx.save();
    ctx.beginPath();
    // Przycinamy tylko w poziomie — w pionie świat może wychodzić w pasy na wysokich ekranach.
    ctx.rect(0, -this.offsetY / this.scale, WORLD.width, this.canvas.height / this.scale);
    ctx.clip();

    const worldX = game.distancePx;
    this.drawBackground(game, worldX);
    for (const p of game.field.pickups) if (!p.taken) this.drawPickup(p, p.x - worldX, timeSec);
    for (const o of game.field.obstacles) this.drawObstacle(o, o.x - worldX);
    this.drawRoad(worldX);
    this.drawPlayer(game, timeSec);

    ctx.restore();
  }

  private drawBackground(game: Game, worldX: number): void {
    const { ctx } = this;
    const pal = PALETTES[game.country];
    const sky = ctx.createLinearGradient(0, 0, 0, WORLD.groundY);
    sky.addColorStop(0, pal.skyTop);
    sky.addColorStop(1, pal.skyBottom);
    ctx.fillStyle = pal.skyTop;
    ctx.fillRect(0, -OFFSCREEN, WORLD.width, OFFSCREEN);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    // Chmury (paralaksa 0.15)
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    for (let i = 0; i < 4; i++) {
      const x = mod(i * 140 - worldX * 0.15, WORLD.width + 120) - 60;
      const y = 70 + ((i * 53) % 120);
      cloud(ctx, x, y, 1 + (i % 2) * 0.4);
    }

    this.hills(worldX * 0.25, 470, 40, 0.012, pal.hillsFar);
    this.drawWaypoints(game, 'far');
    this.hills(worldX * 0.5, 520, 30, 0.02, pal.hillsNear);
    this.drawWaypoints(game, 'near');
  }

  /**
   * Punkty trasy w tle (grafika zastępcza do czasu ilustracji ze zleceń 05–09).
   * Punkt jest na środku ekranu dokładnie wtedy, gdy gracz go mija.
   */
  private drawWaypoints(game: Game, layer: 'far' | 'near'): void {
    const parallax = layer === 'far' ? 0.25 : 0.5;
    for (const w of game.route.waypoints) {
      const onNear = w.kind === 'rest' || w.kind === 'border';
      if (onNear !== (layer === 'near')) continue;
      const x = WORLD.width / 2 + ((w.km - game.km) / KM_PER_PX) * parallax;
      if (x < -200 || x > WORLD.width + 200) continue;
      if (w.kind === 'rest') drawStation(this.ctx, x, WORLD.groundY);
      else if (w.kind === 'border') drawBorderSign(this.ctx, x, WORLD.groundY);
      else if (w.kind === 'crossing') drawFerry(this.ctx, x, 470);
      else drawSkyline(this.ctx, w, x, 470);
    }
  }

  private hills(shift: number, baseY: number, amp: number, freq: number, color: string): void {
    const { ctx } = this;
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

  private drawRoad(worldX: number): void {
    const { ctx } = this;
    ctx.fillStyle = '#9aa3a8';
    ctx.fillRect(0, WORLD.groundY - 6, WORLD.width, 6);
    ctx.fillStyle = '#4a5157';
    ctx.fillRect(0, WORLD.groundY, WORLD.width, WORLD.height - WORLD.groundY + OFFSCREEN);
    ctx.fillStyle = '#f4f4f4';
    for (let x = -mod(worldX, 60); x < WORLD.width; x += 60) ctx.fillRect(x, WORLD.groundY + 28, 32, 4);
  }

  private drawObstacle(o: Obstacle, sx: number): void {
    if (sx > WORLD.width || sx + OBSTACLE.width < 0) return;
    const topH = o.gapY - o.gapH / 2;
    const bottomY = o.gapY + o.gapH / 2;
    drawTop(this.ctx, o.top, sx, topH);
    drawBottom(this.ctx, o.bottom, sx, bottomY, WORLD.groundY - bottomY);
  }

  private drawPickup(p: Pickup, sx: number, t: number): void {
    if (sx < -20 || sx > WORLD.width + 20) return;
    const { ctx } = this;
    const bob = Math.sin(t * 4 + p.id) * 3;
    ctx.save();
    ctx.translate(sx, p.y + bob);
    const r = PICKUPS.radius;
    if (p.kind === 'parcel') {
      ctx.fillStyle = '#c98b4b';
      roundRect(ctx, -r, -r * 0.85, r * 2, r * 1.7, 3);
      ctx.fill();
      ctx.fillStyle = '#e8c27a';
      ctx.fillRect(-2, -r * 0.85, 4, r * 1.7);
      ctx.strokeStyle = '#7a5229';
      ctx.lineWidth = 1.5;
      roundRect(ctx, -r, -r * 0.85, r * 2, r * 1.7, 3);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#5c9a3a';
      roundRect(ctx, -r * 0.75, -r * 0.7, r * 1.5, r * 1.75, 4);
      ctx.fill();
      ctx.fillStyle = '#d23b3b';
      ctx.fillRect(-r * 0.85, -r * 1.05, r * 1.7, r * 0.45);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(-r * 0.5, -r * 0.4, 3, r);
    }
    ctx.restore();
  }

  private drawPlayer(game: Game, t: number): void {
    const { ctx } = this;
    const blink = game.invulnerableTicks > 0 && Math.floor(t * 12) % 2 === 0;
    if (blink) return;
    const tilt = Math.max(-0.35, Math.min(0.5, game.vy / 900));
    const luggage = Math.min(4, 1 + Math.floor(game.weight * 4));
    ctx.save();
    ctx.translate(PLAYER.x, game.y);
    ctx.rotate(tilt);

    // Bagaże na dachu — im cięższy, tym wyższy stos
    const colors = ['#8a5a32', '#2f5d8a', '#b0412e', '#d1a23a'];
    for (let i = 0; i < luggage; i++) {
      ctx.fillStyle = colors[i % colors.length];
      roundRect(ctx, -20 + (i % 2) * 6, -20 - i * 7, 26 - (i % 2) * 6, 7, 2);
      ctx.fill();
    }
    // Karoseria kombi
    ctx.fillStyle = '#f1e6cf';
    roundRect(ctx, -28, -12, 56, 18, 5);
    ctx.fill();
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(-28, 0, 56, 4);
    ctx.fillStyle = '#9fd0ea';
    roundRect(ctx, -22, -10, 14, 8, 2);
    ctx.fill();
    roundRect(ctx, -5, -10, 14, 8, 2);
    ctx.fill();
    roundRect(ctx, 12, -10, 9, 8, 2);
    ctx.fill();
    // Kierowca (neutralna sylwetka)
    ctx.fillStyle = '#f2c9a0';
    ctx.beginPath();
    ctx.arc(16, -6, 3, 0, Math.PI * 2);
    ctx.fill();
    // Koła
    ctx.fillStyle = '#222';
    for (const wx of [-16, 16]) {
      ctx.beginPath();
      ctx.arc(wx, 7, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    // Reflektor i „napęd”
    ctx.fillStyle = '#ffe680';
    ctx.fillRect(26, -4, 3, 4);
    if (game.vy < -150) {
      ctx.fillStyle = 'rgba(255,170,60,0.85)';
      ctx.beginPath();
      ctx.moveTo(-28, -2);
      ctx.lineTo(-42 - Math.random() * 6, 2);
      ctx.lineTo(-28, 6);
      ctx.fill();
    }
    ctx.restore();
  }
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Zastępcza sylwetka miasta: bloki i wieże o kształcie zależnym od id punktu. */
function drawSkyline(ctx: CanvasRenderingContext2D, w: Waypoint, cx: number, baseY: number): void {
  let h = hash(w.id);
  const next = () => ((h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0) % 1000) / 1000;
  ctx.fillStyle = 'rgba(70, 90, 110, 0.55)';
  const width = 150;
  for (let x = cx - width / 2; x < cx + width / 2; ) {
    const bw = 10 + next() * 16;
    const bh = 20 + next() * 50;
    ctx.fillRect(x, baseY - bh, bw - 2, bh + 30);
    if (next() > 0.75) {
      ctx.beginPath();
      ctx.moveTo(x, baseY - bh);
      ctx.lineTo(x + (bw - 2) / 2, baseY - bh - 18 - next() * 30);
      ctx.lineTo(x + bw - 2, baseY - bh);
      ctx.fill();
    }
    x += bw;
  }
  // Wieża dominująca (katedra, wieża TV, ratusz)
  ctx.fillRect(cx - 4, baseY - 110, 8, 110);
  ctx.beginPath();
  ctx.arc(cx, baseY - 95, 7, 0, Math.PI * 2);
  ctx.fill();
}

/** Biało-czerwona stacja paliw z hot dogami (generyczna, bez nazwy i logo). */
function drawStation(ctx: CanvasRenderingContext2D, cx: number, groundY: number): void {
  const top = groundY - 92;
  ctx.fillStyle = '#6b7378';
  ctx.fillRect(cx - 62, top + 14, 6, 78);
  ctx.fillRect(cx + 56, top + 14, 6, 78);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 74, top, 148, 18);
  ctx.fillStyle = '#d6202a';
  ctx.fillRect(cx - 74, top + 9, 148, 9);
  ctx.fillStyle = '#e9e4da';
  ctx.fillRect(cx - 40, groundY - 40, 80, 40);
  ctx.fillStyle = '#d6202a';
  ctx.fillRect(cx - 40, groundY - 44, 80, 6);
  ctx.fillStyle = '#9fd0ea';
  ctx.fillRect(cx - 32, groundY - 32, 28, 20);
  // Hot dog na szyldzie
  ctx.fillStyle = '#e8b45a';
  roundRect(ctx, cx + 4, groundY - 30, 28, 12, 6);
  ctx.fill();
  ctx.fillStyle = '#b5452c';
  roundRect(ctx, cx + 7, groundY - 27, 22, 6, 3);
  ctx.fill();
  // Dystrybutory
  for (const dx of [-58, 44]) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + dx, groundY - 26, 12, 26);
    ctx.fillStyle = '#d6202a';
    ctx.fillRect(cx + dx, groundY - 26, 12, 6);
  }
}

/** Niebieski znak „Rzeczpospolita Polska” i biało-czerwony słupek. */
function drawBorderSign(ctx: CanvasRenderingContext2D, cx: number, groundY: number): void {
  ctx.fillStyle = '#6b7378';
  ctx.fillRect(cx - 2, groundY - 70, 4, 70);
  ctx.fillStyle = '#1d4fa3';
  roundRect(ctx, cx - 40, groundY - 96, 80, 34, 4);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('RZECZPOSPOLITA', cx, groundY - 81);
  ctx.fillText('POLSKA', cx, groundY - 69);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 ? '#d6202a' : '#ffffff';
    ctx.fillRect(cx + 52, groundY - 60 + i * 10, 8, 10);
  }
}

function drawFerry(ctx: CanvasRenderingContext2D, cx: number, baseY: number): void {
  ctx.fillStyle = 'rgba(40, 90, 140, 0.5)';
  ctx.fillRect(cx - 120, baseY - 6, 240, 40);
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.moveTo(cx - 70, baseY - 6);
  ctx.lineTo(cx + 80, baseY - 6);
  ctx.lineTo(cx + 64, baseY + 12);
  ctx.lineTo(cx - 60, baseY + 12);
  ctx.fill();
  ctx.fillRect(cx - 40, baseY - 30, 80, 24);
  ctx.fillStyle = '#2f5d8a';
  ctx.fillRect(cx - 40, baseY - 22, 80, 4);
}

/** Jak daleko ponad świat rysujemy górne przeszkody (wysokie ekrany). */
const OFFSCREEN = 400;

function drawTop(ctx: CanvasRenderingContext2D, kind: TopKind, x: number, h: number): void {
  const w = OBSTACLE.width;
  if (kind === 'viaduct') {
    ctx.fillStyle = '#9ea4a8';
    ctx.fillRect(x + 8, -OFFSCREEN, w - 16, h + OFFSCREEN);
    ctx.fillStyle = '#b9bec1';
    ctx.fillRect(x - 4, h - 22, w + 8, 22);
    stripes(ctx, x - 4, h - 8, w + 8, 8);
  } else if (kind === 'sign') {
    ctx.fillStyle = '#6b7378';
    ctx.fillRect(x + w / 2 - 4, -OFFSCREEN, 8, h + OFFSCREEN);
    ctx.fillStyle = '#1f6f43';
    roundRect(ctx, x - 6, h - 40, w + 12, 40, 4);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    roundRect(ctx, x - 3, h - 37, w + 6, 34, 3);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 8, h - 25, w - 16, 4);
    ctx.fillRect(x + 8, h - 16, w - 30, 4);
  } else {
    ctx.fillStyle = '#e3b21c';
    ctx.fillRect(x + w / 2 - 7, -OFFSCREEN, 14, h + OFFSCREEN);
    ctx.strokeStyle = '#8a6a0c';
    ctx.lineWidth = 1.5;
    for (let y = h - 12 - Math.ceil((h + OFFSCREEN) / 14) * 14; y < h - 12; y += 14) {
      ctx.beginPath();
      ctx.moveTo(x + w / 2 - 7, y);
      ctx.lineTo(x + w / 2 + 7, y + 14);
      ctx.stroke();
    }
    ctx.fillStyle = '#e3b21c';
    ctx.fillRect(x - 6, h - 12, w + 12, 12);
    ctx.fillStyle = '#555';
    ctx.fillRect(x + w - 10, h - 2, 2, 2);
  }
}

function drawBottom(ctx: CanvasRenderingContext2D, kind: BottomKind, x: number, y: number, h: number): void {
  const w = OBSTACLE.width;
  if (kind === 'roadworks') {
    ctx.fillStyle = '#d9d2c3';
    ctx.fillRect(x + 4, y + 18, w - 8, h - 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 2, y, w + 4, 18);
    stripes(ctx, x - 2, y, w + 4, 18);
    ctx.fillStyle = '#ffb000';
    ctx.beginPath();
    ctx.arc(x + 6, y - 4, 5, 0, Math.PI * 2);
    ctx.arc(x + w - 6, y - 4, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'barrier') {
    ctx.fillStyle = '#5d6469';
    ctx.fillRect(x + 6, y, 12, h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 2, y, w + 4, 12);
    stripes(ctx, x - 2, y, w + 4, 12);
    ctx.fillStyle = '#5d6469';
    ctx.fillRect(x + w - 16, y + 12, 8, h - 12);
  } else {
    ctx.fillStyle = '#e9ecef';
    roundRect(ctx, x - 6, y, w + 12, h, 6);
    ctx.fill();
    ctx.fillStyle = '#2f6db0';
    ctx.fillRect(x - 6, y + 8, w + 12, 10);
    ctx.fillStyle = '#c7ced4';
    ctx.fillRect(x + 4, y + 26, w - 8, h - 26);
  }
}

function stripes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = '#d6202a';
  for (let i = -h; i < w; i += 16) {
    ctx.beginPath();
    ctx.moveTo(x + i, y + h);
    ctx.lineTo(x + i + h, y);
    ctx.lineTo(x + i + h + 8, y);
    ctx.lineTo(x + i + 8, y + h);
    ctx.fill();
  }
  ctx.restore();
}

function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number): void {
  ctx.beginPath();
  ctx.arc(x, y, 14 * s, 0, Math.PI * 2);
  ctx.arc(x + 16 * s, y - 6 * s, 18 * s, 0, Math.PI * 2);
  ctx.arc(x + 34 * s, y, 13 * s, 0, Math.PI * 2);
  ctx.fill();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}
