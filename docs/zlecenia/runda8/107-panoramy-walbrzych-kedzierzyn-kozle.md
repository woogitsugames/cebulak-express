# Zlecenie 107: Panoramy A+ miast docelowych: Wałbrzych, Kędzierzyn-Koźle, Racibórz, Ełk, Biała Podlaska

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Nie masz dostępu do innych plików zleceń — wszystko, co ważne, jest tutaj. Repo (tylko do podglądu, jeśli masz dostęp): **https://github.com/woogitsugames/cebulak-express**. To **runda 8** (31.10.2026).
> **Nie próbuj wypychać grafik na GitHub ani tworzyć gałęzi i PR — w tej rundzie od razu oddajesz ZIP.** Przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/lublin.png`, `docs/art/podglady/…`, `…/ASSETS-107.md`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Sekcja „Git i PR” w zasadach wspólnych w tej rundzie **Cię nie dotyczy**.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.
> Nazwa ZIP-a: **`zlecenie-107.zip`**.

**Rodzaj:** grafika (generowanie obrazów)

## Miasta w tym zleceniu (5)
Kolejność = ważność: jeśli skończy się limit, oddaj najpierw te z góry.

| id pliku | Miasto | Proponowane motywy (wybierz 2–4, zweryfikuj w źródłach) | Gdzie sprawdzić wygląd (bez kopiowania zdjęć) |
|---|---|---|---|
| `walbrzych` | Wałbrzych | Zamek Książ na skale nad doliną (główna dominanta); zabytkowe wieże wyciągowe szybów Starej Kopalni (bez napisów); zalesione Góry Wałbrzyskie; kamienice śródmieścia. | https://pl.wikipedia.org/wiki/Wałbrzych; https://pl.wikipedia.org/wiki/Zamek_Książ; https://pl.wikipedia.org/wiki/Stara_Kopalnia |
| `kedzierzyn-kozle` | Kędzierzyn-Koźle | Port rzeczny na Odrze z barkami (bez nazw); wieża zamku w Koźlu; Rynek w Koźlu z ratuszem; fragment fortyfikacji. **Pomiń** zakłady chemiczne z nazwami. | https://pl.wikipedia.org/wiki/Kędzierzyn-Koźle; kedzierzynkozle.pl; Commons: Category:Koźle |
| `raciborz` | Racibórz | Zamek Piastowski z gotycką kaplicą zamkową (sylweta) nad Odrą; kamienice Rynku; wieża ratusza/kościoła farnego w tle; Odra na pierwszym planie. | https://pl.wikipedia.org/wiki/Racibórz; https://pl.wikipedia.org/wiki/Zamek_Piastowski_w_Raciborzu; raciborz.pl |
| `elk` | Ełk | Jezioro Ełckie z promenadą; zabytkowa wieża ciśnień (ceglana); mała kolejka wąskotorowa (bez napisów); ruiny zamku na półwyspie; zabudowa nad jeziorem. | https://pl.wikipedia.org/wiki/Ełk; https://pl.wikipedia.org/wiki/Ełcka_Kolej_Wąskotorowa; elk.pl |
| `biala-podlaska` | Biała Podlaska | Zespół pałacowo-parkowy Radziwiłłów: wieża bramna i oficyna w parku; kamienice śródmieścia; niska zabudowa i drzewa parku. | https://pl.wikipedia.org/wiki/Biała_Podlaska; https://pl.wikipedia.org/wiki/Zespół_pałacowo-parkowy_Radziwiłłów_w_Białej_Podlaskiej; bialapodlaska.pl |

Wszystkie źródła: dodatkowo **Wikimedia Commons** (kategoria miasta), **zabytek.pl** (Narodowy Instytut Dziedzictwa) i widok ulic w mapach — wyłącznie do sprawdzenia kształtu i kolejności budowli. Jeśli źródła pokażą, że proponowany motyw jest nierozpoznawalny albo łamie zasady treści, wybierz inny i opisz to w ASSETS.

## Decyzja właściciela (30.10.2026) — styl „A+”
Gracze mają **rozpoznać swoje miasto** w tle gry. Właściciel wybrał **styl A (rysunkowy), ale grubszy i większy**. W rundzie 7 powstało tak ~133 panoram; **dwie odrzucono**, bo wyszły jako płaska grafika bez grubego konturu — **taka grafika jest odrzucana i trzeba ją robić drugi raz.**

## Styl „A+” — obowiązkowy (sprawdź każdy obraz przed oddaniem)
- **Rysunkowa, płaska ilustracja wektorowa**: płaskie, ciepłe plamy koloru, bez fotograficznych tekstur i gradientów, światło z lewej góry, miękkie cienie płaskimi plamami.
- **GRUBY, ciemnogranatowy kontur ok. `#1d2f3b`, 9–10 px** na **każdym** budynku, dachu, drzewie, moście i brzegu wody. W grze panorama jest zmniejszana ok. 3,4× (do 480×267 px), więc cienkie linie znikają. **Grafika bez grubego konturu = odrzucona.**
- **2–4 duże dominanty** (najbardziej rozpoznawalne budowle lub elementy krajobrazu), zajmujące razem ok. **70–80% wysokości** obrazka; reszta zabudowy to prosty pas niskich kamienic/domów w tle. Lepiej 3 rozpoznawalne sylwetki niż 30 małych domków. Okna jako proste prostokąty, bez cegieł i ornamentów.
- **Prawdziwe proporcje i kolejność** budowli, tak jak widać je z jednego prawdziwego punktu (np. z drugiego brzegu rzeki, z rynku, z drogi wjazdowej). Mieszkaniec ma powiedzieć: „to nasze miasto”.
- **Jedna spójna ilustracja** w jednym stylu — bez doklejonych prostokątów wody, nieba czy mostów w innym stylu.
- Plik: **PNG RGBA 1620×900, przezroczyste tło** — **bez nieba, chmur, słońca** (dają je warstwy gry). **Linia gruntu przy dolnej krawędzi** (najniższe 0–40 px może być woda/nabrzeże/trawa, pełna szerokość).
- **Bez napisów**, szyldów, reklam, logotypów, flag, herbów i godeł, bez ludzi na pierwszym planie.
- Generuj **sam** (wbudowany generator obrazów ChatGPT). Jeśli generator nie daje przezroczystości, wytnij tło w Pythonie (alfa = 0 poza ilustracją) i sprawdź, że krawędzie nie mają białej obwódki.

**Uwaga do małych miejscowości:** jeśli miasto nie ma światowej sławy zabytku, pokaż to, co rozpoznają mieszkańcy: rynek z ratuszem, charakterystyczną wieżę, zamek, bramę, most, wieżę ciśnień, dworzec, typową zabudowę (drewniane domy z okiennicami, kamienice) i **krajobraz** (góry, jezioro, rzeka, puszcza, łąki z bocianami). Kombinacja „krajobraz + typowa zabudowa + 1 znany budynek” jest w pełni akceptowana.

## Jak gra używa tych plików (kontekst)
To **miasta docelowe** w Polsce — dom gracza, ostatni punkt trasy („Jesteś w domu!”). Panorama stanie na dalekim planie za drogą, pod kombi przylatującym do mety. Ma działać latem i zimą (gra w grudniu nakłada zimowe niebo), więc nie maluj śniegu ani zielonych liści jako dominującego motywu — neutralnie (dachy, mury, iglaki, łagodne pagórki).

## Gdzie zapisać (w ZIP-ie, ścieżki dokładnie takie)
- `public/assets/landmarks/<id>.png` — po jednym pliku na miasto (id z tabeli, małe litery, ascii, myślniki).
- `docs/art/podglady/panoramy-107.png` — arkusz podglądu: wszystkie panoramy z tego zlecenia obok siebie na jasnoniebieskim tle (`#bfe3f5`) z podpisem miasta pod każdą. Dodatkowo w drugim rzędzie te same panoramy **zmniejszone do 480×267 px** (tak je zobaczy gracz) — po tym widać, czy kontur jest dość gruby.
- `public/assets/landmarks/ASSETS-107.md` — dla każdego pliku: id, miasto, **jakie budowle/motywy i z jakiego punktu widzenia**, źródła, które oglądałeś, narzędzie (ChatGPT, generator obrazów), data, prompt, licencja (grafika generowana dla projektu, prawa właściciela projektu), ewentualne odstępstwa od tabeli i powód.

## Kryteria akceptacji (koordynator sprawdzi w kadrze gry)
1. Każde miasto jako osobny PNG **RGBA 1620×900**, przezroczyste tło, brak nieba.
2. **Gruby granatowy kontur na wszystkim** — także po zmniejszeniu do 480×267 px.
3. 2–4 duże, rozpoznawalne dominanty w prawdziwej kolejności; prosta zabudowa w tle.
4. Brak napisów, marek, flag, herbów; budowle sakralne tylko jako sylwetki; brak motywów alkoholu i tragedii.
5. Arkusz podglądu i `ASSETS-107.md` w ZIP-ie.

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
