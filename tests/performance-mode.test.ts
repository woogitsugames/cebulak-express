import { afterEach, describe, expect, it, vi } from 'vitest';
import { devicePerformanceProfile, AdaptiveQuality } from '../src/render/performance';
import { AssetLoader } from '../src/render/assets';

class FakeImage {
  static requested: FakeImage[] = [];
  naturalWidth = 1080;
  naturalHeight = 1920;
  width = 1080;
  height = 1920;
  decoding = '';
  src = '';
  onload: ((event: Event) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  constructor() { FakeImage.requested.push(this); }
  removeAttribute(name: string): void { if (name === 'src') this.src = ''; }
  succeed(): void { this.onload?.({} as Event); }
}

afterEach(() => {
  vi.unstubAllGlobals();
  FakeImage.requested = [];
});

describe('polityka sprzętowa', () => {
  it('dobiera limit bitmap i rozdzielczość bez obniżania jakości na szybkich urządzeniach', () => {
    expect(devicePerformanceProfile(3, undefined)).toMatchObject({
      decodedScale: 3, maxCachedPixels: 48_000_000, limitedPreload: false,
    });
    expect(devicePerformanceProfile(3, 8).decodedScale).toBe(3);
    expect(devicePerformanceProfile(2, 8).decodedScale).toBe(2);
    expect(devicePerformanceProfile(3, 4)).toMatchObject({
      decodedScale: 2, maxCachedPixels: 16_000_000, limitedPreload: true,
    });
    expect(devicePerformanceProfile(3, 2)).toMatchObject({
      decodedScale: 1.5, maxCachedPixels: 8_000_000, maxConcurrent: 2,
    });
    expect(devicePerformanceProfile(Number.NaN, -1).decodedScale).toBe(3);
  });

  it('przeskalowuje PNG @3x do bitmapy i zwalnia źródłowy obraz', async () => {
    vi.stubGlobal('Image', FakeImage);
    const closed = vi.fn();
    const decode = vi.fn(async (_image: unknown, options: ImageBitmapOptions) => ({
      width: options.resizeWidth, height: options.resizeHeight, close: closed,
    } as ImageBitmap));
    vi.stubGlobal('createImageBitmap', decode);
    const assets = new AssetLoader({
      baseUrl: '/', maxConcurrent: 1, profile: devicePerformanceProfile(3, 2),
    });
    expect(assets.getCountryLayer('BE', 'sky')).toBeUndefined();
    FakeImage.requested[0].succeed();
    await vi.waitFor(() => expect(assets.getStats().decodedImages).toBe(1));
    const asset = assets.getCountryLayer('BE', 'sky');
    expect(asset).toMatchObject({ width: 540, height: 960 });
    expect(decode).toHaveBeenCalledWith(FakeImage.requested[0], {
      resizeWidth: 540, resizeHeight: 960, resizeQuality: 'high',
    });
    expect(FakeImage.requested[0].src).toBe('');
    expect(assets.getStats()).toMatchObject({
      decodedImages: 1, decodedPixels: 540 * 960, estimatedRgbaBytes: 540 * 960 * 4,
    });
    assets.setVisibleCountries('PL');
    expect(closed).toHaveBeenCalledTimes(1);
    expect(assets.getStats().decodedImages).toBe(0);
  });

  it('ogranicza preload do bieżącego i następnego kraju, a stare kraje wycofuje', () => {
    vi.stubGlobal('Image', FakeImage);
    const assets = new AssetLoader({
      baseUrl: '/', maxConcurrent: 1, profile: devicePerformanceProfile(3, 2),
    });
    assets.prime('BE', [{ country: 'BE' }, { country: 'DE' }, { country: 'PL' }], []);
    expect(FakeImage.requested[0].src).toBe('/assets/countries/be/be-sky.png');
    FakeImage.requested[0].succeed();
    expect(assets.getStats().decodedImages).toBe(1);
    assets.setVisibleCountries('DE');
    // Następne to DE i PL: BE jest usuwana po zakończeniu przenikania.
    expect(assets.getStats().decodedImages).toBe(0);
    expect(FakeImage.requested[0].src).toBe('');
    // Aktualnie ładowany drugi plik BE jest oznaczony jako wycofany.
    FakeImage.requested[1].succeed();
    expect(assets.getStats().decodedImages).toBe(0);
    expect(FakeImage.requested.some((image) => image.src.includes('/de/de-'))).toBe(true);
  });
});

describe('adaptacja FPS', () => {
  it('włącza oszczędność po trzech sekundach poniżej 45 fps', () => {
    const quality = new AdaptiveQuality();
    for (let ms = 0; ms <= 3_000; ms += 50) quality.sample(ms);
    expect(quality.fps).toBeCloseTo(20, 0);
    expect(quality.reduced).toBe(true);
    quality.setMode('off');
    expect(quality.reduced).toBe(false);
    quality.setMode('always');
    expect(quality.reduced).toBe(true);
  });

  it('odtwarza normalną jakość po 10 s stabilnych 55+ fps', () => {
    const quality = new AdaptiveQuality();
    for (let ms = 0; ms <= 3_000; ms += 50) quality.sample(ms);
    expect(quality.reduced).toBe(true);
    for (let ms = 3_016; ms <= 14_000; ms += 16) quality.sample(ms);
    expect(quality.reduced).toBe(false);
  });

  it('po drugim spadku FPS zostaje w trybie oszczędnym (bez cyklicznego mrugania jakości)', () => {
    const quality = new AdaptiveQuality();
    let ms = 0;
    const run = (until: number, step: number): void => { for (; ms <= until; ms += step) quality.sample(ms); };
    run(3_000, 50);
    expect(quality.reduced).toBe(true);
    run(14_000, 16);
    expect(quality.reduced).toBe(false);
    run(18_500, 50);
    expect(quality.reduced).toBe(true);
    run(40_000, 16);
    expect(quality.reduced).toBe(true);
    quality.setMode('auto');
    expect(quality.reduced).toBe(false);
  });

  it('ignoruje pauzę i nie uruchamia oszczędzania po powrocie z tła', () => {
    const quality = new AdaptiveQuality();
    quality.sample(0);
    quality.sample(1_100, false);
    quality.sample(60_000);
    expect(quality.reduced).toBe(false);
    expect(quality.fps).toBeNull();
  });
});
