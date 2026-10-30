# Zasoby graficzne - Holandia (NL)

Wariant graficzny: autorskie ilustracje proceduralne, paleta pastelowych, ciepłych barw, gruby kontur. Kadrowanie pionowe 360 x 640 logicznych pikseli, skala 3x. Wersja 30.10.2026.

## Źródło i prawa

Wszystkie pliki: oryginalna grafika utworzona na potrzeby gry przy pomocy ChatGPT (projekt kształtów), Python + CairoSVG (rasteryzacja wektorów), Pillow (konwersja palety i optymalizacja PNG). Bez zapożyczonych grafik, czcionek, logo i marek. Licencja: zasób własny projektu - do wykorzystania, modyfikacji i dystrybucji w grze i materiałach promocyjnych. Zabytki jedynie jako stylizowane sylwetki.

## Wykaz plików

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `nl-sky.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Niebo, stałe słońce z lewej góry; 35 KiB |
| `nl-clouds.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Ruchome chmury; ciągły wzór; 13 KiB |
| `nl-far.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Krajobraz kraju: wiatraki, turbiny, kanaly i tulipany; 20 KiB |
| `nl-near.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Pobocze: rowery, drzewa, barierki; 18 KiB |
| `nl-road.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Autostrada, stalowa bariera i linie pasów ruchu; 2 KiB |
| `preview.png` | Pillow, kompozycja warstw | Własny zasób projektu | Podgląd pionowy i test dwóch kafelków |

## Parametry wdrożenia

- `sky`: 1080 x 1920, nieruchoma, nieprzezroczyste tło (bez ruchomych chmur).
- `clouds`: 2160 x 600, powtarzalny kafelek poziomy; współczynnik przesuwu 0,15.
- `far`: 2160 x 900, kafelek poziomy; współczynnik 0,25.
- `near`: 2160 x 720, kafelek poziomy; współczynnik 0,5.
- `road`: 1080 x 330, kafelek poziomy; współczynnik 1,0. Górna część przezroczysta, pozostała część to asfalt.
- Przykładowe pozycje w kompozycji 1080 x 1920 px: niebo (0,0), chmury (0,190), daleki plan (0,880), bliski plan (0,1200), droga (0,1590). Pozycje są propozycją do korekty przy integracji w Canvas 2D.
- Kafelki mają powtarzalne skraje. Arkusz `preview.png` pokazuje po dwa identyczne kafelki.
- W grafice nie ma napisów. Napisy należy renderować w interfejsie gry.
- Nie do wdrażania jako tekstura: `preview.png`; służy do oceny graficznej.

## Na Wigilię! — wariant zimowy (zlecenie 45)

Sezon 1–26 grudnia. Trzy warianty zimowe zastępują wyłącznie `sky`, `far`, `near`; `clouds`, `road` i panoramy miast nie są zmieniane. PNG są własnymi przeróbkami letnich PNG: paleta zimowa, śnieg na istniejących bryłach, lampki w oknach, miejscami dym. Nieruchome położenie obrysów i niezmienione kadrowanie.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `nl-sky-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 1080×1920, chłodne niebo i drobne płatki |
| `nl-far-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 2160×900, śnieg na dachach i polach, bez szwów |
| `nl-near-zima.png` | ChatGPT: edycja proceduralna PNG | Własny zasób projektu | 2160×720, śnieg na poboczach, bez szwów |
| `docs/art/podglady/countries-nl-preview-zima.png` | ChatGPT: kompozycja PNG | Własny zasób projektu | Podgląd 1080×1920, bez panoram miast |

Generator przeróbek: `../be/winter-builder.js`. Kontrola: wymiary @3x, PNG sRGB z alfa, identyczne skrajne kolumny, zachowane ciemne kontury i każdy zimowy plik poniżej 1,2 MB. Brak symboli religijnych i marek.
