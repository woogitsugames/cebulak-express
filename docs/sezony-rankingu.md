# Sezony rankingu i wersja zasad gry

Wynik przejazdu (km) zależy od rdzenia gry w `src/core/`. Gdy zmieniają się zasady,
np. fizyka, przeszkody, bonusy albo trasy, te same tapnięcia dają inne km. Starych
i nowych wyników nie da się wtedy porównać. Dlatego każdy wynik rankingowy jest
przypisany do **wersji zasad**, a każda wersja to osobny **sezon rankingu**.

## Stała `RULES_VERSION`

- Plik: `src/core/rules.ts`. Używają go klient, mock API i Cloud Functions, które
  bundlują ten sam rdzeń.
- Obecna wartość: **2**. Wersja 1 to pierwsze wydanie z 8 krajami, którego dokumenty
  nie miały prefiksu sezonu.
- Wersja 2 obejmuje bonusy i bramkę bagażową (zlecenie 52), lot powrotny (51)
  oraz 15 krajów domowych z krajami tranzytowymi (55).
- **Kiedy podnosić:** przy każdej zmianie, po której `replay()` dla tych samych
  danych (`seed`, trasa, `flapTicks`) zwraca inne `km`, `ticks` lub `phase`.
  Dotyczy to też zmian w `config.ts`, `obstacles.ts`, `game.ts`, `route.ts`
  (miasta, korytarze, `totalKm`) i `KM_PER_PX`.
  Zmiany wyłącznie graficzne, dźwiękowe i tekstowe wersji nie zmieniają.

## Gdzie wersja jest używana

| Miejsce | Zachowanie |
| --- | --- |
| `startRun` (żądanie) | Klient wysyła `rulesVersion`. Inna wartość albo jej brak (stary klient z cache PWA) kończy się błędem `failed-precondition`. Klient gra wtedy lokalnie, bez rankingu. |
| `startRun` (odpowiedź) | Zwraca `rulesVersion`. Gdy wersja serwera różni się od wersji klienta, klient nie wysyła wyniku do rankingu. |
| `runs/{runId}` | Dokument zapisuje `rulesVersion` z chwili startu. |
| `submitRun` | Gdy wersja zapisana w `runs` albo przesłana przez klienta różni się od bieżącej, wynik jest odrzucany z powodem `old_rules`. Kolejka offline usuwa takie zgłoszenie i nie ponawia go. |
| Liga Polonii | Wyniki trafiają do `league/r{wersja}_{tydzień}`, np. `league/r2_2026-W44`. |
| Ranking graczy | Wyniki trafiają do `leaderboard/r{wersja}_{tydzień}/entries/{uid}`. |
| Wyzwanie dnia | Wyniki trafiają do `daily/r{wersja}_{data}/entries/{uid}`. |
| `players/{uid}` | Dokument zapisuje `rulesVersion`. Rekord (`bestKm`) i seria dotarć (`perfectStreak`) z innej wersji nie przechodzą do nowego sezonu. |

Identyfikator dokumentu tworzy funkcja `seasonKey(okres)`. Klient (`src/net/api.ts`)
czyta wyłącznie klucze bieżącej wersji. Dokumenty starszych sezonów zostają w bazie
w niezmienionej formie, ale nikt ich już nie czyta ani nie zapisuje. Można je
zarchiwizować albo usunąć ręcznie. Reguły Firestore (`functions/firestore.rules`)
nie wymagały zmian, bo symbole wieloznaczne `{week}` i `{date}` obejmują też klucze
z prefiksem. Testy reguł używają kluczy sezonowych.

## Te same opcje gry na kliencie i serwerze

Przejazd rankingowy (także wyzwanie dnia) tworzy wyłącznie
`rankedGameOptions(seed, route)`, czyli `{ seed, mode: 'ranked', route }` **bez
`baseWeight`**. Lot powrotny klient zawsze uruchamia w trybie `cozy`, poza rankingiem.
Z tej funkcji korzystają `src/main.ts`, `MockRankingApi` i `verifyReplay`
w `functions/src/validation.ts`.

Trasę na serwerze sprawdza `parseRoute()` na wspólnych danych `HOME_COUNTRIES`,
`START_CITIES` i `PL_CITIES`. Akceptuje wszystkie 15 krajów domowych, ich miasta
startowe i cele w Polsce. Serwer nie trzyma własnej listy krajów ani miast.
Allowlista analityki (`functions/src/analytics-events.ts`) też korzysta ze wspólnych
list: krajów, przeszkód (w tym `baggage-gate`) i bonusów (`boarding`, `tailwind`,
`mamcall`, zdarzenie `pickup`).

## Zmiana sezonu krok po kroku

1. Podnieś `RULES_VERSION` w `src/core/rules.ts` i dopisz wpis do historii w komentarzu.
2. Uruchom testy: root `npx vitest run` oraz w `functions/` `npm test`.
3. **Najpierw wdróż Functions** (`firebase deploy --only functions`), potem klienta
   (web, Android, iOS). Gdy obie strony mają różne wersje, ranking tymczasowo się
   wyłącza: gra działa lokalnie, a wyniki nie mieszają się między sezonami.
4. Liga i ranking zaczynają się od zera w bieżącym tygodniu nowego sezonu.
