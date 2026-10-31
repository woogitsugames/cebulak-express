import type { Game } from './game';
import { reverseRoute, type Route } from './route';

/** Lot powrotny: auto cięższe od startu (słoiki od mamy); bez rankingu, dopóki serwer nie zna tych zasad. */
export const RETURN_WEIGHT = 0.25;

/**
 * Trasa lotu powrotnego proponowanego na ekranie końca albo null (przycisk ukryty).
 * Tylko po dojeździe do Polski (nie po samym powrocie) i poza wyzwaniem dnia.
 * Odwracamy trasę zakończonego przejazdu — przy wyzwaniu z linku różni się od trasy w menu.
 */
export function returnFlightRoute(game: Pick<Game, 'phase' | 'baseWeight' | 'route'>, daily: string | null): Route | null {
  if (game.phase !== 'arrived' || game.baseWeight !== 0 || daily) return null;
  return reverseRoute(game.route);
}
