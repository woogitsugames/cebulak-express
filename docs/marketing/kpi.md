# KPI sezonu „Na Wigilię!” — definicje, pomiar i decyzje

**Okres kampanii:** 1.12.2026–6.01.2027; publiczna gra planowana od 12.12 (okno GO 10–15.12). **Okres pierwszego miesiąca produktu:** od rzeczywistego dnia GO przez 30 pełnych dób (np. start 12.12 → 12.12–10.01 włącznie). Nie mieszaj teaserów z metrykami użytkowników gry. Odpowiedzialni: koordynator analityki zlecenia 17, redaktor i właściciel projektu.

## Hierarchia źródeł i status progów

- `docs/GDD.md` — wiążące **Decyzje właściciela**: 8 krajów, pełna Liga od pierwszego dnia, Firebase jako backend; dla MVP wspomina m.in. medianę 10–25 s, 3+ prób/sesję, co najmniej 5% udostępnień i pierwszy kadr poniżej 2 s (cele produktowe, nie wyniki).
- `docs/research/RESEARCH_CLAUDE.md` — tabela „KPI (próg chwyciło)”, skąd pochodzą progi **działa / hit** poniżej. Autor wyraźnie oznaczył je jako **[szacunek]**, nie obietnice biznesowe, dane branżowe ani ostateczne wymagania właściciela. GDD nie ma osobnej pełnej tabeli KPI; do zatwierdzenia przez koordynatora.
- `docs/zlecenia/17-analityka.md` — konkretny kontrakt zdarzeń. Dopóki zlecenie 17 nie jest zintegrowane i sprawdzone, to tylko **projekt sposobu liczenia**, a nie potwierdzenie, że dane już są zbierane.

## Progi powodzenia (szacunek z researchu; do akceptacji)

| KPI | „Działa” | „Hit” | Horyzont | Uwaga interpretacyjna |
|---|---:|---:|---|---|
| Unikalni gracze | ≥10 000 | ≥50 000 | 1. miesiąc po GO | deduplikacja między dniami i embedami dziś niegwarantowana |
| Średnia liczba prób / sesję | ≥4 | ≥8 | 7 i 30 dni | w GDD dodatkowy wstępny test ≥3 prób/sesję |
| Retencja D1 | ≥15% | ≥25% | kohorty po 1 dniu | obecny plan dziennego hasha nie wystarcza |
| Retencja D7 | ≥5% | ≥10% | kohorty po 7 dniach | obecny plan dziennego hasha nie wystarcza |
| Odsetek graczy klikających udostępnienie | ≥5% | ≥12% | 7 i 30 dni | `share_click` jest intencją, **nie zakończonym share** |
| Gracze z linku znajomego | ≥20% | ≥40% | 7 i 30 dni | wymaga oznaczenia linków i identyfikacji ruchu non-personal |
| CTR gra → portal | ≥3% | ≥8% | 7 i 30 dni | zdefiniować mianownik przed startem |
| Zasięg rolek vs mediana kraju | ≥1× | ≥2× | 7 i 30 dni | porównanie do analogicznych organicznych rolek |
| Nowi obserwujący stron FB | +2% | +10% | sezon | wobec stanu sprzed 1.12, bez płatnej promocji |
| Negatywne komentarze „obraźliwe” | <5% | <2% | próba 100 komentarzy | kategorie oceniane ręcznie, jawny schemat |

**Dodatkowe cele jakościowe z GDD:** pierwszy widoczny kadr **<2 s** na słabszym Androidzie (sprawdzić pomiarem testowym, nie licznikiem `app_open`); mediana zakończonych prób **10–25 s** (po dopasowaniu balansu); minimum 3 próby na sesję jako wczesny sygnał. Nie zastępują wyższych progów „działa”. 

## Zdarzenia dokładnie ze zlecenia 17

| Zdarzenie | Parametry dozwolone w zleceniu 17 | Zastosowanie | Czego nie dowodzi |
|---|---|---|---|
| `app_open` | brak | liczba otwarć, przy kontrakcie 1 na sesję — przybliżone sesje | unikalnych osób ani retencji |
| `run_start` | `mode`, `home` | próby podjęte, geografia wyboru kraju | ukończenia próby |
| `run_end` | `km`, `seconds`, `cause`, `mode`, `home` | liczba zakończeń, średni dystans, rozkład długości, przyczyny końca | sum Ligi bez weryfikacji Firebase |
| `share_click` | `format` | intencja udostępnienia i wybór formatu | skutecznego wysłania/otwarcia linku |
| `portal_click` | `placement`, `home` | kliknięcia z gry do portalu, miejsce CTA | rzeczywistych wczytań stron docelowych |
| `league_open` | brak | zainteresowanie tabelą Ligi | liczby zweryfikowanych przejazdów |
| `install_prompt` | brak | wyświetlenia / użycia zachęty do instalacji, wg kontraktu integracji | faktycznej instalacji iOS/Android |

**Backend Ligi jest osobnym źródłem prawdy:** zatwierdzone przejazdy z Firebase (tryb rankingowy) z oknem czasu i krajem; **nigdy** nie sumować `run_end.km` na potrzeby publikacji, bo to zdarzenie klienta może być powtórzone, odrzucone przez replay lub dotyczyć trybu łagodnego. Wszystkie porównania krajów oparte o ten sam przedział CET i jeden snapshot, zatwierdzone przez koordynatora. Ranking sum km nie jest rankingiem osób, a większy kraj może mieć więcej graczy — to zabawa, nie miara „lepszej Polonii”.

## Formuły i mianowniki (jednoznaczne operacyjnie)

| Metryka | Formuła | Ograniczenie obecnego kontraktu |
|---|---|---|
| Próby / sesję (proxy) | `count(run_start) / count(app_open)` | tylko jeśli `app_open` emitowane **raz na sesję**; przy każdym wznowieniu wynik zaniżony |
| Ukończenia / starty | `count(run_end) / count(run_start)` | potrzebne rozróżnienie restartów i porzuceń, nie zawsze 1:1 |
| Średni km / zakończoną próbę | `sum(run_end.km)/count(run_end)` | analityka rozgrywki, **nie** ranking krajów |
| Mediana czasu próby | P50 z zagregowanego histogramu `run_end.seconds` | same suma/licznik nie wystarczą; zaplanować koszyki 0–5, 5–10, 10–15, 15–20, 20–25, 25–40, 40–60, >60 s |
| Współczynnik intencji share | `unique_players_with_share_click / unique_players` | niepoliczalny dokładnie bez bezpiecznej deduplikacji; `share_click / app_open` może być tylko innym **proxy na sesję** |
| CTR gra → portal (sesyjny proxy) | `count(portal_click)/count(app_open)` | ostateczną definicję bazowego ≥3/≥8% zatwierdzić przed sezonem; wiele klików z jednej sesji zawyża |
| Odsłony Ligi na sesję | `count(league_open)/count(app_open)` | odsłony ≠ osoby, otwarcia mogą się powtarzać |
| Odsetek z linków znajomych | `sessions_from_shared_links / all_sessions` | wymaga osobnego **zbiorczego** licznika wejść po źródle/referrerze/UTM; samo `share_click` nie wystarczy |
| Zasięg rolek / typowa rolka | `reach(reels_game) / median(reach(last_10_similar_reels_country))` | raportowane natywnie przez kanał, osobno dla krajów, bez łączenia organicznych z płatnymi |
| Wzrost obserwujących | `(followers_after - followers_before)/followers_before` | osobno per FB strona, stan bazowy 30.11, bez dublowania tych samych kont |
| Sentyment „obraźliwe” | `comments_tagged_offensive / comments_reviewed` | max 100 publicznych komentarzy, losowo ściągnięte z 8 krajów; rozstrzyga człowiek, bez zbierania profilów |

### Ważne: D1, D7 i gracze unikalni są obecnie **niepoliczalni dokładnie**

Zlecenie 17 przewiduje tylko **dzienne hashe** instalacyjnego ID oraz agregaty `stats/{YYYY-MM-DD}` bez surowych zdarzeń. Gdy hash zmienia się co dzień, nie można połączyć dnia instalacji z odwiedzinami po 1/7 dniach. Nie wolno przedstawiać sumy dziennych unikalnych hashy jako liczby unikalnych graczy miesiąca. Nawet stabilny identyfikator w obrębie portalu nie łączy automatycznie iframe z innych domen (partycjonowana pamięć przeglądarek).

**Propozycja dla koordynatora zlecenia 17:** rozważyć liczone lokalnie w przeglądarce sygnały powrotu D1/D7 i wysyłanie wyłącznie **liczników zbiorczych** (bez ID) do statystyk kohort, lub formalnie zatwierdzony ograniczony czasowo mechanizm pseudonimowej kohorty z osobną analizą RODO; **nie zmieniać schematu zlecenia 17 bez ustaleń**. Lokalna telemetria nadal nie dowie dokładnej deduplikacji użytkowników między urządzeniami/domenami. Dopóki nie ma uzgodnionego rozwiązania: oznaczenie raportu **N/D — brak wiarygodnego pomiaru**, a nie „0%” lub estymacja z palca.

## Dane do zbierania i prywatność

- Nie używać Firebase Analytics / reklamowych identyfikatorów. Ze zlecenia 17: wysyłka partiami przez `sendBeacon` do funkcji `collectEvents`, wyłącznie **agregaty dzienne** Firestore, bez zapisu surowego IP, loginów, nicków, tras zawierających dane osoby, treści komentarzy, cookies śledzących. `mode` i `home` wystarczą do segmentacji rozgrywki; nazwy miast nie są wymagane w ładunku analytics.
- Jeśli serwer, CDN lub platforma hostingu standardowo przechowują IP w logach, przeprowadzić **osobną kontrolę logów i retencji** przed startem. „Bez IP w bazie” nie oznacza automatycznie „bez IP w logach”. Hashe ID używane do rozpoznawania powrotów mogą pozostawać **danymi osobowymi** w sensie RODO; sprawdzić podstawę prawną, przejrzystą informację i konieczność zgody przed wdrożeniem.
- Dla krótkich okresów i małych prób nie publikować drobnych przekrojów, które mogłyby pośrednio identyfikować graczy (np. jedno zdarzenie z konkretnej sesji). Dla źródeł UTM przechowywać tylko znany kod kampanii i liczniki, nie pełne URL z dowolnymi parametrami.
- Próbkowanie: jeśli `track` ma sampling, zastosować spójną politykę **w obrębie sesji** albo dostarczony bezpieczny mnożnik, nie dzielić `share_click` i `app_open` próbkowanych różnymi metodami. Każdy raport ma podawać stawkę próbkowania i liczbę brakujących wysyłek, jeśli są znane.

## Operacyjne dashboardy

**Dzienny od 12.12, 10:00 CET:** data, kraj, wejścia do gry `app_open`, `run_start` rankingowe/łagodne, `run_end`, mediana czasu, `share_click`, `portal_click` wg placement, wyświetlenia Ligi, dostępność backendu, błędy/awarie, wszystkie rolki poprzedniego dnia ze źródła natywnego. W osobnym arkuszu redakcyjnym sumować **posty opublikowane**, ale nie łączyć z danymi osobowymi komentujących.

**Tygodniowy, po zamknięciu danych:** raport 14–20.12, 21–27.12, 28.12–03.01; końcowy 04–06.01 plus sezonowy od GO. Snapshot Ligi z dokładnym CET, URL do wyniku po zatwierdzeniu, liczba zaakceptowanych i odrzuconych przejazdów (jeśli backend raportuje), kontrola duplikatów. Jeśli wyniki niekompletne, **nie ogłaszać zwycięzcy**; rolka bez liczb i „wyniki po weryfikacji”.

**Miesięczny:** po 30 pełnych dobach od GO (dla GO 12.12: raport 11.01 po zamknięciu 10.01) porównać z progami tabeli, rozdzielić „spełnia / nie spełnia / niezmierzone”. Zwrócić uwagę, że D7 dla kohort z ostatnich siedmiu dni pierwszego miesiąca nie ma jeszcze pełnej obserwacji. Pytania o retencję tylko z dojrzałych kohort.

## Decyzje na podstawie wyników

| Sygnał | Działanie |
|---|---|
| `run_start / app_open` niski, P50 prób <10 s | sprawdzić pierwszy kontakt, czytelność sterowania, kolizje i kadr startu; test na telefonie |
| Wiele prób, mało `share_click` | uprościć kartę wyniku i CTA, sprawdzić dostępność Web Share, a nie wymuszać udostępnień |
| Dużo `share_click`, mało wejść ze źródła shared | zweryfikować działanie URL, OG, deep link i atrybucję bez śledzenia osoby |
| CTR gra → portal <3% | sprawdzić umiejscowienie i etykietę linku do portalu oraz czy źródło kraju jest właściwe |
| Duży zasięg rolek, mało `app_open` | zredukować tarcie linku w profilu / opisie i upewnić się, że gra faktycznie dostępna |
| Komentarze o upokarzającym stereotypie ≥5% | zatrzymać daną kreację, przegląd tonu z koordynatorem; nie czekać na koniec kampanii |
| Nieweryfikowalne wyniki Ligi lub anomalie Firebase | wstrzymać publikację rankingu i liczb do czasu naprawy |

## Checklista akceptacji analityki

- [ ] Kontrakt zdarzeń zgodny ze zleceniem 17; testy nie ujawniają danych osobowych ani ID w surowych eventach.
- [ ] `app_open` ma jednoznaczną semantykę sesji, czytelną w kodzie; inaczej KPI sesyjne opisane jako N/D.
- [ ] Zatwierdzona definicja CTR 3/8% oraz źródło wejść z linków znajomych; nie obiecywać pomiarów, których nie ma.
- [ ] Dashboard pokazuje osobno kraje, tryby, kanały i niedostępne dane; backend dostarcza **zweryfikowane** km do publikacji.
- [ ] RODO i logi hostingu skontrolowane, D1/D7 **nie są** zgadywane z dziennych hashy.
- [ ] Test wydajności pierwszego kadru poniżej 2 s i przegląd produkcyjnych adresów gry/portali na tanim Androidzie.
- [ ] Daty okien liczone w strefie Europe/Brussels (CET zimą), a źródła natywne rolek i statystyki gry nie są mylone.
