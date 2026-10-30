# ES — oryginalne tła 2D (zlecenie 56)

Słoneczne wzgórza, gaje oliwne, wiatrak, białe wioski i palma. Madryt, Barcelona, Walencja.

Autorskie ilustracje wektorowe SVG tworzone proceduralnie w ChatGPT; ręczne poprawki kompozycji, geometrii i bezszwowości, eksport przez CairoSVG/Pillow. Brak obrazów i logotypów osób trzecich.
Światło i słońce z lewej góry, ciemnogranatowy kontur ok. 6 px w @3x, płaskie ciepłe barwy. Bez napisów.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `es-sky.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 1080×1920, @3x |
| `es-clouds.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×600, @3x, kafelek powtarzalny |
| `es-far.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×900, @3x, kafelek powtarzalny |
| `es-near.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×720, @3x, kafelek powtarzalny |
| `es-road.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 1080×330, @3x, kafelek powtarzalny |
| `es-sky-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 1080×1920; śnieg na budowlach i w krajobrazie |
| `es-far-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 2160×900; śnieg na budowlach i w krajobrazie |
| `es-near-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 2160×720; śnieg na budowlach i w krajobrazie |

| `tools/art/generate_south.py` | ChatGPT: Python 3, SVG → PNG | Kod autorski projektu | Jeden generator dla czterech krajów |
| `tools/art/check_south.py` | ChatGPT: Python 3, Pillow | Kod autorski projektu | Kontrola 54 obrazów i 4 dróg |
**Podglądy:** `docs/art/podglady/countries-es-preview.png` i `countries-es-preview-zima.png` (po 1080×1920).

**Weryfikacja:** 3×, PNG sRGB (bez ICC), kanał alfa w warstwach ruchomych; skrajne kolumny każdego kafelka identyczne. Krawędź asfaltu w fizycznym wierszu 150. Nie ma zimowych dróg ani zimowych chmur.

**Regeneracja:** `python3 tools/art/generate_south.py` (Pillow + CairoSVG). Generator tworzy cztery kraje oraz panoramy i podglądy. Nie dodaje zależności do gry.

**Uwaga integracyjna:** Na `main` z 30.10.2026 `CountryCode` nie obejmuje jeszcze ES/IT/AT/CZ, a `hasWinterVariant()` w `src/render/assets.ts` obsługuje wyłącznie PL. Grafiki zimowe zaczną działać po integracji zlecenia 55 i rozszerzeniu tej funkcji przez koordynatora.
