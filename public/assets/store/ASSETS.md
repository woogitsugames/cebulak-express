# ASSETS — zrzuty sklepowe (zlecenie 50)

| plik | źródło/narzędzie | licencja | autor/uwagi |
|---|---|---|---|
| `screenshot-01.png` … `screenshot-08.png` | Playwright Chromium, `npm run store:shots` | własny materiał projektu | **Do wygenerowania** z aktualnego buildu, rozdzielczość 1080×1920, realne kadry aplikacji |
| `app-store/screenshot-01.png` … `screenshot-08.png` | Playwright Chromium, osobny viewport | własny materiał projektu | **Do wygenerowania** z aktualnego buildu, rozdzielczość 1242×2688, bez rozciągania wersji Play |

Wpisy powyżej opisują **plan**, nie potwierdzają obecności obrazów. Po pomyślnym uruchomieniu generator zastępuje tabelę osobnymi wpisami dla każdego z 16 PNG, wraz z SHA-256 i informacją o przebiegu.

**Warunek publikacji:** rzeczywisty ranking, bez wyników pokazowych, potwierdzony build mobilny oraz wizualna kontrola podglądu `docs/art/podglady/store-shots.png`. Bez konfiguracji Firebase ekran Ligi Polonii jest oznaczony jako demonstracyjny. `npm run store:shots -- --release` odrzuca taki komplet.

Dokumentacja scenariuszy: `tools/store-shots/README.md` oraz `docs/sklep/zrzuty.md`.
