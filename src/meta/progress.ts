import { PL_TRANSIT, ROUTE_WAYPOINTS, type Waypoint } from '../content/waypoints';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, countryAt, type CountryCode, type Route } from '../core/route';
import type { Game } from '../core/game';
import { platform } from '../platform';

export const PROGRESS_STORAGE_KEY = 'ce.collection.progress.v1';

export const MEDAL_IDS = [
  'first-run', 'first-border', 'european', 'five-countries', 'first-arrival',
  'five-arrivals', 'winter-arrival', 'ten-jars-run', 'fifty-jars', 'ten-parcels',
  'hundred-km', 'thousand-km', 'ten-thousand-km', 'ten-postcards', 'thirty-postcards',
] as const;
export type MedalId = (typeof MEDAL_IDS)[number];

export interface Postcard {
  readonly id: string;
  readonly name: string;
  readonly country: CountryCode;
}

/** Katalog obejmuje miasta tras, startów i met; jeden identyfikator = jedna pocztówka. */
function buildPostcards(): Postcard[] {
  const unique = new Map<string, Postcard>();
  const add = (point: Postcard): void => {
    if (!unique.has(point.id)) unique.set(point.id, point);
  };
  for (const country of HOME_COUNTRIES) {
    for (const waypoint of ROUTE_WAYPOINTS[country]) {
      if (waypoint.kind === 'city') add(waypoint);
    }
    for (const city of START_CITIES[country]) add({ id: city.id, name: city.name, country });
  }
  for (const waypoint of PL_TRANSIT) {
    if (waypoint.kind === 'city') add(waypoint);
  }
  for (const city of PL_CITIES) add({ id: city.id, name: city.name, country: 'PL' });
  return [...unique.values()].sort((a, b) =>
    a.name.localeCompare(b.name, 'pl') || a.country.localeCompare(b.country) || a.id.localeCompare(b.id));
}

export const POSTCARDS: readonly Postcard[] = buildPostcards();
const postcardById = new Map(POSTCARDS.map((card) => [card.id, card]));
const countryCodes = new Set<CountryCode>(['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK', 'SE', 'PL']);
const medalIds = new Set<string>(MEDAL_IDS);

export interface ProgressStats {
  runs: number;
  totalKm: number;
  arrivals: number;
  borderCrossings: number;
  jars: number;
  parcels: number;
  winterArrivals: number;
  bestJarsInRun: number;
}

export interface Progress {
  version: 1;
  medals: MedalId[];
  postcards: string[];
  countries: CountryCode[];
  stats: ProgressStats;
}

export interface RunSummary {
  km: number;
  arrived: boolean;
  jars: number;
  parcels: number;
  /** Uwzględnia kraj startu i kolejne kraje faktycznie osiągnięte na trasie. */
  countrySequence: readonly CountryCode[];
  /** Identyfikatory mijanych punktów typu city, łącznie ze startem i osiągniętą metą. */
  cityIds: readonly string[];
  /** Sezonowy wariant przejazdu, ustalany przez warstwę UI przy zakończeniu. */
  winter?: boolean;
}

export interface ProgressChange {
  progress: Progress;
  newMedals: MedalId[];
  newPostcards: Postcard[];
}

export interface ProgressStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export function emptyProgress(): Progress {
  return {
    version: 1,
    medals: [],
    postcards: [],
    countries: [],
    stats: { runs: 0, totalKm: 0, arrivals: 0, borderCrossings: 0, jars: 0,
      parcels: 0, winterArrivals: 0, bestJarsInRun: 0 },
  };
}

function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
}

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value)) : 0;
}

function addCount(a: number, b: number): number {
  return Math.min(Number.MAX_SAFE_INTEGER, a + b);
}

function uniqueArray<T extends string>(value: unknown, valid: (id: string) => id is T): T[] {
  if (!Array.isArray(value)) return [];
  const result = new Set<T>();
  for (const entry of value) {
    if (typeof entry === 'string' && valid(entry)) result.add(entry);
  }
  return [...result];
}

function isMedal(id: string): id is MedalId { return medalIds.has(id); }
function isPostcard(id: string): id is string { return postcardById.has(id); }
function isCountry(id: string): id is CountryCode { return countryCodes.has(id as CountryCode); }

/** Normalizacja zapisu: odporna na stare, niekompletne lub uszkodzone dane z pamięci. */
export function normalizeProgress(raw: unknown): Progress {
  const data = object(raw);
  const stats = object(data.stats);
  return {
    version: 1,
    medals: uniqueArray(data.medals, isMedal),
    postcards: uniqueArray(data.postcards, isPostcard),
    countries: uniqueArray(data.countries, isCountry),
    stats: {
      runs: count(stats.runs),
      totalKm: count(stats.totalKm),
      arrivals: count(stats.arrivals),
      borderCrossings: count(stats.borderCrossings),
      jars: count(stats.jars),
      parcels: count(stats.parcels),
      winterArrivals: count(stats.winterArrivals),
      bestJarsInRun: count(stats.bestJarsInRun),
    },
  };
}

export async function loadProgress(storage: ProgressStorage = platform.storage): Promise<Progress> {
  try {
    const value = await storage.get(PROGRESS_STORAGE_KEY);
    return value ? normalizeProgress(JSON.parse(value) as unknown) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export async function saveProgress(progress: Progress, storage: ProgressStorage = platform.storage): Promise<void> {
  try {
    await storage.set(PROGRESS_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
  } catch {
    // Brak pamięci nie wstrzymuje rozgrywki.
  }
}

/** Przygotowuje podsumowanie z aktualnego rdzenia bez zmiany Game ani historii zdarzeń. */
export function summarizeRun(
  game: Pick<Game, 'route' | 'km' | 'jars' | 'parcels' | 'phase'> & { baseWeight?: number },
  winter = false,
): RunSummary {
  const route: Route = game.route;
  const km = Math.min(route.totalKm, count(game.km));
  // Lot powrotny (dodatkowy ciężar) kończy się za granicą: to nie „dojazd do domu”,
  // więc bez medali za dojazd, zimowego asa i pocztówki z mety.
  const arrivedHome = game.phase === 'arrived' && !((game.baseWeight ?? 0) > 0);
  const reached: Waypoint[] = route.waypoints.filter((point) =>
    point.km <= km && (arrivedHome || point.km < route.totalKm));
  // Start w kraju pierwszego punktu trasy (lot powrotny zaczyna się w Polsce, nie w kraju `home`).
  const countrySequence: CountryCode[] = [countryAt(route, 0)];
  const cityIds: string[] = [];
  for (const waypoint of reached) {
    if (waypoint.country !== countrySequence[countrySequence.length - 1]) countrySequence.push(waypoint.country);
    if (waypoint.kind === 'city') {
      // W rdzeniu meta ma identyfikator dom-<miasto>; w albumie używamy ID miasta.
      cityIds.push(waypoint.id.startsWith('dom-') ? waypoint.id.slice(4) : waypoint.id);
    }
  }
  return { km, arrived: arrivedHome, jars: game.jars, parcels: game.parcels,
    countrySequence, cityIds, winter };
}

/** Medale wyłącznie za grę, bez powiązania z płatnościami. */
const MEDAL_RULES: ReadonlyArray<{ id: MedalId; achieved: (value: Progress) => boolean }> = [
  { id: 'first-run', achieved: (p) => p.stats.runs >= 1 },
  { id: 'first-border', achieved: (p) => p.stats.borderCrossings >= 1 },
  { id: 'european', achieved: (p) => p.countries.length >= 3 },
  { id: 'five-countries', achieved: (p) => p.countries.length >= 5 },
  { id: 'first-arrival', achieved: (p) => p.stats.arrivals >= 1 },
  { id: 'five-arrivals', achieved: (p) => p.stats.arrivals >= 5 },
  { id: 'winter-arrival', achieved: (p) => p.stats.winterArrivals >= 1 },
  { id: 'ten-jars-run', achieved: (p) => p.stats.bestJarsInRun >= 10 },
  { id: 'fifty-jars', achieved: (p) => p.stats.jars >= 50 },
  { id: 'ten-parcels', achieved: (p) => p.stats.parcels >= 10 },
  { id: 'hundred-km', achieved: (p) => p.stats.totalKm >= 100 },
  { id: 'thousand-km', achieved: (p) => p.stats.totalKm >= 1_000 },
  { id: 'ten-thousand-km', achieved: (p) => p.stats.totalKm >= 10_000 },
  { id: 'ten-postcards', achieved: (p) => p.postcards.length >= 10 },
  { id: 'thirty-postcards', achieved: (p) => p.postcards.length >= 30 },
];

/** Czysta operacja: wejściowy progress i tablice podsumowania pozostają nietknięte. */
export function applyRun(progress: Progress, summary: RunSummary): ProgressChange {
  const next = normalizeProgress(progress);
  const stats = next.stats;
  const km = count(summary.km);
  const jars = count(summary.jars);
  const parcels = count(summary.parcels);
  stats.runs = addCount(stats.runs, 1);
  stats.totalKm = addCount(stats.totalKm, km);
  stats.jars = addCount(stats.jars, jars);
  stats.parcels = addCount(stats.parcels, parcels);
  stats.bestJarsInRun = Math.max(stats.bestJarsInRun, jars);
  if (summary.arrived) {
    stats.arrivals = addCount(stats.arrivals, 1);
    if (summary.winter) stats.winterArrivals = addCount(stats.winterArrivals, 1);
  }

  const visited = new Set(next.countries);
  let last: CountryCode | undefined;
  for (const country of summary.countrySequence) {
    if (!isCountry(country)) continue;
    visited.add(country);
    if (last && last !== country) stats.borderCrossings = addCount(stats.borderCrossings, 1);
    last = country;
  }
  next.countries = [...visited];

  const owned = new Set(next.postcards);
  const newPostcards: Postcard[] = [];
  for (const id of summary.cityIds) {
    const card = postcardById.get(id);
    if (!card || owned.has(id)) continue;
    owned.add(id);
    newPostcards.push(card);
  }
  next.postcards = [...owned];

  const unlocked = new Set(next.medals);
  const newMedals: MedalId[] = [];
  for (const medal of MEDAL_RULES) {
    if (unlocked.has(medal.id) || !medal.achieved(next)) continue;
    unlocked.add(medal.id);
    newMedals.push(medal.id);
  }
  next.medals = [...unlocked];
  return { progress: next, newMedals, newPostcards };
}
