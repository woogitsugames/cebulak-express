# Wielka Brytania: warstwy tła

Grafiki oryginalne, wygenerowane w ChatGPT i wykonane programowo; poprawki: reczna korekta kompozycji i laczenia kafelkow. Każda warstwa w skali @3x. Poniżej wymiary w pikselach fizycznych.

| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `uk-sky.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | 1080x1920; paralaksa: 0; nieprzezroczyste niebo |
| `uk-clouds.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | 2160x600; paralaksa: 0,15; przezroczystość RGBA; powtarzalny kafelek |
| `uk-far.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | 2160x900; paralaksa: 0,25; przezroczystość RGBA; powtarzalny kafelek |
| `uk-near.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | 2160x720; paralaksa: 0,5; przezroczystość RGBA; powtarzalny kafelek |
| `uk-road.png` | ChatGPT: oryginalne ilustracje SVG (Python, CairoSVG, Pillow); korekta kafelkow | Własne, do projektu | 1080x330; paralaksa: 1,0; przezroczystość RGBA; powtarzalny kafelek |
| `preview.png` | Pillow, kompozycja i test kafelków | Własne, do projektu | Arkusz kontroli; napisy wyłącznie na arkuszu |

## Integracja

Pozycje sugerowane dla obrazu 1080x1920: `sky` y=0, `clouds` y=180, `far` y=390, `near` y=1170, `road` y=1590; punkt orientacyjny y=490. Współrzędne do korekty przez koordynatora. Warstwy są PNG RGBA, a `sky` jest celowo nieprzezroczyste. Wszystkie warstwy przewijane (`clouds`, `far`, `near`, `road`) są kafelkami poziomymi. W `preview.png` pokazano dwa kafelki obok siebie.

Bez cudzych logotypów, nazw firm i tekstu w grafice. Widoki to stylizowane ilustracje, a nie dokumentacja architektury.
