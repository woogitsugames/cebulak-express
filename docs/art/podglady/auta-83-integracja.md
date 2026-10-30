# Zlecenie 83 — integracja

**Ważne:** komplet oryginalnych siedmiu aut z rundy 5 znajduje się obecnie w PR #77 (gałąź `claude/awesome-sagan-cx6z7w`), a nie w `main`. Ten szkic PR #83 bazuje na aktualnym `main`; bez plików binarnych z ZIP **nie wolno go scalać**.

1. Rozpakować `zlecenie-83-auta-poprawki.zip` w korzeniu repo, zachowując ścieżki; dotyczy 20 PNG, dwóch `skin.json`, dokumentacji i podglądu.
2. Najpierw scalić PR #77 albo wgrać pliki ZIP bezpośrednio na gałąź PR #77. Po scaleniu PR #77 zachować jego poszerzony `public/assets/skins/ASSETS.md`; dołączyć wyłącznie sekcję **„Zlecenie 83”** z tego PR, nie nadpisywać całego dokumentu starszą wersją.
3. `skin.json` wykorzystuje istniejące `wheelCenters` (90/217 i 77/229; y=138), nie zmienia hitboxu ani rysowania w rendererze.
4. Uruchomić w pełnym repo `npm ci && npm run typecheck && npm test && npm run build`. W środowisku generacji brak klonu i połączenia `git` z GitHub, dlatego wykonano lokalny test strukturalny PNG/JSON zamiast testów npm.
5. Dopiero po wgraniu kompletu PNG i przejściu CI oznaczyć PR jako gotowy do review.

Pliki `luggage-1..4.png` **zastępują się**, nie nakładają. `crash.png` zawiera koła, zgodnie z implementacją `drawHeroSprite`.
