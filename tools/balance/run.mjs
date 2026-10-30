import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const START = '<!-- BALANCE-RAPORT-START -->';
const END = '<!-- BALANCE-RAPORT-END -->';

function readArgument(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index < 0) return fallback;
  if (index + 1 >= process.argv.length) throw new Error('Brak wartości po ' + flag);
  return Number(process.argv[index + 1]);
}

const runs = readArgument('--runs', 250);
const seed = readArgument('--seed', 1);
const allowed = new Set(['--runs', '--seed']);
for (let i = 2; i < process.argv.length; i++) {
  if (!allowed.has(process.argv[i])) throw new Error('Nieznany argument: ' + process.argv[i]);
  i++;
}

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let report;
try {
  const module = await server.ssrLoadModule('/tools/balance/simulator.ts');
  const started = performance.now();
  report = module.simulate(runs, seed);
  console.log('Symulacja: ' + report.totalRuns + ' przejazdów, ' +
    ((performance.now() - started) / 1000).toFixed(2) + ' s');
} finally {
  await server.close();
}

const fixed = (value, digits = 1) => value.toFixed(digits);
const rows = report.results.map(({ routeId, profileId, stats }) => {
  const route = report.routes.find((item) => item.id === routeId);
  const profile = report.profiles.find((item) => item.id === profileId);
  const rangeSec = fixed(stats.p10Sec) + ' / **' + fixed(stats.medianSec) + '** / ' + fixed(stats.p90Sec);
  const rangeKm = fixed(stats.p10Km, 0) + ' / **' + fixed(stats.medianKm, 0) +
    '** / ' + fixed(stats.p90Km, 0);
  return '| ' + route.label + ' | ' + profile.name + ' | ' + rangeSec + ' | ' + rangeKm +
    ' | ' + fixed(stats.arrivalPct) + '% |';
}).join('\n');

const scenarioNames = {
  normal: 'Pełna mechanika',
  'without-weight': 'Znajdźki bez ciężaru',
  'without-pickups': 'Bez znajdźek i ciężaru',
};
const scenarios = report.scenarios.map(({ scenario, stats }) => {
  return '| ' + scenarioNames[scenario] + ' | ' + fixed(stats.medianSec) +
    ' | ' + fixed(stats.meanKm) + ' | ' + fixed(stats.meanRawKm) +
    ' | ' + fixed(stats.meanBonusKm) + ' | ' + fixed(stats.arrivalPct) +
    '% | ' + fixed(stats.meanParcels) + ' / ' + fixed(stats.meanJars) +
    ' | ' + fixed(stats.meanWeight, 3) + ' |';
}).join('\n');

const routeDescriptions = report.routes.map((route) =>
  '**' + route.label + ': ' + route.totalKm + ' km**').join('; ');
const profileDescriptions = report.profiles.map((profile) =>
  '**' + profile.name + '** (' + profile.reactionMs + ' ms; szum ±' +
  profile.aimNoisePx + ' px; pominięte tapnięcia ' +
  fixed(profile.missedTapProb * 100) + '%)').join('; ');

const section = [
  '## Wyniki symulacji (generowane automatycznie)',
  '',
  '*Dane z Game w src/core/game.ts, tryb rankingowy; nie są wynikami testów z ludźmi. Dane odtwarzalne przy tym samym kodzie i ziarnach.*',
  '',
  '- Liczba przejazdów: **' + report.totalRuns + '** (' + report.runsPerGroup +
    ' na grupę); ziarna przeszkód: **' + report.firstSeed + '–' +
    (report.firstSeed + report.runsPerGroup - 1) + '**; limit: **240 s**.',
  '- Trasy: ' + routeDescriptions + '.',
  '- Profile: ' + profileDescriptions + '.',
  '- Parametry rdzenia: KM_PER_PX=' + report.core.kmPerPx +
    ', rampSeconds=' + report.core.difficulty.rampSeconds +
    ', PICKUPS.chance=' + report.core.pickupChance + '.',
  '',
  '### Rozkład przejazdów i dojazdy do mety',
  '',
  'W kolumnach czasu i km podano **P10 / medianę / P90**, a „meta” to odsetek pełnych przejazdów. Krótkie trasy mogą ograniczyć długość przejazdu przez dotarcie do mety.',
  '',
  '| Trasa | Bot | Czas [s]: P10 / P50 / P90 | Wynik [km]: P10 / P50 / P90 | Meta |',
  '|---|---|---:|---:|---:|',
  rows,
  '',
  '### Znajdźki i ciężar — porównanie kontrolowane',
  '',
  'Ten sam bot **Sprawny**, trasa **BE: Bruksela → Wrocław**, te same ziarna w każdym wariancie. „Bez ciężaru” zachowuje premie km; „bez znajdźek” wyłącza i premie, i dodatkową grawitację. **Średnie km** są ograniczone długością trasy; „km z dystansu” liczone są bez premii. Średnia waga to średnia po tickach w obrębie przejazdów.',
  '',
  '| Wariant | Mediana [s] | Śr. wynik [km] | Śr. km z dystansu | Śr. bonus [km] | Meta | Śr. paczki / słoiki | Śr. waga |',
  '|---|---:|---:|---:|---:|---:|---:|---:|',
  scenarios,
  '',
  '*Uwaga: ciężar może pomóc temu konkretnemu autopilotowi, bo jego sterowanie czasem podbija za wcześnie; wyników porównania nie wolno traktować jako dowodu wpływu wagi na ludzkich graczy. Wariant „bez znajdźek” ustawia taken=true dla dostępnych znajdźek, a „bez ciężaru” zeruje game.weight przed każdym tickiem — bez modyfikacji rdzenia.*',
].join('\n');

const path = 'docs/balans.md';
const original = readFileSync(path, 'utf8');
const startIndex = original.indexOf(START);
const endIndex = original.indexOf(END);
if (startIndex < 0 || endIndex < startIndex ||
    original.indexOf(START, startIndex + 1) >= 0 ||
    original.indexOf(END, endIndex + 1) >= 0) {
  throw new Error('Brak jednoznacznych znaczników raportu w ' + path);
}

const updated = original.slice(0, startIndex + START.length) +
  '\n\n' + section + '\n\n' + original.slice(endIndex);
writeFileSync(path, updated);
writeFileSync('tools/balance/raport.json', JSON.stringify(report, null, 2) + '\n');
console.log('Zapisano ' + path + ' oraz tools/balance/raport.json');
