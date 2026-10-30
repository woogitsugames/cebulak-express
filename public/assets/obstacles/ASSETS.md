# Przeszkody drogowe — zasoby 03

Sześć rodzajów: górne `viaduct`, `sign`, `crane`; dolne `roadworks`, `barrier`, `truck`. Grafika to **autorskie ilustracje geometryczne**, bez logotypów i tekstu. Ciepłe światło od lewej góry; mocny granatowy kontur. Grafiki nie korzystają z zasobów stron trzecich.

## Pochodzenie i licencja

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `viaduct-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `viaduct-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `sign-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `sign-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `crane-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `crane-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `roadworks-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `roadworks-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `barrier-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `barrier-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `truck-end.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |
| `truck-tile.png` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |
| `preview.png` | Skład automatyczny w `generate-assets.mjs` | Materiał przygotowany do wykorzystania w projekcie | 3 pary × 3 wysokości; na szachownicy |
| `obstacles.json` | Autorski opis metadanych | Materiał przygotowany do wykorzystania w projekcie | Rozmiary i punkty styku |
| `generate-assets.mjs` | Autorski skrypt JavaScript bez bibliotek | Materiał przygotowany do wykorzystania w projekcie | Odtwarza wszystkie PNG i JSON; bez nowych zależności |

## Integracja z rendererem (dla koordynatora)

- **Nie zmieniano** `src/core/*` ani `src/render/renderer.ts`. W zleceniu własność tych plików jest zastrzeżona koordynatorowi.
- Wymiary PNG są **fizyczne**: dzielić przez 3 w `ctx.drawImage`. Wspólny offset X to **-8 px logicznych** względem `obstacle.x`. Pas kolizji zajmuje zakres PNG `x=[24,216)` (192 fizyczne = 64 logiczne); przeźroczyste ozdobniki mogą wystawać max 8 logicznych w bok.
- Górny end: dół obrazka równo z `topH = gapY-gapH/2`. Sposób: `drawImage(end, x - 8, topH - 64, 80, 64)`. Następnie tile w górę po **32 logiczne px**, od `topH - 64 - 32`; przyciąć canvasem/screenem.
- Dolny end: góra obrazka równo z `bottomY = gapY+gapH/2`: `drawImage(end, x - 8, bottomY, 80, 64)`. Tile w dół od `bottomY + 64` po **32 logiczne px**, do `WORLD.groundY`.
- **Kolejność**: kafle przed końcówką (aby dekoracja krawędzi była na wierzchu). Kafel i końcówka nie mają szczelin w pasie kolizji. Przycinanie do obszaru gry i asfaltu realizuje koordynator.
- `sign`: tylko graficzne strzałki. `crane`: ładunek ma szerokość wewnątrz pasa kolizji, nie dynda poza nim. `truck`: samochody generyczne, bez marek.

## Walidacja

- Każda kolumna ma 240 px szerokości; end ma 192 px wysokości, tile 96 px. Wszystkie PNG mają kanał przezroczystości i wyłącznie indeksowane kolory sRGB.
- `preview.png` zawiera 3 rodzaje par (viaduct/roadworks, sign/barrier, crane/truck), każdą w 3 wysokościach. Krawędzie góra/dół szczeliny są rozdzielone i ostre.
- Dla każdego sprite'a wszystkie piksele z x 24..215 są nieprzezroczyste (brak „dziur do nieba”). Wysokości kafli są wielokrotnością fazy graficznej 96 px.
- Regeneracja: `node public/assets/obstacles/generate-assets.mjs` z katalogu repo. Nie trzeba `npm install`.
