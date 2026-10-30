# Zlecenie 72: Auta do odblokowania za przejechane kilometry (logika + garaż)

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express** (masz do niego dostęp). To **runda 5**: gra na `main` ma grafiki w płaskim stylu wektorowym, tła krajów z punktami trasy (`public/assets/landmarks/`), garaż ze skórkami, rolki, ranking, Androida, iOS, PWA. **Najpierw zrób `git pull origin main`** — pracuj na najnowszym kodzie.
> Gałąź: **`zlecenie/72-auta-odblokowania`** z aktualnego `main`. Na koniec: **szkic PR do `main`** z tytułem `[72] Auta do odblokowania za przejechane kilometry (logika + garaż)`.
> **Jeśli wypchnięcie na GitHub się nie uda:** spakuj zmienione pliki w ZIP z zachowaniem ścieżek repo (np. `public/assets/...`, `src/...`) i daj właścicielowi do pobrania — koordynator wgra je sam.
> Koordynator (Claude) przegląda, integruje i scala.

**Rodzaj:** kod (TypeScript, DOM)

## Decyzja właściciela (obowiązuje)
Auta mają być **rozpoznawalne sylwetką** (każdy Polak za granicą od razu wie, „co to za auto”), ale **bez marek**: żadnych logotypów, emblematów, charakterystycznych grilli 1:1, nazw marek ani modeli, także przerobionych („Pasat”, „Audik” — **zakazane**). Nazwy w grze to **polonijne przezwiska**.

## Lista aut (id → nazwa w grze → sylwetka, na której się wzorować)
| id | Nazwa w grze | Sylwetka (tylko inspiracja kształtu) | Odblokowanie (km łącznie) |
|---|---|---|---|
| `mala-japonka` | Mała Japonka | mała, zaokrąglona miejska trzydrzwiówka, typowa japońska „miejska” | 500 |
| `kompakt-szwagra` | Kompakt od szwagra | klasyczny niemiecki kompaktowy hatchback, 5 drzwi, kanciasty tył | 1 500 |
| `dieselek-dziadka` | Dieselek po dziadku | duże niemieckie kombi z lat 2000, srebrne, relingi, hak | 3 000 |
| `pradziak-z-oslo` | Prądziak z Oslo | nowoczesny elektryczny liftback, gładki przód bez grilla | 6 000 |
| `furgonetka-pl` | Furgonetka „PL–BE–NL” | wysoki biały van dostawczy z napisem „Transport PL–BE–NL” (fikcyjny) | 10 000 |
| `kamper-wakacje` | Kamper na wakacje | mały kamper na bazie vana, markiza, rowery z tyłu | 20 000 |
| `kombi-prezesa` | Kombi prezesa | duże, niskie, eleganckie kombi klasy wyższej, ciemnogranatowe, alufelgi | 40 000 |

Domyślne kremowo‑czerwone kombi oraz skórki Pan Cebulek / Pani Cebulka / Bus kurierski zostają dostępne od początku.

## Kontekst
Skórki: `src/render/sprites.ts` (`HERO_SKINS`, `SkinLayout`, `parseSkinLayout`, pliki w `public/assets/skins/<id>/skin.json` + warstwy), garaż `src/ui/garage.ts` (`mountGarage`, `SKIN_NAMES`), ustawienia `src/storage.ts`/`src/platform` (zapis lokalny). Zlecenie 53 (medale, `src/meta/progress.ts`) może być już na `main` — jeśli tak, korzystaj z jego licznika km łącznie; jeśli nie, dodaj minimalny licznik `totalKm` w `src/meta/unlocks.ts` i opisz w PR, jak połączyć.

## Zadanie
1. `src/meta/unlocks.ts`: lista aut z progami (tabela wyżej), czysta funkcja `unlockedSkins(totalKm): HeroSkinId[]` i `nextUnlock(totalKm): { id, missingKm } | null`; po przejeździe `applyRunKm(state, km)` zwraca nowo odblokowane. Kilometry liczą się z każdego trybu, także łagodnego. Testy.
2. `HERO_SKINS`: dodaj nowe id; `normalizeHeroSkin` nie może wybrać zablokowanego auta (wraca do domyślnego).
3. Garaż: zablokowane auta widoczne jako ciemna sylwetka z kłódką i napisem „Odblokujesz po 1 500 km łącznie (brakuje 320 km)”; nie da się ich wybrać.
4. Ekran końca: komunikat „Nowe auto w garażu: Kompakt od szwagra!” (opisz w PR, gdzie wpiąć w `src/main.ts` → `showOver`; możesz wpiąć sam, jeśli zmiana jest mała).
5. Brak grafik (zlecenia 73 i 74 je robią) nie może psuć gry: auto bez `skin.json` rysuje się jako domyślne kombi, w garażu portret zastępczy.

## Kryteria akceptacji
`npm run typecheck && npm test && npm run build`; e2e garażu (`e2e/garage.spec.ts`) przechodzi; zrzut garażu z kłódką w PR.

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
