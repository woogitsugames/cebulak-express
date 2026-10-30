import { afterEach, describe, expect, it, vi } from 'vitest';
import { isValidNickId, renderNick } from '../src/content/nicks';
import { garageNickChoices } from '../src/ui/garage';
import { getHeroSkin, normalizeHeroSkin, parseSkinLayout, setHeroSkin } from '../src/render/sprites';

const SAMPLE_MANIFEST = {
  id: 'pan-cebulek', scale: 3,
  hitbox: { anchorX: 144, anchorY: 106 },
  wheelCenters: { rear: { x: 80, y: 138 }, front: { x: 219, y: 138 } },
  layers: {
    body: { file: 'body.png', anchorX: 144, anchorY: 106 },
    wheel: { file: 'wheel.png', anchorX: 18, anchorY: 18 },
    'luggage-1': { file: 'luggage-1.png', anchorX: 144, anchorY: 106 },
  },
};

afterEach(() => { vi.unstubAllGlobals(); setHeroSkin('default'); });

describe('wybór skórki', () => {
  it('normalizuje uszkodzoną wartość z ustawień', () => {
    expect(normalizeHeroSkin('bus-kurierski')).toBe('bus-kurierski');
    expect(normalizeHeroSkin('niewiadoma')).toBe('default');
    expect(normalizeHeroSkin(null)).toBe('default');
    setHeroSkin('default');
    expect(getHeroSkin()).toBe('default');
  });

  it('odczytuje kotwice, koła i ścieżki ze skin.json', () => {
    const result = parseSkinLayout('pan-cebulek', SAMPLE_MANIFEST);
    expect(result?.anchor).toEqual({ x: 144, y: 106 });
    expect(result?.wheels).toEqual([{ x: 80, y: 138 }, { x: 219, y: 138 }]);
    expect(result?.layers.body?.path).toBe('assets/skins/pan-cebulek/body.png');
    expect(result?.layers.wheel?.anchor).toEqual({ x: 18, y: 18 });
  });

  it('blokuje path traversal i ignoruje brakującą warstwę', () => {
    const unsafe = structuredClone(SAMPLE_MANIFEST);
    unsafe.layers.body.file = '../../inny.png';
    expect(parseSkinLayout('pan-cebulek', unsafe)).toBeNull();
    expect(parseSkinLayout('pani-cebulka', SAMPLE_MANIFEST)).toBeNull();
    expect(parseSkinLayout('pan-cebulek', { ...SAMPLE_MANIFEST, scale: 2 })).toBeNull();
    const partial = structuredClone(SAMPLE_MANIFEST);
    partial.layers['luggage-1'].file = '/cokolwiek.png';
    expect(parseSkinLayout('pan-cebulek', partial)?.layers['luggage-1']).toBeUndefined();
  });

  it('rysuje domyślne kombi, gdy plik skórki lub manifest jest niedostępny', async () => {
    class FakeImage {
      decoding = '';
      complete = true;
      naturalWidth = 288;
      naturalHeight = 168;
      src = '';
    }
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    vi.resetModules();
    const { setHeroSkin: select, drawHeroSprite } = await import('../src/render/sprites');
    select('pani-cebulka');
    await Promise.resolve();
    await Promise.resolve();
    const ctx = {
      save: vi.fn(), restore: vi.fn(), translate: vi.fn(), rotate: vi.fn(),
      drawImage: vi.fn(),
    };
    const game = { phase: 'running', vy: 0, y: 300, distancePx: 0, weight: 0 };
    expect(drawHeroSprite(ctx as unknown as CanvasRenderingContext2D,
      game as unknown as Parameters<typeof drawHeroSprite>[1], 0)).toBe(true);
    expect(ctx.drawImage).toHaveBeenCalled();
    const images = ctx.drawImage.mock.calls.map((call) => call[0] as FakeImage);
    expect(images.some((img) => img.src.endsWith('/assets/hero/kombi-body.png'))).toBe(true);
    expect(images.some((img) => img.src.includes('/assets/skins/'))).toBe(false);
  });
});

describe('propozycje nicków do rankingu', () => {
  it('zwraca sześć poprawnych, unikalnych propozycji', () => {
    const ids = garageNickChoices(() => 0.123, 'BE', 'm');
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    ids.forEach((id) => {
      expect(isValidNickId(id)).toBe(true);
      expect(id).toContain('-g-m-');
      expect(renderNick(id).length).toBeGreaterThan(5);
    });
  });

  it('losuje inny zestaw nawet dla stałego generatora', () => {
    const first = garageNickChoices(() => 0, 'NL', 'f');
    const second = garageNickChoices(() => 0, 'NL', 'f', first);
    expect(second).toHaveLength(6);
    expect(second.every((id) => !first.includes(id))).toBe(true);
    expect(second.every((id) => id.includes('-g-f-'))).toBe(true);
  });

  it('przy ponownym wejściu zachowuje zapisany nick', () => {
    const oldNick = garageNickChoices(() => 0.1, 'DE', 'f')[0];
    const choices = garageNickChoices(() => 0.5, 'DE', 'f', [], oldNick);
    expect(choices).toHaveLength(6);
    expect(choices[0]).toBe(oldNick);
    expect(new Set(choices).size).toBe(6);
  });

  it('nie dopuszcza zapisanego nicku w innej formie gramatycznej', () => {
    const oldNick = garageNickChoices(() => 0.1, 'BE', 'm')[0];
    const result = garageNickChoices(() => 0.5, 'BE', 'f', [], oldNick);
    expect(result).not.toContain(oldNick);
  });
});
