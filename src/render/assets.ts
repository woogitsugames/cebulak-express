import type { Waypoint } from '../content/waypoints';
import type { CountryCode, Route } from '../core/route';

export const BACKGROUND_LAYERS = ['sky', 'clouds', 'far', 'near', 'road'] as const;
export type BackgroundLayer = (typeof BACKGROUND_LAYERS)[number];
export type Season = 'summer' | 'winter';

/** Wymiary wyświetlania w pikselach logicznych; pliki PNG pozostają w oryginalnym @3x. */
export const ASSET_SIZES = {
  sky: { width: 360, height: 640 },
  clouds: { width: 720, height: 200 },
  far: { width: 720, height: 300 },
  near: { width: 720, height: 240 },
  road: { width: 360, height: 110 },
  landmark: { width: 540, height: 300 },
} as const;

/** Nie tworzymy miniatur Canvas 1x: przeglądarka próbuje od razu z PNG 3x. */
export type DrawableAsset = HTMLImageElement;
type Priority = 0 | 1 | 2;
type AssetStatus = 'queued' | 'loading' | 'ready' | 'missing';

interface AssetRecord {
  readonly path: string;
  priority: Priority;
  status: AssetStatus;
  image?: DrawableAsset;
  lastUsed: number;
}

export interface AssetLoaderOptions {
  /** Domyślnie ścieżka bazowa Vite, także dla Capacitor i osadzenia w portalu. */
  baseUrl?: string;
  maxConcurrent?: number;
  /** Limit źródłowych pikseli bitmap; obejmuje rzeczywiste PNG @3x. */
  maxCachedPixels?: number;
}

const countryPathCache = new Map<string, string>();
const landmarkPathCache = new Map<string, readonly string[]>();
const BORDER_NEAR_PATH = 'assets/countries/pl/pl-border-near.png';
const DEFAULT_HERO_PATHS: readonly string[] = ['assets/hero/kombi-body.png'];

function hasWinterVariant(country: CountryCode, layer: BackgroundLayer): boolean {
  return country === 'PL' && (layer === 'sky' || layer === 'far' || layer === 'near');
}

/** Ścieżki tworzone tylko raz — getCountryLayer jest wywoływane co klatkę. */
export function countryLayerPath(country: CountryCode, layer: BackgroundLayer, season: Season = 'summer'): string {
  const variant = season === 'winter' && hasWinterVariant(country, layer) ? 'winter' : 'summer';
  const key = country + ':' + layer + ':' + variant;
  let path = countryPathCache.get(key);
  if (!path) {
    const cc = country.toLowerCase();
    path = 'assets/countries/' + cc + '/' + cc + '-' + layer + (variant === 'winter' ? '-zima' : '') + '.png';
    countryPathCache.set(key, path);
  }
  return path;
}

/** Kolejność prób: wariant sezonowy, zwykły, ew. wspólna stacja. */
export function landmarkPaths(point: Pick<Waypoint, 'id' | 'kind'>, season: Season = 'summer'): readonly string[] {
  const key = point.id + ':' + point.kind + ':' + season;
  let paths = landmarkPathCache.get(key);
  if (!paths) {
    if (point.id.startsWith('dom-')) {
      paths = season === 'winter'
        ? ['assets/landmarks/dom-meta-zima.png', 'assets/landmarks/dom-meta.png']
        : ['assets/landmarks/dom-meta.png'];
    } else {
      const primary = 'assets/landmarks/' + point.id + '.png';
      paths = point.kind === 'border' || point.kind === 'rest'
        ? [primary, 'assets/landmarks/granica-stacja.png']
        : [primary];
    }
    landmarkPathCache.set(key, paths);
  }
  return paths;
}

/**
 * Asynchroniczna kolejka: kraj startu ma priorytet, następnie kraje na trasie.
 * Pozostałe kraje/landmarki są pobierane dopiero przy pierwszym żądaniu.
 * Brakujących plików nie pobieramy wielokrotnie (ujemny cache).
 */
export class AssetLoader {
  private readonly records = new Map<string, AssetRecord>();
  private readonly pending: AssetRecord[] = [];
  private readonly maxConcurrent: number;
  private readonly maxCachedPixels: number;
  private readonly baseUrl: string;
  private active = 0;
  private clock = 0;
  private cachedPixels = 0;

  constructor(options: AssetLoaderOptions = {}) {
    this.maxConcurrent = Math.max(1, Math.floor(options.maxConcurrent ?? 3));
    this.maxCachedPixels = Math.max(1, options.maxCachedPixels ?? 48_000_000);
    this.baseUrl = options.baseUrl ?? import.meta.env?.BASE_URL ?? './';
  }

  /** Preload tylko krajów używanych na wybranej trasie (oraz bohatera). */
  prime(
    startCountry: CountryCode,
    route?: Pick<Route, 'waypoints'> | readonly Pick<Waypoint, 'country'>[],
    heroPaths: readonly string[] = DEFAULT_HERO_PATHS,
    season: Season = 'summer',
  ): void {
    for (const path of heroPaths) this.request(path, 0);
    const countries = new Set<CountryCode>([startCountry]);
    const points = route ? ('waypoints' in route ? route.waypoints : route) : [];
    for (const point of points) countries.add(point.country);
    for (const country of countries) {
      const priority: Priority = country === startCountry ? 0 : 1;
      for (const layer of BACKGROUND_LAYERS) {
        this.request(countryLayerPath(country, layer, season), priority);
      }
    }
  }

  /** Oryginalne piksele @3x; współrzędne docelowe nadaje renderer w drawImage. */
  getCountryLayer(country: CountryCode, layer: BackgroundLayer, season: Season = 'summer'): DrawableAsset | undefined {
    const path = countryLayerPath(country, layer, season);
    const record = this.request(path, 0);
    if (record.status === 'ready') return record.image;
    if (season === 'winter' && hasWinterVariant(country, layer)) {
      const summerPath = countryLayerPath(country, layer);
      // W trakcie ładowania zimy można pokazywać już dostępne lato, bez nowego żądania.
      if (record.status !== 'missing') return this.records.get(summerPath)?.image;
      return this.request(summerPath, 1).image;
    }
    return undefined;
  }

  /** Wariant near dla odcinka polskiej granicy, zastępujący zwykły kafelek. */
  getBorderNear(): DrawableAsset | undefined {
    return this.request(BORDER_NEAR_PATH, 1).image;
  }

  getLandmark(point: Pick<Waypoint, 'id' | 'kind'>, season: Season = 'summer'): DrawableAsset | undefined {
    for (const path of landmarkPaths(point, season)) {
      const record = this.request(path, 1);
      if (record.status === 'ready') return record.image;
      // Nie zaśmiecaj sieci fallbackiem, zanim nie wiadomo, czy główny plik istnieje.
      if (record.status !== 'missing') return undefined;
    }
    return undefined;
  }

  /** Bohater ma osobny renderer; tu zwracamy również oryginalną bitmapę bez downscale. */
  getHero(path: string): DrawableAsset | undefined {
    return this.request(path, 0).image;
  }

  private request(path: string, priority: Priority): AssetRecord {
    const existing = this.records.get(path);
    if (existing) {
      existing.lastUsed = ++this.clock;
      if (existing.status === 'queued' && priority < existing.priority) {
        existing.priority = priority;
        this.pump();
      }
      return existing;
    }
    const record: AssetRecord = { path, priority, status: 'queued', lastUsed: ++this.clock };
    this.records.set(path, record);
    this.pending.push(record);
    this.pump();
    return record;
  }

  private pump(): void {
    while (this.active < this.maxConcurrent && this.pending.length > 0) {
      let best = 0;
      for (let i = 1; i < this.pending.length; i++) {
        if (this.pending[i].priority < this.pending[best].priority) best = i;
      }
      const next = this.pending.splice(best, 1)[0];
      next.status = 'loading';
      this.active++;
      this.load(next);
    }
  }

  private load(record: AssetRecord): void {
    if (typeof Image === 'undefined') {
      record.status = 'missing';
      this.active--;
      this.pump();
      return;
    }
    const image = new Image();
    let finished = false;
    const done = (success: boolean): void => {
      if (finished) return;
      finished = true;
      image.onload = null;
      image.onerror = null;
      record.image = success ? image : undefined;
      record.status = success ? 'ready' : 'missing';
      if (success) {
        this.cachedPixels += image.naturalWidth * image.naturalHeight;
        this.trimCache(record.path);
      }
      this.active--;
      this.pump();
    };
    image.onload = () => done(image.naturalWidth > 0 && image.naturalHeight > 0);
    image.onerror = () => done(false);
    image.decoding = 'async';
    image.src = this.baseUrl.replace(/\/?$/, '/') + record.path;
  }

  /** LRU tylko po załadowaniu obrazu, nigdy wewnątrz klatki animacji. */
  private trimCache(protectedPath: string): void {
    if (this.cachedPixels <= this.maxCachedPixels) return;
    const ready = [...this.records.values()]
      .filter((record) => record.status === 'ready' && record.path !== protectedPath)
      .sort((a, b) => a.lastUsed - b.lastUsed);
    for (const record of ready) {
      if (this.cachedPixels <= this.maxCachedPixels) break;
      if (!record.image) continue;
      this.cachedPixels -= record.image.naturalWidth * record.image.naturalHeight;
      this.records.delete(record.path);
    }
  }
}
