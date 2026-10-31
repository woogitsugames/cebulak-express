# Firebase — produkcja, emulator i integracja gry

Backend Ligi Polonii używa Cloud Functions 2. generacji (**Node 22, region `europe-west1`**), Firestore, Anonymous Authentication i emulatorów. Symulacja przejazdu jest kompilowana z tego samego `src/core/` co klient (przez esbuild), więc nie wolno utrzymywać drugiej kopii logiki gry.

## 1. Projekt Firebase i limity kosztów

1. Zaloguj się na [Firebase Console](https://console.firebase.google.com/) i utwórz **nowy projekt** (np. `cebulak-express-prod`); ID projektu jest niezmienne.
2. W projekcie wybierz **Build → Firestore Database → Create database**. Wybierz lokalizację `europe-west1` (Belgia); po utworzeniu nie można swobodnie zmieniać regionu bazy. Reguły z repo wdrożymy poniżej.
3. W **Authentication → Sign-in method** włącz **Anonymous** i zapisz. Klient nie ma kont imiennych.
4. W **Usage and billing → Modify plan** przełącz projekt na **Blaze (pay as you go)**. Funkcje 2. generacji i harmonogram wymagają rozliczania. W Google Cloud Billing utwórz budżet, np. 10–20 EUR/mies., i alerty na 50%, 90% i 100% (kwota jest decyzją właściciela).
5. **Ważne:** budżet Google Cloud to *powiadomienia*, a **nie twarda blokada wydatków**. Monitoruj billing, ustaw limity/kwoty usług i ograniczenia liczby instancji funkcji przed kampanią; reaguj na alerty. Nie aktywuj projektu produkcyjnego bez własnych progów bezpieczeństwa.
6. Dodaj aplikację **Web** w ustawieniach projektu (ikona `</>`), zapisz wyświetloną konfigurację Firebase Web SDK. Nie dodawaj konta usługi ani klucza prywatnego do przeglądarki.

## 2. Lokalna konfiguracja CLI i wdrożenie

W katalogu głównym repo:

```bash
npm ci
npm install --prefix functions --package-lock=false --no-audit --no-fund
cp .firebaserc.example .firebaserc
# Edytuj .firebaserc i zastąp YOUR_FIREBASE_PROJECT_ID prawdziwym ID.
npx --prefix functions firebase login
npm --prefix functions run build
npm --prefix functions run test:unit
npm run test:firebase
```

`functions/.env.example` można skopiować do `functions/.env` i ustawić:

```dotenv
REQUIRE_APP_CHECK=false
ANALYTICS_ALLOWED_ORIGINS=https://twoj-portal.example,capacitor://localhost,https://localhost
```

- Zastąp `https://twoj-portal.example` **każdą prawdziwą domeną** hostującą grę lub analitykę, oddzielając wartości przecinkami, bez końcowego `/`.
- `capacitor://localhost` to źródło iOS Capacitor, `https://localhost` to typowe źródło Android Capacitor; oba muszą pozostać dopuszczone, jeżeli aplikacja ma wysyłać analitykę.
- W środowisku developerskim możesz dodać `http://localhost:5173`, ale usuń je z produkcyjnej listy, jeśli nie jest potrzebne.
- `REQUIRE_APP_CHECK=true` włącz **dopiero po** przygotowaniu App Check na web/Android/iOS; w przeciwnym razie callable functions będą odrzucać legalnych graczy.
- Allowlista dotyczy żądań z nagłówkiem `Origin`; **CORS nie jest autoryzacją**. Puste `ANALYTICS_ALLOWED_ORIGINS` powoduje obecnie szerokie dopuszczenie originów, więc nie zostawiaj jej pustej w produkcji.

Po zaliczeniu testów:

```bash
./functions/node_modules/.bin/firebase --config firebase.json deploy --only firestore:rules,firestore:indexes,functions --project YOUR_FIREBASE_PROJECT_ID
```

`firebase.json` wykonuje predeploy budujący funkcje. Dla funkcji użyto `functions/package.json` z `main: "index.js"`; `functions/index.js` eksportuje `startRun`, `submitRun`, `cleanupExpiredRuns` i `collectEvents` z `lib/index.js`. Katalog `functions/` jest oddzielny od pliku `firebase.json`: loader Functions wykrywa wszystkie cztery funkcje bez pośredniego pliku `firebase.js`.

## 3. Zmienne środowiskowe Vite (web, Android, iOS)

Skopiuj plik `.env.example` do lokalnego `.env` **w katalogu głównym** i wpisz wartości z **Project settings → Your apps → Web app → SDK setup and configuration**:

```dotenv
VITE_FIREBASE_API_KEY=twoje-web-api-key
VITE_FIREBASE_AUTH_DOMAIN=twoj-projekt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=twoj-projekt
VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_STORAGE_BUCKET=twoj-projekt.firebasestorage.app
```

Wymagane do przełączenia mocka na prawdziwy backend: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`. Pozostałe dwa pola są opcjonalne i powinny pochodzić z tej samej aplikacji Firebase. Zmienne `VITE_*` są **publiczne** — są wbudowane w bundle przeglądarkowy, więc **nigdy nie umieszczaj w nich sekretów, tokenów serwera ani kluczy kont usługowych**.

Po konfiguracji wykonaj `npm run build` oraz w razie budowy natywnej `npx cap sync android`/`npx cap sync ios`. Dla niezależnej dystrybucji wersja z konfiguracją musi zostać zbudowana na każdą platformę. Bez kompletu czterech podstawowych zmiennych `createRankingApi()` wybiera lokalny mock, a kod SDK Firebase nie jest dynamicznie importowany.

## 4. Testy i CI

```bash
npm ci
npm run typecheck
npm test
npm run build
npm --prefix functions run build
npm --prefix functions run test:unit
npm run test:firebase
```

Test emulatorów wymaga **Node 22 i Java 21**, testuje callable Functions i reguły Firestore (w tym **publiczny odczyt `daily/{date}/entries`**). `.github/workflows/firebase.yml` konfiguruje te wersje, używa cache emulatorów i uruchamia pełny zestaw na każdym PR. Projekt `demo-cebulak-express` to emulator, bez żadnego produkcyjnego zapisu.

## 5. Kontrakt rankingu i model prywatności

- `startRun({ mode: 'ranked' | 'daily', home, from, to, daily? })` zwraca `runId, seed, issuedAt` i wymaga anonimowego Firebase Auth.
- `submitRun({ runId, flapTicks, ticks, km, nickId })` odtwarza grę, odrzuca duplikaty, sprawdza czas i ziarno. `nickId` musi pochodzić z generatora `src/content/nicks.ts`, nie z wpisywanego przez użytkownika tekstu.
- Publiczne odczyty: `league/{week}`, `leaderboard/{week}/entries`, `daily/{day}/entries`, gdzie `{week}`/`{day}` mają prefiks sezonu, np. `r2_2026-W44` (wersja zasad `RULES_VERSION`, zob. `docs/sezony-rankingu.md`). `startRun`/`submitRun` wymagają bieżącego `rulesVersion`; starszy wynik dostaje `old_rules`. Wszelkie zapisy klientów są zablokowane; własny dokument `players/{uid}` można tylko odczytać.
- Zbiory `runs`, `_runStarts`, `_submissionLimits` oraz członkostwo krajów są prywatne. Retencja i dodatkowe ograniczenia dostępu opisane są w `PRIVACY.md`.
- Region callable Functions: `europe-west1`. `daily` ma ten sam deterministyczny seed dla wyzwania dnia. Wyniki dzienne nie zwiększają rankingu tygodniowego.

## 6. Kontrola produkcyjna

Przed udostępnieniem graczom sprawdź test Anonymous Auth i oba callable na docelowym projekcie, odczyt rankingu z niezalogowanej przeglądarki, odczyt daily, ochronę zapisów regułami, analitykę z domen portali i z aplikacji Capacitor, koszty oraz App Check. Zwróć uwagę na opóźnienia cold start i limity transakcji Firestore przy dużej liczbie graczy. **Żadne realne wdrożenie nie jest częścią testów CI.**
