# Polityka prywatności — Cebulak Express

**Wersja robocza do publikacji po uzupełnieniu danych i audycie wdrożenia**  
**Stan źródeł: 31.10.2026 (opis zgodny z kodem gry na gałęzi main)** • **Data wejścia w życie: [UZUPEŁNIJ]**

> **UWAGA PRZED PUBLIKACJĄ:** nawiasy [UZUPEŁNIJ] oznaczają obowiązkowe dane. Nie publikować, dopóki dane administratora, kontakt, okresy przechowywania i konfiguracja produkcyjnego projektu Firebase nie zostaną potwierdzone. [do weryfikacji przez prawnika / inspektora RODO]

## 1. Kto odpowiada za dane

Administratorem danych użytkowników gry „Cebulak Express — Kierunek Polska” jest **[UZUPEŁNIJ: pełna nazwa prawna organizacji]**, **[UZUPEŁNIJ: adres siedziby, państwo]**, identyfikator rejestrowy **[UZUPEŁNIJ]** (dalej „Administrator”). Kontakt w sprawach prywatności: **[UZUPEŁNIJ: aktywny adres e-mail]**. Jeśli powołano inspektora ochrony danych: **[UZUPEŁNIJ: kontakt IOD lub „nie dotyczy”]**.

Gra działa w przeglądarce, jako aplikacja PWA, w osadzeniu na portalach partnerskich oraz jako aplikacja na Android i iOS. Podmioty prowadzące portale osadzające mogą samodzielnie przetwarzać dane związane z odwiedzaniem ich witryn; szczegóły znajdują się w ich własnych politykach. **[UZUPEŁNIJ: nazwy i relacja administrator–współadministrator lub niezależni administratorzy, jeżeli występuje]**.

## 2. Najważniejsze w skrócie

- **Bez kont i rejestracji.** Gra nie prosi o imię, adres e-mail, numer telefonu ani datę urodzenia. Nie ma logowania hasłem.
- **Anonimowy identyfikator.** Do rankingu gra używa usługi Firebase Anonymous Authentication, która nadaje losowy identyfikator użytkownika (UID). Nie jest powiązany z imieniem ani kontem Google gracza.
- **Nick tylko z listy.** Gra losuje nick z gotowej listy, a w garażu możesz wybrać inny z tej listy (zapisywany jest tylko jego numer, tzw. nickId). Nie ma pola do wpisywania własnego tekstu, czatu ani przesyłania zdjęć.
- **Kraj wybierasz sam.** Gra nie korzysta z lokalizacji urządzenia (GPS).
- **Bez reklam personalizowanych.** Gra nie wyświetla reklam, nie zawiera SDK reklamowych, nie używa identyfikatora reklamowego ani Firebase/Google Analytics.
- **Analityka tylko zbiorcza.** Liczymy zdarzenia (np. liczbę przejazdów) w dziennych sumach, bez identyfikatora gracza.
- **Gra działa bez sieci.** Bez połączenia z internetem możesz grać; ranking i analityka zaczynają działać, gdy połączenie wróci.

## 3. Jakie dane przetwarzamy

| Kategoria | Jakie dane | Po co | Gdzie |
|---|---|---|---|
| Anonimowy identyfikator | UID z Firebase Anonymous Authentication; techniczny token sesji tej usługi zapisany na urządzeniu | Przypisanie wyników do tego samego gracza, ochrona przed nadużyciami | Firebase Authentication, pamięć urządzenia |
| Ranking | nickId (numer nicka z listy), wybrany kraj zamieszkania (jeden z 15: BE, NL, DE, UK, FR, CH, NO, DK, IE, ES, IT, AT, SE, FI, LU), najlepszy wynik w km, tydzień/dzień, wersja zasad gry | Liga Polonii (suma km krajów), tygodniowy ranking graczy, ranking wyzwania dnia | Firestore |
| Weryfikacja przejazdu | Identyfikator przejazdu, ziarno losowe wydane przez serwer, trasa (kraj i miasta), tryb gry, chwile dotknięć ekranu w przejeździe (liczba „ticków”), wynik, czas wydania, status rozliczenia, techniczne oznaczenie podejrzanie regularnych przejazdów | Serwer odtwarza przejazd tym samym kodem gry i przyjmuje tylko poprawne wyniki | Firestore (kolekcja niedostępna dla innych graczy) |
| Limity nadużyć | UID, dzień, liczniki prób, czas ostatniej próby | Ograniczenie liczby przejazdów zgłaszanych przez jeden identyfikator | Firestore (niedostępne dla graczy) |
| Statystyki zbiorcze | Zdarzenia: otwarcie gry, start i koniec przejazdu (km, czas, przyczyna końca, tryb, kraj), zebrany bonus, kliknięcie „udostępnij” (sposób), przejście do portalu (miejsce, kraj), otwarcie Ligi, propozycja instalacji; przy otwarciu gry znacznik „nowy / dzień 1 / dzień 7” | Dzienne sumy do oceny, czy gra działa i się podoba | Firestore, dokument z sumami danego dnia; **bez UID i bez identyfikatora urządzenia** |
| Dane połączenia u usługodawców | Adres IP, nagłówki żądania, informacje o przeglądarce/urządzeniu | Przesłanie danych i bezpieczeństwo infrastruktury | Google/Firebase i hosting strony |

**Czego nie zapisujemy w bazie gry:** imienia, adresu e-mail, numeru telefonu, adresu IP, lokalizacji, identyfikatora reklamowego, kontaktów, zdjęć ani nagrań. Adres IP przechodzi jednak przez serwery usługodawców (patrz punkt 5).

### Analityka — jak działa

- Gra wysyła paczki zdarzeń do własnej funkcji serwera (`collectEvents`) bez ciasteczek i bez poświadczeń logowania. Serwer dodaje je do **dziennych sum** i nie zapisuje pojedynczych zdarzeń.
- Do ustalenia znacznika „nowy / dzień 1 / dzień 7” gra tworzy na urządzeniu **losowy identyfikator instalacji** i datę pierwszego uruchomienia. **Ten identyfikator nie jest wysyłany** — na serwer trafia wyłącznie sam znacznik.
- Aby ograniczyć zalewanie serwera, funkcja liczy żądania na skrót adresu IP przechowywany **tylko w pamięci operacyjnej** przez około minutę; skrót nie trafia do bazy ani do logów.
- Jeżeli w danej wersji gry nie skonfigurowano adresu analityki, nic nie jest wysyłane.
- Dostęp do pamięci urządzenia na potrzeby analityki: **[do weryfikacji przez prawnika — czy przy tej konstrukcji wymagana jest zgoda wg przepisów ePrivacy w krajach dystrybucji]**.

### Link „Pokonaj mnie” (duch znajomego)

Gdy sam udostępnisz link do wyzwania, zawiera on zakodowany przebieg Twojego przejazdu (ziarno i chwile dotknięć) oraz — jeśli wybrałeś nick — numer nicka z listy. Link trafia tylko tam, gdzie go wyślesz. Gra niczego nie udostępnia bez Twojego działania.

## 4. Po co i na jakiej podstawie

| Cel | Rozważana podstawa z art. 6 ust. 1 RODO | Uwaga |
|---|---|---|
| Obsługa rozgrywki i dobrowolnego rankingu, utrzymanie wyniku | **lit. b** — wykonanie umowy o korzystanie z funkcji gry; w części **lit. f** jako prawnie uzasadniony interes związany z funkcjonalnością | Podstawa musi zostać dopasowana do faktycznej wersji usługi i regulaminu. [do weryfikacji przez prawnika] |
| Ochrona rankingu przed automatyzacją, oszustwami i nadużyciami | **lit. f** — interes Administratora i uczciwie grających | Możesz sprzeciwić się przetwarzaniu opartemu na lit. f |
| Zbiorcze statystyki bez profilowania | **lit. f**, po teście równowagi | Oddzielnie sprawdzić ePrivacy (pamięć urządzenia). [do weryfikacji przez prawnika] |
| Obsługa żądań i obowiązków prawnych | **lit. c** w zakresie rzeczywiście nałożonych obowiązków oraz **lit. f** dla obrony roszczeń | Zależnie od żądania i jurysdykcji |

Nie prowadzimy marketingu behawioralnego, nie sprzedajemy danych i nie wyświetlamy reklam personalizowanych. Sprawdzanie poprawności przejazdu jest automatyczne: niepoprawny wynik nie trafia do rankingu. Oznaczenie przejazdu jako „podejrzanie regularny” **nie usuwa wyniku** — służy tylko do ewentualnej ręcznej oceny. Nie podejmujemy decyzji o skutkach prawnych w rozumieniu art. 22 RODO; możesz zgłosić reklamację na adres z punktu 1.

## 5. Kto otrzymuje dane i gdzie są przetwarzane

**Google / Firebase** dostarcza uwierzytelnianie anonimowe, bazę Firestore i funkcje serwera (Cloud Functions). Funkcje gry działają w regionie **europe-west1 (Belgia)**; lokalizacja bazy Firestore: **[UZUPEŁNIJ: rzeczywista lokalizacja bazy po założeniu projektu, planowana europe-west1]**. **Firebase Authentication działa w centrach danych w USA** według dokumentacji Google, więc część danych operacyjnych (np. adres IP przy logowaniu anonimowym) może być przekazywana poza EOG na podstawie warunków przetwarzania danych Google (np. standardowych klauzul umownych lub właściwego mechanizmu certyfikacji).

Jeżeli w danej wersji włączono ochronę **App Check**, usługi Google sprawdzają, czy żądanie pochodzi z prawdziwej aplikacji: w przeglądarce przez reCAPTCHA Enterprise, na Androidzie przez Play Integrity, na iOS przez App Attest/DeviceCheck. Te usługi przetwarzają dane techniczne urządzenia i przeglądarki według zasad Google i Apple. **[UZUPEŁNIJ: czy App Check jest włączony w wersji produkcyjnej]**

Hosting strony gry: **[UZUPEŁNIJ: Firebase Hosting lub inny dostawca, po decyzji]**. Odbiorcami mogą być też podmioty obsługujące bezpieczeństwo i wsparcie infrastruktury, wyłącznie w niezbędnym zakresie. **[UZUPEŁNIJ: ustalenia DPA i ewentualna ocena transferu; do weryfikacji przez prawnika]**

**Co widzą inni gracze:** publiczny ranking pokazuje nick z listy, kraj i wynik. Wpisy rankingu są w bazie zapisane pod anonimowym identyfikatorem (UID), więc technicznie można go odczytać z publicznych danych rankingu. UID nie zawiera imienia ani adresu e-mail, ale jest identyfikatorem pseudonimowym, a nie anonimowym w rozumieniu RODO.

Źródła: Google Firebase — https://firebase.google.com/support/privacy ; Firebase Data Processing Terms — https://firebase.google.com/terms/data-processing-terms (dostęp: 30.10.2026).

## 6. Jak długo przechowujemy dane

| Kategoria | Okres |
|---|---|
| Dane weryfikacji przejazdu | **30 dni** od startu przejazdu; usuwa je codzienne zadanie serwera (ok. 03:00 czasu polskiego), więc usunięcie może nastąpić przy najbliższym uruchomieniu |
| Liczniki limitów nadużyć | **2 dni** od ostatniej próby; usuwane tym samym zadaniem |
| Profil gracza (nickId, kraj, najlepszy wynik przypisany do UID) | **[UZUPEŁNIJ: okres, proponowane 12 miesięcy braku aktywności]** lub do skutecznego żądania usunięcia. Obecnie nie ma automatycznego usuwania. |
| Ranking tygodniowy, ranking wyzwania dnia, Liga Polonii | **[UZUPEŁNIJ: okres publikacji i usuwania historycznych sezonów, proponowane 90 dni]**. Obecnie nie ma automatycznego usuwania. |
| Dzienne statystyki zbiorcze | **[UZUPEŁNIJ: np. 13 miesięcy]**. Sumy nie zawierają identyfikatorów. Obecnie nie ma automatycznego usuwania. |
| Konto anonimowe w Firebase Authentication oraz logi usługodawcy | **[UZUPEŁNIJ: procedura usuwania konta technicznego]**; retencja logów technicznych Google wynika z dokumentacji dostawcy |
| Dane na Twoim urządzeniu | Do czasu wyczyszczenia danych strony/aplikacji lub odinstalowania gry |

Usunięcie danych gry na urządzeniu **nie usuwa automatycznie** wyników zapisanych na serwerze; przy kolejnym uruchomieniu gra dostanie nowy anonimowy identyfikator.

## 7. Jakie masz prawa

Możesz żądać dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, a w stosownych przypadkach — przeniesienia danych. Możesz wnieść sprzeciw wobec przetwarzania opartego na art. 6 ust. 1 lit. f RODO.

Wnioski: **[UZUPEŁNIJ: e-mail administratora]**. Ponieważ nie znamy Twojego imienia ani adresu e-mail, do odnalezienia wpisów może być potrzebny nick i kraj albo identyfikator gracza **[UZUPEŁNIJ: sposób odczytania identyfikatora w grze — funkcja jeszcze nie istnieje]**. Nie żądamy dokumentu tożsamości tylko dlatego, że gracz używa pseudonimu; ewentualna weryfikacja musi być proporcjonalna i nie może pozwolić usunąć danych innej osoby.

Odpowiadamy bez zbędnej zwłoki, zasadniczo w ciągu miesiąca (art. 12 RODO). Przysługuje Ci prawo złożenia skargi do organu ochrony danych, np. w kraju Twojego zwykłego pobytu **[UZUPEŁNIJ: organ w kraju administratora]**.

## 8. Dzieci i rodziny

Gra ma sympatyczną, nieszkodliwą oprawę. Nie prosimy o datę urodzenia ani dane rodziców; nie można wpisać własnego nicka, czatować ani publikować zdjęć. **[UZUPEŁNIJ: grupy wiekowe z Play Console i App Store Connect oraz rozwiązanie dla dzieci — do weryfikacji przez prawnika]**.

Art. 8 RODO wyznacza szczególne zasady zgody dzieci **gdy podstawą jest zgoda**, przy różnych progach wiekowych w UE (np. Belgia 13 lat, Francja 15 lat, Niderlandy 16 lat). Przy kierowaniu gry do dzieci trzeba spełnić także wymogi sklepów. **[do weryfikacji przez prawnika]**

Źródła: RODO — https://eur-lex.europa.eu/eli/reg/2016/679/oj ; Google Play Families — https://support.google.com/googleplay/android-developer/answer/9867159 (dostęp: 30.10.2026).

## 9. Pamięć urządzenia, bezpieczeństwo i zmiany

Gra nie używa ciasteczek. Zapisuje na urządzeniu (w pamięci przeglądarki, a w aplikacji mobilnej w pamięci aplikacji):

- ustawienia (język, dźwięki, muzyka i głośność, wibracje, ograniczenie ruchu, tryb wydajności), wybrany kraj, trasę, auto i nick z listy;
- najlepsze wyniki, postęp albumu i odblokowane auta, informację o ukończonym samouczku i ekranie powitalnym;
- wyniki czekające na wysłanie do rankingu, gdy brakowało połączenia;
- losowy identyfikator instalacji i datę pierwszego uruchomienia na potrzeby analityki (nie są wysyłane);
- techniczną sesję anonimowego logowania Firebase (gdy ranking jest włączony).

Przy osadzeniu w portalu przeglądarka może oddzielać pamięć gry na każdym portalu, więc wyniki i identyfikatory nie muszą być wspólne między portalami.

Dostęp do danych ograniczają reguły bazy Firestore (gracze nie mogą niczego zapisywać bezpośrednio, a dane weryfikacji i limitów są dla nich niedostępne), serwerowe sprawdzanie wyników i zabezpieczenia dostawców. Żadne zabezpieczenie nie daje absolutnej pewności.

Aktualna wersja polityki będzie publikowana pod **[UZUPEŁNIJ: stały publiczny HTTPS URL]** z datą wejścia w życie; o istotnych zmianach poinformujemy odpowiednio do ich znaczenia.

---

## English — short privacy summary (not a substitute for a complete translation)

**Controller:** [INSERT LEGAL ENTITY, REGISTERED ADDRESS, CONTACT EMAIL]. **Effective date:** [INSERT].

Cebulak Express is a casual game for the web, Android and iOS. There are no accounts, no free-text nicknames, no chat and no ads (no personalised ads, no advertising SDKs, no advertising ID, no Google/Firebase Analytics). For the optional leaderboard we use Firebase Anonymous Authentication, which assigns a random pseudonymous user ID. We store a nickname chosen from a fixed list (as a number), your self-selected home country (not device location), your best distance and the data needed to replay and verify each run on our server. Run verification data is deleted after 30 days and abuse-limit counters after 2 days; other retention periods are [TO BE CONFIRMED]. Leaderboard entries are stored under the anonymous ID, which is therefore technically readable in public leaderboard data.

Usage statistics are aggregated into daily totals without any user or device identifier. A random install ID stays on the device and is never sent; only a "new / day 1 / day 7" flag is. IP addresses are used in memory for rate limiting and are not stored by us, but Google/Firebase and the website host process IP and device data to run their services; **Firebase Authentication operates in US data centres**. Cloud Functions run in europe-west1 (Belgium). Contact: [INSERT EMAIL]. If children are in scope, additional protections and applicable platform rules must be confirmed before release.

**Before non-Polish distribution:** provide an accurate, complete, legally reviewed English version and, where necessary, local-language notices. [do weryfikacji przez prawnika]

---

## Kontrola wydawnicza (część wewnętrzna, nie publikować z polityką)

- [ ] Podmiot prawny + dane adresowe, e-mail do obsługi praw RODO, organ nadzorczy, publiczny HTTPS URL.
- [ ] Potwierdzony dokument umowy Google/Firebase i region każdej usługi (Auth USA, lokalizacja Firestore, Functions europe-west1).
- [ ] Audyt rzeczywistych danych w Firestore, Authentication, logach funkcji, hostingu i osadzeniach portali.
- [ ] Ustalone i wdrożone retencje: players, leaderboard, daily, league, stats (dziś bez automatycznego usuwania).
- [ ] Działa usunięcie profilu UID i konta anonimowego oraz sposób wskazania własnych wpisów (dziś brak funkcji „mój identyfikator”).
- [ ] Przegląd ePrivacy dla pamięci urządzenia (identyfikator instalacji analityki).
- [ ] Deklaracje Data safety (`docs/sklep/data-safety.md`) i App Privacy odpowiadają tej polityce i konfiguracji SDK (App Check: Play Integrity / App Attest / reCAPTCHA Enterprise).
- [ ] Ustalone grupy wiekowe, ochrona dzieci, brak reklam, brak nieujawnionych SDK.
- [ ] Link „Prywatność” w ustawieniach gry (`src/ui/settings.ts`) wskazuje opublikowaną stronę zamiast pliku na GitHubie.
- [ ] **[do weryfikacji przez prawnika]** ostateczne podstawy prawne, test interesu, transfery, art. 8 RODO, stosunek do portali, wersje językowe.

Źródła w kodzie (stan 31.10.2026): `src/net/api.ts` (anonimowe logowanie, odczyt rankingu), `src/analytics/track.ts` (zdarzenia, identyfikator instalacji), `functions/src/index.ts` (startRun, submitRun, cleanupExpiredRuns), `functions/src/analytics.ts` i `functions/src/analytics-events.ts` (dzienne sumy), `functions/firestore.rules` (publiczny odczyt league/leaderboard/daily), `functions/PRIVACY.md`, `src/share/ghost.ts` (link wyzwania). Źródła prawne (dostęp: 30.10.2026): RODO https://eur-lex.europa.eu/eli/reg/2016/679/oj ; Firebase privacy https://firebase.google.com/support/privacy ; Firebase DPA https://firebase.google.com/terms/data-processing-terms ; Anonymous Auth https://firebase.google.com/docs/auth/web/anonymous-auth.
