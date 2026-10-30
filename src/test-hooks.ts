import type { Game } from './core/game';
import type { RankingApi } from './net/api';

/** Wyłącznie odczyt stanu bieżącego przejazdu do automatycznych zrzutów. */
export interface StoreShotSnapshot {
  phase: Game['phase'];
  seed: number;
  y: number;
  vy: number;
  distancePx: number;
  km: number;
  country: Game['country'];
  jars: number;
  pickups: { x: number; y: number; kind: 'jar' | 'parcel'; taken: boolean }[];
  obstacles: { x: number; gapY: number; gapH: number }[];
}

declare global {
  interface Window {
    __ceTest?: { snapshot(): StoreShotSnapshot | null; rankingMode(): RankingApi['kind'] };
  }
}

/**
 * Nie aktywuje się w zwykłej sesji. Nie udostępnia identyfikatorów,
 * nicków ani tokenów; nie zmienia pozycji, wyniku ani reguł gry.
 * Koordynator integruje moduł w src/main.ts po utworzeniu game i api.
 */
export function installStoreShotHooks(getGame: () => Game | null, api: RankingApi): void {
  if (new URLSearchParams(location.search).get('test') !== '1') return;
  window.__ceTest = {
    snapshot: () => {
      const game = getGame();
      if (!game) return null;
      return {
        phase: game.phase, seed: game.seed, y: game.y, vy: game.vy,
        distancePx: game.distancePx, km: game.km, country: game.country,
        jars: game.jars,
        pickups: game.field.pickups.map(({ x, y, kind, taken }) => ({ x, y, kind, taken })),
        obstacles: game.field.obstacles.map(({ x, gapY, gapH }) => ({ x, gapY, gapH })),
      };
    },
    rankingMode: () => api.kind,
  };
}
