# ASSETS-81 — Panoramy A+: Aarhus, Odense, Frankfurt nad Odrą, Szczecin, Poznań

**Data:** 30.10.2026  
**Projekt:** Cebulak Express — Kierunek Polska  
**Specyfikacja:** PNG RGBA 1620×900 px, sRGB, bez nieba i napisów, kontur ciemnogranatowy `#1d2f3b`.  
**Narzędzia:** ChatGPT GPT Image (wygenerowane ilustracje), Pillow (kadrowanie, dopasowanie wymiarów, plansza porównawcza).  
**Licencja/użytkowanie:** grafiki wygenerowane na potrzeby projektu; właściciel projektu ma prawo je wykorzystywać i rozpowszechniać zgodnie z warunkami usługi. Nie jest to gwarancja wyłącznego prawa autorskiego do wytworów AI.

## Ewidencja plików

| Id / plik | Miasto i dominanty | Punkt widzenia / uwagi | Źródło i poprawki | Uprawnienia |
|---|---|---|---|---|
| `aarhus.png` | Aarhus — zabytkowy ceglany dom celny Toldboden, Aarhus Domkirke, kamienice portowe | Umowny widok z nabrzeża portu ku historycznemu centrum, bez ARoS i Iceberg ze względów ostrożności licencyjnej | ChatGPT GPT Image; Pillow: skalowanie do 1620×900 | Do użytku komercyjnego właściciela projektu |
| `odense.png` | Odense — katedra św. Kanuta, historyczne domy z muru pruskiego | Stylizowany historyczny krajobraz; nie jest ścisłą rekonstrukcją jednej perspektywy | ChatGPT GPT Image; Pillow: skalowanie do 1620×900 | J.w. |
| `frankfurt-oder.png` | Frankfurt nad Odrą — gotycki ratusz, wieże zabytkowego kościoła (Friedenskirche), niebieski most nad Odrą | Umowny kadr z kierunku Słubic, łączy symboliczne dominanty miasta | ChatGPT GPT Image; Pillow: skalowanie do 1620×900 | J.w. |
| `szczecin.png` | Szczecin — Wały Chrobrego, Muzeum Narodowe, dawny gmach rejencji, portowe dźwigi | Widok od strony Łasztowni na zachodni brzeg Odry | ChatGPT GPT Image: wycięcie ze zbiorczej ilustracji; Pillow: kadrowanie i powiększanie | J.w. |
| `poznan.png` | Poznań — ratusz renesansowy i kolorowe kamieniczki Starego Rynku, symboliczne wieże katedry | **Montaż ilustracyjny, nie jeden rzeczywisty punkt widzenia.** Katedra jest na Ostrowie Tumskim, poza Rynkiem. Do oceny koordynatora | ChatGPT GPT Image: wycięcie ze zbiorczej ilustracji; Pillow: kadrowanie, usunięcie niezamierzonego napisu i powiększanie | J.w. |

## Prompty — briefy wizualne

- **Aarhus:** `Independent wide panoramic flat vector illustration of Aarhus harbour, red-brick historic Toldboden Customs House with pointed tower, recognizable cathedral spire above low traditional port buildings, thin blue water at bottom, navy outlines #1d2f3b, transparent background, no text, no people.`
- **Odense:** `Independent panoramic flat vector illustration of Odense, St Canute's red-brick Gothic cathedral with square tower and spire, historic timber-frame houses with ochre and pastel facades and red roofs, dark bold contour, flat warm colors, transparent background, no text.`
- **Frankfurt nad Odrą:** `Independent panoramic vector illustration of Frankfurt Oder brick-Gothic Rathaus with stepped gables, twin historic church spires and blue road bridge across Oder to Slubice, dark thick outlines, simple facades and slim water strip, transparent background, no signage.`
- **Szczecin:** `A clean five-city vector-style concept sheet including Szczecin waterfront, Wały Chrobrego, monumental National Museum, voivodeship office towers, river terraces and port cranes; isolate only Szczecin to an independent transparent PNG.`
- **Poznań:** `A clean five-city vector-style concept sheet including Poznań Renaissance town hall and colourful historic townhouses, church towers; isolate only Poznań to an independent transparent PNG.`

Generator nie udostępnił dokładnych wewnętrznych promptów. Powyższe zapisy są opisami briefów użytych przy tworzeniu zasobów.

## Źródła odniesienia historycznego

- Aarhus: https://www.visitaarhus.com/aarhus-region/plan-your-trip/toldboden-gdk653420
- Odense: https://www.odensedomkirke.dk/kirker/domkirken-skt-knuds-kirke/domkirkens-arkitektur
- Frankfurt nad Odrą: https://www.frankfurt-slubice.eu/index.php/en/poi/100952/rathaus-frankfurt-oder-town-hall
- Szczecin: https://visitszczecin.eu/pl/kultura/80-waly-chrobrego
- Poznań: https://www.poznan.pl/

Źródła służyły do sprawdzenia nazw i wyglądu zabytków; żadne fotografie nie są częścią ilustracji wynikowych.

## Integracja i kontrola

- Pięć obrazów na docelowych ścieżkach: `public/assets/landmarks/<id>.png` (pliki należy **podmienić**, nie dodać jako warianty).
- Arkusz: `docs/art/podglady/panoramy-81.png`; jasnoniebieskie tło i podpisy tylko na arkuszu, nie w panoramach.
- Przed odbiorem sprawdzić czytelność w około 324×180 px oraz zgodność lokalizacji budynków.
- Szczecin i Poznań wycięto z mniejszego arkusza wygenerowanego przez AI. W razie utraty czytelności po redukcji w grze należy wygenerować je osobno w większej rozdzielczości źródłowej.
- **Poznań** wymaga decyzji: aktualna kompozycja nie spełnia kryterium jednego rzeczywistego punktu widzenia.
- Ze względów ograniczeń środowiska **binarnych PNG nie przesłano tym commitem**. Koordynator otrzymuje ZIP ze wszystkimi plikami, gotowy do rozpakowania w katalogu głównym repo.

