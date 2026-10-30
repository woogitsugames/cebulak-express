import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { analyzeProject, forbiddenMatches } from './teksty.mjs';

async function project(t, sources) {
  const root = await mkdtemp(join(tmpdir(), 'ce-qa-texts-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [path, content] of Object.entries(sources)) {
    const full = join(root, path);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, content, 'utf8');
  }
  return analyzeProject(root);
}

test('zbiera teksty z zawartości, UI, HTML i nazw tras bez technicznych kluczy', async (t) => {
  const result = await project(t, {
    'src/content/pl.ts': "export const UI = { play: 'Lecimy!', garagePanCebulek: 'Pan Cebulek' }; export const BORDER_TEXTS = { PL: ['Witamy w Polsce!'] };",
    'src/content/waypoints.ts': "export const PT = [{ id: 'granica', name: 'Świecko', motifs: ['tylko dla grafika'], text: 'Kawa i jedziemy!' }];",
    'src/content/nicks.ts': "export const NICK_NOUNS = [{ m: 'Kierowca', f: 'Kierowczyni' }];",
    'src/content/portals.ts': "export const PORTALS = { BE: { label: 'Belgia', news: 'https://przykladowy-cebulak.pl/' } };",
    'src/core/route.ts': "const CITIES = [{ id: 'wawa', name: 'Warszawa', toName: 'Warszawy' }];",
    'src/ui/league.ts': "const TABS = [{ id: 'players', title: 'Gracze' }]; function paint(el) { el.textContent = 'Pobieranie wyników…'; const info = `Wynik ${12} km`; el.setAttribute('aria-label', 'Lista wyników'); }",
    'src/ui/record.ts': "const css = `<svg><path d='x'/></svg>`; btn.innerHTML = '<svg></svg> Nagraj rolkę';",
    'index.html': "<html><head><title>Cebulak Express — Kierunek Polska</title><meta name='description' content='Gra na jeden palec'></head><body><h1>Cebulak <span>Express</span></h1><button aria-label='Wróć'>Jeszcze raz</button><script>const bad='Ryanair'</script></body></html>",
  });
  const all = result.entries.map((e) => e.text);
  for (const phrase of ['Lecimy!', 'Witamy w Polsce!', 'Świecko', 'Kierowczyni', 'Belgia', 'Warszawy', 'Gracze', 'Pobieranie wyników…', 'Nagraj rolkę', 'Gra na jeden palec', 'Wróć', 'Jeszcze raz']) {
    assert.ok(all.includes(phrase), `Nie znaleziono tekstu ${phrase}`);
  }
  assert.ok(!all.includes('tylko dla grafika'));
  assert.ok(!all.some((s) => s.includes('przykladowy-cebulak.pl')));
  assert.ok(!all.includes('Ryanair'));
  assert.equal(result.violations.length, 0);
});

test('wykrywa zakazane słowa również w szablonach i raportuje linię', async (t) => {
  const result = await project(t, {
    'src/content/pl.ts': "export const UI = { drink: 'Pijemy piwo', game: 'Flappy Bird', insult: 'Ty cebulak', vendor: 'Ryanair', political: 'Sejm' };",
    'src/ui/league.ts': "function draw(e) { e.textContent = 'Kurwa, znowu!'; }",
  });
  assert.deepEqual(new Set(result.violations.map((v) => v.category)), new Set([
    'alkohol', 'niedozwolone nawiązanie do innej gry', '„cebulak” poza tytułem i skórką', 'prawdziwa marka', 'polityka', 'wulgaryzm',
  ]));
  assert.ok(result.violations.every((v) => v.line > 0));
  assert.match(result.report, /## Wykryte naruszenia/);
});

test('dozwolony tytuł gry, zakazane użycie samego słowa', () => {
  const e = (text, context = 'tytuł strony') => ({ file: 'index.html', context, text });
  assert.deepEqual(forbiddenMatches(e('Cebulak Express — Kierunek Polska')), []);
  assert.deepEqual(forbiddenMatches(e('Cebulak', 'h1 (tytuł gry)')), []);
  assert.equal(forbiddenMatches(e('Cebulak')).length, 1);
  assert.equal(forbiddenMatches(e('Cebulak Express: ten cebulak jedzie')).length, 1);
});

test('wydruk raportu jest deterministyczny', async (t) => {
  const sources = { 'src/content/pl.ts': "export const UI = { title: 'Lecimy!' };" };
  const first = await project(t, sources);
  const second = await project(t, sources);
  assert.equal(first.report, second.report);
});
