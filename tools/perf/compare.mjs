#!/usr/bin/env node
/** Porównanie dwóch raportów tego samego narzędzia (bez sztucznych danych). */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const files = args.filter((value) => !value.startsWith('--'));
const outFlag = args.find((value) => value.startsWith('--out='));
if (files.length !== 2) {
  console.error('Użycie: node tools/perf/compare.mjs before.json after.json [--out=raport.md]');
  process.exit(2);
}
const [before, after] = await Promise.all(files.map(async (file) =>
  JSON.parse(await readFile(resolve(file), 'utf8'))));
const metrics = [
  ['Średni FPS', 'averageFps', 'fps', true],
  ['Najgorszy FPS (okno 1 s)', 'minWindowFps', 'fps', true],
  ['P95 czasu klatki', 'frameP95Ms', 'ms', false],
  ['Klatki >33 ms', 'longFramesOver33ms', '', false],
  ['Klatki >33 ms (%)', 'longFrameRatePct', '%', false],
  ['Szczyt pamięci JS', 'jsHeapPeakMiB', 'MiB', false],
  ['Dekodowane obrazy (aktywnie)', 'liveDecodedImages', '', false],
  ['Teoretyczne RGBA aktywnych grafik', 'estimatedRgbaMiB', 'MiB', false],
];
const format = (value) => value === null || value === undefined ? 'brak' : String(value);
const lines = [
  '# Pomiar wydajności — porównanie przed/po',
  '',
  '- Narzędzie: tools/perf/run.mjs (Playwright/Chromium, Pixel 7).',
  '- Scenariusz: ?test=1&seed=7, tryb łagodny, autopilot i restart po kolizji.',
  '- Czas jednego profilu: **' + before.durationSec + ' s**.',
  '- Przed: ' + (before.label || 'wersja bazowa') + '.',
  '- Po: ' + (after.label || 'wersja zmodyfikowana') + '.',
  '',
];
for (const cpu of [4, 6]) {
  const b = before.results.find((result) => result.cpuRate === cpu);
  const a = after.results.find((result) => result.cpuRate === cpu);
  if (!b || !a) throw new Error('Brakuje pomiaru CPU ' + cpu + 'x');
  lines.push('## CPU ' + cpu + '×', '', '| Miara | Przed | Po | Różnica |', '|---|---:|---:|---:|');
  for (const [title, key, unit, greaterIsBetter] of metrics) {
    const bv = b[key], av = a[key];
    const delta = typeof bv === 'number' && typeof av === 'number' ? av - bv : null;
    const deltaTxt = delta === null ? 'brak' :
      (delta > 0 ? '+' : '') + Number(delta.toFixed(2)) + (unit ? ' ' + unit : '');
    const sign = delta === null || delta === 0 ? '' :
      (delta > 0) === greaterIsBetter ? ' (lepiej)' : ' (gorzej)';
    lines.push('| ' + title + ' | ' + format(bv) + ' | ' + format(av) + ' | ' + deltaTxt + sign + ' |');
  }
  lines.push('', 'Błędy konsoli: przed ' + b.runtimeErrors.length +
    ', po ' + a.runtimeErrors.length + '.', '');
}
lines.push('## Ograniczenia interpretacji', '',
  '- Wyniki nie reprezentują fizycznego telefonu z 2–3 GB RAM; throttling CPU w Chromium to model porównawczy.',
  '- performance.memory nie obejmuje pamięci GPU ani pamięci procesów Android WebView.',
  '- Liczba dekodowanych obrazów jest przybliżeniem z WeakRef i zależy od garbage collectora.',
  '- Obciążenia środowiska CI wpływają na FPS. Porównuj na tym samym runnerze.',
  '');
const markdown = lines.join('\n');
if (outFlag) {
  const target = resolve(outFlag.slice('--out='.length));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, markdown, 'utf8');
  console.log('Raport: ' + target);
} else console.log(markdown);
