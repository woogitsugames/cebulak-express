# Zlecenie 120: Rolki: zimowe okładki 9:16 i plansze zapowiedzi (tekst jako warstwy)

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Nie masz dostępu do innych plików zleceń — wszystko, co ważne, jest tutaj. Repo (tylko do podglądu, jeśli masz dostęp): **https://github.com/woogitsugames/cebulak-express**. To **runda 8** (31.10.2026).
> **Nie próbuj wypychać grafik na GitHub ani tworzyć gałęzi i PR — w tej rundzie od razu oddajesz ZIP.** Przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/lublin.png`, `docs/art/podglady/…`, `…/ASSETS-120.md`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.
> Nazwa ZIP-a: **`zlecenie-120.zip`**.

**Rodzaj:** grafika (generowanie obrazów + składanie warstw w Pythonie)

Od 1.12 na stronach PoPolsku/Aktualności idą rolki z zapowiedzią gry, a w dniu startu — rolka premierowa. Potrzebne są **okładki rolek 9:16** i **plansze końcowe**, spójne z grą. Nagrania z gry dokłada koordynator; Ty robisz grafiki.

## Co już jest (nie dubluj, nie podmieniaj)
W `public/assets/brand/` są: logo (zielona tablica drogowa z napisem „Cebulak Express”, złota cebulka, czerwona strzałka „Kierunek Polska”), ikona 1024×1024 i warstwy ikony adaptacyjnej Androida (`icon-foreground.png` 432×432 z kombi w bezpiecznym kole 264 px, `icon-background.png`, `icon-monochrome.png`, `icon-maskable-512.png`), letnia grafika wyróżniająca Google Play 1024×500 (kombi z walizkami na dachu na krętej drodze, słońce, tablice „Cebulak Express / Kierunek Polska / Z Europy do Polski”), tła karty wyniku 1080×1920 i 1080×1080 (letnie), grafiki OG 1200×630 (ogólna + BE, NL, DE, UK, FR, CH, NO, DK). **Nie ma** żadnych wersji zimowych.

**Bohater:** generyczne niebieskie kombi (turkusowo-niebieskie, bez marki i emblematów), na dachu trzy walizki (pomarańczowa, czerwona, zielona) i dwa miękkie tobołki, gruby kontur `#16323d`, światło z lewej góry. Paleta marki: zieleń drogowa `#14654F`, kontur `#16323D`, słoneczna żółć `#FFBD37`, czerwień kierunkowskazu `#CF2E37`. **Trzymaj się tego wyglądu kombi** — gracz ma rozpoznać auto z gry.

**Sezon zimowy w grze:** 1–26.12 („Na Wigilię!”): śnieg na polach i dachach, zimowe niebo, cieplejsze światło okien. Start gry planowany ok. 10–15.12.2026, zapowiedzi w rolkach od 1.12. **Data startu nie jest pewna — nie wpisuj jej w grafikę.** Wszystkie teksty jako **osobne warstwy PNG** (przezroczyste), żeby koordynator mógł je zmienić.

**Zimowo, ale bez religii:** śnieg, choinka jako drzewko iglaste z lampkami, światełka, prezenty/paczki, słoiki od mamy, kubek gorącej herbaty, czapka z pomponem na walizce — tak. Szopka, anioły, gwiazda betlejemska, opłatek, krzyże, Mikołaj w stroju biskupa — **nie**. Bez alkoholu (bez grzańca, kieliszków).

## Zadanie
### A. Okładki rolek (6 sztuk) — 1080×1920, PNG RGB
Każda okładka = jedna scena-hak w stylu gry, zima, z miejscem na tytuł w górnej 1/3 (y 160–700) i **bez tekstu w samym obrazie**:
1. `okladka-01-bagaznik` — kombi z absurdalnie wysoką wieżą walizek na dachu, pod ośnieżonym wiaduktem (mieści się na styk).
2. `okladka-02-objazd` — kombi nad pomarańczowymi pachołkami i znakami objazdu (puste tablice), śnieg.
3. `okladka-03-paczka-od-mamy` — paczka z kokardą i słoiki spadające z nieba do kombi, ciepłe okna domu w tle.
4. `okladka-04-daleka-droga` — kombi na tle fiordu i zorzy (Norwegia), długa droga.
5. `okladka-05-liga` — kilka generycznych kombi w różnych kolorach lecących obok siebie nad drogą (wyścig krajów, **bez flag** — kraje rozróżnia tylko kolor auta).
6. `okladka-06-start` — kombi startuje spod tablicy drogowej (pusta), fajerwerki z konfetti, śnieg (premiera).
Kombi zawsze zgodne z wyglądem z gry (niebieskie, 3 walizki), w okładce 5 inne auta też generyczne, bez marek.
### B. Warstwy tekstu (RGBA, 1080×1920, przezroczyste)
Krój OFL, biały z grubym konturem `#16323d` albo na żółtej tabliczce `#FFBD37`:
- `tekst-juz-wkrotce.png` — „Już wkrótce!”
- `tekst-w-grudniu.png` — „W grudniu ruszamy do domu”
- `tekst-zapowiedz-data.png` — **pusta żółta tabliczka** na datę (koordynator wpisze datę, gdy będzie pewna; Ty nie wpisuj żadnej daty)
- `tekst-gramy.png` — „Gramy! Leć do domu na święta”
- `tekst-wizualizacja.png` — mały znacznik „WIZUALIZACJA / PRZED PREMIERĄ” (do rolek z materiałem sprzed premiery), w prawym górnym rogu, ok. 40 px.
- `tekst-tytuly-01…06.png` — tytuły okładek: 01 „Czy to się zmieści?”, 02 „Objazd w najgorszym momencie”, 03 „Paczka od mamy w drodze”, 04 „Z Oslo do domu?”, 05 „Który kraj doleci najdalej?”, 06 „Startujemy!”
### C. Plansza końcowa
- `plansza-koncowa.png` (1080×1920 RGB): logo-podobna zielona tablica w stylu marki (puste pole na logo — koordynator wstawi prawdziwe `logo.png`), kombi odjeżdżające w dal zaśnieżoną drogą, puste miejsce na link (y 1450–1650).
- Sprawdź strefy bezpieczne rolek: nic ważnego w górnych 220 px i dolnych 380 px (interfejs Reels/TikTok) ani w prawym pasie 140 px (przyciski).

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `docs/marketing/rolki-grafiki/okladka-01-bagaznik.png` … `okladka-06-start.png`, `tekst-*.png`, `plansza-koncowa.png` (poza `public/`, żeby nie trafiły do aplikacji).
- `docs/art/podglady/rolki-okladki-120.png` — arkusz: 6 okładek z nałożonymi przykładowo warstwami „Już wkrótce” + tytuł, w miniaturach, z zaznaczonymi strefami bezpiecznymi.
- `docs/marketing/rolki-grafiki/ASSETS-120.md` — plik | narzędzie | prompt | licencja | font.

## Kryteria akceptacji
1. Okładki bez tekstu w obrazie; teksty jako osobne warstwy; **żadnej daty** w grafice.
2. Kombi zgodne z grą; brak flag, marek, motywów religijnych i alkoholu.
3. Ważne elementy w strefach bezpiecznych Reels/TikTok.


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
