import { afterEach, describe, expect, it, vi } from 'vitest';
import { AssetLoader, BACKGROUND_LAYERS, ASSET_SIZES, countryLayerPath, landmarkPaths, drawableWidth, drawableHeight } from '../src/render/assets';
import type { Waypoint } from '../src/content/waypoints';

class FakeImage {
  static requested: FakeImage[] = [];
  naturalWidth = 1080;
  naturalHeight = 1920;
  width = 1080;
  height = 1920;
  decoding = '';
  onload: ((event: Event) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  src = '';
  constructor() { FakeImage.requested.push(this); }
  succeed() { this.onload?.({} as Event); }
  fail() { this.onerror?.({} as Event); }
}

afterEach(() => {
  vi.unstubAllGlobals();
  FakeImage.requested = [];
});

describe('assets: HiDPI, preload i warianty', () => {
  it('zachowuje kontrakt ścieżek i buforuje ich listy', () => {
    expect(countryLayerPath('BE', 'far')).toBe('assets/countries/be/be-far.png');
    expect(countryLayerPath('SE', 'road')).toBe('assets/countries/se/se-road.png');
    expect(countryLayerPath('PL', 'sky', 'winter')).toBe('assets/countries/pl/pl-sky-zima.png');
    expect(countryLayerPath('PL', 'far', 'winter')).toBe('assets/countries/pl/pl-far-zima.png');
    expect(countryLayerPath('PL', 'near', 'winter')).toBe('assets/countries/pl/pl-near-zima.png');
    expect(countryLayerPath('PL', 'road', 'winter')).toBe('assets/countries/pl/pl-road.png');
    expect(countryLayerPath('DE', 'sky', 'winter')).toBe('assets/countries/de/de-sky-zima.png');
    expect(BACKGROUND_LAYERS).toEqual(['sky', 'clouds', 'far', 'near', 'road']);
    expect(ASSET_SIZES.sky).toEqual({ width: 360, height: 640 });
    const city = { id: 'leuven', kind: 'city' as const };
    expect(landmarkPaths(city)).toEqual(['assets/landmarks/leuven.png']);
    expect(landmarkPaths(city)).toBe(landmarkPaths(city));
    expect(landmarkPaths({ id: 'dom-rzeszow', kind: 'city' }, 'winter')).toEqual([
      'assets/landmarks/dom-meta-zima.png', 'assets/landmarks/dom-meta.png',
    ]);
    expect(landmarkPaths({ id: 'stacja-swiecko', kind: 'rest' })).toEqual([
      'assets/landmarks/stacja-swiecko.png', 'assets/landmarks/granica-stacja.png',
    ]);
  });

  it('prime pobiera wyłącznie kraje z trasy, nie wszystkie kraje', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 1 });
    const route: Pick<Waypoint, 'country'>[] = [
      { country: 'BE' }, { country: 'DE' }, { country: 'PL' }, { country: 'DE' },
    ];
    assets.prime('BE', route);
    expect(FakeImage.requested[0].src).toBe('/assets/hero/kombi-body.png');
    // Jedna grafika bohatera oraz po 5 warstw BE, DE i PL.
    for (let i = 0; i < 16; i++) FakeImage.requested[i].succeed();
    expect(FakeImage.requested).toHaveLength(16);
    expect(FakeImage.requested.map((img) => img.src)).toEqual([
      '/assets/hero/kombi-body.png',
      ...BACKGROUND_LAYERS.map((layer) => '/assets/countries/be/be-' + layer + '.png'),
      ...BACKGROUND_LAYERS.map((layer) => '/assets/countries/de/de-' + layer + '.png'),
      ...BACKGROUND_LAYERS.map((layer) => '/assets/countries/pl/pl-' + layer + '.png'),
    ]);
    expect(assets.getCountryLayer('BE', 'sky')).toBe(FakeImage.requested[1]);
  });

  it('pozostawia obrazy @3x w pełnej rozdzielczości, bez OffscreenCanvas 1x', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 1 });
    expect(assets.getCountryLayer('PL', 'sky')).toBeUndefined();
    FakeImage.requested[0].succeed();
    const image = assets.getCountryLayer('PL', 'sky');
    expect(image).toBe(FakeImage.requested[0]);
    expect(image && drawableWidth(image)).toBe(1080);
    expect(image && drawableHeight(image)).toBe(1920);
    expect(FakeImage.requested).toHaveLength(1);
  });

  it('404 zapisuje jako missing; fallback panoramy dopiero po błędzie', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 2 });
    const rest = { id: 'stacja-swiecko', kind: 'rest' as const };
    expect(assets.getLandmark(rest)).toBeUndefined();
    FakeImage.requested[0].fail();
    expect(assets.getLandmark(rest)).toBeUndefined();
    expect(FakeImage.requested[1].src).toBe('/assets/landmarks/granica-stacja.png');
    FakeImage.requested[1].succeed();
    expect(assets.getLandmark(rest)).toBe(FakeImage.requested[1]);
    expect(FakeImage.requested).toHaveLength(2);
  });

  it('zimowy plik jest pierwszy; po 404 włącza zwykły wariant', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 1 });
    expect(assets.getCountryLayer('PL', 'sky', 'winter')).toBeUndefined();
    expect(FakeImage.requested[0].src).toContain('pl-sky-zima.png');
    FakeImage.requested[0].fail();
    expect(assets.getCountryLayer('PL', 'sky', 'winter')).toBeUndefined();
    expect(FakeImage.requested[1].src).toContain('pl-sky.png');
    FakeImage.requested[1].succeed();
    expect(assets.getCountryLayer('PL', 'sky', 'winter')).toBe(FakeImage.requested[1]);
    const home = { id: 'dom-warszawa', kind: 'city' as const };
    expect(assets.getLandmark(home, 'winter')).toBeUndefined();
    expect(FakeImage.requested[2].src).toContain('dom-meta-zima.png');
  });

  it('cache LRU usuwa dawno nieużyte bitmapy, nie usuwa świeżo wczytanej', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 1, maxCachedPixels: 1080 * 1920 });
    assets.getCountryLayer('BE', 'sky');
    FakeImage.requested[0].succeed();
    assets.getCountryLayer('DE', 'sky');
    FakeImage.requested[1].succeed();
    expect(assets.getCountryLayer('DE', 'sky')).toBe(FakeImage.requested[1]);
    assets.getCountryLayer('BE', 'sky');
    expect(FakeImage.requested).toHaveLength(3);
  });
});
