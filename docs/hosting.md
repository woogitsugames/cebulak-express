# Hosting strony gry — Cebulak Express

**Stan wdrożenia: konfiguracja przygotowana, publikacja wstrzymana do zatwierdzenia danych prawnych.** Wybór dostawcy i domeny należy do właściciela. Rekomendowany wariant produkcyjny: **Firebase Hosting** ze względu na możliwość ustawienia nagłówków CSP i ograniczenia domen osadzających.

## Struktura i build

```bash
npm ci
npm run typecheck
npm test
npm run build:site
npm run test:site
```

`build:site` wykonuje `npm run build` (Vite z `base: './'`), po czym kopiuje grę z `dist/` do `dist-site/graj/`, grafiki marki i bohatera do `dist-site/assets/` i generuje strony statyczne:

- `/` — landing z oryginalnym logo i kombi, bez aktywnego linku do sklepu.
- `/graj/` — pełna gra / PWA.
- `/prywatnosc.html` — pełna polska wersja **robocza** z `docs/prawo/polityka-prywatnosci.md`.
- `/prywatnosc-en.html` — **tylko angielskie streszczenie**, zgodnie z rzeczywistą zawartością źródła (nie pełna wersja prawna).
- `/licencje.html` — dane z plików `public/assets/**/ASSETS.md` oraz `assets/ASSETS.md`.
- `/kontakt.html` — adres z `SITE_CONTACT_EMAIL` albo wyraźny placeholder.

**Nie publikować wersji roboczej** jako zgodnej, ostatecznej polityki. Dokument źródłowy sam zabrania publikacji do czasu uzupełnienia wszystkich pól i audytu. `node scripts/site-check.mjs --release` sprawdza brak placeholderów, status polityki, pełną wersję EN, mail kontaktowy, adres HTTPS, trzy autentyczne zrzuty oraz wymagane zatwierdzenie. Kontrola podglądu (bez `--release`) nie blokuje pracy nad stroną.

### Parametry kompilacji

| Parametr | Przykład | Działanie |
|---|---|---|
| `SITE_ORIGIN` | `https://cebulakexpress.pl` | Adres HTTPS bez końcowego ukośnika, do canonical, Open Graph, Twitter i kodu iframe. **Domena jest proponowana, nie potwierdzona.** |
| `SITE_BASE_PATH` | `/` | Prefiks ścieżek dla strony i gry. Dla GitHub Pages bez domeny własnej: `/cebulak-express/`. |
| `SITE_CONTACT_EMAIL` | publiczna skrzynka projektu | Pojawia się w kontakcie, ale nie uzupełnia automatycznie polityki prawnej. |
| `SITE_LEGAL_APPROVED` | `YES` | Ustawia się dopiero po prawnej akceptacji ostatecznych treści. Wymagane wyłącznie przy `--release`. |

Przykład podglądu na własnej domenie:

```bash
SITE_ORIGIN=https://cebulakexpress.pl SITE_BASE_PATH=/ npm run build:site
python3 -m http.server 4321 --directory dist-site
```

**Uwaga dotycząca zrzutów:** w `public/assets/store/` są obecnie tylko instrukcje i manifest, brak rzeczywistych PNG. Landing wyświetla trzy uczciwie oznaczone miejsca na zrzuty, a generator sam wstawi obrazy `01-jeden-dotyk.png`, `02-z-osmiu-krajow.png`, `03-bagaz-na-dachu.png` po ich dostarczeniu. Nie wolno zastępować ich obrazami udającymi zrzuty ani fikcyjnymi wynikami.

## Wariant A — Firebase Hosting (zalecany)

`firebase.json` zachowuje dotychczasowe Functions, Firestore i emulatory, a dodaje `hosting.public=dist-site`, CSP, ochronę przed osadzaniem na obcych domenach, nagłówki bezpieczeństwa i cache zasobów. Używa zwykłych stron HTML (bez catch-all SPA na poziomie całej domeny); `/graj/**` ma fallback do `/graj/index.html`.

1. Utwórz/wybierz projekt Firebase i Hosting site. Nie umieszczaj plików kluczy i danych konta w repo.
2. Ustaw `.firebaserc` lokalnie na rzeczywisty projekt (plik jest ignorowany przez Git).
3. Wybierz domenę i potwierdź jej własność u operatora. Firebase poda rekordy DNS: przepisz **dokładne wartości z konsoli**, nie zgaduj A/AAAA/CNAME ani TXT.
4. Po wejściu DNS w życie sprawdź HTTPS i certyfikat zarządzany przez Firebase oraz dostępność `/prywatnosc.html`, `/prywatnosc-en.html`, `/graj/`.
5. Po zamknięciu warunków prawnych i dostarczeniu autentycznych zrzutów:

```bash
SITE_ORIGIN=https://twoja-domena.pl SITE_BASE_PATH=/ SITE_CONTACT_EMAIL=kontakt@twoja-domena.pl npm run build:site
SITE_ORIGIN=https://twoja-domena.pl SITE_BASE_PATH=/ SITE_CONTACT_EMAIL=kontakt@twoja-domena.pl SITE_LEGAL_APPROVED=YES node scripts/site-check.mjs --release
npx firebase-tools deploy --only hosting --project TWOJ_PROJECT_ID
```

Adresy i e-maile powyżej to **przykłady**, nie dane produkcyjne. Jeśli serwis nie używa głównej domeny projektu, wybierz poprawny `hosting.site` / `--only hosting:TARGET` po skonfigurowaniu targetu.

### CSP / iframe

CSP zawiera `frame-ancestors 'self'` plus **dokładne originy** wyliczonych z `src/content/portals.ts`. `scripts/site-check.mjs` porównuje te wartości z aktualną mapą portali i zatrzyma build, gdy dodanie lub usunięcie domeny spowoduje rozjazd konfiguracji. `X-Frame-Options` nie jest ustawiane, ponieważ blokowałoby legalne osadzenia. Partner musi również zezwolić na iframe w polityce swojej witryny.

`script-src 'self'` chroni przed obcymi skryptami, `connect-src` dopuszcza usługi Firebase / Google APIs oraz Cloud Functions. **Po wdrożeniu** sprawdzić konsolę przeglądarki: jeśli konfiguracja rankingu lub analityki wskazuje na własny endpoint, dopisać tylko jego origin do `connect-src`. `img-src blob:` jest konieczne dla kart wyników. Cache wynosi 24 h dla zasobów o stałych nazwach; `index.html` i `sw.js` nie są długoterminowo cache'owane. Nie używać `immutable` dla niehaszowanych grafik `public/assets/`.

## Wariant B — GitHub Pages (alternatywny)

`.github/workflows/pages.yml` umożliwia **ręczne** wdrożenie przez GitHub Actions po ustawieniu źródła w Settings → Pages → Build and deployment → GitHub Actions. Wymaga pozytywnego `--release` oraz zaznaczenia potwierdzenia w formularzu workflow (nie istnieje automatyczna publikacja na push).

- Bez domeny własnej: ustaw `SITE_ORIGIN=https://woogitsugames.github.io`, `SITE_BASE_PATH=/cebulak-express/`. Publiczny adres będzie `https://woogitsugames.github.io/cebulak-express/`.
- Z domeną własną: `SITE_ORIGIN=https://wlasna-domena.pl`, `SITE_BASE_PATH=/`. Ustaw Custom domain w GitHub Pages, rekordy DNS zgodnie z instrukcjami GitHub i sprawdź **Enforce HTTPS**. Jeśli potrzebny jest `CNAME`, skonfiguruj go w GitHub Pages / artefakcie zgodnie z wybraną domeną.
- **Ograniczenie bezpieczeństwa:** GitHub Pages nie pozwala w tym trybie dowolnie konfigurować nagłówków odpowiedzi HTTP, w tym `Content-Security-Policy: frame-ancestors` i cache. Alternatywa działa jako hosting statyczny, ale **nie zapewnia wymaganej listy dozwolonych domen iframe**. Do produkcyjnego osadzania rekomendowany Firebase Hosting lub własny CDN/proxy z takimi nagłówkami.
- Każda zmiana prefiksu strony wymaga **nowego builda** z poprawnym `SITE_BASE_PATH`. Z względnym `base: './'` gra uruchamia skrypty i manifest z `/graj/`, a nie z korzenia witryny.

## Ważne zadania integracyjne po stronie koordynatora

1. `src/share/config.ts` nadal używa `GAME_ORIGIN = 'https://gra.example.invalid'`, a `shareUrl()` w `src/share/share.ts` tworzy link na `/`. Trzeba **zmienić centralny generator URL udostępnienia na rzeczywisty adres /graj/** (i uwzględnić `SITE_BASE_PATH` dla Pages), zanim udostępnianie przejdzie test produkcyjny. Nie zmieniono cudzego modułu w tym zleceniu.
2. `embed/iframe.html` oraz wtyczka WordPress nadal zawierają wzorcową domenę `.invalid`. Przed osadzaniem należy skonfigurować publiczny HTTPS URL gry (w nowym kodzie landing generuje poprawny wariant na podstawie `SITE_ORIGIN`).
3. Polityka PL: uzupełnić dane Administratora, datę, retencje, lokalizację Firestore, odbiorców, ePrivacy, dzieci i inne punkty z listy wydawniczej; przygotować pełną wersję EN; przeprowadzić przegląd prawny.
4. Dostarczyć 3 prawdziwe zrzuty 1080×1920, uzupełnić `public/assets/store/ASSETS.md`; wykonać audyt kompletnej wersji. Dodatkowo zweryfikować adresy kanoniczne i og:image na HTTPS.
5. Przed go-live: Chrome + Firefox + Safari na telefonie, gra w iframe i samodzielna, PWA/offline, Web Share, funkcje sieciowe (Firebase), `frame-ancestors` na domenach partnerów i odmowę osadzania na innych domenach.

## Audyt jakości

Workflow `.github/workflows/site-audit.yml` po PR buduje stronę, uruchamia `scripts/site-smoke.mjs` w Chromium, zapisuje **rzeczywiste zrzuty strony na desktopie i telefonie** oraz Lighthouse mobile (Performance, Accessibility, Best Practices i SEO), wymagając wyniku min. 90 w każdej kategorii. Wyniki pojawiają się w podsumowaniu joba i artefaktach Actions. Lokalnie można powtórzyć:

```bash
npm run build:site
npx playwright install chromium
python3 -m http.server 4321 --directory dist-site
SITE_TEST_URL=http://127.0.0.1:4321 node scripts/site-smoke.mjs
```

**Status wyniku Lighthouse:** do potwierdzenia przez wykonany workflow GitHub Actions; nie wpisywać fikcyjnego rezultatu do PR.
