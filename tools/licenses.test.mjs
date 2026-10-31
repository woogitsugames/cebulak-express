import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateLicenses, parseAssetTables } from './licenses.mjs';

test('licencje: tabele o różnych kolumnach i polskie nagłówki', () => {
  const markdown = [
    '| Plik | Rozmiar px | Źródło / narzędzie | Licencja | Uwagi |',
    '|---|---:|---|---|---|',
    '| foo.png | 10 | Autorskie | CC0 | Ręcznie |',
    '',
    '| plik | źródło/narzędzie | licencja | autor/uwagi |',
    '|---|---|---|---|',
    '| bar.png | Swoje | Własne | Tło |',
  ].join('\n');
  const tables = parseAssetTables(markdown);
  assert.equal(tables.length, 2);
  assert.equal(tables[0].rows[0][0], 'foo.png');
  assert.equal(tables[1].rows[0][2], 'Własne');
});

test('licencje: bezpieczny HTML i wszystkie pliki w podfolderach', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ce-licenses-'));
  try {
    const path = join(root, 'public', 'assets', 'hero');
    await mkdir(path, { recursive: true });
    await writeFile(join(path, 'ASSETS.md'),
      ['| Plik | Licencja |', '|---|---|', '| <script> | CC0 & własne |'].join('\n'), 'utf8');
    const result = await generateLicenses(root);
    assert.equal(result.sources, 1);
    assert.equal(result.entries, 1);
    const html = await readFile(result.destination, 'utf8');
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(html.includes('CC0 &amp; własne'));
    assert.ok(!html.includes('<script>'));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('licencje: biblioteki produkcyjne z package-lock, bez dev, pełny tekst także bez pliku LICENSE', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ce-libs-'));
  try {
    const assets = join(root, 'public', 'assets', 'ui');
    await mkdir(assets, { recursive: true });
    await writeFile(join(assets, 'ASSETS.md'), ['| Plik | Licencja |', '|---|---|', '| a.png | Własne |'].join('\n'), 'utf8');
    const apache = 'Apache License\nVersion 2.0, January 2004\nTERMS AND CONDITIONS FOR USE <tekst>';
    await writeFile(join(root, 'package-lock.json'), JSON.stringify({ packages: {
      '': { name: 'gra' },
      'node_modules/z-lib': { version: '1.0.0', license: 'Apache-2.0' },
      'node_modules/@firebase/app': { version: '0.1.0', license: 'Apache-2.0' },
      'node_modules/vitest': { version: '9.9.9', license: 'MIT', dev: true },
    } }), 'utf8');
    await mkdir(join(root, 'node_modules', 'z-lib'), { recursive: true });
    await writeFile(join(root, 'node_modules', 'z-lib', 'package.json'), JSON.stringify({ repository: 'git+https://github.com/x/z-lib.git' }), 'utf8');
    await writeFile(join(root, 'node_modules', 'z-lib', 'LICENSE'), apache, 'utf8');
    await writeFile(join(root, 'node_modules', 'z-lib', 'NOTICE'), 'Copyright X', 'utf8');
    const result = await generateLicenses(root);
    assert.equal(result.libraries, 2);
    const html = await readFile(result.destination, 'utf8');
    assert.ok(html.includes('Biblioteki open source'));
    assert.ok(!html.includes('vitest'), 'pakiety dev nie trafiają do wykazu');
    assert.ok(html.includes('href="https://github.com/x/z-lib"'));
    assert.ok(html.includes('Copyright X'), 'NOTICE dołączony');
    assert.ok(html.includes('Copyright Google LLC (Firebase JavaScript SDK).'));
    assert.equal(html.split('TERMS AND CONDITIONS FOR USE &lt;tekst&gt;').length - 1, 2, 'pełny tekst Apache także dla pakietu bez pliku');
    assert.ok(!html.includes('<tekst>'));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('licencje: biblioteka GPL lub bez licencji zatrzymuje build', async () => {
  const { disallowedLibraries } = await import('./licenses.mjs');
  const bad = disallowedLibraries([
    { name: 'ok', license: 'MIT' }, { name: 'dual', license: '(MIT OR GPL-3.0)' },
    { name: 'gpl', license: 'GPL-3.0' }, { name: 'nc', license: 'CC-BY-NC-4.0' }, { name: 'brak', license: 'brak w package-lock' },
  ]);
  assert.deepEqual(bad.map((lib) => lib.name), ['gpl', 'nc', 'brak']);
});
