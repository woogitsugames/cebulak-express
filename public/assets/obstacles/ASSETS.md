# Przeszkody w stylu wektorowym — zlecenie 31

Sześć typów, trzynaście grafik PNG: 12 elementów (po jednym `*-end.png` i `*-tile.png` na typ) oraz wariant graniczny `roadworks-pl-end.png`. Projekt zgodny z `obstacles.json` ze zlecenia 03. **Nie zmieniano API renderera ani fizyki.**

## Pochodzenie i prawa wykorzystania

Wszystkie postacie i elementy narysowane od zera przez ChatGPT jako własne kształty SVG generowane skryptem `generate-assets.py`, rasteryzowane do PNG przez CairoSVG i zoptymalizowane przez Pillow. Do kierunku stylistycznego wygenerowano dodatkowy obraz koncepcyjny w GPT Image, lecz **żadne piksele z wygenerowanego obrazu ani cudzych zdjęć nie zostały przeniesione do sprite'ów**. Bez marek, logotypów, tekstów i zewnętrznych assetów. Materiały przygotowane do wykorzystania w projekcie Cebulak Express; prawa osób trzecich do materiałów nie są deklarowane.

| Plik | Źródło/narzędzie | Licencja / pochodzenie | Autor/uwagi |
|---|---|---|---|
| `viaduct-end.png` | ChatGPT: wektory SVG, CairoSVG/Pillow | Autorski projekt dla gry | Betonowy wiadukt, biało-czerwony pas przy szczelinie |
| `viaduct-tile.png` | Jak wyżej | Jak wyżej | Powtarzalna żelbetowa podpora |
| `sign-end.png` | Jak wyżej | Jak wyżej | Zielona tablica ze strzałkami, bez liter |
| `sign-tile.png` | Jak wyżej | Jak wyżej | Kratownica stalowa w cyklu 96 px |
| `crane-end.png` | Jak wyżej | Jak wyżej | Żółty dźwig, pas pod obciążeniem |
| `crane-tile.png` | Jak wyżej | Jak wyżej | Żółta kratownica |
| `roadworks-end.png` | Jak wyżej | Jak wyżej | Bariery, lampy ostrzegawcze, pachołki, bloki |
| `roadworks-tile.png` | Jak wyżej | Jak wyżej | Stos betonowych bloków |
| `roadworks-pl-end.png` | Jak wyżej | Jak wyżej | Wariant z mocniejszym czerwono-białym wzorem |
| `barrier-end.png` | Jak wyżej | Jak wyżej | Generyczna bramka z budką i szlabanem |
| `barrier-tile.png` | Jak wyżej | Jak wyżej | Stelaż / filar bramki |
| `truck-end.png` | Jak wyżej | Jak wyżej | Laweta z dwoma generycznymi samochodami |
| `truck-tile.png` | Jak wyżej | Jak wyżej | Naczepa lawety |
| `obstacles.json` | Oryginalny kontrakt zlecenia 03 | Własne metadane projektu | Bez zmian semantycznych: 240 / 192 / 96 / 24+192+24 |
| `generate-assets.py` | ChatGPT, kod Python | Autorski generator | Źródło wektorów; deterministyczna regeneracja |
| `docs/art/podglady/obstacles-preview.png` | ChatGPT: generator + autorska panorama w stylu DE | Autorski podgląd dla gry | 3 pary × 3 wysokości; sceny inspirowane paletą de-near, nie jest kopią istniejącego tła |

## Kontrakt integracyjny

- Sprite: **240 px szerokości**. `*-end.png`: **240 × 192 px**; `*-tile.png`: **240 × 96 px**.
- Skala fizyczna **@3x**: w renderze 80 × 64 oraz 80 × 32 px logiczne.
- Nieprzezroczysty pas kolizji: `x = 24…215` w każdym wierszu, bez dziur. Pozostały obszar może mieć przezroczystość / elementy dekoracyjne.
- Poziome przesunięcie względem `obstacle.x`: `-8 px logicznych`.
- Górne (`viaduct`, `sign`, `crane`): krawędź szczeliny = **dół** `end`. Dolne (`roadworks`, `barrier`, `truck`): krawędź szczeliny = **góra** `end`.
- Kafelki powtarzają się pionowo co **96 px fizycznych**, z tą samą fazą wzoru na granicy powtórzeń. Wykończenie `end` pozostawia pas bazowy przy połączeniu.
- Dla Polski można użyć `roadworks-pl-end.png` zamiast `roadworks-end.png`, z tym samym kaflem `roadworks-tile.png`; opcjonalny wariant nie wymaga zmiany JSON.

## Regeneracja i weryfikacja

Na maszynie grafika (narzędzia Python, **bez nowych zależności npm**):

```sh
python -m pip install cairosvg pillow
python public/assets/obstacles/generate-assets.py
```

Po wygenerowaniu sprawdź wymiary, kanał alfa, brak prześwitów w `x=[24,216)`, zgodność fazy kafelków i rozmiar `<200 kB`. Generator wykonuje kontrole wymiarów, alfa i rozmiaru; podgląd umożliwia ręczną kontrolę szwów i stylu. Skrypt jest wyłącznie narzędziem do przygotowania assetów, nie jest uruchamiany przez Vite.

**Stan integracji (30.10.2026):** bazowe zasoby przeszkód, bohatera i `src/render/sprites.ts` zostały w międzyczasie scalone do `main`. Nowe PNG działają w tym samym kontrakcie, bez zmiany renderera. Podgląd 31 jest autorską sceną referencyjną w stylistyce DE; finalną ocenę kolorystyczną warto też przeprowadzić na `docs/art/podglady/countries-de-preview.png` z `main`.


## Dodatek: bramka bagażowa (zlecenie 52)

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `baggage-gate-end.png` | Autorskie wektory SVG stworzone w ChatGPT, CairoSVG + Pillow, ręczne dostrojenie geometrii i kolorów | Autorski projekt do gry | 240×192, ramka z ikoną walizki; bez znaków i tekstu |
| `baggage-gate-tile.png` | Jak wyżej | Jak wyżej | 240×96, powtarzalny filar bramki bez widocznego szwu |

Grafiki są w sRGB, z przezroczystością i paletą 64 kolorów; oba końce szczeliny używają tego samego `end`, a część dolna jest odbita pionowo. Pozostawiono pas kolizyjny `x=24…216` px. Przeznaczone do `src/render/sprites.ts`.
