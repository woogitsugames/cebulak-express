# AT — oryginalne tła 2D (zlecenie 56)

Alpy, świerki, drewniane domy z balkonami, Dunaj. Wiedeń, Graz, Linz i Salzburg.

Autorskie ilustracje wektorowe SVG tworzone proceduralnie w ChatGPT; ręczne poprawki kompozycji, geometrii i bezszwowości, eksport przez CairoSVG/Pillow. Brak obrazów i logotypów osób trzecich.
Światło i słońce z lewej góry, ciemnogranatowy kontur ok. 6 px w @3x, płaskie ciepłe barwy. Bez napisów.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `at-sky.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 1080×1920, @3x |
| `at-clouds.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×600, @3x, kafelek powtarzalny |
| `at-far.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×900, @3x, kafelek powtarzalny |
| `at-near.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 2160×720, @3x, kafelek powtarzalny |
| `at-road.png` | ChatGPT: SVG → CairoSVG/Pillow | Oryginalna ilustracja projektu | 1080×330, @3x, kafelek powtarzalny |
| `at-sky-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 1080×1920; śnieg na budowlach i w krajobrazie |
| `at-far-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 2160×900; śnieg na budowlach i w krajobrazie |
| `at-near-zima.png` | ChatGPT: odrębne opracowanie zimowe SVG | Oryginalna ilustracja projektu | 2160×720; śnieg na budowlach i w krajobrazie |



**Podglądy:** `docs/art/podglady/countries-at-preview.png` i `countries-at-preview-zima.png` (po 1080×1920).

**Weryfikacja:** 3×, PNG sRGB (bez ICC), kanał alfa w warstwach ruchomych; skrajne kolumny każdego kafelka identyczne. Krawędź asfaltu w fizycznym wierszu 150. Nie ma zimowych dróg ani zimowych chmur.

**Regeneracja:** `python3 public/assets/countries/es/generate_south.py` (Pillow + CairoSVG). Generator tworzy cztery kraje oraz panoramy i podglądy. Nie dodaje zależności do gry.

**Uwaga integracyjna:** Na `main` z 30.10.2026 `CountryCode` nie obejmuje jeszcze ES/IT/AT/CZ, a `hasWinterVariant()` w `src/render/assets.ts` obsługuje wyłącznie PL. Grafiki zimowe zaczną działać po integracji zlecenia 55 i rozszerzeniu tej funkcji przez koordynatora.
