# iOS — kompilacja, prywatność i TestFlight

Stan: 30.10.2026. Nazwa: **Cebulak Express**; Bundle ID: `com.woogitsugames.cebulakexpress`; Capacitor 8.5.3, Swift Package Manager (SPM), iOS 15+, orientacja pionowa na iPhone i iPad. Nie przechowujemy w repo certyfikatów ani plików podpisujących.

## Build iOS (symulator, bez podpisu)

Workflow: [iOS (symulator)](https://github.com/woogitsugames/cebulak-express/actions/workflows/ios.yml). Zmiany w `ios/**`, `package*.json`, `capacitor.config.ts` lub workflow uruchamiają go w PR; dostępne jest też `workflow_dispatch`. Runner `macos-26` i kontrola Xcode 26+. Sekwencja: Node 22, `npm ci`, TypeScript, Vitest, Vite, `cap sync ios`, ikona i splash, `plutil`, SPM, `xcodebuild` dla symulatora z `CODE_SIGNING_ALLOWED=NO` i `CODE_SIGNING_REQUIRED=NO`. Ostatni krok sprawdza obecność `PrivacyInfo.xcprivacy` w `App.app`.

Na komputerze Mac z Xcode 26+:

```bash
npm ci
npm run typecheck
npm test
npm run ios:sync
xcodebuild -resolvePackageDependencies -project ios/App/App.xcodeproj -scheme App
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -configuration Debug -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build
```

Nie uruchamiać `cap add ios` w istniejącym projekcie. `npm run ios:sync` wykonuje build web, synchronizację pluginów i odtwarza ikony/splash. Plik `ios/App/CapApp-SPM/Package.swift` jest generowany przez CLI Capacitor — nie edytować ręcznie. `macos-26` jest obsługiwany przez GitHub; w przypadku rzeczywistej niedostępności wybierać tylko inny runner z Xcode 26+.

## Branding z `public/assets/brand/`

Używamy `public/assets/brand/icon-1024.png` i `public/assets/brand/splash-2732.png`. Kopie do generatora: `assets/icon-only.png` (1024×1024) oraz `assets/splash.png` (2732×2732). Generator używa dokładnej wersji 3.0.5, opublikowanej wcześniej niż dwa tygodnie przed zleceniem, uruchamianej na żądanie (bez stałej zależności npm):

```bash
npx --yes @capacitor/assets@3.0.5 generate --ios --assetPath assets --splashBackgroundColor '#14654F'
```

Wykonanie `npm run ios:assets` jest równoważne. Źródła, autorstwo i licencje: `public/assets/brand/ASSETS.md`, `assets/ASSETS.md`, `ios/ASSETS.md`. Zmiany generatora w `ios/App/App/Assets.xcassets` i storyboardzie powinny zostać sprawdzone na ekranach iPhone/iPad przed archiwizacją.

## Prywatność i App Privacy

`ios/App/App/PrivacyInfo.xcprivacy` jest dołączony jako zasób targetu **App** w `project.pbxproj`.

| Deklaracja | Znaczenie |
|---|---|
| `NSPrivacyTracking=false`, pusta lista domen | Brak śledzenia między aplikacjami i reklam personalizowanych w aktualnej konfiguracji |
| `NSPrivacyAccessedAPICategoryUserDefaults` z powodem `CA92.1` | `@capacitor/preferences` odczytuje/zapisuje ustawienia tylko własnej aplikacji, bez App Group |
| `NSPrivacyCollectedDataTypeUserID`, linked=true | Firebase Anonymous Auth: pseudonimowy UID służący działaniu rankingu |
| `NSPrivacyCollectedDataTypeGameplayContent`, linked=true | Nick z listy, kraj, trasa, wyniki i rekordy powiązane z UID; cel: App Functionality |
| `NSPrivacyCollectedDataTypeProductInteraction`, linked=false | Zdarzenia aplikacji przesyłane bez UID do dobowych agregatów; cel: Analytics |

Źródła analizy: **`functions/PRIVACY.md`** (w zleceniu omyłkowo wskazano `firebase/PRIVACY.md`, którego w gałęzi integracyjnej nie ma) oraz `docs/analityka.md`. Serwer rankingu przewiduje przechowywanie `runs` przez 30 dni i danych limitów przez 2 dni; retencja `players`, `leaderboard`, `daily`, `league` oraz agregatów `stats` nadal wymaga decyzji administratora. Identyfikator instalacji i dzienny hash retencji pozostają lokalne, ale mogą podlegać ePrivacy. Brak IP w Firestore **nie oznacza braku przetwarzania IP przez Google/Firebase**; logi infrastruktury i pełne SDK trzeba sprawdzić osobno.

Ostateczna deklaracja w **App Store Connect → App Privacy** wymaga ponownej kontroli aktualnych pluginów i SDK, konfiguracji produkcyjnego Firebase, logów, retencji i zgód; nie wybierać „Data Not Collected”. Zielony build nie jest audytem RODO ani akceptacją Apple. Z Xcode wyeksportować Privacy Report i porównać z rzeczywistą aplikacją.

Dokumentacja: [Apple — Required Reason APIs](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api), [Privacy Manifests](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files), [Firebase — Apple data collection](https://firebase.google.com/docs/ios/app-store-data-collection).

## Kroki właściciela do TestFlight

1. **Apple Developer:** potwierdzić aktywne członkostwo programu i właściwy podmiot prawny/wydawcę, w razie potrzeby D-U-N-S.
2. **App Store Connect:** założyć App ID `com.woogitsugames.cebulakexpress` w Apple Developer i nową aplikację z identycznym Bundle ID w App Store Connect. Wybierać właściwy Team.
3. **Próby na urządzeniach:** uruchomić projekt w Xcode 26+, sprawdzić fizycznego iPhone'a oraz iPada, ikonę, splash, portrait, safe area, offline, powrót z tła, haptics, Share i linki.
4. **Podpisanie:** ustawić Automatic Signing z kontem deweloperskim lub własny certyfikat dystrybucyjny i provisioning profile, podnieść `MARKETING_VERSION` i unikalny, rosnący `CURRENT_PROJECT_VERSION`. Nie umieszczać `.p12`, `.p8`, `.mobileprovision`, haseł ani kluczy API w Git.
5. **Prywatność i sklep:** opublikować politykę prywatności pod HTTPS, ustalić administratora, retencję i procedurę kasowania danych. Wypełnić App Privacy i wymagane zgody; podać dane kontaktowe, kategorię, wiek, opis, zrzuty z rzeczywistej gry, App Review Notes i oświadczenie o szyfrowaniu. Funkcje backendowe opisywać tylko jeśli wdrożone.
6. **Archive i upload:** w Xcode wybrać `Any iOS Device (arm64)`, zbudować podpisany Release `Product → Archive`, zweryfikować i przesłać przez Organizer / Transporter do App Store Connect. Build symulatora bez podpisu nie służy do dystrybucji.
7. **TestFlight:** zaczekać na przetworzenie buildu, dodać testerów wewnętrznych. Dla testerów zewnętrznych uzupełnić dane do Beta App Review i w razie potrzeby uzyskać akceptację Apple; przejrzeć crash logi i opinie testerów.

## Zależność od integracji i ryzyka

W dniu przygotowania tego zadania `main` nie miał jeszcze `ios/` ani zasobów `public/assets/brand/`. Aby PR miał kompletną bazę iOS, przeniesiono pliki z gałęzi integracyjnej PR #32. **Koordynator** powinien najpierw scalić PR #32 i skontrolować konfliktujące pliki, szczególnie `package.json`, `package-lock.json`, `ios/`, `docs/ios.md` oraz branding. PR #39 nie powinien zastępować całej integracji gry.

Ryzyka App Review: 4.1/4.3 (wyłącznie autorskie treści i jedna aplikacja z trasami, bez klonów) oraz 4.2 (samodzielna grywalność offline). Testy symulatora nie obejmują podpisywania, TestFlight, działania urządzenia ani przeglądu Apple.
