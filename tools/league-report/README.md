# Liga Polonii — automatyczny raport tygodniowy (zlecenie 60)

Generator bez dostępu do danych graczy. Odczytuje **wyłącznie** dokumenty `league/{week}` i `league/{previousWeek}` w Firestore (lub tworzy deterministyczne dane próbne), po czym produkuje dwa obrazy i osiem postów do redakcyjnej akceptacji. Nie publikuje niczego automatycznie na Facebooku.

## Uruchomienie

W katalogu głównym repozytorium, na Node.js 22:

```bash
npm ci
npx playwright install chromium
npm run report:league -- --week=2026-W50 --mock
npm run test:league-report
```

Pliki w katalogu `out/`:

| Plik | Rozmiar / przeznaczenie |
| --- | --- |
| `liga-2026-W50-post.png` | 1080 × 1350; ranking ośmiu krajów, flagi, wyróżniony lider, logo i CTA |
| `liga-2026-W50-rolka.png` | 1080 × 1920; największa **bezwzględna różnica sumy km** względem poprzedniego tygodnia |
| `liga-2026-W50-teksty.md` | Osiem krajowych postów FB: po pięć hashtagów, pierwszy krajowy |

Dostępne przełączniki: `--week=RRRR-WTT`, `--mock`, `--url=https://adres-gry`, `--out-dir=ścieżka`, `--help`. Flaga `--week` jest opcjonalna: domyślnie generator wybiera **ostatni zakończony tydzień ISO**, liczony w strefie Europe/Warsaw. Można też przekazać wartości po spacji (`--week 2026-W50`).

**Tryb próbny jest bezpiecznie oznaczony** jako `DEMO · DANE TESTOWE · NIE PUBLIKOWAĆ` na obu grafikach i w tekstach. Wartości z `MockRankingApi` służą jako baza do fikcyjnych, deterministycznych prób porównania tygodni. Nie są danymi z gry. Gdy brak `--url`, CTA w mocku pokazuje wyraźny placeholder `[LINK_GRA]`.

## Właściwy raport Firestore

`firebase-admin` jest już w `functions/package.json`, więc nie dokładamy ciężkiej zależności do głównej gry. Lokalnie zainstaluj go w podprojekcie:

```bash
npm ci --prefix functions --omit=dev
export FIREBASE_SERVICE_ACCOUNT="$(cat /bezpieczna/sciezka/konto-serwisowe.json)"
export LEAGUE_GAME_URL='https://ADRES_ZATWIERDZONEJ_GRY'
npm run report:league -- --week=2026-W50
```

To wyłącznie **przykładowe polecenia**: nie twórz konta serwisowego w katalogu repozytorium i nie wklejaj jego treści do czatu ani do logów. Zmienna `FIREBASE_SERVICE_ACCOUNT` powinna zawierać cały JSON konta usługi z uprawnieniem do **odczytu** dokumentów Firestore w wybranym projekcie. Generator sprawdza `project_id`, `private_key` oraz `client_email`; nie zapisuje ich na dysku. W przypadku braku klucza kończy się błędem. Zalecane są minimalne uprawnienia serwisowe i rotacja klucza.

Ustaw prawdziwy, zatwierdzony adres HTTPS gry w `LEAGUE_GAME_URL` albo użyj `--url`. Bez adresu raport produkcyjny kończy się błędem, by nie publikować przypadkowego linku. Nie wpisuj linku do sklepów z aplikacjami bez osobnej zgody na premierę (por. `docs/marketing/plan-startu.md`).

## GitHub Actions

W ustawieniach repozytorium **Settings → Secrets and variables → Actions** dodaj:

1. **Repository secret** `FIREBASE_SERVICE_ACCOUNT` — kompletny JSON konta usługi; nigdy nie commituj pliku JSON.
2. **Repository variable** `LEAGUE_GAME_URL` — publiczny adres HTTPS gry zatwierdzony przez redakcję.

Workflow: `.github/workflows/league-report.yml` → **Actions → Liga Polonii — cotygodniowy raport → Run workflow**. Ręcznie możesz podać tydzień i zaznaczyć `mock` (nie wymaga konta usługi). Harmonogram: **poniedziałek 08:13 Europe/Warsaw** z obsługą zmian czasu letni/zimowy przez natywne pole `timezone` GitHub Actions. Harmonogram uruchomi się dopiero po dodaniu workflow do domyślnej gałęzi `main`. GitHub może opóźniać kolejkę uruchomień; godzina 08:13 jest czasem planowanego wyzwolenia, a nie gwarancją gotowych plików o tej minucie.

Wynik trafi do jednego artefaktu `liga-polonii-<run_id>` (retencja: 30 dni) do pobrania z zakładki uruchomienia workflow. **Nie jest automatycznie wysyłany na strony FB**. Redakcja musi sprawdzić datę, dane, krajowy link, format i zgodę na publikację.

## Jak interpretowane są dane

- Źródło: `league/{YYYY-Www}.countries` z `km`, `runs`, `players` dla `BE`, `NL`, `DE`, `UK`, `FR`, `CH`, `NO`, `DK` (zgodnie z `src/net/api.ts`).
- Ranking: kraje uporządkowane malejąco według tygodniowej **sumy km**, przy remisie w stałym porządku krajów gry. Nie liczymy średniej na gracza.
- Okładka rolki: kraj z największym **modułem różnicy `km(week) - km(previousWeek)`**, dodatniej lub ujemnej. Porównujemy pełne sumy z dwóch tygodni; nie twierdzimy, że to przyrost narastający w ramach jednego tygodnia.
- Brak dokumentu poprzedniego tygodnia lub brak wpisu kraju oznacza brak porównania (nie `0 km`). Wówczas rolka uczciwie komunikuje brak porównywalnych danych, a nie wymyśla trendu.
- Brak dokumentu bieżącego tygodnia, niepoprawne wartości lub brak jakichkolwiek danych krajów przerywają raport; generator nie publikuje fikcyjnego rankingu.
- Znacznik „stan odczytu” pokazuje moment generowania raportu w Warszawie. Nie gwarantuje zamknięcia danych w Firestore po zakończeniu tygodnia; sprawdź stabilność wyniku przed publikacją.

## Testy i podglądy

```bash
npm ci
npm run test:league-report
npm run typecheck
npm test
npm run build
npm run report:league -- --week=2026-W50 --mock
```

Podglądy demonstracyjne (wraz z nagłówkiem `DANE TESTOWE`) powinny trafić do `docs/art/podglady/`; pliki produkcyjne generuje się wyłącznie z rzeczywistego Firestore. Do rendrowania użyto istniejącego `@playwright/test` oraz własnego HTML/CSS, bez nowych zależności npm. Flagi pochodzą z `public/assets/ui/`, logo z `public/assets/brand/`. Własne grafiki są generowane programowo; nie zastosowano zewnętrznych znaków towarowych, ikon ani zdjęć.
