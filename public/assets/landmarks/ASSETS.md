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
