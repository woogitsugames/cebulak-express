# Skórki — pochodzenie grafik

Trzy oryginalne skórki wykonane dla gry Cebulak Express w ChatGPT. Ilustracje proceduralne, własne kształty i ręcznie dobrane palety, cieniowanie, światło z lewej góry. Brak obcych logotypów, marek i chronionych postaci.

| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `pan-cebulek/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pan-cebulek/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pan-cebulek/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pan-cebulek/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pan-cebulek/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pan-cebulek/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `pani-cebulka/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pani-cebulka/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pani-cebulka/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pani-cebulka/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pani-cebulka/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pani-cebulka/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `bus-kurierski/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `bus-kurierski/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `bus-kurierski/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `bus-kurierski/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `bus-kurierski/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `bus-kurierski/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `preview.png` | Kompozycja własnych sprite'ów w ChatGPT | Jak wyżej | Wszystkie pliki na szachownicy |

## Geometria i integracja

- `body.png`, `flame-*.png`, `luggage-1..4.png`, `crash.png`: 288×168 px, anchor (144,106).
- `wheel.png`: 36×36 px, anchor (18,18), środki kół (80,138) i (219,138) we współrzędnych pełnego płótna.
- `portrait.png`: 384×384 px z barwnym tłem i przezroczystymi narożnikami.
- Rysunek `body` w Canvas: `ctx.drawImage(img, -144/3, -106/3, 288/3, 168/3)` po `translate(PLAYER.x, game.y)`; koła i pozostałe warstwy analogicznie w skali 1/3.
- Hitbox z `src/core/config.ts` 40×20 logicznych pozostaje wspólny dla każdej skórki. Nakładki bagażu **zastępują** się nawzajem i nie mogą być dodawane jedna na drugą.
- W PR nie ma zmian w `src/core`, `src/render`, ani innych plikach koordynatora. Bus ma anonimowe biało-czerwone etykiety zamiast napisu na paczkach, by nie osadzać tekstu w grafikach.

## Auta do odblokowania — zlecenie 73

Początkowe trzy skórki wykonane dla gry Cebulak Express w ChatGPT. Ilustracje proceduralne, własne kształty i ręcznie dobrane palety, cieniowanie, światło z lewej góry. Brak obcych logotypów, marek i chronionych postaci.

| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `pan-cebulek/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pan-cebulek/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pan-cebulek/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pan-cebulek/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pan-cebulek/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pan-cebulek/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `pani-cebulka/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pani-cebulka/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pani-cebulka/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pani-cebulka/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pani-cebulka/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pani-cebulka/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `bus-kurierski/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `bus-kurierski/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `bus-kurierski/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `bus-kurierski/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `bus-kurierski/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `bus-kurierski/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `preview.png` | Kompozycja własnych sprite'ów w ChatGPT | Jak wyżej | Wszystkie pliki na szachownicy |

## Geometria i integracja

- `body.png`, `flame-*.png`, `luggage-1..4.png`, `crash.png`: 288×168 px, anchor (144,106).
- `wheel.png`: 36×36 px, anchor (18,18), środki kół (80,138) i (219,138) we współrzędnych pełnego płótna.
- `portrait.png`: 384×384 px z barwnym tłem i przezroczystymi narożnikami.
- Rysunek `body` w Canvas: `ctx.drawImage(img, -144/3, -106/3, 288/3, 168/3)` po `translate(PLAYER.x, game.y)`; koła i pozostałe warstwy analogicznie w skali 1/3.
- Hitbox z `src/core/config.ts` 40×20 logicznych pozostaje wspólny dla każdej skórki. Nakładki bagażu **zastępują** się nawzajem i nie mogą być dodawane jedna na drugą.
- W PR nie ma zmian w `src/core`, `src/render`, ani innych plikach koordynatora. Bus ma anonimowe biało-czerwone etykiety zamiast napisu na paczkach, by nie osadzać tekstu w grafikach.

## Zlecenie 73 — cztery nowe auta (30.10.2026)

Koncepcja kompozycji i stylu: natywne generowanie ilustracji w ChatGPT Images; na tej podstawie narysowane od podstaw, dopracowane ręcznie poprzez wektorowe ścieżki SVG i przerasteryzowane do PNG RGBA @3x (Python + CairoSVG + Pillow). Brak grafik z internetu, znaków towarowych i nazw modeli. W samym podglądzie użyto rasterowanej czcionki Inter (SIL OFL), bez dołączania plików fontu do repo. Wszystkie zasoby przygotowano do używania w projekcie na warunkach właściwych dla materiałów generowanych za pomocą OpenAI; brak zewnętrznych zależności licencyjnych. Dokumentacja z opisem promptu znajduje się w `ASSETS.md` każdego nowego auta.

| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `mala-japonka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | ChatGPT Images (koncepcja), ChatGPT + własne ścieżki SVG, CairoSVG, Pillow | Utworzone dla projektu, brak cudzych materiałów | Koralowa, zaokrąglona trzydrzwiówka; osobne koła; 500 km |
| `kompakt-szwagra/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Jak wyżej | Jak wyżej | Niebieski 5-drzwiowy hatchback, kanciasty tył; 1 500 km |
| `dieselek-dziadka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Jak wyżej | Jak wyżej | Srebrne kombi z relingami i hakiem; 3 000 km |
| `pradziak-z-oslo/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Jak wyżej | Jak wyżej | Perłowy bezgrillowy liftback; 6 000 km |
| `*/skin.json`, `*/ASSETS.md` (cztery foldery powyżej) | ChatGPT, własna dokumentacja i geometria | Materiał projektowy | Manifesty skórki @3x, kotwice i provenance |
| `docs/art/podglady/auta-73.png` | Kompozycja rzeczywistych warstw PNG w Pillow | Utworzony dla projektu | 4 auta × 5 stanów, droga w stylistyce gry |
| `docs/art/podglady/auta-73-koncepcja.png` | Natywne ChatGPT Images, 30.10.2026 | Wygenerowany dla projektu | Wstępny arkusz koncepcyjny, nie jest obrazem runtime |

Nowe skórki mają wspólny anchor (144,106), koła 36×36 @3x, hitbox 40×20 logicznych oraz indywidualne pozycje osi. `crash.png` zawiera własne koła, bo `drawHeroSprite` nie domalowuje warstwy `wheel` w stanie `over`. `portrait.png` ma rozmiar 384×384. Skórki te nie są jeszcze dodane do `HERO_SKINS`, ponieważ integrację nowego katalogu samochodów wykonuje koordynator w zleceniu 72.

## Auta do odblokowania — zlecenie 74

Trzy oryginalne skórki wykonane dla gry Cebulak Express w ChatGPT. Ilustracje proceduralne, własne kształty i ręcznie dobrane palety, cieniowanie, światło z lewej góry. Brak obcych logotypów, marek i chronionych postaci.

| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `pan-cebulek/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pan-cebulek/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pan-cebulek/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pan-cebulek/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pan-cebulek/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pan-cebulek/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `pani-cebulka/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `pani-cebulka/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `pani-cebulka/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `pani-cebulka/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `pani-cebulka/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `pani-cebulka/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `bus-kurierski/body.png`, `wheel.png` | Własna ilustracja proceduralna ChatGPT | Zasób stworzony dla projektu; brak zależnych licencji | Oddzielne koła |
| `bus-kurierski/flame-1.png`, `flame-2.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Klatki silnika |
| `bus-kurierski/luggage-1.png` … `luggage-4.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Pełne, niezależne nakładki 1–4 |
| `bus-kurierski/crash.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | Komiczna stłuczka bez krwi |
| `bus-kurierski/portrait.png` | Własna ilustracja proceduralna ChatGPT | Jak wyżej | 384×384 z kolorowym tłem karty |
| `bus-kurierski/skin.json` | Dane projektowe ChatGPT | Materiał projektowy | Geometria @3x |
| `preview.png` | Kompozycja własnych sprite'ów w ChatGPT | Jak wyżej | Wszystkie pliki na szachownicy |

## Geometria i integracja

- `body.png`, `flame-*.png`, `luggage-1..4.png`, `crash.png`: 288×168 px, anchor (144,106).
- `wheel.png`: 36×36 px, anchor (18,18), środki kół (80,138) i (219,138) we współrzędnych pełnego płótna.
- `portrait.png`: 384×384 px z barwnym tłem i przezroczystymi narożnikami.
- Rysunek `body` w Canvas: `ctx.drawImage(img, -144/3, -106/3, 288/3, 168/3)` po `translate(PLAYER.x, game.y)`; koła i pozostałe warstwy analogicznie w skali 1/3.
- Hitbox z `src/core/config.ts` 40×20 logicznych pozostaje wspólny dla każdej skórki. Nakładki bagażu **zastępują** się nawzajem i nie mogą być dodawane jedna na drugą.
- W PR nie ma zmian w `src/core`, `src/render`, ani innych plikach koordynatora. Bus ma anonimowe biało-czerwone etykiety zamiast napisu na paczkach, by nie osadzać tekstu w grafikach.


## Zlecenie 74 — 30 października 2026

- Koncepcja sylwetek wygenerowana natywnym **ChatGPT GPT Image** (prompt: "Trzy rozpoznawalne, bezmarkowe polonijne auta z profilu, jasna furgonetka z fikcyjnym napisem Transport PL-BE-NL, kamper z markizą i rowerami, granatowe eleganckie kombi; płaska ilustracja 2D, grube granatowe kontury, pastelowy krajobraz, pięć stanów gry, bez logotypów"). Referencja: `docs/art/podglady/auta-74-koncepcja.png`.
- Finalne PNG to ręcznie dopracowane, autorskie przerysowanie kształtów i warstw przy pomocy Python, SVG, CairoSVG i Pillow; **nie są** kadrami zdjęć ani renderów internetowych. Światło: lewa góra. Licencja: materiał wykonany dla projektu, bez zasobów zewnętrznych. Kody modelu i marek: brak.

| Plik | Źródło / narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `furgonetka-pl/body.png`, `wheel.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karoseria i oddzielne koła |
| `furgonetka-pl/flame-1.png`, `flame-2.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Dwie klatki lotu |
| `furgonetka-pl/luggage-1.png` ... `luggage-4.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Cztery pełne, niezależne poziomy |
| `furgonetka-pl/crash.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Rozbita karoseria z kołami |
| `furgonetka-pl/portrait.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karta 384x384 px |
| `furgonetka-pl/skin.json` | Dane projektu ChatGPT | Materiał dla projektu, bez licencji zależnych | Manifest i odblokowanie w km |
| `furgonetka-pl/ASSETS.md` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Opis pochodzenia |
| `kamper-wakacje/body.png`, `wheel.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karoseria i oddzielne koła |
| `kamper-wakacje/flame-1.png`, `flame-2.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Dwie klatki lotu |
| `kamper-wakacje/luggage-1.png` ... `luggage-4.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Cztery pełne, niezależne poziomy |
| `kamper-wakacje/crash.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Rozbita karoseria z kołami |
| `kamper-wakacje/portrait.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karta 384x384 px |
| `kamper-wakacje/skin.json` | Dane projektu ChatGPT | Materiał dla projektu, bez licencji zależnych | Manifest i odblokowanie w km |
| `kamper-wakacje/ASSETS.md` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Opis pochodzenia |
| `kombi-prezesa/body.png`, `wheel.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karoseria i oddzielne koła |
| `kombi-prezesa/flame-1.png`, `flame-2.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Dwie klatki lotu |
| `kombi-prezesa/luggage-1.png` ... `luggage-4.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Cztery pełne, niezależne poziomy |
| `kombi-prezesa/crash.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Rozbita karoseria z kołami |
| `kombi-prezesa/portrait.png` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Karta 384x384 px |
| `kombi-prezesa/skin.json` | Dane projektu ChatGPT | Materiał dla projektu, bez licencji zależnych | Manifest i odblokowanie w km |
| `kombi-prezesa/ASSETS.md` | GPT Image (koncepcja) + ręczne SVG, Python/CairoSVG | Materiał dla projektu, bez licencji zależnych | Opis pochodzenia |
| `docs/art/podglady/auta-74.png` | Kompozycja autorskich spriteów, Pillow | Jak wyżej | Podgląd 3 x 5 stanów na drodze |
| `docs/art/podglady/auta-74-koncepcja.png` | GPT Image w ChatGPT | Obraz wygenerowany na potrzeby projektu | Materiał referencyjny, nie sprite |

### Uwagi o integracji 74

- Każdy zestaw ma 10 PNG + `skin.json` (@3x, `scale: 3`, wspólna kotwica (144,106), koła (80,138) i (219,138)).
- Koordynator dodaje te trzy identyfikatory do `HERO_SKINS` oraz odpowiednich etykiet w `src/ui/garage.ts` (obecny `main` jeszcze ich nie zawiera). Wartości `unlockKm`: 10000, 20000, 40000. Nie zmieniono plików koordynatora.
- Oryginalne etykiety w garażu i logika odblokowań nie są częścią tego PR. Zobacz `tests/skins-new-2.test.ts`.

## Poprawki sylwetek — zlecenie 83
# Sekcja do dopisania w public/assets/skins/ASSETS.md po scaleniu PR #77

## Zlecenie 83 — poprawione sylwetki (30.10.2026)

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `mala-japonka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Koncepcja ChatGPT Images; własne ścieżki SVG, Python/CairoSVG/Pillow, ręczne poprawki | Utworzone dla projektu na warunkach korzystania z materiałów OpenAI, bez cudzych elementów | Mała, czerwona, bąbelkowa miejska trzydrzwiówka; osie 90/217, y=138 |
| `dieselek-dziadka/body.png`, `wheel.png`, `crash.png`, `flame-1.png`, `flame-2.png`, `luggage-1.png`–`luggage-4.png`, `portrait.png` | Jak wyżej | Jak wyżej | Srebrne, długie niskie kombi, relingi, hak, patyna; osie 77/229, y=138 |
| `mala-japonka/skin.json`, `dieselek-dziadka/skin.json`, `*/ASSETS.md` (oba auta) | ChatGPT, własne geometrie i dokumentacja | Materiał dla projektu | Zachowany format 288×168 @3x, anchor (144,106), hitbox 40×20, portrait 384×384 |
| `docs/art/podglady/auta-83.png` | Kompozycja rzeczywistych warstw w Pillow | Jak wyżej | 2 auta × 5 stanów |
| `docs/art/podglady/auta-83-generator.py` | Autorski skrypt ChatGPT / Python, SVG, CairoSVG, Pillow | Materiał dla projektu | Reprodukowalny generator warstw i podglądu |
| `docs/art/podglady/auta-83-koncepcja.png` | ChatGPT Images, 30.10.2026 | Wygenerowany dla projektu | Referencja stylistyczna; NIE jest sprite'em runtime |

**Prompt:** „Wymyśl dwa bezmarkowe auta dla polonijnej gry 2D: krótką koralową bąbelkową trzydrzwiówkę i długie, niskie, zmęczone srebrne kombi z początku lat 2000 z relingami i hakiem. Jazda w prawo, perspektywa boczna, ciepłe kolory, gruby granatowy kontur, kierowca, walizki na dachu, odrębne warstwy postaci, bez logotypów i tekstu w grafice”. Grafiki końcowe zostały przerysowane w autorskie kształty SVG i skorygowane ręcznie.

**Geometria:** `wheel.png` jest współdzielony między kołami danej skórki; dlatego zachowano indywidualne ślady zużycia na karoserii Dieselka, bez deklarowania innej felgi, której obecny renderer nie obsługuje. Warstwy `luggage-1..4.png` się wykluczają. `crash.png` ma koła, gdyż renderer nie rysuje ich osobno w fazie `over`.
