# ASSETS-89 — Panoramy A+ (Szwecja)

**Data:** 2026-10-31. **Projekt:** Cebulak Express — Kierunek Polska.

## Zakres dostawy

Pięć ilustracji PNG RGBA 1620 × 900 px, bez nieba i napisów, z ciemnogranatowym konturem. Pliki PNG i arkusz podglądu są dostępne w paczce ZIP przekazanej koordynatorowi w zleceniu 89; nie zostały przesłane binarnie przez połączenie GitHub.

| ID / docelowy plik | Miasto i motywy | Perspektywa | Narzędzie | Licencja / uwagi |
|---|---|---|---|---|
| `malmo.png` | Malmö — Malmöhus, ceglane baszty, Slottsmöllan, fosa | Otoczenie zamku od strony fosy, wiatrak po lewej, zamek po prawej | GPT Image, ręczne kadrowanie Pillow | Wygenerowane dla projektu; do użycia przez właściciela na zasadach OpenAI |
| `sztokholm.png` | Sztokholm — Stadshuset, Riddarholmskyrkan, barwne kamienice Gamla Stan, most i łodzie | Stylizowana perspektywa znad Riddarfjärden, inspirowana widokiem z Monteliusvägen | GPT Image, wycinek z wygenerowanej panoramy zbiorczej, odbicie i skalowanie | J.w. |
| `nykoping.png` | Nyköping — Nyköpingshus, biała kwadratowa wieża Kungstornet, mury zamkowe, nabrzeże Nyköpingsån | Interpretacja widoku zza rzeki: wieża po lewej, niskie mury pośrodku, historyczna zabudowa po prawej | GPT Image (szkic koncepcyjny), ręcznie skorygowana ilustracja wektorowa CairoSVG | J.w.; własne opracowanie wektorowe |
| `norrkoping.png` | Norrköping — dawne młyny Industrilandskapet, kaskada Motala ström, most | W stronę historycznego przemysłowego brzegu rzeki | GPT Image, wycinek, skalowanie i usunięcie podpisów Pillow | J.w. |
| `jonkoping.png` | Jönköping — Sofiakyrkan, jezioro Vättern, łodzie, zabudowa i zalesione wzniesienia | Uproszczony widok od jeziora w stronę miasta | GPT Image, wycinek, usunięcie tekstu i skalowanie Pillow | J.w. |

**Podgląd:** `docs/art/podglady/panoramy-89.png` (wyłącznie w nim etykiety miast).

## Briefy / prompty do generowania

1. Malmö: Flat warm-colour vector illustration of Malmöhus red-brick castle and nearby Slottsmöllan windmill by the moat; large silhouettes, thick navy outlines, transparent background, no text.
2. Sztokholm: Flat vector waterfront from Monteliusvägen with Stadshuset on the left, Riddarholmskyrkan spire in the middle, colorful Gamla Stan on the right, boats and bridge, transparent sky.
3. Nyköping: Flat vector Nyköpingshus by Nyköpingsån, square white Kungstornet tower, ruined grey stone walls, historic red residence, river bank, thick outline, no text.
4. Norrköping: Flat vector Industrilandskapet beside Motala ström, red-brick factory buildings, cascade and footbridge, transparent sky, no text.
5. Jönköping: Flat vector Vättern waterfront and marina, Sofiakyrkan church spire, warm houses, sailing boats and distant green hills, transparent sky, no text.

Generator podczas partii tworzył również grafiki zbiorcze; wybrane panoramy wydzielono i poddano obróbce. Nyköping wymagał korekty sylwetki zamku na podstawie zweryfikowanego wyglądu kwadratowej wieży. Powyższe briefy opisują cele wizualne, a nie dosłowny log wewnętrznych promptów generatora.

## Źródła identyfikacji zabytków (referencje, zdjęć nie kopiowano do wynikowych grafik)

- Malmö: https://malmo.se/Uppleva-och-gora/Arkitektur-och-kulturarv/Malmos-historia/Platser-och-byggnader/Byggnader-A-O/Slottsmollan-och-Mollarebostaden.html
- Sztokholm: https://www.visitstockholm.com/o/monteliusvagen/
- Nyköping: https://sormlandsmuseum.se/besoksinfo/nykopingshus oraz https://www.sfv.se/vara-fastigheter/sverige/sodermanlands-lan/nykopingshus
- Norrköping: https://visit.norrkoping.se/se-och-gora/sevardheter/sevardheter/industrilandskapet/om-industrilandskapet
- Jönköping: https://www.jonkoping.se/fritid-kultur--natur/friluftsliv-natur-och-parker/parker/stadsparken-jonkoping/sinnenas-promenad

## Weryfikacja i integracja

Przed publikacją koordynator powinien wypakować ZIP do katalogu głównego repo (podmieniając stare pliki), obejrzeć podgląd i sprawdzić rozpoznawalność w kadrze gry przy skali około 20% oryginału. W środowisku tworzenia nie było dostępu do `git clone` ani do uruchomienia `npm ci`, `npm run typecheck`, `npm test`, `npm run build`; te czynności pozostają do wykonania po zaimportowaniu PNG.
