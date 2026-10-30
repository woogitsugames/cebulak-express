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
