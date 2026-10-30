import { PLAYER, WORLD } from '../core/config';
import { Game } from '../core/game';
import { renderNick } from '../content/nicks';
import { GHOST_TEXTS, fill } from '../content/i18n';
import type { GhostChallenge } from '../share/ghost';
import { drawHeroSprite } from './sprites';

export interface GhostOutcome {
  readonly playerKm: number;
  readonly ghostKm: number;
  /** Dodatnia wartość oznacza wygraną gracza. */
  readonly differenceKm: number;
  readonly message: string;
  readonly truncated: boolean;
}

/** Osobna, deterministyczna instancja gry dla zapisu nadawcy. */
export class GhostRunner {
  readonly game: Game;
  readonly challenge: GhostChallenge;
  readonly label: string;
  private nextFlap = 0;
  private lastPlayerTick = -1;
  private playerKmAtLimit: number | null = null;

  constructor(challenge: GhostChallenge) {
    this.challenge = challenge;
    this.game = new Game({ seed: challenge.seed, mode: challenge.mode, route: challenge.route });
    this.label = challenge.nickId ? renderNick(challenge.nickId) : GHOST_TEXTS.label;
  }

  /**
   * Wywołuj po KAŻDYM `player.tick()` z pętli stałokrokowej, przed renderowaniem.
   * Gdy zapis jest ucięty, wynik gracza zapamiętujemy dokładnie w ticku limitu.
   */
  sync(player: Game): void {
    if (player.seed !== this.challenge.seed || player.mode !== this.challenge.mode ||
        player.route.home !== this.challenge.home || player.route.from.id !== this.challenge.from ||
        player.route.to.id !== this.challenge.to) {
      throw new Error('Duch i gracz muszą mieć tę samą trasę, ziarno i tryb');
    }
    if (player.ticks < this.lastPlayerTick) throw new Error('Nowy przejazd wymaga nowego GhostRunner');
    this.lastPlayerTick = player.ticks;
    const limit = Math.min(player.ticks, this.challenge.ticks);
    while (this.game.ticks < limit && this.game.phase !== 'over' && this.game.phase !== 'arrived') {
      if (this.nextFlap < this.challenge.flapTicks.length &&
          this.challenge.flapTicks[this.nextFlap] === this.game.ticks) {
        this.game.flap();
        this.nextFlap++;
      }
      this.game.tick();
    }
    // Odbiorca przejeżdża tyle samo sekund co nadawca (w uciętym linku),
    // zatem nie może wygrać tylko dzięki dalszej, nieporównywalnej rozgrywce.
    if (this.challenge.truncated && this.playerKmAtLimit === null) {
      if (player.ticks === this.challenge.ticks) this.playerKmAtLimit = player.km;
      else if (player.ticks > this.challenge.ticks) {
        throw new Error('Synchronizuj ducha po każdym ticku gracza (pominięto tick limitu)');
      }
    }
  }

  /** Wynik jest dostępny po zakończeniu rozgrywki gracza. */
  outcome(player: Game): GhostOutcome | null {
    if (player.phase !== 'over' && player.phase !== 'arrived') return null;
    const playerKm = this.challenge.truncated ? (this.playerKmAtLimit ?? player.km) : player.km;
    const ghostKm = this.challenge.km;
    const differenceKm = playerKm - ghostKm;
    const message = differenceKm > 0
      ? fill(GHOST_TEXTS.win, { km: differenceKm })
      : differenceKm < 0 ? fill(GHOST_TEXTS.lose, { km: -differenceKm }) : GHOST_TEXTS.tie;
    return { playerKm, ghostKm, differenceKm, message, truncated: this.challenge.truncated };
  }

  /** Canvas musi być już w logicznym układzie 360×640 (przed bohaterem gracza). */
  draw(ctx: CanvasRenderingContext2D, timeSec: number): void {
    // Duch pozostaje widoczny po zakończeniu zapisu, ale nie zyskuje dodatkowych km.
    ctx.save();
    ctx.translate(25, 0);
    ctx.globalAlpha *= 0.45;
    if (!drawHeroSprite(ctx, this.game, timeSec)) drawGhostFallback(ctx, this.game);
    ctx.restore();

    const measure = Math.min(314, measureLabel(ctx, this.label));
    const labelWidth = Math.max(85, measure + 16);
    const left = Math.max(5, Math.min(WORLD.width - 5 - labelWidth, PLAYER.x + 25 - labelWidth / 2));
    const top = Math.max(8, this.game.y - 59);
    ctx.save();
    ctx.fillStyle = 'rgba(19, 58, 60, 0.79)';
    ctx.beginPath();
    ctx.roundRect(left, top, labelWidth, 22, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, left + 8, top + 11, labelWidth - 16);
    ctx.restore();
  }
}

function measureLabel(ctx: CanvasRenderingContext2D, label: string): number {
  ctx.save();
  ctx.font = 'bold 11px system-ui, sans-serif';
  const width = ctx.measureText(label).width;
  ctx.restore();
  return width;
}

/** Awaryjne kombi wektorowe, gdy sprite nie został jeszcze wczytany. */
function drawGhostFallback(ctx: CanvasRenderingContext2D, game: Game): void {
  ctx.save();
  ctx.translate(PLAYER.x, game.y);
  ctx.rotate(Math.max(-0.35, Math.min(0.5, game.vy / 900)));
  ctx.fillStyle = '#eae4cf';
  ctx.fillRect(-26, -13, 52, 19);
  ctx.fillStyle = '#9ecad6';
  ctx.fillRect(-18, -10, 15, 8);
  ctx.fillRect(3, -10, 15, 8);
  ctx.fillStyle = '#b96b44';
  ctx.fillRect(-14, -21, 28, 7);
  ctx.fillStyle = '#363637';
  for (const x of [-17, 17]) {
    ctx.beginPath();
    ctx.arc(x, 7, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
