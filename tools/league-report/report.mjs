#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COUNTRIES, lastClosedWarsawWeek, mockLeague, normalizeLeague, parseWeek, previousWeek } from './data.mjs';
import { buildPostsMarkdown, postHtml, reelHtml } from './render.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const defaultDir = join(ROOT, 'out');

function usage() {
  return 'Użycie: npm run report:league -- [--week=2026-W50] [--mock] [--url=https://adres-gry] [--out-dir=out]\n' +
    'Bez --week: ostatni zakończony tydzień ISO w strefie Europe/Warsaw.\n' +
    'Tryb prawdziwy wymaga FIREBASE_SERVICE_ACCOUNT i LEAGUE_GAME_URL lub --url.\n';
}

export function parseArgs(argv) {
  const args = { week: null, mock: false, url: null, outDir: defaultDir, help: false };
  const options = new Set(['week', 'url', 'out-dir']);
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (item === '--mock') { args.mock = true; continue; }
    if (item === '--help' || item === '-h') { args.help = true; continue; }
    const match = /^--([a-z-]+)(?:=(.*))?$/.exec(item);
    if (!match || !options.has(match[1])) throw new Error(`Nieznany argument: ${item}`);
    const value = match[2] ?? argv[++i];
    if (!value || value.startsWith('--')) throw new Error(`Brak wartości --${match[1]}.`);
    if (match[1] === 'week') args.week = value;
    if (match[1] === 'url') args.url = value;
    if (match[1] === 'out-dir') args.outDir = resolve(value);
  }
  if (!args.help) {
    args.week ??= lastClosedWarsawWeek();
    parseWeek(args.week);
  }
  return args;
}

function checkedGameUrl(value, mock) {
  const text = (value ?? '').trim();
  if (!text && mock) return '[LINK_GRA]';
  if (!text) throw new Error('Brak publicznego adresu gry: ustaw LEAGUE_GAME_URL lub --url.');
  let url;
  try { url = new URL(text); } catch { throw new Error('Nieprawidłowy adres gry.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.hash || text.length > 350) {
    throw new Error('Adres gry musi być publicznym URL HTTPS bez haseł i fragmentów.');
  }
  if (!mock && /(^localhost$|\.local$|\.example$|\.invalid$|\.test$)/i.test(url.hostname)) {
    throw new Error('Adres gry musi wskazywać prawdziwą publiczną domenę, nie placeholder.');
  }
  return url.toString();
}

async function loadAssets() {
  const dataUrl = async (path, mime) => `data:${mime};base64,${(await readFile(path)).toString('base64')}`;
  const flags = Object.fromEntries(await Promise.all(COUNTRIES.map(async ({ code }) => [
    code, await dataUrl(join(ROOT, `public/assets/ui/flag-${code.toLowerCase()}.png`), 'image/png'),
  ])));
  const logo = await dataUrl(join(ROOT, 'public/assets/brand/logo.svg'), 'image/svg+xml');
  return { flags, logo };
}

/** firebase-admin jest już zależnością functions/, nie dodajemy drugiej kopii do pakietu głównego. */
async function readFirestoreWeeks(week, olderWeek) {
  const secret = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!secret) throw new Error('Brak FIREBASE_SERVICE_ACCOUNT (JSON konta serwisowego w zmiennej środowiskowej).');
  let credentials;
  try { credentials = JSON.parse(secret); } catch { throw new Error('FIREBASE_SERVICE_ACCOUNT musi zawierać poprawny JSON.'); }
  if (!credentials || typeof credentials !== 'object' || typeof credentials.project_id !== 'string'
    || typeof credentials.private_key !== 'string' || typeof credentials.client_email !== 'string') {
    throw new Error('FIREBASE_SERVICE_ACCOUNT: brak wymaganych pól konta serwisowego.');
  }
  const requireFunctions = createRequire(join(ROOT, 'functions/package.json'));
  let app;
  try {
    const { initializeApp, cert, deleteApp } = requireFunctions('firebase-admin/app');
    const { getFirestore } = requireFunctions('firebase-admin/firestore');
    app = initializeApp({ credential: cert(credentials) }, 'weekly-league-report');
    const db = getFirestore(app);
    const [current, older] = await Promise.all([
      db.collection('league').doc(week).get(),
      db.collection('league').doc(olderWeek).get(),
    ]);
    return {
      current: normalizeLeague(current.exists ? current.data() : null, week),
      previous: older.exists ? normalizeLeague(older.data(), olderWeek) : null,
    };
  } finally {
    if (app) await requireFunctions('firebase-admin/app').deleteApp(app);
  }
}

async function renderPngs(htmls, output) {
  const { chromium } = await import('@playwright/test'); // zależność już jest w package.json
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  });
  try {
    for (const item of htmls) {
      const page = await browser.newPage({ viewport: { width: 1080, height: item.height }, deviceScaleFactor: 1 });
      try {
        await page.setContent(item.html, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const broken = await page.evaluate(() => [...document.images].filter((img) => !img.complete || !img.naturalWidth).length);
        if (broken) throw new Error(`Nie udało się załadować ${broken} grafik dla ${item.name}.`);
        await page.screenshot({ path: join(output, item.name), animations: 'disabled' });
      } finally { await page.close(); }
    }
  } finally { await browser.close(); }
}

export async function run(args) {
  const week = args.week;
  const olderWeek = previousWeek(week);
  const gameUrl = checkedGameUrl(args.url ?? process.env.LEAGUE_GAME_URL, args.mock);
  const { current, previous } = args.mock
    ? { current: mockLeague(week), previous: mockLeague(olderWeek) }
    : await readFirestoreWeeks(week, olderWeek);
  const assets = await loadAssets();
  const generatedAt = new Date();
  const opts = { gameUrl, mock: args.mock, assets, generatedAt };
  const filenames = {
    post: `liga-${week}-post.png`,
    reel: `liga-${week}-rolka.png`,
    texts: `liga-${week}-teksty.md`,
  };
  await mkdir(args.outDir, { recursive: true });
  await renderPngs([
    { name: filenames.post, height: 1350, html: postHtml(current, previous, opts) },
    { name: filenames.reel, height: 1920, html: reelHtml(current, previous, opts) },
  ], args.outDir);
  await writeFile(join(args.outDir, filenames.texts), buildPostsMarkdown(current, previous, opts), 'utf8');
  console.log(`Raport: ${week}${args.mock ? ' (DANE TESTOWE)' : ''}`);
  Object.values(filenames).forEach((name) => console.log(join(args.outDir, name)));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) process.stdout.write(usage());
    else await run(args);
  } catch (error) {
    console.error(`Błąd generatora Ligi: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
