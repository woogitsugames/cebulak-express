import { mkdir, readFile, readdir, rm, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const FIELDS = {
  'Nazwa': ['title.txt', 30],
  'Krótki opis': ['short_description.txt', 80],
  'Pełny opis': ['full_description.txt', 4000],
  '„Co nowego”': ['changelog', 500],
};

export function extractListingFields(markdown) {
  const sections = markdown.split(/^###\s+/m).slice(1);
  const data = {};
  const tick = String.fromCharCode(96).repeat(3);
  const fence = '(?:' + tick + '|~~~)';
  const fencePattern = new RegExp(fence + 'text\\s*\\r?\\n([\\s\\S]*?)\\r?\\n' + fence);
  for (const [heading, [fileName, limit]] of Object.entries(FIELDS)) {
    const section = sections.find((value) => value.startsWith(heading));
    const match = section?.match(fencePattern);
    if (!match) throw new Error('Brakuje pola sklepu: ' + heading);
    const value = match[1].trim();
    const count = [...value].length;
    if (count < 1 || count > limit) {
      throw new Error('Pole ' + heading + ' ma ' + count + ' znaków, limit ' + limit);
    }
    data[fileName] = value + '\n';
  }
  return data;
}

export function validateScreenshotHeader(header, filename) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (header.length < 26 || !header.subarray(0, 8).equals(signature) ||
      header.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error('Nieprawidłowy nagłówek PNG: ' + filename);
  }
  const width = header.readUInt32BE(16);
  const height = header.readUInt32BE(20);
  const depth = header[24];
  const type = header[25];
  if (width !== 1080 || height !== 1920 || depth !== 8 || type !== 2) {
    throw new Error('Zrzut musi być PNG 1080x1920 RGB 8-bit, bez alfa: ' + filename);
  }
}

async function listScreenshots(root) {
  const store = join(root, 'public/assets/store');
  const all = await readdir(store);
  const pngs = all.filter((name) => name.endsWith('.png')).sort();
  if (pngs.length > 8) throw new Error('Google Play dopuszcza maksymalnie 8 zrzutów telefonu.');
  for (const name of pngs) {
    if (!/^\d{2}-[a-z0-9-]+\.png$/.test(name)) {
      throw new Error('Niedozwolona nazwa zrzutu: ' + name);
    }
    const bytes = await readFile(join(store, name));
    validateScreenshotHeader(bytes.subarray(0, 26), name);
  }
  return pngs;
}

export async function preparePlayMetadata({ root = ROOT, outDir, requireScreenshots = false }) {
  if (!outDir) throw new Error('Podaj --out z docelowym katalogiem tymczasowym.');
  const output = resolve(outDir);
  if (output === resolve(root) || output === dirname(output)) {
    throw new Error('Niedozwolony katalog wyjściowy.');
  }

  const versionFile = await readFile(join(root, 'android/version.properties'), 'utf8');
  const codeMatch = /^versionCode=(\d+)$/m.exec(versionFile);
  if (!codeMatch) throw new Error('Najpierw uruchom scripts/android-version.mjs.');
  const versionCode = codeMatch[1];
  const screenshots = await listScreenshots(root);
  if (requireScreenshots && screenshots.length < 2) {
    throw new Error('Brak minimum 2 autentycznych zrzutów w public/assets/store/. Publikacja zablokowana.');
  }
  if (!requireScreenshots && screenshots.length < 2) {
    console.warn('::notice::Brak minimum 2 zrzutów - metadane tylko do podglądu, bez publikacji.');
  }

  const locales = [['pl-PL', 'opis-pl.md'], ['en-US', 'opis-en.md']];
  for (const [locale, markdownFile] of locales) {
    const content = await readFile(join(root, 'docs/sklep', markdownFile), 'utf8');
    const fields = extractListingFields(content);
    const localePath = join(output, locale);
    await rm(localePath, { recursive: true, force: true });
    await mkdir(join(localePath, 'changelogs'), { recursive: true });
    for (const [fileName, value] of Object.entries(fields)) {
      const path = fileName === 'changelog'
        ? join(localePath, 'changelogs', versionCode + '.txt')
        : join(localePath, fileName);
      await writeFile(path, value, 'utf8');
    }
    if (screenshots.length) {
      const imagePath = join(localePath, 'images/phoneScreenshots');
      await mkdir(imagePath, { recursive: true });
      for (const screenshot of screenshots) {
        await copyFile(join(root, 'public/assets/store', screenshot), join(imagePath, screenshot));
      }
    }
  }

  return { output, versionCode, screenshots: screenshots.length, locales: locales.map(([id]) => id) };
}

async function main() {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf('--out');
  if (outIndex < 0 || !args[outIndex + 1]) {
    throw new Error('Użycie: node scripts/prepare-play-metadata.mjs --out <katalog> [--require-screenshots]');
  }
  const summary = await preparePlayMetadata({
    outDir: args[outIndex + 1],
    requireScreenshots: args.includes('--require-screenshots'),
  });
  console.log('Metadane Google Play: ' + JSON.stringify(summary));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  });
}
