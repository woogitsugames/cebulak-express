import { WORLD } from '../core/config';
import { Rng } from '../core/rng';

export interface SnowEffect {
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

const FAR_FLAKES = 60;
const NEAR_FLAKES = 36;
const FLAKES = FAR_FLAKES + NEAR_FLAKES;
const MARGIN = 12;
const SPAN_X = WORLD.width + 2 * MARGIN;
const SPAN_Y = WORLD.height + 2 * MARGIN;
const FULL_CIRCLE = Math.PI * 2;

/** Zawijanie również po dużym dt; bez alokacji i bez ponownego losowania. */
function wrap(value: number, span: number): number {
  if (value >= -MARGIN && value < span - MARGIN) return value;
  return (((value + MARGIN) % span) + span) % span - MARGIN;
}

/**
 * Śnieg o stałym ziarnie: 60 drobnych płatków w tle i 36 większych na pierwszym
 * planie. Dwie prędkości dają paralaksę. Gra i generator przeszkód pozostają bez zmian.
 * Bufory powstają tylko tutaj; update/draw nie tworzą obiektów ani tablic.
 */
export function createSnow(seed: number): SnowEffect {
  const random = new Rng(seed);
  const x = new Float32Array(FLAKES);
  const y = new Float32Array(FLAKES);
  const vx = new Float32Array(FLAKES);
  const vy = new Float32Array(FLAKES);
  const radius = new Float32Array(FLAKES);

  for (let i = 0; i < FLAKES; i++) {
    const far = i < FAR_FLAKES;
    x[i] = random.range(-MARGIN, WORLD.width + MARGIN);
    y[i] = random.range(-MARGIN, WORLD.height + MARGIN);
    vx[i] = far ? random.range(-3, 2) : random.range(-9, 5);
    vy[i] = far ? random.range(12, 24) : random.range(33, 55);
    radius[i] = far ? random.range(0.55, 1.15) : random.range(1.3, 2.3);
  }

  // Sprawdzamy matches na bieżąco: zmiana ustawienia systemu działa bez restartu.
  const motionPreference = typeof matchMedia === 'function'
    ? matchMedia('(prefers-reduced-motion: reduce)') : null;

  return {
    update(dt: number): void {
      if (motionPreference?.matches || !Number.isFinite(dt) || dt <= 0) return;
      for (let i = 0; i < FLAKES; i++) {
        x[i] = wrap(x[i] + vx[i] * dt, SPAN_X);
        y[i] = wrap(y[i] + vy[i] * dt, SPAN_Y);
      }
    },
    draw(ctx: CanvasRenderingContext2D): void {
      if (motionPreference?.matches) return;
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.64)';
      ctx.beginPath();
      for (let i = 0; i < FAR_FLAKES; i++) {
        ctx.moveTo(x[i] + radius[i], y[i]);
        ctx.arc(x[i], y[i], radius[i], 0, FULL_CIRCLE);
      }
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.94)';
      ctx.beginPath();
      for (let i = FAR_FLAKES; i < FLAKES; i++) {
        ctx.moveTo(x[i] + radius[i], y[i]);
        ctx.arc(x[i], y[i], radius[i], 0, FULL_CIRCLE);
      }
      ctx.fill();
      ctx.restore();
    },
  };
}
