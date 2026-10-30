#!/usr/bin/env node
/**
 * Zlecenie 50: autentyczne kadry działającego buildu, bez zastępowania UI grafiką.
 * Wymagane: npm run build, @playwright/test i Chromium z Playwright.
 */
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const output = join(root, 'public/assets/store');
const preview = join(root, 'docs/art/podglady/store-shots.png');
const args = new Set(process.argv.slice(2));
const release = args.has('--release');
const baseURL = process.env.STORE_SHOTS_URL || 'http://127.0.0.1:4173/';
const suppliedURL = Boolean(process.env.STORE_SHOTS_URL);
const seed = Number(process.env.STORE_SHOTS_SEED ?? 57291);
const check = (condition, message) => { if (!condition) throw new Error(message); };
check(Number.isSafeInteger(seed) && seed >= 0 && seed <= 0xffffffff, 'STORE_SHOTS_SEED musi być liczbą uint32');
check(/^https?:\/\//.test(baseURL), 'STORE_SHOTS_URL musi być adresem HTTP(S)');
check(existsSync(join(root, 'dist/index.html')) || suppliedURL, 'Najpierw uruchom npm run build. Brak dist/index.html.');

const devices = [
  { key: 'google-play', width: 360, height: 640, folder: '' },
  { key: 'app-store', width: 414, height: 896, folder: 'app-store' },
];
const headings = [
  'JEDEN DOTYK.\nI LECISZ!',
  'Z 8 KRAJÓW\nDO POLSKI',
  'BAGAŻ? JESZCZE\nSIĘ ZMIEŚCI',
  'SŁOIKI DODAJĄ\nKILOMETRY',
  'PO DRODZE\nDO DOMU',
  'KAŻDY KM\nDLA POLONII',
  'TA SAMA TRASA.\nNOWY WYNIK',
  'POCHWAL SIĘ\nKILOMETRAMI',
];
const descriptions = [
  'Lot kombi nad Belgią',
  'Wybór jednej z ośmiu tras startowych',
  'Bagaże na kombi nad Holandią',
  'Prawdziwa premia za słoik w rozgrywce',
  'Trasa Niemcy–Polska',
  'Liga Polonii, wyłącznie dane istniejące w aplikacji',
  'Uruchomione wyzwanie dnia',
  'Rzeczywisty ekran końca lotu',
];
const temp = join(root, '.store-shots-tmp');
const metadata = [];
let server;
let browser;
let incomplete = false;

function log(message) { process.stdout.write(`[store:shots] ${message}\n`); }
function issue(message) { incomplete = true; log(`UWAGA: ${message}`); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
async function awaitServer(url) {
  for (let n = 0; n < 90; n++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (res.ok && (await res.text()).includes('<html')) return;
    } catch { /* Vite jeszcze startuje. */ }
    await sleep(500);
  }
  throw new Error(`Serwer gry nie odpowiada: ${url}`);
}

/** Playwright screenshot w Chromium powinien być od razu RGB, bez alfa. */
function validatePng(bytes, width, height, file) {
  check(bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')), `${file}: brak sygnatury PNG`);
  check(bytes.toString('ascii', 12, 16) === 'IHDR', `${file}: uszkodzony nagłówek PNG`);
  check(bytes.readUInt32BE(16) === width && bytes.readUInt32BE(20) === height, `${file}: nieprawidłowy rozmiar`);
  check(bytes[24] === 8 && bytes[25] === 2, `${file}: wymagany PNG RGB 8-bit bez alfa (PNG color type 2)`);
}

/** Nie dotyka samego renderera; zapamiętuje jedynie pozycję już narysowanego gracza. */
const yProbe = () => {
  const original = CanvasRenderingContext2D.prototype.translate;
  CanvasRenderingContext2D.prototype.translate = function (x, y) {
    if (x === 90 && Number.isFinite(y) && y >= 0 && y <= 640) {
      window.__storeShotPlayerY = y;
      window.__storeShotObservedAt = performance.now();
    }
    return original.call(this, x, y);
  };
};

async function openFresh(context, route = 'be-antwerpia', trialSeed = seed) {
  const page = await context.newPage();
  await page.addInitScript(yProbe);
  const url = new URL(baseURL);
  url.searchParams.set('test', '1');
  url.searchParams.set('seed', String(trialSeed));
  url.searchParams.set('r', route);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (msg) => { if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) errors.push(msg.text()); });
  await page.goto(url.href, { waitUntil: 'domcontentloaded' });
  await page.locator('#menu').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(500);
  return { page, errors };
}

async function startGame(page, { country = 'BE', from = 'antwerpia', to = 'rzeszow', daily = false } = {}) {
  await page.locator('#sel-home').selectOption(country);
  await page.locator('#sel-from').selectOption(from);
  await page.locator('#sel-to').selectOption(to);
  // Tryb łagodny pozwala przejść więcej rzeczywistej trasy bez manipulacji stanem gry.
  if (!daily) await page.locator('[data-mode="cozy"]').click();
  await page.locator(daily ? '#btn-daily' : '#btn-start').click();
  await page.locator('#hud').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(450); // Na załadowanie sprite'ów i pierwszych warstw tła.
}

async function state(page) {
  return page.evaluate(() => {
    const hook = window.__ceTest?.snapshot?.();
    const km = Number.parseInt(document.getElementById('hud-km')?.textContent ?? '0', 10) || 0;
    const toast = document.getElementById('toast');
    const over = document.getElementById('over');
    return {
      km, over: !over?.hidden,
      y: hook?.y ?? window.__storeShotPlayerY ?? null,
      vy: hook?.vy ?? null,
      distancePx: hook?.distancePx ?? null,
      phase: hook?.phase ?? null,
      country: hook?.country ?? null,
      jars: hook?.jars ?? null,
      pickups: hook?.pickups ?? null,
      obstacles: hook?.obstacles ?? null,
      toast: toast?.hidden ? '' : toast?.textContent ?? '',
    };
  });
}

/** Przewidywalne 6 losowań na przeszkodę, zgodnie z src/core/rng.ts i obstacles.ts. */
function seededField(trialSeed, count = 22) {
  let s = trialSeed >>> 0;
  const random = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const obstacles = [];
  const pickups = [];
  let gap = 580 / 2;
  let x = 520;
  for (let i = 0; i < count; i++) {
    // Przy dalszych odcinkach właściwy rdzeń zmienia trudność; API haka ma pierwszeństwo.
    const low = Math.max(147.5, gap - 80);
    const high = Math.min(432.5, gap + 80);
    gap = low + (high - low) * random();
    random(); // rodzaj przeszkody górnej
    random(); // rodzaj dolnej
    obstacles.push({ x, gapY: gap, gapH: 215 });
    const chance = random();
    const kind = random();
    const offset = (random() * 2 - 1) * (215 / 3);
    if (chance < 0.45) pickups.push({ x: x + 162, y: gap + offset, kind: kind < 0.8 ? 'parcel' : 'jar' });
    x += 260;
  }
  return { obstacles, pickups };
}

function desiredAltitude(s, elapsed, trialSeed, seekJar = false) {
  const field = seededField(trialSeed);
  const distance = s.distancePx ?? Math.max(0, s.km) / 0.05;
  const obstacles = s.obstacles ?? field.obstacles;
  const pickups = s.pickups ?? field.pickups;
  const next = obstacles.find((o) => o.x + 64 >= distance + 70);
  const near = next && next.x - (distance + 90) < 175;
  let target = near ? next.gapY : 290;
  if (seekJar) {
    const jar = pickups.find((p) => p.kind === 'jar' && !p.taken && p.x >= distance + 65 && p.x <= distance + 240);
    if (jar) target = jar.y;
  }
  return Math.max(175, Math.min(410, target));
}

/** Co ~70 ms podejmuje decyzję o tapnięciu; nie ustawia pozycji, km ani wyniku. */
async function autopilot(page, { seconds, trialSeed = seed, seekJar = false, until = () => false }) {
  const begin = Date.now();
  let lastY = null;
  let lastAt = Date.now();
  let lastTap = 0;
  await page.keyboard.press('Space');
  while (Date.now() - begin < seconds * 1000) {
    const s = await state(page);
    if (until(s)) return { success: true, state: s };
    if (s.over) return { success: false, state: s };
    const now = Date.now();
    const elapsed = (now - begin) / 1000;
    if (typeof s.y === 'number') {
      const velocity = typeof s.vy === 'number' ? s.vy : lastY === null ? 0 : (s.y - lastY) / Math.max(.03, (now - lastAt) / 1000);
      const target = desiredAltitude(s, elapsed, trialSeed, seekJar);
      const forecast = s.y + velocity * .155 + 0.5 * 1500 * .155 ** 2;
      if (forecast > target + 5 && now - lastTap > 205 && s.y > 35) {
        await page.keyboard.press('Space');
        lastTap = now;
      }
      lastY = s.y;
      lastAt = now;
    } else if (now - lastTap >= 565) {
      await page.keyboard.press('Space');
      lastTap = now;
    }
    await page.waitForTimeout(65);
  }
  const s = await state(page);
  return { success: until(s), state: s };
}

async function captureScenario(context, number) {
  const i = number - 1;
  if (number === 2) {
    const { page } = await openFresh(context, 'be-antwerpia');
    const count = await page.locator('#sel-home option').count();
    check(count === 8, `Ekran 02: oczekiwano 8 krajów, jest ${count}`);
    return { page, heading: headings[i], evidence: `Menu: ${count} krajów` };
  }
  if (number === 6) {
    const { page } = await openFresh(context);
    await page.locator('#btn-league').click();
    await page.waitForFunction(() => {
      const content = document.querySelector('.ce-league__content');
      return content && !content.querySelector('.ce-league__loading');
    }, null, { timeout: 15000 });
    await page.locator('.ce-league__content').waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(300);
    const mock = await page.locator('.ce-league__demo').count() > 0;
    if (mock) {
      issue('Zrzut 06 przedstawia jawnie oznaczony ranking pokazowy. Nie publikować bez rzeczywistego backendu.');
      if (release) throw new Error('Zrzut 06: brak produkcyjnego rankingu Firebase; przerwano eksport release.');
    }
    const failed = await page.locator('.ce-league__error').count() > 0;
    check(!failed, 'Zrzut 06: nie można pobrać tabeli Ligi Polonii.');
    return { page, heading: headings[i], evidence: mock ? 'Ranking pokazowy, widoczny komunikat DEMO' : 'Ranking live' };
  }
  if (number === 7) {
    const { page } = await openFresh(context);
    await startGame(page, { daily: true });
    check(await page.locator('#hint').isVisible(), 'Zrzut 07: brak ekranu wyzwania dnia.');
    return { page, heading: headings[i], evidence: 'Wyzwanie dnia uruchomione w aplikacji' };
  }
  if (number === 8) {
    const { page } = await openFresh(context, 'be-antwerpia');
    await startGame(page);
    await page.keyboard.press('Space');
    await page.locator('#over').waitFor({ state: 'visible', timeout: 15000 });
    check((await page.locator('#over-joke').textContent() ?? '').trim().length > 2, 'Zrzut 08: brak rzeczywistego żartu.');
    check(await page.locator('#btn-share').isVisible(), 'Zrzut 08: brak przycisku udostępniania.');
    return { page, heading: headings[i], evidence: 'Autentyczny wynik, żart i przycisk Udostępnij' };
  }
  const routes = {
    1: { route: 'be-antwerpia', country: 'BE', from: 'antwerpia', to: 'rzeszow', threshold: 8 },
    3: { route: 'nl-rotterdam', country: 'NL', from: 'rotterdam', to: 'poznan', threshold: 12 },
    4: { route: 'be-antwerpia', country: 'BE', from: 'antwerpia', to: 'rzeszow' },
    5: { route: 'de-berlin', country: 'DE', from: 'berlin', to: 'szczecin' },
  };
  const cfg = routes[number];
  check(Boolean(cfg), `Nieznany scenariusz ${number}`);
  const maxAttempts = number === 4 ? 18 : number === 5 ? 4 : 3;
  const jarSeeds = Array.from({ length: 900 }, (_, i) => (seed + i) >>> 0)
    .filter((candidate) => {
      const first = seededField(candidate).pickups[0];
      return first?.kind === 'jar' && first.x < 1300 && first.y >= 195 && first.y <= 370;
    });
  let last;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const trialSeed = number === 4 ? jarSeeds[attempt] : (seed + attempt) >>> 0;
    if (trialSeed === undefined) break;
    const { page } = await openFresh(context, cfg.route, trialSeed);
    try {
      await startGame(page, cfg);
      let goal;
      let seconds;
      if (number === 4) {
        // Wyszukujemy tylko takie ziarna, w których rdzeń faktycznie generuje słoik.
        const possible = seededField(trialSeed).pickups[0]?.kind === 'jar';
        if (!possible) { await page.close(); continue; }
        goal = (s) => s.jars > 0 || /słoik.*\+\s*30\s*km|\+\s*30\s*km.*słoik/i.test(s.toast);
        seconds = 16;
      } else if (number === 5) {
        goal = (s) => !s.over && (s.country === 'PL' || /Rzeczpospolita Polska|Witamy w Polsce/i.test(s.toast));
        seconds = 48;
      } else {
        goal = (s) => s.km >= cfg.threshold;
        seconds = 14;
      }
      const result = await autopilot(page, { seconds, trialSeed, seekJar: number === 4, until: goal });
      if (result.success) {
        // Po zmianie kraju dajemy tłu 1,5 s na przejście i ładowanie kraju.
        if (number === 5) await page.waitForTimeout(1900);
        // Toast zbiórki znika po 1,6s; po detekcji robimy zrzut bez zwłoki.
        return { page, heading: headings[i], evidence: number === 4 ? 'Potwierdzony słoik i +30 km' : number === 5 ? 'Zmiana kraju na PL' : `Realny lot, ${result.state.km} km` };
      }
      last = result.state;
    } catch (error) {
      await page.close();
      throw error;
    }
    await page.close();
  }
  throw new Error(`Ekran ${String(number).padStart(2, '0')}: nie udało się zarejestrować autentycznego zdarzenia (${JSON.stringify(last)})`);
}


async function overlay(page, headline) {
  await page.evaluate((lines) => {
    document.getElementById('__store-shot-overlay')?.remove();
    const container = document.createElement('div');
    container.id = '__store-shot-overlay';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = 'position:fixed;z-index:9999;inset:0;pointer-events:none;font-family:system-ui, sans-serif;';
    const gradient = document.createElement('div');
    gradient.style.cssText = 'position:absolute;inset:0 0 auto 0;height:116px;background:linear-gradient(180deg,rgba(13,38,51,.88),rgba(13,38,51,0));';
    const title = document.createElement('div');
    title.style.cssText = 'position:absolute;top:39px;left:18px;right:18px;text-align:center;font-weight:1000;font-size:24px;line-height:1.07;letter-spacing:.005em;color:white;-webkit-text-stroke:1.2px #18313d;text-shadow:0 2px 0 #18313d,0 4px 7px #071a2088;white-space:pre-line;';
    title.textContent = lines;
    container.append(gradient, title);
    document.body.append(container);
  }, headline);
  await page.waitForTimeout(130);
}

async function contactSheet(browser, paths) {
  const context = await browser.newContext({ viewport: { width: 1192, height: 1075 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const tiles = paths.map((p, i) => {
    const uri = readFileSync(p).toString('base64');
    return `<div class="tile"><img src="data:image/png;base64,${uri}" /><span>${String(i + 1).padStart(2, '0')}</span></div>`;
  }).join('');
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:26px;background:#172b36;font:700 20px system-ui;color:#fff}h1{font-size:19px;margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(4,270px);gap:15px 14px}.tile{height:480px;position:relative;overflow:hidden;border:4px solid #f9e4a7;border-radius:12px}.tile img{width:100%;height:100%;object-fit:cover}.tile span{position:absolute;bottom:10px;right:10px;background:#17313d;color:#fff;border-radius:9px;padding:3px 8px;font-size:16px}</style><h1>Cebulak Express — kadry z gry / Google Play</h1><div class="grid">${tiles}</div>`);
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0));
  mkdirSync(dirname(preview), { recursive: true });
  await page.screenshot({ path: preview, animations: 'disabled' });
  await context.close();
}

function writeManifest() {
  const commit = process.env.GITHUB_SHA?.slice(0, 12) || 'lokalny build';
  const lines = [
    '# ASSETS — zrzuty sklepowe (zlecenie 50)', '',
    `Źródło: rzeczywisty build aplikacji (${commit}) renderowany w Chromium / Playwright.`,
    'Nakładka: własny nagłówek marketingowy CSS. Format: PNG RGB (bez alfa), 3× DPR.',
    '', '| plik | źródło/narzędzie | licencja | autor/uwagi |', '|---|---|---|---|',
    ...metadata.map(({ path, note, digest }) => `| \`${path}\` | Playwright Chromium, ${commit} | własny materiał projektu | Nakładka: zlecenie 50; ${note}; SHA-256: \`${digest}\` |`),
    '',
    'Pliki w `app-store/` to **osobne zrzuty przy viewport 414×896 i DPR 3** (1242×2688), a nie rozciągnięte zrzuty Androida.',
    'Grafiki powinny zostać ponownie przechwycone z finalnego buildu Android/iOS przed publikacją.',
    ...(incomplete ? ['', '> **UWAGA — NIE PUBLIKOWAĆ AUTOMATYCZNIE:** co najmniej jeden ekran zawiera wyniki demonstracyjne, a nie dane produkcyjne. Uruchom `npm run store:shots -- --release` po uruchomieniu backendu.'] : []),
    '',
  ];
  writeFileSync(join(temp, 'ASSETS.md'), lines.join('\n'));
}

async function main() {
  mkdirSync(temp, { recursive: true });
  if (!suppliedURL) {
    server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
      { cwd: root, stdio: 'pipe', shell: false });
    server.on('error', (error) => log(`Błąd startu serwera: ${error.message}`));
  }
  await awaitServer(baseURL);
  browser = await chromium.launch({ headless: true });
  const previewPaths = [];
  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height }, deviceScaleFactor: 3,
      locale: 'pl-PL', timezoneId: 'Europe/Warsaw', isMobile: true, hasTouch: true,
      reducedMotion: 'reduce', colorScheme: 'light',
    });
    const dest = join(temp, device.folder);
    mkdirSync(dest, { recursive: true });
    // Żadnego wspólnego storage, kont ani cudzych danych; każda karta ma własne ustawienia.
    for (let number = 1; number <= 8; number++) {
      const file = `screenshot-${String(number).padStart(2, '0')}.png`;
      const shot = await captureScenario(context, number);
      try {
        await overlay(shot.page, shot.heading);
        const bytes = await shot.page.screenshot({ animations: 'disabled', caret: 'hide', fullPage: false });
        validatePng(bytes, device.width * 3, device.height * 3, file);
        const filepath = join(dest, file);
        writeFileSync(filepath, bytes);
        metadata.push({ path: `public/assets/store/${device.folder ? device.folder + '/' : ''}${file}`, note: shot.evidence, digest: createHash('sha256').update(bytes).digest('hex').slice(0, 16) });
        if (device.key === 'google-play') previewPaths.push(filepath);
        log(`${device.key}: ${file} (${bytes.length} B) — ${descriptions[number - 1]}`);
      } finally {
        await shot.page.close();
      }
    }
    await context.close();
  }
  check(metadata.length === 16, 'Zrzuty niekompletne: wymagane 8 Play + 8 App Store');
  if (release && incomplete) throw new Error('Niekompletne wymagania produkcyjne');
  writeManifest();
  mkdirSync(output, { recursive: true });
  for (const device of devices) {
    const dir = join(output, device.folder);
    mkdirSync(dir, { recursive: true });
    for (let number = 1; number <= 8; number++) {
      const file = `screenshot-${String(number).padStart(2, '0')}.png`;
      const from = join(temp, device.folder, file);
      const to = join(dir, file);
      renameSync(from, to);
    }
  }
  renameSync(join(temp, 'ASSETS.md'), join(output, 'ASSETS.md'));
  await contactSheet(browser, previewPaths.map((p) => p.replace(temp, output)));
  log(`Gotowe: 16 PNG + ${preview}`);
  if (incomplete) log('To zestaw poglądowy; ranking jest pokazowy. Nie publikować bez weryfikacji release.');
}

try {
  await main();
} catch (error) {
  process.exitCode = 1;
  console.error('[store:shots] BŁĄD:', error.stack ?? String(error));
} finally {
  await browser?.close().catch(() => {});
  if (server) {
    server.kill('SIGTERM');
    if (process.platform === 'win32') server.kill();
  }
  rmSync(temp, { recursive: true, force: true });
}
