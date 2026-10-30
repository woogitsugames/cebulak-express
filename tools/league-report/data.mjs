/** Kontrakt raportu odpowiada src/net/api.ts: LeagueData.countries[HomeCountry]. */
export const COUNTRIES = Object.freeze([
  { code: 'BE', name: 'Belgia', inCountry: 'Belgii', fromCountry: 'Belgii', hashtag: '#PoloniaBelgia' },
  { code: 'NL', name: 'Holandia', inCountry: 'Holandii', fromCountry: 'Holandii', hashtag: '#PoloniaHolandia' },
  { code: 'DE', name: 'Niemcy', inCountry: 'Niemczech', fromCountry: 'Niemiec', hashtag: '#PoloniaNiemcy' },
  { code: 'UK', name: 'Wielka Brytania', inCountry: 'Wielkiej Brytanii', fromCountry: 'Wielkiej Brytanii', hashtag: '#PoloniaUK' },
  { code: 'FR', name: 'Francja', inCountry: 'Francji', fromCountry: 'Francji', hashtag: '#PoloniaFrancja' },
  { code: 'CH', name: 'Szwajcaria', inCountry: 'Szwajcarii', fromCountry: 'Szwajcarii', hashtag: '#PoloniaSzwajcaria' },
  { code: 'NO', name: 'Norwegia', inCountry: 'Norwegii', fromCountry: 'Norwegii', hashtag: '#PoloniaNorwegia' },
  { code: 'DK', name: 'Dania', inCountry: 'Danii', fromCountry: 'Danii', hashtag: '#PoloniaDania' },
]);

const DAY = 86_400_000;
const WEEK = 7 * DAY;
const numberFormat = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 });
export const formatKm = (km) => `${numberFormat.format(km)} km`;

function mondayOfFirstIsoWeek(year) {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  return jan4.getTime() - ((jan4.getUTCDay() + 6) % 7) * DAY;
}

export function parseWeek(value) {
  const match = /^(20\d{2})-W(0[1-9]|[1-4]\d|5[0-3])$/.exec(value ?? '');
  if (!match) throw new Error('Tydzień musi mieć postać RRRR-WTT, np. 2026-W50.');
  const year = Number(match[1]);
  const week = Number(match[2]);
  const start = mondayOfFirstIsoWeek(year) + (week - 1) * WEEK;
  if (start >= mondayOfFirstIsoWeek(year + 1)) {
    throw new Error(`Rok ${year} nie ma tygodnia W${match[2]}.`);
  }
  return { year, week, start };
}

function weekForUtcDate(date) {
  const stamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const thursday = new Date(stamp + (3 - ((date.getUTCDay() + 6) % 7)) * DAY);
  const year = thursday.getUTCFullYear();
  const week = 1 + Math.floor((stamp - ((date.getUTCDay() + 6) % 7) * DAY - mondayOfFirstIsoWeek(year)) / WEEK);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

export function previousWeek(value) {
  return weekForUtcDate(new Date(parseWeek(value).start - WEEK));
}

/** Publikujemy zamknięty poprzedni tydzień, nie bieżącą niepełną kolejkę. */
export function lastClosedWarsawWeek(now = new Date()) {
  if (Number.isNaN(now.getTime())) throw new Error('Niepoprawna data.');
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (key) => Number(parts.find((p) => p.type === key)?.value);
  return weekForUtcDate(new Date(Date.UTC(part('year'), part('month') - 1, part('day')) - WEEK));
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function nonnegativeInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Niepoprawna liczba w ${field}; raport nie zostanie opublikowany.`);
  }
  return value;
}

export function normalizeLeague(data, week) {
  parseWeek(week);
  if (!isRecord(data) || !isRecord(data.countries)) {
    throw new Error(`Dokument league/${week} nie istnieje lub nie zawiera mapy countries.`);
  }
  const countries = {};
  for (const { code } of COUNTRIES) {
    const value = data.countries[code];
    if (value === undefined) continue; // Brak wpisu to nie to samo co zero kilometrów.
    if (!isRecord(value)) throw new Error(`Niepoprawny wpis kraju ${code} w league/${week}.`);
    countries[code] = {
      km: nonnegativeInteger(value.km, `league/${week}/countries/${code}/km`),
      runs: nonnegativeInteger(value.runs, `league/${week}/countries/${code}/runs`),
      players: nonnegativeInteger(value.players, `league/${week}/countries/${code}/players`),
    };
  }
  if (Object.keys(countries).length === 0) {
    throw new Error(`Brak wyników krajów w league/${week}; nie tworzę pustej tabeli.`);
  }
  return { week, countries };
}

/** Te same wartości bazowe co seedDemo() w MockRankingApi; wahania są umowne i deterministyczne. */
export function mockLeague(week) {
  const { start } = parseWeek(week);
  const ordinal = Math.round(start / WEEK);
  const bases = [184_250, 162_480, 145_120, 131_900, 116_500, 98_000, 81_200, 65_900];
  const countries = {};
  COUNTRIES.forEach(({ code }, index) => {
    const km = bases[index] + Math.round(Math.sin(ordinal * 0.76 + index * 1.63) * 10_500);
    countries[code] = { km, runs: 1_200 - index * 120, players: 310 - index * 27 };
  });
  return normalizeLeague({ countries }, week);
}

export function rankLeague(current, previous = null) {
  const rows = COUNTRIES.map((country, index) => {
    const stats = current.countries[country.code] ?? null;
    const older = previous?.countries[country.code] ?? null;
    return { ...country, initialOrder: index, stats, delta: stats && older ? stats.km - older.km : null, previousKm: older?.km ?? null };
  });
  rows.sort((a, b) => (b.stats !== null) - (a.stats !== null)
    || (b.stats?.km ?? 0) - (a.stats?.km ?? 0)
    || a.initialOrder - b.initialOrder);
  let place = 0;
  rows.forEach((row) => { row.place = row.stats ? ++place : null; });
  const comparable = rows.filter((row) => row.delta !== null);
  comparable.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)
    || (b.stats.km - a.stats.km) || (a.initialOrder - b.initialOrder));
  return { rows, leader: rows.find((row) => row.place === 1), biggestChange: comparable[0] ?? null };
}
