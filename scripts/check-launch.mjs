#!/usr/bin/env node
/**
 * Lista kontrolna gotowości do startu (npm run check:launch).
 *
 * Sprawdza konfigurację, której nie widać w zwykłych testach: klucze Firebase
 * klienta, zgodność wersji zasad klient/serwer, politykę prywatności, manifest
 * PWA z ikonami i identyfikator aplikacji Android. Niczego nie wysyła do sieci.
 *
 * ✓ — w porządku, ✗ — brak krytyczny (kod wyjścia 1), ! — ostrzeżenie.
 * Funkcje sprawdzające są czyste (dostają tekst, zwracają wynik), więc testuje je
 * tests/check-launch.test.ts.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/** Zmienne wymagane, żeby gra przełączyła się z trybu demo na prawdziwy ranking (src/net/api.ts). */
export const REQUIRED_FIREBASE_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];

/** Zmienne opcjonalne: bez nich gra działa, ale czegoś brakuje. */
export const OPTIONAL_CLIENT_VARS = {
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'pole z tej samej konfiguracji Firebase (opcjonalne)',
  VITE_FIREBASE_STORAGE_BUCKET: 'pole z tej samej konfiguracji Firebase (opcjonalne)',
  VITE_RECAPTCHA_SITE_KEY: 'bez niego wersja web nie uruchomi App Check',
  VITE_ANALYTICS_ENDPOINT: 'bez niego analityka jest wyłączona',
};

/** @typedef {{ ok: boolean, critical: boolean, label: string, detail?: string }} CheckResult */

/** @returns {CheckResult} */
function pass(label, detail) { return { ok: true, critical: false, label, detail }; }
/** @returns {CheckResult} */
function fail(label, detail) { return { ok: false, critical: true, label, detail }; }
/** @returns {CheckResult} */
function warn(label, detail) { return { ok: false, critical: false, label, detail }; }

/**
 * Parsuje plik .env w składni Vite/dotenv (KEY=wartość, komentarze #, cudzysłowy).
 * @param {string} text
 * @returns {Record<string, string>}
 */
export function parseEnv(text) {
  /** @type {Record<string, string>} */
  const result = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    const quoted = /^(['"])(.*)\1$/.exec(value);
    if (quoted) value = quoted[2];
    else value = value.replace(/\s+#.*$/, '');
    result[match[1]] = value;
  }
  return result;
}

/**
 * Konfiguracja Firebase klienta (te same nazwy, które czyta createRankingApi).
 * @param {Record<string, string | undefined>} env
 * @returns {CheckResult[]}
 */
export function checkFirebaseEnv(env) {
  const value = (key) => (typeof env[key] === 'string' ? env[key].trim() : '');
  const missing = REQUIRED_FIREBASE_VARS.filter((key) => !value(key));
  /** @type {CheckResult[]} */
  const results = [];
  if (missing.length) {
    results.push(fail('Konfiguracja Firebase klienta',
      'brakuje: ' + missing.join(', ') + ' — bez nich gra działa w trybie demo (ranking tylko lokalnie)'));
  } else {
    results.push(pass('Konfiguracja Firebase klienta', 'projekt ' + value('VITE_FIREBASE_PROJECT_ID')));
  }
  for (const [key, why] of Object.entries(OPTIONAL_CLIENT_VARS)) {
    if (!value(key)) results.push(warn(key, 'nie ustawiono — ' + why));
  }
  const endpoint = value('VITE_ANALYTICS_ENDPOINT');
  if (endpoint && !/^https:\/\//.test(endpoint)) {
    results.push(fail('VITE_ANALYTICS_ENDPOINT', 'adres musi zaczynać się od https://'));
  }
  return results;
}

/**
 * Odczytuje `export const RULES_VERSION = N` z kodu TypeScript.
 * @param {string} source
 * @returns {number | null}
 */
export function readRulesVersion(source) {
  const match = /export\s+const\s+RULES_VERSION\s*(?::\s*\w+\s*)?=\s*(\d+)/.exec(source);
  return match ? Number(match[1]) : null;
}

/**
 * Klient i Functions muszą mieć tę samą wersję zasad (inaczej serwer odrzuca każdy wynik).
 * Functions mogą importować stałą z src/core/rules (wtedy zgodność jest gwarantowana)
 * albo definiować ją same — wtedy porównujemy liczby.
 * @param {string} clientRules treść src/core/rules.ts
 * @param {string} functionsIndex treść functions/src/index.ts
 * @returns {CheckResult}
 */
export function checkRulesVersion(clientRules, functionsIndex) {
  const label = 'RULES_VERSION klienta i Functions';
  const client = readRulesVersion(clientRules);
  if (client === null) return fail(label, 'nie znaleziono RULES_VERSION w src/core/rules.ts');
  const own = readRulesVersion(functionsIndex);
  if (own !== null) {
    return own === client
      ? pass(label, 'obie strony: ' + client)
      : fail(label, 'klient ' + client + ', Functions ' + own + ' — serwer odrzuci wyniki');
  }
  const shared = /import\s*\{[^}]*\bRULES_VERSION\b[^}]*\}\s*from\s*['"](?:\.\.\/)+src\/core\/rules(?:\.ts)?['"]/
    .test(functionsIndex);
  return shared
    ? pass(label, 'wspólna stała z src/core/rules.ts (wersja ' + client + ')')
    : fail(label, 'Functions nie importują RULES_VERSION z src/core/rules.ts');
}

/**
 * Polityka prywatności musi istnieć, opisywać anonimowy identyfikator i brak reklam
 * personalizowanych. Pola [UZUPEŁNIJ] blokują publikację.
 * @param {string | null} text
 * @returns {CheckResult[]}
 */
export function checkPrivacyPolicy(text) {
  if (text === null) return [fail('Polityka prywatności', 'brak pliku docs/prawo/polityka-prywatnosci.md')];
  /** @type {CheckResult[]} */
  const results = [pass('Polityka prywatności istnieje')];
  results.push(/anonimow\w*\s+(?:\S+\s+){0,3}identyfikator|identyfikator\w*\s+(?:\S+\s+){0,3}anonimow/i.test(text)
    ? pass('Polityka opisuje anonimowy identyfikator')
    : fail('Polityka opisuje anonimowy identyfikator', 'nie znaleziono wzmianki'));
  results.push(/(?:bez|brak|nie\s+\S*\s*(?:\S+\s+){0,3})reklam\w*\s+(?:spersonalizowan|personalizowan)/i.test(text)
    ? pass('Polityka: brak reklam personalizowanych')
    : fail('Polityka: brak reklam personalizowanych', 'nie znaleziono wzmianki'));
  const placeholders = (text.match(/\[UZUPEŁNIJ/g) ?? []).length;
  results.push(placeholders
    ? fail('Polityka gotowa do publikacji', placeholders + ' pól [UZUPEŁNIJ] (dane administratora, kontakt, okresy)')
    : pass('Polityka gotowa do publikacji', 'brak pól [UZUPEŁNIJ]'));
  return results;
}

/**
 * Manifest PWA: nazwa, start_url i ikony 192 px oraz co najmniej 512 px, które istnieją na dysku.
 * @param {string | null} text treść public/manifest.webmanifest
 * @param {(relativePath: string) => boolean} iconExists ścieżka względem public/
 * @returns {CheckResult[]}
 */
export function checkManifest(text, iconExists) {
  const label = 'Manifest PWA';
  if (text === null) return [fail(label, 'brak public/manifest.webmanifest')];
  let manifest;
  try { manifest = JSON.parse(text); } catch { return [fail(label, 'niepoprawny JSON')]; }
  /** @type {CheckResult[]} */
  const results = [];
  const missingFields = ['name', 'short_name', 'start_url'].filter((key) => !manifest?.[key]);
  results.push(missingFields.length
    ? fail(label, 'brak pól: ' + missingFields.join(', '))
    : pass(label, String(manifest.name)));
  const icons = Array.isArray(manifest?.icons) ? manifest.icons : [];
  const sizes = icons.flatMap((icon) => String(icon?.sizes ?? '').split(/\s+/))
    .map((size) => Number(size.split('x')[0])).filter(Number.isFinite);
  const missingFiles = icons.map((icon) => String(icon?.src ?? '').replace(/^\.?\//, ''))
    .filter((src) => !src || !iconExists(src));
  if (!icons.length) results.push(fail('Ikony w manifeście', 'brak ikon'));
  else if (missingFiles.length) results.push(fail('Ikony w manifeście', 'brak plików: ' + missingFiles.join(', ')));
  else if (!sizes.includes(192) || !sizes.some((size) => size >= 512)) {
    results.push(fail('Ikony w manifeście', 'potrzebne 192 px i co najmniej 512 px'));
  } else results.push(pass('Ikony w manifeście', icons.length + ' plików'));
  const maskable = icons.some((icon) => String(icon?.purpose ?? '').includes('maskable'));
  if (!maskable) results.push(warn('Ikona maskable', 'brak — Android przytnie ikonę'));
  return results;
}

/**
 * Ikony, które wtyczka PWA generuje przy buildzie (lista ICONS w scripts/pwa-plugin.ts),
 * nie muszą leżeć w public/.
 * @param {string | null} pluginSource
 * @returns {string[]}
 */
export function generatedIcons(pluginSource) {
  const block = pluginSource ? /const\s+ICONS\s*=\s*\[([\s\S]*?)\]/.exec(pluginSource)?.[1] : undefined;
  return block ? [...block.matchAll(/path:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]) : [];
}

/**
 * android/app/build.gradle musi mieć applicationId zgodny z appId w capacitor.config.ts.
 * @param {string | null} gradle
 * @param {string | null} capacitorConfig
 * @returns {CheckResult}
 */
export function checkAndroidAppId(gradle, capacitorConfig) {
  const label = 'Android applicationId';
  if (gradle === null) return fail(label, 'brak android/app/build.gradle');
  const appId = /applicationId\s*=?\s*["']([\w.]+)["']/.exec(gradle)?.[1];
  if (!appId) return fail(label, 'brak applicationId w android/app/build.gradle');
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(appId)) return fail(label, 'niepoprawny format: ' + appId);
  const capId = capacitorConfig ? /appId\s*:\s*['"]([\w.]+)['"]/.exec(capacitorConfig)?.[1] : undefined;
  if (capId && capId !== appId) return fail(label, appId + ' ≠ appId w capacitor.config.ts (' + capId + ')');
  return pass(label, appId);
}

/**
 * Adres gry w linkach udostępniania nie może zostać przykładowym `.invalid`.
 * @param {string | null} shareConfig treść src/share/config.ts
 * @returns {CheckResult}
 */
export function checkShareOrigin(shareConfig) {
  const label = 'Adres gry w linkach udostępniania';
  const origin = shareConfig ? /GAME_ORIGIN\s*=\s*['"]([^'"]+)['"]/.exec(shareConfig)?.[1] : undefined;
  if (!origin) return warn(label, 'nie znaleziono GAME_ORIGIN w src/share/config.ts');
  if (/\.invalid\b|example\./.test(origin)) return warn(label, 'przykładowy adres ' + origin + ' — ustawić po wyborze domeny');
  return pass(label, origin);
}

/**
 * @param {CheckResult} result
 * @returns {string}
 */
export function formatResult(result) {
  const mark = result.ok ? '✓' : result.critical ? '✗' : '!';
  return mark + ' ' + result.label + (result.detail ? ' — ' + result.detail : '');
}

/**
 * @param {CheckResult[]} results
 * @returns {0 | 1}
 */
export function exitCodeFor(results) {
  return results.some((result) => !result.ok && result.critical) ? 1 : 0;
}

/**
 * Zmienne jak przy `vite build` (tryb production): .env, .env.local, .env.production,
 * .env.production.local; zmienne procesu mają pierwszeństwo (tak robi CI).
 * @param {string} root
 * @param {Record<string, string | undefined>} processEnv
 */
export function loadViteEnv(root, processEnv) {
  /** @type {Record<string, string | undefined>} */
  const env = {};
  for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
    const path = join(root, name);
    if (existsSync(path)) Object.assign(env, parseEnv(readFileSync(path, 'utf8')));
  }
  for (const [key, value] of Object.entries(processEnv)) {
    if (key.startsWith('VITE_') && value) env[key] = value;
  }
  return env;
}

/** @param {string} root */
export function runChecks(root) {
  const read = (path) => {
    const full = join(root, path);
    return existsSync(full) ? readFileSync(full, 'utf8') : null;
  };
  const sections = [
    ['Firebase (klient)', checkFirebaseEnv(loadViteEnv(root, process.env))],
    ['Ranking', [checkRulesVersion(read('src/core/rules.ts') ?? '', read('functions/src/index.ts') ?? '')]],
    ['Prywatność', checkPrivacyPolicy(read('docs/prawo/polityka-prywatnosci.md'))],
    ['PWA', checkManifest(read('public/manifest.webmanifest'), (src) => existsSync(join(root, 'public', src)) ||
      generatedIcons(read('scripts/pwa-plugin.ts')).includes(src))],
    ['Android', [checkAndroidAppId(read('android/app/build.gradle'), read('capacitor.config.ts'))]],
    ['Udostępnianie', [checkShareOrigin(read('src/share/config.ts'))]],
  ];
  return /** @type {[string, CheckResult[]][]} */ (sections);
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const sections = runChecks(root);
  const all = sections.flatMap(([, results]) => results);
  console.log('Cebulak Express — gotowość do startu\n');
  for (const [title, results] of sections) {
    console.log(title);
    for (const result of results) console.log('  ' + formatResult(result));
  }
  const critical = all.filter((result) => !result.ok && result.critical).length;
  const warnings = all.filter((result) => !result.ok && !result.critical).length;
  console.log('\n' + (critical
    ? '✗ Braki krytyczne: ' + critical + '. Instrukcja: docs/START-WDROZENIA.md'
    : '✓ Brak braków krytycznych.') + (warnings ? ' Ostrzeżenia: ' + warnings + '.' : ''));
  process.exitCode = exitCodeFor(all);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
