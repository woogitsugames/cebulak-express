import { Rng, seedFromString } from './rng';
import { HOME_COUNTRIES, PL_CITIES, START_CITIES, makeRoute, type Route } from './route';

/**
 * Strefa Warszawy jest źródłem prawdy dla wyzwania, niezależnie od lokalizacji
 * gracza i ustawień strefy czasowej urządzenia.
 */
const WARSAW_DATE = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  calendar: 'gregory',
  numberingSystem: 'latn',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const MS_PER_DAY = 86_400_000;

/** Klucz YYYY-MM-DD według daty kalendarzowej w Warszawie. */
export function dailyKey(date: Date): string {
  const parts = WARSAW_DATE.formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  if (!year || !month || !day) throw new RangeError('Nieprawidłowa data wyzwania');
  return year.padStart(4, '0') + '-' + month + '-' + day;
}

/** To samo ziarno przeszkód i znajdziek dla wszystkich graczy danego dnia. */
export function dailySeed(key: string): number {
  return seedFromString('daily:' + key);
}

/**
 * Numer dnia w kalendarzu gregoriańskim, liczony w UTC.
 * Nie interpretujemy daty w lokalnej strefie czasowej gracza.
 */
function dayNumber(key: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    throw new RangeError('Klucz wyzwania musi mieć format YYYY-MM-DD');
  }
  const date = new Date(key + 'T00:00:00.000Z');
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== key) {
    throw new RangeError('Nieprawidłowa data wyzwania: ' + key);
  }
  return Math.floor(date.getTime() / MS_PER_DAY);
}

/** Poprawne zawijanie również dla dat sprzed epoki Unix. */
function cycle(index: number, length: number): number {
  return ((index % length) + length) % length;
}

/**
 * Jedna trasa dziennie dla wszystkich: każdy blok dni (tyle, ile krajów
 * zamieszkania) obejmuje wszystkie kraje. Miasto startowe zmienia się przy kolejnym wystąpieniu kraju,
 * a polski cel zmienia się codziennie.
 */
export function dailyRoute(key: string): Route {
  const day = dayNumber(key);
  const country = HOME_COUNTRIES[cycle(day, HOME_COUNTRIES.length)];
  const starts = START_CITIES[country];
  const from = starts[cycle(Math.floor(day / HOME_COUNTRIES.length), starts.length)];
  const to = PL_CITIES[cycle(day, PL_CITIES.length)];
  return makeRoute(country, from.id, to.id);
}

/** Tytuły neutralne kalendarzowo (piątkowe mają osobną pulę). */
export const DAILY_TITLES = [
  'Słoiki gotowe do drogi!',
  'Bagażnik pełen wspomnień',
  'Kierunek: domowy obiad!',
  'Dziś lecimy do Polski!',
  'Trasa przez wspomnienia',
  'Kombi gotowe na przygodę',
  'Paczka od mamy czeka',
  'Szybciej niż rodzinne pozdrowienia',
  'Z kawą przez kilometry',
  'W stronę domowego stołu',
  'Wielkie pakowanie, mały bagażnik',
  'Jeszcze tylko kilka granic',
  'Słoiki na pokładzie!',
  'Objazd? Damy radę!',
  'Pora ruszać do domu',
  'Kilometry pachną pierogami',
  'Bagaże zapięte? Start!',
  'Dziś droga wiedzie do swoich',
  'Wielki powrót z walizkami',
  'Prosto po rodzinne uściski',
  'Korek nie zatrzyma wspomnień',
  'Ostatnie miejsce na bagaż',
  'Droga daleka, cel bliski',
  'Dach pełen niespodzianek',
  'Znów bliżej polskiego stołu',
  'Dziś liczą się kilometry',
  'Na trasie do rodzinnego domu',
  'Kombi kontra objazdy',
  'Słoików nigdy za wiele',
  'Czas na drogę przez Europę',
  'Rodzinny obiad na horyzoncie',
  'Nie zapomnij o termosie!',
  'Droga długa, humor dopisuje',
  'Powrót z pełnym bagażnikiem',
  'Z daleka do swoich',
  'Jeszcze jeden zakręt do domu',
  'Mapa prowadzi do pierogów',
  'W drogę po domowe smaki',
  'Kilometry mijają, dom się zbliża',
  'Przed nami wielka wyprawa',
  'Na dachu walizki, w sercu dom',
  'Szerokiej drogi do Polski!',
] as const;

const FRIDAY_TITLES = [
  'Piątkowy powrót do Polski',
  'Wielki korek przed weekendem',
  'Piątek, walizki i do domu!',
  'Weekendowy kurs do Polski',
  'Piątkowa wyprawa po pierogi',
  'Kombi rusza na weekend',
] as const;

/** Daty wyjątkowe dla sezonu 2027, bez odniesień do obrzędów religijnych. */
const SPECIAL_DATES: Readonly<Record<string, string>> = {
  '2027-03-27': 'Przedświąteczny kurs do domu',
  '2027-03-28': 'Rodzinny stół już czeka!',
  '2027-03-29': 'Jeszcze chwila przy rodzinnym stole',
  '2027-04-30': 'Start majówkowego weekendu!',
};

/** Święta i majówka w powtarzalnych datach kalendarzowych. */
const SPECIAL_MONTH_DAYS: Readonly<Record<string, string>> = {
  '05-01': 'Majówka, kierunek Polska!',
  '05-02': 'Majówka w trasie!',
  '05-03': 'Ostatnia prosta majówki!',
  '12-24': 'Na Wigilię!',
  '12-31': 'Ostatni kurs w roku!',
};

/** Polskie tytuły w jednym obiekcie — obce słowniki mają tę samą strukturę (DAILY_TITLES). */
export const DAILY_TITLE_TEXTS = {
  regular: DAILY_TITLES,
  friday: FRIDAY_TITLES,
  dates: SPECIAL_DATES as Readonly<Record<'2027-03-27' | '2027-03-28' | '2027-03-29' | '2027-04-30', string>>,
  monthDays: SPECIAL_MONTH_DAYS as Readonly<Record<'05-01' | '05-02' | '05-03' | '12-24' | '12-31', string>>,
} as const;

export interface DailyTitleTexts {
  readonly regular: readonly string[];
  readonly friday: readonly string[];
  readonly dates: Readonly<Record<string, string>>;
  readonly monthDays: Readonly<Record<string, string>>;
}

/**
 * Powtarzalny tytuł konkretnego dnia, niezależny od zegara i strefy gracza.
 * Wybór (indeks w puli) nie zależy od języka; `texts` podaje tylko brzmienie.
 */
export function dailyTitle(key: string, texts: DailyTitleTexts = DAILY_TITLE_TEXTS): string {
  const day = dayNumber(key);
  const special = SPECIAL_DATES[key] !== undefined ? texts.dates[key]
    : SPECIAL_MONTH_DAYS[key.slice(5)] !== undefined ? texts.monthDays[key.slice(5)] : undefined;
  if (special) return special;
  const friday = new Date(day * MS_PER_DAY).getUTCDay() === 5;
  const pool = friday ? FRIDAY_TITLES : DAILY_TITLES;
  const index = Math.floor(new Rng(dailySeed(key)).next() * pool.length);
  return (friday ? texts.friday : texts.regular)[index] ?? pool[index];
}
