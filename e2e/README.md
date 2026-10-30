# Testy E2E — zlecenie 38

Testy Playwright uruchamiają produkcyjny build Vite z lokalnym rankingiem mock (bez konfiguracji Firebase). Nie zmieniają kodu aplikacji ani rdzenia.

## Uruchamianie

```bash
npm ci
npm run typecheck:e2e
npm run build
npx playwright install --with-deps
npm run test:e2e
```

CI uruchamia **trzy kolejne pełne przebiegi bez retry**, z osobnymi raportami `e2e/.results/run-1` itd. Artefakt `playwright-e2e` zawiera zrzuty ekranów, wyniki, a po błędach także trace i wideo.

## Pokrycie

- Pixel 7 (Chromium), iPhone 14 (WebKit), desktop 1280×800.
- Menu, 8 krajów i trasy, sterowanie dotykiem/klawiaturą, koniec trasy i restart.
- Tryb łagodny: 3 początkowe życia oraz koniec po kolizjach; **słoik może odnowić życie**, więc nie ma założenia o sekwencji 3→2→1→0.
- Wyzwanie dnia: tytuł w podpowiedzi, data zamrożona w teście.
- Liga Polonii: widok, zakładki, dane demonstracyjne i zamykanie bez Firebase.
- Link z końca gry: nowa karta i komplet UTM.
- Parametr `?r=be-antwerpia`: nadpisuje kraj i miasto zapisane lokalnie.
- Brak błędów konsoli i wyjątków JS; zrzuty kluczowych ekranów.
- Osobny projekt Slow 4G (150 ms RTT, 1,6 Mb/s) + CPU ×4 z limitem 2 s do pierwszej klatki. `workers: 1` uniemożliwia współbieżność pomiaru.

Wszystkie testy gry używają `?test=1&seed=20261030`; nie wykonują losowych serii tapnięć.

## Pytanie integracyjne

W `src/main.ts` seed z haka testowego bywa nadpisywany przez `api.startRun()` w trybie rankingowym (mock generuje własne ziarno). Nie zmieniano pliku należącego do koordynatora. Scenariusze E2E nie wymagają identycznych pozycji przeszkód — do pełnej deterministyczności rankingu koordynator powinien uporządkować pierwszeństwo ziaren.
