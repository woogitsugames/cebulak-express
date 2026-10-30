import { DIFFICULTY, OBSTACLE, PICKUPS, PLAYER, WORLD, lerp } from './config';
import { Rng } from './rng';

/** Rodzaje przeszkód. Teksty i grafika są przypisane w content/render — tu tylko identyfikatory. */
export const TOP_KINDS = ['viaduct', 'sign', 'crane'] as const;
export const BOTTOM_KINDS = ['roadworks', 'barrier', 'truck'] as const;
export type TopKind = (typeof TOP_KINDS)[number];
export type BottomKind = (typeof BOTTOM_KINDS)[number];
export type ObstacleKind = TopKind | BottomKind | 'ground';

export interface Obstacle {
  id: number;
  /** Lewa krawędź w współrzędnych świata (px od startu). */
  x: number;
  /** Środek szczeliny (px od góry). */
  gapY: number;
  gapH: number;
  top: TopKind;
  bottom: BottomKind;
  passed: boolean;
}

export type PickupKind = 'parcel' | 'jar';

export interface Pickup {
  id: number;
  x: number;
  y: number;
  kind: PickupKind;
  taken: boolean;
}

/** Margines szczeliny od sufitu i asfaltu. */
const EDGE_MARGIN = 40;

/** Zapas bezpieczeństwa: wymagamy najwyżej tej części fizycznie możliwego przesunięcia. */
const REACH_SAFETY = 0.7;
/** Średnie tempo wznoszenia przy rytmicznym tapaniu (px/s) [pomiar z symulacji, z zapasem]. */
const SUSTAINED_RISE = 300;

/**
 * Ile środek szczeliny może się przesunąć w górę i w dół, żeby dało się zdążyć.
 * Najgorszy przypadek: gracz wychodzi z przeszkody tuż po tapnięciu (prędkość w górę),
 * więc w dół ma do dyspozycji tylko to, co zdąży opaść, plus swobodę w obrębie szczeliny.
 */
export function reachableShift(spacing: number, speed: number): { up: number; down: number } {
  const freePx = Math.max(0, spacing - OBSTACLE.width - PLAYER.hitW);
  const t = freePx / speed;
  const slack = (DIFFICULTY.gap[1] - PLAYER.hitH) / 2;
  const fall = Math.max(0, PLAYER.flapVelocity * t + 0.5 * PLAYER.gravity * t * t);
  return {
    up: REACH_SAFETY * (SUSTAINED_RISE * t + slack),
    down: REACH_SAFETY * (fall + slack),
  };
}

/**
 * Generator przeszkód z ziarnem. Gwarantuje przelotność:
 * środek szczeliny przesuwa się między przeszkodami o co najwyżej `maxGapShift`
 * i nie dalej, niż pozwala fizyka (`reachableShift`), a szczelina zawsze mieści się w obszarze gry.
 */
export class ObstacleField {
  readonly obstacles: Obstacle[] = [];
  readonly pickups: Pickup[] = [];
  private rng: Rng;
  private nextX: number = OBSTACLE.firstX;
  private lastGapY: number = WORLD.groundY / 2;
  private nextId = 1;

  constructor(seed: number) {
    this.rng = new Rng(seed);
  }

  /** Dogenerowuje przeszkody do `untilX` przy bieżącej trudności 0..1. */
  ensureAhead(untilX: number, difficulty: number): void {
    while (this.nextX < untilX) {
      const gapH = lerp(DIFFICULTY.gap[0], DIFFICULTY.gap[1], difficulty);
      const spacing = lerp(DIFFICULTY.spacing[0], DIFFICULTY.spacing[1], difficulty);
      const maxShift = lerp(DIFFICULTY.maxGapShift[0], DIFFICULTY.maxGapShift[1], difficulty);
      const reach = reachableShift(spacing, lerp(DIFFICULTY.speed[0], DIFFICULTY.speed[1], difficulty));
      const minY = WORLD.ceilingY + EDGE_MARGIN + gapH / 2;
      const maxY = WORLD.groundY - EDGE_MARGIN - gapH / 2;
      const lo = Math.max(minY, this.lastGapY - Math.min(maxShift, reach.up));
      const hi = Math.min(maxY, this.lastGapY + Math.min(maxShift, reach.down));
      const gapY = this.rng.range(lo, hi);

      const obstacle: Obstacle = {
        id: this.nextId++,
        x: this.nextX,
        gapY,
        gapH,
        top: this.rng.pick(TOP_KINDS),
        bottom: this.rng.pick(BOTTOM_KINDS),
        passed: false,
      };
      this.obstacles.push(obstacle);

      this.maybeAddPickup(obstacle, spacing);

      this.lastGapY = gapY;
      this.nextX += spacing;
    }
  }

  /** Znajdźka w połowie drogi do następnej przeszkody, na wysokości osiągalnej z bieżącej szczeliny. */
  private maybeAddPickup(after: Obstacle, spacing: number): void {
    // Losujemy zawsze tyle samo liczb, by układ przeszkód nie zależał od tego, czy znajdźka wypadła.
    const roll = this.rng.next();
    const kindRoll = this.rng.next();
    const offset = this.rng.range(-after.gapH / 3, after.gapH / 3);
    if (roll >= PICKUPS.chance) return;
    this.pickups.push({
      id: this.nextId++,
      x: after.x + OBSTACLE.width + (spacing - OBSTACLE.width) / 2,
      y: after.gapY + offset,
      kind: kindRoll < PICKUPS.parcel.weightProb ? 'parcel' : 'jar',
      taken: false,
    });
  }

  /** Usuwa obiekty, które wyjechały za lewą krawędź. */
  prune(beforeX: number): void {
    while (this.obstacles.length && this.obstacles[0].x + OBSTACLE.width < beforeX) this.obstacles.shift();
    while (this.pickups.length && this.pickups[0].x + PICKUPS.radius < beforeX) this.pickups.shift();
  }
}
