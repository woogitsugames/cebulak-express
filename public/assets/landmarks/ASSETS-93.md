# Zlecenie 93 — panoramy A+ pięciu miast francuskich

**Data:** 2026-10-31  
**Autor i narzędzie:** natywne generowanie obrazów ChatGPT (GPT Image); obróbka Python/Pillow + OpenCV.  
**Przeznaczenie:** gra „Cebulak Express — Kierunek Polska”.  
**Prawa do korzystania:** wygenerowane wyniki udostępnione do wykorzystania i modyfikacji przez właściciela projektu zgodnie z warunkami usługi i prawem właściwym; nie kopiowano fotografii referencyjnych ani logotypów.

## Metadane grafik

| Plik w `public/assets/landmarks/` | ID | Miasto | Najważniejsze motywy | Punkt widzenia | Narzędzie i prawa |
|---|---|---|---|---|---|
| `rouen.png` | `rouen` | Rouen | Katedra Notre-Dame (iglica), kościół Saint-Ouen, zabudowa nabrzeża Sekwany | Od lewego brzegu Sekwany ku staremu miastu na prawym brzegu; katedra w centrum, Saint-Ouen po prawej. | ChatGPT GPT Image; użycie przez właściciela projektu |
| `perpignan.png` | `perpignan` | Perpignan | Le Castillet, stylizowana wieża katedry Saint-Jean-Baptiste, palmy | Od placu w rejonie Le Castillet ku staremu miastu; ceglana brama w centrum, zabudowa katalońska i palmy obok. | ChatGPT GPT Image; użycie przez właściciela projektu |
| `narbonne.png` | `narbonne` | Narbonne | Canal de la Robine, zabudowany Pont des Marchands, Palais des Archevêques, katedra Saint-Just-et-Saint-Pasteur | Wzdłuż kanału de la Robine ku zabudowanemu mostowi i historycznym wieżom ponad dachami. | ChatGPT GPT Image; użycie przez właściciela projektu |
| `montpellier.png` | `montpellier` | Montpellier | Opéra Comédie, fontanna Trzech Gracji, jasne XIX-wieczne fasady, nieoznakowany tramwaj | Z placu de la Comédie ku fasadzie opery; pomnik i tramwaj na pierwszym planie. | ChatGPT GPT Image; użycie przez właściciela projektu |
| `besancon.png` | `besancon` | Besançon | Cytadela Vaubana, zalesione wzgórze nad Doubs, stare kamienice i kamienny most | Od brzegu Doubs w stronę cytadeli górującej nad starym miastem; kamienny most po lewej. | ChatGPT GPT Image; użycie przez właściciela projektu |

**Format każdego PNG:** 1620×900 px, RGBA z przezroczystym tłem (brak nieba i chmur), sRGB (osadzony profil ICC). Ciepła, płaska kolorystyka, gruby ciemnogranatowy kontur `#1d2f3b` (główna sylwetka ok. 9–10 px, z uwzględnieniem obrysu wewnętrznego), światło z lewej góry. Bez napisów, flag, reklam, logotypów i postaci pierwszoplanowych.

**Podgląd:** `docs/art/podglady/panoramy-93.png` — pięć grafik obok siebie na jasnoniebieskim tle, z podpisami wyłącznie w arkuszu.

## Prompty użyte przy generowaniu

### `rouen.png`

> Wide, sticker-style vector panorama of a Rouen-inspired Gothic riverside city on a transparent background, featuring bold outlines, flat cel shading, and no people, clouds, or text. A calm blue river and block-lined stone quay with steps sit before tree-lined rows of colorful timber-framed townhouses, while towering cream-and-tan cathedrals rise behind them with pointed arches, rose windows, deep-blue lancets, ornate spires, pinnacles, slate roofs, and a central needle-like tower topped by a cross.

### `perpignan.png`

> Wide, flat-shaded vector illustration on a transparent checkerboard background: a detailed red-brick medieval fortress gate dominates the center-left, flanked by palm trees and backed by warm Mediterranean buildings and a pale cathedral bell tower. Thick dark outlines, bold comic-style colors, crenellated towers, arched entry with a shadowy gridded gate, tiled plaza, low stone railings, greenery, and richly layered architectural details create a crisp cutout PNG look with no sky, text, people, vehicles, or signage.

### `narbonne.png`

> Panoramic cartoon-style vector scene of a European canal town on a transparent background, featuring a calm teal canal, a central stone arch bridge, colorful tightly packed waterfront houses, leafy quay-side trees, boats, and classic street lamps. Behind the bridge, a towering Gothic cathedral and a crenellated fortress dominate the skyline, all rendered with bold dark outlines, flat colors, simplified shading, and no people, text, or sky.

### `montpellier.png`

> Panoramic sticker-style vector illustration of a European city square inspired by Montpellier’s Place de la Comédie, isolated on a transparent checkerboard background with no sky, people, text, or extra scenery. In bold cel-shaded colors with thick navy outlines, a grand cream-and-gold Beaux-Arts opera house anchors the scene, flanked by ornate Haussmann buildings, balconies, domed slate roofs, a classical Three Graces fountain, and a sleek multicolored blue tram crossing the paved plaza at the right.

### `besancon.png`

> Panoramic vector-style cutout of a riverside European town, rendered in clean flat colors with bold dark outlines and a transparent checkerboard sky. A stone bridge, calm teal river, tree-lined embankment, colorful historic buildings, and a central church tower lead up to a large angular fortress crowning a green, rocky hill, all in a simplified poster-like style with no people.

## Obróbka i kontrola

- Skalowanie/kadrowanie do 1620×900 przez Pillow (Lanczos); w Montpellier usunięto artefakt dolnego pasa, w Besançon zmniejszono nadmiar przezroczystego obszaru na górze.
- Normalizacja przezroczystości i osadzenie profilu sRGB.
- Dodatkowy kontur ciemnogranatowy poprzez morfologię maski alfa (OpenCV), pogrubienie najciemniejszych linii.
- Kontrola obydwu kanałów (RGBA i alfa), obecności przezroczystego tła, wymiarów, czytelności po pięciokrotnym zmniejszeniu.

## Źródła do weryfikacji form zabytków

- Rouen — zabytki i punkt widokowy: https://vallee.seine-eure.fr/
- Perpignan — Le Castillet: https://mairie.perpignan.fr/culture-patrimoine/patrimoine/monuments/le-castillet
- Narbonne — Canal de la Robine: https://www.narbonne.fr/canal-robine
- Narbonne — Pont des Marchands: https://www.narbonne.fr/pont-marchands
- Montpellier — Place de la Comédie: https://www.montpellier-tourisme.fr/decouvrir/millenaire/les-incontournables/place-de-la-comedie/
- Besançon — cytadela i zakole Doubs: https://www.citadelle.com/a-voir-a-faire/la-citadelle-de-besancon/citadelle-de-besancon/

## Uwaga dotycząca dokładności widoków

Sylwetki są interpretacjami artystycznymi, nie rekonstrukcjami fotogrametrycznymi. O ile ich zasadnicze lokalne motywy mają oparcie w źródłach, nie wszystkie proporcje, drobne detale fasad i odległości między budowlami muszą dokładnie odpowiadać rzeczywistości. Pełne PNG i arkusz podglądu zostały przygotowane w osobnym ZIP w rozmowie z właścicielem, do ręcznego dodania na tę gałąź przed scaleniem.
