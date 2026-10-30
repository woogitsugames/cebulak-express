import test from 'node:test';
import assert from 'node:assert/strict';
import { COUNTRIES, parseWeek, previousWeek, lastClosedWarsawWeek, normalizeLeague, mockLeague, rankLeague } from './data.mjs';
import { buildPostsMarkdown, postHtml, reelHtml } from './render.mjs';
import { parseArgs } from './report.mjs';

const demo = mockLeague('2026-W50');
const older = mockLeague('2026-W49');
const opts = { gameUrl: '[LINK_GRA]', mock: true, generatedAt: new Date('2026-12-14T08:00:00Z') };

test('tygodnie ISO, przejście roku i 53. tydzień', () => {
  assert.equal(previousWeek('2021-W01'), '2020-W53');
  assert.equal(previousWeek('2026-W01'), '2025-W52');
  assert.doesNotThrow(() => parseWeek('2020-W53'));
  assert.throws(() => parseWeek('2021-W53'), /nie ma tygodnia/);
  assert.throws(() => parseWeek('../secret'), /postać/);
  assert.throws(() => parseWeek('2026-W00'), /postać/);
});

test('ostatni zamknięty tydzień używa strefy warszawskiej', () => {
  assert.equal(lastClosedWarsawWeek(new Date('2026-12-14T00:30:00Z')), '2026-W50');
  assert.equal(lastClosedWarsawWeek(new Date('2027-01-01T11:00:00Z')), '2026-W52');
  assert.equal(lastClosedWarsawWeek(new Date('2026-12-13T23:30:00Z')), '2026-W50');
});

test('mock jest deterministyczny, z 8 krajami i poprawnymi liczbami', () => {
  assert.deepEqual(mockLeague('2026-W50'), demo);
  assert.equal(Object.keys(demo.countries).length, 8);
  assert.ok(COUNTRIES.every(({ code }) => demo.countries[code].km >= 0));
});

test('nie myli braku kraju z zerem, odrzuca uszkodzone wartości i brak danych', () => {
  assert.deepEqual(Object.keys(normalizeLeague({ countries: { BE: { km: 0, runs: 0, players: 0 } } }, '2026-W50').countries), ['BE']);
  assert.throws(() => normalizeLeague({ countries: {} }, '2026-W50'), /Brak wyników/);
  assert.throws(() => normalizeLeague(null, '2026-W50'), /nie istnieje/);
  assert.throws(() => normalizeLeague({ countries: { BE: { km: -1, runs: 0, players: 0 } } }, '2026-W50'), /Niepoprawna liczba/);
});

test('wybiera największą zmianę bezwzględną; zachowuje brak porównania', () => {
  const ranking = rankLeague(demo, older);
  const expected = ranking.rows.filter((r) => r.delta !== null).reduce((a, b) => Math.abs(a.delta) >= Math.abs(b.delta) ? a : b);
  assert.equal(ranking.biggestChange.code, expected.code);
  assert.equal(rankLeague(demo, null).biggestChange, null);
  assert.ok(rankLeague({ countries: { BE: { km: 0, runs: 0, players: 0 } } }, null).rows.find(r => r.code === 'NL').place === null);
});

test('teksty: osiem krajów, każdy z pięcioma hashtagami, pierwszy krajowy', () => {
  const markdown = buildPostsMarkdown(demo, older, opts);
  const sections = markdown.split(/^## /m).slice(1);
  assert.equal(sections.length, 8);
  for (let i = 0; i < sections.length; i++) {
    const hashtags = sections[i].match(/#[\p{L}\d_]+/gu) ?? [];
    assert.equal(hashtags.length, 5);
    assert.equal(hashtags[0], COUNTRIES[i].hashtag);
  }
  assert.match(markdown, /DANE TESTOWE — NIE PUBLIKOWAĆ/);
  assert.doesNotMatch(markdown, /nagrod|wygran|losowan/i);
});

test('layout ma prawidłowe wymiary, logo, flagi i oznaczenie próbne', () => {
  const assets = { logo: 'data:image/svg+xml;base64,dGVzdA==', flags: { BE: 'data:image/png;base64,dGVzdA==' } };
  const post = postHtml(demo, older, { ...opts, assets });
  const reel = reelHtml(demo, older, { ...opts, assets });
  assert.match(post, /width:1080px;height:1350px/);
  assert.match(reel, /width:1080px;height:1920px/);
  assert.match(post, /LIGA POLONII/);
  assert.match(reel, /ZMIANA TYGODNIA/);
  assert.match(post, /DEMO · DANE TESTOWE/);
  assert.match(reel, /DEMO · DANE TESTOWE/);
  assert.match(post, /Flaga BE/);
});

test('escapuje adres URL w kodzie HTML (bez wstrzyknięcia znaczników)', () => {
  const post = postHtml(demo, older, { ...opts, gameUrl: 'https://example.com/?a=1&b=<x>' });
  assert.match(post, /a=1&amp;b=&lt;x&gt;/);
  assert.doesNotMatch(post, /<x>/);
});

test('CLI akceptuje tydzień i --mock, odrzuca nieznane przełączniki', () => {
  const args = parseArgs(['--week=2026-W50', '--mock', '--out-dir=out']);
  assert.equal(args.week, '2026-W50');
  assert.equal(args.mock, true);
  assert.throws(() => parseArgs(['--unknown']), /Nieznany argument/);
  assert.throws(() => parseArgs(['--week=2021-W53']), /nie ma tygodnia/);
});
