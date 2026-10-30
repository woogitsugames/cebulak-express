import { OBSTACLE, PICKUPS, PLAYER, TICK, WORLD } from '../core/config';
import type { Game } from '../core/game';
import { effectiveGapH, isPowerupKind, type BottomKind, type Obstacle, type Pickup, type TopKind } from '../core/obstacles';
import { POWERUP_NAME } from '../content/pl';
import { BackgroundRenderer, type BackgroundState } from './background';
import { PALETTES } from './palette';
import { drawBottomSprite, drawGateSprite, drawHeroSprite, drawPowerupAura, drawPowerupSprite, drawTopSprite } from './sprites';

/**
 * Render na Canvas 2D w logicznej rozdzielczości świata (360×640), skalowany do ekranu.
 * Grafika zastępcza rysowana kodem — docelowe sprite'y podmienią funkcje draw*.
 */
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;

  /** Tła krajów i punkty trasy (zlecenie 30); bez plików rysuje grafikę zastępczą. */
  readonly background = new BackgroundRenderer();

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
    const viewLeft = -this.offsetX / this.scale;
    const viewRight = (this.canvas.width - this.offsetX) / this.scale;
    const viewTop = -this.offsetY / this.scale;
    const viewHeight = this.canvas.height / this.scale;
    this.background.setHorizontalView(viewLeft, viewRight);
    // Wysokie ekrany: próbkuj brzeg oryginalnego PNG sky/road zamiast
    // rysować odcinające się pasy jednolitym kolorem palety.
    this.background.drawOutsideWorld(
      ctx, game.country, game.distancePx, timeSec,
      -this.offsetY / this.scale,
      (this.canvas.height - this.offsetY) / this.scale,
    );

    const worldX = game.distancePx;
    const bg: BackgroundState = {
      country: game.country,
      distancePx: worldX,
      progressKm: game.km,
      waypoints: game.route.waypoints,
      timeSec,
      includeRoad: false,
    };
    // Tło i droga idą na całą szerokość ekranu (rozłożony składak, tablet, poziom),
    // ale przeszkody i bonusy tylko w kolumnie 360 — szerszy ekran nie daje przewagi w rankingu.
    this.background.drawBackground(this.ctx, bg);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, viewTop, WORLD.width, viewHeight);
    ctx.clip();
    for (const p of game.field.pickups) if (!p.taken) this.drawPickup(p, p.x - worldX, timeSec);
    for (const o of game.field.obstacles) this.drawObstacle(o, o.x - worldX, game.weight);
    ctx.restore();
    this.background.drawRoad(this.ctx, bg);
    if (viewLeft < 0) this.drawSideVeil(viewLeft, viewRight, viewTop);
    if (!drawHeroSprite(this.ctx, game, timeSec)) this.drawPlayer(game, timeSec);
    drawPowerupAura(this.ctx, game, timeSec);
    this.drawPowerupHud(game);
  }

  /** Lekkie przyciemnienie boków nad drogą: widać, gdzie jest pole gry. */
  private drawSideVeil(left: number, right: number, top: number): void {
    const { ctx } = this;
    const bottom = WORLD.groundY;
    const fade = 30;
    ctx.save();
    ctx.fillStyle = 'rgba(16, 28, 48, 0.22)';
    ctx.fillRect(left, top, -left - fade, bottom - top);
    ctx.fillRect(WORLD.width + fade, top, right - WORLD.width - fade, bottom - top);
    const l = ctx.createLinearGradient(-fade, 0, 0, 0);
    l.addColorStop(0, 'rgba(16, 28, 48, 0.22)');
    l.addColorStop(1, 'rgba(16, 28, 48, 0)');
    ctx.fillStyle = l;
    ctx.fillRect(-fade, top, fade, bottom - top);
    const r = ctx.createLinearGradient(WORLD.width, 0, WORLD.width + fade, 0);
    r.addColorStop(0, 'rgba(16, 28, 48, 0)');
    r.addColorStop(1, 'rgba(16, 28, 48, 0.22)');
    ctx.fillStyle = r;
    ctx.fillRect(WORLD.width, top, fade, bottom - top);
    ctx.restore();
  }

  private drawObstacle(o: Obstacle, sx: number, weight: number): void {
    if (sx > WORLD.width || sx + OBSTACLE.width < 0) return;
    const gapH = effectiveGapH(o, weight);
    const topH = o.gapY - gapH / 2;
    const bottomY = o.gapY + gapH / 2;
    if (o.gate) {
      if (!drawGateSprite(this.ctx, sx, topH, bottomY, OFFSCREEN)) {
        drawGateFallback(this.ctx, sx, topH, bottomY);
      }
      return;
    }
    if (!drawTopSprite(this.ctx, o.top, sx, topH, OFFSCREEN)) drawTop(this.ctx, o.top, sx, topH);
    if (!drawBottomSprite(this.ctx, o.bottom, sx, bottomY)) drawBottom(this.ctx, o.bottom, sx, bottomY, WORLD.groundY - bottomY);
  }

  private drawPowerupHud(game: Game): void {
    if (!game.activePowerup) return;
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(28, 53, 64, 0.88)';
    roundRect(ctx, 135, 17, 215, 34, 10);
    ctx.fill();
    ctx.fillStyle = '#fff9e8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(POWERUP_NAME[game.activePowerup], 146, 34, 160);
    ctx.textAlign = 'right';
    ctx.fillText((game.powerupTicks * TICK).toFixed(1) + ' s', 340, 34);
    ctx.restore();
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
    } else if (p.kind === 'jar') {
      ctx.fillStyle = '#5c9a3a';
      roundRect(ctx, -r * 0.75, -r * 0.7, r * 1.5, r * 1.75, 4);
      ctx.fill();
      ctx.fillStyle = '#d23b3b';
      ctx.fillRect(-r * 0.85, -r * 1.05, r * 1.7, r * 0.45);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(-r * 0.5, -r * 0.4, 3, r);
    } else if (isPowerupKind(p.kind) && !drawPowerupSprite(ctx, p.kind)) {
      // Zaślepka działa również przy offline, zanim obrazek się załaduje.
      ctx.fillStyle = p.kind === 'boarding' ? '#f1c65f' : p.kind === 'tailwind' ? '#73d6e2' : '#c59be8';
      ctx.strokeStyle = '#364e61';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
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


function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}


/** Awaryjna ramka, gdy PNG nie został jeszcze pobrany (PWA/offline). */
function drawGateFallback(ctx: CanvasRenderingContext2D, x: number, topY: number, bottomY: number): void {
  ctx.fillStyle = '#377988';
  ctx.fillRect(x + 4, -OFFSCREEN, OBSTACLE.width - 8, topY + OFFSCREEN);
  ctx.fillRect(x + 4, bottomY, OBSTACLE.width - 8, WORLD.groundY - bottomY);
  ctx.fillStyle = '#f5c35a';
  ctx.fillRect(x - 4, topY - 9, OBSTACLE.width + 8, 9);
  ctx.fillRect(x - 4, bottomY, OBSTACLE.width + 8, 9);
  ctx.strokeStyle = '#244858';
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 4, -OFFSCREEN, OBSTACLE.width - 8, topY + OFFSCREEN);
  ctx.strokeRect(x + 4, bottomY, OBSTACLE.width - 8, WORLD.groundY - bottomY);
}
