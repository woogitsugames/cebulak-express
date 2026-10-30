# Polska — warstwy tła i granica (zlecenie 07)

**Rozdzielczość @3x**, świat gry 360 × 640 px logicznych. Wszystkie obrazy są w formacie PNG sRGB; kafelki mają dwie identyczne kolumny skrajne. Ilustracje są autorskie, opracowane proceduralnie w ChatGPT jako wektory SVG i rasteryzowane przez CairoSVG/Pillow. Paleta i atmosfera nawiązują do koncepcji GPT Image; nie wklejono grafik cudzych marek ani elementów chronionych.

| Plik | Wymiary (px) | Źródło / narzędzie | Licencja | Uwagi |
|---|---:|---|---|---|
| `pl-sky.png` | 1080×1920 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Niebo dzienne, nieruchome, nieprzezroczyste; słońce z lewej góry |
| `pl-clouds.png` | 2160×600 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Przezroczyste chmury; kafelek 0,15 |
| `pl-far.png` | 2160×900 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Pola zboża/rzepaku, domy, bloki, bociany, wiatraki; kafelek 0,25 |
| `pl-near.png` | 2160×720 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Brzozy, sosny, działki, ogrodzenie; kafelek 0,5 |
| `pl-road.png` | 1080×330 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Droga, pasy i bariera, kafelek 1,0; nieprzezroczysty |
| `pl-border-near.png` | 2160×720 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Stacja przy granicy, hot dogi, kawa, zapiekanki, busy i puste pole znaku |
| `pl-sky-zima.png` | 1080×1920 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Zimowe niebo, nieruchome |
| `pl-far-zima.png` | 2160×900 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Zaśnieżone pola, domy i bloki |
| `pl-near-zima.png` | 2160×720 | ChatGPT, SVG → CairoSVG/Pillow | Własne dla projektu | Śnieg na drzewach, ogrodzeniu i działkach |
| `preview.png` | arkusz | ChatGPT, Pillow | Własne dla projektu | Kompozycja lato/zima, dwukrotnie sklejone kafelki, podgląd 15 panoram na szachownicy |
| `preview-scena.png` | 1080×1920 | ChatGPT, Pillow | Własne dla projektu | Przykładowy widok gry z Poznaniem |
| `preview-zima.png` | 1080×1920 | ChatGPT, Pillow | Własne dla projektu | Przykładowy widok gry zimą z domem |

## Integracja z Canvas 2D

- `sky`: rozciągnąć na cały ekran, bez ruchu.
- `clouds`: wyświetlać przezroczystą warstwę na wysokości orientacyjnej **y=110 px logicznych**, prędkość **0,15**; obraz jest okresowy co **720 px logicznych**.
- `far`: wyświetlać orientacyjnie przy **y=255 px logicznych**, prędkość **0,25**; okres 720 px logicznych.
- Landmark PNG: wstawić do `far` jako pojedynczą panoramę **540×300 px logicznych**, zakotwiczoną przy dolnej krawędzi `far`; przykładowa kompozycja zmniejsza ją do 330×183 px logicznych, by zmieścić w kadrze.
- `near`: wyświetlać orientacyjnie przy **y=418 px logicznych**, prędkość **0,5**; okres 720 px logicznych.
- `road`: wyświetlać przy **y=530 px logicznych**, prędkość **1,0**; wysokość 110 px logicznych, okres 360 px logicznych.
- `pl-border-near`: przejściowe zdarzenie na granicy; **nie** renderować jednocześnie z regularnym `pl-near` w tym samym pasie; ma być podmieniana / nakładana przez koordynatora.
- Wariant zimowy podmienia `sky`, `far`, `near`; `clouds` i `road` są wspólne. Nazwy z `waypoints.ts` mają pierwszeństwo; nie ma osobnego Krakowa, którego nie ma na liście punktów.
- Warstwy mogą być przesuwane niezależnie przez Canvas 2D. Brak zmian w silniku, rendererze lub silniku tras.

## Reprodukcja i test

```bash
python3 public/assets/countries/pl/generate_assets.py
python3 public/assets/countries/pl/verify_assets.py
```

Do generowania **tylko na etapie produkcji zasobów** potrzebne są `Pillow` i `cairosvg`. Do działania gry w przeglądarce nie potrzeba żadnej zależności. Zasoby wyeksportowano po ręcznej korekcie proporcji obiektów i wymuszeniu identycznych krawędzi kafelków. PNG jest indeksowany tam, gdzie nie powoduje istotnej utraty jakości; niebo pozostaje RGBA, by zapobiec pasmowaniu gradientu.
