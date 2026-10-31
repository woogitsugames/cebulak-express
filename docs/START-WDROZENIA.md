# Start wdrożenia: instrukcja dla właściciela

Ta instrukcja prowadzi krok po kroku przez wszystko, co trzeba kliknąć przed startem gry (ok. 10–15.12.2026). Nie musisz niczego programować. Kopiujesz wartości z konsol Google do **sekretów GitHub**, a resztę robią automaty w GitHub Actions.

**Kolejność ma znaczenie:** najpierw serwer (Firebase Functions i reguły bazy), potem gra (APK, strona). Gdyby nowa gra wystartowała przed serwerem, ranking odrzucałby wyniki.

Szczegóły techniczne, jeśli będą potrzebne: `functions/README.md` (backend), `docs/firebase-koszty.md` (App Check i koszty), `docs/wydanie-android.md` (Google Play), `docs/hosting.md` (strona gry).

---

## Część A. Przygotuj (10 minut)

1. Konto Google, którym będziesz zarządzać grą. Najlepiej firmowe, nie prywatne.
2. Karta płatnicza. Firebase w planie Blaze płaci się za zużycie. Przy naszym ruchu to zwykle kilka euro miesięcznie albo nic (szacunek: `docs/firebase-koszty.md`).
3. Dostęp do repozytorium na GitHubie z uprawnieniem administratora. Sekrety dodaje się w: **Settings → Secrets and variables → Actions → New repository secret**.

> **Jak dodać sekret:** wpisz **Name** dokładnie tak jak w tej instrukcji (wielkie litery, podkreślenia). W **Secret** wklej wartość i kliknij **Add secret**. Sekretu nie da się potem podejrzeć, można go tylko nadpisać. To normalne.

---

## Część B. Projekt Firebase

### Krok 1. Załóż projekt

1. Wejdź na https://console.firebase.google.com i kliknij **Utwórz projekt** (*Create a project*).
2. Nazwa: np. `cebulak-express`. Pod nazwą widać **identyfikator projektu** (np. `cebulak-express-1a2b3`). **Zapisz go**, przyda się w kroku 5.
3. Pytanie o **Google Analytics**: **wyłącz** je. Gra ma własne, zbiorcze statystyki, a polityka prywatności obiecuje, że nie używamy Google Analytics.
4. Kliknij **Utwórz projekt** i poczekaj.

### Krok 2. Włącz plan Blaze i alarm kosztów

1. W lewym dolnym rogu kliknij **Spark** → **Upgrade** → **Blaze**. Podaj kartę. Bez tego serwer gry nie ruszy, bo funkcje działają tylko w Blaze.
2. Kreator zaproponuje **budżet**. Ustaw np. **20 EUR** miesięcznie. Google wyśle e-mail przy 50%, 90% i 100%.
3. Uwaga: budżet to tylko **alarm**, a nie blokada. Jeśli przyjdzie e-mail o 90%, napisz do Claude.

### Krok 3. Włącz anonimowe logowanie

1. Menu po lewej: **Kompilacja (Build) → Authentication → Rozpocznij**.
2. Zakładka **Sign-in method** → **Anonimowe (Anonymous)** → przełącz na **Włączone** → **Zapisz**.
3. Nic więcej tu nie włączaj. Gra nie ma kont, haseł ani logowania Google.

### Krok 4. Utwórz bazę Firestore

1. **Kompilacja → Firestore Database → Utwórz bazę danych**.
2. Lokalizacja: **europe-west1 (Belgia)**. Tego nie da się potem zmienić, więc sprawdź dwa razy.
3. Tryb: **produkcyjny** (*production mode*). Właściwe reguły wgra automat w kroku 6.

### Krok 5. Klucz do wdrożeń dla GitHuba

GitHub potrzebuje „konta technicznego”, żeby wgrywać serwer za Ciebie.

1. Wejdź na https://console.cloud.google.com/iam-admin/serviceaccounts i u góry wybierz swój projekt.
2. **Utwórz konto usługi**. Nazwa: `github-wdrozenia` → **Utwórz i kontynuuj**.
3. Dodaj role (przycisk **Dodaj kolejną rolę**, wpisz nazwę w wyszukiwarce):
   - **Administrator Firebase** (*Firebase Admin*)
   - **Administrator Cloud Functions** (*Cloud Functions Admin*)
   - **Użytkownik konta usługi** (*Service Account User*)
   - **Administrator Cloud Scheduler** (*Cloud Scheduler Admin*)
   - **Administrator Artifact Registry** (*Artifact Registry Administrator*)
   - **Administrator Service Usage** (*Service Usage Admin*)
4. **Gotowe**. Kliknij nowe konto → zakładka **Klucze** → **Dodaj klucz → Utwórz nowy klucz → JSON**. Pobierze się plik.
5. Dodaj w GitHubie sekrety:

| Nazwa sekretu | Co wkleić |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | **Całą** zawartość pobranego pliku JSON (otwórz go w Notatniku, Ctrl+A, Ctrl+C) |
| `FIREBASE_PROJECT_ID` | Identyfikator projektu z kroku 1, np. `cebulak-express-1a2b3` |
| `ANALYTICS_ALLOWED_ORIGINS` | Adresy, z których gra wysyła statystyki, rozdzielone przecinkami, bez spacji. Na start: `capacitor://localhost,https://localhost`. Po wyborze domeny dopisz ją, np. `https://twojadomena.pl` |

6. Plik JSON to klucz do projektu. Po dodaniu sekretu **usuń go z komputera** i nikomu go nie wysyłaj, także Claude.

### Krok 6. Wgraj serwer (najpierw Functions!)

1. GitHub → zakładka **Actions** → po lewej **Firebase - wdrożenie (ręczne)** → **Run workflow**.
2. Zostaw oba pola **niezaznaczone**. Kliknij zielony **Run workflow**.
3. Po kilku minutach powinien pojawić się zielony znaczek. Pierwsze wgranie trwa dłużej (5–10 min), bo Google włącza potrzebne usługi.
4. Jeśli w podsumowaniu widzisz **„pomijam: brak sekretów”**, brakuje sekretów z kroku 5.
5. Jeśli wynik jest czerwony, skopiuj link do tego uruchomienia i wyślij go Claude.
6. Sprawdź w konsoli Firebase: **Kompilacja → Functions**. Powinny być 4 funkcje: `startRun`, `submitRun`, `cleanupExpiredRuns`, `collectEvents`.
7. Przy `collectEvents` jest adres w kolumnie **Wyzwalacz** (*Trigger*), w formie `https://europe-west1-….cloudfunctions.net/collectEvents`. **Skopiuj go**, przyda się w kroku 7.

### Krok 7. Dane dla gry (aplikacja „Web”)

1. Konsola Firebase → ikona koła zębatego → **Ustawienia projektu** → na dole **Twoje aplikacje** → ikona **`</>`** (Web).
2. Nazwa: `Cebulak Express`. **Nie** zaznaczaj „Firebase Hosting”. Kliknij **Zarejestruj aplikację**.
3. Pojawi się fragment kodu z `firebaseConfig`. Przepisz każdą wartość (bez cudzysłowów) do osobnego sekretu GitHub:

| Pole w `firebaseConfig` | Nazwa sekretu GitHub |
|---|---|
| `apiKey` | `VITE_FIREBASE_API_KEY` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` |
| `appId` | `VITE_FIREBASE_APP_ID` |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` |
| adres `collectEvents` z kroku 6 | `VITE_ANALYTICS_ENDPOINT` |

Te wartości nie są tajne, bo i tak trafiają do gry. Trzymamy je w sekretach, żeby wszystko było w jednym miejscu. Pierwsze cztery są obowiązkowe. Bez nich gra działa w trybie demo, a ranking jest tylko na telefonie.

### Krok 8. App Check, czyli ochrona przed botami (przed startem, bez pośpiechu)

Kod gry obsługuje App Check. Na początek wystarczy go **przygotować**, a włączyć dopiero po teście na telefonach.

1. **Android:** Ustawienia projektu → **Dodaj aplikację** → Android. Nazwa pakietu: `com.woogitsugames.cebulakexpress`. Odcisk **SHA-256** weź z Play Console (**Konfiguracja → Integralność aplikacji → Podpisywanie aplikacji**), więc ten krok rób po części C.
2. Pobierz plik `google-services.json`. Całą jego zawartość wklej do sekretu **`GOOGLE_SERVICES_JSON`**. Pliku nie wrzucaj do repozytorium.
3. Konsola Firebase → **App Check** → Android → **Play Integrity** → zarejestruj.
4. **Strona web (gdy będzie domena):** App Check → Web → **reCAPTCHA Enterprise**. Podaj domenę gry, a otrzymany **klucz witryny** (*site key*) wklej do sekretu **`VITE_RECAPTCHA_SITE_KEY`**.
5. **Nie klikaj „Enforce”** i nie zaznaczaj „Wymagaj App Check” w kroku 6. Zrobimy to razem, gdy statystyki App Check pokażą, że prawdziwi gracze przechodzą kontrolę.

---

## Część C. Google Play

### Krok 9. Konto dewelopera

1. Wejdź na https://play.google.com/console/signup. Opłata jednorazowa wynosi 25 USD.
2. **Zalecane: konto organizacji** (decyzja D7). Potrzebny jest numer **D-U-N-S** firmy. Jeśli go nie masz, zamawia się go bezpłatnie, ale trwa to nawet kilka tygodni, więc zrób to **od razu**.
3. **Konto osobiste** jest szybsze w założeniu, ale ma warunek: konta osobiste założone po 13.11.2023 muszą przed publikacją przeprowadzić **test zamknięty z co najmniej 12 testerami przez 14 dni bez przerwy**. Przy starcie 10–15.12 test musiałby ruszyć najpóźniej ok. **20.11.2026**, a potem Google jeszcze sprawdza wniosek.
4. Weryfikacja tożsamości przez Google trwa od kilku dni. Nie odkładaj jej.

### Krok 10. Klucz podpisu aplikacji

Każda wersja w Google Play musi być podpisana tym samym kluczem. Instrukcja z gotowymi komendami jest w `docs/wydanie-android.md` (punkt 3). Możesz też poprosić Claude o przeprowadzenie przez to na Twoim komputerze. Na końcu dodaj 4 sekrety:

| Nazwa sekretu | Co wkleić |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Plik klucza `.jks` zamieniony na tekst (komenda w instrukcji) |
| `ANDROID_KEYSTORE_PASSWORD` | Hasło do pliku klucza |
| `ANDROID_KEY_ALIAS` | Nazwa klucza, np. `cebulak-upload` |
| `ANDROID_KEY_PASSWORD` | Hasło klucza (zwykle to samo) |

**Zrób kopię pliku `.jks` i haseł w dwóch bezpiecznych miejscach** (np. menedżer haseł i zaszyfrowany pendrive). Bez nich odzyskanie dostępu wymaga procedury w Google.

### Krok 11. Pierwsza wersja w Play

1. GitHub → **Actions → Android - wydanie Google Play → Run workflow**. Oba pola zostaw puste.
2. Po zielonym wyniku pobierz artefakt **cebulak-express-production-android** (zawiera plik `.aab`).
3. Play Console → **Utwórz aplikację** → potem **Testy → Testy wewnętrzne** → wgraj plik `.aab`. Pierwszy raz trzeba to zrobić ręcznie.
4. Uzupełnij formularze w Play Console: polityka prywatności (link), reklamy: **nie**, grupa docelowa, ocena treści, **Bezpieczeństwo danych**. Odpowiedzi przygotowuje `docs/sklep/data-safety.md`, a Claude pomoże je wypełnić.
5. Później, dla automatycznych wysyłek: konto serwisowe Play → sekret **`PLAY_SERVICE_ACCOUNT_JSON`** (`docs/wydanie-android.md`, punkt 6).

---

## Część D. Na koniec

### Krok 12. Dane do polityki prywatności

Polityka (`docs/prawo/polityka-prywatnosci.md`) opisuje już dokładnie, co robi gra. Brakuje danych, które znasz tylko Ty. Wyślij je Claude:

- pełna nazwa firmy lub osoby, adres i NIP/numer rejestrowy;
- adres e-mail do spraw prywatności;
- jak długo trzymać ranking i profile graczy (propozycja: ranking 90 dni, profile 12 miesięcy bez gry);
- adres strony gry (domena).

### Krok 13. Sprawdzenie gotowości

Claude uruchamia `npm run check:launch`. Lista pokazuje ✓ (gotowe), ✗ (brakuje i blokuje start) oraz ! (ostrzeżenie). Start robimy, gdy nie ma żadnego ✗.

---

## Ściąga: wszystkie sekrety GitHub

| Sekret | Krok | Obowiązkowy? |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | 5 | tak (wdrożenie serwera) |
| `FIREBASE_PROJECT_ID` | 5 | tak |
| `ANALYTICS_ALLOWED_ORIGINS` | 5 | zalecany |
| `VITE_FIREBASE_API_KEY` | 7 | tak (ranking w grze) |
| `VITE_FIREBASE_AUTH_DOMAIN` | 7 | tak |
| `VITE_FIREBASE_PROJECT_ID` | 7 | tak |
| `VITE_FIREBASE_APP_ID` | 7 | tak |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 7 | nie |
| `VITE_FIREBASE_STORAGE_BUCKET` | 7 | nie |
| `VITE_ANALYTICS_ENDPOINT` | 7 | zalecany (bez niego brak statystyk) |
| `GOOGLE_SERVICES_JSON` | 8 | przed włączeniem App Check na Androidzie |
| `VITE_RECAPTCHA_SITE_KEY` | 8 | przed włączeniem App Check na stronie |
| `ANDROID_KEYSTORE_BASE64` | 10 | tak (Google Play) |
| `ANDROID_KEYSTORE_PASSWORD` | 10 | tak |
| `ANDROID_KEY_ALIAS` | 10 | tak |
| `ANDROID_KEY_PASSWORD` | 10 | tak |
| `PLAY_SERVICE_ACCOUNT_JSON` | 11 | później (automatyczne wysyłki) |

Strona gry na Firebase Hosting (opcja „Wdróż też stronę gry” w kroku 6) potrzebuje dodatkowo **zmiennych** (zakładka *Variables*, nie *Secrets*): `SITE_ORIGIN` (np. `https://twojadomena.pl`), `SITE_CONTACT_EMAIL`, opcjonalnie `SITE_BASE_PATH` (domyślnie `/`). Automat opublikuje stronę dopiero wtedy, gdy polityka prywatności będzie uzupełniona i zatwierdzona.

**Nigdy nie wklejaj kluczy, haseł ani plików JSON do repozytorium, czatu, zgłoszeń ani maili.** Miejscem na nie są wyłącznie sekrety GitHub.
