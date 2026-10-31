# ASSETS-90 — panoramy A+ (31.10.2026)

**Zlecenie:** 90 — Luksemburg, Esch-sur-Alzette, Differdange, Leuven, Liège.  
**Format:** PNG 1620 × 900, sRGB, RGBA, przezroczyste tło.  
**Styl:** płaski ilustracyjny, ciepłe barwy, kontur w odcieniu #1d2f3b, sylwetki budynków i linia gruntu.  
**Narzędzie:** natywny generator obrazów ChatGPT (GPT Image). Korekta: Python/Pillow/OpenCV.  
**Licencja:** grafiki wygenerowane dla właściciela projektu i udostępnione mu do wykorzystania zgodnie z warunkami usługi; nie ma gwarancji wyłącznych praw autorskich do wyników AI. Nie kopiowano zdjęć referencyjnych.

| Plik | Miasto i obiekty | Punkt widzenia | Źródło i uwagi |
| --- | --- | --- | --- |
| `luksemburg.png` | Most Adolphe'a, wieża BCEE, iglice Notre-Dame, kamienne fortyfikacje | Stylizowany widok z doliny Pétrusse | Samodzielne GPT Image; skalowanie, alfa, kontur |
| `esch-sur-alzette.png` | Dwa historyczne piece Belval, kominy, Möllerei/teren stalowni | Frontalny widok na historyczne zabudowania Belval | Kadr z wygenerowanego arkusza GPT Image, wycięty i powiększony |
| `differdange.png` | Stylizowany Aalt Stadhaus i historyczne śródmieście, akcent przemysłowy | Syntetyczny widok z poziomu centrum | Kadr GPT Image. Przemysłowa wieża **nie** jest wiernym przedstawieniem pięciu chłodni |
| `leuven.png` | Gotycki ratusz, kościół Sint-Pieterskerk, kamienice rynku, rowery | Grote Markt | Kadr GPT Image; dwa rowery dorysowane w Pillow |
| `liege.png` | Most, barka na Mozie, stare miasto i Montagne de Bueren | Od strony Mozy | Kadr GPT Image, usunięto sąsiednią etykietę i wygładzono przezroczystość |

**Arkusz:** `docs/art/podglady/panoramy-90.png` — 5 panoram na jasnoniebieskim tle z podpisami i miniaturami w skali gry.

## Prompty do ponownej generacji

Wspólny: *Single recognizable 16:9 panoramic asset for a 2D game, 2–4 large city landmarks occupying about 70–80 percent of the image height, warm flat vector illustration, thick navy outline #1d2f3b, simple windows, upper-left light, flat shadow shapes, transparent background, no sky, clouds, text, signs, logos, flags, coats of arms or foreground people; ground line touching the bottom.*

- Luksemburg: *Adolphe Bridge stone arch across green Pétrusse valley, State Savings Bank clock tower and Notre-Dame Cathedral spires, fortress stone walls, historic Luxembourg old town skyline.*
- Esch-sur-Alzette: *Belval blast furnaces A and B, iron lattice frames and diagonal pipes, old Möllerei hall, industrial silos and rust-red brickworks.*
- Differdange: *historic town center and former Aalt Stadhaus, nearby historic civic facades, steelmaking heritage in background; no copying street-art murals.*
- Leuven: *Grote Markt with large Gothic Leuven Town Hall, Saint Peter's Church with no completed high tower, historic gabled houses and two parked city bicycles.*
- Liège: *Meuse river and barges, old riverside houses, river bridge, Saint-Barthélemy neighborhood and long Montagne de Bueren staircase climbing a wooded hill.*

**Wierność:** narzędzie wygenerowało kilka wielomiejskich arkuszy; 4 pliki powstały z ich odrębnych segmentów. Prompty powyżej są opisami intencji do regeneracji, a nie surowym logiem generatora. Sylwetki nie są dokładną rekonstrukcją jednego punktu obserwacyjnego.

## Źródła architektoniczne

- Luksemburg: https://www.luxembourg-city.com/en/tours-activities/sights/map
- Esch: https://www.visitluxembourg.com/tour/minett-trail-belval-universite-esch-sur-alzette-gare
- Differdange: https://www.visitluxembourg.com/place/differdange i https://www.visitluxembourg.com/place/five-cooling-towers
- Leuven: https://www.visitleuven.be/en/town-hall i https://www.visitvlaamsbrabant.be/zien-en-doen/vind-iets-om-te-doen/sint-pieterskerk-leuven
- Liège: https://www.visitezliege.be/fr/offre/montagne-de-bueren/

## Kontrola / pytania do koordynatora

1. **Differdange:** potrzebna ocena rozpoznawalności miasta; obraz nie odwzorowuje dokładnie zamku ani zespołu pięciu chłodni. Nie kopiowano współczesnych murali Alaina Weltera.
2. **Leuven:** w grafice AI kościół otrzymał zbyt wysoką iglicę — faktyczne wysokie wieże Sint-Pieterskerk nie zostały ukończone. Rozważyć korektę przed wydaniem.
3. **Luksemburg / Liège:** zestawienia lokalnych motywów są stylizowane i nie mają potwierdzonej dokładnej geometrii z jednego punktu.
4. Skontrolowano format każdego PNG, RGBA i przezroczystość. Nie wykonano lokalnie `npm ci && npm run typecheck && npm test && npm run build` (środowisko nie potrafi sklonować repozytorium z GitHub).
5. **ZIP z grafikami:** nie udało się przenieść binarnych PNG przez konektor GitHub; dołącza je właściciel/koordynator z paczki zadania 90, zachowując ścieżki repo. Nie scalać PR bez tych plików.

**Integracja:** podmienić zasoby w `public/assets/landmarks/`, bez edycji core/renderera. Dokument i podgląd nie wpływają na działanie gry.
