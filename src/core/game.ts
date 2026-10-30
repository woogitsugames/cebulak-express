import { COZY, DIFFICULTY, KM_PER_PX, OBSTACLE, PICKUPS, PLAYER, POWERUPS, TICK, WORLD, difficultyAt, lerp } from './config';
import { rectCircleOverlap, rectsOverlap, type Rect } from './collision';
import { ObstacleField, effectiveGapH, isPowerupKind, type ObstacleKind, type PickupKind, type PowerupKind } from './obstacles';
import type { Waypoint } from '../content/waypoints';
import { countryAt, type CountryCode, type Route } from './route';

export type Mode = 'ranked' | 'cozy';
export type Phase = 'ready' | 'playing' | 'over' | 'arrived';

export type GameEvent =
  | { type: 'flap' }
  | { type: 'pickup'; kind: PickupKind; bonusKm: number }
  | { type: 'powerup-start'; kind: PowerupKind; durationSeconds: number }
  | { type: 'powerup-end'; kind: PowerupKind }
  | { type: 'hit'; kind: ObstacleKind; livesLeft: number }
  | { type: 'border'; country: CountryCode }
  | { type: 'waypoint'; waypoint: Waypoint }
  | { type: 'over'; cause: ObstacleKind }
  | { type: 'arrived' };

export interface GameOptions {
  seed: number;
  mode: Mode;
  route: Route;
}

/**
 * Cała symulacja jednego przejazdu. Bez DOM, bez czasu rzeczywistego:
 * wywołujący podaje kroki (`tick`) i wejścia (`flap`). Dzięki temu ten sam kod
 * służy grze, testom i serwerowi do weryfikacji przejazdów (replay).
 */
export class Game {
  readonly seed: number;
  readonly mode: Mode;
  readonly route: Route;
  readonly field: ObstacleField;

  phase: Phase = 'ready';
  ticks = 0;
  /** Przejechany dystans świata w px. */
  distancePx = 0;
  bonusKm = 0;
  y: number = PLAYER.startY;
  vy = 0;
  /** Chwilowy ciężar bagażu 0..1 — zwiększa grawitację, zanika z czasem. */
  weight = 0;
  lives: number;
  invulnerableTicks = 0;
  /** Tylko jeden bonus aktywny w danym momencie, aby uniknąć niejasnych interakcji. */
  activePowerup: PowerupKind | null = null;
  powerupTicks = 0;
  country: CountryCode;
  cause: ObstacleKind | null = null;
  parcels = 0;
  jars = 0;
  /** Numery ticków, w których był tap — zapis do weryfikacji wyniku. */
  readonly flapTicks: number[] = [];

  /** Indeks następnego punktu trasy do minięcia. */
  nextWaypoint = 1;
  private pendingFlap = false;
  /** Przeszkody, które zachodziły na kombi w chwili wygaśnięcia ochrony. */
  private protectedExitIds = new Set<number>();
  private events: GameEvent[] = [];

  constructor(opts: GameOptions) {
    this.seed = opts.seed;
    this.mode = opts.mode;
    this.route = opts.route;
    this.field = new ObstacleField(opts.seed);
    this.lives = opts.mode === 'cozy' ? COZY.lives : 1;
    this.country = countryAt(opts.route, 0);
    this.field.ensureAhead(WORLD.width * 2, 0);
  }

  get seconds(): number {
    return this.ticks * TICK;
  }

  get difficulty(): number {
    return difficultyAt(this.seconds);
  }

  get speed(): number {
    const base = lerp(DIFFICULTY.speed[0], DIFFICULTY.speed[1], this.difficulty);
    return this.activePowerup === 'tailwind' ? base * POWERUPS.tailwindSpeedMultiplier : base;
  }

  get isInvulnerable(): boolean {
    return this.invulnerableTicks > 0 ||
      this.activePowerup === 'boarding' || this.activePowerup === 'tailwind';
  }

  /** Wynik w km: dystans trasy + premie za znajdźki, nie więcej niż cała trasa. */
  get km(): number {
    return Math.min(this.route.totalKm, Math.floor(this.distancePx * KM_PER_PX + this.bonusKm));
  }

  get remainingKm(): number {
    return Math.max(0, this.route.totalKm - this.km);
  }

  get playerRect(): Rect {
    return { x: PLAYER.x - PLAYER.hitW / 2, y: this.y - PLAYER.hitH / 2, w: PLAYER.hitW, h: PLAYER.hitH };
  }

  /** Tap gracza. Pierwszy tap startuje przejazd. */
  flap(): void {
    if (this.phase === 'over' || this.phase === 'arrived') return;
    if (this.phase === 'ready') this.phase = 'playing';
    this.pendingFlap = true;
  }

  /** Zwraca i czyści zdarzenia (dźwięk, efekty, komunikaty). */
  drainEvents(): GameEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }

  /** Jeden stały krok symulacji (TICK sekund). */
  tick(): void {
    if (this.phase !== 'playing') return;
    // Telefon do mamy spowalnia zarówno świat, jak i lokalną fizykę.
    // Czas trwania bonusu pozostaje oparty na zwykłych tickach (2 s).
    const dt = TICK * (this.activePowerup === 'mamcall' ? POWERUPS.mamcallTimeScale : 1);

    if (this.pendingFlap) {
      this.pendingFlap = false;
      this.vy = PLAYER.flapVelocity;
      this.flapTicks.push(this.ticks);
      this.events.push({ type: 'flap' });
    }

    const gravity = PLAYER.gravity * (1 + this.weight * PICKUPS.gravityPerWeight);
    this.vy = Math.min(PLAYER.maxFallSpeed, this.vy + gravity * dt);
    this.y += this.vy * dt;
    if (this.y - PLAYER.hitH / 2 < WORLD.ceilingY) {
      this.y = WORLD.ceilingY + PLAYER.hitH / 2;
      this.vy = 0;
    }

    this.weight = Math.max(0, this.weight - PICKUPS.weightDecayPerSec * dt);
    if (this.invulnerableTicks > 0) this.invulnerableTicks--;

    // Podczas ochrony nie pozwalamy opaść pod asfalt: po wygaśnięciu bonusu
    // nie może nastąpić kolizja bez możliwości reakcji.
    if (this.isInvulnerable && this.y + PLAYER.hitH / 2 >= WORLD.groundY - 2) {
      this.y = WORLD.groundY - PLAYER.hitH / 2 - 2;
      this.vy = Math.min(this.vy, 0);
    }

    this.distancePx += this.speed * dt;
    this.ticks++;

    const worldX = this.distancePx;
    this.field.ensureAhead(worldX + WORLD.width * 2, this.difficulty);
    this.field.prune(worldX - WORLD.width);

    this.collectPickups(worldX);
    this.checkCollisions(worldX);
    if (this.phase !== 'playing') return;
    this.advancePowerup();

    const wps = this.route.waypoints;
    while (this.nextWaypoint < wps.length - 1 && this.km >= wps[this.nextWaypoint].km) {
      this.events.push({ type: 'waypoint', waypoint: wps[this.nextWaypoint] });
      this.nextWaypoint++;
    }

    const country = countryAt(this.route, this.km);
    if (country !== this.country) {
      this.country = country;
      this.events.push({ type: 'border', country });
    }

    if (this.km >= this.route.totalKm) {
      this.endPowerup();
      this.phase = 'arrived';
      this.events.push({ type: 'arrived' });
    }
  }

  private collectPickups(worldX: number): void {
    const r = this.playerRect;
    for (const p of this.field.pickups) {
      if (p.taken) continue;
      if (!rectCircleOverlap(r, p.x - worldX, p.y, PICKUPS.radius)) continue;
      p.taken = true;
      if (isPowerupKind(p.kind)) {
        this.events.push({ type: 'pickup', kind: p.kind, bonusKm: 0 });
        this.startPowerup(p.kind);
        continue;
      }
      const def = PICKUPS[p.kind];
      this.bonusKm += def.bonusKm;
      this.weight = Math.min(PICKUPS.maxWeight, this.weight + def.weight);
      if (p.kind === 'parcel') this.parcels++;
      else this.jars++;
      if (p.kind === 'jar' && this.mode === 'cozy') this.lives = Math.min(COZY.maxLives, this.lives + 1);
      this.events.push({ type: 'pickup', kind: p.kind, bonusKm: def.bonusKm });
    }
  }

  private startPowerup(kind: PowerupKind): void {
    this.endPowerup();
    const durationSeconds = kind === 'boarding' ? POWERUPS.boardingSeconds
      : kind === 'tailwind' ? POWERUPS.tailwindSeconds : POWERUPS.mamcallSeconds;
    this.activePowerup = kind;
    this.powerupTicks = Math.round(durationSeconds / TICK);
    this.events.push({ type: 'powerup-start', kind, durationSeconds });
  }

  private advancePowerup(): void {
    if (!this.activePowerup) return;
    if (--this.powerupTicks <= 0) this.endPowerup();
  }

  private endPowerup(): void {
    const kind = this.activePowerup;
    if (!kind) return;
    // Wygaśnięcie ochrony wewnątrz filaru nie powoduje natychmiastowej,
    // niemożliwej do uniknięcia porażki. Immunitet dotyczy tylko tych filarów.
    if (kind === 'boarding' || kind === 'tailwind') {
      const r = this.playerRect;
      for (const o of this.field.obstacles) {
        const x = o.x - this.distancePx;
        if (x < r.x + r.w && x + OBSTACLE.width > r.x) this.protectedExitIds.add(o.id);
      }
    }
    this.activePowerup = null;
    this.powerupTicks = 0;
    this.events.push({ type: 'powerup-end', kind });
  }

  private checkCollisions(worldX: number): void {
    if (this.activePowerup === 'tailwind') return; // Przelot przez przeszkody przez 2 s.
    const r = this.playerRect;
    let hit: ObstacleKind | null = null;

    if (r.y + r.h >= WORLD.groundY) hit = 'ground';

    for (const o of this.field.obstacles) {
      const sx = o.x - worldX;
      if (sx + OBSTACLE.width < r.x) {
        o.passed = true;
        this.protectedExitIds.delete(o.id);
        continue;
      }
      if (sx > r.x + r.w) break;
      if (this.protectedExitIds.has(o.id)) continue;
      const gapH = effectiveGapH(o, this.weight);
      const top: Rect = { x: sx, y: WORLD.ceilingY - 1000, w: OBSTACLE.width, h: o.gapY - gapH / 2 + 1000 };
      const bottom: Rect = { x: sx, y: o.gapY + gapH / 2, w: OBSTACLE.width, h: WORLD.height };
      if (rectsOverlap(r, top)) hit = o.gate ? 'baggage-gate' : o.top;
      else if (rectsOverlap(r, bottom)) hit = o.gate ? 'baggage-gate' : o.bottom;
    }

    if (!hit || this.isInvulnerable) return;

    this.lives--;
    this.events.push({ type: 'hit', kind: hit, livesLeft: this.lives });
    if (this.lives <= 0) {
      this.endPowerup();
      this.phase = 'over';
      this.cause = hit;
      this.events.push({ type: 'over', cause: hit });
      return;
    }
    // Tryb łagodny: chwila nietykalności i podbicie w bezpieczne miejsce.
    this.invulnerableTicks = Math.round(COZY.invulnerableSeconds / TICK);
    this.vy = PLAYER.flapVelocity * 0.6;
    if (hit === 'ground') this.y = WORLD.groundY - PLAYER.hitH;
  }
}

/** Odtwarza przejazd z ziarna i zapisu tapnięć — do weryfikacji wyniku po stronie serwera. */
export function replay(opts: GameOptions, flapTicks: readonly number[], maxTicks = 120 * 60 * 10): Game {
  const game = new Game(opts);
  let i = 0;
  while (game.ticks < maxTicks) {
    if (i < flapTicks.length && flapTicks[i] === game.ticks) {
      game.flap();
      i++;
    }
    if (game.phase === 'over' || game.phase === 'arrived') break;
    if (game.phase === 'ready') break;
    game.tick();
  }
  return game;
}
