# E2E — zlecenie 22

Testy interfejsu korzystają z **Playwright 1.56.1** i uruchamiają produkcyjny build Vite przez `vite preview`. Nie ingerują w `src/core/`, `src/main.ts` ani renderer.

## Uruchomienie

```bash
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report e2e/.report
```

Można też użyć `npm run test:e2e`. Testy obejmują Pixel 7 (Chromium), iPhone 14 (WebKit) i desktop 1280×800 (Chromium). Zrzuty etapów gry są zawsze dołączane do raportu; przy niepowodzeniu zachowywane są trace i wideo. Lokalne raporty znajdują się w `e2e/.results/` oraz `e2e/.report/`; CI przesyła je jako artefakt `playwright-e2e`.

## Scenariusze

- Menu: osiem krajów, miasta startowe i polskie cele, podsumowanie trasy.
- Start, tapnięcie w Canvas, kolizja, ekran końcowy i natychmiastowy restart przyciskiem **Jeszcze raz**.
- Tryb **Łagodny**: 3 → 2 → 1 → 0 żyć.
- Powrót do menu i zmiana trasy po końcu przejazdu.
- Sterowanie spacją i przyrost wyniku w kilometrach.
- Brak `console.error` i nieobsłużonych wyjątków w każdym scenariuszu.

Do kolizji doprowadzamy przez pojedyncze tapnięcie i brak kolejnych wejść. Postać spada wówczas na podłoże, niezależnie od losowego rozmieszczenia przeszkód; testy nie są oparte na losowych seriach tapnięć ani na pikselowych snapshotach.

## Budżet wydajności

Osobny test na **Pixel 7 / Chromium** stosuje CDP: **150 ms RTT, 1,6 Mb/s down, 750 kb/s up, CPU 4×**. Instrumentuje `CanvasRenderingContext2D.fillRect` przed załadowaniem aplikacji i zapisuje do JSON:

1. **Nawigacja → pierwszy narysowany Canvas** (start gry i menu).
2. **Kliknięcie „Lecimy!” → pierwszy narysowany Canvas nowej rozgrywki**.

Obie wartości muszą wynosić **mniej niż 2000 ms**. Pomiar wykorzystuje `performance.now()` na stronie, a nie czas wykonania asercji Playwright. JSON znajduje się w artefaktach testów. Pomiar emulowany w Chromium nie zastępuje pomiarów na rzeczywistych urządzeniach; wyniki różnią się w zależności od mocy runnera.

## Integracja z main.ts (do koordynatora)

Obecnie `main.ts` używa `Math.random()` do wyznaczenia seeda i ignoruje `?seed=123&test=1`. Testy są celowo odporne na tę losowość. Po integracji sugerowany hak:

- Odczytaj `new URLSearchParams(location.search)`.
- Tylko gdy `test=1` i `seed` jest poprawną całkowitą liczbą od 0 do 4294967295, użyj jej w `newRun()`; w pozostałych przypadkach zachowaj losowanie produkcyjne.
- Zachowaj osobny losowy seed dla zwykłych sesji i nie włączaj specjalnych skrótów / ujawniania stanu gry dla użytkowników końcowych.
- Po wdrożeniu haka można dodać asercje powtarzalnego układu przeszkód dla danego seeda.

Nie modyfikowano plików należących do koordynatora.
