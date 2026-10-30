# Balans trudności — analiza i propozycja parametrów

Stan bazowy: `main` z 30.10.2026. Zmiany konfiguracji opisane niżej są **propozycją**, a nie wdrożeniem — `src/core/` pozostaje nienaruszony.

## Kryteria i sposób testowania

- Początkujący: mediana jednego przejazdu **10–25 s**.
- Dobry gracz: przejazd około **1 000–2 000 km** w **60–150 s**, przy wystarczającej szansie dotarcia do mety.
- Rozkład przejazdów szacujemy deterministyczną symulacją rzeczywistego `Game` (120 Hz, `ranked`, jeden hit = koniec). To model heurystyczny, **nie pomiar ludzkich reakcji**.
- Sterowanie bazuje na algorytmie `tests/helpers.ts` (`botStep`): celuje w szczelinę, w jej obrębie uwzględnia następną przeszkodę. Dodano opóźnienie 80–250 ms, stały w ramach jednej przeszkody szum celu oraz prawdopodobieństwo pominięcia tapnięcia. Bot przewiduje pozycję w czasie opóźnienia, ale nie ma dostępu do przyszłego losowania.
- Wartości P10, mediana, P90 i odsetek dojazdów liczone z identycznej puli ziaren dla porównywalnych grup. Testy łatwo powtórzyć: `npm ci && npm run balance` lub `npm run balance -- --runs 50 --seed 1000`.
- Bieżące wartości konfiguracyjne są w `src/core/config.ts`; generator i `reachableShift` w `src/core/obstacles.ts`.

<!-- BALANCE-RAPORT-START -->

## Wyniki symulacji (generowane automatycznie)

*Dane z `Game` w `src/core/game.ts`, tryb rankingowy; nie są wynikami testów z ludźmi. Dane odtwarzalne przy tym samym kodzie i ziarnach.*

- Liczba przejazdów: **3750** (250 na grupę); ziarna przeszkód: **1–250**; limit: **240 s**.
- Trasy: **DE: Berlin → Szczecin: 270 km**; **BE: Bruksela → Wrocław: 1180 km**; **NO: Bergen → Białystok: 1960 km**.
- Profile: **Nowy** (250 ms; szum ±24 px; pominięte tapnięcia 4.0%); **Średni** (180 ms; szum ±18 px; pominięte tapnięcia 3.0%); **Sprawny** (120 ms; szum ±9 px; pominięte tapnięcia 1.5%); **Ekspert** (80 ms; szum ±4 px; pominięte tapnięcia 0.5%).
- Parametry rdzenia: `KM_PER_PX=0.05`, `rampSeconds=75`, `PICKUPS.chance=0.45`.

### Rozkład przejazdów i dojazdy do mety

W kolumnach czasu i km podano **P10 / medianę / P90**, a „meta” to odsetek pełnych przejazdów. Krótkie trasy mogą ograniczyć długość przejazdu przez dotarcie do mety.

| Trasa | Bot | Czas [s]: P10 / P50 / P90 | Wynik [km]: P10 / P50 / P90 | Meta |
|---|---|---:|---:|---:|
| DE: Berlin → Szczecin | Nowy | 4.7 / **12.9** / 27.9 | 32 / **118** / 270 | 17.6% |
| DE: Berlin → Szczecin | Średni | 5.2 / **23.3** / 30.7 | 36 / **221** / 270 | 42.4% |
| DE: Berlin → Szczecin | Sprawny | 23.8 / **28.8** / 32.5 | 266 / **270** / 270 | 89.6% |
| DE: Berlin → Szczecin | Ekspert | 25.0 / **28.8** / 32.5 | 270 / **270** / 270 | 96.0% |
| BE: Bruksela → Wrocław | Nowy | 4.7 / **12.9** / 34.5 | 32 / **118** / 355 | 0.0% |
| BE: Bruksela → Wrocław | Średni | 5.2 / **23.3** / 56.5 | 36 / **221** / 606 | 0.4% |
| BE: Bruksela → Wrocław | Sprawny | 28.3 / **59.5** / 92.9 | 266 / **624** / 1180 | 16.8% |
| BE: Bruksela → Wrocław | Ekspert | 76.2 / **94.3** / 101.2 | 819 / **1180** / 1180 | 82.0% |
| NO: Bergen → Białystok | Nowy | 4.7 / **12.9** / 34.5 | 32 / **118** / 355 | 0.0% |
| NO: Bergen → Białystok | Średni | 5.2 / **23.3** / 56.5 | 36 / **221** / 606 | 0.0% |
| NO: Bergen → Białystok | Sprawny | 28.3 / **59.5** / 113.5 | 266 / **624** / 1514 | 4.8% |
| NO: Bergen → Białystok | Ekspert | 76.2 / **141.7** / 151.5 | 819 / **1960** / 1960 | 67.2% |

### Znajdźki i ciężar — porównanie kontrolowane

Ten sam bot **Sprawny**, trasa **BE: Bruksela → Wrocław**, te same ziarna w każdym wariancie. „Bez ciężaru” zachowuje premie km; „bez znajdźek” wyłącza i premie, i dodatkową grawitację. **Średnie km** są ograniczone długością trasy; „km z dystansu” liczone są bez premii. Średnia waga to średnia po tickach w obrębie przejazdów.

| Wariant | Mediana [s] | Śr. wynik [km] | Śr. km z dystansu | Śr. bonus [km] | Meta | Śr. paczki / słoiki | Śr. waga |
|---|---:|---:|---:|---:|---:|---:|---:|
| Pełna mechanika | 59.5 | 677.0 | 506.8 | 171.0 | 16.8% | 7.6 / 1.9 | 0.101 |
| Znajdźki bez ciężaru | 51.1 | 587.8 | 444.0 | 143.9 | 5.2% | 6.4 / 1.6 | 0.000 |
| Bez znajdźek i ciężaru | 51.1 | 449.1 | 449.1 | 0.0 | 0.4% | 0.0 / 0.0 | 0.000 |

*Uwaga: ciężar może pomóc temu konkretnemu autopilotowi, bo jego sterowanie czasem podbija za wcześnie; wyników porównania nie wolno traktować jako dowodu wpływu wagi na ludzkich graczy. Wariant „bez znajdźek” ustawia `taken=true` dla dostępnych znajdźek, a „bez ciężaru” zeruje `game.weight` przed każdym tickiem — bez modyfikacji rdzenia.*

<!-- BALANCE-RAPORT-END -->

## Interpretacja i ograniczenia

1. **Początkujący:** oceniamy medianę na trasie średniej/długiej, nie krótkiej z możliwym zakończeniem na mecie. P10 rzędu kilku sekund może oznaczać kolizję już na pierwszej przeszkodzie — mediana nie wyczerpuje oceny przystępności.
2. **Ekspert i gracz sprawny:** osiągnięcie przez eksperta mety nie dowodzi, że gracz sprawny poradzi sobie na długich trasach. Oprócz czasu trzeba sprawdzać *procent dotarć*, osobno dla krótkiej, średniej i długiej trasy. Krótka trasa kończy się przed pełnym narastaniem trudności.
3. **Znajdźki i waga:** bonus km jest ułatwieniem, ale wyższa grawitacja modyfikuje sterowanie i rozkład zderzeń. Znajdźka ma 45% szansy po każdej przeszkodzie; 80% wygenerowanych to paczka (+15 km, +0,3 ciężaru), 20% słoik (+30 km, +0,5). Oczekiwana premia z samego losowania wynosi 8,1 km/przeszkodę, ale nie wszystkie znajdźki da się lub warto zebrać. Przy wadze 1 grawitacja wzrasta o 45%; ciężar znika z prędkością 0,12/s.
4. **Gwarancja `reachableShift`:** algorytm ogranicza zmianę wysokości szczeliny w oparciu o fizykę *bez obciążenia*, zapas bezpieczeństwa i oszacowanie stałego wznoszenia. To praktyczna heurystyka osiągalności geometrii, **nie formalny dowód**, że każdy układ da się przelecieć z opóźnieniami, pominiętymi tapnięciami i ciężarem. Weryfikować skrajne ziarna w dodatkowych testach.
5. **Limit 240 s:** przejazdy nieukończone w tym czasie liczą się osobno jako `timeouts` w JSON; nie można ich nazywać przegranymi. Przy domyślnych ziarnach należy sprawdzić, czy występują.
6. **Odporność wyniku:** liczby zależą od wybranego heurystycznego modelu gracza. Zmiana autopilota, zestawu ziaren lub źródłowych plików rdzenia zmienia wnioski. Po pierwszych testach z ludźmi należy dostroić parametry do rzeczywistej mediany.

## Dlaczego nie skalować `KM_PER_PX` per trasa na potrzeby rankingu

Obecne `KM_PER_PX = 0.05` daje taką samą liczbę kilometrów na piksel niezależnie od kraju. Pod względem przeszkód jest to jednakowy świat i jednakowe narastanie trudności (zależne tylko od czasu), ale **nie jest to równy ranking kilometrów**. `Game.km` ma pułap `route.totalKm`. W skrajnych trasach z tego testu pułap jest inny o czynnik około **7,26** (1960/270). Krótka trasa kończy się szybko i blokuje kolejne punkty, a długa pozwala zbierać znacznie więcej km — nawet przy identycznym czasie przeżycia przed metą.

**Rekomendacja dla MVP:** utrzymać stały `KM_PER_PX` na wszystkich trasach, a dystans po mapie traktować jako **fabularny limit podróży**. Nie różnicować fizyki i tempa przeszkód wg kraju. Skalowanie `KM_PER_PX` per trasa może wyrównać czasy dotarcia do domu, ale nie naprawi rankingu sumy surowych km: ukończenie długiej trasy nadal doda wiele razy więcej niż krótkiej.

**Przed wdrożeniem rankingu krajów konieczna decyzja koordynatora:** osobny, znormalizowany wkład do ligi, np. `leaguePoints = round(1000 * min(1, game.km / route.totalKm))` i tablica wyników opisana jako **punkty**, nie km. Ta normalizacja sama w sobie premiuje krótkie trasy (ukończenie trwa krócej), więc trzeba również ograniczyć liczbę zaliczanych prób na gracza w tygodniu i/lub wyrównać docelowy czas dojścia per trasa. Na dziś nie należy nazywać punktów ligi „sumą przejechanych km”. Alternatywnie należy jawnie zaakceptować nierówność surowego rankingu, zgodnie z decyzją właściciela. **Nie wdrażać przeliczenia po stronie klienta bez zgodnego serwera i weryfikatora przejazdów.**

## Propozycja następnej iteracji A/B (nieprzetestowana)

Wyniki powyżej odnoszą się **wyłącznie do obecnej konfiguracji**. Poniższe wartości są hipotezą do nowego przebiegu `npm run balance` po zatwierdzeniu przez koordynatora. Cel: nie zmieniać gwałtownie osiągów początkującego, nieco złagodzić późniejszą część i zmniejszyć ryzyko przekroczenia 150 s przy długich trasach.

| Parametr | Teraz | Propozycja | Powód |
|---|---:|---:|---|
| `KM_PER_PX` | `0.05` | `0.055` | Około 10% szybszy postęp km przy tej samej fizyce. |
| `DIFFICULTY.graceSeconds` | `12` | `14` | Dłuższy czas na naukę sterowania. |
| `DIFFICULTY.rampSeconds` | `75` | `90` | Płynniejsze dojście do maksymalnej trudności. |
| `DIFFICULTY.gap` | `[215, 150]` | `[220, 165]` | Większy margines w późnym etapie. |
| `DIFFICULTY.spacing` | `[260, 225]` | `[270, 235]` | Więcej czasu na korektę toru. |
| `DIFFICULTY.maxGapShift` | `[80, 150]` | `[80, 135]` | Mniej gwałtownych zmian wysokości. |
| `DIFFICULTY.speed` | `[140, 215]` | **Bez zmian** | Nie przyspieszać świata kosztem czytelności. |
| `PICKUPS.chance`, bonusy, ciężar i zanik | Jak w `config.ts` | **Bez zmian** | Wpływ ciężaru na bota jest nieintuicyjny; wymaga testu na ludziach. |

### Gotowy diff do decyzji koordynatora — tylko `src/core/config.ts`

```diff
-export const KM_PER_PX = 0.05;
+export const KM_PER_PX = 0.055;

 export const DIFFICULTY = {
-  rampSeconds: 75,
+  rampSeconds: 90,
   /** Pierwsze sekundy świadomie łagodne. */
-  graceSeconds: 12,
+  graceSeconds: 14,
   speed: [140, 215],
-  gap: [215, 150],
-  spacing: [260, 225],
+  gap: [220, 165],
+  spacing: [270, 235],
   /** Maks. zmiana środka szczeliny między kolejnymi przeszkodami. */
-  maxGapShift: [80, 150],
+  maxGapShift: [80, 135],
 } as const;
```

**Warunek wdrożenia:** po zmianie rdzenia uruchomić tę samą symulację (te same ziarna), sprawdzić przede wszystkim medianę początkującego 10–25 s i dojazdy sprawnego/eksperta, zweryfikować problemy z wagą i uzupełnić testy przejazdów osób rzeczywistych. Zmiana `KM_PER_PX` musi być spójna również z backendowym `replay` i weryfikacją wyników — nie łączyć wyników przed i po aktualizacji w jednym sezonie bez wersjonowania.

## Pytania do koordynatora

1. Czy w lidze zachować **sumę rzeczywistych km**, mimo znanej przewagi długich tras, czy wprowadzić znormalizowane punkty oraz ewentualnie wyrównać czasy dojazdu?
2. Jak definiujemy „dobrego gracza”: ekspert czy sprawny? Kryterium 60–150 s mówi o czasie dotarcia, ale nie określa minimalnego % dojazdów do mety.
3. Czy wpływ ciężaru ma być zawsze odczuwalnym utrudnieniem, nawet jeśli obecny autopilot miejscami korzysta na szybszym opadaniu?