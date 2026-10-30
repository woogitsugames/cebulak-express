// Składa zbudowaną grę (dist/) w jeden plik HTML do podglądu na telefonie (Artifact claude.ai).
// Użycie: npm run build && node scripts/build-artifact.mjs <plik-wyjściowy>
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] ?? 'dist/cebulak-express.html';
let html = readFileSync('dist/index.html', 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/([^"]+)"[^>]*>/g, (_, href) =>
  `<style>${readFileSync(join('dist', href), 'utf8')}</style>`,
);
html = html.replace(/<script type="module"[^>]*src="\.\/([^"]+)"[^>]*><\/script>/g, (_, src) =>
  `<script type="module">${readFileSync(join('dist', src), 'utf8').replace(/<\/script/g, '<\\/script')}</script>`,
);
// Szkielet strony dodaje platforma — zostawiamy tytuł, style i treść.
html = html
  .replace(/<!doctype html>/i, '')
  .replace(/<\/?html[^>]*>/g, '')
  .replace(/<\/?head>/g, '')
  .replace(/<\/?body>/g, '')
  .replace(/<meta charset[^>]*>/g, '')
  .replace(/<meta name="viewport"[^>]*>/g, '');
const title = html.match(/<title>.*?<\/title>/)[0];
html = title + '\n' + html.replace(title, '');
writeFileSync(out, html.trim() + '\n');
console.log(`Zapisano ${out} (${(html.length / 1024).toFixed(1)} kB)`);
