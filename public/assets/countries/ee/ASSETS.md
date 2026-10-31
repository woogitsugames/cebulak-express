# ESTONIA (EE) — tła krajów tranzytowych, zlecenie 102

Data utworzenia: **2026-10-31**. Autor: **ChatGPT / OpenAI**. Narzędzia: GPT Image (wstępna koncepcja wizualna), programatyczne rysunki SVG, Python 3, CairoSVG, Pillow (produkcyjne PNG). Licencja: **oryginalna grafika projektu, przeznaczona do wykorzystania w Cebulak Express**; bez zewnętrznych zdjęć, fontów i logo.

Charakterystyka: sosny, drewniane domy, zatoki Bałtyku i głazy. Styl: płaski cartoon 2D, pastelowe kolory, mocny granatowy kontur `#1d2f3b`, światło z lewej góry. Bez napisów, flag, herbów, miejskich panoram i symboli religijnych.

**Prompt projektowy:** Generate original, warm pastel, family-friendly vector game backgrounds for Estonia (EE): pine forests, wooden countryside cottages, Baltic coast and rounded rocks. Thick navy outlines #1d2f3b, sunlight from upper left, separate opaque sky and alpha-transparent horizontally seamless cloud, far, near, road parallax layers; summer and snowy winter. No text, brands, flags, coats of arms, crosses, city skylines or logos.

| Plik | Rozmiar | Parametry | Źródło / narzędzie | Licencja |
|---|---:|---|---|---|
| `ee-sky.png` | 1080×1920 | RGB, tło nieba | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-clouds.png` | 2160×600 | RGBA, bezszwowy X | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-far.png` | 2160×900 | RGBA, bezszwowy X | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-near.png` | 2160×720 | RGBA, bezszwowy X | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-road.png` | 1080×330 | RGBA, asfalt od wiersza 150 | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-sky-zima.png` | 1080×1920 | RGB, wariant zimowy | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-far-zima.png` | 2160×900 | RGBA, zimowy i bezszwowy X | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |
| `ee-near-zima.png` | 2160×720 | RGBA, zimowy i bezszwowy X | Autorski SVG ChatGPT → CairoSVG/Pillow | Oryginalne zasoby projektu |

**Podglądy:** `docs/art/podglady/countries-ee-preview.png`, `countries-ee-preview-zima.png` (1080×1920).

**Generator:** `public/assets/countries/ee/generate_baltic.py` — powtarzalnie generuje wszystkie trzy kraje. Nie wymaga zmian w TypeScript ani npm.

**Kontrakt:** `sky` y=0, `clouds` y=110, `far` y=255, `near` y=418, `road` y=530 (piksele logiczne). Paralaksa: 0 / 0.15 / 0.25 / 0.5 / 1.0. Świat 360×640, źródła @3x. Asfalt zaczyna się **dokładnie w wierszu 150** w PNG drogi (y świata = 580), nieprzerwanie do dolnej krawędzi. Pierwsza i ostatnia kolumna kafelków są bitowo identyczne. Zimą podmienia się wyłącznie `sky`, `far`, `near`.

**Kontrola jakości:** wymiary, kanał alfa, kafelkowanie X, położenie asfaltu, brak przezroczystości nawierzchni, kompozycje letnie i zimowe: PASS. Aktualny loader `src/render/assets.ts` i renderer `src/render/background.ts` obsługują warianty zimowe wszystkich krajów oraz y=530 dla drogi.

**Przekazanie:** pełny zestaw produkcyjnych PNG, podglądów i źródłowego generatora znajduje się w paczce `102-tla-baltyk.zip` dołączonej do sesji ChatGPT zlecenia 102; grafiki należy wgrać do tej gałęzi z zachowaniem ścieżek z ZIP.
