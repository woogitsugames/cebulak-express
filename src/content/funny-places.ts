import type { CountryCode } from '../core/route';

/**
 * Realne miejscowości, gminy i dzielnice; skojarzenia słuchowe są żartobliwe,
 * a nie transkrypcją fonetyczną. Przy integrowaniu z trasą wyświetlaj tylko
 * pozycje, których `near` występuje w bieżącym `route.waypoints`.
 * Przesunięcie `offsetKm` liczone jest od kilometra danego waypointu.
 */
export interface FunnyPlace {
  id: string;
  name: string;
  country: CountryCode;
  soundsLike: string;
  joke: string;
  near: string;
  offsetKm: number;
  sign: 'exit' | 'district' | 'town';
  source: string;
}

export const FUNNY_PLACES: readonly FunnyPlace[] = [
  {
    "id": "be-deurne",
    "name": "Deurne",
    "country": "BE",
    "soundsLike": "durne",
    "joke": "Deurne? Durne są tylko korki, nie nazwy na tablicach.",
    "near": "antwerpia",
    "offsetKm": 9,
    "sign": "district",
    "source": "https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten"
  },
  {
    "id": "be-hoboken",
    "name": "Hoboken",
    "country": "BE",
    "soundsLike": "o, bokiem",
    "joke": "Hoboken? Bokiem byłoby szybciej, ale nawigacja zna swoje skróty.",
    "near": "antwerpia",
    "offsetKm": 15,
    "sign": "district",
    "source": "https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten"
  },
  {
    "id": "be-wilrijk",
    "name": "Wilrijk",
    "country": "BE",
    "soundsLike": "wilryk",
    "joke": "Wilrijk? Wilk może poczekać, słoiki jadą do domu.",
    "near": "antwerpia",
    "offsetKm": 22,
    "sign": "district",
    "source": "https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten"
  },
  {
    "id": "be-boom",
    "name": "Boom",
    "country": "BE",
    "soundsLike": "bum",
    "joke": "Boom? Bum robi tylko bagażnik na nierównej drodze.",
    "near": "antwerpia",
    "offsetKm": 29,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Boom%2C_Belgium"
  },
  {
    "id": "be-bertem",
    "name": "Bertem",
    "country": "BE",
    "soundsLike": "bertem, jak beretem",
    "joke": "Bertem? Beretem niczego tu nie przykryjesz, zwłaszcza walizek.",
    "near": "leuven",
    "offsetKm": 10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Bertem"
  },
  {
    "id": "be-kessel-lo",
    "name": "Kessel-Lo",
    "country": "BE",
    "soundsLike": "kesel-lo, jak kisiel",
    "joke": "Kessel-Lo? Kisiel zostawmy na deser po dojeździe.",
    "near": "leuven",
    "offsetKm": 17,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Kessel-Lo"
  },
  {
    "id": "be-zeebrugge",
    "name": "Zeebrugge",
    "country": "BE",
    "soundsLike": "zebrugę, jak zebra",
    "joke": "Zeebrugge? Zebry na pasach też chcą do domu.",
    "near": "brugia",
    "offsetKm": 11,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Zeebrugge"
  },
  {
    "id": "be-damme",
    "name": "Damme",
    "country": "BE",
    "soundsLike": "damę, jak damy",
    "joke": "Damme? Damy radę, choć bagażnik ma inne zdanie.",
    "near": "brugia",
    "offsetKm": 18,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Damme"
  },
  {
    "id": "be-melle",
    "name": "Melle",
    "country": "BE",
    "soundsLike": "melę, jak mielę",
    "joke": "Melle? Mielę w głowie drogę do domu, nie kilometrówki.",
    "near": "gandawa",
    "offsetKm": 12,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Melle%2C_Belgium"
  },
  {
    "id": "nl-weesp",
    "name": "Weesp",
    "country": "NL",
    "soundsLike": "wesp, jak wiesz",
    "joke": "Weesp? Wiesz, że za granicą czeka już rosół?",
    "near": "amsterdam",
    "offsetKm": 10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Weesp"
  },
  {
    "id": "nl-maarssen",
    "name": "Maarssen",
    "country": "NL",
    "soundsLike": "marsen, jak marsz",
    "joke": "Maarssen? Marsz do przodu, słoiki same się nie dowiozą!",
    "near": "utrecht",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Maarssen"
  },
  {
    "id": "nl-bunnik",
    "name": "Bunnik",
    "country": "NL",
    "soundsLike": "bunik, jak bunia",
    "joke": "Bunnik? Bunia już pewnie miesza rosół na kuchence.",
    "near": "utrecht",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Bunnik"
  },
  {
    "id": "nl-best",
    "name": "Best",
    "country": "NL",
    "soundsLike": "best",
    "joke": "Best? Najlepszy postój to ten bez korka.",
    "near": "eindhoven",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Best%2C_Netherlands"
  },
  {
    "id": "nl-ede",
    "name": "Ede",
    "country": "NL",
    "soundsLike": "ede, jak idę",
    "joke": "Ede? Idę? Nie, dziś kombi ma pierwszeństwo.",
    "near": "arnhem",
    "offsetKm": 11,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Ede%2C_Netherlands"
  },
  {
    "id": "nl-oosterbeek",
    "name": "Oosterbeek",
    "country": "NL",
    "soundsLike": "osterbek, jak ostra beka",
    "joke": "Oosterbeek? Ostra beka, gdy GPS każe zawrócić.",
    "near": "arnhem",
    "offsetKm": 20,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Oosterbeek"
  },
  {
    "id": "nl-america",
    "name": "America",
    "country": "NL",
    "soundsLike": "amerika",
    "joke": "America? Do Ameryki przez Holandię i tak się nie wybieramy!",
    "near": "venlo",
    "offsetKm": 18,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/America%2C_Netherlands"
  },
  {
    "id": "nl-boxtel",
    "name": "Boxtel",
    "country": "NL",
    "soundsLike": "bokstel, jak boks",
    "joke": "Boxtel? Boks zostawmy bagażom walczącym o miejsce.",
    "near": "eindhoven",
    "offsetKm": 17,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Boxtel"
  },
  {
    "id": "nl-geldrop",
    "name": "Geldrop",
    "country": "NL",
    "soundsLike": "geldrop, jak gdzie drop",
    "joke": "Geldrop? Gdzie drop? Paczka od mamy już czeka dalej.",
    "near": "eindhoven",
    "offsetKm": 25,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Geldrop"
  },
  {
    "id": "de-porz",
    "name": "Porz",
    "country": "DE",
    "soundsLike": "porc, jak por",
    "joke": "Porz? Por do rosołu już prawie w bagażniku.",
    "near": "kolonia",
    "offsetKm": 8,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Porz"
  },
  {
    "id": "de-hurth",
    "name": "Hürth",
    "country": "DE",
    "soundsLike": "hürt, jak hurt",
    "joke": "Hürth? Hurtowo można tu liczyć tylko walizki.",
    "near": "kolonia",
    "offsetKm": 15,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/H%C3%BCrth"
  },
  {
    "id": "de-lunen",
    "name": "Lünen",
    "country": "DE",
    "soundsLike": "lünen, jak lunę",
    "joke": "Lünen? Nie lunę, jeśli droga zrobi się wyboista.",
    "near": "dortmund",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/L%C3%BCnen"
  },
  {
    "id": "de-kamen",
    "name": "Kamen",
    "country": "DE",
    "soundsLike": "kamen, jak kamień",
    "joke": "Kamen? Jeden kamień mniej pod kołami i lecimy!",
    "near": "dortmund",
    "offsetKm": 17,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Kamen"
  },
  {
    "id": "de-bochum",
    "name": "Bochum",
    "country": "DE",
    "soundsLike": "bochum, jak bo czym",
    "joke": "Bochum? Bo czym jedziesz? Oczywiście kombi!",
    "near": "dortmund",
    "offsetKm": 26,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Bochum"
  },
  {
    "id": "de-laatzen",
    "name": "Laatzen",
    "country": "DE",
    "soundsLike": "lacen, jak latam",
    "joke": "Laatzen? Latam tylko nisko, żeby zobaczyć zjazd.",
    "near": "hanower",
    "offsetKm": 10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Laatzen"
  },
  {
    "id": "de-peine",
    "name": "Peine",
    "country": "DE",
    "soundsLike": "pajne, jak fajne",
    "joke": "Peine? Fajnie, jeśli przed nami ani jednego korka!",
    "near": "hanower",
    "offsetKm": 29,
    "sign": "town",
    "source": "https://de.wikipedia.org/wiki/Peine"
  },
  {
    "id": "de-moabit",
    "name": "Moabit",
    "country": "DE",
    "soundsLike": "moabit, jak ma być",
    "joke": "Moabit? Ma być objazd? Nie, dziś jedziemy prosto!",
    "near": "berlin",
    "offsetKm": 8,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Moabit"
  },
  {
    "id": "de-pankow",
    "name": "Pankow",
    "country": "DE",
    "soundsLike": "pankow, jak pąków",
    "joke": "Pankow? Pączków z lukrem bardziej nam teraz brakuje.",
    "near": "berlin",
    "offsetKm": 16,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Pankow"
  },
  {
    "id": "de-wedding",
    "name": "Wedding",
    "country": "DE",
    "soundsLike": "weding, jak we dnie",
    "joke": "Wedding? We dnie też można marzyć o obiedzie w domu.",
    "near": "berlin",
    "offsetKm": 24,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Wedding_(Berlin)"
  },
  {
    "id": "de-klotzsche",
    "name": "Klotzsche",
    "country": "DE",
    "soundsLike": "klocze, jak klocki",
    "joke": "Klotzsche? Klocki niech leżą w pudełku, nie na jezdni.",
    "near": "drezno",
    "offsetKm": 12,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Klotzsche"
  },
  {
    "id": "uk-peckham",
    "name": "Peckham",
    "country": "UK",
    "soundsLike": "pekam, jak pech mam",
    "joke": "Peckham? Pech mam tylko wtedy, gdy GPS szuka objazdu.",
    "near": "londyn",
    "offsetKm": 8,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Peckham"
  },
  {
    "id": "uk-putney",
    "name": "Putney",
    "country": "UK",
    "soundsLike": "putnej, jak później",
    "joke": "Putney? Później odpoczniesz, teraz droga do domu!",
    "near": "londyn",
    "offsetKm": 15,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Putney"
  },
  {
    "id": "uk-tooting",
    "name": "Tooting",
    "country": "UK",
    "soundsLike": "tuting, jak tu-tu",
    "joke": "Tooting? Tu-tu! Klakson też nie może się doczekać.",
    "near": "londyn",
    "offsetKm": 22,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Tooting"
  },
  {
    "id": "uk-barking",
    "name": "Barking",
    "country": "UK",
    "soundsLike": "barking, jak barki",
    "joke": "Barking? Barki bolą od pakowania słoików.",
    "near": "londyn",
    "offsetKm": 30,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Barking%2C_London"
  },
  {
    "id": "uk-sandwich",
    "name": "Sandwich",
    "country": "UK",
    "soundsLike": "sandwicz",
    "joke": "Sandwich? Kanapka na drogę to znakomity plan.",
    "near": "dover",
    "offsetKm": -13,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Sandwich%2C_Kent"
  },
  {
    "id": "uk-deal",
    "name": "Deal",
    "country": "UK",
    "soundsLike": "dil, jak dalej",
    "joke": "Deal? Dalej, jeszcze tylko prom i już kontynent!",
    "near": "dover",
    "offsetKm": -8,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Deal%2C_Kent"
  },
  {
    "id": "uk-sturry",
    "name": "Sturry",
    "country": "UK",
    "soundsLike": "stary",
    "joke": "Sturry? Stary bagażnik trzyma się dzielnie.",
    "near": "dover",
    "offsetKm": -25,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Sturry"
  },
  {
    "id": "uk-folkestone",
    "name": "Folkestone",
    "country": "UK",
    "soundsLike": "folkston, jak folk",
    "joke": "Folkestone? Folk gra tylko w radiu, a bagaże stukają w rytm.",
    "near": "dover",
    "offsetKm": -17,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Folkestone"
  },
  {
    "id": "fr-bagnolet",
    "name": "Bagnolet",
    "country": "FR",
    "soundsLike": "baniole, jak bagno",
    "joke": "Bagnolet? Bagno jest tylko wtedy, gdy zjazd po deszczu.",
    "near": "paryz",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Bagnolet"
  },
  {
    "id": "fr-pantin",
    "name": "Pantin",
    "country": "FR",
    "soundsLike": "pąte, jak pan ten",
    "joke": "Pantin? Pan ten to nie kierowca, tylko nazwa na drogowskazie.",
    "near": "paryz",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Pantin"
  },
  {
    "id": "fr-creteil",
    "name": "Créteil",
    "country": "FR",
    "soundsLike": "kretej, jak kret",
    "joke": "Créteil? Kret tunel wykopałby szybciej niż my ominiemy korek.",
    "near": "paryz",
    "offsetKm": 23,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Cr%C3%A9teil"
  },
  {
    "id": "fr-meudon",
    "name": "Meudon",
    "country": "FR",
    "soundsLike": "mödon, jak miód",
    "joke": "Meudon? Miód w słoiku czeka już w kuchni.",
    "near": "paryz",
    "offsetKm": 31,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Meudon"
  },
  {
    "id": "fr-taissy",
    "name": "Taissy",
    "country": "FR",
    "soundsLike": "tesi, jak tacy",
    "joke": "Taissy? Obiad na tacy dopiero po dotarciu do domu.",
    "near": "reims",
    "offsetKm": 12,
    "sign": "town",
    "source": "https://fr.wikipedia.org/wiki/Taissy"
  },
  {
    "id": "fr-woippy",
    "name": "Woippy",
    "country": "FR",
    "soundsLike": "łapi, jak łapię",
    "joke": "Woippy? Łapię kilometry, nie kolejne objazdy.",
    "near": "metz",
    "offsetKm": 10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Woippy"
  },
  {
    "id": "fr-coulogne",
    "name": "Coulogne",
    "country": "FR",
    "soundsLike": "kulon, jak kolonia",
    "joke": "Coulogne? Kolonia? Nie, to krótki postój blisko Calais.",
    "near": "calais",
    "offsetKm": 12,
    "sign": "town",
    "source": "https://www.insee.fr/fr/metadonnees/geographie/commune/62244-coulogne"
  },
  {
    "id": "ch-kloten",
    "name": "Kloten",
    "country": "CH",
    "soundsLike": "kloten, jak kłótnie",
    "joke": "Kloten? Jedyna kłótnia dziś to GPS ze znakami.",
    "near": "zurych",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://de.wikipedia.org/wiki/Kloten"
  },
  {
    "id": "ch-opfikon",
    "name": "Opfikon",
    "country": "CH",
    "soundsLike": "opfikon, jak fikołek",
    "joke": "Opfikon? Fikołek z takim bagażnikiem odpada.",
    "near": "zurych",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://de.wikipedia.org/wiki/Opfikon"
  },
  {
    "id": "ch-wallisellen",
    "name": "Wallisellen",
    "country": "CH",
    "soundsLike": "waliselen, jak walizę",
    "joke": "Wallisellen? Walizę na dachu trzeba jeszcze poprawić.",
    "near": "zurych",
    "offsetKm": 23,
    "sign": "town",
    "source": "https://de.wikipedia.org/wiki/Wallisellen"
  },
  {
    "id": "ch-schaffhausen",
    "name": "Schaffhausen",
    "country": "CH",
    "soundsLike": "szafhauzen, jak szafa",
    "joke": "Schaffhausen? Szafa już się do tego kombi nie zmieści.",
    "near": "wodospad-renski",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Schaffhausen"
  },
  {
    "id": "ch-neuhausen-am-rheinfall",
    "name": "Neuhausen am Rheinfall",
    "country": "CH",
    "soundsLike": "nojhauzen, jak no i hałas",
    "joke": "Neuhausen? No i hałas, bo wodospad zagłusza nawigację.",
    "near": "wodospad-renski",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Neuhausen_am_Rheinfall"
  },
  {
    "id": "no-ski",
    "name": "Ski",
    "country": "NO",
    "soundsLike": "ski",
    "joke": "Ski? Narty zostają dziś w domu, jedziemy po pierogi.",
    "near": "oslo",
    "offsetKm": 8,
    "sign": "town",
    "source": "https://snl.no/Ski_-_tidligere_kommune"
  },
  {
    "id": "no-kolbotn",
    "name": "Kolbotn",
    "country": "NO",
    "soundsLike": "kolbotn, jak kolba",
    "joke": "Kolbotn? Kolba kukurydzy też nie wejdzie do bagażnika.",
    "near": "oslo",
    "offsetKm": 15,
    "sign": "town",
    "source": "https://snl.no/Kolbotn"
  },
  {
    "id": "no-drobak",
    "name": "Drøbak",
    "country": "NO",
    "soundsLike": "dröbak, jak robak",
    "joke": "Drøbak? Robak na szybie ma lepszy widok niż GPS.",
    "near": "oslo",
    "offsetKm": 23,
    "sign": "town",
    "source": "https://snl.no/Dr%C3%B8bak"
  },
  {
    "id": "no-vestby",
    "name": "Vestby",
    "country": "NO",
    "soundsLike": "westby, jak weź by",
    "joke": "Vestby? Weź by jeszcze jeden słoik; miejsce się znajdzie!",
    "near": "oslo",
    "offsetKm": 32,
    "sign": "town",
    "source": "https://snl.no/Vestby"
  },
  {
    "id": "dk-kastrup",
    "name": "Kastrup",
    "country": "DK",
    "soundsLike": "kastrup, jak kasza",
    "joke": "Kastrup? Kasza poczeka, teraz liczymy kilometry.",
    "near": "kopenhaga",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Kastrup"
  },
  {
    "id": "dk-tarnby",
    "name": "Tårnby",
    "country": "DK",
    "soundsLike": "tornby, jak torby",
    "joke": "Tårnby? Torby są już wszystkie na dachu!",
    "near": "kopenhaga",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/T%C3%A5rnby"
  },
  {
    "id": "dk-brondby",
    "name": "Brøndby",
    "country": "DK",
    "soundsLike": "brönby, jak brudny",
    "joke": "Brøndby? Brudne jest tylko kombi po deszczu.",
    "near": "kopenhaga",
    "offsetKm": 23,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Br%C3%B8ndby"
  },
  {
    "id": "dk-tune",
    "name": "Tune",
    "country": "DK",
    "soundsLike": "tune, jak tu nie",
    "joke": "Tune? Tu nie skręcaj, obiad czeka prosto przed nami.",
    "near": "roskilde",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Tune%2C_Denmark"
  },
  {
    "id": "dk-lejre",
    "name": "Lejre",
    "country": "DK",
    "soundsLike": "lajre, jak lej",
    "joke": "Lejre? Rosół nalejemy dopiero w domu.",
    "near": "roskilde",
    "offsetKm": 16,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Lejre"
  },
  {
    "id": "dk-rodby",
    "name": "Rødby",
    "country": "DK",
    "soundsLike": "rödby, jak rób by",
    "joke": "Rødby? Rób postój, bo zaraz wjeżdżamy na prom.",
    "near": "prom-fehmarn",
    "offsetKm": -8,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/R%C3%B8dby"
  },
  {
    "id": "se-molndal",
    "name": "Mölndal",
    "country": "SE",
    "soundsLike": "mölndal, jak młyn",
    "joke": "Mölndal? Młyn w bagażniku już mieli mapę na kawałki.",
    "near": "goteborg",
    "offsetKm": 9,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/M%C3%B6lndal"
  },
  {
    "id": "se-vastra-frolunda",
    "name": "Västra Frölunda",
    "country": "SE",
    "soundsLike": "westra frölunda, jak fruwa",
    "joke": "Västra Frölunda? Fruwa tu tylko nasze dzielne kombi.",
    "near": "goteborg",
    "offsetKm": 16,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/V%C3%A4stra_Fr%C3%B6lunda"
  },
  {
    "id": "se-rydeback",
    "name": "Rydebäck",
    "country": "SE",
    "soundsLike": "rydebek, jak ryba",
    "joke": "Rydebäck? Ryba na kanapkę poleci z nami promem.",
    "near": "helsingborg",
    "offsetKm": 12,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Rydeb%C3%A4ck"
  },
  {
    "id": "se-trelleborg",
    "name": "Trelleborg",
    "country": "SE",
    "soundsLike": "treleborg, jak trele-morele",
    "joke": "Trelleborg? Trele-morele, liczy się teraz droga do domu.",
    "near": "malmo",
    "offsetKm": 23,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Trelleborg"
  },
  {
    "id": "se-skurup",
    "name": "Skurup",
    "country": "SE",
    "soundsLike": "skurup, jak skorupki",
    "joke": "Skurup? Skorupki jajek lepiej schować przed wybojami.",
    "near": "ystad",
    "offsetKm": -23,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Skurup"
  },
  {
    "id": "se-svarte",
    "name": "Svarte",
    "country": "SE",
    "soundsLike": "swarte, jak zwarte",
    "joke": "Svarte? Zwarte szeregi toreb na dachu aż do promu.",
    "near": "ystad",
    "offsetKm": -10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Svarte"
  },
  {
    "id": "pl-rzepin",
    "name": "Rzepin",
    "country": "PL",
    "soundsLike": "rzepa",
    "joke": "Rzepin? Rzepa do rosołu też pojedzie z nami.",
    "near": "stacja-swiecko",
    "offsetKm": 15,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/Rzepin"
  },
  {
    "id": "pl-torzym",
    "name": "Torzym",
    "country": "PL",
    "soundsLike": "to Rzym?",
    "joke": "Torzym? To Rzym? Nie, do Poznania bliżej!",
    "near": "stacja-swiecko",
    "offsetKm": 35,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/Torzym"
  },
  {
    "id": "pl-robakowo",
    "name": "Robakowo",
    "country": "PL",
    "soundsLike": "robak",
    "joke": "Robakowo? Robak na szybie przynajmniej nie pyta, ile jeszcze.",
    "near": "poznan",
    "offsetKm": 10,
    "sign": "town",
    "source": "https://en.wikipedia.org/wiki/Robakowo%2C_Greater_Poland_Voivodeship"
  },
  {
    "id": "pl-kornik",
    "name": "Kórnik",
    "country": "PL",
    "soundsLike": "kurnik",
    "joke": "Kórnik? Kury dziś odpoczywają, kombi wiezie pierogi.",
    "near": "poznan",
    "offsetKm": 18,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/K%C3%B3rnik"
  },
  {
    "id": "pl-zalasewo",
    "name": "Zalasewo",
    "country": "PL",
    "soundsLike": "za lasem",
    "joke": "Zalasewo? Za lasem już prawie obiad!",
    "near": "poznan",
    "offsetKm": 26,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/Zalasewo"
  },
  {
    "id": "pl-wykroty",
    "name": "Wykroty",
    "country": "PL",
    "soundsLike": "wykręty",
    "joke": "Wykroty? Bez wykrętów, nawigacja mówi prosto.",
    "near": "stacja-jedrzychowice",
    "offsetKm": 20,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/Wykroty"
  },
  {
    "id": "pl-ruszow",
    "name": "Ruszów",
    "country": "PL",
    "soundsLike": "rusz!",
    "joke": "Ruszów? Rusz! Drugiego zaproszenia nie potrzebujemy.",
    "near": "stacja-olszyna",
    "offsetKm": 28,
    "sign": "town",
    "source": "https://pl.wikipedia.org/wiki/Rusz%C3%B3w"
  },
  {
    "id": "pl-krzyki",
    "name": "Krzyki",
    "country": "PL",
    "soundsLike": "krzyki",
    "joke": "Krzyki? Spokojnie, jeszcze jedna walizka się zmieści.",
    "near": "wroclaw",
    "offsetKm": 9,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Krzyki"
  },
  {
    "id": "pl-muchobor-wielki",
    "name": "Muchobór Wielki",
    "country": "PL",
    "soundsLike": "muchy w borze",
    "joke": "Muchobór Wielki? Muchy niech zostaną w lesie, my jedziemy.",
    "near": "wroclaw",
    "offsetKm": 16,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Muchob%C3%B3r_Wielki"
  },
  {
    "id": "pl-psie-pole",
    "name": "Psie Pole",
    "country": "PL",
    "soundsLike": "psie pole",
    "joke": "Psie Pole? Pies nawigator już merda ogonem.",
    "near": "wroclaw",
    "offsetKm": 24,
    "sign": "district",
    "source": "https://en.wikipedia.org/wiki/Psie_Pole"
  },
  {
    "id": "pl-wrzeszcz",
    "name": "Wrzeszcz",
    "country": "PL",
    "soundsLike": "wrzeszcz!",
    "joke": "Wrzeszcz? Nie wrzeszcz, słoiki już prawie w domu.",
    "near": "gdansk",
    "offsetKm": 10,
    "sign": "district",
    "source": "https://pl.wikipedia.org/wiki/Wrzeszcz"
  },
  {
    "id": "pl-wlochy",
    "name": "Włochy",
    "country": "PL",
    "soundsLike": "Włochy",
    "joke": "Włochy? Nie zmienialiśmy kraju, to dalej Warszawa!",
    "near": "warszawa",
    "offsetKm": 10,
    "sign": "district",
    "source": "https://pl.wikipedia.org/wiki/W%C5%82ochy_(Warszawa)"
  },
  {
    "id": "pl-ochota",
    "name": "Ochota",
    "country": "PL",
    "soundsLike": "ochota",
    "joke": "Ochota? Na domowy rosół jak najbardziej!",
    "near": "warszawa",
    "offsetKm": 18,
    "sign": "district",
    "source": "https://pl.wikipedia.org/wiki/Ochota_(Warszawa)"
  }
];
