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
