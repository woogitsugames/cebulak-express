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

# ASSETS-77 — Panoramy A+ Niemcy (runda 6)

**Data:** 2026-10-30  
**Projekt:** Cebulak Express — Kierunek Polska  
**Format:** 5 × PNG, 1620 × 900 px, RGBA, profil sRGB, przezroczyste niebo, linia gruntu przy dolnej krawędzi.  
**Narzędzia:** wbudowany generator obrazów ChatGPT; kadrowanie, oczyszczanie przezroczystości, korekta kolejności sylwetek, dodanie konturu oraz arkusz podglądu: Python / Pillow / OpenCV.

Grafiki mają charakter **oryginalnych ilustracji**, a nie kopii fotografii. Generator wykonał osobny Berlin oraz arkusze z pięcioma miastami. Cztery pozostałe panoramy wyodrębniono z wygenerowanego arkusza, ponownie wykadrowano i technicznie dopracowano. W arkuszu końcowym podpisy znajdują się **wyłącznie pod ilustracjami**, nie w plikach gry.

## Pliki, motywy, punkty widzenia i prompty

Wspólny brief dla generatora: *„Szeroka, płaska rysunkowa panorama miasta do mobilnej gry 2D: uproszczona architektura, 2–4 duże rozpoznawalne sylwetki, ciepłe kolory, jednolite plamy cienia od światła z lewej góry, wyraźny kontur ciemnogranatowy #1d2f3b, bez zdjęciowych tekstur, napisów, logotypów, flag i postaci; wycięte przezroczyste niebo i dolna linia nabrzeża lub gruntu”.* Opisy w kolumnie „prompt motywu” odtwarzają zakres tematyczny przekazany generatorowi; wewnętrzny dosłowny prompt systemowy nie jest dostępny.

| Plik / id | Miasto | Dominujące budowle | Przybliżony punkt widzenia | Prompt motywu | Źródło / licencja |
|---|---|---|---|---|---|
| `berlin.png` / `berlin` | Berlin | Brama Brandenburska, szklana kopuła Reichstagu, Fernsehturm; uproszczone kamienice i kopuły w tle | Od zachodu, w osi Bramy Brandenburskiej, od strony Tiergarten i alei Straße des 17. Juni; szeroka stylizacja perspektywy | „Berlin: duża Brama Brandenburska na środku, Reichstag po lewej, wieża telewizyjna po prawej, niewielkie korony drzew i ulice bez napisów” | ChatGPT GPT Image, korekta Pillow/OpenCV; prawa do wygenerowanego wyniku: właściciel projektu |
| `magdeburg.png` / `magdeburg` | Magdeburg | Gotycka katedra św. Maurycego i św. Katarzyny z dwiema wieżami, most przez Łabę, niska zabudowa | Od wschodniego brzegu Łaby w kierunku starego miasta | „Magdeburg: potężna gotycka katedra z dwiema wysokimi wieżami po lewej, most i nabrzeże Łaby po prawej, jasny piaskowiec, dachy i drzewa” | ChatGPT GPT Image, wydzielenie z wygenerowanego arkusza, korekta Pillow/OpenCV; prawa właściciela projektu |
| `drezno.png` / `drezno` | Drezno | Frauenkirche z kopułą, barokowe wieże starego miasta (w tym sylwetka inspirowana Hofkirche), most Augusta i Łaba | Północny brzeg Łaby (Neustädter Elbufer), widok na Altstadt | „Drezno: wielka kopuła Frauenkirche po lewej, kościelne wieże i historyczne kamienice po prawej, kamienny most Augusta przed panoramą, pas Łaby” | ChatGPT GPT Image, wydzielenie z wygenerowanego arkusza, korekta Pillow/OpenCV; prawa właściciela projektu |
| `hamburg.png` / `hamburg` | Hamburg | Elbphilharmonie na ceglanej podstawie, wieża kościoła św. Michała (Michel), dźwigi portowe | Południowy brzeg Łaby, spojrzenie ku północnemu nabrzeżu; orientacja elementów skorygowana lustrzanym odbiciem | „Hamburg: dźwigi portowe z lewej, wieża kościelna w centrum, duża falista szklana bryła Elbphilharmonie z prawej, historyczne magazyny i woda” | ChatGPT GPT Image, wydzielenie z wygenerowanego arkusza, korekta Pillow/OpenCV; prawa właściciela projektu |
| `monachium.png` / `monachium` | Monachium | Nowy Ratusz, Frauenkirche z dwiema zielonymi kopułami, odległy zarys Alp | Umowny publiczny punkt obserwacyjny na północ od centrum, widok na południe; odwrócenie kadru dla właściwego porządku zachód–wschód | „Monachium: gotycki Nowy Ratusz po lewej, dwie zielone kopuły Frauenkirche po prawej, niska starówka z czerwonymi dachami, dalekie Alpy” | ChatGPT GPT Image, wydzielenie z wygenerowanego arkusza, korekta Pillow/OpenCV; prawa właściciela projektu |

## Obróbka i ograniczenia

- Skala i kadrowanie: 1620 × 900 px; główne sylwetki zajmują ok. 80% wysokości, najniższa linia na y=882.
- Kontur: `#1d2f3b`, dodatkowa zewnętrzna obwódka około 9–10 px wraz z istniejącą krawędzią ilustracji; świadomie pozostawiono prostsze wewnętrzne linie okien.
- Brak tła nieba, chmur, tekstów, logo, herbu, flag i ludzi. Źródła zdjęciowe oglądano jedynie jako ogólne odniesienie do sylwetek.
- Prawdziwy krajobraz miejski został **uproszczony i miejscami przeskalowany** dla rozpoznawalności na małym ekranie. To stylizowana kompozycja oparta na przybliżonym kierunku widoku, **nie** dokładna rekonstrukcja fotogrametryczna.
- Elbphilharmonie jest współczesną budowlą. Wizerunki jej zewnętrznej formy przedstawianej z przestrzeni publicznej rozpatrywano w świetle niemieckiej *Panoramafreiheit* (§ 59 UrhG: https://www.gesetze-im-internet.de/urhg/__59.html). Nie użyto cudzego zdjęcia ani nie powielono materiałów promocyjnych obiektu. Ocena dotyczy tej konkretnej grafiki, a nie innych sposobów wykorzystania budynku.

## Pliki pomocnicze

`docs/art/podglady/panoramy-77.png` — arkusz na jasnoniebieskim tle z pięcioma podpisanymi panoramami; podpisy nie należą do sprite'ów.

**Licencja / użytkowanie:** obrazy wygenerowano na zlecenie właściciela projektu w ChatGPT. Prawa do wyników przysługują zamawiającemu zgodnie z obowiązującymi warunkami usługi. Nie są to zasoby CC0 ani zdjęcia stron trzecich; nie gwarantuje się wyłączności względem podobnych wyników AI.

# Zlecenie 79 — panoramy A+ (Francja i Szwajcaria)

**Data:** 2026-10-30  
**Zastosowanie:** `Cebulak Express — Kierunek Polska`, poziome panoramy miast (warstwa tła Canvas 2D).  
**Narzędzia:** wbudowany generator obrazów ChatGPT (GPT Image), Python 3, Pillow, OpenCV.  
**Przekazanie / prawa:** grafiki wygenerowano na zamówienie właściciela projektu i przekazano do wykorzystania w projekcie zgodnie z warunkami korzystania z OpenAI i właściwym prawem; nie wykorzystano gotowych grafik ani fotografii osób trzecich. Nie należy traktować samych generowanych kadrów jako gwarancji wyłącznej ochrony prawnoautorskiej.

## Wykaz plików

| Plik / ID | Miasto | Główne budowle i elementy | Inspiracja punktem widzenia | Źródło i obróbka | Przekazanie |
|---|---|---|---|---|---|
| `paryz.png` / `paryz` | Paryż | Wieża Eiffla w dzień, Łuk Triumfalny, Notre-Dame, kopuła Les Invalides; Sekwana i typowe kamienice | Szeroki, **stylizowany** przegląd miasta z wysokości, z zachodu ku północnemu wschodowi, inspirowany obserwacją z Montparnasse | Osobna generacja GPT Image; zmniejszenie i centrowanie, wyodrębnienie alfa, ujednolicenie linii | Grafika generowana dla właściciela projektu |
| `lyon.png` / `lyon` | Lyon | Bazylika Notre-Dame de Fourvière, historyczna Tour métallique de Fourvière, Vieux Lyon, kolorowe kamienice nad Saoną | Wschodni brzeg Saony w kierunku wzgórza Fourvière; kompozycja inspirowana panoramą od nabrzeża | Kadr z wygenerowanego arkusza GPT Image; usunięto współczesną Tour Part-Dieu, wybrano wycinek ze starą zabudową | Grafika generowana dla właściciela projektu |
| `lille.png` / `lille` | Lille | Stylizowany beffroi centrum, historyczne flamandzkie kamienice, zabudowa inspirowana Vieille Bourse / Grand-Place | Szeroka perspektywa starówki, **kompozycja** motywów z Grand-Place i pobliskich ulic, a nie dosłowny widok ze stałego punktu | Kadr z wygenerowanego arkusza GPT Image; wyczyszczenie podpisów, dodatkowe kontury | Grafika generowana dla właściciela projektu |
| `zurych.png` / `zurych` | Zurych | Grossmünster (dwie wieże), Fraumünster (zielony szpic), stare miasto, rzeka/jezioro i Alpy | Przybliżenie widoku od północnej części Limmat w stronę jeziora, z Alpami w tle | Kadr z wygenerowanego arkusza GPT Image; wyczyszczenie podpisów, dodatkowe kontury | Grafika generowana dla właściciela projektu |
| `genewa.png` / `genewa` | Genewa | Jet d’Eau nad Jeziorem Genewskim, historyczna zabudowa i **umowna** sylwetka katedry św. Piotra, Alpy (inspiracja Mont Blanc) | Panorama znad jeziora w stronę starego centrum; **artystyczne** rozmieszczenie Alp i zabudowy | Kadr z wygenerowanego arkusza GPT Image; wyczyszczenie podpisów, dodatkowe kontury | Grafika generowana dla właściciela projektu |

Wszystkie powyższe pliki: **PNG RGBA, 1620 × 900 px, profil ICC sRGB, tło przezroczyste, łącznie z obszarem nieba**. Linia terenu / wody przy dolnej krawędzi. Widoczne podpisy znajdują się **wyłącznie** na osobnym arkuszu podglądu `docs/art/podglady/panoramy-79.png`, nie w zasobach gry.

## Opis promptów do odtworzenia

> Wbudowany generator nie udostępnił dosłownego promptu maszynowego. Poniższe opisy oddają zastosowane założenia artystyczne i mogą służyć do odtworzenia ilustracji. Cztery miasta wydzielono z wielomiejskich arkuszy wygenerowanych przez GPT Image; oryginalnych kadrów nie kopiowano ze zdjęć.

### Paryż

„Panorama Paryża w dzień, jako osobny przezroczysty pasek ilustracji do gry, duża Wieża Eiffla po lewej, Łuk Triumfalny oraz katedra Notre-Dame, rzeka, kamienice z mansardami i drzewa; płaski kolor, gruby kontur ciemnogranatowy #1d2f3b, kształty czytelne po pięciokrotnym zmniejszeniu, światło z lewej góry, bez nieba, bez chmur, napisów, flag, marek, ludzi i nocnej iluminacji”.

### Lyon

„Panorama Lyonu od strony Saony: duża bazylika Notre-Dame de Fourvière na zielonym wzgórzu, historyczna metalowa wieża Fourvière, pastelowe domy Vieux Lyon nad nabrzeżem, most i pas rzeki; ciepła uproszczona ilustracja wektorowa, masywne budowle, kontur #1d2f3b, przezroczyste niebo, bez tekstu i nowoczesnych ikon architektury o niejasnych prawach”.

### Lille

„Lille: beffroi, barwne kamienice flamandzkie na Grand-Place, arkadowa historyczna zabudowa Vieille Bourse; rysunkowy styl A+, mało detali, duże bryły, płaskie światło od lewej, ciemny gruby kontur, przezroczyste niebo, bez napisów, logotypów i postaci”.

### Zurych

„Zurych: nad brzegiem Limmat dwie charakterystyczne wieże Grossmünster, zielony szpic Fraumünster, szeregi starych kamienic, niski most, jezioro i Alpy; ciepła wektorowa ilustracja z ciemnogranatowym konturem, przezroczystość, brak napisów i chmur, szeroka panorama do gry”.

### Genewa

„Genewa: wyraźna, wysoka fontanna Jet d’Eau na tafli Jeziora Genewskiego, stare miasto, sylwetka historycznej katedry na wzgórzu, Alpy w tle; uproszczone ciepłe płaskie barwy, grube ciemne obrysy, bez nieba, flag, marek, podpisów i ludzi, 16:9”.

## Obróbka i kontrola techniczna

1. Oddzielono pięć panoram z ilustracji GPT Image; Paryż wykorzystuje generację indywidualną.
2. Kadrowanie odrzuca podpisy i niepożądane fragmenty sąsiednich paneli. W Lyonie usunięto z kadrów współczesną Tour Part-Dieu, zastępując ją właściwym widokiem historycznej części miasta.
3. Rozdzielczość przeskalowano filtrem Lanczos do 1620 × 900 px, bez wypełniania nieba. Alfę oczyszczono z pikseli o bardzo małej widoczności; linie pogrubiono subtelną dylatacją ciemnych obrysów (OpenCV 3 × 3), a przy dolnej krawędzi dodano niski pas gruntu / wody.
4. Grafiki zapisano ze znacznikiem ICC sRGB. Podgląd na jasnoniebieskim tle jest osobnym plikiem i nie wpływa na przezroczystość zasobów.

## Uwagi do akceptacji i praw

- **To kompozycje artystyczne**, a nie fotogrametryczne odwzorowania jednego rzeczywistego punktu. Dla Lyonu, Lille i Genewy wymagana przez zlecenie pełna zgodność przestrzenna może wymagać dalszych poprawek. Należy ocenić je w rzeczywistym kadrze Canvas, po zmniejszeniu ok. 5×.
- W Lyonie **celowo nie pokazano Tour Part-Dieu**: to rozpoznawalny budynek autorstwa architektów współczesnych, a francuski wyjątek panoramy (CPI art. L122-5, pkt 11) wyłącza wykorzystanie komercyjne. Zamiast tego zachowano historyczną metalową wieżę Fourvière (1894).
- W Genewie katedra i masyw alpejski są celowo umowne. Jeśli dokładność jej architektury i położenia Mont Blanc jest kluczowa, przygotować korektę ręczną przed publikacją.
- Materiał źródłowy: własne generacje GPT Image. Żadna fotografia odniesienia nie została skopiowana piksel w piksel; nie umieszczono logotypów ani nocnej iluminacji Wieży Eiffla.

# Zlecenie 75 — Panoramy A+ BE/NL

**Data:** 30.10.2026  
**Narzędzie generujące:** wbudowany generator obrazów ChatGPT (GPT Image); kadrowanie, kompozycja i skalowanie: Pillow.  
**Format:** PNG, RGBA (kanał alfa), 1620 × 900 px, osadzony profil sRGB.  
**Licencja/użycie:** grafiki wygenerowane na potrzeby projektu i przekazane właścicielowi do użycia w grze i materiałach projektu, zgodnie z obowiązującymi warunkami usługi. Nie użyto zewnętrznych stocków ani kopiowania fotografii 1:1. Sam fakt wygenerowania AI nie gwarantuje wyłącznej ustawowej ochrony autorskiej.  
**Paleta i styl:** płaska ilustracja 2D z granatowym konturem, ciepłe kolory, najważniejsze bryły miasta, bez zewnętrznego nieba i napisów.  

| Plik (id) | Miasto | Budynki/sylwetki | Punkt widzenia | Źródło / narzędzie | Licencja |
|---|---|---|---|---|---|
| `bruksela.png` | Bruksela | Ratusz na Grand-Place (gotycka wieża), zabytkowe domy cechowe wokół placu | poziom placu Grand-Place; spojrzenie w stronę fasady Ratusza, historyczne pierzeje po bokach | ChatGPT GPT Image → Pillow | wygenerowane dla projektu |
| `antwerpia.png` | Antwerpia | katedra Najświętszej Marii Panny, średniowieczny zamek Het Steen, zabytkowa zabudowa nabrzeża | z Linkeroever, zachodniego brzegu Skaldy, na zabytkowe centrum Antwerpii (uproszczona perspektywa) | ChatGPT GPT Image → Pillow | wygenerowane dla projektu |
| `gandawa.png` | Gandawa | kościół św. Mikołaja, beffroi Gandawy, katedra św. Bawona; kamienice nad kanałem | okolice mostu św. Michała, widok na historyczne trzy wieże w kierunku centrum (uproszczona panorama) | ChatGPT GPT Image → Pillow | wygenerowane dla projektu |
| `amsterdam.png` | Amsterdam | wąskie XVII-wieczne kamienice kanałowe o różnych szczytach, łukowy most i barierki z rowerami | z przeciwległego brzegu kanału, panorama typu Brouwersgracht / kanały Grachtengordel (nie konkretna fasada ani numer domu) | ChatGPT GPT Image → Pillow | wygenerowane dla projektu |
| `rotterdam.png` | Rotterdam | biały most Erasmusa, wieża widokowa Euromast i współczesna zabudowa nad Mozą | południowy brzeg Nieuwe Maas w stronę północnego nabrzeża, sylwetki od zachodu ku wschodowi (perspektywa stylizowana) | ChatGPT GPT Image → Pillow | wygenerowane dla projektu |

## Prompty i opis korekt

### `bruksela.png` — Bruksela

**Prompt roboczy / specyfikacja dla generowania:**

> Samodzielna panorama Brukseli, gotycki ratusz i sąsiednie domy cechowe Grand-Place; styl A+ 2D, ciepłe płaskie kolory, granatowy gruby kontur, bez nieba, bez Atomium i tekstu, przezroczysty PNG.

**Korekta:** Odrębna grafika wygenerowana bezpośrednio dla Brukseli; dopasowanie wymiarów i marginesów.

### `antwerpia.png` — Antwerpia

**Prompt roboczy / specyfikacja dla generowania:**

> Samodzielna panorama Antwerpii znad Skaldy: wieża katedry NMP, Het Steen i niskie kamienice; bez MAS i innych współczesnych budowli; styl A+ 2D, gruby granatowy kontur, płaskie barwy, bez nieba, przezroczysty PNG.

**Korekta:** Wycięto indywidualny fragment z wygenerowanego przez ChatGPT arkusza pięciu sylwetek, dostosowano kadr i rozmiar; odrzucono inne miasta i obiekty poza wybranym widokiem. Usunięto z kadru muzeum MAS — z uwagi na niepewność dotyczącą komercyjnej eksploatacji jego chronionego wizerunku.

### `gandawa.png` — Gandawa

**Prompt roboczy / specyfikacja dla generowania:**

> Panorama Gandawy z trzema historycznymi wieżami we właściwej kolejności: św. Mikołaj, beffroi, św. Bawon; kamienice, mały most i kanał; bez Gravensteen; styl A+ 2D, gruby kontur, płaskie kolory, przezroczysty PNG.

**Korekta:** Wycięto indywidualny fragment z wygenerowanego przez ChatGPT arkusza pięciu sylwetek, dostosowano kadr i rozmiar; odrzucono inne miasta i obiekty poza wybranym widokiem. Usunięto z kadru Gravensteen, aby zachować rozpoznawalną sekwencję trzech wież.

### `amsterdam.png` — Amsterdam

**Prompt roboczy / specyfikacja dla generowania:**

> Panorama amsterdamskiego kanału z ciasnymi historycznymi kamienicami i mostem łukowym; bez dworca Centraal, bez tłumu, styl A+ 2D, grube granatowe kontury, płaskie kolory, bez nieba, przezroczysty PNG.

**Korekta:** Wycięto indywidualny fragment z wygenerowanego przez ChatGPT arkusza pięciu sylwetek, dostosowano kadr i rozmiar; odrzucono inne miasta i obiekty poza wybranym widokiem. Usunięto z kadru dworzec Centraal, niemożliwy do jednoczesnego ujęcia z tym fragmentem kanału.

### `rotterdam.png` — Rotterdam

**Prompt roboczy / specyfikacja dla generowania:**

> Panorama Rotterdamu: Euromast na zachód od Erasmusbrug, most i miejskie wieżowce nad Nieuwe Maas; bez domów kubicznych poza prawdziwą osią widoku, styl A+ 2D, gruby granatowy kontur, płaskie kolory, przezroczysty PNG.

**Korekta:** Wycięto indywidualny fragment z wygenerowanego przez ChatGPT arkusza pięciu sylwetek, dostosowano kadr i rozmiar; odrzucono inne miasta i obiekty poza wybranym widokiem. Wykonano odbicie poziome, aby Euromast znalazła się na zachód od mostu Erasmusa.

## Zgodność, geografia i ryzyka

- Zabytkowe sylwetki są ilustracjami generatywnymi, nie ścisłymi rekonstrukcjami perspektywicznymi ani dokumentacją architektoniczną. Przed wdrożeniem należy ocenić na ekranie gry rozpoznawalność oraz lokalną zgodność szczegółów.
- **Atomium** celowo pominięto: zarządca deklaruje konieczność uzyskania zgody na wykorzystanie wizerunku. **MAS** pominięto jako dodatkowe ograniczenie ryzyka komercyjnego w Belgii.
- W holenderskiej ustawie Auteurswet art. 18 istnieje wolność panoramy dla architektury znajdującej się na stałe w miejscach publicznych, przedstawianej w kontekście miejsca; nie jest to indywidualna porada prawna.
- Nie ma znaków towarowych, czytelnych szyldów, herbu państwowego, ludzi na pierwszym planie, flag państwowych ani znaków firmowych.
- Granatowy kontur i uproszczone fasady podlegają końcowej ocenie wizualnej koordynatora przy zmniejszeniu ok. 5× w grze. Ujęcia są syntetycznymi kompozycjami, nie fotografiami jednego obiektywu.

## Weryfikacja

- [x] 5 osobnych przezroczystych plików PNG 1620×900, sRGB
- [x] Arkusz `docs/art/podglady/panoramy-75.png` na jasnoniebieskim tle z podpisami
- [x] Bez Atomium i MAS, bez napisów na sprite’ach
- [x] Identyfikatory plików zgodne ze zleceniem
- [ ] Subiektywny test rozpoznawalności w kadrze Canvas 360×640 (koordynator)
- [ ] Testy aplikacji npm (brak checkoutu repo; brak dostępu GitHub z powłoki)

## Źródła orientacji oraz prawne

- Zabytki i układ panoram: przegląd zdjęć referencyjnych i opisów topograficznych; nie wykorzystano fotografii jako warstw obrazów.
- Atomium, informacje o prawach: https://atomium.be/copyright?lang=en
- Belgia: https://www.deauteurs.be/nieuws/panorama-uitzondering/
- Holandia, Auteurswet art. 18: https://www.wetten-overheid.nl/wet/BWBR0001886/artikel/18


<!-- Zlecenie 84 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 84: Panoramy A+ - dokumentacja zasobów

Data: **2026-10-31**. Narzędzie: **wbudowany generator obrazów ChatGPT (GPT Image)**, następnie Pillow (skalowanie, oczyszczenie kanału alfa, osadzenie profilu sRGB, montaż podglądu).

## Pliki

| ID | Miasto | Plik | Budowle i motywy | Punkt widzenia | Narzędzie i prawa |
|---|---|---|---|---|---|
| `dublin` | Dublin | `dublin.png` | Custom House z charakterystyczną zieloną kopułą; most O'Connell Bridge i kamienice nad Liffey | Stylizowane spojrzenie z południowego nabrzeża Liffey ku północno-wschodniemu brzegowi w okolicy O'Connell Bridge. Most na pierwszym planie, Custom House dalej na prawym skrzydle panoramy. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `wicklow` | Wicklow | `wicklow.png` | Ruiny Black Castle na cyplu; falochron i latarnia portowa Wicklow Harbour; zabudowa nadbrzeżna i zielone wzgórza | Umowny widok od strony morza w kierunku portu Wicklow: falochron po lewej, miasto w głębi, ruiny na skalistym cyplu po prawej. Sylwetki są uproszczone. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `cork` | Cork | `cork.png` | Wieża St Anne's Church (Shandon Bells, zegar i pozłacany łosoś); North Cathedral (St Mary and St Anne); most i kamienice nad rzeką Lee | Stylizowane spojrzenie z południowego brzegu północnej odnogi rzeki Lee na dzielnicę Shandon, z mostem na lewym skraju. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `limerick` | Limerick | `limerick.png` | King John's Castle; Thomond Bridge; katedra St Mary's Cathedral; nabrzeże Shannon | Stylizowane spojrzenie z zachodniego/południowo-zachodniego brzegu Shannon ku King's Island, z mostem Thomond po lewej, zamkiem pośrodku i katedrą z tyłu po prawej. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `barcelona` | Barcelona | `barcelona.png` | Sagrada Familia (uproszczona historyczna sylwetka czterech wież); kompleks Hospital de Sant Pau; zabudowa Eixample i palmy | Widok inspirowany osią Avinguda Gaudi od okolic Sant Pau w stronę Sagrada Familia. Perspektywa silnie skompresowana, zabytek w tle powiększony dla czytelności. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |

## Licencja i metodyka

- Wszystkie grafiki zostały wygenerowane specjalnie dla projektu; nie zawierają skopiowanych fotografii ani cudzych logotypów. Materiały zewnętrzne służyły weryfikacji miejsc i rozpoznawalnych sylwetek, nie były wklejane do generowanych PNG.
- Wykorzystanie i eksploatacja wygenerowanych wyników: na rzecz właściciela projektu, zgodnie z warunkami OpenAI; prawnoautorska ochrona samych materiałów AI może zależeć od jurysdykcji.
- Wszystkie pliki: 1620 x 900 px, RGBA, przezroczyste niebo i tło, profil sRGB, PNG.
- Kontury ciemnogranatowe, rysunkowe. Szerokość linii pochodzi z generatora i nie jest wszędzie ściśle 9-10 px: wymaga ewentualnego retuszu przed odbiorem produkcyjnym.
- Kompozycje są stylizowane. Zbliżenie budowli i kompresja dystansu są zabiegiem czytelności w grze, nie tworzą ściśle geodezyjnej rekonstrukcji konkretnej fotografii.
- W przypadku Barcelony zrezygnowano z wiernego przedstawiania współczesnych detali budowlanych Sagrada Familia; pokazano uproszczoną sylwetkę historycznej fasady Gaudiego. Nie umieszczono współczesnych ikon wymagających osobnych licencji.

## Prompty oraz źródła odniesienia

### dublin - Dublin

Widok: Stylizowane spojrzenie z południowego nabrzeża Liffey ku północno-wschodniemu brzegowi w okolicy O'Connell Bridge. Most na pierwszym planie, Custom House dalej na prawym skrzydle panoramy.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://heritageireland.ie/places-to-visit/custom-house-visitor-centre/; https://www.visitdublin.com/guides/best-views-dublin

Prompt generacyjny:

> Create a wide, sticker-like vector illustration on a transparent background, depicting a Dublin-inspired riverside panorama in a bold flat-cartoon style with thick dark outlines, clean cutout edges, and no people, vehicles, text, or sky. Show a teal river strip and stone quay along the bottom, a multi-arched block-stone bridge with ornate glowing lampposts on the left, warm Georgian brick buildings and layered green trees behind it, and a grand Custom House-style neoclassical building on the right with a pale symmetrical facade, colonnades, arched windows, rooftop ornaments, and a prominent teal-green domed drum topped by a finial.


### wicklow - Wicklow

Widok: Umowny widok od strony morza w kierunku portu Wicklow: falochron po lewej, miasto w głębi, ruiny na skalistym cyplu po prawej. Sylwetki są uproszczone.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://visitwicklow.ie/top-things-to-see-do-in-wicklow-town/; https://wicklowtown.ie/see-and-do-wicklow-town/black-castle-harbour

Prompt generacyjny:

> Panoramic flat-vector sticker illustration of a coastal Irish-style harbor on a transparent background, featuring a blue, wave-highlighted waterfront, a block-built breakwater and red-and-white banded lighthouse on the left, a tightly packed row of colorful slate-roofed seaside buildings at center, and a rocky, grassy castle ruin on the right. Rolling green hills, field patterns, trees, bold navy outlines, and simple comic-style shading complete the crisp horizontal scene, with no sky, people, text, or logos.


### cork - Cork

Widok: Stylizowane spojrzenie z południowego brzegu północnej odnogi rzeki Lee na dzielnicę Shandon, z mostem na lewym skraju.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://www.corkcity.ie/en/cork-heritage-open-day/buildings/sacred-spaces/st-anne-s-church-shandon/; https://www.discoverireland.ie/cork/shandon-bells-tower-st-anne-s-church

Prompt generacyjny:

> A crisp, sticker-like vector panorama depicts a colorful historic European riverside town on a transparent background, with a three-arched stone bridge at left, layered blue-green water and quay in front, and a lively row of pastel facades, trees, rooftops, chimneys, and dormers along the waterfront. Behind the town rises a Gothic cathedral with crenellations and spires, while a redbrick-and-stone clock tower church with a gold-accented clock, cupola, and fish-shaped weather vane anchors the right, all rendered in flat cel shading with bold dark outlines and no people, sky, or text.


### limerick - Limerick

Widok: Stylizowane spojrzenie z zachodniego/południowo-zachodniego brzegu Shannon ku King's Island, z mostem Thomond po lewej, zamkiem pośrodku i katedrą z tyłu po prawej.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://www.limerick.ie/discover/explore/recommended-trips/self-guided-walking-tour-of-historic-limerick-city; https://www.limerick.ie/discover/eat-see-do/history-heritage/historic-attractions/king-johns-castle

Prompt generacyjny:

> Panoramic cartoon vector cutout of a historic riverside town on a transparent checkerboard background, rendered with bold dark outlines, crisp flat/cel shading, and no sky: a colorful castle-and-church skyline rises behind a stone bridge, while a stylized blue-green river with angular ripples spans the foreground. A central medieval fortress features rounded towers, battlements, slit windows, slate roofs, and block-like stone shading; a Gothic church with spires stands to the right, warm townhouses and chimneys cluster on both banks, and bright green trees and shrubs fill the spaces, with the multi-arched lamp-lined bridge extending in from the left and all elements styled as a clean sticker/PNG asset.


### barcelona - Barcelona

Widok: Widok inspirowany osią Avinguda Gaudi od okolic Sant Pau w stronę Sagrada Familia. Perspektywa silnie skompresowana, zabytek w tle powiększony dla czytelności.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://santpaubarcelona.org/en/activitat/exhibition-the-sagrada-familia-and-the-hospital-de-sant-pau-a-living-memory/; https://sagradafamilia.org/en/

Prompt generacyjny:

> Panoramic cartoon-vector illustration on a transparent checkerboard background, styled like a crisp sticker with bold dark outlines, flat shading, and no people, text, or sky: a Barcelona-inspired streetscape runs from a richly ornamented Hospital de Sant Pau-like brick building on the left, through a tree- and palm-lined Eixample avenue, toward a distant Sagrada Familia-style cathedral on the right. Warm terracotta and cream architecture, teal domes and windows, ornate arches, balconies, greenery, fences, and receding mid-rise blocks create a colorful, layered city scene designed for easy compositing.

## Weryfikacja

- Lokalna kontrola wymiarow i kanału alfa: zaliczona dla 5/5 plikow.
- Podglad `docs/art/podglady/panoramy-84.png` prezentuje panoramy na jasnoniebieskim tle w skali podgladowej i 1:5.
- Nie uruchomiono testów aplikacji ani testow integracyjnych z Canvas (brak dostępu sieciowego do checkoutu w kontenerze).
- Przed finalnym scaleniem koordynator powinien sprawdzić czytelność w realnym kadrze gry i ewentualna korekte konturów / rozmiaru wzgórz oraz budowli.


<!-- Zlecenie 85 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS — Zlecenie 85: pięć panoram A+

**Projekt:** Cebulak Express — Kierunek Polska  
**Data generowania:** 2026-10-31  
**Narzędzie:** ChatGPT, wbudowany generator obrazów GPT Image; Pillow do dokładnego wymiaru, linii konturu i arkusza podglądowego.  
**Format końcowy:** 1620 × 900 px, PNG RGBA z przezroczystością oraz profilem sRGB.  
**Warunki użycia:** grafiki wygenerowane na potrzeby właściciela projektu, do wykorzystania w grze i materiałach projektu; bez zdjęć, logo i znaków firm trzecich. Ochrona prawnoautorska czysto generowanych obrazów może być ograniczona zależnie od jurysdykcji; nie deklaruje się wyłącznej ochrony autorskiej.  

| Plik | Miasto | Źródło / narzędzie | Prawa do użycia | Autor / uwagi |
|---|---|---|---|---|
| `girona.png` | Girona | ChatGPT GPT Image + Pillow | Grafika generowana dla projektu | Panorama A+, ciemnogranatowy kontur, przezroczystość |
| `madryt.png` | Madryt | ChatGPT GPT Image + Pillow | Grafika generowana dla projektu | Panorama A+, ciemnogranatowy kontur, przezroczystość |
| `walencja.png` | Walencja | ChatGPT GPT Image + Pillow | Grafika generowana dla projektu | Panorama A+, ciemnogranatowy kontur, przezroczystość |
| `mediolan.png` | Mediolan | ChatGPT GPT Image + Pillow | Grafika generowana dla projektu | Panorama A+, ciemnogranatowy kontur, przezroczystość |
| `werona.png` | Werona | ChatGPT GPT Image + Pillow | Grafika generowana dla projektu | Panorama A+, ciemnogranatowy kontur, przezroczystość |
| `docs/art/podglady/panoramy-85.png` | 5 miast | Pillow | Grafika zestawiająca własne pliki | Podgląd pełny i skala 1:5, jasnoniebieski podkład |

## Szczegóły, ujęcia i prompty

### `girona.png` — Girona

- **Budowle:** Kolorowe kamienice nad Onyar, bazylika Sant Feliu (wieża), katedra Santa Maria, kamienny most Pont de Pedra.
- **Punkt widzenia:** Stylizowany widok wzdłuż Onyar w kierunku Barri Vell od południowej strony rzeki; fasady na brzegu, zabytkowe wieże ponad dachami, łukowy most na lewym skraju.
- **Data:** 2026-10-31
- **Narzędzie i korekta:** ChatGPT GPT Image; Pillow (1620×900, wzmocnienie zewnętrznej obwódki #1d2f3b, RGBA/sRGB).
- **Prawa:** wygenerowane na zamówienie właściciela projektu, do użycia w produkcie; bez kopiowania zdjęć źródłowych.
- **Weryfikacja budowli:** https://www.girona.cat/turisme/eng/monuments_onyar.php ; https://www.visitacostabrava.com/en/girona/routes/bridges-of-girona-route
- **Prompt:**

```text
Panoramic, wide-format illustration of a European riverside city presented as a crisp, sticker-like PNG cutout with transparent background and no sky. The scene features colorful flat-shaded buildings, a stone arched bridge on the left, reflective river water below, dense greenery, and a cathedral complex with a Gothic bell tower rising above the warm Mediterranean-toned skyline.
```

### `madryt.png` — Madryt

- **Budowle:** Palacio Real i Catedral de la Almudena; na dole drzewa i nabrzeże Manzanares.
- **Punkt widzenia:** Panoramiczny widok od zachodu, z rejonu Madrid Río / Huerta de la Partida, ku historycznej skarpie miasta; Pałac Królewski po lewej i katedra po prawej.
- **Data:** 2026-10-31
- **Narzędzie i korekta:** ChatGPT GPT Image; Pillow (1620×900, wzmocnienie zewnętrznej obwódki #1d2f3b, RGBA/sRGB).
- **Prawa:** wygenerowane na zamówienie właściciela projektu, do użycia w produkcie; bez kopiowania zdjęć źródłowych.
- **Weryfikacja budowli:** https://www.madrid.es/portales/munimadrid/es/Inicio/Cultura-ocio-y-deporte/Cultura-y-ocio/Actividades-y-eventos/Madrid-Rio-informacion-ampliada/?idCapitulo=5941278 ; https://cityofmadridfilmoffice.com/en/madrid-scenic-points/
- **Prompt:**

```text
Panoramic vector-style illustration on a transparent checkerboard background, rendered as a clean, flat-shaded sticker with bold navy outlines, warm pastel stone, blocky shadows, and no sky, people, text, logos, or clouds. A grand palace fills the left side, while a domed cathedral with twin bell towers anchors the right, backed by layered green trees, terracotta-roofed buildings, and a stone riverside promenade with teal reflective water along the bottom.
```

### `walencja.png` — Walencja

- **Budowle:** Torres de Serranos, dzwonnica El Micalet i historyczna zabudowa katedralna.
- **Punkt widzenia:** Widok od strony dawnego koryta Turii (Jardín del Turia) ku Ciutat Vella; monumentalna brama na pierwszym planie, wieża Micalet wyżej w oddali po prawej.
- **Data:** 2026-10-31
- **Narzędzie i korekta:** ChatGPT GPT Image; Pillow (1620×900, wzmocnienie zewnętrznej obwódki #1d2f3b, RGBA/sRGB).
- **Prawa:** wygenerowane na zamówienie właściciela projektu, do użycia w produkcie; bez kopiowania zdjęć źródłowych.
- **Weryfikacja budowli:** https://www.comunitatvalenciana.com/en/valencia/valencia/monuments/the-serranos-towers ; https://www.turismovalencia.com/en/experiences-in-valencia/ciutat-vella-the-old-town
- **Prompt:**

```text
A crisp, sticker-like vector panorama depicts a historic Mediterranean city on a transparent checkerboard background, with no people, text, or sky: a warm beige, heavily outlined medieval gate-fortress dominates the center, featuring twin crenellated towers, slit windows, corbel arches, and a shadowed Gothic gateway. Pastel Spanish buildings, tiled roofs, greenery, cypress trees, and shrubs spread across the base, while an ornate bell tower, Gothic cathedral details, and a blue-domed roof rise just right of center, all rendered in flat ochre, terracotta, cream, and green blocks with subtle light and shadow.
```

### `mediolan.png` — Mediolan

- **Budowle:** Duomo di Milano, monumentalny portal Galleria Vittorio Emanuele II, historyczny żółty tramwaj.
- **Punkt widzenia:** Poziomy widok z rejonu zachodniej części Piazza del Duomo: katedra po prawej, wejście do Galerii po lewej, tramwaj jako akcent gry na dolnym skraju.
- **Data:** 2026-10-31
- **Narzędzie i korekta:** ChatGPT GPT Image; Pillow (1620×900, wzmocnienie zewnętrznej obwódki #1d2f3b, RGBA/sRGB).
- **Prawa:** wygenerowane na zamówienie właściciela projektu, do użycia w produkcie; bez kopiowania zdjęć źródłowych.
- **Weryfikacja budowli:** https://www.yesmilano.it/en/convention-bureau/milano-glance ; https://ordinearchitetti.mi.it/en/cultura/itinerari-di-architettura/37-milano-e-lunita-ditalia/opere/604-piazza-del-duomo-e-galleria-vittorio-emanuele-ii/galleria
- **Prompt:**

```text
A clean, panoramic vector-style cutout of Milan’s Piazza del Duomo is shown on a transparent background, featuring bold dark outlines, warm pastel architecture, simplified shading, no sky or people, and a street-level strip with trees, ornate lamps, and a vintage yellow-orange tram. The Galleria Vittorio Emanuele II anchors the left, the richly detailed Gothic Duomo with blue stained-glass accents and a golden-topped central spire dominates the center-right, and warm-toned buildings, arcades, greenery, and a small pointed tower complete the scene.
```

### `werona.png` — Werona

- **Budowle:** Ponte Pietra na Adydze, kościół Sant’Anastasia, Torre dei Lamberti, historyczne dachy.
- **Punkt widzenia:** Artystycznie uproszczona, podwyższona perspektywa z okolic Castel San Pietro w stronę starego miasta i Adygi: most na pierwszym planie, wieże za nim. Arena świadomie pominięta, by nie sugerować fałszywej bliskości i skali.
- **Data:** 2026-10-31
- **Narzędzie i korekta:** ChatGPT GPT Image; Pillow (1620×900, wzmocnienie zewnętrznej obwódki #1d2f3b, RGBA/sRGB).
- **Prawa:** wygenerowane na zamówienie właściciela projektu, do użycia w produkcie; bez kopiowania zdjęć źródłowych.
- **Weryfikacja budowli:** https://www.italia.it/en/veneto/verona/fortezza-di-castel-san-pietro ; https://www.visitverona.it/en/poi/castle-san-pietro
- **Prompt:**

```text
Create a crisp, sticker-like vector panorama of a Verona-inspired riverside town on a transparent checkerboard background, with thick dark navy outlines, flat shading, and warm Mediterranean hues. Center the scene on a turquoise river crossed by a multi-arched Ponte Pietra–style stone bridge, framed by greenery and retaining walls, with terracotta-roofed pastel buildings, a tall striped-brick church and spire on the left, a prominent orange-brick clock tower near the center-right, and fortified hilltop walls and cypress trees on the right—no people, text, or sky.
```

## Uwagi do integracji i weryfikacji

- Pliki podmienią poprzednie panoramy `public/assets/landmarks/<id>.png`, jeżeli takie występowały; nie zmieniają kodu renderera.
- Panorama jest **autorską ilustracją i graficznym uproszczeniem perspektywy**, a nie geometryczną rekonstrukcją zdjęcia ani widokiem kartograficznym.
- W panoramie Werony nie umieszczono dużej sylwetki Areny: przy ujęciu Ponte Pietra w pierwszym planie groziłoby to nieprawdziwą perspektywą i skalą. Jeżeli Arena ma być obowiązkowa, zalecana jest odrębna panorama/alternatywne ujęcie miasta.
- Miniatury 1:5 służą ocenie czytelności na ekranie gry. Obwódki mają ciemnogranatowy kolor; szczegółowość ornamentyki wygenerowanej przez model jest miejscami wyższa niż w wymaganiach stylu A+ i wymaga akceptacji koordynatora.
- **QA techniczne:** sprawdzenie formatów PNG RGBA, rozdzielczości, kanału alfa i podglądu. Nie sprawdzono faktycznego kadru gry ani builda aplikacji, bo w środowisku generującym nie był dostępny kod projektu.


<!-- Zlecenie 86 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 86 — panoramy A+ (Padwa, Mestre, Udine, Rzym, Bolonia)

**Data przygotowania:** 31.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Przeznaczenie:** tła/panoramy miast w grze, z prawem użycia przez właściciela projektu.  
**Format wszystkich plików:** 1620 × 900 px, PNG RGBA, przezroczyste niebo, profil sRGB (ICC), grunt przy dolnej krawędzi.  
**Technika:** generacja koncepcji wbudowanym generatorem ChatGPT (GPT Image), oddzielenie poszczególnych scen z wygenerowanych kompozycji, autorskie retusze wektorowe (SVG/CairoSVG), przeskalowanie, usunięcie napisów, podkreślenie zewnętrznych konturów (Pillow/OpenCV). Kolory płaskie/ciepłe, ciemnogranatowy kontur `#1d2f3b`. Zdjęcia źródłowe służyły tylko do weryfikacji obiektów i nie zostały skopiowane do plików.

## Zasoby

| Plik | Miasto | Dominujące obiekty | Punkt widzenia / charakter kompozycji | Narzędzie | Licencja i uwagi |
|---|---|---|---|---|---|
| `padwa.png` | Padwa / Padova | Torre dell'Orologio (tarcza astronomiczna), Palazzo del Capitanio, Palazzo dei Camerlenghi i arkady | Piazza dei Signori, widok na zachodnią pierzeję z wieżą pośrodku (stylizowany) | ChatGPT GPT Image + Pillow/OpenCV | Oryginalna generacja i korekta na potrzeby projektu, bez treści obcych |
| `mestre.png` | Mestre | motyw historycznej Torre Civica z zegarem i blankami, arkadowe kamienice, most i kanał w mieście | **Kompozycja motywów**, nie dokładny widok z jednego miejsca: Torre Civica należy do Piazza Ferretto, a kanał odwołuje się do Marzenego | ChatGPT GPT Image + retusz SVG/CairoSVG/Pillow | Oryginalna generacja i korekta na potrzeby projektu; **do akceptacji koordynatora pod kątem autentyczności układu** |
| `udine.png` | Udine | Castello di Udine na wzgórzu, wieżowe akcenty Piazza della Libertà (Torre dell'Orologio / Loggia di San Giovanni), widok Alp | **Kompozycja motywów** z centrum i krajobrazu Friuli, nie dosłowne zdjęcie z jednego punktu | ChatGPT GPT Image + Pillow/OpenCV | Oryginalna generacja i korekta na potrzeby projektu; kompresja perspektywy |
| `rzym.png` | Rzym / Roma | Koloseum (Colosseo), łuk Konstantyna (Arco di Costantino) | Rejon Via di San Gregorio, zabytki są rzeczywiście sąsiadujące; łuk dorysowany niezależnie, zamiast nierealistycznego zestawienia z Watykanem | ChatGPT GPT Image + autorski SVG/CairoSVG/Pillow | Oryginalna generacja i korekta na potrzeby projektu, budowle starożytne |
| `bolonia.png` | Bolonia / Bologna | Torre degli Asinelli (wyższa), Torre Garisenda (niższa), historyczne arkady i kościelna bryła okolicy Piazza di Porta Ravegnana | Stylizowany widok rejonu Via Rizzoli / Piazza di Porta Ravegnana, w kierunku Due Torri | ChatGPT GPT Image + Pillow/OpenCV | Oryginalna generacja i korekta na potrzeby projektu, budowle historyczne |
| `../../../../docs/art/podglady/panoramy-86.png` | Arkusz pięciu panoram | Wszystkie pięć prac z podpisami **poza** grafikami przeznaczonymi do gry | Podgląd na jasnoniebieskim tle | Pillow | Oryginalna kompozycja pomocnicza |

**Warunki wykorzystania:** zasoby wygenerowano dla właściciela projektu do komercyjnego wykorzystania w grze i materiałach promocyjnych, zgodnie z właściwymi warunkami korzystania z narzędzi. Nie użyto cudzych zdjęć, logotypów, nazw handlowych, flag, herbów ani prawnie zastrzeżonych współczesnych ikon architektury. Generacja AI sama w sobie nie gwarantuje wyłączności ochrony prawnoautorskiej.

## Prompty koncepcyjne i poprawki

Poniższe opisy odtwarzają założenia generacji i retuszu konkretnych scen (automatyczny generator nie udostępnił w metadanych pełnego tekstu własnego promptu).

**Padwa — `padwa.png`**

> Panorama A+, płaska ciepła ilustracja wektorowa; Piazza dei Signori w Padwie z zachodnią pierzeją, centralna wieża Torre dell'Orologio ze złoto-niebieskim zegarem astronomicznym, po bokach renesansowe pałace arkadowe; rozpoznawalna proporcja wieży do kamienic, bardzo grube ciemnogranatowe kontury, duże bryły, bez ludzi, napisów, logotypów, flag, nieba i chmur; PNG przezroczyste.

Retusz: jeden duży wycinek z wygenerowanego obrazu, skala do 1620 × 900, usunięcie drobnych artefaktów, silniejsza obwódka sylwetek, linia gruntu.

**Mestre — `mestre.png`**

> Panorama A+, historyczne Mestre w ciepłych kolorach; motyw czerwonej wieży zegarowej Torre Civica i zabudowy centrum, kanał miejski z łukowym mostem w pierwszym planie; duże bryły, ciemnogranatowe grube obrysy, brak nieba i chmur, bez osób, napisów, marek i flag; przezroczyste tło.

Retusz: wycięcie kompozycji miejskiej, zastąpienie fantazyjnego dachu głównej wieży blankami i dorysowanie tarczy zegara; usunięcie podpisu. **Uwaga:** kanał i Piazza Ferretto nie są tu faktycznym pojedynczym kadrem — to wizualny skrót; jeśli priorytetem jest jeden realny punkt widzenia, należy zamienić wersję na ujęcie samej Piazza Ferretto.

**Udine — `udine.png`**

> Panorama A+, widok na zamek Castello di Udine dominujący na wzgórzu i tradycyjne budynki Piazza della Libertà u podnóża, arkady i wieże zegarowe, zarys alpejskich grzbietów w tle; płaska paleta terakota, krem, oliwkowa zieleń; mocne granatowe linie, prostsze okna; brak tekstu, nieba, ludzi i logotypów; PNG alpha.

Retusz: oddzielenie sylwetki z wygenerowanego arkusza, usunięcie etykiety, wzmocnienie granic koloru i dolna linia gruntu. **Uwaga:** góry i zamek nie muszą być widoczne dokładnie w takiej relacji z Piazza della Libertà z jednego punktu.

**Rzym — `rzym.png`**

> Monumentalna panorama A+ z rejonu Koloseum: wielkie Colosseo po lewej, Arco di Costantino po prawej, prawidłowe sąsiedztwo zabytków; wyraźne wielopiętrowe arkady amfiteatru, trzy prześwity łuku, piaskowcowo-terakotowe kolory, grube kontury granatowe, płaskie plamy światła z lewej, bez nieba, ludzi, tekstu i szyldów, PNG alpha.

Retusz: wykorzystano tylko wygenerowany fragment Koloseum; odrzucono fantazyjny widok Watykanu nad Tybrem; łuk Konstantyna wykonano od nowa jako uproszczoną ilustrację SVG w celu zachowania poprawnego sąsiedztwa i czytelności w grze.

**Bolonia — `bolonia.png`**

> Panorama A+ historycznego centrum Bolonii: Torre degli Asinelli znacznie wyższa niż Torre Garisenda, czerwone cegły, kamienice z arkadami, zabytkowy kościół i kopuła rejonu Piazza di Porta Ravegnana, widok od Via Rizzoli; ciepłe płaskie barwy, ciemnogranatowy gruby kontur, bez nieba, napisów, flag i ludzi; PNG z alfą.

Retusz: wycinek wygenerowanej sceny, korekta geometrii płótna i konturów, usunięcie podpisu, dodanie linii gruntu.

## Weryfikacja architektury (fotografie jako referencje, nie użyte w plikach)

- Padwa: [Turismo Padova — Piazza dei Signori](https://www.turismopadova.it/luogo/piazza-dei-signori/) i [Padova Cultura — The Clock Tower](https://padovacultura.padovanet.it/en/musei/clock-tower-0).
- Mestre: [Comune di Venezia — historia Torre Civica](https://www.comune.venezia.it/it/node/25388), [Venezia Unica — Piazza Erminio Ferretto](https://www.veneziaunica.it/it/cosa-fare-a-venezia/spazi-pubblici/piazza-erminio-ferretto).
- Udine: [Italia.it — Piazza della Libertà](https://www.italia.it/it/friuli-venezia-giulia/udine/piazza-della-liberta), [Italia.it — Castello i Alpy](https://www.italia.it/it/friuli-venezia-giulia/cosa-fare/udine-cosa-vedere-nella-venezia-del-friuli).
- Rzym: [Parco archeologico del Colosseo — oficjalna strona](https://colosseo.it/).
- Bolonia: [Bologna Welcome — Due Torri](https://www.bolognawelcome.com/en/places/towers-historic-buildings/the-two-towers-garisenda-and-degli-asinelli-eng?gttd_currency=EUR&gttd_lang=it-IT), [Palazzo Strazzaroli — widok na wieże i pobliską bazylikę](https://www.palazzostrazzaroli.com/en/location).

## Kontrola techniczna

- [x] Pięć osobnych plików PNG 1620×900, RGBA.
- [x] sRGB ICC w każdym PNG.
- [x] Alfa (bez nieba/chmur); linia podłoża przy dolnej krawędzi.
- [x] Grube zewnętrzne kontury z kolorem `#1d2f3b`.
- [x] Nazwy miast wyłącznie na arkuszu podglądu.
- [x] Arkusz `docs/art/podglady/panoramy-86.png`.
- [ ] Ostateczna akceptacja autentyczności kompozycji Mestre i Udine przez koordynatora.
- [ ] Weryfikacja panoram w kadrze gry przez koordynatora.
- [ ] Testy repo (`npm ci`, `typecheck`, `test`, `build`) — brak dostępu Git z kontenera wykonawczego; nie zmieniano kodu.


<!-- Zlecenie 87 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 87 — panoramy A+ (Austria)

**Data przygotowania:** 2026-10-31  
**Projekt:** Cebulak Express — Kierunek Polska  
**Format plików:** PNG RGBA, 1620 × 900 px, przezroczyste tło (bez nieba), dolna linia gruntu lub wody.  
**Narzędzia:** natywny generator obrazów ChatGPT (GPT Image / DALL·E) + korekta końcowa w Pythonie (Pillow, OpenCV): wyodrębnienie pojedynczych panoram z generacji, skalowanie, oczyszczenie kanału alfa, usunięcie napisów i artefaktów, dodanie linii dolnej.  
**Licencja i przeznaczenie:** grafiki wygenerowane na zamówienie projektu; prawa do uzyskanych wyników przysługują właścicielowi projektu w zakresie przewidzianym warunkami usługi OpenAI i obowiązującym prawem. Brak wklejonych zdjęć stron trzecich, logotypów, flag i znaków towarowych. Materiały referencyjne posłużyły wyłącznie do sprawdzenia rozpoznawalności zabytków, nie były kopiowane piksel po pikselu.

## Inwentarz

| Plik (id) | Miasto | Motywy w ilustracji | Umowny punkt widzenia / założenie | Narzędzie | Data | Prawa/licencja |
|---|---|---|---|---|---|---|
| `villach.png` (`villach`) | Villach, Austria | Wieża kościoła St. Jakob, historyczna zabudowa nabrzeża Drawy, most, alpejski horyzont | Północna strona Drawy, patrząc na stare miasto | ChatGPT GPT Image + Pillow/OpenCV | 2026-10-31 | wygenerowane AI; prawa do wyniku po stronie właściciela projektu według warunków usługi i prawa |
| `graz.png` (`graz`) | Graz, Austria | Uhrturm na zalesionym Schlossbergu, czerwone dachy starówki, historyczne wieże i kopuły kościołów | Z zachodniej części śródmieścia w kierunku Schlossbergu | ChatGPT GPT Image + Pillow/OpenCV | 2026-10-31 | jw. |
| `wieden.png` (`wieden`) | Wiedeń, Austria | Historyczna kopułowa fasada w stylistyce Hofburga, gotycka sylwetka Stephansdomu, czerwono-biały tramwaj | **Kolaż ikon historycznego Wiednia**, nawiązujący do Ringstraße; nie jest odwzorowaniem jednego ścisłego geograficznie kadru | ChatGPT GPT Image + Pillow/OpenCV | 2026-10-31 | jw. |
| `linz.png` (`linz`) | Linz, Austria | Linzer Schloss na wzgórzu, wieża Mariendom, zabudowa starego miasta, most na Dunaju | Z północnego nabrzeża Dunaju (Urfahr), ku staremu miastu | ChatGPT GPT Image + Pillow/OpenCV | 2026-10-31 | jw. |
| `salzburg.png` (`salzburg`) | Salzburg, Austria | Twierdza Hohensalzburg, barokowe wieże i kopuły w rejonie katedry, kolorowe domy, nabrzeże Salzach | Z prawego (wschodniego) brzegu Salzach ku staremu miastu i Festungsberg | ChatGPT GPT Image + Pillow/OpenCV | 2026-10-31 | jw. |

## Prompty dokumentacyjne (odtwarzalne)

Poniższe teksty opisują zamówioną kompozycję i mogą być użyte do ponownego wygenerowania zasobów. **Nie są dosłownym zapisem wewnętrznych promptów generatora** — narzędzie nie udostępniło ich tekstu w metadanych. W trakcie generacji powstały także plansze wielomiejska; cztery pojedyncze panoramy zostały z nich wyodrębnione i poprawione ręcznie/skryptowo.

**Wspólna instrukcja A+:**

> Independent 16:9 panoramic game background on transparent RGBA canvas; flat, warm, playful vector illustration, no photography, no sky and no clouds, no gradients; simplified large architectural silhouettes with thick dark navy #1d2f3b outline around 9–10 pixels at final 1620 × 900 resolution, flat shapes, sunlight from upper-left. Emphasize two to four recognizable historical landmarks, together occupying about 70–80% of image height; low historic townhouses as a simple base. Ground, river or grass along bottom 0–40 pixels. No signs, names, logos, text, flags, coats of arms, close-up people or copyrighted contemporary architecture.

**`villach.png`:**

> Villach, Carinthia, Austria, viewed across the Drau river toward the historic centre. Dominant tall free-standing neo-Gothic spire of St Jakob parish church, red-roofed old-town façades, a broad river bridge in front, distant Alpine foothills and mountains. Keep the relative scale of the church tower impressive, simplify building windows and use clear warm pastel colors. Single standalone panorama only.

**`graz.png`:**

> Graz, Styria, Austria: city centre as seen toward the wooded Schlossberg with the iconic square Uhrturm clock tower and its steep dark roof, low red-tiled rooftops and historic church towers below. The hill and clock tower dominate; three or fewer other landmarks, no modern Kunsthaus or Murinsel. Large simplified silhouettes and navy outlines. Single standalone panorama only.

**`wieden.png`:**

> Vienna, Austria: warm, flat-vector stylization of the historic Ringstraße skyline, a monumental imperial palace façade with a copper-green cupola evoking Hofburg, distinctive Gothic Stephansdom silhouette, a generic red-and-white vintage Viennese tram in front, leafy roadside trees. No signs or vehicle logos. This is a symbolic city montage, not a single-lens view; replace with a geographically strict Karlsplatz/Karlskirche composition if required. Single standalone panorama only.

**`linz.png`:**

> Linz, Austria: view from across the Danube toward the old town. The historic Linzer Schloss palace on a green slope to the left, the tall **single** Gothic spire of Mariendom to the right, flat pastel houses along the bank, the river and a simple bridge. No Lentos or Ars Electronica building. Reduced details, bold outlines. Single standalone panorama only.

**`salzburg.png`:**

> Salzburg, Austria: view from the east bank of the Salzach across the UNESCO old town. The large, cream-coloured medieval Hohensalzburg Fortress sits on a wooded Festungsberg above the monumental baroque Salzburg Cathedral with its green dome and two towers, plus a few other old church towers and riverside houses. No sky, no text, thick navy outlines. Single standalone panorama only.

## Referencje dotyczące zabytków i widoków

- **Villach:** oficjalne informacje o St. Jakob i wieży: <https://www.visitvillach.at/en/villach-stadt/info/stadtpfarrkirche-st-jakob.html>, <https://villach.at/getmedia/0da6ed25-6fcf-492b-9947-5a94a1727db7/Folder_Stadtpfarrturm_2024.pdf.aspx>.
- **Graz:** oficjalna charakterystyka i widoki Uhrturmu: <https://www.graztourismus.at/en/sightseeing-culture/sights/clock-tower_shg_1488>, <https://www.graz-schlossberg.at/uhrturm-graz/>.
- **Wiedeń:** kopuła Hofburga i historyczna Ringstraße: <https://www.wien.info/en/art-culture/imperial-sights/imperial-palace-348842>; dla ewentualnej wersji spójnej z jednego punktu — Karlskirche i Musikverein: <https://www.wien.info/en/see-do/sights-from-a-to-z/st-charles-church-359636>, <https://www.wien.info/en/art-culture/music-stage-shows/classic/musikverein-353398>.
- **Linz:** Schloss na wzgórzu i Mariendom: <https://www.linztourismus.at/en/leisure/discover-linz/worth-seeing/top10/linz-castle-and-old-town>, <https://www.linztourismus.at/freizeit/linz-entdecken/sehenswertes/historische-bauten-und-plaetze/kirchen/mariendom>; nabrzeże przy Urfahr: <https://www.linztourismus.at/freizeit/linz-entdecken/aktivitaeten/for-free/natur/wandern>.
- **Salzburg:** Hohensalzburg, katedra i punkt widokowy: <https://www.salzburg.info/en/hohensalzburg-fortress_az_7955>, <https://www.salzburg.info/en/sights/churches-cemeteries/salzburger-cathedral>, <https://webserver.salzburg.info/en/hotels-offers/guided-tours/city-walks/instagrammable-salzburg>.

## QA i ograniczenia

- Wszystkie pięć plików: PNG RGBA 1620 × 900, przezroczysty lewy górny narożnik i przezroczyste niebo, sylwetki wyciągnięte do dolnej krawędzi.
- Arkusz porównawczy: `docs/art/podglady/panoramy-87.png` (2040 × 1020, jasnoniebieskie tło, podpisy **wyłącznie na arkuszu**).
- Wygenerowane ilustracje **nie są pomiarowymi rekonstrukcjami** fasad i kadru. Zwłaszcza `wieden.png` zestawia w jednej ilustracji Hofburg i Stephansdom, które nie tworzą takiej sceny z jednego rzeczywistego punktu; ten wariant wymaga decyzji koordynatora i ewentualnej wymiany przed ostateczną akceptacją kryterium geograficznego.
- Brak dostępu sieciowego z kontenera do GitHub: nie zweryfikowano stylu z `docs/art/probki-panoram/`, nie wykonano `git pull`, nie powstała gałąź ani draft PR; pliki dostarczono do ręcznej integracji przez ZIP.
- Nie uruchomiono skryptów npm/CI ani testu w klatce gry; nie było źródłowego repozytorium w środowisku.


<!-- Zlecenie 88 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 88 — panoramy A+ (Finlandia i Szwecja)

**Data:** 2026-10-31. **Projekt:** Cebulak Express — Kierunek Polska.  
**Format:** PNG 1620 × 900, RGBA, przezroczyste niebo, grunt/nabrzeże u dołu.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image / DALL·E), kadrowanie i obróbka PNG w Pythonie (Pillow, OpenCV).  
**Prawo wykorzystania:** na potrzeby właściciela projektu, zgodnie z warunkami OpenAI. Wygenerowane obrazy nie zapewniają same w sobie gwarancji wyłącznych praw autorskich.

## Spis plików i scen

| Plik / id | Miasto | Główne sylwetki | Założony punkt obserwacji | Narzędzie / pochodzenie |
| --- | --- | --- | --- | --- |
| `helsinki.png` / `helsinki` | Helsinki (FI) | Katedra Helsińska (biała bryła, zielona kopuła), Sobór Uspieński (czerwona bryła i cebulaste kopuły), Stara Hala Targowa i pierzeja portowa | Od strony południowego portu, na zabudowę i katedry, z wodą w dolnym pasie | ChatGPT, ilustracja pojedyncza; Pillow/OpenCV |
| `tampere.png` / `tampere` | Tampere (FI) | XIX-wieczne czerwone fabryki Finlayson, komin przemysłowy, wieża Näsinneula, zabudowa młyna nad Tammerkoski | Schematycznie znad Tammerkoski w kierunku historycznych fabryk | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `turku.png` / `turku` | Turku (FI) | Katedra w Turku, historyczna klasycystyczna kamienica w centrum, zabudowa nad rzeką Aura i żaglowce | Z przeciwnego brzegu rzeki Aura w stronę katedry | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `goteborg.png` / `goteborg` | Göteborg (SE) | Most Älvsborgsbron, wieżowiec Lilla Bommen („Läppstiftet”), zabudowa nabrzeża i wieża historycznego kościoła, żaglowiec | Uogólniona szeroka perspektywa znad rzeki Göta älv | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `helsingborg.png` / `helsingborg` | Helsingborg (SE) | Ceglana wieża Kärnan, historyczna zabudowa centrum, prom na cieśninie Öresund | Od strony wody na wschodnie wybrzeże cieśniny | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `docs/art/podglady/panoramy-88.png` | Pięć miast | Arkusz podglądu na jasnoniebieskim tle z podpisami | Nie dotyczy | Pillow (z plików źródłowych, podpisy tylko na arkuszu) |

**Licencja / uwagi dla pięciu panoram:** wygenerowane w ChatGPT (GPT Image / DALL·E); dobór obiektów, kadrowanie, eliminacja elementów niezamierzonych, powiększenie, czyszczenie kanału alfa i wzmocnienie granatowego konturu: autor opracowania w ramach zlecenia dla właściciela projektu. Brak fotografii ani marek użytych w finalnych plikach. Zdjęcia/witryny turystyczne wykorzystano wyłącznie do weryfikacji obiektów, a nie do bezpośredniego kopiowania pikseli.

## Prompty odtworzeniowe

Zalecany wspólny prefiks dla **każdego** promptu:  
> Single continuous 16:9 transparent PNG skyline for a cheerful mobile game, flat warm-colour vector illustration, very bold uniform dark navy #1d2f3b outlines approximately 9–10 px at 1620×900, simple big recognizable architectural shapes, buildings occupy about 70–80 percent of image height, light from upper-left with flat hard-edged shading, simplified rectangular windows, historic proportions, readable when shrunk 5x. No sky, clouds, gradient, paper/photo texture, text, flags, logos, branding or people in foreground. Water or quayside only in bottom 0–40 pixels.

### `helsinki.png`

> Helsinki, Finland seen across the South Harbour facing the historic city: white Helsinki Cathedral with one big green central dome and smaller green domes on the left, red brick Uspenski Orthodox Cathedral with dark green onion domes on the right, a low warm-yellow harbourfront including the Old Market Hall in front, a small unbranded green tram and small white harbour ferries. Preserve legible skyline masses; one uninterrupted panorama on transparent background.

### `tampere.png`

> Tampere, Finland seen toward the Tammerkoski industrial riverscape: large red-brick nineteenth-century Finlayson factory mill buildings and tall brick chimney, recognisable slender Näsinneula observation tower in the distance, a compact step of foaming rapids and simple waterside blocks, deep green deciduous trees. Bold dark blue strokes, no sky or writing; one uninterrupted panorama on transparent background.

### `turku.png`

> Turku, Finland viewed from the opposite bank of the Aura River toward Turku Cathedral: large medieval reddish-brick cathedral with a tall dark-patinated green steeple as the focal point, modest historic low-rise classical waterfront facades and trees, two small unbranded sailing boats and a narrow quay line. Turku Castle must NOT be included because it is kilometres away and not visible at this scale from this viewpoint. Single uninterrupted game-layer panorama on transparent background.

### `goteborg.png`

> Gothenburg, Sweden maritime panorama from Göta älv: the landmark turquoise suspension bridge Älvsborgsbron at the left edge, the slender red-and-white tower Lilla Bommen/Läppstiftet and historic downtown roofscape, an anonymous multi-masted sailing ship below and quay structures. Huge simple shapes, no words or flags, no photo realism, no sky. NOTE: very wide geographically compressed illustrative view, not a photographically exact viewing angle.

### `helsingborg.png`

> Helsingborg, Sweden seen from the Öresund strait: medieval red-brick square keep Kärnan with a battlemented top standing above old waterfront houses, terraced greenery on the ridge and a white-and-blue generic unbranded passenger ferry on the strait. Simplified historical surroundings, not a reconstructed castle. One continuous transparent vector-style skyline without labels or flags.

**Uwaga techniczna:** prompty powyżej to kompletne prompty odtworzeniowe opisujące pożądane sceny. W tej sesji narzędzie generowało też arkusze wielomiejskiе; cztery kadry z arkuszy zostały wyodrębnione, a następnie przeskalowane do 1620×900. Nie należy ich traktować jako pięciu natywnych renderów w tej rozdzielczości. Powiększenie nie dodaje rzeczywistych szczegółów obrazu.

## Sprawdzenie i ograniczenia

- Wszystkie pięć PNG: 1620×900, RGBA, przezroczysta górna część, kontury w kolorze ciemnogranatowym, bez podpisów w samych panoramach.
- Błędy modeli obrazu ograniczono ręcznym kadrowaniem; w szczególności usunięto **fałszywe sąsiedztwo zamku Turku i katedry**.
- **Perspektywa nie jest w pełni kartograficzna:** Tampere i Göteborg są ilustracyjną syntezą obiektów z różnych odległości, a architektura drugiego planu Helsingborga została uproszczona. Przed przyjęciem do gry: kontrola rozpoznawalności przez mieszkańca i próbny render przy skali około 1/5.
- Wygenerowane źródła arkuszowe miały mniejszą rozdzielczość poszczególnych miast, więc dla finalnej produkcji warto zlecić dopracowanie każdego z czterech kadrów osobno w natywnej rozdzielczości. To **nie jest weryfikacja jakości A+** przez właściciela.
- `npm ci`, `npm run typecheck`, `npm test`, `npm run build` — **nie uruchomiono**: środowisko nie mogło sklonować repozytorium (`github.com` DNS); te pliki są wyłącznie graficzne i nie edytują TS.

## Źródła do weryfikacji obiektów (nie są licencjami na fotografie)

- Helsinki: [MyHelsinki, Helsinki Cathedral](https://www.myhelsinki.fi/places/helsinki-cathedral/), [Port of Helsinki](https://www.portofhelsinki.fi/en/passengers/information-for-passengers/things-to-do-in-helsinki/).
- Tampere: [Visit Tampere, atrakсje](https://visittampere.fi/en/articles/tampere-top-attractions/), [Finlayson](https://visittampere.fi/en/destination/finlayson-area/).
- Turku: [Visit Turku, Aura Riverside](https://en.visitturku.fi/the-aura-riverside-explore-local), [Miasto Turku, Cultural Waterfront](https://www.turku.fi/en/a-city-of-culture-under-renewal/cultural-waterfront).
- Göteborg: [Göteborg, Älvsborgsbron](https://www.goteborg.com/en/guides/10-instagram-places-in-gothenburg), [Göteborg, punkty widokowe i symboliczne miejsca](https://www.goteborg.com/en/attractions/viewpoints).
- Helsingborg: [Helsingborg.se, Kärnan](https://helsingborg.se/uppleva-och-gora/kultur-och-museer/the-keep-of-helsingborg/).
- Budynki mogą być swobodnie przedstawiane na mocy fińskiego [§25a ustawy o prawie autorskim](https://www.finlex.fi/en/legislation/1961/404/amendment-history/20230263) i szwedzkiego [§24 ustawy o prawie autorskim](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1960729-om-upphovsratt-till-litterara-och_sfs-1960-729/). Nie dotyczy odrębnych praw do zdjęć; żadne cudze zdjęcie nie jest składnikiem finalnych PNG.


<!-- Zlecenie 89 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

> **Koordynator:** odrzucono nykoping (prawa część to doklejony płaski blok wody i mostu bez konturu); zostaje poprzednia wersja, ponowione w zleceniu 104.

# ASSETS-89 — Panoramy A+ (Szwecja)

**Projekt:** Cebulak Express — Kierunek Polska  
**Data:** 2026-10-31  
**Narzędzia:** wbudowany generator obrazów ChatGPT (GPT Image), Pillow, CairoSVG (ręczna korekta/konstrukcja wektorowa).  
**Status:** ilustracje i arkusz podglądu do zatwierdzenia przez koordynatora w rzeczywistym kadrze gry.

Każdy obraz ma **1620 × 900 px, PNG RGBA z przezroczystym niebem, profil sRGB**. Kompozycje przedstawiają duże, wyraźne sylwetki historycznych budowli i charakterystyczne brzegi rzek lub jezior. Kontury ciemnogranatowe, przybliżony kolor `#1d2f3b`. Nie użyto cudzych zdjęć jako warstw wynikowych, logotypów, flag, napisów ani symboli heraldycznych. Współczesne obiekty o potencjalnych ograniczeniach reprodukcji celowo pominięto.

| Plik (ID) | Miasto i motywy | Punkt widzenia / układ | Narzędzie i korekty | Licencja / prawa |
|---|---|---|---|---|
| `malmo.png` (`malmo`) | Malmö: zamek **Malmöhus**, okrągłe ceglane baszty, **Slottsmöllan** (wiatrak z 1851 r.), fosa i kładka | Stylizowana perspektywa z otoczenia zamkowej fosy, wiatrak po lewej, zamek po prawej | GPT Image — osobna scena; przycięcie i dopasowanie do wymiaru docelowego w Pillow | Wygenerowana dla projektu; prawa do wykorzystania wyniku po stronie właściciela projektu zgodnie z warunkami OpenAI |
| `sztokholm.png` (`sztokholm`) | Sztokholm: **Stadshuset**, iglica **Riddarholmskyrkan**, kolorowa zabudowa Gamla Stan, łodzie, most | Interpretacja szerokiego widoku znad Riddarfjärden z rejonu **Monteliusvägen**: ratusz po lewej, stara zabudowa na prawo | GPT Image — panel wygenerowanej panoramy zbiorczej, kadrowanie, odbicie poziome i skalowanie, usunięcie podpisu | Jak wyżej |
| `nykoping.png` (`nykoping`) | Nyköping: **Nyköpingshus**, charakterystyczna **biała kwadratowa wieża Kungstornet**, mury forteczne, czerwony budynek zespołu zamkowego, nabrzeże Nyköpingsån | Uproszczona perspektywa z brzegu **Nyköpingsån**, bez udawania dokładnego odwzorowania fotograficznego | Szkic koncepcyjny GPT Image; główne bryły skorygowano ręcznie w oryginalnej ilustracji wektorowej przez CairoSVG, weryfikując kształt wieży i fosy | Jak wyżej; własne opracowanie wektorowe |
| `norrkoping.png` (`norrkoping`) | Norrköping: dawne czerwone ceglane młyny **Industrilandskapet**, prosta wieża przemysłowa, kaskada na **Motala ström**, most | Stylizowany brzeg Motala ström, orientacyjny widok na historyczne przemysłowe nabrzeże, nie mapa fotogrametryczna | GPT Image — panel wygenerowanej panoramy zbiorczej; precyzyjny kadr bez podpisów, skalowanie i korekta alfa | Jak wyżej |
| `jonkoping.png` (`jonkoping`) | Jönköping: dominanta **Sofiakyrkan**, niska zabudowa, **Vättern**, przystań i żaglówki, zielone wzgórza | Stylizowana panorama południowego brzegu Vättern, w stronę miasta, z przystani | GPT Image — panel wygenerowanej panoramy zbiorczej; kadrowanie, usunięcie podpisów z sąsiedniego panelu, skalowanie | Jak wyżej |

## Użyte polecenia wizualne (prompty / briefy)

1. **Malmö:** `Flat warm-colour city skyline on TRANSPARENT background, thick navy outline (#1d2f3b), landmark-sized Malmöhus red-brick castle round bastions and adjacent Slottsmöllan 1851 windmill, castle moat and stone bank, no sky, no people or text, simple flat shading, horizontal 16:9.`
2. **Sztokholm:** `Bold flat-vector Swedish historic waterfront from Monteliusvägen, Stockholm Stadshuset left, Riddarholmskyrkan spire centre, colorful Gamla Stan right, island bridges, small boats, thick dark contours, transparent sky, no words or logos.`
3. **Nyköping:** `Flat vector river panorama of Nyköpingshus, white SQUARE Kungstornet tower with simple dark hipped roof, low ruined stone castle walls, Nyköpingsån, tree-lined embankment, historic red residence, dark thick outlines, transparent sky and no text.`
4. **Norrköping:** `Cartoon vector panorama of Norrköping Industrilandskapet by the Motala ström, old red brick mills, waterfall and bridge, 2–4 large building masses, navy bold strokes, transparent sky and flat warm shadows, no people or text.`
5. **Jönköping:** `Cartoon vector Jönköping seen from the shore of Vättern, Sofiakyrkan high spire, old warm-colour waterfront houses, a few small sailing boats, wooded hill, dark 10px outline, transparent sky, no people or text.`

**Uwaga o promptach:** Generator podczas partii tworzył również kolaże pięciu panoram. Dla czterech miast wykorzystano i poprawiono wydzielone fragmenty, a dla Nyköping zastąpiono błędną stylizację zamku ilustracją opartą na udokumentowanej kwadratowej wieży. Powyższe briefy opisują motywy docelowe; nie stanowią dokładnych dzienników wewnętrznych poleceń generatora.

## Źródła weryfikacji architektury (wyłącznie referencje, nie kopiowane fotografie)

- Malmö — oficjalna historia Slottsmöllan: https://malmo.se/Uppleva-och-gora/Arkitektur-och-kulturarv/Malmos-historia/Platser-och-byggnader/Byggnader-A-O/Slottsmollan-och-Mollarebostaden.html
- Sztokholm — oficjalny punkt widokowy Monteliusvägen: https://www.visitstockholm.com/o/monteliusvagen/
- Nyköping — muzeum w Kungstornet: https://sormlandsmuseum.se/besoksinfo/nykopingshus ; https://www.sfv.se/vara-fastigheter/sverige/sodermanlands-lan/nykopingshus
- Norrköping — oficjalny przewodnik po Industrilandskapet: https://visit.norrkoping.se/se-och-gora/sevardheter/sevardheter/industrilandskapet/om-industrilandskapet
- Jönköping — lokalny opis charakterystycznego widoku na Sofiakyrkan, miasto i Vättern: https://www.jonkoping.se/fritid-kultur--natur/friluftsliv-natur-och-parker/parker/stadsparken-jonkoping/sinnenas-promenad

## Podgląd i integracja

Arkusz: `docs/art/podglady/panoramy-89.png` — pięć panoram na błękitnym tle z podpisami **wyłącznie w arkuszu**. W plikach produkcyjnych brak podpisów. Zastąpić odpowiednie istniejące PNG w `public/assets/landmarks/`, bez zmian w kodzie silnika. Koordynator powinien sprawdzić skalowanie do 20–30% w realnym kadrze Canvas 2D oraz rozpoznawalność przed zatwierdzeniem PR. Nie wykonywano uruchomienia gry ani testów npm w tym środowisku.


<!-- Zlecenie 90 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS-90 — panoramy A+ (Luksemburg, Esch-sur-Alzette, Differdange, Leuven, Liège)

**Data:** 31.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Format:** każdy PNG 1620 × 900 px, RGBA, przezroczystość, barwy sRGB  
**Kolor konturu:** przybliżenie `#1d2f3b`, po korekcie 4-pikselowym dodatkowym obrysem sylwetek  
**Narzędzia:** natywny generator obrazów ChatGPT (GPT Image), Python 3 / Pillow / OpenCV (kadrowanie, alpha, kontury, rowery, arkusz)  
**Prawa użytkowania:** grafiki wygenerowane na zlecenie właściciela projektu, do wykorzystania w projekcie zgodnie z obowiązującymi warunkami usługi. AI nie gwarantuje powstania wyłącznych praw autorskich w każdym systemie prawnym. Nie skopiowano żadnej fotografii ani ilustracji referencyjnej.

## Pliki

| ID / plik | Miasto | Rozpoznawalne budowle i przyjęty punkt widzenia | Źródło / poprawki | Prawa użytkowania |
|---|---|---|---|---|
| `luksemburg.png` | Luksemburg, LU | Widok stylizowany z doliny Pétrusse na łuki mostu Adolphe'a, historyczną zabudowę górnego miasta, wieżę BCEE (State Savings Bank), iglice katedry Notre-Dame i kamienne mury na zboczu; widok syntetyczny, nie fotogrametryczny | GPT Image: samodzielna panorama; przeskalowanie, obrys i oczyszczenie alfy w Pillow/OpenCV | Do projektu właściciela |
| `esch-sur-alzette.png` | Esch-sur-Alzette, LU | Przemysłowy widok Belval, dwie sylwetki wielkopiecowe i rusztowania hutnicze, kominy, niska historyczna hala zakładowa i silosy; ujęcie z poziomu terenów dawnej huty | GPT Image: osobny kadr z arkusza koncepcyjnego; usunięto etykietę przez kadrowanie, przeskalowano i oczyszczono alfa | Do projektu właściciela |
| `differdange.png` | Differdange, LU | Stylizowana fasada zabudowy centrum (motyw dawnego ratusza/Aalt Stadhaus) oraz przemysłowa wieża po prawej; kadr syntetyczny z głównej ulicy, **nie jest to wierny widok zamku ani pięciu chłodni przemysłowych** | GPT Image: wycinek arkusza; kadrowanie, powiększenie, oczyszczenie alfy | Do projektu właściciela |
| `leuven.png` | Leuven, BE | Grote Markt: gotycki ratusz Leuven, zabudowa z ceglanymi szczytami i stylizowany kościół Sint-Pieterskerk; widok z placu w kierunku fasad. Dwa rowery przy linii gruntu | GPT Image: wycinek arkusza; kadrowanie; dodano ręcznie 2 uproszczone rowery za pomocą Pillow; oczyszczenie alfy | Do projektu właściciela |
| `liege.png` | Liège, BE | Stylizowany widok od strony Mozy: historyczne kamienice, kościół w centrum, most, barka i wzgórze z długim ciągiem schodów Montagne de Bueren | GPT Image: wycinek arkusza; usunięto fragment etykiety sąsiedniego kadru, oczyszczono alfa | Do projektu właściciela |
| `docs/art/podglady/panoramy-90.png` | Wszystkie | Arkusz z 5 panoramami na jasnoniebieskim tle i podpisami, w tym miniatury w skali ~1:5 | Pillow | Do projektu właściciela |

## Prompty do regeneracji i punkt widzenia

Wspólny prompt stylu: *A single independently generated panoramic landscape artwork for a 2D mobile game, flat warm-color vector cartoon illustration, strong dark-navy outlines #1d2f3b around 9–10 pixels, simplified windows, no gradients or photographic textures, flat shadows, three large prominent city landmarks occupying roughly 70–80% of the height, ground or quay at the very bottom, exact 16:9 composition, transparent alpha background, no sky, no clouds, no words, no signs, no logos, no flags, no coats of arms and no people in the foreground. Light from upper left. Do not copy a reference photograph.*

Prompty tematyczne (opisy kierujące kompozycją):

1. **Luksemburg** — *Luxembourg City from the Pétrusse valley, broad Adolphe Bridge stone arches in foreground, green copper clock tower of the State Savings Bank, historic Notre-Dame Cathedral spires, stepped stone fortress walls along steep wooded slopes; recognizable Luxembourg old town skyline.*
2. **Esch-sur-Alzette** — *Esch-Belval heritage industrial panorama with the two preserved blast furnaces A and B, dark iron frame towers and diagonal pipes, Möllerei historic ore storage hall, old silos, rust-red brickworks, low buildings and a continuous ground line.*
3. **Differdange** — *Differdange Luxembourg historic old town center with the old town hall Aalt Stadhaus, historic slate-roofed stone and brick buildings, recognizable old steelworks industrial elements beyond the trees, warm green valley slopes; no copying of copyrighted murals on the cooling towers.*
4. **Leuven** — *Leuven Grote Markt with an accurate large elaborate Gothic town hall, adjacent St Peter's Church without a high completed spire, warm brick stepped-gable houses of the Tafelrond vicinity, two simple city bicycles; view from the square.*
5. **Liège** — *Liège historic riverside seen across the Meuse, barges on the river in the immediate foreground, stone riverbank bridge, rows of houses, Saint-Barthélemy church near the center, long unmistakable Montagne de Bueren stairway rising on green hillside behind the old quarter.*

**Uwaga o replikowalności:** generator zinterpretował pełne polecenie również jako arkusze wielomiejskie. Pliki `esch-sur-alzette.png`, `differdange.png`, `leuven.png` i `liege.png` wyodrębniono z wygenerowanych oryginalnych arkuszy, a nie z pobranych zdjęć. Powyższe prompty tematyczne dokumentują intencję i służą do ewentualnej ponownej generacji; nie są dosłownym logiem komunikacji z generatorem.

## Weryfikacja architektury (31.10.2026)

- Luxembourg City Tourist Office: https://www.luxembourg-city.com/en/tours-activities/sights/map — most Adolphe'a, fortyfikacje Bock, katedra i punkt widokowy Pétrusse.
- Visit Luxembourg: https://www.visitluxembourg.com/tour/minett-trail-belval-universite-esch-sur-alzette-gare — potwierdzone dwa historyczne piece Belval.
- Visit Luxembourg: https://www.visitluxembourg.com/place/five-cooling-towers i https://www.visitluxembourg.com/place/differdange — chłodnie, stary ratusz, zamek i dziedzictwo stalowe Differdange.
- Visit Leuven: https://www.visitleuven.be/en/town-hall ; Visit Vlaams-Brabant: https://www.visitvlaamsbrabant.be/zien-en-doen/vind-iets-om-te-doen/sint-pieterskerk-leuven — gotycki ratusz i niedokończone wieże Sint-Pieterskerk.
- Visit Liège: https://www.visitezliege.be/fr/offre/montagne-de-bueren/ — schody Montagne de Bueren mają 374 stopnie.

## Ograniczenia do sprawdzenia w kadrze gry

- **Differdange:** kompozycja jest bardziej syntetyczna niż wierna konkretnej ulicy; przemysłowa wieża nie odwzorowuje pięciu faktycznych chłodni. Zalecana akceptacja rozpoznawalności przez mieszkańca lub ponowna regeneracja przed finalną publikacją.
- **Leuven:** generator zilustrował kościół z nadmiernie wysoką iglicą; rzeczywisty projekt wysokich wież nigdy nie został zrealizowany. Ten detal wymaga sprawdzenia/korekty przy zatwierdzeniu wersji finalnej.
- **Luksemburg/Liège:** celowo połączono rozpoznawalne motywy w jedną ilustracyjną perspektywę; nie potwierdzono idealnej jednoczesnej widoczności każdego obiektu z pojedynczego punktu obserwacji.
- **Testy:** wykonano kontrolę 5× PNG 1620×900, RGBA, pełnej alfy i przezroczystego górnego tła. Nie uruchomiono `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, ponieważ nie można było sklonować repozytorium w środowisku plikowym (brak dostępu sieciowego Git).
- Brak chronionych napisów i znanych logotypów. Nie wykorzystano rysunku pięciu murali Differdange autorstwa Alaina Weltera.

**Integracja:** podmienić pliki w `public/assets/landmarks/` na zasoby z ZIP, bez zmian w rendererze. Podgląd w `docs/art/podglady/` nie jest używany przez grę.


<!-- Zlecenie 91 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 91 — panoramy A+: Brugia, Venlo, Utrecht, Arnhem, Calais

**Data:** 2026-10-31  
**Narzędzie:** natywny generator obrazów ChatGPT (GPT Image), następnie Python/Pillow oraz OpenCV (skalowanie do 1620 × 900, wzmocnienie ciemnogranatowych konturów, arkusz podglądu).  
**Przeznaczenie:** `Cebulak Express — Kierunek Polska`; każda grafika: 1620 × 900 px, PNG RGBA, sRGB, przezroczyste niebo; bez napisów, logotypów, osób i flag.  
**Prawa użycia:** materiały wygenerowane na zamówienie właściciela projektu; właściciel może używać, modyfikować i publikować wyniki w ramach warunków OpenAI. Nie jest to gwarancja wyłącznych praw autorskich do treści AI. Zdjęcia źródłowe wykorzystano **wyłącznie do sprawdzenia form architektonicznych** — nie kopiowano pikseli ani cudzych fotografii.

## Rejestr

| Plik (w `public/assets/landmarks/`) | ID, miasto | Obiekty i umowny punkt widzenia | Generator, data, identyfikator |
|---|---|---|---|
| `brugia.png` | `brugia`, Brugia (BE) | Widok **z Rozenhoedkaai wzdłuż kanału Dijver**: Belfort na tle kamienic o schodkowych szczytach, przykanalikowe zabudowania, most i łabędzie; kierunek ku historycznemu centrum. | GPT Image, 2026-10-31, `3831a0c9-6f04-4d2e-ae51-db747acae00c` |
| `venlo.png` | `venlo`, Venlo (NL) | **Narożnik Markt w stronę Stadhuis**: ratusz renesansowy z dwiema wieżyczkami i pierzeja historycznych domów targowych (jedna fasada inspirowana Handelshuis het Korenvat). Szklarnie celowo pominięto — nie należą do rzeczywistej pierzei rynku. | GPT Image, 2026-10-31, `de524cc2-1a94-489c-92a0-38c7fe8e60b6` |
| `utrecht.png` | `utrecht`, Utrecht (NL) | Widok **znad Oudegracht w kierunku Domtoren**: wysoka gotycka wieża w głębi, kamienice, piętrowe nabrzeża z piwnicami i schodami oraz łukowy most; na prawo za wieżą bryła gotyckiego kościoła w skrócie perspektywicznym. | GPT Image, 2026-10-31, `1f07cf59-2cba-4394-9129-6b03f52d1716` |
| `arnhem.png` | `arnhem`, Arnhem (NL) | Widok **z południowego brzegu Nederrijn na centrum Arnhem**: stalowy łuk John Frostbrug po lewej, wieża Eusebiuskerk na prawym planie, historyczne dachy oraz zieleń nad rzeką. | GPT Image, 2026-10-31, `96f1403b-61ed-403b-b5c8-d16aa68dd9cb` |
| `calais.png` | `calais`, Calais (FR) | **Stylizowany widok na Calais-Nord od strony nabrzeża**: średniowieczna Tour du Guet (bryła przybliżona), Notre-Dame de Calais oraz XIX-wieczny Phare de Calais. Celowo **bez Hôtel de Ville i beffroi ratusza** (uwaga prawna poniżej). | GPT Image, 2026-10-31, `06b32b02-95c4-48d3-9a87-a775f922f7de` |

## Prompty zadaniowe (opis redakcyjny)

Wspólne dla pięciu miast: „**szeroka wycięta panorama 16:9, wektorowa ilustracja do gry, 2–4 dominujące zabytki, proste duże bryły, ciepłe barwy, płaskie cienie, światło z lewej góry, mocny ciemnogranatowy kontur `#1d2f3b`, przezroczyste tło bez nieba, linia gruntu u dołu; bez ludzi, napisów, znaków, reklam, logo, flag i gradientów**”.

- **Brugia:** „Rozenhoedkaai i kanał, szczytowe średniowieczne kamienice, wysoki Belfort w głębi, niewielki łukowy most, łabędzie, cegła i woda; rozpoznawalna architektura Brugii”.
- **Venlo:** „Widok z narożnika Markt, wielki renesansowy Stadhuis Venlo z dwiema charakterystycznymi cebulastymi wieżyczkami, obok niskie kamienice rynku, Handelshuis Korenvat jako inspiracja; bez szklarni z innej części miasta”.
- **Utrecht:** „Oudegracht z dwupoziomowymi nabrzeżami, ciemnymi łukami piwnic, schodami do wody, historyczne kamienice, dominująca ażurowa gotycka Domtoren; widok kanałem w stronę Domplein”.
- **Arnhem:** „Nederrijn, charakterystyczny biały stalowy pojedynczy łuk mostu Johna Frosta, wieża Eusebiuskerk i dachy historycznego centrum na drugim brzegu, zalesione wzgórza w tle”.
- **Calais:** „Widok miejskiego nabrzeża i Calais-Nord, masywna średniowieczna wieża obserwacyjna Tour du Guet, wysoki kościół Notre-Dame z ostrołukowymi oknami, wysoka biała latarnia Phare de Calais z czarną latarnią na szczycie; bez ratusza, bez plaży w pobliżu ratusza”.

Techniczny, wewnętrzny prompt generatora **nie był udostępniony**; powyższe są opisami zleconych motywów i stylistyki, a identyfikatory `gen_id` pozwalają przypisać generacje.

## Korekty i sprawdzenie

- Z bazowych plików PNG RGBA utworzono docelowe 1620 × 900; skorygowano marginesy górne i ułożenie podstawy.
- Kontur wzmocniono kolorystycznie do `#1d2f3b`, dodano około 2 px obrysu zewnętrznego i 1 px rozszerzenia ciemnych linii wewnętrznych w OpenCV; nie można zagwarantować jednakowej grubości co do piksela na każdym fragmencie.
- Zweryfikowano rozmiar, kanał alfa, przezroczyste narożniki i złożono **`docs/art/podglady/panoramy-91.png`** na jasnoniebieskim tle z podpisami. Sprawdzono też czytelność miniatur 324 × 180.
- **Ograniczenie:** perspektywy są artystycznymi przybliżeniami kierunków widoku, nie rekonstrukcjami fotogrametrycznymi ani weryfikacją geodezyjną. Dotyczy zwłaszcza zestawienia trzech symboli Calais i uproszczonej bryły Tour du Guet. W grze wymagana jest wizualna akceptacja mieszkańca miasta.
- Nie uruchomiono `npm ci`, `npm run typecheck`, `npm test` ani `npm run build`, ponieważ pełnego checkoutu repo nie dało się pobrać w środowisku generowania grafik (brak dostępu Git HTTPS z kontenera). Zmieniono wyłącznie zasoby graficzne i ten dokument, bez kodu TypeScript.

## Uwaga prawna — Calais

Hôtel de Ville de Calais (1911–1925) został zaprojektowany przez **Louisa Debrouwera, zmarłego 18 czerwca 1967 r.** Standardowy termin ochrony we Francji to 70 lat po śmierci twórcy; dla komercyjnych przedstawień chronionego dzieła architektury nie należy zakładać swobody panoramy. **W finalnym `calais.png` nie przedstawiono ratusza**. Zamiast niego wybrano XIX-wieczny Phare de Calais, średniowieczną Tour du Guet i historyczną Notre-Dame; nie ma również współczesnych nadmorskich instalacji artystycznych. Jeśli koordynator uzyska odpowiednią licencję, może zlecić oddzielny wariant z ratuszem.

## Źródła referencyjne (do rozpoznania zabytków; bez kopiowania fotografii)

- Brugia — [Visit Bruges: Belfort](https://www.visitbruges.be/en/things-to-do/culture-and-heritage/belfort-belfry), [Rozenhoedkaai](https://www.visitbruges.be/en/things-to-do/culture-and-heritage/rozenhoedkaai-rosary-quay).
- Venlo — [In Venlo: historyczne centrum i zabytki Markt](https://www.invenlo.com/en/visiting/visit-our-historic-city-center/venlo-from-a-to-z/).
- Utrecht — [Discover Utrecht: Dom Tower i Oudegracht](https://www.discover-utrecht.com/news/top-10-sights-in-utrecht/).
- Arnhem — [Rijksdienst voor het Cultureel Erfgoed: John Frostbrug](https://monumentenregister.cultureelerfgoed.nl/monumenten/529907).
- Calais — [Calais XXL: Notre-Dame, Tour du Guet, latarnia](https://www.calaisxxl.com/wp-content/uploads/2025/02/Guide_VAH_Calais_Focus_Hotel-de-Ville_EN.pdf), [Archives du Pas-de-Calais: Notre-Dame](https://www.archivespasdecalais.fr/patrimoines/Decouvrir/Patrimoine-architectural/L-eglise-Notre-Dame-de-Calais), [INHA: Louis Debrouwer, 1879–1967](https://agorha.inha.fr/ark%3A/54721/01c0aeff-d1b1-432c-96b7-ddf3f07fdc07), [Université Lyon 3: droit à l'image des bâtiments](https://www.univ-lyon3.fr/le-droit-a-limage-des-personnes-et-des-biens).


<!-- Zlecenie 92 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS-92: Panoramy A+ miast Francji

**Zlecenie:** 92. **Data:** 31.10.2026. **Wersja:** propozycja do przeglądu w grze. **Format:** PNG RGBA, 1620×900 px, sRGB, przezroczyste niebo, dolna krawędź przy gruncie lub wodzie.

## Pochodzenie i prawa

Wszystkie pięć panoram to oryginalne kompozycje graficzne wytworzone natywnym generatorem obrazu ChatGPT (GPT Image), następnie wyodrębnionymi z autorskiego arkusza koncepcyjnego i poddanymi korekcie Pillow/OpenCV: osobne kadry, usunięcie nieba i artefaktów, skalowanie do 1620×900, transparentny kanał alfa, linia gruntu. Arkusz przeglądowy złożono za pomocą Pillow. Nie wklejano cudzych fotografii ani tekstur. Obrazy referencyjne służyły jedynie do sprawdzenia charakterystycznych zabytków.

**Licencja/użycie:** grafiki wygenerowane w ChatGPT i przygotowane do użycia komercyjnego przez właściciela projektu, zgodnie z warunkami usługi. Nie jest to gwarancja wyłączności ani istnienia ochrony autorskoprawnej dla elementów wygenerowanych przez AI. Obiekty to historyczne zabytki lub ogólne elementy pejzażu miejskiego; pominięto nowoczesne budowle obciążone wątpliwościami dotyczącymi komercyjnego wykorzystania wizerunku.

| Plik / ID | Miasto i czytelne motywy | Punkt widzenia / charakter kadru | Narzędzie | Prawa |
|---|---|---|---|---|
| `dunkierka.png` / `dunkierka` | Dunkierka: wieża Beffroi Saint-Éloi, latarnia inspirowana Phare du Risban, dźwigi portowe, piaszczysta plaża i wydmy | Stylizowany widok z nadmorskiej strony portu, z plażą na pierwszym planie i infrastrukturą portową w tle | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `reims.png` / `reims` | Reims: charakterystyczna dwuwieżowa fasada katedry Notre-Dame, masy zabudowy sakralnej nawiązujące do Saint-Remi, niskie kamienice | Umowny widok na historyczne centrum od zachodu, na wprost fasady katedry | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `metz.png` / `metz` | Metz: katedra Saint-Étienne z kamienia o ciepłej barwie, zabudowa nad Mozelą, kamienny most nawiązujący do Moyen Pont | Umowny widok w kierunku historycznego centrum z drugiej strony Mozeli | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `cherbourg.png` / `cherbourg` | Cherbourg: latarnia portowa inspirowana latarnią Fort de l'Ouest, zabudowa forteczna inspirowana fortyfikacjami rade, basen portowy, jachty | Umowny widok z wnętrza basenu portowego w kierunku nadbrzeża i umocnień | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `caen.png` / `caen` | Caen: wieże historycznych kościołów nawiązujące do opactwa Abbaye aux Hommes i Saint-Pierre, kamienny most, zabudowa Normandii | Umowny widok zza rzeki na historyczne centrum | ChatGPT GPT Image + Pillow/OpenCV | Wygenerowane dla projektu |
| `docs/art/podglady/panoramy-92.png` | Pięć panoram na jasnoniebieskim tle z podpisami | Arkusz kontrolny 3 + 2 | Pillow | Zestawienie prac projektu |

## Specyfikacja promptów (opis kierujący generacją i selekcją)

**Prompt wspólny:** *Autorskie panoramy pięciu miast francuskich jako czytelne ilustracje 2D do gry. Grube ciemnogranatowe kontury #1d2f3b; ciepłe, niemal płaskie kolory; duże historyczne sylwetki; 2–4 główne obiekty, niskie kamienice i krajobraz w tle; światło z lewej góry; bez napisów, logotypów, postaci i flag; oddzielne panoramy z przezroczystym tłem. Części składowe: port i wydmy Dunkierki, gotycka katedra Reims, kamienna katedra i mosty Metz, baseny i latarnie Cherbourga, wieże opactwa i kamienny most Caen.*

- **Dunkierka:** *Port z wysokim beffroi Saint-Éloi, jasną latarnią, niebieskimi dźwigami i wydmami, panorama nabrzeża, ciepły kamień, 2D cutout.*
- **Reims:** *Monumentalna katedra Notre-Dame z dwiema masywnymi, bezspiczastymi wieżami, różą nad trzema portalami, niskie zabudowania; widok fasady od zachodu.*
- **Metz:** *Katedra Saint-Étienne z wysoką gotycką wieżą, brzeg Mozeli i łuki kamiennego mostu; akcent drzew i jasnych elewacji.*
- **Cherbourg:** *Stary port w Normandii, klasyczna latarnia morska, fortyfikacje falochronu, niska zabudowa i jachty; bez nowoczesnego terminalu.*
- **Caen:** *Historyczne opactwo i kościoły o strzelistych wieżach, niskie kamienice, szeroki kamienny most i pas zieleni.*

> **Transparentność techniczna:** generator zwrócił wspólny, pięcioelementowy arkusz, a nie pięć niezależnych widoków. Zostały z niego wykonane osobne pliki z kanałem alfa. Tekst powyżej jest udokumentowaną specyfikacją artystyczną, nie dosłownym logiem ukrytego promptu wewnętrznego generatora.

## Weryfikacja i ograniczenia

- Każdy plik: **1620×900, RGBA**, przezroczystość sprawdzona programowo; górny pas jest przezroczysty. Podgląd zestawiony na jasnoniebieskim tle.
- Ilustracje są uproszczonymi **kompozycjami rozpoznawalnych motywów**, nie rekonstrukcjami panoram wykonanych z jednego geodezyjnie potwierdzonego punktu. Nie należy przedstawiać ich jako fotograficznie wiernych. Wymóg ścisłej kolejności i proporcji rzeczywistych budowli wymaga dalszego przerysowania po zatwierdzeniu punktów widokowych.
- Należy sprawdzić czytelność przy zmniejszeniu 5× i w ruchu, bez nieba. Nie uruchamiano pełnej gry ani CI w tej sesji.

## Źródła do identyfikacji zabytków (nie kopiowano zdjęć)

- Dunkierka: https://www.dunkerque-tourisme.fr/les-incontournables/ ; https://www.dunkerque-tourisme.fr/decouvrir/une-immersion-dans-lhistoire/prendre-de-la-hauteur-avec-nos-beffrois/
- Reims: https://visit.reims.fr/parcours-dans-la-ville/cite-des-sacres
- Metz: https://templeneufmetz.org/edifice/ ; https://commons.wikimedia.org/wiki/File:Metz_-_View_of_Temple_Neuf,_Moselle_river_and_Cath%C3%A9drale_Saint_Etienne_from_Moyen_Pont_(Q22690).jpg
- Cherbourg: https://www.cherbourg.fr/culture-et-loisirs/patrimoine/les-monuments-incontournables/la-digue-et-ses-forts/ ; https://pop.culture.gouv.fr/notice/merimee/IA50000603
- Caen: https://caen.fr/annuaire-equipement/eglise-saint-etienne ; https://en.normandie-tourisme.fr/beautiful-panoramas/


<!-- Zlecenie 93 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 93 — Panoramy miast francuskich, styl A+

**Data wytworzenia:** 2026-10-31  
**Repozytorium:** `woogitsugames/cebulak-express`  
**Przeznaczenie:** panoramy w grze „Cebulak Express — Kierunek Polska”  
**Autor / narzędzie:** grafiki wygenerowane natywnym generatorem obrazu ChatGPT (GPT Image); obróbka techniczna: Python/Pillow + OpenCV.  
**Licencja / dysponowanie:** oryginalne wyniki generowania AI przekazane do wykorzystania i dalszej modyfikacji przez właściciela projektu, zgodnie z warunkami usługi ChatGPT i prawem właściwym. Nie użyto cudzych zdjęć ani logotypów w plikach wynikowych. Wizerunki historycznych budynków użyto jako źródła inspiracji, nie jako kopii fotografii.

## Pliki

| Plik (`public/assets/landmarks/`) | ID | Miasto | Motywy | Punkt widzenia i układ kompozycji | Źródło / licencja |
|---|---|---|---|---|---|
| `rouen.png` | `rouen` | Rouen | Katedra Notre-Dame z wysoką iglicą, kościół opactwa Saint-Ouen, historyczna zabudowa nad Sekwaną | Orientacyjny widok od lewego brzegu Sekwany ku zabytkowemu prawemu brzegowi; wysoka iglica katedry w centralnej części, Saint-Ouen po prawej, nabrzeże na dole | ChatGPT GPT Image, wynik AI do użycia przez właściciela projektu |
| `perpignan.png` | `perpignan` | Perpignan | Le Castillet (ceglana brama obronna), wieża kościelna inspirowana katedrą Saint-Jean-Baptiste, palmy i zabudowa katalońska | Plac przed Castillet, widok w kierunku starego miasta od północno-zachodniej strony; Castillet w centrum/lewej części, tło sakralne po prawej | ChatGPT GPT Image, wynik AI do użycia przez właściciela projektu |
| `narbonne.png` | `narbonne` | Narbonne | Canal de la Robine, zabudowany Pont des Marchands, Palais des Archevêques, katedra Saint-Just-et-Saint-Pasteur | Widok wzdłuż kanału w kierunku zabudowanego mostu i zespołu zabytków starówki; kanał i barka na pierwszym planie, wieże za mostem | ChatGPT GPT Image, wynik AI do użycia przez właściciela projektu |
| `montpellier.png` | `montpellier` | Montpellier | Opéra Comédie, fontanna Trzech Gracji, XIX-wieczne jasne fasady, generyczny nieoznakowany tramwaj | Plac de la Comédie w stronę zabytkowej opery; opera w środku, fontanna przed fasadami, tramwaj z prawej | ChatGPT GPT Image, wynik AI do użycia przez właściciela projektu |
| `besancon.png` | `besancon` | Besançon | Cytadela Vaubana na zalesionym wzgórzu, stara zabudowa nad Doubs, kamienny most i zakole rzeki | Orientacyjny widok z przeciwległego brzegu Doubs ku cytadeli i ułożonym pod nią czerwonym dachom, most po lewej | ChatGPT GPT Image, wynik AI do użycia przez właściciela projektu |

**Wspólny format:** PNG, **1620 × 900 px**, RGBA, przezroczyste niebo/tło, wartości sRGB z osadzonym profilem ICC, bez napisów, logotypów, flag i postaci na pierwszym planie. Światło z lewej góry, ciepła paleta kolorów i kontur granatowy `#1d2f3b` (ok. 9–10 px na głównej sylwetce po obróbce). Styl A+: uproszczona, komiksowa interpretacja zabudowy, nie fotorealistyczna wizualizacja geodezyjna.

**Arkusz kontrolny:** `docs/art/podglady/panoramy-93.png` — wszystkie pięć grafik na jasnoniebieskim tle, podpisy wyłącznie w arkuszu, nie w zasobach gry.

## Prompty użyte do wygenerowania

### `rouen.png`

> Wide, sticker-style vector panorama of a Rouen-inspired Gothic riverside city on a transparent background, featuring bold outlines, flat cel shading, and no people, clouds, or text. A calm blue river and block-lined stone quay with steps sit before tree-lined rows of colorful timber-framed townhouses, while towering cream-and-tan cathedrals rise behind them with pointed arches, rose windows, deep-blue lancets, ornate spires, pinnacles, slate roofs, and a central needle-like tower topped by a cross.

### `perpignan.png`

> Wide, flat-shaded vector illustration on a transparent checkerboard background: a detailed red-brick medieval fortress gate dominates the center-left, flanked by palm trees and backed by warm Mediterranean buildings and a pale cathedral bell tower. Thick dark outlines, bold comic-style colors, crenellated towers, arched entry with a shadowy gridded gate, tiled plaza, low stone railings, greenery, and richly layered architectural details create a crisp cutout PNG look with no sky, text, people, vehicles, or signage.

### `narbonne.png`

> Panoramic cartoon-style vector scene of a European canal town on a transparent background, featuring a calm teal canal, a central stone arch bridge, colorful tightly packed waterfront houses, leafy quay-side trees, boats, and classic street lamps. Behind the bridge, a towering Gothic cathedral and a crenellated fortress dominate the skyline, all rendered with bold dark outlines, flat colors, simplified shading, and no people, text, or sky.

### `montpellier.png`

> Panoramic sticker-style vector illustration of a European city square inspired by Montpellier’s Place de la Comédie, isolated on a transparent checkerboard background with no sky, people, text, or extra scenery. In bold cel-shaded colors with thick navy outlines, a grand cream-and-gold Beaux-Arts opera house anchors the scene, flanked by ornate Haussmann buildings, balconies, domed slate roofs, a classical Three Graces fountain, and a sleek multicolored blue tram crossing the paved plaza at the right.

### `besancon.png`

> Panoramic vector-style cutout of a riverside European town, rendered in clean flat colors with bold dark outlines and a transparent checkerboard sky. A stone bridge, calm teal river, tree-lined embankment, colorful historic buildings, and a central church tower lead up to a large angular fortress crowning a green, rocky hill, all in a simplified poster-like style with no people.

## Obróbka techniczna

1. Wybrano wygenerowaną, przezroczystą panoramę danego miasta i dopasowano do 1620×900 (Pillow/Lanczos).
2. Znormalizowano kanał alfa: tło pozostało przezroczyste, bryły budynków i terenu mają nieprzezroczyste wnętrze.
3. Nałożono kontur `#1d2f3b` wokół sylwetek (poszerzenie ok. 8 px na zewnątrz + istniejąca krawędź) oraz nieznacznie pogrubiono ciemne linie wewnętrzne (OpenCV).
4. W Montpellier odcięto niepożądany pas na dolnej krawędzi surowego obrazu, a w Besançon część pustego obszaru u góry, aby powiększyć sylwetkę wzgórza.
5. Zapisano RGB w interpretacji sRGB i PNG/RGBA. Arkusz podglądu utworzono programowo, a podpisów nie wtopiono w grafiki gry.

## Dokumentacyjne punkty odniesienia

- Rouen: panorama miasta z lewego brzegu Sekwany: https://www.memoirenormande.fr/medias-vue-sur-la-ville-de-rouen-depuis-la-rive-gauche-614-5218-2-0.html; punkt widokowy i najważniejsze monumenty: https://vallee.seine-eure.fr/
- Perpignan: oficjalny opis Le Castillet: https://mairie.perpignan.fr/culture-patrimoine/patrimoine/monuments/le-castillet
- Narbonne: kanał de la Robine: https://www.narbonne.fr/canal-robine; most Pont des Marchands: https://www.narbonne.fr/pont-marchands
- Montpellier: oficjalny opis Place de la Comédie, opery i fontanny: https://www.montpellier-tourisme.fr/decouvrir/millenaire/les-incontournables/place-de-la-comedie/
- Besançon: oficjalny opis cytadeli Vaubana górującej nad zakolem Doubs: https://www.citadelle.com/a-voir-a-faire/la-citadelle-de-besancon/citadelle-de-besancon/

## Ograniczenia i uwagi do kontroli

Wyniki generatora są **stylizowanymi interpretacjami** budowli. Zachowują rozpoznawalne formy głównych zabytków i geograficzny charakter miast, ale nie są odrysami konkretnych ujęć aparatu ani dokładnym odwzorowaniem każdej elewacji; szczególnie liczby wieżyczek, detale fasad i odległości między zabytkami mogą różnić się od realnych. Zalecane sprawdzenie czytelności i zbieżności motywów w docelowej kamerze gry (skala ok. 1:5). Nie dołączono żadnej fotografii referencyjnej ani fontów do zasobów gry.


<!-- Zlecenie 94 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS-94 — panoramy A+: Mulhouse, Akwizgran, Düsseldorf, Cottbus, Forst

**Data:** 31.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Wymiary:** każda panorama **1620 × 900 px**, format PNG RGBA z osadzonym profilem sRGB i przezroczystym niebem. Linia gruntu w ostatnich 11 px.  
**Styl:** ilustracja 2D, ciepła paleta, uproszczona architektura, pogrubione ciemnogranatowe kontury `#1d2f3b`, bez napisów, logotypów, flag, ludzi na pierwszym planie i obcych materiałów graficznych.

## Zestawienie

| ID / plik | Miasto | Rozpoznawalne obiekty | Punkt widzenia / kolejność | Narzędzie i poprawki | Licencja / wykorzystanie |
|---|---|---|---|---|---|
| `mulhouse.png` | Mulhouse, FR | Dawny Hôtel de Ville (różowa fasada), Temple Saint-Étienne (neogotycka wieża), pastelowe kamienice Place de la Réunion | Umowny widok przez plac, od południowego zachodu; ratusz po lewej, świątynia w centrum/prawej części, kamienice w pasie tła | ChatGPT GPT Image — pojedynczy wygenerowany obraz; Pillow/OpenCV: skalowanie, czyszczenie alfy, pogrubienie konturu | Obraz wygenerowany na potrzeby właściciela projektu; wykorzystanie zgodne z warunkami OpenAI |
| `akwizgran.png` | Aachen (Akwizgran), DE | Katedra z ośmioboczną częścią kopułową i wieżą; historyczna brama miejska inspirowana Ponttor; historyczna zabudowa centrum | **Umowna, skompresowana panorama** historycznego centrum: katedra po lewej, sylwetka bramy po prawej; nie udaje jednego fotograficznego kadru z Katschhof | ChatGPT GPT Image — wyodrębnione z wygenerowanej kompozycji; Pillow/OpenCV: kadrowanie, powiększenie, pogrubienie konturu | Jak wyżej |
| `dusseldorf.png` | Düsseldorf, DE | Rheinturm, historyczne zabudowania nadreńskie z wieżą kościelną, sylwetka Rheinkniebrücke, Rheinuferpromenade | Stylizowana panorama od strony Oberkassel ku wschodniemu brzegowi; Altstadt po lewej, Rheinturm pośrodku, most po prawej | ChatGPT GPT Image — wyodrębnione z wygenerowanej kompozycji; Pillow/OpenCV: kadrowanie, powiększenie, pogrubienie konturu | Jak wyżej; konturowa ilustracja budowli widocznych z przestrzeni publicznej, bez zapożyczonych fotografii |
| `cottbus.png` | Cottbus, DE | Okrągły ceglany Spremberger Turm z zegarem, sylwetka Oberkirche St. Nikolai, historyczna zabudowa, zieleń przy Szprewie | Stylizowana oś widokowa z południowej strony starego miasta: Spremberger Turm po lewej, wieża świątyni dalej po prawej | ChatGPT GPT Image — wyodrębnione z wygenerowanej kompozycji; Pillow/OpenCV: kadrowanie, powiększenie, pogrubienie konturu | Jak wyżej |
| `forst.png` | Forst (Lausitz), DE | Wieża kościoła St. Nikolai, Forster Wasserturm (1901–1903), stylizowany most nad Nysą Łużycką, nadrzeczna zieleń | **Umowna panorama** od nadrzecznej strony, z kompozycyjnym przybliżeniem oddalonych punktów: kościół po lewej, most z przodu, wieża ciśnień po prawej | ChatGPT GPT Image — wyodrębnione z wygenerowanej kompozycji; ręczny wektorowy rysunek Wasserturm; Pillow/OpenCV: montaż, kadrowanie, alfa, kontur | Jak wyżej; ręczny dodatek wektorowy wykonany na potrzeby projektu |

**Arkusz podglądu:** `docs/art/podglady/panoramy-94.png` — pięć plików na jasnoniebieskim tle z podpisami (podpisy nie występują w plikach produkcyjnych). Narzędzie: Pillow.

## Prompt i metoda generowania

**Wspólna instrukcja artystyczna (kontekst generatora):**

> Wide 16:9 transparent-background game skyline, five named European cities as separate deliverables. Bold, warm-colored flat 2D vector-cartoon aesthetics; simplified landmark silhouettes, heavy dark-navy #1d2f3b contours, a few large recognisable buildings taking most of the visible height, sunlight from upper left, minimal square windows, low streetscape, a baseline near the bottom, no sky, clouds, text, logos, flags or people. Architecture and the left-to-right order should follow verified local landmarks, not replicate reference photographs.

**Konkrety miast / motywy opisane generatorowi w kontekście zlecenia:**

- **Mulhouse:** dawny różowy ratusz z Place de la Réunion, wysoka neogotycka wieża Temple Saint-Étienne, historyczne kolorowe kamienice. Kominy przemysłowe pominięte: nie tworzą wiarygodnego jednego widoku z placu.
- **Akwizgran:** ośmioboczna część katedry Karola Wielkiego, gotyckie skrzydła i wieża, umowna brama Ponttor i kamienice centrum.
- **Düsseldorf:** Rheinturm nad Renem, nabrzeżna zabudowa Altstadt z wieżą kościelną, Rheinkniebrücke i pas promenady.
- **Cottbus:** Spremberger Turm z zegarem, kościół św. Mikołaja, historyczne kamienice i nadrzeczna zieleń.
- **Forst:** wieża kościoła St. Nikolai, zabytkowa okrągła wieża ciśnień, most nad Nysą Łużycką, łużyckie drzewa nadrzeczne.

Generator obrazu zastosował kontekst rozmowy i zlecenia (techniczne pole `prompt` w metadanych generacji jest puste). Powstały jeden pełnoekranowy obraz Mulhouse oraz dwie wielomiejskie plansze koncepcyjne. Pozostałe cztery obrazy wycięto i dopasowano z planszy, bez osadzania napisów. Uzupełnienie Forst jest autorskim rysunkiem złożonym z płaskich figur wektorowych. Jest to dokumentacja rzeczywistego procesu, a nie twierdzenie o pięciu osobnych pełnorozdzielczych generacjach.

## Źródła do weryfikacji budowli (nie wykorzystano ich zdjęć jako tekstur)

- **Mulhouse:** [Centre historique — Mulhouse Tourisme](https://www.tourisme-mulhouse.com/experiences/centre-historique/); [Temple Saint-Étienne](https://www.tourisme-mulhouse.com/offres/temple-saint-etienne-mulhouse-fr-3839613/).
- **Akwizgran:** [Katschhof — Aachen Tourist Service](https://charlie.aachen-tourismus.de/en/poi/katschhof); [Ponttor — Aachen Tourist Service](https://www.aachen-tourismus.de/aachen-entdecken/details/poi/ponttor/).
- **Düsseldorf:** [Rheinturm — miasto Düsseldorf](https://www.duesseldorf.de/int/tourism/discover/rheinturm); [Old Town i Rheinpromenade — miasto Düsseldorf](https://www.duesseldorf.de/int/tourism/discover/old-town).
- **Cottbus:** [Cottbus von oben](https://cottbus-tourismus.de/de/sommer/cottbus-entdecken/cottbus-von-oben.html); [Oberkirche St. Nikolai](https://cottbus-tourismus.de/de/winter/cottbus-besonders/winter-in-cottbus/sehenswuerdigkeiten-in-cottbus/artikel-oberkirche-st-nikolai-cottbus.html).
- **Forst:** [Forster Wasserturm — miasto Forst](https://www.forst-lausitz.de/forster-wasserturm.128510.htm); [Stadtkirche St. Nikolai](https://forst-stadtentwicklung.de/stadtkirche-st-nikolai/); [trasa nad Nysą i mosty — miasto Forst](https://secure.forst-lausitz.de/portal/eine-forster-weltreise-von-den-alpen-ueber-mexiko-und-jerusalem-in-den-urwald.154402.htm).

## Ograniczenia i pytania do koordynatora

1. Wspólny brief wymaga zarówno najważniejszych symboli, jak i jednego realnego punktu obserwacyjnego. **Nie da się bez uczciwych kompromisów** tak pokazać obok siebie katedry Akwizgranu i Ponttor ani mostu, kościoła i wieży ciśnień Forst w jednym bliskim kadrze. Dlatego te dwa obrazy są świadomie kompresją panoramy, wymagającą decyzji właściciela o dopuszczeniu stylizacji.
2. Ilustracje z plansz zostały powiększone do 1620 × 900 px; kontrola w rozmiarze gry (~324 × 180 px) jest zadowalająca, jednak nie są to źródłowe grafiki wektorowe ani pięć osobnych ilustracji wygenerowanych w tej rozdzielczości.
3. **Düsseldorf:** Rheinturm jest współczesną budowlą, ale przedstawiono go jedynie jako uproszczoną sylwetkę w widoku z publicznej przestrzeni. Przed komercyjną publikacją należy potwierdzić zastosowanie lokalnej swobody panoramy.
4. Ilustracja wygenerowana przez AI jest materiałem do wykorzystania zgodnie z warunkami dostawcy; nie ma gwarancji prawnoautorskiej wyłączności ani identycznej grafiki dla innych użytkowników. Fotografie referencyjne nie zostały skopiowane 1:1.

**Integracja:** nadpisać odpowiednie pięć plików w `public/assets/landmarks/`, niczego nie zmieniać w `src/core/` ani rendererze. Koordynator powinien ocenić sylwetki w rzeczywistym kadrze gry oraz ewentualnie zamówić precyzyjną korektę architektoniczną przed akceptacją.


<!-- Zlecenie 95 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS-95 — Panoramy A+ miast niemieckich

- **Zlecenie:** 95, runda 7, *Cebulak Express — Kierunek Polska*.
- **Data przygotowania:** 31.10.2026.
- **Format:** osobne ilustracje PNG, RGBA, 1620 × 900 px, profil sRGB, przezroczyste niebo; kontur zasadniczy `#1d2f3b`.
- **Źródło/narzędzie:** oryginalne ilustracje wygenerowane wbudowanym generatorem obrazów ChatGPT (GPT Image) na potrzeby zlecenia; izolacja paneli, kadrowanie, skalowanie, miejscowa korekta linii oraz dodanie sylwetki Stadtkirche wykonane programowo (Pillow, CairoSVG). Nie wykorzystano zdjęć zewnętrznych jako tekstur ani jako elementów rastrowych.
- **Prawa do użytkowania:** grafiki generowane na zamówienie właściciela projektu, przeznaczone do komercyjnego wykorzystania w grze na zasadach warunków OpenAI. Żadnych obcych logotypów, znaków towarowych ani rozpoznawalnych osób. Nie deklaruje się wyłącznych praw autorskich do samych elementów wytworzonych automatycznie.

## Wykaz

| Plik / ID | Miasto | Zidentyfikowane motywy / budynki | Kierunek widoku i uwagi |
|---|---|---|---|
| `norymberga.png` / `norymberga` | Norymberga | Kaiserburg i Sinwellturm, podwójne wieże St. Sebald, czerwone dachy Altstadt | Uproszczony widok z południa ku północy, przez dachy Starego Miasta na zamek na wzgórzu. |
| `bayreuth.png` / `bayreuth` | Bayreuth | Stadtkirche (dwie wieże z cebulastymi hełmami), barokowa fasada nawiązująca do Markgräfliches Opernhaus, wieża z miedzianą kopułą nawiązująca do Schlosskirche | Umowny widok starego centrum z południowego zachodu. Dwie wieże Stadtkirche zostały wyraźnie dorysowane; fasady środkowa i prawa są **inspirowane**, nie są dokładną rekonstrukcją geometryczną zabytków. |
| `chemnitz.png` / `chemnitz` | Chemnitz | Wieża kościelna St. Jakobi, czerwony gmach i wieża Neues Rathaus, sąsiednia zabudowa Altes Rathaus, kamienice rynku | Stylizowany widok od Marktplatz. Rozmieszczenie jest przybliżone, a nie geodezyjnie dokładne. |
| `saarbrucken.png` / `saarbrucken` | Saarbrücken | Łukowa Alte Brücke, Saara, schodząca do rzeki zabudowa, bryła Saarbrücker Schloss oraz sylwetka Schlosskirche | Umowny widok z okolic St. Johann w stronę starego Saarbrücken przez rzekę. Kontur wzgórza i zabudowy jest artystycznym skrótem. |
| `mannheim.png` / `mannheim` | Mannheim | Charakterystyczna wieża Wasserturm, fontanny Friedrichsplatz, historyczne gmachy, barka na rzece | **Uwaga:** motyw barki na Renie i wieża Wasserturm nie są widoczne z jednego rzeczywistego punktu; to zestawienie dwóch miejskich symboli wymaganych w briefie. Przed ostateczną akceptacją należy zdecydować, czy ważniejszy jest motyw barki, czy rygor jednej perspektywy. |

## Odtwarzalne opisy / prompty dla wariantów miast

**Zasady wspólne:** „Wide 16:9 side-scrolling game skyline, isolated on transparent background (no sky, no clouds), flat warm vector illustration, bold 9–10 px deep-navy `#1d2f3b` outlines, 2–4 large recognisable historic landmarks, low band of old town buildings, simple rectangular windows, soft flat shadows illuminated from upper left, no text, flags, logos, people or photographic textures; ground line touching lower 0–40 px; final sprite 1620×900 RGBA.” Generator pierwotnie oddał też arkusze zbiorcze; z nich wyizolowano pojedyncze miasta.

1. **Norymberga:** „Kaiserburg Nürnberg and characteristic Sinwell Tower on the hill behind dense red-roofed Altstadt, twin pointed towers of St. Sebald in the foreground, viewed from the south; warm sandstone, simple half-timbered gables.”
2. **Bayreuth:** „Historic central Bayreuth: Stadtkirche with two square sandstone towers and dark slate onion domes, historic baroque opera-house facades and Schlosskirche cupola, low roofs, warm cream stone and green trees.” Dwie wieże Stadtkirche dorysowano lokalnie, żeby zachować rozpoznawalny kształt.
3. **Chemnitz:** „Central Chemnitz market skyline: St. Jakobi church tower, red sandstone Neues Rathaus with its main clock tower, adjacent Altes Rathaus and reduced old-market facades, green Saxon hills far behind.”
4. **Saarbrücken:** „From near St. Johann across the Saar: historic multi-arched Alte Brücke in front, old Saarbrücken buildings, Schloss on the west bank and historic church tower above trees, low green hills.”
5. **Mannheim:** „Iconic Wasserturm of Mannheim and Friedrichsplatz fountains amid trees, historic city buildings; Rhine cargo-barge motif in foreground, compressed illustrative perspective rather than literal geography.”

## Weryfikacja obiektów (źródła referencyjne, bez kopiowania zdjęć)

- Norymberga: [Nürnberg Tourismus — historyczne centrum](https://tourismus.nuernberg.de/en/guidedtours/tour-on-your-own-walk-through-the-old-town/).
- Bayreuth: [Miasto Bayreuth — zabytki margrabiów](https://www.bayreuth.de/markgraefliche-sehenswuerdigkeiten/), [Bayreuth Tourismus — panorama](https://www.bayreuth-tourismus.de/news/das-panorama-bayreuths/), [historyczna Altstadt](https://www.filmlocations-bayern.de/Motivsuche/Historische-Altstadt-Bayreuth/).
- Chemnitz: [Chemnitz Travel — highlights w centrum](https://www.chemnitz.travel/en/must-c/sehenswuerdigkeiten/highlights-in-city-centre).
- Saarbrücken: [Tourismus Saarbrücken — Top sights](https://tourismus.saarbruecken.de/en/discovering/top_sights).
- Mannheim: [Visit Mannheim — Wasserturm i trasa zabytków](https://www.visit-mannheim.de/erleben-entdecken/radtouren-mannheim/sightseeing-tour).

## Kontrola i integracja

Wszystkie pięć plików zostało sprawdzonych lokalnie pod kątem wymiarów, trybu RGBA, przezroczystości górnej części i obecności ilustracji przy dolnej krawędzi. Arkusz oglądowy jest zapisany jako `docs/art/podglady/panoramy-95.png` na błękitnym tle; etykiety znajdują się tylko w arkuszu, nie w samych sprite'ach. Wymagany pozostaje wizualny odbiór w rzeczywistym kadrze gry, szczególnie Bayreuth i Mannheim. Nie wykonano testów npm/CI, ponieważ środowisko nie miało sieciowego dostępu do repozytorium przez Git.


<!-- Zlecenie 96 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# ASSETS-96 — Panoramy A+: Erfurt, Stuttgart, Jena, Lubeka, Fryburg Bryzgowijski

- **Zlecenie:** 96, runda 7, Cebulak Express — Kierunek Polska.
- **Data wykonania:** 2026-10-31.
- **Autor i narzędzie:** ChatGPT, natywny generator obrazów GPT Image; ręczne opracowanie, kadrowanie i normalizacja PNG z użyciem Pillow/OpenCV.
- **Format gotowy:** 1620 × 900 px, PNG RGBA, przezroczyste tło (brak nieba i chmur), linia gruntu przy dolnej krawędzi.
- **Styl:** płaska, ciepła ilustracja 2D; pogrubiony kontur granatowy `#1d2f3b`, uproszczone budynki; brak ludzi, szyldów i logotypów.
- **Licencja i przeznaczenie:** oryginalne materiały generowane w ChatGPT na zlecenie właściciela projektu, przeznaczone do komercyjnego wykorzystania w grze na zasadach korzystania z obrazów generowanych przez OpenAI; brak zapożyczonych fotografii, znaków firmowych i chronionych elementów innych gier.

| Plik | Miasto | Dominujące motywy | Źródło/narzędzie | Uwagi/obróbka |
|---|---|---|---|---|
| `erfurt.png` | Erfurt | Krämerbrücke, wieża Ägidienkirche, kamienice szachulcowe | GPT Image + Pillow | Samodzielna generacja; zmniejszenie, przezroczystość, kontury, grunt |
| `stuttgart.png` | Stuttgart | Stiftskirche, Fernsehturm, zabudowa kotliny i zielone wzgórza | GPT Image + Pillow | Samodzielna generacja; zmniejszenie, przezroczystość, kontury, grunt |
| `jena.png` | Jena | JenTower, Stadtkirche St. Michael, Soława, zielone wzgórza | GPT Image + Pillow/OpenCV | Wydzielone z wygenerowanej kompozycji wielomiejskiej; ręczne usunięcie nachodzącego elementu i wzmocnienie konturów |
| `lubeka.png` | Lubeka | Holstentor, wieże kościołów, hanzeatycka zabudowa ceglana | GPT Image + Pillow | Wydzielone z wygenerowanej kompozycji wielomiejskiej; kadrowanie, kontury |
| `freiburg.png` | Fryburg Bryzgowijski | Freiburger Münster, historyczne kamienice, lasy na zboczach | GPT Image + Pillow | Wydzielone z wygenerowanej kompozycji wielomiejskiej; wycięcie pozostałości innych obrazów, kontury |

## Budowle, punkt widzenia, prompt tematyczny

> **Uwaga o promptach:** interfejs natywnego generatora nie udostępnił pełnej treści promptu w metadanych (`prompt: ""`). Poniżej podano odtwarzalne opisy tematyczne i wspólną instrukcję stylistyczną, a nie rzekomy dosłowny zrzut ukrytego promptu systemowego. Obrazy Jeny, Lubeki i Fryburga zostały wyodrębnione z oryginalnie wygenerowanych panoram zbiorczych.

### `erfurt.png` — Erfurt

- **Budowle:** rząd domów na średniowiecznej Krämerbrücke (most kupiecki); gotycka wieża Ägidienkirche na wschodnim przyczółku; historyczne domy nad rzeką.
- **Punkt widzenia:** stylizowane ujęcie znad Gery w kierunku zabudowanego mostu; perspektywa celowo uproszczona, bez deklaracji fotograficznej zgodności 1:1.
- **Prompt tematyczny:** `Panoramic vector-style cartoon illustration of Erfurt, a long continuous row of colorful half-timbered medieval houses on the stone-arched Kraemerbruecke over the Gera River; the Gothic Aegidienkirche tower on one side, warm terracotta roofs and simple trees, no text or people, transparent background.`
- **Źródło weryfikacji budowli:** https://www.erfurt-tourismus.de/sehenswertes/kraemerbruecke/

### `stuttgart.png` — Stuttgart

- **Budowle:** Stiftskirche z dominującą wieżą i zegarem; Fernsehturm Stuttgart (wieża telewizyjna na Hoher Bopser); pas starszych kamienic w dolinie.
- **Punkt widzenia:** stylizowany widok z centrum, z wieżą Stiftskirche na bliższym planie i Fernsehturm na zalesionym grzbiecie w oddali; układ nawiązuje do autentycznego widoku miasta.
- **Prompt tematyczny:** `Flat-vector panoramic Stuttgart skyline: the ochre sandstone clock tower of Stiftskirche in the foreground, the narrow 1956 concrete Fernsehturm high above the wooded slopes of Hoher Bopser, colorful historic town roofs and green hills, clean warm cartoon colors, thick navy outlines, transparent sky.`
- **Źródła weryfikacji:** https://www.stuttgart-tourist.de/a-stiftskirche-stuttgart ; https://www.stuttgart.de/tourismus/sehenswuerdigkeiten/fernsehturm-stuttgart

### `jena.png` — Jena

- **Budowle:** JenTower (rozpoznawalny wysoki budynek o oszklonej elewacji); Stadtkirche St. Michael (historyczna wieża); budynki starego miasta; zalesione wzgórza doliny Soławy.
- **Punkt widzenia:** schematyczne ujęcie z terenów nadrzecznych w stronę centrum, z JenTower jako dominantą w osi miasta; nie jest to precyzyjna projekcja jednego zdjęcia.
- **Prompt tematyczny:** `German city skyline of Jena as a bold flat vector game landscape: cylindrical blue glass JenTower with flat top, Gothic Stadtkirche St. Michael with warm stone bell tower, short river bridge across the Saale, rows of simple red-roofed houses and broad green hills, no logos or sky, transparent alpha.`
- **Źródła weryfikacji:** https://www.uni-jena.de/en/530/jena ; https://www.visit-jena.de/sehen-und-erleben/sehenswuerdigkeiten/stadtkirche-st-michael/

### `lubeka.png` — Lubeka (Lübeck)

- **Budowle:** Holstentor — dwie masywne, okrągłe ceglane baszty i ozdobny szczyt bramny; sylwetki St. Marien i St. Petri; ceglaste szczyty dawnych budynków handlowych.
- **Punkt widzenia:** od zachodu, z publicznego trawnika na przedpolu Holstentor w stronę historycznego centrum; wieże kościelne na dalszym planie.
- **Prompt tematyczny:** `Flat colorful illustrated panorama of Luebeck from the lawn west of Holstentor: the distinctive red brick gate with two huge round towers and very steep slate cones, two green Gothic church spires rising behind, stepped Hanseatic brick gables and low foliage, thick dark navy silhouette outlines, alpha-transparent background.`
- **Źródło weryfikacji punktu widzenia i budowli:** https://www.luebeck-tourismus.de/service/stadtplan

### `freiburg.png` — Fryburg Bryzgowijski (Freiburg im Breisgau)

- **Budowle:** Freiburger Münster z wyjątkowo wysoką gotycką wieżą; starsza zabudowa z dachami ceramicznymi; dodatkowe historyczne wieżyczki w panoramie.
- **Punkt widzenia:** schematyczny widok z zachodniej części centrum ku katedrze i zielonym wzniesieniom na wschodzie; na dalszym planie wzgórza Schwarzwaldu.
- **Prompt tematyczny:** `16:9 vector city panorama of Freiburg im Breisgau featuring the instantly recognizable soaring openwork Gothic spire of Freiburg Minster above red tiled roofs, compact historic houses, secondary stone church towers, wooded Black Forest slopes in the rear, warm ochre stone, flat shading, heavy dark blue outlines, transparent background.`
- **Źródła weryfikacji:** https://visit.freiburg.de/stadterlebnis-freiburg ; https://visit.freiburg.de/historisches-kaufhaus

## Wspólna instrukcja stylistyczna dla reprodukcji

`Produce ONE isolated panorama for a casual 2D mobile game. Hand-drawn yet flat/vector-like cartoon, 2–4 large real landmark silhouettes, visually recognizable from a public viewpoint. Thick #1d2f3b outlines (target ca. 9–10 px at 1620×900), warm saturated solid colors, minimal windows and ornaments, light from upper left, flat shadow shapes. Transparent PNG with alpha; no sky, no clouds, no gradients, no readable text, no labels, no billboards, no people or logos. Keep the architecture at roughly 70–80 percent of the image height and all ground/water at the bottom edge. Final exported PNG 1620×900.`

## Prawa do przedstawianych budowli

Przedstawiono sylwetki widoczne na stałe z ogólnodostępnych przestrzeni miejskich, bez odtwarzania fotografii źródłowych. Niemiecki § 59 UrhG (panoramafreiheit) dopuszcza utrwalanie i rozpowszechnianie zewnętrznych widoków budowli położonych trwale przy publicznych drogach, ulicach i placach, w tym środkami grafiki i malarstwa. Zob. https://www.gesetze-im-internet.de/urhg/__59.html . Nie obejmuje to zastrzeżonej własności do cudzych zdjęć; takich plików nie włączono.

## Przegląd jakości i ograniczenia

- Wszystkie pięć PNG ma rozmiar **1620 × 900** i tryb **RGBA**; górne 100 wierszy są przezroczyste.
- Arkusz podglądu: `docs/art/podglady/panoramy-96.png` — wszystkie pięć na jasnoniebieskim tle z podpisami.
- Kontury wzmocnione przez segmentację ciemnogranatowych linii; pliki nie są źródłowym SVG, lecz rastrowymi ilustracjami PNG.
- Obrazy są swobodnie stylizowanymi widokami, nie geometrycznie precyzyjną rekonstrukcją. Układ budynków i proporcje poszczególnych brył mogą odbiegać od autentycznej fotografii. Wymagana jest końcowa ocena czytelności przez właściciela w kadrze gry przy skali ok. 1:5.
- Sprawdzenie w runtime gry i weryfikacja kodu projektu (`npm ci`, `typecheck`, `test`, `build`) nie zostały przeprowadzone, ponieważ w środowisku wykonawczym `git clone/pull` nie mógł rozwiązać hosta GitHub.


<!-- Zlecenie 97 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 97 — panoramy A+ (Karlsruhe, Trewir, Koblencja, Brno, Ołomuniec)

- **Data:** 2026-10-31.
- **Narzędzie:** natywny generator obrazów ChatGPT (GPT Image), następnie ręczne kadrowanie, powiększenie i wyrównanie przezroczystości skryptem Pillow.
- **Format wynikowy:** PNG RGBA, 1620 × 900 px, tło przezroczyste; światło z lewej góry; ciemnogranatowy kontur zbliżony do `#1d2f3b`; bez napisów, flag, logotypów i ludzi na pierwszym planie.
- **Prawa i licencja:** oryginalne obrazy syntetyczne, wygenerowane na potrzeby i do wykorzystania komercyjnego przez właściciela projektu „Cebulak Express”. Nie włączono cudzych zdjęć ani zewnętrznych obrazów stockowych do finalnych assetów. Samo użycie AI nie stanowi gwarancji wyłącznych praw autorskich, które zależą od prawa właściwego.
- **Plik podglądu:** `docs/art/podglady/panoramy-97.png`.

## Wykaz

| Plik (id) | Miasto | Budowle i rzeczywisty punkt widzenia | Narzędzie i poprawki | Data | Syntetyczny opis promptu | Uprawnienia |
|---|---|---|---|---|---|---|
| `karlsruhe.png` (`karlsruhe`) | Karlsruhe, Niemcy | Barokowy **Schloss Karlsruhe** (centralna wieża, oba skrzydła pałacu), regularne aleje oraz drzewa **Schlossplatz**; frontalny widok ze środka placu pałacowego od południa | GPT Image; kadrowanie, skala, zewnętrzny kontur i przezroczystość | 2026-10-31 | „Płaska, ciepła ilustracja wektorowa Karlsruhe: żółty pałac barokowy z centralną wieżą i skrzydłami, regularne aleje parkowe, mocny kontur #1d2f3b, bez nieba, tekstu i osób, panoramiczne RGBA”. | Syntetyczne, na potrzeby właściciela gry |
| `trier.png` (`trier`) | Trewir, Niemcy | **Porta Nigra**, skrzydło **Simeonstift**, sąsiadujące historyczne domy; widok od południa z rejonu Porta-Nigra-Platz / północnego końca Simeonstraße | GPT Image; kadrowanie, skala, zewnętrzny kontur i przezroczystość | 2026-10-31 | „Monumentalna ciemna brama rzymska Porta Nigra pośrodku, muzeum Simeonstift i kamienice w tle; uproszczone piaskowcowe łuki, płaskie plamy cienia, bardzo mocny kontur, bez nieba, napisów i ludzi”. | Syntetyczne, na potrzeby właściciela gry |
| `koblenz.png` (`koblenz`) | Koblencja, Niemcy | **Deutsches Eck** (pomnik konny), **Bazylika św. Kastora** (wieże po lewej), **twierdza Ehrenbreitstein** na wschodnim brzegu; szeroki widok z południowego odcinka nadreńskiej promenady ku północy i północnemu wschodowi | GPT Image; kadrowanie, lekka korekta proporcji wysokości, kontur i przezroczystość | 2026-10-31 | „Dwie strony Renu w Koblencji, pomnik konny i historyczna bazylika po lewej, forteczny masyw Ehrenbreitstein na zielonym wzgórzu po prawej, wąska woda przy dole, gruby ciemnogranatowy obrys, brak nieba, tekstu, ludzi”. | Syntetyczne, na potrzeby właściciela gry |
| `brno.png` (`brno`) | Brno, Czechy | **Katedra św. Piotra i Pawła na Petrovíe**, zabudowa na stoku i u podnóża Petrova, czerwono-biały generyczny tramwaj; wyobrażony punkt widzenia z południowego podejścia do centrum; zarys gmachu na dalszym planie **nie jest zweryfikowany jako Špilberk**, dlatego nie przypisujemy go jednoznacznie | GPT Image — wyodrębnienie przezroczystej panoramy Brna z natywnie wygenerowanego arkusza, odcięcie etykiety, przeskalowanie, kontur | 2026-10-31 | „Rozpoznawalne gotyckie bliźniacze wieże katedry Petrov nad wzgórzem i zabudową Brna, niski rząd kamienic, typowy tramwaj, grube kontury i ciepła paleta, wycinanka RGBA bez napisów”. | Syntetyczne, na potrzeby właściciela gry |
| `olomouc.png` (`olomouc`) | Ołomuniec, Czechy | **Ratusz z wieżą**, **Kolumna Trójcy Świętej** i kamienice **Horní náměstí**; widok z przeciwległej części placu na dwie dominanty | GPT Image — wyodrębnienie przezroczystej panoramy Ołomuńca z natywnie wygenerowanego arkusza, odcięcie etykiety, przeskalowanie, kontur | 2026-10-31 | „Plac Górny w Ołomuńcu: ratusz z zegarową wieżą, barokowa kolumna UNESCO i rząd kolorowych kamienic, płaskie ciepłe plamy, ciemnogranatowe kontury, panorama przezroczysta bez tekstu”. | Syntetyczne, na potrzeby właściciela gry |

## Uzasadnienie wyboru i weryfikacja motywów

- Karlsruhe: pałac i zespół osiowy, bez piramidy Marktplatz, ponieważ piramidy nie można wiarygodnie umieścić obok fasady z tego samego bliskiego punktu.
- Trewir: monumentalna Porta Nigra i jej bezpośrednie sąsiedztwo, **bez Römerbrücke**, gdyż most leży daleko od placu Porta Nigra i nie może tworzyć wiarygodnego zbliżenia w tym samym kadrze.
- Koblencja: ujęcie jest interpretacją szerokiego widoku (Deutsches Eck + przeciwległe wzgórze). Nie jest pomiarową rekonstrukcją panoramy fotograficznej.
- Brno: priorytet to rzeczywista sylwetka katedry Petrov. Tramwaj jest generyczny, bez oznaczeń przewoźnika.
- Ołomuniec: oba główne zabytki leżą przy Horní náměstí; uproszczono zdobienia kolumny i zegara, tak aby były czytelne w małej skali gry.

**Źródła referencyjne (wyłącznie identyfikacja obiektów, nie kopiowane fotografie):**
- Karlsruhe: https://guide.karlsruhe.de/db/guide-en/marktplatz1 oraz https://www.karlsruhe-erleben.de/
- Trewir: https://www.trier-info.de/en/places-of-interest/porta-nigra/ i https://www.trier-info.de/fuehrungen/stadtfuehrung-trier
- Koblencja: https://www.germany.travel/en/cities-culture/koblenz.html i https://www.visitmosel.de/en/cities-and-towns/koblenz
- Brno: https://upmb.brno.cz/wp-content/uploads/2022/06/03_Mesto.pdf i https://kultura.brno.cz/w/spilberk
- Ołomuniec: https://whc.unesco.org/en/list/859/ i https://www.visitczechia.com/en-us/things-to-do/places/landmarks/urban-architecture/c-olomouc-city-hall

## Integracja i QA

Zastąpić odpowiadające pliki w `public/assets/landmarks/` bez zmiany nazw. Każdy PNG ma kanał alfa. W silniku nakładać ilustrację na warstwy nieba gry, zachowując proporcje; zarys dolnej krawędzi powinien trafiać do linii gruntu. Dla podglądu użyć arkusza `panoramy-97.png` — jego jasnoniebieskie tło nie występuje w osobnych PNG.

**Ograniczenie:** grafiki wygenerowane przez AI mogą wymagać końcowej korekty architektonicznej przez grafika przed produkcyjną publikacją; zwłaszcza porównania z rzeczywistą perspektywą i redukcji małych detali na docelowej rozdzielczości w grze. Nie weryfikowano uruchomienia gry w tym środowisku.


<!-- Zlecenie 98 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

> **Koordynator:** odrzucono cesky-tesin (prawa część to doklejony płaski blok wody i mostu bez konturu); zostaje poprzednia wersja, ponowione w zleceniu 104.

# Zlecenie 98 — panoramy miast A+

Data wykonania: **31.10.2026**. Projekt: **Cebulak Express — Kierunek Polska**.

## Prawa i technika

Wszystkie pliki PNG są oryginalnymi opracowaniami powstałymi w ChatGPT. Wygenerowano własne koncepcje za pomocą wbudowanego **GPT Image**, a następnie wykonano korekty kadru, skali, alfa i detalu narzędziami **Pillow**; Czeski Cieszyn został dodatkowo narysowany od nowa jako grafika wektorowa z użyciem **SVG/CairoSVG** na podstawie wygenerowanej koncepcji i zweryfikowanych motywów miejskich. W źródłowych plikach nie użyto ani nie kopiowano cudzych zdjęć, logotypów, napisów czy herbów.

**Przeznaczenie / uprawnienia:** grafiki powstały na zlecenie właściciela projektu i mogą być przez niego wykorzystywane w grze i materiałach promocyjnych zgodnie z warunkami usług OpenAI oraz obowiązującym prawem. Samo wygenerowanie treści AI nie daje gwarancji wyłącznej ochrony prawnoautorskiej wszystkich elementów. Przed komercyjną premierą koordynator powinien przeprowadzić końcową kontrolę prawną i wizualną.

**Parametry wspólne:** każdy PNG ma **1620 × 900 px**, kanał **RGBA**, przezroczyste niebo, obrys ciemnogranatowy zbliżony do `#1d2f3b`, nabrzeże/trawę/wodę u dołu; brak wtopionego tekstu, nazw, logo, flag i postaci na pierwszym planie. Główne sylwetki zajmują ok. 70–80% wysokości. Arkusz podpisów jest osobnym plikiem `docs/art/podglady/panoramy-98.png` — podpisy nie znajdują się na sprite'ach.

## Lista plików i referencje

| Plik / id | Miasto | Rozpoznawalne obiekty i motywy | Punkt widzenia / uwagi | Narzędzie | Licencja / prawa do użycia |
|---|---|---|---|---|---|
| `ostrawa.png` / `ostrawa` | Ostrawa, Czechy | Zabytkowe wielkie piece huty Dolní Vítkovice, wieża szybowa, historyczny gazometr Gong i kominy; łączniki technologiczne | Widok na zespół poprzemysłowy od strony placów i ciągów technologicznych. Bez nowoczesnej nadbudowy Bolt Tower. | ChatGPT GPT Image; Pillow, korekta skali i alfa | Wygenerowane dla właściciela projektu; warunki OpenAI |
| `cesky-tesin.png` / `cesky-tesin` | Czeski Cieszyn, Czechy | Most Przyjaźni nad Olzą, ratusz na náměstí ČSA z charakterystycznym falistym szczytem i zegarem, neogotycki kościół Najświętszego Serca Jezusowego, zieleń Masarykovych sadów | Stylizowana kompozycja z polskiego brzegu w stronę czeskiego miasta. Relacje odległości ratusza i kościoła są umowne — **nie jest to fotograficznie wierny obraz z jednej stacji obserwacyjnej**. | ChatGPT GPT Image (koncepcja); ręczny projekt SVG/CairoSVG, Pillow | Wygenerowane i wektorowo opracowane dla właściciela projektu; warunki OpenAI |
| `roskilde.png` / `roskilde` | Roskilde, Dania | Dwie ceglane wieże katedry w Roskilde, stylizowane rekonstrukcje łodzi wikińskich, port i przystań fiordu | Od strony portu w stronę wyniesionej nad miastem katedry; bez współczesnej bryły muzeum z 1969 r. | ChatGPT GPT Image; kadrowanie, powiększanie, Pillow | Wygenerowane dla właściciela projektu; warunki OpenAI |
| `slupsk.png` / `slupsk` | Słupsk, Polska | Stylizowane średniowieczne mury i baszty, motywy Baszty Czarownic i Bramy Młyńskiej, ceglana bryła kościoła, pas zieleni nad Słupią | Uproszczony widok na historyczne centrum z rejonu nadrzecznych skwerów; nie stanowi dokumentacyjnego rzutu zamku. | ChatGPT GPT Image; kadrowanie, powiększanie, Pillow | Wygenerowane dla właściciela projektu; warunki OpenAI |
| `bydgoszcz.png` / `bydgoszcz` | Bydgoszcz, Polska | Trzy szachulcowe spichrze nad Brdą, barki, rzeka, most i zabudowa staromiejska ze świątynią w głębi | Perspektywa zza rzeki na nabrzeże przy ul. Grodzkiej; most i część dalszej zabudowy są uproszczonymi motywami panoramy, a nie odwzorowaniem precyzyjnego kadru. | ChatGPT GPT Image; kadrowanie, powiększanie, usunięcie artefaktów napisów, Pillow | Wygenerowane dla właściciela projektu; warunki OpenAI |

## Prompty koncepcyjne / opis użyty przy opracowaniu

Wygenerowane obrazy pochodziły z kontekstu zlecenia w ChatGPT, nie z osobno zapisanych tekstowych promptów. Poniższe teksty rekonstruują jego wymagania jako **prompty produkcyjne**, a nie dokumentują dosłowną treść niedostępnego zapisu generatora.

**Wspólny prompt stylu:** `Original flat vector game city-panorama asset, horizontal 16:9, transparent background without sky or clouds, warm saturated colors, soft flat shadows lit from upper left, bold dark navy #1d2f3b outlines approximately 9-10px at 1620px width, 2-4 large recognizable landmark silhouettes taking 70-80 percent image height, simple windows, minimum ornament, continuous bottom riverbank or ground line, no words, labels, national flags, coats of arms, logos, brands, people or photographic textures. Keep geographically sensible landmark arrangements. PNG with alpha channel.`

- **Ostrawa:** `Industrial heritage of Dolní Vítkovice in Ostrava, monumental historic blast-furnace steel framework, shaft headframe of Hlubina, brick chimney and preserved circular Gong gasometer shell, large linked architectural masses and steel conveyor walkways, from the industrial precinct; avoid modern architect-designed extensions.`
- **Czeski Cieszyn:** `Český Těšín seen from the Cieszyn side of the Olza: historical town hall of 1928 with a broad cream facade, stepped scalloped gable and central clock, the asymmetrical pointed Gothic Revival church tower of the Sacred Heart, straight concrete Friendship Bridge, low historic townhouses and green Masaryk Gardens; correct bridge and church silhouettes.`
- **Roskilde:** `Roskilde harbour and fjord with a cluster of traditional Viking longship replicas at the wooden pier, unmistakable twin Gothic brick spires of Roskilde Cathedral behind the low harbour houses and trees; water foreground, no modern museum architecture.`
- **Słupsk:** `Historic Słupsk by the Słupia, massive red-brick medieval city-wall towers and mill gate, Gothic church spire, traditional low townhouses and leafy riverside squares, historically inspired silhouettes with warm terracotta colors.`
- **Bydgoszcz:** `Bydgoszcz old city seen across the Brda, three large distinctive half-timbered granaries on Grodzka Street, quays, moored historic river barges, a bridge, low old town facades and distant Gothic church silhouette, recognizable river panorama.`

## Źródła weryfikacji miejsc (wyłącznie referencje faktograficzne, nie materiały wykorzystane w PNG)

- Ostrawa — VisitCzechia: https://www.visitczechia.com/en-us/things-to-do/places/landmarks/urban-architecture/c-ostrava-vitkovice ; VisitOstrava: https://www.visitostrava.eu/en/discover-ostrava/top-attractions/476-dolni-vitkovice-area.html
- Czeski Cieszyn — VisitCieszyn: https://visitcieszyn.com/index.php/cs/pro-to-stoj-za-to ; państwowy rejestr kościoła: https://pamatkovykatalog.cz/kostel-bozskeho-srdce-pane-12778011 ; budynek ratusza: https://www.turistika.cz/mista/cesky-tesin-radnice-na-namesti-csa/detail
- Roskilde — Muzeum Łodzi Wikingów: https://www.vikingeskibsmuseet.dk/en/visit-the-museum/exhibitions/the-five-reconstructions ; widok na katedrę z portu: https://commons.wikimedia.org/wiki/File:Roskilde_Cathedral_from_harbour.JPG
- Słupsk — strona miasta: https://www.slupsk.pl/turysta/trasy-turystyczne/spacer-po-slupsku ; trasa Gryfitów: https://www.slupsk.pl/turysta/trasy-turystyczne/spacer-po-slupsku-sladami-gryfitow
- Bydgoszcz — oficjalny portal turystyczny: https://www.visitbydgoszcz.pl/odkryj/trasy-zwiedzania/a/poznajemy-stare-miasto ; architektura spichrzy: https://www.turystyka.bydgoszcz.pl/art/24/spichrze.html

## Kontrola i ograniczenia

1. Kontrola techniczna PNG: 5 × 1620 × 900, RGBA z przezroczystym obszarem nad panoramą; arkusz podglądu osobno. Podczas transformacji usunięto napisowe artefakty generacji połączonej.
2. Jako grafiki A+ są to stylizowane panoramy, nie modele geodezyjne. Najsilniejsze przybliżenie relacji budynków dotyczy Czeskiego Cieszyna i Bydgoszczy; potrzebne zatwierdzenie koordynatora pod kątem rozpoznawalności przez mieszkańców.
3. Nie weryfikowano lokalnie integracji w Canvas i w aplikacji ani zestawu `npm ci && npm run typecheck && npm test && npm run build`, ponieważ pełne repozytorium nie dało się sklonować w środowisku plikowym. Obrazy są gotowe do umieszczenia w repozytorium w ścieżkach wymienionych wyżej.


<!-- Zlecenie 99 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 99 — panoramy A+ (2026-10-31)

**Projekt:** Cebulak Express — Kierunek Polska  
**Zastosowanie:** warstwa panoramy w Canvas 2D (bez nieba; tło gry generuje osobna warstwa).  
**Format:** wszystkie obrazy PNG RGBA, 1620 × 900 px, przezroczyste tło, dolna linia ilustracji 23–46 px nad dolną krawędzią.  
**Styl:** ciepłe, płaskie kolory; uproszczone bryły; ciemnogranatowy obrys `#1d2f3b`; światło z lewej góry.  
**Narzędzia:** natywne generowanie obrazów ChatGPT (GPT Image) oraz techniczna obróbka w Pythonie (Pillow, OpenCV): kadrowanie wygenerowanych kompozycji, skalowanie, usuwanie podpisów i niepożądanych pikseli alfa, ujednolicenie obrysu, osadzenie na płótnie RGBA. Nie wykorzystano pikseli fotografii ze stron zewnętrznych.

| Plik / miasto | Dominujące motywy (2–4) | Zamierzona perspektywa | Powstanie | Status weryfikacji |
|---|---|---|---|---|
| `lomza.png` — Łomża | ceglana katedra św. Michała Archanioła (sylwetka stylizowana), ratusz w zabudowie Starego Miasta, most nad Narwią, nadrzeczna skarpa | z przeciwległego brzegu Narwi w kierunku zabudowy centrum; widok kompozycyjny | osobna generacja AI + obróbka | architektura schematyczna; układ katedry i ratusza **nie jest rekonstrukcją jednej fotografii** |
| `olsztyn.png` — Olsztyn | Zamek Kapituły Warmińskiej z okrągłą wieżą, ceglana wieża starej zabudowy, jezioro z przystanią | artystyczny widok zza wody w kierunku starówki | kadr z wygenerowanej kompozycji AI + obróbka | **kompozycja syntetyczna:** zamek i pokazana przystań nad jeziorem nie odpowiadają jednemu rzeczywistemu punktowi obserwacji |
| `bialystok.png` — Białystok | ratusz z centralną wieżą zegarową, archikatedra z parą strzelistych wież, pierzeje Rynku Kościuszki, drzewa | wzdłuż Rynku Kościuszki w stronę wschodniej zabudowy (orientacyjnie) | kadr z kompozycji AI + obróbka | sylwetki stylizowane i nie w pełni wierne odległościom |
| `gdansk.png` — Gdańsk | Żuraw nad Motławą, hanzeatyckie kamienice Długiego Pobrzeża, wieże Głównego Miasta, historyczny żaglowiec | z Ołowianki przez Motławę w kierunku Długiego Pobrzeża | kadr z kompozycji AI + obróbka | zgodne motywy, uproszczona i skondensowana kolejność fasad |
| `tallinn.png` — Tallinn | wieża kościoła św. Olafa, średniowieczny mur i baszty starego miasta, nabrzeże z terminalem i promem | od północy, od strony portu w kierunku średniowiecznej starówki | kadr z kompozycji AI + obróbka | stylizowana panorama, nie służy do ustalania dokładnej geografii |

## Prompty źródłowe

### Łomża (osobna ilustracja)

> Panoramic vector-style sticker illustration on a transparent background, showing a colorful historic European riverside town with no people, text, or vehicles. A Gothic red-brick church crowns the leafy hill at left, pastel town buildings and a towered civic hall stretch across the skyline, and a broad arched bridge crosses the glossy blue river in front, all rendered with bold dark outlines, flat saturated colors, simple shading, and crisp cutout-style shapes.

### Olsztyn, Białystok, Gdańsk, Tallinn (wspólna generacja źródłowa; finalne pliki są odrębnymi wycinkami)

> A polished vector collage on a pale sky-blue background presents five labeled cityscape panoramas in a crisp, postcard-like style, using bold outlines, flat colors, simplified architecture, greenery, water, bridges, and harbors, with no people. The top row features Łomża’s river and arched bridge, Olsztyn’s red-brick castle and boats, and Białystok’s clock-towered civic buildings and twin-spired church; below are Gdańsk’s colorful waterfront, cathedral, crane, and sailing ship, plus Tallinn’s medieval towers, church spire, and cruise harbor.

**Zmiany w finalnych PNG:** wycięto napisy z wygenerowanego zbiorczego obrazu, usunięto tło i artefakty krawędzi, osobno przeskalowano panoramy do 1620 × 900, wzmocniono ciemnogranatowe kontury i sprawdzono kanał alfa. Arkusz `docs/art/podglady/panoramy-99.png` zawiera **wyłącznie podgląd** na jasnoniebieskim tle i etykiety miast. Etykiet nie ma w zasobach gry.

## Weryfikacja obiektów i perspektyw

Zewnętrzne zdjęcia i opracowania służyły wyłącznie do sprawdzenia charakterystycznych motywów (bez kopiowania):

- Łomża — katedra: https://zabytek.pl/pl/obiekty/lomza-katedra ; ratusz i Stary Rynek: https://www.lomza.pl/index.php/zalaczniki/index.php?wiad=151 ; most Hubala: https://historialomzy.pl/lomza-ulica-gen-wladyslawa-sikorskiego/
- Olsztyn — zamek: https://www.zalesiemazury.pl/en/old-town-in-olsztyn ; jezioro Długie: https://natura.olsztyn.eu/jezioro-dlugie-punkt-widokowy/
- Białystok — ratusz Rynek Kościuszki: https://historia3d.pl/3462/ratusz-na-rynku-kosciuszki-w-bialymstoku/ ; przestrzeń Rynku: https://bip.bialystok.pl/
- Gdańsk — Żuraw i wieże widoczne z Ołowianki: https://muzeumpomorza.pl/resource/4849_gdansk-zuraw.html
- Tallinn — wieże Starego Miasta i panoramy: https://www.visittallinn.ee/eng/visitor/ideas-tips/tips-and-guides/unforgettable-views-of-tallinn ; wieża kościoła św. Olafa: https://www.visittallinn.ee/eng/visitor/see-do/things-to-do/attractions-museums/314/st-olav-s-church-and-tower

## Licencja i pochodzenie

**Źródło:** grafika wygenerowana w ChatGPT (GPT Image), następnie technicznie przetworzona na potrzeby projektu. **Dysponent plików:** właściciel projektu. Przeznaczone do komercyjnego wykorzystania w grze zgodnie z obowiązującymi warunkami używania treści wygenerowanych przez OpenAI. Nie wykorzystano zewnętrznych fotografii jako elementów bitmapowych, marek ani logotypów.

**Ważna uwaga akceptacyjna:** wymóg „prawdziwe proporcje i kolejność z jednego rzeczywistego punktu widzenia” nie został w pełni spełniony, zwłaszcza dla Olsztyna (zamek + jezioro). To propozycje koncepcyjne A+ do kontroli redakcyjno-geograficznej przez koordynatora, a nie wierne odwzorowania topograficzne. Nie akceptować bez sprawdzenia w kadrze gry i zatwierdzenia tej interpretacji.


<!-- Zlecenie 100 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 100 — panoramy A+: Pärnu, Ryga, Bauska, Poniewież, Kowno

**Data:** 2026-10-31. **Projekt:** Cebulak Express — Kierunek Polska.

**Narzędzie źródłowe:** natywny generator obrazów ChatGPT (GPT Image). **Obróbka techniczna:** Pillow (wycięcie odpowiedniej części wygenerowanej ilustracji, usunięcie pozostałości napisów z marginesu, skalowanie Lanczos, ustawienie przezroczystości, profil sRGB i przygotowanie arkusza podglądu). Nie użyto cudzych zdjęć ani stockowych ilustracji w plikach wynikowych. Obrazy referencyjne służyły wyłącznie do sprawdzania zabytków.

**Prawa/licencja do użycia:** grafiki wygenerowane w ChatGPT; prawo korzystania z wyniku i komercyjnej eksploatacji przysługuje właścicielowi projektu na warunkach OpenAI. Sam fakt wygenerowania przez AI nie przesądza o ochronie prawem autorskim. W archiwum nie ma żadnych cudzych plików fotograficznych.

## Wykaz

| Plik | Miasto i przedstawione obiekty | Punkt widzenia / uwagi o wierności | Generator / data | Licencja |
|---|---|---|---|---|
| `parnu.png` | Pärnu, Estonia — historyczny budynek Pärnu Mud Baths (neoklasycystyczny portyk) oraz Pärnu Rannahoone (modernistyczny budynek plażowy z charakterystycznym balkonem) | Umowny panoramiczny widok z okolic nadmorskiej promenady i wydm, patrząc w stronę zabudowy uzdrowiskowej. Zestawienie dwóch fasad jest kompozycją ilustracyjną, a nie dokładnym rzutem fotograficznym. Bez współczesnego hotelowego aneksu. | ChatGPT GPT Image, 2026-10-31 | Grafika generowana, prawa korzystania właściciela projektu |
| `ryga.png` | Ryga, Łotwa — Katedra Ryska (Rīgas Doms), historyczne wieże kościelne Starego Miasta (w tym św. Piotra i św. Jakuba), zabudowa nabrzeża Dźwiny | Stylizowany widok z lewego brzegu Dźwiny na Stare Miasto. Nie włączono współczesnego mostu Vanšu: art. 25 łotewskiej ustawy o prawie autorskim nie daje ogólnego wyjątku panoramy dla zastosowań komercyjnych; status ochrony konkretnego projektu mostu nie został sprawdzony. Nie przenoszono też odległych fasad ulicy Alberta do tego ujęcia. | ChatGPT GPT Image, 2026-10-31 | Jak wyżej |
| `bauska.png` | Bauska, Łotwa — zespół zamkowy Bauskas pils: średniowieczna część zakonu inflanckiego, wieże i renesansowa rezydencja książąt Kurlandii; tereny zielone nad Mūsą | Umowny widok z przeciwległego brzegu Mūsy. Zamek został uproszczony i ma cechy syntetycznej ilustracji; kształty wież **nie są precyzyjną rekonstrukcją**. W wersji końcowej kadrem usunięto zmyślony most pojawiający się w większym szkicu AI. | ChatGPT GPT Image, 2026-10-31 | Jak wyżej |
| `panevezys.png` | Poniewież (Panevėžys), Litwa — most nad Niewiażą (Nevėžis), niska zabudowa miejska oraz **umowne** obiekty historyczne z wieżami; klimat rzeki i Senvagė | Stylizowany punkt widzenia z przeciwległego brzegu rzeki. **Uwaga jakościowa:** rysunek zawiera niewystarczająco wierne architektonicznie sylwetki; wieży kościelnej i klasycystycznego budynku nie należy przypisywać bez dalszej weryfikacji konkretnym zabytkom. Zalecana redakcyjna korekta/akceptacja lokalna. | ChatGPT GPT Image, 2026-10-31 | Jak wyżej |
| `kowno.png` | Kowno (Kaunas), Litwa — ceglana wieża Zamku Kowieńskiego, gotycki kościół św. Jerzego i typowa zabudowa historycznego śródmieścia z dalszymi wieżami | Umowny widok znad Wilii (Neris) na zamek i Starówkę. Układ i skala wież w głębi są artystycznie przybliżone; kompozycja ma utrzymać rozpoznawalną sylwetkę ceglanych budowli przy rzece. | ChatGPT GPT Image, 2026-10-31 | Jak wyżej |

## Prompty — dokumentacja pochodzenia

Dla przejrzystości zapisano opis źródłowy generacji (język angielski), z której wycięto odpowiedni fragment. Nie sugeruje to, że każdy wygenerowany plik jest osobnym wynikiem modelu — po jednej samodzielnej ilustracji Pärnu wygenerowano również arkusze pięciu miast, z których przygotowano pozostałe assety. Podpisy arkuszy zostały usunięte z końcowych plików gry.

- **`parnu.png`** — *“Wide, horizontal vector cartoon of a seaside promenade on a transparent checkerboard background, with no sky or people, rendered in crisp, bold dark outlines, flat shading, and a polished sticker-like style. A neoclassical cream building with teal roof, columned pediment, steps, windows, trees, and hedges stands left, while a modern white Art Deco complex with blue glass bands, terraces, a rounded cantilevered observation deck, and mast anchors the right; dunes, grasses, fences, boardwalk elements, benches, and landscaped greenery fill the sandy foreground.”*
- **`bauska.png`** — *“A crisp, poster-style infographic on a light sky-blue background presents five colorful, outlined vector panoramas in a grid: Pärnu’s beach and pavilion, Riga’s bridge and historic skyline, Bauska’s castle and arched bridge, Panevėžys’s riverside cityscape, and Kaunas’s fortress and church, each with water, greenery, and warm flat shading. Bold dark labels beneath each scene read ‘Pärnu (Estonia),’ ‘Ryga (Łotwa),’ ‘Bauska (Łotwa),’ ‘Poniewież (Litwa),’ and ‘Kowno (Litwa),’ with no people shown.”*
- **`ryga.png`** — *“A crisp, colorful flat-vector composition presents five detailed, landmark-filled city panoramas with bold outlines and transparent checkerboard backgrounds, plus a light-blue preview strip beneath them. The scenes depict Pärnu, Riga, Bauska, Panevėžys, and Kaunas, while the bottom banner repeats each miniature panorama with centered labels: ‘Pärnu,’ ‘Ryga,’ ‘Bauska,’ ‘Poniewież,’ and ‘Kowno,’ with no people or other text.”*
- **`panevezys.png`, `kowno.png`** — *“A crisp, colorful vector postcard on a pale blue background presents five labeled city panoramas in a tidy three-over-two grid, using bold dark outlines, flat shading, simplified architecture, greenery, bridges, and water without people or clouds. The scenes feature Pärnu’s seaside resort, Ryga’s riverfront and bridge, Bauska’s red-roofed castle, Poniewież’s churches and modern bridge, and Kowno’s fortress and church complex, with the names ‘Pärnu,’ ‘Ryga,’ ‘Bauska,’ ‘Poniewież,’ and ‘Kowno’ centered beneath each illustration.”*

## Materiały sprawdzające charakterystyczne miejsca (wyłącznie referencje)

- Pärnu Mud Baths: https://visitparnu.com/en/objekt/parnu-mud-baths/
- Pärnu Beach House: https://visitparnu.com/en/objekt/parnu-beach-house/
- Klasyczny widok Starej Rygi znad Dźwiny: https://www.celotajs.lv/en/e/vecrigaskati?lang=en
- Prawo łotewskie, wyjątek panoramy (sekcja 25 — nie obejmuje zastosowań komercyjnych): https://likumi.lv/ta/en/en/id/5138-copyright-law
- Zamek Bauska, oba historyczne człony: https://www.latvia.travel/en/sight/bauska-castle
- Poniewież — Senvagė, rzeka, wyspy i mostki: https://pu-pa.eu/eng/projects/panevezio-senvages-parkas/
- Poniewież — historia i zabudowa: https://www.panevezys.lt/en/history
- Kowno — zamek przy zbiegu Wilii i Niemna, historyczna zabudowa: https://www.nationalgeographic.com/travel/article/paid-content-kaunas-lithuania-guide

## Kontrola techniczna i ograniczenia

- Wszystkie pięć assetów ma **1620 × 900 px**, PNG **RGBA**, profil **sRGB**, przezroczyste niebo i 8 px odstępu od dolnej krawędzi do najniższej treści graficznej.
- Pliki są artystycznymi ilustracjami na podstawie modeli AI, nie geometrycznie wiernymi rekonstrukcjami widoków. W szczególności `panevezys.png` wymaga oceny przez osobę znającą miasto, a `bauska.png` — porównania sylwetki zamku z fotografią.
- Część grafik została powiększona z fragmentów arkusza zbiorczego. **Nie są to natywne osobne renderingi 1620×900**; format końcowy jest prawidłowy, ale może być widoczna interpolacja po zbliżeniu 1:1. Po zmniejszeniu do skali gry efekt powinien być znacznie mniej widoczny — nie potwierdzono tego w rendererze.
- Styl A+ zrealizowano jakościowo (płaskie plamy kolorów, granatowe kontury, duże sylwetki). Dokładnej grubości **9–10 px dla każdej linii** i proporcji 70–80% wysokości nie potwierdzono automatycznie; w `parnu.png` i `kowno.png` bryły zajmują mniejszy odsetek wysokości.
- Nie porównano wyników piksel do piksela z plikami `docs/art/probki-panoram/*-A-rysunkowa.png`, ponieważ binarne próbki repo nie były dostępne do odczytu w tym środowisku.
- **Arkusz podglądu:** `docs/art/podglady/panoramy-100.png` (podpisy występują wyłącznie na arkuszu, nie w plikach gry).

## Pytania do koordynatora

1. Czy po obejrzeniu w rendererze przy rozmiarze ok. 324×180 px interpolacja pozostaje akceptowalna, czy potrzebny jest nowy natywny rendering dla każdego miasta?
2. Czy w przypadku Poniewieża priorytetem powinna być wierna sylwetka dwuwieżowego kościoła św. Piotra i Pawła wraz z Senvagė (kosztem miejskiego mostu)?
3. Czy uproszczona rezydencja zamkowa Bauski jest wystarczająco rozpoznawalna dla mieszkańca, czy wymaga pokazania zburzonej części fortecy?


<!-- Zlecenie 101 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

# Zlecenie 101 — panoramy miast A+

- **Data wygenerowania i obróbki:** 2026-10-31.
- **Format wyjściowy:** PNG, 1620 × 900 px, RGBA, profil sRGB, przezroczyste niebo, linia gruntu/wody przy dolnej krawędzi.
- **Autor/narzędzia:** generowanie wbudowanym generatorem obrazów ChatGPT (GPT Image); obróbka techniczna w Pythonie (Pillow i OpenCV): wyodrębnienie sylwetek z arkusza, usunięcie podpisów i tła, skalowanie do 1620 × 900, wzmocnienie ciemnogranatowych konturów, spłaszczenie barw, profil sRGB.
- **Prawa/licencja:** oryginalne materiały generowane AI na zamówienie projektu. Użycie, także komercyjne, przez właściciela projektu na warunkach ChatGPT/OpenAI. Nie użyto ani nie włączono żadnej cudzej fotografii, tekstury ani logotypu. Ochrona prawnoautorska elementów tworzonych wyłącznie przez AI zależy od właściwego prawa — nie należy twierdzić, że jest automatycznie gwarantowana. Budynki są interpretacją graficzną, a nie odwzorowaniem fotografii.

## Inwentarz

| Plik | Miasto | Główne obiekty (od lewej) | Punkt widzenia / zgodność geograficzna | Narzędzie / źródło | Licencja / prawa |
|---|---|---|---|---|---|
| `mariampol.png` | Mariampol (Marijampolė, Litwa) | neobarokowa bazylika św. Michała Archanioła (dwie białe wieże); park i niska zabudowa; stylizowany zabytkowy dworzec kolejowy z ceglanym korpusem i wysoką wieżą | **Umowny montaż** centrum i dworca (nie jeden rzeczywisty punkt obserwacji); zaakcentowana zielona zabudowa miejska | ChatGPT GPT Image, scena indywidualna; Pillow/OpenCV | Wygenerowane w ChatGPT; możliwość użycia w projekcie, z zastrzeżeniami powyżej |
| `oslo.png` | Oslo (Norwegia) | ratusz Oslo Rådhus z dwiema ceglanymi wieżami; twierdza Akershus na wzniesieniu; biały ukośny dach Opery nad wodą | **Widok poglądowy od Oslofjordu ku północy**; położenie zachód → wschód: ratusz – Akershus – opera. Budynki celowo zwiększone dla czytelności | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast, odbicie poziome, Pillow/OpenCV | Wygenerowane w ChatGPT; architekturę Norwegii wolno obrazować (§ 31 åndsverkloven) |
| `krakow.png` | Kraków (Polska) | Wawel na wzgórzu, zespół sukiennic z arkadami, bazylika Mariacka z nierównymi wieżami | **Kompozycja ikonograficzna**, nie autentyczny widok z jednej ulicy: Wawel i Rynek Główny nie mogą w rzeczywistym ujęciu mieć jednocześnie takich rozmiarów | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast; Pillow/OpenCV | Wygenerowane w ChatGPT; zabytki i panorama miejska |
| `katowice.png` | Katowice (Polska) | hala Spodek, przeszklone bryły nawiązujące do Muzeum Śląskiego, czerwonoceglasty NOSPR, familoki Nikiszowca; dodatkowo sylweta wieży szybowej | **Kolaż Strefy Kultury i Nikiszowca**, nie jeden rzeczywisty widok: Nikiszowiec jest oddzielony od centrum; przesadne gabaryty przeszkleń dla czytelności w grze | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast; Pillow/OpenCV | Wygenerowane w ChatGPT; budynki stale dostępne publicznie: uwaga na art. 33 pkt 1 polskiej ustawy o prawie autorskim |

**Podgląd:** `docs/art/podglady/panoramy-101.png` — arkusz 2 × 2, jasnoniebieskie tło, podpisy poza samymi panoramami.

## Prompty źródłowe

### Mariampol — osobna generacja

> A panoramic flat-vector sticker illustration on a transparent background, featuring a straight-on townscape with bold dark outlines and no people or text: a white twin-spired baroque cathedral anchors the left, a tree-filled park with benches, lamps, paths, and low cream/blue buildings spans the center, and a red-brick historic civic building with a tall terracotta-roofed tower stands on the right. The foreground combines green lawns, shrubs, and a pale paved edge, while simplified solid colors, subtle shading, arched windows, decorative façades, greenery, and clean graphic shapes create a crisp cartoon-like skyline.

W obróbce dopasowano budynek po prawej do roli **stylizowanego dworca** (charakterystyczny materiał i wieża), choć generator określał go jako budynek publiczny. To **interpretacja**, a nie precyzyjny rysunek elewacji dworca.

### Kraków i Katowice — wspólna generacja arkusza

> A playful flat-vector collage on a light-blue background presents four postcard-style city skylines in a neat two-by-two grid, each rendered with bold outlines, vivid colors, crisp shading, greenery, and a centered dark sans-serif city label beneath it. The scenes feature Mariampol’s neoclassical churches and civic tower, Oslo’s waterfront landmarks and fortress, Kraków’s castle, cloth hall, and twin-towered church, and Katowice’s Spodek, modern towers, industrial structures, and brick neighborhoods—without people or extra text.

Obie miejskie sylwetki wyodrębniono z arkusza algorytmem komponentów spójnych. Podpisy nie zostały przeniesione do PNG gry.

### Oslo — wspólna generacja arkusza, alternatywna kompozycja

> A crisp flat-vector panorama sheet presents four transparent-background city skyline cutouts—Mariampol, Oslo, Kraków, and Katowice—in a two-by-two layout, using bold dark outlines, vibrant colors, simplified architecture, greenery, and water; each scene highlights its signature landmarks, from Mariampol’s churches and riverside townscape to Oslo’s opera house and fortress, Kraków’s basilica, Cloth Hall, and Wawel Castle, and Katowice’s Spodek, modern cultural buildings, industrial tower, and brick workers’ homes. A light-blue footer contains miniature previews labeled “Mariampol,” “Oslo,” “Kraków,” and “Katowice,” creating a polished collection of game-ready skyline stickers with no people.

Użyto odbicia poziomego wyizolowanej sylwetki Oslo w celu poprawnej kolejności geograficznej: ratusz – Akershus – opera. Nie jest to kopia ani przeróbka zdjęcia.

## Referencje faktograficzne (bez użycia plików zewnętrznych w grafice)

- Mariampol: oficjalny portal turystyczny, [bazylika](https://marijampoletic.lt/en/places-to-visit/architectural-values/basilica-of-saint-michael-the-archangel-in-marijampole/), [dworzec](https://marijampoletic.lt/en/places-to-visit/architectural-values/railway-station/) i [lista architektury](https://marijampoletic.lt/lankytinos-vietos/architekturos-vertybes/).
- Oslo: oficjalny [VisitOSLO — atrakcje](https://www.visitoslo.com/en/activities-and-attractions/10-suggestions/top-attractions/); norweska ustawa [åndsverkloven, § 31](https://lovdata.no/nav/lov/2018-06-15-40/kapI/%C2%A730) (zwłaszcza: *Byggverk kan fritt avbildes*).
- Kraków: [Kraków — Stare Miasto](https://convention.krakow.pl/getHtml?dok_id=39903) i [Kościół Mariacki](https://www.krakow.pl/getHtml?dok_id=11175).
- Katowice: [Strefa Kultury — Śląskie.travel](https://www.slaskie.travel/poi/509072/the-space-of-culture-in-katowice), [Strefa Kultury — Spodek](https://www.spodekkatowice.pl/pl/strefa-kultury/24/), [Nikiszowiec](https://www.metropolia.slaskie.travel/culturalheritage/1715/osiedle-nikiszowiec). Polska [ustawa o prawie autorskim — art. 33](https://eli.gov.pl/api/acts/DU/2021/1062/text.html) (przy komercyjnym wykorzystaniu ostateczna kwalifikacja prawna zależy od okoliczności).

## Kontrola i integracja

- [x] Cztery oddzielne obrazy `.png`, 1620 × 900, RGBA, sRGB, bez tła nieba.
- [x] Kontur ciemny, wzmocniony na zewnętrznych i wewnętrznych krawędziach; czytelność po zmniejszeniu i skala najważniejszych budowli sprawdzone wizualnie w arkuszu.
- [x] Brak tekstów i logotypów w obrazach produkcyjnych; podpisy tylko na arkuszu podglądowym.
- [x] Arkusz podglądów i niniejsza dokumentacja.
- [ ] Weryfikacja w **docelowym kadrze silnika gry** — do przeprowadzenia przez koordynatora.
- [ ] Akceptacja **kolażu ikonograficznego** zamiast rzeczywistej perspektywy dla Mariampola, Krakowa i Katowic.
- [ ] Po dołączeniu ZIP do repo uruchomić `npm ci && npm run typecheck && npm test && npm run build` oraz sprawdzić CI.

## Uwagi do koordynatora

1. Cel identyfikowalności zabytków powoduje konflikt z warunkiem jednego autentycznego punktu widzenia dla Krakowa i Katowic. W tej wersji świadomie pierwszeństwo mają rozpoznawalne sylwetki i proporcje w grze; **to decyzja do akceptacji**.
2. Stylizowany dworzec w Mariampolu oraz przeszklone bryły Muzeum Śląskiego nie są dokumentalnie dokładnymi rekonstrukcjami. Zalecane sprawdzenie przez osobę znającą miasta.
3. Przed publikacją gry zalecana jest kontrola zakresu swobody panoramy dla każdego obiektu chronionej współczesnej architektury w danej jurysdykcji. Norwegia dopuszcza obrazowanie budynków, a w Polsce art. 33 pkt 1 przewiduje odrębny wyjątek. Nie używano cudzych fotografii w produktowych PNG.


<!-- Zlecenie 103 (runda 7) z ZIP-a GPT; PNG skwantyzowane do 256 kolorów przez koordynatora. -->

> **Koordynator:** odrzucono cesky-tesin (prawa część to doklejony płaski blok wody i mostu bez konturu); zostaje poprzednia wersja, ponowione w zleceniu 104.

# ASSETS-103 — panoramy A+ (runda 7, poprawka)

Data: **2026-10-31**. Gra: **Cebulak Express — Kierunek Polska**. Grafiki mają rozdzielczość **1620×900**, kanał **RGBA** i przezroczyste tło; brak tekstów, logo, flag, herbów i postaci.

| ID / plik | Miasto | Elementy sceny i punkt widzenia | Narzędzie / poprawki | Licencja / autorstwo |
|---|---|---|---|---|
| `nykoping` / `nykoping.png` | Nyköping, Szwecja | Autorska, lekko skompresowana perspektywa **z przeciwnego brzegu Nyköpingsån** ku **Nyköpingshus**: biała wieża królewska z ciemnym dachem, ceglane skrzydła, kamienne mury obronne, niski stary Nyköping, nabrzeżna zieleń i stylizowany most. Most jest elementem krajobrazowym; nie jest dokładnym odwzorowaniem jednego istniejącego przęsła w tym kadrze. | **GPT Image w ChatGPT**, dopasowanie w Pillow do 1620×900, bez wykorzystania fragmentów zdjęć. | **Oryginalna grafika wygenerowana** na potrzeby projektu; prawo do korzystania z wyniku zgodnie z warunkami OpenAI przysługuje właścicielowi projektu. |
| `cesky-tesin` / `cesky-tesin.png` | Český Těšín (Czeski Cieszyn), Czechy | Uproszczone spojrzenie **z polskiego brzegu Olzy na czeskie nabrzeże**: niski, betonowy **Most Přátelství / Most Przyjaźni**, charakterystyczny **ochrowy ratusz** (1928–1929) ze schodkowo-łukowym szczytem i zegarem, **kościół Najświętszego Serca Jezusowego** (1894) ze smukłą wieżą, kamienice i drzewa. Budowle oddane jako panorama kompozycyjna — **ratusz jest w rzeczywistości przy náměstí ČSA, a nie bezpośrednio nad rzeką**. | **GPT Image w ChatGPT** — autorska baza ilustracyjna; **ręczne poprawki w Pillow + wektorowe w CairoSVG**: usunięcie błędnej, łukowej konstrukcji mostu i fantazyjnej wieży ratusza, narysowanie mostu belkowego oraz ratusza ze szczytem. | **Oryginalna grafika wygenerowana i ręcznie poprawiona** na potrzeby projektu; prawo do korzystania z wyniku zgodnie z warunkami OpenAI przysługuje właścicielowi projektu. |

## Prompty / opis instrukcji generacji

**Nyköping.** „Panorama A+, rysunkowa płaska ilustracja wektorowa, zamek Nyköpingshus nad Nyköpingsån: masywna biała wieża z ciemnym czterospadowym dachem, ceglane skrzydła i ruiny murów, zabudowa starego Nyköping, zieleń, woda i kamienny most; 2–4 duże dominanty, ciepłe barwy, światło z lewej góry, grube kontury granatowe #1d2f3b, bez nieba, pełna przezroczystość, bez napisów i symboli.”

**Český Těšín.** „Jedna panoramiczna ilustracja A+ czeskiego brzegu Olzy: betonowy Most Przyjaźni, ratusz Český Těšín ze schodkowo-łukowym szczytem i zegarem, neogotycki kościół Serca Jezusowego z wysoką iglicą, nabrzeże z kamienicami i zielenią; ciepłe płaskie plamy kolorów i gruby granatowy kontur, bez chmur, nieba, znaków i flag, przezroczyste tło.” Wewnętrzny prompt systemu generacji obrazu nie jest udostępniany; powyżej zapisano **brief opisowy użyty przy tworzeniu**.

## Źródła do identyfikacji obiektów (wyłącznie referencje faktograficzne, nie kopiowano zdjęć)

- Nyköpingsguiden, opis Nyköpingshus nad rzeką, wieży Kungstornet i pozostałości murów: https://www.nykopingsguiden.se/se-och-gora/nykopingshus/
- Nyköpings kommun, przestrzeń nad Nyköpingsån i położenie zamku na zachodnim brzegu: https://www.nykoping.se/contentassets/01d21b5ca23340dbaede14bd21f395cc/kulturhistoriska-omradesbeskrivningar-nykopings-tatort.-kmv-forum.-2019..pdf
- Archiwum regionalne, ratusz w Českém Těšíně z 1928/29 i charakterystyczny noworenesansowy szczyt: https://www.archives.cz/web/soka/karvina/projekt/resources/karvina/Mestska_radnice_v_Ceskem_Tesine.pdf
- Atlas architektury, kościół Božského Srdce Páně z 1894: https://www.archmap.cz/cs/objekt/28659
- Moravskoslezský kraj, historia cieszyńskich mostów: https://moravskoslezsky.kraj.cz/encyklopedie/objekty1.phtml?id=112054
- Szlak czesko-polski Olza: lokalizacja Mostu Přátelství i relacja do nabrzeża Českého Těšína: https://olza.pl/cz/turystyka/produkty-i-atrakcje/inne

## QA i ograniczenia

- Format: PNG, **1620×900, RGBA**; tło przezroczyste; spójna ciepła paleta, kontury ciemnogranatowe.
- Podgląd na błękitnym tle: `docs/art/podglady/panoramy-103.png`.
- Nie wykorzystano zdjęć ani map jako podkładu do odrysowania.
- Uwaga: panorama to **rysunkowa synteza** najważniejszych obiektów, a nie fotografia z pojedynczego miejsca z dokładnymi odległościami między nimi. Zwłaszcza ratusz Českého Těšína znajduje się przy rynku, dalej od Olzy; należy ocenić rozpoznawalność w kadrze gry.
- Do wykonania po integracji: przegląd @1/5 rozmiaru w rendererze gry. Testów `npm ci`, `typecheck`, `test`, `build` nie uruchomiono, ponieważ nie udało się pobrać pełnego repozytorium do lokalnego środowiska (brak dostępu sieciowego).


---

# ASSETS-104 — panorama A+ Czeskiego Cieszyna

**Projekt:** Cebulak Express — Kierunek Polska  
**Data opracowania:** 31 października 2026 r.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image), następnie przygotowanie eksportu za pomocą Pillow.  
**Zakres:** jedna autorska ilustracja wygenerowana przez AI, PNG RGBA 1620 × 900 px, profil sRGB.

| Id / plik | Miasto | Budowle i otoczenie | Punkt widzenia | Źródło / licencja |
|---|---|---|---|---|
| `cesky-tesin` / `cesky-tesin.png` | Czeski Cieszyn, Czechy | Po lewej neogotycki kościół Najświętszego Serca Jezusowego z wysoką wieżą; pośrodku ochrowy ratusz na náměstí ČSA z zegarem w ozdobnym szczycie; po prawej Most Przyjaźni (Most Družby), z widocznymi filarami i balustradą; poniżej Olza, drzewa i ciągłe nabrzeże | Stylizowany widok z polskiego brzegu Olzy w stronę Czeskiego Cieszyna, z elementami rozpoznawczymi zestawionymi w czytelną kompozycję | Wygenerowane w ChatGPT (GPT Image), bez kopiowania fotografii. Zasób przygotowany dla właściciela projektu do użytku komercyjnego zgodnie z warunkami narzędzia i prawem właściwym. |

## Prompt / brief zastosowany do generacji

> Płaska, ciepła, spójna panorama rysunkowa w stylu A+ miasta Český Těšín, szeroki poziomy kadr 1,8:1. Widok zza rzeki Olzy. Lewą stronę zajmuje duży neogotycki kościół z wysoką strzelistą wieżą, środek duży ratusz o ochrowej elewacji i dekoracyjnym szczycie z zegarem, a po prawej Most Przyjaźni / Most Družby ze wspornikami, filarami i balustradą, narysowany identycznym stylem jak budynki; most nie zasłania ratusza. Rzeka i nabrzeże przebiegają jednym ciągłym pasem, bez doklejanych bloków i widocznych łączeń. Duże sylwetki, mało detali, niższe kamienice z tyłu, zielone drzewa. Płaskie ciepłe barwy, mocny kontur w ciemnym granacie zbliżonym do `#1d2f3b`, światło od lewej góry, miękkie cienie w płaskich plamach. Bez gradientów, tekstur fotograficznych, nieba, chmur, napisów, szyldów, reklam, logo, flag, herbów i ludzi na pierwszym planie. Tło przezroczyste, rzeka dochodzi do dolnej krawędzi.

*Powyższy opis to brief redakcyjny wykorzystany w zleceniu, nie dosłowny zapis wewnętrznego promptu generatora.*

## Postprodukcja i kontrola

- Rozdzielczość wyjściowa generatora: **1683 × 935 px**; przeskalowano proporcjonalnie do **1620 × 900 px**, bez przycinania.
- Zachowano przezroczystość alfa; wzmocniono pełną nieprzezroczystość w obszarach, które powinny być w pełni kryjące, pozostawiając antyaliasing na krawędziach.
- Wyeksportowano PNG z dołączonym profilem **sRGB**.
- Sprawdzono wymiary, format **RGBA**, przezroczystość tła i obecność rzeki przy dolnej krawędzi.
- Arkusz kontrolny na jasnoniebieskim tle: `docs/art/podglady/panoramy-104.png`. Zawiera także podgląd panoramy w skali 1:5.
- Kompozycja jest **ilustracyjną syntezą**, a nie dosłowną panoramą fotograficzną. Zegar i najbardziej charakterystyczne sylwetki celowo powiększono dla czytelności w grze. Drobne relacje przestrzenne budowli wymagają oceny koordynatora.

## Źródła do sprawdzenia wyglądu obiektów (niekopiowane)

1. Ratusz na náměstí ČSA: https://www.turistika.cz/mista/cesky-tesin-radnice-na-namesti-csa/detail
2. Kościół Najświętszego Serca Jezusowego: https://slovo.proglas.cz/nase-porady/pred-kostelem/jubilejni-kostel-nejsvetejsiho-srdce-jezisova-v-ceskem-tesine/
3. Most Przyjaźni: https://www.slaskcieszynski.travel/culturalheritage/1019465/most-przyjani

**Prawa:** Samodzielnie wygenerowany zasób, bez użycia cudzych plików graficznych jako elementów montażu. Właściciel projektu jest uprawniony do wykorzystywania wygenerowanego wyniku zgodnie z warunkami dostawcy narzędzia; nie deklaruje się wyłącznego prawa autorskiego do samych budynków ani gwarantowanej ochrony autorskiej obrazu AI w każdym kraju.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów.

# ASSETS-105 — panoramy miast docelowych

**Zlecenie:** 105 · **Runda:** 8 · **Data:** 31.10.2026  
**Gra:** Cebulak Express — Kierunek Polska  
**Narzędzie:** wbudowany generator obrazów ChatGPT (OpenAI), końcowa obróbka PNG i QA: Python/Pillow.  
**Status:** pięć docelowych panoram i arkusz podglądu gotowe do integracji.

## Format i prawa do wykorzystania

- Każda panorama: `PNG`, `RGBA`, **1620×900 px**, przestrzeń barw sRGB, kanał alfa (brak nieba).
- Styl: rysunkowa płaska ilustracja z grubym ciemnogranatowym konturem, uproszczone okna i dachy, ciepłe kolory, światło od góry i lewej. Panorama ma osobny pas gruntu lub nabrzeża u podstawy.
- Bez napisów, reklam, herbów, logotypów, flag i postaci; bez motywów alkoholu, polityki i tragedii. Kościelne wieże pojawiają się wyłącznie jako część sylwety miasta.
- **Licencja / prawa:** grafiki wygenerowano dla tego projektu w ChatGPT; właściciel projektu otrzymuje je do wykorzystania, modyfikacji i publikacji w grze zgodnie z warunkami usługi generowania obrazów. Nie wklejono ani nie odrysowano cudzych fotografii. Zdjęcia i dokumentacja zabytków służyły jedynie sprawdzeniu brył.
- To **ilustracje stylizowane, nie wierne rekonstrukcje fotogrametryczne**: uproszczono proporcje, drobne detale i miejscami odległości dla czytelności po zmniejszeniu do 480×267.

## Wykaz plików

| Plik | Miasto | Główne elementy (lewa → prawa) | Punkt widzenia / uwagi |
|---|---|---|---|
| `public/assets/landmarks/lublin.png` | Lublin | Brama Krakowska, kamienice Starego Miasta, Wieża Trynitarska, Zamek Lubelski z donżonem | Umowny widok z rejonu Podzamcza ku zabytkowej części miasta; odległości między dominantami skompresowane. |
| `public/assets/landmarks/rzeszow.png` | Rzeszów | Wieża farna w tle, ratusz z dekoracyjnym szczytem, kamienice rynku | Spojrzenie przez Rynek w stronę ratusza, z wieżą farną na dalszym planie. **Zamek Lubomirskich celowo pominięty**: jest oddalony od rynku i wymagałby nienaturalnego montażu. |
| `public/assets/landmarks/kielce.png` | Kielce | Skały Kadzielni, Pałac Biskupów Krakowskich (dwie narożne wieże i arkadowe wejście), sylweta katedry, wzgórza | Widok frontowy pałacu z umownie domkniętą panoramą. **Kadzielnia jest umieszczona symbolicznie** i nie znajduje się dosłownie w tym samym kadrze co fasada pałacu. |
| `public/assets/landmarks/opole.png` | Opole | Ceglana Wieża Piastowska, ratusz z wysoką wieżą, kamienice Opolskiej Wenecji nad Młynówką | Umowne spojrzenie przez Młynówkę w stronę centrum; zbliżone odległości budynków, zachowane ikoniczne kształty. |
| `public/assets/landmarks/zielona-gora.png` | Zielona Góra | Zabudowa Starego Rynku, ratusz i wieża zegarowa, kamienice, ceglana Wieża Łazienna, leśne wzgórza | Panorama od strony centrum z Wieżą Łazienną przesuniętą na prawo dla rozpoznawalności; **bez winnic**. Zachowana Wieża Łazienna jest często błędnie nazywana „Głodową”: nie jest to rozebrana historyczna cylindryczna baszta. |

## Oglądane źródła referencyjne (wyłącznie bryła i położenie)

**Lublin:**
- Miasto Lublin, [turystyka — zabytki](https://student.lublin.eu/dla-studenta/zycie-w-lublinie/turystyka/).
- Miasto Lublin, [Fortyfikacje Lublina](https://miastoinspiracji.lublin.eu/trasy/fortyfikacje-lublina/).
- Zdjęcie poglądowe Bramy Krakowskiej i sylwety starówki w [LOT](https://www.lot.com/pl/pl/odkrywaj/inspiracje/blog-podrozniczy/magazyn-kaleidoscope-online/lubelskie-kraina-spokoju).

**Rzeszów:**
- Urząd Miasta Rzeszowa, [Historia ratusza](https://erzeszow.pl/print/516/8375/8420).
- Urząd Miasta Rzeszowa, [Ulica Kościuszki / dawna Farna](https://erzeszow.pl/print/516/8375/8440).
- [Fotografia poglądowa ratusza przy rynku](https://www.arrivalguides.com/en/Travelguide/RZESZOW/doandsee/city-hall-120777).

**Kielce:**
- Narodowy Instytut Dziedzictwa, [dawny pałac biskupów i katedra](https://zabytek.pl/pl/obiekty/kielce-kielce-dawny-palac-biskupow-i-katedra-2).
- [Wikimedia Commons — pałac od strony katedry](https://commons.wikimedia.org/wiki/File:Pa%C5%82ac_Biskup%C3%B3w_Krakowskich_w_Kielcach%2C_widok_od_strony_katedry.jpg).

**Opole:**
- Urząd Miasta Opola, [Wieża Piastowska](https://www.opole.pl/dla-turysty/atrakcja/wieza-piastowska).
- Urząd Miasta Opola, [Rynek i ratusz](https://www.opole.pl/trasa-historyczna-rynek-ratusz).
- Urząd Miasta Opola, [Opolska Wenecja nad Młynówką](https://www.opole.pl/dla-turysty/atrakcja/opolska-wenecja-nad-mlynowka).
- [Panorama Opola — oficjalny serwis](https://www.opole.pl/vcontent_print/node/7728).

**Zielona Góra:**
- Narodowy Instytut Dziedzictwa, [Ratusz](https://zabytek.pl/pl/obiekty/zielona-gora-ratusz).
- Narodowy Instytut Dziedzictwa, [Wieża Łazienna zwana Głodową](https://zabytek.pl/pl/obiekty/zielona-gora-wieza-lazienna-zwana-glodowa-oraz-fragmenty-murow-m).
- [Wikimedia — widok ratusza](https://en.wikipedia.org/wiki/Zielona_G%C3%B3ra).

## Prompty opisowe użyte do generacji (treść kierunkowa)

Wspólny rdzeń każdego promptu: *single wide 16:9 Polish historic city panorama; flat, warm 2D vector cartoon game art; every building, tree, roof and ground edge drawn with very thick ~9–10 px deep navy outlines (#1d2f3b), large readable silhouettes; 2–4 dominant landmarks; no sky, clouds, lettering, people, signs, brands, flags, religion as a theme, alcohol or political monuments; fully transparent background; continuous base at the bottom.*

1. **`lublin.png`** — *Old Town of Lublin from a stylised Podzamcze vantage: Krakowska Gate with Gothic red brick lower section and Baroque copper helmet on the left; high Trinitarian Tower; cream neo-Gothic Lublin Castle and broad round brick donjon on the right; low pastel historic rooftops along the hill; bold simple outlines, one continuous ground plane.*
2. **`rzeszow.png`** — *Rzeszów Market Square: large cream ornate Town Hall with stepped historic gable, arched ground-floor gallery and red roof in the centre, parish tower far behind on the left, low pastel townhouse facades with arcades to the right; warm cobblestone base; no castle artificially placed beside the market.*
3. **`kielce.png`** — *Kielce Bishop's Palace as the giant central landmark: symmetrical cream early-Baroque facade, two hexagonal corner towers with teal domes, triple arcaded loggia and red roof; simplified cathedral silhouette to the right, low Świętokrzyskie hills and symbolic pale Kadzielnia limestone at the left; warm flat cartoon illustration.*
4. **`opole.png`** — *Opole from a stylised waterfront: enormous circular red-brick Gothic Piast Tower with conical roof on the left; historic Opole Town Hall and its tall city-hall clock tower in the centre; colourful historic houses of the Opole Venice on the Młynówka channel to the right; integrated stone quay, trees and flat blue water at the bottom.*
5. **`zielona-gora.png`** — *Zielona Góra Old Town: large white Town Hall with a distinctive stacked copper domed clock tower; the rectangular red-brick preserved Łazienna Tower with lantern dome on the right, not an imaginary round crenellated tower; short pastel market buildings, subdued green wooded hills, deciduous trees, continuous cobbled ground; no vineyards, barrels or glass palm house.*

## Obróbka i kontrola jakości

- Generator: **ChatGPT — wbudowane generowanie obrazów**; finalne pliki to **osobne grafiki, nie wycinki z arkusza zbiorczego**.
- Zastosowano kadrowanie przezroczystych marginesów i próbkowanie Lanczos do dokładnego formatu 1620×900; kanał alfa zachowano, niemal niewidoczne piksele na granicy wyzerowano (alfa poniżej 8/255).
- Rzeszów: usunięto automatycznie dodany maleńki kształt przypominający flagę przy zwieńczeniu ratusza, zastępując go neutralnym metalowym finiałem (Pillow).
- Kadr wizualnie sprawdzany na błękitnym tle i przy **480×267 px**. Brak nieba w plikach docelowych; jasnoniebieskie tło znajduje się wyłącznie w arkuszu `docs/art/podglady/panoramy-105.png`.
- Przed integracją zalecany test końcowy w rzeczywistym rendererze gry, szczególnie pod kątem nakładania warstw i zasłonięcia sylwetek przez jadący pojazd.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-106 — panoramy miast docelowych (runda 8)

- **Data:** 2026-10-31
- **Projekt:** Cebulak Express — Kierunek Polska
- **Narzędzie:** generator obrazów ChatGPT (GPT Image / narzędzie natywne), bez kopiowania fotografii i bez zewnętrznych zasobów w finalnych PNG.
- **Format:** 5 × PNG RGBA, 1620 × 900 px, profil sRGB, przezroczyste tło (niebo dostarcza silnik gry).
- **Styl:** płaskie ciepłe kolory, bardzo ciemne granatowe kontury, proste płaszczyzny cieni, bez napisów, znaków firmowych, flag, herbów, ludzi i scen religijnych.
- **Prawa / licencja:** ilustracje wygenerowane dla właściciela projektu; prawa do wygenerowanych outputów przypadają właścicielowi projektu na zasadach usługi ChatGPT, w zakresie dozwolonym przez obowiązujące prawo. Zewnętrzne zdjęcia użyte wyłącznie jako referencje formy architektonicznej, nie kopiowano ich do zasobów.
- **Postprodukcja:** Pillow — przeskalowanie metodą Lanczos, normalizacja kanału alfa (pełna nieprzezroczystość w plamach koloru i czyste krawędzie), dodanie profilu sRGB. Dla Zamościa margines górny 27 px. Arkusz porównawczy także wykonany w Pillow.

## Indeks

| id | miasto | plik finalny | narzędzie | data |
|---|---|---|---|---|
| `siemiatycze` | Siemiatycze | `public/assets/landmarks/siemiatycze.png` | ChatGPT GPT Image + Pillow | 2026-10-31 |
| `zakopane` | Zakopane | `public/assets/landmarks/zakopane.png` | ChatGPT GPT Image + Pillow | 2026-10-31 |
| `nowy-targ` | Nowy Targ | `public/assets/landmarks/nowy-targ.png` | ChatGPT GPT Image + Pillow | 2026-10-31 |
| `zamosc` | Zamość | `public/assets/landmarks/zamosc.png` | ChatGPT GPT Image + Pillow | 2026-10-31 |
| `przemysl` | Przemyśl | `public/assets/landmarks/przemysl.png` | ChatGPT GPT Image + Pillow | 2026-10-31 |

## Szczegóły plików

### `siemiatycze.png` — Siemiatycze

- **id / miasto:** `siemiatycze` / Siemiatycze
- **Motywy i punkt widzenia:** Umowny widok z przedmieścia / niskiej zabudowy w kierunku miasta i łąk podlaskich. Na pierwszym planie dwa drewniane domy z okiennicami, niskie pierzeje i generyczny bus przy wiacie; za nimi jasna wieża zabytkowego kościoła i wieżyczki cerkwi; w dalszym planie meandrująca woda, łąki i bocian.
- **Odstępstwa i zastrzeżenia:** Wizualizacja krajobrazowo-miejska, nie dokumentacyjna rekonstrukcja geometrii ulic. Wąski ciek wodny symbolizuje nadbużański krajobraz regionu, nie oznacza, że Bug płynie przez śródmieście. Kościół przedstawiono w uproszczeniu z jedną główną wieżą zgodnie z opisem urzędu miasta.
- **Źródła referencyjne sprawdzone (tylko wygląd / rozmieszczenie):**
  - https://www.siemiatycze.eu/pl/informacja-turystyczna/warto-zobaczyc.html
  - https://www.siemiatycze.eu/pl/informacja-turystyczna/mini-przewodnik-turystyczny.html
  - https://podlasie.siemiatycze.pl/213-siematycze-cerkiew-pw-ss-apostolow-piotra-i-pawla-w-siemiatyczach
- **Narzędzie:** ChatGPT GPT Image (ID generacji `4864920b-767e-42cf-a2b0-6d824b510182`), następnie Pillow.
- **Data:** 2026-10-31.
- **Licencja / prawa:** grafika generowana dla projektu; prawa właściciela projektu zgodnie z opisem ogólnym powyżej.
- **Prompt przekazany generatorowi:**

  > A crisp vector cartoon panorama of a Siemiatycze-inspired small town fills the lower 70–80% of a transparent canvas, using bold dark-navy outlines, cheerful flat colors, simple shadow blocks, and no sky, text, people, signage, or visible crosses. It features timber houses and a village street with planters, a grand cream baroque church and smaller onion-domed Orthodox church among trees, plus a right-side river meadow with a stork, bus shelter, and cream minibus.

### `zakopane.png` — Zakopane

- **id / miasto:** `zakopane` / Zakopane
- **Motywy i punkt widzenia:** Umowna panorama od strony zabudowy w stylu zakopiańskim w kierunku Tatr: dwie drewniane wille z ostrymi dachami, gankami i podmurówką kamienną; szczyty Tatr z profilem Giewontu; z prawej skocznia inspirowana Wielką Krokwią i leśne zbocze.
- **Odstępstwa i zastrzeżenia:** Pominięto krzyż na Giewoncie; Gubałówka pojawia się jako łagodniejsze, zielone zbocze, a nie osobna podpisana dominanta. Sylwetki skał i skoczni uproszczono do stylu gry.
- **Źródła referencyjne sprawdzone (tylko wygląd / rozmieszczenie):**
  - https://www.zakopane.pl/strefa-miejska/aktualnosci/aktualnosci-zwykle/kwiecien-2020/w-poszukiwaniu-stylu-zakopianskiego
  - https://www.zakopane.pl/strefa-turystyczna/turystyka/spacerem-po-zakopanem/ulica-koscieliska/
  - https://visit.zakopane.pl/attractions/wielka-krokiew
- **Narzędzie:** ChatGPT GPT Image (ID generacji `9b06d798-5541-4702-aa18-d35162336530`), następnie Pillow.
- **Data:** 2026-10-31.
- **Licencja / prawa:** grafika generowana dla projektu; prawa właściciela projektu zgodnie z opisem ogólnym powyżej.
- **Prompt przekazany generatorowi:**

  > Create a crisp, cel-shaded vector game asset depicting Zakopane in a wide panoramic cutout with a transparent checkerboard background: no sky, clouds, text, people, or logos. Use bold dark-navy outlines, warm flat colors, and no gradients or textures to frame two dominant Zakopane-style wooden villas—detailed with steep shingled multi-gabled roofs, sunburst carvings, blue-paned windows, porches, dormers, chimneys, and rounded-stone foundations—amid smaller cottages, dense shrubs, and layered evergreen trees forming a continuous grassy base. Behind them, show layered Tatra ridges with a recognizable Giewont “Sleeping Knight” profile in angular gray and tan rock shapes, forested green slopes, and a Wielka Krokiew-like ski jump on the right hillside with a pale ramp and blocky inrun tower, all rendered as one cohesive, crisp PNG-style overlay asset.

### `nowy-targ.png` — Nowy Targ

- **id / miasto:** `nowy-targ` / Nowy Targ
- **Motywy i punkt widzenia:** Stylizowany frontowy widok na ratusz na Rynku, z jego jasnym klasycyzującym korpusem, centralną wieżą zegarową i przeszkloną latarnią; po bokach parterowe kamienice rynku i drewniany dom podhalański; za miastem pas Gorców i dalej szczyty Tatr.
- **Odstępstwa i zastrzeżenia:** Dunajec pominięty: z widoku frontowego na ratusz nie da się go naturalnie umieścić w tej samej przestrzeni. Tło górskie jest perspektywicznie zbliżone, ale nie odwzorowuje fotograficznie dokładnego układu wierzchołków.
- **Źródła referencyjne sprawdzone (tylko wygląd / rozmieszczenie):**
  - https://arch.nowytarg.pl/dane.php?cid=354
  - https://zabytek.pl/pl/obiekty/budynek-ratusza-miejskie-670424
  - https://visitmalopolska.pl/-/ratusz-nowy-targ
- **Narzędzie:** ChatGPT GPT Image (ID generacji `0beea615-cc05-4806-820d-25d3bb1530f1`), następnie Pillow.
- **Data:** 2026-10-31.
- **Licencja / prawa:** grafika generowana dla projektu; prawa właściciela projektu zgodnie z opisem ogólnym powyżej.
- **Prompt przekazany generatorowi:**

  > Flat, bold vector artwork in the “A+ Cebulak Express” style depicts Nowy Targ’s town square on a transparent background: the central cream-colored, navy-outlined ratusz features rhythmic blue-paned windows, an arched entrance, a pediment medallion, and a small glazed cupola, flanked by pastel arcaded townhouses and a richly detailed Podhale wooden chalet. A paved, planter-filled plaza with rounded green trees and shrubs anchors the scene, while layered evergreen hills and angular, shaded gray-blue Tatra peaks form a strong mountain backdrop; use crisp geometry, warm flat colors, heavy outlines, no gradients or textures, and no text, people, vehicles, or signage.

### `zamosc.png` — Zamość

- **id / miasto:** `zamosc` / Zamość
- **Motywy i punkt widzenia:** Widok od strony środka Rynku Wielkiego na północną pierzeję: ratusz z wysoką wieżą zegarową, zieloną kopułą i podwójnymi wachlarzowymi schodami po lewej; obok niego po PRAWEJ barwne kamienice ormiańskie z attykami i podcieniami; z lewej niższa zabudowa arkadowa.
- **Odstępstwa i zastrzeżenia:** Pominięto bastion twierdzy — nie jest widoczny z wybranego punktu na Rynku Wielkim. Bez historycznych reliefów, herbów i szczegółowych elementów sakralnych na fasadach. W postprodukcji nieco zmniejszono wysokość grafiki i dodano margines 27 px od góry, żeby nie przyciąć hełmu wieży.
- **Źródła referencyjne sprawdzone (tylko wygląd / rozmieszczenie):**
  - https://zci.zamosc.pl/page/76/rynek-wielki.html
  - https://zabytki.zamosc.pl/rejestr/219/
  - https://twierdza.zamosc.pl/pl/places/60/.html
- **Narzędzie:** ChatGPT GPT Image (ID generacji `01fc3878-f74b-4941-ba24-a48d73cbc3fd`), następnie Pillow.
- **Data:** 2026-10-31.
- **Licencja / prawa:** grafika generowana dla projektu; prawa właściciela projektu zgodnie z opisem ogólnym powyżej.
- **Prompt przekazany generatorowi:**

  > A crisp, sticker-like vector scene presents Zamość’s Rynek Wielki on a transparent background, with no text, people, sky, or clouds. In a bold comic palette and heavy navy outlines, the panoramic view centers on the cream-and-peach Town Hall with its clock tower, teal dome, sweeping twin staircase, arched entrances, and ornate details, bordered by colorful Armenian townhouses, low arcaded buildings on the left, and a warm-toned cobblestone square across the foreground.

### `przemysl.png` — Przemyśl

- **id / miasto:** `przemysl` / Przemyśl
- **Motywy i punkt widzenia:** Widok z północnego brzegu Sanu (Zasanie) w stronę starego miasta na tarasowo położonym południowym brzegu: rzeka i stalowy most kratownicowy jako umowna sylwetka, pas historycznych kamienic, kwadratowa Wieża Zegarowa z balustradową attyką po lewej, sylwety wież katedralnych w głębi, a na wyniesieniu po prawej bryła Zamku Kazimierzowskiego.
- **Odstępstwa i zastrzeżenia:** Most, sylwetki wież i zamku potraktowano symbolicznie; grafika nie jest wiernym przekrojem topograficznym. Pominięto Kopiec Tatarski z krzyżem, wszelkie flagi oraz symbole na zwieńczeniach wież.
- **Źródła referencyjne sprawdzone (tylko wygląd / rozmieszczenie):**
  - https://przemysl.pl/19967/punkty-widokowe.html
  - https://przemysl.pl/52876/pomniki-historii-w-przemyslu.html
  - https://podkarpackie.travel/produkt/zamek-kazimierzowski-w-przemyslu
  - https://www.naszewycieczki.pl/woj-podkarpackie/53-ciekawe-miejsca/1031-wieza-zegarowa-widok-na-przemysl
- **Narzędzie:** ChatGPT GPT Image (ID generacji `5841c6b0-101b-4332-8f4e-e2ff25a14e59`), następnie Pillow.
- **Data:** 2026-10-31.
- **Licencja / prawa:** grafika generowana dla projektu; prawa właściciela projektu zgodnie z opisem ogólnym powyżej.
- **Prompt przekazany generatorowi:**

  > Create a crisp, flat vector-cartoon cityscape of Przemyśl with the same composition and palette as before, replacing only the left clock tower with the authentic square, neoclassical Wieża Zegarowa: cream façade, navy outlines, layered cornices, large 10:10 clock, arched window, and a flat parapet terrace topped by a rounded finial—no dome or onion roof. Keep the twin-spired cathedral, tree-covered hilltop castle, pastel riverside buildings, arched bridge, layered blue river, greenery, and terraced embankment unchanged in style, with no sky, text, people, flags, or crosses and a transparent checkerboard background.

## Podgląd i kontrola techniczna

- Podgląd: `docs/art/podglady/panoramy-106.png` — pięć ilustracji obok siebie na tle `#bfe3f5`, a poniżej dokładnie każda w rozdzielczości widoku gry `480 × 267 px`.
- Każdy sprite: 1620 × 900, RGBA, przezroczyste tło, bez narysowanego nieba.
- Źródła internetowe nie są zasobami projektu i nie zostały dodane do ZIP.
- Uwaga artystyczna: kompozycje są stylizacjami i nie służą jako kartograficznie ścisłe panoramy; nazwy motywów opisują zamysł wizualny, nie wszystkie detale dają się jednoznacznie rozpoznać w małej skali.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-107 — panoramy miast docelowych (runda 8)

**Data opracowania:** 31.10.2026  
**Format:** 5 × PNG RGBA 1620 × 900 px, przezroczystość tła, linia gruntu / wody przy dolnej krawędzi.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image/DALL·E), następnie ręczna obróbka techniczna w Pythonie (Pillow i OpenCV): wycięcie oddzielnych motywów z arkusza generatora, usunięcie artefaktów alfa, przeskalowanie, korekty sylwetek, wypełnienie ubytków dolnej krawędzi. Nie kopiowano żadnych fotografii źródłowych.  
**Prawa/zasady użycia:** ilustracje wygenerowane dla projektu „Cebulak Express — Kierunek Polska”; właściciel projektu może używać i modyfikować dostarczone zasoby zgodnie z warunkami usługi OpenAI. Nie przenosi się licencji na zdjęcia referencyjne, które nie stanowią części plików wynikowych.

**Uwaga o wierności krajobrazowej:** obrazy to *stylizowane ilustracje rozpoznawcze*, a nie fotogrametryczne odtworzenie pojedynczego stanowiska obserwacyjnego. Niektóre zabytki (zwłaszcza Ełk, Koźle) zostały zebrane w syntetycznym układzie, aby były widoczne na małej rozdzielczości; taką różnicę względem kryterium „jeden realny punkt” należy jawnie uwzględnić przy akceptacji. W każdej pracy zachowano identyfikatory, kolorystykę i wyraziste ciemne kontury. 

## Wspólne polecenie dla grafiki AI (4 ostatnie miasta)

> A polished portfolio sheet presents five separate, sticker-like city panoramas in a unified bold cartoon vector style: thick navy outlines, warm saturated flat colors, simple shading, crisp cutouts, and transparent checkerboard backgrounds, with no text, logos, or people. The scenes depict a wooded castle and mining heritage, a fortified riverside port, a church-lined riverbank, a lakeside train and castle ruin, and an ornate palace gate—each featuring clear landmarks, green foliage, red roofs, cream façades, blue water, and dense foreground shrubs.

Po wygenerowaniu wybrano wariant arkusza, wydzielono z niego 4 niezależne panoramy, oczyszczono alfa i dopasowano do wymagań 1620 × 900 px. Tak powstałe pliki mają **wspólny styl**, ale nie należy traktować zestawień odległych punktów jako dokumentalnych panoram urbanistycznych.

## Pliki i źródła weryfikacji

### `walbrzych.png` — Wałbrzych

- **Motywy:** Zamek Książ z charakterystycznymi czerwonymi dachami, narożnymi wieżami i kopułą, tarasy arkadowe, skalisty cypel, zalesiona dolina oraz dalekie grzbiety Gór Wałbrzyskich.
- **Perspektywa:** stylizowane spojrzenie na Zamek Książ znad zalesionej doliny, ujęcie na wprost / lekko z południowego zachodu (nie określono dokładnego punktu kamery).
- **Odstępstwa:** pominięto Stara Kopalnię, ponieważ oddziela ją od zamku znaczna odległość — ich postawienie obok siebie byłoby niezgodne z wymogiem wiarygodnego kadru. Wyeksponowano sam zamek jako zespół wielu dominant.
- **Sprawdzone źródła wyglądu:** https://zabytek.pl/pl/obiekty/zamek-ksiaz-walbrzych ; https://www.ksiaz.walbrzych.pl/turystyka/zamek ; https://commons.wikimedia.org/wiki/File:Panorama_Zamku_Ksi%C4%85%C5%BC_-_Wa%C5%82brzych.jpg ; https://starakopalnia.pl/projekt/szklany-czas-wedrowki-krajobrazem/mapa-sladami-wernera/
- **Indywidualny prompt generatora:**

> A bold, cartoon-style vector depiction of Zamek Książ in Wałbrzych, shown as a wide panoramic architectural cutout on a transparent background with thick navy outlines, flat cel shading, warm high-contrast colors, and no people, text, or sky. The sprawling castle dominates the frame with cream and salmon walls, vivid red-orange roofs, towers, dormers, arched terraces, and a slate-domed cupola, while layered forests, conifers, hills, and angular rocky outcrops create a richly outlined base along the bottom.

### `kedzierzyn-kozle.png` — Kędzierzyn-Koźle

- **Motywy:** nurt Odry z bezimienną barką, nabrzeże i bastionowe mury historycznego Koźla, stylizowana murowana baszta obronna, pas dawnych kamienic.
- **Perspektywa:** umowny widok z przeciwnego brzegu Odry na zabudowę Koźla. **Nie jest to ścisła panorama z konkretnego punktu widokowego.**
- **Odstępstwa i korekta merytoryczna:** proponowany ratusz kozielskiego Rynku **nie istnieje** (został rozebrany po II wojnie światowej), dlatego nie umieszczono go jako rozpoznanego zabytku. Z pierwotnej generacji usunięto wysoką, nieprawdziwą wieżę zegarową; zarys bastionu i baszty to symbol fortyfikacji, nie wierny model geometryczny konkretnego obiektu. Port rzeczny i starówka nie leżą obok siebie w pokazanym kadrze.
- **Sprawdzone źródła:** https://kedzierzynkozle.pl/pl/node/335 ; https://kedzierzynkozle.pl/pl/strona/trasa-nr-2-wzdluz-odry-na-poludnie ; https://kedzierzynkozle.pl/pl/strona/szlakiem-twierdzy-kozle ; https://zamki.pwr.edu.pl/zamek-w-kozlu/
- **Prompt:** wspólny prompt powyżej; ręczna korekta po weryfikacji: „replace the vanished town-hall clock tower with low roofline”.

### `raciborz.png` — Racibórz

- **Motywy:** Zamek Piastowski / jego białe skrzydła, gotycka kaplica zamkowa jako historyczna sylweta ze szczytem ostrołukowym, starsza baszta obronna (uproszczenie), pas kamienic, Odra na pierwszym planie.
- **Perspektywa:** umowne ujęcie z przeciwległego brzegu Odry, pokazujące zespół zamkowy oraz dalszą zabudowę; proporcje zespołu zostały uproszczone, a odległe elementy zbliżone, aby zachować czytelność.
- **Odstępstwa:** gotyckie okna kaplicy są symboliczne, baszta i dalsza wieża to interpretacja plastyczna, a nie ścisła rekonstrukcja fotograficzna. Sakralne elementy pozostały wyłącznie sylwetami architektonicznymi.
- **Sprawdzone źródła:** https://zamki.pwr.edu.pl/zamek-piastowski-w-raciborzu/ ; https://en.wikipedia.org/wiki/Racib%C3%B3rz_Castle ; https://www.zamekpiastowski.pl/
- **Prompt:** wspólny prompt powyżej; motyw „a church-lined riverbank” dotyczył sylwety gotyckiej kaplicy i zabudowy zamku.

### `elk.png` — Ełk

- **Motywy:** tafla Jeziora Ełckiego, promenada i pomost, ceglana wieża ciśnień z szeroką głowicą, historyczna kolejka wąskotorowa bez napisów, ruiny zamku ełckiego na wyspie/półwyspie, pas kamienic.
- **Perspektywa:** stylizowana panorama od strony jeziora z celowo zestawionymi charakterystycznymi elementami Ełku. **Nie da się oglądać tak zestawionych budowli z jednego prawdziwego punktu**, co jest odstępstwem od briefu.
- **Odstępstwa:** kolej i wieża ciśnień nie są w rzeczywistości ustawione przy promenadzie i ruinach; ich położenie zostało zmienione ze względu na rozpoznawalność. Zieleń jest uproszczona i niesezonowa.
- **Sprawdzone źródła:** https://www.elk.pl/strona/691/tablice-turystyczne-opisy-atrakcji ; https://muzeum.elk.pl/kolej-waskotorowa/ ; https://powiat.elk.pl/atrakcje/480/strona/1/ruiny-zamku-na-wyspie-w-elku- ; https://600lat.elk.pl/
- **Prompt:** wspólny prompt powyżej; motyw „a lakeside train and castle ruin” powiązano z ełcką infrastrukturą i jeziorem.

### `biala-podlaska.png` — Biała Podlaska

- **Motywy:** istniejąca brama i wieża wjazdowa założenia Radziwiłłów, parterowo-piętrowe oficyny, park i duże drzewa, pas stylizowanych kamienic.
- **Perspektywa:** spojrzenie osiowo na zespół wjazdowy Radziwiłłów od strony głównego dojścia, z szerokim widokiem oficyn i zieleni (kompozycja lekko rozszerzona względem rzeczywistego kadru).
- **Odstępstwa:** pominięto sam dawny pałac, ponieważ historyczny pałac **został rozebrany w XIX wieku**; przedstawiono zachowane obiekty kompleksu. Proporcje portalu i zwieńczenia wieży są stylizowane.
- **Sprawdzone źródła:** https://www.bialapodlaska.pl/225-biala-podlaska-zespol-zamkowy-radziwillow ; https://muzeumbiala.pl/o-muzeum/historia-zalozenia-palacowego/historia/ ; https://commons.wikimedia.org/wiki/Category:Bia%C5%82a_Podlaska_Castle ; https://commons.wikimedia.org/wiki/File:Zesp%C3%B3%C5%82_pa%C5%82acowo-parkowy_Radziwi%C5%82%C5%82%C3%B3w_w_Bia%C5%82ej_Podlaskiej.jpg
- **Prompt:** wspólny prompt powyżej; motyw „an ornate palace gate” odnosi się do *zachowanej bramy i wieży*, nie do nieistniejącego pałacu.

## Arkusz podglądu

`docs/art/podglady/panoramy-107.png` zawiera 5 dużych panoram na tle `#bfe3f5`, podpisanych nazwami miast, oraz 5 miniatur w **dokładnej skali wyświetlania 480 × 267 px**. Napisy występują wyłącznie na arkuszu, nigdy na oddzielnych plikach PNG.

## Automatyczna kontrola

- sprawdzono pliki RGBA 1620 × 900 i obecność przezroczystości powyżej sylwety;
- sprawdzono dolny pas gruntu lub wody bez dużych pustych obszarów;
- wykonano podgląd zminiaturyzowany do rozmiaru stosowanego w grze;
- nie dodawano napisów, logotypów, znaków, flag ani symboli marek;
- praca dotyczy **wyłącznie zasobów graficznych**: nie uruchamiano testów repozytorium, ponieważ zakres zlecenia nie wymagał zmian kodu.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-108: Panoramy A+ miast docelowych

**Zlecenie:** 108 / runda 8  
**Data:** 2026-10-31  
**Narzędzie:** ChatGPT, wbudowany generator obrazów (GPT Image / DALL·E), konwersja i walidacja PNG: Python + Pillow.  
**Format:** osobne PNG RGBA 1620×900, profil sRGB, bez nieba i napisów, z przezroczystością.  
**Styl:** A+; gruby ciemnogranatowy kontur, płaskie barwne plamy, uproszczone cienie, duże dominanty, pas gruntu/wody przy dole.  
**Licencja / użytkowanie:** grafiki AI wygenerowane dla projektu; prawa do ich wykorzystania przez właściciela projektu zgodnie z warunkami usługi OpenAI. Nie wklejano zdjęć referencyjnych ani cudzych grafik; nie gwarantuje się wyłącznej ochrony prawnoautorskiej AI.

> Panoramy to autorskie, uproszczone ilustracje **inspirowane** układem miasta i jego motywami, a nie dokumentalne odwzorowania fotograficzne z jednego stanowiska. Łączenie rozdzielonych przestrzennie motywów (np. rynek i lotnisko) jest jawnym odstępstwem stylistycznym, opisanym niżej. Nie należy przedstawiać tych obrazów jako precyzyjnych panoram topograficznych.

## Wykaz

| Plik | Miasto | Dominanty | Punkt widzenia / uwagi |
|---|---|---|---|
| `stalowa-wola.png` | Stalowa Wola | Osiedlowe bloki funkcjonalistyczne z lat 30. XX w.; gmach dyrekcji huty w stylu art déco z geometrycznym zegarem; hale i dwa kominy przemysłowe; sosny i pas Sanu. | Umowny widok od zielonego brzegu Sanu w stronę zespołu mieszkaniowo-przemysłowego; bryły porządkują przekaz, ich odległości uproszczono. |
| `mielec.png` | Mielec | Rząd kolorowych kamienic staromiejskich; sylweta bazyliki św. Mateusza za domami; niewielki generyczny samolot śmigłowy i hala lotniska; Wisłoka jako pas wody przy dole. | Umowny poziomy widok ze skraju starówki w kierunku rynku; strefa lotnicza symbolicznie po prawej, nie jest realistycznie widoczna z rynku. |
| `ostrowiec-swietokrzyski.png` | Ostrowiec Świętokrzyski | Kamienice przy rynku; wieża kościoła tylko w tle; historyzujące czerwone hale hutnicze i wysokie kominy; dolina Kamiennej, most i niskie zielone wzgórza. | Umowny widok wzdłuż doliny Kamiennej ku miejskiemu centrum i przemysłowej części; most i rozmieszczenie zabudowy uproszczone. |
| `skarzysko-kamienna.png` | Skarżysko-Kamienna | Historyczny, rozczłonkowany budynek dworca z jasną elewacją i ciemnym dachem; generyczna zielono-kremowa lokomotywa z wagonami; torowisko; sosny i zalesione wzgórza. | Widok z torów na fasadę dworca Skarżysko-Kamienna, z pociągiem na pierwszym planie; lasy w dalszym planie. |
| `sanok.png` | Sanok | Renesansowy Zamek Królewski o prostokątnej bryle na wyniosłej skarpie; drewniane chaty skansenu; San na pierwszym planie; zalesione pasma podgórskie. | Syntetyczny widok znad Sanu w kierunku wzgórza zamkowego; skansen pokazano po prawej jako osobny rozpoznawalny motyw, nie bezpośredniego sąsiada zamku. |

## Dokumentacja plików

### `stalowa-wola.png` - Stalowa Wola

- **Motywy:** Osiedlowe bloki funkcjonalistyczne z lat 30. XX w.; gmach dyrekcji huty w stylu art déco z geometrycznym zegarem; hale i dwa kominy przemysłowe; sosny i pas Sanu.
- **Widok:** Umowny widok od zielonego brzegu Sanu w stronę zespołu mieszkaniowo-przemysłowego; bryły porządkują przekaz, ich odległości uproszczono.
- **Obejrzane źródła:**
  - [UM Stalowa Wola - o mieście](https://www.stalowawola.pl/pl/o-miescie.html)
  - [UM Stalowa Wola - dawna Dyrekcja Huty](https://www.stalowawola.pl/pl/aktualnosci/budynek-dyrekcji-naczelnej-huty-stalowa-wola-obecnie-siedziba-urzedu-miasta.html)
  - [Szlak COP - Stalowa Wola](https://cop.podkarpackie.travel/en/stalowa-wola)
- **Narzędzie i data:** ChatGPT / generator obrazów, 2026-10-31. Postprodukcja: Pillow.
- **Licencja / prawa:** wygenerowane na zlecenie projektu, prawa użycia po stronie właściciela projektu zgodnie z warunkami OpenAI.
- **Prompt odtworzeniowy (EN):** `One Stalowa Wola cityscape cutout: 1930s functionalist residential blocks and Art Deco factory administration building with geometric clock, industrial sheds and unbranded chimneys, pine trees, San river bank; flat warm vector game art, strong 9-10px navy outlines, transparent sky, no text, 16:9.`
- **Odstępstwa i uwagi:** Woda u dołu została przycięta do ciągłej, nieprzezroczystej linii przy dolnej krawędzi. Widok stanowi syntezę miasta, a nie jeden punkt foto.

### `mielec.png` - Mielec

- **Motywy:** Rząd kolorowych kamienic staromiejskich; sylweta bazyliki św. Mateusza za domami; niewielki generyczny samolot śmigłowy i hala lotniska; Wisłoka jako pas wody przy dole.
- **Widok:** Umowny poziomy widok ze skraju starówki w kierunku rynku; strefa lotnicza symbolicznie po prawej, nie jest realistycznie widoczna z rynku.
- **Obejrzane źródła:**
  - [UM Mielec - Bazylika św. Mateusza](https://www.mielec.pl/warto-zwiedzic/bazylika-sw-mateusza/)
  - [Podkarpackie - miasto Mielec](https://gminy.podkarpackie.com/miasto-mielec,58.html)
- **Narzędzie i data:** ChatGPT / generator obrazów, 2026-10-31. Postprodukcja: Pillow.
- **Licencja / prawa:** wygenerowane na zlecenie projektu, prawa użycia po stronie właściciela projektu zgodnie z warunkami OpenAI.
- **Prompt odtworzeniowy (EN):** `One Mielec panorama: colorful market townhouses in front, basilica silhouette behind, generic unbranded propeller plane above a small hangar on the right, Wisłoka river bottom; thick navy outlines, warm flat colors, transparent sky, no labels, no people, 16:9.`
- **Odstępstwa i uwagi:** Skojarzenie rynku, lotniska i Wisłoki w jednej ilustracji jest kompozycją symboliczną. Pominięto nowoczesny pawilon Jaskółka.

### `ostrowiec-swietokrzyski.png` - Ostrowiec Świętokrzyski

- **Motywy:** Kamienice przy rynku; wieża kościoła tylko w tle; historyzujące czerwone hale hutnicze i wysokie kominy; dolina Kamiennej, most i niskie zielone wzgórza.
- **Widok:** Umowny widok wzdłuż doliny Kamiennej ku miejskiemu centrum i przemysłowej części; most i rozmieszczenie zabudowy uproszczone.
- **Obejrzane źródła:**
  - [Regionalny portal turystyczny Ostrowiec.travel](https://ostrowiec.travel/informator_turystyczny/miasta_i_regiony/ostrowiec_swietokrzyski)
  - [Ostrowiecki Rynek - zdjęcie orientacyjne](https://www.cozadzien.pl/region/ostrowiec-swietokrzyski-miasto-liderem-najlepiej-zarzadzajacych-finansami/45714)
- **Narzędzie i data:** ChatGPT / generator obrazów, 2026-10-31. Postprodukcja: Pillow.
- **Licencja / prawa:** wygenerowane na zlecenie projektu, prawa użycia po stronie właściciela projektu zgodnie z warunkami OpenAI.
- **Prompt odtworzeniowy (EN):** `One Ostrowiec Swietokrzyski panorama: pastel market-square townhouses, small church tower in background, vintage red-brick steelworks without markings on right, Kamienna River and stone bridge in foreground, gentle Swietokrzyskie hills; bold navy vector outlines, flat colors, transparent sky, 16:9.`
- **Odstępstwa i uwagi:** Most i sylweta hutnicza są elementami syntetycznego pejzażu, nie wiernym ujęciem pojedynczej fotografii.

### `skarzysko-kamienna.png` - Skarżysko-Kamienna

- **Motywy:** Historyczny, rozczłonkowany budynek dworca z jasną elewacją i ciemnym dachem; generyczna zielono-kremowa lokomotywa z wagonami; torowisko; sosny i zalesione wzgórza.
- **Widok:** Widok z torów na fasadę dworca Skarżysko-Kamienna, z pociągiem na pierwszym planie; lasy w dalszym planie.
- **Obejrzane źródła:**
  - [UM Skarżysko-Kamienna - XIX-wieczny dworzec](https://um.skarzysko.pl/?p=7401)
  - [PKP PLK - stacja Skarżysko-Kamienna](https://www.plk-sa.pl/o-spolce/biuro-prasowe/informacje-prasowe/szczegoly/stacja-skarzysko-kamienna-zmienia-sie-dla-pasazerow-kolei-i-mieszkancow-miasta-6228)
  - [UM - rozbiórka dawnej kładki nad torami](https://um.skarzysko.pl/?p=9624)
- **Narzędzie i data:** ChatGPT / generator obrazów, 2026-10-31. Postprodukcja: Pillow.
- **Licencja / prawa:** wygenerowane na zlecenie projektu, prawa użycia po stronie właściciela projektu zgodnie z warunkami OpenAI.
- **Prompt odtworzeniowy (EN):** `One Skarzysko-Kamienna station panorama: large restored 19th century cream railway station with a historic dark roof and symmetrical windows, generic green and cream unbranded train with coaches on railway tracks, pine trees and low forested hills; bold 9-10px navy contour, transparent sky, no sign, 16:9.`
- **Odstępstwa i uwagi:** Celowo nie ma starej kładki nad torami: urząd miasta potwierdził, że została rozebrana. Zamiast dworca fotografii 1:1 użyto sylwety.

### `sanok.png` - Sanok

- **Motywy:** Renesansowy Zamek Królewski o prostokątnej bryle na wyniosłej skarpie; drewniane chaty skansenu; San na pierwszym planie; zalesione pasma podgórskie.
- **Widok:** Syntetyczny widok znad Sanu w kierunku wzgórza zamkowego; skansen pokazano po prawej jako osobny rozpoznawalny motyw, nie bezpośredniego sąsiada zamku.
- **Obejrzane źródła:**
  - [Narodowy Instytut Dziedzictwa - Zabytek.pl: zamek w Sanoku](https://zabytek.pl/pl/obiekty/sanok-zamek)
  - [Muzeum Historyczne w Sanoku - historia zamku](https://muzeum.sanok.pl/o-muzeum/historia/)
  - [Sanok - oficjalna informacja o muzeach](https://www.sanok.pl/asp/core/drukuj.asp?akcja=&artykul=0&menu=84)
- **Narzędzie i data:** ChatGPT / generator obrazów, 2026-10-31. Postprodukcja: Pillow.
- **Licencja / prawa:** wygenerowane na zlecenie projektu, prawa użycia po stronie właściciela projektu zgodnie z warunkami OpenAI.
- **Prompt odtworzeniowy (EN):** `One Sanok panorama: true rectangular Renaissance royal castle with red gabled roof on rocky green escarpment above the San River, wooden traditional skansen cottages on the right, layered forested foothills, flat bright cartoon-vector art, strong navy outlines, transparent sky, no text, 16:9.`
- **Odstępstwa i uwagi:** Drewniane domy skansenu nie leżą bezpośrednio pod Zamkiem Królewskim. Połączono je symbolicznie w jednej kompozycji.

## Postprodukcja i test akceptacji

1. Zachowano oryginalną warstwę przezroczystości; nie generowano nieba, chmur ani słońca.
2. Przeskalowano ilustracje do **1620 x 900 px**; w kilku plikach przycięto **wyłącznie dolny pas wody/terenu**, aby pełnił rolę nieprzerwanej linii gruntu. Nie doklejano prostokątów wody.
3. Wymuszono profil **sRGB ICC**; zapis PNG RGBA i przezroczystości z antyaliasingiem.
4. Wygenerowano `docs/art/podglady/panoramy-108.png` na tle `#bfe3f5`; drugi rząd zawiera obraz w **dokładnie 480 x 267 px** na miasto, bez tekstu w samej grafice.
5. Kontury mają postać grubej ciemnogranatowej kreski; w rzeczywistej skali gry należy jeszcze sprawdzić kontrast z tłem i pozostałymi warstwami renderera.
6. Nie weryfikowano wizualnie w uruchomionej grze. W szczególności **prawdziwej zgodności położeń wszystkich motywów z jednym punktem widzenia** nie można zagwarantować (uproszczenia opisane dla każdego miasta).

| Plik | Tryb | Rozmiar | Alfa przy górnym środku | Krycie dolnego rzędu |
|---|---|---|---|---|
| `stalowa-wola.png` | RGBA | 1620 x 900 | 0 | 100.0% |
| `mielec.png` | RGBA | 1620 x 900 | 0 | 100.0% |
| `ostrowiec-swietokrzyski.png` | RGBA | 1620 x 900 | 0 | 100.0% |
| `skarzysko-kamienna.png` | RGBA | 1620 x 900 | 0 | 100.0% |
| `sanok.png` | RGBA | 1620 x 900 | 0 | 100.0% |

## Zawartość paczki

- `public/assets/landmarks/stalowa-wola.png`
- `public/assets/landmarks/mielec.png`
- `public/assets/landmarks/ostrowiec-swietokrzyski.png`
- `public/assets/landmarks/skarzysko-kamienna.png`
- `public/assets/landmarks/sanok.png`
- `docs/art/podglady/panoramy-108.png`
- `public/assets/landmarks/ASSETS-108.md`

Gotowe do wgrania na gałąź przez koordynatora. Nie wykonywano `git push`, nie modyfikowano `main` ani kodu gry.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-109 — panoramy miast docelowych

**Zlecenie:** 109, runda 8  |  **Data wykonania:** 31.10.2026  |  **Narzędzia:** generator obrazów ChatGPT (GPT Image), Python / Pillow do technicznego skalowania, kontroli alfa i utworzenia arkusza podglądu.

## Format i zasady wykorzystania

- Każdy plik: PNG RGBA, 1620 × 900 px, z profilem sRGB i przezroczystym niebem / tłem nad zabudową.
- Styl A+: płaskie plamy barw, gruby granatowy kontur, uproszczone okna i dachy, brak napisów, logotypów, flag, ludzi oraz symboliki religijnej.
- Zdjęcia i opisy ze źródeł posłużyły do weryfikacji cech charakterystycznych; żadnego zdjęcia nie kopiowano ani nie odrysowywano. Widoki są autorskimi, stylizowanymi kompozycjami AI, a nie dokumentacją fotograficzną ani wiernymi rekonstrukcjami geodezyjnymi.
- **Licencja / prawa:** wyniki wygenerowane dla projektu i przekazane właścicielowi projektu do użytku zgodnie z warunkami korzystania z ChatGPT. Nie dołączono cudzych fotografii ani zewnętrznych grafik. Status ochrony prawnoautorskiej samych wyników AI zależy od właściwych przepisów.

## Wykaz plików

| Plik | Miasto | Wymiary | Źródło / licencja |
|---|---|---|---|
| `public/assets/landmarks/jaslo.png` | Jasło | 1620 x 900, RGBA | ChatGPT GPT Image; wynik do dyspozycji projektu |
| `public/assets/landmarks/chojnice.png` | Chojnice | 1620 x 900, RGBA | ChatGPT GPT Image; wynik do dyspozycji projektu |
| `public/assets/landmarks/kartuzy.png` | Kartuzy | 1620 x 900, RGBA | ChatGPT GPT Image; wynik do dyspozycji projektu |
| `public/assets/landmarks/bytow.png` | Bytów | 1620 x 900, RGBA | ChatGPT GPT Image; wynik do dyspozycji projektu |
| `public/assets/landmarks/ketrzyn.png` | Kętrzyn | 1620 x 900, RGBA | ChatGPT GPT Image; wynik do dyspozycji projektu |

**Podgląd:** `docs/art/podglady/panoramy-109.png` — dwie serie wszystkich pięciu miast na tle `#bfe3f5`, z dolnym rzędem w skali 480 × 267 px.

## Jasło (`jaslo.png`)

**Budowle i motywy:** Rynek i niskie, pastelowe kamienice; kamienna bryła kościoła farnego (w tle, bez symboliki religijnej); uproszczony jasny gmach magistratu; rzeka Wisłoka oraz łagodne wzniesienia.

**Punkt widzenia:** Widok syntetyczny od strony nadrzecznej ku centrum: na pierwszym planie Wisłoka i brzeg, za nimi pas kamienic, kościół po lewej i gmach administracyjny po prawej. Nie jest to fotografia z jednego punktu.

**Odstępstwa / uproszczenia:** Względem zestawu motywów: zaakcentowano Wisłokę, a nie sam Rynek. Fasada magistratu ma celowo uproszczoną i częściowo umowną bryłę; nie przedstawia historycznej, nieistniejącej wieży. Układ rzeki i obiektów jest kompozycją sceniczną, nie ściśle geodezyjną.

**Źródła obejrzane (tylko referencja wyglądu):**
- https://um.jaslo.pl/pl/rys-historyczny/
- https://zabytek.pl/pl/obiekty/jaslo-kosciol-par-pw-wniebowziecia-nmp
- https://muzeumjaslo.pl/dawne-jaslo-w-malarstwie-rysunkach-i-drzeworytach/
- https://www.miastojaslo.pl/wiadomosci/zaprzysiezenie-nowego-burmistrza-jasla-adama-kostrzaba

**Narzędzie:** ChatGPT, natywny generator obrazów.  **Data:** 31.10.2026.

**Prompt / opis wejściowy:**

> Create a bold, clean flat-vector panorama of Jasło, Poland, in a 16:9 layout with thick dark-navy outlines, warm simplified colors, limited shading, and transparent checkerboard space wherever the silhouette does not fill the frame—no sky, people, or text. From front to back, show a blue Wisłoka-like river with pale reflections, rocky grassy banks and shrubs, layered green hills, dense trees, a terrace wall, and connected pastel town buildings dominated by the fieldstone Fara church with a steep red-orange roof and separate bell tower, alongside the cream municipal building with arched entrances, regular windows, a small roof cupola, and colorful rowhouses.

**Licencja:** grafika wygenerowana dla projektu; wynik przekazany właścicielowi projektu do użycia zgodnie z warunkami ChatGPT.

## Chojnice (`chojnice.png`)

**Budowle i motywy:** Sześciokondygnacyjna gotycka Brama Człuchowska z przejazdem; fragment murów; ceglany neogotycki ratusz z dekoracyjnym szczytem; pierzeja pastelowych kamienic; mała sylweta bazyliki.

**Punkt widzenia:** Uproszczony widok od zachodu ku Staremu Miastu: Brama Człuchowska na pierwszym planie po lewej, dalsza zabudowa i ratusz w głębi po prawej, budowla sakralna jedynie jako daleka sylweta.

**Odstępstwa / uproszczenia:** Pominięto Jezioro Charzykowskie, gdyż jest oddalone od śródmieścia i nie tworzy naturalnego tła z Bramą Człuchowską. Ratusz został powiększony optycznie dla czytelności w grze.

**Źródła obejrzane (tylko referencja wyglądu):**
- https://pomorskie.travel/punkty-poi/brama-czluchowska-w-chojnicach/
- https://chojnicemuzeum.pl/chojnice-brama-czluchowska
- https://atlasmiast.umk.pl/pliki/chojnice/AHMP_Chojnice_intro.pdf
- https://en.wikipedia.org/wiki/Chojnice

**Narzędzie:** ChatGPT, natywny generator obrazów.  **Data:** 31.10.2026.

**Prompt / opis wejściowy:**

> A bold, clean vector sticker-style skyline of Chojnice, Poland, rendered in a flat cartoon aesthetic with thick navy outlines, warm colors, strong shadow blocks, and a transparent, text-free background. The wide 16:9 scene highlights Brama Człuchowska on the left, the ornate red-brick Chojnice Town Hall at center-right, and a church tower in the right background, framed by simplified rowhouses, trees, shrubs, crenellated walls, and a continuous muted ground strip.

**Licencja:** grafika wygenerowana dla projektu; wynik przekazany właścicielowi projektu do użycia zgodnie z warunkami ChatGPT.

## Kartuzy (`kartuzy.png`)

**Budowle i motywy:** Jezioro Klasztorne z pasem trzcin; zespół pokartuski z charakterystycznym szerokim łamanym, zielonkawym dachem; zabudowania przyklasztorne; proste domy z kolorowymi okiennicami; lasy i wzgórza kaszubskie.

**Punkt widzenia:** Widok ze wschodniego brzegu jeziora w stronę zabudowy pokartuskiej, z klasztornym dachem po lewej stronie i domami na prawej stronie panoramy.

**Odstępstwa / uproszczenia:** Kolor i wysokość dachu są nieco podkreślone dla rozpoznawalności; kolegiata jest wyłącznie elementem sylwety miasta, bez krzyży i scen religijnych. Zabudowa ułożona schematycznie.

**Źródła obejrzane (tylko referencja wyglądu):**
- https://www.www.kartuzy.pl/strona/informacje-dla-turystow-atrakcje-turystyczne/330-zespol-poklasztorny-z-bezcenna-kolegiata
- https://kck.kartuzy.pl/turystyka/zwiedzaj-kartuzy
- https://szwajcariakaszubska.com/en/133-szwajcaria-kaszubska-post-monastery-carthusian-complex-in-kartuzy

**Narzędzie:** ChatGPT, natywny generator obrazów.  **Data:** 31.10.2026.

**Prompt / opis wejściowy:**

> Create a wide 16:9 transparent-background vector-style panorama of Kartuzy, Kashubia, Poland. Main themes: Lake Klasztorne at the bottom with flat blue water, reeds and curved banks, the historic former Carthusian complex toward the left with its unmistakable large curved coffin-lid-shaped copper-green roof as an architectural silhouette, a low red-brick former monastery building, a few simple pastel Kashubian houses with blue shutters toward the right, and rolling Kashubian wooded hills and fir trees behind. Very thick dark navy outlines on every building, roof, tree, shore and wave, simple warm flat colors, no sky, no text, no religious symbols, no people, no photographic details.

**Licencja:** grafika wygenerowana dla projektu; wynik przekazany właścicielowi projektu do użycia zgodnie z warunkami ChatGPT.

## Bytów (`bytow.png`)

**Budowle i motywy:** Zamek krzyżacki z cegły na wzniesieniu (masywne mury, trzy baszty okrągłe i wieża czworoboczna); dachówki; niska, kolorowa zabudowa śródmiejska; kaszubskie lasy i wzgórza.

**Punkt widzenia:** Widok z niżej położonego fragmentu miasta ku zamkowi na wzgórzu. Kamienice i drzewa w pierwszym planie; zamek zajmuje środek i górną część kadru.

**Odstępstwa / uproszczenia:** Baszty i cała warownia zostały celowo powiększone w proporcji do kamienic, aby zachować czytelność na małym ekranie; brak oddalonego jeziora w perspektywie zamku.

**Źródła obejrzane (tylko referencja wyglądu):**
- https://www.bytow.com.pl/pl/index.php?id=152&idd=94
- https://turystyka.wp.pl/zatopione-miasto-i-przekleta-kamienica-tego-nie-wiedziales-o-popularnym-regionie-polski-6762626215598912a

**Narzędzie:** ChatGPT, natywny generator obrazów.  **Data:** 31.10.2026.

**Prompt / opis wejściowy:**

> A bold, flat-shaded vector game asset depicts Bytów Castle and its surrounding town in a wide 16:9 cutout composition with a transparent background, thick dark-navy outlines, saturated colors, and no gradients, textures, text, people, vehicles, or logos. The layered scene features a red-orange Teutonic castle with multiple towers, slit windows, steep roofs, gabled central halls, and stone foundations; colorful foreground townhouses, lush trees, evergreen shapes, rolling green hills, and a grassy base complete the recognizable Bytów panorama.

**Licencja:** grafika wygenerowana dla projektu; wynik przekazany właścicielowi projektu do użycia zgodnie z warunkami ChatGPT.

## Kętrzyn (`ketrzyn.png`)

**Budowle i motywy:** Trójskrzydłowy, niski zamek krzyżacki z cegły na kamiennym cokole; obronna gotycka bazylika św. Jerzego jako sylweta w tle; domy i drzewa; odcinek rzeki Guber i łagodne mazurskie wzniesienia.

**Punkt widzenia:** Widok syntetyczny od południa przez dolinę Gubra ku Staremu Miastu, z bazyliką po stronie zachodniej (lewej) i zamkiem po stronie wschodniej (prawej).

**Odstępstwa / uproszczenia:** W miejsce sugerowanego mazurskiego jeziora pokazano małą rzekę Guber, historycznie związaną z otoczeniem zamku; zrezygnowano z motywów wojennych. Sylwety i odległości zostały uproszczone.

**Źródła obejrzane (tylko referencja wyglądu):**
- https://zabytek.pl/pl/obiekty/ketrzyn-zamek?setlang=1
- https://www.muzeum.ketrzyn.pl/zamek/
- https://medievalheritage.eu/pl/strona-glowna/zabytki/polska/ketrzyn-bazylika-sw-jerzego/
- https://mazury24.eu/atrakcje-turystyczne/bazylika-sw-jerzego%2C739/zdjecia

**Narzędzie:** ChatGPT, natywny generator obrazów.  **Data:** 31.10.2026.

**Prompt / opis wejściowy:**

> A bold, clean vector-style cartoon panorama of Kętrzyn, Poland, presented as a wide horizontal PNG with a transparent upper background and no text, logos, people, flags, or signage. Thick dark-navy outlines, flat warm colors, and simple geometric shading depict the Teutonic Castle in the right foreground, St. George’s Basilica on the left, colorful town buildings and trees between them, rolling green hills behind, and a winding blue stream with grassy banks, reeds, shrubs, and rocks across the bottom.

**Licencja:** grafika wygenerowana dla projektu; wynik przekazany właścicielowi projektu do użycia zgodnie z warunkami ChatGPT.

## Kontrola techniczna

- Sprawdzono rozmiar, RGBA, obecność pełnej przezroczystości w górnej części oraz ciągłość dolnej krawędzi.
- W celu redukcji otoczek przezroczystości skrajne wartości alfa (0–3 oraz 250–255) znormalizowano; antyaliasing pozostał zachowany.
- W każdej panoramie sprawdzono podgląd w docelowej skali 480 × 267; grube kontury zachowują kontrast.
- **Uwaga merytoryczna:** układy wielu budowli w kompozycjach są syntetyczne i przesadzone skalą. Do zatwierdzenia przez koordynatora pod kątem rozpoznawalności lokalnej; nie należy traktować ich jako gwarantowanego widoku z jednego rzeczywistego punktu.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-110 — panoramy A+ miast docelowych

- **Zlecenie:** 110, runda 8 — 31.10.2026.
- **Format każdego zasobu:** PNG, 1620×900, RGBA, przezroczystość poza panoramą.
- **Styl:** płaskie barwy, gruby granatowy kontur zbliżony do `#1d2f3b`, cienie plamami, perspektywa ilustracyjna, bez napisów, znaków, logotypów, nieba, chmur i ludzi.
- **Narzędzie:** natywne generowanie obrazów w ChatGPT (GPT Image); skalowanie, wycinanie panelu, lokalna korekta palety, arkusz podglądu: Python / Pillow.
- **Licencja / przeznaczenie:** ilustracje wygenerowane na zlecenie właściciela projektu „Cebulak Express — Kierunek Polska”; do użycia przez właściciela projektu na warunkach OpenAI. Referencje fotograficzne służyły wyłącznie do weryfikacji wyglądu — nie zawarto ich w plikach ani ich nie odrysowano.

**Zastrzeżenie:** są to swobodne, uproszczone ilustracje topograficzne, nie reprodukcje fotograficznych widoków z dokładnie wyznaczonych punktów geodezyjnych. Punkty obserwacji opisują rodzaj kadru. W miejscach, gdzie krajobraz regionalny i budynki nie tworzą potwierdzonej wspólnej osi widokowej, jest to zaznaczone.

## 1. `bielsk-podlaski.png` — Bielsk Podlaski

- **Motywy:** klasycystyczno-barokowy ratusz (dziś muzeum) z jasną elewacją, czterospadowym czerwonym dachem i charakterystyczną wieżą zegarową; drewniane domy z ozdobnymi okiennicami; odległe sylwety cerkwi i kościoła; drzewa i fragment placu.
- **Punkt widzenia:** stylizowana perspektywa z poziomu rynku na ratusz, domy jako boczne obramowanie. Dodatkowe wieże religijne to umowna daleka sylweta, a nie dokładny fotomontaż osi ulicy.
- **Oglądane źródła:** https://pl.wikipedia.org/wiki/Ratusz_w_Bielsku_Podlaskim ; https://www.tripadvisor.in/Attraction_Review-g1087318-d8766694-Reviews-Museum_in_Bielsk_Podlaski-Bielsk_Podlaski_Podlaskie_Province_Eastern_Poland.html ; https://barbarabanka.com/pl/ilustracje/architektura/ (jedynie cechy architektoniczne, bez kopiowania kompozycji).
- **Prompt / brief generacji:** „Single clean 16:9 transparent flat-vector panorama of Bielsk Podlaski; large cream historic town hall with red hipped roof and clock tower, Podlasie wooden houses with shutters, discreet distant cupolas and steeple, cobbled ground, heavy dark-navy 9–10 px strokes, warm cel-shaded blocks; no sky, logos, text or people”.
- **Odstępstwa:** uproszczone proporcje ratusza i umowna perspektywa w celu zwiększenia czytelności przy 480×267 px.

## 2. `hajnowka.png` — Hajnówka

- **Motywy:** puszczańskie dęby i świerki, sympatyczny żubr, zielona lokomotywa leśnej kolejki wąskotorowej z odkrytymi wagonami, drewniany dom podlaski.
- **Punkt widzenia:** nisko z krawędzi leśnej polany przy torze kolei wąskotorowej — sceneria regionalna, nie potwierdzona dokładna lokalizacja jednoczesnego ujęcia żubra i pociągu.
- **Oglądane źródła:** https://www.hajnowka.pl/strona/dla-turysty-szlak-po-duchowa-i-witalna-energie-spacer-po-atrakcjach-hajnowki-inne/923 ; https://hajnowka.bialystok.lasy.gov.pl/ (Nadleśnictwo Hajnówka, „Wąskotorowe Kolejki Leśne”); https://bialowieza.net.pl/package/wycieczka-poznajemy-okolice-hajnowki/ .
- **Prompt / brief generacji:** „One transparent 16:9 A+ vector cartoon panorama of Hajnówka: old oak, tall dark conifers, friendly European bison on meadow, green-red narrow-gauge forest locomotive pulling open-sided brown wagons, one timber cottage, ground baseline; very thick navy outlines, no sky, signs, humans, modern cathedral”.
- **Odstępstwa:** świadome pominięcie soboru Świętej Trójcy (współczesna architektura autorska); kolejka i żubr są zestawionymi symbolami okolicy.

## 3. `monki.png` — Mońki

- **Motywy:** łoś w szuwarach, dwa bociany na łące, wijąca się rzeczka/rozlewisko w stylistyce Biebrzy, niska drewniana zabudowa, odległa uproszczona sylweta jasnego kościoła z czerwoną wieżą.
- **Punkt widzenia:** umowna perspektywa z nadbiebrzańskiej łąki w kierunku niewielkiego miasteczka. **To kompozycja regionalna — nie dosłowny widok Biebrzy z centrum Moniek.**
- **Oglądane źródła:** https://www.turystyka.monki.pl/gmina-monki (materiał ilustracyjny z wieżą kościoła); https://www.e-monki.pl/historiamoniek/album/index.html (zdjęcie zabudowy miasta); https://pl.wikipedia.org/wiki/Biebrza%C5%84ski_Park_Narodowy (kontekst przyrodniczy).
- **Prompt / brief generacji:** „Transparent bold 16:9 game panorama of Mońki/Biebrza meadows: friendly broad-antlered moose in reeds, two white storks, winding blue-gray river, timber homes and small white red-roofed tower behind, big dark navy outlines, simplified warm foliage, no sky, crosses, texts, logos or people”.
- **Odstępstwa:** połączenie miasta z krajobrazem powiatu monieckiego na jednym rysunku; kościół tylko jako część sylwety.

## 4. `sokolka.png` — Sokółka

- **Motywy:** budynek Urzędu Miejskiego przy placu Kościuszki 1, charakterystyczny portyk z kolumnami, czerwony dach; niska żółtawa kamienica; domy drewniane z okiennicami; zarys Wzgórz Sokólskich.
- **Punkt widzenia:** stylizowany widok z placu Kościuszki na front urzędu, z uproszczonymi elewacjami po bokach; dalekie pagórki są graficznym akcentem regionu.
- **Oglądane źródła:** https://sokolka.pl/informacje-o-urzedzie.html ; https://sokolka.pl/2022/09/08/zabytkowa-kamienica-zmienia-swoj-wyglad/ ; https://sokolka.pl/2026/02/17/gminne-centrum-przesiadkowe-w-sokolce-zostalo-uroczyscie-otwarte/ (informacja o rozbiórce dawnego dworca).
- **Prompt / brief generacji:** „One 16:9 transparent flat-vector Sokółka market-square panorama, central historic-looking cream city hall with four-column entrance portico and terracotta roof, nearby ochre tenement and traditional timber houses, rounded Sokółka hills, flat warm cel shading, clear navy 9–10 px outlines, no sky, flags, text or people”.
- **Odstępstwa:** **zrezygnowano z dawnego dworca Sokółki**, ponieważ został wyburzony i zastąpiony nowym Gminnym Centrum Przesiadkowym otwartym 16.02.2026; nie wykorzystano też współczesnego budynku jako architektury autorskiej. Usunięto flagi z portyku ratusza.

## 5. `grajewo.png` — Grajewo

- **Motywy w dostarczonej grafice:** dwa bociany w gnieździe na słupie, łąki biebrzańskie z wodą i sitowiem, domy o czerwonych dachach, niewielka neogotycka wieża kościoła w tle. Kolor ścian wieży skorygowano na kremowo-żółty, zgodnie z miejskimi referencjami.
- **Punkt widzenia:** **umowny** widok krajobrazu regionu z Grajewem na horyzoncie, nie z jednego fizycznie zweryfikowanego punktu. Krajobraz i architektura ułożone kompozycyjnie.
- **Oglądane źródła:** https://podlaskie.eu/region/odkrywamy-podlaskie-gminy-grajewo.html (zdjęcie panoramy i kościoła); https://zabytek.pl/pl/obiekty/grajewo-dworzec-kolejowy ; https://zabytek.pl/pl/obiekty/grajewo-wieza-cisnien (weryfikacja dodatkowych motywów miejskich, niewykorzystanych w finalnym kadrze); https://lgd-bdn.pl/grajewo-miasto/ .
- **Prompt / brief generacji:** „Panoramic transparent vector illustration of Grajewo with meadows and storks, small cluster of Polish townhouses and a neo-Gothic steeple on the skyline, thick dark navy outlines, bold flat colors, broad foreground ground/waterline, no sky, text, logos or people”.
- **Sposób powstania / odstępstwa:** generator po osobnych grafikach pozostałych czterech miast zwrócił Grajewo jako **panel w wieloscenowej ilustracji**, a nie jako osobny obraz. Panel wyodrębniono i powiększono jednorodnie, wykadrowano do 1620×900, umieszczono na przezroczystym tle i ręcznie skorygowano paletę świątyni. Finalny motyw różni się od rozważanego dworca kolejowego z wieżą ciśnień: zrezygnowano z nich, ponieważ w użytecznym ujęciu generator pokazał zamiast nich pejzaż regionalny z kościołem. To asset o niższej nominalnej szczegółowości źródła; rekomendowany do kontroli przez koordynatora w kadrze gry.

## Kontrola techniczna

| id | wymiary | kolor | przezroczystość | wersja 480×267 |
|---|---|---|---|---|
| `bielsk-podlaski` | 1620×900 | RGBA | tak, 49.7% pikseli w pełni przezroczystych | uwzględniono w podglądzie |
| `hajnowka` | 1620×900 | RGBA | tak, 31.1% pikseli w pełni przezroczystych | uwzględniono w podglądzie |
| `monki` | 1620×900 | RGBA | tak, 43.6% pikseli w pełni przezroczystych | uwzględniono w podglądzie |
| `sokolka` | 1620×900 | RGBA | tak, 32.7% pikseli w pełni przezroczystych | uwzględniono w podglądzie |
| `grajewo` | 1620×900 | RGBA | tak, 55.0% pikseli w pełni przezroczystych | uwzględniono w podglądzie |

Arkusz porównawczy: `docs/art/podglady/panoramy-110.png` — pięć obrazów w kolejności zlecenia, pierwszy rząd 640×356, drugi rząd 480×267, tło `#bfe3f5`.

**Uwagi do weryfikacji redakcyjnej:** Cechy charakterystyczne budynków sprawdzono na materiałach poglądowych, ale w panoramach A+ celowo pominięto część szczegółów elewacji. Ani wizerunki, ani zdjęcia z witryn referencyjnych nie zostały włączone do plików PNG. Zachowana jest zgodność stylistyczna, natomiast dokładna kolejność brył i kąt widzenia w ujęciach syntetycznych wymagają akceptacji artystycznej właściciela gry.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-111 — panoramy A+ miast docelowych

**Projekt:** Cebulak Express — Kierunek Polska  
**Zlecenie:** 111, runda 8  
**Data:** 31.10.2026  
**Autor/narzędzie:** ChatGPT, natywny generator obrazów GPT Image; przygotowanie i weryfikacja techniczna: Python/Pillow.  
**Pochodzenie:** nowe, niezależnie wygenerowane ilustracje. Źródłowe fotografie i opracowania służyły tylko do weryfikacji architektury; nie umieszczano ich w wynikowych PNG ani nie odrysowywano zdjęć.  
**Prawa:** grafiki wygenerowane dla projektu; prawa do rezultatów przysługują właścicielowi projektu zgodnie z warunkami usługi generowania. Bez materiałów stockowych, logotypów i cudzych bitmap.  

## Zestaw

| Plik | Miasto | Dominanty | Przewidziana perspektywa |
|---|---|---|---|
| `strzelce-opolskie.png` | Strzelce Opolskie | ruiny zamku i jasna wieża z hełmem, ratusz z wąskim ażurowym hełmem zegarowym, kamienice rynku, park | od strony parku w stronę centrum; uproszczone zestawienie dominant na wspólnym pasie panoramy |
| `krapkowice.png` | Krapkowice | Baszta Bramy Górnej z dekoracyjną attyką, stare miasto, Odra, niski most z balustradą | zza Odry w stronę centrum, most po prawej |
| `prudnik.png` | Prudnik | ratusz z wysoką wieżą zegarową, cylindryczna Wieża Woka z drewnianym gankiem i stożkowym dachem, Góry Opawskie, kamienice | widok ku południu od strony miasta, sylwety wzgórz w tle |
| `glogowek.png` | Głogówek | zamek Oppersdorffów i narożne wieże z hełmami, manierystyczny szczyt ratusza i wysoka wieża, kamienice i pola | ujęcie pocztówkowe starówki, zamek po lewej, ratusz po prawej |
| `olesno.png` | Olesno | neoklasycystyczny ratusz z sześciokolumnowym portykiem i **bez** nieistniejącej dziś wieżyczki, drewniany wielobryłowy kościół św. Anny, kamienice i lasy | syntetyczna panorama miasta (kościół leży poza zwartym centrum; patrz odstępstwa) |

## Źródła referencyjne, które sprawdzono

### 1. Strzelce Opolskie (`strzelce-opolskie.png`)
- VisitOpolskie — zabytki, ratusz, ruiny i park: https://www.visitopolskie.pl/strona/odkrywaj/803-strzelce-opolskie
- Zdjęcie ratusza z ażurowym hełmem: https://www.polskaniezwykla.pl/web/place/gallery,2,12126.html
- Zdjęcie ruin i smukłej jasnej wieży: https://www.polskieszlaki.pl/zamek-w-strzelcach-opolskich.htm
- Katalog historyczny: https://zamki.pwr.edu.pl/strzelce-opolskie-zamek/
- Park: https://www.strzelceopolskie.pl/turystyka/park

**Prompt (wersja finalna):**
> A crisp, sticker-like vector panorama of Strzelce Opolskie spans a transparent background, using thick navy outlines, flat pastel colors, and simple shadow blocks: castle ruins with a prominent domed octagonal tower and leafy greenery anchor the left, colorful market buildings and conifers fill the center, and a grand cream town hall with a clock tower and dramatic open gothic spire dominates the right. Layered shrubs, lawn, and grass run along the bottom, while broken walls, arched openings, windows, chimneys, architectural bands, and tower details add character—without text, people, logos, gradients, or sky.

**Uwagi:** wybrano wersję z ażurowym hełmem ratusza oraz gładką, kopulastą wieżą zamkową. Zabudowa kamienic jest typizowana, a rozstaw budowli skompresowano dla rozpoznawalności w skali gry.

### 2. Krapkowice (`krapkowice.png`)
- Gmina Krapkowice — zachowana Baszta i gotycko-renesansowa attyka: https://krapkowice.pl/12166/mury-miejskie-i-wieza-bramy-gornej.html
- Gmina Krapkowice — galeria wieży: https://krapkowice.pl/46/mury-miejskie-z-xiv-wieczna-wieza-bramy-gornej.html
- Urząd Gminy — most na Odrze (fotografia) i opis: https://bieg.krapkowice.pl/18/historia-miasta-krapkowice-oraz-zabytki.html
- Lotnicze zdjęcie centrum, rzeki i przepraw: https://krapkowice.pl/8454/krapkowice-z-perspektywa-na-przyszlosc.html

**Prompt (wersja finalna):**
> A crisp, saturated flat-vector sticker illustration of Krapkowice, Poland, presented as a wide transparent PNG panorama with thick navy outlines, simplified shading, and no text, people, or sky. It features the stone Baszta/Brama Górna gate tower amid pastel historic townhouses and lush greenery, with a blue-railed bridge crossing a teal, ripple-patterned river in the foreground, framed by rocky banks and layered cartoon trees.

**Uwagi:** odrzucono pierwszą wersję z przesadnie łukowym mostem; w finalnej most ma jezdnię bliską prostej i szerokie podpory. Baszta, zabudowa nadrzeczna i przeprawa są zestawione ilustracyjnie, bez gwarancji takiej samej skali z jednego punktu fotografowania.

### 3. Prudnik (`prudnik.png`)
- NID — Wieża Woka (forma cylindryczna, hurdycja, dach): https://zabytek.pl/pl/obiekty/prudnik-wieza-zamkowa-wieza-woka
- VisitOpolskie — wieża i jej lokalizacja: https://visitopolskie.pl/strona/odkrywaj/759-wieza-woka-w-prudniku
- Widok ratusza: https://odtur.pl/atrakcje/prudnik-rynek-w-prudniku-59714.html
- Widok miasta na tle Gór Opawskich: https://www.zamki.pl/?idzamku=prudnik&lang=en

**Prompt:**
> A polished vector-style panorama of Prudnik is shown on a transparent background, using bold navy outlines, warm flat colors, simple shadow blocks, and no people, text, signs, flags, crosses, sky, or clouds. The town hall with its ornate clock tower anchors the left, Wieża Woka rises on the right, colorful historic townhouses bridge the center, and layered blue-green hills, rounded trees, and dense shrubs complete the wide game-background composition.

**Uwagi:** zachowano najważniejszy wyróżnik Wieży Woka — jasny okrągły trzon, ciemny drewniany ganek i stożkowy hełm. Pasma górskie mają umowną sylwetę i kolory; bez malowania nieba.

### 4. Głogówek (`glogowek.png`)
- Katalog zamków PWr — skrzydła i wieżyczki zamku Oppersdorffów: https://zamki.pwr.edu.pl/zamek-w-glogowku/
- NID / zabytek.pl — ratusz: https://zabytek.pl/pl/obiekty/glogowek-ratusz
- VisitOpolskie — ratusz na rynku: https://visitopolskie.pl/strona/odkrywaj/794-glogowek

**Prompt:**
> A crisp, wide cartoon-vector landmark scene of Głogówek, Poland, featuring the ornate Oppersdorff Castle on the left, colorful townhouses in the center, and the distinctive Renaissance town hall with its tall spire on the right. Use warm flat colors, bold navy outlines, simplified shading, greenery and layered fields along the bottom, while leaving the upper canvas fully transparent for game sky overlays and including no people, text, logos, or photographic detail.

**Uwagi:** bryły zamku i ratusza odwzorowano na podstawie ogólnych cech architektury. Rzeczywiste odległości i proporcje między nimi są skrócone, a ustawienie to syntetyczna pocztówka, nie wiernie odtworzony kadr fotograficzny.

### 5. Olesno (`olesno.png`)
- Urząd Miejski — ratusz, obecnie bez historycznej wieżyczki: https://olesno.pl/7587/zabytki.html
- NID — kościół św. Anny, wielopłatkowy układ brył: https://zabytek.pl/pl/obiekty/olesno-kosciol-odpustowy-pw-sw-anny-2
- VisitOpolskie — zdjęcia drewnianego kościoła: https://www.visitopolskie.pl/strona/odkrywaj/552-kosciol-pw-sw-anny-w-olesnie
- Portal kościołów drewnianych — położenie poza centrum: https://www.kosciolydrewniane.pl/pages/drewniane/olesno.html

**Prompt:**
> A crisp, flat-color vector panorama of Olesno shows the wooden, multi-lobed St. Anne’s Church dominating the left, with dark timber walls, clustered brown roofs, silver-gray bulbous caps, evergreen trees, and rounded shrubs. On the right, a cream neoclassical town hall with six columns, a pediment, red-brown roof, and symmetrical windows anchors a row of pastel townhouses, all set against a continuous bright grassy foreground with thick navy outlines, no sky, text, people, or signage, and a transparent background.

**Odstępstwo do akceptacji:** kościół św. Anny znajduje się około **1,5 km od centrum** i nie jest widoczny razem z ratuszem w jednym rzeczywistym kadrze z rynku. Zestawienie obu zabytków to świadoma, informacyjna panorama pocztówkowa zwiększająca rozpoznawalność Olesna. Ze względu na zasady treści świątynia występuje wyłącznie jako drewniana bryła budowlana bez krzyży, scen, symboli i napisów. **Koordynator powinien ocenić, czy takie odstępstwo od zasady jednego punktu widzenia jest dopuszczalne.**

## Obróbka i walidacja

- Każdy plik `public/assets/landmarks/<id>.png` ma **1620 × 900 px**, **PNG RGBA**, profil **sRGB**.
- Przezroczysta warstwa nieba: piksele tła posiadają alfa = 0, nie wklejano nieba, chmur i słońca.
- Ciemnogranatowe, wyraźne obrysy na budowlach, drzewach, gruncie, moście i wodzie; nie są to cienkie, fotograficzne kontury.
- Półprzezroczyste śmieci generacyjne z tła (alfa bliska zeru) usunięto, a ilustracje przeskalowano z antyaliasingiem i zachowaniem alf. Dolną linię gruntu / wody doprowadzono do samej krawędzi obrazu. Obraz Olesna przesunięto w pionie tak, aby linia podłoża dochodziła do dołu kadru.
- Osobny arkusz `docs/art/podglady/panoramy-111.png` pokazuje 5 dużych podglądów (720 × 400) i 5 egzemplarzy **dokładnie 480 × 267**, na tle `#bfe3f5` z podpisami miast.
- Nie zamieszczono logotypów, znaków firmowych, herbów, flag, tekstów ani scen religijnych. Nie kopiowano zewnętrznych zdjęć.
- Brak potrzeby wykonywania testów aplikacji, ponieważ paczka zawiera wyłącznie zasoby PNG i dokumentację (integracja po stronie koordynatora).

## Zakres ZIP

```text
public/assets/landmarks/strzelce-opolskie.png
public/assets/landmarks/krapkowice.png
public/assets/landmarks/prudnik.png
public/assets/landmarks/glogowek.png
public/assets/landmarks/olesno.png
public/assets/landmarks/ASSETS-111.md
docs/art/podglady/panoramy-111.png
```

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-112 — Panoramy miast docelowych (runda 8)

**Data wykonania:** 2026-10-31  
**Narzędzia:** natywny generator obrazów ChatGPT (GPT Image/DALL·E), Python 3 / Pillow do kadrowania, przezroczystości, retuszu wieżyczek i QA.  
**Styl:** A+, płaskie plamy koloru, gruby ciemnogranatowy kontur `#1d2f3b`, bez tła nieba i bez tekstów.  
**Licencja/pochodzenie wszystkich pięciu plików:** autorskie obrazy wygenerowane z pomocą ChatGPT dla projektu „Cebulak Express”; prawo wykorzystania przez właściciela projektu, zgodnie z obowiązującymi warunkami narzędzia. Żadne zdjęcie źródłowe nie jest kopiowane ani bezpośrednio reprodukowane w assetach.

## Zestawienie

| Plik (ścieżka względem repo) | Miasto i dominujące motywy | Punkt widzenia / kompozycja | Narzędzie i poprawki |
|---|---|---|---|
| `public/assets/landmarks/zambrow.png` | Zambrów — dwie wieże neoromańskiego kościoła Trójcy Przenajświętszej (tylko sylweta), rzeka Jabłonka, niskie dachy, pola | Umowny widok z zielonego brzegu Jabłonki w stronę starszej zabudowy; rzeka na pierwszym planie, kościół wyżej z lewej | Osobna generacja ChatGPT; proporcjonalne przeskalowanie 1685×934 → 1620×900 |
| `public/assets/landmarks/wysokie-mazowieckie.png` | Wysokie Mazowieckie — mleczarskie łąki z trzema krowami, niska zabudowa rynku, dwuwieżowa sylweta kościoła św. Jana Chrzciciela | Ujęcie od strony rolniczych obrzeży w kierunku zabudowy; elementy pasterskie celowo powiększone dla czytelności w grze | Osobna generacja ChatGPT; przeskalowanie 1684×934 → 1620×900 |
| `public/assets/landmarks/kolno.png` | Kolno i otoczenie — stylizowane domy o kurpiowskich szczytach, sosnowy las, siano, pola; dalsza sylweta zabudowy | **Widok regionalny, nie dosłowny widok rynku Kolna:** od rolniczych obrzeży/pobliskich kurpiowskich terenów ku zabudowie | Fragment wygenerowanego w ChatGPT arkusza 5 panoram; kadrowanie i powiększenie z zachowaniem konturów (Pillow) |
| `public/assets/landmarks/bartoszyce.png` | Bartoszyce — gotycka Brama Lidzbarska, Łyna, kamienice, daleka sylweta kościoła św. Jana Ewangelisty | Umowny widok od strony nadrzecznego ciągu miejskiego na bramę i zabudowę; **rzeka jest oddzielona od przejazdu bramy kamiennym brzegiem** | Fragment wygenerowanego w ChatGPT arkusza 5 panoram; kadrowanie; dorysowanie zegara bez cyfr (Pillow) |
| `public/assets/landmarks/tomaszow-lubelski.png` | Tomaszów Lubelski — łagodne zalesione wzgórza Roztocza, niska pierzeja miasteczka, drewniany modrzewiowy kościół Zwiastowania NMP z dwiema umownymi cebulastymi wieżyczkami | Syntetyczne ujęcie od strony przedmieść ku centrum; pagórki w tle, zabudowa rynku z przodu, drewniana sylweta z prawej | Fragment wygenerowanego w ChatGPT arkusza, kadrowanie, kompozycja drugiej wieżyczki z wygenerowanego detalu oraz retusz szczytów w Pillow |

## Źródła wizualne i merytoryczne, oglądane przed generowaniem

**Zambrów**
- https://zambrow.pl/parafia-pw-trojcy-przenajswietszej.html — lokalizacja i dzieje kościoła.
- https://zambrow.pl/wp-content/uploads/2018/02/Plan-Miasta-Zambr%C3%B3w-2018.pdf — związek miasta z rzeką Jabłonką oraz opis bryły neoromańskiej.
- Materiały wizualne „Parish Holy Trinity in Zambrów” (Komoot) i „Jablonka River in city park in Zambrow” (Getty/iStock), wyłącznie jako odniesienie kształtów i krajobrazu.

**Wysokie Mazowieckie**
- https://commons.wikimedia.org/wiki/Category:Saint_John_the_Baptist_and_All_Saints_church_in_Wysokie_Mazowieckie — fasada i dwuwieżowa bryła.
- https://ewysmaz.pl/artykul/koncerty-w-parku-i-fortepian-n2239308 — niski pierścień zabudowy w rejonie rynku.
- Kontekst mleczarski pochodzi z opisu zlecenia; brak nazw, napisów i identyfikacji zakładów mleczarskich.

**Kolno**
- https://umkolno.pl/wiadomosc/polozenie — położenie nad Łabną i sąsiedztwo Puszczy Kurpiowskiej.
- https://www.gminakolno.pl/asp/o-gminie,10,,1 — pola, łąki i pozostałości Puszczy Zielonej w gminie.
- Materiały wizualne „Traditional Kurpie Cottage” (Polskie Radio Białystok) i fotografie chat kurpiowskich (Komoot) służyły tylko jako inspiracja bryły.

**Bartoszyce**
- https://radiobartoszyce.pl/blog/brama-lidzbarska-spacer-po-murach/ — charakter bramy, przejazd i okolice starego miasta.
- https://commons.wikimedia.org/wiki/Category:Saint_John_the_Evangelist_and_Our_Lady_of_Cz%C4%99stochowa_church_in_Bartoszyce — fara w perspektywie od bramy.
- Zdjęcie „Medieval Town Gate in Bartoszyce” (Radio Olsztyn) oraz „Medieval Gate on a Colorful Polish Street” (MARCO POLO) służyły do sprawdzenia schodkowego szczytu i zegara.

**Tomaszów Lubelski**
- https://zabytek.pl/pl/obiekty/tomaszow-lubelski-zespol-kosciola-par-pw-zwiastowania-nmp — NID: korpus modrzewiowy z 1727 r., dwie wieże z cebulastymi hełmami.
- https://lubelskie.travel/en/niezbednik-turysty/miejscowosci/tomaszow-lubelski — historyczny drewniany budynek herbaciarni w rynku i kontekst miasta.
- Materiał wizualny „Stary Kościół Zwiastowania NMP w Tomaszowie Lubelskim” (Roztocze Love) — wyłącznie sprawdzenie kształtu zabytkowej sylwety.

## Zapis promptów / dyrektyw artystycznych

Wygenerowano obrazy w ChatGPT z następującym wspólnym briefem: „Szeroka 16:9, płaska rysunkowa ilustracja A+ w duchu gry mobilnej, ciepłe plamy koloru, **gruby granatowy kontur na każdym obiekcie (około 9–10 px przy 1620×900)**, najwyżej 2–4 duże dominanty, proste kamienice i drzewa, bez perspektywy fotograficznej; przezroczyste tło bez nieba, chmur i słońca, grunt do dolnej krawędzi, zero tekstu, logotypów, symboli państwowych, ludzi lub religijnych scen; realistyczne, historyczne proporcje motywów”.

Dyrektywy motywów dla kolejnych obrazów:

1. **Zambrów:** „Jabłonka skręcająca wzdłuż zielonego brzegu, pas domów z dachami, neoromański kościół z jasną dwuwieżową fasadą, pola i drzewa; żadnych koszar”.
2. **Wysokie Mazowieckie:** „Mleczarskie łąki z łaciatymi krowami, jasne kamieniczki, historyczny kościół z dwiema wysokimi wieżami w tle, pola; zero marek”.
3. **Kolno:** „Dwie proste drewniane chałupy z kurpiowskim szczytem, sosny, łąka, bele siana, pola, daleka zabudowa; widok regionalny”.
4. **Bartoszyce:** „Zabytkowa Brama Lidzbarska z gotyckim schodkowym szczytem i przejazdem, pastelowe kamienice, daleka gotycka fara, Łyna i nabrzeże; bez przecięcia bramy rzeką”.
5. **Tomaszów Lubelski:** „Historyczna drewniana kościelna bryła z cebulastymi hełmami, niska zabudowa miasta i łagodne wzgórza Roztocza z lasem”.

Wygenerowane dodatkowo przez ChatGPT arkusze stanowiły materiał do wycięcia trzech ostatnich kompozycji. Do obrazów wprowadzono lokalne poprawki po generowaniu. Nie użyto cudzego zdjęcia jako warstwy końcowej.

## Odstępstwa i ograniczenia

- **Sceny syntetyczne:** generacja opiera się na zweryfikowanych bryłach i krajobrazach, ale dokładnej kolejności wszystkich budynków z jednego rzeczywistego punktu obserwacji **nie można potwierdzić**. Dotyczy to szczególnie połączenia miejskiej zabudowy z polami oraz widoku rzeki przy bramie. Pliki nie są rekonstrukcjami geodezyjnymi ani odrysowanymi fotografiami.
- **Kolno:** domy kurpiowskie opisują pobliski region, **nie są reprodukcją konkretnych budynków z centrum Kolna**. Zdecydowano się na ten wariant z uwagi na rozpoznawalność krajobrazu i zalecenia zlecenia.
- **Tomaszów Lubelski:** kościół pokazany jako uproszczona bryła. Druga wieża jest programową kompozycją fragmentu wygenerowanej pierwszej wieży; nie jest wiernym detalicznym odwzorowaniem fasady.
- **Bartoszyce:** wybrano wariant, w którym brama otwiera się na ulicę; rzeka biegnie wzdłuż nabrzeża, a nie przez przejazd. Zegar dodano do uproszczonej fasady bez cyfr.
- **Kontrola QA:** wszystkie pięć obrazów 1620×900 RGBA, rzeczywista przezroczystość w górnej części, ziemia do dolnej krawędzi i test skali 480×267. Miniatury na `docs/art/podglady/panoramy-112.png` mają jasnoniebieskie tło #bfe3f5.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-113 — Panoramy A+ miast docelowych

**Projekt:** Cebulak Express — Kierunek Polska  
**Zlecenie:** 113, runda 8  
**Data wykonania:** 31.10.2026  
**Narzędzie:** generator obrazów ChatGPT (natywne generowanie AI); obróbka techniczna: Python / Pillow / SciPy.  
**Format dostawy:** 3 × PNG RGBA 1620×900 px, sRGB, tło przezroczyste; 1 × arkusz kontrolny PNG.  
**Prawa/licencja:** ilustracje wygenerowano na potrzeby projektu; właściciel projektu dysponuje prawami do otrzymanych wyników i może je wykorzystywać oraz modyfikować zgodnie z warunkami narzędzia i obowiązującym prawem. Zdjęcia referencyjne nie były kopiowane ani odrysowywane.

## Wykaz plików

| Plik | Id | Miasto | Główne motywy | Punkt widzenia |
|---|---|---|---|---|
| `public/assets/landmarks/olecko.png` | `olecko` | Olecko | szeroki Plac Wolności, rząd niskich pastelowych kamienic z czerwonymi dachami, zieleń centralnego skweru, Jezioro Oleckie Wielkie, odległa strzelista wieża jako sylweta | umownie podwyższony widok ze skraju historycznego rynku w kierunku jeziora, zgodny z ogólnym położeniem rynku względem akwenu; szerokie ujęcie syntetyczne |
| `public/assets/landmarks/goldap.png` | `goldap` | Gołdap | wieloczłonowa drewniana tężnia solankowa, zadaszony punkt konstrukcji, Jezioro Gołdap, zalesione wzgórza i brzeg | ukośny widok ze strefy spacerowej Promenady Zdrojowej wzdłuż tężni ku brzegowi jeziora; ujęcie syntetyczne |
| `public/assets/landmarks/lubaczow.png` | `lubaczow` | Lubaczów | ratusz z wieżyczką zegarową i balkonem, niskie XIX/XX-wieczne pierzeje rynku, drewniana altana na placu, sylwety wież sakralnych za zabudową, łagodne wzgórza | widok od wschodniej części rynku na zachodnią pierzeję z ratuszem, wyidealizowana perspektywa na wprost |
| `docs/art/podglady/panoramy-113.png` | — | Trzy miasta | porównanie widoków w jednym stylu, górny rząd duży, dolny rząd dokładnie 480×267 px | arkusz na jednolitym tle `#bfe3f5` |

> **Dokładność krajobrazu:** panoramy są oryginalnymi, stylizowanymi kompozycjami na podstawie motywów istniejących miast, a nie dokumentalnymi rekonstrukcjami jednego zdjęcia lub geodezyjnie ścisłą wizualizacją. Układ i odległości szczegółów dalszego planu pozostają artystycznym uproszczeniem.

## Źródła referencyjne oglądane przed wygenerowaniem

**Olecko**
- Starostwo Powiatowe w Olecku, *Rynek w Olecku* — historyczny rynek, kształt i skala placu, dokumentacja widoków lotniczych: https://www.powiat.olecko.pl/strona-167-rynek_w_olecku.html
- Olecko.info, *Największy rynek w Europie* — fotografie i otoczenie Placu Wolności: https://www.olecko.info/galerie-38-najwiekszy_rynek_w_europie.html
- Maratony Kresowe, *Przystanek Olecko* — relacja miasta z Jeziorem Oleckim Wielkim: https://maratonykresowe.pl/przystanek-olecko/

**Gołdap**
- Przedsiębiorstwo Wodociągów i Kanalizacji w Gołdapi, *Pijalnia Wód i Tężnie* — lokalizacja strefy zdrojowej: https://www.pwikgoldap.pl/?q=node%2F50
- Gołdap.info, *Tężnia solankowa w Gołdapi* — długość, wysokość, geometria i konstrukcja drewniana tężni: https://www.goldap.info/teznie-solankowe-w-goldapi
- Wieża Ciśnień w Gołdapi, strona zabytku — porównanie możliwej dominanty miasta: https://www.wieza-goldap.pl/

**Lubaczów**
- Urząd Miejski w Lubaczowie, *Ratusz w Lubaczowie* — położenie w zachodniej pierzei, materiał i forma elewacji: https://um.lubaczow.pl/atrakcje-turystyczne/ratusz-w-lubaczowie.html
- Podkarpackie Travel, *Lubaczów* — rynek, zabudowa historyczna, lokalne obiekty: https://podkarpackie.travel/produkt/lubaczow
- Miasto Lubaczów, galeria rynku — kształt wieżyczki i zabudowy przyrynkowej: https://gminy.podkarpackie.com/miasto-lubaczow%2C3.html

Powyższe źródła wykorzystano **wyłącznie do weryfikacji** kształtu i położenia motywów. Żaden materiał fotograficzny ani znak graficzny nie został użyty jako warstwa docelowej grafiki.

## Prompty — wygenerowane ilustracje

### `olecko.png`

> A crisp, flat vector panorama of Olecko’s Plac Wolności, Poland, designed as a side-scrolling game landscape with a transparent background, bold navy outlines, warm solid colors, and no text, people, vehicles, signs, or gradients. The scene shows a tiled plaza and central leafy park framed by pastel historic townhouses with red roofs and a distant church spire, while the right side opens onto Jezioro Oleckie Wielkie, layered green hills, shoreline trees, and rounded foreground bushes.

### `goldap.png`

> A crisp, wide landscape vector illustration depicts Gołdap’s brine graduation tower beside a lake in a bold, flat game-asset style, using thick dark-navy outlines, warm saturated colors, clean cel shading, and a transparent background with no sky, text, or people. The expansive L-shaped timber tężnia features repeating diagonal supports, dark brushwood panels, rooftop railings, and a pale-yellow pavilion with blue windows and a red-orange roof, while a paved path, layered shrubs, reeds, shoreline rocks, bright blue rippling water, evergreen silhouettes, and rolling green hills complete the scenic landmark panorama.

### `lubaczow.png`

> A crisp, high-contrast flat vector panorama depicts Lubaczów’s historic market square from the east, centered on the ornate cream town hall with its clock tower, flanked by colorful townhouses, leafy planters, a wooden gazebo, distant church towers, and rolling green hills. Designed in a bold dark-navy outlined game-map style with warm cel-shaded colors, the 16:9 scene fills the lower frame with patterned paving and has no sky, text, people, or vehicles, leaving transparent space around the town silhouette.

## Styl i obróbka

- Wizualnie: grube kontury w ciemnym granacie, wyraźne bryły i uproszczone detale, płaskie ciepłe plamy koloru, bez fototekstur i bez napisów. Zabudowa sakralna wyłącznie jako odległe sylwety, bez symboliki na pierwszym planie.
- Po wygenerowaniu: odrzucenie niemal przezroczystych artefaktów (`alpha < 9`); odfiltrowanie izolowanych pikseli niezwiązanych z sylwetką; dociągnięcie pełnego krycia ostatnich 2 pikseli dolnej krawędzi; skalowanie Lanczos do **1620×900**; zapis w trybie **RGBA** z osadzonym profilem sRGB.
- Podgląd: dla każdego miasta osobno rendering większy oraz render **480×267 px** (docelowy rozmiar w grze) na tle `#bfe3f5`.

## Świadome odstępstwa / ograniczenia

1. **Gołdap:** zabytkowa wieża ciśnień stoi poza strefą zdrojową. Nie została dodana obok tężni, aby nie tworzyć fikcyjnego zestawienia obiektów. Zamiast tego wybrano tężnię, drewnianą zabudowę konstrukcji, jezioro i otoczenie leśne.
2. **Olecko:** centrum i jezioro przedstawiono w jednej perspektywie o lekko podwyższonym punkcie widzenia, aby pogodzić czytelność Placu Wolności z charakterem krajobrazu Mazur; szczegółów nie należy interpretować jako dokładnego obrazu z określonej ulicy.
3. **Lubaczów:** wieżyczka ratuszowa jest celowo silniej zaakcentowana ze względu na skalowanie grafiki w grze. Dalsze sylwety świątyń oraz wzgórza są dekoracyjnym tłem i nie dokumentują ich ścisłej kolejności przy danym kierunku widzenia.
4. Nie stosowano współczesnej charakterystycznej architektury chronionej prawami autorskimi, pomników politycznych, flag, herbów, marek, napisów ani scen religijnych.

**Przeznaczenie:** gotowe materiały do integracji przez koordynatora; nie wykonywano żadnych operacji Git ani PR. Zmian w kodzie nie ma.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-114 — Przejścia graniczne za granicą

**Zlecenie:** 114 · **Runda:** 8 · **Data:** 31.10.2026 · **Projekt:** Cebulak Express — Kierunek Polska.

## Pakiet

Pięć niezależnych ilustracji punktów na trasie, wygenerowanych w ChatGPT ImageGen i przygotowanych jako zasoby gry. Każdy PNG: **RGBA, 1620 × 900 px, sRGB**, z przezroczystym tłem. Format po integracji: **180 × 100 px logicznych**, kotwiczenie dolną krawędzią przy drodze. **Brak napisów, godeł, flag, logo, znaków kontroli granicznej i szlabanów.** Charakterystyczne puste niebieskie znaki są elementem każdej sceny.

Ilustracje są **oryginalnymi grafikami wygenerowanymi przez AI**, a nie kopiami zdjęć referencyjnych. W przypadku czterech ostatnich plików wycięto osobne sceny z wygenerowanych plansz, oczyszczono kanał alfa i przeskalowano z zachowaniem proporcji. Mikulov został wygenerowany jako osobna ilustracja i przeskalowany do wymiarów docelowych. Nie użyto cudzych pikseli, fotografii ani chronionych logo.

## Spis zasobów

| ID / plik | Punkt na trasie | Co przedstawia | Źródła referencyjne oglądane w celu weryfikacji wyglądu | Narzędzie | Data | Licencja / prawa |
|---|---|---|---|---|---|---|
| `mikulov.png` | Mikulov, Czechy / Austria | Zamek nad wapiennym urwiskiem, jasna zabudowa z dachówką, łagodne pagórki, droga i pusty niebieski znak; bez winnic | [Oficjalna strona miasta Mikulov – zamek](https://www.mikulov.cz/turista/sluzby/turisticke-cile/prohlidkovy-objekt/zamek-mikulov), [widok zamku](https://awe-inspiringplaces.com/mikulov-castle/) | ChatGPT ImageGen; Pillow | 31.10.2026 | Grafika AI na zamówienie projektu; prawa do korzystania i wykorzystywania przez właściciela projektu zgodnie z warunkami usługi |
| `tarvisio.png` | Tarvisio, Włochy / Austria | Zielone Alpy Julijskie, wylot tunelu w zboczu, domy kamienno-drewniane, świerki, otwarta droga i pusty znak | [Tarvisio – Wikipedia](https://it.wikipedia.org/wiki/Tarvisio), [fotografia doliny alpejskiej](https://www.reisenaktuell.com/radreise-alpe-adria-radweg/) | ChatGPT ImageGen; Pillow | 31.10.2026 | jw. |
| `la-jonquera.png` | La Jonquera, Hiszpania / Francja | Suche skały i zielone zbocza Pirenejów, parasolowate pinie, kamienne domy z dachówką, wiadukt, otwarta droga i pusty znak | [La Jonquera – Wikipedia](https://es.wikipedia.org/wiki/La_Junquera), [Pireneje – Wikipedia](https://pl.wikipedia.org/wiki/Pireneje) | ChatGPT ImageGen; Pillow | 31.10.2026 | jw. |
| `granica-ee-lv.png` | Ikla–Ainaži, granica Estonii i Łotwy | Piaszczyste wydmy nad wodą, nadmorski bór sosnowy, drewniany domek z czerwonym dachem, droga i pusta tablica | [Via Baltica – Wikipedia](https://pl.wikipedia.org/wiki/Via_Baltica), [fotografia przejścia EE–LV (Commons)](https://commons.wikimedia.org/wiki/File:Estonia_Latvia_Via_Baltica.jpg) (historyczne zabudowania **nie** odwzorowane) | ChatGPT ImageGen; Pillow | 31.10.2026 | jw. |
| `granica-lv-lt.png` | Granica Łotwy i Litwy / Via Baltica | Płaska łąka i pola, brzozy, bocian na gnieździe na słupie, drewniana stodoła, droga i pusta tablica | [Via Baltica – Wikipedia](https://pl.wikipedia.org/wiki/Via_Baltica); fotografie wiejskich krajobrazów bałtyckich z gniazdami bocianów (oglądane wyłącznie referencyjnie) | ChatGPT ImageGen; Pillow | 31.10.2026 | jw. |

**Nota licencyjna:** Wszystkie piksele zasobów graficznych pochodzą z generowania w ChatGPT i własnej obróbki. Utwory przygotowano dla właściciela projektu do wykorzystania w grze i materiałach promocyjnych; zastosowanie podlega warunkom korzystania z narzędzia do generowania obrazów. Adresy źródeł powyżej są dokumentacją referencji wizualnych, nie licencjami wykorzystanych fotografii — **żadne fotografie nie zostały wykorzystane bezpośrednio**.

## Prompty / specyfikacje scen

Właściwa specyfikacja stylu została pobrana z załączonego zlecenia 114. Są to opisy operacyjne odpowiadające wygenerowanym obrazom; narzędzie nie udostępniło pełnych wewnętrznych promptów przetwarzania.

- **`mikulov`**: „Crisp, flat vector-cartoon game sprite of Mikulov, Czech Republic; wide 16:9, transparent background, no sky or text; cream and red-roofed town under a hilltop castle on pale limestone rock, gently rolling green hills, curving open road and blank blue sign on two posts. Oversized high-contrast forms, warm cel shading, very thick dark-navy outlines (#1d2f3b), cheerful game illustration; no vineyards, logos or flags.”
- **`tarvisio`**: „Cartoon Alpine crossing near Tarvisio, Julian Alps; steep green forested peaks, large tunnel mouth in rocky hillside, wooden and stone chalets, spruce silhouettes, open road and blank blue sign, no border booths; transparent canvas, navy thick outlines, warm flat fills, readable when downscaled.”
- **`la-jonquera`**: „Cartoon border landscape near La Jonquera; dry rocky Pyrenees, umbrella-shaped pines, light-stone houses with terracotta roof tiles, motorway viaduct in the background, open road and blank blue sign, no shop signs; transparent background, flat warm vector art and heavy navy stroke.”
- **`granica-ee-lv`**: „Estonia–Latvia Baltic coast road near Ikla–Ainaži; gentle sandy dunes, pine forest, small wooden house with red roof, glimpses of water, empty blue rectangular roadside sign, open Schengen crossing; transparent PNG game sprite, bold outlines and bright flat colors.”
- **`granica-lv-lt`**: „Latvia–Lithuania Via Baltica rural roadside; flat green-yellow meadow, birch trees, a stork on a nest atop a wooden pole, weathered wooden barn, simple open road and empty blue sign; transparent 16:9 cartoon sprite, warm fill, very thick navy contour, no text, symbols or flags.”

## Obróbka i kontrola jakości

- Narzędzia: **ChatGPT ImageGen** (obrazy bazowe) oraz **Python/Pillow** (wyodrębnianie pojedynczych scen, czyszczenie piksela alfa, skalowanie Lanczosa, końcowy eksport w przestrzeni sRGB, arkusz podglądu).
- Wymiar każdego pliku: **1620 × 900 px**; tryb: **RGBA**; tło przezroczyste, bez namalowanego nieba i chmur.
- Kontur: **ciemny granat**, cel około `#1d2f3b`; grube obrysy odpowiednie do skali gry (nie każdy lokalny detal ma jednak dokładnie 14–16 px).
- Wizualną czytelność sprawdzono po zmniejszeniu każdego pliku **dokładnie do 180 × 100 px**. Porównanie: `docs/art/podglady/punkty-114.png`.
- Każda scena posiada inny krajobraz oraz charakterystyczny punkt; nie powiela stacji paliw ani kontroli granicznej.

## Integracja

Skopiować zawartość ZIP do katalogu głównego repozytorium z zachowaniem ścieżek. Koordynator podepnie identyfikatory punktów do odpowiednich plików `public/assets/landmarks/<id>.png`. **W tej sesji nie modyfikowano kodu, nie wykonywano push, nie tworzono gałęzi ani PR.**

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng). Do poprawki przy okazji: w `granica-lv-lt.png` niebieska tablica ucięta prawą krawędzią kadru.

# ASSETS-115 — Porty i krajobraz

**Projekt:** Cebulak Express — Kierunek Polska  
**Zlecenie:** 115, runda 8  
**Data wykonania:** 31.10.2026  
**Autor / wykonanie:** ChatGPT (generowanie AI oraz opracowanie wektorowe i korekty techniczne)  
**Właściciel i przeznaczenie:** Grafiki przygotowane specjalnie dla właściciela projektu Cebulak Express. Prawa do wygenerowanych materiałów oraz ich użycia w grze przysługują właścicielowi projektu zgodnie z warunkami usług, w ramach których powstały. Żaden z obrazów referencyjnych nie został skopiowany ani odrysowany.

## Spis zasobów

| ID / plik | Punkt na trasie | Co przedstawia | Narzędzie i korekty | Licencja / prawa |
| --- | --- | --- | --- | --- |
| `rosslare.png` | Rosslare, Irlandia | Port promowy z falochronem, latarnią, promem bez oznaczeń, zielonymi wzgórzami i murkami, białymi domkami oraz mewami. | ChatGPT (generator obrazów), Python / Pillow: przezroczystość, przycięcie, skalowanie do 1620×900 i ciągłość wody przy dolnej krawędzi. | Grafika wygenerowana na potrzeby projektu; prawa właściciela projektu. |
| `port-helsinki.png` | Helsinki, Finlandia | Duży prom bez oznaczeń, żuraw portowy, granitowe skałki oraz rozpoznawalna sylwetka nabrzeża z historyczną białą katedrą o zielonej kopule i ceglanym soborem w tle. | ChatGPT (generator obrazów), Python / Pillow: przezroczystość, przycięcie, skalowanie do 1620×900 i ciągłość wody przy dolnej krawędzi. | Grafika wygenerowana na potrzeby projektu; prawa właściciela projektu. |
| `uckermark.png` | Uckermark, Niemcy, okolice A11 | Zielone lasy, jezioro, żółte pola, trzy turbiny wiatrowe, aleja drzew i wiejska droga; w tle mały ceglany kościółek bez motywów religijnych na pierwszym planie; dwa bociany w locie. | ChatGPT (autorski rysunek programowy SVG), Python / CairoSVG: rysunek warstwowy z konturami i eksport PNG RGBA 1620×900. | Grafika stworzona na potrzeby projektu; prawa właściciela projektu. |
| `docs/art/podglady/punkty-115.png` | Wszystkie trzy punkty | Arkusz podglądowy na tle `#bfe3f5`, trzy pełne ilustracje w pierwszym rzędzie oraz trzy podglądy o rzeczywistym rozmiarze **480×267 px** w drugim rzędzie. | Python / Pillow, bez innych obrazów zewnętrznych. | Materiał pomocniczy projektu. |

## Źródła referencyjne — sprawdzone wizualnie lub opisowo

**Rosslare:**
- https://pl.wikipedia.org/wiki/Rosslare_Europort
- https://commons.wikimedia.org/wiki/Category:Rosslare_Europort
- https://commons.wikimedia.org/wiki/File:Rosslare_Europort,_Breakwater_and_Lighthouse_-_geograph.org.uk_-_5318167.jpg

**Port w Helsinkach:**
- https://pl.wikipedia.org/wiki/Helsinki
- https://www.portofhelsinki.fi/en/
- https://www.gettyimages.com/ — zdjęcie referencyjne z panoramą nabrzeża i ceglanym soborem (obejrzany podgląd, bez pobierania/dołączania zdjęcia).

**Uckermark:**
- https://www.tourismus-uckermark.de/
- https://presse.reiseland-brandenburg.de/images/aussichtspunkt-bei-potzlow-in-der-uckermark-1893547
- https://pl.wikipedia.org/wiki/Uckermark — strona ujednoznaczniająca; użyto pozostałych źródeł do rzeczywistego wyglądu krajobrazu.

Zdjęcia służyły **wyłącznie jako materiał referencyjny** (typ terenu, obiekty, relacje przestrzenne). Kompozycje są autorskimi stylizacjami; brak fotografii w paczce. Kościoły są niewielkimi elementami panoramy, nie tematami ilustracji; nie zastosowano współczesnych chronionych obiektów architektury.

## Prompty / wytyczne produkcyjne

### `rosslare.png`

> A crisp, flat vector-cartoon panorama of an Irish ferry port inspired by Rosslare Europort, on a transparent background. A generic large white-and-orange ferry with no branding, a rock-lined breakwater, quay, small lighthouse, ferry terminal, green hills divided by dry stone walls, white Irish cottages and seagulls. Thick dark-navy outlines, flat warm color patches and light from upper left; no sky, clouds, flags, logos, readable text or people.

### `port-helsinki.png`

> A crisp cel-shaded vector panorama of Helsinki harbor, isolated on transparency. A generic white-and-teal unbranded passenger ferry, industrial yellow harbor crane, granite outcrops, quays, and the distant historical Helsinki skyline with the white green-domed Helsinki Cathedral and red-brick Uspenski Cathedral seen only as skyline silhouettes. Thick dark-navy outlines, warm flat colors, light from upper left; no sky, clouds, flags, logos, readable text or people.

### `uckermark.png`

> Original flat vector panorama of the Uckermark countryside near the A11: forests, blue lake with a curving shore, golden fields with hedgerows, three unmarked wind turbines, winding rural avenue with leafy trees, a tiny historical red-brick village church silhouette, and two flying storks. Transparent sky, uninterrupted grassy strip on bottom edge, thick #1d2f3b outlines, warm sunlit patches, no text, signs, brands, emblems or people. Implemented as custom layered SVG and rasterized to RGBA PNG.

## Sprawdzenie formatu i integracja

- Trzy **osobne** obrazy `PNG RGBA 1620×900`, przezroczyste poza rysunkiem; brak namalowanego nieba, chmur i słońca.
- Granatowe kontury (ok. `#1d2f3b`), płaska i ciepła kolorystyka. Woda lub trawa zajmują dolne ~40 px na całej szerokości.
- Drugi rząd arkusza ma miniatury o dokładnym rozmiarze `480×267` i przedstawia wygląd zasobów po zmniejszeniu do skali gry.
- Bez nazw armatorów, flag, herbów, logo firm, ludzi na pierwszym planie, znaków drogowych i napisów wewnątrz grafiki.
- Pliki przeznaczone do `public/assets/landmarks/`; koordynator integruje je z rendererem. Nie modyfikowano kodu gry ani repozytorium.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-116 — polskie przejścia i stacje: Kołbaskowo i Olszyna

**Zlecenie:** 116, runda 8  
**Data wykonania:** 31.10.2026  
**Narzędzie:** ChatGPT Image (generowanie czterech ilustracji w jednym arkuszu) + Python / Pillow (wyodrębnienie ilustracji, skalowanie, pozycjonowanie na przezroczystym płótnie, zapis PNG i wykonanie arkusza podglądu).  
**Przeznaczenie:** cztery osobne punkty trasy („near”) w grze *Cebulak Express — Kierunek Polska*.  
**Licencja / uprawnienia:** grafiki wygenerowane dla projektu, do wykorzystania przez właściciela projektu zgodnie z warunkami usługi generującej. Zdjęcia referencyjne nie zostały wykorzystane jako fragmenty obrazów.

## Wspólne parametry

- Każdy plik: **PNG RGBA, 1620 × 900 px**, z osadzonym profilem **sRGB**.
- Wierzchnia część ilustracji pozostaje przezroczysta; krajobraz i obiekty leżą przy dolnej krawędzi, w warstwie bliskiej drogi.
- Styl: płaska ciepła ilustracja, mocny kontur granatowy `#1d2f3b`, kremowe światła `#fff6e6`, czerwienie `#d9534f` / `#e8735c`, niebieskie puste znaki `#2779b0`, zieleń `#72a95a`; uproszczone, duże bryły, światło z lewej góry.
- Brak napisów, numerów rejestracyjnych, znaków firmowych, herbów, godła, flag i ludzi w mundurach. Nazwy miejsc dopisuje silnik gry.
- Każdą ilustrację przeskalowano kontrolnie do **180 × 100 px** i umieszczono w arkuszu `docs/art/podglady/punkty-116.png`.

## Źródła wizualne i prompty

Wszystkie cztery grafiki wygenerowano w jednej kompozycji na podstawie treści briefu **Zlecenie 116**; poniższe opisy są wiernym zapisem wymagań dla poszczególnych scen, a nie dosłownym zapisem wewnętrznego polecenia generatora. Źródła służyły wyłącznie do sprawdzenia charakteru okolicy i dróg: **bez kopiowania, odrysowywania i wykorzystania ich pikseli**.

| ID i punkt | Co przedstawia | Źródła obejrzane / zweryfikowane | Prompt opisowy | Narzędzie | Data | Licencja/status |
|---|---|---|---|---|---|---|
| `granica-kolbaskowo` — granica Kołbaskowo, A11/A6 | Szeroka autostrada pośród płaskich pól Pomorza Zachodniego; podniesiony biało-czerwony szlaban, dawna wiata odprawy z małymi budkami, pusty duży niebieski znak, pobocze i kępy drzew. | [Kołbaskowo — Wikipedia](https://pl.wikipedia.org/wiki/Ko%C5%82baskowo); [A6 Kołbaskowo–Klucz — GDDKiA](https://www.gov.pl/web/gddkia/a6-kolbaskowo---klucz); [A6 przy Kołbaskowie — zdjęcie referencyjne](https://inzynieria.com/mosty/wiadomosci/64404,autostrada-a6-na-inwestycje-przy-granicy-czekaja-wszyscy) | „Wesoła polska granica przy płaskich polach: dwupasmowa szosa, stara wiata, podniesiony szlaban i pusty błękitny znak; kilka drzew, dużo otwartej przestrzeni; gruby granatowy kontur, bez nieba, napisów i flag, przezroczyste tło.” | ChatGPT Image; korekta Pillow | 31.10.2026 | Wygenerowane dla projektu — właściciel projektu |
| `stacja-kolbaskowo` — stacja za Kołbaskowem, A6 | Generyczna biało-czerwona stacja paliw, budka z kawą i hot dogami (piktogramy), dwa busy z bagażem na dachach, płaskie pola, wiatraki i grupy sosen. | [Autostrada A6 — Wikipedia](https://pl.wikipedia.org/wiki/Autostrada_A6_(Polska)); [A6 Kołbaskowo–Klucz — GDDKiA](https://www.gov.pl/web/gddkia/a6-kolbaskowo---klucz); [Zdjęcie okolic A6 z wiatrakami w tle](https://przeclaw24.pl/) | „Przyjazna przydrożna stacja paliw bez marki z budką kawowo-hotdogową, dwoma busami z bagażem i wiatrakami nad polami; odrobina sosnowego lasu; gruby granatowy kontur, płaskie ciepłe barwy, pusty przezroczysty górny pas, bez napisów.” | ChatGPT Image; korekta Pillow | 31.10.2026 | Wygenerowane dla projektu — właściciel projektu |
| `granica-olszyna` — granica Olszyna/Forst, A18 | Historyzujące segmenty betonowej jezdni, podniesiony szlaban, dawna wiata odprawy, pusty niebieski znak, otaczające szosę bory sosnowe. | [Olszyna — Wikipedia](https://pl.wikipedia.org/wiki/Olszyna_(powiat_%C5%BCarski)); [Autostrada A18 — Wikipedia](https://pl.wikipedia.org/wiki/Autostrada_A18_(Polska)); [A18 Olszyna–Golnice — GDDKiA](https://www.gov.pl/web/gddkia/a18-olszyna---golenice---odcinek-2); [Dawne przejście Olszyna/Forst — referencja fotograficzna](https://polska-org.pl/10982059,foto.html) | „Otwarta granica na leśnej autostradzie A18: gęste bory sosnowe, prosty dach dawnej odprawy, podniesiony biało-czerwony szlaban, duży pusty niebieski znak, stylizowane spoiny płyt betonowych, bez oznaczeń; gruby ciemny kontur, przezroczyste tło.” | ChatGPT Image; korekta Pillow | 31.10.2026 | Wygenerowane dla projektu — właściciel projektu |
| `stacja-olszyna` — stacja przy A18 | Generyczna biało-czerwona stacja bez marki z budką z zapiekankami (piktogram), dwa busy, piaszczyste pobocze, wyraźna ściana wysokich sosen i krzewów. | [Autostrada A18 — Wikipedia](https://pl.wikipedia.org/wiki/Autostrada_A18_(Polska)); [A18 Olszyna–Golnice — GDDKiA](https://www.gov.pl/web/gddkia/a18-olszyna---golenice---odcinek-2); [Olszyna — Wikipedia](https://pl.wikipedia.org/wiki/Olszyna_(powiat_%C5%BCarski)) | „Przydrożna stacja paliw w środku boru sosnowego przy A18, bez logo i nazwy; duże sosny, piaszczyste pobocze, generyczne busy i budka z zapiekankami, bez napisów; ciepła kreskówkowa paleta i gruby granatowy kontur, przezroczyste tło.” | ChatGPT Image; korekta Pillow | 31.10.2026 | Wygenerowane dla projektu — właściciel projektu |

## Uwaga o geograficzno-historycznej stylizacji

Olszyna w powiecie żarskim leży w **województwie lubuskim**, a nie dolnośląskim (choć brief odwołuje się do „borów Dolnego Śląska”). Zachowano zamierzony **leśny klimat pogranicza**. Zarys płyt starej nawierzchni A18 jest **motywem historyzującym**: odcinki dawnej betonowej jezdni zostały przebudowane, m.in. w latach 2018–2023. Ilustracja jest elementem gry, nie dokumentacją dzisiejszego wyglądu drogi.

## Kontrola jakości

- [x] Dokładne nazwy i ścieżki czterech assetów, oddzielne PNG.
- [x] 1620 × 900 px, RGBA, profil sRGB i realna przezroczystość tła.
- [x] Jeden arkusz podglądu na tle `#bfe3f5`, z czterema podpisami i osobnymi miniaturami 180 × 100 px.
- [x] Szerokie białe i czerwone plamy, puste niebieskie znaki, brak treści na tablicach.
- [x] Obiekty zróżnicowane krajobrazowo i łatwe do rozpoznania po zmniejszeniu.
- [x] Brak logo firm, flag, godeł, osób w mundurach i numerów rejestracyjnych.

## Pliki

- `public/assets/landmarks/granica-kolbaskowo.png`
- `public/assets/landmarks/stacja-kolbaskowo.png`
- `public/assets/landmarks/granica-olszyna.png`
- `public/assets/landmarks/stacja-olszyna.png`
- `docs/art/podglady/punkty-116.png`
- `public/assets/landmarks/ASSETS-116.md`

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# ASSETS-117 — Polskie przejścia i stacje: Cieszyn i Budzisko

- **Zlecenie:** 117 (runda 8)
- **Data wykonania:** 31.10.2026
- **Projekt:** Cebulak Express — Kierunek Polska
- **Narzędzie:** generowanie obrazów ChatGPT (GPT Image / OpenAI) oraz obróbka techniczna Pillow (Python).
- **Format końcowy:** PNG RGBA, 1620 × 900 px, przezroczyste tło, sRGB.
- **Spójność stylistyczna:** płaska, pogodna ilustracja, mocny granatowy kontur `#1d2f3b`, ciepła kremowa biel, biało-czerwone elementy, niebieski pusty znak, zielone pobocze.
- **Licencja i prawa:** grafiki wygenerowane na zlecenie właściciela projektu i przeznaczone do wykorzystania przez właściciela projektu na zasadach dotyczących materiałów wynikowych usługi OpenAI. Fotografie referencyjne wykorzystano wyłącznie do sprawdzenia krajobrazu; nie są zawarte w plikach.
- **Obróbka:** cztery samodzielne kadry wydzielono z wygenerowanego arkusza, usunięto obszary z podpisami, oczyszczono kanał alfa, przeskalowano z antyaliasingiem do obszaru sceny i ujednolicono dolny pas neutralnej zieleni. Nie kopiowano zdjęć.

## Pliki

### `granica-cieszyn.png`

- **ID:** `granica-cieszyn`
- **Punkt:** Granica w Cieszynie (wjazd z Czech)
- **Co przedstawia:** Most nad Olzą, historyczne kamienice Cieszyna, beskidzkie wzgórza, podniesiony biało-czerwony szlaban, pusty niebieski znak, przyjazna zieleń.
- **Źródła wyglądu obejrzane/sprawdzone:** https://pl.wikipedia.org/wiki/Cieszyn; https://pl.wikipedia.org/wiki/Olza; https://www.visitcieszyn.com/en/the-river-olza; https://beskidy.slaskie.travel/culturalheritage/1019465/most-przyjani
- **Narzędzie:** GPT Image w ChatGPT, korekta kadru / przezroczystości / rozmiaru w Pillow.
- **Prompt / instrukcja opisowa (streszczenie specyfikacji przekazanej generatorowi):** Most nad Olzą, historyczne kamienice Cieszyna, beskidzkie wzgórza, podniesiony biało-czerwony szlaban, pusty niebieski znak, przyjazna zieleń. Wyłącznie pojedyncza, przyjazna ilustracja 2D z grubym granatowym konturem; bez tła nieba, bez napisów, marek, logo, flag, ludzi, godeł; letni klimat, światło z lewej góry, przezroczyste PNG, czytelne po zmniejszeniu.
- **Licencja:** grafika wygenerowana dla projektu; prawo do wykorzystania wynikowego materiału przez właściciela projektu zgodnie z warunkami OpenAI.

### `stacja-cieszyn.png`

- **ID:** `stacja-cieszyn`
- **Punkt:** Stacja za granicą w Cieszynie
- **Co przedstawia:** Bezmarkowa kremowo-czerwona stacja paliw z dwoma dystrybutorami, budka kawowa, drewniana chata, Beskidy, zieleń i generyczny bus.
- **Źródła wyglądu obejrzane/sprawdzone:** https://pl.wikipedia.org/wiki/Beskid_%C5%9Al%C4%85ski
- **Narzędzie:** GPT Image w ChatGPT, korekta kadru / przezroczystości / rozmiaru w Pillow.
- **Prompt / instrukcja opisowa (streszczenie specyfikacji przekazanej generatorowi):** Bezmarkowa kremowo-czerwona stacja paliw z dwoma dystrybutorami, budka kawowa, drewniana chata, Beskidy, zieleń i generyczny bus. Wyłącznie pojedyncza, przyjazna ilustracja 2D z grubym granatowym konturem; bez tła nieba, bez napisów, marek, logo, flag, ludzi, godeł; letni klimat, światło z lewej góry, przezroczyste PNG, czytelne po zmniejszeniu.
- **Licencja:** grafika wygenerowana dla projektu; prawo do wykorzystania wynikowego materiału przez właściciela projektu zgodnie z warunkami OpenAI.

### `granica-budzisko.png`

- **ID:** `granica-budzisko`
- **Punkt:** Granica w Budzisku (wjazd z Litwy)
- **Co przedstawia:** Suwalskie pagórki i jezioro, podniesiony biało-czerwony szlaban, pusty niebieski znak, dwa bociany na łące, drewniana wiejska chata, brzozy.
- **Źródła wyglądu obejrzane/sprawdzone:** https://pl.wikipedia.org/wiki/Budzisko; https://pl.wikipedia.org/wiki/Suwalszczyzna; https://www.polskaniezwykla.pl/web/place/54282,burbiszki-jezioro-galadus-na-granicy-polsko-litewskiej.html
- **Narzędzie:** GPT Image w ChatGPT, korekta kadru / przezroczystości / rozmiaru w Pillow.
- **Prompt / instrukcja opisowa (streszczenie specyfikacji przekazanej generatorowi):** Suwalskie pagórki i jezioro, podniesiony biało-czerwony szlaban, pusty niebieski znak, dwa bociany na łące, drewniana wiejska chata, brzozy. Wyłącznie pojedyncza, przyjazna ilustracja 2D z grubym granatowym konturem; bez tła nieba, bez napisów, marek, logo, flag, ludzi, godeł; letni klimat, światło z lewej góry, przezroczyste PNG, czytelne po zmniejszeniu.
- **Licencja:** grafika wygenerowana dla projektu; prawo do wykorzystania wynikowego materiału przez właściciela projektu zgodnie z warunkami OpenAI.

### `stacja-budzisko.png`

- **ID:** `stacja-budzisko`
- **Punkt:** Stacja za granicą w Budzisku
- **Co przedstawia:** Bezmarkowa kremowo-czerwona stacja paliw, generyczne busy, budka z kawą, suwalskie jezioro i pagórki, wyraziste brzozy.
- **Źródła wyglądu obejrzane/sprawdzone:** https://pl.wikipedia.org/wiki/Suwalszczyzna; https://pobondzie.pl/okolica/
- **Narzędzie:** GPT Image w ChatGPT, korekta kadru / przezroczystości / rozmiaru w Pillow.
- **Prompt / instrukcja opisowa (streszczenie specyfikacji przekazanej generatorowi):** Bezmarkowa kremowo-czerwona stacja paliw, generyczne busy, budka z kawą, suwalskie jezioro i pagórki, wyraziste brzozy. Wyłącznie pojedyncza, przyjazna ilustracja 2D z grubym granatowym konturem; bez tła nieba, bez napisów, marek, logo, flag, ludzi, godeł; letni klimat, światło z lewej góry, przezroczyste PNG, czytelne po zmniejszeniu.
- **Licencja:** grafika wygenerowana dla projektu; prawo do wykorzystania wynikowego materiału przez właściciela projektu zgodnie z warunkami OpenAI.

## Podgląd i kontrola jakości

- Arkusz: `docs/art/podglady/punkty-117.png` — cztery widoki obok siebie na jasnoniebieskim `#bfe3f5`, drugi rząd zawiera realne miniatury 180×100 px.
- Każdy plik docelowy: `1620×900`, `RGBA`, z obszarem transparentnym nad obiektami.
- Wszystkie cztery mają pusty znak graniczny albo stację bez nazwy/logo; żadnych napisów, numerów rejestracyjnych, flag, herbów, godeł, firm lub postaci w mundurach.
- Krajobrazy są ilustracyjnymi interpretacjami regionów, nie wiernymi kopiami współczesnych fotografii i nie przedstawiają konkretnych współczesnych obiektów architektonicznych chronionych prawami.
- Źródło referencji stylistycznej (odczyt wyłącznie porównawczy): `public/assets/landmarks/granica-stacja.png` z repozytorium `woogitsugames/cebulak-express`.

## Integracja

Umieścić pliki bezpośrednio pod ścieżkami `public/assets/landmarks/<id>.png`. Nie zmieniano kodu gry ani repozytorium. Integrację punktów trasy przeprowadza koordynator.

## Uwaga o promptach

Tekst promptu podany dla każdego pliku stanowi wierny opis użytej instrukcji wizualnej i elementów sceny, a nie nieudostępniony, wewnętrzny prompt systemu generowania obrazów.

> **Koordynator (31.10):** przyjęto — styl A+ z grubym konturem; PNG skwantyzowany do 256 kolorów (Pillow FASTOCTREE + oxipng).

# Zlecenie 122 — zimowe panoramy miast

**Data opracowania:** 2026-10-31
**Format:** PNG, 1620 × 900, RGBA (przezroczystość zachowana).
**Dane źródłowe:** pięć letnich grafik dostarczonych w paczce `zlecenie-122-paczka.zip`.
**Narzędzie:** ChatGPT — edycja obrazów z użyciem Python 3, Pillow i OpenCV; ręczne dopasowanie konturów dachów, koloryzacja roślin, retusz okien, wody i dekoracji.
**Licencja / prawa:** każda zimowa grafika jest pracą pochodną na bazie letniej grafiki projektu. Grafika przygotowana dla projektu; prawa wynikające z praw właściciela do oryginałów, bez materiałów zewnętrznych.

## Zasoby

| Plik wynikowy | ID | Co przedstawia | Narzędzie | Data | Licencja |
|---|---|---|---|---|---|
| `warszawa-zima.png` | `warszawa` | Warszawa: Stare Miasto, Zamek Królewski i panorama centrum | ChatGPT / Python / Pillow / OpenCV; źródło: `warszawa.png` | 2026-10-31 | Właściciel projektu — opracowanie zimowe z jego grafiki letniej |
| `krakow-zima.png` | `krakow` | Kraków: Wawel, Sukiennice i zabytkowe wieże | ChatGPT / Python / Pillow / OpenCV; źródło: `krakow.png` | 2026-10-31 | Właściciel projektu — opracowanie zimowe z jego grafiki letniej |
| `wroclaw-zima.png` | `wroclaw` | Wrocław: Ostrów Tumski, domy nad Odrą i most | ChatGPT / Python / Pillow / OpenCV; źródło: `wroclaw.png` | 2026-10-31 | Właściciel projektu — opracowanie zimowe z jego grafiki letniej |
| `poznan-zima.png` | `poznan` | Poznań: Stary Rynek i renesansowy ratusz | ChatGPT / Python / Pillow / OpenCV; źródło: `poznan.png` | 2026-10-31 | Właściciel projektu — opracowanie zimowe z jego grafiki letniej |
| `gdansk-zima.png` | `gdansk` | Gdańsk: Stare Miasto, Żuraw, nabrzeże i statek | ChatGPT / Python / Pillow / OpenCV; źródło: `gdansk.png` | 2026-10-31 | Właściciel projektu — opracowanie zimowe z jego grafiki letniej |

## Prompty / instrukcje edycji

**Wspólna specyfikacja wszystkich grafik:**

> Zimowa edycja dostarczonej letniej panoramy 1620 × 900. Identyczne budynki, skala, kadr, linia gruntu, przezroczysty kanał alfa, gruby granatowy kontur #1d2f3b. Śnieg #f4f8fb i niebieskie cienie #c9dbe8 na dachach, gzymsach i gruncie; ośnieżona roślinność, ciepłe okna #ffd36b, subtelne świeckie lampki, delikatny dym z kominów. Bez nieba, płatków spadającego śniegu, napisów, flag, herbów, logo i motywów religijnych. Zachowaj kolory cegieł, nie przemieszczaj obiektów.

### `warszawa-zima.png` — Warszawa

> Przyprósz śniegiem ciągi czerwonych dachów, zabytkowe kamienice, tarasy i gzymsy wysokiego gmachu w centrum. Ośnież drzewa wzdłuż dolnej krawędzi; rozświetl część okien.

### `krakow-zima.png` — Kraków

> Zimowa sceneria wzgórza Wawelskiego, kamienic, Sukiennic i wież; ośnież strome dachy, koronki attyki oraz duże drzewa na wzgórzu.

### `wroclaw-zima.png` — Wrocław

> Zaspy i śnieg na ukośnych dachach nad Odrą; drzewa w zimowej kolorystyce; chłodniejsza woda i delikatny lód tylko przy brzegu, most oraz wieże bez zmian.

### `poznan-zima.png` — Poznań

> Zachowaj rytm szczytów kolorowych kamienic Starego Rynku i centralną wieżę ratusza. Białe śnieżne grzbiety na dachach i poziomych gzymsach, ciepłe okna oraz girlandy.

### `gdansk-zima.png` — Gdańsk

> Zachowaj żaglowiec, zabudowę hanzeatycką, Żuraw i nabrzeże. Ośnież strome szczyty, drewnianą konstrukcję i blanki, przy nabrzeżu łagodny lód, otwarta chłodna Motława.

## Zmiany techniczne i weryfikacja

- Sylwetka i architektura pozostają w pozycjach oryginału; snow-caps ograniczono maską zewnętrznego obrysu, bez przenoszenia budynków.
- Zielenie roślin przekształcono na śnieżnobłękitne i chłodne cienie; pozostawiono ciemne kontury i oryginalną paletę ceglanych ścian.
- Zimowe okna są punktowo ocieplone; lampki są świeckie i nie stanowią napisów ani symboli.
- Wrocław i Gdańsk: woda nie jest w całości zamarznięta; lodowe akcenty jedynie w pobliżu nabrzeży.
- Arkusz porównawczy: `docs/art/podglady/zima-122.png`. W dolnej sekcji każda panorama ma rzeczywiste wymiary renderowania w grze: 480 × 267 px.

Brak zdjęć, znaków towarowych, tekstów, flag, herbów i innych zewnętrznych zasobów graficznych.

> **Koordynator (31.10, runda 9):** **odrzucone w całości** (warszawa, krakow, wroclaw, poznan, gdansk): śnieg narysowany jako białe kreski i zygzaki w poprzek fasad — do poprawki (zlecenie 142). Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 123 — zimowe panoramy polskich miast

Data wykonania: **2026-10-31**. Wymiary każdego wyniku: **1620 × 900 px**, PNG RGBA, zachowana kolejność obiektów, linia gruntu i proporcje letniego pierwowzoru.

Wspólna technika: **własna, proceduralna edycja obrazów w Pythonie (Pillow, OpenCV i NumPy), ręcznie rozmieszczone śnieżne akcenty**; oryginalne budynki zachowują kompozycję, kolor cegieł i gruby granatowy kontur. Zachowano przezroczyste tło, bez nieba, opadów, marek i napisów. Śnieżne korony, zaspy, oświetlone okna, delikatny dym i świeckie girlandy są dodatkową warstwą.

**Prawa:** materiały utworzone dla właściciela projektu jako adaptacje pięciu oryginalnych letnich grafik przekazanych w zleceniu; prawa do oryginałów i materiałów wynikowych po stronie właściciela projektu. Nie używano zewnętrznych zdjęć ani logotypów, nie są potrzebne atrybucje osób trzecich. W zakresie bazowego materiału prawo do wykorzystania wynika z przekazania go przez właściciela zlecenia.

## Ewidencja zasobów

| Plik (id) | Co przedstawia | Narzędzie | Data | Prompt / instrukcja edycji | Licencja i źródło |
| --- | --- | --- | --- | --- | --- |
| `szczecin-zima.png` (`szczecin`) | Wały Chrobrego, zabytkowa panorama portowa Szczecina, ciemna zimowa woda | Python 3: Pillow / OpenCV / NumPy, ręczna korekta akcentów | 2026-10-31 | Na podstawie `szczecin.png` zachowaj dokładnie 1620×900 i ten sam układ, zastosuj zaspy i śnieg na dachach, zimne cienie, ciepłe okna i świeckie girlandy; zachowaj kolor elewacji, kontury i przezroczystość. | Adaptacja grafiki projektu; prawa właściciela projektu. |
| `lodz-zima.png` (`lodz`) | Ceglany kompleks przemysłowy i zabytkowe budowle Łodzi | Python 3: Pillow / OpenCV / NumPy, ręczna korekta akcentów | 2026-10-31 | Na podstawie `lodz.png` zachowaj dokładnie 1620×900 i ten sam układ, zastosuj zaspy i śnieg na dachach, zimne cienie, ciepłe okna i świeckie girlandy; zachowaj kolor elewacji, kontury i przezroczystość. | Adaptacja grafiki projektu; prawa właściciela projektu. |
| `katowice-zima.png` (`katowice`) | Spodek, przemysłowe i historyczne sylwetki Katowic | Python 3: Pillow / OpenCV / NumPy, ręczna korekta akcentów | 2026-10-31 | Na podstawie `katowice.png` zachowaj dokładnie 1620×900 i ten sam układ, zastosuj zaspy i śnieg na dachach, zimne cienie, ciepłe okna i świeckie girlandy; zachowaj kolor elewacji, kontury i przezroczystość. | Adaptacja grafiki projektu; prawa właściciela projektu. |
| `lublin-zima.png` (`lublin`) | Historyczne bramy, wieże, zamek i kamienice Lublina | Python 3: Pillow / OpenCV / NumPy, ręczna korekta akcentów | 2026-10-31 | Na podstawie `lublin.png` zachowaj dokładnie 1620×900 i ten sam układ, zastosuj zaspy i śnieg na dachach, zimne cienie, ciepłe okna i świeckie girlandy; zachowaj kolor elewacji, kontury i przezroczystość. | Adaptacja grafiki projektu; prawa właściciela projektu. |
| `rzeszow-zima.png` (`rzeszow`) | Rzeszowski rynek, historyczne kamienice i ratusz | Python 3: Pillow / OpenCV / NumPy, ręczna korekta akcentów | 2026-10-31 | Na podstawie `rzeszow.png` zachowaj dokładnie 1620×900 i ten sam układ, zastosuj zaspy i śnieg na dachach, zimne cienie, ciepłe okna i świeckie girlandy; zachowaj kolor elewacji, kontury i przezroczystość. | Adaptacja grafiki projektu; prawa właściciela projektu. |

## Kontrola techniczna

- Pliki: 5 zimowych PNG RGBA 1620 × 900 px.
- Oryginalne kompozycje i linia gruntu są zachowane; białe i błękitne akcenty są nałożone wewnątrz obiektów.
- Przezroczyste tło nie zostało zastąpione niebem. Jedyny możliwy dodatkowy delikatny półprzezroczysty element poza pierwotną sylwetką to dym z komina.
- Podgląd: `docs/art/podglady/zima-123.png` (lato–zima obok siebie, na końcu widok 480 × 267 px).
- Żadnych nazw, napisów, flag, marek, godła, reklam ani scen religijnych. Istniejących zabytkowych budowli nie usuwano.
- Wykonanie nie wymaga modyfikacji kodu, commitów, gałęzi ani PR.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-124 — zimowe panoramy polskich miast

Data: **31.10.2026**. Zlecenie nr **124** (runda 9).

Każda ilustracja jest autorską modyfikacją odpowiedniej letniej grafiki dostarczonej przez właściciela projektu. Wszystkie zachowują rozdzielczość **1620 × 900 px**, format **PNG RGBA**, oryginalny układ i granatowy kontur, bez nowego tła i bez napisów.

| Plik / id | Co przedstawia | Narzędzie i data | Prompt / instrukcja edycji | Prawa / licencja |
|---|---|---|---|---|
| `bialystok-zima.png` / `bialystok` | Białystok — panorama zabytkowego rynku, ratuszowej dominanty i ceglanych wież | Edycja oryginalnej grafiki: Python 3, Pillow i OpenCV, 31.10.2026; retusz pikselowy i ręcznie rozmieszczone elementy | Zachowaj wszystkie budowle i ich pozycję, wymiar, kontur oraz przezroczystość; zmień liście na ośnieżone korony, dodaj śnieg na połaciach dachów i gzymsach, ciepłe okna, małe świeckie lampki, choinkę, dym i mroźny grunt; bez nieba, opadów, tekstu i symboli. | Materiał wykonany dla projektu na podstawie jego własnej grafiki letniej; prawa do letniego oryginału po stronie właściciela projektu. Zimowa edycja przekazana do użytku w projekcie. |
| `bydgoszcz-zima.png` / `bydgoszcz` | Bydgoszcz — zabytkowe spichlerze i zabudowa nadrzeczna, most i statki | Edycja oryginalnej grafiki: Python 3, Pillow i OpenCV, 31.10.2026; retusz pikselowy i ręcznie rozmieszczone elementy | Zachowaj wszystkie budowle i ich pozycję, wymiar, kontur oraz przezroczystość; zmień liście na ośnieżone korony, dodaj śnieg na połaciach dachów i gzymsach, ciepłe okna, małe świeckie lampki, choinkę, dym i mroźny grunt; bez nieba, opadów, tekstu i symboli. | Materiał wykonany dla projektu na podstawie jego własnej grafiki letniej; prawa do letniego oryginału po stronie właściciela projektu. Zimowa edycja przekazana do użytku w projekcie. |
| `olsztyn-zima.png` / `olsztyn` | Olsztyn — historyczny zamek, wieża i jezioro z żaglówkami | Edycja oryginalnej grafiki: Python 3, Pillow i OpenCV, 31.10.2026; retusz pikselowy i ręcznie rozmieszczone elementy | Zachowaj wszystkie budowle i ich pozycję, wymiar, kontur oraz przezroczystość; zmień liście na ośnieżone korony, dodaj śnieg na połaciach dachów i gzymsach, ciepłe okna, małe świeckie lampki, choinkę, dym i mroźny grunt; bez nieba, opadów, tekstu i symboli. | Materiał wykonany dla projektu na podstawie jego własnej grafiki letniej; prawa do letniego oryginału po stronie właściciela projektu. Zimowa edycja przekazana do użytku w projekcie. |
| `kielce-zima.png` / `kielce` | Kielce — historyczny pałac, wieżyczki i wzgórza | Edycja oryginalnej grafiki: Python 3, Pillow i OpenCV, 31.10.2026; retusz pikselowy i ręcznie rozmieszczone elementy | Zachowaj wszystkie budowle i ich pozycję, wymiar, kontur oraz przezroczystość; zmień liście na ośnieżone korony, dodaj śnieg na połaciach dachów i gzymsach, ciepłe okna, małe świeckie lampki, choinkę, dym i mroźny grunt; bez nieba, opadów, tekstu i symboli. | Materiał wykonany dla projektu na podstawie jego własnej grafiki letniej; prawa do letniego oryginału po stronie właściciela projektu. Zimowa edycja przekazana do użytku w projekcie. |
| `opole-zima.png` / `opole` | Opole — historyczna wieża, ratuszowa dominanta i nabrzeżna zabudowa | Edycja oryginalnej grafiki: Python 3, Pillow i OpenCV, 31.10.2026; retusz pikselowy i ręcznie rozmieszczone elementy | Zachowaj wszystkie budowle i ich pozycję, wymiar, kontur oraz przezroczystość; zmień liście na ośnieżone korony, dodaj śnieg na połaciach dachów i gzymsach, ciepłe okna, małe świeckie lampki, choinkę, dym i mroźny grunt; bez nieba, opadów, tekstu i symboli. | Materiał wykonany dla projektu na podstawie jego własnej grafiki letniej; prawa do letniego oryginału po stronie właściciela projektu. Zimowa edycja przekazana do użytku w projekcie. |

## Technika i kontrola jakości

- Bazą każdego pliku jest 1:1 odpowiadający plik letni (`bialystok.png` itd.); nie wykorzystano obcych zdjęć ani obcych logotypów.
- Zimowe barwy nanoszono maskami kolorów w pikselach istniejącego rysunku; śnieg na dachach jest ograniczony do ich oryginalnej warstwy barwnej. Nowe ozdoby i detale wewnątrz obrysów ograniczono maską nieprzezroczystości oryginału, a półprzezroczyste smugi dymu dodano osobno.
- W każdym wariancie zachowano pierwotne położenie wszystkich budynków i głównych brył, gruby granatowy obrys i dotychczasowy rozmiar kanwy.
- Śnieg: `#f4f8fb`, cień: `#c9dbe8`, obrys: `#1d2f3b`, ciepłe lampy: `#ffd36b`. Bez opadów i nieba.
- Arkusz `docs/art/podglady/zima-124.png` zawiera lato/zima i podglądy zimowych plików w rzeczywistym rozmiarze gry: 480 × 267 px.

**Status licencji:** pliki źródłowe dostarczył zamawiający jako grafiki projektu. Nie weryfikowano osobno praw do letnich oryginałów.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-125 — zimowe panoramy pięciu miast

**Zlecenie:** 125, runda 9  
**Data opracowania:** 31.10.2026  
**Narzędzie:** ChatGPT (przetwarzanie pikselowe oryginałów przy użyciu Pillow / OpenCV, ręczne nakładki rysunkowe)  
**Źródło i licencja:** Grafiki pochodne opracowane na podstawie pięciu letnich plików PNG dostarczonych przez właściciela projektu „Cebulak Express”. Prawa do grafik źródłowych i powstałych zimowych wariantów należą do właściciela projektu. Brak zewnętrznych zdjęć, marek i assetów na licencjach osób trzecich.

| Plik | ID | Co przedstawia | Narzędzie i źródło | Data | Licencja |
|---|---|---|---|---|---|
| `zielona-gora-zima.png` | `zielona-gora` | Zielona Góra: ratusz z wieżą zegarową, stara zabudowa i ceglana wieża | Pillow/OpenCV, adaptacja oryginału `zielona-gora.png` | 31.10.2026 | Na podstawie grafiki projektu, prawa właściciela projektu |
| `siemiatycze-zima.png` | `siemiatycze` | Siemiatycze: miejska zabudowa, świątynie w oddali, rzeka i przystanek | Pillow/OpenCV, adaptacja oryginału `siemiatycze.png` | 31.10.2026 | Na podstawie grafiki projektu, prawa właściciela projektu |
| `monki-zima.png` | `monki` | Mońki: łosie i bociany nad wodą, zabudowa miejska i świerki | Pillow/OpenCV, adaptacja oryginału `monki.png` | 31.10.2026 | Na podstawie grafiki projektu, prawa właściciela projektu |
| `bielsk-podlaski-zima.png` | `bielsk-podlaski` | Bielsk Podlaski: ratusz z zegarem, zabytkowe domy i plac | Pillow/OpenCV, adaptacja oryginału `bielsk-podlaski.png` | 31.10.2026 | Na podstawie grafiki projektu, prawa właściciela projektu |
| `hajnowka-zima.png` | `hajnowka` | Hajnówka: puszcza, żubr, kolejka leśna i drewniane chaty | Pillow/OpenCV, adaptacja oryginału `hajnowka.png` | 31.10.2026 | Na podstawie grafiki projektu, prawa właściciela projektu |

## Prompt redakcyjny / wytyczne zastosowane

> Na podstawie istniejącego pliku PNG (1620×900 RGBA) przygotuj jego zimową wersję bez przesuwania elementów i zmiany proporcji: gruby granatowy kontur, płaskie kolory, chłodniejsza roślinność i śnieg na ziemi, dachach, gzymsach i gałęziach drzew iglastych; ciepło oświetlone okna, jedna dyskretna girlanda światełek i dym z komina. Śnieg #f4f8fb, cienie #c9dbe8. Nie dodawaj nieba ani padającego śniegu, napisów, flag, znaków marek i motywów religijnych. Zachowaj rozpoznawalną panoramę, zwierzęta i pojazdy. Dostosuj widoczność do 480×267 px.

## Zmiany i kontrola jakości

- Odmiany zimowe powstały przez edycję istniejących pikseli oraz dodanie ręcznie poprowadzonych warstw śniegu i ozdób — nie generowano nowych budynków ani nie rekonstruowano panoram od zera.
- Każdy plik: **PNG RGBA 1620×900**, przezroczyste tło; śnieg jest przycięty do istniejących sylwetek. Jedyny element wychodzący ponad sylwetkę to półprzezroczysty dym z istniejącego komina.
- Kontur oraz położenie budynków, pojazdów i zwierząt pozostają takie jak w oryginałach. Okna otrzymały ciepłą barwę, dachy i roślinność — śnieg. Zimowe drzewa liściaste mają ośnieżone korony; iglaste pozostają rozpoznawalne.
- Nie osadzono żadnych napisów, logo ani flag. Ozdoby są świeckie; istniejące sylwetki historycznej architektury sakralnej pozostawiono bez dodatkowych motywów religijnych.
- Arkusz **`docs/art/podglady/zima-125.png`** zawiera porównania lato–zima i wszystkie zimowe panoramy w wielkości 480×267 px.

## Integracja

Pliki umieścić bez zmian pod ścieżkami `public/assets/landmarks/<id>-zima.png`; letnie oryginały nie są nadpisywane. Integracja jest po stronie gry.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 126 — zimowe panoramy pięciu miast

**Data:** 2026-10-31  
**Format:** każdy plik PNG, 1620 × 900 px, RGBA, sRGB, przezroczyste tło.  
**Źródło:** oryginalne letnie pliki PNG dostarczone przez właściciela projektu w paczce `zlecenie-126-paczka.zip`.  
**Metoda:** zimowa edycja obrazów źródłowych wykonana przez ChatGPT za pomocą skryptu Python (Pillow, OpenCV, NumPy): mapowanie barw zieleni na ośnieżone powierzchnie z zachowaniem konturów, ręczne rozmieszczenie akcentów śniegu, światła w oknach, lampek oraz lekkiego dymu. Brak zewnętrznych zdjęć i grafik osób trzecich.  
**Prawa/licencja:** grafiki zimowe opracowano wyłącznie na podstawie letnich grafik dostarczonych przez właściciela projektu; prawa do oryginałów i opracowań pozostają przy właścicielu projektu. Do wykorzystania w projekcie Cebulak Express.  

## Pliki

| Plik (w `public/assets/landmarks/`) | ID | Co przedstawia | Narzędzie | Data | Licencja |
|---|---|---|---|---|---|
| `sokolka-zima.png` | `sokolka` | Zabytkowy dom z kolumnami, kamienice, drewniane domy i drzewa | ChatGPT — Python / Pillow / OpenCV (edycja dostarczonego PNG) | 2026-10-31 | Prawa właściciela projektu; opracowanie z grafiki projektu |
| `lomza-zima.png` | `lomza` | Nadrzeczna panorama historycznych budynków, zbocze, most i rzeka | ChatGPT — Python / Pillow / OpenCV (edycja dostarczonego PNG) | 2026-10-31 | Prawa właściciela projektu; opracowanie z grafiki projektu |
| `grajewo-zima.png` | `grajewo` | Miasteczko nad wodą, drzewa, dachy domów i bocianie gniazdo | ChatGPT — Python / Pillow / OpenCV (edycja dostarczonego PNG) | 2026-10-31 | Prawa właściciela projektu; opracowanie z grafiki projektu |
| `kolno-zima.png` | `kolno` | Drewniane domy z dachami ze strzechy, drzewa iglaste i bele siana | ChatGPT — Python / Pillow / OpenCV (edycja dostarczonego PNG) | 2026-10-31 | Prawa właściciela projektu; opracowanie z grafiki projektu |
| `wysokie-mazowieckie-zima.png` | `wysokie-mazowieckie` | Panorama zabudowy miasteczka na tle wież oraz krowy na łące | ChatGPT — Python / Pillow / OpenCV (edycja dostarczonego PNG) | 2026-10-31 | Prawa właściciela projektu; opracowanie z grafiki projektu |

## Prompt/wytyczne edycyjne

**Wspólne dla wszystkich pięciu obrazów:** „Na podstawie letniego obrazu wykonaj grudniowy wariant zimowy, zachowując **te same budynki w tych samych miejscach, w tej samej skali**. Obraz RGBA 1620 × 900, bez tła i nieba. Zachowaj gruby granatowy kontur `#1d2f3b`, proporcje i kolor budynków; zmień zieleń na śnieg z niebieskawymi cieniami `#c9dbe8`, czapy śniegu na dachach, drzewach, murach i gruncie; dodaj ciepłe światło w oknach `#ffd36b`, dyskretne świeckie lampki i delikatny dym. Zostaw rozpoznawalną panoramę, bez tekstu, flag, logo i dekoracji religijnych. Zachowaj cieki wodne w ciemniejszej, niezamarzniętej postaci z oblodzonymi brzegami”.

**Dodatkowa specyfikacja dla lokalizacji:**

- `sokolka`: śnieg na dachu dużego budynku kolumnowego i obu drewnianych domów, oszronione drzewa oraz zaspy przy chodniku; zachowaj pomarańczowo-czerwone dachy.
- `lomza`: śnieg na stokach wzgórza, na kalenicach dachów i skraju mostu; rzeka ma pozostać częściowo niezamarznięta, z chłodniejszą wodą.
- `grajewo`: biały szron i śnieg na koronach drzew, dachach, gnieździe i przybrzeżnej roślinności; zachowaj kompozycję z bocianami oraz otwartą wodę.
- `kolno`: śnieg na szczytach dachów krytych strzechą, na gałęziach świerków, płocie i belach; drewniane elewacje i detale mają pozostać czytelne.
- `wysokie-mazowieckie`: śnieg w obrębie łąki, drzew oraz na dachach zabudowy; zachowaj niezmienione sylwetki i położenie krów.

## Kontrola

- Oryginały służyły jako bezpośrednia podstawa pikselowa: nie zmieniano położenia budowli ani rozmiaru kadru.
- Wszystkie pięć plików ma 1620 × 900, RGBA i zachowaną przezroczystość wokół panoram.
- Porównanie lato–zima oraz podgląd w docelowych 480 × 267 px: `docs/art/podglady/zima-126.png`.
- Zlecenie nie obejmuje edycji plików gry, repozytorium ani publikacji na GitHub.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-127 — zimowe panoramy, runda 9

Data przygotowania: **2026-10-31**.

Każdy zimowy plik opracowano poprzez bezpośrednią edycję pikselową dostarczonej przez właściciela gry grafiki letniej. Zachowano oryginalne położenie i geometrię elementów, kontury, rozmiar i kanał alpha.

| Plik wynikowy / id | Co przedstawia | Narzędzie / metoda | Pochodzenie i licencja |
|---|---|---|---|
| `zambrow-zima.png` / `zambrow` | Zambrów — miejska panorama z dwiema wieżami, domami i zakolem rzeki | ChatGPT: Python 3, Pillow, NumPy, OpenCV; ręczne pasy śniegu, zachowanie letnich konturów i kadru | Grafika wykonana dla projektu na podstawie letniej grafiki dostarczonej przez właściciela. Prawa do oryginału i modyfikacji: właściciel projektu. |
| `strzelce-opolskie-zima.png` / `strzelce-opolskie` | Strzelce Opolskie — ruiny, wieża i zabytkowy ratusz | ChatGPT: Python 3, Pillow, NumPy, OpenCV; ręczne pasy śniegu, zachowanie letnich konturów i kadru | Grafika wykonana dla projektu na podstawie letniej grafiki dostarczonej przez właściciela. Prawa do oryginału i modyfikacji: właściciel projektu. |
| `kedzierzyn-kozle-zima.png` / `kedzierzyn-kozle` | Kędzierzyn-Koźle — wieża obronna, kamienice, barka na Odrze | ChatGPT: Python 3, Pillow, NumPy, OpenCV; ręczne pasy śniegu, zachowanie letnich konturów i kadru | Grafika wykonana dla projektu na podstawie letniej grafiki dostarczonej przez właściciela. Prawa do oryginału i modyfikacji: właściciel projektu. |
| `krapkowice-zima.png` / `krapkowice` | Krapkowice — wieża bramna, zabudowa rynku i most nad Odrą | ChatGPT: Python 3, Pillow, NumPy, OpenCV; ręczne pasy śniegu, zachowanie letnich konturów i kadru | Grafika wykonana dla projektu na podstawie letniej grafiki dostarczonej przez właściciela. Prawa do oryginału i modyfikacji: właściciel projektu. |
| `glogowek-zima.png` / `glogowek` | Głogówek — zamek i historyczna zabudowa miasta | ChatGPT: Python 3, Pillow, NumPy, OpenCV; ręczne pasy śniegu, zachowanie letnich konturów i kadru | Grafika wykonana dla projektu na podstawie letniej grafiki dostarczonej przez właściciela. Prawa do oryginału i modyfikacji: właściciel projektu. |

## Instrukcja / prompt transformacji

> Wykonaj zimowy wariant dostarczonej ilustracji letniej bez zmian kompozycji i skali: 1620x900 RGBA i przezroczyste tło; gruby granatowy kontur; śnieg #f4f8fb i błękitne cienie #c9dbe8 na roślinności, dachach, gzymsach oraz ziemi; oryginalne kolory murów; kilka ciepłych okien #ffd36b i subtelna świecka girlanda; dym znad komina, ciemna woda z niewielką ilością lodu tam, gdzie występuje rzeka; bez nieba, śnieżycy, tekstu, flag, herbów, marek, symboli religijnych.

## Procedura wykonania i weryfikacji

- Barwy zieleni zastąpione zimowymi bielami i błękitami tylko wewnątrz istniejących kształtów; nasycone czerwienie cegły i dachów pozostawione.
- Ręcznie dodane śnieżne czapy na dachach i gzymsach, wybrane ciepłe szyby oraz subtelne lampki na świeckich zabytkowych elewacjach.
- Rzeki przyciemnione; zachowane otwarte koryta, drobne miejscowe pasy lodu; gra nadal dodaje własne niebo i opad.
- Każdy obraz jest sRGB PNG RGBA 1620×900. Kadrowanie jest takie jak w oryginale. Dodatkowe półprzezroczyste kłęby dymu mogą w niewielkim stopniu rozszerzać obrys alpha.
- Nie użyto zewnętrznych fotografii ani cudzych znaków towarowych. Wizerunki historycznych budowli bazują na już dostarczonych ilustracjach projektu.
- Arkusz lato/zima: `docs/art/podglady/zima-127.png`.

## Uwaga o generowaniu

Zastosowano bezpośrednią edycję dostarczonych ilustracji w Pythonie/Pillow (a nie niezależne przerysowanie nowej sceny), aby uniknąć przesunięć budynków. Narzędzie AI było środowiskiem ChatGPT; właściwe modyfikacje zostały wykonane deterministycznymi operacjami graficznymi.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 128 — zimowe panoramy punktów trasy

**Data:** 2026-10-31  
**Rozdzielczość:** 1620 × 900 px, PNG RGBA, przezroczystość zachowana z oryginałów.  
**Licencja/prawa:** grafiki przygotowane na potrzeby projektu na podstawie jego własnych, dostarczonych letnich ilustracji. Prawa do źródeł i wersji pochodnych pozostają przy właścicielu projektu. Brak zewnętrznych marek i źródeł stockowych.

## Pliki

| ID | Plik | Miejsce / motyw | Narzędzie i źródło | Licencja |
|---|---|---|---|---|
| `prudnik` | `prudnik-zima.png` | wieża zegarowa, zamek i panorama miasta | Edycja oryginału `prudnik.png` w Pythonie: Pillow, NumPy, OpenCV; zachowanie konturów, maski kolorów i ręcznie opracowane detale śniegu i iluminacji | Grafika pochodna z własnego zasobu projektu; prawa właściciela |
| `olesno` | `olesno-zima.png` | drewniany zespół historyczny, ratusz i zabudowa rynku | Edycja oryginału `olesno.png` w Pythonie: Pillow, NumPy, OpenCV; zachowanie konturów, maski kolorów i ręcznie opracowane detale śniegu i iluminacji | Grafika pochodna z własnego zasobu projektu; prawa właściciela |
| `nowy-targ` | `nowy-targ-zima.png` | ratusz i rynek z panoramą Tatr w tle | Edycja oryginału `nowy-targ.png` w Pythonie: Pillow, NumPy, OpenCV; zachowanie konturów, maski kolorów i ręcznie opracowane detale śniegu i iluminacji | Grafika pochodna z własnego zasobu projektu; prawa właściciela |
| `zakopane` | `zakopane-zima.png` | drewniane wille w stylu zakopiańskim na tle gór | Edycja oryginału `zakopane.png` w Pythonie: Pillow, NumPy, OpenCV; zachowanie konturów, maski kolorów i ręcznie opracowane detale śniegu i iluminacji | Grafika pochodna z własnego zasobu projektu; prawa właściciela |
| `elk` | `elk-zima.png` | wieża ciśnień, zamek i zabytkowa kolejka nad jeziorem | Edycja oryginału `elk.png` w Pythonie: Pillow, NumPy, OpenCV; zachowanie konturów, maski kolorów i ręcznie opracowane detale śniegu i iluminacji | Grafika pochodna z własnego zasobu projektu; prawa właściciela |

## Prompty / instrukcje edycji

**Prompt wspólny / specyfikacja:** „Zmień załączony letni plik na zimową wersję dokładnie tej samej panoramy bez przemieszczania obiektów. Zachowaj 1620×900 RGBA, przezroczystość, sylwetkę i grube granatowe kontury. Zielenie przemaluj na śnieżne błękity i mroźne odcienie; dodaj czapy śniegu na dachach i gałęziach, ciepło żółte okna, dyskretny dym z kominów i neutralne girlandy świetlne. Zachowaj oryginalne materiały i kolory budynków, bez tekstów, marek, symboli religijnych, flag i tła nieba”.**

- **`prudnik`:** Dodatkowy śnieg na skośnych dachach starówki i stożkowym dachu baszty, złote okna kamienic i girlandy rynku.
- **`olesno`:** Śnieg na wielopołaciowych dachach drewnianego zespołu, mroźne świerki i zaspany rynek.
- **`nowy-targ`:** Wzmocnienie śnieżnej tonacji gór, oszroniony bruk i śnieg na dachu ratusza oraz drewnianego budynku.
- **`zakopane`:** Zachowanie oryginalnych willi oraz grani górskiej; intensywne czapy śniegu na drewnianych stromych dachach.
- **`elk`:** Zaśnieżone drzewa i brzegi jeziora; otwarta, przyciemniona woda z wąskim pasem lodu i śnieg na wieży oraz kolejce.

## Wykonanie i kontrola

- Oryginały nie są podmieniane i nie są dołączane do paczki wynikowej; dołączono wyłącznie wersje `-zima.png` oraz dokumentację.
- Zmiany graficzne wykonano edycją istniejących pikseli oraz nakładaniem opracowanych masek, konturów i detali. Generator obrazów nie został użyty w końcowych plikach, gdyż próbne generacje nie zachowywały 1:1 wymaganej kompozycji.
- Układ, wymiary i bazowa sylwetka obiektów są takie same jak w letnich PNG (drobne, półprzezroczyste smugi dymu nad kominami stanowią celowy dodatek).
- Bez nieba i padającego śniegu; śnieg to wyłącznie elementy na obiektach i gruncie.
- Podgląd porównawczy i miniatury 480 × 267 px: `docs/art/podglady/zima-128.png`.
- Dopuszczenie: ikony pozostają tą samą autorską interpretacją panoram co ich letnie odpowiedniki.

> **Koordynator (31.10, runda 9):** przyjęte elk, olesno, prudnik; **odrzucone nowy-targ i zakopane** (przypadkowe białe ukośne pasy przez dachy) — do poprawki (zlecenie 142). Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 129 — zimowe panoramy miast

**Data opracowania:** 2026-10-31  
**Projekt:** Cebulak Express — Kierunek Polska  
**Wykonawca:** ChatGPT, precyzyjna edycja przesłanych grafik letnich skryptem Python (Pillow, NumPy, OpenCV); korekty artystyczne i kontrola podglądu  
**Format każdego zasobu:** 1620 × 900, PNG RGBA, przezroczyste tło  
**Źródła:** wyłącznie pięć plików letnich załączonych przez właściciela (`olecko.png`, `goldap.png`, `bartoszyce.png`, `ketrzyn.png`, `bytow.png`). Nie wykorzystano zdjęć, stocków ani zewnętrznych ilustracji.

## Wykaz plików

| Plik zimowy / identyfikator | Co przedstawia | Narzędzie i data | Polecenie / prompt produkcyjny | Pochodzenie i prawa |
|---|---|---|---|---|
| `olecko-zima.png` / `olecko` | Panorama Olecka: rynek, kamienice, drzewa i jezioro w tle | ChatGPT, Pillow + NumPy + OpenCV, 2026-10-31 | Na podstawie `olecko.png` zachowaj 1:1 kamienice, rynek, linię jeziora i kadr. Zmień dachy, drzewa i nawierzchnię na grudniowe, pozostaw ciepłe fasady, dodaj złote okna oraz dyskretne lampki. Bez tła nieba i bez opadów. | Opracowanie pochodne z letniej grafiki projektu; prawa właściciela projektu do obrazu bazowego i wersji przygotowanej na jego zlecenie. |
| `goldap-zima.png` / `goldap` | Gołdap: drewniana tężnia z pawilonem, brzeg jeziora | ChatGPT, Pillow + NumPy + OpenCV, 2026-10-31 | Na podstawie `goldap.png` zachowaj dokładną geometrię tężni, słupów, pomostu i brzegu. Dodaj śnieg na górnych powierzchniach konstrukcji, zimowe drzewa, lodową linię brzegu i ciepłe okna pawilonu. Zachowaj ciepłą barwę drewna i silny granatowy kontur. | Opracowanie pochodne z letniej grafiki projektu; prawa właściciela projektu do obrazu bazowego i wersji przygotowanej na jego zlecenie. |
| `bartoszyce-zima.png` / `bartoszyce` | Bartoszyce: zabytkowa brama, kamienice, panorama miasta i rzeka | ChatGPT, Pillow + NumPy + OpenCV, 2026-10-31 | Na podstawie `bartoszyce.png` zimą zachowaj historyczną ceglaną bramę, dachy, rzekę i istniejące sylwetki. Dodaj śnieg na szczytach i gzymsach, drzewa z ośnieżonymi koronami i widocznymi gałęziami, rozświetlone okna, dyskretny dym i girlandę lampek; bez nowych symboli. | Opracowanie pochodne z letniej grafiki projektu; prawa właściciela projektu do obrazu bazowego i wersji przygotowanej na jego zlecenie. |
| `ketrzyn-zima.png` / `ketrzyn` | Kętrzyn: ceglany zamek, zabytkowa panorama i rzeka | ChatGPT, Pillow + NumPy + OpenCV, 2026-10-31 | Na podstawie `ketrzyn.png` pozostaw budynki i rzekę dokładnie w tych samych miejscach. Zachowaj czerwoną cegłę, oszroń kalenice, gzymsy i mury, zastąp zieleń śniegiem oraz wydobądź ciepłe światło w oknach; kontur granatowy nie może zniknąć. | Opracowanie pochodne z letniej grafiki projektu; prawa właściciela projektu do obrazu bazowego i wersji przygotowanej na jego zlecenie. |
| `bytow-zima.png` / `bytow` | Bytów: zamek z basztami i kolorowe kamienice | ChatGPT, Pillow + NumPy + OpenCV, 2026-10-31 | Na podstawie `bytow.png` wykonaj zmianę sezonu bez przesuwania brył. Połóż śnieg na stromych dachach, blankach, kalenicach, wieżach i ziemi; pozostaw pomarańczową cegłę, pastelowe elewacje i gruby kontur, dodaj rozświetlone okna i niewielką świecką iluminację. | Opracowanie pochodne z letniej grafiki projektu; prawa właściciela projektu do obrazu bazowego i wersji przygotowanej na jego zlecenie. |

## Wspólna specyfikacja edycji

- **Kadr i proporcje:** zachowane z każdego oryginału; eksport zawsze 1620 × 900 RGBA. Wyjściowy kanał alfa jest taki sam jak w pliku letnim z wyjątkiem śladowej, półprzezroczystej pary nad niektórymi istniejącymi kominami.
- **Styl:** nie ruszano oryginalnych grubych, ciemnogranatowych konturów zewnętrznych; ilustracje pozostały płaskie, rysunkowe, z identyczną kolejnością budynków, drzew i elementów krajobrazu.
- **Zimowy detal:** śnieg `#f4f8fb`, niebieskoszare cienie `#c9dbe8`, zaśnieżona zieleń, gałęzie, zimne tony wody, delikatna kra brzegowa, ciepłe żółte okna `#ffd36b`, mała świecka girlanda lampek.
- **Wyjątki wynikające z zachowania oryginału:** Gołdap przedstawia drewnianą tężnię, nie domy mieszkalne; nie dodano do niej nieistniejącego komina. Nie dodawano nowych sylwetek budynków, flag, znaków, reklam ani napisów.
- **Brak nieba:** piksele nieprzezroczyste występują wyłącznie w istniejących elementach krajobrazu i w bardzo małych dekoracjach/dymie; nie wstawiono tła ani padającego śniegu.
- **Technika:** malowanie selektywne na oryginalnych pikselach według barwy i położenia, nanoszenie śniegu w obrębie połaci dachowych oraz ręczne poprawki szczegółów; bez swobodnego przerysowywania kompozycji. Ostatecznych plików nie należy opisywać jako nowo wygenerowanych przez model obrazu — są to przeróbki dostarczonych ilustracji.

## Kontrola

Arkusz w `docs/art/podglady/zima-129.png` zawiera pięć zestawień lato/zima oraz osobną sekcję z pięcioma panoramami zimowymi **w rzeczywistym rozmiarze wyświetlania gry: 480 × 267 px**. Tych podglądów nie umieszczać zamiast plików źródłowych w folderze `landmarks`.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-130 — zimowe panoramy pięciu miast

**Data:** 2026-10-31  
**Narzędzia:** ChatGPT do opracowania instrukcji; retusz warstwowy w Pythonie (Pillow 12.3, OpenCV 4.13).
**Źródło:** pięć letnich plików PNG przekazanych przez właściciela projektu w `zlecenie-130-paczka.zip`.
**Licencja:** grafiki opracowane na podstawie plików projektu; prawa właściciela projektu; użycie w grze na zasadach własności projektu. Nie wykorzystano zdjęć ani zasobów zewnętrznych.

| ID / plik zimowy | Co przedstawia | Narzędzie i zmiany | Data | Licencja |
|---|---|---|---|---|
| `slupsk` / `slupsk-zima.png` | Słupsk — panorama ceglanej bramy, baszt i historycznej zabudowy nad rzeką | Retusz algorytmiczny Pillow/OpenCV: śnieg, zimowa roślinność, zimne odblaski, ciepłe okna i lampki, dym; zachowany oryginalny lineart, pozycja i rozmiar | 2026-10-31 | Prawa właściciela projektu, pochodna oryginału `slupsk.png` |
| `chojnice` / `chojnice-zima.png` | Chojnice — średniowieczna brama, szczytowy ratusz i zabudowa starego miasta | Retusz algorytmiczny Pillow/OpenCV: śnieg, zimowa roślinność, zimne odblaski, ciepłe okna i lampki, dym; zachowany oryginalny lineart, pozycja i rozmiar | 2026-10-31 | Prawa właściciela projektu, pochodna oryginału `chojnice.png` |
| `kartuzy` / `kartuzy-zima.png` | Kartuzy — zabytkowa zabudowa przy jeziorze, pagórki i drzewa iglaste | Retusz algorytmiczny Pillow/OpenCV: śnieg, zimowa roślinność, zimne odblaski, ciepłe okna i lampki, dym; zachowany oryginalny lineart, pozycja i rozmiar | 2026-10-31 | Prawa właściciela projektu, pochodna oryginału `kartuzy.png` |
| `stalowa-wola` / `stalowa-wola-zima.png` | Stalowa Wola — stylizowana zabudowa miejska i zakłady przemysłowe | Retusz algorytmiczny Pillow/OpenCV: śnieg, zimowa roślinność, zimne odblaski, ciepłe okna i lampki, dym; zachowany oryginalny lineart, pozycja i rozmiar | 2026-10-31 | Prawa właściciela projektu, pochodna oryginału `stalowa-wola.png` |
| `mielec` / `mielec-zima.png` | Mielec — stare miasto, historyczna sylwetka wieży i generyczny samolot | Retusz algorytmiczny Pillow/OpenCV: śnieg, zimowa roślinność, zimne odblaski, ciepłe okna i lampki, dym; zachowany oryginalny lineart, pozycja i rozmiar | 2026-10-31 | Prawa właściciela projektu, pochodna oryginału `mielec.png` |

## Instrukcje edycji (prompty)

Poniższe prompty opisują cel wizualny zimowego retuszu. Wersje końcowe wykonano przez lokalne przekształcenia i precyzyjne nakładki na oryginały, aby nie zmienić rozkładu pikseli i geometrii obiektów.

### slupsk

> Przekształć tylko warstwę pory roku dla panoramy Słupska z pliku slupsk.png. Zachowaj dokładnie baszty, ceglane mury, dachy, kościelną sylwetkę, linię rzeki, rozmieszczenie drzew i kontury. Pokryj dachy śniegiem, drzewa czapami śniegu, oświetl wybrane okna, dodaj delikatny dym z kominów, bez tła.

### chojnice

> Zachowaj identyczną kompozycję panoramy Chojnic z bramą, ratuszem, kamienicami i dwoma dominantami. Zastąp letnią zieleń zimową, umieść śnieg na połaciach dachów i szczytach, ciepłe żółte światło w wybranych oknach i drobne świeckie lampki.

### kartuzy

> Zachowaj kadr Kartuz z dachem o zielonej patynie, budynkami, lasem, iglakami i jeziorem. Dodaj śnieg na połaciach dachów, wzgórzach i gałęziach; pozostaw patynę metalu widoczną. Woda ma być ciemniejsza, ze skrawkami lodu przy brzegu. Ciepłe okna.

### stalowa-wola

> Dokładnie zachowaj kontury budynków, zegara, fabryki, kominów i drzew ze Stalowej Woli. Śnieg na dachach, gzymsach, świerkach i trawie; ciepło oświetlone okna, lekkie smugi dymu; zachowaj gruby granatowy kontur.

### mielec

> Zachowaj rozmieszczenie kamienic, sylwetkę miejskiej zabudowy, skrzydła generycznego samolotu i rzekę w panoramie Mielca. Usuń dwa drobne krzyże w sylwetce, nie dodawaj motywów religijnych. Pokryj dachy i trawę śniegiem, ociepl wybrane okna, zachowaj samolot i przeźroczyste niebo.

## Weryfikacja

- Wszystkie pliki zimowe są `PNG`, `RGBA`, `1620×900` i zachowują przezroczyste tło.
- Żadna panorama nie została przeskalowana, przesunięta ani wykadrowana; śnieg i dekoracje nakłada się w układzie współrzędnych oryginału.
- Oryginalne grube ciemnogranatowe kontury są zachowane (nad warstwami zimowych detali).
- W `docs/art/podglady/zima-130.png` znajdują się porównania lato/zima obok siebie oraz zimowe miniatury 480×267.
- Nie dodano tekstów, marek, logo, flag, herbów ani nowych obiektów trasy.
- **Mielec:** dwa drobne krzyże widoczne w dostarczonym letnim oryginale zostały usunięte w zimowym wariancie zgodnie z zakazem motywów religijnych. Sylwetka budowli poza tym nie została przemodelowana.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-131 — zimowe wersje panoram

Data wykonania: **2026-10-31**. Rozdzielczość każdego obrazu: **1620 × 900**, PNG RGBA (sRGB).

## Pliki i pochodzenie

| Plik / ID | Co przedstawia | Narzędzie | Data | Prompt (korekta) | Licencja / prawa |
|---|---|---|---|---|---|
| `jaslo-zima.png` / `jaslo` | Panorama Jasła — zabytkowa zabudowa, wieża i rzeka | Python, Pillow i NumPy; ręczne maski i nakładki na istniejącej ilustracji | 2026-10-31 | Ośnież dachy starego miasta, drzewa i brzeg rzeki; rozświetl część okien, dodaj lampki przy kamienicy. | Grafika pochodna przygotowana dla projektu na podstawie letniej grafiki projektu; prawa do materiału źródłowego deklaruje właściciel projektu. |
| `przemysl-zima.png` / `przemysl` | Panorama Przemyśla — most, starówka, zabytkowe wieże i zamek | Python, Pillow i NumPy; ręczne maski i nakładki na istniejącej ilustracji | 2026-10-31 | Ośnież starówkę i zamek, zachowaj most, dorzecze i ciemną otwartą rzekę; rozświetl kilka okien. | Grafika pochodna przygotowana dla projektu na podstawie letniej grafiki projektu; prawa do materiału źródłowego deklaruje właściciel projektu. |
| `sanok-zima.png` / `sanok` | Panorama Sanoka — zamek, skansen i pogórze | Python, Pillow i NumPy; ręczne maski i nakładki na istniejącej ilustracji | 2026-10-31 | Ośnież zamek, domy drewniane, drzewa i pasma wzgórz; pozostaw rzekę częściowo wolną od lodu. | Grafika pochodna przygotowana dla projektu na podstawie letniej grafiki projektu; prawa do materiału źródłowego deklaruje właściciel projektu. |
| `lubaczow-zima.png` / `lubaczow` | Panorama Lubaczowa — ratusz z zegarem i rynek | Python, Pillow i NumPy; ręczne maski i nakładki na istniejącej ilustracji | 2026-10-31 | Ośnież ratusz z zegarem i rynek; dodaj ciepłe okna, świecką girlandę i małą choinkę pod altaną. | Grafika pochodna przygotowana dla projektu na podstawie letniej grafiki projektu; prawa do materiału źródłowego deklaruje właściciel projektu. |
| `biala-podlaska-zima.png` / `biala-podlaska` | Panorama Białej Podlaskiej — historyczna brama, zabudowa i drzewa | Python, Pillow i NumPy; ręczne maski i nakładki na istniejącej ilustracji | 2026-10-31 | Ośnież bramę, stare kamienice i duże korony drzew; dodaj lampki na elewacji i ciepłe okna. | Grafika pochodna przygotowana dla projektu na podstawie letniej grafiki projektu; prawa do materiału źródłowego deklaruje właściciel projektu. |

## Instrukcja artystyczna zastosowana do wszystkich wersji

> Zimowa wersja letniej panoramy, bez zmiany kadrów i położenia architektury: śnieżne czapy na dachach i koronie drzew, ośnieżony grunt, lodowe brzegi wody, ciepłe oświetlenie części okien, świeckie lampki, subtelny dym z komina; transparentne tło, gruby granatowy kontur, bez tekstu/flag/logo.

## Szczegóły techniczne i korekty

- **Bazowe pliki:** oryginalne `jaslo.png`, `przemysl.png`, `sanok.png`, `lubaczow.png`, `biala-podlaska.png` otrzymane w paczce zlecenia.
- **Metoda:** proceduralna sezonowa adaptacja pikseli z oryginalnych PNG i ręcznie ustawione śnieżne linie dachów, zaspy, lampki oraz punkty okien; oryginalne granatowe kontury i rozplanowanie zabudowy zachowane.
- **Nie wykorzystano zewnętrznych zdjęć ani generatora obrazu do samych 5 plików wynikowych.** Pochodzenie bazowych letnich ilustracji nie było w paczce osobno udokumentowane.
- **Przezroczystość:** oryginalna maska alfa pozostawiona we wszystkich punktach, poza dyskretnym półprzezroczystym dymem ponad wybranymi kominami.
- **Kolory i klimat:** śnieg `#f4f8fb`, cień `#c9dbe8`, ciepłe okna `#ffd36b`, ciemne oryginalne kontury `#1d2f3b`; bez nieba, padającego śniegu, napisów, logotypów, flag i motywów religijnych.
- **Prawa:** grafiki pochodne od ilustracji dostarczonych przez właściciela projektu, przeznaczone do użytku w tym projekcie; brak zewnętrznych składników o osobnych licencjach.

## Kontrola jakości

- Każdy plik sprawdzono pod kątem trybu RGBA, wymiarów, przezroczystych narożników, zgodności linii gruntu i spójności kompozycji z oryginałem.
- `docs/art/podglady/zima-131.png` zawiera pary lato/zima i pięć wersji zimowych w docelowej skali wyświetlania 480 × 267.
- Nie modyfikowano repozytorium ani nie wykonywano push, branch czy PR.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS 132 — panoramy zimowe

**Data:** 2026-10-31  
**Przeznaczenie:** Cebulak Express — Kierunek Polska; pięć grafik punktów trasy na grudzień.  
**Rozdzielczość:** każdy plik 1620 × 900 px, PNG RGBA (przezroczyste niebo); plan daleki 480 × 267 px.  
**Narzędzia:** Python 3, Pillow, NumPy, OpenCV; ręcznie określone maski i ścieżki śniegu/gałęzi na podstawie udostępnionych oryginałów. Bez kopiowania zdjęć i bez korzystania z cudzych znaków graficznych.  

| ID | Plik | Przedstawia | Narzędzie | Data | Licencja / prawa |
|---|---|---|---|---|---|
| `zamosc` | `zamosc-zima.png` | Panorama zamojskiego ratusza z wieżą i kolorowych kamienic rynku | Python / Pillow / NumPy / OpenCV, edycja grafiki projektu | 2026-10-31 | Wersja opracowana dla projektu na podstawie dostarczonej letniej grafiki projektu; prawa do oryginału według oświadczenia zleceniodawcy pozostają przy właścicielu projektu. |
| `tomaszow-lubelski` | `tomaszow-lubelski-zima.png` | Panorama zabudowy Tomaszowa Lubelskiego z drewnianą świątynią i wzgórzami | Python / Pillow / NumPy / OpenCV, edycja grafiki projektu | 2026-10-31 | Wersja opracowana dla projektu na podstawie dostarczonej letniej grafiki projektu; prawa do oryginału według oświadczenia zleceniodawcy pozostają przy właścicielu projektu. |
| `ostrowiec-swietokrzyski` | `ostrowiec-swietokrzyski-zima.png` | Panorama Ostrowca Świętokrzyskiego z kamienicami, mostem, rzeką i ceglaną zabudową przemysłową | Python / Pillow / NumPy / OpenCV, edycja grafiki projektu | 2026-10-31 | Wersja opracowana dla projektu na podstawie dostarczonej letniej grafiki projektu; prawa do oryginału według oświadczenia zleceniodawcy pozostają przy właścicielu projektu. |
| `skarzysko-kamienna` | `skarzysko-kamienna-zima.png` | Panorama dworca kolejowego w Skarżysku-Kamiennej z pociągiem, drzewami i zabudową | Python / Pillow / NumPy / OpenCV, edycja grafiki projektu | 2026-10-31 | Wersja opracowana dla projektu na podstawie dostarczonej letniej grafiki projektu; prawa do oryginału według oświadczenia zleceniodawcy pozostają przy właścicielu projektu. |
| `raciborz` | `raciborz-zima.png` | Panorama Raciborza z historyczną zabudową, wieżami, zielenią i rzeką | Python / Pillow / NumPy / OpenCV, edycja grafiki projektu | 2026-10-31 | Wersja opracowana dla projektu na podstawie dostarczonej letniej grafiki projektu; prawa do oryginału według oświadczenia zleceniodawcy pozostają przy właścicielu projektu. |

## Instrukcje artystyczne / prompty dla poszczególnych plików

### `zamosc-zima.png`

Wykonać wariant grudniowy na podstawie zamosc.png: śnieg na parapetach ratusza, barokowych szczytach kamienic, schodach i brukowanej płycie rynku; ciepłe okna, subtelna girlanda, mała ozdobiona choinka i dym z komina. Zachować historyczną architekturę i kolory elewacji, proporcje, grubą granatową kreskę, położenie gruntu i przezroczystość. Nie dodawać nieba, opadów, napisów, znaków i religijnych ozdób.

### `tomaszow-lubelski-zima.png`

Na podstawie tomaszow-lubelski.png zamienić zielone wzgórza i trawę w pokryte śniegiem, pobielić konary iglaków, nadać drzewom liściastym bezlistne gałęzie, pozostawić drewnianą architekturę i czerwone dachy z warstwą śniegu. Ciepłe okna, niewielka ozdobiona choinka i delikatny dym. Dokładnie ten sam kadr, gruby granatowy kontur, przezroczyste tło. Bez nieba, opadów, napisów i symboli religijnych.

### `ostrowiec-swietokrzyski-zima.png`

Na podstawie ostrowiec-swietokrzyski.png zimowe dachy kamienic, fabrycznych hal, mostu i ulicy; śnieżne wzgórza, pozbawione liści drzewa, brzeg rzeki z cienkim lodem i ciemniejszą wodą. Ciepłe szyby, delikatne grudniowe ozdoby. Zachować czerwony kolor cegły, układ budynków, rzekę, kadr i gruby kontur, RGBA bez nieba, padającego śniegu i napisów.

### `skarzysko-kamienna-zima.png`

Na podstawie skarzysko-kamienna.png wiernie zachować dworzec i pociąg; dodać śnieg na dachu dworca, daszku peronowym, dachu pociągu i świerkach. Zieleń w tle zamienić na zimowe lasy, szron na krzewach, delikatny dym, ciepłe okna stacji i małą choinkę na peronie. Zachować zielony lakier pociągu, wszystkie proporcje i gruby granatowy obrys, przezroczystość oraz brak nieba, napisów i marek.

### `raciborz-zima.png`

Na podstawie raciborz.png zachować zamek, historyczną bryłę miasta, czerwone dachy i rzekę, a dodać białe pokrywy śnieżne na dachach, krenelażach i parapetach. Ulistnione drzewa zastąpić ośnieżonymi koronami z widocznymi gałęziami, przy brzegach rzeki dodać lód, a w oknach ciepłe światło i subtelną girlandę. Usunąć wyraźne krzyże z wież; bez nieba, opadów, nowych szyldów czy symboli. Zachować format i styl.

## Szczegóły techniczne

- **Kompozycja:** edycja bez zmiany położenia, skali i kolejności oryginalnych budynków, torów, drzew i rzek; raster źródłowy zachowany jako podstawa.
- **Kolorystyka:** śnieg `#f4f8fb`, cień `#c9dbe8`, granatowy kontur `#1d2f3b`, ciepłe okna `#ffd36b`. Cegła i elewacje pozostają w kolorach pierwowzoru.
- **Przezroczystość:** oryginalna maska sylwetki zachowana dla śniegu i zdobień; wyjątkami są lekko transparentne smugi dymu oraz usunięte krzyże w panoramie Raciborza.
- **Teksty i znaki:** brak napisów, szyldów, logo, flag, godeł, tablic rejestracyjnych i ozdób religijnych.
- **Podgląd:** `docs/art/podglady/zima-132.png` pokazuje 5 par lato/zima oraz 5 zimowych grafik 480 × 267.
- **Źródła:** wyłącznie pięć letnich plików PNG przekazanych przez właściciela zlecenia; żadnych źródeł zewnętrznych.

## Sprawdzenie

Weryfikacja skryptowa: wszystkie pliki istnieją, dekodują się jako RGBA 1620 × 900, mają przezroczyste niebo i zachowują pozycję budynków. Wykonano arkusz porównawczy i podgląd w skali gry.

> **Koordynator (31.10, runda 9):** przyjęte ostrowiec-swietokrzyski, raciborz, skarzysko-kamienna, zamosc; **odrzucony tomaszow-lubelski** (prostokątny szew zielonego tła po lewej) — do poprawki (zlecenie 142). Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-133 — Zima: Wałbrzych, Legnica, Berlin, Drezno i granica (Cieszyn)

Data wykonania: **2026-10-31** · Zlecenie: **133** · Runda: **9**

## Zasoby graficzne

Wszystkie grafiki zimowe są **autorską edycją przekazanych przez właściciela projektu plików letnich**, nie są adaptacją zewnętrznych zdjęć. Stylizację wykonano przez zachowujące geometrię przemalowanie wypełnień, nanoszenie śnieżnych czap na istniejące dachy i drzewa oraz dodanie niewielkich świeckich dekoracji grudniowych. Nie zawierają marek, czytelnych napisów, flag ani herbów.

| ID / plik | Co przedstawia | Narzędzie | Data | Prompt / zakres redakcyjny | Licencja / prawa |
|---|---|---|---|---|---|
| `walbrzych-zima.png` | Panorama Zamku Książ w Wałbrzychu, meta trasy | Python 3, Pillow, OpenCV (edycja na podstawie `walbrzych.png`) | 2026-10-31 | „Przekształć **wyłącznie** otoczenie i pogodę letniego zamku w grudzień: śnieg na czerwonych dachach, ośnieżony las i skały, ciepłe okna, dwa delikatne dymy z istniejących kominów, dyskretne lampki; zachowaj zamek, kadr i obrys.” | Zasób przygotowany dla projektu na podstawie oryginalnej grafiki projektu; prawa do grafiki źródłowej i jej zamówionej adaptacji po stronie właściciela projektu. |
| `legnica-zima.png` | Panorama Legnicy z dwuwieżową dominantą i kamienicami, meta trasy | Python 3, Pillow, OpenCV (edycja na podstawie `legnica.png`) | 2026-10-31 | „Zachowaj dokładne bryły, okna i ustawienie wszystkich budynków; zmień zielony grunt na śnieg, dodaj czapy śnieżne na spadzistych dachach, ciepłe światło w części okien i girlandę świetlną między wieżami.” | Zasób przygotowany dla projektu na podstawie oryginalnej grafiki projektu; prawa właściciela projektu. |
| `berlin-zima.png` | Panorama Berlina: Brama Brandenburska, Reichstag i wieża telewizyjna | Python 3, Pillow, OpenCV (edycja na podstawie `berlin.png`) | 2026-10-31 | „Utrzymaj historyczne dominanty i ich pozycje; ośnież drzewa, dachy i gzymsy, ozdób świecką girlandą górną belkę Bramy Brandenburskiej, dodaj kilka ciepłych okien, zachowaj granatowy kontur.” | Zasób przygotowany dla projektu na podstawie oryginalnej grafiki projektu; prawa właściciela projektu. |
| `drezno-zima.png` | Panorama Drezna z mostem, historyczną zabudową i Łabą | Python 3, Pillow, OpenCV (edycja na podstawie `drezno.png`) | 2026-10-31 | „Nie przesuwaj panoramy ani mostu: oszroń gzymsy i dachy, zasyp śniegiem drzewa przy rzece, przyciemnij wodę bez jej całkowitego zamarzania, dodaj ciepłe okna i nienachalne lampki na budynku.” | Zasób przygotowany dla projektu na podstawie oryginalnej grafiki projektu; prawa właściciela projektu. |
| `granica-cieszyn-zima.png` | Przejście drogowe w Cieszynie: szlaban, budka, most, rzeka, góry i pusta tablica | Python 3, Pillow, OpenCV (edycja na podstawie `granica-cieszyn.png`) | 2026-10-31 | „Utrzymaj identyczną drogę, szlaban, budkę i pustą niebieską tablicę; zaśnież zbocza, drzewa, daszki, balustrady i pobocze, pozostaw ciemną niezamarzniętą rzekę, rozświetl okno budki i girlandę na jej dachu.” | Zasób przygotowany dla projektu na podstawie oryginalnej grafiki projektu; prawa właściciela projektu. |

## Technika i zakres modyfikacji

- Wszystkie pliki wynikowe to **PNG / RGBA / 1620 × 900 px** z zachowaniem pierwotnego kadru, rozmieszczenia brył, krawędzi gruntu i przezroczystego tła; cień i gruby granatowy kontur z oryginału są zachowane.
- Kolory śniegu i cieni: `#f4f8fb`, `#c9dbe8`; ciepłe oświetlenie: paleta bursztynowa wokół `#ffd36b`. Kolory cegieł i fasad nie zostały przemalowane na biało.
- Brak nowego nieba i opadów: śnieg jest wyłącznie na istniejących powierzchniach. Przy Wałbrzychu dodano dwa drobne półprzezroczyste obłoki dymu ponad istniejącymi kominami.
- Arkusz: `docs/art/podglady/zima-133.png` — pięć par lato/zima na tle `#bfe3f5`, a pod spodem miniatury w rozmiarach logicznych gry (dla czterech panoram 480 × 267; dla Cieszyna 180 × 100).
- **Sposób przygotowania:** deterministyczna edycja i ręcznie wskazane miejsca akcentów zimowych na źródłowych ilustracjach z paczki. Nie kopiowano fotografii ani cudzych assetów, nie korzystano z zewnętrznych zasobów graficznych.

## Kontrola techniczna

Każdy plik sprawdzono pod kątem rozmiaru, kanału alfa, ścieżki docelowej oraz poprawnego otwierania. Pliki letnie nie są zmieniane ani duplikowane, ponieważ zlecenie dotyczy wyłącznie pięciu zimowych wariantów istniejących punktów.

> **Koordynator (31.10, runda 9):** przyjęte. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS — zlecenie 134 (31 października 2026)

**Prawa:** grafiki przygotowane specjalnie dla projektu „Cebulak Express — Kierunek Polska” na podstawie dostarczonych przez właściciela projektu plików letnich. Prawa do udostępnionych materiałów wejściowych pozostają przy właścicielu projektu; rezultaty przeznaczone do wykorzystania w tym projekcie. Brak zewnętrznych fotografii, nazw firm, fontów osadzonych w ilustracjach i materiałów stockowych.

**Narzędzia:** ChatGPT (kompozycja, stylizacja, autorski opis grafiki), ręcznie przygotowane instrukcje graficzne SVG, CairoSVG (render), Pillow / NumPy / OpenCV (sezonowa korekta barw i dokładne nakładki), ręczna kontrola na podglądzie 180×100. Raster RGBA, 1620×900 px. Grafiki nowych par rysowane według wspólnej geometrii; wszystkie zimowe detale dołożone bez przemieszczania architektury.

| Plik / ID | Co przedstawia | Prompt i założenia | Narzędzie | Licencja i uwagi |
|---|---|---|---|---|
| `granica-jedrzychowice.png` | Jędrzychowice/Zgorzelec: dawne przejście drogowe i most nad Nysą Łużycką, wzgórza Dolnego Śląska, podniesiony szlaban, pusty niebieski znak | „Nowa letnia ilustracja A+ przydrożnego przejścia, gruby kontur #1d2f3b, 2 wiaty odpraw, architektoniczny most, rzeka, wzgórza, brak nieba, znak bez napisu, kadr 1620×900 z przezroczystością” | SVG / CairoSVG / ChatGPT | Oryginalna grafika dla właściciela projektu, oparta na układzie letniego wzorca |
| `granica-jedrzychowice-zima.png` | To samo przejście zimą, ośnieżone dachy i wzgórza, ciepłe okna | „Zachować każdy budynek, most, szlaban i znak na tym samym miejscu i w tej samej skali; dodać zaspy, czapy śniegu, bare gałęzie, lód przy wodzie, ciepłe światło, świecką girlandę; bez opadów i nieba” | SVG / CairoSVG / ChatGPT | Oryginalna grafika zimowa na bazie nowego lata; prawa właściciela projektu |
| `stacja-jedrzychowice.png` | Generyczna stacja paliw A4 przy granicy, kiosk z kawą i przekąskami, busy z bagażem, Pogórze Izerskie | „Nowa letnia ilustracja A+: biało-czerwona bezmarkowa stacja z 2 pompami, biało-czerwony daszek, kiosk z pasiastą markizą, busy z walizkami, wzgórza, pusty znak, gruby granatowy kontur, bez nazw” | SVG / CairoSVG / ChatGPT | Oryginalna grafika dla właściciela projektu, oparta na układzie letniego wzorca |
| `stacja-jedrzychowice-zima.png` | Ta sama stacja paliw A4 z zaśnieżonymi dachami i pojazdami | „Identyczna kompozycja co latem, wyraźna biel i błękit śniegu na wiacie, kiosku, polach i dachach busów, ciepły kiosk i delikatne lampki; zero napisów i marek” | SVG / CairoSVG / ChatGPT | Oryginalna grafika zimowa na bazie nowego lata; prawa właściciela projektu |
| `stacja-cieszyn-zima.png` | Ośnieżona stacja z drewnianym domem, kioskiem i beskidzkimi wzgórzami | „Zachować dostarczony letni raster 1:1: stacja, busy, kiosk, dom i wzgórza nie zmieniają miejsc ani proporcji; przygasić zieleń, dać śnieg na dachu głównej wiaty, chacie, markizach, świerkach i ziemi, ciepłe okna, bez nieba i padającego śniegu” | Python / Pillow / OpenCV, oryginał + ręczna nakładka SVG / CairoSVG / ChatGPT | Modyfikacja dostarczonej grafiki projektu; prawa właściciela projektu |

Arkusz kontrolny: `docs/art/podglady/zima-134.png` pokazuje wszystkie trzy pary lato/zima oraz trzy miniatury zimowe w skali 180×100 px.

**Kontrola techniczna:** wszystkie pięć plików PNG to RGBA, dokładnie 1620×900, z alfa=0 w górnych partiach obrazu; nie zawierają wpisanych nazw, logo, rejestracji, flag ani motywów religijnych. Ciepłe lampki to dekoracje świeckie.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-135 - zimowe punkty trasy

**Data wykonania:** 31 października 2026 r.  
**Projekt:** Cebulak Express - Kierunek Polska  
**Technika:** autorskie rysunki wektorowe oraz rasterowa edycja oryginału dostarczonego przez właściciela projektu.  
**Parametry:** PNG RGBA, 1620 × 900 px, przezroczyste tło, gruby kontur #1d2f3b.

| Plik | ID | Co przedstawia | Narzędzie / źródło | Data | Licencja i prawa |
|---|---|---|---|---|---|
| `granica-swiecko.png` | `granica-swiecko` | Przejście graniczne w Świecku, lato | Rysunek wektorowy SVG, render CairoSVG, Pillow | 2026-10-31 | Grafika na potrzeby projektu, na podstawie dostarczonych grafik; prawa do zasobów projektu przysługują właścicielowi projektu |
| `granica-swiecko-zima.png` | `granica-swiecko` | Przejście graniczne w Świecku, zima | Rysunek SVG z identyczną geometrią i warstwami śniegu, CairoSVG | 2026-10-31 | Grafika na potrzeby projektu, na podstawie dostarczonych grafik; prawa do zasobów projektu przysługują właścicielowi projektu |
| `stacja-swiecko.png` | `stacja-swiecko` | Stacja za granicą (okolice Świecka), lato | Rysunek wektorowy SVG, render CairoSVG, Pillow | 2026-10-31 | Grafika na potrzeby projektu, na podstawie dostarczonych grafik; prawa do zasobów projektu przysługują właścicielowi projektu |
| `stacja-swiecko-zima.png` | `stacja-swiecko` | Stacja za granicą (okolice Świecka), zima | Rysunek SVG z identyczną geometrią i warstwami śniegu, CairoSVG | 2026-10-31 | Grafika na potrzeby projektu, na podstawie dostarczonych grafik; prawa do zasobów projektu przysługują właścicielowi projektu |
| `granica-olszyna-zima.png` | `granica-olszyna` | Przejście graniczne w Olszynie, zima | Edycja oryginalnego PNG, Pillow i NumPy + nakładka SVG/CairoSVG | 2026-10-31 | Grafika na potrzeby projektu, na podstawie dostarczonych grafik; prawa do zasobów projektu przysługują właścicielowi projektu |

## Prompty / założenia artystyczne

### `granica-swiecko`

Na podstawie letniego pierwowzoru zachowaj układ i skalę: dawne wiaty odpraw, sosny lubuskie, graniczny szlaban podniesiony w górę, pusta tablica oraz rzeka Odra. Pomaluj w ciepłym stylu kreskówkowym z mocnym granatowym konturem. Do wariantu zimowego dodaj gruby śnieg na dachach, choinkach i poboczu, lód przy brzegu, ciepłe światła. Niebo i padający śnieg pomiń.

### `stacja-swiecko`

Na podstawie letniego pierwowzoru zachowaj układ: czerwona wiata stacji, dwa dystrybutory, budka z kawą i hot dogami, pusta tablica, generyczne busy i sosnowy las. Czysty styl kreskówkowy, kontur #1d2f3b, pełna przezroczystość wokół obiektów. Do zimowej wersji dodaj czapy śniegu, zaspy i żółte ciepłe okno, bez zmiany położenia obiektów.

### `granica-olszyna`

Zimowa edycja istniejącej ilustracji, bez przesuwania oryginalnych obiektów i zmiany ich kształtu: białe czapy na zadaszeniu, drzewach i niebieskiej tablicy; wyciszona zieleń, śnieg na krzewach i poboczu, ciepłe okna budek i nieliczne świeckie lampki. Bez napisów i marek.

## Przebieg prac

Nowe pary lato i zima narysowano tą samą geometrią SVG, dobierając sezonowo kolory oraz warstwy śniegu. Nie przeskalowywano żadnego elementu między tymi wersjami. Zimowy wariant Olszyny opracowano na tej samej warstwie letniego oryginału, a dodatki naniesiono jako przezroczystą nakładkę. Każda ilustracja ma przezroczystą przestrzeń ponad zabudową i nie ma opadów na niebie.

## Licencja i źródła

Rysunki są opracowaniem przygotowanym na potrzeby projektu. Materiałem referencyjnym były trzy letnie grafiki dołączone do zlecenia. Nie użyto cudzych zdjęć, marek, logotypów, znaków drogowych z tekstem, symboli politycznych, religijnych ani flag. Rzeczywista metoda wykonania: rysunek i raster programowy, nie import obrazu z zewnętrznego generatora.

## Kontrola jakości

- Pięć plików PNG ma wymiary 1620 × 900 i format RGBA.
- Oba warianty nowych punktów używają tych samych współrzędnych obiektów.
- Kontury są granatowe, a tło powyżej panoramy pozostaje przezroczyste.
- W arkuszu `docs/art/podglady/zima-135.png` pokazano 3 pary obrazów oraz wszystkie wersje zimowe w skali gry 180 × 100 px.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS 136 - lato i zima: Ystad, prom baltycki, stacja A18

- Data: **2026-10-31**.
- Format produkcyjny: **PNG RGBA 1620 x 900**, warstwa przezroczysta.
- Barwa konturu: **`#1d2f3b`**. Bez znaków, napisów, flag i logotypów.
- Technika: oryginalna **ilustracja wektorowa projektowana i rysowana programowo (Python + SVG/CairoSVG/Pillow)** w oparciu o kompozycję materiałów letnich projektu. Nie użyto fotografii zewnętrznych, gotowych marek ani cudzych ilustracji.
- Licencja: **grafiki przygotowane na zlecenie właściciela projektu na bazie oryginalnych grafik projektu; prawa do używania i dalszej modyfikacji przekazane właścicielowi projektu**. Autor wykonania: ChatGPT/OpenAI, kompozycja pierwotna: właściciel projektu.
- Arkusz kontroli: `docs/art/podglady/zima-136.png`.

| Plik / ID | Co przedstawia | Narzędzie / źródło | Prompt / instrukcja wykonania | Licencja |
|---|---|---|---|---|
| `ystad.png` / `ystad` | Port promowy w Ystad latem: cztery pastelowe domy z muru pruskiego, terminal i nienazwany prom, mewy. | Python SVG + CairoSVG; układ z letniego `ystad.png` w załączniku. | "Przerysuj port Ystad na jasną, ciepłą komiksową panoramę. Duże, kolorowe budynki szachulcowe po lewej, terminal i uniwersalny biały prom po prawej, morze, mewy; gęsty granatowy kontur, zero tekstu, transparentne niebo". | Właściciel projektu |
| `ystad-zima.png` / `ystad` | Ten sam port w grudniu: śnieżne dachy i nabrzeże, chłodne morze, oświetlone okna, lampki. | Ta sama geometria wektorowa + warstwa sezonowa SVG. | "Zachowaj identyczne sylwetki i położenia, dodaj czapy śniegu i lodowe cienie, ciepłe okna, świeckie lampki oraz morski chłód, bez padającego śniegu i tła nieba". | Właściciel projektu |
| `prom-baltyk.png` / `prom-baltyk` | Duży neutralny prom samochodowy na otwartym Bałtyku latem; mewy, fale i daleka latarnia. | Python SVG + CairoSVG; kadr i skala ze źródłowego `prom-baltyk.png`. | "Duży prom pasażersko-samochodowy bez nazwy i barw operatora, wielowarstwowe pokłady, szalupy i duże niebieskie fale, daleki pas lądu, mewy; kontur granatowy i przezroczyste niebo". | Właściciel projektu |
| `prom-baltyk-zima.png` / `prom-baltyk` | Ten sam prom na zimnym Bałtyku; śnieg na pokładach, zimna woda i ciepłe okna. | Ta sama geometria wektorowa + zimowa paleta SVG. | "Zachowaj kadr promu i lądu 1:1, zlodowaciałe krawędzie i śnieg na pokładach, grube turkusowo-niebieskie fale, ciepłe okna, przejrzyste niebo, bez opadów". | Właściciel projektu |
| `stacja-olszyna-zima.png` / `stacja-olszyna` | Śnieżna stacja paliw z dwiema załadowanymi autami i kioskiem przy A18 w Polsce. | Python NumPy/Pillow + ręczne nałożenie wektorowej warstwy śniegu; źródło oryginalne `stacja-olszyna.png`. | "Zachowaj oryginalną sylwetkę i kompozycję bez przesuwania. Zmień las, liście i grunt na zimowe, dodaj szerokie czapy śniegu na wiacie, kiosku i pojazdach, ciepłe światło w kiosku i delikatne świeckie lampki". | Właściciel projektu |

## Kontrola jakości

- Pliki PNG: 1620 × 900, RGBA, przezroczyste niebo, bez obcego tła.
- Ystad i prom: lato/zima mają wspólną geometrię głównych brył, nabrzeży i kadru; sezon wymienia kolory i nakłada lokalny śnieg.
- Stacja: zachowano oryginalne obiekty i lokalizacje, zmodyfikowano tylko barwy oraz dodano zimowe nakładki.
- Gotowość: arkusz porównania sezonów i małe rozmiary z gry.
- Testy typu `npm ci`, kompilacja Android i test w aplikacji: **nie wykonywano**, bo to dostawa zasobów graficznych, nie kodu gry.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-137 — zimowe landmarki, runda 9

**Data:** 2026-10-31  
**Projekt:** Cebulak Express — Kierunek Polska  
**Zestaw:** 3 miejsca, 5 plików PNG RGBA (1620 × 900), transparentne tło.  
**Autor/narzędzie:** ilustracje stworzone programowo jako autorskie grafiki wektorowe SVG za pomocą Python, wyrenderowane przez CairoSVG; przetwarzanie sezonowe i korekty w Pillow/NumPy. Materiały zostały przygotowane na podstawie letnich PNG otrzymanych w zleceniu nr 137. **Żadnych zewnętrznych zdjęć, logotypów ani gotowych grafik stockowych.**

| Plik / identyfikator | Co przedstawia | Narzędzie i sposób wykonania | Data | Licencja / uwagi |
|---|---|---|---|---|
| `swinoujscie.png` — `swinoujscie` | Nowa ilustracja letnia A+: portowe przejście w Świnoujściu, latarnia, prom, budynek terminala, podniesiony szlaban, Stawa Młyny, pusty niebieski znak, wydmy | Python + ręczny rysunek SVG → CairoSVG → PNG; nowa kompozycja oparta na orientacyjnym układzie letniego pliku referencyjnego | 2026-10-31 | Grafika wykonana dla właściciela projektu na bazie jego materiałów; prawa do użycia w projekcie właściciela |
| `swinoujscie-zima.png` — `swinoujscie` | Zimowy odpowiednik: identyczny układ budowli, śnieg na latarni, terminalu, beaconie i nabrzeżu, chłodniejsza woda, ciepłe światła i lampki | Python + SVG generowane z tych samych współrzędnych co letnie → CairoSVG → PNG | 2026-10-31 | Jak wyżej; sezonowa adaptacja własnej wersji letniej |
| `stacja-swinoujscie.png` — `stacja-swinoujscie` | Nowa ilustracja letnia A+: stacja przy S3, wydmy, sosny, zadaszone dystrybutory, budka kawy i gofrów, busy z bagażem, pusty znak | Python + ręczny rysunek SVG → CairoSVG → PNG; nowa grafika oparta na orientacyjnym układzie oryginału | 2026-10-31 | Grafika wykonana dla właściciela projektu na bazie jego materiałów; prawa do użycia w projekcie właściciela |
| `stacja-swinoujscie-zima.png` — `stacja-swinoujscie` | Zimowa stacja przy S3: ten sam kadr, śnieżne sosny i dachy, zaspy, ciepłe wnętrze budki i lampki | Python + SVG z tego samego układu co letnia grafika → CairoSVG → PNG | 2026-10-31 | Jak wyżej; sezonowa adaptacja własnej wersji letniej |
| `mikulov-zima.png` — `mikulov` | Zimowy Mikulov: istniejący zamek na skale, miasteczko, drzewo, droga, auto i pusty znak — bez przestawiania obiektów | NumPy/Pillow: sezonowe przemalowanie kolorów oryginalnego `mikulov.png`; ręczny wektorowy malunek śniegu, lodowych cieni i świateł (SVG/CairoSVG) | 2026-10-31 | Opracowanie zimowe na bazie letniej grafiki właściciela projektu; prawa do materiałów zgodnie z prawami właściciela do oryginału |

## Prompty / opis wykonania

- **`swinoujscie.png`:** „Wesoła ilustracja gry 2D w bliskim planie, port Świnoujście: wysoka ośmioboczna latarnia z cegły na lewo, prom i portowy terminal pośrodku, podniesiony biało-czerwony szlaban, biała Stawa Młyny z czterema skrzydłami po prawej, odległe dźwigi portowe, wydmy i morze. Gruby granatowy kontur #1d2f3b 14–16 px, duże płaskie plamy, transparentne niebo, bez napisów, flag i marek.”
- **`swinoujscie-zima.png`:** „Zachowaj dokładnie pozycje i rozmiary wszystkich budowli letniej grafiki portu; dodaj czytelny śnieg na dachach, latarni, nabrzeżu i nawigacyjnej Stawie Młyny, zimną wodę z przybrzeżnym lodem, żółte ciepłe okna i skromne lampki przy terminalu; bez padającego śniegu i bez tła nieba.”
- **`stacja-swinoujscie.png`:** „Wesoła stacja przy drodze S3 za Świnoujściem, bliski plan: duża czerwonawa wiata nad dwoma generycznymi dystrybutorami, pastelowa budka kawy i gofrów, dwa rodzinnie przeładowane busy bez marek i tablic, sosny, wydmy, pusta niebieska tablica. Masywne kontury #1d2f3b 14–16 px, przezroczyste niebo, 1620×900 RGBA.”
- **`stacja-swinoujscie-zima.png`:** „Ten sam obrys wiaty, budki, sosny, pojazdów i pobocza; dachy i gałęzie pokryte śniegiem, biały grunt, bursztynowe światło dystrybutorów i okna budki, delikatne świeckie lampki pod wiatą; nie dodawaj napisów, nieba ani opadów.”
- **`mikulov-zima.png`:** „Zachowaj 1:1 kadr oryginalnego `mikulov.png`, zamek na wysokiej skale, układ dachów, serpentynę drogi, biały samochód i niebieską pustą tablicę. Przemaluj zieleń na zaspy, biel i błękitne cienie, dołóż śnieg na historycznych dachach i skalnych tarasach, obsypane śniegiem korony drzew, ciepłe światła pojedynczych okien i dyskretne lampki.”

## Ustawienia i ograniczenia

- Wszystkie PNG są 1620 × 900, tryb RGBA, z rzeczywistą przezroczystością i pustym niebem.
- Dwa nowe zestawy lato/zima korzystają z identycznych współrzędnych głównych obiektów i tej samej linii gruntu.
- `mikulov-zima.png` zachowuje rozmieszczenie budowli i drogi w otrzymanym letnim `mikulov.png` (letniego Mikulova nie zastępowano, nie dodawano go ponownie do ZIP).
- Brak napisów w grafikach, flag, herbów, marek, emblematów, motywów politycznych i religijnych oraz zewnętrznych licencjonowanych zdjęć.
- Arkusz `docs/art/podglady/zima-137.png` zawiera 3 porównania lato–zima na tle `#bfe3f5` i wszystkie zimowe w natywnej wielkości wyświetlanej w grze: 180 × 100 px.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 138 — ewidencja grafik zimowych

**Data:** 2026-10-31  
**Projekt:** Cebulak Express — Kierunek Polska  
**Licencja / prawa:** grafiki narysowane i przetworzone na potrzeby projektu, na podstawie grafik letnich dostarczonych przez właściciela projektu; prawa do efektów prac przysługują właścicielowi projektu. Nie korzystano z fotografii, znaków towarowych, ikon ani fontów umieszczonych w plikach gry pochodzących od osób trzecich.  
**Technika:** autorski rysunek wektorowy wygenerowany programowo w Pythonie (SVG / CairoSVG), ręczne opracowanie geometrii i zimowych nakładek; Pillow / NumPy do kontrolowanej zmiany kolorystyki istniejącej grafiki; konsultacja układu z grafiką załączoną do zlecenia. Bez użycia gotowych stocków i zdjęć.  
**Format wszystkich pięciu plików:** 1620 × 900 px, PNG, RGBA, przezroczyste tło.

| Plik | Id | Co przedstawia | Narzędzie i autorstwo | Licencja |
|---|---|---|---|---|
| `prom-kanal.png` | `prom-kanal` | Duży bezimienny prom przez kanał La Manche, białe klify i mewy; nowa grafika letnia | Wektor SVG/Python (ChatGPT), własny rysunek na podstawie układu grafiki źródłowej projektu | Własność projektu |
| `prom-kanal-zima.png` | `prom-kanal` | Identyczna sylwetka promu, zimowe klify, śnieg i ciepłe okna | Wspólny szablon SVG/Python, zmiana pory roku (ChatGPT) | Własność projektu |
| `svinesund.png` | `svinesund` | Stary kamienny most łukowy nad fiordem, las iglasty, łoś, pusty znak | Wektor SVG/Python (ChatGPT), własny rysunek na podstawie układu grafiki źródłowej projektu | Własność projektu |
| `svinesund-zima.png` | `svinesund` | Identyczna scena historycznego mostu z zimową szatą i śniegiem na świerkach | Wspólny szablon SVG/Python, zmiana pory roku (ChatGPT) | Własność projektu |
| `granica-kolbaskowo-zima.png` | `granica-kolbaskowo` | Zimowa adaptacja oryginalnej ilustracji przejścia granicznego | Pillow/NumPy + nakładki SVG (ChatGPT), oryginał właściciela projektu | Własność projektu |

## Opisy poleceń ilustracyjnych (prompty)

**prom-kanal (lato i zima)**  
Ilustracja 2D w stylu kolorowej gry mobilnej: duży prom samochodowy bez marek i napisów na kanale La Manche, białe klify za rufą, cztery mewy, czytelna sylwetka, transparentne tło, wyrazisty granatowy kontur #1d2f3b, płaskie nasycone kolory, stały kadr 1620x900. Wersja zimowa: dokładnie ta sama geometria, śnieg na nadbudówkach i klifach, ciemne morze z lodem tylko przy brzegu, ciepłe okna, dyskretna girlanda świateł; bez nieba i opadów.

**svinesund (lato i zima)**  
Ilustracja 2D w stylu kolorowej gry mobilnej: historyczny kamienny most łukowy nad fiordem Svinesund, skaliste brzegi, świerkowy las, łosie (jeden łoś na lewym brzegu), pusty niebieski znak, transparentne tło, gruby granatowy kontur #1d2f3b, uproszczone bryły, stały kadr 1620x900. Wersja zimowa: dokładnie ta sama geometria, zimne ciemniejsze wody, śnieg na drzewach, skałach i balustradach, lampy ciepło świecą; bez nieba, napisów i flag; nie odwzorowywać nowego mostu.

**granica-kolbaskowo-zima**  
Z zachowanego oryginalnego pliku granica-kolbaskowo.png, bez zmiany kompozycji ani proporcji, zrobić wariant zimowy: przemapować zielone krzewy i żółte pola na białe i błękitne zaspy, śnieżne czapy na dachu zadaszenia i budkach, ciepłe okna i dyskretne świeckie światełka; zachować drogi, szlaban, znak oraz gruby granatowy kontur, przejrzyste tło, bez nieba, padającego śniegu i napisów.

## Kompozycja, integralność i uwagi

- Lato i zima promu oraz Svinesund są rysowane z **jednego szablonu sceny z identycznymi współrzędnymi** głównych obiektów. Zmieniają się kolory sezonowe, światła i pokrywy śnieżne.
- Dla Kołbaskowa użyto bezpośrednio oryginału: cała baza geometryczna oraz kanał alpha pozostały zachowane, a zima jest nałożona jako lokalna korekta barw i rysowane pokrywy śnieżne.
- Most w Svinesund jest **ogólną, ilustracyjną interpretacją historycznego łukowego mostu**, nie odwzorowaniem współczesnego mostu z 2005 r.
- Puste znaki nie zawierają symboli, nazw ani flag. Grafiki nie zawierają brandingu, napisów ani motywów religijnych.
- Arkusz porównawczy: `docs/art/podglady/zima-138.png`.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS — Zlecenie 139 (31.10.2026)

**Projekt:** Cebulak Express — Kierunek Polska  
**Zakres:** 5 grafik PNG RGBA 1620×900; 2 pary lato/zima promów i zimowa stacja przy A6.  
**Licencja / prawa:** grafiki przygotowane specjalnie dla projektu, na podstawie letnich plików dostarczonych przez właściciela; prawa do wykorzystania i modyfikacji w projekcie zachowuje właściciel projektu. Grafiki własne bez zewnętrznych znaków towarowych.  
**Narzędzie wykonawcze:** rysunek wektorowy SVG tworzony programowo (Python / CairoSVG) i kompozycja PNG (Pillow); stacja — edycja oryginalnego PNG i wektorowe nakładki śniegu. Źródłowe grafiki promów służyły do ustalenia kadru i skali; nowe promy są narysowane od nowa.  
**Podgląd:** `docs/art/podglady/zima-139.png`.  

| Plik | ID i opis | Narzędzie | Data | Prompt / wytyczne | Licencja / autor / uwagi |
|---|---|---|---|---|---|
| `prom-irlandia-francja.png` | prom-irlandia-francja — letni prom Rosslare–Cherbourg na otwartym morzu, zielone klify, mała latarnia, mewy | Python, SVG, CairoSVG | 2026-10-31 | „Nowa letnia ilustracja A+; kadr oryginału, centralny prom, kontur #1d2f3b, płaskie nasycone kolory, bez nieba, napisów i oznaczeń armatora; PNG przezroczyste.” | Własna grafika na podstawie oryginalnej grafiki projektu; prawa właściciela projektu. |
| `prom-irlandia-francja-zima.png` | prom-irlandia-francja — identyczny prom i kadr zimą, śnieg, mróz przy brzegu, ciepłe okna | Python, SVG, CairoSVG | 2026-10-31 | „Ten sam układ i geometria statku; śnieg na górnych pokładach, dachu latarni, domach i drzewach, ciemna niezamarznięta woda, przy brzegu kra; okna #ffd36b; bez nieba i opadów.” | Własna zimowa wersja letniej grafiki projektu; prawa właściciela projektu. |
| `prom-zatoka-finska.png` | prom-zatoka-finska — letni prom Helsinki–Tallinn, wieże historycznego Tallinna, portowe dźwigi, mewy | Python, SVG, CairoSVG | 2026-10-31 | „Nowa letnia ilustracja A+ w układzie starego promu; historyczna sylwetka miasta w tle i nabrzeże, grube granatowe kontury, bez współczesnych chronionych budynków, marek, flag, napisów i nieba.” | Własna grafika na podstawie grafiki projektu; prawa właściciela projektu. |
| `prom-zatoka-finska-zima.png` | prom-zatoka-finska — identyczna kompozycja w grudniu; ośnieżone spiczaste dachy, śnieg na promie i porcie | Python, SVG, CairoSVG | 2026-10-31 | „Geometria i skala promu oraz panoramy bez zmian; zimny Bałtyk bez pełnego zamarznięcia, przy nabrzeżu kra, śnieg #f4f8fb, cień #c9dbe8, świecące okna.” | Własna zimowa wersja letniej grafiki projektu; prawa właściciela projektu. |
| `stacja-kolbaskowo-zima.png` | stacja-kolbaskowo — zimowa stacja przy A6, identyczny układ wiaty, dwóch aut, kiosku, trzech turbin i drzew | Python, Pillow, CairoSVG (edycja oryginalnego PNG) | 2026-10-31 | „Zachowaj każdy obiekt i kadr oryginału; zazielenienia zastąp zimnymi szaroniebieskimi, dodaj widoczne białe zaspy, śnieg na wiacie, budynku, drzewach i autach; ciepłe światło kiosku; bez nowych napisów i logo.” | Edycja obrazu dostarczonego przez właściciela projektu; prawa właściciela projektu. |

**Kontrola:** każdy plik to PNG RGBA 1620×900. Grafiki promów mają dokładnie wspólną geometrię głównych brył lato/zima (kolory i śnieg to odrębne warstwy). Stacja jest zimową modyfikacją oryginału, bez przemieszczania budynków, aut lub turbin. Kontury głównych obiektów zachowują grubość odpowiednią do zmniejszenia 480×267 lub 180×100 px. Dookoła obiektów nie ma narysowanego nieba ani padającego śniegu.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# Zlecenie 140 — metryka ilustracji

Data: **2026-10-31**. Format: **PNG, RGBA 1620 × 900, sRGB**. Generator / narzędzie produkcyjne: **ChatGPT + Python (Pillow, NumPy, OpenCV, CairoSVG), ręczna kompozycja wektorowa i retusz pikselowy**. Grafiki służą wyłącznie projektowi gry.

| Plik / ID | Co przedstawia | Narzędzie, przekształcenie i prompt produkcyjny | Licencja / prawa |
|---|---|---|---|
| `prom-fehmarn.png` | Prom przez Fehmarn Bełt, dwa wiatraki, mewy — wersja letnia A+ | ChatGPT + autorska ilustracja SVG renderowana w CairoSVG i Pillow. Prompt: „Przerysuj oryginalny prom w tym samym kadrze z wyraźnym granatowym obrysem, ciepłym kolorem burty, portem, turbinami wiatrowymi i mewami; bez marki, flag, nieba, tekstu; alpha.” | Grafika wygenerowana/opracowana dla projektu na podstawie dostarczonego letniego pliku; prawa do oryginału po stronie właściciela projektu. |
| `prom-fehmarn-zima.png` | Ten sam prom i nabrzeża, zimowe pokłady, śnieg, oświetlenie | ChatGPT + identyczna wektorowa kompozycja SVG z zimową paletą i dodatkowymi czapami śniegu, cienkim lodem, lampkami i dymem. Prompt: „Zachowaj geometrię A+ 1:1, zimowy prom w ciemniejszej wodzie, śnieg na pokładzie, przytulne okna, przejrzyste tło.” | Jak wyżej. |
| `rosslare-zima.png` | Irlandzki port, prom, przystań i miasteczko za wodą | ChatGPT + Pillow/NumPy/OpenCV (odbarwienie zieleni / korekcja morza) oraz rysunek SVG (dachy, lód, ciepłe okna, lampki). Prompt: „Zachowaj pikselowe pozycje oryginalnego promu i portu, zamień zielone pagórki na śnieżne, pokryj dachy śniegiem, przyciemnij morze, zaznacz lód przy brzegu.” | Grafika generowana dla projektu na podstawie oryginalnej letniej grafiki właściciela projektu. |
| `la-jonquera-zima.png` | Graniczne przejście drogowe na tle wiaduktu i kamiennych zabudowań | ChatGPT + Pillow/NumPy/OpenCV i ręcznie narysowana warstwa SVG. Prompt: „Ta sama panorama z identyczną drogą, mostem, domkami i pustą tablicą; biały śnieg na dachach, górach i drzewie; grudniowe światło; zimowe pobocze, bez napisów.” | Jak wyżej. |
| `tarvisio-zima.png` | Alpejskie przejście drogowe, domy, tunel, las i góry | ChatGPT + Pillow/NumPy/OpenCV i ręcznie narysowana warstwa SVG. Prompt: „Zachowaj alpejskie domki, tunel, drogę, puste oznakowanie; ośnież szczyty, gałęzie świerków i dachy, dodaj ciepłe okna i zaspy, bez nieba.” | Jak wyżej. |

## Uwagi kontrolne

- Pięć plików wynikowych jest 1620 × 900 px RGBA, z kanałem alfa i bez warstwy nieba / padającego śniegu.
- Dla `prom-fehmarn` letnia i zimowa grafika pochodzą z tej samej geometrii SVG; dla pozostałych punktów zimę zbudowano na oryginalnym rastrze bez przemieszczania konturów budynków i głównych obiektów.
- Sztuczne elementy kompozycji (dachy, mosty, przejścia) nie powielają zdjęć ani nowoczesnej architektury chronionej; ilustracje pozostają stylizowane.
- Brak logo, marek, nazw, numerów rejestracyjnych, flag i scen religijnych w obrazach.
- Akceptacja wizualna wymaga dodatkowo sprawdzenia w rzeczywistej scenie gry po integracji.

> **Koordynator (31.10, runda 9):** przyjęte. Nowe letnie grafiki punktów przy drodze zastępują stare płaskie: gruby kontur i więcej detalu, choć prostsze niż panoramy A+ z rundy 8 — ewentualne dopracowanie później. Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).

# ASSETS-141 — zimowe punkty trasy

**Zlecenie:** 141 — zima. **Data opracowania:** 31.10.2026.
**Technika:** edycja oryginalnych PNG w środowisku ChatGPT: skrypt Python, Pillow, NumPy i OpenCV; autorskie nakładki ilustracyjne oraz punktowy retusz. Nie wykorzystano zewnętrznych zdjęć ani grafik.
**Wynik:** 5 plików PNG RGBA 1620 × 900 px z przezroczystym tłem, przeznaczonych do podmiany w grze.

## Rejestr grafik

| Plik | Id | Co przedstawia | Narzędzie | Data | Licencja |
|---|---|---|---|---|---|
| `port-helsinki-zima.png` | `port-helsinki` | Port w Helsinkach — nabrzeże, żuraw i prom | ChatGPT + Python (Pillow, NumPy, OpenCV), retusz cyfrowy załączonego PNG | 2026-10-31 | Grafika na podstawie letniego pliku projektu; prawa właściciela projektu |
| `granica-ee-lv-zima.png` | `granica-ee-lv` | Granica Estonii i Łotwy — domek przy drodze | ChatGPT + Python (Pillow, NumPy, OpenCV), retusz cyfrowy załączonego PNG | 2026-10-31 | Grafika na podstawie letniego pliku projektu; prawa właściciela projektu |
| `granica-lv-lt-zima.png` | `granica-lv-lt` | Granica Łotwy i Litwy — drewniana stodoła i bocianie gniazdo | ChatGPT + Python (Pillow, NumPy, OpenCV), retusz cyfrowy załączonego PNG | 2026-10-31 | Grafika na podstawie letniego pliku projektu; prawa właściciela projektu |
| `granica-budzisko-zima.png` | `granica-budzisko` | Granica w Budzisku — szlaban, budka i dwie sylwetki bocianów | ChatGPT + Python (Pillow, NumPy, OpenCV), retusz cyfrowy załączonego PNG | 2026-10-31 | Grafika na podstawie letniego pliku projektu; prawa właściciela projektu |
| `stacja-budzisko-zima.png` | `stacja-budzisko` | Stacja za granicą w Budzisku — dystrybutory, budka i samochody | ChatGPT + Python (Pillow, NumPy, OpenCV), retusz cyfrowy załączonego PNG | 2026-10-31 | Grafika na podstawie letniego pliku projektu; prawa właściciela projektu |

## Instrukcje graficzne (prompty i zakres edycji)

**Wspólna instrukcja dla wszystkich pozycji:** „Na podstawie otrzymanej letniej ilustracji przygotuj zimową wersję, zachowując ten sam kadr, skalę i rozmieszczenie obiektów. Zachowaj duży, ciemnogranatowy kontur #1d2f3b i płaską rysunkową stylistykę. Zieleń zamień na zaśnieżony, błękitno-biały pejzaż, dołóż białe #f4f8fb czapy śniegu z błękitnym cieniem #c9dbe8 na dachach i konarach oraz ciepłe światło #ffd36b w oknach; niebo i opady pozostaw dla silnika gry, więc nie dodawaj tła. Woda pozostaje otwarta, lód tylko przy brzegu. Nie dodawaj napisów, logo, flag, herbów ani motywów religijnych. Wynik: PNG RGBA 1620×900”.**

### `port-helsinki-zima.png`
- **Id:** `port-helsinki`
- **Przedstawia:** Port w Helsinkach — nabrzeże, żuraw i prom
- **Plan:** daleki
- **Narzędzie:** ChatGPT (opracowanie edycji) oraz Python/Pillow/NumPy/OpenCV (retusz oryginału i ręczne, wektorowe nakładki śniegu).
- **Data:** 31.10.2026
- **Prompt szczegółowy:** Zachowaj panoramę miasta, nabrzeże, dźwig i prom; pokryj historyczne dachy, kopuły i skały śniegiem, pogłęb kolor morza, dodaj lód tylko przy brzegu i ciepłe światła.
- **Licencja i pochodzenie:** Grafika opracowana na podstawie letniej grafiki projektu przekazanej przez właściciela; prawa do materiału bazowego i wykorzystania w projekcie należą do właściciela projektu.

### `granica-ee-lv-zima.png`
- **Id:** `granica-ee-lv`
- **Przedstawia:** Granica Estonii i Łotwy — domek przy drodze
- **Plan:** bliski
- **Narzędzie:** ChatGPT (opracowanie edycji) oraz Python/Pillow/NumPy/OpenCV (retusz oryginału i ręczne, wektorowe nakładki śniegu).
- **Data:** 31.10.2026
- **Prompt szczegółowy:** Zachowaj auto, drogę, dom, bory i jezioro; zamień trawę na śnieg, pokryj dach i sosnowe gałęzie czapami śniegu, podświetl okna, pozostaw jezioro otwarte.
- **Licencja i pochodzenie:** Grafika opracowana na podstawie letniej grafiki projektu przekazanej przez właściciela; prawa do materiału bazowego i wykorzystania w projekcie należą do właściciela projektu.

### `granica-lv-lt-zima.png`
- **Id:** `granica-lv-lt`
- **Przedstawia:** Granica Łotwy i Litwy — drewniana stodoła i bocianie gniazdo
- **Plan:** bliski
- **Narzędzie:** ChatGPT (opracowanie edycji) oraz Python/Pillow/NumPy/OpenCV (retusz oryginału i ręczne, wektorowe nakładki śniegu).
- **Data:** 31.10.2026
- **Prompt szczegółowy:** Zachowaj drogę, samochód, brzozy, drewniany budynek, bociana, gniazdo i belę siana; pokryj krajobraz śniegiem. Wyjątkowo przenieś anonimową niebieską tablicę lekko w lewo tak, by mieściła się w całości.
- **Licencja i pochodzenie:** Grafika opracowana na podstawie letniej grafiki projektu przekazanej przez właściciela; prawa do materiału bazowego i wykorzystania w projekcie należą do właściciela projektu.

### `granica-budzisko-zima.png`
- **Id:** `granica-budzisko`
- **Przedstawia:** Granica w Budzisku — szlaban, budka i dwie sylwetki bocianów
- **Plan:** bliski
- **Narzędzie:** ChatGPT (opracowanie edycji) oraz Python/Pillow/NumPy/OpenCV (retusz oryginału i ręczne, wektorowe nakładki śniegu).
- **Data:** 31.10.2026
- **Prompt szczegółowy:** Zachowaj szlaban, budkę, pustą niebieską tablicę, jezioro, dom, drogę i bociany; pokryj dachy, łąki i drzewa śniegiem, rozświetl okna, dodaj lód tylko na obrzeżu jeziora.
- **Licencja i pochodzenie:** Grafika opracowana na podstawie letniej grafiki projektu przekazanej przez właściciela; prawa do materiału bazowego i wykorzystania w projekcie należą do właściciela projektu.

### `stacja-budzisko-zima.png`
- **Id:** `stacja-budzisko`
- **Przedstawia:** Stacja za granicą w Budzisku — dystrybutory, budka i samochody
- **Plan:** bliski
- **Narzędzie:** ChatGPT (opracowanie edycji) oraz Python/Pillow/NumPy/OpenCV (retusz oryginału i ręczne, wektorowe nakładki śniegu).
- **Data:** 31.10.2026
- **Prompt szczegółowy:** Zachowaj konstrukcję zadaszenia, pompy, samochody, kiosk i stolik; dodaj czytelne szerokie czapy śniegu na dachach i parasolu, zaspy, zaśnieżone świerki oraz ciepłe światełka na stoisku.
- **Licencja i pochodzenie:** Grafika opracowana na podstawie letniej grafiki projektu przekazanej przez właściciela; prawa do materiału bazowego i wykorzystania w projekcie należą do właściciela projektu.

## Kontrola jakości

- Bez tekstu i oznaczeń marek na dodanych elementach; nie dodawano flag ani symboli religijnych.
- Zachowano oryginalne rozmiary, przezroczystość, przebieg terenu i kluczowe budowle.
- Dla `granica-lv-lt` naprawiono kadr pustej tablicy przez umieszczenie całej tablicy nieco bardziej na lewo.
- Nie dodano nieba ani padającego śniegu; zima jest pokryciem terenu i budynków.
- Arkusz porównawczy znajduje się w `docs/art/podglady/zima-141.png`.
- Grafiki wyjściowe z ZIP-a bazowego pozostają bez zmian i nie są ponownie dystrybuowane w tej paczce.

> **Koordynator (31.10, runda 9):** przyjęte; w granica-lv-lt tablica nadal ucięta prawą krawędzią (drobne). Kompozycja zgodna z wersją letnią (IoU masek 0,97–1,00); PNG skwantyzowane (Pillow FASTOCTREE + oxipng).
