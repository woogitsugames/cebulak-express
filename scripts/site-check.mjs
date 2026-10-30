/** Kontrole statyczne hostingu i ostrożny gate publikacji.
 * node scripts/site-check.mjs [--release]
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const release = process.argv.includes('--release');
const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const hosting = JSON.parse(read('firebase.json')).hosting;
const policy = read('docs/prawo/polityka-prywatnosci.md');
const portals = read('src/content/portals.ts');
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

const urls = [...portals.matchAll(/\b(?:news|guides|facebook):\s*'(https:\/\/[^']+)'/g)]
  .map((match) => new URL(match[1]).origin);
const expected = [...new Set(urls)].sort();
const csp = hosting?.headers?.flatMap((entry) => entry.headers || [])
  .find((header) => header.key.toLowerCase() === 'content-security-policy')?.value || '';
const directive = /(?:^|;)\s*frame-ancestors\s+([^;]+)/.exec(csp)?.[1] || '';
const approved = directive.split(/\s+/).filter((s) => /^https:\/\//.test(s)).sort();
expect(expected.length > 0, 'Brak adresów portali w src/content/portals.ts');
expect(JSON.stringify(expected) === JSON.stringify(approved),
  'CSP frame-ancestors nie odpowiada dokładnie domenom z src/content/portals.ts');
expect(directive.includes("'self'"), 'CSP frame-ancestors musi zezwalać na self');
expect(hosting?.public === 'dist-site', 'Firebase Hosting musi publikować dist-site');
expect(csp.includes("object-src 'none'") && csp.includes("base-uri 'self'"), 'Brakuje zabezpieczeń CSP');
const game = read('dist-site/graj/index.html');
expect(!/(?:src|href)=["']\/(?:src|assets)\//.test(game), 'Build gry zawiera bezwzględne URL');
for (const name of ['index.html','prywatnosc.html','prywatnosc-en.html','licencje.html','kontakt.html','styles.css','graj/index.html']) {
  expect(existsSync(join(root, 'dist-site', name)), 'Brak pliku ' + name);
}
const landing = read('dist-site/index.html');
expect(landing.includes('href=') && landing.includes('graj/'), 'Brak linku do gry');
expect((landing.match(/class="shot-card"/g)||[]).length === 3, 'Muszą istnieć 3 kafelki zrzutów');
expect(!/__[A-Z][A-Z_]+__/.test(landing), 'Nierozwinięte zmienne szablonu');
for (const path of ['dist-site/prywatnosc.html','dist-site/prywatnosc-en.html']) {
  const html = read(path);
  expect(!html.includes('Kontrola wydawnicza'), 'Do strony prawnej wyciekła sekcja wewnętrzna');
}
if (release) {
  const origin = process.env.SITE_ORIGIN || '';
  const email = process.env.SITE_CONTACT_EMAIL || '';
  expect(/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(origin) && !origin.includes('.invalid'),
    'Publikacja wymaga rzeczywistego SITE_ORIGIN (HTTPS, bez / na końcu).');
  expect(/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(email), 'Publikacja wymaga SITE_CONTACT_EMAIL');
  expect(process.env.SITE_LEGAL_APPROVED === 'YES', 'Wymagane świadome zatwierdzenie prawne SITE_LEGAL_APPROVED=YES');
  expect(!/\[(?:UZUPEŁNIJ|INSERT|TO BE CONFIRMED)/i.test(policy), 'W polityce pozostały nieuzupełnione pola');
  expect(!/Wersja robocza do publikacji|short privacy summary \(not a substitute/i.test(policy),
    'Polityka nadal jest szkicem / angielska wersja jest tylko streszczeniem');
  expect(readdirSync(join(root, 'public/assets/store')).filter((name) => /^0[1-3]-.*\.png$/.test(name)).length === 3,
    'Publikacja wymaga trzech autentycznych zrzutów z gry w public/assets/store/');
}
if (failures.length) {
  for (const failure of failures) console.error('BŁĄD: ' + failure);
  process.exitCode = 1;
} else {
  console.log('Kontrola strony: OK' + (release ? ' (publikacja)' : ' (wersja do podglądu)'));
}
