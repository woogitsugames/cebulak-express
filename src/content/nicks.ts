import { HOME_COUNTRIES, PL_CITIES, START_CITIES, type City, type HomeCountry } from '../core/route';

/** Dopuszczalne formy gramatyczne nicku. */
export type NickGender = 'm' | 'f';
export type NickRng = () => number;

type GenderedWord = Readonly<Record<NickGender, string>>;

/**
 * Kolejność jest częścią trwałego formatu nickId: po publikacji dopisuj nowe
 * pozycje tylko na końcu, nie zmieniaj indeksów dotychczasowych słów.
 */
export const NICK_ADJECTIVES: readonly GenderedWord[] = [
  { m: 'Zaradny', f: 'Zaradna' },
  { m: 'Szybki', f: 'Szybka' },
  { m: 'Pogodny', f: 'Pogodna' },
  { m: 'Słoikowy', f: 'Słoikowa' },
  { m: 'Nocny', f: 'Nocna' },
  { m: 'Wigilijny', f: 'Wigilijna' },
  { m: 'Wesoły', f: 'Wesoła' },
  { m: 'Radosny', f: 'Radosna' },
  { m: 'Dzielny', f: 'Dzielna' },
  { m: 'Sprytny', f: 'Sprytna' },
  { m: 'Pomysłowy', f: 'Pomysłowa' },
  { m: 'Uśmiechnięty', f: 'Uśmiechnięta' },
  { m: 'Cierpliwy', f: 'Cierpliwa' },
  { m: 'Wytrwały', f: 'Wytrwała' },
  { m: 'Odważny', f: 'Odważna' },
  { m: 'Śmiały', f: 'Śmiała' },
  { m: 'Żwawy', f: 'Żwawa' },
  { m: 'Energiczny', f: 'Energiczna' },
  { m: 'Skoczny', f: 'Skoczna' },
  { m: 'Zwinny', f: 'Zwinna' },
  { m: 'Czujny', f: 'Czujna' },
  { m: 'Bystry', f: 'Bystra' },
  { m: 'Rześki', f: 'Rześka' },
  { m: 'Przebojowy', f: 'Przebojowa' },
  { m: 'Drogowy', f: 'Drogowa' },
  { m: 'Szlakowy', f: 'Szlakowa' },
  { m: 'Walizkowy', f: 'Walizkowa' },
  { m: 'Bagażowy', f: 'Bagażowa' },
  { m: 'Kompasowy', f: 'Kompasowa' },
  { m: 'Objazdowy', f: 'Objazdowa' },
  { m: 'Powrotny', f: 'Powrotna' },
  { m: 'Świąteczny', f: 'Świąteczna' },
  { m: 'Domowy', f: 'Domowa' },
  { m: 'Rodzinny', f: 'Rodzinna' },
  { m: 'Weekendowy', f: 'Weekendowa' },
  { m: 'Poranny', f: 'Poranna' },
  { m: 'Wieczorny', f: 'Wieczorna' },
  { m: 'Jesienny', f: 'Jesienna' },
  { m: 'Zimowy', f: 'Zimowa' },
  { m: 'Wiosenny', f: 'Wiosenna' },
  { m: 'Letni', f: 'Letnia' },
  { m: 'Gwiezdny', f: 'Gwiezdna' },
  { m: 'Słoneczny', f: 'Słoneczna' },
  { m: 'Deszczowy', f: 'Deszczowa' },
  { m: 'Wietrzny', f: 'Wietrzna' },
  { m: 'Serdeczny', f: 'Serdeczna' },
  { m: 'Herbaciany', f: 'Herbaciana' },
  { m: 'Plecakowy', f: 'Plecakowa' },
  { m: 'Niezmordowany', f: 'Niezmordowana' },
  { m: 'Niestrudzony', f: 'Niestrudzona' },
  { m: 'Punktualny', f: 'Punktualna' },
  { m: 'Przyjazny', f: 'Przyjazna' },
  { m: 'Uczynny', f: 'Uczynna' },
  { m: 'Kreatywny', f: 'Kreatywna' },
  { m: 'Życzliwy', f: 'Życzliwa' },
  { m: 'Uważny', f: 'Uważna' },
  { m: 'Spokojny', f: 'Spokojna' },
  { m: 'Dobroduszny', f: 'Dobroduszna' },
  { m: 'Ciekawski', f: 'Ciekawska' },
  { m: 'Zorganizowany', f: 'Zorganizowana' },
  { m: 'Rozważny', f: 'Rozważna' },
  { m: 'Błyskawiczny', f: 'Błyskawiczna' },
] as const;

export const NICK_NOUNS: readonly GenderedWord[] = [
  { m: 'Kierowca', f: 'Kierowczyni' },
  { m: 'Bocian', f: 'Bocianica' },
  { m: 'Pilot', f: 'Pilotka' },
  { m: 'Kurier', f: 'Kurierka' },
  { m: 'Pasażer', f: 'Pasażerka' },
  { m: 'Podróżnik', f: 'Podróżniczka' },
  { m: 'Wędrowiec', f: 'Wędrowniczka' },
  { m: 'Turysta', f: 'Turystka' },
  { m: 'Zwiadowca', f: 'Zwiadowczyni' },
  { m: 'Odkrywca', f: 'Odkrywczyni' },
  { m: 'Nawigator', f: 'Nawigatorka' },
  { m: 'Mechanik', f: 'Mechaniczka' },
  { m: 'Mistrz', f: 'Mistrzyni' },
  { m: 'Skoczek', f: 'Skoczkini' },
  { m: 'Poszukiwacz', f: 'Poszukiwaczka' },
  { m: 'Marzyciel', f: 'Marzycielka' },
  { m: 'Optymista', f: 'Optymistka' },
  { m: 'Zawodnik', f: 'Zawodniczka' },
  { m: 'Sprinter', f: 'Sprinterka' },
  { m: 'Organizator', f: 'Organizatorka' },
  { m: 'Strażnik', f: 'Strażniczka' },
  { m: 'Planista', f: 'Planistka' },
  { m: 'Kolekcjoner', f: 'Kolekcjonerka' },
  { m: 'Pakowacz', f: 'Pakowaczka' },
  { m: 'Dostawca', f: 'Dostawczyni' },
  { m: 'Pomocnik', f: 'Pomocniczka' },
  { m: 'Przewodnik', f: 'Przewodniczka' },
  { m: 'Wczasowicz', f: 'Wczasowiczka' },
  { m: 'Rekordzista', f: 'Rekordzistka' },
  { m: 'Entuzjasta', f: 'Entuzjastka' },
  { m: 'Znawca', f: 'Znawczyni' },
  { m: 'Majsterkowicz', f: 'Majsterkowiczka' },
  { m: 'Przyjaciel', f: 'Przyjaciółka' },
  { m: 'Bohater', f: 'Bohaterka' },
] as const;

const ALL_CITIES: readonly City[] = [...Object.values(START_CITIES).flat(), ...PL_CITIES];
const CITY_BY_ID = new Map(ALL_CITIES.map((city) => [city.id, city]));

// „Ze” przed trudnymi zbitkami spółgłosek; pozostałe miasta wymagają „z”.
const ZE_CITIES = new Set([
  'szczecin', 'skarzysko-kamienna', 'strzelce-opolskie', 'slupsk', 'stalowa-wola',
  'zambrow', 'zamosc', 'zakopane', 'zielona-gora', 'zurych', 'stavanger',
]);

const NICK_ID_PATTERN = /^a(\d{2})-n(\d{2})-c-([a-z][a-z0-9-]*)-g-([mf])-([1-9]\d{2})-h([0-9a-z]{7})$/;
const NO_ADJECTIVE = 99; // Rezerwacja w dwucyfrowym polu aNN.
const FIRST_NUMBER = 100;
const NUMBER_COUNT = 900;

interface NickParts {
  adjectiveIndex: number;
  nounIndex: number;
  city: City;
  gender: NickGender;
  number: number;
}

/** Suma kontrolna wykrywa pomyłki, nie służy do uwierzytelniania. */
function checksum(value: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 0x01000193) >>> 0;
  }
  return hash.toString(36).padStart(7, '0');
}

function makeNickId(parts: NickParts): string {
  const { adjectiveIndex, nounIndex, city, gender, number } = parts;
  const payload = `a${String(adjectiveIndex).padStart(2, '0')}-n${String(nounIndex).padStart(2, '0')}-c-${city.id}-g-${gender}-${number}`;
  return `${payload}-h${checksum(payload)}`;
}

function parseNickId(id: string): NickParts | null {
  if (typeof id !== 'string') return null;
  const match = NICK_ID_PATTERN.exec(id);
  if (!match) return null;

  const adjectiveIndex = Number(match[1]);
  const nounIndex = Number(match[2]);
  const city = CITY_BY_ID.get(match[3]);
  const number = Number(match[5]);
  if ((adjectiveIndex !== NO_ADJECTIVE && adjectiveIndex >= NICK_ADJECTIVES.length) || nounIndex >= NICK_NOUNS.length || !city || number >= FIRST_NUMBER + NUMBER_COUNT) {
    return null;
  }
  const payload = id.slice(0, -(match[6].length + 2));
  if (checksum(payload) !== match[6]) return null;

  return { adjectiveIndex, nounIndex, city, gender: match[4] as NickGender, number };
}

/** Waliduje wyłącznie nicki z ustalonych słowników i znanych miast. */
export function isValidNickId(id: string): boolean {
  return parseNickId(id) !== null;
}

/** Zamienia prawidłowy identyfikator na publiczną nazwę. Nie przyjmuje tekstu użytkownika. */
export function renderNick(nickId: string): string {
  const parts = parseNickId(nickId);
  if (!parts) throw new Error('Nieprawidłowy nickId');
  const adjective = parts.adjectiveIndex === NO_ADJECTIVE ? '' : NICK_ADJECTIVES[parts.adjectiveIndex][parts.gender];
  const noun = NICK_NOUNS[parts.nounIndex][parts.gender];
  const preposition = ZE_CITIES.has(parts.city.id) ? 'ze' : 'z';
  return `${adjective ? `${adjective} ` : ''}${noun} ${preposition} ${parts.city.fromName} #${parts.number}`;
}

function randomIndex(rng: NickRng, length: number): number {
  const value = rng();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('Generator losowy musi zwracać liczbę z zakresu [0, 1)');
  }
  return Math.floor(value * length);
}

/**
 * Losuje unikalne ID. Połowa prób dotyczy miast kraju startu, połowa Polski.
 * Co czwarty wzorzec ma sam rzeczownik (np. „Bocian z Gandawy #423”).
 * Opcjonalny `gender` pozwala graczowi wybrać wariant męski lub żeński.
 * Przy powtarzalnym RNG wybór nadal się kończy i nie zwraca duplikatów.
 */
export function randomNickChoices(rng: NickRng, count: number, home: HomeCountry, gender?: NickGender): string[] {
  if (!Number.isSafeInteger(count) || count < 0 || count > 1000) {
    throw new RangeError('Liczba propozycji musi być liczbą całkowitą z zakresu 0–1000');
  }
  if (!HOME_COUNTRIES.includes(home) || (gender !== undefined && gender !== 'm' && gender !== 'f')) {
    throw new RangeError('Nieznany kraj lub wariant gramatyczny');
  }
  const chosen = new Set<string>();
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const adjectiveRoll = randomIndex(rng, NICK_ADJECTIVES.length * 4);
    const adjectiveIndex = adjectiveRoll % 4 === 3 ? NO_ADJECTIVE : Math.floor(adjectiveRoll / 4);
    const nounIndex = randomIndex(rng, NICK_NOUNS.length);
    const cities = randomIndex(rng, 2) === 0 ? START_CITIES[home] : PL_CITIES;
    const city = cities[randomIndex(rng, cities.length)];
    const selectedGender = gender ?? (randomIndex(rng, 2) === 0 ? 'm' : 'f');
    const number = FIRST_NUMBER + randomIndex(rng, NUMBER_COUNT);

    // Deterministyczne rozstrzyganie kolizji (także dla rng = () => 0).
    // 1000 propozycji mieści się w 900 numerach × 34 rzeczownikach.
    let attempt = 0;
    let id: string;
    do {
      id = makeNickId({
        adjectiveIndex,
        nounIndex: (nounIndex + Math.floor(attempt / NUMBER_COUNT)) % NICK_NOUNS.length,
        city,
        gender: selectedGender,
        number: FIRST_NUMBER + ((number - FIRST_NUMBER + attempt) % NUMBER_COUNT),
      });
      attempt++;
    } while (chosen.has(id));
    chosen.add(id);
    result.push(id);
  }
  return result;
}
