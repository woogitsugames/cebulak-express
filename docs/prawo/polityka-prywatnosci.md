# Polityka prywatności — Cebulak Express

**Wersja robocza do publikacji po uzupełnieniu danych i audycie wdrożenia**  
**Stan źródeł: 30.10.2026** • **Data wejścia w życie: [UZUPEŁNIJ]**

> **UWAGA PRZED PUBLIKACJĄ:** nawiasy [UZUPEŁNIJ] oznaczają obowiązkowe dane. Nie publikować, dopóki konfiguracja Firebase, okresy usuwania, działanie analityki, logowanie IP przez usługodawców, odbiorcy i kontakty nie zostaną potwierdzone w działającej wersji gry. [do weryfikacji przez prawnika / inspektora RODO]

## 1. Kto odpowiada za dane

Administratorem danych użytkowników gry „Cebulak Express — Kierunek Polska” jest **[UZUPEŁNIJ: pełna nazwa prawna organizacji]**, **[UZUPEŁNIJ: adres siedziby, państwo]**, identyfikator rejestrowy **[UZUPEŁNIJ]** (dalej „Administrator”). Kontakt w sprawach prywatności: **[UZUPEŁNIJ: aktywny adres e-mail]**. Jeśli powołano inspektora ochrony danych: **[UZUPEŁNIJ: kontakt IOD lub „nie dotyczy”]**.

Gra może być dostępna w przeglądarce, jako PWA, w osadzeniu na portalach partnerskich i jako aplikacja na Android/iOS. Podmioty prowadzące portale osadzające mogą samodzielnie przetwarzać dane związane z odwiedzaniem ich witryn; szczegóły znajdują się w ich własnych politykach. **[UZUPEŁNIJ: nazwy i relacja administrator–współadministrator lub niezależni administratorzy, jeżeli występuje]**.

## 2. Jakie dane przetwarzamy

Gra **nie wymaga rejestracji imiennej ani podawania adresu e-mail**, nie udostępnia swobodnego pola wpisywania nicka i nie przewiduje reklam spersonalizowanych. Dla udziału w rankingu korzysta jednak z **technicznego, anonimowego z nazwy konta Firebase Authentication**, które otrzymuje unikatowy identyfikator użytkownika (UID). Jest to **identyfikator pseudonimowy, nie dane anonimowe** w rozumieniu RODO, gdy może być powiązany z zachowaniem konkretnego urządzenia/użytkownika.

| Kategoria | Przykłady danych i źródło | Dlaczego i gdzie |
|---|---|---|
| Identyfikacja techniczna | UID nadany przez Firebase Anonymous Authentication; identyfikator sesji/przejazdu | Uwierzytelnianie przy zapisie do rankingu, przypisanie wyniku do tego samego gracza, kontrola nadużyć |
| Preferencje gry | Kraj wybrany przez gracza z BE, NL, DE, UK, FR, CH, NO, DK; wybrane miasto/trasa, tryb gry | Rozgrywka i klasyfikacja w Lidze Polonii; **nie jest to geolokalizacja urządzenia** |
| Dane rankingu | Nick z gotowej listy (identyfikator nickId), zaakceptowane kilometry, najlepszy wynik, kraj, data/tydzień | Publiczne zestawienia graczy i sumy krajów |
| Dane techniczne przejazdu | Seed gry, identyfikator przejazdu, liczba ticków, wejścia przycisku/tapnięć (flapTicks), czas wydania i status weryfikacji | Automatyczna weryfikacja poprawności wyniku i zapobieganie oszustwom |
| Statystyki zbiorcze | Liczba uruchomień i przejazdów, czas, wynik w km, kliknięcia udostępnienia i przejścia do portalu, otwarcia rankingu | Mierzenie użyteczności gry i jakości usług; docelowo dzienne agregaty bez trwałego zapisu surowych zdarzeń |
| Techniczne dane połączenia u usługodawców | Adres IP, parametry żądania, informacje o przeglądarce/urządzeniu (np. user agent) | Bezpieczeństwo transmisji i działanie infrastruktury; mogą być przetwarzane przez Google lub hosting niezależnie od pól w naszej bazie |

**Nie zapisujemy adresu IP ani danych urządzenia jako pól profilu gracza w Firestore.** Nie oznacza to, że IP nie przechodzi przez serwery. Google informuje, że Firebase Authentication przetwarza dane operacyjne, w tym adresy IP i informacje o przeglądarce/agencie użytkownika, w ramach działania i ochrony usługi.

### Analiza bez reklamowych identyfikatorów

Plan techniczny przewiduje własny mechanizm zdarzeń i dzienne agregaty w Firestore; **nie przewiduje Firebase Analytics ani identyfikatora reklamowego**. Jeśli zostanie zastosowany lokalny losowy identyfikator instalacji lub jego skrót/hash, trzeba sprawdzić, czy jest konieczny, jak długo istnieje i czy wymaga zgody na dostęp do informacji w urządzeniu według lokalnych zasad ePrivacy. **Samo określenie „hash” nie oznacza anonimizacji.** [do weryfikacji przez prawnika]

**Znana nieścisłość projektowa:** hash różny każdego dnia bez dodatkowego mechanizmu powiązania **nie wystarcza do obliczenia retencji D7 tych samych użytkowników**. Wdrożenie musi wybrać zgodny z prawem, przejrzysty sposób pomiaru albo zrezygnować z D7; nie obiecujemy w polityce nieistniejącej anonimizacji.

## 3. Po co i na jakiej podstawie

| Cel | Rozważana podstawa z art. 6 ust. 1 RODO | Uwaga |
|---|---|---|
| Obsługa rozgrywki i dobrowolnego rankingu, utrzymanie wyniku | **lit. b** — wykonanie umowy o korzystanie z funkcji gry, o ile prawidłowo ukształtowano warunki; w części **lit. f** jako prawnie uzasadniony interes związany z funkcjonalnością | Podstawa musi zostać dopasowana do faktycznej wersji usługi i umowy. [do weryfikacji przez prawnika] |
| Ochrona rankingu przed automatyzacją, oszustwami i nadużyciami | **lit. f** — interes Administratora i uczciwie grających | Użytkownik może sprzeciwić się przetwarzaniu opartemu na lit. f, zgodnie z RODO |
| Zbiorcza, ograniczona analityka bez reklamowego profilowania | **lit. f**, jeśli spełniono test równowagi i inne właściwe wymogi | Oddzielnie sprawdzić ePrivacy; gdy wymagana zgoda, nie korzystać ze storage/analityki przed jej uzyskaniem. [do weryfikacji przez prawnika] |
| Obsługa żądań i obowiązków prawnych | **lit. c** w zakresie rzeczywiście nałożonych obowiązków oraz **lit. f** dla obrony roszczeń | Zależnie od żądania i jurysdykcji |

Nie prowadzimy marketingu behawioralnego ani sprzedaży danych. **Nie korzystamy z mechanizmu podejmowania decyzji automatycznych o skutkach prawnych lub podobnie istotnych w rozumieniu art. 22 RODO** w planowanym zakresie; sprawdzanie poprawności przejazdu jest automatyczne i może wykluczyć wynik z tablicy — zapewniamy możliwość zgłoszenia reklamacji. **[Zweryfikować przed publikacją, jeżeli mechanizmy blokad ulegną zmianie.]**

## 4. Kto otrzymuje dane i gdzie są przetwarzane

**Google / Firebase** jest dostawcą technologii uwierzytelniania, bazy Firestore i Cloud Functions. Projekt zakłada funkcje w regionie **europe-west1** oraz wybór europejskiej lokalizacji bazy Firestore **[UZUPEŁNIJ: rzeczywista lokalizacja bazy]**. Nie należy jednak opisywać całego Firebase jako usługi działającej wyłącznie w UE: **Firebase Authentication działa w centrach danych w USA** według dokumentacji Google. Niektóre dane operacyjne i wsparcie techniczne mogą więc wiązać się z transferami do państw spoza EOG.

Podstawy transferów i role stron wynikają z aktualnych warunków przetwarzania danych Google (w tym odpowiednich mechanizmów uznanych przez RODO, np. standardowych klauzul umownych lub właściwego certyfikowanego mechanizmu, jeśli ma zastosowanie). **[UZUPEŁNIJ: ustalenia DPA, ewentualną ocenę transferu, dostawców hostingu/CDN i portali; do weryfikacji przez prawnika]**.

Odbiorcami danych mogą być także dostawcy infrastruktury i podmioty upoważnione do obsługi bezpieczeństwa i wsparcia, wyłącznie w zakresie niezbędnym do świadczenia usługi. Publiczny ranking ujawnia **wygenerowany nick, wybrany kraj, wynik i pozycję**, ale nie adres e-mail ani pełne UID.

Źródła: Google Firebase — https://firebase.google.com/support/privacy (aktualizacja dokumentu Google: 24.09.2026, dostęp: 30.10.2026); Firebase Data Processing Terms — https://firebase.google.com/terms/data-processing-terms (dostęp: 30.10.2026).

## 5. Jak długo przechowujemy dane

| Kategoria | Planowany okres |
|---|---|
| Surowe dane przejazdu w kolekcji runs | **30 dni**, następnie automatyczne usuwanie (zgodnie z projektem backendu). Potwierdzić harmonogram kasowania i logi. |
| Nick, kraj i najlepszy wynik przypisany do UID w players | **[UZUPEŁNIJ: okres, proponowane 12 miesięcy braku aktywności]** lub do skutecznego żądania usunięcia, z zastrzeżeniem obowiązków prawnych |
| Publiczny ranking tygodniowy i dzienny (z nickiem/UID w bazie) | **[UZUPEŁNIJ: okres publikacji i usuwania historycznych wpisów, proponowane 90 dni]** |
| Dzienne statystyki zbiorcze | **[UZUPEŁNIJ: np. 13 miesięcy]**; anonimowe statystyki zagregowane bez możliwości identyfikacji mogą być dalej wykorzystywane |
| UID / dane Firebase Authentication oraz techniczne logi usługodawcy | **[UZUPEŁNIJ: procedurę usuwania konta technicznego i zapisy kontraktowe]**. Retencja danych operacyjnych Google wynika z dokumentacji dostawcy. |

Wszystkie wartości „proponowane” są **projektem, a nie oświadczeniem o działającym wdrożeniu**. Administrator musi skonfigurować faktyczne usuwanie i wykonać test. Usunięcie samego lokalnego identyfikatora **nie usuwa automatycznie** profilu w Firestore ani konta Firebase Authentication.

## 6. Jakie masz prawa

Możesz żądać dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, a w stosownych przypadkach — przeniesienia danych. Możesz wnieść sprzeciw wobec przetwarzania opartego na art. 6 ust. 1 lit. f RODO. Tam, gdzie podstawą jest zgoda, możesz ją wycofać bez wpływu na zgodność wcześniejszego przetwarzania.

Wnioski: **[UZUPEŁNIJ: e-mail administratora]**. Aby ustalić, których zapisów dotyczy wniosek, może być potrzebny techniczny identyfikator gracza udostępniony w ustawieniach gry **[UZUPEŁNIJ: funkcja „mój identyfikator / usuń dane”]**. Nie żądamy dokumentu tożsamości tylko dlatego, że gracz używa pseudonimu; ewentualna weryfikacja musi być proporcjonalna. Prośba o usunięcie danych nie może pozwalać skasować danych innej osoby.

Na żądanie odpowiadamy bez zbędnej zwłoki, zasadniczo w ciągu miesiąca zgodnie z art. 12 RODO. Przysługuje prawo złożenia skargi do właściwego organu ochrony danych (np. według miejsca zwykłego pobytu, miejsca pracy lub miejsca domniemanego naruszenia; **[UZUPEŁNIJ: organ w kraju administratora]**).

## 7. Dzieci i rodziny

Gra ma sympatyczną, nieszkodliwą oprawę, ale **klasyfikacja wiekowa gry nie jest równoznaczna z podstawą prawną przetwarzania danych dzieci**. Nie prosimy graczy o datę urodzenia ani dane rodziców; nie umożliwiamy wpisania własnego nicka, czatu ani publikowania zdjęć. Wybór grup docelowych i ewentualne wymagania zgody rodzica zostaną rozstrzygnięte przed wprowadzeniem gry do sklepów. **[UZUPEŁNIJ: rzeczywiste grupy wiekowe z Play Console i App Store Connect oraz rozwiązanie dla dzieci — do weryfikacji przez prawnika]**.

Art. 8 RODO wyznacza szczególne zasady zgody dzieci dla usług społeczeństwa informacyjnego **gdy podstawą jest zgoda**, przy zróżnicowaniu progów wiekowych w UE (np. Belgia 13 lat, Francja 15 lat, Niderlandy co do zasady 16 lat). Nie oznacza to ogólnego automatycznego zakazu grania poniżej tych progów. Przy rzeczywistym kierowaniu gry do dzieci trzeba dodatkowo spełnić stosowne wymogi sklepów i unikać niepotrzebnej analityki. **[do weryfikacji przez prawnika]**

Źródła: RODO — https://eur-lex.europa.eu/eli/reg/2016/679/oj ; belgijski organ ochrony danych — https://www.autoriteprotectiondonnees.be/professionnel/rgpd-/bases-juridiques/consentement ; Google Play Families — https://support.google.com/googleplay/android-developer/answer/9867159 (dostęp: 30.10.2026).

## 8. Lokalna pamięć, bezpieczeństwo i zmiany

Gra może używać pamięci urządzenia (np. localStorage lub odpowiednika na telefonie) do zapamiętania ustawień, stanu sesji lub technicznego uwierzytelnienia. **[UZUPEŁNIJ: spis kluczy pamięci i ocena, czy ich użycie jest bezwzględnie konieczne oraz czy wymaga zgody ePrivacy]**. Przy osadzeniu w portalu pamięć może być partycjonowana przez przeglądarkę; wynik i identyfikator instalacji nie muszą być współdzielone między portalami.

Ograniczamy dostęp do danych poprzez reguły Firestore, funkcje serwera weryfikujące wyniki, kontrolę uprawnień i środki bezpieczeństwa dostawców. Żadne zabezpieczenie nie gwarantuje absolutnego braku ryzyka.

Aktualizacja polityki będzie publikowana pod **[UZUPEŁNIJ: stały publiczny HTTPS URL]**, wraz z datą wejścia w życie; o istotnych zmianach w przetwarzaniu powiadomimy odpowiednio do ich znaczenia.

---

## English — short privacy summary (not a substitute for a complete translation)

**Controller:** [INSERT LEGAL ENTITY, REGISTERED ADDRESS, CONTACT EMAIL]. **Effective date:** [INSERT].

Cebulak Express is a casual game available on the web and mobile. No named sign-up, free-text nickname, chat or personalised ads are planned. To provide the optional leaderboard, we use Firebase Anonymous Authentication, which assigns a pseudonymous user ID; we also process a preselected nickname, player-selected home country, game scores, run verification data and timestamps. Your selected country is **not** device geolocation. We plan to store raw run data for 30 days and aggregate, non-advertising usage statistics. Other retention periods are [TO BE CONFIRMED].

Google/Firebase supplies authentication, database and cloud processing services. Some services can operate in EU regions, but **Firebase Authentication operates in US data centres** and technical IP/device data may be processed by service providers. The full Polish policy describes the lawful bases, data recipients, international transfers, retention and your rights to access, object, correct or delete data and complain to a supervisory authority. Contact: [INSERT EMAIL]. If children are in scope, additional protections and applicable platform rules must be confirmed before release.

**Before non-Polish distribution:** provide an accurate, complete, legally reviewed English version and, where necessary, local-language notices. [do weryfikacji przez prawnika]

---

## Kontrola wydawnicza (część wewnętrzna, nie publikować z polityką)

- [ ] Podmiot prawny + dane adresowe, e-mail do obsługi praw RODO, organ nadzorczy, publiczny HTTPS URL.
- [ ] Potwierdzony dokument umowy Google/Firebase i region każdej usługi (Auth USA, Firestore location, Functions).
- [ ] Audyt rzeczywistych danych w Firestore, Authentication, logach funkcji, CDN i formularzach portali.
- [ ] Działa kasowanie po 30 dniach; ustalone retencje pozostałych kolekcji i backupów.
- [ ] Działa usunięcie profilu UID i uwierzytelnienia, obsługa praw osoby anonimowej i odpowiedzi na skargi.
- [ ] Przegląd ePrivacy dla localStorage/identyfikatora instalacji i rozwiązania problemu D7.
- [ ] Deklaracje Data safety i App Privacy odpowiadają rzeczywistej implementacji i konfiguracji SDK.
- [ ] Ustalone target age groups, ochrona dzieci, brak reklam, brak nieujawnionych SDK.
- [ ] **[do weryfikacji przez prawnika]** ostateczne podstawy prawne, test interesu, transfery, art. 8 RODO, stosunek do portali, obowiązek dostarczenia innych wersji językowych.

Źródła podstawowe (dostęp: 30.10.2026): RODO https://eur-lex.europa.eu/eli/reg/2016/679/oj ; Firebase privacy https://firebase.google.com/support/privacy ; Firebase DPA https://firebase.google.com/terms/data-processing-terms ; Anonymous Auth https://firebase.google.com/docs/auth/web/anonymous-auth ; specyfikacje projektu: docs/zlecenia/11-firebase-backend.md oraz docs/zlecenia/17-analityka.md; nadrzędne decyzje docs/GDD.md.
