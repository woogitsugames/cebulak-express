# Zlecenie 09 — pakiet grafik do gry

Zawiera **41 kompletnych sprite'ów PNG**: 4 kraje × 5 warstw oraz 21 panoram punktów trasy.

## Instalacja

Do repozytorium `woogitsugames/cebulak-express` skopiuj katalog `public/` z archiwum, zachowując strukturę folderów. Nie zastępuj istniejących plików spoza folderów tego zlecenia.

Następnie dodaj pliki do gałęzi `zlecenie/09-tla-ch-skandynawia` i otwórz/zaktualizuj draft PR do `main`.

Podglądy: `public/assets/countries/{ch,no,se,dk}/preview.png`, `public/assets/landmarks/preview.png`, osobny `preview.png` całego zestawu (do oceny wizualnej, nie do gry).

## Ścieżki

- `public/assets/countries/{ch,no,se,dk}/{cc}-{sky,clouds,far,near,road}.png` — w sumie 20 warstw.
- `public/assets/landmarks/{id}.png` — 21 panoram o wymiarach 1620×900.
- `ASSETS.md` w każdym folderze, z narzędziem, licencją i uwagami.

## Kontrola jakości

- Wymiary i RGB/alpha: zgodne z briefem, wszystkie PNG mają profil ICC sRGB.
- Prawidłowa przezroczystość; warstwy `clouds`, `far`, `near`, `road` przechodzą test brzegów kafelków (dwa obok siebie).
- Żadna warstwa nie przekracza 1,2 MB; żadna panorama nie przekracza 300 KB.
- Dodatkowe panoramy nieuwzględnione obecnie w trasach: `genewa`, `bazylea`, `bergen`, `stavanger`, `odense`, `aarhus`, `most-wielki-belt`, `most-oresund`.
- Nie edytowano kodu gry ani `waypoints.ts`.

## Generator (opcjonalny)

`tooling/generate_09.py` umożliwia deterministyczną regenerację assetów. To narzędzie pomocnicze, niewymagane w aplikacji ani w procesie budowania, zależności deweloperskie: Python 3, Pillow, CairoSVG.

**Uwaga:** testy `npm ci`, `npm run typecheck`, `npm test`, `npm run build` wymagają lokalnego klonu repozytorium i nie zostały uruchomione w tej paczce. Nie dodano zależności npm.
