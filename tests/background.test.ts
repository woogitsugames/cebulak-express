import { describe, expect, it, vi } from 'vitest';
import { KM_PER_PX, WORLD } from '../src/core/config';
import type { Waypoint } from '../src/content/waypoints';
import { ASSET_SIZES, type AssetLoader, type BackgroundLayer } from '../src/render/assets';
import {
  BackgroundRenderer, PARALLAX, LAYER_Y, COUNTRY_FADE_SECONDS, WAYPOINT_FADE_SECONDS,
  borderNearOpacity, crossedWaypoints, fadeProgress, layerOffset,
  farLayerAlphaAt, FAR_FADE_INSET, FAR_FADE_RAMP, LANDMARK_FAR_HEIGHT, LANDMARK_FAR_WIDTH,
  selectNearestWaypoint, tilePositions, visibleWaypoints, waypointScreenX,
} from '../src/render/background';
import type { BackgroundState } from '../src/render/background';

const waypoints: Waypoint[] = [
  { id: 'start', name: 'Start', km: 0, country: 'BE', kind: 'city', motifs: [], text: '' },
  { id: 'leuven', name: 'Leuven', km: 28, country: 'BE', kind: 'city', motifs: [], text: '' },
  { id: 'granica', name: 'Granica', km: 45, country: 'DE', kind: 'border', motifs: [], text: '' },
  { id: 'miasto', name: 'Miasto', km: 70, country: 'DE', kind: 'city', motifs: [], text: '' },
];

const nearby: Waypoint[] = [
  { id: 'frankfurt', name: 'Frankfurt', km: 105, country: 'DE', kind: 'city', motifs: [], text: '' },
  { id: 'granica-swiecko', name: 'Granica', km: 115, country: 'PL', kind: 'border', motifs: [], text: '' },
  { id: 'stacja-swiecko', name: 'Stacja', km: 123, country: 'PL', kind: 'rest', motifs: [], text: '' },
];

function fakeCanvas() {
  return {
    drawImage: vi.fn(), fillRect: vi.fn(), save: vi.fn(), restore: vi.fn(),
    beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(),
    fill: vi.fn(), arc: vi.fn(), createLinearGradient: vi.fn(), rect: vi.fn(), clip: vi.fn(),
    globalAlpha: 1, fillStyle: '',
  };
}

function mockAssets() {
  const layers = {
    sky: { naturalWidth: 1080, naturalHeight: 1920 },
    clouds: { naturalWidth: 2160, naturalHeight: 600 },
    far: { naturalWidth: 2160, naturalHeight: 900 },
    near: { naturalWidth: 2160, naturalHeight: 720 },
    road: { naturalWidth: 1080, naturalHeight: 330 },
  };
  const landmarks = new Map<string, { naturalWidth: number; naturalHeight: number }>();
  for (const point of nearby) landmarks.set(point.id, { naturalWidth: 1620, naturalHeight: 900 });
  const assets = {
    prime: vi.fn(),
    getCountryLayer: vi.fn((_country: string, layer: BackgroundLayer) => layers[layer]),
    getLandmark: vi.fn((point: Waypoint) => landmarks.get(point.id)),
    getBorderNear: vi.fn(() => undefined),
  };
  return { layers, assets, loader: assets as unknown as AssetLoader, landmarks };
}

describe('tło: matematyka i polityka panoram', () => {
  it('przesunięcia paralaksy odpowiadają współczynnikom', () => {
    expect(PARALLAX).toEqual({ sky: 0, clouds: 0.15, far: 0.25, near: 0.5, road: 1 });
    for (const factor of Object.values(PARALLAX)) {
      expect(layerOffset(100, factor, 720)).toBeCloseTo(100 * factor);
    }
    expect(layerOffset(-10, 1, 360)).toBe(350);
    expect(layerOffset(1440, 0.5, 720)).toBe(0);
  });

  it('kafelki wypełniają ekran również na granicy powtórzenia', () => {
    for (const distance of [0, 1, 360, 720, 123_456, -25]) {
      const positions = tilePositions(distance, PARALLAX.road, 360);
      expect(positions.length).toBeGreaterThanOrEqual(1);
      expect(positions[0]).toBeLessThanOrEqual(0);
      for (let i = 1; i < positions.length; i++) expect(positions[i] - positions[i - 1]).toBe(360);
      expect(positions.at(-1)! + 360).toBeGreaterThanOrEqual(WORLD.width);
    }
    expect(tilePositions(10, 0.25, 0)).toEqual([]);
  });

  it('sylwetka trafia w środek ekranu dokładnie przy swoim km', () => {
    for (const point of waypoints) expect(waypointScreenX(point.km, point.km)).toBe(WORLD.width / 2);
    expect(waypointScreenX(28, 27)).toBeCloseTo(WORLD.width / 2 + PARALLAX.far / KM_PER_PX);
    expect(waypointScreenX(28, 29)).toBeLessThan(WORLD.width / 2);
    expect(visibleWaypoints(waypoints, 28).map((point) => point.id)).toContain('leuven');
    expect(visibleWaypoints(waypoints, 500)).toEqual([]);
  });

  it('wydarzenia obejmują wszystkie przekroczone punkty, ale nie duplikują progów', () => {
    expect(crossedWaypoints(waypoints, 0, 28).map((point) => point.id)).toEqual(['leuven']);
    expect(crossedWaypoints(waypoints, 28, 28)).toEqual([]);
    expect(crossedWaypoints(waypoints, 28, 80).map((point) => point.id)).toEqual(['granica', 'miasto']);
    expect(crossedWaypoints(waypoints, 45, 0)).toEqual([]);
  });

  it('najbliższy punkt: border/stacja 8 km od siebie nie są rysowane stale razem', () => {
    expect(selectNearestWaypoint(nearby, 105)?.id).toBe('frankfurt');
    expect(selectNearestWaypoint(nearby, 118)?.id).toBe('granica-swiecko');
    expect(selectNearestWaypoint(nearby, 119)?.id).toBe('granica-swiecko'); // remis 4 km
    expect(selectNearestWaypoint(nearby, 120)?.id).toBe('stacja-swiecko');
    expect(selectNearestWaypoint([], 10)).toBeNull();
    expect(selectNearestWaypoint(nearby, Number.NaN)).toBeNull();
    // Mimo większej różnicy kilometrów far może być bliżej środka ekranu.
    const mixed: Waypoint[] = [
      { id: 'far', name: 'Miasto', km: 0, country: 'DE', kind: 'city', motifs: [], text: '' },
      { id: 'near', name: 'Znak', km: 16, country: 'DE', kind: 'border', motifs: [], text: '' },
    ];
    expect(selectNearestWaypoint(mixed, 10)?.id).toBe('far');
  });

  it('przenikanie kraju trwa 1,5 s, panoram 0,4 s', () => {
    expect(COUNTRY_FADE_SECONDS).toBe(1.5);
    expect(WAYPOINT_FADE_SECONDS).toBe(0.4);
    expect(fadeProgress(1, 2)).toBe(0);
    expect(fadeProgress(2.75, 2)).toBe(0.5);
    expect(fadeProgress(3.5, 2)).toBe(1);
    expect(fadeProgress(10.2, 10, WAYPOINT_FADE_SECONDS)).toBeCloseTo(0.5);
    expect(fadeProgress(2, 2, 0)).toBe(1);
  });

  it('near granicy włącza się płynnie na odcinku border -> rest', () => {
    expect(borderNearOpacity(95, 115, 123)).toBe(0);
    expect(borderNearOpacity(97, 115, 123)).toBe(0);
    expect(borderNearOpacity(100, 115, 123)).toBeCloseTo(0.5);
    expect(borderNearOpacity(105, 115, 123)).toBe(1);
    expect(borderNearOpacity(130, 115, 123)).toBe(1);
    expect(borderNearOpacity(141, 115, 123)).toBe(0);
    expect(borderNearOpacity(110, Number.NaN, Number.NaN)).toBe(0);
  });
});

describe('renderer warstw: docelowe współrzędne i pasy', () => {
  it('warstwy trafiają w stałe y, asfalt jest zgodny z kolizją', () => {
    expect(LAYER_Y).toEqual({ sky: 0, clouds: 110, far: 255, near: 418, road: 530 });
    expect(LAYER_Y.road + 50).toBe(WORLD.groundY);
    const { layers, loader } = mockAssets();
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    const state: BackgroundState = {
      country: 'BE', distancePx: 0, progressKm: 0,
      waypoints: [], timeSec: 0,
    };
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, state);
    expect(c.drawImage.mock.calls.some((args) =>
      args[0] === layers.sky && args.length === 5 && args[2] === LAYER_Y.sky)).toBe(true);
    for (const layer of ['clouds', 'far', 'near', 'road'] as const) {
      // Warstwy są przycinane do dolnej krawędzi świata (640), żeby nie zasłaniały pasa pod drogą.
      const visible = Math.min(ASSET_SIZES[layer].height, WORLD.height - LAYER_Y[layer]);
      expect(c.drawImage.mock.calls.some((args) =>
        args[0] === layers[layer] && args.length === 9 &&
        args[6] === LAYER_Y[layer] &&
        args[7] === ASSET_SIZES[layer].width &&
        args[8] === visible)).toBe(true);
    }
  });

  it('nad i pod światem próbkuje wiersze źródłowych sky/road, nie kolor tła', () => {
    const { layers, loader } = mockAssets();
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    renderer.drawOutsideWorld(c as unknown as CanvasRenderingContext2D, 'BE', 0, 0, -70, 710);
    expect(c.drawImage.mock.calls).toContainEqual([
      layers.sky, 0, 0, 1080, 3, 0, -70, WORLD.width, 70,
    ]);
    const roadSample = c.drawImage.mock.calls.find((args) => args[0] === layers.road);
    expect(roadSample?.slice(1, 5)).toEqual([0, 327, 1080, 3]);
    expect(roadSample?.[5]).toBeCloseTo(0); // Canvas może zwrócić -0 przy modulo
    expect(roadSample?.slice(6)).toEqual([WORLD.height, WORLD.width, 70]);
  });

  it('po zmianie punktu rysuje tylko poprzedni i nowy, oba na near', () => {
    const { assets, loader, landmarks } = mockAssets();
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    const state: BackgroundState = {
      country: 'PL', distancePx: 0, progressKm: 118,
      waypoints: nearby, timeSec: 5, includeRoad: false, season: 'winter',
    };
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, state);
    expect(c.drawImage.mock.calls.filter((args) => args[0] === landmarks.get('granica-swiecko'))).toHaveLength(1);
    expect(c.drawImage.mock.calls.filter((args) => args[0] === landmarks.get('stacja-swiecko'))).toHaveLength(0);
    expect(assets.getBorderNear).not.toHaveBeenCalled(); // brak zimowego wariantu tej panoramy

    // Zmiana punktu rozpoczyna fade z alfą nowego punktu równą 0.
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, { ...state, progressKm: 120, timeSec: 5.2 });
    c.drawImage.mockClear();
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, { ...state, progressKm: 120, timeSec: 5.4 });
    const borders = c.drawImage.mock.calls.filter((args) => args[0] === landmarks.get('granica-swiecko'));
    const rests = c.drawImage.mock.calls.filter((args) => args[0] === landmarks.get('stacja-swiecko'));
    expect(borders).toHaveLength(1);
    expect(rests).toHaveLength(1);
    expect(borders[0][3]).toBe(180); // near, nie panorama far 330
    expect(rests[0][2]).toBe(WORLD.groundY - 100);
    expect(assets.prime).toHaveBeenCalledTimes(1);
  });
});

describe('panorama miasta (D14): rozmiar i wygaszanie warstwy far', () => {
  it('panorama jest większa, zachowuje proporcje 1620:900 i mieści się pod HUD', () => {
    expect(LANDMARK_FAR_WIDTH).toBe(480);
    expect(LANDMARK_FAR_HEIGHT).toBe(267);
    expect(LANDMARK_FAR_WIDTH / LANDMARK_FAR_HEIGHT).toBeCloseTo(1620 / 900, 1);
    const top = LAYER_Y.far + ASSET_SIZES.far.height - LANDMARK_FAR_HEIGHT;
    expect(top).toBeGreaterThan(250); // HUD i dymki kończą się wyżej
  });

  it('far znika za panoramą i płynnie wraca poza nią', () => {
    const c = 180;
    const core = LANDMARK_FAR_WIDTH / 2 - FAR_FADE_INSET;
    expect(farLayerAlphaAt(c, c, 1)).toBe(0);
    expect(farLayerAlphaAt(c + core, c, 1)).toBe(0);
    expect(farLayerAlphaAt(c - core - FAR_FADE_RAMP / 2, c, 1)).toBeCloseTo(0.5);
    expect(farLayerAlphaAt(c + core + FAR_FADE_RAMP, c, 1)).toBe(1);
    expect(farLayerAlphaAt(c + 2000, c, 1)).toBe(1);
    // Monotonicznie rośnie z odległością od środka, symetrycznie.
    let previous = -1;
    for (let d = 0; d <= core + FAR_FADE_RAMP + 10; d += 5) {
      const a = farLayerAlphaAt(c + d, c, 1);
      expect(a).toBeGreaterThanOrEqual(previous);
      expect(a).toBeCloseTo(farLayerAlphaAt(c - d, c, 1));
      previous = a;
    }
  });

  it('siła wygaszenia idzie za fade panoramy; brak panoramy = far bez zmian', () => {
    expect(farLayerAlphaAt(180, 180, 0)).toBe(1);
    expect(farLayerAlphaAt(180, 180, 0.25)).toBeCloseTo(0.75);
    expect(farLayerAlphaAt(180, 180, 2)).toBe(0);
    expect(farLayerAlphaAt(180, Number.NaN, 1)).toBe(1);
    expect(farLayerAlphaAt(Number.NaN, 180, 1)).toBe(1);
  });

  const cityOnly = nearby.slice(0, 1);
  function cityState(progressKm: number): BackgroundState {
    return { country: 'DE', distancePx: 0, progressKm, waypoints: cityOnly, timeSec: 1, includeRoad: false };
  }

  it('przy widocznej panoramie far rysujemy pasami z obcinaniem, bez fragmentu w środku', () => {
    const { layers, loader, landmarks } = mockAssets();
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, cityState(105));
    const panorama = c.drawImage.mock.calls.find((args) => args[0] === landmarks.get('frankfurt'));
    expect(panorama?.slice(3)).toEqual([LANDMARK_FAR_WIDTH, LANDMARK_FAR_HEIGHT]);
    expect(panorama?.[2]).toBe(LAYER_Y.far + ASSET_SIZES.far.height - LANDMARK_FAR_HEIGHT);
    // Panorama szersza niż ekran: cały widok 360 to rdzeń wygaszenia — far nie jest rysowany.
    expect(c.drawImage.mock.calls.filter((args) => args[0] === layers.far)).toHaveLength(0);
  });

  it('panorama na skraju: far pojawia się tylko po drugiej stronie, w obciętych pasach', () => {
    const { layers, loader } = mockAssets();
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    // 30 km za Frankfurtem: środek panoramy przy x = 180 - 150 = 30.
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, cityState(135));
    const farCalls = c.drawImage.mock.calls.filter((args) => args[0] === layers.far);
    expect(farCalls.length).toBeGreaterThan(0);
    const rects = c.rect.mock.calls;
    expect(rects.length).toBeGreaterThan(1);
    const x = 180 - (135 - 105) / KM_PER_PX * PARALLAX.far;
    const core = LANDMARK_FAR_WIDTH / 2 - FAR_FADE_INSET;
    for (const [left, top, width] of rects) {
      expect(top).toBe(LAYER_Y.far);
      expect(left + width).toBeGreaterThan(x + core); // nic nad rdzeniem panoramy
    }
    // Ostatni pas sięga prawej krawędzi ekranu.
    expect(Math.max(...rects.map(([left, , width]) => left + width))).toBe(WORLD.width);
  });

  it('pasy wygaszenia jadą razem z panoramą: krycie pasa nie skacze przy płynnym przesuwie', () => {
    const strips = (progressKm: number, mode: 'off' | 'always') => {
      const { loader } = mockAssets();
      const c = fakeCanvas();
      const seen: [number, number][] = [];
      c.rect.mockImplementation((left: number) => { seen.push([left, c.globalAlpha]); });
      const renderer = new BackgroundRenderer(loader);
      renderer.setPerformanceMode(mode);
      renderer.drawBackground(c as unknown as CanvasRenderingContext2D, cityState(progressKm));
      const x = 180 - (progressKm - 105) / KM_PER_PX * PARALLAX.far;
      // Pozycje pasów względem środka panoramy (pomijamy pierwszy, przycięty krawędzią ekranu).
      return seen.slice(1).map(([left, alpha]) => [+(left - x).toFixed(6), +alpha.toFixed(6)]);
    };
    for (const mode of ['off', 'always'] as const) {
      // 0,013 km ≈ 0,065 px świata przesuwu panoramy — mniej niż jedna klatka jazdy.
      expect(strips(135.013, mode)).toEqual(strips(135, mode));
    }
  });

  it('bez wczytanego PNG panoramy far rysujemy normalnie (zastępcza sylwetka jest mała)', () => {
    const { layers, loader, landmarks } = mockAssets();
    landmarks.delete('frankfurt');
    const c = fakeCanvas();
    const renderer = new BackgroundRenderer(loader);
    renderer.drawBackground(c as unknown as CanvasRenderingContext2D, cityState(105));
    expect(c.rect).not.toHaveBeenCalled();
    expect(c.drawImage.mock.calls.filter((args) => args[0] === layers.far).length).toBeGreaterThan(0);
  });

  it('tryb oszczędny używa szerszych (mniej licznych) pasów', () => {
    const count = (mode: 'off' | 'always') => {
      const { loader } = mockAssets();
      const c = fakeCanvas();
      const renderer = new BackgroundRenderer(loader);
      renderer.setPerformanceMode(mode);
      renderer.drawBackground(c as unknown as CanvasRenderingContext2D, cityState(135));
      return c.rect.mock.calls.length;
    };
    expect(count('always')).toBeLessThan(count('off'));
    expect(count('always')).toBeGreaterThan(0);
  });
});
