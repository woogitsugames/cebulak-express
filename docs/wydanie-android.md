# Wydanie Android / Google Play — instrukcja właściciela

**Projekt:** Cebulak Express: Do Polski, aplikacja com.woogitsugames.cebulakexpress.
**Stan:** 30.10.2026. Android/Capacitor 8, targetSdk 36, ścieżka Google Play: internal testing.
**Bez automatycznej publikacji produkcyjnej.** Tag v* buduje AAB, a wysyłka na internal testing wymaga ręcznego zaznaczenia publish_internal.

## 1. Sprawdź gotowość prawno-produktową

- Wydawcą w Play musi być prawdziwy właściciel praw do gry. Ustal podmiot przed założeniem konta; zob. docs/prawo/sklepy.md oraz docs/prawo/znaki.md.
- Przejrzyj finalne funkcje i metadane PL docs/sklep/opis-pl.md oraz EN docs/sklep/opis-en.md. Nie obiecuj dziennego wyzwania, rankingu, 8 krajów ani udostępniania, jeśli nie działają.
- Zweryfikuj uprawnienia, licencje grafik, publiczny HTTPS URL polityki prywatności i formularze IARC / grupa docelowa.
- Brak materiałów graficznych NIE uprawnia do fikcyjnych zrzutów. Wymagane są minimum 2 autentyczne PNG RGB 1080x1920; docelowo osiem według docs/sklep/zrzuty.md, zapisanych w public/assets/store/.
- **Data safety jest robocze.** docs/sklep/data-safety.md opisuje planowane UID Firebase, przebiegi, nicki i potencjalne dane techniczne. Nie zaznaczaj automatycznie „Nie zbieramy danych”. Po finalnym buildzie sprawdź dane od początku do końca, usuwanie danych, retencję, wszystkie SDK i dostawców.

## 2. Konto w Play Console

1. Zarejestruj konto zgodne z faktycznym wydawcą. Dla podmiotu prawnego wybierz **organization**, przejdź wymagane weryfikacje (w odpowiednich przypadkach D-U-N-S). Osobiste konto nie staje się organizacyjnym tylko po zmianie wyświetlanej nazwy.
2. Nowe osobiste konta dewelopera utworzone po **13 listopada 2023 r.** mogą wymagać zamkniętych testów z **minimum 12 osobami przez nieprzerwane 14 dni** przed uzyskaniem dostępu do produkcji. Nie utożsamiaj testów internal z tym obowiązkiem; procedurę sprawdź na konkretnym koncie.
3. Utwórz aplikację Android w Play Console i zarezerwuj niezmienny pakiet com.woogitsugames.cebulakexpress. Wypełnij wszystkie wymagane sekcje konsoli, w tym App content, politykę prywatności, reklamę/brak reklam, odbiorców, rating IARC i Data safety.
4. Włącz **Play App Signing**. Google zarządza kluczem *app signing key*, a GitHub Actions ma używać wyłącznie osobnego *upload key* do podpisu przesyłanego AAB. Zapisz, jaki certyfikat upload został zarejestrowany.

Źródła:
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://support.google.com/googleplay/android-developer/answer/9845334
- https://developer.android.com/studio/publish/app-signing

## 3. Utwórz bezpieczny upload keystore

Na zaufanym komputerze z JDK, w katalogu **poza repozytorium**, uruchom (komenda pyta o hasło, nie wpisuj hasła w poleceniu):

~~~bash
keytool -genkeypair -v \
  -keystore cebulak-upload.jks \
  -storetype PKCS12 \
  -alias cebulak-upload \
  -keyalg RSA -keysize 3072 \
  -validity 10000
~~~

Klucze i hasła trzymaj w menedżerze sekretów; **wykonaj zaszyfrowaną kopię keystore w drugim niezależnym miejscu**. Utrata upload key może wymagać procedury resetu w Play Console, a utrata własnego klucza podpisywania (w innych modelach dystrybucji) może uniemożliwić aktualizacje.

Dla GitHub Secret ANDROID_KEYSTORE_BASE64 przygotuj pojedynczy ciąg Base64 całego pliku. Przykłady:

~~~bash
# Linux
base64 -w 0 cebulak-upload.jks

# macOS
base64 < cebulak-upload.jks | tr -d '\n'
~~~

PowerShell na Windows:

~~~powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\bezpieczny\cebulak-upload.jks"))
~~~

**Nigdy** nie dodawaj pliku .jks, JSON konta serwisowego ani haseł do Git, PR, komentarzy, logów ani artefaktów CI.

## 4. Dodaj sekrety do GitHub Actions

W repozytorium: Settings → Secrets and variables → Actions → New repository secret. Utwórz:

| Sekret | Zawartość |
|---|---|
| ANDROID_KEYSTORE_BASE64 | Zawartość .jks zakodowana jednym ciągiem Base64 |
| ANDROID_KEYSTORE_PASSWORD | Hasło magazynu kluczy |
| ANDROID_KEY_ALIAS | Alias przy tworzeniu klucza, np. cebulak-upload |
| ANDROID_KEY_PASSWORD | Hasło klucza (dla PKCS12 zwykle identyczne jak magazynu) |
| PLAY_SERVICE_ACCOUNT_JSON | Cała zawartość JSON konta serwisowego Google Play, **dopiero po skonfigurowaniu API** |

Brak kompletu czterech sekretów podpisywania: workflow wykonuje testy, buduje debug APK oraz release unsigned z R8, pomija podpis i publikację i kończy się powodzeniem, o ile build/testy przejdą. Jeśli wydanie ma być publikowane, brak wymaganych sekretów powoduje czytelny błąd, nie przypadkowe wysłanie niepodpisanego AAB.

Nie myl sekretnych danych konta serwisowego z plikiem Firebase google-services.json: są niezależne i mają różne uprawnienia.

## 5. Pierwsze ręczne wgranie AAB

Fastlane/supply nie może utworzyć całkowicie nowej aplikacji w konsoli. **Pierwszy AAB prześlij ręcznie przez Play Console**:

1. Przejdź do Actions → Android - wydanie Google Play → Run workflow na main. Ustaw test_signing=false i publish_internal=false.
2. Po sukcesie pobierz artefakt cebulak-express-production-android. Zawiera app-release.aab oraz podpisany APK do testów. Jeżeli widzisz tylko debug APK, brak sekretów podpisywania — NIE wgrywaj tego do Play.
3. W Play Console na ścieżce Internal testing utwórz wydanie, dodaj AAB, aktywuj Play App Signing i dokończ wymagane formularze. Certyfikat upload key musi być zgodny z kluczem GitHub.
4. Sprawdź na urządzeniu z Androidem co najmniej: start po R8, wybór trasy, sterowanie, kolizje, zapisy/ranking Firebase, offline, ponowne uruchomienie i udostępnianie.
5. Każde kolejne AAB musi mieć większy versionCode. Workflow oblicza go z package.json i GITHUB_RUN_NUMBER. Nie wgrywaj starszej lub ponownie tej samej wersji.

## 6. Skonfiguruj Google Play Developer API

1. Po pierwszym ręcznym wgraniu AAB skonfiguruj dostęp do **Google Play Developer API** oraz odpowiedni projekt Google Cloud.
2. Utwórz konto serwisowe z minimalnymi niezbędnymi uprawnieniami i wygeneruj JSON. Przyznaj temu kontu w Play Console dostęp do aplikacji i zarządzania wydaniami na internal testing oraz metadanymi sklepu (wymagany zakres uprawnień).
3. Pełny JSON zapisz wyłącznie w GitHub Secret PLAY_SERVICE_ACCOUNT_JSON. Nie umieszczaj go w repo, skryptach ani pliku .env.
4. Wywołaj Actions → Android - wydanie Google Play → Run workflow, test_signing=false, publish_internal=true. Workflow waliduje zrzuty i opisy, podpisuje AAB tym samym kluczem i wywołuje Fastlane na ścieżce internal.
5. Przejrzyj wynik i stan wydania w Play Console. **Nie** oznacza to publikacji na production ani automatycznej akceptacji przez Google.

## 7. Metadane PL/EN i autentyczne zrzuty

Źródłem opisów są docs/sklep/opis-pl.md i docs/sklep/opis-en.md. Skrypt scripts/prepare-play-metadata.mjs tworzy tymczasowe katalogi Fastlane pl-PL i en-US, tytuł, opis krótki, pełny i changelog. Nie edytuj ręcznie wygenerowanych plików.

Zrzuty z public/assets/store/*.png są sprawdzane pod kątem nazwy, formatu PNG RGB 8-bit oraz 1080x1920 i kopiowane do obu lokalizacji. **Angielski listing nie oznacza angielskiego interfejsu gry.** Wersja jest w języku polskim; pilnuj spójności opisów i obrazów. Publikacja wymaga przynajmniej dwóch prawdziwych zrzutów; przy braku obrazów build bez publish_internal pozostaje zielony.

Lokalny podgląd metadanych po wygenerowaniu wersji:

~~~bash
node scripts/android-version.mjs 1
node scripts/prepare-play-metadata.mjs --out /tmp/cebulak-play-metadata
~~~

Przed publikacją przejrzyj teksty; szczególnie sekcję „Wyzwanie dnia”, ranking i dzielenie się wynikiem. Upewnij się, że kadry odpowiadają finalnemu buildowi, a ich pochodzenie opisano w public/assets/store/ASSETS.md.

## 8. Test podpisywania i scenariusze CI

- Pull request zmieniający Android/CI/sklep uruchamia automatycznie release build z **jednorazowym kluczem testowym**, który nie nadaje się do Google Play. Powstaje AAB i release APK oraz weryfikacja podpisu.
- Ręczne Run workflow z test_signing=true pozwala odtworzyć test podpisu. Nigdy nie przekazuj testowego AAB do Play.
- Ręczne Run workflow bez sekretów i bez test_signing buduje tylko unsigned release oraz debug APK, bez publikacji.
- Tag v0.1.0 (zgodny z package.json version=0.1.0) buduje z sekretem AAB, ale NIE wysyła automatycznie do sklepu. Tag o wersji różnej od package.json powoduje czytelny błąd.
- versionCode = major × 100000000 + minor × 1000000 + patch × 10000 + GITHUB_RUN_NUMBER. Limity: major do 20, minor/patch do 99, runNumber do 9999; przy przekroczeniu zmień strategię wersjonowania zanim wydasz kolejny build.
- Po zmianie zależności Capacitor sprawdź pluginy z R8. Domyślne reguły keep Capacitora 8 chronią natywny mostek, w android/app/proguard-rules.pro jest dodatkowe zabezpieczenie klas pluginów. Samo zielone kompilowanie nie zastępuje testów na urządzeniu.

## 9. Bramka przed publikacją produkcyjną

- [ ] Zweryfikowana tożsamość prawna wydawcy i prawa do nazwy i grafik.
- [ ] Działające finalne funkcje, brak mockowanego rankingu i niewdrożonych obietnic.
- [ ] Co najmniej dwa (docelowo osiem) autentyczne PNG oraz grafika promocyjna i ikona wymagane przez Play Console.
- [ ] Poprawna polityka prywatności pod HTTPS i działające żądania usunięcia danych.
- [ ] Data safety zatwierdzone na podstawie finalnej aplikacji; nie użyto domyślnego „brak danych”.
- [ ] App content, target audience, IARC i inne formularze Play Console wypełnione zgodnie z prawdą.
- [ ] Produkcyjny keystore bezpiecznie zarchiwizowany; testowy nigdy nie użyty do uploadu.
- [ ] Podpis, versionCode, package name, targetSdk=36, łączność, R8 i testy na telefonach zweryfikowane.
- [ ] Dla kwalifikujących się kont osobistych spełnione wymagane testy 12 osób / 14 dni i formalna zgoda Play na produkcję.

Źródła z projektu: docs/prawo/sklepy.md, docs/sklep/data-safety.md, docs/sklep/zrzuty.md, docs/sklep/opis-pl.md.
Oficjalne instrukcje: https://docs.fastlane.tools/actions/supply/ ; https://support.google.com/googleplay/android-developer/answer/10787469 ; https://support.google.com/googleplay/android-developer/answer/14151465 .
