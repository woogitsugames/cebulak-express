#!/usr/bin/env node
/**
 * Inwentaryzacja tekstów gracza i automatyczna kontrola słów zakazanych.
 * Wykorzystuje parser TypeScript już obecny w devDependencies (bez nowych paczek).
 * Kontrolujemy treści użytkownika, a nie klasy CSS, identyfikatory, URL-e i komentarze.
 */
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUTPUT = 'docs/qa/wszystkie-teksty.md';
const CONTENT_VARIABLES = new Set([
  'COUNTRY_NAME', 'COUNTRY_LOCATIVE', 'OBSTACLE_NAME', 'FAIL_JOKES',
  'PICKUP_TOAST', 'BORDER_TEXTS', 'ARRIVAL_TEXTS', 'NEAR_MISS_TEXTS',
  'PICKUP_TEXTS', 'MILESTONE_TEXTS', 'WIGILIA_TEXTS', 'UI',
]);
const VISIBLE_PROPERTIES = new Set([
  'title', 'label', 'text', 'description', 'hint', 'message',
  'heading', 'subtitle', 'ariaLabel',
]);
const VISIBLE_VARIABLES = new Set([
  'info', 'message', 'title', 'label', 'heading', 'hint',
  'detail', 'footer', 'league',
]);
const VISIBLE_ATTRIBUTES = new Set([
  'aria-label', 'aria-description', 'aria-valuetext',
  'alt', 'placeholder', 'title',
]);
const SINGLE_ARG_CALLS = new Set([
  'emptyMessage', 'cell', 'table', 'createTextNode',
  'makeButton', 'fillText', 'strokeText',
]);

const PROHIBITED = [
  ['niedozwolone nawiązanie do innej gry', /flappy/giu],
  ['prawdziwa marka', /(?:^|[^\p{L}\p{N}])(?:ryanair|wizz\s?air|easyjet|lidl|biedronk\p{L}*|żabk\p{L}*|orlen|shell|circle\s?k|mcdonald'?s?|coca[\s-]?cola|pepsi|fiat|polonez|mercedes|bmw|audi|volkswagen|toyota|ford|carrefour|ikea|netflix|facebook|messenger|whatsapp|instagram|tiktok|atomium)(?=$|[^\p{L}\p{N}])/giu],
  ['alkohol', /(?:^|[^\p{L}\p{N}])(?:alkohol\p{L}*|piw(?:o|a|em|ie)|wódk\p{L}*|wodk\p{L}*|win(?:o|a|em|ie)|whisk\p{L}*|bimber|szampan\p{L}*|prosecco|beer|vodka)(?=$|[^\p{L}\p{N}])/giu],
  ['wulgaryzm', /(?:^|[^\p{L}\p{N}])(?:kurw\p{L}*|chuj\p{L}*|jeba\p{L}*|pierdoli\p{L}*|dup(?:a|y|ie|ą)|cholera)(?=$|[^\p{L}\p{N}])/giu],
  ['polityka', /(?:^|[^\p{L}\p{N}])(?:polityk\p{L}*|prezydent\p{L}*|sejm|senat|parlament\p{L}*|wybor(?:y|ów|ach|czy|cza|cze|czego)|rząd\p{L}*|partyjn\p{L}*|premier\p{L}*)(?=$|[^\p{L}\p{N}])/giu],
  ['religia', /(?:^|[^\p{L}\p{N}])(?:msza|ksiądz\p{L}*|papież\p{L}*|modlitw\p{L}*|kościół|kościele|bogiem)(?=$|[^\p{L}\p{N}])/giu],
];

function nameOf(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return node.getText?.() ?? '';
}

function propertyName(node) {
  if (!ts.isPropertyAccessExpression(node)) return '';
  return node.name.text;
}

function isFrom(node, ancestor) {
  if (node === ancestor) return node;
  let child = node;
  while (child.parent && child.parent !== ancestor) child = child.parent;
  return child.parent === ancestor ? child : null;
}

function indexOfArg(node, call) {
  const direct = isFrom(node, call);
  return direct ? call.arguments.indexOf(direct) : -1;
}

function visibleContext(node, file) {
  const isPl = file === 'src/content/pl.ts';
  const isNicks = file === 'src/content/nicks.ts';
  const isWaypoints = file === 'src/content/waypoints.ts';
  const isPortals = file === 'src/content/portals.ts';
  const isRoute = file === 'src/core/route.ts';
  for (let p = node.parent; p; p = p.parent) {
    if (ts.isImportDeclaration(p) || ts.isImportTypeNode(p) || ts.isTypeAliasDeclaration(p)) return null;
    if (ts.isPropertyAssignment(p) && isFrom(node, p.initializer)) {
      const key = nameOf(p.name);
      if (isPl && /^garage(?:DefaultSkin|PanCebulek|PaniCebulka|BusKurierski)$/.test(key)) return 'nazwa skórki';
      if (isWaypoints && (key === 'name' || key === 'text')) return `punkt trasy: ${key}`;
      if (isPortals && key === 'label') return 'nazwa kraju portalu';
      if (isRoute && ['name', 'fromName', 'toName'].includes(key)) return `miasto: ${key}`;
      if (file.startsWith('src/ui/') || file.startsWith('src/share/') || file === 'src/main.ts') {
        if (VISIBLE_PROPERTIES.has(key)) return `pole ${key}`;
      }
    }
    if (ts.isVariableDeclaration(p) && isFrom(node, p.initializer)) {
      const key = nameOf(p.name);
      if (isPl && CONTENT_VARIABLES.has(key)) return `treści ${key}`;
      if (isNicks && (key === 'NICK_ADJECTIVES' || key === 'NICK_NOUNS')) return `nicki ${key}`;
      if ((file.startsWith('src/ui/') || file.startsWith('src/share/') || file === 'src/main.ts') && VISIBLE_VARIABLES.has(key)) return `zmienna ${key}`;
    }
    if (ts.isBinaryExpression(p) && p.operatorToken.kind === ts.SyntaxKind.EqualsToken && isFrom(node, p.right)) {
      const target = ts.isIdentifier(p.left) ? p.left.text : propertyName(p.left);
      if (['textContent', 'innerText', 'innerHTML', 'alt', 'placeholder', 'title'].includes(target)) return `ustawienie ${target}`;
      if (VISIBLE_VARIABLES.has(target)) return `ustawienie ${target}`;
    }
    if (ts.isCallExpression(p)) {
      const fn = ts.isIdentifier(p.expression) ? p.expression.text : propertyName(p.expression);
      const i = indexOfArg(node, p);
      if (i < 0) continue;
      if (fn === 'setAttribute' && i === 1 && p.arguments[0] && VISIBLE_ATTRIBUTES.has(ts.isStringLiteral(p.arguments[0]) ? p.arguments[0].text : '')) {
        return 'atrybut dostępności';
      }
      if (fn === 'element' && i === 2) return 'element UI';
      if (fn === 'button' && i === 1) return 'przycisk UI';
      if (fn === 'heading' && i <= 1) return 'nagłówek UI';
      if (fn === 'fittedText' && i === 1) return 'napis na karcie';
      if (fn === 'shareVideo' && i === 1) return 'tytuł udostępnienia';
      if (SINGLE_ARG_CALLS.has(fn) && i === 0) return `wywołanie ${fn}`;
    }
    if (ts.isNewExpression(p) && nameOf(p.expression) === 'Error' && indexOfArg(node, p) === 0) return 'komunikat błędu';
  }
  return null;
}

function textOf(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return node.head.text + node.templateSpans.map((span) => {
      const expr = span.expression;
      const key = ts.isIdentifier(expr) ? expr.text : '…';
      return `{${key}}${span.literal.text}`;
    }).join('');
  }
  return '';
}

function decodeEntities(text) {
  const names = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…' };
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/giu, (match, key) => {
    if (key[0] === '#') {
      const value = Number.parseInt(key.slice(key[1]?.toLowerCase() === 'x' ? 2 : 1), key[1]?.toLowerCase() === 'x' ? 16 : 10);
      return Number.isFinite(value) && value > 0 && value <= 0x10ffff && !(value >= 0xd800 && value <= 0xdfff) ? String.fromCodePoint(value) : match;
    }
    return names[key.toLowerCase()] ?? match;
  });
}

function cleanText(raw, isMarkup = false) {
  let text = raw;
  if (isMarkup) text = text.replace(/<\/?[a-z][^>]*>/giu, ' ');
  return decodeEntities(text).replace(/\s+/gu, ' ').trim();
}

function add(entries, file, line, context, raw, isMarkup = false) {
  const text = cleanText(raw, isMarkup);
  if (text && /[\p{L}\p{N}]/u.test(text)) entries.push({ file, line, context, text });
}

function extractScript(entries, file, code) {
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const visit = (node) => {
    if (ts.isTemplateExpression(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const ctx = visibleContext(node, file);
      if (ctx) {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        const raw = textOf(node);
        add(entries, file, line, ctx, raw, /<\/?[a-z][^>]*>/iu.test(raw) && /innerHTML|element UI|przycisk UI/.test(ctx));
      }
      // Kompletnego template literal nie rozbijamy na osobne fragmenty.
      if (ts.isTemplateExpression(node)) return;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

function extractHtml(entries, file, html) {
  const cleaned = html.replace(/<!--[\s\S]*?-->/gu, (match) => ' '.repeat(match.length))
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/giu, (match) => ' '.repeat(match.length));
  const tags = [];
  const tokens = /<[^>]*>|[^<]+/gu;
  const voidTags = new Set(['meta', 'link', 'input', 'img', 'br', 'hr', 'source', 'area', 'wbr']);
  for (const match of cleaned.matchAll(tokens)) {
    const part = match[0];
    const line = cleaned.slice(0, match.index).split('\n').length;
    if (part.startsWith('<')) {
      if (/^<\//u.test(part)) { tags.pop(); continue; }
      const tag = /^<\s*([a-z][\w-]*)\b/iu.exec(part)?.[1]?.toLowerCase();
      if (!tag) continue;
      const attributes = new Map();
      for (const attr of part.matchAll(/([\w:-]+)\s*=\s*(['"])([\s\S]*?)\2/gu)) attributes.set(attr[1].toLowerCase(), attr[3]);
      for (const key of VISIBLE_ATTRIBUTES) if (attributes.has(key)) add(entries, file, line, `atrybut ${key} <${tag}>`, attributes.get(key));
      if (tag === 'meta' && (attributes.get('name') === 'description' || ['og:title', 'og:description', 'twitter:title', 'twitter:description'].includes(attributes.get('property')))) {
        add(entries, file, line, 'opis meta', attributes.get('content') ?? '');
      }
      if (!voidTags.has(tag) && !/\/\s*>$/u.test(part)) tags.push(tag);
    } else if (!tags.some((tag) => ['script', 'style', 'svg'].includes(tag))) {
      const context = tags.at(-1) === 'title' ? 'tytuł strony' : tags.includes('h1') ? 'h1 (tytuł gry)' : `HTML <${tags.at(-1) ?? 'tekst'}>`;
      add(entries, file, line, context, part);
    }
  }
}

async function listFiles(dir) {
  let children;
  try { children = await readdir(dir, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const files = [];
  for (const item of children.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const path = join(dir, item.name);
    if (item.isDirectory()) files.push(...await listFiles(path));
    else if (item.isFile() && /\.(?:ts|tsx|js|mjs)$/iu.test(item.name) && !/\.test\./u.test(item.name)) files.push(path);
  }
  return files;
}

export function forbiddenMatches(entry) {
  const found = [];
  for (const [category, regex] of PROHIBITED) {
    regex.lastIndex = 0;
    for (const match of entry.text.matchAll(regex)) found.push({ category, word: match[0].trim() });
  }
  // Pełna nazwa gry jest dozwolona w tytule, na karcie i w udostępnieniu;
  // w komunikatach pozostawienie samego słowa „cebulak” jest błędem.
  const withoutGameTitle = entry.text.replace(/cebulak\s+express/giu, '');
  if (!(entry.file === 'index.html' && entry.context === 'h1 (tytuł gry)' && entry.text.toLowerCase() === 'cebulak') && entry.context !== 'nazwa skórki') {
    for (const match of withoutGameTitle.matchAll(/cebulak\p{L}*/giu)) found.push({ category: '„cebulak” poza tytułem i skórką', word: match[0] });
  }
  return found;
}

function mdEscape(text) { return text.replace(/\\/gu, '\\\\').replace(/\|/gu, '\\|').replace(/`/gu, '\\`'); }

export function markdownReport(entries, violations) {
  const lines = [
    '# Wszystkie teksty widoczne dla gracza — do przeczytania',
    '',
    '> Plik generowany przez `node tools/qa/teksty.mjs`. Nie edytować ręcznie — poprawki zgłaszać w źródłach.',
    '> Zawiera statyczne literały tekstowe, nazwy miast, nicki, warianty komunikatów,',
    '> etykiety dostępności, teksty karty wyniku oraz napisy w HTML. `{…}` oznacza dane dynamiczne.',
    '> Nie obejmuje tekstów pobieranych z serwera, zawartości portali ani tekstów rasteryzowanych w grafikach.',
    '',
    `**Unikalnych wpisów (plik + tekst):** ${entries.length}. **Naruszeń:** ${violations.length}.`,
    '',
  ];
  if (violations.length) {
    lines.push('## Wykryte naruszenia — do decyzji właściciela', '');
    for (const v of violations) lines.push(`- **${mdEscape(v.category)}**: \`${v.file}:${v.line}\` — „${mdEscape(v.word)}” w „${mdEscape(v.text)}”`);
    lines.push('');
  }
  let currentFile = '';
  for (const entry of entries) {
    if (entry.file !== currentFile) {
      currentFile = entry.file;
      lines.push(`## \`${currentFile}\``, '');
    }
    lines.push(`- L${entry.lines.join(', ')} (${mdEscape(entry.context)}): ${mdEscape(entry.text)}`);
  }
  return lines.join('\n') + '\n';
}

export async function analyzeProject(root = ROOT) {
  const candidates = [
    ...await listFiles(join(root, 'src/content')),
    ...await listFiles(join(root, 'src/ui')),
    ...await listFiles(join(root, 'src/share')),
    join(root, 'src/main.ts'),
    join(root, 'src/core/route.ts'),
    join(root, 'index.html'),
  ];
  const raw = [];
  for (const filename of candidates) {
    let code;
    try { code = await readFile(filename, 'utf8'); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    const path = relative(root, filename).replaceAll('\\', '/');
    if (path.endsWith('.html')) extractHtml(raw, path, code);
    else extractScript(raw, path, code);
  }
  const unique = new Map();
  for (const entry of raw) {
    const key = `${entry.file}\u0000${entry.context}\u0000${entry.text}`;
    if (unique.has(key)) unique.get(key).lines.push(entry.line);
    else unique.set(key, { ...entry, lines: [entry.line] });
  }
  const entries = [...unique.values()].sort((a, b) => a.file.localeCompare(b.file, 'en') || a.line - b.line || a.text.localeCompare(b.text, 'pl'));
  const violations = entries.flatMap((entry) => forbiddenMatches(entry).map((v) => ({ ...v, ...entry })));
  const report = markdownReport(entries, violations);
  return { entries, violations, report };
}

async function main() {
  const { entries, violations, report } = await analyzeProject(ROOT);
  const path = join(ROOT, OUTPUT);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, report, 'utf8');
  console.log(`QA tekstów: ${entries.length} wpisów; ${violations.length} naruszeń; raport: ${OUTPUT}`);
  for (const v of violations) console.error(`NARUSZENIE [${v.category}] ${v.file}:${v.line}: ${JSON.stringify(v.word)} w ${JSON.stringify(v.text)}`);
  if (violations.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error('Błąd skryptu QA:', error); process.exitCode = 2; });
}
