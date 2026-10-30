# Mała Japonka — poprawka sylwetki, zlecenie 83

**Data:** 30.10.2026  
**Autor / narzędzia:** ChatGPT Images (arkusz koncepcji), własne geometryczne ścieżki SVG zaprojektowane w ChatGPT, Python 3, CairoSVG, Pillow; ręczna korekta wymiarów, położenia kół, warstw i szczegółów po renderingu.  
**Licencja i prawa użytkowania:** własny materiał wygenerowany i przygotowany dla projektu Cebulak Express zgodnie z warunkami usługi OpenAI; brak cudzych grafik, internetowych zdjęć, znaków i materiałów o zależnych licencjach. Nie deklaruje się wyłączności prawnoautorskiej.

## Prompt / brief

> Autorski bezmarkowy samochód 2D do gry, profil dokładnie boczny, przód w prawo; czerwona, krótka, zaokrąglona trzydrzwiowa japońska mikromiejska; wysoka bąbelkowa linia dachu, krótka tylna klapa; bez sedana. Płaska ilustracja wektorowa, gruby ciemnogranatowy kontur, ciepłe kolory, słońce z lewej góry, neutralny pogodny kierowca, bagaże na dachu. Osobne warstwy z przezroczystością PNG RGBA, @3x, canvas 288x168, koło 36x36, crash z kołami, dwa płomienie, cztery niezależne nakładki bagaży, portret 384x384. Bez marek, modeli, logotypów ani tekstu na obrazkach.

## Wykaz zasobów

| Plik | Źródło / narzędzie | Licencja | Autor / uwagi |
| --- | --- | --- | --- |
| `body.png`, `wheel.png` | ChatGPT + autorskie SVG, CairoSVG/Pillow | Materiał dla projektu, bez materiałów zewnętrznych | Karoseria bez kół, osobne koło; koła w wyznaczonych osiach |
| `crash.png` | Jak wyżej | Jak wyżej | Komiczne uszkodzenia bez przemocy, wrysowane dwa koła |
| `flame-1.png`, `flame-2.png` | Jak wyżej | Jak wyżej | Dwa niezależne stany płomienia |
| `luggage-1.png` … `luggage-4.png` | Jak wyżej | Jak wyżej | Cztery pełne, niezależne nakładki; nie sumować |
| `portrait.png` | Kompozycja oryginalnych warstw w Pillow | Jak wyżej | Karta 384×384, przezroczyste rogi |
| `skin.json` | Dane geometryczne przygotowane w ChatGPT | Dane projektowe | `scale: 3`, `hitbox: 40×20`, anchor (144,106) |

Renderowanie zostało wykonane jako PNG RGBA ze zdefiniowanym profilem sRGB (ICC). Wymiary: 288×168, koło 36×36, portret 384×384. Źródło skryptowe: `docs/art/podglady/auta-83-generator.py`. Arkusz porównawczy: `docs/art/podglady/auta-83.png`.
