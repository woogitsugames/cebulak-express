import { describe, expect, it } from 'vitest';
import { Game } from '../src/core/game';
import { RETURN_WEIGHT, returnFlightRoute } from '../src/core/return-trip';
import { makeRoute, reverseRoute } from '../src/core/route';

const outbound = makeRoute('NL', 'rotterdam', 'poznan');

function ended(phase: Game['phase'], baseWeight = 0, route = outbound) {
  return { phase, baseWeight, route };
}

describe('decyzja o locie powrotnym', () => {
  it('po dojeździe do Polski proponuje powrót tą samą trasą, odwróconą', () => {
    const back = returnFlightRoute(ended('arrived'), null);
    expect(back).not.toBeNull();
    expect(back!.from).toEqual(outbound.to);
    expect(back!.to).toEqual(outbound.from);
    expect(back).toEqual(reverseRoute(outbound));
  });

  it('powrót liczy się z trasy przejazdu (np. wyzwania z linku), a nie z trasy w menu', () => {
    const challengeRoute = makeRoute('UK', 'londyn', 'gdansk');
    const back = returnFlightRoute(ended('arrived', 0, challengeRoute), null);
    expect(back!.home).toBe('UK');
    expect(back!.from.id).toBe('gdansk');
    expect(back!.to.id).toBe('londyn');
  });

  it('bez propozycji po rozbiciu, po samym powrocie, w trakcie lotu i w wyzwaniu dnia', () => {
    expect(returnFlightRoute(ended('over'), null)).toBeNull();
    expect(returnFlightRoute(ended('arrived', RETURN_WEIGHT), null)).toBeNull();
    expect(returnFlightRoute(ended('arrived'), '2026-10-30')).toBeNull();
    expect(returnFlightRoute(ended('playing'), null)).toBeNull();
  });

  it('ciężar powrotu jest poprawną opcją rdzenia', () => {
    const game = new Game({ seed: 1, mode: 'cozy', route: reverseRoute(outbound), baseWeight: RETURN_WEIGHT });
    expect(game.baseWeight).toBe(RETURN_WEIGHT);
    expect(RETURN_WEIGHT).toBeGreaterThan(0);
  });
});
