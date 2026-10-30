/** Składa statyczną stronę i istniejący build Vite do dist-site/.
 * Użycie: npm run build:site (wywołuje najpierw npm run build).
 * SITE_ORIGIN=https://... SITE_BASE_PATH=/ (lub /cebulak-express/ na GitHub Pages)
 * SITE_CONTACT_EMAIL=... (dopiero po zatwierdzeniu danych przez właściciela).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, relative, sep, dirname } from 'node:path';
import { escapeHtml, markdownToHtml } from './site-markdown.mjs';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const outDir = resolve(root, 'dist-site');
const gameDir = join(root, 'dist');
const siteDir = join(root, 'site');

if (!existsSync(join(gameDir, 'index.html'))) {
  throw new Error('Brak dist/index.html. Najpierw uruchom npm run build.');
}

const base = process.env.SITE_BASE_PATH || '/';
if (!/^\/(?:[a-zA-Z0-9._~-]+\/)*$/.test(base)) {
  throw new Error('SITE_BASE_PATH musi być ścieżką absolutną zakończoną / (np. / lub /cebulak-express/).');
}
const originInput = process.env.SITE_ORIGIN || 'https://domena-do-uzupelnienia.invalid';
let origin;
try {
  const url = new URL(originInput);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('Niepoprawny origin');
  }
  origin = url.origin;
} catch {
  throw new Error('SITE_ORIGIN musi mieć postać https://domena.pl bez ścieżki i parametrów.');
}
const publicUrl = origin + base;
const asset = (path) => base + path;
const replaceAll = (value, from, to) => value.split(from).join(to);

function seo(path, title, description) {
  const url = publicUrl + path;
  const image = publicUrl + 'assets/brand/og-1200x630.png';
  const a = escapeHtml;
  return [
    '<link rel="canonical" href="' + a(url) + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Cebulak Express — Kierunek Polska">',
    '<meta property="og:title" content="' + a(title) + '">',
    '<meta property="og:description" content="' + a(description) + '">',
    '<meta property="og:url" content="' + a(url) + '">',
    '<meta property="og:image" content="' + a(image) + '">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + a(title) + '">',
    '<meta name="twitter:description" content="' + a(description) + '">',
    '<meta name="twitter:image" content="' + a(image) + '">',
  ].join('\n  ');
}
function buildPage(file, variables = {}, title = '', description = '') {
  let html = read('site/' + file);
  html = replaceAll(html, '__BASE__', base);
  html = replaceAll(html, '__SITE_META__', seo(file === 'index.html' ? '' : file, title, description));
  for (const [key, value] of Object.entries(variables)) {
    html = replaceAll(html, key, value);
  }
  if (/__[A-Z][A-Z_]+__/.test(html)) throw new Error('Nierozwinięty token szablonu w: ' + file);
  writeFileSync(join(outDir, file), html, 'utf8');
}

function findFiles(folder, filename, acc = []) {
  if (!existsSync(folder)) return acc;
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const full = join(folder, entry.name);
    if (entry.isDirectory()) findFiles(full, filename, acc);
    else if (entry.isFile() && entry.name === filename) acc.push(full);
  }
  return acc;
}
function screenshots() {
  const files = [
    ['01-jeden-dotyk.png', 'Jeden dotyk i lecisz', 'Prawdziwy kadr rozgrywki'],
    ['02-z-osmiu-krajow.png', 'Z ośmiu krajów do Polski', 'Wybór kraju i trasy'],
    ['03-bagaz-na-dachu.png', 'Bagaż na dachu', 'Kombi w ruchu'],
  ];
  return files.map(([name, caption, alt], i) => {
    const src = join(root, 'public/assets/store', name);
    const body = existsSync(src)
      ? '<img src="' + asset('assets/store/' + name) + '" alt="' + escapeHtml(alt) +
        '" width="360" height="640" loading="lazy" decoding="async">'
      : '<div class="shot-placeholder"><span aria-hidden="true">' + (i + 1) +
        '</span><strong>Zrzut w przygotowaniu</strong><small>Po wykonaniu autentycznego przechwycenia z gry</small></div>';
    if (existsSync(src)) {
      mkdirSync(join(outDir, 'assets/store'), { recursive: true });
      cpSync(src, join(outDir, 'assets/store', name));
    }
    return '<figure class="shot-card"><div class="shot-frame">' + body + '</div><figcaption>' +
      escapeHtml(caption) + '</figcaption></figure>';
  }).join('\n');
}

function embedCode() {
  const gameUrl = publicUrl + 'graj/?kraj=be&z=antwerpia';
  const code = '<div style="width:100%;max-width:420px;aspect-ratio:9/16;margin:auto">\n' +
    '  <iframe src="' + gameUrl.replace(/&/g, '&amp;') + '"\n' +
    '    title="Gra: Cebulak Express — Kierunek Polska"\n' +
    '    loading="lazy" allow="fullscreen; web-share; autoplay" allowfullscreen\n' +
    '    referrerpolicy="strict-origin-when-cross-origin"\n' +
    '    style="width:100%;height:100%;border:0"></iframe>\n' +
    '</div>';
  return escapeHtml(code);
}

function privacyPages() {
  const source = read('docs/prawo/polityka-prywatnosci.md');
  const englishIndex = source.search(/\n## English(?:\s| —)/);
  const editorialIndex = source.indexOf('\n## Kontrola wydawnicza');
  if (englishIndex < 0 || editorialIndex <= englishIndex) {
    throw new Error('Zmienił się podział polityki prywatności. Sprawdź nagłówki źródła.');
  }
  const polish = source.slice(0, englishIndex);
  const english = source.slice(englishIndex, editorialIndex);
  const polishIsDraft = /Wersja robocza do publikacji|\[UZUPEŁNIJ/i.test(polish);
  const englishIsSummary = /short privacy summary|not a substitute|\[(?:INSERT|TO BE CONFIRMED)/i.test(english);
  const draftPL = polishIsDraft
    ? '<aside class="notice" role="status"><strong>Projekt polityki — nie publikować jako wersji ostatecznej.</strong>' +
      'Brakuje zatwierdzenia prawnego i danych oznaczonych w dokumencie. Wersja tylko do podglądu.</aside>'
    : '';
  const draftEN = englishIsSummary
    ? '<aside class="notice" role="status"><strong>Draft — not a final privacy policy.</strong>' +
      'This is a short summary only, not a complete English translation. Publication requires legal review.</aside>'
    : '';
  buildPage('prywatnosc.html', { '__POLICY_CONTENT__': draftPL + markdownToHtml(polish, { skipTitle: true }) },
    'Polityka prywatności — Cebulak Express', 'Informacje o danych i prawach graczy.');
  buildPage('prywatnosc-en.html', {
    '__POLICY_CONTENT__': draftEN + markdownToHtml(english) +
      '<p><a href="' + asset('prywatnosc.html') + '">Read the Polish policy</a></p>',
    '__EN_PAGE_TITLE__': englishIsSummary ? 'Privacy summary' : 'Privacy policy',
    '__EN_PAGE_INTRO__': englishIsSummary ? 'English-language summary of the Polish draft policy.' :
      'Privacy information for players using the web and mobile game.',
  }, englishIsSummary ? 'Privacy summary — Cebulak Express' : 'Privacy policy — Cebulak Express',
    englishIsSummary ? 'English privacy summary (draft; not a complete translation).' : 'Privacy policy for Cebulak Express.');
}

function licensesPage() {
  const folders = [join(root, 'public/assets'), join(root, 'assets')];
  const files = folders.flatMap((folder) => findFiles(folder, 'ASSETS.md'));
  const groups = files.sort((a,b)=>a.localeCompare(b)).map((file) => {
    const location = relative(root, file).split(sep).join('/');
    const md = readFileSync(file, 'utf8');
    return '<details class="license-group"><summary>' + escapeHtml(location) + '</summary>' +
      markdownToHtml(md, { skipTitle: true }) + '</details>';
  }).join('\n');
  buildPage('licencje.html', { '__LICENSE_CONTENT__': '<p>Wykaz generowany automatycznie z ' +
    files.length + ' plików <code>ASSETS.md</code>. Źródła i licencje są opisane przez autorów ' +
    'odpowiednich zasobów; szczegóły w rozwijanych sekcjach.</p>' + groups },
    'Licencje i autorzy — Cebulak Express', 'Pochodzenie i licencje zasobów projektu.');
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(gameDir, join(outDir, 'graj'), { recursive: true });

for (const folder of ['brand', 'hero']) {
  const from = join(root, 'public/assets', folder);
  if (!existsSync(from)) throw new Error('Brak plików źródłowych: ' + from);
  const dest = join(outDir, 'assets', folder);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(from, dest, { recursive: true });
}
cpSync(join(siteDir, 'styles.css'), join(outDir, 'styles.css'));
writeFileSync(join(outDir, '.nojekyll'), '');

buildPage('index.html', { '__SCREENSHOTS__': screenshots(), '__EMBED_CODE__': embedCode() },
  'Cebulak Express — Kierunek Polska | Gra online',
  'Z ośmiu krajów do Polski: steruj przeładowanym kombi jednym dotknięciem.');
privacyPages();
licensesPage();
const email = process.env.SITE_CONTACT_EMAIL?.trim() || '';
if (email && !/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(email)) throw new Error('Niepoprawny SITE_CONTACT_EMAIL');
const contact = email
  ? '<p><a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></p>'
  : '<p class="contact-placeholder">[UZUPEŁNIJ: publiczny adres e-mail administratora]</p>';
buildPage('kontakt.html', { '__CONTACT__': contact }, 'Kontakt — Cebulak Express',
  'Kontakt w sprawie gry Cebulak Express.');
const gameHtml = readFileSync(join(outDir, 'graj/index.html'), 'utf8');
if (/(?:src|href)=["']\/(?:assets|src)\//.test(gameHtml)) {
  throw new Error('Build gry używa ścieżki bezwzględnej; pod /graj/ wymagany Vite base: ./');
}
console.log('Zbudowano dist-site/ — landing, /graj/, polityka PL/EN, licencje, kontakt.');
console.log('Publiczny adres: ' + publicUrl + ' (w podglądzie może być placeholderem).');
