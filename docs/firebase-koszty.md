# Firebase — App Check, koszty, alarmy i ochrona przed nadużyciami

Stan konfiguracji i założenia: 30.10.2026. Projekt korzysta z Firestore Standard, Firebase Functions v2 (europe-west1), anonimowego Firebase Auth i własnego odtwarzania przejazdu w funkcji submitRun. To **szacunek**, nie faktura ani gwarancja kosztu.

## 1. App Check — co musi zrobić właściciel

1. W Firebase Console > App Check zarejestruj osobno aplikacje:
   - **Web/PWA:** reCAPTCHA Enterprise; skopiuj **site key** (publiczny) do zmiennej Vite **VITE_RECAPTCHA_SITE_KEY**. Dodaj dokładne domeny web/PWA, na których uruchamia się gra (również domeny osadzenia, jeżeli są obsługiwane).
   - **Android:** Play Integrity. Podłącz aplikację Android do Firebase i Google Play, zarejestruj poprawne podpisy SHA-256 (również podpis Play App Signing). Zainstaluj właściwy plik konfiguracyjny poza repo.
   - **iOS:** App Attest od iOS 14, DeviceCheck na iOS 13. Skonfiguruj Apple Developer / App ID, klucz DeviceCheck i plik GoogleService-Info.plist poza repo. Dla SwiftPM jest ustawiony symlink pluginu w capacitor.config.ts.
2. Klient importuje Firebase dopiero po pełnej konfiguracji VITE_FIREBASE_*. Brak konfiguracji oznacza **MockRankingApi** — gra działa jak dotychczas, bez App Check i połączenia z backendem. Niekompletna konfiguracja **site key** w Web nie uruchamia App Check; z włączonym enforcement backend odrzuci wtedy callable.
3. Po instalacji zależności uruchom **npx cap sync android** / **npx cap sync ios**. Sprawdź tokeny App Check na realnych urządzeniach oraz w konsoli Firebase (metryki poprawnych/niepoprawnych żądań).
4. **Nie włączaj od razu enforcement.** Najpierw wypuść wersję klienta, obserwuj prawidłowo atestowane wywołania, potem skonfiguruj w środowisku Functions **REQUIRE_APP_CHECK=true** i wdróż funkcje. Obie callable startRun i submitRun mają enforceAppCheck zależne od tej zmiennej. W Firebase Console włącz enforcement Firestore dopiero wtedy, gdy wszystkie aktywne wersje web/PWA i aplikacji mobilnych potrafią dostarczyć token.
5. Lokalnie bez backendu i bez .env nie trzeba ustawiać żadnych kluczy. Do testów emulatorów App Check można używać providerów debug, ale **nie** w kompilacjach produkcyjnych i **nie** commitować tokenów debug. Klucz witryny reCAPTCHA nie jest sekretem; prywatnych kluczy Apple i konfiguracji serwerowej nie umieszcza się w repo.

Wtyczka natywna: **@capacitor-firebase/app-check 8.5.2**, zgodna z Capacitor 8, opublikowana ponad 14 dni przed 30.10.2026; wersja przypięta w package.json i package-lock.json. Jej opcjonalny peer Firebase deklaruje wersję 12.6+, natomiast projekt obecnie używa JS SDK 11.10.0. Atestacja natywna jest przekazywana do JavaScript przez CustomProvider, lecz **należy wykonać próbę integracyjną na Androidzie i iOS** przed uruchomieniem enforcement; podwyższenie Firebase JS SDK należy przetestować osobno.

## 2. Analityka i antyboty

**collectEvents**:
- Akceptuje tylko POST, schemat wersji 1, maksymalnie 40 zdarzeń i 16 KiB na żądanie (również gdy rawBody jest niedostępne).
- **ANALYTICS_ALLOWED_ORIGINS**: lista originów oddzielonych przecinkami, np. https://gra.example,https://www.example,https://localhost. Gdy jest ustawiona, żądanie bez Origin lub z innym Origin dostaje 403. Dołącz rzeczywiste originy Capacitor WebView po weryfikacji na urządzeniach; mogą się różnić między Androidem i iOS. Pusta lista jest przeznaczona do lokalnego rozwoju, nie do otwartego produkcyjnego HTTP.
- Limit: 30 żądań na 60 sekund na hasz adresu IP (losowa sól HMAC na instancję, w RAM). Maksymalnie 4096 kluczy na instancję; odpowiedź 429 + Retry-After. Adres IP i hasz **nie** trafiają do Firestore ani logów.
- To **best effort**: instancje nie współdzielą licznika; sieci NAT współdzielą limit, a Origin można podrobić poza przeglądarką. Dla większego ruchu rozważ Cloud Armor / API Gateway / globalny limiter. Funkcja ma maxInstances=10; analityka zapisuje wyłącznie dzienne agregaty.

**submitRun**:
- Najpierw obowiązuje istniejące odtworzenie symulacji i blokady UID/duplikatów/tempo. Dla poprawnego przejazdu wykrywane jest >=16 tapnięć z odstępami prawie stałymi (>=92% odchyleń najwyżej 1 tick) i co najmniej pięć kolejnych dotarć do celu na tym samym anonimowym UID.
- W runs/{id} zapisujemy **flagged: true/false** i **flagReasons: ['regular_taps' | 'perfect_streak']**, a w players/{uid} techniczny licznik perfectStreak. Flaga **nie odrzuca** wyniku, nie zmienia tablicy wyników i nie dowodzi oszustwa. Do ręcznej oceny należy użyć serwerowej konsoli/admin SDK: użytkownicy nie mają dostępu do runs.
- Stare dokumenty runs oraz limity podlegają istniejącemu zadaniu cleanupExpiredRuns. Nie logujemy IP, adresów ani surowych zdarzeń.

Firestore Security Rules: odczyt pojedynczego publicznego dokumentu jest dozwolony; listy league, leaderboard/entries i daily/entries wymagają query limit nie większego niż 100. Klient już stosuje limity 30/50. Bez limitu lub przy wartości 101+ otrzymamy permission-denied. Reguły nie ograniczają sumy operacji użytkownika i nie zastępują App Check.

## 3. Szacunek miesięczny: 10 tys. i 100 tys. aktywnych graczy

Założenia *na jednego gracza w miesiącu*: 6 startów i 6 zgłoszeń wyniku, 3 paczki analityki, 2 odczyty dokumentu Ligi po cache 60 s, 2 odczyty leaderboard po 30 dokumentów, 1 odczyt daily po 50 dokumentów. W zapleczu liczmy **1 odczyt i 2 zapisy na start** oraz średnio **8 odczytów i 5 zapisów na submit**, 1 zapis dziennych agregatów na paczkę analityki. Dla CPU zakładamy **0,05 sekundy jednego vCPU na replay** — to parametr do pomiaru, nie benchmark. Ruch równomierny przez 30 dni, bez ataków; pominięto niezakończone i odrzucone próby.

| Wielkość | 10 000 graczy | 100 000 graczy |
|---|---:|---:|
| startRun + submitRun + collectEvents (wywołania) | 150 000 | 1 500 000 |
| Odczyty dokumentu league po cache | 20 000 | 200 000 |
| Odczyty leaderboard (30 pozycji x 2) | 600 000 | 6 000 000 |
| Odczyty daily (50 pozycji x 1) | 500 000 | 5 000 000 |
| Odczyty wewnętrzne start/submit | 540 000 | 5 400 000 |
| **Wszystkie odczyty Firestore** | **1 660 000** | **16 600 000** |
| **Zapisy Firestore (w tym analityka)** | **450 000** | **4 500 000** |
| Replay: liczba / założony czas CPU | 60 000 / 3 000 vCPU-s | 600 000 / 30 000 vCPU-s |

Orientacyjny rachunek za dokumenty Firestore w Standard (USD, przy stawkach **$0,03 / 100 tys. odczytów**, **$0,09 / 100 tys. zapisów** i pełnym wykorzystaniu darmowych limitów dziennych: 50 tys. odczytów i 20 tys. zapisów):

- **10 tys.**: (1,66 mln − 1,50 mln) / 100 tys. × $0,03 = **~$0,05 odczyty**; zapisy poniżej 600 tys. miesięcznie = **~$0**.
- **100 tys.**: (16,6 mln − 1,5 mln) / 100 tys. × $0,03 = **~$4,53 odczyty**; (4,5 mln − 0,6 mln) / 100 tys. × $0,09 = **~$3,51 zapisy**. Łącznie **~$8,04** za same dokumentowe operacje.
- Firebase Functions w tych scenariuszach pozostaje poniżej orientacyjnych darmowych progów 2 mln wywołań / miesiąc i 200 tys. vCPU-s / miesiąc; **to nie oznacza, że Functions kosztują zawsze $0**. Zależą również od czasu działania, pamięci, liczby instancji, egressu, cold startów i rozliczania Cloud Run.

**Ważne:** 50 tys. i 20 tys. to *limity dzienne*, a nie jeden limit miesięczny. Koncentracja ruchu w kilku dniach może zwiększyć rachunek znacznie ponad powyższe kwoty. Inne składniki: transfer Firestore/Functions, rozmiar dokumentów i indeksów, logowanie, Cloud Build, Artifact Registry, ewentualne zużycie reCAPTCHA Enterprise i limity Google Play Integrity. Nie wyceniono ich bez danych pomiarowych. Przy odrzuceniach liczba replay CPU może być mniejsza (tanie odrzucenia), ale złośliwe poprawnie uformowane zgłoszenia nadal mogą konsumować CPU. Przechowywanie dokumentów i transfer nie zostały oszacowane.

Dla budżetowania należy obserwować **rzeczywiste** getDocs / callable / CPU ze środowiska produkcyjnego, a nie same liczby aktywnych użytkowników. Czas replay zmierzyć np. w Cloud Monitoring jako czas submitRun (z oddzieleniem czasu Firestore) i przeliczyć z mnożnikiem 10× na wypadek gorszego urządzenia/większej liczby ticków.

## 4. Budżety i alerty Google Cloud — instrukcja dla właściciela

1. Otwórz **Google Cloud Console > Billing > Budgets & alerts** na koncie rozliczeniowym projektu Firebase i wybierz **Create budget**.
2. Wybierz **Alerts only**, zakres **tylko ten projekt** (wszystkie usługi), okres **Monthly** i stałą kwotę:
   - Rozruch do 10 tys. graczy: **$25/mies.**.
   - Wzrost do 100 tys. graczy: **$100/mies.**, po dwóch tygodniach porównaj z realnym zużyciem.
   Te progi są rezerwą operacyjną, nie prognozą faktury.
3. Ustaw alerty na **50%, 80%, 100% rzeczywistego kosztu** oraz **100% prognozy**. Wybierz powiadamianie właścicieli projektu / administratorów rozliczeń, opcjonalnie kanały Monitoring.
4. Osobne budżety usługowe (Cloud Firestore, Cloud Run / Cloud Functions, Artifact Registry) ułatwiają diagnozę skoków. Rozważ publikowanie budżetu do Pub/Sub i automatyczne powiadomienia, ale nie wyłączaj produkcyjnej gry automatycznie bez jawnej decyzji.
5. W **Cloud Monitoring > Alerting** dodaj monitorowanie wzrostu kosztu, liczby wywołań startRun/submitRun/collectEvents, błędów HTTP 429/403/5xx, latency p95 i obciążenia CPU. Ustaw alerty również na nagłe wzrosty odczytów/zapisów Firestore.
6. W Cloud Billing mogą być dostępne **spend cap budgets** tylko dla kwalifikujących się usług (m.in. Cloud Run i Cloud Run functions), w określonych projektach. Jeśli ta opcja jest dostępna, rozważ osobny limit **$25 / $100** na Functions z akceptacją ryzyka zatrzymania tej usługi. **Nie chroni automatycznie Firestore ani wszystkich usług.** Ze względu na opóźnienia koszt może przekroczyć próg.

**Budżet typu Alerts only nie jest limitem wydatków.** Opóźnienia danych kosztowych i przyrost podczas ataku wymagają marginesu; po alarmie trzeba sprawdzić Billing Reports i metryki usługi, ograniczyć ruch i dopiero podejmować decyzję o enforcement/skalowaniu.

## 5. Kontrola przed wdrożeniem

- Uruchom **npm ci**, **npm run typecheck**, **npm test**, **npm run build** i **npm run test:firebase** (emulatory Auth/Firestore/Functions). Testy HTTP wywołują lokalne collectEvents, nie produkcję.
- Sprawdź brak .env, brak dostępu do sieci i działanie mocku.
- Na Androidzie/iOS po cap sync wykonaj prawdziwe startRun/submitRun i zapytanie Firestore z **ważnym App Check**, przetestuj weryfikację w Firebase Console przed enforcement.
- Wybierz faktyczną allowlistę originów, sprawdź PWA w embedzie i WebView, następnie włącz ją w Functions.
- Po 24 h od wdrożenia sprawdź liczbę statusów 429, flagged runs, błędów App Check oraz kosztów. Co tydzień dostosowuj TTL, parametry limitów i progi alertów.

## Źródła i cenniki

- https://firebase.google.com/pricing
- https://cloud.google.com/firestore/pricing
- https://docs.cloud.google.com/billing/docs/how-to/budgets
- https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps
- https://firebase.google.com/docs/app-check
- https://github.com/capawesome-team/capacitor-firebase/tree/main/packages/app-check
