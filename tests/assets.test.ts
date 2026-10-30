import { afterEach, describe, expect, it, vi } from 'vitest';
import { AssetLoader, BACKGROUND_LAYERS, ASSET_SIZES, countryLayerPath, landmarkPaths } from '../src/render/assets';

class FakeCanvas {
  width: number;
  height: number;
  drawImage = vi.fn();
  constructor(width: number, height: number) { this.width = width; this.height = height; }
  getContext() { return { drawImage: this.drawImage }; }
}

class FakeImage {
  static requested: FakeImage[] = [];
  naturalWidth = 1080;
  naturalHeight = 1920;
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

describe('assets: nazewnictwo i nieblokujące ładowanie', () => {
  it('korzysta z ustalonego kontraktu ścieżek grafik 05–09', () => {
    expect(countryLayerPath('BE', 'far')).toBe('assets/countries/be/be-far.png');
    expect(countryLayerPath('SE', 'road')).toBe('assets/countries/se/se-road.png');
    expect(BACKGROUND_LAYERS).toEqual(['sky', 'clouds', 'far', 'near', 'road']);
    expect(ASSET_SIZES.sky).toEqual({ width: 360, height: 640 });
    expect(landmarkPaths({ id: 'leuven', kind: 'city' })).toEqual(['assets/landmarks/leuven.png']);
    expect(landmarkPaths({ id: 'dom-rzeszow', kind: 'city' })).toEqual(['assets/landmarks/dom-meta.png']);
    expect(landmarkPaths({ id: 'stacja-swiecko', kind: 'rest' })).toEqual([
      'assets/landmarks/stacja-swiecko.png', 'assets/landmarks/granica-stacja.png',
    ]);
  });

  it('ładuje najpierw bohatera i startowy kraj, a resztę później', () => {
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('OffscreenCanvas', FakeCanvas);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 1 });
    assets.prime('BE');
    expect(FakeImage.requested[0].src).toBe('/assets/hero/kombi-body.png');
    FakeImage.requested[0].succeed();
    expect(FakeImage.requested[1].src).toBe('/assets/countries/be/be-sky.png');
    for (let i = 1; i <= 5; i++) FakeImage.requested[i].succeed();
    expect(FakeImage.requested[6].src).not.toContain('/countries/be/');
    expect(assets.getCountryLayer('BE', 'sky')?.width).toBe(360);
    expect(assets.getCountryLayer('BE', 'sky')?.height).toBe(640);
    expect(FakeImage.requested.length).toBe(7);
  });

  it('cache unika ponownych pobrań; brak pliku nie blokuje klatki i daje fallback', () => {
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('OffscreenCanvas', FakeCanvas);
    const assets = new AssetLoader({ baseUrl: './', maxConcurrent: 2 });
    expect(assets.getCountryLayer('PL', 'far')).toBeUndefined();
    expect(FakeImage.requested.length).toBe(1);
    FakeImage.requested[0].succeed();
    const first = assets.getCountryLayer('PL', 'far');
    expect(first).toBeDefined();
    expect(assets.getCountryLayer('PL', 'far')).toBe(first);
    expect(FakeImage.requested.length).toBe(1);

    expect(assets.getCountryLayer('PL', 'near')).toBeUndefined();
    FakeImage.requested[1].fail();
    expect(assets.getCountryLayer('PL', 'near')).toBeUndefined();
    expect(FakeImage.requested.length).toBe(2);
  });

  it('przy nieobecnej grafice granicy próbuje wspólnej sylwetki', () => {
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('OffscreenCanvas', FakeCanvas);
    const assets = new AssetLoader({ baseUrl: '/', maxConcurrent: 2 });
    const point = { id: 'granica-swiecko', kind: 'border' as const };
    expect(assets.getLandmark(point)).toBeUndefined();
    FakeImage.requested[0].fail();
    expect(assets.getLandmark(point)).toBeUndefined();
    expect(FakeImage.requested[1].src).toBe('/assets/landmarks/granica-stacja.png');
    FakeImage.requested[1].succeed();
    expect(assets.getLandmark(point)?.width).toBe(540);
  });
});
