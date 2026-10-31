# Zlecenie 125: Zima — Zielona Góra, Siemiatycze, Mońki, Bielsk Podlaski, Hajnówka

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo (tylko do podglądu): **https://github.com/woogitsugames/cebulak-express**. To **runda 9** (31.10.2026).
> **Do tej wiadomości właściciel załącza 5 letnich plików PNG** wymienione w tabeli (ZIP paczki `zlecenie-125-paczka.zip`). Każdą zimową wersję robisz **na podstawie załączonego letniego pliku**. Jeśli któregoś pliku brakuje, poproś o niego, zanim zaczniesz.
> **Nie wypychaj niczego na GitHub, nie twórz gałęzi ani PR — oddajesz ZIP** z zachowaniem ścieżek repo. Nazwa: **`zlecenie-125.zip`**. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje.

**Rodzaj:** grafika (edycja / przerysowanie obrazów)

Gra startuje **10–15 grudnia** w sezonie zimowym (1–26.12). Zimą tła krajów są już śnieżne, ale grafiki punktów trasy zostają letnie i zielone — wyglądają jak wycięte z innej pory roku. Robimy **zimowe wersje** istniejących grafik. Gra sama podmienia plik `<id>.png` na `<id>-zima.png`, gdy jest zima.

## Grafiki w tym zleceniu (5 punktów, 5 plików wynikowych)
Kolejność = ważność.

| plik(i) wynikowe | letni oryginał (załącznik) | co to jest | zakres | plan |
|---|---|---|---|---|
| `zielona-gora-zima.png` | `zielona-gora.png` | Panorama miasta docelowego (meta) — Zielona Góra | zimowa wersja istniejącej | daleki |
| `siemiatycze-zima.png` | `siemiatycze.png` | Panorama miasta docelowego (meta) — Siemiatycze | zimowa wersja istniejącej | daleki |
| `monki-zima.png` | `monki.png` | Panorama miasta docelowego (meta) — Mońki | zimowa wersja istniejącej | daleki |
| `bielsk-podlaski-zima.png` | `bielsk-podlaski.png` | Panorama miasta docelowego (meta) — Bielsk Podlaski | zimowa wersja istniejącej | daleki |
| `hajnowka-zima.png` | `hajnowka.png` | Panorama miasta docelowego (meta) — Hajnówka | zimowa wersja istniejącej | daleki |

## Jak zrobić zimową wersję (najważniejsze)
1. **Ta sama kompozycja co w letnim pliku:** te same budowle w tych samych miejscach i tej samej skali, ta sama linia gruntu, ten sam kadr, ten sam rozmiar **1620×900 RGBA** i przezroczyste tło. Gra podmienia plik 1:1 — **nic nie może się przesunąć ani zmienić proporcji**. Miasto ma pozostać tak samo rozpoznawalne.
2. **Zima, nie inny obraz:** śnieg na dachach, gzymsach, murach i wieżach (białe czapy z niebieskawym cieniem `#c9dbe8`, śnieg `#f4f8fb`); zielona trawa → zaspy śnieżne; drzewa iglaste ze śniegiem na gałęziach; drzewa liściaste **bez liści** (gałęzie z konturem) albo z czapami śniegu; woda ciemniejsza, przy brzegach lód (szeroka rzeka/morze nie zamarza całe).
3. **Przytulny grudzień:** okna **ciepło oświetlone** (żółte `#ffd36b`), dym z 1–2 kominów; na 1–2 budynkach albo na rynku **świeckie** ozdoby: girlanda lampek, choinka z lampkami. **Bez** szopek, gwiazd betlejemskich, aniołów, krzyży, scen religijnych. Bez Mikołaja z marką napojów.
4. **Bez nieba i padającego śniegu** — gra ma własne niebo i opady. Tło przezroczyste jak w oryginale.
5. **Ten sam styl:** rysunkowa ilustracja, **gruby granatowy kontur `#1d2f3b`** (taki sam jak w oryginale — nie cieńszy), płaskie plamy koloru. Budynki zachowują swoje barwy (czerwona cegła zostaje czerwona) — chłodniejsze są tylko cienie i grunt. **Grafika płaska bez grubego konturu jest odrzucana.**
6. Nie dodawaj napisów, flag, herbów, logo, tablic rejestracyjnych.

## Jak gra rysuje te grafiki
- **Daleki plan (panorama):** gra rysuje plik 1620×900 jako **480×267 px logicznych** (ok. 3,4× mniej), dolną krawędzią nad drogą. Kontur ok. **10–12 px `#1d2f3b`**, jak w letnim pliku.
- Zimowy plik ma **identyczny kadr** jak letni, więc stoi dokładnie w tym samym miejscu ekranu.

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `public/assets/landmarks/<id>-zima.png` — zimowa wersja każdego punktu; dla punktów „nowa grafika A+” także nowy letni `public/assets/landmarks/<id>.png` (nazwy z tabeli).
- `docs/art/podglady/zima-125.png` — arkusz podglądu na jasnoniebieskim tle (`#bfe3f5`): **w każdym wierszu lato i zima obok siebie** z podpisem id; pod spodem wszystkie zimowe w rozmiarze, w jakim zobaczy je gracz (480×267 px).
- `public/assets/landmarks/ASSETS-125.md` — dla każdego pliku: id, co przedstawia, narzędzie, data, prompt, licencja (grafika generowana dla projektu na podstawie letniej grafiki projektu; prawa właściciela projektu).

## Kryteria akceptacji
1. Każdy plik **PNG RGBA 1620×900**, przezroczyste tło, nazwy z tabeli.
2. Kompozycja zimowej wersji **zgodna z letnią** (z oryginałem albo z nową letnią A+) — porównanie w arkuszu lato/zima.
3. Wyraźnie zimowo (śnieg, bezlistne drzewa, ciepłe okna) i czytelnie po zmniejszeniu.
4. Gruby granatowy kontur; zero napisów, flag, herbów, logo, motywów religijnych.
5. Arkusz podglądu i `ASSETS-125.md` w ZIP-ie.

---

## Zasady treści rundy 9 (dodatkowo, obowiązkowe)
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
