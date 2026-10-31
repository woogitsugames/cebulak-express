# Runda 8

Panoramy A+ wszystkich 43 polskich miast docelowych, które nie mają jeszcze pliku. Do tego własne grafiki dla 16 przejść granicznych, stacji i portów, które dziś korzystają ze wspólnej `granica-stacja.png` albo z zastępczego rysunku. Do tego materiały na start: Google Play zimą, ramki zrzutów, okładki rolek, zimowa karta wyniku i OG.
Każdy plik to jedna sesja GPT i jest samowystarczalny: zadanie, zasady treści rundy 8 i pełne zasady wspólne. W tej rundzie GPT **od razu oddaje ZIP** (`zlecenie-NN.zip`) ze ścieżkami repo, arkuszem podglądu `docs/art/podglady/…` i plikiem `ASSETS-NN.md`. Nie robi gałęzi ani PR. Kolejność wg ważności: od góry. Limit to ok. 2 sesje na konto.

ZIP do wysłania (same pliki .md, płasko): `runda8-zlecenia.zip`.

## Paczki
**Panoramy A+ miast docelowych (105–113).** Plik `public/assets/landmarks/<id>.png`, 1620×900 RGBA. Kolejność: większe miasta i silna emigracja najpierw.
- `105-panoramy-lublin-rzeszow.md` — Lublin, Rzeszów, Kielce, Opole, Zielona Góra
- `106-panoramy-siemiatycze-zakopane.md` — Siemiatycze, Zakopane, Nowy Targ, Zamość, Przemyśl
- `107-panoramy-walbrzych-kedzierzyn-kozle.md` — Wałbrzych, Kędzierzyn-Koźle, Racibórz, Ełk, Biała Podlaska
- `108-panoramy-stalowa-wola-mielec.md` — Stalowa Wola, Mielec, Ostrowiec Świętokrzyski, Skarżysko-Kamienna, Sanok
- `109-panoramy-jaslo-chojnice.md` — Jasło, Chojnice, Kartuzy, Bytów, Kętrzyn
- `110-panoramy-bielsk-podlaski-hajnowka.md` — Bielsk Podlaski, Hajnówka, Mońki, Sokółka, Grajewo
- `111-panoramy-strzelce-opolskie-krapkowice.md` — Strzelce Opolskie, Krapkowice, Prudnik, Głogówek, Olesno
- `112-panoramy-zambrow-wysokie-mazowieckie.md` — Zambrów, Wysokie Mazowieckie, Kolno, Bartoszyce, Tomaszów Lubelski
- `113-panoramy-olecko-goldap.md` — Olecko, Gołdap, Lubaczów

**Przejścia, stacje i porty (114–117).** Waypointy bez własnego pliku, sprawdzone skryptem w `src/content/waypoints.ts`: 16 sztuk, zgadza się z listą.
- `114-granice-tranzyt.md` — Mikulov, Tarvisio, La Jonquera, granica EE–LV, granica LV–LT (border, bliski plan). Pierwsze, bo dziś pokazują polską stację w Hiszpanii czy na Łotwie.
- `115-porty-uckermark.md` — Rosslare, port w Helsinkach (crossing), Uckermark (landmark). Daleki plan, format panoramy A+. Bez pliku gra rysuje tu zastępczy wektor.
- `116-granice-kolbaskowo-olszyna.md` — granica i stacja Kołbaskowo, granica i stacja Olszyna
- `117-granice-cieszyn-budzisko.md` — granica i stacja Cieszyn, granica i stacja Budzisko

**Materiały na start (118–121).**
- `118-play-zima-ikona.md` — Google Play: zimowa grafika wyróżniająca 1024×500 (tło i tekst osobno) + ikona sprawdzona w 4 maskach × 3 rozmiarach
- `119-sklep-ramki-zrzutow.md` — Sklep: 8 zimowych teł z przezroczystym oknem na prawdziwy zrzut, podpisy PL jako warstwy, skrypt składania
- `120-rolki-okladki.md` — Rolki: 6 zimowych okładek 9:16, warstwy tekstu bez daty, plansza końcowa
- `121-karta-og-zima.md` — Zimowe tła karty wyniku (1080×1920, 1080×1080) z układem 1:1 jak w grze, zimowy OG; jeśli starczy limitu, brakujące OG 7 krajów (IE, ES, IT, AT, SE, FI, LU)

### Dlaczego takie materiały na start (118–121)
Sprawdzone 31.10: `public/assets/brand/` ma letnie wersje: play-feature, ikony, karta wyniku, OG ogólny i 8 krajów. `public/assets/store/` ma tylko README/ASSETS, bez obrazów. Nie ma **nic zimowego**, a start (10–15.12) wypada w sezonie 1–26.12.
- **118:** grafika wyróżniająca jest obowiązkowa w Play, a zimą letnia odstaje od gry. Kontrola ikony w maskach to tani krok (Python, bez generowania), który zapobiega przyciętemu kombi na części telefonów. Zimowej ikony celowo **nie** robimy, bo sezonowa zmiana ikony myli graczy.
- **119:** `docs/sklep/zrzuty.md` zabrania fałszowania rozgrywki. Dlatego GPT robi tylko tło, okno i podpisy, a zrzuty wstawia koordynator (`npm run store:shots`). Podpis 2 zmieniony na „Z 15 KRAJÓW DO POLSKI”, bo gra ma 15 krajów zamieszkania. Podpisy 6–8 dotyczą panoram, albumu i karty wyniku, czyli funkcji, które działają. Liga wymaga wdrożonego Firebase, więc nie ma jej w podpisach. Pliki są w `docs/sklep/ramki/`, bo `public/assets/store/` trafiłoby do APK (`isRuntimeAsset` go nie wyklucza).
- **120:** rolki od 1.12 to główny kanał zapowiedzi (`docs/marketing/rolki.md`, R01–R06). Daty startu nie ma w grafice: jest pusta tabliczka na datę i znacznik „WIZUALIZACJA / PRZED PREMIERĄ”, którego wymaga `rolki.md`. Pliki są w `docs/marketing/rolki-grafiki/`, poza `public/`.
- **121:** karta wyniku jest pętlą wiralową, a w grudniu będzie udostępniana najczęściej. Zimowe tło trzeba podpiąć w kodzie: `src/share/card.ts` wczytuje stałą ścieżkę `card-bg-1080x<h>.png`. Proponowana zmiana: dla `seasonAt(new Date()) === 'winter'` spróbować najpierw `card-bg-zima-1080x<h>.png`, a gdy go nie ma, wziąć letnią. OG per kraj **nie są dziś podpięte** (`scripts/build-site.mjs` używa tylko `og-1200x630.png`), dlatego brakujące kraje są w 121 opcjonalne (punkt C).

## Jak podpiąć panoramy miast docelowych (propozycja dla koordynatora, NIE zaimplementowana)
**Stan w kodzie:**
- Ostatni punkt trasy powstaje w `src/core/route.ts` (ok. linii 408–418) jako `{ ...HOME_WAYPOINT, id: 'dom-<id miasta>', kind: 'city' }`.
- `landmarkPaths()` w `src/render/assets.ts` (linie 73–91) zwraca dla każdego `dom-…` wyłącznie `dom-meta(-zima).png`, czyli dom z ogrodem i mamą w oknie.
- Panorama miasta docelowego **nigdy się nie pokazuje**, także dla 14 miast, które już mają plik (warszawa, gdansk, lomza…). Wyjątek: miasto pojawia się jako tranzyt, ale `route.ts` pomija tranzyt równy celowi (`if (id === to.id) continue`).
- Album (`tests/progress.test.ts`: `cityIds` nie zawiera `dom-…`) nie daje pocztówki miasta docelowego.

**Propozycja A (zalecana, tylko render, bez zmian w `src/core`):** na mecie pokazujemy dwie warstwy: miasto w tle i dom na pierwszym planie.
1. `landmarkPaths(point, season)`: dla `dom-<id>` na warstwie **far** zwracać `['assets/landmarks/<id>.png', …dotychczasowe dom-meta jako fallback]`. Najprościej dodać trzeci argument `layer: 'far' | 'near'` albo osobną funkcję `homePaths(cityId, layer, season)`.
2. `Background.drawWaypoint` (`src/render/background.ts`, ok. linii 517–545): gdy `point.id.startsWith('dom-')`, rysować na **far** panoramę miasta (480×267, `FAR_BASE_Y`). Na **near** rysować `dom-meta(-zima).png` w rozmiarze bliskiego planu, czyli dom stoi przy drodze przed panoramą miasta. Dziś `onNear` zależy tylko od `kind`, więc trzeba dopisać wyjątek dla `dom-`. Fallback: brak pliku miasta → zostaje obecne zachowanie (dom-meta na far).
3. `selectNearestWaypoint` liczy paralaksę z `kind`. Dla mety wystarczy paralaksa far, bo meta jest ostatnia i nie ma z kim konkurować.
4. Testy: rozszerzyć `tests/assets.test.ts` (linie 39–41 i 102–104) o ścieżkę `<id>.png` dla `dom-<id>` i fallback. Sprawdzić e2e kadrem mety (np. `?sezon=zima`) dla miasta z plikiem i bez pliku.
5. Opcjonalnie album: dopisać pocztówkę miasta docelowego po dojechaniu (`npm run art:postcards` generuje pocztówki z panoram, wystarczy uwzględnić 57 miast `PL_CITIES`).

**Propozycja B (odradzana):** dodać w `buildRoute` osobny waypoint `city` z `id = to.id` na ok. 30–40 km przed metą. To zmienia `src/core`, czyli listę punktów współdzieloną z weryfikacją rankingu na serwerze (`RULES_VERSION`). Pojawiają się też nowe zdarzenia `waypoint` i reguła odstępów ≥ 60 km dla krótkich tras (np. Kołbaskowo → Szczecin 25 km).

## Uwaga techniczna do 114–117 (do sprawdzenia przez koordynatora)
- `drawWaypoint` rysuje punkty `border`/`rest` jako 180×100 px logicznych z dolną krawędzią na `WORLD.groundY` (580), czyli od y = 480 do 580.
- Warstwa `road` rysuje się po nich od `LAYER_Y.road` = 530. W PL i DE górne 150 wierszy `*-road.png` jest **nieprzezroczyste** (pobocze/bariera), sprawdzone Pillow. W CZ są przezroczyste.
- Wniosek: w PL/DE **dolna połowa grafik przejść i stacji jest zasłonięta**, widać głównie dach wiaty. Zlecenia każą trzymać najważniejsze obiekty w środkowym pasie, ale warto sprawdzić w kadrze. Jeśli się potwierdzi, rozważyć `baseY = LAYER_Y.road` dla `onNear`.
- Polską stację za granicą latem często ukrywa `pl-border-near.png`: warunek `borderAlpha >= 0.75`, ok. linii 530. Dlatego 116–117 są niżej w kolejności niż 114–115.

## Wgrywanie (jak w rundzie 7)
1. Rozpakuj ZIP do osobnego katalogu tymczasowego.
2. Sprawdź wymiary (1620×900 RGBA dla `landmarks`; dokładne formaty w 118–121), gruby kontur A+ (płaskie bez konturu → odrzucić i ponowić), brak napisów, marek, flag i herbów. Sprawdź, czy id istnieje w `src/core/route.ts` / `src/content/waypoints.ts`.
3. Skwantyzuj PNG z `landmarks` (`tools/art/quantize-assets.py`, 256 kolorów) i dopisz `ASSETS-NN.md` na koniec `public/assets/landmarks/ASSETS.md`.
4. Panoramy miast docelowych zadziałają w grze dopiero po propozycji A (wyżej). `npm run art:postcards`, testy, PR.

## Stan (31.10.2026, wieczór)
**Runda 8 zamknięta:** wszystkie 17 ZIP-ów wróciło i jest wgranych. Panoramy i punkty skwantyzowano (Pillow FASTOCTREE + oxipng, 62 → 8,8 MB). Propozycja A (meta z panoramą miasta) jest w kodzie od #113.
Przy okazji naprawione: grafiki przejść/stacji były do połowy zasłonięte drogą w krajach z barierą w warstwie road (`nearLandmarkBaseY`); latem w PL zamiast wspólnego pasa `pl-border-near` widać własne stacje A+ (decyzja właściciela 31.10).

| Zlecenie | Wysłane? | Wróciło? | Wgrane |
|---|---|---|---|
| 105 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 106 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 107 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 108 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 109 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 110 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 111 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 112 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 113 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 114 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` (do poprawki: tablica LV–LT ucięta prawą krawędzią) |
| 115 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 116 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 117 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 118 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 119 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 120 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
| 121 | tak | tak (31.10) | tak — PR z gałęzi `claude/compassionate-mayer-uzqz9l` |
