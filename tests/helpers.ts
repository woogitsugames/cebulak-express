import { OBSTACLE, PLAYER } from '../src/core/config';
import { Game, type Mode } from '../src/core/game';
import { makeRoute } from '../src/core/route';

export const ROUTE = makeRoute('BE', 'bruksela', 'rzeszow');

export function newGame(seed = 1, mode: Mode = 'ranked'): Game {
  return new Game({ seed, mode, route: ROUTE });
}

/**
 * Prosty „autopilot” grający jak uważny gracz: w środku przeszkody ustawia się
 * w tej części szczeliny, która jest bliżej następnej; poza nią celuje lekko poniżej środka.
 */
export function botStep(game: Game): void {
  const worldX = game.distancePx;
  const left = PLAYER.x - PLAYER.hitW / 2;
  const right = PLAYER.x + PLAYER.hitW / 2;
  const ahead = game.field.obstacles.filter((o) => o.x - worldX + OBSTACLE.width > left);
  const [first, second] = ahead;
  let targetY = 300;
  if (first && first.x - worldX < right && second) {
    const lo = first.gapY - first.gapH / 2 + 95;
    const hi = first.gapY + first.gapH / 2 - 12;
    targetY = second.gapY > first.gapY ? hi : Math.min(hi, Math.max(lo, second.gapY));
  } else if (first) {
    targetY = first.gapY + first.gapH * 0.2;
  }
  // Patrzy chwilę naprzód, bo przy dużej prędkości opadania reakcja „na styk” jest za późna.
  const predictedY = game.y + game.vy * 0.06;
  if (game.vy >= 0 && predictedY > targetY) game.flap();
}

/** Gra botem do końca albo do limitu ticków. */
export function playWithBot(game: Game, maxTicks: number): void {
  game.flap();
  while (game.phase === 'playing' && game.ticks < maxTicks) {
    botStep(game);
    game.tick();
  }
}
