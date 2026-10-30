# Zlecenie 57 — integracja i kontrola

## Zawartość

- IE/FI/LU: po 5 podstawowych warstw paralaksy i 3 zimowe PNG (`sky`, `far`, `near`), zgodnie z `docs/art/WARSTWY.md`.
- 8 przezroczystych panoram 1620×900 w `public/assets/landmarks/`: Dublin, Cork, Limerick, Helsinki, Tampere, Luksemburg, prom Irlandia–Francja, prom Finlandia–Polska.
- 6 podglądów krajów w `docs/art/podglady/countries-??-preview*.png`, arkusz `landmarks-preview-57.png`, cztery złożone sceny `scene-*.png` oraz kopie podglądów w folderach krajów.
- Manifests (`ASSETS.md` w każdym nowym folderze kraju; `ASSETS-57.md` do scalenia z już istniejącym manifestem panoram), autorski powtarzalny generator.

## Weryfikacja wykonana poza repozytorium

- Wszystkie 24 warstwy i 8 panoram: prawidłowe wymiary fizyczne @3x i obecność przezroczystości, gdzie jest wymagana.
- Kafelki `clouds`, `far`, `near`, `road`: dokładnie identyczne pierwsze i ostatnie kolumny RGBA na całej wysokości.
- Asfalt w trzech nowych drogach wykrywany od fizycznego wiersza **150** (świat y=580) według odtworzonego w Pythonie algorytmu `tools/art/measure-road.mjs` z `main`; pełny test Node w repo pozostaje do uruchomienia przez koordynatora.
- Wariant zimowy FI ma zorze rysowane wektorowo, nie jak gradient fotograficzny.
- Ocena wizualna arkusza podglądów, trzech scen z panoramami i zimowej sceny Finlandii przy x=0.

## Wymagane działania koordynatora (niezmieniane w ramach zlecenia graficznego)

1. `src/core/route.ts`: rozszerzyć `CountryCode` o `IE | FI | LU`. Dodanie ich do `HomeCountry` i tras wzorcowych wymaga decyzji o kolejnej fazie, gdyż MVP wg GDD D3 pozostaje 8-krajowy.
2. `src/render/palette.ts`: dodać kolory fallback dla trzech nowych kodów, inaczej TypeScript nie przejdzie przy rozszerzeniu `CountryCode`.
3. `src/render/assets.ts`: `hasWinterVariant()` obecnie zwraca true tylko dla PL; rozszerzyć na IE/FI/LU, żeby `-zima.png` naprawdę się ładowały (z zachowaniem fallbacku do lata).
4. `src/content/waypoints.ts`: w `ROUTE_WAYPOINTS` brak tras IE/FI/LU. Dla nowych punktów użyć ID zgodnych z nazwami grafik: `dublin`, `cork`, `limerick`, `helsinki`, `tampere`, `luksemburg`, `prom-irlandia`, `prom-finlandia`.
5. `tests/road-alignment.test.ts`: `COUNTRIES` ma wpisane na stałe 10 kodów. Tymczasem `tools/art/measure-road.mjs` automatycznie znajdzie 3 nowe pliki `*-road.png` (13 razem), więc istniejące porównanie `report.roads` z listą `filesOnDisk()` **będzie się różnić**. Rozszerzyć `COUNTRIES` o `ie`, `fi`, `lu` albo wyliczać je dynamicznie.
6. `public/assets/landmarks/ASSETS.md`: zachować istniejącą zawartość i dopisać 8 wierszy z nowego `ASSETS-57.md`.

## Ograniczenia weryfikacji

Środowisko wykonawcze zadania nie miało dostępu DNS do `github.com`, więc `git pull origin main` i pełne komendy `npm ci && npm run typecheck && npm test && npm run build` nie mogły zostać uruchomione na checkout repo. Dokumenty referencyjne i kod warstw pobrano z GitHub przez autoryzowany konektor i wykorzystano do produkcji. Nie dokonano zmian w cudzych plikach `src/core`, rendererze ani testach.

## Proponowany PR (po zaimportowaniu ZIP)

**Gałąź:** `zlecenie/57-tla-polnoc-zachod` od świeżego `main`.  
**Tytuł:** `[57] Tła: Irlandia, Finlandia, Luksemburg (+ prom do Finlandii/Irlandii)`  
**Status:** draft do `main`.

**Opis PR:**

- Dodałem trzy zestawy teł @3x o letnim i zimowym wyglądzie, dwa promy, panoramy 6 miast, generator, manifesty i podglądy.
- Kontrola lokalna: PNG 1080/2160 px, alfa, szwy X, początek asfaltu na y=150 potwierdzone; podglądy przejrzane.
- Nie sprawdzono: FPS Chrome 390×844 DPR3, testy npm i CI, przełączanie krajów w uruchomionej grze (nowe kraje jeszcze nie są w kodzie tras).
- Integracja: 6 kroków powyżej. Przed scaleniem: `npm ci && npm run typecheck && npm test && npm run build`, `node tools/art/measure-road.mjs`, przejazd próbny z parallax i sezonem zima.
- Pytania do koordynatora: czy IE/FI/LU mają trafić do ekranów wyboru dopiero po MVP D3? Który polski port wybrać dla promu z Finlandii (Gdańsk czy Gdynia)? Panorama nie zawiera nazwy portu, aby umożliwić obie wersje.
