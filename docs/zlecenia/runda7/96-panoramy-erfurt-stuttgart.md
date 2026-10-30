# Zlecenie 96: Panoramy A+: Erfurt, Stuttgart, Jena, Lubeka, Fryburg Bryzgowijski

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express**. To **runda 7**. **Najpierw zrób `git pull origin main`** (jeśli masz dostęp).
> Gałąź: **`zlecenie/96-panoramy-erfurt-stuttgart`**, na koniec **szkic PR do `main`** z tytułem `[96] Panoramy A+: Erfurt, Stuttgart, Jena, Lubeka, Fryburg Bryzgowijski`.
> **Grafiki prawie na pewno nie dadzą się wypchnąć na GitHub z Twojego środowiska — to normalne.** Wtedy **od razu** przygotuj **ZIP z zachowaniem ścieżek repo** (np. `public/assets/landmarks/berlin.png`) i daj właścicielowi do pobrania. Koordynator (Claude) wgra go sam. Nie trać czasu na próby obejścia.
> **Limit obrazów:** jeśli generator obrazów zgłosi limit, oddaj ZIP z tym, co już masz, i wypisz, czego brakuje — dokończy inna sesja.

**Rodzaj:** grafika (generowanie obrazów)

## Miasta w tym zleceniu (5)
| id pliku | Miasto | Wskazówki |
|---|---|---|
| `erfurt` | Erfurt (Niemcy) | Motywy z gry: kamienice na moście; gotyckie wieże — wybierz 2–4 najbardziej rozpoznawalne budowle (zweryfikuj w źródłach) |
| `stuttgart` | Stuttgart (Niemcy) | Motywy z gry: wieża telewizyjna na wzgórzu; zielone zbocza — wybierz 2–4 najbardziej rozpoznawalne budowle (zweryfikuj w źródłach) |
| `jena` | Jena (Niemcy) | Motywy z gry: smukła wieża; zielone wzgórza — wybierz 2–4 najbardziej rozpoznawalne budowle (zweryfikuj w źródłach) |
| `lubeka` | Lubeka (Niemcy) | Motywy z gry: brama z dwiema okrągłymi wieżami; ceglany gotyk — wybierz 2–4 najbardziej rozpoznawalne budowle (zweryfikuj w źródłach) |
| `freiburg` | Fryburg Bryzgowijski (Niemcy) | Motywy z gry: strzelista wieża katedry; lasy na horyzoncie — wybierz 2–4 najbardziej rozpoznawalne budowle (zweryfikuj w źródłach) |

**Uwaga do małych miejscowości:** jeśli miasto nie ma światowej sławy zabytku, pokaż to, co rozpoznają mieszkańcy: rynek, ratusz, kościół, zamek, most, port, charakterystyczną zabudowę lub krajobraz (góry, morze, rzeka).

## Decyzja właściciela (30.10.2026)
Gracze mają **rozpoznać swoje miasto** w tle gry. Po porównaniu trzech stylów właściciel wybrał **styl A (rysunkowy), ale grubszy i większy**. Próbki stylu A (Antwerpia, Bruksela, Düsseldorf, Amsterdam) i porównania w kadrze gry są w repo: `docs/art/probki-panoram/*-A-rysunkowa.png` oraz `docs/art/probki-panoram/porownanie-*.png` (jeśli nie masz dostępu — opis poniżej wystarczy).

## Styl „A+” — obowiązkowy
- **Płaska ilustracja wektorowa** jak reszta gry: płaskie, ciepłe kolory, bez fotograficznych tekstur i gradientów, światło z lewej góry, miękkie cienie płaskimi plamami.
- **Gruby, ciemnogranatowy kontur `#1d2f3b`, ok. 9–10 px** na każdym budynku (w próbkach A był za cienki — w grze panorama jest zmniejszana ok. 5×, więc cienkie linie znikają).
- **Mniej detali, większe bryły:** 2–4 najbardziej znane budowle miasta, **duże**, zajmujące razem ok. **70–80% wysokości** obrazka; reszta zabudowy to prosty pas niskich kamienic w tle. Lepiej 3 rozpoznawalne sylwetki niż 30 małych domków. Okna jako proste prostokąty, bez cegieł i ornamentów.
- **Prawdziwe proporcje i kolejność** budynków, tak jak widać je z jednego, prawdziwego punktu (np. z drugiego brzegu rzeki). Mieszkaniec ma powiedzieć: „to nasze miasto”.
- Plik: **PNG 1620×900, przezroczyste tło** (bez nieba i chmur — dają je warstwy gry), **linia gruntu przy dolnej krawędzi** (najniżej 0–40 px od dołu może być woda/nabrzeże/trawa).
- Bez napisów, szyldów, reklam, logotypów firm i drużyn, flag państwowych, herbów i godeł, bez ludzi na pierwszym planie.
- **Prawo autorskie do budynków:** pomiń współczesne dzieła architektów, których wizerunku nie wolno komercyjnie używać bez licencji (np. **Atomium**, **piramida Luwru**, **Grande Arche**, nocna iluminacja wieży Eiffla). Zabytki historyczne i ogólny pejzaż miasta są w porządku. W razie wątpliwości wybierz inny symbol i napisz to w PR.
- Generuj **sam** (wbudowany generator obrazów ChatGPT); możesz oglądać zdjęcia miasta jako odniesienie, ale ich nie kopiuj 1:1.

## Gdzie zapisać
- `public/assets/landmarks/<id>.png` — **podmień** istniejący plik, jeśli jest (stary jest ogólnikowy i ma zniknąć).
- `docs/art/podglady/panoramy-<numer zlecenia>.png` — arkusz: wszystkie panoramy z tego zlecenia obok siebie na jasnoniebieskim tle z podpisami.
- `public/assets/landmarks/ASSETS-<numer zlecenia>.md` — dla każdego pliku: id, miasto, **jakie budynki i z jakiego punktu widzenia**, narzędzie, data, prompt, licencja (grafika generowana, prawa właściciela projektu).

## Kryteria akceptacji
Każde miasto z listy jako osobny PNG 1620×900 z przezroczystością, gruby kontur, 2–4 duże rozpoznawalne budowle, arkusz podglądu, ASSETS. Koordynator sprawdzi je w kadrze gry.

---

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
