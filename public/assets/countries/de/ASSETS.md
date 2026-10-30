# DE — warstwy paralaksy i podgląd

Zlecenie 06, „Cebulak Express — Kierunek Polska”. Grafika ilustracyjna: ciepły dzień, wyrazisty ciemny kontur, nasycone płaskie kolory, stałe światło z lewej góry. W tło wpleciono autostradę z ekranami akustycznymi, pola rzepaku, drzewa, Ren, wiadukty, infrastrukturę Zagłębia Ruhry i wiatraki. Nie umieszczono napisów, znaków towarowych, godeł ani flag.

| Plik | Rozmiar px | Prędkość przewijania | Źródło / narzędzie | Licencja | Uwagi |
|---|---:|---:|---|---|---|
| `de-sky.png` | 1080×1920 | 0 (statyczne) | Autorski SVG → CairoSVG/Pillow, koncepcja graficzna wsparta GPT Image | Oryginalna ilustracja do projektu | Pełna barwa, bez ruchomych chmur, słońce z lewego górnego rogu |
| `de-clouds.png` | 2160×600 | 0,15 | Autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja do projektu | Przezroczysty kafelek, krawędzie zgodne pikselowo |
| `de-far.png` | 2160×900 | 0,25 | Autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja do projektu | Przezroczyste niebo; las, żółte pola, przemysł, rzeka, wiatraki |
| `de-near.png` | 2160×720 | 0,5 | Autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja do projektu | Drzewa, ekrany akustyczne, bariera |
| `de-near-baustelle.png` | 2160×720 | 0,5 | Autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja do projektu | Wymienny wariant `near`: pachołki, bariera robót, koparka bez logo |
| `de-road.png` | 1080×330 | 1,0 | Autorski SVG → CairoSVG/Pillow | Oryginalna ilustracja do projektu | Kafelkowany asfalt, pasy, stalowa bariera |
| `preview.png` | 3300×2800 | — | Pillow, autorski arkusz QA | Oryginalna ilustracja do projektu | Złożony pionowy widok gry, para każdego kafelka i wszystkie 21 landmarków na szachownicy |
| `generate_de.py` | — | — | Ręcznie opracowany generator Python z CairoSVG i Pillow | Kod autorski do projektu | Powtarzalna regeneracja assetów; narzędzie tylko deweloperskie, nie jest importowane do gry |

## Format, integracja i testy

- Wszystkie runtime PNG: 3× względem siatki logicznej (360×640), tryb RGB/RGBA lub paleta PNG z przezroczystością; przestrzeń sRGB, domyślnie bez profilu ICC.
- Przezroczystość: `de-clouds`, `de-far`, `de-near` i `de-near-baustelle`, a także panoramy; `de-sky` i `de-road` są nieprzezroczyste z założenia.
- Każda warstwa kafelkowa ma **identyczną pierwszą i ostatnią kolumnę pikseli**, potwierdzoną testem automatycznym.
- Sugerowane ułożenie na pionowym ekranie: `sky` wypełnia viewport, `clouds` w górnych 600 px, `far` nad jezdnią, `near` przy pasie drogowym, `road` w ostatnich 330 px; ścieżki montażu i offsety ustala renderer koordynatora.
- `de-near-baustelle.png` **zastępuje** na odcinku robót `de-near.png`, nie jest dodatkową warstwą na wierzchu.
- `landmarks/<id>.png` (1620×900) należy osadzać przy danym punkcie trasy **nad warstwą `far` i pod `near`**.
- Akceptowane jako oryginalna, prostsza grafika wektorowa. Makiety GPT Image służyły do orientacji stylistycznej; gotowe PNG zostały osobno narysowane i technicznie złożone w kodzie. **Nie są wycinkami obrazu referencyjnego.**
- Samodzielne ponowne generowanie: `python3 -m pip install cairosvg pillow`; `python3 public/assets/countries/de/generate_de.py`. Nie dodaje to zależności `npm` do gry.

## Weryfikacja

Do weryfikacji technicznej: szerokość/wysokość, istnienie 21 landmarków DE z `src/content/waypoints.ts`, obecność alfy, budżet PNG (limit 1,2 MB tła, 300 kB landmark), porównanie pierwszej i ostatniej kolumny każdego kafelka. Złożony podgląd i wszystkie sylwetki dostępne w `preview.png`; oddzielny arkusz landmarków także w `../../landmarks/preview.png`.

## Na Wigilię! — wariant zimowy (zlecenie 45)

Sezon 1–26 grudnia. Trzy warianty zimowe zastępują wyłącznie `sky`, `far`, `near`; `clouds`, `road`, `near-baustelle` i panoramy miast pozostają bez zmian. PNG są własnymi przeróbkami letnich PNG: paleta zimowa, śnieg na istniejących bryłach, lampki w oknach, miejscami dym. Zachowano położenie obrysów i kadrowanie.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `de-sky-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 1080×1920, chłodne niebo i drobne płatki |
| `de-far-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 2160×900, śnieg na dachach i polach, bez szwów |
| `de-near-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 2160×720, śnieg na poboczach, bez szwów |
| `docs/art/podglady/countries-de-preview-zima.png` | ChatGPT: kompozycja PNG | Własny zasób projektu | Podgląd 1080×1920, bez panoram miast |

Generator przeróbek: `../be/winter-builder.js`. Kontrola: @3x, PNG sRGB z alfa, identyczne skrajne kolumny, zachowane ciemne kontury i rozmiar każdego zimowego pliku poniżej 1,2 MB. Brak symboli religijnych i marek.
