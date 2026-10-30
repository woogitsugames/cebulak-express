# Zasoby UI — Cebulak Express (zlecenie 04)

**Komplet:** 30 plików PNG + `buttons.json` + `preview.png` + ten dokument. Wszystkie sprite'y są osobnymi, skadrowanymi plikami sRGB z kanałem alpha. Nazwy mają małe litery ASCII i łączniki. Grafika nie zawiera napisów — lokalizacja i typografia należą do gry.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `pickup-parcel.png`, `pickup-jar.png` | ChatGPT GPT Image, Python/Pillow/OpenCV (ręczne kadrowanie, maskowanie, poświata) | własne wygenerowane materiały, użycie w projekcie | Przesyłka biało-czerwona bez logotypów; słoik z czerwoną pokrywką w kratkę. |
| `pickup-sparkle-1.png`–`pickup-sparkle-3.png` | ChatGPT GPT Image, Python/Pillow/OpenCV (wycięcie, normalizacja alpha) | własne wygenerowane materiały, użycie w projekcie | Złoty, błękitny i różowy błysk; 96×96 px. |
| `icon-km.png`, `icon-jar.png`, `icon-trophy.png`, `icon-share.png`, `icon-replay.png`, `icon-settings.png`, `icon-map.png`, `icon-sound-on.png`, `icon-sound-off.png`, `icon-pause.png` | ChatGPT GPT Image, Python/Pillow/OpenCV (ręczne maski, retusz kanału alpha) | własne wygenerowane materiały, użycie w projekcie | Ikony 96×96 px; km = droga, jar = życie; brak tekstu. |
| `btn-green.png`, `btn-blue.png`, `btn-wood.png` | ChatGPT GPT Image, Python/Pillow (wycięcie zaokrąglonych sylwetek, resize @3x) | własne wygenerowane materiały, użycie w projekcie | 630×162 px, bez napisów i wtopionych symboli, pod 9-slice. |
| `panel-paper.png`, `banner-red.png` | ChatGPT GPT Image, Python/Pillow (maskowanie z ręcznie określonym konturem) | własne wygenerowane materiały, użycie w projekcie | Panel 912×507 px i wstęga 912×174 px, 9-slice. |
| `flag-be.png`, `flag-nl.png`, `flag-de.png`, `flag-uk.png`, `flag-fr.png`, `flag-ch.png`, `flag-no.png`, `flag-dk.png`, `flag-se.png`, `flag-pl.png` | Python/Pillow, ręcznie odtworzone wzory pasów i krzyży (inspiracja ilustracyjna: ChatGPT GPT Image) | własne opracowanie popularnych wzorów flag | 96×64 px, bez herbów, godła i gwiazd UE; kolory ujednolicone ręcznie. |
| `preview.png` | Python/Pillow, arkusz podglądu wygenerowany z finalnych PNG | własne | Szachownica, podpisy tylko w arkuszu, na dole test rozciągania 9-slice. |
| `buttons.json` | Ręcznie opracowana konfiguracja 9-slice | własne | Marginesy w **pikselach obrazu źródłowego** (@3x), nie logicznych. |

## Wymiary i implementacja

- Gra: `360×640` px logicznych, pliki w rozdzielczości **@3x**.
- Promień kolizji znajdźki: `PICKUPS.radius = 12` logicznych → średnica kolizji **24 logiczne = 72 px w PNG**. Obrazki źródłowe 96×96 zawierają transparentny margines z poświatą; **nie utożsamiaj boxu obrazu ze strefą kolizji**.
- **9-slice:** `buttons.json` → `sprites[nazwa]` → `left,right,top,bottom,width,height`. Podziel oryginał na 9 pól. Narożniki kopiuj w niezmienionym rozmiarze; poziomo rozciągaj jedynie środkowe fragmenty, pionowo środkowy rząd. Pozycje podane w *source px*, czyli `margin/3` w px logicznych.
- Minimalna szerokość/ wysokość docelowa 9-slice: co najmniej `left+right` i `top+bottom` odpowiednio. Docelowy wymiar wyrażony w pikselach źródłowych przy renderowaniu skali @3x, np. przycisk 270 px logicznych to 810 px obrazka wyjściowego.
- Przy odtwarzaniu: `pickup-sparkle-1..3.png` można wyświetlić sekwencyjnie 60–90 ms na klatkę albo rotować jako pojedyncze efekty; brak wymogu modyfikacji `src/core`.
- Podpisy do przycisków (`GRAJ`, `RANKING`, `Koniec trasy!`) nakładać tekstem Canvas — **nie dodawać napisów do samych PNG**.

## Integracja

Wczytaj grafiki z `/assets/ui/<nazwa>`. Do UI rysuj element przez `CanvasRenderingContext2D.drawImage`; dla 9-slice użyj odpowiednich źródłowych i docelowych prostokątów wyliczonych z `buttons.json`. Nie ma zmian w rdzeniu symulacji. Makiety są tylko kierunkiem stylistycznym; zastosowano neutralne grafiki bez marek i polskiego godła.

## Uwaga dot. praw

Tekstury i ilustracje powstały z wygenerowanego od podstaw atlasu GPT Image; maski, konwersje, poprawki barw i eksport wykonywano ręcznie/programistycznie. Nie wykorzystano zasobów firm trzecich ani chronionych symboli poza prostymi, zwyczajowymi wzorami flag. W razie potrzeby weryfikacji praw autorskich do assetów AI przed komercyjną publikacją koordynator może zamówić retusz ilustratora.


## Dodatek: bonusy (zlecenie 52)

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `pickup-boarding.png` | Autorskie wektory SVG stworzone w ChatGPT, CairoSVG + Pillow, ręczna korekta kolorów | Autorski projekt do gry | 96×96, złoty bilet/znaczek z walizką, bez liter |
| `pickup-tailwind.png` | Jak wyżej | Jak wyżej | 96×96, turkusowy podmuch i strzałka |
| `pickup-mamcall.png` | Jak wyżej | Jak wyżej | 96×96, telefon z sercem, bez znaków operatorów |

Grafiki mają przezroczyste marginesy; kolizja odbywa się na dotychczasowym promieniu `PICKUPS.radius = 12` px logicznych. W renderze obrazy @3x są skalowane do 32×32 px logicznych.
