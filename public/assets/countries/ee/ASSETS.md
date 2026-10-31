# Estonia (EE) — warstwy kraju tranzytowego, zlecenie 102

**Data utworzenia:** 2026-10-31. **Autor:** ChatGPT / OpenAI — autorskie rysunki wektorowe, ręczne zaprojektowanie geometrii i zaprogramowanie generatora. **Narzędzia:** GPT Image (wstępna tablica referencyjna), Python 3, autorskie SVG, CairoSVG, Pillow (finalne PNG). **Licencja:** oryginalne zasoby przekazane do wykorzystania w projekcie Cebulak Express, niepochodzące z cudzych bibliotek ani zdjęć. Wizualna tablica referencyjna GPT Image nie jest dołączona do zasobów uruchomieniowych. Nie zastosowano zewnętrznych fontów, logotypów ani materiałów na odrębnych licencjach.

## Paleta / brief graficzny

Lasy sosnowe, wybrzeże z płytkimi zatoczkami, kamienie i drewniane domy.

**Prompt projektowy (angielski):**

> Create a family-friendly 2D vector mobile-game background for Estonia (EE), warm pastel colors, flat clean illustrations, thick dark navy outlines #1d2f3b, sun from upper left, distinct landscape: Estonian pine forests, Baltic sea shoreline with coves and stones, rural timber cottages. Separate opaque sky and transparent horizontally tileable cloud, far countryside, near roadside and asphalt layers. Create summer and snowy winter variants. No text, brands, logos, flags, coats of arms, urban skyline, religious roadside crosses. Export at @3x and respect exact asphalt top row 150.

## Pliki, źródła, licencja

| Plik | Rozmiar PNG | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|---|
| `ee-sky.png` | 1080×1920 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Pełnoekranowy gradient nieba ze słońcem po lewej stronie |
| `ee-clouds.png` | 2160×600 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Chmury na alfie, kafelkowanie poziome |
| `ee-far.png` | 2160×900 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Dalsze krajobrazy bez budynków miejskich, alfa, kafelkowanie X |
| `ee-near.png` | 2160×720 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Zabudowa wiejska / drzewa / pobocza, alfa, kafelkowanie X |
| `ee-road.png` | 1080×330 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Asfalt od wiersza 150, kafelkowanie X |
| `ee-sky-zima.png` | 1080×1920 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Śnieżna kolorystyka nieba |
| `ee-far-zima.png` | 2160×900 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Zimowy daleki krajobraz, alfa, kafelkowanie X |
| `ee-near-zima.png` | 2160×720 | Rysunek SVG wygenerowany programatycznie przez ChatGPT, CairoSVG → Pillow | Oryginalna grafika projektu | Zimowa przydrożna sceneria, alfa, kafelkowanie X |

Podglądy złożonych warstw (również autorskie, ta sama licencja): `docs/art/podglady/countries-ee-preview.png` i `docs/art/podglady/countries-ee-preview-zima.png` (1080×1920). Skrypt źródłowy we wszystkich krajach: `tools/art/countries-baltic-generate.py` (samodzielny generator wszystkich trzech zestawów, Python 3 + CairoSVG + Pillow).

## Integracja / geometria

| Warstwa | Kotwica Y (logiczne) | Parallax | Format |
|---|---:|---:|---|
| `sky` | 0 | 0 | PNG 1080×1920, RGB, nie kafelkować |
| `clouds` | 110 | 0.15 | PNG 2160×600, RGBA, kafelkowanie X |
| `far` | 255 | 0.25 | PNG 2160×900, RGBA, kafelkowanie X |
| `near` | 418 | 0.5 | PNG 2160×720, RGBA, kafelkowanie X |
| `road` | 530 | 1.0 | PNG 1080×330, RGBA, kafelkowanie X |

Asfalt we wszystkich krajach rozpoczyna się **ściśle w wierszu 150** (y = 530 + 150/3 = **580** pikseli logicznych) i jest nieprzezroczysty do dolnej krawędzi. Wiersze 0–99 w `road` pozostają przezroczyste, 100–149 to pobocze/trawa (bez ciągłego pasa asfaltu). Pierwsza i ostatnia kolumna kafelków mają identyczne piksele. Wersja zimowa podmienia wyłącznie `sky`, `far`, `near`; chmury i droga są współdzielone, zgodnie z kontraktem repozytorium.

**Regeneracja (katalog główny projektu):**

```bash
python3 public/assets/countries/ee/generate_baltic.py
```

## Kontrola jakości

Sprawdzono programowo rozmiary, obecność kanału alfa, pikselową zgodność lewej i prawej kolumny w kafelkach, nieprzezroczystość nieba oraz asfaltu od wiersza 150. Podgląd jest złożony z oryginalnych warstw przy x=0, zgodnie z `docs/art/WARSTWY.md`; bez UI, pojazdu i przeszkód.

**Uwaga dla koordynatora:** dla EE/LV/LT zweryfikować ładowanie wariantów `-zima` w `src/render/assets.ts` oraz pozycję `road` na y=530; zmiany w rendererze nie należą do zlecenia 102.
