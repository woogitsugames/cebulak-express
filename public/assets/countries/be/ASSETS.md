# Zasoby graficzne - Belgia (BE)

Wariant graficzny: autorskie ilustracje proceduralne, paleta pastelowych, ciepłych barw, gruby kontur. Kadrowanie pionowe 360 x 640 logicznych pikseli, skala 3x. Wersja 30.10.2026.

## Źródło i prawa

Wszystkie pliki: oryginalna grafika utworzona na potrzeby gry przy pomocy ChatGPT (projekt kształtów), Python + CairoSVG (rasteryzacja wektorów), Pillow (konwersja palety i optymalizacja PNG). Bez zapożyczonych grafik, czcionek, logo i marek. Licencja: zasób własny projektu - do wykorzystania, modyfikacji i dystrybucji w grze i materiałach promocyjnych. Zabytki jedynie jako stylizowane sylwetki.

## Wykaz plików

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `be-sky.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Niebo, stałe słońce z lewej góry; 40 KiB |
| `be-clouds.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Ruchome chmury; ciągły wzór; 14 KiB |
| `be-far.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Krajobraz kraju: ceglane domy, pola, wzgórza; 25 KiB |
| `be-near.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Pobocze: frytkot bez marki, drzewa, bariery; 17 KiB |
| `be-road.png` | SVG/Python, CairoSVG, Pillow | Własny zasób projektu | Autostrada, stalowa bariera i linie pasów ruchu; 2 KiB |
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

Zima jest aktywna 1–26 grudnia. Tylko trzy warstwy `sky`, `far`, `near` zastępują sezon letni; pozostałe, w tym `clouds`, `road` i panoramy miast, pozostają bez zmian. Zimowe PNG powstały przez proceduralną edycję oryginalnych letnich PNG: chłodniejsza paleta, śnieg na polach, drzewach i dachach, ciepłe punkty świetlne w oknach i dyskretny dym. Bazowe kontury i kadr są zachowane.

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `be-sky-zima.png` | ChatGPT, proceduralna edycja PNG | Własne, do projektu | 1080×1920, zimowe niebo i drobny śnieg |
| `be-far-zima.png` | ChatGPT, proceduralna edycja PNG | Własne, do projektu | 2160×900, zimowy daleki plan, bezszwowy |
| `be-near-zima.png` | ChatGPT, proceduralna edycja PNG | Własne, do projektu | 2160×720, zimowy bliski plan, bezszwowy |
| `docs/art/podglady/countries-be-preview-zima.png` | ChatGPT, kompozycja PNG | Własne, do projektu | Podgląd 1080×1920, lato drogi bez panoram |
| `winter-builder.js` | ChatGPT, JavaScript | Własne, do projektu | Narzędzie do ponownej edycji PNG także innych krajów |

**Kontrola:** sRGB, PNG z alfa, wymiary @3x, brak zmian ciemnych konturów, identyczne skrajne kolumny `far` i `near`, każdy z 3 PNG poniżej 1,2 MB. Brak obcych marek i symboli religijnych.
