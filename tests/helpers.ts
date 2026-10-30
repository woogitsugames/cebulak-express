import { OBSTACLE, PICKUPS, PLAYER } from '../src/core/config';
import { Game, type Mode } from '../src/core/game';
import { effectiveGapH } from '../src/core/obstacles';
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
    const h = effectiveGapH(first, game.weight);
    const lo = first.gapY - h / 2 + PLAYER.hitH / 2 + 12;
    const hi = first.gapY + h / 2 - PLAYER.hitH / 2 - 12;
    targetY = second.gapY > first.gapY ? hi : Math.min(hi, Math.max(lo, second.gapY));
  } else if (first) {
    const h = effectiveGapH(first, game.weight);
    targetY = first.gapY + h * 0.12;
  }
  // Przewidujemy przyspieszenie zależne od ciężaru i wolniejszy ruch podczas rozmowy.
  const t = 0.06 * (game.activePowerup === 'mamcall' ? 0.55 : 1);
  const gravity = PLAYER.gravity * (1 + game.weight * PICKUPS.gravityPerWeight);
  const predictedY = game.y + game.vy * t + 0.5 * gravity * t * t;
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
