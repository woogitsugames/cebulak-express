# Regulamin Ligi Polonii i rankingu graczy — Cebulak Express

**Wersja: projekt 0.1 • 30.10.2026.** Obowiązuje od **[UZUPEŁNIJ: data]** wyłącznie po uzupełnieniu organizatora i publikacji. Projekt nie stanowi porady prawnej. **[do weryfikacji przez prawnika]**

## A. Regulamin bez nagród rzeczowych — wersja startowa

### §1. Organizator i zakres
1. Usługę „Liga Polonii” i indywidualny ranking wyników w grze „Cebulak Express — Kierunek Polska” prowadzi **[UZUPEŁNIJ: pełna nazwa prawna, adres, identyfikator przedsiębiorstwa/stowarzyszenia]** (dalej „Organizator”).
2. Kontakt w sprawach rankingu, reklamacji i nadużyć: **[UZUPEŁNIJ: e-mail]**. Regulamin dostępny jest pod **[UZUPEŁNIJ: HTTPS URL]**.
3. Gra może być dostępna na stronie WWW/PWA, przez portale osadzające oraz jako aplikacja mobilna. Regulamin dotyczy wyłącznie usług rankingu; zasady przetwarzania danych określa polityka prywatności.
4. Udział w rankingu jest **dobrowolny i bezpłatny**. Nie ma opłaty startowej, zakupu, zakładu ani warunku odwiedzenia reklam. Gra nie oferuje na starcie **nagród pieniężnych, rzeczowych, kuponów o wartości majątkowej ani wypłat** za pozycję w rankingu. Punkty/kilometry są wyłącznie wirtualnym wynikiem gry.
5. **[UZUPEŁNIJ: minimalny wiek i zasady opieki nad graczami niepełnoletnimi po sprawdzeniu wymogów sklepów; do weryfikacji przez prawnika]**.

### §2. Jak działa ranking
1. Wynik pojedynczej próby jest wyrażony w **kilometrach (km)**, obliczanych przez mechanikę gry. Nie oznacza rzeczywiście przebytego dystansu.
2. Tryb **rankingowy (ranked)**: po zaakceptowaniu przez serwer wynik dodaje km do tygodniowego zestawienia kraju wskazanego przez gracza oraz może aktualizować jego najlepszy rezultat w rankingu indywidualnym. Wielokrotne zaakceptowane próby dokładają km do sumy Ligi Polonii według reguł serwera i obowiązujących limitów.
3. **Liga Polonii** porządkuje osiem krajów BE, NL, DE, UK, FR, CH, NO, DK według łącznej liczby zaakceptowanych kilometrów od początku do końca tygodnia. Kraj wskazuje **gracz**, a nie automatyczna lokalizacja telefonu; wybór nie jest deklaracją obywatelstwa ani miejsca zamieszkania.
4. Tydzień rankingowy liczony jest według tygodnia ISO od **poniedziałku 00:00 do następnego poniedziałku 00:00 czasu Europe/Warsaw**. **[UZUPEŁNIJ: czy wynik liczy się według rozpoczęcia czy zaakceptowania przejazdu; zalecana jawna reguła: data zatwierdzenia na serwerze]**.
5. **Ranking graczy** pokazuje wygenerowany pseudonim (wybór z listy), wybrany kraj i najlepszy zaakceptowany wynik, według wersji wdrożenia. **[UZUPEŁNIJ: limit widocznych pozycji, zasady remisów i zakres historyczny]**.
6. **Wyzwanie dnia (daily)** ma oddzielną klasyfikację, jeśli taka jest aktywna; jego przejazdy **nie zwiększają** tygodniowej sumy kraju w Lidze Polonii. **Tryb łagodny** jest bez rankingu.
7. Rankingi mogą być aktualizowane z opóźnieniem wynikającym z weryfikacji i dostępności usług, a niekoniecznie natychmiast po zakończeniu przejazdu.

### §3. Pseudonim i prywatność
1. Nie ma rejestracji imiennej. Dla rankingu tworzona jest techniczna, pseudonimowa tożsamość Firebase Anonymous Authentication i identyfikator UID; nick wybiera się z zatwierdzonej listy. **Nie można wpisywać własnego imienia, telefonu, linku ani hasła reklamowego** jako nicka.
2. Publicznie są widoczne wyłącznie dane niezbędne do klasyfikacji (np. gotowy nick, kraj, km, miejsce); zapisy serwerowe zawierają także UID i techniczne dane weryfikacji przejazdu. UID nie jest publikowany jako nazwa gracza.
3. Zasady retencji, dostępu i usunięcia danych podaje polityka prywatności pod **[UZUPEŁNIJ: HTTPS URL]**. Usunięcie danych może uniemożliwić zachowanie pozycji w rankingu; zakres wpływu na historyczną łączną sumę kraju **[UZUPEŁNIJ: decyzja techniczno-prawna]**.
4. Lokalna pamięć, odinstalowanie aplikacji lub zmiana przeglądarki mogą spowodować utratę dostępu do dotychczasowego anonimowego identyfikatora. Nie gwarantujemy odzyskania pseudonimowej tożsamości bez mechanizmu przeniesienia.

### §4. Weryfikacja wyniku, uczciwość, kary
1. Każda próba rankingowa otrzymuje na serwerze identyfikator i ziarno losowości; przy wysyłaniu wyniku serwer odtwarza przebieg na podstawie wejść gracza. Nie jest akceptowany wynik sprzeczny z odtworzoną symulacją, zduplikowany, nadmiernie przyspieszony, przesłany po terminie ani przekraczający limity.
2. Zabronione są: modyfikacja klienta lub transmisji w celu fałszowania wyniku, boty i automatyzacja dające nieuczciwą przewagę, obejście limitów, spamowanie API, wykorzystywanie błędów i celowe przeciążanie serwisu.
3. Serwer może **automatycznie odrzucić pojedynczy wynik** (np. niezgodna symulacja, powtórzenie, nielogiczny czas, limit). Istotne sankcje, w tym czasowe ograniczenie udziału, wymagają proporcjonalności, udokumentowania i możliwości odwołania. **[UZUPEŁNIJ: okresy blokad, progi i sposób rozpatrywania; do weryfikacji przez prawnika]**.
4. Jeśli wykryto błąd algorytmu lub oszustwo, Organizator może skorygować nieprawidłowe wyniki oraz odpowiadające im sumy krajów, ogłaszając istotne zmiany w jasny sposób. Nie wolno arbitralnie zmieniać wyników z przyczyn niezwiązanych z uczciwością lub awarią.
5. Odwołanie od odrzucenia wyniku: **[UZUPEŁNIJ: e-mail i prosty formularz]**, z podaniem identyfikatora przejazdu lub UID, przybliżonej daty i przyczyny. Organizator odpowie w **[UZUPEŁNIJ: rozsądny termin, np. 14 dni]**; odwołanie jest rozpatrywane przez człowieka.
6. Nie wprowadzamy limitów ani dyskwalifikacji na podstawie wybranego kraju, obywatelstwa, języka czy rzeczywistego miejsca pobytu; zmiana kraju jest możliwa zgodnie z działaniem aplikacji, ale nie uprawnia do technicznego podwójnego zaksięgowania tej samej próby.

### §5. Dostępność i odpowiedzialność
1. Organizator dokłada rozsądnych starań, aby ranking był dostępny, lecz mogą wystąpić planowane prace, przerwy infrastruktury i opóźnienia w synchronizacji. W granicach prawa nie gwarantuje nieprzerwanej dostępności.
2. Organizator nie ogranicza praw konsumentów ani odpowiedzialności, której nie można wyłączyć na podstawie przepisów bezwzględnie obowiązujących. **[do weryfikacji przez prawnika]**
3. Gra i ranking są formą rozrywki; wirtualne km nie są środkiem płatniczym, dobrem o gwarantowanej wartości ani prawem do nagrody.

### §6. Zmiany regulaminu, skargi, prawo
1. Aktualny regulamin jest publiczny pod stałym adresem HTTPS. Istotne zmiany będą komunikowane odpowiednio przed wejściem w życie, z wyłączeniem pilnych zmian bezpieczeństwa.
2. **[UZUPEŁNIJ: kraj siedziby Organizatora i zasady prawa właściwego]**. Zastrzeżenie prawa nie może pozbawiać konsumenta ochrony wynikającej z bezwzględnie obowiązujących przepisów państwa zwykłego pobytu, jeśli mają zastosowanie.
3. Kontakt dla skarg: **[UZUPEŁNIJ]**. Postanowienia nieważne nie naruszają pozostałej części regulaminu.

---

## B. ODDZIELNY SZABLON — konkurs sponsorowany / nagrody, **nieaktywny na starcie**

> **NIE PUBLIKOWAĆ ANI NIE URUCHAMIAĆ NAGRÓD NA PODSTAWIE TEGO SZABLONU BEZ ODSEPAROWANEGO REGULAMINU I ANALIZY PRAWNEJ W KAŻDEJ JURYSDYKCJI. [do weryfikacji przez prawnika]** Obecny ranking nie przyznaje niczego o wartości majątkowej.

### Projekt dodatku / osobnego regulaminu
1. **Organizator i sponsor:** [pełne nazwy, adresy, numery rejestru, prawne role, dane kontaktowe]; czy sponsor jedynie finansuje, czy wspólnie organizuje.
2. **Terytorium i kwalifikowalność:** [PL/BE/NL lub inne dokładnie wymienione], [wiek], [wymogi miejsca zamieszkania], [wyłączenie pracowników, sponsorów i rodzin], [czy dopuszczalna jest darmowa gra bez zakupu].
3. **Czas:** [strefa czasowa, początek, koniec, moment wyliczenia tabeli], [zasady spóźnionych wyników i awarii], [okres zgłoszeń i odbioru nagrody].
4. **Zasady przyznania:** wyłącznie **weryfikowalny wynik umiejętności** według jasnego kryterium [najwyższe km / pierwsze miejsce], obiektywny i niearbitralny tie-break [UZUPEŁNIJ]. **Każda losowość, losowanie, zależność od przypadku lub nagroda za udział wymaga osobnej analizy**; w grze z losowym generatorem przeszkód nawet pozorny „konkurs umiejętności” może zawierać element przypadku. [do weryfikacji przez prawnika]
5. **Nagrody:** [pełna lista, wartość brutto, liczba, dostępność, brak zamiany na pieniądze jeśli zgodne z prawem, zasady dostawy, podatki, termin wydania].
6. **Ustalenie zwycięzców:** [weryfikacja przejazdu i tożsamości tylko zwycięzców], [transparentna komisja], [protokół], [reklamacje i termin rozstrzygnięcia], [alternatywny zwycięzca w przypadku nieważnego wyniku].
7. **RODO:** [odrębna informacja o danych zwycięzców, adresie do wysyłki, dokumentach podatkowych, retencji, odbiorcach sponsor/logistyka, publikacji nazwisk tylko z właściwą podstawą].
8. **Wymogi sklepów:** [sprawdzić Google Play/App Store konkursy, nagrody, relacje ze sponsorem i obowiązkowe klauzule platform]; nie sugerować, że platformy sponsorują konkurs.
9. **Weryfikacja prawna przed startem:** [opinia prawnika PL, BE i NL, harmonogram zezwoleń, podatki/rozliczenia, ewentualne obowiązki reklamowe].

### Ryzyka terytorialne — *przegląd, nie rozstrzygnięcie*
- **Polska:** konkurs oparty wyłącznie na umiejętnościach może podlegać innym zasadom niż **loteria promocyjna**. Losowość i nagroda rzeczowa przy spełnieniu przesłanek ustawy o grach hazardowych mogą wymagać **zezwolenia** i szczególnego regulaminu; darmowy udział sam w sobie nie usuwa tego ryzyka. **[do weryfikacji przez polskiego prawnika]** Źródło: MF https://www.gov.pl/web/finanse/legalne-gry-hazardowe-przez-internet (dostęp: 30.10.2026).
- **Belgia:** ocenić definicję gry losowej, element przypadku, możliwą stawkę/korzyść, promocję i reklamę na gruncie ustawy z 7.05.1999 r. oraz właściwych przepisów o loteriach. **Nie zakładać, że brak opłaty w aplikacji automatycznie eliminuje wszystkie wymogi. [do weryfikacji przez belgijskiego prawnika]** Źródło: https://www.ejustice.just.fgov.be/eli/loi/1999/05/07/1999010222/justel ; przegląd tekstu https://refli.be/fr/lex/1999010222 (dostęp: 30.10.2026).
- **Niderlandy:** nawet nieodpłatna gra promocyjna z nagrodami może podlegać **Gedragscode promotionele kansspelen** (zasady wartości nagród, organizacji, przejrzystości i ochrony małoletnich); oddzielić rzeczywisty konkurs umiejętności od gry przypadku. **[do weryfikacji przez holenderskiego prawnika]** Źródło: Kansspelautoriteit https://kansspelautoriteit.nl/kansspel-om-iets-te-promoten/ i https://kansspelautoriteit.nl/gedragscode-promotionele-kansspelen/ (dostęp: 30.10.2026).

**Wniosek:** na MVP pozostać przy **wyłącznie symbolicznym rankingu bez nagród i losowań**. Wszelki sponsor może pojawić się wyłącznie jako jawnie oznaczony partner, nie jako warunek uzyskania przewagi lub automatycznej nagrody. [do weryfikacji przez prawnika w przypadku wdrożenia sponsoringu]

## Źródła i zależności

- RODO, art. 12–22, 77: https://eur-lex.europa.eu/eli/reg/2016/679/oj (dostęp: 30.10.2026).
- Dokument projektowy (decyzje D3, D4, D8): docs/GDD.md, stan 30.10.2026.
- Specyfikacja serwera i odtwarzania przejazdów: docs/zlecenia/11-firebase-backend.md, stan 30.10.2026.
- Warunki sklepów przy przyszłych konkursach: https://support.google.com/googleplay/android-developer/answer/9898843 i https://developer.apple.com/app-store/review/guidelines/ (dostęp: 30.10.2026).

**Pytania do koordynatora:** organizator formalny, wiek uczestnika, wiążąca reguła tygodnia dla przejazdów na granicy czasu, okres historii rankingów, polityka odwołań, prawo właściwe. Nie uruchamiać nagród do czasu osobnego zatwierdzenia prawnego.
