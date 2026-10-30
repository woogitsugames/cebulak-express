# Zlecenie 56 — import grafik

**Status:** grafiki gotowe w paczce ZIP przekazanej w rozmowie ChatGPT, ale jeszcze nie dodane do gałęzi GitHub.

Gałąź utworzono z `main`. Kontener wykonawczy nie ma dostępu DNS do `github.com`, więc zmienionych binarnych plików PNG nie można wypchnąć z jego lokalnego systemu plików. To jest roboczy dokument integracyjny; **nie scalać PR, dopóki koordynator nie doda plików ZIP do gałęzi**.

Paczka zawiera 32 PNG warstw dla ES, IT, AT i CZ (po 5 letnich i 3 zimowe), 14 panoram PNG (1620×900), 5 podglądów, dokumentację ASSETS.md, generator Python i test techniczny. Po wgraniu plików uruchomić `python3 public/assets/countries/es/test_56.py` oraz `npm ci && npm run typecheck && npm test && npm run build`.

Przed włączeniem zimowych warstw koordynator musi rozszerzyć `hasWinterVariant` w `src/render/assets.ts` (na `main` uwzględnia tylko PL) oraz dopasować identyfikatory miast do zmian ze zlecenia 55. Zakresy własności plików silnika nie zostały naruszone.
