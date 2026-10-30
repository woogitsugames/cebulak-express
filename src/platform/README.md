# Adaptery platformowe — zlecenie 24

## API

```ts
import { platform } from './platform';

await platform.initialize(); // po utworzeniu DOM; web: no-op
const status = await platform.share(fileOrBlob, 'Mój wynik', location.href);
// status: 'shared' | 'copied' | 'cancelled' | 'unavailable'
await platform.vibrate([70, 60, 90]);
await platform.storage.set('ce.settings', JSON.stringify(settings));
const raw = await platform.storage.get('ce.settings');

const unsubscribe = platform.onBack(() => {
  if (!ui.menu.hidden) return false; // Android: wyjdź z aplikacji
  showMenu();                        // gra / wynik: menu
  return true;
});
// Przy odmontowaniu interfejsu: unsubscribe();
```

**Wymagana integracja koordynatora:** `src/main.ts` ma obecnie własne `load/save`, natywnie nieczytające Preferences, oraz `share()` bez pliku. Należy zastąpić je adapterami (asynchroniczne `storage.get/set`), wywołać `platform.initialize()` po renderowaniu UI i zarejestrować `onBack`. Nie zmieniano tego pliku zgodnie z zasadami własności. Podczas aktywnej gry `showMenu()` oznacza powrót do menu, bez zapisu przejazdu do rankingu. W przyszłości można podpiąć ekran pauzy.

**Udostępnianie obrazu/filmu:** w natywnej aplikacji Blob/File jest zapisywany jako base64 do `Directory.Cache/ce-shares`, a `Share.share({files, text, url})` otwiera arkusz systemowy. Android FileProvider już ma ścieżkę cache; inne katalogi nie są udostępniane. Pliki pozostają w cache, aby aplikacja docelowa zdążyła je odczytać po zamknięciu arkusza (system może je skasować). Przy udostępnianiu wielu dużych filmów potrzebny będzie mechanizm czyszczenia starych danych cache. Na web plik udostępniany jest tylko po udanym `navigator.canShare({files})`; w przeciwnym razie tekst/URL, a na koniec schowek. `shared` nie potwierdza opublikowania materiału, a anulowanie zwraca `cancelled`.

**Pasek stanu/immersive:** Capacitor 8 `SystemBars` (w `@capacitor/core`) z konfiguracją `hidden: true` ukrywa status i pasek nawigacji po starcie Android/iOS. `@capacitor/status-bar` obsługuje styl i kolor tam, gdzie Android pozwala; API 36 ignoruje zmianę koloru. Kolor tła `#1b2733` jest w splashu i konfiguracji aplikacji. System może chwilowo pokazać paski przy gestach systemowych; wcięcia urządzenia nadal wymagają CSS safe-area. iOS wymaga późniejszego dodania projektu `ios/` i `UIViewControllerBasedStatusBarAppearance` w Info.plist.

**Splash:** `public/assets/brand/splash-2732.png` to tymczasowe jednolite tło 2732×2732. Android korzysta z przezroczystej ikony `@drawable/ce_splash_icon` na ciemnym tle zgodnie z Android 12 SplashScreen API. Końcowe zasoby marki zlecenia 10 powinny zastąpić oba pliki. Pozostawiono `launchAutoHide: true`, aby brak integracji nie zablokował startu gry.

## Testy manualne na urządzeniu

1. `npm ci && npm run typecheck && npm test && npm run build`
2. `npx cap sync android && (cd android && ./gradlew assembleDebug)`
3. Zainstaluj debug APK; sprawdź ekran powitalny oraz pełny ekran na Androidzie 13 i 16.
4. Podłącz tymczasowo przycisk pod `platform.share(file, text, url)`, gdzie `file` jest PNG z Canvas, oraz `platform.share(videoBlob, ...)`; sprawdź WhatsApp/Messenger, czy obraz/film **i** tekst z linkiem docierają. Sprawdź anulowanie arkusza.
5. Podłącz `onBack`; z gry wciśnij Android Back: menu (bez zamknięcia); z menu: wyjście. Sprawdź gest nawigacji.
6. Podłącz `vibrate([70, 60, 90])` do kliknięcia w grze. Sprawdź na urządzeniu (emulator często nie ma silnika wibracyjnego).
7. Przetestuj Preferences po restarcie i web/localStorage w iframe.

**Nie sprawdzono na fizycznym Androidzie/iOS ani emulatorze.** Test runtime Share z docelowymi komunikatorami pozostaje do wykonania po integracji karty wyniku (zlecenie 14) i kliencie gry. Ścieżka iOS nie jest jeszcze w repo.
