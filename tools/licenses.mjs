import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_LINK = 'https://github.com/woogitsugames/cebulak-express/blob/main/';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function tableCells(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) return [];
  const body = trimmed.slice(1).replace(/(?<!\\)\|$/, '');
  return body.split(/(?<!\\)\|/).map((part) => part.trim().replace(/\\\|/g, '|'));
}

function isSeparator(parts) {
  return parts.length > 0 && parts.every((part) => /^:?-{3,}:?$/.test(part));
}

/** Czytamy każdą tabelę zawierającą kolumny Plik i Licencja. */
export function parseAssetTables(markdown) {
  const lines = markdown.split(/\r?\n/);
  const result = [];
  for (let i = 0; i + 1 < lines.length; i++) {
    const headers = tableCells(lines[i]);
    const separator = tableCells(lines[i + 1]);
    if (!headers.length || !isSeparator(separator) || separator.length !== headers.length) continue;
    const names = headers.map((name) => name.toLocaleLowerCase('pl-PL'));
    if (!names.some((name) => name.includes('plik')) || !names.some((name) => name.includes('licencja'))) continue;
    const rows = [];
    i += 2;
    for (; i < lines.length; i++) {
      const row = tableCells(lines[i]);
      if (!row.length) break;
      rows.push(headers.map((_, index) => row[index] ?? ''));
    }
    result.push({ headers, rows });
  }
  return result;
}

async function sourceFiles(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) files.push(...await sourceFiles(path));
    else if (item.isFile() && item.name === 'ASSETS.md') files.push(path);
  }
  return files.sort((a, b) => a.localeCompare(b, 'en'));
}

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Licencje bibliotek dopuszczone w grze sprzedawanej w Google Play i App Store (docs/prawo/przed-wydaniem.md).
 * Inna licencja (GPL/LGPL/AGPL, CC-BY-NC, brak licencji…) zatrzymuje build — najpierw decyzja właściciela.
 */
export const ALLOWED_LIBRARY_LICENSES = new Set([
  'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', '0BSD', 'Unlicense', 'CC0-1.0', 'BlueOak-1.0.0', 'Python-2.0',
]);

export function disallowedLibraries(libraries) {
  return libraries.filter((lib) => !String(lib.license).split(/\s+OR\s+|[()]/).some((part) => ALLOWED_LIBRARY_LICENSES.has(part.trim())));
}

/** Pliki z tekstem licencji i informacjami NOTICE w katalogu pakietu (Apache-2.0 wymaga NOTICE). */
const LICENSE_FILE = /^(?:licen[cs]e|copying|notice)(?:[.-][a-z0-9]+)*$/i;

/**
 * Biblioteki trafiające do gry i APK: pakiety produkcyjne z package-lock.json (bez dev).
 * Teksty licencji czytamy z node_modules; identyczne teksty są scalane.
 */
export async function collectLibraries(root = repositoryRoot) {
  const lockPath = join(root, 'package-lock.json');
  if (!existsSync(lockPath)) return [];
  const lock = JSON.parse(await readFile(lockPath, 'utf8'));
  const libraries = [];
  for (const [path, info] of Object.entries(lock.packages ?? {})) {
    if (!path || info.dev || info.devOptional || info.link) continue;
    const name = info.name ?? path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);
    const dir = join(root, path);
    let homepage = '';
    const texts = [];
    if (existsSync(dir)) {
      try {
        const pkg = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'));
        homepage = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url ?? pkg.homepage ?? '';
      } catch { /* brak package.json — zostaje sama licencja z lockfile */ }
      for (const file of (await readdir(dir)).filter((f) => LICENSE_FILE.test(f)).sort()) {
        texts.push((await readFile(join(dir, file), 'utf8')).trim());
      }
    }
    libraries.push({ name, version: info.version ?? '', license: info.license ?? 'brak w package-lock', homepage, text: texts.join('\n\n') });
  }
  return libraries.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function cleanRepoUrl(url) {
  const clean = String(url).replace(/^git\+/, '').replace(/^git:\/\//, 'https://').replace(/\.git$/, '')
    .replace(/^github:/, 'https://github.com/');
  return /^https:\/\//.test(clean) ? clean : '';
}

function librariesSection(libraries) {
  if (!libraries.length) return '';
  // Pakiety bez własnego pliku (np. cały Firebase JS SDK) dostają pełny tekst tej samej licencji
  // z innego pakietu projektu — Apache-2.0 wymaga dołączenia kopii licencji.
  const canonical = new Map();
  for (const lib of libraries) {
    if (lib.text && !canonical.has(lib.license) && (lib.license !== 'Apache-2.0' || /TERMS AND CONDITIONS/.test(lib.text))) {
      canonical.set(lib.license, lib.text.slice(lib.text.search(/apache license|mit license|permission is hereby|redistribution and use|permission to use/i)));
    }
  }
  const groups = new Map();
  for (const lib of libraries) {
    const owner = /^(?:@firebase\/|firebase$)/.test(lib.name) ? 'Copyright Google LLC (Firebase JavaScript SDK).\n\n' : '';
    const key = lib.text || (canonical.has(lib.license)
      ? `${owner}Pakiet nie zawiera własnego pliku licencji; obowiązuje licencja ${lib.license}:\n\n${canonical.get(lib.license)}`
      : `${owner}Licencja ${lib.license} — pełna treść: https://spdx.org/licenses/${lib.license}.html`);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lib);
  }
  const summary = [...libraries.reduce((m, l) => m.set(l.license, (m.get(l.license) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1]).map(([lic, n]) => `${escapeHtml(lic)}: ${n}`).join(', ');
  const rows = libraries.map((lib) => {
    const url = cleanRepoUrl(lib.homepage);
    const name = url ? `<a href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">${escapeHtml(lib.name)}</a>` : escapeHtml(lib.name);
    return `<tr><td>${name}</td><td>${escapeHtml(lib.version)}</td><td>${escapeHtml(lib.license)}</td></tr>`;
  }).join('');
  const texts = [...groups].map(([text, libs]) =>
    `<details><summary>${escapeHtml(libs.map((l) => l.name).join(', '))}</summary><pre>${escapeHtml(text)}</pre></details>`).join('\n');
  return `<section id="biblioteki"><h2>Biblioteki open source</h2><p class="source">Gra korzysta z ${libraries.length} bibliotek o otwartym kodzie (${summary}). Poniżej wykaz i pełne teksty licencji oraz informacji o prawach autorskich (NOTICE), zgodnie z ich warunkami. Lista generowana automatycznie z <code>package-lock.json</code>.</p><div class="table-scroll"><table><thead><tr><th scope="col">Biblioteka</th><th scope="col">Wersja</th><th scope="col">Licencja</th></tr></thead><tbody>${rows}</tbody></table></div>\n${texts}</section>`;
}

export async function generateLicenses(root = repositoryRoot) {
  const assets = join(root, 'public', 'assets');
  const paths = await sourceFiles(assets);
  if (!paths.length) throw new Error(`Brak plików ASSETS.md w ${assets}`);
  const sections = [];
  let total = 0;
  for (const file of paths) {
    const source = relative(root, file).split(sep).join('/');
    const title = relative(assets, dirname(file)).split(sep).join('/');
    const tables = parseAssetTables(await readFile(file, 'utf8'));
    total += tables.reduce((sum, table) => sum + table.rows.length, 0);
    const content = tables.length
      ? tables.map(({ headers, rows }) => `<div class="table-scroll"><table><thead><tr>${headers.map((cell) => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`).join('\n')
      : '<p>Brak tabeli licencji w tym dokumencie. Sprawdź źródło.</p>';
    sections.push(`<section><h2>${escapeHtml(title)}</h2><p class="source"><a href="${SOURCE_LINK}${encodeURI(source)}" rel="noopener noreferrer" target="_blank">Dokument źródłowy: ${escapeHtml(source)}</a></p>${content}</section>`);
  }
  const libraries = await collectLibraries(root);
  const blocked = disallowedLibraries(libraries);
  if (blocked.length) {
    throw new Error('Biblioteki z licencją spoza listy dozwolonych (docs/prawo/przed-wydaniem.md): ' +
      blocked.map((lib) => `${lib.name}@${lib.version} (${lib.license})`).join(', '));
  }
  const html = `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Licencje — Cebulak Express</title>
<style>
:root{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#23323b;background:#f6f2e9}
*{box-sizing:border-box}body{margin:0;padding:20px 14px 55px}main{max-width:1100px;margin:auto}
h1{color:#17693f;margin:5px 0 7px;font-size:clamp(26px,4vw,37px)}.lede{color:#4d6369;margin:0 0 25px;line-height:1.5}
section{background:#fffdf8;border:1px solid #e2d8be;border-radius:15px;padding:14px 16px;margin-bottom:15px;box-shadow:0 2px 12px #273a3410}
h2{font-size:20px;margin:0 0 5px;color:#17693f;overflow-wrap:anywhere}.source{font-size:12px;margin:0 0 10px;overflow-wrap:anywhere}
a{color:#155c84}a:focus-visible{outline:3px solid #bb8017;outline-offset:3px}
.table-scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:13px;line-height:1.45}
th,td{padding:9px 10px;border:1px solid #e9e3d5;text-align:left;vertical-align:top}th{background:#e8f3e9;color:#1d5740;font-weight:800}
tbody tr:nth-child(even){background:#faf7ef}code{font:inherit;font-size:12px;color:#2d5a76;overflow-wrap:anywhere}
details{margin:6px 0;font-size:13px}summary{cursor:pointer;color:#1d5740;font-weight:700;overflow-wrap:anywhere}
pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px;background:#faf7ef;border:1px solid #e9e3d5;border-radius:8px;padding:10px;max-height:340px;overflow:auto}
@media print{body{background:#fff;padding:0}section{break-inside:avoid;box-shadow:none}a{color:inherit}}
</style></head><body><main><h1>Licencje</h1><p class="lede">Grafiki: zestawienie wygenerowane automatycznie z ${paths.length} plików ASSETS.md w repozytorium (${total} pozycji); prawa do poszczególnych materiałów określają dokumenty źródłowe, nie samo zestawienie. Czcionki: gra używa wyłącznie czcionek systemowych urządzenia; napisy w grafikach złożono czcionkami Inter i Liberation (SIL Open Font License 1.1) oraz DejaVu (licencja Bitstream Vera). Muzyka i dźwięki są autorskie, syntezowane w grze. <a href="#biblioteki">Biblioteki open source</a> — na końcu strony.</p>${sections.join('\n')}\n${librariesSection(libraries)}</main></body></html>\n`;
  const destination = join(root, 'public', 'licencje.html');
  await writeFile(destination, html, 'utf8');
  return { destination, sources: paths.length, entries: total, libraries: libraries.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateLicenses().then(({ destination, sources, entries, libraries }) => {
    console.log(`Licencje: ${sources} dokumentów, ${entries} pozycji, ${libraries} bibliotek -> ${destination}`);
  }).catch((error) => { console.error(error); process.exitCode = 1; });
}
