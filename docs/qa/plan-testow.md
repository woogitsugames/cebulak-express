# Plan ręcznych testów przed wydaniem — Cebulak Express

**Status:** plan, nie protokół wykonania. **Platformy:** Android (Capacitor), iOS (Capacitor/TestFlight), web/PWA oraz iframe w WordPressie. **Sezon startowy:** „Na Wigilię!”, planistyczne okno 10–15.12.2026; ostateczny termin i GO ustala koordynator. Powiązane dokumenty: `docs/GDD.md`, `docs/marketing/plan-startu.md`, `docs/pwa.md`, `docs/ios.md`, `embed/README.md`, `docs/qa/lista-przed-wydaniem.md`.

## Zasady wykonania

1. **Przed testami:** zapisz SHA commitu, numer wersji, rodzaj artefaktu (APK debug / AAB release / TestFlight / URL web), urządzenie, system, przeglądarkę, wersję backendu i datę. Testy wydawnicze wykonuj na **buildzie produkcyjnym**, nie tylko w `vite dev` i nie wyłącznie na APK debug.
2. Każdy scenariusz ma wynik `PASS`, `FAIL`, `BLOCKED` albo `N/A` oraz dowód (zrzut, wideo, log). `BLOCKED` oznacza nieprzygotowane środowisko/funkcję; **nie liczy się jako zaliczony**. N/A wymaga uzasadnienia.
3. Przy porażce otwórz zgłoszenie według `.github/ISSUE_TEMPLATE/blad.md` i wpisz numer w arkuszu wykonania. Wrażliwe dane (UID, adresy e-mail, tokeny, linki prywatne) usuń ze zrzutów i logów.
4. W testach rankingu rozróżniaj `mock` od **prawdziwego** Firebase. `Wersja pokazowa · wyniki tylko w tej sesji` to zachowanie deweloperskie, **niedopuszczalne jako potwierdzenie działania produkcyjnej Ligi**.
5. Niezbędne jest sprawdzenie powtarzalności: przynajmniej 3 próby scenariuszy krytycznych; dla każdego kraju co najmniej jedna pełna rozgrywka i jeden ponowny start.

### Matryca urządzeń i sieci

| Zestaw | Wymagane środowisko | Co sprawdzić |
|---|---|---|
| A1 — słabszy Android | Fizyczny telefon z 3–4 GB RAM, Android 12–13 | Instalacja APK, płynność, dotyk, udostępnianie, powrót z tła |
| A2 — współczesny Android | Fizyczny Android 15/16, ekran z wycięciem, gesty systemowe | API 36, edge-to-edge, back, powiadomienia, rotacja |
| I1 — iPhone | Fizyczny iPhone wspierany przez projekt (iOS 15+) | TestFlight, safe area, przełącznik ciszy, Share, przerwania |
| I2 — iPad | Fizyczny iPad lub — dla wstępnego przeglądu — symulator | Orientacja pionowa, skalowanie, dotyk i kadrowanie |
| W1 — web/PWA | Android Chrome, instalacja z HTTPS | Instalacja, uruchomienie bez sieci, aktualizacja Service Workera |
| W2 — web/PWA | iPhone Safari oraz desktop Chrome/Firefox/Safari | Fallback udostępniania, layout, ograniczenia instalacji |
| WP — osadzenie | Prawdziwy WordPress + mobilny Chrome/Safari, co najmniej po jednym portalu | Shortcode/iframe, CSP, przekazanie parametrów, linki, scroll |

**Profil sieci:** Wi-Fi stabilne; transfer mobilny; tryb samolotowy; „Slow 3G” / throttling; utrata sieci **w trakcie** rozgrywki; powrót łączności. Zapisz, kiedy występuje backend Firebase i czy działa wersja produkcyjna.

### Przygotowanie instalacji i resetu

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run android:apk
# Alternatywnie pobierz APK debug z artefaktów workflow .github/workflows/ci.yml
adb devices
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
# UWAGA: poniższe polecenie usuwa dane aplikacji, używaj wyłącznie na testowym urządzeniu:
adb shell pm clear com.woogitsugames.cebulakexpress
```

Do testu instalacji aktualizacji z zachowaniem danych użyj `adb install -r` **bez** `pm clear`. APK debug nie zastępuje podpisanego release / testów Play Console. Na iOS postępuj według `docs/ios.md` (TestFlight, prawdziwy iPhone/iPad). PWA testuj pod HTTPS; `localhost` służy tylko do testów technicznych.

## Scenariusze ręczne

### 1. Instalacja, uruchomienie, zapis

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| IN-01 | Nowy telefon A1: zainstaluj APK; uruchom bez wcześniejszych danych. | Instalacja bez błędu; pojawia się własna ikona/splash, potem menu; nie ma białego/czarnego ekranu ani crasha. |
| IN-02 | Zamknij aplikację, uruchom ponownie i wykonaj 3 starty. | Nie pojawia się niekończący się splash; menu działa; nie powiela się dźwięk ani listener dotyku. |
| IN-03 | Wybierz kraj, miasto i cel, tryb oraz skórkę/nick; zamknij i wróć. | Ustawienia przechowują się zgodnie z projektem, nick jest wyłącznie z listy, bez formularza własnego tekstu; stan pozostaje poprawny po restarcie. |
| IN-04 | Zainstaluj nowszy build na starszy (`adb install -r`), bez czyszczenia danych. | Upgrade nie wymaga ręcznego kasowania danych; po starcie zapisane ustawienia i rekord są poprawne, brak crashy migracyjnych. |
| IN-05 | Uruchom aplikację pierwszy raz **bez sieci** (A1 i I1). | Można uruchomić i rozegrać lokalną trasę; awaria Firebase nie zatrzymuje menu ani sterowania. |
| IN-06 | Uruchom aplikację na iPhonie z TestFlight, potem po ubiciu procesu. | Podpisany build instaluje się i otwiera; ikona/splash oraz safe area są poprawne; brak błędu uprawnień. |
| IN-07 | Uruchom grę 10 razy z rzędu; sprawdź pamięć/baterię/temperaturę. | Brak narastania zużycia pamięci, przecieków zasobów i powtarzalnego zawieszenia; wyniki wydajności zapisz wraz z urządzeniem. |

### 2. Kraje, trasy, rozgrywka

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| GR-01 | Wybierz kolejno BE, NL, DE, UK, FR, CH, NO i DK; w każdym uruchom próbę i zakończ. | 8 krajów startowych dostępnych; prawidłowa nazwa i grafika, brak brakujących warstw/sprite'ów; restart działa po kolizji. |
| GR-02 | W każdym kraju zmień miasto startowe, następnie cel w Polsce (co najmniej 2 różne cele). | Rozwinięte listy zawierają właściwe miasta; trasa ma poprawny początek i koniec, dystans jest dodatni, a wybór nie powoduje błędu. |
| GR-03 | Wybierz jedno z małych miast docelowych (np. Siemiatycze), następnie duże (np. Warszawa). | Nie ma nieprawidłowej deklinacji/powielonych miejsc, skoków ujemnego dystansu ani zniknięcia końcowego punktu. |
| GR-04 | Włącz „Rankingowy”; dotknij ekranu, następnie próbuj utrzymać lot kilkoma dotknięciami. | Jeden tap = jedno sterowanie; prędkość i trudność stabilne na 30/60/120 Hz; licznik km rośnie, czas i sterowanie nie przyspieszają z FPS. |
| GR-05 | Włącz „Łagodny”; porównaj ten sam odcinek i ekran wyniku z rankingowym. | Tryby są opisane i rozróżnialne; wynik trybu łagodnego nie trafia do rankingu; zachowanie zgodne z GDD. |
| GR-06 | Celowo zderz się z przeszkodą (wiadukt, znak, dźwig, remont, szlaban, ciężarówka). | Kolizja kończy rozgrywkę w przewidywalnym momencie; ekran podaje przyczynę i prawidłowe km; nie ma śmierci ani drastycznej animacji. |
| GR-07 | Celowo uderz w asfalt i powtórz z krótkimi dotknięciami przy ziemi. | Asfalt jest przeszkodą, nie można przenikać pod scenę; licznik nie zwiększa się po zakończeniu próby. |
| GR-08 | Zbierz paczkę, później słoik; porównaj z próbą bez znajdziek. | Toast pokazuje premię km, chwilowy ciężar zmienia zachowanie auta zgodnie z bilansem; bonus nie powoduje ujemnych/NaN wyników. |
| GR-09 | Omiń przeszkodę o włos; powtórz wiele prób. | Komunikat „o włos” dotyczy rzeczywistego bliskiego minięcia, nie pojawia się po kolizji i nie nachodzi na sterowanie. |
| GR-10 | Po kolizji wybierz „Jeszcze raz”, później „Zmień trasę”. | Pierwszy przycisk uruchamia nową grę wybranej trasy; drugi wraca do menu bez zablokowania dotyku i bez starego ekranu końca. |
| GR-11 | Ukończ długi przejazd / użyj ustalonego ziarna tylko w środowisku testowym. | Na mecie „Jesteś w domu!”, dystans końcowy i tekst o powrocie; brak dodatkowych km po osiągnięciu celu. |
| GR-12 | Zmień język i format regionalny telefonu (PL/FR/NL/EN). | Polski interfejs nie psuje się; jednostka `km`, nazwy miast i diakrytyki nie zmieniają sensu. |

### 3. Granice i punkty trasy

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| TR-01 | BE → Polska, obserwuj kolejność BE–DE–PL; zapisz ekran przy każdym punkcie. | Miasta/punkty pojawiają się we właściwej kolejności i w przybliżeniu zgodnej z kilometrażem trasy; brak losowych teleportacji. |
| TR-02 | NL → Polska oraz DE → Polska, porównaj przejścia graniczne. | Nie ma pomieszania krajobrazów, krajów i oznaczeń; granica Polski pokazuje właściwy komunikat. |
| TR-03 | UK → Polska; sprawdź Dover, przeprawę/prom/kanał i trasę kontynentalną. | Punkty przeprawy pojawiają się w logicznej kolejności; grafiki i komunikaty nie sugerują jazdy do Polski z pominięciem przeprawy. |
| TR-04 | FR i CH → Polska, sprawdź miasta pośrednie i wjazd do Niemiec/Polski. | Trasa pozostaje geograficznie spójna; elementy tła zmieniają się bez ostrych dziur i błędnych nazw. |
| TR-05 | NO → Polska, osobno DK → Polska; obserwuj SE, mosty/prom i PL (jeśli trasa je przewiduje). | Skandynawskie przeprawy i krajobrazy wyświetlają się tylko tam, gdzie są na trasie; dystans jest monotoniczny. |
| TR-06 | Przetestuj Świecko, Jędrzychowice i Świnoujście na odpowiednich trasach. | Po granicy: generyczna stacja paliw bez logotypu; nie ma godła RP/flag UE, Atomium ani prawdziwych marek. |
| TR-07 | Zatrzymaj się tuż przed/za punktem, potem wznów inną próbę. | Każdy toast/punkt zalicza się maksymalnie raz na dany przejazd; kolejność i odległości nie są zaburzane przez restart. |
| TR-08 | Obejrzyj wszystkie 10 zestawów pejzaży BE/NL/DE/UK/FR/CH/NO/DK/SE/PL. | Warstwy i proporcje są spójne, grafiki nie rozpikselowane, tło Polski i wariant zimowy czytelne przy różnych DPI. |

### 4. Garaż, nick, ekran wyniku

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| GA-01 | W menu wejdź do garażu; przewijaj wszystkie skórki w obie strony i dotykaj miniatur. | Wszystkie skórki mają poprawny podgląd i nazwę; brak brakujących PNG; poprzednia/następna nie wychodzi poza listę. |
| GA-02 | Wybierz każdą skórkę, wróć do menu, uruchom i zakończ grę. | Wybrana postać i auto są widoczne w grze; po wznowieniu zachowują się zgodnie z ustawieniami. |
| GA-03 | Wybierz formę „Kierowca” i „Kierowczyni”; losuj propozycje 5 razy. | Nicki poprawne gramatycznie, każda propozycja pochodzi z generatora; nie ma pola wpisywania dowolnego nicku. |
| GA-04 | Ustaw nick, wyłącz aplikację, wróć; zmień kraj i ponownie otwórz garaż. | Nick pozostaje legalny i renderuje się poprawnie; w razie niezgodności jest bezpiecznie regenerowany, bez pustych etykiet. |
| GA-05 | Ustanów nowy rekord, zakończ słabszą próbę i obejrzyj kartę wyniku. | Rekord nie maleje po słabszym przejeździe; karta ma właściwy kraj, miasto, km, przyczynę i logo gry. |
| GA-06 | Zmień rozmiar okna/telefon, obejrzyj ekran wyniku oraz garaż. | Przyciski widoczne i osiągalne; podpisy nie ucinają się; grafiki nie wychodzą poza bezpieczny obszar. |

### 5. Udostępnianie i rolki

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| SH-01 | Po zakończeniu próby wybierz „Udostępnij” na Androidzie. | Otwiera się systemowa karta udostępniania lub jawny fallback; karta PNG i tekst z km odpowiadają rozgrywce. |
| SH-02 | Wyślij wynik do **WhatsApp**, otwórz u odbiorcy. | Odbiorca dostaje niepustą wiadomość/obraz i działający bezpieczny URL gry z parametrami trasy, jeśli odbiorca obsługuje tę kombinację. |
| SH-03 | Wyślij wynik do **Messenger** i **Facebook** (aplikacje testowe zainstalowane). | Kompozycja udostępnienia działa lub oferuje przewidywalny fallback, bez utraty gry; wyświetlony link/karta prowadzi do poprawnego źródła. |
| SH-04 | Zamknij systemowy arkusz udostępniania bez publikowania. | Anulowanie nie jest przedstawiane jako udane wysłanie; wynik i menu pozostają dostępne. |
| SH-05 | Powtórz SH-01–04 na iPhonie (Share Sheet), a potem na web bez Web Share API. | iOS korzysta z właściwego arkusza; przeglądarka oferuje kopiowanie linku/PNG lub zapis obrazu, bez zawieszenia. |
| SH-06 | Otwórz URL karty na nowej przeglądarce i w iframe. | Prefill kraju/miasta jest poprawny i bezpieczny; błędne parametry nie uruchamiają obcego kodu ani nie wywracają menu. |
| RO-01 | Kliknij „Nagraj rolkę”; zakończ nagrywanie i odtwórz podgląd. | Powstaje krótki pionowy film 9:16, obraz i wynik są czytelne, dźwięk nie jest rozjechany z obrazem. |
| RO-02 | Zapisz film lokalnie, otwórz w galerii/odtwarzaczu. | Plik otwiera się po eksporcie; format i rozmiar są obsługiwane przez urządzenie lub jest jasny komunikat o braku obsługi. |
| RO-03 | Udostępnij film do WhatsApp/Messenger/FB; następnie anuluj drugą próbę. | Udostępniany jest **film**, a nie sam link udający udostępniony plik; anulowanie nie powoduje komunikatu sukcesu. |
| RO-04 | W trakcie nagrywania zablokuj ekran/przełącz aplikację; wróć. | Nagrywanie zostaje przerwane czytelnie; nie zostaje „żywy” czerwony wskaźnik ani uszkodzony rekord. |
| RO-05 | W przeglądarce bez MediaRecorder/captureStream uruchom nagrywanie. | Pojawia się bezpieczny komunikat o niedostępności; gra nadal działa, bez pustego pliku. |

### 6. Ranking online/offline i wyzwanie dnia

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| RK-01 | Na produkcyjnym Firebase zakończ przejazd rankingowy, następnie otwórz „Liga Polonii”. | Wynik przesłany po weryfikacji serwera; kraj, najlepszy km i suma ligi są spójne. **Nie zaliczać na mocku.** |
| RK-02 | Zagraj ten sam kraj i nick, uzyskaj lepszy/słabszy wynik. | Tabela najlepszych graczy aktualizuje rekord, a liga sumuje prawidłowe przejazdy zgodnie z backendem. |
| RK-03 | Otwórz zakładki „Kraje”, „Gracze”, „Wyzwanie dnia”. | Każda ma właściwe wartości, okres według czasu polskiego; ranking nie miesza dnia z tygodniem. |
| RK-04 | Odłącz internet **przed startem** rankingowym; rozegraj pełną grę. | Rozgrywka lokalna działa; nie jest fałszywie deklarowane przesłanie wyniku bez uzyskania `runId`. |
| RK-05 | Uruchom ranking online, w trakcie próby odłącz internet, zakończ ją; wróć online. | Oczekujący wynik z poprawnym `runId` zapisuje się w kolejce i zostaje wysłany raz, jeśli nie minął termin backendu; brak duplikatów. |
| RK-06 | Otwórz Ligę offline lub z timeoutem Firebase; kliknij „Spróbuj ponownie” po odzyskaniu sieci. | Czytelny komunikat, brak wiecznego spinnera; ponowienie pobiera wyniki bez utraty lokalnej gry. |
| RK-07 | Rozegraj „Łagodny” i porównaj ranking. | Próba łagodna nie publikuje wyniku rankingowego; nie można podmienić przesłanych km przez UI. |
| RK-08 | Uruchom „Wyzwanie dnia” na 2 telefonach w tym samym dniu i przy zmianie daty w Polsce. | Układ dzienny i granica doby są spójne; reset po polskiej północy, nie lokalnej innego kraju. |
| RK-09 | Test bezpieczeństwa na środowisku testowym: wyślij zmodyfikowany/ponowny replay i zbyt szybki wynik. | Backend odrzuca nieprawidłowe lub zdublowane zgłoszenia; bezpośrednie podstawienie dowolnych km jest niemożliwe. |
| RK-10 | Włącz konfigurację bez produkcyjnych zmiennych Firebase. | UI jasno oznacza demo; publiczny release bez prawdziwego backendu traktowany jako **NO-GO** dla obiecanej Ligi. |

### 7. PWA i WordPress

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| PW-01 | Otwórz produkcyjny HTTPS w Chrome; odczekaj do aktywnego Service Workera; zainstaluj PWA. | Manifest, nazwa, poprawna ikona, launch w osobnym oknie; SW kontroluje stronę (nie wystarczy obecność manifestu). |
| PW-02 | Po pełnej instalacji SW rozegraj próbę; wyłącz sieć, zamknij i uruchom PWA ponownie. | Menu i lokalna gra startują offline. Nie wymaga się offline od obrazów niepobranych jeszcze do cache. |
| PW-03 | Online obejrzyj wszystkie kraje, odczekaj na prefetch po przejeździe, potem offline odwiedź je ponownie. | Tła krajów są dostępne z cache po rzeczywistym pobraniu, brak zawieszenia na brakującym assetcie. |
| PW-04 | Wdróż nową wersję PWA, rozpocznij grę na starej; przywróć internet. | Aktualizacja jest sygnalizowana; nie przeładowuje rozgrywki w środku, wykonuje najwyżej jedno przeładowanie po powrocie do menu. |
| PW-05 | Test w Firefox/Safari iOS oraz w trybie prywatnym/bez zgody na pamięć. | Gra działa mimo ograniczeń SW/storage, a niedostępność PWA offline jest oznaczona jako ograniczenie środowiska, nie crash. |
| WP-01 | Włącz wtyczkę na testowym WordPressie, ustaw prawdziwy HTTPS, wstaw `[cebulak_express kraj="be" z="antwerpia"]`. | Gra jest osadzona 9:16, wybiera prawidłowy kraj/miasto, nie zmienia stylu portalu i nie powoduje poziomego scrolla. |
| WP-02 | Powtórz shortcode dla NL/DE/UK/FR/CH/NO/DK oraz parametr `r`. | Parametry są poprawnie dekodowane, a nieznane/niepoprawne są ignorowane bez XSS i przekierowań na obce domeny. |
| WP-03 | Otwórz iframe na telefonie; wykonaj próbę i użyj „Udostępnij” oraz linku do portalu. | Gest dotyku i przyciski działają; `allow="web-share"` + HTTPS pozwalają udostępnić lub uruchamia się fallback; link otwiera właściwy portal poza ramką. |
| WP-04 | Włącz rygorystyczny CSP/`frame-ancestors` na hostingu i sprawdź konsolę. | Osadzanie działa wyłącznie na zatwierdzonych domenach; brak `X-Frame-Options` blokującego autoryzowany iframe; błędy CSP odnotowane. |
| WP-05 | Zablokuj third-party cookies/localStorage i włącz blokadę śledzenia w Safari. | Gra nadal jest grywalna; problemy z zapisem danych nie blokują dotyku, a rankingi zachowują zgodność z ograniczeniami środowiska. |

### 8. Integracja z systemem i dostępność

| ID | Kroki | Oczekiwany wynik |
|---|---|---|
| OS-01 | Android: użyj fizycznego/gestowego **Wstecz** w grze, garażu, Lidze i na wyniku. | Wraca do menu. W samym menu wstecz zamyka aplikację; brak utknięcia między ekranami i niezamierzonego restartu gry. |
| OS-02 | Web: naciśnij Escape z ekranów gry i menu, potem przy otwartym polu wyboru. | Escape działa jako cofnięcie tam, gdzie obsługuje je gra, nie zamyka przeglądarki i nie przechwytuje edycji formularzy. |
| OS-03 | Obróć Androida/iPhone'a podczas menu, rozgrywki, wyniku i zapisu rolki. | Jeśli wydanie wymusza **portrait**, interfejs pozostaje w pionie; w przeciwnym razie skaluje się bez utraty sterowania i złego kadrowania. Wymaganie portrait wg `docs/ios.md`. |
| OS-04 | Włącz tryb cichy telefonu, następnie ustaw osobno **głośność multimediów na 0**; testuj dźwięk i wibracje. | Przy zerowej głośności mediów brak słyszalnego dźwięku; Androidowy tryb cichy dzwonka może nie wyciszać mediów — odnotować politykę produktu; ustawienia gry i haptics są przewidywalne. |
| OS-05 | W trakcie gry odbierz połączenie, włącz powiadomienie pełnoekranowe lub przełącz aplikację; wróć po 10–30 s. | Brak crasha; audio jest pauzowane w tle; gra wznawia się bez szybkiego przeskoku symulacji (lub bezpiecznie wraca do menu zgodnie z zatwierdzoną polityką). |
| OS-06 | Słaby internet: throttling Slow 3G, wysoka latencja, pakiety gubione, przełączenie Wi-Fi ↔ LTE podczas rankingowej sesji. | Nie blokuje głównej rozgrywki; operacje sieciowe kończą się wynikiem albo wyraźnym błędem/ponowieniem; brak ciągłego spinnera. |
| OS-07 | Android/iOS: zmień systemową czcionkę na najmniejszą i największą, włącz powiększanie tekstu. | Menu, rankingi, garaż i przyciski nie obcinają informacji; tap-targety nie nakładają się. Wady widocznych fontów bitmapowych odnotować. |
| OS-08 | Włącz/wyłącz systemowy **tryb ciemny** podczas działania gry, powtórz po restarcie. | Czytelny kontrast, brak białych nieprzystających pasków systemowych, brak utraty tła i ikon. |
| OS-09 | Android/iOS: ekran z wycięciem, zaokrąglonymi rogami i gestami systemowymi. | Wyniki, przycisk nagrywania, zamykanie okien i wybór tras nie zachodzą na notch, status bar ani obszar gestów. |
| OS-10 | Włącz VoiceOver/TalkBack, na web Tab/Shift+Tab i Enter/Spacja. | Kluczowe etykiety i przyciski mają poprawne nazwy i kolejność; menu, garaż, Liga i udostępnianie są obsługiwalne; ograniczenia sterowania Canvas zapisać jawnie. |
| OS-11 | Włącz oszczędzanie baterii, zmień 60/120 Hz, zablokuj i odblokuj ekran. | Nie występuje przyspieszenie fizyki po powrocie, dźwięki nie dublują się; zużycie zasobów jest akceptowalne na A1. |

## Procedura końcowa i kryteria GO

- **P0 — bezwzględny NO-GO:** crash/start bez menu; niedziałająca instalacja; utrata podstawowej gry; fałszywy ranking; pobieranie danych niedeklarowanych prawnie; brak opublikowanej polityki prywatności/obowiązkowej ankiety; grafika bez licencji; prawdziwa marka/logo; niebezpieczne przekierowanie/XSS.
- **P1 — blokuje wydanie do poprawy albo formalnej decyzji właściciela:** niedziałający kraj/trasa, zepsuty system wstecz, całkowity brak fallbacku udostępnienia, przeładowanie PWA w środku przejazdu, ucięty istotny przycisk, utrata zapisu danych.
- **P2/P3:** kosmetyka i przypadki środowiskowe, możliwe zaakceptowanie wyłącznie z opisem ryzyka i terminem naprawy.
- Każde P0/P1 ma numer issue, właściciela i status `closed + retest PASS` przed GO; brak testów na fizycznych urządzeniach to **BLOCKED**, nie zaliczenie.
- Załącz do decyzji: zestaw urządzeń, build SHA/version, protokół (ID / status / data / tester / issue / dowód), raport `docs/qa/wszystkie-teksty.md`, wynik kontroli praw i formularzy sklepu. Ostateczną decyzję podpisuje koordynator/właściciel.

### Szablon pojedynczego wiersza wykonania

| ID | Build/SHA | Urządzenie/OS | Data/tester | Status | Issue | Dowód/uwaga |
|---|---|---|---|---|---|---|
| `IN-01` | _do uzupełnienia_ | _do uzupełnienia_ | _do uzupełnienia_ | `BLOCKED` | — | Test niewykonany |
