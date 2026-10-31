# Zlecenie 114: Przejścia graniczne za granicą: La Jonquera, Tarvisio, Mikulov, EE–LV, LV–LT

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Nie masz dostępu do innych plików zleceń — wszystko, co ważne, jest tutaj. Repo (tylko do podglądu, jeśli masz dostęp): **https://github.com/woogitsugames/cebulak-express**. To **runda 8** (31.10.2026).
> **Nie próbuj wypychać grafik na GitHub ani tworzyć gałęzi i PR — w tej rundzie od razu oddajesz ZIP.** Przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/lublin.png`, `docs/art/podglady/…`, `…/ASSETS-114.md`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.
> Nazwa ZIP-a: **`zlecenie-114.zip`**.

**Rodzaj:** grafika (generowanie obrazów)

Te przejścia stoją na trasach przez Czechy, Alpy, Pireneje i kraje bałtyckie. Dziś wszystkie pokazują tę samą polską stację (`granica-stacja.png`), co wygląda dziwnie w Hiszpanii czy na Łotwie. Na granicach w strefie Schengen nie ma budek kontroli — pokaż **otwartą drogę z pustym znakiem, krajobraz i typową zabudowę**.

## Punkty w tym zleceniu (5)
Kolejność = ważność.

| id pliku | Punkt na trasie | Co pokazać | Gdzie sprawdzić wygląd (bez kopiowania zdjęć) |
|---|---|---|---|
| `mikulov` | Mikulov (Czechy, przy granicy z Austrią) — trasa z Austrii i Włoch | Zamek na skale nad miasteczkiem (biały, z dachami), łagodne wapienne pagórki (winnic **nie** rysuj — motyw wina), przy drodze pusty niebieski znak i zielony pas trawy. | https://pl.wikipedia.org/wiki/Mikulov; Commons: Category:Mikulov Castle |
| `tarvisio` | Tarvisio (Włochy, przy granicy z Austrią) | Zielone Alpy Julijskie, wylot tunelu w zboczu, kamienno-drewniane domy alpejskie, świerki; przy drodze pusty znak. | https://it.wikipedia.org/wiki/Tarvisio; Commons: Category:Tarvisio |
| `la-jonquera` | La Jonquera (Hiszpania, przy granicy z Francją) | Górski przejazd przez Pireneje: suche, skaliste zbocza, pinie i dęby korkowe, kamienne domy z dachówką, wiadukt drogowy w tle; pusty niebieski znak. **Bez napisów i szyldów sklepów.** | https://es.wikipedia.org/wiki/La_Junquera; https://pl.wikipedia.org/wiki/Pireneje |
| `granica-ee-lv` | Granica Estonii i Łotwy (droga Via Baltica, Ikla/Ainaži) | Droga przez sosnowy las przy wybrzeżu, wydmy, drewniany dom z czerwonym dachem, pusty znak graniczny bez godła (sama prostokątna tablica). | https://pl.wikipedia.org/wiki/Via_Baltica; Commons: Category:Ainaži |
| `granica-lv-lt` | Granica Łotwy i Litwy (Via Baltica) | Szosa przez płaskie pola i łąki, brzozy, bocian na gnieździe na słupie, drewniana stodoła; pusty znak graniczny. | https://pl.wikipedia.org/wiki/Via_Baltica; Commons: Category:Via Baltica |

## Jak gra rysuje te punkty (sprawdzone w kodzie)
- Punkty typu **granica** (`border`) i **stacja** (`rest`) stoją na **bliskim planie przy drodze** (warstwa „near”, przesuwa się 2× szybciej niż dalekie panoramy). Plik **1620×900** gra rysuje jako **180×100 px logicznych**, czyli **zmniejsza go ok. 9×** (na ekranie telefonu ok. 540×300 px), dolną krawędzią na linii jezdni. Dlatego:
  - **kontur jeszcze grubszy niż w panoramach: ok. 14–16 px, kolor `#1d2f3b`**;
  - **mało, ale dużych brył** (szlaban, budka, wiata, 1–2 drzewa); drobiazgi (kubek kawy, ludzie, małe znaki) znikną;
  - **najważniejsze obiekty w środkowym pasie wysokości (wiersze ok. 250–750 px)**, linia gruntu ok. 40–80 px nad dolną krawędzią; dolny pas to neutralna trawa/pobocze na całą szerokość (część może zasłonić pobocze drogi). Górna 1/4 obrazka może być pusta (przezroczysta).
- Obecnie wszystkie punkty bez własnej grafiki dostają wspólny obrazek `granica-stacja.png`: biało-czerwona wiata stacji bez logo z dwoma dystrybutorami, budka z kawą/hot dogami z pasiastą markizą, pusty niebieski znak na dwóch słupkach, kilka generycznych busów i szlaban, po bokach świerki, zielony pas trawy u dołu. **Zachowaj ten sam styl i paletę** (kremowa biel `#fff6e6`, czerwień `#d9534f`/`#e8735c`, błękit znaku `#2779b0`, zieleń trawy `#72a95a`, kontur `#1d2f3b`), ale każda grafika ma pokazać **charakter miejsca** (krajobraz, typowa zabudowa), żeby gracz poczuł, że jest gdzie indziej.
- **Przy polskiej granicy latem gra pokazuje już osobny pas pobocza ze stacją i szlabanem**, więc polska stacja zaraz za granicą bywa schowana. Grafiki stacji mają więc różnić się **otoczeniem**, nie samą stacją.

## Format (wszystkie pliki w tym zleceniu)
- **PNG RGBA 1620×900, przezroczyste tło** (bez nieba, chmur, słońca — dają je warstwy gry).
- Styl gry: rysunkowa, płaska ilustracja, **gruby granatowy kontur ok. `#1d2f3b` (14–16 px)**, płaskie ciepłe plamy, światło z lewej góry. **Grafika płaska bez grubego konturu jest odrzucana** (tak odrzucono dwie panoramy w rundzie 7).
- **Bez flag, godeł, herbów, nazw firm i stacji paliw, bez tablic z napisami** (znaki puste albo z samym kształtem/kolorem), bez tablic rejestracyjnych z numerami, bez ludzi w mundurach (to ma być spokojna, przyjazna podróż, nie kontrola).
- Auta i busy generyczne, bez marek i emblematów.
- Sprawdź każdy obraz **zmniejszony do 180×100 px**: czy nadal widać, co to jest?

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `public/assets/landmarks/<id>.png` — po jednym pliku na punkt (id z tabeli).
- `docs/art/podglady/punkty-114.png` — arkusz podglądu: wszystkie grafiki obok siebie na jasnoniebieskim tle (`#bfe3f5`) z podpisami; w drugim rzędzie te same grafiki zmniejszone **do rozmiaru, w jakim zobaczy je gracz** (180×100 px).
- `public/assets/landmarks/ASSETS-114.md` — dla każdego pliku: id, punkt, co przedstawia, źródła, które oglądałeś, narzędzie, data, prompt, licencja (grafika generowana dla projektu, prawa właściciela projektu).

## Kryteria akceptacji
1. Każdy punkt jako osobny PNG **RGBA 1620×900** z przezroczystym tłem.
2. Gruby granatowy kontur na wszystkim; czytelne po zmniejszeniu.
3. Widać charakter miejsca (krajobraz, typowa zabudowa), a nie kolejną identyczną stację.
4. Zero flag, herbów, godeł, nazw i logo firm, napisów.
5. Arkusz podglądu i `ASSETS-114.md` w ZIP-ie.

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
