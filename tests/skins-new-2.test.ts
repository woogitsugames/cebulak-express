import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSkinLayout } from '../src/render/sprites';

const SKINS = [
  { id: 'furgonetka-pl', name: 'Furgonetka \u201ePL\u2013BE\u2013NL\u201d', unlockKm: 10_000 },
  { id: 'kamper-wakacje', name: 'Kamper na wakacje', unlockKm: 20_000 },
  { id: 'kombi-prezesa', name: 'Kombi prezesa', unlockKm: 40_000 },
] as const;

const VEHICLE_LAYERS = [
  'body', 'crash', 'flame-1', 'flame-2',
  'luggage-1', 'luggage-2', 'luggage-3', 'luggage-4',
] as const;

function spritePath(id: string, file: string): string {
  return join(process.cwd(), 'public', 'assets', 'skins', id, file);
}

function pngDimensions(data: Uint8Array): { width: number; height: number; colorType: number } {
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  expect([...data.subarray(0, 8)]).toEqual(pngSignature);
  const buffer = Buffer.from(data);
  expect(buffer.toString('ascii', 12, 16)).toBe('IHDR');
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    colorType: buffer[25],
  };
}

describe('zlecenie 74: trzy kompletne skorki samochodow', () => {
  for (const { id, name, unlockKm } of SKINS) {
    it(`${id}: manifest parsowany przez parseSkinLayout`, () => {
      const manifest = JSON.parse(readFileSync(spritePath(id, 'skin.json'), 'utf8'));
      expect(manifest.id).toBe(id);
      expect(manifest.displayName).toBe(name);
      expect(manifest.unlockKm).toBe(unlockKm);
      expect(manifest.scale).toBe(3);
      expect(manifest.canvas).toEqual({ width: 288, height: 168 });
      expect(manifest.hitbox).toEqual({ width: 40, height: 20, anchorX: 144, anchorY: 106 });
      // Nowe id rejestruje koordynator w HERO_SKINS; parser jest testowany niezaleznie.
      const layout = parseSkinLayout(id as Parameters<typeof parseSkinLayout>[0], manifest);
      expect(layout).not.toBeNull();
      expect(layout?.id).toBe(id);
      expect(layout?.anchor).toEqual({ x: 144, y: 106 });
      expect(layout?.wheels).toEqual([{ x: 80, y: 138 }, { x: 219, y: 138 }]);
      expect(manifest.drawOrder).toEqual([
        'flame-1|flame-2', 'body', 'wheel:rear', 'wheel:front',
        'luggage-1|luggage-2|luggage-3|luggage-4',
      ]);
      for (const layer of [...VEHICLE_LAYERS, 'wheel', 'portrait']) {
        if (layer !== 'portrait') expect(layout?.layers[layer as keyof NonNullable<typeof layout>["layers"]]).toBeDefined();
        expect(manifest.layers[layer].file).toBe(`${layer}.png`);
        expect(manifest.layers[layer].anchorX).toBe(layer === 'wheel' ? 18 : layer === 'portrait' ? 192 : 144);
        expect(manifest.layers[layer].anchorY).toBe(layer === 'wheel' ? 18 : layer === 'portrait' ? 192 : 106);
      }
    });

    it(`${id}: pliki PNG @3x, alfa, wymiary i niezalezne nakladki`, () => {
      const all = [...VEHICLE_LAYERS, 'wheel', 'portrait'] as const;
      for (const layer of all) {
        const file = spritePath(id, `${layer}.png`);
        const bytes = readFileSync(file);
        expect(statSync(file).size).toBeGreaterThan(200);
        const expected = layer === 'wheel' ? [36, 36] : layer === 'portrait' ? [384, 384] : [288, 168];
        const { width, height, colorType } = pngDimensions(bytes);
        expect([width, height]).toEqual(expected);
        expect(colorType).toBe(6); // Truecolour + alpha, przezroczystosc warstw.
      }
    });
  }
});
