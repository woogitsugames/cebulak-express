# PWA — instalacja, offline i aktualizacje

## Implementacja

Wykorzystujemy natywny Service Worker i mały plugin Vite (`scripts/pwa-plugin.ts`), **bez kolejnych zależności npm**. Uzasadnienie: pełna kontrola nad pobieraniem, prosty zakres reguł, brak dodatkowych paczek runtime. Plugin dodaje `<link rel="manifest">` w trakcie `vite build`, nie dotykając należącego do koordynatora `index.html`. W trybie `vite dev` rejestracja PWA jest wyłączona.

- `public/manifest.webmanifest`: `fullscreen`, orientacja pionowa, `#1b2733` (`--bg` w `src/style.css`), `start_url`/`scope` względne (obsługa instalacji na podścieżce, np. `/gra/`).
- `src/pwa/sw.js`: szablon service workera. Plugin Vite emituje do `dist/sw.js` listę rzeczywistych plików zbudowanych przez Vite (w tym HTML, JS/CSS, grafiki importowane w kodzie), manifest, wymagane ikony oraz skrót SHA-256 kodu i plików `public/` jako wersję.
- Wszystkie pliki z precache muszą pobrać się poprawnie przed aktywacją workera (`cache.addAll`). Pliki w `assets/` są obsługiwane `cache-first`, w tym grafiki krajów doczytywane podczas gry (runtime cache ograniczony do 120 pozycji); wejścia HTML — `network-first`, a offline fallback do `index.html` z tej samej wersji.
- Żądania poza domeną gry, żądania nie-GET i ścieżki `api/`, `__/` i `firebase/` **nie są przechwytywane**. Dotyczy to m.in. API Firebase i jego hostów zewnętrznych. Dane rankingu pozostają tylko online; błąd backendu nie może zablokować lokalnej rozgrywki.
- Nowy build ma nowy skrót. Po instalacji nowy worker wykonuje `skipWaiting()` i `clients.claim()`, czyści **tylko** wcześniejsze cache tego samego scope. Rejestrator przeładowuje kontrolowaną kartę jednokrotnie po `controllerchange` — priorytetem jest brak zawieszenia na starej wersji. Może to przerwać trwającą rozgrywkę; ewentualne opóźnianie aktualizacji do menu musi uzgodnić koordynator.
- Przy pierwszym pobraniu strony `install` działa w tle: offline jest gwarantowany **po zakończeniu instalacji SW**, nie zanim przeglądarka pobierze wszystkie pliki do precache. Assety z `public/assets/` niewłączone do precache będą dostępne offline tylko, jeśli wcześniej pobrał je kontrolujący SW.

## Ikony tymczasowe

Plugin generuje wyłącznie przy braku plików w `public/assets/brand/` trzy własne, proste PNG: `icon-192.png` (192×192), `icon-1024.png` (1024×1024) i `icon-maskable-512.png` (512×512). Nie trafiają do repo ani do folderu graficznego należącego do zlecenia 10, tylko do `dist/`. Autor/generator: skrypt własny `scripts/pwa-plugin.ts`; licencja: do użytku w projekcie. To zaślepki, **nie docelowe logo**. Zlecenie 10 dostarczy 1024 i maskable 512; koordynator powinien dodatkowo dostarczyć pomniejszoną wersję 192×192 o tym samym wzorze. Po umieszczeniu plików w `public/assets/brand/` generator automatycznie przestaje je nadpisywać.

## Integracja — obowiązek koordynatora

Do `src/main.ts` (na końcu pliku) dopisać:

```ts
import { registerPwa } from './pwa/register';
void registerPwa();
```

Nie umieszczamy wywołania w tym PR, ponieważ `src/main.ts` jest plikiem koordynatora. Bez niego manifest będzie linkowany przez Vite, ale service worker **nie będzie rejestrowany automatycznie**, zatem instalacja offline nie będzie jeszcze gotowa. Dla jednoplikowego `build:artifact` HTML może zawierać link manifestu (zignorowany poza hostowaną grą), ale SW się nie uruchomi.

`registerPwa()` pomija `Capacitor.isNativePlatform()`, iframe, HTTP poza localhost, przeglądarki bez SW i build development. Osadzenie w iframe nie próbuje instalować aplikacji; unika to problemów z partycjonowanymi danymi i politykami osadzania. Istniejący worker wcześniej zainstalowanej gry na tej samej domenie nadal może kontrolować URL w iframe — sam warunek `window.top` nie wyrejestrowuje SW.

## Testy

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# W drugim terminalu (Chromium / Chrome + Node 22):
node scripts/pwa-smoke.mjs http://127.0.0.1:4173/
```

Test Chromium rejestruje SW samodzielnie (bez edycji `main.ts`), czeka na instalację, odświeża aplikację, wymusza tryb offline i sprawdza start oraz dostępność ikony. Testy Vitest sprawdzają m.in. rzeczywisty kod SW uruchomiony w izolowanym kontekście: offline HTML/JS, sieć dla HTML, cache-first assetów, wykluczenia Firebase/API i usuwanie starych cache.

GitHub Actions (`.github/workflows/pwa-audit.yml`) uruchamia build + test Chromium + Lighthouse **Performance** i zapisuje raport JSON jako artefakt. Od Lighthouse 12 (2024) **nie istnieje już osobna kategoria ani ocena PWA**; jej testy instalacji/offline zastąpiliśmy testem Chromium. Wynik Lighthouse Performance należy odczytać z joba `PWA / Lighthouse` i opisać w PR po wykonaniu workflow.

### Ręczna kontrola po podpięciu modułu

1. Uruchom zbudowaną grę pod HTTPS albo na `localhost` poza iframe.
2. Chrome DevTools → Application → Manifest: sprawdź nazwę, ikony i brak błędów instalacji; zainstaluj aplikację.
3. Chrome DevTools → Application → Service Workers: sprawdź aktywny SW i jego zakres; ustaw Network → Offline, uruchom ponownie zainstalowaną aplikację.
4. Wdróż nowszy build, wróć online i ponownie otwórz stronę; sprawdź zmianę wersji cache, jednorazowe przeładowanie oraz brak starych cache z poprzedniej wersji.
5. W osobnym oknie osadź grę przez iframe: rejestrator nie powinien tworzyć nowego workera. Przetestuj także aplikację w Capacitor.
