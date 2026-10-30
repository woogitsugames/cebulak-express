# Polska — punkty trasy, granica i dom (zlecenie 07)

Wszystkie panoramy PNG mają **1620 × 900 px**, kanał alfa oraz profil barw sRGB. Właściciel projektu może wykorzystywać je w grze i publikacjach towarzyszących; nie użyto grafik firm trzecich, logotypów, godła ani tekstów. Każdy obiekt jest ręcznie zaprojektowaną ilustracją SVG utworzoną proceduralnie w ChatGPT i wyrenderowaną przez CairoSVG/Pillow (inspiracja wizualna: wygenerowane arkusze koncepcyjne GPT Image).

| Plik | Motyw (wg `src/content/waypoints.ts`) | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|---|
| `granica-swiecko.png` | Granica Świecko, most, puste pole niebieskiego znaku | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | `id` dokładnie z tras |
| `stacja-swiecko.png` | Stacja, hot dog, kawa, zapiekanka, busy | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stacja generyczna, bez marki |
| `granica-jedrzychowice.png` | Zgorzelec, rzeka, most i szlaban | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | `id` dokładnie z tras |
| `stacja-jedrzychowice.png` | Stacja przy A4 | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stacja generyczna |
| `swinoujscie.png` | Latarnia morska, wiatrak-stawa, port | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Przeprawa morska |
| `stacja-swinoujscie.png` | Stacja przy S3 po przybyciu promu | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stacja generyczna |
| `poznan.png` | Ratusz, koziołki, kamienice rynku | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Sylwetka ratusza |
| `lodz.png` | Fabryka ceglana, kominy, secesyjne kamienice | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Kolorystyka przemysłowa |
| `warszawa.png` | Wieżowiec o historycznej sylwetce, Wisła, most | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stylizowana sylwetka, nie fotorealistyczna |
| `szczecin.png` | Wały Chrobrego, rzeka, portowe dźwigi | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Sylwetka ogólna |
| `wroclaw.png` | Gotycki ratusz, most i krasnal | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stylizowany krasnal |
| `legnica.png` | Rynek z kamienicami i zamek piastowski | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Stylizacja obiektu historycznego |
| `granica-stacja.png` | Stacja na granicy DE–PL | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Specjalny obraz sceny granicznej |
| `dom-meta.png` | Dom rodzinny, mama macha w oknie, nakryty stół | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Ciepłe zakończenie trasy |
| `dom-meta-zima.png` | Dom, śnieg i świąteczne lampki | ChatGPT SVG/CairoSVG/Pillow | Własne dla projektu | Sezon „Na Wigilię!” — bez motywów religijnych |
| `preview.png` | Arkusz panoram na szachownicy + podglądy warstw | ChatGPT/Pillow | Własne dla projektu | Kopia wspólnego arkusza 07 |

**Pokrycie:** 6 miast `PL_TRANSIT` + 6 unikalnych punktów PL w `ROUTE_WAYPOINTS` + 3 warianty specjalne = **15 panoram**. `HOME_WAYPOINT` nie ma odrębnego `id` i korzysta z `dom-meta.png`. Kraków został pominięty, ponieważ nie występuje w pliku `waypoints.ts` aktualnego `main` (mimo wzmianki w przykładach zlecenia).

**Uwaga integracyjna:** napisy na znaku granicznym wyświetla renderer jako overlay. Nie są wkomponowane w PNG. Dokładne położenie i przejścia między panoramami określa koordynator.

---

# Panorama punktów trasy (UK / FR / kanał)

Ilustracje oryginalne wygenerowane w ChatGPT i wykonane programowo, 1620x900 px, PNG RGBA, przezroczyste tło.

| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `londyn.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `dover.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `prom-kanal.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `tunel-kanal.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `birmingham.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `manchester.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `edynburg.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `paryz.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `reims.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `metz.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `calais.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `dunkierka.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | id z `waypoints.ts`; przezroczystość |
| `lille.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `lyon.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | dodatkowy motyw z briefu; obecnie poza `waypoints.ts`; przezroczystość |
| `preview.png` | Pillow / szachownica | Własne, do projektu | Arkusz podglądu bez tekstu w sprite'ach |

## Zasady

Sylwetki są stylizowane, bez logotypów, nazw, tekstu i symboli religijnych. Dodatkowo wykonano `tunel-kanal.png` jako wariant przeprawy, choć nie ma go jeszcze w trasie głównej. Pliki `birmingham`, `manchester`, `edynburg`, `lille` i `lyon` odpowiadają motywom z briefu, ale nie znajdują się w `waypoints.ts` na dzień przygotowania.

---

# Punkty trasy / landmarks

| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `zurych.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `wodospad-renski.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `oslo.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `svinesund.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `goteborg.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `helsingborg.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `malmo.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `ystad.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `prom-baltyk.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `kopenhaga.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `roskilde.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `most-falster.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `prom-fehmarn.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Identyfikator z `src/content/waypoints.ts`. |
| `aarhus.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `bazylea.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `bergen.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `genewa.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `most-oresund.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `most-wielki-belt.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `odense.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `stavanger.png` | Autorska ilustracja wektorowa, Python / CairoSVG / Pillow | własna — do użytku projektu | 1620×900, przezroczyste tło, Dodatkowy motyw z briefu, nie ma `country` CH/NO/SE/DK w aktualnym `waypoints.ts`. |
| `preview.png` | Arkusz kontaktowy: Pillow | własna — do użytku projektu | Wszystkie panoramy na szachownicy. ` [+] ` oznacza dodatki poza aktualną trasą. |

## Uwagi

- Promy: sylwetki generyczne bez oznaczeń linii i bez znaków towarowych.
- Zabytki i ikony miejsc: stylizowane, uproszczone sylwetki, nie oficjalne wizerunki.
- `most-oresund.png` jest dodatkowym plikiem z briefu, niezależnym od motywu w `malmo.png`.
- Daty/odległości w `waypoints.ts` nie były zmieniane. Krajowości punktów wyznaczono wyłącznie na podstawie `country`.

---

# Panoramy punktów trasy (BE/NL)

Styl: płaska, autorska ilustracja wektorowa. Jednolite oświetlenie z lewej góry. Pliki PNG z prawdziwą przezroczystością, 1620 x 900 px (3x). Składowe narysowane od podstaw za pomocą ChatGPT / Python / CairoSVG, następnie zaoptymalizowane w Pillow. Bez materiałów zewnętrznych, marek i napisów.

## Wykaz plików

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `bruksela.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Bruksela: Grand-Place: kamienice z ozdobnymi szczytami, ratusz z wieża, frytki; 1620x900, 25 KiB |
| `leuven.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Leuven: gotycki ratusz z pinaklami i rowery; 1620x900, 22 KiB |
| `liege.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Liège: schody na wzgórzu, Moza z barką; 1620x900, 21 KiB |
| `brugia.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Brugia: belfry, kanał i łabędzie; 1620x900, 20 KiB |
| `gandawa.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Gandawa: zamek i trzy wieże nad wodą; 1620x900, 23 KiB |
| `antwerpia.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Antwerpia: dworzec z kopułą, katedra, dźwigi portowe; 1620x900, 19 KiB |
| `amsterdam.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Amsterdam: kamienice przy kanale, rowery, wiatrak; 1620x900, 25 KiB |
| `utrecht.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Utrecht: Domtoren, kanał z nabrzeżem; 1620x900, 20 KiB |
| `arnhem.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Arnhem: most nad Renem, leśny krajobraz; 1620x900, 27 KiB |
| `eindhoven.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Eindhoven: podwieszone rondo rowerowe i rowery; 1620x900, 24 KiB |
| `venlo.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Venlo: szklarnie i ratusz; 1620x900, 16 KiB |
| `preview.png` | Pillow, kompozycja panoram i krajów | Własny zasób projektu | Kompletny arkusz grafik BE/NL na szachownicy |

## Prawa i integracja

- Licencja: autorski zasób projektu; do wykorzystania i modyfikowania w grze i jej promocji. Jedyne przedstawione budynki to uproszczone sylwetki architektoniczne.
- Identyfikatory plików są identyczne jak pole `id` w `src/content/waypoints.ts` dla punktów o `country` równym `BE` lub `NL`.
- Panoramy należy nakładać w chwili przelotu na warstwę `far`, a nad nimi `near`. Przykład w podglądzie: wariant 945 x 525 px umieszczony w (65, 1100) na ekranie 1080 x 1920.
- Do podglądu przeznaczony jest tylko `preview.png` - nie ładować go do gry.
- Rotterdam nie występuje jako punkt `NL` w obecnej wersji `waypoints.ts`. Nie tworzono odrębnej panoramy dla Rotterdamu, zgodnie z listą z kodu.

---

# DE — panoramy punktów trasy

Dokładnie **21 unikalnych identyfikatorów `country: 'DE'`** z `src/content/waypoints.ts` na gałęzi `main` w dniu 30.10.2026. Panoramy w stylu ilustracyjnym (mocny kontur, jasne ciepłe barwy, charakterystyczna sylwetka), osobne PNG z przezroczystą górą. Nie użyto zdjęć, elementów zewnętrznych, znaków handlowych, flag ani napisów.

| Plik | Wymiary | Źródło / narzędzie | Licencja | Motyw |
|---|---:|---|---|---|
| `akwizgran.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Ośmioboczna kopuła katedry i stara brama |
| `kolonia.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Dwie ostre wieże katedry i most nad Renem |
| `dusseldorf.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Rheinturm — smukła wieża nad Renem |
| `zaglebie-ruhry.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Szyby kopalniane, kominy, gazometr |
| `dortmund.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Stadion z owalnym dachem i wieża telewizyjna |
| `bielefeld.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Zamek na wzgórzu wśród drzew |
| `hanower.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Symetryczny ratusz z zieloną kopułą i stawem |
| `magdeburg.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Dwie wieże katedry nad Łabą |
| `berlin.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła kula na wieży i klasycystyczna brama |
| `frankfurt-oder.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Ceglany ratusz i most nad Odrą |
| `oberhausen.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wielki gazometr, hutnicze kominy i wieża kopalni |
| `saarbrucken.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Most nad Saarą, przemysłowe kominy |
| `mannheim.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła wieża ciśnień i fontanny |
| `frankfurt-main.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wieżowce nad Menem |
| `erfurt.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Domy na moście oraz gotyckie wieże |
| `drezno.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Barokowa kopuła, Łaba i parowiec |
| `stuttgart.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wieża telewizyjna na wzgórzu i winnice |
| `norymberga.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Kamienny zamek na skale i domy szachulcowe |
| `jena.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła wieża nad wzgórzami doliny Sali |
| `lubeka.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Bramy i dwie masywne wieże w czerwonej cegle |
| `hamburg.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Żurawie portowe, czerwone spichlerze nad wodą |
| `preview.png` | 2100×1840 | Własny arkusz Pillow | Oryginalne materiały do projektu | Wszystkie 21 panoram na tle szachownicy |

## Montaż

- Umieszczać jako osobną panoramę w chwili wejścia w punkt trasy, **nad `de-far.png` i pod `de-near.png`**.
- Identyfikatory plików odpowiadają dokładnie `waypoint.id` bez tłumaczenia na angielski.
- Monachium występuje w ogólnym opisie możliwych motywów, **nie występuje** w aktualnym `waypoints.ts`; dlatego nie dodano martwego pliku `monachium.png`.
- Grafiki powstały jako autorskie, programowo złożone ilustracje wektorowe; GPT Image wykorzystano wyłącznie do uzyskania orientacji stylistycznej. Korekty wykonywane ręcznie w `countries/de/generate_de.py`: sylwetki, wymiary, warstwy, alfa, optymalizacja, format @3x, styki kafli.
- Brak zależności uruchomieniowych npm; PNG są gotowe do gry.
# Zlecenie 56 — panoramy ES, IT, AT, CZ

Oryginalne autorskie SVG wygenerowane proceduralnie w ChatGPT, z korektą figur, sylwetek i warstw. PNG RGBA 1620×900, przezroczyste tło. Słońce i oświetlenie z lewej góry. Bez logotypów ani napisów.

Prace obejmują dwie dodatkowe panoramy z motywów zlecenia (Bolonia i Salzburg), poza trzema największymi miastami każdego kraju — ponieważ 30.10.2026 nowe kraje nie występowały jeszcze w `src/content/waypoints.ts` na `main`. Identyfikatory miast trzeba zweryfikować z docelową wersją zlecenia 55.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `madryt.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | ES; stylizowana sylwetka, 1620×900, RGBA |
| `barcelona.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | ES; stylizowana sylwetka, 1620×900, RGBA |
| `walencja.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | ES; stylizowana sylwetka, 1620×900, RGBA |
| `rzym.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | IT; stylizowana sylwetka, 1620×900, RGBA |
| `mediolan.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | IT; stylizowana sylwetka, 1620×900, RGBA |
| `neapol.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | IT; stylizowana sylwetka, 1620×900, RGBA |
| `bolonia.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | IT; stylizowana sylwetka, 1620×900, RGBA |
| `wieden.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | AT; stylizowana sylwetka, 1620×900, RGBA |
| `graz.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | AT; stylizowana sylwetka, 1620×900, RGBA |
| `linz.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | AT; stylizowana sylwetka, 1620×900, RGBA |
| `salzburg.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | AT; stylizowana sylwetka, 1620×900, RGBA |
| `praga.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | CZ; stylizowana sylwetka, 1620×900, RGBA |
| `brno.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | CZ; stylizowana sylwetka, 1620×900, RGBA |
| `ostrawa.png` | ChatGPT: autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | CZ; stylizowana sylwetka, 1620×900, RGBA |

Skrypt: `public/assets/countries/es/generate_south.py`. Ta tabela jest suplementem do **istniejącego** `public/assets/landmarks/ASSETS.md` i nie zastępuje wpisów z poprzednich zleceń.
# Zlecenie 57 — nowe panoramy w `public/assets/landmarks/`

Uzupełnienie istniejącego katalogu `landmarks`. Dokument nie zastępuje współdzielonego `ASSETS.md`; koordynator może przenieść poniższe wiersze do katalogowego manifestu.

| Plik | Rozmiar px | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---:|---|---|---|
| `dublin.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Most nad rzeką i szereg kolorowych fasad z kolorowymi drzwiami. Tło przezroczyste; bez tekstów i marek. |
| `cork.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Kamienice i miejska wieża przy nabrzeżu, mały most i łódź. Tło przezroczyste; bez tekstów i marek. |
| `limerick.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Kamienna forteca z basztami nad rzeką. Tło przezroczyste; bez tekstów i marek. |
| `helsinki.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Biała klasycyzująca katedra z zielonymi kopułami, monumentalne schody i port. Tło przezroczyste; bez tekstów i marek. |
| `tampere.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Ceglane fabryki, kominy i most nad wodą. Tło przezroczyste; bez tekstów i marek. |
| `luksemburg.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Wiadukt łukowy nad wąwozem, twierdza i stylizowane kazamaty. Tło przezroczyste; bez tekstów i marek. |
| `prom-irlandia.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Przeprawa Irlandia–Francja: prom bez marki, klify, francuski brzeg. Tło przezroczyste; bez tekstów i marek. |
| `prom-finlandia.png` | 1620×900 | Autorski SVG → CairoSVG/Pillow | Oryginalny zasób projektu | ChatGPT, autorski rysunek wektorowy. Przeprawa Finlandia–Polska: prom bez marki, lasy i nabrzeże portowe. Tło przezroczyste; bez tekstów i marek. |

Wszystkie obrazy mają przezroczystość, a źródło odtwarza je generator w `../countries/ie/generate_northwest.py`. Renderer dodaje napisy w czasie gry, nie są wtopione w ilustracje.

# ASSETS-80 — panoramy A+ (runda 6)

**Data:** 2026-10-30  
**Projekt:** Cebulak Express — Kierunek Polska  
**Format:** PNG RGBA 1620 x 900 (sRGB), przezroczyste tło, bez nieba, napisów, logo i flag.  
**Styl:** płaskie, ciepłe kolory, zarys w granacie `#1d2f3b`; zbliżony do stylistyki A+.

| Plik (id) | Miasto | Charakterystyczne budowle i punkt widzenia | Narzędzie | Licencja i uwagi |
|---|---|---|---|---|
| `bazylea.png` (`bazylea`) | Bazylea (CH) | Katedra Basler Münster (dwie wieże), zabytkowy most Mittlere Brücke, zabudowa Grossbasel; interpretacja widoku znad Renu od strony Kleinbasel. | ChatGPT Image, kadrowanie Pillow/OpenCV | Obraz wygenerowany; prawa do użycia outputu po stronie właściciela projektu zgodnie z warunkami usługi. Most silnie stylizowany, bez bezpośredniego kopiowania fotografii. |
| `oslo.png` (`oslo`) | Oslo (NO) | Dwie ceglane wieże Oslo Rådhus po lewej, historyczna twierdza Akershus po prawej, port; komponowane od strony Aker Brygge, w kierunku wschodnim. | Wektor SVG / CairoSVG na bazie szkiców generowanych w ChatGPT Image | Autorska grafika wektorowa dla projektu. Celowo nie pokazuje współczesnej opery (ostrożność prawnoautorska). |
| `bergen.png` (`bergen`) | Bergen (NO) | Rozpoznawalny ciąg szczytowych fasad hanzeatyckiego Bryggen, porośnięty wzgórzem Fløyen i stylizowany wagonik kolejki; ujęcie od strony portu Vågen. | ChatGPT Image, wycięcie Pillow/OpenCV | Grafika generowana; prawa do użycia outputu po stronie właściciela projektu zgodnie z warunkami usługi. Stylizowany układ i uproszczone domy. |
| `stavanger.png` (`stavanger`) | Stavanger (NO) | Białe drewniane domy Starego Stavanger, nabrzeże portu Vågen, stylizowana historyczna wieża starego centrum, żaglówki; spojrzenie od strony akwenu. | ChatGPT Image, wycięcie Pillow/OpenCV | Grafika generowana; prawa do użycia outputu po stronie właściciela projektu zgodnie z warunkami usługi. Wieża symboliczna, nie fotograficzna rekonstrukcja. |
| `kopenhaga.png` (`kopenhaga`) | Kopenhaga (DK) | Kolorowe XVII/XVIII-wieczne kamienice i łodzie na nabrzeżu Nyhavn; perspektywa z przeciwległego brzegu kanału. | ChatGPT Image, wycięcie i retusz Pillow/OpenCV | Grafika generowana; prawa do użycia outputu po stronie właściciela projektu zgodnie z warunkami usługi. Wieże stanowią stylizowany skrót ikonograficzny i nie odtwarzają ściśle jednej perspektywy fotograficznej. |

## Prompty źródłowe / parametry

Wszystkie grafiki wykorzystują wspólny opis: **"Flat warm-color vector city skyline, bold navy outlines #1d2f3b, historic landmarks and real local architectural silhouettes, 2–4 recognizable focal features, simplified windows, light from upper left, transparent sky, land or quay at bottom, no text, no logos, no flags, no people, isolated game background asset"**.

Dodatkowe wskazówki miast:

- `bazylea`: "Basel Cathedral twin red sandstone spires, historic Mittlere Brücke crossing river Rhine, waterfront Grossbasel, view from Kleinbasel".
- `oslo`: "Oslo City Hall pair of square brick towers left of Akershus Fortress in historic Oslofjord harbor seen from Aker Brygge, omit the copyrighted-concern modern Opera House"; wykonanie: ręczne SVG na bazie generated exploratory assets.
- `bergen`: "Bergen historic Bryggen colorful pointed-roof wooden merchant houses, Fløyen green mountain and funicular, view across harbor Vågen".
- `stavanger`: "Stavanger white wooden old Gamle Stavanger houses on harbor waterfront, sailboats, a historic stone tower behind, view from Vågen".
- `kopenhaga`: "Copenhagen Nyhavn historic bright canal houses, traditional boats, symbolic historical church spires and historic city hall tower".

**Postprodukcja:** kadrowanie pięciu części próbnych obrazów ChatGPT Image, usunięcie obcych fragmentów, wzmocnienie ciemnych obrysów, zmiana rozdzielczości metodą Lanczos, korekta kanału alfa, dodatkowa autorska ilustracja SVG dla Oslo. Żadnych skopiowanych zdjęć ani stocków. Grafiki są stylizowanymi panoramami gry, nie planem architektonicznym.**

## Kontrola i integracja

1. Podmień pięć plików `public/assets/landmarks/<id>.png` i zachowaj ich nazwy.
2. W grze renderuj jako warstwę bez nieba. Szerokość grafiki 1620 i wysokość 900 px; na urządzeniach wyświetlaj z próbkowaniem liniowym.
3. Otwórz `docs/art/podglady/panoramy-80.png` i sprawdź kadry w docelowej rozdzielczości gry (ok. 1/5 wejścia).
4. Wymagana ocena koordynatora: czy Oslo z ratuszem i twierdzą jest wystarczająco rozpoznawalne bez opery; w Stavanger wieża jest stylizacją; krawędź współczesnej zabudowy nie była kopiowana z fotografii.

**Testy automatyczne:** weryfikacja rozmiaru PNG, RGBA i przezroczystości. Bez testów w runtime gry, bo to paczka samych zasobów graficznych.

# ASSETS-82: Panoramy A+ - Polska

**Zlecenie:** 82  
**Data wykonania:** 30.10.2026  
**Projekt:** Cebulak Express - Kierunek Polska  
**Format eksportu:** PNG, RGBA, 1620 x 900, przezroczyste tło, sRGB.

## Wykaz grafik

| Plik | Miasto | Obiekty (2-4) | Punkt widzenia / układ sylwetek | Narzędzie i obróbka | Prawa/licencja |
|---|---|---|---|---|---|
| `wroclaw.png` | Wrocław | Katedra św. Jana Chrzciciela (dwie wieże), kolegiata Świętego Krzyża, Most Tumski i zabudowa Ostrowa Tumskiego | Schematyczny widok od Odry na Ostrów Tumski; most po prawej, katedra po prawej od kościoła | GPT Image w ChatGPT; przycięcie, skala, montaż RGBA, dopasowanie linii wody | Grafika wygenerowana; prawo użycia przez właściciela projektu według warunków OpenAI |
| `lodz.png` | Łódź | XIX-wieczne budynki fabryczne Manufaktury, historyczny komin, Pałac Izraela Poznańskiego | Uproszczone ujęcie od strony ul. Ogrodowej, w stronę zespołu fabryczno-pałacowego | GPT Image w ChatGPT; kadrowanie, skala, wyrównanie gruntu | Grafika wygenerowana; prawo użycia przez właściciela projektu według warunków OpenAI |
| `warszawa.png` | Warszawa | Pałac Kultury i Nauki, Zamek Królewski z wieżą zegarową, kolumna Zygmunta, kamienice Starego Miasta | Ujęcie ilustracyjne placu Zamkowego i panoramy śródmieścia w tle (obiekty na różnych planach); kolejność kompozycyjna, nie ścisły rzut geodezyjny | GPT Image w ChatGPT; wydzielenie z planszy koncepcyjnej, skalowanie do osobnego PNG, wycięcie podpisu | Grafika wygenerowana; prawo użycia przez właściciela projektu według warunków OpenAI |
| `krakow.png` | Kraków | Katedra wawelska z wieżą, Kaplica Zygmuntowska (zielona kopuła), Zamek Królewski na Wawelu, Baszta Sandomierska | Schematyczna sylwetka wzgórza wawelskiego z południowego brzegu Wisły, bez dokładania budynków Rynku do jednego planu | ChatGPT: wygenerowana koncepcja GPT Image + ręczna rekonstrukcja wektorowa SVG i eksport PNG (CairoSVG), ujednolicone kontury | Grafika AI i autorskie opracowanie wektorowe dla właściciela projektu |
| `katowice.png` | Katowice | Spodek, pawilony Muzeum Śląskiego, szyb „Warszawa”, gmach NOSPR oraz zielone formy MCK | Uproszczona panorama Strefy Kultury, oglądanej z południowego zachodu: Spodek po lewej, zabudowa muzealna po prawej | ChatGPT: wygenerowana koncepcja GPT Image + ręczna rekonstrukcja wektorowa SVG i eksport PNG (CairoSVG), ujednolicone kontury | Grafika AI i autorskie opracowanie wektorowe dla właściciela projektu |

**Uwaga o kompozycji:** grafiki są stylizowanymi, poglądowymi panoramami do gry, a nie fotogrametrycznymi odwzorowaniami konkretnych współrzędnych. W szczególności rozstaw obiektów Warszawy i Strefy Kultury w Katowicach jest uproszczony dla czytelności w małej skali.

## Opisy/promy koncepcyjne

Poniższe opisy to **odtworzona specyfikacja wizualna zadania**, a nie zapis dosłownej wewnętrznej instrukcji modelu (generator samodzielnie dobiera szczegóły).

### Wrocław - `wroclaw.png`
> Wide 16:9 panoramic cutout illustration of Wroclaw Cathedral Island seen over the Oder river: distinctive twin spires of St. John the Baptist Cathedral, Holy Cross Church, historic red-roof houses and a teal bridge; large warm flat-color silhouettes with thick dark navy #1d2f3b outlines, light from upper left; no sky, labels, logos or people; transparent RGBA ground at bottom.

### Łódź - `lodz.png`
> Wide 16:9 panoramic cutout of the historic Lodz textile factory ensemble: towering nineteenth-century red-brick mill buildings of Manufaktura, tall brick chimney and historic Poznanski Palace on the right; simplified bold blocks with thick dark navy outlines, warm palette, clear ground line, no sky, text, brand marks or people; transparent background.

### Warszawa - `warszawa.png`
> Wide 16:9 Polish capital cityscape with the monumental Palace of Culture and Science behind colorful Old Town townhouses, the Royal Castle with green clocktower and Sigismund's Column; recognizable architectural shapes, flat warm-color vector cartoon, thick #1d2f3b contour; transparent sky and no text or trademarks. Extract the Warsaw scene from a generated five-city concept sheet.

### Kraków - `krakow.png`
> Transparent 1620x900 vector panorama of Wawel Hill from the southern bank of the Vistula, including a Gothic cathedral tower, green-domed Sigismund Chapel, long royal palace front and cylindrical brick defensive tower, warm historical architecture above a green hill and a narrow riverbank strip; dark navy 9-10px outlines and clean geometric windows; no sky, labels or people.

### Katowice - `katowice.png`
> Transparent 1620x900 vector panorama of Katowice Culture Zone from the southwest: the giant elliptical Spodek saucer on the left, green sloping MCK roof, glass Museum of Silesia pavilions, tall steel Warszawa mine headframe and warm red concert hall volume on the right; flat modern cartoon with 9-10px #1d2f3b outlines and a ground stripe; no sky, logos or people.

## Prawa i szczegóły wykorzystania

- Wszystkie ilustracje zostały wygenerowane lub opracowane na potrzeby tego projektu w ChatGPT. Nie kopiowano obcych zdjęć ani gotowych grafik 1:1.
- Właściciel projektu może korzystać z wygenerowanych plików zgodnie z warunkami OpenAI. Nie oznacza to gwarancji wyłącznej ochrony prawnoautorskiej dla surowych obrazów AI ani przeniesienia praw do przedstawionych budowli.
- Dla budynków na terenie Polski istotny jest art. 33 pkt 1 ustawy o prawie autorskim (wolność panoramy). Większość pokazanych zabytków jest historyczna; współczesne bryły architektoniczne mają charakter prostych, rozpoznawalnych sylwetek. W razie szczególnego użycia reklamowego zalecana jest odrębna weryfikacja praw.
- Paleta: ciepłe ochry, ceglaste czerwienie, morski błękit i zielenie, ciemnogranatowy kontur `#1d2f3b`. Oświetlenie z lewej góry.

## Weryfikacja techniczna

- [x] 5 plików 1620x900 w RGBA z przezroczystym niebem.
- [x] Każdy PNG ma linię wody / gruntu przy dolnej krawędzi.
- [x] Brak wtopionych podpisów miasta, reklam, flag, ludzi i logotypów.
- [x] Arkusz podglądu `docs/art/podglady/panoramy-82.png` z podpisami.
- [ ] Wizualny odbiór przez właściciela w rzeczywistym kadrze silnika gry.
- [ ] Testy aplikacji `npm ci`, `typecheck`, `test`, `build` (niewykonane - nie są potrzebne do oceny samych plików PNG; środowisko bez klonowania Git).

# Zlecenie 78 — panoramy A+ (UK i Frankfurt nad Menem)

**Data:** 30.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Wersja:** grafiki gotowe do weryfikacji w kadrze gry; zastępują dotychczasowe ogólne panoramy.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image / DALL·E), następnie lokalna obróbka Pillow/OpenCV (przezroczystość, kadrowanie, skalowanie, wzmocnienie obrysu, uzupełnienie niskiej zabudowy i linii gruntu).

## Indeks plików

| Plik (ścieżka względem repozytorium) | ID / miasto | Rozpoznawalne elementy | Punkt widzenia / układ |
|---|---|---|---|
| `public/assets/landmarks/londyn.png` | `londyn` / Londyn | Pałac Westminsterski z Elizabeth Tower (Big Ben), Westminster Bridge, London Eye | Uproszczona panorama znad Tamizy, z południowego brzegu na wschód od Westminster Bridge, w stronę zachodu: Westminster z lewej, koło z prawej |
| `public/assets/landmarks/birmingham.png` | `birmingham` / Birmingham | Rotunda, kościół St Martin in the Bull Ring, falista fasada Bullring/Selfridges (bez napisu) | Okolice St Martin's Square, widok na północ w stronę Bullring; nie dołączono biblioteki ani kanałów, które nie leżą w tej samej osi widokowej |
| `public/assets/landmarks/manchester.png` | `manchester` / Manchester | Beetham Tower, ceglany wiadukt kolejowy, stare magazyny i kanał Castlefield | Spojrzenie w stronę centrum znad kanału w Castlefield; bez ratusza, który nie jest widoczny z tego ujęcia |
| `public/assets/landmarks/edynburg.png` | `edynburg` / Edynburg | Edinburgh Castle na Castle Rock, historyczne Old Town, Scott Monument | Stylizacja panoramy w stronę zachodu z Calton Hill; bez Arthur's Seat, który nie leży w tym samym kierunku |
| `public/assets/landmarks/frankfurt-main.png` | `frankfurt-main` / Frankfurt nad Menem | Wieżowce Mainhattan, Kaiserdom, szczytowe kamienice historycznego centrum, Eiserner Steg | Stylizacja widoku na północ z południowego brzegu Menu, okolice Sachsenhausen; układ uproszczony i nie stanowi rekonstrukcji fotogrametrycznej |

## Prompty odtworzeniowe

Prompty niżej opisują docelowy wynik; generator obrazu automatycznie rozwijał ich język. Dwa ostatnie kadry **wycięto z wygenerowanych przez ChatGPT panoram zbiorczych**, a następnie ręcznie przygotowano do formatu gry — nie są kopiami fotografii.

### `londyn.png`

> Single wide 16:9 flat-vector game skyline of London as seen from the South Bank of the Thames: Palace of Westminster and Elizabeth Tower on the left, Westminster Bridge along the lower foreground, the giant London Eye on the right. Warm ochre stone, teal water, dark slate roofs; bold dark-navy #1d2f3b outlines about 9–10 px at final resolution, simplified big forms, shadow patches, light upper-left. Transparent sky (true alpha), no labels, advertisements, logos, flags or people. Buildings occupy roughly 70–80% of frame height; straight water/ground strip at the bottom.

### `birmingham.png`

> One wide isolated vector panorama of Birmingham's Bullring, from St Martin's Square: cylindrical Rotunda on the left, historic St Martin church near center, distinctive organically curved disc-covered Bullring building on the right, no commercial signage. Warm flat colors, simple city blocks and shrubbery below, dark-navy heavy outlines, no photo textures or gradient sky, real transparent background, no words, emblems, people or logos. Focus on three recognizable large silhouettes.

### `manchester.png`

> One panoramic 16:9 vector game asset of Manchester's Castlefield canal waterfront: tall glass Beetham Tower above red-brick 19th-century warehouses, railway viaduct with broad brick arches and low waterline. Simplified blocks in orange sandstone, navy, teal and olive, big landmark silhouettes, thick dark-navy line art and flat light from the upper left. True transparent sky, no people, logos, text or unrelated buildings.

### `edynburg.png`

> Isolated 16:9 cartoon-vector panorama of Edinburgh viewed west-southwest from Calton Hill, featuring Edinburgh Castle on its dramatic rocky ridge on the left, Old Town sandstone roofs below and the tall Gothic Scott Monument on the right. Large distinctive silhouettes, thick #1d2f3b outlines, warm flat palette with olive trees, no sky (transparent alpha), no people, logos, flags, inscriptions or unrelated hills. Source illustration generated by ChatGPT in a multi-city concept sheet; Edinburgh sector extracted and recomposed.

### `frankfurt-main.png`

> Isolated 16:9 cartoon-vector Main river skyline of Frankfurt am Main from the Sachsenhausen riverside: modern high-rise business district grouped on the left, traditional stepped-gable old-town facades along the waterfront, red-sandstone Frankfurt Cathedral toward the right and a low iron-truss Eiserner Steg bridge across the foreground. Warm stone, cool blue-glass towers, teal river, bold navy outlines; simplified illustrative forms, transparent sky, no signage, text, brands, flags or people. Source illustration generated by ChatGPT in a multi-city concept sheet; Frankfurt sector extracted and recomposed.

## Parametry techniczne i licencja

| Parametr | Wartość |
|---|---|
| Eksport każdej panoramy | PNG 1620 × 900 px, RGBA, profil ICC sRGB |
| Tło | Przezroczyste; niebo i chmury dodawane wyłącznie przez grę |
| Obrys | Ciemnogranatowy `#1d2f3b` — wzmocniony obrys zewnętrzny; obrysy wewnętrzne częściowo pochodzą z generatora |
| Linia gruntu | Ciągła linia przy dolnej krawędzi; woda / nabrzeże / trawa w ostatnich kilkunastu pikselach |
| Światło | Kierunkowo z góry po lewej; uproszczona płaska stylizacja |
| Źródło | Obrazy generowane w natywnym narzędziu obrazów ChatGPT; nie kopiowano zdjęć ani płatnych assetów |
| Prawo wykorzystania | Grafiki wygenerowane na zamówienie właściciela projektu, do jego wykorzystania i dalszej obróbki zgodnie z warunkami OpenAI i obowiązującymi przepisami. Nie deklaruje się odrębnej wyłączności autorskiej do samego surowego wyniku AI. |

**Architektura i prawo panoramy:** W Wielkiej Brytanii § 62 Copyright, Designs and Patents Act 1988 dopuszcza tworzenie i rozpowszechnianie graficznych przedstawień budynków trwale usytuowanych w przestrzeni publicznej; w Niemczech analogiczne zastosowanie ma § 59 UrhG w zakresie widoku z przestrzeni publicznej. Zachowano wyłącznie architekturę / sylwetki, bez znaków handlowych. Podstawa: https://www.legislation.gov.uk/ukpga/1988/48/section/62 oraz https://www.gesetze-im-internet.de/urhg/__59.html.

**Arkusz podglądu:** `docs/art/podglady/panoramy-78.png` (podpisy wyłącznie na arkuszu, nie w assetach gry).

**Uwaga dla koordynatora:** Sprawdzić wizualnie w docelowej skali około 1:5 oraz na tle warstw gry; nie przeprowadzono wizualnego testu w działającej grze. Edynburg i Frankfurt są powiększonymi fragmentami oryginalnych obrazów zbiorczych, więc mogą wymagać dalszego dopracowania na ekranach wysokiej rozdzielczości. Układy budowli celowo uproszczono, nie są to dokładne wizualizacje kartograficzne.

# ASSETS-81 — Panoramy A+: Aarhus, Odense, Frankfurt nad Odrą, Szczecin, Poznań

**Data przygotowania:** 30.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Specyfikacja:** 5 osobnych PNG RGBA 1620×900 px, sRGB, bez nieba, napisów na ilustracjach ani logotypów; grafika w stylu A+ z ciemnogranatowym konturem `#1d2f3b`.  
**Narzędzia:** natywne generowanie obrazów w ChatGPT (GPT Image), Pillow do wyrównania wymiarów, kadrowania i arkusza podglądu.

## Ewidencja zasobów

| Id / plik | Miasto i sylwetki | Punkt widzenia / wiarygodność | Narzędzie i obróbka | Uprawnienia |
|---|---|---|---|---|
| `aarhus.png` | Aarhus: historyczny czerwonoceglany budynek komory celnej **Toldboden**, wieża **Aarhus Domkirke** i portowe kamienice | Umowna panorama z nabrzeża portowego w kierunku zabytkowego centrum. Rozpoznawalne dominanty, uproszczone odległości. | ChatGPT GPT Image; dopasowanie do 1620×900 | Grafika AI przygotowana do projektu; prawo korzystania i eksploatacji po stronie właściciela projektu |
| `odense.png` | Odense: ceglany korpus i wieża **katedry św. Kanuta**, domki z muru pruskiego i niewysokie kamienice odwołujące się do dawnego miasta H.C. Andersena | Kadr z poziomu historycznych uliczek; kompozycja ilustracyjna (nie jest zdjęciem z jednego dokładnie zlokalizowanego punktu). | ChatGPT GPT Image; dopasowanie do 1620×900 | J.w. |
| `frankfurt-oder.png` | Frankfurt nad Odrą: gotycki **ratusz**, para wież historycznego kościoła (skojarzenie z Friedenskirche), **most miejski na Odrze** | Umowny widok znad Odry, od strony Słubic, łączący dominanty Starego Miasta w jednym planie; **nie stanowi dokładnej rekonstrukcji perspektywy**. | ChatGPT GPT Image; dopasowanie do 1620×900 | J.w. |
| `szczecin.png` | Szczecin: **Muzeum Narodowe**, historyczne gmachy **Wałów Chrobrego**, tarasy widokowe, portowe dźwigi | Widok od strony wschodniego brzegu Odry/Łasztowni na zachodni brzeg, w kierunku Wałów Chrobrego; stylizacja. | ChatGPT GPT Image (wycinek z arkusza pięciu miast); Pillow: kadrowanie, powiększenie do 1620×900 | J.w. |
| `poznan.png` | Poznań: **renesansowy ratusz** i kolorowe **kamieniczki Starego Rynku** | Widok Starego Rynku skierowany na ratusz; budynki otoczenia są stylizowane, nie przedstawiają dokładnych numerów kamienic. Brak katedry z Ostrowa Tumskiego. | ChatGPT GPT Image (wycinek z arkusza pięciu miast); Pillow: kadrowanie, usunięcie zbędnego podpisu, powiększenie, lustrzane uzupełnienie pasm kamienic po bokach | J.w. |

**Ważna uwaga prawna:** „prawo korzystania do celów projektu” nie jest obietnicą wyłącznego prawa autorskiego do treści wygenerowanych autonomicznie przez AI. Nie kopiowano fotografii ani nie umieszczono logotypów.

## Opisy poleceń wizualnych („prompty” / briefy)

### `aarhus.png`
`Wide independent Aarhus historic harbour skyline. Historic red brick Toldboden with steep dark roof and tower prominent at left; historic Aarhus Cathedral tall spire behind low roofs to the right; low port buildings, narrow quay and a thin strip of water. Flat warm-coloured vector cartoon, bold #1d2f3b outline ~9–10 px, transparent sky, 16:9, no text, no logos.`

### `odense.png`
`Independent Odense historic town panorama. St Canute red brick Gothic cathedral with distinctive square tower and narrow spire, traditional yellow and cream half-timbered Danish houses and red roofs in foreground. Bold dark-navy outlines, large simplified building forms, soft flat warm lighting, transparent background, no text, no people.`

### `frankfurt-oder.png`
`Independent Frankfurt (Oder) skyline with brick Gothic Rathaus stepped gables, historical twin church spires and the blue arch of the bridge across the Oder towards Slubice. Rich flat vector shapes, dark navy contour, simple windows, thin river at base, no sky or text.`

### `szczecin.png`
`Five-city concept collage in a clean bold vector cartoon style, including a Szczecin waterfront vignette: Wały Chrobrego, historical sandstone National Museum and provincial office towers, stairs of river terraces and harbour cranes. Extract only the Szczecin vignette to its own transparent 16:9 PNG, no text.`

### `poznan.png`
`Five-city concept collage in a clean bold vector cartoon style, including Poznań: Renaissance old town hall with clock tower, colourful merchant houses. Extract the Poznań vignette into a transparent 16:9 PNG, omit the distant cathedral and extend the historic market frontage with matching low houses, no text.`

**Uwaga do promptów:** narzędzie automatycznie redaguje polecenia na podstawie zlecenia. Powyżej utrwalono użyty brief wizualny, **nie pełny wewnętrzny prompt modelu**, który nie został udostępniony.

## Źródła odniesienia do charakterystycznych budowli

- Aarhus — Toldboden: https://www.visitaarhus.com/aarhus-region/plan-your-trip/toldboden-gdk653420
- Odense — katedra św. Kanuta: https://www.odensedomkirke.dk/kirker/domkirken-skt-knuds-kirke/domkirkens-arkitektur
- Frankfurt nad Odrą — ratusz: https://www.frankfurt-slubice.eu/index.php/en/poi/100952/rathaus-frankfurt-oder-town-hall
- Szczecin — układ Wałów Chrobrego: https://visitszczecin.eu/pl/kultura/80-waly-chrobrego
- Poznań — Stary Rynek i ratusz: https://www.poznan.pl/

Zdjęcia z powyższych stron służyły wyłącznie do sprawdzenia nazw i ogólnych sylwetek budowli; **nie są elementami obrazów wynikowych**.

## Kontrola jakości i integracja

- Wszystkie pliki w tej partii zapisano jako PNG RGBA z osadzonym profilem sRGB.
- Arkusz kontrolny: `docs/art/podglady/panoramy-81.png` — kompozyt z rzeczywistych pięciu plików na jasnoniebieskim tle, podpisy dodane tylko w arkuszu.
- Nie modyfikowano kodu gry; integracja wymaga podmiany plików `public/assets/landmarks/<id>.png` po akceptacji.
- **Do dalszej kontroli koordynatora:** czytelność panoram w rozmiarze około 324×180, zgodność kątów i ustawienia budowli w Szczecinie, a szczególnie naturalność uzupełnionych szeregów kamienic w Poznaniu.
- `szczecin.png` i `poznan.png` pochodzą z mniejszych wycinków wygenerowanego arkusza, więc ich szczegóły mają niższą rozdzielczość źródłową od pozostałych trzech plików. W przypadku negatywnej oceny w grze zalecane ponowne wygenerowanie **osobno** obu miast.

# ASSETS-76 — Panoramy A+ Europy Zachodniej

**Zlecenie:** 76 — Eindhoven, Kolonia, Dortmund / Zagłębie Ruhry, Bielefeld, Hanower  
**Data:** 2026-10-30  
**Narzędzie:** natywne generowanie obrazów w ChatGPT (GPT Image), następnie obróbka lokalna Python / Pillow (kadrowanie, skalowanie, usunięcie elementów arkusza, pogrubienie zewnętrznego obrysu, eksport do PNG RGBA/sRGB).  
**Przeznaczenie:** warstwa sylwetek miast w grze „Cebulak Express — Kierunek Polska”.

## Wykaz plików

| Plik | Miasto i rozpoznawalne obiekty | Założony kierunek obserwacji i kompozycja | Generowanie / obróbka |
|---|---|---|---|
| `eindhoven.png` | Eindhoven: wieża z zegarem wzorowana na Klokgebouw, zakłady przemysłowe Strijp-S, sąsiednie proste hale i biurowce | Umowny szeroki widok na przemysłowy zespół Strijp-S z poziomu otwartej przestrzeni; nie jest ścisłą rekonstrukcją jednego fotopunktu | Oddzielny obraz GPT Image; skalowanie do 1620×900, wyrównanie gruntu, ciemny obrys |
| `kolonia.png` | Kolonia: dwuwieżowa katedra, Hohenzollernbrücke, kolorowe domy Altstadt, Ren | Wschodni brzeg Renu (Deutz), patrząc ku zachodowi; katedra za i na lewo od mostu, starówka po lewej; interpretacja ilustracyjna | Oddzielny obraz GPT Image; skalowanie, wyrównanie linii wody, obrys |
| `dortmund.png` | Dortmund / Ruhr: wieża Dortmunder U bez litery/logotypu, wieża Florian, górnicza wieża wyciągowa, industrialny komin | Syntetyczna panorama industrialnej aglomeracji, ze zrozumiałymi sylwetkami; **nie przedstawia wiernie jednego punktu widokowego** | Oddzielny obraz GPT Image; skalowanie, wyrównanie gruntu, obrys |
| `bielefeld.png` | Bielefeld: Sparrenburg na zalesionym wzniesieniu, stylizowany historyczny kościół staromiejski, niskie zabudowania i zieleń Teutoburger Wald | Umowny widok ku wzgórzu zamkowemu od strony miasta; proporcje uproszczone pod mały ekran | Wyodrębniony z natywnie wygenerowanego arkusza pięciu panoram; usunięto fragmenty podpisów i małą chorągiewkę, przeskalowano, dodano obrys |
| `hanower.png` | Hanower: Neues Rathaus z zieloną kopułą, wieża Marktkirche, Maschteich | Spojrzenie z południa przez staw Maschteich; wieża staromiejska po lewej (zachodniej) stronie jako dalszy plan | Wyodrębniony z natywnie wygenerowanego arkusza pięciu panoram; usunięto fragmenty podpisów, odbito poziomo dla zachowania orientacji, przeskalowano, dodano obrys |

## Prompty / dyspozycje dla generatora

Prompty poniżej zapisują merytoryczną dyspozycję generowania w języku angielskim. Nie są automatycznie eksportowanym logiem parametrów modelu. Wszystkie podlegały dodatkowo wymaganiom zlecenia: płaski rysunkowy styl A+, kontur zbliżony do `#1d2f3b`, ciepła paleta, światło z lewej góry, 2–4 wyraźne sylwetki, brak nieba, chmur, napisów, logotypów i rozpoznawalnych osób.

### `eindhoven.png`

> Panoramic flat-vector cityscape on a transparent background, outlined in deep navy with crisp warm color-block shading. Eindhoven Strijp-S historic industrial quarter: cream factory clock tower with simple round clock and glazed crown, neighboring broad factory wings, red brick manufacturing buildings, a few low modern offices, modest foreground trees and a continuous ground line. Strong simplified building shapes; no lettering, brands, sky, people or photographic textures.

### `kolonia.png`

> Wide panoramic vector cityscape of Cologne across the Rhine, transparent sky. Two immense gothic spires of Cologne Cathedral at center-left, the repeating iron arches of Hohenzollern Bridge entering from the right, colorful historic riverside houses to the left, a thin turquoise Rhine band and embankment along the bottom. Thick dark-blue outlines, big shapes, simple cel shading, no signage or people.

### `dortmund.png`

> Crisp flat-vector cutout of a Dortmund/Ruhr industrial skyline on a transparent background. A historic steel mining headframe and smokestack on the left; a prominent brick U-Tower with a blank contemporary glazed crown in the center (no U letter, brand or logo); the slender Florian television tower and low city roofs to the right. Warm bricks, teal steel, navy outlines, thin continuous greenery/ground at bottom, no sky or words.

### `bielefeld.png` / `hanower.png` (wspólny obraz źródłowy)

> Flat-vector travel-poster collage depicting five distinct, brightly colored European city silhouettes, including Bielefeld with Sparrenburg Castle on a wooded hill above town houses and an old church, and Hannover with its domed Neues Rathaus by the Maschteich and the Marktkirche spire. Very dark heavy outlines, crisp geometry and natural warm colors. Individual scenes later isolated and placed onto transparent canvases, without textual labels.

## Parametry i przetwarzanie

- **Każdy asset gry:** PNG `1620×900`, RGBA (przezroczysty obszar nieba), profil sRGB, bez napisów i bez oddzielnego obrazu nieba.
- **Kontury:** ciemnogranatowe, przy eksporcie dodano ok. 3 px do obrysu zewnętrznego. Kontury wewnętrzne pochodzą z obrazu źródłowego; dokładnej grubości 9–10 px każdej wewnętrznej linii nie gwarantuje się.
- **Skalowanie:** filtr Lanczos; dla `bielefeld.png` i `hanower.png` także przycięcie osobnych segmentów arkusza i usunięcie niezależnych obszarów alfa (resztki podpisów).
- **Arkusz do oceny:** `docs/art/podglady/panoramy-76.png` — pięć panoram na jasnoniebieskim tle, podpisy dodane tylko na arkuszu, nie w assetach gry.
- **Źródła referencyjne budowli:** m.in. oficjalna strona Strijp-S (`https://www.strijp-s.nl/gebouw/klokgebouw`), turystyka Hanoweru (`https://www.hannover.de/Kultur-Freizeit/Geschichte-Geschichten/Echt-hann%C3%B6versch/Das-Neue-Rathaus-im-Detail/Rundgang-um-und-in-das-Neue-Rathaus/Das-Rathaus-von-Au%C3%9Fen-S%C3%BCd`); fotografie i ilustracje z tych stron **nie zostały skopiowane do assetów**.

## Pochodzenie i uprawnienia

Wszystkie grafiki źródłowe wygenerowano w ChatGPT; brak wykorzystania obcych fotografii, logotypów i płatnych stocków w plikach wynikowych. Materiał został przygotowany dla właściciela projektu z przeznaczeniem do użycia komercyjnego na zasadach dotyczących treści wyjściowych usługi ChatGPT. Sama generacja AI nie gwarantuje, że każdy element uzyska ochronę prawnoautorską na gruncie prawa właściwego. Rekomendowany jest końcowy przegląd prawny przed publikacją.

## Otwarte punkty do akceptacji koordynatora

1. Potwierdzić rozpoznawalność na rzeczywistym kadrze gry przy zmniejszeniu około 5×.
2. **Dortmund:** ujęcie łączy symbole regionu; nie jest jednorodną rekonstrukcją jednego fizycznego punktu widokowego. Jeśli realizm geograficzny jest kryterium bezwzględnym, należy wykonać nowy wariant oparty na jednej perspektywie.
3. **Bielefeld i Hanower:** źródłem był większy arkusz AI, nie oddzielne rendery; mimo eksportu 1620×900 ich bazowa szczegółowość jest niższa. Warto zastąpić obrazami generowanymi osobno, jeśli po teście w aplikacji będzie to widoczne.
4. **Eindhoven:** bryły przemysłowe są stylizowane. Zegar jest świadomie pozbawiony nazwy przedsiębiorstwa; weryfikować podobieństwo do Klokgebouw.
