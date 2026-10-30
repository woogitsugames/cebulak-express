import type { Waypoint } from '../content/waypoints';
import type { CountryCode } from '../core/route';

export const BACKGROUND_LAYERS = ['sky', 'clouds', 'far', 'near', 'road'] as const;
export type BackgroundLayer = (typeof BACKGROUND_LAYERS)[number];

/** Wymiary docelowe w pikselach logicznych (oryginały z grafik mają skalę @3x). */
export const ASSET_SIZES = {
  sky: { width: 360, height: 640 },
  clouds: { width: 720, height: 200 },
  far: { width: 720, height: 300 },
  near: { width: 720, height: 240 },
  road: { width: 360, height: 110 },
  landmark: { width: 540, height: 300 },
} as const;

export type DrawableAsset = HTMLCanvasElement | OffscreenCanvas;
type Priority = 0 | 1 | 2;
type AssetStatus = 'queued' | 'loading' | 'ready' | 'missing';

interface AssetRecord {
  readonly path: string;
  readonly width: number;
  readonly height: number;
  priority: Priority;
  status: AssetStatus;
  image?: DrawableAsset;
  lastUsed: number;
}

export interface AssetLoaderOptions {
  /** Domyślnie ścieżka bazowa Vite, także dla buildów Capacitor i iframe. */
  baseUrl?: string;
  maxConcurrent?: number;
  /** Limit przeskalowanych tekstur, w pikselach RGBA. */
  maxCachedPixels?: number;
}

export function countryLayerPath(country: CountryCode, layer: BackgroundLayer): string {
  const cc = country.toLowerCase();
  return `assets/countries/${cc}/${cc}-${layer}.png`;
}

/** Wyjątki dostosowane do plików ze zlecenia graficznego 07. */
export function landmarkPaths(point: Pick<Waypoint, 'id' | 'kind'>): readonly string[] {
  if (point.id.startsWith('dom-')) return ['assets/landmarks/dom-meta.png'];
  const primary = `assets/landmarks/${point.id}.png`;
  if (point.kind === 'border' || point.kind === 'rest') {
    return [primary, 'assets/landmarks/granica-stacja.png'];
  }
  return [primary];
}

/**
 * Kolejka bez blokowania renderera: krytyczne obrazy (bohater, kraj startowy),
 * następnie aktualne punkty trasy, na końcu pozostałe kraje.
 * Nieudane odczyty pozostają w pamięci jako „missing”, więc 404 nie powtarza się co klatkę.
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
    this.maxCachedPixels = Math.max(1, options.maxCachedPixels ?? 12_000_000);
    this.baseUrl = options.baseUrl ?? import.meta.env?.BASE_URL ?? './';
  }

  /** Wywołaj przy starcie gry / zmianie miasta w menu; nie trzeba await. */
  prime(startCountry: CountryCode, heroPaths: readonly string[] = ['assets/hero/kombi-body.png']): void {
    // Bohater ma pierwszeństwo przed tłami, nawet jeśli pochodzi z innego modułu.
    for (const path of heroPaths) this.request(path, 0, 0, 0);
    for (const layer of BACKGROUND_LAYERS) {
      const size = ASSET_SIZES[layer];
      this.request(countryLayerPath(startCountry, layer), size.width, size.height, 0);
    }
    // Niski priorytet: żaden ekran nie czeka na te pliki.
    const countries: readonly CountryCode[] = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK', 'SE', 'PL'];
    for (const country of countries) {
      if (country === startCountry) continue;
      for (const layer of BACKGROUND_LAYERS) {
        const size = ASSET_SIZES[layer];
        this.request(countryLayerPath(country, layer), size.width, size.height, 2);
      }
    }
  }

  /** Zwraca gotowy, przeskalowany obraz lub undefined (kolejka działa asynchronicznie). */
  getCountryLayer(country: CountryCode, layer: BackgroundLayer): DrawableAsset | undefined {
    const size = ASSET_SIZES[layer];
    return this.request(countryLayerPath(country, layer), size.width, size.height, 0).image;
  }

  getLandmark(point: Pick<Waypoint, 'id' | 'kind'>): DrawableAsset | undefined {
    for (const path of landmarkPaths(point)) {
      const record = this.request(path, ASSET_SIZES.landmark.width, ASSET_SIZES.landmark.height, 1);
      if (record.status === 'ready') return record.image;
      // Grafika zastępcza jest wczytywana dopiero, gdy pierwotna nie istnieje.
      if (record.status !== 'missing') return undefined;
    }
    return undefined;
  }

  /** Dla renderera bohatera: rozmiar 0/0 oznacza skalowanie do 1/3 źródła. */
  getHero(path: string): DrawableAsset | undefined {
    return this.request(path, 0, 0, 0).image;
  }

  private request(path: string, width: number, height: number, priority: Priority): AssetRecord {
    let record = this.records.get(path);
    if (record) {
      record.lastUsed = ++this.clock;
      if (record.status === 'queued' && priority < record.priority) record.priority = priority;
      this.pump();
      return record;
    }
    record = { path, width, height, priority, status: 'queued', lastUsed: ++this.clock };
    this.records.set(path, record);
    this.pending.push(record);
    this.pump();
    return record;
  }

  private pump(): void {
    while (this.active < this.maxConcurrent && this.pending.length) {
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
    const img = new Image();
    let finished = false;
    const done = (image?: DrawableAsset): void => {
      if (finished) return;
      finished = true;
      img.onload = null;
      img.onerror = null;
      record.image = image;
      record.status = image ? 'ready' : 'missing';
      if (image) {
        this.cachedPixels += image.width * image.height;
        this.trimCache();
      }
      this.active--;
      this.pump();
    };
    img.onload = () => {
      try {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          done();
          return;
        }
        const width = record.width || Math.max(1, Math.round(img.naturalWidth / 3));
        const height = record.height || Math.max(1, Math.round(img.naturalHeight / 3));
        const canvas: DrawableAsset = typeof OffscreenCanvas !== 'undefined'
          ? new OffscreenCanvas(width, height)
          : document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
        if (!context) { done(); return; }
        context.drawImage(img, 0, 0, width, height);
        done(canvas);
      } catch {
        done();
      }
    };
    img.onerror = () => done();
    // Przy bazie Vite './' ścieżka zadziała też pod subkatalogiem portalu.
    img.src = `${this.baseUrl.replace(/\/?$/, '/')}${record.path}`;
  }

  private trimCache(): void {
    if (this.cachedPixels <= this.maxCachedPixels) return;
    const ready = [...this.records.values()]
      .filter((record) => record.status === 'ready')
      .sort((a, b) => a.lastUsed - b.lastUsed);
    for (const record of ready) {
      if (this.cachedPixels <= this.maxCachedPixels) break;
      // Nie wyrzucamy właśnie ukończonego, większego od limitu obrazu.
      if (!record.image || (ready.length === 1)) break;
      this.cachedPixels -= record.image.width * record.image.height;
      this.records.delete(record.path);
    }
  }
}
