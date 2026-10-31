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

> **Koordynator:** odrzucono nykoping (styl niezgodny z A+); zostaje poprzednia wersja, do ponowienia.

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

> **Koordynator:** odrzucono cesky-tesin (styl niezgodny z A+); zostaje poprzednia wersja, do ponowienia.

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
