# Wejście do Google Play i App Store — wymagania prawne, treści i konta

> Lista kontrolna licencji przed każdym wydaniem: `docs/prawo/przed-wydaniem.md`.

**Stan informacji: 30.10.2026.** Dotyczy „Cebulak Express — Kierunek Polska” (Capacitor 8, Android targetSdk 36, następnie iOS; gra bez reklam, bez kont imiennych, z pseudonimowym rankingiem Firebase). Stan zasad sklepów może się zmienić przed publikacją — sprawdzić bezpośrednio w panelach w dniu zgłoszenia.

## 1. Google Play — typ konta i testy

| Wariant konta | Co oznacza | Decyzja dla projektu |
|---|---|---|
| **Organizacja** | Rejestracja na podmiot prawny, weryfikacja organizacji i osoby upoważnionej; w odpowiednich przypadkach wymagany numer D-U-N-S i dokumenty | **Rekomendowane**, jeśli gra formalnie należy do organizacji. Przygotować dane rejestrowe i możliwość potwierdzenia powiązania z organizacją |
| **Osoba fizyczna** | Konto prowadzone przez osobę, z innym zakresem danych weryfikacyjnych oraz publikowanych kontaktów | Alternatywa tylko jeśli jest faktycznym wydawcą; nie zakładać, że organizacja to tylko „nazwa wyświetlana” |

**Istotny warunek:** nowe osobiste konta deweloperskie utworzone **po 13.11.2023** podlegają wymogowi zamkniętych testów aplikacji z **co najmniej 12 testerami zapisanymi przez nieprzerwane 14 dni** przed wnioskiem o dostęp do kanału produkcyjnego; samo spełnienie testu nie jest automatyczną zgodą na publikację. Zweryfikować bieżącą kwalifikację konta w Play Console. Na kontach organizacji powyższy *konkretny obowiązek nowych kont osobistych* nie obowiązuje w tej samej postaci, ale pozostają inne testy i weryfikacje. [do weryfikacji na konkretnym koncie]

Źródła (dostęp: 30.10.2026):
- Google Play Console Help, testing requirements: https://support.google.com/googleplay/android-developer/answer/14151465
- Google, wymagania konta: https://support.google.com/googleplay/android-developer/answer/10841920
- Google, weryfikacja konta dewelopera: https://support.google.com/googleplay/android-developer/answer/13634885

**Działanie:** najpierw wybierz faktycznego prawnego właściciela (wydawcę i administratora danych), potem zakładaj konto. Dane weryfikacyjne sklepu muszą być spójne z polityką prywatności i stroną kontaktową. **[do weryfikacji przez prawnika / księgowego]**

## 2. Google Play — przygotowanie paczki i formularzy

### API, podpisywanie i technikalia
- **Android target API level 36 (Android 16)**: wymagane dla nowych aplikacji i aktualizacji przeznaczonych na telefony/tablety od **31.08.2026**, z wyjątkami/ewentualnymi przedłużeniami na zasadach Google. Projekt przewiduje compileSdk/targetSdk 36; **trzeba potwierdzić faktyczne wartości wynikowego APK/AAB**.
- Publikacja w Play zwykle wymaga Android App Bundle (AAB), właściwego podpisywania i zarządzania kluczem wydawniczym. Sam plik debug APK do testów **nie jest artefaktem wydania sklepowego**.
- Upewnić się, że zewnętrzne skrypty i osadzone treści webowe nie zmieniają deklarowanych uprawnień ani praktyk danych. Przegląd finalnego AndroidManifest i zależności Capacitor.
- Play App Signing, nazwa pakietu i stały identyfikator wydawcy muszą być rozstrzygnięte przed rejestracją aplikacji; chronić klucz podpisywania i dostęp do Play Console.

Źródło: https://support.google.com/googleplay/android-developer/answer/11926878 (dostęp: 30.10.2026); Android App Bundle https://developer.android.com/guide/app-bundle (dostęp: 30.10.2026).

### Data safety — nie zaznaczać „nie zbieramy danych”
Planowana gra wykorzystuje Firebase Anonymous Authentication i Firestore. **UID, wyniki, nickId, wybrany kraj, metadane próby** są danymi przetwarzanymi przez aplikację; Google może mieć dane operacyjne takie jak IP. Deklarację w Play Console należy przygotować na podstawie **rzeczywistej** finalnej paczki, bibliotek, transmisji i polityki przetwarzania, a nie tylko planu projektowego.

| Rodzaj/obszar | Stan projektowy i sposób zadeklarowania |
|---|---|
| Tożsamość | UID pseudonimowego konta Firebase — sprawdzić kategorie „User IDs” i powiązanie z graczem |
| Aktywność w aplikacji | Wynik, km, kraj i dane przejazdów; rozważyć kategorie „App activity” (konfiguracja zależy od dokładnego zakresu) |
| Diagnostyka | Logowanie i dane techniczne Google/hostingu; sprawdzić jakie dane przekazuje faktyczny SDK |
| Analiza | Własne zbiorcze liczniki bez reklamowego SDK; ocenić, czy identyfikator instalacji i telemetria tworzą deklarowane „collection” |
| Udostępnianie danych | Odróżnić przetwarzanie przez procesora od kwalifikowanej kategorii „sharing” Google; udokumentować podstawę wyłączeń, jeśli dotyczy |
| Zabezpieczenia | HTTPS w transmisji, dostęp do danych, żądanie usunięcia, realne retencje; zaznaczać wyłącznie działające mechanizmy |
| Dzieci | Jeżeli gra jest skierowana także do dzieci, użyć prawidłowych target age groups i wykazać zgodność z Families Policy |

**Polityka prywatności pod publicznym, stabilnym URL HTTPS** w aplikacji i w metadanych Play, z danymi administratora oraz rzeczywistymi okresami przechowywania. Nawet aplikacja z minimalnymi danymi może podlegać obowiązkowi podania polityki.

Google deklaruje osobne obowiązki dotyczące **usuwania konta i danych**, jeżeli aplikacja pozwala tworzyć konto. Ponieważ Firebase Anonymous Auth tworzy techniczną tożsamość bez rejestracji imiennej, **nie należy arbitralnie zakładać, że zasada kont nie ma zastosowania**. Wersja bezpieczna: przygotować funkcję „Usuń dane / UID” w grze i stronę WWW do zgłoszenia żądania; ustalić kwalifikację z Google i prawnikiem. [do weryfikacji przez prawnika / Play Console]

Źródła (dostęp: 30.10.2026):
- Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Play, polityka prywatności: https://support.google.com/googleplay/android-developer/answer/9859455
- Play, usuwanie konta: https://support.google.com/googleplay/android-developer/answer/13327111
- Firebase privacy: https://firebase.google.com/support/privacy

### Klasyfikacja wiekowa, dzieci i bezpieczeństwo treści
- Wypełnić **IARC content rating questionnaire**, opisując faktyczne elementy: gra zręcznościowa, kolizje w stylu komediowym, brak hazardu/nagród, brak czatu, brak treści generowanej przez graczy; nie **deklarować z góry** PEGI 3 lub innego wyniku, bo klasę nadaje system oceny.
- Zdefiniować **Target audience and content**. Hasło marketingowe „gra dla każdego” nie zastępuje decyzji o grupach wieku. Dla grup dziecięcych obowiązują dodatkowe **Families Policy Requirements** (ograniczenia SDK, dostępnych treści, reklam i niektórych funkcji).
- Brak reklam nie znosi obowiązków w zakresie prywatności dzieci, dostosowania treści, deklaracji grupy odbiorców i podmiotów zewnętrznych.
- Mechanika rankingowa nie powinna wymagać rzeczywistych danych dziecka; pseudonim generowany z listy. Rozważyć domyślne wyłączenie rankingu dla najmłodszych, jeśli wynika to z finalnej strategii zgodności.

Źródła (dostęp: 30.10.2026):
- IARC: https://support.google.com/googleplay/android-developer/answer/9898843
- Target audience / Families: https://support.google.com/googleplay/android-developer/answer/9867159
- Families policies: https://support.google.com/googleplay/android-developer/answer/9893335

### Nazwa, własność intelektualna, prezentacja
- Unikać kopiowania cudzych nazw, grafik, ikon, opisów, zrzutów ekranu i wyglądu postaci. Zgodność z politykami Google **Impersonation** i **Intellectual Property**. Prawa do samej nazwy „Cebulak Express” wymagają badania opisanego w znaki.md.
- Nie sugerować oficjalnego poparcia przez Polskę, UE, organizacje państwowe, marki motoryzacyjne ani wydawców gier. W opisach i materiałach stosować wyłącznie własne postacie i generyczne elementy.
- Przygotować prawdziwe zrzuty aplikacji, jasne informacje o rankingu, materiały ASSETS.md dokumentujące prawa do grafik/muzyki/fontów; zakaz marketingowego podszywania się.
- **Nie kopiować nazw konkurencyjnych mechanik i gier do metadanych**.

Źródła (dostęp: 30.10.2026):
- Google Play impersonation: https://support.google.com/googleplay/android-developer/answer/18265346
- Google Play IP: https://support.google.com/googleplay/android-developer/answer/18258653

## 3. Android Developer Verification dla APK poza Google Play (2026–2027)

Google rozszerza **weryfikację tożsamości deweloperów aplikacji Android** dystrybuowanych także **poza sklepem Play** na certyfikowanych urządzeniach, według etapów geograficznych. Według harmonogramu Google początkowe wdrożenie zaczyna się **we wrześniu 2026** w Brazylii, Indonezji, Singapurze i Tajlandii; rozszerzenie globalne zaplanowano na **2027**. Dokładne terminy, tryby wyjątków, okresy przejściowe i warunki dla konkretnego urządzenia należy ponownie zweryfikować przed dystrybucją.

**Nie oznacza to, że każdy APK instalowany ręcznie od razu jest nielegalny ani że każda instalacja sideload na świecie zostaje obecnie zablokowana.** Ograniczenia zależą od fazy wdrożenia i środowiska. Nawet jeśli pierwsze wydanie jest dostępne tylko jako APK, należy przygotować konto zweryfikowanego dewelopera i podpisywanie, a użytkownikom przekazywać aplikację z jednej kontrolowanej strony HTTPS.

Źródło: Android Developers, Developer Verification — https://developer.android.com/developer-verification (dostęp: 30.10.2026).

## 4. App Store (iOS) — najważniejsze ryzyka

| Wytyczna / zagadnienie | Zastosowanie do gry | Działanie |
|---|---|---|
| **4.1 Copycats** | Nie tworzyć imitacji innej gry, rozpoznawalnej oprawy, ikon lub nazwy | Oryginalna grafika, UX i marka, osobny research znaków |
| **4.3 Spam** | Apple może odrzucać powielone aplikacje i klony pod wieloma nazwami/paczkami | Jedna oryginalna gra z odróżnialną treścią; portale nie powinny wydawać identycznych kopii jako niezależnych aplikacji |
| **4.2 Minimum Functionality** | App Store może odrzucić aplikację będącą jedynie opakowaną witryną/linkami | Capacitor powinien dostarczać prawdziwą interaktywną grę ze sprawnym działaniem mobilnym; przetestować natywne integracje i offline |
| **5.1 Privacy** | Wymóg przejrzystości przetwarzania danych, ewentualnych zgód, praw użytkownika | Publikowalna polityka, App Privacy, prawidłowe konfiguracje uprawnień i SDK |
| **Account deletion** | Jeśli aplikacja umożliwia tworzenie kont, regulamin Apple może wymagać inicjowania usunięcia konta z aplikacji | Ocenić kwalifikację technicznego konta Anonymous Auth; wdrożyć łatwe usuwanie danych jako rozwiązanie ostrożnościowe |

**App Privacy (nutrition labels)** w App Store Connect: osobno przeanalizować identyfikatory (UID/instalacja), aktywność, diagnozę, dane przekazywane do Google i czy dana kategoria jest **linked to user** lub używana do **tracking** według definicji Apple. Brak reklam =/= automatycznie „Data Not Collected”. Nie deklarować braku śledzenia przed audytem wszystkich SDK. Zweryfikować także materiały wizualne w App Store i klasyfikację wiekową Apple.

Źródła (dostęp: 30.10.2026):
- App Review Guidelines (4.1, 4.2, 4.3, 5.1): https://developer.apple.com/app-store/review/guidelines/
- App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Account deletion 5.1.1: https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/

## 5. Matryca publikacji MVP

| Element | Android APK poza Play | Google Play | App Store |
|---|---|---|---|
| Aktywna polityka prywatności | **Tak**, w grze i pod publicznym URL | **Tak**, URL w panelu i w aplikacji | **Tak**, URL i informacje App Privacy |
| Legalna nazwa i zasoby | **Tak** | **Tak** + polityki IP | **Tak** + 4.1 / 4.3 |
| Konto dewelopera | Identyfikacja zależnie od fazy Android Verification | Konto Play zweryfikowane: org/osoba | Apple Developer + App Store Connect |
| Ranking i Firebase | Bezpieczne zasady, UID, żądanie usunięcia | Formularz Data safety, ewentualnie zasady deletion | App Privacy, ewentualnie deletion |
| Wiek | Ogólne przepisy prywatności i ochrony dzieci | IARC + target audience + Families według wieku | Apple age rating + Kids Category, jeżeli wybierana |
| Kompilacja | Podpisane wydanie APK | AAB i targetSdk 36, testy/ocena konta | Produkcyjna aplikacja iOS i review Apple |

## 6. Lista do zatwierdzenia przed przesłaniem

- [ ] **Wydawca**: formalny podmiot, dane rejestracyjne, adres kontaktowy, dostęp do kont, podpisywanie.
- [ ] **Clearance znaku** (znaki.md), brak cudzych znaków w oprawie i metadanych, dowody licencji zasobów.
- [ ] **Deklaracja dzieci / wiek** i brak nieudokumentowanych SDK zbierających dane.
- [ ] **Finalna polityka prywatności** (bez placeholderów), kontakt, retencja, prawa użytkowników, realny region Firebase i transfery.
- [ ] **Data safety / App Privacy** po inspekcji finalnego binarium i ruchu sieciowego, nie wyłącznie na podstawie specyfikacji.
- [ ] **Możliwość usunięcia anonimowego konta i profilu**, dowód działania.
- [ ] **Google**: rzeczywiste targetSdk=36, AAB, konto i (dla kwalifikujących się osobistych) zamknięte testy.
- [ ] **Apple**: 4.1/4.2/4.3, oryginalne doświadczenie mobilne i klasyfikacja wiekowa.
- [ ] **APK**: aktualny stan Android Developer Verification dla krajów, w których faktycznie prowadzona będzie dystrybucja.
- [ ] **[do weryfikacji przez prawnika]** dane podmiotu, grupy wieku, transfery, wymogi konsumenckie i lokalne dla rynków publikacji.

**Pytania do koordynatora:** kto jest wydawcą prawnym w Play/App Store; jakie faktyczne target age groups; czy gracze mogą usuwać UID w grze; jakie kraje mają dostać oficjalną dystrybucję APK poza sklepem; czy planowana jest sponsorka z nagrodami (obecnie nie).

**Źródło projektowe:** docs/GDD.md, decyzje D1–D9, oraz docs/zlecenia/11-firebase-backend.md i docs/zlecenia/17-analityka.md, stan: 30.10.2026.
