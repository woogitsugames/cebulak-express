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
