# Zasoby: Szwecja (SE)

| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `se-sky.png` | Autorska grafika proceduralna Python / CairoSVG / Pillow | własna — do użytku projektu | 1080×1920; statyczne niebo, ciepłe światło z lewej góry |
| `se-clouds.png` | Autorska grafika proceduralna Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×600; bezszwowy kafelek poziomy, przezroczystość; paralaksa 0,15 |
| `se-far.png` | Autorska grafika proceduralna Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×900; krajobraz charakterystyczny dla kraju, przezroczystość; paralaksa 0,25 |
| `se-near.png` | Autorska grafika proceduralna Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×720; bliskie elementy pobocza, przezroczystość; paralaksa 0,5 |
| `se-road.png` | Autorska grafika proceduralna Python / CairoSVG / Pillow | własna — do użytku projektu | 1080×330; bezszwowy asfalt z barierą; paralaksa 1,0 |
| `preview.png` | Zestawienie warstw i test powtarzania: Pillow | własna — do użytku projektu | Kompozycja oraz dwa kafelki obok siebie na szachownicy; linia szwu występuje wyłącznie na podglądzie. |

## Integracja

Kolejność: `sky`, `clouds`, `far` (+ panorama przelotu), `near`, `road`. Wymiary fizyczne odpowiadają skali @3x świata 360×640. PNG RGBA, profil sRGB. Bez tekstu, logo i marek.

**Stan szkicu PR:** pliki binarne PNG są przygotowane w załączonym do rozmowy archiwum `cebulak-09-do-repo.zip`; GitHub wymaga jeszcze wgrania ich z tego archiwum do tej gałęzi przed scaleniem.
