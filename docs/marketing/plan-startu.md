# Plan startu gry „Cebulak Express — Kierunek Polska”

**Sezon:** „Na Wigilię!” · **daty:** 1 grudnia 2026 – 6 stycznia 2027 · **planowany publiczny start:** sobota **12 grudnia 2026**, dopuszczalne okno 10–15 grudnia.

> Dokument operacyjny. Start 12.12 jest scenariuszem planistycznym, **nie potwierdzoną datą wydania**. Nie reklamować działającej gry, rankingów ani sklepów przed akceptacją koordynatora. Materiały oznaczone `START` przesunąć razem z datą GO; zapowiedzi mogą biec od 1.12. Podstawy: `docs/GDD.md` — decyzje D1–D9 i `docs/zlecenia/28-marketing-start.md`.

## Założenia redakcyjne

- Jeden cel: **wejście do gry → kilka prób → udostępnienie karty wyniku → klik do właściwego portalu**. Żadnych obietnic nagród, losowań ani konkursów; „Liga” to wyłącznie ranking sumy zweryfikowanych km.
- Osiem zespołów BE/NL/DE/UK/FR/CH/NO/DK; każdy kraj ma własne tło, **identyczne zasady trudności**. Oznaczenia krajów są kodami redakcyjnymi, nie flagami UE.
- **Kanały własne:** strony FB PoPolsku, TuWiesz, Aktualności właściwe dla danego kraju **tylko jeżeli istnieją i redakcja ma uprawnienia**, Reels/Stories na aktywnych profilach; wideo można adaptować do IG/TikTok/Shorts, gdy są prowadzone. Nie zakładać automatycznie, że wszystkie trzy marki mają 8 stron krajowych. BE: priorytet Aktualnosci.be + PoPolsku.be; pozostałe przyporządkować po audycie dostępów.
- Publikować z lokalnym kontekstem kraju i jeden raz na stronę na dobę; nie kopiować identycznego posta równocześnie do każdej marki. W grupach polonijnych tylko po uzyskaniu zgody moderatora i zgodnie z regulaminem (warianty w `posty.md`).
- Rolki pionowe 9:16, 15–30 s (numery R01–R20 w `rolki.md`). Posty 1–5 w `posty.md`. Wszystkie z napisami PL, bez obcych znaków towarowych w świecie gry, bez prawdziwego nagrania czy wyniku udającego gracza.
- Nie sugerować, że gra jest dostępna w Google Play/iOS. W komunikatach publicznych podajemy **link web/PWA** dopiero po teście; Android przez sklep dopiero po osobnym GO.

## Zmienne do wypełnienia tuż przed publikacją

| Zmienna | Co wstawić | Zasada |
|---|---|---|
| `[LINK_GRA]` | zatwierdzony publiczny URL gry | nigdy nie publikować fikcyjnego linku |
| `[LINK_GRA_KRAJ]` | URL gry z poprawnym parametrem kraju | sprawdzić faktyczny format linków w aplikacji |
| `[LINK_PORTAL]` | właściwy portal/kraj i opcjonalnie artykuł o grze | adres zatwierdza redakcja |
| `[KM_KRAJU]`, `[MIEJSCE]`, `[ROZNICA_KM]` | dane ze zweryfikowanej Ligi, z datą odcięcia | **nie wstawiać przykładowych wyników** |
| `[DATA_STARTU]` | data z decyzji GO | przed GO mówić wyłącznie „w grudniu” |
| `[UTM]` | odpowiedni adres z tagami kampanii | bez identyfikatorów osobowych |

Przykład UTM dla stron własnych: `?utm_source=facebook&utm_medium=social&utm_campaign=na_wigilie_2026&utm_content=be_r06` (jeśli istnieje już `?` w URL, zacząć od `&`). Parametry nie są identyfikatorami osoby. Dla rolek IG/TT dać link w profilu; na FB link w poście/komentarzu według lokalnej praktyki; pomiar atrybucji potwierdzić z analityką i hostingiem.

## Warunek GO / NO-GO (11 grudnia, 16:00 CET)

1. Gra uruchamia się na tanim Androidzie i w przeglądarce, wybór kraju i trasy działa dla ośmiu krajów, ma link z kartą wyniku; wczytywanie i restart są sprawdzone.
2. Liga pobiera realne wyniki, backend weryfikuje przejazdy, nie ma ręcznej możliwości wpisania dowolnych kilometrów; `docs/analityka.md` i krótka informacja o prywatności są gotowe.
3. Są gotowe podglądy społecznościowe, treść linku dla każdej strony oraz link do portalu. Teksty i marka zaakceptowane (w GDD jest obowiązkowe sprawdzenie znaku w EUIPO/UPRP).
4. **GO:** opublikować materiały startowe 12.12. **NO-GO:** kontynuować zapowiedzi i próbki wideo, usunąć wezwania „zagraj teraz”, przesunąć R06/posty startowe na dzień faktycznego udostępnienia (najpóźniej 15.12, potem nowe GO). Nie publikować tabeli Ligi, gdy backend nie jest wiarygodny.

## Kalendarz dzień po dniu (CET, godziny do dopasowania do Insights)

| Data | Kanał | Kraj | Publikacja / materiał | Cel / kontrola |
|---|---|---|---|---|
| 01.12 | FB: Aktualności/PoPolsku + Stories | BE,NL | TEASER 01 + ankieta: skąd ruszasz? | Zasięg i komentarze; bez linku do niegotowej gry |
| 02.12 | Rolka R01 + FB | BE | Pierwsza próba: bagaż na dachu | Wyświetlenia 3 s, odpowiedzi z miastami |
| 03.12 | FB + Stories | NL | Post NL-1: powrót z Rotterdamu | Zasięg i wybór kraju |
| 04.12 | Rolka R02 + FB | DE | Remont drogi i kombi | Utrzymanie uwagi; udostępnienia |
| 05.12 | FB + Stories | UK | Post UK-1: przeprawa | Wczesne zainteresowanie |
| 06.12 | Rolka R03 + FB | FR | Paczka od mamy: premia i ciężar | Wyjaśnienie mechaniki |
| 07.12 | FB + Stories | CH | Post CH-1: Zurych → Polska | Zebranie miejsc docelowych |
| 08.12 | Rolka R04 + FB | NO | Prom czy objazd? | Odkrycie scenografii |
| 09.12 | FB + Stories | DK | Post DK-1: droga przez przeprawę | Zasięg w Danii |
| 10.12 | Rolka R05 + FB | BE,NL,DE | Osiem tras, te same zasady | Budowanie sprawiedliwej rywalizacji |
| 11.12 | FB + Stories | Wszystkie 8 | Zapowiedź dnia startu – tylko po GO | Zainteresowanie; kontrola gotowości |
| 12.12 | FB + rolka R06 + Stories | Wszystkie 8 | START: web/PWA + posty krajowe nr 2 | Pierwsze `app_open` i `run_start` |
| 13.12 | FB + Stories | BE,NL | Jak włączyć tryb rankingowy i udostępnić wynik | Pierwsze `share_click`; bez fikcyjnej tabeli |
| 14.12 | Rolka R07 + FB | UK | Redaktor rusza z Londynu | Nowi gracze UK |
| 15.12 | FB + Stories | DE,FR | Posty nr 2 krajowe + karta wyniku | Kliknięcia z kraju, pierwsi wracający |
| 16.12 | Rolka R08 + FB | NL | Kto doleci z Eindhoven? | Dodatkowe przejazdy |
| 17.12 | FB + Stories | CH,NO | Posty nr 2, wyzwanie dnia (jeśli działa) | Powroty D1 |
| 18.12 | Rolka R09 + FB | BE | Redaktor próbuje dolecieć do Siemiatycz | Udział graczy i liczba prób |
| 19.12 | FB + Stories | DK,UK | Posty nr 3: weekendowa próba | Próby na sesję |
| 20.12 | Rolka R10 + FB: Liga | Wszystkie 8 | PODSUMOWANIE LIGI 14–20.12 (tylko dane zatwierdzone) | Powroty i ruch do tabeli |
| 21.12 | FB + Stories | BE,NL | Posty nr 3: zaczyna się tydzień drogi | Utrzymanie D7 |
| 22.12 | Rolka R11 + FB | DE | Paczka czy bezpieczny lot? | Komentarze o strategii |
| 23.12 | FB + Stories | FR,CH | Posty nr 3: ostatni zakręt | Próby przed finałem sezonu |
| 24.12 | Rolka R12 + FB | Wszystkie 8 | Na Wigilię!: ciepły klip z trasą do domu | Zasięg organiczny; bez religii i presji |
| 25.12 | FB (jeden lekki post) | NO,DK | Posty nr 3: 30 sekund na próbę | Aktywność bez nachalnej promocji |
| 26.12 | Rolka R13 + FB | UK | Najzabawniejszy objazd sezonu | Share rate |
| 27.12 | Rolka R14 + FB: Liga | Wszystkie 8 | PODSUMOWANIE LIGI 21–27.12 | Powroty, ruch do portalu |
| 28.12 | FB + Stories | BE,DE | Posty nr 4: spróbuj pobić swój dystans | D7 i ponowne próby |
| 29.12 | Rolka R15 + FB | NL | Najgorszy fail tygodnia (redakcyjny) | Komentarze i reakcje |
| 30.12 | FB + Stories | FR,UK | Posty nr 4: podziel się kartą wyniku | Udział udostępnień |
| 31.12 | Rolka R16 + FB | CH | Rok kończymy w trasie | Zasięg, powrót na następny dzień |
| 01.01 | FB + Stories | NO,DK | Posty nr 4: nowy rok, nowy dystans | Reaktywacja |
| 02.01 | Rolka R17 + FB | DE | Ile prób na jeden dojazd? | Liczba przejazdów na sesję |
| 03.01 | Rolka R18 + FB: Liga | Wszystkie 8 | PODSUMOWANIE LIGI 28.12–03.01 | Powroty i zestawienie tygodniowe |
| 04.01 | FB + Stories | BE,NL,FR | Posty nr 5: ostatnie trzy dni | Domknięcie kampanii |
| 05.01 | Rolka R19 + FB | UK,CH,NO,DK | Posty nr 5: przed finałem | Aktywacja ostatnich graczy |
| 06.01 | Rolka R20 + FB: Liga | Wszystkie 8 | FINAŁ sezonu 04–06.01 + dziękujemy | Zakończenie, kliknięcia do portali i raport |

**Domyślny rytm:** 18:30 CET dla głównych postów/rolek, 12:30 CET dla Story z pytaniem (hipoteza redakcyjna do weryfikacji w Insights, nie „najlepsza godzina”); 24.12 jedna spokojna publikacja około południa. W UK godziny publikacji dostosować do GMT (czas odczuwany przez odbiorców), a CH/NO/DK/FR/DE/NL/BE pracują w CET zimą. Teksty mogą być przygotowane wcześniej, ale ranking zawsze odświeżyć przed publikacją.

## Liga Polonii — ogłoszenia co tydzień

**Definicja:** suma **zweryfikowanych** km przejazdów w trybie rankingowym, przypisanych do deklarowanego kraju startu; nie porównywać liczby mieszkańców krajów ani skuteczności pojedynczych graczy. Tydzień liczymy **poniedziałek 00:00 – niedziela 23:59 CET**; daty raportowe: **20.12** (14–20.12), **27.12** (21–27.12), **03.01** (28.12–03.01). **06.01** finał częściowy (04–06.01) + osobno suma całego sezonu od startu; nie nazywać 3 dni „pełnym tygodniem”. Z uwagi na spóźnione potwierdzenia przejazdów publikować poniedziałkowy odczyt danych za zamknięty tydzień lub z datą „stan na [DATA/GODZINA]”. Zaplanowane w tabeli niedzielne materiały można wtedy zastąpić teaserem „wyniki jutro”, a oficjalną tabelę dać w poniedziałek. **W pierwszej kolejności wiarygodność, potem termin.**

**Szablon posta Ligi (podmienić danymi):**

> Liga Polonii — wyniki za [OKRES]. W tym tygodniu prowadzi [KRAJ] z wynikiem [KM_KRAJU] km, a różnica do [KRAJ_2] to [ROZNICA_KM] km. Każda ukończona próba rankingowa dokłada kolejne kilometry do wspólnego wyniku. Sprawdź tabelę i wybierz swój kraj: [LINK_GRA]. Dane: stan na [DATA/GODZINA], tylko przejazdy potwierdzone w grze. #Polonia #CebulakExpress

**Wariant, gdy brak wiarygodnego wyniku / tylko jeden kraj z próbami:** „Wspólny dystans jeszcze liczymy. Zamiast tabeli dziś pokazujemy trasę [MIASTO] → [MIASTO]. Liga wróci po weryfikacji przejazdów.” **Zakazane:** podawanie zmyślonego zwycięzcy, fikcyjnego marginesu 12 000 km i twierdzenie, że Polska/Kraj „jest gorszy”.

## Praca redakcji / assety

| Do kiedy | Materiał | Odpowiedzialność |
|---|---|---|
| 25.11 | 4 screen-capture z gry: start, bagaż, kolizja, ekran wyniku (9:16); bez danych osobowych | producent gameplayu |
| 28.11 | po 1 unikalnym kadrze/ujęciu dla 8 krajów; 20 storyboardów R01–R20 | montaż + redakcja |
| 30.11 | opis i kreacja teasera, link do listy materiałów, widoczna informacja „wkrótce” | social lead |
| 09.12 | weryfikacja nazwy/brandingu, test napisów, wersja bez dźwięku, szablony UTM | koordynator |
| 11.12 | GO, pomiar zdarzeń, linki i osadzenia, próba udostępnienia karty | techniczny + redakcja |
| co dzień 10:00 | przegląd reakcji, moderacja, zasięgi, naprawa martwych linków | dyżurny |
| co tydzień | eksport danych Ligi i KPI, odświeżenie postów/rolek z placeholderami | analityk + redakcja |

## Dystrybucja i moderacja

- Materiały startowe na własnych stronach FB; grupy polonijne tylko po akceptacji i z wartością dla grupy. Nie tagować masowo członków, nie wrzucać automatycznie tego samego posta do dziesiątek grup, nie wysyłać niezamówionych DM.
- Na zarzut „kogo wyśmiewacie?”: „Żartujemy z korków, pogody i bagażnika, który zawsze jest za mały. Kierowca jest sympatyczny, a wszystkie kraje mają te same zasady gry.”
- Na zarzut „ranking nieuczciwy”: „Do Ligi trafiają wyłącznie wyniki potwierdzone przez serwer. Przy weryfikacji nie pokazujemy przedwczesnych wyników.”
- Na pytania o nagrody: „Na ten moment to zabawa i ranking, bez konkursu i nagród.”
- Pytania techniczne / ujawnienie błędów: bez publikowania danych o graczu, zgłoszenie przekierować do kontaktu na oficjalnej stronie gry.

## Oczekiwany rezultat

Po 6 stycznia porównać wyniki z `kpi.md`, a nie wyłącznie wyświetlenia rolek. Jeśli portal CTR jest niski, poprawić widoczność linku gra → portal; jeśli próby na sesję są niskie, przejrzeć wprowadzenie i czytelność sterowania; jeśli udostępnień jest mało, poprawić kartę wyniku. Dalszy sezon dopiero po przeglądzie danych i opinii o tonie.
