# Irlandia (IE) — zestaw warstw dla zlecenia 57

Oryginalne wektorowe ilustracje Cebulak Express, przedstawiające falujące zielone wzgórza, murki z kamienia, owce, domki, klify, mżawka i tęcza.
Ciemnogranatowe obrysy ok. 6 px w PNG @3x, pastelowa paleta, światło z lewej góry; bez znaków towarowych i tekstu w grafikach.

| Plik | Rozmiar PNG | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---:|---|---|---|
| `ie-sky.png` | 1080×1920 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | Rysunek algorytmiczny ChatGPT; niebo pełnoekranowe, bez przewijania, 0; RGB/RGBA |
| `ie-clouds.png` | 2160×600 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | Rysunek algorytmiczny ChatGPT; kafelek z alfą, parallax 0,15; powtarzalny X |
| `ie-far.png` | 2160×900 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | Rysunek algorytmiczny ChatGPT; kafelek z alfą, parallax 0,25; panorama kraju |
| `ie-near.png` | 2160×720 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | Rysunek algorytmiczny ChatGPT; kafelek z alfą, parallax 0,5; pierwszy plan |
| `ie-road.png` | 1080×330 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | Rysunek algorytmiczny ChatGPT; pełny asfalt od 150. wiersza, paralaksa 1,0; bezszwowy X |
| `ie-sky-zima.png` | 1080×1920 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | ChatGPT; wariant śnieżny (zastępuje `sky` w sezonie zimowym) |
| `ie-far-zima.png` | 2160×900 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | ChatGPT; wariant śnieżny (zastępuje `far` w sezonie zimowym) |
| `ie-near-zima.png` | 2160×720 | Autorski SVG → CairoSVG → Pillow | Oryginalny zasób projektu | ChatGPT; wariant śnieżny (zastępuje `near` w sezonie zimowym) |
| `preview.png` | 1080×1920 | Złożenie warstw w Pillow | Oryginalny zasób projektu | QA: symulacja pozycji warstw przy x=0, bez UI i bez pojazdu |
| `preview-zima.png` | 1080×1920 | Złożenie warstw w Pillow | Oryginalny zasób projektu | QA: symulacja pozycji warstw przy x=0, bez UI i bez pojazdu |
| `generate_northwest.py` | — | Python 3 + CairoSVG + Pillow | Kod autorski projektu | Generator wszystkich 3 krajów, 8 panoram i podglądów |

## Użycie

Warstwy: `sky` 1080×1920 (y=0), `clouds` 2160×600 (y=110), `far` 2160×900 (y=255), `near` 2160×720 (y=418), `road` 1080×330 (y=530); kotwice w **pikselach logicznych**.
Szerokość świata: 360 px logicznych; asfalt zaczyna się na y=580 (wiersz 150 w PNG road). Warstwy X są kafelkowane, skrajne kolumny pikseli są identyczne.

Zimą zamienić tylko `sky`, `far`, `near` na warianty `-zima`; `clouds` i `road` współdzielone. W aktualnym `src/render/assets.ts` mechanizm wariantów jest ograniczony do PL — koordynator powinien go rozszerzyć na IE/FI/LU przed użyciem.

Generowanie bez modyfikacji zależności npm: z katalogu repozytorium wykonać `python3 public/assets/countries/ie/generate_northwest.py` (Pillow + CairoSVG). Generator opisany w IE odtwarza wszystkie 3 kraje.

Weryfikacja: wymiary @3x, przynajmniej jeden przezroczysty piksel w `clouds/far/near`, identyczne kolumny X dla kafelków, ciemna krawędź asfaltu y=150, podglądy w `docs/art/podglady/`.
