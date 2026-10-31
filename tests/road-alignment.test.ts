import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

interface RoadMeasurement {
  path: string;
  width?: number;
  height?: number;
  edge?: number;
  delta?: number;
  ok: boolean;
  error?: string;
}

interface Report {
  target: number;
  tolerance: number;
  roads: RoadMeasurement[];
}

const COUNTRIES = ['at', 'be', 'ch', 'cz', 'de', 'dk', 'es', 'fi', 'fr', 'ie', 'it', 'lu', 'nl', 'no', 'pl', 'se', 'uk', 'ee', 'lv', 'lt'];
const countryRoot = join(process.cwd(), 'public', 'assets', 'countries');

function filesOnDisk(): string[] {
  return COUNTRIES.flatMap((cc) => readdirSync(join(countryRoot, cc))
    .filter((name) => new RegExp(`^${cc}-road(?:-[a-z0-9-]+)?\\.png$`).test(name))
    .map((name) => `public/assets/countries/${cc}/${name}`))
    .sort();
}

function runMeasurement(): { report: Report; exitCode: number | null } {
  const result = spawnSync(process.execPath, ['tools/art/measure-road.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: 30_000,
  });
  if (result.error) throw result.error;
  if (!result.stdout) throw new Error(`Brak raportu pomiarowego: ${result.stderr}`);
  return { report: JSON.parse(result.stdout) as Report, exitCode: result.status };
}

describe('Krawędź asfaltu: wszystkie kraje i warianty drogi', () => {
  it('wykrywa po jednym podstawowym kafelku dla każdego z 10 krajów', () => {
    const files = filesOnDisk();
    for (const cc of COUNTRIES) {
      expect(files, `Brakuje drogi w kraju ${cc}`).toContain(`public/assets/countries/${cc}/${cc}-road.png`);
    }
  });

  it('asfalt zaczyna się w wierszu 150 ±3 na każdym kafelku @3x', () => {
    const { report, exitCode } = runMeasurement();
    expect(report.target).toBe(150);
    expect(report.tolerance).toBe(3);
    const files = filesOnDisk();
    expect(report.roads.map((road) => road.path).sort()).toEqual(files);
    expect(report.roads.length).toBeGreaterThanOrEqual(10);
    for (const road of report.roads) {
      expect(road.error, `Błąd pomiaru ${road.path}`).toBeUndefined();
      expect([road.width, road.height], `Wymiary ${road.path}`).toEqual([1080, 330]);
      expect(road.edge, `Krawędź asfaltu ${road.path}`).toBeGreaterThanOrEqual(147);
      expect(road.edge, `Krawędź asfaltu ${road.path}`).toBeLessThanOrEqual(153);
      expect(road.ok, `Zły plik drogi: ${road.path}`).toBe(true);
    }
    expect(exitCode).toBe(0);
  });
});
