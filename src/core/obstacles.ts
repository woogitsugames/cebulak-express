import { BAGGAGE_GATE, DIFFICULTY, KM_PER_PX, OBSTACLE, PICKUPS, PLAYER, POWERUPS, WORLD, lerp } from './config';
import { Rng } from './rng';

/** Rodzaje przeszkód. Teksty i grafika są przypisane w content/render — tu tylko identyfikatory. */
export const TOP_KINDS = ['viaduct', 'sign', 'crane'] as const;
export const BOTTOM_KINDS = ['roadworks', 'barrier', 'truck'] as const;
export type TopKind = (typeof TOP_KINDS)[number];
export type BottomKind = (typeof BOTTOM_KINDS)[number];
export type ObstacleKind = TopKind | BottomKind | 'baggage-gate' | 'ground';

export interface Obstacle {
  id: number;
  /** Lewa krawędź w współrzędnych świata (px od startu). */
  x: number;
  /** Środek szczeliny (px od góry). */
  gapY: number;
  gapH: number;
  top: TopKind;
  bottom: BottomKind;
  /** Specjalna bramka na trasie, szczelina zależy od aktualnego bagażu. */
  gate: boolean;
  passed: boolean;
}

export const POWERUP_KINDS = ['boarding', 'tailwind', 'mamcall'] as const;
export type PowerupKind = (typeof POWERUP_KINDS)[number];
export type PickupKind = 'parcel' | 'jar' | PowerupKind;

export function isPowerupKind(kind: PickupKind): kind is PowerupKind {
  return (POWERUP_KINDS as readonly string[]).includes(kind);
}

/** Dynamika bramki: ten sam generator, aktualna waga dopiero przy kolizji. */
export function effectiveGapH(obstacle: Pick<Obstacle, 'gate' | 'gapH'>, weight: number): number {
  if (!obstacle.gate) return obstacle.gapH;
  const safeWeight = Math.min(1, Math.max(0, weight));
  return Math.max(BAGGAGE_GATE.minGapH, obstacle.gapH - safeWeight * BAGGAGE_GATE.maxShrinkPx);
}

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
export function reachableShift(
  spacing: number, speed: number,
  gapH = DIFFICULTY.gap[1], gravity = PLAYER.gravity,
): { up: number; down: number } {
  const freePx = Math.max(0, spacing - OBSTACLE.width - PLAYER.hitW);
  const t = freePx / speed;
  const slack = Math.max(0, (gapH - PLAYER.hitH) / 2);
  const fall = Math.max(0, PLAYER.flapVelocity * t + 0.5 * gravity * t * t);
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
  private nextGateX = BAGGAGE_GATE.everyKm / KM_PER_PX;
  private previousWasGate = false;
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
      const gate = this.nextX >= this.nextGateX;
      if (gate) this.nextGateX += BAGGAGE_GATE.everyKm / KM_PER_PX;
      // Przed bramką i zaraz za nią obliczamy przesunięcie dla najwęższej
      // szczeliny i pełnego ciężaru: nawet ciężkie kombi ma korytarz lotu.
      const corridorGap = gate || this.previousWasGate ? BAGGAGE_GATE.minGapH : DIFFICULTY.gap[1];
      const reach = reachableShift(
        spacing, lerp(DIFFICULTY.speed[0], DIFFICULTY.speed[1], difficulty),
        corridorGap, PLAYER.gravity * (1 + PICKUPS.gravityPerWeight),
      );
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
        gate,
        passed: false,
      };
      this.obstacles.push(obstacle);

      this.maybeAddPickup(obstacle, spacing);

      this.lastGapY = gapY;
      this.previousWasGate = gate;
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
    // Jeden wcześniej wylosowany kindRoll wystarcza do podziału na trzy
    // rzadkie bonusy i dwa standardowe bagaże; bez dodatkowych losowań.
    const rareShare = POWERUPS.shareAmongPickups;
    const kind: PickupKind = kindRoll < rareShare
      ? POWERUP_KINDS[Math.min(POWERUP_KINDS.length - 1, Math.floor(kindRoll / rareShare * POWERUP_KINDS.length))]
      : (kindRoll - rareShare) / (1 - rareShare) < PICKUPS.parcel.weightProb ? 'parcel' : 'jar';
    this.pickups.push({
      id: this.nextId++,
      x: after.x + OBSTACLE.width + (spacing - OBSTACLE.width) / 2,
      y: after.gapY + offset,
      kind,
      taken: false,
    });
  }

  /** Usuwa obiekty, które wyjechały za lewą krawędź. */
  prune(beforeX: number): void {
    while (this.obstacles.length && this.obstacles[0].x + OBSTACLE.width < beforeX) this.obstacles.shift();
    while (this.pickups.length && this.pickups[0].x + PICKUPS.radius < beforeX) this.pickups.shift();
  }
}
