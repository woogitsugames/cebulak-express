# Weryfikacja kilometrów tras i miast tranzytowych — zlecenie 40

**Data sprawdzenia:** 30.10.2026  
**Dotyczy:** `src/content/waypoints.ts`, `src/core/route.ts`, `tests/trasy-verification.test.ts`.

## Zakres i metoda

Przegląd dotyczy **ośmiu tras wzorcowych** BE, NL, DE, UK, FR, CH, NO i DK. Dystans `km` to kilometr od początku **konkretnej trasy wzorcowej**, a nie niezależna odległość lotnicza do punktu. Weryfikowano drogowe dystanse do miast i długości przepraw; korekt dokonano, gdy różnica przekraczała 5% lub 15 km, a także gdy wymagała tego spójność punktów po zmianie przeprawy. Źródła: odległości wyznaczane na danych OSM/OSRM przez [routefare.eu](https://routefare.eu/en/amsterdam/) i [waysur](https://waysur.com/dk/kobenhavn/roskilde), trasy ADAC Maps, Rome2Rio, [conadrogach.pl](https://conadrogach.pl/wyznaczanie-trasy/) oraz serwisy promowe. Wartości są zaokrąglone do pełnych kilometrów.

**Ważne ograniczenie:** OSRM/ADAC podają najszybszy przejazd między *dwoma* miastami. Gra czasem celowo przejeżdża przez wszystkie wskazane miasta (np. przez Ruhrę), więc suma po punktach może być dłuższa niż najkrótsze połączenie między startem i metą. W odcinkach BE/DE/DK, gdzie punkty zgodne są z założoną trasą, pozostawiono dotychczasowy pomiar. Nie wykonano odrębnego pełnego zapytania OSRM z wymuszonym przejazdem przez **każdy** punkt — to pozostaje do weryfikacji w kolejnej iteracji.

## Zmiany w trasach wzorcowych

Skróty źródeł: **R** — [Rome2Rio](https://www.rome2rio.com/), **O** — [routefare/OSM-OSRM](https://routefare.eu/en/amsterdam/), **A** — [ADAC Maps](https://maps.adac.de/), **P** — źródło przeprawowe. Symbol `≈` oznacza punkt interpolowany na korytarzu, nie wynik osobnego zapytania drogowego.

| Trasa | Punkt | Było (km) | Jest (km) | Podstawa |
|---|---|---:|---:|---|
| BE | Leuven | 28 | 30 | R, Bruksela–Leuven 29,5 km |
| NL | Utrecht | 40 | 45 | O, Amsterdam–Utrecht 45 km |
| NL | Oberhausen (Ruhra) | 175 | 191 | O, Amsterdam–Oberhausen 191 km |
| UK | Calais | 170 | 185 | P, Dover–Calais ≈42 km; w scenariuszu od punktu promowego 40 km |
| UK | Dunkierka | 215 | 230 | przesunięcie o +15 km po zmianie przeprawy |
| UK | Brugia | 290 | 305 | jak wyżej |
| UK | Gandawa | 340 | 355 | jak wyżej |
| UK | Antwerpia | 400 | 415 | jak wyżej |
| UK | Eindhoven | 490 | 505 | jak wyżej |
| UK | Venlo | 545 | 560 | jak wyżej |
| UK | Zagłębie Ruhry | 630 | 645 | jak wyżej |
| UK | Dortmund | 680 | 695 | jak wyżej |
| UK | Bielefeld | 760 | 775 | jak wyżej |
| UK | Hanower | 875 | 890 | jak wyżej |
| UK | Magdeburg | 1020 | 1035 | jak wyżej |
| UK | Berlin | 1160 | 1175 | jak wyżej |
| UK | Frankfurt nad Odrą | 1265 | 1280 | jak wyżej |
| UK | granica Świecko | 1275 | 1290 | jak wyżej |
| UK | stacja Świecko | 1283 | 1298 | jak wyżej |
| FR | Frankfurt nad Menem | 615 | 585 | O, Paryż–Frankfurt 573 km + przejazd przez Mannheim |
| FR | Erfurt | 870 | 845 | O, Paryż–Erfurt 824 km + objazd przez poprzednie punkty |
| FR | Drezno | 1090 | 1065 | O, Paryż–Drezno 1027 km + objazd przez poprzednie punkty |
| FR | granica Jędrzychowice | 1190 | 1165 | +100 km od Drezna bez zmian |
| FR | stacja Jędrzychowice | 1198 | 1173 | +108 km od Drezna bez zmian |
| CH | Jena | 640 | 600 | O, Zurych–Jena 589 km + objazd |
| CH | Drezno | 815 | 740 | O, Zurych–Drezno 732 km + objazd |
| CH | granica Jędrzychowice | 915 | 840 | +100 km od Drezna bez zmian |
| CH | stacja Jędrzychowice | 923 | 848 | +108 km od Drezna bez zmian |
| NO | Ystad | 630 | 615 | R, Oslo–Ystad 612,6 km |
| NO | środek przeprawy bałtyckiej | 705 | 700 | P, Ystad–Świnoujście ok. 171,2 km, po korekcie Ystad |
| DK | Roskilde | 30 | 33 | waysur/OSRM 33 km; R: 32,2 km |

**DE — bez korekt:** Kolonia–Düsseldorf 40 km (O: 40), Kolonia–Dortmund 115 km **przez** Düsseldorf i Zagłębie Ruhry (bez tego objazdu A: 94 km). Wspólny schemat Dortmund → Bielefeld → Hanower → Magdeburg → Berlin odpowiada kolejności A2; różnica od najkrótszej trasy bez objazdów jest świadoma.  
**BE — pozostałe punkty bez korekt:** kolejność Leuven → Liège → Aachen → Kolonia → Ruhra → Berlin jest spójna z korytarzem, ale odcinek przez Ruhrę wydłuża trasę względem najszybszego przejazdu Bruksela–Warszawa.  
**DK — pozostałe punkty bez korekt:** Kopenhaga → Roskilde → przeprawa Rødby–Puttgarden → Lubeka → Hamburg → Berlin. Nie należy porównywać tego 1:1 z dystansem wyłącznie lądowym przez duńskie mosty.

Źródła odcinków wzorcowych (odczyt 30.10.2026):
- BE: https://www.rome2rio.com/s/Brussels/Leuven
- NL: https://routefare.eu/en/amsterdam/
- DE: https://routefare.eu/en/koeln/ oraz https://maps.adac.de/routenplaner/route-von-koeln-nach-warschau
- UK: https://autotrasa.pl/trasy/warszawa-londyn/ (prom 42 km); https://www.rac.co.uk/drive/travel/driving-in-europe/driving-from-london-to-paris/
- FR: https://routefare.eu/en/paris/
- CH: https://routefare.eu/en/zuerich/
- NO: https://www.rome2rio.com/s/Norway/Ystad i https://www.directferries.com/ystad_swinoujscie_ferry.htm
- DK: https://waysur.com/dk/kobenhavn/roskilde oraz https://www.scandlines.com.pl/promy-puttgarden-rodby-adresy.html

## Odcinek w Polsce — zamiast `haversine × 1,2`

Zastąpiono jednolity mnożnik tabelą kalibracyjną dla **trzech stacji wjazdowych**, z dystansami do 17 najważniejszych polskich miast. Tabela dotyczy drogi **od stacji za granicą**, a nie od centrum miejscowości granicznej. Przypisano ją na podstawie najbliższych drogowych tras w publicznych planerach; różnice kilku km uwzględniają położenie stacji i zaokrąglenie. Kalibracja do konkretnego odcinka, a nie jeden mnożnik, jest istotna np. dla wybrzeża i A4.

| Granica i relacja | Dystans z publicznego planera | Wpis w tabeli od stacji | Źródło |
|---|---:|---:|---|
| Świecko/Słubice → Warszawa | 476 km | 465 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/slubice-warszawa/) |
| Świecko/Słubice → Kraków | 557 km | 550 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/slubice-krakow/) |
| Świecko/Słubice → Rzeszów | 721 km (wariant S3/A4) | 715 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/slubice-rzeszow/) |
| Świecko/Słubice → Gdańsk | 492 km (S3/S6, Szczecin i Słupsk) | 485 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/slubice-gdansk/) |
| Świecko/Słubice → Białystok | 659 km | 655 km | [flagma](https://flagma.pl/odleglosc-slubice-bialystok/) |
| Jędrzychowice/Zgorzelec → Kraków | 419 km | 415 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/zgorzelec-krakow/) |
| Jędrzychowice/Zgorzelec → Rzeszów | 583 km | 580 km | [Rome2Rio](https://www.rome2rio.com/pl/s/Zgorzelec/Rzesz%C3%B3w) |
| Świnoujście → Gdańsk | 348 km (S6) | 340 km | [conadrogach](https://conadrogach.pl/wyznaczanie-trasy/swinoujscie-gdansk/) |

**Pozostałe komórki tabeli są kalibracją przybliżoną**, nie wszystkie mają osobne, zweryfikowane zapytanie na trasę. Dla pozostałych mniejszych miast zachowano deterministyczny fallback: odległość geodezyjna × **1,31** (Świecko), **1,28** (Jędrzychowice) lub **1,34** (Świnoujście). Nie jest to pełny silnik trasowy; najmniejsze miejscowości, zakątki górskie i objazdy należy później sprawdzić osobno.

## Logika miast po drodze

Zamiast filtrowania miast leżących blisko prostej stacja–cel, `makeRoute` używa tras z predefiniowanych korytarzy. W każdym przypadku maksymalnie **2 miasta** i co najmniej **60 km** między punktami tranzytowymi, od stacji i do mety.

| Wjazd | Kierunek | Możliwe punkty (wybierane, o ile są przed celem) |
|---|---|---|
| Świecko | A2 — Warszawa, Lublin i Podlasie | Poznań → Warszawa |
| Świecko | A2 — Łódź i centrum | Poznań → Łódź |
| Świecko | S3/S6 — Pomorze | Szczecin → Słupsk |
| Świecko | S3/A4 — Śląsk, Kraków, Rzeszów | Wrocław → Katowice lub Kraków |
| Jędrzychowice | A4 — południe i wschód | Wrocław → Katowice lub Kraków |
| Jędrzychowice | S8/A1 — centrum | Wrocław → Łódź |
| Jędrzychowice | północ | Poznań → Bydgoszcz |
| Świnoujście | S6 — wybrzeże | Słupsk → Gdańsk |
| Świnoujście | S3 — wnętrze Polski | Szczecin → Poznań lub Wrocław |

Dodano z motywami 5 miast: **Kraków, Katowice, Gdańsk, Słupsk, Bydgoszcz**. Dane punktów są w `PL_TRANSIT` w `waypoints.ts`. Cel nie jest duplikowany jako punkt tranzytowy.

## Dziesięć przypadków referencyjnych

Wartości wejściowe w `tests/trasy-verification.test.ts` są stałymi z publicznych planerów (ostatnia kolumna pokazuje przybliżoną różnicę). Jest to **stały zestaw reprezentatywny**, a nie wynik losowania w czasie testu, co zapewnia powtarzalność. Porównania dotyczą przebiegu gry, w tym możliwego objazdu przez punkty wzorcowe.

| Para | Referencja (km) | Wynik gry (km) | Błąd względem referencji |
|---|---:|---:|---:|
| Bruksela → Warszawa | 1286,5 | 1390 | +8,0% |
| Amsterdam → Warszawa | 1188,9 | 1300 | +9,3% |
| Kolonia → Warszawa | 1113 | 1180 | +6,0% |
| Hamburg → Warszawa | 841,1 | 880 | +4,6% |
| Londyn → Warszawa (z promem) | 1636 | 1760 | +7,6% |
| Paryż → Rzeszów | 1664,1 | 1750 | +5,2% |
| Paryż → Wrocław | 1280,6 | 1330 | +3,9% |
| Zurych → Wrocław | 920,7 | 1000 | +8,6% |
| Oslo → Gdańsk (z promem) | 1131,8 | 1130 | −0,2% |
| Kopenhaga → Warszawa | 1292 | 1210 | −6,3% |

**Interpretacja:** dla Oslo → Gdańska wartość 1131,8 km jest sumą *Oslo–Ystad drogą 612,6 km (Rome2Rio) + Ystad–Świnoujście promem 171,2 km (DirectFerries) + Świnoujście–Gdańsk drogą 348 km (conadrogach)*. Jest to kontrola trasy mieszanej, nie wynik jednego zapytania OSRM. Dla Kopenhagi referencyjne 1292 km Rome2Rio dotyczy przejazdu drogowego; trasa gry używa promu Rødby–Puttgarden, więc porównanie jest orientacyjne i nie służy do kalibracji przeprawy.

Źródła wszystkich dziesięciu wartości znajdują się bezpośrednio przy stałych w pliku testowym.

## Testy i ryzyka

`tests/trasy-verification.test.ts` sprawdza każdą kombinację **8 krajów × wszystkie ich miasta startowe × wszystkie miasta docelowe**: minimalnie 8 km odstępu między kolejnymi punktami (poza granica–stacja), maksymalnie dwa miasta tranzytowe, odstęp 60 km, brak powtórzenia celu i 10 statycznych porównań referencyjnych. Sprawdza także trasę A4 do Rzeszowa, A2 na Podlasie i S6 do Gdańska.

**Wpływ na ranking:** zmiana `totalKm` zmienia długość gry, wynik maksymalny i liczbę kilometrów zaliczanych do rankingu kraju. Nie należy porównywać wyników sprzed i po zmianie bez rozróżnienia wersji tras. Zgodnie z briefem: wprowadzono **przed publicznym startem**, więc nie jest potrzebna migracja historycznego rankingu.

**Pozostałe ograniczenia do dalszego zadania:**
1. Brak wielopunktowych zapytań do routera dla wszystkich kilkudziesięciu miast i przebiegów; obecne dane mają charakter kalibracji, nie mapy nawigacyjnej.
2. Miasta startowe dołączane przez `via` mogą prowadzić odcinkiem wzorcowym niebędącym najkrótszą drogą (np. południe Niemiec w stronę południa Polski).
3. Tabela zawiera przybliżone lokalizacje stacji; aktualny ruch, prom i kolejne skrzyżowania nie są modelowane.
4. Benchmarki z promem porównują warianty tras, a nie wyłącznie pomiary na drogach.

