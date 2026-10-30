# Zlecenie 56 — przekazanie i integracja

## Zakres

- `public/assets/countries/{es,it,at,cz}/`: 5 warstw podstawowych + 3 warianty zimowe każdego kraju (32 PNG) i tabela `ASSETS.md` w każdym folderze.
- `public/assets/landmarks/{madryt,barcelona,walencja,rzym,mediolan,neapol,bolonia,wieden,graz,linz,salzburg,praga,brno,ostrawa}.png`: 14 panoram, 1620×900. `ASSETS-56.md` jest suplementem do **istniejącego** `ASSETS.md` w repozytorium, którego nie należy nadpisywać.
- `docs/art/podglady/countries-{es,it,at,cz}-preview*.png`: 8 podglądów (lato i zima).
- `public/assets/countries/es/generate_south.py`: powtarzalny autorski generator SVG → PNG.
- `public/assets/countries/es/check_south.py`: samodzielna kontrola 54 PNG.

## Test techniczny i wynik

`python3 public/assets/countries/es/check_south.py`

Wynik po wygenerowaniu: 54/54 obrazów zgodnych z wymiarami i metadanymi sRGB, wszystkie kafelki bezszwowe (identyczne skrajne kolumny), przezroczyste warstwy alpha, wszystkie pliki w zakładanym budżecie. 4/4 dróg: początek asfaltu na **y=150 px** fizycznych (y=580 px logicznych w świecie gry). Test pomiaru odwzorowuje metodę z `tools/art/measure-road.mjs` z aktualnego `main`.

## Zależności od koordynatora

1. **Zlecenie 55 nie było na `main` w chwili wykonania 56 (30.10.2026).** W `src/core/route.ts` brak typu krajów ES, IT, AT, CZ, a `src/content/waypoints.ts` nie zawiera ich punktów. Panoramy są przygotowane według fallbacku z briefu (stolice + 2 największe miasta każdego kraju), z dodatkową Bolonią i Salzburgiem. Po włączeniu zlecenia 55 porównać `id` punktów trasy z 14 nazwami plików; brakujące `id` wymagają kolejnych panoram.
2. **Zima:** `src/render/assets.ts` ma `hasWinterVariant()` ograniczone do PL. Po dodaniu nowych `CountryCode` koordynator powinien dopuścić ES, IT, AT, CZ w tym warunku dla `sky`, `far`, `near`; nie zmieniano pliku ze względu na własność koordynatora.
3. Sprawdzić złożoną scenę na Chrome 390×844, DPR 3 i rzeczywiste przenikanie sezonu/zmiany kraju. Nie ma tutaj dostępu do uruchomionej gry; zweryfikowano pozycje warstw i podglądy statyczne.
4. Po skopiowaniu ZIP do repo należy wykonać `npm ci && npm run typecheck && npm test && npm run build` oraz `node tools/art/measure-road.mjs` w pełnym repozytorium.
5. Nie zmieniono `src/core/`, renderera, package.json ani zależności npm.

## Pliki i licencja

Wszystkie ilustracje są autorskimi kompozycjami wektorowymi wykonanymi w ChatGPT przy pomocy ręcznie opracowanego kodu Python/SVG i CairoSVG/Pillow. Nie zawierają cudzych obrazów ani zastrzeżonych znaków. Zasoby zostały przygotowane na potrzeby projektu.
