/**
 * Stałe rozgrywki. Jednostki: piksele logiczne i sekundy.
 * Świat ma stałą logiczną rozdzielczość 360×640 (pion 9:16); render skaluje.
 */
export const WORLD = {
  width: 360,
  height: 640,
  /** Górna krawędź asfaltu — dotknięcie = kolizja. */
  groundY: 580,
  ceilingY: 0,
} as const;

/** Stały krok symulacji (120 Hz), niezależny od odświeżania ekranu. */
export const TICK = 1 / 120;

export const PLAYER = {
  x: 90,
  startY: 280,
  /** Hitbox kombi (prostokąt), celowo mniejszy od grafiki — wybaczający. */
  hitW: 40,
  hitH: 20,
  gravity: 1500,
  flapVelocity: -430,
  maxFallSpeed: 620,
} as const;

export const OBSTACLE = {
  width: 64,
  /** Pierwsza przeszkoda pojawia się dopiero po tej odległości (spokojny start). */
  firstX: 520,
} as const;

/** Skala dystansu: ile kilometrów trasy odpowiada jednemu pikselowi świata. */
export const KM_PER_PX = 0.05;

/**
 * Krzywa trudności: 0 na starcie → 1 po `rampSeconds` gry.
 * Zależy tylko od czasu przejazdu, nigdy od kraju (sprawiedliwy ranking).
 */
export const DIFFICULTY = {
  rampSeconds: 75,
  /** Pierwsze sekundy świadomie łagodne. */
  graceSeconds: 12,
  speed: [140, 215],
  gap: [215, 150],
  spacing: [260, 225],
  /** Maks. zmiana środka szczeliny między kolejnymi przeszkodami. */
  maxGapShift: [80, 150],
} as const;

export const PICKUPS = {
  /** Szansa na znajdźkę między dwiema przeszkodami. */
  chance: 0.45,
  radius: 12,
  parcel: { bonusKm: 15, weight: 0.3, weightProb: 0.8 },
  jar: { bonusKm: 30, weight: 0.5 },
  /** Dodatkowy ciężar zanika w tym tempie (jednostek wagi na sekundę). */
  weightDecayPerSec: 0.12,
  maxWeight: 1,
  /** Waga 1.0 = grawitacja większa o tyle procent. */
  gravityPerWeight: 0.45,
} as const;

/** Bramki występują co 300 km świata (premie za znajdźki nie przesuwają ich). */
export const BAGGAGE_GATE = {
  everyKm: 300,
  maxShrinkPx: 42,
  /** Nawet przy maksymalnej wadze nadwozie ma zapas do obu krawędzi. */
  minGapH: 118,
} as const;

/** Efekty czasowe mierzymy wyłącznie tickami symulacji. */
export const POWERUPS = {
  /** Udział trzech rzadkich bonusów wśród wylosowanych znajdziek. */
  shareAmongPickups: 0.08,
  boardingSeconds: 3,
  tailwindSeconds: 2,
  tailwindSpeedMultiplier: 1.65,
  mamcallSeconds: 2,
  mamcallTimeScale: 0.55,
} as const;

export const COZY = {
  lives: 3,
  maxLives: 3,
  invulnerableSeconds: 1.5,
} as const;

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Trudność 0..1 dla czasu gry w sekundach. */
export function difficultyAt(seconds: number): number {
  const t = (seconds - DIFFICULTY.graceSeconds) / (DIFFICULTY.rampSeconds - DIFFICULTY.graceSeconds);
  return Math.min(1, Math.max(0, t));
}
