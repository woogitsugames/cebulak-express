# Zlecenie 55 — trasy z siedmiu nowych krajów

**Data opracowania i kontroli źródeł: 30.10.2026.**
**Zakres:** IE, ES, IT, AT, SE, FI, LU (kraje zamieszkania), CZ, EE, LV, LT (kraje tranzytowe).
Dane znajdują się w `src/content/waypoints.ts`, `src/core/route.ts`, a teksty w `src/content/pl.ts`.
Wszystkie odległości są **wartościami modelowymi dla gry**, a nie nawigacją samochodową.
`km` oznacza **sumaryczny kilometr od startu trasy wzorcowej**, również na promie.
Dla punktów pomiędzy zweryfikowanymi węzłami odległość jest interpolacją i/lub
szacunkiem odcinka; nie wykonano pełnego routingu wielopunktowego OSRM dla każdej trasy.

## Wybór korytarzy i wartości referencyjne

| Kraj / start wzorcowy | Przebieg | Stacja w Polsce i km od startu | Podstawa (źródło lub szacunek) |
|---|---|---:|---|
| IE / Dublin | Wicklow → Rosslare → **prom do Cherbourga** → Caen → Rouen → Reims → Metz → Niemcy → Drezno → Zgorzelec | Jędrzychowice, **2193 km** | Połączenie Rosslare–Cherbourg [aktualny operator promowy](https://www.brittany-ferries.co.uk/ferry-routes/ferries-france/rosslare-cherbourg/about); dojazdy i odcinki FR/DE przybliżone |
| ES / Barcelona | Girona → La Jonquera → Perpignan → Narbonne → Montpellier → Lyon → Besançon → Mulhouse → Fryburg → Karlsruhe → Norymberga → Jena → Drezno | Jędrzychowice, **1808 km** | [Barcelona–Drezno, orientacyjna odległość drogowa](https://www.rome2rio.com/s/Barcelona/Dresden); poszczególne odcinki przybliżone |
| IT / Mediolan | Werona → Padwa → Mestre → Udine → Tarvisio → Villach → Graz → Wiedeń → Mikulov → Brno → Ołomuniec → Ostrawa → Cieszyn | Cieszyn, **1185 km** | Wariant przez **Austrię i Czechy**, świadomie bez objazdu przez Niemcy; segmenty szacunkowe |
| AT / Wiedeń | Mikulov → Brno → Ołomuniec → Ostrawa → Cieszyn | Cieszyn, **305 km** | [Wiedeń–Cieszyn, orientacyjna trasa drogowa](https://www.rome2rio.com/s/Vienna/Cieszyn); odchyłki od dokładnych węzłów |
| SE / Sztokholm | Nyköping → Norrköping → Jönköping → Helsingborg → Malmö → Ystad → **prom do Świnoujścia** | Świnoujście, **795 km** | [Sztokholm–Ystad](https://www.rome2rio.com/s/Stockholm/Ystad) i [Ystad–Świnoujście](https://www.directferries.com/ystad_swinoujscie_ferry.htm); przejazd mieszany, odległość promowa ~171 km |
| FI / Helsinki | **prom do Tallinna** → Pärnu → Ryga → Bauska → Poniewież → Kowno → Mariampol → Budzisko | Budzisko, **790 km** | [Helsinki–Tallinn (prom)](https://www.sales.vikingline.com/timetable/helsinki-tallinn/), dalej droga przez Via Baltica; wartości pośrednie szacunkowe |
| LU / Luksemburg | Trewir → Koblencja → Frankfurt nad Menem → Erfurt → Drezno → Zgorzelec | Jędrzychowice, **888 km** | [Luksemburg–Drezno](https://www.rome2rio.com/s/Luxembourg/Dresden); wariant gry przez wskazane węzły może być dłuższy od najszybszej trasy |

### Decyzje i ograniczenia

- **IT:** wybrano drogę przez Tarvisio, Austrię i Czechy do Cieszyna. Korytarz przez Niemcy i Drezno byłby dużym objazdem dla wyjazdu w stronę Górnego Śląska; wariant wybrany jest czytelniejszy, zwłaszcza dla Wiednia, Krakowa i Rzeszowa. Nie oznacza to, że jest najkrótszy do każdego polskiego miasta.
- **AT:** Wiedeń → Brno → Cieszyn. Dla zachodnich celów Polski prowadzenie przez Cieszyn może być dłuższe niż przez Niemcy; gra celowo korzysta z jednego uproszczonego korytarza.
- **SE:** istniejąca już w grze przeprawa Ystad–Świnoujście pozostaje wzorcem. Kod `SE` jest teraz też krajem startowym, a nie wyłącznie tranzytowym.
- **FI:** nie przyjęto fikcyjnego bezpośredniego promu pasażersko-samochodowego Helsinki–Gdańsk. Jest faktyczna przeprawa Helsinki–Tallinn, a następnie przejazd przez Estonię, Łotwę i Litwę. Gra nadal zawiera etap promowy. Trasa lądowa po krajach bałtyckich jest modelowa.
- **IE:** wybrano prom z Rosslare do Francji i korytarz francusko-niemiecki, bez wymagania przejazdu przez Wielką Brytanię. Alternatywne promy i porty są możliwe, lecz nie są osobnymi trasami w tej wersji.
- **LU:** jeden niemiecki korytarz do Jędrzychowic; poszczególne odcinki są przybliżone.

## Punkty odniesienia: km od startu trasy wzorcowej

| Kraj | Punkty i km (nie obejmuje dojazdu do wybranego celu w Polsce) |
|---|---|
| IE | Dublin 0 · Wicklow 65 · Rosslare 155 · prom 455 · Cherbourg 755 · Caen 875 · Rouen 995 · Reims 1195 · Metz 1360 · Saarbrücken 1430 · Mannheim 1560 · Frankfurt 1610 · Erfurt 1870 · Drezno 2085 · granica 2185 · stacja 2193 |
| ES | Barcelona 0 · Girona 105 · La Jonquera 170 · Perpignan 215 · Narbonne 275 · Montpellier 380 · Lyon 650 · Besançon 850 · Mulhouse 965 · Fryburg 1045 · Karlsruhe 1175 · Norymberga 1445 · Jena 1580 · Drezno 1700 · granica 1800 · stacja 1808 |
| IT | Mediolan 0 · Werona 160 · Padwa 235 · Mestre 275 · Udine 410 · Tarvisio 490 · Villach 530 · Graz 700 · Wiedeń 875 · Mikulov 955 · Brno 1015 · Ołomuniec 1075 · Ostrawa 1145 · Czeski Cieszyn 1165 · granica 1175 · stacja 1185 |
| AT | Wiedeń 0 · Mikulov 75 · Brno 135 · Ołomuniec 195 · Ostrawa 265 · Czeski Cieszyn 285 · granica 295 · stacja 305 |
| SE | Sztokholm 0 · Nyköping 100 · Norrköping 160 · Jönköping 320 · Helsingborg 510 · Malmö 570 · Ystad 620 · prom 705 · Świnoujście 785 · stacja 795 |
| FI | Helsinki 0 · port 12 · prom 50 · Tallinn 100 · Pärnu 230 · granica Łotwy 290 · Ryga 400 · Bauska 470 · granica Litwy 505 · Poniewież 565 · Kowno 665 · Mariampol 730 · Budzisko 780 · stacja 790 |
| LU | Luksemburg 0 · Trewir 60 · Koblencja 190 · Frankfurt 315 · Erfurt 570 · Drezno 780 · granica 880 · stacja 888 |

## Alternatywne miasta startowe: dołączenie do trasy

Konstruktor `makeRoute` tworzy nowe `km=0` dla miasta wybranego przez gracza;
następnie łączy je z **jednym** punktem trasy wzorcowej, przeliczając wszystkie
dalsze kilometry bez zmiany kolejności. Dojazdy są oszacowaniami, nie wymuszonym
routingiem po wszystkich ulicach.

| Kraj | Miasto | Punkt dołączenia | km od miasta |
|---|---|---|---:|
| IE | Cork | Rosslare | 220 |
| IE | Limerick | Rosslare | 200 |
| ES | Madryt | Barcelona | 620 |
| ES | Walencja | Barcelona | 350 |
| IT | Rzym | Mestre | 530 |
| IT | Bolonia | Mestre | 160 |
| AT | Linz | Brno | 275 |
| AT | Salzburg | Brno | 420 |
| SE | Göteborg | Helsingborg | 210 |
| SE | Malmö | punkt Malmö | 0 (start na trasie) |
| FI | Tampere | Helsinki | 180 |
| FI | Turku | Helsinki | 170 |
| LU | Esch-sur-Alzette | Trewir | 80 |
| LU | Differdange | Trewir | 95 |

Źródła pomocnicze dojazdów: [hiszpański portal turystyczny — odległości drogowe](https://www.spain.info/en/getting-around/),
[oficjalny portal Vienna–Cieszyn (agregacja)](https://www.rome2rio.com/s/Vienna/Cieszyn),
[stockholmski korytarz do Ystad](https://www.rome2rio.com/s/Stockholm/Ystad).
Liczby mają tolerancję szacunkową i nie powinny być opisywane jako potwierdzony pomiar OSRM.

## Stacje wjazdowe i dalszy odcinek w Polsce

Dodano `stacja-cieszyn` (49.75, 18.65) i `stacja-budzisko`
(54.29, 23.07). Dystans od stacji do 18 większych miast pochodzi z
**przybliżonej tabeli kalibracyjnej** w `src/core/route.ts` (wartości
nie są indywidualnymi wynikami routera drogowego).
Dla pozostałych celów zastosowano `haversine × 1.30` (Cieszyn)
lub `haversine × 1.35` (Budzisko). Stare korytarze Świecko,
Jędrzychowice i Świnoujście pozostają bez zmian.

Nowe punkty tranzytowe w PL: Białystok, Łomża, Olsztyn. Zasady:
do 2 miast tranzytowych, bez powtórzenia mety; odstęp przynajmniej
60 km od stacji, od poprzedniego miasta i do mety. Dla bardzo krótkich
przejazdów lista tranzytu może być pusta.

## Grafiki i menu

Nie dostarczono nowych plików bitmap. `BackgroundRenderer`
stosuje już zaślepki Canvas i palety `PALETTES` dla brakujących warstw
oraz sylwetki zamiast brakujących panoram. Dodano palety dla wszystkich
nowych krajów zamieszkania i tranzytowych. Grafiki mogą zostać
dostarczone później według istniejącego kontraktu nazw
`public/assets/countries/<kod>/<kod>-<warstwa>.png`,
bez przebudowy interfejsu. Test jednostkowy przechodzi po nowych
krajach z pustymi obrazami i sprawdza fallback.

Menu w `src/main.ts` generuje opcje z `HOME_COUNTRIES`, dlatego
nowych siedem krajów pojawia się bez modyfikacji ekranu przez koordynatora.
E2E generuje zrzut menu z wyborem kraju ES/SE.

## Portale — stan publicznej weryfikacji (30.10.2026)

| Kraj | Adres | Status w kodzie |
|---|---|---|
| ES | https://popolsku.es/ | publiczna strona dostępna, `guides` |
| IT | https://popolsku.it/ | publiczna strona dostępna, `guides` |
| SE | https://popolsku.se/ | publiczna strona dostępna, `guides` |
| AT | https://popolsku.at/ | CMS potwierdzony, **publiczne WWW niepotwierdzone**, link wyłączony |
| FI | https://popolsku.fi/ | CMS potwierdzony, **publiczne WWW niepotwierdzone**, link wyłączony |
| LU | https://popolsku.lu/ | CMS potwierdzony, **publiczne WWW niepotwierdzone**, link wyłączony |
| IE | brak adresu przypisanego w `docs/portale.md` | link wyłączony |

Niepowodzenie zewnętrznego pobrania strony nie oznacza, że domena nie istnieje.
Po potwierdzeniu przez właściciela należy wprowadzić adresy `guides` do
`PORTALS`. Dla krajów bez zweryfikowanego URL `portalLink` zwraca `undefined`.
Nie są generowane domyślne linki Facebooka.

## Ryzyka dla koordynatora

1. Długości gry oraz maksymalne odległości zmieniły się dla nowych krajów;
   wersjonowanie konfiguracji tras w rankingu może być istotne po starcie publicznym.
2. Odcinki drogowe są szacunkowe i w przyszłości warto je skonfrontować
   z wielopunktowym OSRM / GraphHopper, w tym dla nowych stacji w PL.
3. Przy użyciu faktycznych promów czas jazdy nie odpowiada długości w km.
   Gra odwzorowuje **dystans**, a nie czas przejazdu.
4. Pliki grafik pozostają zakresem osobnych zleceń 56–57.
5. Użytkownik może wybrać każdy nowy kraj i cel w PL; parametry
   osadzenia `?kraj=xx&z=...` i `?r=xx-miasto` korzystają ze wspólnej listy.
