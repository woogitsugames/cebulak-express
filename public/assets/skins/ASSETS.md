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
