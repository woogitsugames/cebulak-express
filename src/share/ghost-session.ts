/**
 * Integracja „Ducha znajomego” (zlecenie 59) z pętlą gry i ekranem końca.
 * Moduł ładowany dynamicznie z `main.ts` dopiero po pierwszej klatce —
 * dekodowanie linku odtwarza cały przejazd (do 72 000 ticków).
 * Każda funkcja jest „bezpieczna”: błąd oznacza brak ducha, nigdy wyjątek w pętli gry.
 */
import { GHOST_TEXTS, fill } from '../content/i18n';
import { localizedCityName } from '../content/lang/cities';
import { isValidNickId, renderNick } from '../content/nicks';
import { TICK } from '../core/config';
import type { Game, GameOptions } from '../core/game';
import { GhostRunner } from '../render/ghost';
import { parseGhostParams, withGhostChallenge, type GhostChallenge } from './ghost';

export type { GhostChallenge };
export type { GhostRunner };

/** Poprawne wyzwanie z `?g=` albo null (stare, uszkodzone lub zmanipulowane linki ignorujemy po cichu). */
export function loadGhostChallenge(search: string | URLSearchParams): GhostChallenge | null {
  try {
    return parseGhostParams(search);
  } catch {
    return null;
  }
}

/** Przejazd odbiorcy: ta sama trasa, ziarno i tryb co u nadawcy (bez lotu powrotnego). */
export function challengeRunOptions(challenge: GhostChallenge): GameOptions {
  return { seed: challenge.seed, mode: challenge.mode, route: challenge.route };
}

export function createGhostRunner(challenge: GhostChallenge): GhostRunner | null {
  try {
    return new GhostRunner(challenge);
  } catch {
    return null;
  }
}

/**
 * Wywoływać po każdym `player.tick()`. Zwraca runnera albo null, gdy duch się rozjechał
 * z grą (np. inne ziarno, nowy przejazd) — wtedy wołający po prostu przestaje go używać.
 */
export function syncGhost(runner: GhostRunner | null, player: Game): GhostRunner | null {
  if (!runner) return null;
  try {
    runner.sync(player);
    return runner;
  } catch {
    return null;
  }
}

/** Rysujemy ducha tylko wtedy, gdy jedzie równo z graczem (nie po rozbiciu ani po końcu zapisu). */
export function isGhostVisible(runner: GhostRunner, player: Game): boolean {
  const phase = runner.game.phase;
  return (phase === 'ready' || phase === 'playing') && runner.game.ticks === player.ticks;
}

/** Komunikat na ekran końca albo null, gdy przejazd trwa lub coś poszło nie tak. */
export function ghostOutcomeText(runner: GhostRunner, player: Game): string | null {
  try {
    const outcome = runner.outcome(player);
    if (!outcome) return null;
    if (!outcome.truncated) return outcome.message;
    return outcome.message + ' ' + fill(GHOST_TEXTS.truncated, { sec: Math.round(runner.challenge.ticks * TICK) });
  } catch {
    return null;
  }
}

/** Opis wyzwania w menu; nick tylko z zamkniętej listy. */
export function ghostMenuInfo(challenge: GhostChallenge): string {
  const vars = { from: localizedCityName(challenge.route.from), to: localizedCityName(challenge.route.to), km: challenge.km };
  if (challenge.nickId && isValidNickId(challenge.nickId)) {
    try {
      return fill(GHOST_TEXTS.menuInfoNick, { ...vars, nick: renderNick(challenge.nickId) });
    } catch {
      /* nieznany nick — opis bez nicku */
    }
  }
  return fill(GHOST_TEXTS.menuInfo, vars);
}

/**
 * Link „Wyzwij znajomego” na bazie zwykłego linku z karty. Nick tylko z zamkniętej listy.
 * Lot powrotny (dodatkowy ciężar) nie jest odtwarzalny z kodu `g=` — wtedy null.
 */
export function buildChallengeLink(baseUrl: string, game: Game, nickId?: string): string | null {
  if (game.baseWeight !== 0) return null;
  try {
    return withGhostChallenge(baseUrl, game, nickId && isValidNickId(nickId) ? nickId : undefined);
  } catch {
    return null;
  }
}

export function challengeShareText(game: Game): string {
  return fill(GHOST_TEXTS.shareText, { km: game.km, from: localizedCityName(game.route.from), to: localizedCityName(game.route.to) });
}
