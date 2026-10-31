# Zlecenie 119: Sklep: zimowe tła i podpisy do zrzutów ekranu (bez fałszowania rozgrywki)

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Nie masz dostępu do innych plików zleceń — wszystko, co ważne, jest tutaj. Repo (tylko do podglądu, jeśli masz dostęp): **https://github.com/woogitsugames/cebulak-express**. To **runda 8** (31.10.2026).
> **Nie próbuj wypychać grafik na GitHub ani tworzyć gałęzi i PR — w tej rundzie od razu oddajesz ZIP.** Przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/lublin.png`, `docs/art/podglady/…`, `…/ASSETS-119.md`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.
> Nazwa ZIP-a: **`zlecenie-119.zip`**.

**Rodzaj:** grafika (generowanie obrazów + składanie warstw w Pythonie)

Google Play pokaże do 8 pionowych zrzutów ekranu. **Prawdziwe zrzuty z gry wstawi koordynator.** Ty robisz tylko **tła (ramki) i podpisy jako osobne warstwy**. **Nie wolno rysować ani podrabiać rozgrywki**: żadnych wymyślonych ekranów, wyników, rankingów, ocen, liczników pobrań ani elementów interfejsu gry. W miejscu zrzutu ma zostać **puste, przezroczyste okno**.

## Co już jest (nie dubluj, nie podmieniaj)
W `public/assets/brand/` są: logo (zielona tablica drogowa z napisem „Cebulak Express”, złota cebulka, czerwona strzałka „Kierunek Polska”), ikona 1024×1024 i warstwy ikony adaptacyjnej Androida (`icon-foreground.png` 432×432 z kombi w bezpiecznym kole 264 px, `icon-background.png`, `icon-monochrome.png`, `icon-maskable-512.png`), letnia grafika wyróżniająca Google Play 1024×500 (kombi z walizkami na dachu na krętej drodze, słońce, tablice „Cebulak Express / Kierunek Polska / Z Europy do Polski”), tła karty wyniku 1080×1920 i 1080×1080 (letnie), grafiki OG 1200×630 (ogólna + BE, NL, DE, UK, FR, CH, NO, DK). **Nie ma** żadnych wersji zimowych.

**Bohater:** generyczne niebieskie kombi (turkusowo-niebieskie, bez marki i emblematów), na dachu trzy walizki (pomarańczowa, czerwona, zielona) i dwa miękkie tobołki, gruby kontur `#16323d`, światło z lewej góry. Paleta marki: zieleń drogowa `#14654F`, kontur `#16323D`, słoneczna żółć `#FFBD37`, czerwień kierunkowskazu `#CF2E37`. **Trzymaj się tego wyglądu kombi** — gracz ma rozpoznać auto z gry.

**Sezon zimowy w grze:** 1–26.12 („Na Wigilię!”): śnieg na polach i dachach, zimowe niebo, cieplejsze światło okien. Start gry planowany ok. 10–15.12.2026, zapowiedzi w rolkach od 1.12. **Data startu nie jest pewna — nie wpisuj jej w grafikę.** Wszystkie teksty jako **osobne warstwy PNG** (przezroczyste), żeby koordynator mógł je zmienić.

**Zimowo, ale bez religii:** śnieg, choinka jako drzewko iglaste z lampkami, światełka, prezenty/paczki, słoiki od mamy, kubek gorącej herbaty, czapka z pomponem na walizce — tak. Szopka, anioły, gwiazda betlejemska, opłatek, krzyże, Mikołaj w stroju biskupa — **nie**. Bez alkoholu (bez grzańca, kieliszków).

## Zadanie
Seria **8 plansz 1080×1920 px** (pion 9:16) w jednym stylu, zimowa (sezon startowy):
- **Tło** `ramka-NN-tlo.png` (RGB, pełne, bez alfy): zimowy pejzaż w stylu gry (śnieg, pagórki, światełka, droga), u góry **pas na podpis** (y 0–420 px, spokojny, ciemniejszy lub jaśniejszy, żeby tekst był czytelny), na dole drobne motywy (walizki, słoiki, paczki z kokardą, kawałek drogi). Każda z 8 plansz trochę inna (inna pora dnia/kolor nieba/motyw dołu), ale spójna seria.
- **Maska okna** `ramka-NN-okno.png` (RGBA): zaokrąglony prostokąt **x 120–960, y 470–1850** (840×1380 px, proporcja 9:14,8 — zrzut 1080×1920 zostanie przeskalowany do szerokości 840 i przycięty od dołu, koordynator to zrobi), z grubą kremową ramką i cieniem, **wnętrze w pełni przezroczyste**. Bez rysunku telefonu z prawdziwej marki (jeśli chcesz obudowę, to generyczna, bez przycisków i logo).
- **Podpis** `ramka-NN-podpis.png` (RGBA, przezroczysty, 1080×420): biały tekst z ciemnym konturem `#16323d`, krój bezszeryfowy pogrubiony z licencją OFL (np. Inter Black, Baloo 2, Nunito Black — podaj w ASSETS), maks. 2 linie, wyśrodkowany, ok. 90–110 px.
- **Podpisy (PL)** — dokładnie te, w tej kolejności:
  1. „JEDEN DOTYK. I LECISZ!”
  2. „Z 15 KRAJÓW DO POLSKI”
  3. „BAGAŻ? JESZCZE SIĘ ZMIEŚCI”
  4. „SŁOIKI DODAJĄ KILOMETRY”
  5. „PO DRODZE DO DOMU”
  6. „TWOJE MIASTO NA MECIE” *(panoramy miast)*
  7. „ZBIERAJ POCZTÓWKI Z TRASY” *(album)*
  8. „POCHWAL SIĘ KILOMETRAMI” *(karta wyniku)*
  (Koordynator użyje tylko tych plansz, dla których ma prawdziwy zrzut funkcji, która działa w wersji sklepowej.)
- **Podgląd składania** — wyłącznie z **szarym, kreskowanym prostokątem z napisem „TU ZRZUT Z GRY”** w oknie (to jedyny dozwolony napis poza podpisem, tylko w arkuszu podglądu, nie w plikach produkcyjnych).
- Skrypt Pythona `docs/sklep/ramki/skladaj.py` (Pillow): `python skladaj.py zrzut.png 3 wynik.png` składa tło + przeskalowany zrzut w oknie + ramkę + podpis; wynik 1080×1920 PNG RGB. Opisz w komentarzu, że zrzut jest skalowany proporcjonalnie (bez rozciągania) i przycinany tylko od dołu.

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `docs/sklep/ramki/ramka-01-tlo.png` … `ramka-08-tlo.png` (poza `public/`, żeby nie trafiły do aplikacji), `ramka-01-okno.png` … `ramka-08-okno.png`, `ramka-01-podpis.png` … `ramka-08-podpis.png`.
- `docs/sklep/ramki/skladaj.py` (skrypt składania).
- `docs/art/podglady/ramki-sklep-119.png` — 8 plansz złożonych z szarym prostokątem „TU ZRZUT Z GRY”, w miniaturach 270×480.
- `docs/sklep/ramki/ASSETS-119.md` — plik | narzędzie | prompt | licencja | font (nazwa, licencja OFL, źródło).

## Kryteria akceptacji
1. Żaden plik nie zawiera wymyślonej rozgrywki, interfejsu, wyników, ocen ani liczb.
2. Okno w pełni przezroczyste, dokładnie x 120–960, y 470–1850; podpisy jako osobne warstwy, czytelne w miniaturze 180×320.
3. Spójna zimowa seria w stylu gry; bez marek, flag, motywów religijnych.
4. Skrypt składa planszę bez rozciągania zrzutu.


---

## Zasady treści rundy 8 (dodatkowo, obowiązkowe)
- **Zero słowa „Flappy”** i niczego z Flappy Bird (ptak, zielone rury, układ ekranów).
- **Żadnych prawdziwych marek, logotypów ani ich parodii.** Auta bez marek i emblematów, ciężarówki i busy bez napisów, stacje paliw bez nazw i logo, promy bez nazw armatorów, samoloty bez oznaczeń linii.
- **Bez alkoholu** (także winnic, beczek, kufli, szyldów barów), **bez polityki** (pomników politycznych, haseł), **bez religii jako tematu** i **bez tragedii** (miejsca wojen, katastrof, obozów, cmentarzy). Kościoły, cerkwie i inne budowle sakralne wolno pokazać **tylko jako sylwetki w panoramie miasta**, jak w poprzednich rundach — bez krzyży na pierwszym planie, bez scen religijnych, procesji, kapliczek przydrożnych. Gdy to możliwe, wybieraj jako dominanty budowle świeckie (ratusz, zamek, brama, wieża, most, krajobraz).
- **Bez godeł, herbów i flag** (także flag państw, regionów, miast i UE). Biało-czerwone barwy (szlaban, pas na wiacie) są dozwolone.
- **Bez napisów** w grafice (nazwy, szyldy, tablice, numery rejestracyjne). Puste tablice mogą zostać puste.
- **Test babci:** babcia w Siemiatyczach ma się uśmiechnąć, kolega z pracy w Belgii ma zobaczyć sympatycznych Polaków.
- Słowo **„cebulak”** tylko w tytule gry i nazwach skórek — **nigdy** w komunikatach ani podpisach.
- **Pomijamy budynki chronione prawem autorskim** (współczesna architektura autorska, np. nowe sale koncertowe, centra kultury, nowoczesne świątynie i pomniki z ostatnich dekad; Atomium, piramida Luwru, Grande Arche). Zabytki historyczne i ogólny pejzaż miasta są w porządku. W razie wątpliwości wybierz inny motyw i napisz to w `ASSETS-NN.md`.
- Zdjęcia z podanych źródeł służą **tylko do sprawdzenia wyglądu** (kształt, proporcje, kolejność budynków). Niczego nie kopiuj 1:1 i nie odrysowuj zdjęcia.

# Zasady wspólne dla wszystkich zleceń (obowiązkowe)

Te zasady są wklejone na końcu każdego pliku zlecenia — obowiązują każde zlecenie.

## Projekt w skrócie
- **Gra:** „Cebulak Express — Kierunek Polska”. Polonijna gra na jeden palec: przeładowane kombi z bagażami na dachu leci z kraju zamieszkania emigranta (BE, NL, DE, UK, FR, CH, NO, DK) do domu w Polsce. Tap = podskok, kolizja = koniec, wynik w kilometrach. Znajdźki (paczka od mamy, słoik) dają km, ale chwilowo obciążają auto.
- **Cel:** zasięg i ruch do polonijnych portali (PoPolsku, TuWiesz, Aktualności), materiał na rolki. Gra ma być ładna, memiczna, wiralowa.
- **Platformy:** aplikacja Android (Capacitor, compileSdk/targetSdk 36), potem iOS; ta sama gra jako web/PWA do osadzania w portalach.
- **Repo:** `woogitsugames/cebulak-express`. Dokument projektowy: `docs/GDD.md` (sekcja „Decyzje właściciela” ma pierwszeństwo). Makiety klimatu: `docs/research/gpt6-makiety/`.
- **Stos:** TypeScript (strict), Vite, Vitest, czysty Canvas 2D (bez Phasera), Capacitor 8, Firebase (backend rankingu).

## Architektura i własność plików
| Ścieżka | Właściciel | Uwagi |
|---|---|---|
| `src/core/` | koordynator | Symulacja bez DOM, deterministyczna. **Nie zmieniaj** — jeśli potrzebujesz zmiany, opisz ją w PR jako propozycję. Wyjątek: zlecenie wprost pozwala dodać nowy plik. |
| `src/main.ts`, `src/render/renderer.ts`, `index.html`, `src/style.css` | koordynator | Integrację z tymi plikami robi koordynator. Ty dostarczasz moduł z czystym API i opisem integracji w PR. |
| `src/content/pl.ts` | zlecenie T01 | Pozostali proponują teksty w PR, nie edytują. |
| `public/assets/<kategoria>/` | zlecenia graficzne | Każde zlecenie ma swój podfolder. |
| `android/` | koordynator | Chyba że zlecenie mówi inaczej. |
| Twój folder ze zlecenia | Ty | Twórz pliki tylko tam, gdzie zlecenie pozwala. |

Kluczowe API rdzenia (czytaj kod, nie zgaduj): `src/core/game.ts` (`Game`, `replay`, zdarzenia `GameEvent`), `src/core/config.ts` (stałe, świat 360×640 px logicznych, `TICK = 1/120 s`), `src/core/obstacles.ts` (generator z ziarnem), `src/core/route.ts` (kraje, miasta, trasy).

## Git i PR
1. Gałąź z aktualnego `main`: `zlecenie/NN-krotka-nazwa` (NN = numer zlecenia).
2. Małe, czytelne commity po polsku. **Nigdy** push na `main`, nigdy force‑push na cudze gałęzie, **nigdy sekretów** (kluczy API, haseł, plików `google-services.json` z kluczami prywatnymi, keystore) w repo.
3. Na koniec: **szkic PR (draft) do `main`**, tytuł `[NN] Krótki opis`. Opis PR: co zrobione, jak sprawdzić, czego NIE sprawdziłeś, jak zintegrować (dla modułów), lista plików.
4. Przed PR: `npm ci && npm run typecheck && npm test && npm run build` muszą przejść. CI (GitHub Actions) uruchomi to samo i zbuduje APK.
5. Nie dodawaj zależności npm bez potrzeby. Jeśli musisz: wersja dokładna, opublikowana co najmniej 2 tygodnie temu, uzasadnienie w PR.

## Twarde zasady treści (nie łamać)
- **Zero słowa „Flappy”** w nazwach, opisach, metadanych, kodzie. Nie kopiujemy grafiki, rur, ptaka ani układu ekranów Flappy Bird.
- **Żadnych prawdziwych marek i logotypów**: linie lotnicze, promowe, stacje paliw, sklepy, słodycze, samochody — także parodii nazw. Pisz „stacja paliw”, „prom”, „tani przewoźnik”. Biało‑czerwona stacja paliw na granicy jest OK jako **generyczna** (bez nazwy i logo żadnej firmy).
- **Bez godła RP** (dozwolone biało‑czerwone barwy). Bez flagi i gwiazd UE. Auto to **generyczne kombi**, nie konkretny model (nie Fiat 125p, nie Łada, nie Polonez).
- **Ton:** śmiejemy się z sytuacji (bagaż, objazdy, korki, tęsknota, słoiki od mamy), nie z ludzi. Bohater sympatyczny i zaradny. Bez alkoholu, polityki, religii, tragedii. Kraje zamieszkania nie są wrogami — przeszkody to infrastruktura i pogoda. Słowo „cebulak” tylko w tytule gry i w nazwie skórki wybieranej przez gracza, **nigdy** w komunikatach do gracza.
- **Test babci i kolegi z pracy:** czy babcia w Siemiatyczach się uśmiechnie? Czy Belg z pracy zobaczy sympatycznych Polaków? Jeśli nie — wyrzucamy.
- **Zabytki** tylko jako sylwetki/ilustracje. Nie używamy Atomium (prawa autorskie w Belgii).
- **Prywatność:** bez kont i reklam personalizowanych, anonimowy identyfikator, nicki tylko z generowanej listy (bez wolnego tekstu), bez zbierania IP w bazie.

## Zasoby (grafika, dźwięk, czcionki)
- Tylko z jasną licencją: własne, wygenerowane przez Ciebie (AI) z ręczną poprawką, CC0 (np. Kenney.nl) albo czcionki z licencją OFL (Google Fonts).
- W każdym folderze z zasobami plik `ASSETS.md`: tabela `plik | źródło/narzędzie | licencja | autor/uwagi`. Dla grafik AI: „wygenerowane w ChatGPT (DALL·E/GPT Image), poprawki: …”.
- **Styl graficzny:** kolorowa, ciepła ilustracja w duchu makiet (`docs/research/gpt6-makiety/`): grube kontury, nasycone kolory, słoneczne niebo, przesadzone proporcje, humor w detalach. Ma być ładnie, memicznie, „sprzedawalnie”. Spójny kąt światła (słońce z lewej góry). Bez tekstu wtopionego w grafikę (teksty dodaje gra), wyjątek: logo.
- **Format:** PNG z przezroczystością (tła warstw też PNG/WebP), sRGB. Skala **@3x** względem świata gry: 1 px logiczny = 3 px w pliku. Świat ma 360×640 px logicznych → pełny ekran = 1080×1920 px.
- Nazwy plików: małe litery, ascii, myślniki: `kombi-idle.png`, `de-far-01.png`.

## Język
Kod: identyfikatory po angielsku, komentarze i teksty po polsku (tak jak w istniejącym kodzie). Dokumenty i PR po polsku.

## Gdy coś jest niejasne
Nie zgaduj w sprawach treści i prawa: zapisz pytanie w opisie PR w sekcji „Pytania do koordynatora” i zrób resztę. W sprawach technicznych wybierz rozsądny domyślny wariant i opisz go.
