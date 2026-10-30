# iOS — budowanie i przygotowanie do dystrybucji

Stan na 30.10.2026. Ta gałąź przygotowuje **kompilację aplikacji na symulator iOS bez podpisywania**. Nie publikuje aplikacji ani nie zawiera certyfikatów, profili provisioning, kluczy Apple czy Firebase.

## Konfiguracja

| Ustawienie | Wartość |
|---|---|
| Nazwa wyświetlana | Cebulak Express |
| Bundle ID | `com.woogitsugames.cebulakexpress` |
| Runtime | Capacitor 8.5.3, WKWebView |
| Zarządzanie natywnymi zależnościami | Swift Package Manager (SPM) |
| Minimalny iOS | 15.0 |
| Narzędzia | macOS, Xcode 26.0+, Node 22, npm |
| Orientacja | wyłącznie portrait na iPhone i iPad |
| iPad | `UIRequiresFullScreen = true` (bez wielookienkowego układu wymuszającego inne orientacje) |
| Zasoby startowe | Tymczasowa ikona własna, jednolity ciemny ekran startowy; do zastąpienia przez zlecenie 10 |

Projekt `ios/App/App.xcodeproj` bazuje na oficjalnym szablonie `ios-spm-template` Capacitor 8.5.3, odpowiadającym `npx cap add ios --packagemanager SPM`. Na maszynie bez macOS nie uruchomiono samego generatora ani Xcode. **Nie uruchamiaj ponownie `cap add ios` w istniejącym katalogu — korzystaj z `cap sync ios`.**

### Pierwszy build na Macu

```bash
npm ci
npm run typecheck
npm test
npm run build
npx cap sync ios
xcodebuild -resolvePackageDependencies -project ios/App/App.xcodeproj -scheme App
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -configuration Debug -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build
```

Do uruchomienia w symulatorze otwórz `ios/App/App.xcodeproj` w Xcode, wybierz symulator i uruchom schemat `App`. Po każdej zmianie plików web lub pluginów wykonaj `npm run ios:sync`. Katalog `ios/App/App/public` i generowana konfiguracja Capacitor są ignorowane przez Git — zawsze odtwarzane przez `cap sync ios`.

Workflow `.github/workflows/ios.yml` sprawdza instalację, typy, testy, build web, synchronizację natywną, rozwiązanie zależności SPM i kompilację symulatora **bez podpisu** na `macos-latest`. Zielony workflow potwierdza kompilację; nie zastępuje uruchomienia na fizycznym iPhonie / iPadzie.

## Dopiero przed publikacją w App Store

1. Utworzyć lub użyć aktywnego członkostwa **Apple Developer Program** dla właściwego wydawcy (w przypadku organizacji mogą być potrzebne dane firmy i D‑U‑N‑S). Utworzyć rekord aplikacji w **App Store Connect** z powyższym Bundle ID.
2. W Xcode wybrać właściwy **Team**, skonfigurować podpisywanie dystrybucyjne (certyfikat i profil, ręcznie lub Automatic Signing). Nie zapisywać prywatnych kluczy `.p12`, `.mobileprovision`, plików API key `.p8` ani haseł w repozytorium. W razie potrzeby CI z podpisem przygotować osobny, chroniony workflow i bezpieczny magazyn sekretów.
3. Zastąpić ikony/splash docelowymi zasobami ze zlecenia 10; sprawdzić kompatybilność iOS/iPad, safe area, pause/resume, bezpieczne otwieranie linków, udostępnianie i haptics ze zlecenia 24. Podnieść `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` przed kolejnymi buildami.
4. Przygotować politykę prywatności pod działającym HTTPS URL, opis, zrzuty ekranów **rzeczywistej rozgrywki**, kategorię, rating wiekowy i odpowiedzi na pytania dotyczące szyfrowania w App Store Connect.
5. Zarchiwizować podpisany build `Release` na Macu i wysłać do **TestFlight** przez Xcode/Transporter. Przetestować na urządzeniach, następnie przeprowadzić osobny proces App Review. Testy zewnętrzne TestFlight mogą wymagać przeglądu Apple.

Źródła: [Capacitor iOS](https://capacitorjs.com/docs/ios), [SPM](https://capacitorjs.com/docs/ios/spm), [środowisko](https://capacitorjs.com/docs/getting-started/environment-setup), [Apple Developer](https://developer.apple.com/programs/).

## Ryzyka App Review (4.1, 4.2 i 4.3)

- **4.1 Copycats / 4.3 Spam:** nie tworzyć ośmiu niemal identycznych aplikacji na osiem krajów. Jedna gra zawiera 8 tras i regionalne scenerie, przejazdy do Polski, przeszkody infrastrukturalne, znajdźki i rywalizację Ligi Polonii. Używać własnej grafiki, dźwięków, interfejsu i postaci. Nie porównywać opisu do nazw cudzych gier ani nie używać cudzych marek.
- **4.2 Minimum Functionality:** aplikacja musi oferować samodzielną rozgrywkę, nie jedynie otwierać portal w WebView. Udostępnianie wyników i opcjonalne haptics są dodatkiem; nawet bez backendu gracz powinien móc rozpocząć rozgrywkę lokalnie. Zweryfikować zachowanie offline oraz brak ekranów-pustych odnośników.
- Propozycja opisu **App Review Notes**: „Jednoprzyciskowa gra zręcznościowa o humorystycznej podróży przeładowanym kombi do Polski. Gracz wybiera jeden z ośmiu krajów wyjazdu i pokonuje zilustrowane etapy podróży, zbiera znajdźki i walczy o kilometry w międzynarodowym rankingu. Gra ma własne ilustracje, mechanikę tras oraz weryfikowane wyniki; jest jednym produktem, a nie wariantami regionalnymi”. Opisywać tylko funkcje rzeczywiście ukończone w momencie wysyłki.

Apple: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) (w szczególności 4.1–4.3). **Zgodność weryfikuje Apple, nie sam fakt zielonego CI.**

## App Privacy — robocza mapa danych

**Źródło docelowe:** `functions/PRIVACY.md` ze zlecenia 11. W `main` plik ten jeszcze **nie istnieje**; poniższa tabela wynika wyłącznie z kontraktu zlecenia 11 i nie stanowi zatwierdzonych deklaracji App Store. Po scaleniu zleceń 11, 17 i 24 trzeba przeprowadzić audyt rzeczywistej implementacji i usług zewnętrznych.

| Dane / planowane przetwarzanie | Kategoria Apple do sprawdzenia | Cel / powiązanie |
|---|---|---|
| Firebase Anonymous Auth: stały, losowy `uid` | **Identifiers → User ID** | App Functionality (logowanie do rankingu); ostrożnie traktować jako dane powiązane z użytkownikiem, mimo braku imienia i e-maila |
| Wybrana trasa, kraj, `nickId` z listy, km, zdarzenia przejazdów i wpis w rankingu | **User Content → Gameplay Content** | App Functionality; dane zapisane pod `uid`, potencjalnie powiązane z użytkownikiem; nie jest to automatyczny pomiar lokalizacji GPS |
| Zapytania do Cloud Functions | **potwierdzić zakres metadanych dostawcy** | Zgodnie z dokumentacją Firebase Functions mogą zbierać nazwę wywoływanej funkcji i IP klienta; **brak IP w Firestore nie oznacza, że IP nie jest przetwarzane przez infrastrukturę** |
| Zdarzenia analityczne ze zlecenia 17 (jeżeli zostaną dołączone) | **Usage Data → Product Interaction / Other Usage Data** | Analytics, tylko po potwierdzeniu faktycznych zdarzeń, identyfikatorów, retencji i zgód |
| Crash reporting, wydajność, identyfikatory instalacji lub App Check (jeżeli dodane) | **Diagnostics / Identifiers / inne zależnie od SDK** | Zweryfikować w dokumentacji każdej konkretnej biblioteki i jej manifestach przed publikacją |

Wymagane decyzje do podjęcia w **App Store Connect → App Privacy**:
- Zgłosić wszystkie faktycznie zbierane typy danych, cel użycia i czy są powiązane z użytkownikiem. Pseudonimowość nie jest automatycznie anonimowością według Apple.
- W planowanej wersji **bez spersonalizowanych reklam i bez łączenia danych między aplikacjami** — brak deklarowanego tracking / potrzeby ATT, **o ile** integracja nie doda trackerów reklamowych lub pomiarowych.
- Nie deklarować lokalizacji, kontaktów, e-maila, zakupów ani identyfikatorów urządzenia bez potwierdzenia ich rzeczywistego pozyskiwania. Nie wolno także oznaczyć „Data Not Collected”, gdy aktywne są Auth / leaderboard i dane trafiają do Firebase.
- Retencja planowana przez zlecenie 11: **`runs` = 30 dni** (tylko po faktycznym wdrożeniu zadania kasowania). Okres przechowywania `players`, `leaderboard`, `league`, logów usługowych i procedurę usuwania danych należy osobno ustalić i opisać w polityce prywatności.
- Sprawdzić **PrivacyInfo.xcprivacy** i wymagane uzasadnienia użycia API (np. UserDefaults w Preferences) dla wszystkich ostatecznie dodanych pluginów natywnych. Podobnie sprawdzić faktycznie połączone SDK i ich deklaracje.

Źródła: [Apple App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/), [Firebase — disclosure for Apple](https://firebase.google.com/docs/ios/app-store-data-collection).

## Integracja, ograniczenia i pytania

- Zlecenie **24** (adaptery natywne) nie jest jeszcze scalone. Po scaleniu wykonać `npm run ios:sync`, sprawdzić dopisane pluginy do `ios/App/CapApp-SPM/Package.swift`, uprawnienia `Info.plist` i funkcje share/haptics/storage na urządzeniu. Nie edytować ręcznie pliku `Package.swift`, ponieważ zarządza nim Capacitor.
- Zlecenie **11** nie dostarczyło jeszcze `functions/PRIVACY.md`: zgłoszenie App Privacy ma pozostać otwarte do audytu po scałkowaniu backendu oraz analityki.
- Docelowa ikona i splash zależą od zlecenia **10**. Aktualnie użyte pliki są bezpiecznymi zaślepkami, nie gotowym brandingiem App Store.
- **Do sprawdzenia przez koordynatora:** rzeczywiste uprawnienia i integracje natywne po 24; finalne etykiety prywatności, retencja i dostawcy po 11/17; dostępność nazwy / znaku towarowego; uruchomienie UI na iPhone/iPad.
