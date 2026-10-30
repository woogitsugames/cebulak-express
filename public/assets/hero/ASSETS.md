# Bohater — przeładowane kombi

Zlecenie 01, gra **Cebulak Express — Kierunek Polska**.

## Pochodzenie i licencja

Wszystkie obrazy to **autorskie ilustracje wektorowe napisane ręcznie w SVG i zrasteryzowane** przy użyciu skryptu `generate.py` (Python, CairoSVG i Pillow). Koncepcja kolorystyczna była porównywana z makietami w repozytorium oraz referencyjną ilustracją wygenerowaną przez GPT Image; **żaden fragment obrazu wygenerowanego przez AI ani fragment makiet nie jest wklejony do sprite'ów**. Kształty karoserii, detale, bagaże, twarze, nadkola i animacje opracowano od podstaw w generatorze. Brak zależności od marek, symboli państwowych, zasobów stockowych i czcionek w samych sprite'ach.

**Licencja wszystkich nowych zasobów graficznych i skryptu:** CC0-1.0 (przekazane do swobodnego wykorzystania, także komercyjnego). Nie są wymagane atrybucje ani dodatkowe licencje firm trzecich. `preview.png` zawiera tylko obrazy z tego zestawu i napisy systemową czcionką DejaVu Sans używaną do podglądu, nie do gry.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `kombi-body.png` | Ręcznie zdefiniowane ścieżki SVG → CairoSVG / Pillow | CC0-1.0 | Generyczna karoseria i neutralny kierowca, bez kół |
| `kombi-wheel.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Pojedyncze koło 36×36 px, obracane w renderze |
| `kombi-flame-1.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Napęd z wydechu, klatka 1 |
| `kombi-flame-2.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Napęd z wydechu, klatka 2 |
| `luggage-1.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Minimalny stos; torba, walizka, bagaż w kratkę |
| `luggage-2.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Dodana walizka i czerwony bagaż |
| `luggage-3.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Dodane paczka, mata/torba i piłka |
| `luggage-4.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Absurdalne przeładowanie z linami i kolejnymi bagażami |
| `kombi-crash.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Kompletny sprite kolizji, koła wrysowane; żadnych rannych |
| `driver-react-1.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Radość; podmienia zawartość przedniego okna |
| `driver-react-2.png` | Własna grafika wektorowa → CairoSVG / Pillow | CC0-1.0 | Przestrach; podmienia zawartość przedniego okna |
| `preview.png` | Automatyczny montaż Pillow | CC0-1.0 | Szachownica, wszystkie warstwy i próba 1× na niebieskim tle |
| `hero.json` | Własne metadane JSON | CC0-1.0 | Kotwice wszystkich zasobów, koła i kolejność warstw |
| `generate.py` | Własny generator | CC0-1.0 | Źródło odtwarzające PNG i preview; nie należy do kodu runtime |

## Format i konwencje

- Podstawowy canvas: **288×168 px fizycznych**, czyli **96×56 px logicznych @3x**; większość 288×168 to przezroczysty zapas.
- Faktyczny samochód ma około **72×31 px logicznych**, a z maksymalnym bagażem około **72×49 px**. Czytelność przy małym rozmiarze pokazano w dolnym wierszu `preview.png`.
- Wyjątek: `kombi-wheel.png` **36×36 px**, punkt odniesienia `(18,18)`.
- Wspólny punkt odniesienia warstw (środek hitboxu): **`(144, 90)` px fizycznych**. Nie jest to środek prostokąta pliku, ponieważ przewidziano zapas od dołu i z tyłu na płomień.
- Środki kół w układzie sprite'a: **`(91, 133)`** i **`(207, 133)`** px. Przesunięcia od kotwicy: **`(-53,+43)`** i **`(+63,+43)`** px fizycznych.
- Pliki PNG mają kanał alfa, przestrzeń sRGB (chunk `sRGB` i `gAMA`) i bezstratne skompresowanie PNG. Każdy sprite jest wyraźnie poniżej 300 kB.
- Grafiki są przygotowane dla jazdy **w prawo**; żadna warstwa nie zawiera tekstów ani oznaczeń marek.

## Integracja — wyłącznie dla koordynatora

Nie zmieniono `src/render/renderer.ts` ani `src/core/`. Poniższa integracja opisuje, jak zastąpić `drawPlayer` bez modyfikowania fizyki:

1. Załadować asynchronicznie obrazy z `/assets/hero/` i metadane `hero.json` przed pierwszym rysowaniem postaci. Na czas ładowania zachować obecny fallback `drawPlayer`.
2. `ctx.translate(PLAYER.x, game.y); ctx.rotate(tilt)`. Kotwica jest środkiem istniejącego hitboxu 40×20 logicznych.
3. Wewnątrz przekształcenia zastosować `ctx.translate(-144 / 3, -90 / 3)` — od tego momentu `(0,0)` jest lewym górnym rogiem sprite'a.
4. Przy podskoku narysować jedną z `kombi-flame-{1,2}.png` w wymiarach **96×56** logicznych, np. zmieniać klatkę co 80–120 ms na podstawie `timeSec` (bez `Math.random()` w rdzeniu).
5. Wyświetlić dwa koła, każde 12×12 logicznych, obrócone **wokół ich własnych środków**: `(91/3,133/3)` oraz `(207/3,133/3)`. Najprościej z `ctx.translate(wx/3,wy/3); ctx.rotate(wheelAngle); ctx.drawImage(wheel,-6,-6,12,12)`.
6. Wyświetlić `kombi-body.png` w wymiarach **96×56** logicznych, potem jeden `luggage-{1..4}.png` w dokładnie tych samych współrzędnych. `luggage = clamp(1 + floor(game.weight * 4), 1, 4)` jest zgodne z obecnym placeholderem (dla `weight = 1` otrzymujemy 4).
7. Opcjonalne reakcje nałożyć na ten sam prostokąt 96×56; nie trzeba osobno pozycjonować głowy.
8. Dla zakończonej kolizją gry wyświetlić **sam** `kombi-crash.png`, bez osobnych kół i bagażu (ten wariant jest kompletny).

Przykładowy fragment po ustawieniu transformacji:

```ts
const px = 1 / 3;
const drawLayer = (image: HTMLImageElement) =>
  ctx.drawImage(image, 0, 0, 288 * px, 168 * px);
ctx.translate(-144 * px, -90 * px);
if (game.vy < -150) drawLayer(flameImages[Math.floor(timeSec * 11) % 2]);
for (const [wx, wy] of [[91, 133], [207, 133]]) {
  ctx.save();
  ctx.translate(wx * px, wy * px);
  ctx.rotate(wheelAngle);
  ctx.drawImage(wheelImage, -6, -6, 12, 12);
  ctx.restore();
}
drawLayer(bodyImage);
drawLayer(luggageImages[Math.min(3, Math.floor(game.weight * 4))]);
```

**Uwaga:** pozycja wyświetlania jest zakotwiczona w `(PLAYER.x, game.y)`; wizualna wielkość jest większa niż hitbox (celowo wybaczająca kolizja). Nie powiększać hitboxu tylko dlatego, że dach jest obciążony. Nie włączać rotowania koła w symulacji logicznej — to tylko efekt renderera.

## Regeneracja grafik i test ręczny

```bash
python public/assets/hero/generate.py
```

Wymagane *jedynie do regeneracji*: Python 3, Pillow i CairoSVG; **aplikacja web/Android/iOS nie korzysta z tych narzędzi**. Skrypt nadpisuje tylko wygenerowane pliki we własnym folderze. Sprawdzić `preview.png`, zwłaszcza rosnący bagaż 1→4, opony z osobnymi felgami, widocznego ludzkiego kierowcę i miniatury na błękitnym tle.

## Uzupełnienie — zlecenie 43 (portret do garażu)

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `portrait.png` | Autorska ilustracja wektorowa SVG → CairoSVG / Pillow, ręczne ścieżki, paleta 64 kolorów | CC0-1.0 | ChatGPT; karta 384×384 px, kompletne kremowo-czerwone kombi z dwoma kołami, bagażem na dachu i kierowcą machającym przez okno. Światło z lewego górnego rogu; tło karty, przezroczyste zaokrąglone narożniki, sRGB. Brak logotypów i napisów. |

Portret jest osobną grafiką interfejsu, **nie zastępuje** `kombi-body.png` w renderowaniu rozgrywki. W garażu jako portret domyślnej skórki należy pobierać `/assets/hero/portrait.png` zamiast używać bezkółkowego sprite'a karoserii. Nie zmieniać fizyki ani hitboxu.
