import { DIFFICULTY, KM_PER_PX, OBSTACLE, PICKUPS, PLAYER, POWERUPS, TICK } from '../../src/core/config';
import { Game } from '../../src/core/game';
import { effectiveGapH } from '../../src/core/obstacles';
import { makeRoute, type Route } from '../../src/core/route';
import { Rng } from '../../src/core/rng';

/** Parametry bota są niezależne od generatora przeszkód. */
export interface BotProfile {
  id: string;
  name: string;
  reactionMs: number;
  aimNoisePx: number;
  missedTapProb: number;
}

export const PROFILES: readonly BotProfile[] = [
  { id: 'nowy', name: 'Nowy', reactionMs: 250, aimNoisePx: 24, missedTapProb: 0.04 },
  { id: 'sredni', name: 'Średni', reactionMs: 180, aimNoisePx: 18, missedTapProb: 0.03 },
  { id: 'sprawny', name: 'Sprawny', reactionMs: 120, aimNoisePx: 9, missedTapProb: 0.015 },
  { id: 'ekspert', name: 'Ekspert', reactionMs: 80, aimNoisePx: 4, missedTapProb: 0.005 },
] as const;

export const ROUTES: ReadonlyArray<{ id: string; label: string; route: Route }> = [
  { id: 'de-krotka', label: 'DE: Berlin → Szczecin', route: makeRoute('DE', 'berlin', 'szczecin') },
  { id: 'be-srednia', label: 'BE: Bruksela → Wrocław', route: makeRoute('BE', 'bruksela', 'wroclaw') },
  { id: 'no-dluga', label: 'NO: Bergen → Białystok', route: makeRoute('NO', 'bergen', 'bialystok') },
];

export type PickupScenario = 'normal' | 'without-weight' | 'without-pickups';

export interface RunResult {
  seconds: number;
  km: number;
  rawDistanceKm: number;
  bonusKm: number;
  parcels: number;
  jars: number;
  meanWeight: number;
  maxWeight: number;
  arrived: boolean;
  timedOut: boolean;
}

const MAX_SECONDS = 240;
const MAX_TICKS = Math.round(MAX_SECONDS / TICK);

/** Ten sam styl autopilota co tests/helpers.ts, ale opóźniona realizacja decyzji. */
function chooseTarget(game: Game): { obstacleId: number; targetY: number } {
  const worldX = game.distancePx;
  const left = PLAYER.x - PLAYER.hitW / 2;
  const right = PLAYER.x + PLAYER.hitW / 2;
  // Zamiast filtrować całą tablicę co tick wybieramy pierwsze dwie przeszkody.
  let first: (typeof game.field.obstacles)[number] | undefined;
  let second: (typeof game.field.obstacles)[number] | undefined;
  for (const obstacle of game.field.obstacles) {
    if (obstacle.x - worldX + OBSTACLE.width <= left) continue;
    if (!first) first = obstacle;
    else { second = obstacle; break; }
  }
  if (!first) return { obstacleId: -1, targetY: 300 };
  if (first.x - worldX < right && second) {
    const h = effectiveGapH(first, game.weight);
    // Ten sam bezpieczny korytarz przez bramkę co w tests/helpers.ts.
    // Wcześniejsze celowanie w górny skraj sztucznie zabijało dobrego bota.
    const lo = first.gapY - h / 2 + (first.gate ? h * 0.72 : 95);
    const hi = first.gapY + h / 2 - 12;
    return {
      obstacleId: first.id,
      targetY: second.gapY > first.gapY ? hi : Math.min(hi, Math.max(lo, second.gapY)),
    };
  }
  const gapH = effectiveGapH(first, game.weight);
  return { obstacleId: first.id, targetY: first.gapY + gapH * 0.2 };
}

export function simulateRun(
  seed: number,
  route: Route,
  profile: BotProfile,
  scenario: PickupScenario = 'normal',
): RunResult {
  const game = new Game({ seed, mode: 'ranked', route });
  const rng = new Rng((seed ^ 0x9e3779b9 ^ (profile.reactionMs << 12)) >>> 0);
  const delayTicks = Math.max(1, Math.round((profile.reactionMs / 1000) / TICK));
  let scheduledTap: number | null = null;
  let lastObstacleId = -2;
  let targetNoise = 0;
  let cumulativeWeight = 0;
  let maximumWeight = 0;

  game.flap();
  while (game.phase === 'playing' && game.ticks < MAX_TICKS) {
    if (scenario === 'without-pickups') {
      for (const pickup of game.field.pickups) pickup.taken = true;
    } else if (scenario === 'without-weight') {
      game.weight = 0;
    }

    const { obstacleId, targetY } = chooseTarget(game);
    if (lastObstacleId !== obstacleId) {
      lastObstacleId = obstacleId;
      targetNoise = (rng.next() * 2 - 1) * profile.aimNoisePx;
    }

    if (scheduledTap !== null && game.ticks >= scheduledTap) {
      if (rng.next() >= profile.missedTapProb) game.flap();
      scheduledTap = null;
    } else if (scheduledTap === null) {
      // Predykcja z wyprzedzeniem, ale faktyczny tap trafia dopiero po czasie reakcji.
      const reactionSeconds = profile.reactionMs / 1000;
      const timeScale = game.activePowerup === 'mamcall' ? POWERUPS.mamcallTimeScale : 1;
      const predictionTime = (0.06 + reactionSeconds) * timeScale;
      const gravity = PLAYER.gravity * (1 + game.weight * PICKUPS.gravityPerWeight);
      const predictedY = game.y + game.vy * predictionTime + 0.5 * gravity * predictionTime * predictionTime;
      if (game.vy + gravity * reactionSeconds * timeScale >= 0 && predictedY > targetY + targetNoise) {
        scheduledTap = game.ticks + delayTicks;
      }
    }

    cumulativeWeight += game.weight;
    maximumWeight = Math.max(maximumWeight, game.weight);
    game.tick();
    game.drainEvents();
  }

  return {
    seconds: game.seconds,
    km: game.km,
    rawDistanceKm: Math.floor(game.distancePx * KM_PER_PX),
    bonusKm: game.bonusKm,
    parcels: game.parcels,
    jars: game.jars,
    meanWeight: game.ticks ? cumulativeWeight / game.ticks : 0,
    maxWeight: maximumWeight,
    arrived: game.phase === 'arrived',
    timedOut: game.phase === 'playing',
  };
}

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return NaN;
  const position = p * (sorted.length - 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

export interface GroupStats {
  n: number;
  medianSec: number;
  p10Sec: number;
  p90Sec: number;
  medianKm: number;
  p10Km: number;
  p90Km: number;
  meanKm: number;
  meanRawKm: number;
  arrivalPct: number;
  meanBonusKm: number;
  meanParcels: number;
  meanJars: number;
  meanWeight: number;
  maxWeight: number;
  timeouts: number;
}

function summarize(results: RunResult[]): GroupStats {
  const times = results.map((x) => x.seconds).sort((a, b) => a - b);
  const kilometers = results.map((x) => x.km).sort((a, b) => a - b);
  const avg = (key: 'km' | 'rawDistanceKm' | 'bonusKm' | 'parcels' | 'jars' | 'meanWeight') =>
    results.reduce((total, x) => total + x[key], 0) / results.length;
  return {
    n: results.length,
    medianSec: quantile(times, 0.5),
    p10Sec: quantile(times, 0.1),
    p90Sec: quantile(times, 0.9),
    medianKm: quantile(kilometers, 0.5),
    p10Km: quantile(kilometers, 0.1),
    p90Km: quantile(kilometers, 0.9),
    meanKm: avg('km'),
    meanRawKm: avg('rawDistanceKm'),
    arrivalPct: 100 * results.filter((x) => x.arrived).length / results.length,
    meanBonusKm: avg('bonusKm'),
    meanParcels: avg('parcels'),
    meanJars: avg('jars'),
    meanWeight: avg('meanWeight'),
    maxWeight: Math.max(...results.map((x) => x.maxWeight)),
    timeouts: results.filter((x) => x.timedOut).length,
  };
}

interface SummaryRow { routeId: string; profileId: string; stats: GroupStats }
interface ScenarioRow { scenario: PickupScenario; stats: GroupStats }

export interface BalanceReport {
  runsPerGroup: number;
  firstSeed: number;
  totalRuns: number;
  core: { kmPerPx: number; difficulty: typeof DIFFICULTY; pickupChance: number };
  routes: { id: string; label: string; totalKm: number }[];
  profiles: BotProfile[];
  results: SummaryRow[];
  scenarios: ScenarioRow[];
}

export function simulate(runsPerGroup = 250, firstSeed = 1): BalanceReport {
  if (!Number.isSafeInteger(runsPerGroup) || runsPerGroup < 1 || runsPerGroup > 5000) {
    throw new Error('Liczba przejazdów na grupę musi należeć do zakresu 1–5000.');
  }
  if (!Number.isSafeInteger(firstSeed) || firstSeed < 0 || firstSeed > 0xffffffff - runsPerGroup) {
    throw new Error('Nieprawidłowe ziarno początkowe.');
  }

  const results: SummaryRow[] = [];
  let totalRuns = 0;
  for (const route of ROUTES) {
    for (const profile of PROFILES) {
      const group: RunResult[] = [];
      for (let i = 0; i < runsPerGroup; i++) {
        group.push(simulateRun(firstSeed + i, route.route, profile));
      }
      totalRuns += group.length;
      results.push({ routeId: route.id, profileId: profile.id, stats: summarize(group) });
    }
  }

  // Porównanie sparowane: te same ziarna i ten sam bot, średnia trasa.
  const scenarios: ScenarioRow[] = [];
  const baseline = ROUTES[1].route;
  const profile = PROFILES[2];
  for (const scenario of ['normal', 'without-weight', 'without-pickups'] as const) {
    const group: RunResult[] = [];
    for (let i = 0; i < runsPerGroup; i++) {
      group.push(simulateRun(firstSeed + i, baseline, profile, scenario));
    }
    totalRuns += group.length;
    scenarios.push({ scenario, stats: summarize(group) });
  }

  return {
    runsPerGroup,
    firstSeed,
    totalRuns,
    core: { kmPerPx: KM_PER_PX, difficulty: DIFFICULTY, pickupChance: PICKUPS.chance },
    routes: ROUTES.map(({ id, label, route }) => ({ id, label, totalKm: route.totalKm })),
    profiles: [...PROFILES],
    results,
    scenarios,
  };
}
