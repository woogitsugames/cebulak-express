# Backend Ligi Polonii — Firebase

Folder zawiera Cloud Functions (2. generacja, TypeScript, Node 22), zabezpieczony Firestore i testy emulatorów. Funkcje używają dokładnie tego samego kodu symulacji, co klient: importy z ../../src/core/game.ts, ../../src/core/route.ts oraz ../../src/core/rng.ts są bundlowane przez esbuild. Nie należy kopiować ani niezależnie modyfikować logiki rdzenia w backendzie.

## Uruchomienie projektu

1. Utwórz projekt w konsoli Firebase, wybierz europejską lokalizację bazy Firestore, np. europe-west1. Włącz rozliczanie Blaze (wymagane do wdrażania Cloud Functions 2. generacji i zadania harmonogramu); skonfiguruj alerty budżetowe.
2. W Authentication → Sign-in method włącz Anonymous. Nie włączaj kont email/hasło w miejsce logowania anonimowego.
3. Skopiuj .firebaserc.example do .firebaserc i wpisz ID projektu Firebase. Plik .firebaserc pozostaje lokalny.
4. Uruchom poniższe komendy w katalogu głównym repozytorium:

~~~bash
npm ci
npm install --prefix firebase --package-lock=false --no-audit --no-fund
npm run typecheck
npm test
npm run build
npm run test:firebase
~~~

Testy emulatora wymagają Java 21 i Node 22. Uruchamiają serwisy Auth (9099), Firestore (8080) i Functions (5001) w odrębnym zadaniu, aby zwykłe testy webowe nie potrzebowały Javy. Jednostkowe testy backendu: npm --prefix firebase run test:unit.

## Wdrożenie

~~~bash
npm install -g firebase-tools@14.12.0
firebase login
firebase deploy --only firestore,functions
~~~

W firebase.json jest predeploy budujący backend z src/index.ts do firebase/lib/index.cjs. Użyto esbuild z opcją --packages=external, która pakuje lokalny src/core oraz src/content/waypoints, lecz pozostawia zależności firebase-admin i firebase-functions do instalacji przez środowisko Functions. Firebase deploy uruchom z katalogu głównego repozytorium.

## Kontrakt dla klienta (zlecenie 12)

Klient inicjalizuje publiczną konfigurację aplikacji Firebase (apiKey, authDomain, projectId, appId; opcjonalnie messagingSenderId), loguje się przez signInAnonymously, wybiera region europe-west1 i korzysta z dwóch callable functions:

~~~ts
startRun({ mode: 'ranked' | 'daily', home, from, to, daily?: 'YYYY-MM-DD' })
// -> { runId: string, seed: number, issuedAt: number }

submitRun({ runId, flapTicks: number[], ticks: number, km: number, nickId: string })
// -> { accepted: boolean, km: number, reason?: string, week: string,
//      countryRankKm?: number, playerBestKm?: number }
~~~

- Serwer losuje seed dla ranked; dla daily używa seedFromString('daily:' + date). Data daily musi być aktualną datą w Europe/Warsaw (można pominąć).
- Klient uruchamia zwykły Game({ seed, mode: 'ranked', route: makeRoute(home, from, to) }) także dla daily. Musi przekazać dokładne game.flapTicks, game.ticks i game.km.
- Pierwszy flap ma tick 0. Przejazd można zgłosić tylko raz, do 30 minut od wydania seeda. Symulacja ma limit 10 minut (72 000 ticków), a liczba tapnięć nie przekracza ticks / 6.
- Serwer porównuje wynik, ticki, zakończoną fazę oraz odtworzoną sekwencję tapnięć. Wymaga, aby realny czas od startu stanowił co najmniej 90% czasu gry.
- Minimalna przerwa między zgłoszeniami to 3 sekundy, maksymalnie 500 zgłoszeń na UID na dobę UTC. Nowe przejazdy: minimum 1 sekunda odstępu, maksymalnie 600 na dobę UTC. Rejected submission zużywa próbę, duplicate nie; rate_limited nie zużywa runId.
- Tydzień obliczany jest wg daty rozpoczęcia przejazdu w Europe/Warsaw (poniedziałek 00:00, ISO week). Daily nie zwiększa Ligi i nie aktualizuje tygodniowego rankingu.
- NickId jest tymczasowo sprawdzany regexem [a-z0-9-]{3,40}. Po włączeniu src/content/nicks.ts zlecenia 13 należy podłączyć kontrolę członkostwa w słowniku.
- Dla pojedynczego wyniku rejected zwracane są reason: replay_mismatch, too_fast, expired, rate_limited, bad_nick lub duplicate. Niepoprawna struktura wywołania, cudzy runId lub brak Auth dają kod błędu HTTPS callable.

## Odczyty Firestore i indeksy

- league/{week}: dokument z countries.{BE,NL,DE,UK,FR,CH,NO,DK}.{km,runs,players} oraz updatedAt. Pole players oznacza unikalną liczbę UID w danym kraju w tygodniu (pomocnicza kolekcja _members); powrót tego samego UID nie zwiększa tej liczby. Przejazdy z różnych wybranych krajów są liczone oddzielnie.
- leaderboard/{week}/entries/{uid}: nickId, home, bestKm, at. Zapytanie orderBy('bestKm', 'desc') używa automatycznego indeksu jednopolowego Firestore. Definicja indeksu złożonego w firestore.indexes.json wspiera dodatkowo where('home', '==', ...).
- players/{uid}: własny profil gracza, rekord globalny z zaakceptowanych przejazdów i ostatnio użyty kraj/nick.
- daily/{day}/entries/{uid}: najwyższy zaakceptowany wynik danego dnia, niedostępny bezpośrednio klientom (przyszły widok dzienny wymaga zmiany reguł lub osobnego API).
- runs/{runId}, _runStarts, _submissionLimits oraz league/{week}/_members są niedostępne bezpośrednio dla klientów.

Reguły zezwalają na publiczny odczyt league i leaderboard/entries, odczyt tylko własnego players/{uid}, a wszystkie zapisy blokują. Zmiany stanu gry wykonują wyłącznie funkcje Admin SDK. Liczniki kraju aktualizowane są transakcją (jeden dokument tygodniowy); przy dużym ruchu może to powodować contention — przejście na sharded counters i agregację należy rozważyć przed kampanią o znacznym natężeniu.

## App Check, bezpieczeństwo i sekrety

App Check jest opcjonalny: skopiuj firebase/.env.example do firebase/.env i ustaw REQUIRE_APP_CHECK=true dopiero po skonfigurowaniu App Check dla web/Android iOS. Wymaga to ponownego wdrożenia funkcji. W emulatorze domyślnie false. Anonymous Auth nie dowodzi, że gracz jest człowiekiem; replay dowodzi zgodności wejść z symulacją, lecz nie zapobiega botom samodzielnie grającym poprawne przejazdy. Dodatkowo warto monitorować liczbę nowych anonimowych użytkowników, koszty i nadużycia App Check.

Konfiguracja webowa Firebase jest publiczna i trafia do klienta. NIE commituj kluczy kont usługowych, plików .env z prawdziwymi danymi, .firebaserc, tokenów CLI, plików Android google-services.json/keystore ani jakichkolwiek poświadczeń. Nie zapisujemy IP ani identyfikatorów urządzeń w Firestore. Patrz PRIVACY.md.

## Ograniczenia i integracja

- Nie ma tu SDK frontendowego ani zmiany src/main.ts — koordynator scala wywołania z modułem zlecenia 12.
- Listę nicków z zadania 13 trzeba dodać do walidacji po scaleniu.
- Wynik z daily wpływa na osobisty globalny bestKm, ale nie na tygodniową Ligę ani leaderboard.
- Na emulatorze App Check jest wyłączony; działanie wymuszonego App Check i obciążenia produkcyjnego wymaga oddzielnej weryfikacji.
