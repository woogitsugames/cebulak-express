import type { CountryCode, HomeCountry } from '../core/route';

/**
 * Punkty trasy: miasta i miejsca, nad którymi przelatujemy. Trasy fabularyzowane
 * na podstawie typowych dróg Polonii do Polski; km częściowo zweryfikowane z routingiem (zob. docs/trasy-weryfikacja.md),
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
    { id: 'zaglebie-ruhry', name: 'Zagłębie Ruhry', country: 'DE', km: 645, kind: 'landmark', motifs: ['wieże wyciągowe kopalń', 'kominy', 'gazometr'], text: 'Zagłębie Ruhry. Kominy kopcą, kombi sapie.' },
    ...viaRuhrToSwiecko(695),
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
};

/** Polskie miasta „po drodze” — pokazywane, gdy leżą między granicą a celem. */
export const PL_TRANSIT: Omit<Waypoint, 'km'>[] = [
  POZNAN, LODZ, WARSZAWA, SZCZECIN, WROCLAW, LEGNICA,
  KRAKOW, KATOWICE, GDANSK, SLUPSK, BYDGOSZCZ,
];

/** Dom na końcu trasy (meta). */
export const HOME_WAYPOINT: Pick<Waypoint, 'kind' | 'motifs'> = {
  kind: 'city',
  motifs: ['dom rodzinny z ogrodem', 'mama macha w oknie', 'nakryty stół'],
};
