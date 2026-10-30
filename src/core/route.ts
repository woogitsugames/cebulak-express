import { BERLIN_ALTERNATIVE_EXITS, HOME_WAYPOINT, MUNICH_TO_JEDRZYCHOWICE, PL_TRANSIT, ROUTE_WAYPOINTS, type Waypoint } from '../content/waypoints';

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

  // Monachium nie jedzie przez Jenę: od Norymbergi A9/A72 do Drezna.
  const initialAbroad = home === 'DE' && from.id === 'monachium'
    ? MUNICH_TO_JEDRZYCHOWICE
    : abroadWaypoints(home, from);

  // Kilometry drogowe od stacji po polskiej stronie granicy (A2 / A6-S6 / A18-A4).
  // Dla pozostałych miast zachowujemy dotychczasowy deterministyczny szacunek.
  const polishRoadKm: Record<string, Record<string, number>> = {
    'stacja-swiecko': { poznan: 160, warszawa: 470 },
    'stacja-kolbaskowo': { szczecin: 25, gdansk: 375 },
    'stacja-olszyna': { wroclaw: 178, krakow: 431, katowice: 350, rzeszow: 596 },
  };
  const distanceFromRest = (station: Waypoint): number => {
    // Do południowej Polski z Monachium samochody często jadą przez Czechy.
    // Gra zostawia niemiecki korytarz, ale kalibruje całe km względem drogi realnej.
    if (home === 'DE' && from.id === 'monachium' && station.id === 'stacja-jedrzychowice') {
      const munichRoadKm: Record<string, number> = {
        wroclaw: 150, krakow: 420, katowice: 300, rzeszow: 460,
      };
      if (munichRoadKm[to.id] !== undefined) return munichRoadKm[to.id];
    }
    const calibrated = polishRoadKm[station.id]?.[to.id];
    if (calibrated !== undefined) return calibrated;
    if (station.lat === undefined || station.lon === undefined) {
      throw new Error(`Brak współrzędnych stacji ${station.id}`);
    }
    return haversineKm({ lat: station.lat, lon: station.lon }, to) * ROAD_FACTOR;
  };

  // Po dotarciu do Berlina porównujemy CAŁĄ długość do celu, a nie tylko
  // kilometry po niemieckiej stronie. Dotyczy też BE/NL/UK/DK i Hamburga.
  let abroad = initialAbroad;
  const berlinIndex = initialAbroad.findIndex((waypoint) => waypoint.id === 'berlin');
  if (berlinIndex >= 0) {
    const berlinKm = initialAbroad[berlinIndex].km;
    const prefix = initialAbroad.slice(0, berlinIndex + 1);
    for (const exit of Object.values(BERLIN_ALTERNATIVE_EXITS)) {
      const candidate = [
        ...prefix,
        ...exit.map((waypoint) => ({ ...waypoint, km: berlinKm + waypoint.km })),
      ];
      const candidateRest = candidate[candidate.length - 1];
      const currentRest = abroad[abroad.length - 1];
      if (candidateRest.km + distanceFromRest(candidateRest)
        < currentRest.km + distanceFromRest(currentRest)) {
        abroad = candidate;
      }
    }
  }

  const rest = abroad[abroad.length - 1];
  if (rest.kind !== 'rest' || rest.lat === undefined || rest.lon === undefined) {
    throw new Error(`Trasa ${home} nie kończy się stacją za granicą`);
  }
  const restPos = { lat: rest.lat, lon: rest.lon };
  const direct = haversineKm(restPos, to);
  const totalKm = Math.round((rest.km + distanceFromRest(rest)) / 10) * 10;

  // Polskie miasta po drodze: blisko linii stacja → cel.
  const transit = PL_TRANSIT.filter((c) => {
    if (c.id === to.id || c.lat === undefined || c.lon === undefined) return false;
    const a = haversineKm(restPos, { lat: c.lat, lon: c.lon });
    const b = haversineKm({ lat: c.lat, lon: c.lon }, to);
    return a < direct && a + b <= direct * 1.12;
  })
    .map((c) => ({ ...c, km: Math.round(rest.km + haversineKm(restPos, { lat: c.lat!, lon: c.lon! }) * ROAD_FACTOR) }))
    .filter((c) => c.km < totalKm - 20)
    .sort((a, b) => a.km - b.km);

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
