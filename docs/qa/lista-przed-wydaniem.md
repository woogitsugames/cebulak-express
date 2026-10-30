# Lista kontrolna przed wydaniem — Cebulak Express

**Stan domyślny: NIEZATWIERDZONE.** Zaznaczaj dopiero po przedstawieniu dowodu na **tym samym buildzie**, który trafi publicznie do web/PWA, Play lub App Store. Status: `[ ]` niezweryfikowane / `[x]` potwierdzone. Niewykonany test to nie sukces.

**Identyfikacja wydania:** commit SHA: ______ · wersja web: ______ · Android versionCode/AAB: ______ · iOS build: ______ · URL produkcyjny: ______ · data: ______ · osoba zatwierdzająca: ______.

## 1. Repozytorium i bramki techniczne

- [ ] Build pochodzi z zatwierdzonego `main`, `git status` czysty, tag/commit zapisany w protokole.
- [ ] `npm ci`, `npm run typecheck`, `npm test`, `npm run build` — **PASS**, link do zielonego CI.
- [ ] `node --test tools/qa/teksty.test.mjs` i `node tools/qa/teksty.mjs` — **PASS**. Raport `docs/qa/wszystkie-teksty.md` zaktualizowany i przejrzany.
- [ ] `npm run test:e2e` na produkcyjnym buildzie lub odpowiednim preview, wynik + załączniki bez P0/P1.
- [ ] Android: test AAB release i APK debug (CI `cebulak-express-debug-apk`), podpis, `targetSdk/compileSdk 36`, rzeczywisty numer wersji i brak nieautoryzowanych uprawnień.
- [ ] iOS: zielony CI symulatora; osobno **fizyczny** iPhone, TestFlight, provisioning, zgodny Bundle ID, Privacy Manifest.
- [ ] Produkcyjny Firebase ma sprawdzone reguły i deployment funkcji; nie ma przypadkowego mocka ani nieobsłużonych błędów offline.
- [ ] Brak sekretów, keystore, certyfikatów podpisujących, prywatnych tokenów i rzeczywistych danych graczy w repo, artefaktach, źródle strony i logach.
- [ ] Potwierdzono plan odtworzenia poprzedniej wersji web/PWA oraz strategię cofnięcia AAB/TestFlight.

## 2. Licencje i spójność zasobów — WSZYSTKIE `ASSETS.md`

- [ ] Zidentyfikowano **każdy** `ASSETS.md` w `public/assets/**`, `assets/**` i `ios/**` (oraz innych używanych katalogach) — nie wystarczy jeden plik zbiorczy.
- [ ] W każdym katalogu z plikami PNG/WebP/SVG/JSON zawierającymi zasoby znajduje się aktualny `ASSETS.md` z tabelą **`plik | źródło/narzędzie | licencja | autor/uwagi`**; każda rzeczywiście używana grafika i nagranie ma wpis.
- [ ] Dla AI jest opis „wygenerowane w ChatGPT (DALL·E/GPT Image), poprawki: …”, znany zakres użycia komercyjnego i brak kopiowania rozpoznawalnej cudzej grafiki.
- [ ] Dla CC0 jest identyfikacja źródła i zachowany dowód warunków licencyjnych; dla czcionek OFL jest plik licencji i zgodność przy dystrybucji.
- [ ] Zweryfikowano ikony aplikacji, ekrany startowe Android/iOS, wszystkie warstwy 10 krajów, bohatera, skórki, przeszkody, punkty trasy, UI, karty wyniku, dźwięki i muzykę. Spis zawiera także `assets/ASSETS.md` i `ios/ASSETS.md`.
- [ ] Nie występują rzeczywiste logotypy, nawet jako parodie; samochód jest generycznym kombi, nie znanym modelem. Nie ma godła RP, flagi UE ani Atomium.
- [ ] Licencje i umowy obejmują **publiczne** użycie w grze i materiałach marketingowych; wątpliwość licencyjna = **NO-GO** dla danego pliku lub całego wydania.

Pomocniczy spis do ręcznej kontroli (nie zastępuje audytu licencji):

```bash
find public/assets assets ios -name ASSETS.md -print | sort
find public/assets assets ios -type f \( -iname '*.png' -o -iname '*.webp' -o -iname '*.svg' -o -iname '*.mp3' -o -iname '*.ogg' -o -iname '*.woff2' \) -print | sort
```

## 3. Teksty — test „babci” i kontrola zakazanych słów

- [ ] Uruchomiono `node tools/qa/teksty.mjs` na finalnym commicie; skrypt zakończył się `0` (naruszenia dają `1`), odnotowano jego stdout.
- [ ] Właściciel przeczytał **całość** `docs/qa/wszystkie-teksty.md` (teksty z `src/content/**`, `src/ui/**`, `index.html`, dodatkowo tekstowe obszary `src/main.ts`, `src/share/**`, nazwy tras z `src/core/route.ts`).
- [ ] Teksty są życzliwe dla polskich emigrantów i mieszkańców krajów goszczących. **Test babci:** czy starsza osoba zrozumie żart i nie poczuje się ośmieszona? **Test kolegi z pracy:** czy lokalny odbiorca dostrzeże sympatyczny humor, bez stereotypów?
- [ ] Przeanalizowano wszystkie losowe żarty przy kolizji, komunikaty graniczne, toast za słoik/paczkę, napisy tras, sezon „Na Wigilię!”, linki do portali, ranking oraz męską/żeńską formę nicków.
- [ ] Brak niedozwolonego nawiązania do cudzego tytułu gry i znaków towarowych; automatyczna kontrola słów (w tym „Flappy”, marki) jest zielona. Kontrola nie wykrywa logotypów na obrazach — te wymagają osobnego przeglądu.
- [ ] Brak alkoholu, wulgaryzmów, żartów politycznych lub religijnych, tragedii; słowo „cebulak” wyłącznie jako element **pełnego tytułu gry** bądź dopuszczonej nazwy skórki.
- [ ] Sprawdzone są dynamiczne teksty z backendu, teksty w grafikach, tłumaczenia sklepu i opis portali — automatyczny ekstraktor **nie** zastępuje ich ręcznej kontroli.
- [ ] Brak uciętych tekstów na małej przekątnej / przy dużej czcionce systemowej; test ekranu na żywym urządzeniu oraz screen readera wykonany.
- [ ] Każde zgłoszenie skryptu ma decyzję redakcyjną w PR/issue. **Skrypt nie poprawia tekstu automatycznie** i nie wolno go obchodzić bez akceptacji.

## 4. Prywatność i obowiązkowe deklaracje sklepowe

- [ ] Polityka prywatności jest **opublikowana** pod rzeczywistym HTTPS URL, dostępna bez logowania; link otwarto na telefonie, w Google Play, na stronie gry i (jeśli potrzebne) w App Store Connect.
- [ ] Opis administratora, danych Firebase, analityki, UID anonimowego, wyników, retencji, odbiorców danych i sposobu kontaktu zgadza się z **faktycznym** buildem i `functions/PRIVACY.md`, `docs/prawo/polityka-prywatnosci.md`, `docs/analityka.md`.
- [ ] Przeprowadzono test żądania usunięcia danych i prześledzono, jakie rekordy należą do tego samego UID (Firebase Auth, runs, leaderboard, daily, league, statystyki); nie obiecywać nieistniejącego procesu.
- [ ] `docs/sklep/data-safety.md` zostało zaktualizowane względem faktycznie obecnego backendu. Stare założenia o „braku Functions” nie są dowodem — przeprowadzić inspekcję finalnej konfiguracji.
- [ ] **Google Play → App content → Data safety** wypełniono zgodnie z realnym transferem danych: UID, gameplay, zdarzenia, identyfikatory instalacji i SDK, retencja, szyfrowanie, przetwarzanie IP przez dostawców. Nie zaznaczać bez dowodu „no data collected”.
- [ ] **Google Play → Content rating / IARC**: odpowiedzi z końcowego builda; kategorię Arcade i grupę docelową sprawdzono; zapisano faktyczny numer oceny wiekowej (nie zakładać PEGI 3 bez wyniku).
- [ ] **Google Play → Target audience and content** / zasady Families: prawdziwa grupa wieku, brak podkręcania kategorii tylko po to, by ominąć wymogi.
- [ ] **App Store Connect → App Privacy** odpowiada `ios/App/App/PrivacyInfo.xcprivacy` i rzeczywistym SDK; sprawdzono required reason APIs, dane powiązane z UID i politykę Apple.
- [ ] Zweryfikowano cookies/storage iframe, SDK, zewnętrzne portale, HTTP logs/IP po stronie dostawców, a także brak reklam profilowanych i zbędnych uprawnień.
- [ ] Prawne dokumenty (`docs/prawo/...`) zatwierdziła osoba odpowiedzialna za kwestie prawne; nie wprowadzono niezweryfikowanych obietnic „pełnej anonimowości”.

## 5. Testy ręczne na urządzeniach (wykonanie, nie tylko plan)

- [ ] Wykonano `docs/qa/plan-testow.md` na A1, A2, I1, I2, W1, W2 i WP; protokoły wraz z urządzeniami/wersjami są dołączone.
- [ ] Wszystkie 8 krajów startu i krajobrazy 10 krajów zaliczone; granice, stacje i punkty trasy na dwóch różnych celach w Polsce nie mają błędów.
- [ ] Sterowanie 1-tap, kolizje, asfalt, znajdźki, tryby rankingowy/łagodny, garaż, zapis ustawień, wynik i restart zaliczone.
- [ ] Udostępnianie wyników i rolek przetestowano z odbiorcą w WhatsApp, Messenger, Facebook oraz przez Share Sheet i fallback web.
- [ ] Liga używa realnej produkcyjnej usługi, działa online; zbadano offline, kolejkę wyników i błędny replay. Mock nie zalicza tego punktu.
- [ ] PWA instalowane pod HTTPS i uruchamiane offline **po aktywacji SW**; aktualizacja nie przerywa gry; test osadzenia w prawdziwym WordPressie z CSP zaliczony.
- [ ] Android Wstecz/Escape, orientacja, połączenie telefoniczne, tryb cichy, 0 głośności mediów, słaba sieć, tryb ciemny, czcionki systemowe i safe areas przetestowane.
- [ ] Ekrany na tanim Androidzie są płynne i czytelne; brak powtarzalnych crashy i wycieku pamięci.

## 6. Publikacja, branding i komunikacja

- [ ] Zatwierdzono finalny publiczny URL gry, domenę HTTPS, ikonę, splash, zrzuty **z rzeczywistego builda** i teksty sklepu (z prawidłową nazwą).
- [ ] Uzgodniono prawa do tytułu/znaku (sprawdzenie EUIPO/UPRP zgodnie z GDD) oraz domen; nie podszywać się pod cudze znaki.
- [ ] Linki deep-link `?kraj=…&z=…` i `?r=…` oraz wszystkie zatwierdzone portale przetestowano na co najmniej dwóch platformach; żaden link nie wskazuje placeholdera.
- [ ] Nie ogłaszamy wyników pokazowych jako rzeczywistych; materiały marketingowe czekają na potwierdzony GO i datę.
- [ ] Zatwierdzono opis/sklep, klasyfikację wieku, dane wydawcy, support, screenshoty, politykę reklam, wymagane kontakty i zatwierdzenie aplikacji.
- [ ] Koordynator udokumentował decyzję: **GO / NO-GO**, datę, właściciela, zaakceptowane P2/P3 i listę poprawionych P0/P1; numery zgłoszeń i dowody dołączone.

## Blokery i podpis

**Nie wydajemy**, gdy pozostało otwarte P0/P1, brakuje obowiązkowych dokumentów/polityk, nie ma dowodu licencji dla używanej grafiki, brak realnego rankingu przy obiecanej funkcji online lub nie zaliczono fizycznego testu platformy przeznaczonej do wydania.

| Osoba | Zakres | Decyzja/data | Link do dowodów |
|---|---|---|---|
| QA | Testy urządzeń i regresja | ___ | ___ |
| Redakcja | Teksty i grafiki / test babci | ___ | ___ |
| Administrator / prawnik | Polityka prywatności, Data safety, IARC | ___ | ___ |
| Koordynator | Release / GO / NO-GO | ___ | ___ |
