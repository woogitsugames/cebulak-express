import type { Waypoint } from '../content/waypoints';
import { devicePerformanceProfile, type DevicePerformanceProfile } from './performance';
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

/** Po przeskalowaniu obrazu używamy ImageBitmap; pozostałe przeglądarki zachowują HTMLImageElement. */
export type DrawableAsset = HTMLImageElement | ImageBitmap;
export function drawableWidth(asset: DrawableAsset): number {
  return 'naturalWidth' in asset ? asset.naturalWidth : asset.width;
}
export function drawableHeight(asset: DrawableAsset): number {
  return 'naturalHeight' in asset ? asset.naturalHeight : asset.height;
}
type Priority = 0 | 1 | 2;
type AssetStatus = 'queued' | 'loading' | 'ready' | 'missing';

interface AssetRecord {
  readonly path: string;
  priority: Priority;
  status: AssetStatus;
  image?: DrawableAsset;
  lastUsed: number;
  retired?: boolean;
}

export interface AssetLoaderOptions {
  /** Domyślnie ścieżka bazowa Vite, także dla Capacitor i osadzenia w portalu. */
  baseUrl?: string;
  maxConcurrent?: number;
  /** Limit źródłowych pikseli bitmap; obejmuje rzeczywiste PNG @3x. */
  maxCachedPixels?: number;
  /** Wstrzyknięcie profilu dla testów i narzędzia pomiarowego. */
  profile?: DevicePerformanceProfile;
}

const countryPathCache = new Map<string, string>();
const landmarkPathCache = new Map<string, readonly string[]>();
const BORDER_NEAR_PATH = 'assets/countries/pl/pl-border-near.png';
const DEFAULT_HERO_PATHS: readonly string[] = ['assets/hero/kombi-body.png'];

/** Zimowe niebo i plany mają wszystkie kraje z tłami; brak pliku = fallback do lata. */
function hasWinterVariant(_country: CountryCode, layer: BackgroundLayer): boolean {
  return layer === 'sky' || layer === 'far' || layer === 'near';
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
  private readonly decodedScale: number;
  private readonly limitedPreload: boolean;
  private routeCountries: CountryCode[] = [];
  private visibleKey = '';
  private active = 0;
  private clock = 0;
  private cachedPixels = 0;

  constructor(options: AssetLoaderOptions = {}) {
    const profile = options.profile ?? devicePerformanceProfile();
    this.maxConcurrent = Math.max(1, Math.floor(options.maxConcurrent ?? profile.maxConcurrent));
    this.maxCachedPixels = Math.max(1, options.maxCachedPixels ?? profile.maxCachedPixels);
    this.decodedScale = profile.decodedScale;
    this.limitedPreload = profile.limitedPreload;
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
    this.routeCountries = [...countries];
    if (this.limitedPreload) {
      this.visibleKey = '';
      this.setVisibleCountries(startCountry, null, season);
      return;
    }
    for (const country of countries) {
      const priority: Priority = country === startCountry ? 0 : 1;
      for (const layer of BACKGROUND_LAYERS) {
        this.request(countryLayerPath(country, layer, season), priority);
      }
    }
  }

  /**
   * Na słabym urządzeniu utrzymujemy maksymalnie dwa kraje:
   * w czasie przejścia poprzedni + bieżący, po przejściu bieżący + następny.
   */
  setVisibleCountries(country: CountryCode, fadingFrom: CountryCode | null = null, season: Season = 'summer'): void {
    if (!this.limitedPreload) return;
    const index = this.routeCountries.indexOf(country);
    const next = index >= 0 ? this.routeCountries[index + 1] : undefined;
    const other = fadingFrom && fadingFrom !== country ? fadingFrom : next;
    const key = country + ':' + (other ?? '') + ':' + season;
    if (key === this.visibleKey) return;
    this.visibleKey = key;
    const keep = new Set<string>([country.toLowerCase()]);
    if (other) keep.add(other.toLowerCase());
    for (const record of this.records.values()) {
      const match = /^assets\/countries\/([a-z]{2})\//.exec(record.path);
      if (!match || keep.has(match[1])) continue;
      record.retired = true;
      if (record.status === 'ready') this.release(record);
      else this.records.delete(record.path);
    }
    for (let i = this.pending.length - 1; i >= 0; i--) {
      if (this.pending[i].retired) this.pending.splice(i, 1);
    }
    for (const code of [country, other]) {
      if (!code) continue;
      for (const layer of BACKGROUND_LAYERS) {
        this.request(countryLayerPath(code, layer, season), code === country ? 0 : 1);
      }
    }
  }

  /** Statystyki dekodowanych obrazów bez skanowania DOM. */
  getStats(): { decodedImages: number; decodedPixels: number; estimatedRgbaBytes: number; queued: number; loading: number } {
    let decodedImages = 0;
    for (const record of this.records.values()) if (record.status === 'ready' && record.image) decodedImages++;
    return {
      decodedImages,
      decodedPixels: this.cachedPixels,
      estimatedRgbaBytes: this.cachedPixels * 4,
      queued: this.pending.length,
      loading: this.active,
    };
  }

  /** Współrzędne docelowe nadaje renderer w drawImage. */
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

  /**
   * Panorama miasta docelowego dla mety `dom-<id>` (te same pliki co miasta na trasie).
   * Brak pliku = undefined; meta rysuje wtedy sam domek `dom-meta` jak dawniej.
   */
  getHomeCity(point: Pick<Waypoint, 'id'>): DrawableAsset | undefined {
    if (!point.id.startsWith('dom-')) return undefined;
    return this.request('assets/landmarks/' + point.id.slice(4) + '.png', 1).image;
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
    const done = (asset: DrawableAsset | null): void => {
      if (finished) return;
      finished = true;
      image.onload = null;
      image.onerror = null;
      if (record.retired) {
        if (asset && 'close' in asset) asset.close();
      } else {
        record.image = asset ?? undefined;
        record.status = asset ? 'ready' : 'missing';
        if (asset) {
          this.cachedPixels += drawableWidth(asset) * drawableHeight(asset);
          this.trimCache(record.path);
        }
      }
      this.active--;
      this.pump();
    };
    image.onload = () => {
      if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) {
        done(null);
        return;
      }
      if (this.decodedScale >= 3 || typeof createImageBitmap !== 'function') {
        done(image);
        return;
      }
      const targetWidth = Math.max(1, Math.round(image.naturalWidth * this.decodedScale / 3));
      const targetHeight = Math.max(1, Math.round(image.naturalHeight * this.decodedScale / 3));
      if (targetWidth >= image.naturalWidth && targetHeight >= image.naturalHeight) {
        done(image);
        return;
      }
      void createImageBitmap(image, {
        resizeWidth: targetWidth,
        resizeHeight: targetHeight,
        resizeQuality: 'high',
      }).then((bitmap) => {
        // Źródłowe PNG @3x nie może pozostać drugim zdekodowanym obrazem.
        image.onload = null;
        image.onerror = null;
        image.removeAttribute('src');
        done(bitmap);
      }).catch(() => done(image));
    };
    image.onerror = () => done(null);
    image.decoding = 'async';
    image.src = this.baseUrl.replace(/\/?$/, '/') + record.path;
  }

  private release(record: AssetRecord): void {
    const asset = record.image;
    if (asset) {
      this.cachedPixels -= drawableWidth(asset) * drawableHeight(asset);
      if ('close' in asset) asset.close();
      else if ('removeAttribute' in asset) asset.removeAttribute('src');
    }
    this.records.delete(record.path);
  }

  /** LRU przy ładowaniu, z limitem dwóch panoram dla słabych urządzeń. */
  private trimCache(protectedPath: string): void {
    if (this.cachedPixels <= this.maxCachedPixels && !this.limitedPreload) return;
    const ready = [...this.records.values()]
      .filter((record) => record.status === 'ready' && record.image && record.path !== protectedPath)
      .sort((a, b) => a.lastUsed - b.lastUsed);
    if (this.limitedPreload) {
      let landmarks = ready.filter((record) => record.path.startsWith('assets/landmarks/')).length +
        Number(protectedPath.startsWith('assets/landmarks/'));
      for (const record of ready) {
        if (landmarks <= 2) break;
        if (!record.path.startsWith('assets/landmarks/')) continue;
        this.release(record);
        landmarks--;
      }
    }
    for (const record of ready) {
      if (this.cachedPixels <= this.maxCachedPixels) break;
      if (this.records.has(record.path)) this.release(record);
    }
  }
}
