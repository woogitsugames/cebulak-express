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
