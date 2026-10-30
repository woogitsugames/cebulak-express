#!/usr/bin/env node
/**
 * Pomiar górnej krawędzi asfaltu w kafelkach drogi @3x.
 * Bez zewnętrznych zależności (dekodowanie PNG: node:zlib).
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

export const TARGET_ROAD_Y = 150;
export const ROAD_TOLERANCE = 3;
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

/** Rozkoduj PNG do bajtów RGBA: 8-bitowe RGB, RGBA lub paleta (bez interlace). */
export function readPngPixels(png) {
  if (!png.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error('Brak sygnatury PNG');
  let width, height, bitDepth, colorType, interlace;
  let palette = null, transparency = null;
  const chunks = [];
  for (let p = 8; p < png.length;) {
    const len = png.readUInt32BE(p);
    const name = png.toString('ascii', p + 4, p + 8);
    const data = png.subarray(p + 8, p + 8 + len);
    if (p + len + 12 > png.length) throw new Error(`Nieprawidłowy fragment ${name}`);
    if (name === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9]; interlace = data[12];
    } else if (name === 'PLTE') palette = data;
    else if (name === 'tRNS') transparency = data;
    else if (name === 'IDAT') chunks.push(data);
    if (name === 'IEND') break;
    p += len + 12;
  }
  if (!width || !height || bitDepth !== 8 || interlace !== 0 || ![2, 3, 6].includes(colorType)) {
    throw new Error(`Nieobsługiwany PNG ${width}x${height}, depth=${bitDepth}, color=${colorType}, interlace=${interlace}`);
  }
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const bytesPerRow = width * channels;
  const filtered = inflateSync(Buffer.concat(chunks));
  if (filtered.length !== (bytesPerRow + 1) * height) throw new Error('Niepoprawna długość danych obrazu');
  const rgba = new Uint8Array(width * height * 4);
  let previous = new Uint8Array(bytesPerRow), current = new Uint8Array(bytesPerRow);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    const filter = filtered[offset++];
    for (let x = 0; x < bytesPerRow; x++) {
      const left = x >= channels ? current[x - channels] : 0;
      const up = previous[x];
      const upperLeft = x >= channels ? previous[x - channels] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upperLeft;
        const a = Math.abs(p - left), b = Math.abs(p - up), c = Math.abs(p - upperLeft);
        predictor = a <= b && a <= c ? left : b <= c ? up : upperLeft;
      } else if (filter !== 0) throw new Error(`Nieznany filtr PNG: ${filter}`);
      current[x] = (filtered[offset++] + predictor) & 255;
    }
    for (let x = 0; x < width; x++) {
      const src = x * channels, dst = (y * width + x) * 4;
      if (colorType === 3) {
        const idx = current[src];
        if (!palette || 3 * idx + 2 >= palette.length) throw new Error('Nieprawidłowa paleta PNG');
        rgba[dst] = palette[idx * 3]; rgba[dst + 1] = palette[idx * 3 + 1]; rgba[dst + 2] = palette[idx * 3 + 2];
        rgba[dst + 3] = transparency?.[idx] ?? 255;
      } else {
        rgba[dst] = current[src]; rgba[dst + 1] = current[src + 1]; rgba[dst + 2] = current[src + 2];
        rgba[dst + 3] = colorType === 6 ? current[src + 3] : 255;
      }
    }
    [previous, current] = [current, previous];
  }
  return { width, height, rgba };
}

const luminance = (r, g, b) => r * 0.2126 + g * 0.7152 + b * 0.0722;

/**
 * Wiersz asfaltu to początek długiego ciemnego pasa z jednolitym spadkiem
 * jasności, a nie chwilowy ciemny kontur bariery lub przerwa między pasami.
 * Próbkujemy całą szerokość, aby oznaczenia poziome nie dominowały pomiaru.
 */
export function measureAsphaltEdge({ width, height, rgba }) {
  if (width < 60 || height < 100) throw new Error('Zbyt mały kafelek drogi');
  const dark = new Float64Array(height);
  const medianLum = new Float64Array(height);
  for (let y = 0; y < height; y++) {
    const values = [];
    let darkCount = 0, counted = 0;
    for (let x = 0; x < width; x += 9) {
      const p = 4 * (y * width + x);
      if (rgba[p + 3] < 220) continue;
      const lum = luminance(rgba[p], rgba[p + 1], rgba[p + 2]);
      values.push(lum);
      if (lum < 145) darkCount++;
      counted++;
    }
    if (!counted) {
      // Przezroczystość nad barierą nie jest asfaltem; pod obrazem widać tło.
      medianLum[y] = 255;
      dark[y] = 0;
      continue;
    }
    values.sort((a, b) => a - b);
    medianLum[y] = values[Math.floor(values.length / 2)];
    dark[y] = darkCount / counted;
  }

  const candidates = [];
  // Pierwsza krawędź asfaltu: przed linią rozdzielającą pasy i cieniowaniem
  // dolnej części drogi; nie traktujemy końca jasnych pasów jako początku asfaltu.
  for (let y = 35; y < Math.min(height - 65, Math.floor(height * 0.56)); y++) {
    if (dark[y] < 0.70) continue;
    const jump = Math.abs(medianLum[y] - medianLum[y - 1]);
    if (jump < 13) continue;
    let darkRows = 0;
    for (let k = 0; k < 48; k++) if (dark[y + k] > 0.63) darkRows++;
    if (darkRows < 43) continue;
    // Odrzuć kolejne pasy jezdni, które pojawiają się po długim asfalcie.
    let previousDark = 0;
    for (let k = y - 60; k <= y - 22; k++) if (k >= 0 && dark[k] > 0.70) previousDark++;
    if (previousDark > 34) continue;
    // Kontur bariery ma zwykle jeszcze jeden wyraźny skok koloru
    // kilkanaście pikseli niżej. Właściwy asfalt ma ciągłą tonację.
    let laterJumps = 0;
    for (let k = y + 2; k < y + 47; k++) {
      const diff = Math.abs(medianLum[k] - medianLum[k - 1]);
      if (diff > 15) laterJumps++;
    }
    candidates.push({ edge: y, jump, laterJumps, previousDark });
  }
  if (!candidates.length) throw new Error('Nie rozpoznano długiego, ciemnego pasa asfaltu');
  candidates.sort((a, b) => a.laterJumps - b.laterJumps
    || a.previousDark - b.previousDark || b.jump - a.jump);
  const best = candidates[0];
  return { edge: best.edge, roadLuminance: Math.round(medianLum[best.edge]), confidence: Number((1 / (1 + best.laterJumps)).toFixed(2)) };
}

export async function measureRoadFile(path) {
  const pixels = readPngPixels(await readFile(path));
  return { path, width: pixels.width, height: pixels.height, ...measureAsphaltEdge(pixels) };
}

export async function findRoadFiles(root) {
  const result = [];
  for (const dirent of await readdir(root, {withFileTypes: true})) {
    if (!dirent.isDirectory()) continue;
    for (const file of await readdir(join(root, dirent.name))) {
      if (file.endsWith('.png') && /-road(?:-[a-z0-9-]+)?\.png$/.test(file)) result.push(join(root, dirent.name, file));
    }
  }
  return result.sort();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(process.argv.find((arg, i) => i > 1 && !arg.startsWith('--')) ?? 'public/assets/countries');
  const jsonOutput = process.argv.includes('--json');
  const paths = await findRoadFiles(root);
  if (!paths.length) { console.error(`Brak plików dróg w ${root}`);process.exitCode=1; }
  if (!jsonOutput) {
    console.log('Kraj | Plik | Wymiary | Początek asfaltu | Odchylenie | Status');
    console.log('--- | --- | --- | ---: | ---: | ---');
  }
  let hasErrors = false;
  const output=[];
  for (const path of paths) {
    try {
      const x = await measureRoadFile(path);
      const delta = x.edge - TARGET_ROAD_Y;
      const ok = x.width === 1080 && x.height === 330 && Math.abs(delta) <= ROAD_TOLERANCE;
      if (!ok) hasErrors = true;
      output.push({...x,path:relative(process.cwd(),path),delta,ok});
      if (!jsonOutput) console.log(`${path.split('/').at(-2)} | ${path.split('/').at(-1)} | ${x.width}x${x.height} | ${x.edge} | ${delta>0?'+':''}${delta} | ${ok?'OK':'BŁĄD'}`);
    } catch(e) { hasErrors = true; output.push({ path: relative(process.cwd(), path), error: e.message, ok: false }); if (!jsonOutput) console.log(`${path} | BŁĄD: ${e.message}`); }
  }
  if (jsonOutput) console.log(JSON.stringify({ target: TARGET_ROAD_Y, tolerance: ROAD_TOLERANCE, roads: output }, null, 2));
  if (hasErrors) process.exitCode = 1;
}
