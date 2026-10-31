# Zlecenie 121: Zimowe tła karty wyniku + zimowy OG

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Nie masz dostępu do innych plików zleceń — wszystko, co ważne, jest tutaj. Repo (tylko do podglądu, jeśli masz dostęp): **https://github.com/woogitsugames/cebulak-express**. To **runda 8** (31.10.2026).
> **Nie próbuj wypychać grafik na GitHub ani tworzyć gałęzi i PR — w tej rundzie od razu oddajesz ZIP.** Przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/lublin.png`, `docs/art/podglady/…`, `…/ASSETS-121.md`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.
> Nazwa ZIP-a: **`zlecenie-121.zip`**.

**Rodzaj:** grafika (generowanie obrazów + składanie warstw w Pythonie)

Karta wyniku to główny mechanizm wiralowy: po przejeździe gracz udostępnia obrazek z kilometrami. W grudniu (sezon 1–26.12) karta powinna być **zimowa**. Do tego zimowa grafika podglądu linku (OG) dla stron gry i portali.

## Co już jest (nie dubluj, nie podmieniaj)
W `public/assets/brand/` są: logo (zielona tablica drogowa z napisem „Cebulak Express”, złota cebulka, czerwona strzałka „Kierunek Polska”), ikona 1024×1024 i warstwy ikony adaptacyjnej Androida (`icon-foreground.png` 432×432 z kombi w bezpiecznym kole 264 px, `icon-background.png`, `icon-monochrome.png`, `icon-maskable-512.png`), letnia grafika wyróżniająca Google Play 1024×500 (kombi z walizkami na dachu na krętej drodze, słońce, tablice „Cebulak Express / Kierunek Polska / Z Europy do Polski”), tła karty wyniku 1080×1920 i 1080×1080 (letnie), grafiki OG 1200×630 (ogólna + BE, NL, DE, UK, FR, CH, NO, DK). **Nie ma** żadnych wersji zimowych.

**Bohater:** generyczne niebieskie kombi (turkusowo-niebieskie, bez marki i emblematów), na dachu trzy walizki (pomarańczowa, czerwona, zielona) i dwa miękkie tobołki, gruby kontur `#16323d`, światło z lewej góry. Paleta marki: zieleń drogowa `#14654F`, kontur `#16323D`, słoneczna żółć `#FFBD37`, czerwień kierunkowskazu `#CF2E37`. **Trzymaj się tego wyglądu kombi** — gracz ma rozpoznać auto z gry.

**Sezon zimowy w grze:** 1–26.12 („Na Wigilię!”): śnieg na polach i dachach, zimowe niebo, cieplejsze światło okien. Start gry planowany ok. 10–15.12.2026, zapowiedzi w rolkach od 1.12. **Data startu nie jest pewna — nie wpisuj jej w grafikę.** Wszystkie teksty jako **osobne warstwy PNG** (przezroczyste), żeby koordynator mógł je zmienić.

**Zimowo, ale bez religii:** śnieg, choinka jako drzewko iglaste z lampkami, światełka, prezenty/paczki, słoiki od mamy, kubek gorącej herbaty, czapka z pomponem na walizce — tak. Szopka, anioły, gwiazda betlejemska, opłatek, krzyże, Mikołaj w stroju biskupa — **nie**. Bez alkoholu (bez grzańca, kieliszków).

## Zadanie
### A. Zimowe tła karty wyniku (2 pliki, PNG RGB bez alfy)
Gra rysuje na tle **własne teksty** (logo, „Dojechałem!”, km, trasa, pasek postępu, przyczyna, liga, stopka). Dlatego **układ musi być 1:1 jak w letniej wersji**:
- `card-bg-zima-1080x1920.png` — 1080×1920: niebo i słońce/księżyc w górnych ~380 px (tu gra kładzie logo na ciemnozielonym panelu y 92–275), **jasny, półprzezroczysty kremowy panel z zaokrąglonymi rogami x 104–976, y 380–1425** (gra pisze na nim ciemnozielonym tekstem — panel musi być jasny i spokojny), poniżej droga z kombi (y ~1460–1920). **Stopka gry to biały tekst ok. y 1780–1830** — w tym pasie tło musi być **ciemne** (np. asfalt, ciemne auto, zmierzch), żeby biały napis był czytelny.
- `card-bg-zima-1080x1080.png` — 1080×1080: niebo u góry (logo gry y 42–190), **jasny kremowy panel x 104–976, y 212–760**, poniżej kombi na drodze; stopka biała ok. y 1020–1060 na ciemnym tle.
- Zima: śnieg na pagórkach i dachach walizek, delikatnie padający śnieg (nie na panelu — panel ma być czysty), zmierzch lub mroźny słoneczny dzień, choinka z lampkami przy drodze, w oddali ciepłe okna domów. Bez tekstu.
### B. Zimowy OG
- `og-zima-1200x630.png` — 1200×630, PNG RGB: kombi w śniegu w drodze do domu, światła domu w oddali, miejsce po prawej na logo; **z** warstwą tekstu w osobnym pliku `og-zima-tekst-1200x630.png` (RGBA): „Cebulak Express — Kierunek Polska” + podtytuł „Leć do domu na święta”. Złóż też wersję gotową `og-zima-1200x630-z-tekstem.png`.
- Najważniejsza treść w środkowym prostokącie 1000×530 (Facebook/Messenger przycinają brzegi).
### C. (jeśli zostanie limit) Brakujące letnie OG krajów
Na tym samym wzorze co istniejące `og-<kraj>-1200x630.png` (krajobraz kraju + kombi, bez flag i zabytków chronionych): `og-ie`, `og-es`, `og-it`, `og-at`, `og-se`, `og-fi`, `og-lu` — krajobraz typowy dla kraju (IE: zielone wzgórza i kamienne murki; ES: gaje oliwne i białe domy; IT: cyprysy i toskańskie wzgórza; AT: Alpy i drewniane domy; SE: czerwone domki i jeziora; FI: jeziora i lasy; LU: zielone doliny i zamek na skale). Najpierw A i B, potem C.

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `public/assets/brand/card-bg-zima-1080x1920.png`, `public/assets/brand/card-bg-zima-1080x1080.png`.
- `public/assets/brand/og-zima-1200x630.png`, `og-zima-tekst-1200x630.png`, `og-zima-1200x630-z-tekstem.png`.
- (C) `public/assets/brand/og-ie-1200x630.png` … `og-lu-1200x630.png`.
- `docs/art/podglady/karta-zima-121.png` — oba tła karty z **przykładowym** wpisanym tekstem karty (np. „Dojechałem!”, „1234 km”, „Z Brukseli do Siemiatycz”) w miejscach jak w grze, żeby sprawdzić czytelność; ten tekst **tylko w podglądzie**, nigdy w plikach produkcyjnych.
- `public/assets/brand/ASSETS-121.md` — plik | narzędzie | prompt | licencja | uwagi.

## Kryteria akceptacji
1. Panele kart dokładnie w podanych współrzędnych, jasne i czyste; stopka czytelna na ciemnym tle.
2. Pliki produkcyjne bez tekstu (poza osobną warstwą OG); RGB bez alfy, dokładne wymiary.
3. Zimowo, bez motywów religijnych, alkoholu, flag i marek.


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
