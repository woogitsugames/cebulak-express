import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSkinLayout } from '../src/render/sprites';

const CARS = [
  { id: 'mala-japonka', name: 'Mała Japonka', km: 500 },
  { id: 'kompakt-szwagra', name: 'Kompakt od szwagra', km: 1_500 },
  { id: 'dieselek-dziadka', name: 'Dieselek po dziadku', km: 3_000 },
  { id: 'pradziak-z-oslo', name: 'Prądziak z Oslo', km: 6_000 },
] as const;
const BASE = join(process.cwd(), 'public', 'assets', 'skins');
const LAYERS = [
  'body', 'wheel', 'crash', 'flame-1', 'flame-2',
  'luggage-1', 'luggage-2', 'luggage-3', 'luggage-4', 'portrait',
] as const;

type LayerName = (typeof LAYERS)[number];
type Manifest = {
  id: string;
  displayName: string;
  version: number;
  scale: number;
  canvas: { width: number; height: number };
  logicalVehicleSize: { width: number; height: number };
  hitbox: { width: number; height: number; anchorX: number; anchorY: number };
  wheelCenters: { rear: { x: number; y: number }; front: { x: number; y: number } };
  layers: Record<LayerName, { file: string; anchorX: number; anchorY: number }>;
  portrait: { file: string; width: number; height: number; anchorX: number; anchorY: number };
  drawOrder: string[];
};

function readManifest(id: string): Manifest {
  return JSON.parse(readFileSync(join(BASE, id, 'skin.json'), 'utf8')) as Manifest;
}

function assertPng(id: string, name: string, width: number, height: number): void {
  const bytes = readFileSync(join(BASE, id, name));
  const expectedSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(bytes.subarray(0, 8).equals(expectedSignature), `${id}/${name}: sygnatura PNG`).toBe(true);
  expect(bytes.toString('ascii', 12, 16), `${id}/${name}: IHDR`).toBe('IHDR');
  expect(bytes.readUInt32BE(16), `${id}/${name}: szerokość`).toBe(width);
  expect(bytes.readUInt32BE(20), `${id}/${name}: wysokość`).toBe(height);
  expect(bytes[24], `${id}/${name}: głębia 8-bit`).toBe(8);
  expect(bytes[25], `${id}/${name}: PNG RGBA z alfa`).toBe(6);
  expect(bytes.length, `${id}/${name}: niepusty plik`).toBeGreaterThan(150);
}

describe('zlecenie 73: cztery nowe skórki samochodów', () => {
  for (const car of CARS) {
    it(`${car.id}: manifest akceptowany przez parseSkinLayout i spójne kotwice`, () => {
      const raw = readManifest(car.id);
      expect(raw.id).toBe(car.id);
      expect(raw.displayName).toBe(car.name);
      expect(raw.version).toBe(1);
      expect(raw.scale).toBe(3);
      expect(raw.canvas).toEqual({ width: 288, height: 168 });
      expect(raw.logicalVehicleSize).toEqual({ width: 72, height: 44 });
      expect(raw.hitbox).toEqual({ width: 40, height: 20, anchorX: 144, anchorY: 106 });
      expect(raw.wheelCenters.rear.y).toBe(138);
      expect(raw.wheelCenters.front.y).toBe(138);
      expect(raw.wheelCenters.rear.x).toBeLessThan(raw.wheelCenters.front.x);
      expect(raw.wheelCenters.rear.x).toBeGreaterThan(60);
      expect(raw.wheelCenters.front.x).toBeLessThan(240);
      expect(raw.portrait).toEqual({ file: 'portrait.png', width: 384, height: 384, anchorX: 192, anchorY: 192 });
      expect(raw.drawOrder).toEqual([
        'flame-1|flame-2', 'body', 'wheel:rear', 'wheel:front',
        'luggage-1|luggage-2|luggage-3|luggage-4',
      ]);

      // Runda 72 ma dopisać identyfikatory do HERO_SKINS; rzutowanie wyłącznie w teście
      // pozwala sprawdzić rzeczywisty parser na main, bez edycji pliku koordynatora.
      const layout = parseSkinLayout(car.id as Parameters<typeof parseSkinLayout>[0], raw);
      expect(layout, `${car.id}: parser odrzucił manifest`).not.toBeNull();
      expect(layout?.id).toBe(car.id);
      expect(layout?.anchor).toEqual({ x: 144, y: 106 });
      expect(layout?.wheels).toEqual([raw.wheelCenters.rear, raw.wheelCenters.front]);
      for (const name of LAYERS) {
        const layer = raw.layers[name];
        expect(layer.file).toBe(name + '.png');
        const at = name === 'wheel' ? 18 : name === 'portrait' ? 192 : 144;
        const y = name === 'wheel' ? 18 : name === 'portrait' ? 192 : 106;
        expect([layer.anchorX, layer.anchorY]).toEqual([at, y]);
        if (name !== 'portrait') {
          expect(layout?.layers[name]?.path).toBe(`assets/skins/${car.id}/${name}.png`);
          expect(layout?.layers[name]?.anchor).toEqual({ x: at, y });
        }
      }
    });

    it(`${car.id}: komplet rzeczywistych plików PNG @3x`, () => {
      for (const name of LAYERS) {
        if (name === 'wheel') assertPng(car.id, 'wheel.png', 36, 36);
        else if (name === 'portrait') assertPng(car.id, 'portrait.png', 384, 384);
        else assertPng(car.id, name + '.png', 288, 168);
      }
    });
  }
});
