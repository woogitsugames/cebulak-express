/// <reference types="vite/client" />
import { BAGGAGE_GATE, KM_PER_PX, WORLD } from '../src/core/config';
import { Game } from '../src/core/game';
import { makeRoute } from '../src/core/route';
import { Renderer } from '../src/render/renderer';
import { preloadSprites } from '../src/render/sprites';
import type { PowerupKind } from '../src/core/obstacles';

/**
 * Wyłącznie test Playwright. Renderer produkcyjny otrzymuje realny stan Game
 * z ustawioną pozycją przy pierwszej bramce. Bez zmian w kodzie rozgrywki.
 */
const canvas = document.querySelector<HTMLCanvasElement>('#preview');
if (!canvas) throw new Error('Brak canvasa do wizualnej kontroli bramki');
const game = new Game({
  seed: 52,
  mode: 'ranked',
  route: makeRoute('BE', 'bruksela', 'rzeszow'),
});
game.field.ensureAhead(BAGGAGE_GATE.everyKm / KM_PER_PX + WORLD.width * 3, 0.7);
const gate = game.field.obstacles.find((o) => o.gate);
if (!gate) throw new Error('Generator nie utworzył bramki bagażowej');

game.phase = 'playing';
game.distancePx = gate.x - 155;
game.y = gate.gapY;
game.vy = 0;
game.weight = 0.85;
game.ticks = 5200;
game.country = 'DE';
game.activePowerup = 'boarding';
game.powerupTicks = 246;

const renderer = new Renderer(canvas);
renderer.resize(360, 640);
preloadSprites();

declare global {
  interface Window {
    drawPowerupPreview?: (kind?: PowerupKind) => void;
  }
}

window.drawPowerupPreview = (kind: PowerupKind = 'boarding') => {
  game.activePowerup = kind;
  game.powerupTicks = kind === 'boarding' ? 246 : 168;
  renderer.draw(game, 45.5);
};
window.drawPowerupPreview();
