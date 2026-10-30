# ASSETS-80 — panoramy A+

**Data:** 2026-10-30. **Projekt:** Cebulak Express — Kierunek Polska.
**Rozmiar:** 1620 × 900 px, PNG RGBA, przezroczyste tło. **Styl:** płaskie ciepłe kolory, kontur `#1d2f3b`, bez napisów, szyldów, flag i ludzi.

| Plik | Miasto | Budowle i punkt widzenia | Narzędzie i korekty | Licencja |
|---|---|---|---|---|
| `bazylea.png` | Bazylea | Münster (dwie czerwone wieże), historyczny Mittlere Brücke nad Renem, Grossbasel; widok od Kleinbasel | ChatGPT Image, kadrowanie i poprawki Pillow/OpenCV | Wygenerowane dla projektu; prawa do outputu na zasadach usługi ChatGPT |
| `oslo.png` | Oslo | Dwie ceglane wieże Rådhuset po lewej, zabytkowa twierdza Akershus po prawej, wybrzeże; ujęcie od Aker Brygge | Wektor SVG/CairoSVG, na bazie eksperymentalnych generacji ChatGPT Image | Autorska ilustracja projektowa |
| `bergen.png` | Bergen | Domy Bryggen, wzgórze Fløyen, stylizowana kolejka Fløibanen; od strony portu Vågen | ChatGPT Image; kadrowanie i obrys Pillow/OpenCV | Wygenerowane dla projektu; prawa do outputu na zasadach usługi ChatGPT |
| `stavanger.png` | Stavanger | Historyczna biała zabudowa drewniana, Vågen, historyzująca wieża i żaglówki; widok z wody | ChatGPT Image; kadrowanie i obrys Pillow/OpenCV | Wygenerowane dla projektu; prawa do outputu na zasadach usługi ChatGPT |
| `kopenhaga.png` | Kopenhaga | Kolorowe kamienice Nyhavn i łodzie, historyczne wieże miasta; stylizowane zestawienie widoków nabrzeża | ChatGPT Image; kadrowanie i obrys Pillow/OpenCV | Wygenerowane dla projektu; prawa do outputu na zasadach usługi ChatGPT |

## Prompty i parametry

Wspólny kierunek: "Flat vector game city skyline, warm colors, chunky navy outline #1d2f3b, 2–4 locally recognizable historic landmarks, simplified windows and shadows, sunlight upper-left, transparent background, ground/waterline near the bottom, no sky, clouds, people, logos, lettering or flags."

- Bazylea: "Basel Cathedral with twin red sandstone towers, old Grossbasel Rhine waterfront, Mittlere Brücke arches, viewed from Kleinbasel."
- Oslo: "Oslo City Hall with two brick towers and Akershus Fortress, looking east from Aker Brygge; omit contemporary Opera House." Wykonano także odrębne ilustracyjne odtworzenie SVG.
- Bergen: "Colorful old Bryggen merchant gables in a row, green Fløyen hill behind and funicular, Bergen harbor Vågen."
- Stavanger: "Historic white wooden houses of Stavanger, old harbor Vågen with boats and a stylized traditional tower."
- Kopenhaga: "Historic colorful Nyhavn facades, wooden harbor boats and iconic distant historic Danish spires."

## Ważne uwagi

- W Oslo pominięto współczesną operę ze względu na ostrożność licencyjną.
- Budynki są stylizowane, nie stanowią wiernych reprodukcji zdjęć; w Kopenhadze wieże są ikonograficznym połączeniem różnych widoków i wymagają oceny koordynatora pod kątem dokładności przestrzennej.
- Wyniki generatora pocięto na osobne kadry, zaktualizowano RGBA, wzmocniono ciemne obrysy i dopasowano rozmiar do 1620×900.
- Lokalnie sprawdzono format, rozmiar, kanał alfa i integralność ZIP. Nie przeprowadzono testów gry ani npm, ponieważ kontener nie ma dostępu sieciowego do GitHub.

## Przekazanie

Pięć binarnych PNG oraz podgląd `docs/art/podglady/panoramy-80.png` są w ZIP przekazanym w sesji ChatGPT, z zachowaniem pełnych ścieżek repozytorium. Te pliki muszą zostać wgrane do tej gałęzi przed zaakceptowaniem PR. W pakiecie ZIP jest również szczegółowa wersja tego pliku ASSETS-80.md.
