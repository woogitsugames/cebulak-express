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
  const html = `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Licencje grafik — Cebulak Express</title>
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
@media print{body{background:#fff;padding:0}section{break-inside:avoid;box-shadow:none}a{color:inherit}}
</style></head><body><main><h1>Licencje grafik</h1><p class="lede">Zestawienie wygenerowane automatycznie z ${paths.length} plików ASSETS.md w repozytorium. Liczba pozycji: ${total}. Prawa do poszczególnych materiałów określają dokumenty źródłowe, nie samo zestawienie.</p>${sections.join('\n')}</main></body></html>\n`;
  const destination = join(root, 'public', 'licencje.html');
  await writeFile(destination, html, 'utf8');
  return { destination, sources: paths.length, entries: total };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateLicenses().then(({ destination, sources, entries }) => {
    console.log(`Licencje: ${sources} dokumentów, ${entries} pozycji -> ${destination}`);
  }).catch((error) => { console.error(error); process.exitCode = 1; });
}
