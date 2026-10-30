import { HOME_WAYPOINT, PL_TRANSIT, ROUTE_WAYPOINTS, type Waypoint } from '../content/waypoints';

/** Kraje zamieszkania w MVP (decyzja D3) i Polska jako cel. */
export type CountryCode = 'BE' | 'NL' | 'DE' | 'UK' | 'FR' | 'CH' | 'NO' | 'DK' | 'IE' | 'ES' | 'IT' | 'AT' | 'SE' | 'FI' | 'LU' | 'CZ' | 'EE' | 'LV' | 'LT' | 'PL';
export type HomeCountry = 'BE' | 'NL' | 'DE' | 'UK' | 'FR' | 'CH' | 'NO' | 'DK' | 'IE' | 'ES' | 'IT' | 'AT' | 'SE' | 'FI' | 'LU';

export const HOME_COUNTRIES: readonly HomeCountry[] = ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK', 'IE', 'ES', 'IT', 'AT', 'SE', 'FI', 'LU'];

export interface City {
  id: string;
  name: string;
  /** Odmiana do karty wyniku: „Doleciałem z Antwerpii”. */
  fromName: string;
  /** „do Rzeszowa”. */
  toName: string;
  lat: number;
  lon: number;
  /** Województwo — tylko miasta w Polsce. */
  region?: string;
  /**
   * Dla miast spoza tras wzorcowych: dołącz do trasy `route` w punkcie `at`,
   * który leży `km` od startu (szacunek drogowy).
   */
  via?: { route: HomeCountry; at: string; km: number };
}

export const START_CITIES: Record<HomeCountry, City[]> = {
  BE: [
    { id: 'bruksela', name: 'Bruksela', fromName: 'Brukseli', toName: 'Brukseli', lat: 50.85, lon: 4.35 },
    { id: 'antwerpia', name: 'Antwerpia', fromName: 'Antwerpii', toName: 'Antwerpii', lat: 51.22, lon: 4.4 },
    { id: 'gandawa', name: 'Gandawa', fromName: 'Gandawy', toName: 'Gandawy', lat: 51.05, lon: 3.72 },
  ],
  NL: [
    { id: 'amsterdam', name: 'Amsterdam', fromName: 'Amsterdamu', toName: 'Amsterdamu', lat: 52.37, lon: 4.9 },
    { id: 'rotterdam', name: 'Rotterdam', fromName: 'Rotterdamu', toName: 'Rotterdamu', lat: 51.92, lon: 4.48, via: { route: 'NL', at: 'utrecht', km: 60 } },
    { id: 'eindhoven', name: 'Eindhoven', fromName: 'Eindhoven', toName: 'Eindhoven', lat: 51.44, lon: 5.47 },
  ],
  DE: [
    { id: 'berlin', name: 'Berlin', fromName: 'Berlina', toName: 'Berlina', lat: 52.52, lon: 13.4 },
    { id: 'monachium', name: 'Monachium', fromName: 'Monachium', toName: 'Monachium', lat: 48.14, lon: 11.58, via: { route: 'CH', at: 'norymberga', km: 170 } },
    { id: 'kolonia', name: 'Kolonia', fromName: 'Kolonii', toName: 'Kolonii', lat: 50.94, lon: 6.96 },
    { id: 'hamburg', name: 'Hamburg', fromName: 'Hamburga', toName: 'Hamburga', lat: 53.55, lon: 9.99 },
  ],
  UK: [
    { id: 'londyn', name: 'Londyn', fromName: 'Londynu', toName: 'Londynu', lat: 51.51, lon: -0.13 },
    { id: 'birmingham', name: 'Birmingham', fromName: 'Birmingham', toName: 'Birmingham', lat: 52.49, lon: -1.89, via: { route: 'UK', at: 'dover', km: 310 } },
    { id: 'manchester', name: 'Manchester', fromName: 'Manchesteru', toName: 'Manchesteru', lat: 53.48, lon: -2.24, via: { route: 'UK', at: 'dover', km: 450 } },
    { id: 'edynburg', name: 'Edynburg', fromName: 'Edynburga', toName: 'Edynburga', lat: 55.95, lon: -3.19, via: { route: 'UK', at: 'dover', km: 760 } },
  ],
  FR: [
    { id: 'paryz', name: 'Paryż', fromName: 'Paryża', toName: 'Paryża', lat: 48.86, lon: 2.35 },
    { id: 'lyon', name: 'Lyon', fromName: 'Lyonu', toName: 'Lyonu', lat: 45.76, lon: 4.84, via: { route: 'FR', at: 'metz', km: 460 } },
    { id: 'lille', name: 'Lille', fromName: 'Lille', toName: 'Lille', lat: 50.63, lon: 3.06, via: { route: 'UK', at: 'gandawa', km: 75 } },
  ],
  CH: [
    { id: 'zurych', name: 'Zurych', fromName: 'Zurychu', toName: 'Zurychu', lat: 47.38, lon: 8.54 },
    { id: 'genewa', name: 'Genewa', fromName: 'Genewy', toName: 'Genewy', lat: 46.2, lon: 6.14, via: { route: 'CH', at: 'wodospad-renski', km: 330 } },
    { id: 'bazylea', name: 'Bazylea', fromName: 'Bazylei', toName: 'Bazylei', lat: 47.56, lon: 7.59, via: { route: 'CH', at: 'stuttgart', km: 270 } },
  ],
  NO: [
    { id: 'oslo', name: 'Oslo', fromName: 'Oslo', toName: 'Oslo', lat: 59.91, lon: 10.75 },
    { id: 'bergen', name: 'Bergen', fromName: 'Bergen', toName: 'Bergen', lat: 60.39, lon: 5.32, via: { route: 'NO', at: 'oslo', km: 460 } },
    { id: 'stavanger', name: 'Stavanger', fromName: 'Stavanger', toName: 'Stavanger', lat: 58.97, lon: 5.73, via: { route: 'NO', at: 'oslo', km: 550 } },
  ],
  DK: [
    { id: 'kopenhaga', name: 'Kopenhaga', fromName: 'Kopenhagi', toName: 'Kopenhagi', lat: 55.68, lon: 12.57 },
    { id: 'aarhus', name: 'Aarhus', fromName: 'Aarhus', toName: 'Aarhus', lat: 56.16, lon: 10.2, via: { route: 'DK', at: 'hamburg', km: 380 } },
    { id: 'odense', name: 'Odense', fromName: 'Odense', toName: 'Odense', lat: 55.4, lon: 10.39, via: { route: 'DK', at: 'hamburg', km: 300 } },
  ],
  IE: [
    { id: 'dublin', name: 'Dublin', fromName: 'Dublina', toName: 'Dublina', lat: 53.35, lon: -6.26 },
    { id: 'cork', name: 'Cork', fromName: 'Cork', toName: 'Cork', lat: 51.9, lon: -8.48, via: { route: 'IE', at: 'rosslare', km: 220 } },
    { id: 'limerick', name: 'Limerick', fromName: 'Limerick', toName: 'Limerick', lat: 52.66, lon: -8.63, via: { route: 'IE', at: 'rosslare', km: 200 } },
  ],
  ES: [
    { id: 'barcelona', name: 'Barcelona', fromName: 'Barcelony', toName: 'Barcelony', lat: 41.39, lon: 2.17 },
    { id: 'madryt', name: 'Madryt', fromName: 'Madrytu', toName: 'Madrytu', lat: 40.42, lon: -3.7, via: { route: 'ES', at: 'barcelona', km: 620 } },
    { id: 'walencja', name: 'Walencja', fromName: 'Walencji', toName: 'Walencji', lat: 39.47, lon: -0.38, via: { route: 'ES', at: 'barcelona', km: 350 } },
  ],
  IT: [
    { id: 'mediolan', name: 'Mediolan', fromName: 'Mediolanu', toName: 'Mediolanu', lat: 45.46, lon: 9.19 },
    { id: 'rzym', name: 'Rzym', fromName: 'Rzymu', toName: 'Rzymu', lat: 41.9, lon: 12.5, via: { route: 'IT', at: 'mestre', km: 530 } },
    { id: 'bolonia', name: 'Bolonia', fromName: 'Bolonii', toName: 'Bolonii', lat: 44.49, lon: 11.34, via: { route: 'IT', at: 'mestre', km: 160 } },
  ],
  AT: [
    { id: 'wieden', name: 'Wiedeń', fromName: 'Wiednia', toName: 'Wiednia', lat: 48.21, lon: 16.37 },
    { id: 'linz', name: 'Linz', fromName: 'Linzu', toName: 'Linzu', lat: 48.31, lon: 14.29, via: { route: 'AT', at: 'brno', km: 275 } },
    { id: 'salzburg', name: 'Salzburg', fromName: 'Salzburga', toName: 'Salzburga', lat: 47.8, lon: 13.05, via: { route: 'AT', at: 'brno', km: 420 } },
  ],
  SE: [
    { id: 'sztokholm', name: 'Sztokholm', fromName: 'Sztokholmu', toName: 'Sztokholmu', lat: 59.33, lon: 18.07 },
    { id: 'goteborg', name: 'Göteborg', fromName: 'Göteborga', toName: 'Göteborga', lat: 57.71, lon: 11.97, via: { route: 'SE', at: 'helsingborg', km: 210 } },
    { id: 'malmo', name: 'Malmö', fromName: 'Malmö', toName: 'Malmö', lat: 55.61, lon: 13 },
  ],
  FI: [
    { id: 'helsinki', name: 'Helsinki', fromName: 'Helsinek', toName: 'Helsinek', lat: 60.17, lon: 24.94 },
    { id: 'tampere', name: 'Tampere', fromName: 'Tampere', toName: 'Tampere', lat: 61.5, lon: 23.76, via: { route: 'FI', at: 'helsinki', km: 180 } },
    { id: 'turku', name: 'Turku', fromName: 'Turku', toName: 'Turku', lat: 60.45, lon: 22.27, via: { route: 'FI', at: 'helsinki', km: 170 } },
  ],
  LU: [
    { id: 'luksemburg', name: 'Luksemburg', fromName: 'Luksemburga', toName: 'Luksemburga', lat: 49.61, lon: 6.13 },
    { id: 'esch-sur-alzette', name: 'Esch-sur-Alzette', fromName: 'Esch-sur-Alzette', toName: 'Esch-sur-Alzette', lat: 49.5, lon: 5.98, via: { route: 'LU', at: 'trier', km: 80 } },
    { id: 'differdange', name: 'Differdange', fromName: 'Differdange', toName: 'Differdange', lat: 49.52, lon: 5.89, via: { route: 'LU', at: 'trier', km: 95 } },
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
  // Mniejsze miasta z silną emigracją (lista do rozbudowy; związek z krajem
  // emigracji potwierdzony źródłem tylko dla Siemiatycz → Belgia).
  { id: 'siemiatycze', name: 'Siemiatycze', fromName: 'Siemiatycz', toName: 'Siemiatycz', lat: 52.43, lon: 22.86, region: 'podlaskie' },
  { id: 'monki', name: 'Mońki', fromName: 'Moniek', toName: 'Moniek', lat: 53.4, lon: 22.8, region: 'podlaskie' },
  { id: 'bielsk-podlaski', name: 'Bielsk Podlaski', fromName: 'Bielska Podlaskiego', toName: 'Bielska Podlaskiego', lat: 52.77, lon: 23.19, region: 'podlaskie' },
  { id: 'hajnowka', name: 'Hajnówka', fromName: 'Hajnówki', toName: 'Hajnówki', lat: 52.74, lon: 23.58, region: 'podlaskie' },
  { id: 'sokolka', name: 'Sokółka', fromName: 'Sokółki', toName: 'Sokółki', lat: 53.41, lon: 23.5, region: 'podlaskie' },
  { id: 'lomza', name: 'Łomża', fromName: 'Łomży', toName: 'Łomży', lat: 53.18, lon: 22.06, region: 'podlaskie' },
  { id: 'grajewo', name: 'Grajewo', fromName: 'Grajewa', toName: 'Grajewa', lat: 53.65, lon: 22.45, region: 'podlaskie' },
  { id: 'kolno', name: 'Kolno', fromName: 'Kolna', toName: 'Kolna', lat: 53.41, lon: 21.93, region: 'podlaskie' },
  { id: 'wysokie-mazowieckie', name: 'Wysokie Mazowieckie', fromName: 'Wysokiego Mazowieckiego', toName: 'Wysokiego Mazowieckiego', lat: 52.92, lon: 22.51, region: 'podlaskie' },
  { id: 'zambrow', name: 'Zambrów', fromName: 'Zambrowa', toName: 'Zambrowa', lat: 52.98, lon: 22.24, region: 'podlaskie' },
  { id: 'strzelce-opolskie', name: 'Strzelce Opolskie', fromName: 'Strzelec Opolskich', toName: 'Strzelec Opolskich', lat: 50.51, lon: 18.3, region: 'opolskie' },
  { id: 'kedzierzyn-kozle', name: 'Kędzierzyn-Koźle', fromName: 'Kędzierzyna-Koźla', toName: 'Kędzierzyna-Koźla', lat: 50.35, lon: 18.2, region: 'opolskie' },
  { id: 'krapkowice', name: 'Krapkowice', fromName: 'Krapkowic', toName: 'Krapkowic', lat: 50.47, lon: 17.97, region: 'opolskie' },
  { id: 'glogowek', name: 'Głogówek', fromName: 'Głogówka', toName: 'Głogówka', lat: 50.36, lon: 17.84, region: 'opolskie' },
  { id: 'prudnik', name: 'Prudnik', fromName: 'Prudnika', toName: 'Prudnika', lat: 50.32, lon: 17.58, region: 'opolskie' },
  { id: 'olesno', name: 'Olesno', fromName: 'Olesna', toName: 'Olesna', lat: 50.88, lon: 18.42, region: 'opolskie' },
  { id: 'nowy-targ', name: 'Nowy Targ', fromName: 'Nowego Targu', toName: 'Nowego Targu', lat: 49.48, lon: 20.03, region: 'malopolskie' },
  { id: 'zakopane', name: 'Zakopane', fromName: 'Zakopanego', toName: 'Zakopanego', lat: 49.3, lon: 19.95, region: 'malopolskie' },
  { id: 'elk', name: 'Ełk', fromName: 'Ełku', toName: 'Ełku', lat: 53.82, lon: 22.36, region: 'warminsko-mazurskie' },
  { id: 'olecko', name: 'Olecko', fromName: 'Olecka', toName: 'Olecka', lat: 54.03, lon: 22.5, region: 'warminsko-mazurskie' },
  { id: 'goldap', name: 'Gołdap', fromName: 'Gołdapi', toName: 'Gołdapi', lat: 54.31, lon: 22.31, region: 'warminsko-mazurskie' },
  { id: 'bartoszyce', name: 'Bartoszyce', fromName: 'Bartoszyc', toName: 'Bartoszyc', lat: 54.25, lon: 20.81, region: 'warminsko-mazurskie' },
  { id: 'ketrzyn', name: 'Kętrzyn', fromName: 'Kętrzyna', toName: 'Kętrzyna', lat: 54.08, lon: 21.38, region: 'warminsko-mazurskie' },
  { id: 'bytow', name: 'Bytów', fromName: 'Bytowa', toName: 'Bytowa', lat: 54.17, lon: 17.49, region: 'pomorskie' },
  { id: 'slupsk', name: 'Słupsk', fromName: 'Słupska', toName: 'Słupska', lat: 54.46, lon: 17.03, region: 'pomorskie' },
  { id: 'chojnice', name: 'Chojnice', fromName: 'Chojnic', toName: 'Chojnic', lat: 53.7, lon: 17.56, region: 'pomorskie' },
  { id: 'kartuzy', name: 'Kartuzy', fromName: 'Kartuz', toName: 'Kartuz', lat: 54.33, lon: 18.2, region: 'pomorskie' },
  { id: 'stalowa-wola', name: 'Stalowa Wola', fromName: 'Stalowej Woli', toName: 'Stalowej Woli', lat: 50.58, lon: 22.05, region: 'podkarpackie' },
  { id: 'mielec', name: 'Mielec', fromName: 'Mielca', toName: 'Mielca', lat: 50.29, lon: 21.42, region: 'podkarpackie' },
  { id: 'jaslo', name: 'Jasło', fromName: 'Jasła', toName: 'Jasła', lat: 49.75, lon: 21.47, region: 'podkarpackie' },
  { id: 'przemysl', name: 'Przemyśl', fromName: 'Przemyśla', toName: 'Przemyśla', lat: 49.78, lon: 22.77, region: 'podkarpackie' },
  { id: 'sanok', name: 'Sanok', fromName: 'Sanoka', toName: 'Sanoka', lat: 49.56, lon: 22.21, region: 'podkarpackie' },
  { id: 'lubaczow', name: 'Lubaczów', fromName: 'Lubaczowa', toName: 'Lubaczowa', lat: 50.16, lon: 23.12, region: 'podkarpackie' },
  { id: 'biala-podlaska', name: 'Biała Podlaska', fromName: 'Białej Podlaskiej', toName: 'Białej Podlaskiej', lat: 52.03, lon: 23.12, region: 'lubelskie' },
  { id: 'zamosc', name: 'Zamość', fromName: 'Zamościa', toName: 'Zamościa', lat: 50.72, lon: 23.25, region: 'lubelskie' },
  { id: 'tomaszow-lubelski', name: 'Tomaszów Lubelski', fromName: 'Tomaszowa Lubelskiego', toName: 'Tomaszowa Lubelskiego', lat: 50.45, lon: 23.42, region: 'lubelskie' },
  { id: 'ostrowiec-swietokrzyski', name: 'Ostrowiec Świętokrzyski', fromName: 'Ostrowca Świętokrzyskiego', toName: 'Ostrowca Świętokrzyskiego', lat: 50.93, lon: 21.39, region: 'swietokrzyskie' },
  { id: 'skarzysko-kamienna', name: 'Skarżysko-Kamienna', fromName: 'Skarżyska-Kamiennej', toName: 'Skarżyska-Kamiennej', lat: 51.11, lon: 20.87, region: 'swietokrzyskie' },
  { id: 'raciborz', name: 'Racibórz', fromName: 'Raciborza', toName: 'Raciborza', lat: 50.09, lon: 18.22, region: 'slaskie' },
  { id: 'walbrzych', name: 'Wałbrzych', fromName: 'Wałbrzycha', toName: 'Wałbrzycha', lat: 50.77, lon: 16.28, region: 'dolnoslaskie' },
  { id: 'legnica', name: 'Legnica', fromName: 'Legnicy', toName: 'Legnicy', lat: 51.21, lon: 16.16, region: 'dolnoslaskie' },
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
  /** Punkty trasy z km liczonymi od startu tego przejazdu, rosnąco; ostatni to dom. */
  waypoints: Waypoint[];
}

/** Punkty od startu do stacji za granicą PL, z km od startu tego przejazdu. */
function abroadWaypoints(home: HomeCountry, from: City): Waypoint[] {
  const shift = (list: Waypoint[], fromIndex: number, startKm: number): Waypoint[] => {
    const base = list[fromIndex].km;
    return list.slice(fromIndex).map((w) => ({ ...w, km: Math.round(startKm + w.km - base) }));
  };
  const startPoint = (): Waypoint => ({
    id: from.id, name: from.name, country: home, km: 0, kind: 'city', motifs: [], text: `${from.name}. Ruszamy do domu!`,
  });

  if (from.via) {
    const list = ROUTE_WAYPOINTS[from.via.route];
    const i = list.findIndex((w) => w.id === from.via!.at);
    if (i < 0) throw new Error(`Brak punktu ${from.via.at} na trasie ${from.via.route}`);
    return [startPoint(), ...shift(list, i, from.via.km)];
  }
  const routes = [home, ...HOME_COUNTRIES.filter((c) => c !== home)];
  for (const r of routes) {
    const i = ROUTE_WAYPOINTS[r].findIndex((w) => w.id === from.id);
    if (i >= 0) return shift(ROUTE_WAYPOINTS[r], i, 0);
  }
  // Rezerwa: dojazd do startu trasy wzorcowej kraju.
  const list = ROUTE_WAYPOINTS[home];
  const ref = START_CITIES[home].find((c) => c.id === list[0].id);
  const lead = ref ? haversineKm(from, ref) * ROAD_FACTOR : 0;
  return [startPoint(), ...shift(list, 1, lead + list[1].km)];
}

export function makeRoute(home: HomeCountry, fromId: string, toId: string): Route {
  const from = START_CITIES[home].find((c) => c.id === fromId);
  const to = PL_CITIES.find((c) => c.id === toId);
  if (!from || !to) throw new Error(`Nieznane miasto: ${fromId} / ${toId}`);

  const abroad = abroadWaypoints(home, from);
  const rest = abroad[abroad.length - 1];
  if (rest.kind !== 'rest' || rest.lat === undefined || rest.lon === undefined) {
    throw new Error(`Trasa ${home} nie kończy się stacją za granicą`);
  }
  const restPos = { lat: rest.lat, lon: rest.lon };

  /**
   * Kalibracja od stacji do centrum miasta (km, po drogach). Wartości zaokrąglone
   * względem przejść Świecko / Jędrzychowice / Świnoujście; patrz raport w docs.
   * Dla mniejszych miast, których nie ma w tabeli, używamy lokalnego przybliżenia.
   * Odcinki promowe są już ujęte w zagranicznych punktach trasy.
   */
  const roadKmByRest: Record<string, Record<string, number>> = {
    'stacja-swiecko': {
      'zielona-gora': 108, 'poznan': 175, 'szczecin': 205, 'bydgoszcz': 325,
      'wroclaw': 335, 'lodz': 365, 'opole': 410, 'slupsk': 395,
      'warszawa': 465, 'katowice': 475, 'gdansk': 485, 'krakow': 550,
      'kielce': 565, 'olsztyn': 550, 'lublin': 635, 'bialystok': 655,
      'rzeszow': 715,
    },
    'stacja-jedrzychowice': {
      'legnica': 80, 'zielona-gora': 170, 'wroclaw': 155, 'opole': 250,
      'poznan': 290, 'katowice': 330, 'lodz': 390, 'krakow': 415,
      'bydgoszcz': 455, 'szczecin': 440, 'kielce': 520, 'warszawa': 510,
      'gdansk': 605, 'slupsk': 570, 'rzeszow': 580, 'lublin': 640,
      'olsztyn': 640, 'bialystok': 735,
    },

    'stacja-cieszyn': {
      'katowice': 85, 'krakow': 145, 'rzeszow': 235, 'kielce': 250,
      'opole': 175, 'wroclaw': 230, 'legnica': 300, 'lodz': 280,
      'warszawa': 355, 'lublin': 370, 'poznan': 420, 'zielona-gora': 475,
      'bydgoszcz': 500, 'bialystok': 565, 'olsztyn': 590, 'gdansk': 630,
      'slupsk': 615, 'szczecin': 680,
    },
    'stacja-budzisko': {
      'bialystok': 125, 'lomza': 175, 'olsztyn': 285, 'warszawa': 335,
      'lublin': 440, 'gdansk': 450, 'lodz': 465, 'bydgoszcz': 525,
      'kielce': 540, 'slupsk': 555, 'rzeszow': 620, 'poznan': 635,
      'krakow': 650, 'katowice': 675, 'opole': 700, 'wroclaw': 730,
      'zielona-gora': 780, 'szczecin': 800,
    },
    'stacja-swinoujscie': {
      'szczecin': 90, 'slupsk': 235, 'gdansk': 340, 'poznan': 380,
      'bydgoszcz': 420, 'zielona-gora': 375, 'wroclaw': 510,
      'lodz': 535, 'olsztyn': 580, 'warszawa': 635, 'opole': 620,
      'katowice': 690, 'kielce': 745, 'krakow': 795, 'lublin': 785,
      'bialystok': 795, 'rzeszow': 940,
    },
  };
  const distanceFromRest = (point: { id: string; lat?: number; lon?: number }): number => {
    const calibrated = roadKmByRest[rest.id]?.[point.id];
    if (calibrated !== undefined) return calibrated;
    if (point.lat === undefined || point.lon === undefined) {
      throw new Error(`Brak współrzędnych punktu ${point.id}`);
    }
    // Obszary przygraniczne i góry mają różny stosunek drogi do linii prostej.
    const factor = rest.id === 'stacja-swinoujscie' ? 1.34
      : rest.id === 'stacja-jedrzychowice' ? 1.28
        : rest.id === 'stacja-cieszyn' ? 1.30
          : rest.id === 'stacja-budzisko' ? 1.35 : 1.31;
    return Math.round(haversineKm(restPos, { lat: point.lat, lon: point.lon }) * factor);
  };

  const totalKm = Math.round((rest.km + distanceFromRest(to)) / 10) * 10;

  // Korytarz A2, A4 lub S3/S6 wybieramy po położeniu celu, a nie odległości
  // miasta od prostej łączącej granicę z celem (to dawało Poznań + Legnicę).
  const balticDestinations = new Set(['slupsk', 'gdansk', 'bytow', 'kartuzy']);
  const baltic = balticDestinations.has(to.id);
  const southeast = to.lat <= 50.95 && to.lon >= 17.35;
  const beyondWarsaw = to.lon >= 21.15 && to.lat >= 51.0;
  const northCentral = to.lat >= 52.7 && to.lon >= 17.0 && to.lon <= 20.8;
  let candidateIds: string[];

  if (rest.id === 'stacja-cieszyn') {
    // Południowy wjazd z Czech: A1/S1 na Katowice, dalej A4 lub A1.
    candidateIds = southeast ? ['katowice', 'krakow']
      : baltic ? ['katowice', 'lodz', 'gdansk']
        : ['katowice', 'lodz', 'warszawa'];
  } else if (rest.id === 'stacja-budzisko') {
    // Północno-wschodni wjazd z Litwy: Podlasie albo S61/S8 ku centrum.
    candidateIds = baltic ? ['olsztyn', 'gdansk']
      : to.lon >= 22 && to.lat >= 52 ? ['bialystok']
        : to.lon >= 21.5 && to.lat < 52 ? ['bialystok', 'lublin']
          : ['lomza', 'warszawa'];
  } else if (rest.id === 'stacja-swinoujscie') {
    // Nad morzem bez zbędnego zawracania przez Szczecin; w głębi lądu S3.
    candidateIds = baltic ? ['slupsk', 'gdansk']
      : southeast ? ['szczecin', 'wroclaw', 'katowice']
        : beyondWarsaw ? ['szczecin', 'poznan', 'warszawa']
          : ['szczecin', 'poznan', 'bydgoszcz'];
  } else if (rest.id === 'stacja-jedrzychowice') {
    // A4 na południowy wschód; S8/A1 do centrum i A4/S5 na północ.
    candidateIds = southeast
      ? (to.lon >= 20.7 ? ['wroclaw', 'krakow'] : ['wroclaw', 'katowice'])
      : baltic || northCentral ? ['poznan', 'bydgoszcz', 'gdansk']
        : ['wroclaw', 'lodz', 'warszawa'];
  } else {
    // Świecko: S3/S6 na Pomorze, A4 przez Dolny Śląsk na południe, A2 na wschód.
    candidateIds = baltic ? ['szczecin', 'slupsk', 'gdansk']
      : southeast
        ? (to.lon >= 20.7 ? ['wroclaw', 'krakow'] : ['wroclaw', 'katowice'])
        : beyondWarsaw ? ['poznan', 'warszawa']
          : northCentral ? ['poznan', 'bydgoszcz']
            : to.lon < 16.4 ? ['szczecin']
              : ['poznan', 'lodz', 'warszawa'];
  }

  const transit: Waypoint[] = [];
  for (const id of candidateIds) {
    if (transit.length === 2) break;
    if (id === to.id) continue;
    const candidate = PL_TRANSIT.find((city) => city.id === id);
    if (!candidate) continue;
    const km = rest.km + distanceFromRest(candidate);
    const lastKm = transit.length > 0 ? transit[transit.length - 1].km : rest.km;
    // Dla czytelnego renderingu zostawiamy ≥ 60 km pomiędzy miastami
    // tranzytowymi oraz od stacji i do mety.
    if (km - lastKm < 60 || totalKm - km < 60) continue;
    transit.push({ ...candidate, km });
  }

  const homePoint: Waypoint = {
    ...HOME_WAYPOINT,
    id: `dom-${to.id}`,
    name: to.name,
    country: 'PL',
    km: totalKm,
    text: `${to.name}. Jesteś w domu!`,
    lat: to.lat,
    lon: to.lon,
  };
  return { home, from, to, totalKm, waypoints: [...abroad, ...transit, homePoint] };
}

/** Kraj, nad którym jest gracz po przejechaniu `km` (wg ostatniego minionego punktu). */
export function countryAt(route: Route, km: number): CountryCode {
  let country: CountryCode = route.home;
  for (const w of route.waypoints) {
    if (w.km > km) break;
    country = w.country;
  }
  return country;
}
