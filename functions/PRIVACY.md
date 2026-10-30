# Prywatność — Liga Polonii

Backend nie zbiera treści dowolnie wpisywanych przez gracza, adresów email, nazwisk, IP, danych urządzenia ani identyfikatorów reklamowych. Podstawą identyfikacji jest losowy identyfikator Firebase Anonymous Auth (UID). Szczegółowe informacje o przetwarzaniu danych przez infrastrukturę Google/Firebase i podmiot odpowiedzialny za grę wymagają uzupełnienia w publicznej polityce prywatności przed uruchomieniem produkcyjnym.

| Dane | Cel | Dostęp klienta | Retencja |
|---|---|---|---|
| runs/{runId}: UID, seed, tryb, kraj, miasta, czas wydania, status, km, ticki, data daily | Bezpieczne odtworzenie i jednorazowe rozliczenie przejazdu | brak | 30 dni od startu; kasowanie codzienną funkcją cleanupExpiredRuns |
| _runStarts i _submissionLimits: UID, dzień UTC, liczniki, czas ostatniej próby | Limity 1 start/s, 600 startów/dobę, 1 submit/3 s i 500 submitów/dobę | brak | 2 dni od ostatniego zapisu; kasowanie codziennie |
| league/{week}: zagregowane km, przejazdy, liczba UID per kraj | Tygodniowa Liga Polonii | odczyt publiczny | pozostaje do decyzji o archiwizacji sezonów |
| league/{week}/_members: UID, kraj, data dołączenia | Liczba unikalnych graczy danego kraju w tygodniu | brak | pozostaje do określenia polityki usuwania sezonów |
| leaderboard/{week}/entries/{uid}: nickId, kraj, rekord, czas | Tygodniowy ranking graczy | odczyt publiczny | pozostaje do określenia polityki usuwania sezonów |
| daily/{date}/entries/{uid}: nickId, kraj, km | Rekord w wyzwaniu dnia | brak | pozostaje do określenia polityki usuwania wyzwań |
| players/{uid}: nickId, kraj, globalny rekord, czas aktualizacji | Zapamiętanie wyniku gracza | wyłącznie własny odczyt | do usunięcia przez administratora / wdrożenia mechanizmu wycofania danych |

Ziarna losowe wydaje serwer; funkcje przechowują wyłącznie wartości niezbędne do rozliczenia. Wewnętrzne dokumenty nie są dostępne klientowi przez reguły Firestore. Logi funkcji zawierają wyłącznie liczniki usuniętych dokumentów, bez UID i IP. Samo korzystanie z platform Firebase/Cloud Functions może generować standardowe logi techniczne dostawcy poza tym modelem danych — należy to uwzględnić w polityce prywatności, umowie przetwarzania i ustawieniach retencji Google Cloud.

Funkcja cleanupExpiredRuns jest uruchamiana codziennie o 03:00 czasu Europe/Warsaw i usuwa dokumenty runs starsze niż 30 dni oraz dokumenty limitów starsze niż 2 dni. Usuwanie jest asynchroniczne względem dokładnej chwili upływu terminu, dlatego może nastąpić przy najbliższym uruchomieniu harmonogramu.

**Przed publikacją produkcyjną:** określić administratora danych i kontakt dla żądań usunięcia, podstawę prawną, termin retencji list rankingowych i profili, procedurę kasowania danych i kopii zapasowych oraz politykę Google Cloud/Firebase. UID gracza w publicznym kluczu dokumentu leaderboard jest identyfikatorem pseudonimowym, nie gwarancją anonimowości w rozumieniu RODO. 
