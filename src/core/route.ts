/** Kraje zamieszkania w MVP (decyzja D3) i Polska jako cel. */
export type CountryCode = 'BE' | 'NL' | 'DE' | 'UK' | 'FR' | 'CH' | 'NO' | 'DK' | 'SE' | 'PL';
export type HomeCountry = 'BE' | 'NL' | 'DE' | 'UK' | 'FR' | 'CH' | 'NO' | 'DK';

export const HOME_COUNTRIES: readonly HomeCountry[] = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK'];

export interface City {
  id: string;
  name: string;
  /** Odmiana do karty wyniku: „Doleciałem z Antwerpii”. */
  fromName: string;
  /** „do Rzeszowa”. */
  toName: string;
  lat: number;
  lon: number;
}

/** Odcinek trasy: kraj i udział w całym dystansie (suma udziałów = 1). */
export interface Leg {
  country: CountryCode;
  share: number;
  /** Przeprawa (prom/tunel) na końcu odcinka — tylko oprawa. */
  crossing?: 'ferry' | 'tunnel';
}

/** Fabularyzowane trasy, nie nawigacja. Kraje tranzytowe zmieniają tło, nie trudność. */
export const LEGS: Record<HomeCountry, Leg[]> = {
  BE: [{ country: 'BE', share: 0.1 }, { country: 'DE', share: 0.55 }, { country: 'PL', share: 0.35 }],
  NL: [{ country: 'NL', share: 0.12 }, { country: 'DE', share: 0.53 }, { country: 'PL', share: 0.35 }],
  DE: [{ country: 'DE', share: 0.6 }, { country: 'PL', share: 0.4 }],
  UK: [
    { country: 'UK', share: 0.15, crossing: 'tunnel' },
    { country: 'FR', share: 0.08 },
    { country: 'BE', share: 0.07 },
    { country: 'DE', share: 0.4 },
    { country: 'PL', share: 0.3 },
  ],
  FR: [{ country: 'FR', share: 0.3 }, { country: 'DE', share: 0.4 }, { country: 'PL', share: 0.3 }],
  CH: [{ country: 'CH', share: 0.1 }, { country: 'DE', share: 0.55 }, { country: 'PL', share: 0.35 }],
  NO: [{ country: 'NO', share: 0.25 }, { country: 'SE', share: 0.35, crossing: 'ferry' }, { country: 'PL', share: 0.4 }],
  DK: [{ country: 'DK', share: 0.2 }, { country: 'DE', share: 0.35 }, { country: 'PL', share: 0.45 }],
};

export const START_CITIES: Record<HomeCountry, City[]> = {
  BE: [
    { id: 'bruksela', name: 'Bruksela', fromName: 'Brukseli', toName: 'Brukseli', lat: 50.85, lon: 4.35 },
    { id: 'antwerpia', name: 'Antwerpia', fromName: 'Antwerpii', toName: 'Antwerpii', lat: 51.22, lon: 4.4 },
    { id: 'gandawa', name: 'Gandawa', fromName: 'Gandawy', toName: 'Gandawy', lat: 51.05, lon: 3.72 },
  ],
  NL: [
    { id: 'amsterdam', name: 'Amsterdam', fromName: 'Amsterdamu', toName: 'Amsterdamu', lat: 52.37, lon: 4.9 },
    { id: 'rotterdam', name: 'Rotterdam', fromName: 'Rotterdamu', toName: 'Rotterdamu', lat: 51.92, lon: 4.48 },
    { id: 'eindhoven', name: 'Eindhoven', fromName: 'Eindhoven', toName: 'Eindhoven', lat: 51.44, lon: 5.47 },
  ],
  DE: [
    { id: 'berlin', name: 'Berlin', fromName: 'Berlina', toName: 'Berlina', lat: 52.52, lon: 13.4 },
    { id: 'monachium', name: 'Monachium', fromName: 'Monachium', toName: 'Monachium', lat: 48.14, lon: 11.58 },
    { id: 'kolonia', name: 'Kolonia', fromName: 'Kolonii', toName: 'Kolonii', lat: 50.94, lon: 6.96 },
    { id: 'hamburg', name: 'Hamburg', fromName: 'Hamburga', toName: 'Hamburga', lat: 53.55, lon: 9.99 },
  ],
  UK: [
    { id: 'londyn', name: 'Londyn', fromName: 'Londynu', toName: 'Londynu', lat: 51.51, lon: -0.13 },
    { id: 'birmingham', name: 'Birmingham', fromName: 'Birmingham', toName: 'Birmingham', lat: 52.49, lon: -1.89 },
    { id: 'manchester', name: 'Manchester', fromName: 'Manchesteru', toName: 'Manchesteru', lat: 53.48, lon: -2.24 },
    { id: 'edynburg', name: 'Edynburg', fromName: 'Edynburga', toName: 'Edynburga', lat: 55.95, lon: -3.19 },
  ],
  FR: [
    { id: 'paryz', name: 'Paryż', fromName: 'Paryża', toName: 'Paryża', lat: 48.86, lon: 2.35 },
    { id: 'lyon', name: 'Lyon', fromName: 'Lyonu', toName: 'Lyonu', lat: 45.76, lon: 4.84 },
    { id: 'lille', name: 'Lille', fromName: 'Lille', toName: 'Lille', lat: 50.63, lon: 3.06 },
  ],
  CH: [
    { id: 'zurych', name: 'Zurych', fromName: 'Zurychu', toName: 'Zurychu', lat: 47.38, lon: 8.54 },
    { id: 'genewa', name: 'Genewa', fromName: 'Genewy', toName: 'Genewy', lat: 46.2, lon: 6.14 },
    { id: 'bazylea', name: 'Bazylea', fromName: 'Bazylei', toName: 'Bazylei', lat: 47.56, lon: 7.59 },
  ],
  NO: [
    { id: 'oslo', name: 'Oslo', fromName: 'Oslo', toName: 'Oslo', lat: 59.91, lon: 10.75 },
    { id: 'bergen', name: 'Bergen', fromName: 'Bergen', toName: 'Bergen', lat: 60.39, lon: 5.32 },
    { id: 'stavanger', name: 'Stavanger', fromName: 'Stavanger', toName: 'Stavanger', lat: 58.97, lon: 5.73 },
  ],
  DK: [
    { id: 'kopenhaga', name: 'Kopenhaga', fromName: 'Kopenhagi', toName: 'Kopenhagi', lat: 55.68, lon: 12.57 },
    { id: 'aarhus', name: 'Aarhus', fromName: 'Aarhus', toName: 'Aarhus', lat: 56.16, lon: 10.2 },
    { id: 'odense', name: 'Odense', fromName: 'Odense', toName: 'Odense', lat: 55.4, lon: 10.39 },
  ],
};

export const PL_CITIES: City[] = [
  { id: 'warszawa', name: 'Warszawa', fromName: 'Warszawy', toName: 'Warszawy', lat: 52.23, lon: 21.01 },
  { id: 'krakow', name: 'Kraków', fromName: 'Krakowa', toName: 'Krakowa', lat: 50.06, lon: 19.94 },
  { id: 'wroclaw', name: 'Wrocław', fromName: 'Wrocławia', toName: 'Wrocławia', lat: 51.11, lon: 17.03 },
  { id: 'poznan', name: 'Poznań', fromName: 'Poznania', toName: 'Poznania', lat: 52.41, lon: 16.93 },
  { id: 'gdansk', name: 'Gdańsk', fromName: 'Gdańska', toName: 'Gdańska', lat: 54.35, lon: 18.65 },
  { id: 'szczecin', name: 'Szczecin', fromName: 'Szczecina', toName: 'Szczecina', lat: 53.43, lon: 14.55 },
  { id: 'lodz', name: 'Łódź', fromName: 'Łodzi', toName: 'Łodzi', lat: 51.76, lon: 19.46 },
  { id: 'katowice', name: 'Katowice', fromName: 'Katowic', toName: 'Katowic', lat: 50.26, lon: 19.02 },
  { id: 'lublin', name: 'Lublin', fromName: 'Lublina', toName: 'Lublina', lat: 51.25, lon: 22.57 },
  { id: 'rzeszow', name: 'Rzeszów', fromName: 'Rzeszowa', toName: 'Rzeszowa', lat: 50.04, lon: 22.0 },
  { id: 'bialystok', name: 'Białystok', fromName: 'Białegostoku', toName: 'Białegostoku', lat: 53.13, lon: 23.16 },
  { id: 'bydgoszcz', name: 'Bydgoszcz', fromName: 'Bydgoszczy', toName: 'Bydgoszczy', lat: 53.12, lon: 18.01 },
  { id: 'olsztyn', name: 'Olsztyn', fromName: 'Olsztyna', toName: 'Olsztyna', lat: 53.78, lon: 20.49 },
  { id: 'kielce', name: 'Kielce', fromName: 'Kielc', toName: 'Kielc', lat: 50.87, lon: 20.63 },
  { id: 'opole', name: 'Opole', fromName: 'Opola', toName: 'Opola', lat: 50.67, lon: 17.93 },
  { id: 'zielona-gora', name: 'Zielona Góra', fromName: 'Zielonej Góry', toName: 'Zielonej Góry', lat: 51.94, lon: 15.51 },
];

/** Współczynnik drogi względem linii prostej [szacunek]. */
export const ROAD_FACTOR = 1.2;

export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface Route {
  home: HomeCountry;
  from: City;
  to: City;
  totalKm: number;
  legs: Leg[];
}

export function makeRoute(home: HomeCountry, fromId: string, toId: string): Route {
  const from = START_CITIES[home].find((c) => c.id === fromId);
  const to = PL_CITIES.find((c) => c.id === toId);
  if (!from || !to) throw new Error(`Nieznane miasto: ${fromId} / ${toId}`);
  const totalKm = Math.round((haversineKm(from, to) * ROAD_FACTOR) / 10) * 10;
  return { home, from, to, totalKm, legs: LEGS[home] };
}

/** Kraj, nad którym jest gracz po przejechaniu `km`. */
export function countryAt(route: Route, km: number): CountryCode {
  let acc = 0;
  for (const leg of route.legs) {
    acc += leg.share * route.totalKm;
    if (km < acc) return leg.country;
  }
  return 'PL';
}
