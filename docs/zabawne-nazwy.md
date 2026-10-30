# Zabawne nazwy przy trasach — zlecenie 70

**Liczba pozycji: 78.** Podział: BE: 9, NL: 9, DE: 11, UK: 8, FR: 7, CH: 5, NO: 4, DK: 6, SE: 6, PL: 13.

To autentyczne nazwy dzielnic, miast, gmin i wsi. „Brzmi jak” to **swobodne skojarzenie polskojęzycznego gracza**, nie słownikowa wymowa i nie etymologia. Żarty dotyczą przejazdu, korków, bagażu oraz jedzenia — nie mieszkańców ani państw.

## Ważne ograniczenie integracyjne

W aktualnym `src/core/route.ts` typ `CountryCode` wspiera wyłącznie `BE, NL, DE, UK, FR, CH, NO, DK, SE, PL`. Kraje `IE, ES, IT, AT, FI, LU, CZ` wymienione w briefie **nie mają obecnie identyfikatorów krajów i waypointów** w tym repo. Nie dodano dla nich sztucznych miejsc ani nie zmodyfikowano plików rdzenia; dopisanie ich wymaga decyzji koordynatora i aktualizacji tras.

Pole `near` jest identyfikatorem waypointu z `ROUTE_WAYPOINTS`, `BERLIN_ALTERNATIVE_EXITS`, `MUNICH_TO_JEDRZYCHOWICE` lub `PL_TRANSIT`. Rysowanie tablic tylko na trasach faktycznie zawierających dany waypoint jest zadaniem integracji. `offsetKm` oznacza szacunkowe przesunięcie względem waypointu **w kilometrażu gry**, nie geodezyjnie wymierzoną odległość do centrum miejscowości ani gwarancję istnienia zjazdu. `sign: town` jest generyczną tablicą miejscowości (także gminy lub wsi); użycie `sign: exit` wymagałoby osobnego potwierdzenia zjazdu, dlatego nie oznaczono nim żadnej z pozycji.

## Zweryfikowane pozycje i źródła

| Nazwa | Kraj | Brzmi jak (skojarzenie) | Żart | near | offsetKm | Tablica | Źródło |
|---|---|---|---|---|---:|---|---|
| Deurne | BE | durne | Deurne? Durne są tylko korki, nie nazwy na tablicach. | `antwerpia` | +9 | `district` | [źródło](https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten) |
| Hoboken | BE | o, bokiem | Hoboken? Bokiem byłoby szybciej, ale nawigacja zna swoje skróty. | `antwerpia` | +15 | `district` | [źródło](https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten) |
| Wilrijk | BE | wilryk | Wilrijk? Wilk może poczekać, słoiki jadą do domu. | `antwerpia` | +22 | `district` | [źródło](https://www.antwerpen.be/nl/overzicht/district-antwerpen-1/nuttige-adressen/districten) |
| Boom | BE | bum | Boom? Bum robi tylko bagażnik na nierównej drodze. | `antwerpia` | +29 | `town` | [źródło](https://en.wikipedia.org/wiki/Boom%2C_Belgium) |
| Bertem | BE | bertem, jak beretem | Bertem? Beretem niczego tu nie przykryjesz, zwłaszcza walizek. | `leuven` | +10 | `town` | [źródło](https://en.wikipedia.org/wiki/Bertem) |
| Kessel-Lo | BE | kesel-lo, jak kisiel | Kessel-Lo? Kisiel zostawmy na deser po dojeździe. | `leuven` | +17 | `district` | [źródło](https://en.wikipedia.org/wiki/Kessel-Lo) |
| Zeebrugge | BE | zebrugę, jak zebra | Zeebrugge? Zebry na pasach też chcą do domu. | `brugia` | +11 | `district` | [źródło](https://en.wikipedia.org/wiki/Zeebrugge) |
| Damme | BE | damę, jak damy | Damme? Damy radę, choć bagażnik ma inne zdanie. | `brugia` | +18 | `town` | [źródło](https://en.wikipedia.org/wiki/Damme) |
| Melle | BE | melę, jak mielę | Melle? Mielę w głowie drogę do domu, nie kilometrówki. | `gandawa` | +12 | `town` | [źródło](https://en.wikipedia.org/wiki/Melle%2C_Belgium) |
| Weesp | NL | wesp, jak wiesz | Weesp? Wiesz, że za granicą czeka już rosół? | `amsterdam` | +10 | `town` | [źródło](https://en.wikipedia.org/wiki/Weesp) |
| Maarssen | NL | marsen, jak marsz | Maarssen? Marsz do przodu, słoiki same się nie dowiozą! | `utrecht` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Maarssen) |
| Bunnik | NL | bunik, jak bunia | Bunnik? Bunia już pewnie miesza rosół na kuchence. | `utrecht` | +16 | `town` | [źródło](https://en.wikipedia.org/wiki/Bunnik) |
| Best | NL | best | Best? Najlepszy postój to ten bez korka. | `eindhoven` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Best%2C_Netherlands) |
| Ede | NL | ede, jak idę | Ede? Idę? Nie, dziś kombi ma pierwszeństwo. | `arnhem` | +11 | `town` | [źródło](https://en.wikipedia.org/wiki/Ede%2C_Netherlands) |
| Oosterbeek | NL | osterbek, jak ostra beka | Oosterbeek? Ostra beka, gdy GPS każe zawrócić. | `arnhem` | +20 | `town` | [źródło](https://en.wikipedia.org/wiki/Oosterbeek) |
| America | NL | amerika | America? Do Ameryki przez Holandię i tak się nie wybieramy! | `venlo` | +18 | `town` | [źródło](https://en.wikipedia.org/wiki/America%2C_Netherlands) |
| Boxtel | NL | bokstel, jak boks | Boxtel? Boks zostawmy bagażom walczącym o miejsce. | `eindhoven` | +17 | `town` | [źródło](https://en.wikipedia.org/wiki/Boxtel) |
| Geldrop | NL | geldrop, jak gdzie drop | Geldrop? Gdzie drop? Paczka od mamy już czeka dalej. | `eindhoven` | +25 | `town` | [źródło](https://en.wikipedia.org/wiki/Geldrop) |
| Porz | DE | porc, jak por | Porz? Por do rosołu już prawie w bagażniku. | `kolonia` | +8 | `district` | [źródło](https://en.wikipedia.org/wiki/Porz) |
| Hürth | DE | hürt, jak hurt | Hürth? Hurtowo można tu liczyć tylko walizki. | `kolonia` | +15 | `town` | [źródło](https://en.wikipedia.org/wiki/H%C3%BCrth) |
| Lünen | DE | lünen, jak lunę | Lünen? Nie lunę, jeśli droga zrobi się wyboista. | `dortmund` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/L%C3%BCnen) |
| Kamen | DE | kamen, jak kamień | Kamen? Jeden kamień mniej pod kołami i lecimy! | `dortmund` | +17 | `town` | [źródło](https://en.wikipedia.org/wiki/Kamen) |
| Bochum | DE | bochum, jak bo czym | Bochum? Bo czym jedziesz? Oczywiście kombi! | `dortmund` | +26 | `town` | [źródło](https://en.wikipedia.org/wiki/Bochum) |
| Laatzen | DE | lacen, jak latam | Laatzen? Latam tylko nisko, żeby zobaczyć zjazd. | `hanower` | +10 | `town` | [źródło](https://en.wikipedia.org/wiki/Laatzen) |
| Peine | DE | pajne, jak fajne | Peine? Fajnie, jeśli przed nami ani jednego korka! | `hanower` | +29 | `town` | [źródło](https://de.wikipedia.org/wiki/Peine) |
| Moabit | DE | moabit, jak ma być | Moabit? Ma być objazd? Nie, dziś jedziemy prosto! | `berlin` | +8 | `district` | [źródło](https://en.wikipedia.org/wiki/Moabit) |
| Pankow | DE | pankow, jak pąków | Pankow? Pączków z lukrem bardziej nam teraz brakuje. | `berlin` | +16 | `district` | [źródło](https://en.wikipedia.org/wiki/Pankow) |
| Wedding | DE | weding, jak we dnie | Wedding? We dnie też można marzyć o obiedzie w domu. | `berlin` | +24 | `district` | [źródło](https://en.wikipedia.org/wiki/Wedding_(Berlin)) |
| Klotzsche | DE | klocze, jak klocki | Klotzsche? Klocki niech leżą w pudełku, nie na jezdni. | `drezno` | +12 | `district` | [źródło](https://en.wikipedia.org/wiki/Klotzsche) |
| Peckham | UK | pekam, jak pech mam | Peckham? Pech mam tylko wtedy, gdy GPS szuka objazdu. | `londyn` | +8 | `district` | [źródło](https://en.wikipedia.org/wiki/Peckham) |
| Putney | UK | putnej, jak później | Putney? Później odpoczniesz, teraz droga do domu! | `londyn` | +15 | `district` | [źródło](https://en.wikipedia.org/wiki/Putney) |
| Tooting | UK | tuting, jak tu-tu | Tooting? Tu-tu! Klakson też nie może się doczekać. | `londyn` | +22 | `district` | [źródło](https://en.wikipedia.org/wiki/Tooting) |
| Barking | UK | barking, jak barki | Barking? Barki bolą od pakowania słoików. | `londyn` | +30 | `district` | [źródło](https://en.wikipedia.org/wiki/Barking%2C_London) |
| Sandwich | UK | sandwicz | Sandwich? Kanapka na drogę to znakomity plan. | `dover` | -13 | `town` | [źródło](https://en.wikipedia.org/wiki/Sandwich%2C_Kent) |
| Deal | UK | dil, jak dalej | Deal? Dalej, jeszcze tylko prom i już kontynent! | `dover` | -8 | `town` | [źródło](https://en.wikipedia.org/wiki/Deal%2C_Kent) |
| Sturry | UK | stary | Sturry? Stary bagażnik trzyma się dzielnie. | `dover` | -25 | `town` | [źródło](https://en.wikipedia.org/wiki/Sturry) |
| Folkestone | UK | folkston, jak folk | Folkestone? Folk gra tylko w radiu, a bagaże stukają w rytm. | `dover` | -17 | `town` | [źródło](https://en.wikipedia.org/wiki/Folkestone) |
| Bagnolet | FR | baniole, jak bagno | Bagnolet? Bagno jest tylko wtedy, gdy zjazd po deszczu. | `paryz` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Bagnolet) |
| Pantin | FR | pąte, jak pan ten | Pantin? Pan ten to nie kierowca, tylko nazwa na drogowskazie. | `paryz` | +16 | `town` | [źródło](https://en.wikipedia.org/wiki/Pantin) |
| Créteil | FR | kretej, jak kret | Créteil? Kret tunel wykopałby szybciej niż my ominiemy korek. | `paryz` | +23 | `town` | [źródło](https://en.wikipedia.org/wiki/Cr%C3%A9teil) |
| Meudon | FR | mödon, jak miód | Meudon? Miód w słoiku czeka już w kuchni. | `paryz` | +31 | `town` | [źródło](https://en.wikipedia.org/wiki/Meudon) |
| Taissy | FR | tesi, jak tacy | Taissy? Obiad na tacy dopiero po dotarciu do domu. | `reims` | +12 | `town` | [źródło](https://fr.wikipedia.org/wiki/Taissy) |
| Woippy | FR | łapi, jak łapię | Woippy? Łapię kilometry, nie kolejne objazdy. | `metz` | +10 | `town` | [źródło](https://en.wikipedia.org/wiki/Woippy) |
| Coulogne | FR | kulon, jak kolonia | Coulogne? Kolonia? Nie, to krótki postój blisko Calais. | `calais` | +12 | `town` | [źródło](https://www.insee.fr/fr/metadonnees/geographie/commune/62244-coulogne) |
| Kloten | CH | kloten, jak kłótnie | Kloten? Jedyna kłótnia dziś to GPS ze znakami. | `zurych` | +9 | `town` | [źródło](https://de.wikipedia.org/wiki/Kloten) |
| Opfikon | CH | opfikon, jak fikołek | Opfikon? Fikołek z takim bagażnikiem odpada. | `zurych` | +16 | `town` | [źródło](https://de.wikipedia.org/wiki/Opfikon) |
| Wallisellen | CH | waliselen, jak walizę | Wallisellen? Walizę na dachu trzeba jeszcze poprawić. | `zurych` | +23 | `town` | [źródło](https://de.wikipedia.org/wiki/Wallisellen) |
| Schaffhausen | CH | szafhauzen, jak szafa | Schaffhausen? Szafa już się do tego kombi nie zmieści. | `wodospad-renski` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Schaffhausen) |
| Neuhausen am Rheinfall | CH | nojhauzen, jak no i hałas | Neuhausen? No i hałas, bo wodospad zagłusza nawigację. | `wodospad-renski` | +16 | `town` | [źródło](https://en.wikipedia.org/wiki/Neuhausen_am_Rheinfall) |
| Ski | NO | ski | Ski? Narty zostają dziś w domu, jedziemy po pierogi. | `oslo` | +8 | `town` | [źródło](https://snl.no/Ski_-_tidligere_kommune) |
| Kolbotn | NO | kolbotn, jak kolba | Kolbotn? Kolba kukurydzy też nie wejdzie do bagażnika. | `oslo` | +15 | `town` | [źródło](https://snl.no/Kolbotn) |
| Drøbak | NO | dröbak, jak robak | Drøbak? Robak na szybie ma lepszy widok niż GPS. | `oslo` | +23 | `town` | [źródło](https://snl.no/Dr%C3%B8bak) |
| Vestby | NO | westby, jak weź by | Vestby? Weź by jeszcze jeden słoik; miejsce się znajdzie! | `oslo` | +32 | `town` | [źródło](https://snl.no/Vestby) |
| Kastrup | DK | kastrup, jak kasza | Kastrup? Kasza poczeka, teraz liczymy kilometry. | `kopenhaga` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Kastrup) |
| Tårnby | DK | tornby, jak torby | Tårnby? Torby są już wszystkie na dachu! | `kopenhaga` | +16 | `town` | [źródło](https://en.wikipedia.org/wiki/T%C3%A5rnby) |
| Brøndby | DK | brönby, jak brudny | Brøndby? Brudne jest tylko kombi po deszczu. | `kopenhaga` | +23 | `town` | [źródło](https://en.wikipedia.org/wiki/Br%C3%B8ndby) |
| Tune | DK | tune, jak tu nie | Tune? Tu nie skręcaj, obiad czeka prosto przed nami. | `roskilde` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/Tune%2C_Denmark) |
| Lejre | DK | lajre, jak lej | Lejre? Rosół nalejemy dopiero w domu. | `roskilde` | +16 | `town` | [źródło](https://en.wikipedia.org/wiki/Lejre) |
| Rødby | DK | rödby, jak rób by | Rødby? Rób postój, bo zaraz wjeżdżamy na prom. | `prom-fehmarn` | -8 | `town` | [źródło](https://en.wikipedia.org/wiki/R%C3%B8dby) |
| Mölndal | SE | mölndal, jak młyn | Mölndal? Młyn w bagażniku już mieli mapę na kawałki. | `goteborg` | +9 | `town` | [źródło](https://en.wikipedia.org/wiki/M%C3%B6lndal) |
| Västra Frölunda | SE | westra frölunda, jak fruwa | Västra Frölunda? Fruwa tu tylko nasze dzielne kombi. | `goteborg` | +16 | `district` | [źródło](https://en.wikipedia.org/wiki/V%C3%A4stra_Fr%C3%B6lunda) |
| Rydebäck | SE | rydebek, jak ryba | Rydebäck? Ryba na kanapkę poleci z nami promem. | `helsingborg` | +12 | `town` | [źródło](https://en.wikipedia.org/wiki/Rydeb%C3%A4ck) |
| Trelleborg | SE | treleborg, jak trele-morele | Trelleborg? Trele-morele, liczy się teraz droga do domu. | `malmo` | +23 | `town` | [źródło](https://en.wikipedia.org/wiki/Trelleborg) |
| Skurup | SE | skurup, jak skorupki | Skurup? Skorupki jajek lepiej schować przed wybojami. | `ystad` | -23 | `town` | [źródło](https://en.wikipedia.org/wiki/Skurup) |
| Svarte | SE | swarte, jak zwarte | Svarte? Zwarte szeregi toreb na dachu aż do promu. | `ystad` | -10 | `town` | [źródło](https://en.wikipedia.org/wiki/Svarte) |
| Rzepin | PL | rzepa | Rzepin? Rzepa do rosołu też pojedzie z nami. | `stacja-swiecko` | +15 | `town` | [źródło](https://pl.wikipedia.org/wiki/Rzepin) |
| Torzym | PL | to Rzym? | Torzym? To Rzym? Nie, do Poznania bliżej! | `stacja-swiecko` | +35 | `town` | [źródło](https://pl.wikipedia.org/wiki/Torzym) |
| Robakowo | PL | robak | Robakowo? Robak na szybie przynajmniej nie pyta, ile jeszcze. | `poznan` | +10 | `town` | [źródło](https://en.wikipedia.org/wiki/Robakowo%2C_Greater_Poland_Voivodeship) |
| Kórnik | PL | kurnik | Kórnik? Kury dziś odpoczywają, kombi wiezie pierogi. | `poznan` | +18 | `town` | [źródło](https://pl.wikipedia.org/wiki/K%C3%B3rnik) |
| Zalasewo | PL | za lasem | Zalasewo? Za lasem już prawie obiad! | `poznan` | +26 | `town` | [źródło](https://pl.wikipedia.org/wiki/Zalasewo) |
| Wykroty | PL | wykręty | Wykroty? Bez wykrętów, nawigacja mówi prosto. | `stacja-jedrzychowice` | +20 | `town` | [źródło](https://pl.wikipedia.org/wiki/Wykroty) |
| Ruszów | PL | rusz! | Ruszów? Rusz! Drugiego zaproszenia nie potrzebujemy. | `stacja-olszyna` | +28 | `town` | [źródło](https://pl.wikipedia.org/wiki/Rusz%C3%B3w) |
| Krzyki | PL | krzyki | Krzyki? Spokojnie, jeszcze jedna walizka się zmieści. | `wroclaw` | +9 | `district` | [źródło](https://en.wikipedia.org/wiki/Krzyki) |
| Muchobór Wielki | PL | muchy w borze | Muchobór Wielki? Muchy niech zostaną w lesie, my jedziemy. | `wroclaw` | +16 | `district` | [źródło](https://en.wikipedia.org/wiki/Muchob%C3%B3r_Wielki) |
| Psie Pole | PL | psie pole | Psie Pole? Pies nawigator już merda ogonem. | `wroclaw` | +24 | `district` | [źródło](https://en.wikipedia.org/wiki/Psie_Pole) |
| Wrzeszcz | PL | wrzeszcz! | Wrzeszcz? Nie wrzeszcz, słoiki już prawie w domu. | `gdansk` | +10 | `district` | [źródło](https://pl.wikipedia.org/wiki/Wrzeszcz) |
| Włochy | PL | Włochy | Włochy? Nie zmienialiśmy kraju, to dalej Warszawa! | `warszawa` | +10 | `district` | [źródło](https://pl.wikipedia.org/wiki/W%C5%82ochy_(Warszawa)) |
| Ochota | PL | ochota | Ochota? Na domowy rosół jak najbardziej! | `warszawa` | +18 | `district` | [źródło](https://pl.wikipedia.org/wiki/Ochota_(Warszawa)) |

## Wskazówki dla koordynatora

1. Importuj `FUNNY_PLACES` z `src/content/funny-places.ts`; wyświetlaj elementy tylko gdy `route.waypoints` zawiera punkt `near` i gdy kraj miejscowości odpowiada aktualnemu odcinkowi.
2. Pozycja znaku w kilometrażu trasy to `waypoint.km + offsetKm`. Nie wyświetlaj tablicy na kilometrze ujemnym ani poza granicami trasy; odległości są orientacyjne i mogą wymagać kosmetycznych korekt względem panoram.
3. Nie zmieniono renderera ani `src/core/` — integracja należy do koordynatora.
4. Zanim pojawią się pozostałe kraje, należy rozszerzyć `CountryCode`, trasy i waypointy, a dopiero potem uzupełnić tablicę nowymi lokalizacjami.
