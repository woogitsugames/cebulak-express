import type { CountryCode, HomeCountry } from '../core/route';

/**
 * Punkty trasy: miasta i miejsca, nad którymi przelatujemy. Trasy fabularyzowane
 * na podstawie typowych dróg Polonii do Polski; km częściowo zweryfikowane z routingiem (zob. docs/trasy-weryfikacja.md i docs/trasy-nowe-kraje.md),
 * liczone od startu trasy wzorcowej. Odcinek w Polsce gra liczy osobno — od punktu
 * `rest` (stacja za granicą) do wybranego miasta docelowego.
 *
 * `motifs` to opis dla grafików (zlecenia 05–09): co narysować w tle przy przelocie.
 * Zabytki tylko jako ogólne sylwetki; bez marek, logo, godła; bez Atomium.
 */
export type WaypointKind = 'city' | 'border' | 'crossing' | 'landmark' | 'rest';

export interface Waypoint {
  id: string;
  name: string;
  country: CountryCode;
  km: number;
  kind: WaypointKind;
  motifs: string[];
  text: string;
  lat?: number;
  lon?: number;
}

const BORDER_MOTIFS = ['biało-czerwony szlaban', 'niebieski znak „Rzeczpospolita Polska” (tekst dodaje gra)'];
const STATION_MOTIFS = [
  'duża biało-czerwona stacja paliw bez nazwy i logo',
  'stoisko z hot dogami i kawą',
  'budka z zapiekankami',
];

const POZNAN: Omit<Waypoint, 'km'> = {
  id: 'poznan', name: 'Poznań', country: 'PL', kind: 'city', lat: 52.41, lon: 16.93,
  motifs: ['ratusz z koziołkami', 'kolorowe kamienice rynku'], text: 'Poznań. Koziołki stukają: jeszcze trochę!',
};
const LODZ: Omit<Waypoint, 'km'> = {
  id: 'lodz', name: 'Łódź', country: 'PL', kind: 'city', lat: 51.76, lon: 19.46,
  motifs: ['czerwone kominy fabryczne', 'secesyjne kamienice'], text: 'Łódź. Cegła, kominy i obiad czeka na stole.',
};
const WARSZAWA: Omit<Waypoint, 'km'> = {
  id: 'warszawa', name: 'Warszawa', country: 'PL', kind: 'city', lat: 52.23, lon: 21.01,
  motifs: ['Pałac Kultury jako ogólna sylwetka', 'Wisła z mostem'], text: 'Warszawa. Stolica wita, słoiki gotowe!',
};
const SZCZECIN: Omit<Waypoint, 'km'> = {
  id: 'szczecin', name: 'Szczecin', country: 'PL', kind: 'city', lat: 53.43, lon: 14.55,
  motifs: ['zamek książąt pomorskich', 'Wały Chrobrego nad Odrą', 'żurawie portowe'], text: 'Szczecin. Zamek, port i Odra na powitanie.',
};
const WROCLAW: Omit<Waypoint, 'km'> = {
  id: 'wroclaw', name: 'Wrocław', country: 'PL', kind: 'city', lat: 51.11, lon: 17.03,
  motifs: ['krasnale na chodniku', 'mosty na Odrze', 'ratusz z wieżą'], text: 'Wrocław. Krasnale wskazują drogę do domu.',
};
const LEGNICA: Omit<Waypoint, 'km'> = {
  id: 'legnica', name: 'Legnica', country: 'PL', kind: 'city', lat: 51.21, lon: 16.16,
  motifs: ['rynek z kamienicami', 'zamek piastowski'], text: 'Legnica. Rynek, kamienice i już prawie Wrocław.',
};


const KRAKOW: Omit<Waypoint, 'km'> = {
  id: 'krakow', name: 'Kraków', country: 'PL', kind: 'city', lat: 50.06, lon: 19.94,
  motifs: ['wieże zabytkowego rynku', 'zakole Wisły i wzgórze zamkowe'], text: 'Kraków. Jeszcze jeden zakręt i będzie obiad.',
};
const KATOWICE: Omit<Waypoint, 'km'> = {
  id: 'katowice', name: 'Katowice', country: 'PL', kind: 'city', lat: 50.26, lon: 19.02,
  motifs: ['charakterystyczna hala widowiskowa jako sylwetka', 'nowoczesne biurowce'], text: 'Katowice. W drogę, bo w domu czeka rosół.',
};
const GDANSK: Omit<Waypoint, 'km'> = {
  id: 'gdansk', name: 'Gdańsk', country: 'PL', kind: 'city', lat: 54.35, lon: 18.65,
  motifs: ['portowe żurawie', 'kolorowe kamienice nad kanałem'], text: 'Gdańsk. Mewy też wracają do domu.',
};
const SLUPSK: Omit<Waypoint, 'km'> = {
  id: 'slupsk', name: 'Słupsk', country: 'PL', kind: 'city', lat: 54.46, lon: 17.03,
  motifs: ['ceglane mury i wieże', 'zielone skwery'], text: 'Słupsk. Jeszcze chwila i słoiki na stole.',
};
const BYDGOSZCZ: Omit<Waypoint, 'km'> = {
  id: 'bydgoszcz', name: 'Bydgoszcz', country: 'PL', kind: 'city', lat: 53.12, lon: 18.01,
  motifs: ['spichlerze nad wodą', 'mosty i barki'], text: 'Bydgoszcz. Rzeka płynie, kilometrów ubywa.',
};


const BIALYSTOK: Omit<Waypoint, 'km'> = {
  id: 'bialystok', name: 'Białystok', country: 'PL', kind: 'city', lat: 53.13, lon: 23.16,
  motifs: ['rynek z ratuszem', 'zielone alejki'], text: 'Białystok. Coraz bliżej rodzinnego stołu.',
};
const LOMZA: Omit<Waypoint, 'km'> = {
  id: 'lomza', name: 'Łomża', country: 'PL', kind: 'city', lat: 53.18, lon: 22.06,
  motifs: ['most nad Narwią', 'wieża starego miasta'], text: 'Łomża. Jeszcze trochę do obiadu.',
};
const OLSZTYN: Omit<Waypoint, 'km'> = {
  id: 'olsztyn', name: 'Olsztyn', country: 'PL', kind: 'city', lat: 53.78, lon: 20.49,
  motifs: ['jezioro', 'ceglany zamek'], text: 'Olsztyn. Jeziora mijają, dom coraz bliżej.',
};

/** Wspólny odcinek przez Niemcy od Zagłębia Ruhry do Świecka (km względem Dortmundu). */
function viaRuhrToSwiecko(dortmundKm: number): Waypoint[] {
  const d = dortmundKm;
  return [
    { id: 'dortmund', name: 'Dortmund', country: 'DE', km: d, kind: 'city', motifs: ['wieża telewizyjna na wzgórzu', 'wielki stadion piłkarski'], text: 'Dortmund. Stadion ryczy, kombi cicho jedzie dalej.' },
    { id: 'bielefeld', name: 'Bielefeld', country: 'DE', km: d + 80, kind: 'city', motifs: ['zamek na wzgórzu', 'lesiste wzgórza'], text: 'Bielefeld. Podobno go nie ma, ale korek jest.' },
    { id: 'hanower', name: 'Hanower', country: 'DE', km: d + 195, kind: 'city', motifs: ['ratusz z zieloną kopułą', 'jezioro w mieście'], text: 'Hanower. Kopuła ratusza kiwa na do widzenia.' },
    { id: 'magdeburg', name: 'Magdeburg', country: 'DE', km: d + 340, kind: 'city', motifs: ['katedra z dwiema wieżami nad Łabą', 'wodny most nad Łabą'], text: 'Magdeburg. Most wodny nad Łabą, a my górą.' },
    ...berlinToSwiecko(d + 480),
  ];
}

function berlinToSwiecko(berlinKm: number): Waypoint[] {
  const b = berlinKm;
  return [
    { id: 'berlin', name: 'Berlin', country: 'DE', km: b, kind: 'city', motifs: ['wieża telewizyjna z kulą', 'sylwetka bramy z kolumnami'], text: 'Berlin. Wieża TV macha, do Polski coraz bliżej!' },
    { id: 'frankfurt-oder', name: 'Frankfurt nad Odrą', country: 'DE', km: b + 105, kind: 'city', motifs: ['most na Odrze', 'ceglany ratusz'], text: 'Frankfurt nad Odrą. Za rzeką już Słubice.' },
    { id: 'granica-swiecko', name: 'Granica (Świecko)', country: 'PL', km: b + 115, kind: 'border', motifs: BORDER_MOTIFS, text: 'Rzeczpospolita Polska. Słoiki wracają do domu!', lat: 52.31, lon: 14.58 },
    { id: 'stacja-swiecko', name: 'Stacja za granicą', country: 'PL', km: b + 123, kind: 'rest', motifs: STATION_MOTIFS, text: 'Hot dog, kawa, zapiekanka. Pełny bak i brzuch.', lat: 52.3, lon: 14.62 },
  ];
}

function dresdenToJedrzychowice(dresdenKm: number): Waypoint[] {
  const d = dresdenKm;
  return [
    { id: 'drezno', name: 'Drezno', country: 'DE', km: d, kind: 'city', motifs: ['barokowa panorama nad Łabą', 'kopuła nad starym miastem', 'parowiec na Łabie'], text: 'Drezno. Barokowa panorama, granica tuż-tuż.' },
    { id: 'granica-jedrzychowice', name: 'Granica (Zgorzelec)', country: 'PL', km: d + 100, kind: 'border', motifs: [...BORDER_MOTIFS, 'most nad Nysą Łużycką'], text: 'Zgorzelec. Rzeczpospolita Polska wita!', lat: 51.16, lon: 15.0 },
    { id: 'stacja-jedrzychowice', name: 'Stacja przy A4', country: 'PL', km: d + 108, kind: 'rest', motifs: STATION_MOTIFS, text: 'Hot dogi i kawa przy A4. Zapiekanka na deser.', lat: 51.15, lon: 15.05 },
  ];
}


/** Korytarz Brno–Ołomuniec–Ostrawa–Cieszyn, km od Brna. */
function czechToCieszyn(brnoKm: number): Waypoint[] {
  const b = brnoKm;
  return [
    { id: 'brno', name: 'Brno', country: 'CZ', km: b, kind: 'city', motifs: ['wieże katedry na wzgórzu', 'tramwaje'], text: 'Brno. Termos trzyma ciepło, mapa kierunek.' },
    { id: 'olomouc', name: 'Ołomuniec', country: 'CZ', km: b + 60, kind: 'city', motifs: ['wieża ratusza', 'kamienice starego miasta'], text: 'Ołomuniec. Jeszcze jeden postój na kawę.' },
    { id: 'ostrawa', name: 'Ostrawa', country: 'CZ', km: b + 130, kind: 'city', motifs: ['dawne wieże hutnicze', 'mosty nad Odrą'], text: 'Ostrawa. Ostatnia prosta przed granicą.' },
    { id: 'cesky-tesin', name: 'Czeski Cieszyn', country: 'CZ', km: b + 150, kind: 'city', motifs: ['most nad Olzą', 'kamienice przy rynku'], text: 'Cieszyn za rzeką. Już pachnie domowym obiadem.' },
    { id: 'granica-cieszyn', name: 'Granica (Cieszyn)', country: 'PL', km: b + 160, kind: 'border', motifs: BORDER_MOTIFS, text: 'Cieszyn. Polska na trasie, obiad coraz bliżej!', lat: 49.75, lon: 18.62 },
    { id: 'stacja-cieszyn', name: 'Stacja za granicą', country: 'PL', km: b + 170, kind: 'rest', motifs: STATION_MOTIFS, text: 'Kawa na stacji i jedziemy dalej.', lat: 49.75, lon: 18.65 },
  ];
}

/** Odcinek Ystad–Świnoujście, modelowany jako droga i prom. */
function ystadToSwinoujscie(ystadKm: number): Waypoint[] {
  const y = ystadKm;
  return [
    { id: 'ystad', name: 'Ystad', country: 'SE', km: y, kind: 'crossing', motifs: ['port z promem', 'domy z muru pruskiego'], text: 'Ystad. Walizki też chcą na pokład.' },
    { id: 'prom-baltyk', name: 'Prom przez Bałtyk', country: 'SE', km: y + 85, kind: 'crossing', motifs: ['prom na Bałtyku', 'mewy na pokładzie'], text: 'Prom. Kawa w dłoni, słoiki zabezpieczone.' },
    { id: 'swinoujscie', name: 'Świnoujście', country: 'PL', km: y + 165, kind: 'border', motifs: ['latarnia morska', 'port', ...BORDER_MOTIFS], text: 'Świnoujście. Po promie już polski brzeg!', lat: 53.91, lon: 14.25 },
    { id: 'stacja-swinoujscie', name: 'Stacja przy S3', country: 'PL', km: y + 175, kind: 'rest', motifs: STATION_MOTIFS, text: 'Stacja po rejsie. Kawa i w drogę.', lat: 53.85, lon: 14.3 },
  ];
}

/** Trasy wzorcowe z kraju zamieszkania do pierwszej stacji za granicą Polski. */
export const ROUTE_WAYPOINTS: Record<HomeCountry, Waypoint[]> = {
  BE: [
    { id: 'bruksela', name: 'Bruksela', country: 'BE', km: 0, kind: 'city', motifs: ['kamienice ze zdobionymi szczytami wokół rynku', 'ratusz z ażurową wieżą', 'frytki w papierowym rożku'], text: 'Bruksela. Bagażnik po dach, serce już w Polsce.' },
    { id: 'leuven', name: 'Leuven', country: 'BE', km: 30, kind: 'city', motifs: ['koronkowy gotycki ratusz', 'rowery pod ceglanymi murami'], text: 'Leuven. Ratusz jak koronka, bagażnik jak cegła.' },
    { id: 'liege', name: 'Liège', country: 'BE', km: 100, kind: 'city', motifs: ['wzgórze z długimi schodami', 'Moza z barkami'], text: 'Liège. Moza płynie, a my lecimy dalej.' },
    { id: 'akwizgran', name: 'Akwizgran', country: 'DE', km: 147, kind: 'city', motifs: ['ośmioboczna kopuła katedry', 'stara brama miejska'], text: 'Akwizgran. Witamy w Niemczech!' },
    { id: 'kolonia', name: 'Kolonia', country: 'DE', km: 215, kind: 'city', motifs: ['dwie ostre wieże katedry nad Renem', 'most kolejowy nad Renem'], text: 'Kolonia. Katedra widzi, że wieziesz słoiki.' },
    { id: 'dusseldorf', name: 'Düsseldorf', country: 'DE', km: 255, kind: 'city', motifs: ['smukła wieża telewizyjna nad Renem', 'promenada nad Renem'], text: 'Düsseldorf. Wieża nad Renem odlicza do domu.' },
    { id: 'zaglebie-ruhry', name: 'Zagłębie Ruhry', country: 'DE', km: 285, kind: 'landmark', motifs: ['wieże wyciągowe kopalń', 'kominy i zielone hałdy', 'gazometr jak wielki walec'], text: 'Zagłębie Ruhry. Kominy kopcą, kombi sapie.' },
    ...viaRuhrToSwiecko(325),
  ],
  NL: [
    { id: 'amsterdam', name: 'Amsterdam', country: 'NL', km: 0, kind: 'city', motifs: ['kanały z wąskimi kamienicami', 'rowery przy barierkach', 'wiatrak'], text: 'Amsterdam. Rowery wszędzie, miejsca w kombi brak.' },
    { id: 'utrecht', name: 'Utrecht', country: 'NL', km: 45, kind: 'city', motifs: ['wysoka ceglana wieża nad kanałem', 'kanały z nabrzeżami'], text: 'Utrecht. Wieża wysoka, bagażnik jeszcze wyższy.' },
    { id: 'arnhem', name: 'Arnhem', country: 'NL', km: 100, kind: 'city', motifs: ['most nad Renem', 'lasy i wrzosowiska'], text: 'Arnhem. Most nad Renem i jazda na całego.' },
    { id: 'oberhausen', name: 'Zagłębie Ruhry', country: 'DE', km: 191, kind: 'landmark', motifs: ['gazometr jak wielki walec', 'kominy huty', 'wieże wyciągowe'], text: 'Gazometr jak wielki słoik bez wieczka.' },
    ...viaRuhrToSwiecko(235),
  ],
  DE: [
    { id: 'kolonia', name: 'Kolonia', country: 'DE', km: 0, kind: 'city', motifs: ['dwie ostre wieże katedry nad Renem', 'most nad Renem'], text: 'Kolonia. Katedra widzi, że wieziesz słoiki.' },
    { id: 'dusseldorf', name: 'Düsseldorf', country: 'DE', km: 40, kind: 'city', motifs: ['smukła wieża telewizyjna nad Renem', 'promenada nad Renem'], text: 'Düsseldorf. Wieża nad Renem odlicza do domu.' },
    { id: 'zaglebie-ruhry', name: 'Zagłębie Ruhry', country: 'DE', km: 75, kind: 'landmark', motifs: ['wieże wyciągowe kopalń', 'kominy i zielone hałdy', 'gazometr'], text: 'Zagłębie Ruhry. Kominy kopcą, kombi sapie.' },
    ...viaRuhrToSwiecko(115),
  ],
  UK: [
    { id: 'londyn', name: 'Londyn', country: 'UK', km: 0, kind: 'city', motifs: ['wieża zegarowa nad Tamizą', 'most zwodzony', 'czerwone piętrowe autobusy'], text: 'Londyn. Lewa strona drogi pożegnana!' },
    { id: 'dover', name: 'Dover', country: 'UK', km: 125, kind: 'landmark', motifs: ['białe klify nad portem', 'zamek na wzgórzu', 'mewy'], text: 'Dover. Klify białe jak serwetka pod zapiekanką.' },
    { id: 'prom-kanal', name: 'Prom przez kanał', country: 'UK', km: 145, kind: 'crossing', motifs: ['prom na morzu', 'białe klify za rufą', 'mewy nad pokładem'], text: 'Prom! Kawa, mewy i 90 minut bez korka.' },
    { id: 'calais', name: 'Calais', country: 'FR', km: 185, kind: 'city', motifs: ['wieża ratusza i latarnia', 'szeroka plaża'], text: 'Calais. Znów po prawej stronie drogi.' },
    { id: 'dunkierka', name: 'Dunkierka', country: 'FR', km: 230, kind: 'city', motifs: ['rozległa plaża i wydmy', 'dźwigi portowe'], text: 'Dunkierka. Wielka plaża, wielka trasa.' },
    { id: 'brugia', name: 'Brugia', country: 'BE', km: 305, kind: 'city', motifs: ['kanały z łabędziami', 'wieża z dzwonami nad rynkiem'], text: 'Brugia. Kanały jak z bajki, bagażnik jak magazyn.' },
    { id: 'gandawa', name: 'Gandawa', country: 'BE', km: 355, kind: 'city', motifs: ['zamek nad wodą', 'trzy wieże w jednym widoku'], text: 'Gandawa. Zamek na wodzie, w kombi pół spiżarni.' },
    { id: 'antwerpia', name: 'Antwerpia', country: 'BE', km: 415, kind: 'city', motifs: ['dworzec z wielką kopułą', 'port z dźwigami'], text: 'Antwerpia. Dźwigi portowe liczą nasze słoiki.' },
    { id: 'eindhoven', name: 'Eindhoven', country: 'NL', km: 505, kind: 'city', motifs: ['wiszące rondo dla rowerów', 'rowery'], text: 'Eindhoven. Rowery nad drogą, my pod chmurami.' },
    { id: 'venlo', name: 'Venlo', country: 'NL', km: 560, kind: 'city', motifs: ['zielone szklarnie', 'ratusz na rynku'], text: 'Venlo. Szklarnie i Niemcy tuż-tuż.' },
    { id: 'zaglebie-ruhry', name: 'Zagłębie Ruhry', country: 'DE', km: 617, kind: 'landmark', motifs: ['wieże wyciągowe kopalń', 'kominy', 'gazometr'], text: 'Zagłębie Ruhry. Kominy kopcą, kombi sapie.' },
    ...viaRuhrToSwiecko(661),
  ],
  FR: [
    { id: 'paryz', name: 'Paryż', country: 'FR', km: 0, kind: 'city', motifs: ['stalowa wieża nad dachami (sylwetka, za dnia)', 'dachy mansardowe'], text: 'Paryż. Wieża żegna kombi z pełnym bagażnikiem.' },
    { id: 'reims', name: 'Reims', country: 'FR', km: 145, kind: 'city', motifs: ['gotycka katedra z dwiema wieżami', 'kredowe wzgórza'], text: 'Reims. Katedra, wzgórza i pierwsza kawa.' },
    { id: 'metz', name: 'Metz', country: 'FR', km: 335, kind: 'city', motifs: ['katedra z żółtego kamienia', 'most nad Mozelą'], text: 'Metz. Katedra z witrażami, w głowie pierogi.' },
    { id: 'saarbrucken', name: 'Saarbrücken', country: 'DE', km: 405, kind: 'city', motifs: ['most na Saarze', 'dawna huta z kominami'], text: 'Saarbrücken. Witamy w Niemczech!' },
    { id: 'mannheim', name: 'Mannheim', country: 'DE', km: 535, kind: 'city', motifs: ['wieża ciśnień z fontanną', 'barki na Renie'], text: 'Mannheim. Miasto w kratkę, korek okrągły.' },
    { id: 'frankfurt-main', name: 'Frankfurt nad Menem', country: 'DE', km: 585, kind: 'city', motifs: ['panorama wieżowców', 'Men z mostami'], text: 'Frankfurt. Wieżowce liczą piętra, my km.' },
    { id: 'erfurt', name: 'Erfurt', country: 'DE', km: 845, kind: 'city', motifs: ['most z kamieniczkami nad rzeką', 'gotyckie wieże'], text: 'Erfurt. Dom na moście, nasz dom na końcu trasy.' },
    ...dresdenToJedrzychowice(1065),
  ],
  CH: [
    { id: 'zurych', name: 'Zurych', country: 'CH', km: 0, kind: 'city', motifs: ['jezioro z łabędziami', 'Alpy na horyzoncie', 'wieże starego miasta'], text: 'Zurych. Alpy za plecami, bigos przed nosem.' },
    { id: 'wodospad-renski', name: 'Wodospad Reński', country: 'CH', km: 45, kind: 'landmark', motifs: ['szeroki wodospad na Renie', 'skała pośrodku nurtu'], text: 'Wodospad. Woda w dół, my w górę mapy.' },
    { id: 'stuttgart', name: 'Stuttgart', country: 'DE', km: 215, kind: 'city', motifs: ['wieża telewizyjna na wzgórzu', 'winnice na zboczach'], text: 'Stuttgart. Witamy w Niemczech!' },
    { id: 'norymberga', name: 'Norymberga', country: 'DE', km: 420, kind: 'city', motifs: ['zamek na skale', 'kamienice z belkami', 'piernikowe serca'], text: 'Norymberga. Zamek na skale, pierniki w kombi.' },
    { id: 'jena', name: 'Jena', country: 'DE', km: 600, kind: 'city', motifs: ['okrągła wieża', 'wzgórza nad Salą'], text: 'Jena. Okrągła wieża i drogowskaz na wschód.' },
    ...dresdenToJedrzychowice(740),
  ],
  NO: [
    { id: 'oslo', name: 'Oslo', country: 'NO', km: 0, kind: 'city', motifs: ['biały gmach opery nad fiordem (ogólnie)', 'fiord z żaglówkami', 'skocznia na wzgórzu'], text: 'Oslo. Fiord żegna, słoiki pakują się same.' },
    { id: 'svinesund', name: 'Svinesund', country: 'SE', km: 120, kind: 'border', motifs: ['most graniczny nad fiordem', 'las i łoś'], text: 'Most na granicy, łoś macha z lasu.' },
    { id: 'goteborg', name: 'Göteborg', country: 'SE', km: 290, kind: 'city', motifs: ['dźwigi portowe', 'tramwaje', 'kanały'], text: 'Göteborg. Port, tramwaje i dalej na południe.' },
    { id: 'helsingborg', name: 'Helsingborg', country: 'SE', km: 510, kind: 'city', motifs: ['ceglana wieża twierdzy', 'prom w cieśninie'], text: 'Helsingborg. Za cieśniną już Dania.' },
    { id: 'malmo', name: 'Malmö', country: 'SE', km: 570, kind: 'city', motifs: ['most nad cieśniną na horyzoncie', 'ceglany zamek'], text: 'Malmö. Most na horyzoncie, prom przed nami.' },
    { id: 'ystad', name: 'Ystad', country: 'SE', km: 615, kind: 'crossing', motifs: ['port z promem', 'domy z muru pruskiego'], text: 'Ystad. Wjeżdżamy na prom. Trzymaj się!' },
    { id: 'prom-baltyk', name: 'Prom przez Bałtyk', country: 'SE', km: 700, kind: 'crossing', motifs: ['prom na Bałtyku', 'mewy', 'latarnia morska'], text: 'Na promie: kawa, mewy i cisza. Rzadkość!' },
    { id: 'swinoujscie', name: 'Świnoujście', country: 'PL', km: 780, kind: 'border', motifs: ['latarnia morska', 'wiatrak-stawa w porcie', ...BORDER_MOTIFS], text: 'Świnoujście. Polska wita po rejsie!', lat: 53.91, lon: 14.25 },
    { id: 'stacja-swinoujscie', name: 'Stacja przy S3', country: 'PL', km: 790, kind: 'rest', motifs: STATION_MOTIFS, text: 'Hot dog po rejsie smakuje podwójnie.', lat: 53.85, lon: 14.3 },
  ],
  DK: [
    { id: 'kopenhaga', name: 'Kopenhaga', country: 'DK', km: 0, kind: 'city', motifs: ['kolorowe domki nad kanałem', 'rowery', 'wieża z iglicą'], text: 'Kopenhaga. Rowery mkną, kombi się turla.' },
    { id: 'roskilde', name: 'Roskilde', country: 'DK', km: 33, kind: 'city', motifs: ['łodzie wikingów', 'fiord'], text: 'Roskilde. Wikingowie pływali, my lecimy z kawą.' },
    { id: 'most-falster', name: 'Most nad cieśniną', country: 'DK', km: 100, kind: 'landmark', motifs: ['długi most nad wodą', 'mewy'], text: 'Długi most, mewy z boku, hot dog w głowie.' },
    { id: 'prom-fehmarn', name: 'Prom przez Bałtyk', country: 'DK', km: 160, kind: 'crossing', motifs: ['prom na Bałtyku', 'wiatraki na wybrzeżu', 'mewy nad pokładem'], text: 'Na promie: kawa i mewy. 45 minut ciszy.' },
    { id: 'lubeka', name: 'Lubeka', country: 'DE', km: 270, kind: 'city', motifs: ['brama z dwiema okrągłymi wieżami', 'ceglany gotyk'], text: 'Lubeka. Brama z dwiema wieżami wita z daleka.' },
    { id: 'hamburg', name: 'Hamburg', country: 'DE', km: 335, kind: 'city', motifs: ['port z dźwigami', 'ratusz z zieloną kopułą', 'spichlerze z cegły'], text: 'Hamburg. Mewy robią zdjęcia kombi.' },
    ...berlinToSwiecko(625),
  ],
  IE: [
    { id: 'dublin', name: 'Dublin', country: 'IE', km: 0, kind: 'city', motifs: ['ceglane kamienice', 'rzeka z mostami'], text: 'Dublin. Bagaże gotowe, kierunek: dom.' },
    { id: 'wicklow', name: 'Wicklow', country: 'IE', km: 65, kind: 'city', motifs: ['zielone wzgórza', 'kamienne ogrodzenia'], text: 'Wicklow. Zieleń za oknem i torby na dachu.' },
    { id: 'rosslare', name: 'Rosslare', country: 'IE', km: 155, kind: 'crossing', motifs: ['terminal promowy', 'mewy nad zatoką'], text: 'Rosslare. Na promie miejsca na słoiki nie brak.' },
    { id: 'prom-irlandia-francja', name: 'Prom do Francji', country: 'IE', km: 455, kind: 'crossing', motifs: ['prom na otwartym morzu', 'kubek kawy przy oknie'], text: 'Prom. Spokojna chwila, zanim wrócą zakręty.' },
    { id: 'cherbourg', name: 'Cherbourg', country: 'FR', km: 755, kind: 'city', motifs: ['baseny portowe', 'latarnie morskie'], text: 'Cherbourg. Ląd pod kołami, mapa znów pracuje.' },
    { id: 'caen', name: 'Caen', country: 'FR', km: 875, kind: 'city', motifs: ['wieże opactwa', 'kamienny most'], text: 'Caen. Pierwszy odcinek po rejsie zaliczony.' },
    { id: 'rouen', name: 'Rouen', country: 'FR', km: 995, kind: 'city', motifs: ['gotycka wieża', 'nabrzeże Sekwany'], text: 'Rouen. Katedra wysoka, dach jeszcze wyższy.' },
    { id: 'reims', name: 'Reims', country: 'FR', km: 1195, kind: 'city', motifs: ['wieże katedry', 'łagodne wzgórza'], text: 'Reims. Kawa się skończyła, kilometry nie.' },
    { id: 'metz', name: 'Metz', country: 'FR', km: 1360, kind: 'city', motifs: ['mosty nad Mozelą', 'kamienna katedra'], text: 'Metz. W bagażniku wszystko, oprócz wolnego miejsca.' },
    { id: 'saarbrucken', name: 'Saarbrücken', country: 'DE', km: 1430, kind: 'city', motifs: ['most nad Saarą', 'zielone wzgórza'], text: 'Saarbrücken. Nowy kraj, ten sam pełny dach.' },
    { id: 'mannheim', name: 'Mannheim', country: 'DE', km: 1560, kind: 'city', motifs: ['wieża ciśnień', 'rzeka z barkami'], text: 'Mannheim. Termos dostał kolejne zadanie.' },
    { id: 'frankfurt-main', name: 'Frankfurt nad Menem', country: 'DE', km: 1610, kind: 'city', motifs: ['wieżowce nad rzeką', 'mosty'], text: 'Frankfurt. Piętra rosną, kilometrów ubywa.' },
    { id: 'erfurt', name: 'Erfurt', country: 'DE', km: 1870, kind: 'city', motifs: ['kamienice na moście', 'wieże starego miasta'], text: 'Erfurt. Jeszcze trochę i pora na obiad.' },
    ...dresdenToJedrzychowice(2085),
  ],
  ES: [
    { id: 'barcelona', name: 'Barcelona', country: 'ES', km: 0, kind: 'city', motifs: ['wieże modernistycznej świątyni jako sylwetka', 'palmy'], text: 'Barcelona. Walizki gotowe na długą drogę.' },
    { id: 'girona', name: 'Girona', country: 'ES', km: 105, kind: 'city', motifs: ['kolorowe domy nad rzeką', 'kamienny most'], text: 'Girona. Jeszcze chwila słońca do bagażnika.' },
    { id: 'la-jonquera', name: 'La Jonquera', country: 'ES', km: 170, kind: 'border', motifs: ['górski przejazd', 'znaki drogowe bez marek'], text: 'Granica. Przed nami kolejny rozdział trasy.' },
    { id: 'perpignan', name: 'Perpignan', country: 'FR', km: 215, kind: 'city', motifs: ['ceglana brama miejska', 'palmy przy placu'], text: 'Perpignan. Wjechaliśmy do Francji.' },
    { id: 'narbonne', name: 'Narbonne', country: 'FR', km: 275, kind: 'city', motifs: ['kanał z barkami', 'stare kamienice'], text: 'Narbonne. Kanał płynie, kombi też.' },
    { id: 'montpellier', name: 'Montpellier', country: 'FR', km: 380, kind: 'city', motifs: ['jasne fasady', 'tramwaj'], text: 'Montpellier. Bagażnik nadal trzyma fason.' },
    { id: 'lyon', name: 'Lyon', country: 'FR', km: 650, kind: 'city', motifs: ['most nad Rodanem', 'wzgórze z bazyliką jako sylwetka'], text: 'Lyon. Most za mostem i bliżej domu.' },
    { id: 'besancon', name: 'Besançon', country: 'FR', km: 850, kind: 'city', motifs: ['zakole rzeki', 'twierdza na wzgórzu'], text: 'Besançon. Jeszcze miejsce na jedną torbę?' },
    { id: 'mulhouse', name: 'Mulhouse', country: 'FR', km: 965, kind: 'city', motifs: ['stary ratusz', 'kominy fabryczne'], text: 'Mulhouse. Termos wie, że droga jeszcze długa.' },
    { id: 'freiburg', name: 'Fryburg Bryzgowijski', country: 'DE', km: 1045, kind: 'city', motifs: ['strzelista wieża katedry', 'lasy na horyzoncie'], text: 'Fryburg. Znów nowy kraj i nowa kawa.' },
    { id: 'karlsruhe', name: 'Karlsruhe', country: 'DE', km: 1175, kind: 'city', motifs: ['pałac i park', 'aleje drzew'], text: 'Karlsruhe. Torby siedzą, licznik biegnie.' },
    { id: 'norymberga', name: 'Norymberga', country: 'DE', km: 1445, kind: 'city', motifs: ['zamek na wzgórzu', 'dachy kamienic'], text: 'Norymberga. Dom coraz bliżej.' },
    { id: 'jena', name: 'Jena', country: 'DE', km: 1580, kind: 'city', motifs: ['smukła wieża', 'zielone wzgórza'], text: 'Jena. Zapas kawy już policzony.' },
    ...dresdenToJedrzychowice(1700),
  ],
  IT: [
    { id: 'mediolan', name: 'Mediolan', country: 'IT', km: 0, kind: 'city', motifs: ['iglice katedry jako sylwetka', 'tramwaj'], text: 'Mediolan. Walizki po dach i jedziemy.' },
    { id: 'werona', name: 'Werona', country: 'IT', km: 160, kind: 'city', motifs: ['stary kamienny most', 'zabytkowa arena jako sylwetka'], text: 'Werona. Bagażnik dostał owacje.' },
    { id: 'padwa', name: 'Padwa', country: 'IT', km: 235, kind: 'city', motifs: ['arkadowe kamienice', 'wieża zegarowa'], text: 'Padwa. Jeszcze chwila i góry w oknie.' },
    { id: 'mestre', name: 'Mestre', country: 'IT', km: 275, kind: 'city', motifs: ['kanał przy drodze', 'stare wieże w oddali'], text: 'Mestre. W drogę na północ.' },
    { id: 'udine', name: 'Udine', country: 'IT', km: 410, kind: 'city', motifs: ['wieża zamkowa na wzgórzu', 'góry'], text: 'Udine. Alpy już zaglądają do kabiny.' },
    { id: 'tarvisio', name: 'Tarvisio', country: 'IT', km: 490, kind: 'border', motifs: ['zielone przełęcze', 'tunel w górach'], text: 'Tarvisio. Góry za oknem, słoiki przypięte.' },
    { id: 'villach', name: 'Villach', country: 'AT', km: 530, kind: 'city', motifs: ['alpejski krajobraz', 'most nad rzeką'], text: 'Villach. Alpy zostają za nami.' },
    { id: 'graz', name: 'Graz', country: 'AT', km: 700, kind: 'city', motifs: ['wzgórze z wieżą zegarową', 'czerwone dachy'], text: 'Graz. Zegar tyka, my liczymy kilometry.' },
    { id: 'wieden', name: 'Wiedeń', country: 'AT', km: 875, kind: 'city', motifs: ['kopuła zabytkowego gmachu', 'tramwaj'], text: 'Wiedeń. Jeszcze parę godzin do pierogów.' },
    { id: 'mikulov', name: 'Mikulov', country: 'CZ', km: 955, kind: 'border', motifs: ['zamek na skale', 'winnice na wzgórzach'], text: 'Mikulov. Zmieniamy kraj, nie kierunek.' },
    ...czechToCieszyn(1015),
  ],
  AT: [
    { id: 'wieden', name: 'Wiedeń', country: 'AT', km: 0, kind: 'city', motifs: ['kopuła zabytkowego gmachu', 'tramwaj'], text: 'Wiedeń. Pakujemy wspomnienia i ruszamy.' },
    { id: 'mikulov', name: 'Mikulov', country: 'CZ', km: 75, kind: 'border', motifs: ['zamek na wzgórzu', 'łagodne pagórki'], text: 'Mikulov. Przez Czechy coraz bliżej domu.' },
    ...czechToCieszyn(135),
  ],
  SE: [
    { id: 'sztokholm', name: 'Sztokholm', country: 'SE', km: 0, kind: 'city', motifs: ['kolorowe kamienice nad wodą', 'mosty między wyspami'], text: 'Sztokholm. Bagażnik gotowy do podróży.' },
    { id: 'nykoping', name: 'Nyköping', country: 'SE', km: 100, kind: 'city', motifs: ['zamek nad rzeką', 'zielone wzgórza'], text: 'Nyköping. Pierwsza kawa zaliczona.' },
    { id: 'norrkoping', name: 'Norrköping', country: 'SE', km: 160, kind: 'city', motifs: ['czerwone budynki nad wodą', 'most'], text: 'Norrköping. Walizki się nie nudzą.' },
    { id: 'jonkoping', name: 'Jönköping', country: 'SE', km: 320, kind: 'city', motifs: ['jezioro z łodziami', 'drewniane domki'], text: 'Jönköping. Jezioro mija, kombi jedzie dalej.' },
    { id: 'helsingborg', name: 'Helsingborg', country: 'SE', km: 510, kind: 'city', motifs: ['ceglana wieża', 'prom w cieśninie'], text: 'Helsingborg. Mewy znają już nasz bagażnik.' },
    { id: 'malmo', name: 'Malmö', country: 'SE', km: 570, kind: 'city', motifs: ['most nad cieśniną', 'ceglany zamek'], text: 'Malmö. Port coraz bliżej.' },
    ...ystadToSwinoujscie(620),
  ],
  FI: [
    { id: 'helsinki', name: 'Helsinki', country: 'FI', km: 0, kind: 'city', motifs: ['jasna kopuła nad portem', 'tramwaje'], text: 'Helsinki. W drogę, najpierw prom!' },
    { id: 'port-helsinki', name: 'Port w Helsinkach', country: 'FI', km: 12, kind: 'crossing', motifs: ['terminal promowy', 'statki przy nabrzeżu'], text: 'Port. Bagaże też mają bilety.' },
    { id: 'prom-zatoka-finska', name: 'Prom przez Zatokę Fińską', country: 'FI', km: 50, kind: 'crossing', motifs: ['prom', 'mewy', 'woda po horyzont'], text: 'Prom. Kawa i krótka przerwa od drogi.' },
    { id: 'tallinn', name: 'Tallinn', country: 'EE', km: 100, kind: 'city', motifs: ['wieże średniowiecznego miasta', 'port'], text: 'Tallinn. Wysiadamy z promu. Kierunek: Polska.' },
    { id: 'parnu', name: 'Pärnu', country: 'EE', km: 230, kind: 'city', motifs: ['drewniane domki', 'plaża i las'], text: 'Pärnu. Las za oknem, termos wciąż pełny.' },
    { id: 'granica-ee-lv', name: 'Granica Estonii i Łotwy', country: 'LV', km: 290, kind: 'border', motifs: ['droga przez lasy', 'znak graniczny bez logo'], text: 'Łotwa. Na mapie coraz bliżej domu.' },
    { id: 'ryga', name: 'Ryga', country: 'LV', km: 400, kind: 'city', motifs: ['secesyjne fasady', 'most nad Dźwiną'], text: 'Ryga. Miasto mija, pierogi czekają.' },
    { id: 'bauska', name: 'Bauska', country: 'LV', km: 470, kind: 'city', motifs: ['zamek nad rzeką', 'pola za miastem'], text: 'Bauska. Kawa już trochę chłodniejsza.' },
    { id: 'granica-lv-lt', name: 'Granica Łotwy i Litwy', country: 'LT', km: 505, kind: 'border', motifs: ['szosa przez pola', 'łąki'], text: 'Litwa. Jeszcze trochę asfaltu i granica.' },
    { id: 'panevezys', name: 'Poniewież', country: 'LT', km: 565, kind: 'city', motifs: ['most nad rzeką', 'zabudowa rynku'], text: 'Poniewież. Słoiki nadal w komplecie.' },
    { id: 'kowno', name: 'Kowno', country: 'LT', km: 665, kind: 'city', motifs: ['zamek u zbiegu rzek', 'kamienne uliczki'], text: 'Kowno. Już tylko pół termosu drogi.' },
    { id: 'mariampol', name: 'Mariampol', country: 'LT', km: 730, kind: 'city', motifs: ['zielone parki', 'niskie kamienice'], text: 'Mariampol. Polska już niedaleko.' },
    { id: 'granica-budzisko', name: 'Granica (Budzisko)', country: 'PL', km: 780, kind: 'border', motifs: BORDER_MOTIFS, text: 'Budzisko. Polska! Słoiki prawie u celu.', lat: 54.28, lon: 23.08 },
    { id: 'stacja-budzisko', name: 'Stacja za granicą', country: 'PL', km: 790, kind: 'rest', motifs: STATION_MOTIFS, text: 'Na stacji gorąca kawa. Do domu!', lat: 54.29, lon: 23.07 },
  ],
  LU: [
    { id: 'luksemburg', name: 'Luksemburg', country: 'LU', km: 0, kind: 'city', motifs: ['most nad doliną', 'kamienne fortyfikacje'], text: 'Luksemburg. Torby na dach i ruszamy.' },
    { id: 'trier', name: 'Trewir', country: 'DE', km: 60, kind: 'city', motifs: ['starożytna brama miejska', 'kamienny most'], text: 'Trewir. Granica minęła, trasa trwa.' },
    { id: 'koblenz', name: 'Koblencja', country: 'DE', km: 190, kind: 'city', motifs: ['dwie rzeki u zbiegu', 'zamek na wzgórzu'], text: 'Koblencja. Dwie rzeki, jeden cel.' },
    { id: 'frankfurt-main', name: 'Frankfurt nad Menem', country: 'DE', km: 315, kind: 'city', motifs: ['wieżowce nad Menem', 'mosty'], text: 'Frankfurt. Kombi nie liczy pięter.' },
    { id: 'erfurt', name: 'Erfurt', country: 'DE', km: 570, kind: 'city', motifs: ['kamienice na moście', 'gotyckie wieże'], text: 'Erfurt. Walizki proszą o krótszy objazd.' },
    ...dresdenToJedrzychowice(780),
  ],

};

/** Polskie miasta „po drodze” — pokazywane, gdy leżą między granicą a celem. */
export const PL_TRANSIT: Omit<Waypoint, 'km'>[] = [
  POZNAN, LODZ, WARSZAWA, SZCZECIN, WROCLAW, LEGNICA,
  KRAKOW, KATOWICE, GDANSK, SLUPSK, BYDGOSZCZ, BIALYSTOK, LOMZA, OLSZTYN,
];

/** Dom na końcu trasy (meta). */
export const HOME_WAYPOINT: Pick<Waypoint, 'kind' | 'motifs'> = {
  kind: 'city',
  motifs: ['dom rodzinny z ogrodem', 'mama macha w oknie', 'nakryty stół'],
};
