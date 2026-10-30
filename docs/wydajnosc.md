# Wydajność na słabych telefonach — zlecenie 63

## Zakres i punkt odniesienia

- Punkt odniesienia `main`: `5ce599b8486a57fb36556e494d9d0e5a7d1141bb`.
- Render: Canvas 2D, obrazy źródłowe @3x, bez zmian w `src/core/`.
- Na `main` z chwili rozpoczęcia nie było jeszcze UI ustawień ze zlecenia 49. Dostępny jest tryb `auto | always | off` oraz klucz lokalny `ce.performanceMode`; koordynator może podłączyć go do UI.
- W trybie normalnym przy DPR >= 3 i pamięci nieograniczonej obrazy są renderowane jak poprzednio.

## Optymalizacje

1. **Dekodowanie do rozdzielczości ekranu:** przy odpowiednio niskim DPR lub `navigator.deviceMemory` loader przekształca PNG @3x do `ImageBitmap` przy użyciu `createImageBitmap({ resizeWidth, resizeHeight, resizeQuality: 'high' })`. Po powodzeniu zwalnia źródłowy element `Image`. Gdy API nie działa, używa bezpiecznego fallbacku do oryginału.
2. **Pamięć:** domyślny limit 48 mln pikseli, przy 4 GiB lub mniej — 16 mln, przy 2 GiB lub mniej — 8 mln. Przy małej pamięci cache trzyma najwyżej dwa zestawy krajów (bieżący i następny albo poprzedni podczas przenikania), a także najwyżej dwie panoramy. Nie kasuje grafik podczas `drawImage`, tylko przy zmianie etapu lub po pobraniu.
3. **Tryb oszczędny:** po 3 s ze średnią poniżej 45 FPS przełącza się na mniejszą liczbę warstw (bez chmur) i letnie warianty grafik (bez śniegu). Powrót do pełnej jakości następuje po 10 s z co najmniej 55 FPS. Przełączenie nie wpływa na fizykę ani punktację.
4. **Brak nowych zależności npm** i brak zmian w `src/core/`, `src/main.ts` i `src/render/renderer.ts`.

### Teoretyczny koszt pojedynczego obrazu 1080×1920

| Wariant | Piksele po dekodowaniu | Pamięć RGBA (MiB) | Zmiana względem @3x |
|---|---:|---:|---:|
| Oryginał @3x | 2 073 600 | 7,91 | — |
| Po skalowaniu @2x | 921 600 | 3,52 | −55,6% |
| Po skalowaniu @1,5x | 518 400 | 1,98 | −75,0% |

To **obliczenia rozmiaru bitmap**, nie pomiary całego procesu ani obietnica redukcji całkowitej pamięci WebView. Przejściowo podczas dekodowania mogą istnieć źródło i bitmapa jednocześnie.

## Pomiary przed/po

Raport powstaje z pomiarów **tego samego scenariusza** na wersji bazowej i zmodyfikowanej:

- Chromium z emulacją Pixel 7, CPU throttling 4× oraz 6×.
- `?test=1&seed=7`, tryb łagodny, tap autopilota co 550 ms i restart po kolizji.
- 30 s rzeczywistego czasu gry na każdy profil CPU.
- Średni FPS i długie klatki >33 ms z `requestAnimationFrame`; pamięć sterty JS z `performance.memory`; liczba aktywnych dekodowanych grafik z sondy `Image` / `createImageBitmap` wykorzystującej `WeakRef`.

**Status pomiarów:** do uzupełnienia po wykonaniu benchmarku w GitHub Actions. W środowisku sesji nie ma dostępu do pełnego klonu repozytorium i zależności npm; wpisanie wartości FPS bez uruchomienia Chromium byłoby fikcją. Workflow `.github/workflows/perf-63.yml` automatycznie uruchamia dwa pomiary, dołącza JSON i plik Markdown jako artefakty oraz drukuje tabelę przed/po w podsumowaniu zadania.

| Profil | FPS przed | FPS po | Klatki >33 ms przed/po | Szczyt JS heap przed/po | Obrazy po dekodowaniu przed/po |
|---|---:|---:|---:|---:|---:|
| CPU 4× | pomiar CI | pomiar CI | pomiar CI | pomiar CI | pomiar CI |
| CPU 6× | pomiar CI | pomiar CI | pomiar CI | pomiar CI | pomiar CI |

### Lokalne uruchomienie

```bash
npm ci
npx playwright install chromium
npm run typecheck && npm test && npm run build && npm run test:e2e
node tools/perf/run.mjs --app=. --label=po --out=perf-after.json
# Zbuduj bazowe main w osobnym katalogu, używając źródeł z tego samego SHA:
node tools/perf/run.mjs --app=/tmp/cebulak-main --label=przed --out=perf-before.json
node tools/perf/compare.mjs perf-before.json perf-after.json --out=docs/wydajnosc-pomiary.md
```

Nie należy interpretować `performance.memory` jako pamięci grafiki GPU. Pomiar liczby obrazów z `WeakRef` zależy od czasu działania garbage collectora. Pomiary na fizycznych urządzeniach Android z 2–3 GiB RAM pozostają dodatkowym etapem walidacji.

## Integracja z ustawieniami (koordynator)

API: `renderer.background.setPerformanceMode('auto' | 'always' | 'off')` oraz `renderer.background.isReducedQuality()`. Domyślnie odczytywany jest `localStorage.getItem('ce.performanceMode')` — wartości `auto`, `always` i `off`. Przełącznik z zadania 49 powinien aktualizować magazyn ustawień oraz wywoływać setter. Żaden kod w `main.ts` nie został zmodyfikowany.

Jeśli w osobnym PR pojawią się cząsteczki śniegu niezależne od `BackgroundRenderer`, koordynator powinien przekazać `isReducedQuality()` do ich renderera, żeby również je wyłączać.

## Pliki

- `src/render/performance.ts` — dobór limitów i automatyczny detektor spadku FPS.
- `src/render/assets.ts` — skalowanie i bezpieczny cache bitmap.
- `src/render/background.ts` — obsługa przejść między krajami i trybu oszczędnego.
- `tests/performance-mode.test.ts` — testy polityki RAM, skalowania, zwalniania i adaptacji.
- `tools/perf/run.mjs`, `tools/perf/compare.mjs` — benchmark i porównanie.
- `.github/workflows/perf-63.yml` — pomiar bazowej i zmienionej wersji w jednym runnerze.
