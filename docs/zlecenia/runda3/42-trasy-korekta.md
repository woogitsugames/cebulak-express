# Zlecenie 42: Trasy: korekta CH/FR i wyjazdy z Berlina/Monachium przez właściwe przejścia

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express** (masz do niego dostęp). To **runda 3**: gra na `main` ma już grafiki w płaskim stylu wektorowym, tła 10 krajów, garaż, rolki, ranking (mock), Androida, iOS, PWA. **Najpierw zrób `git pull origin main`** — pracuj na najnowszym kodzie.
> Gałąź: **`zlecenie/42-trasy-korekta`** z aktualnego `main`. Na koniec: **szkic PR do `main`** z tytułem `[42] Trasy: korekta CH/FR i wyjazdy z Berlina/Monachium przez właściwe przejścia`.
> **Jeśli wypchnięcie na GitHub się nie uda:** spakuj zmienione pliki w ZIP z zachowaniem ścieżek repo (np. `public/assets/...`, `src/...`) i daj właścicielowi do pobrania — koordynator wgra je sam.
> Koordynator (Claude) przegląda, integruje i scala.

**Rodzaj:** kod (TypeScript) + research

## Kontekst
Punkty tras: `src/content/waypoints.ts`, logika: `src/core/route.ts` (`makeRoute`, korytarze A2/A4/S3, `PL_TRANSIT`). Raport poprzedniej weryfikacji: `docs/trasy-weryfikacja.md`.

## Problemy (zweryfikowane w przeglądzie)
1. CH: odcinek Jena → Drezno ma w danych ok. 140 km (realnie wyraźnie więcej). FR: Mannheim → Frankfurt nad Menem 50 km (realnie ok. 80 km). Sprawdź w routingu (OSRM `router.project-osrm.org` z punktami pośrednimi albo Google Maps — podaj źródło i datę) i popraw.
2. Start z **Berlina** zawsze prowadzi przez Świecko — do Szczecina wychodzi 330 km (realnie ok. 150 km przez Kołbaskowo), do Wrocławia 460 km (realnie ok. 350 km przez Olszynę/A18). Start z **Monachium** idzie przez Norymbergę i Zgorzelec — sprawdź sensowność dla celów na południu (Kraków, Katowice, Rzeszów: realnie często przez Czechy — w grze możesz zostać przy Niemczech, ale km mają się zgadzać ±10%).
   Rozwiązanie: dodaj w `waypoints.ts` alternatywne przejścia (Kołbaskowo/Pomellen dla północy, Olszyna/Forst dla południa) z punktami `border` i `rest` (stacja jak w Świecku: biało‑czerwona, generyczna, hot dogi), a w `makeRoute` wybieraj przejście dające najkrótszą sumę „za granicą + w Polsce” dla tras z Niemiec (DE, DK, NL, BE, UK — zawsze, gdy trasa prowadzi przez Berlin). **Wolno zmienić `makeRoute`**.
3. Testy: dla par z Berlina (Szczecin, Wrocław, Poznań, Gdańsk, Kraków) i Monachium (Wrocław, Kraków) `totalKm` w ±10% realnej trasy (stałe w teście z podanym źródłem); istniejące testy (wszystkie pary krajów × miast) muszą przejść.

## Uwaga
`totalKm` wpływa na ranking i na serwerową weryfikację (`functions/` używa tego samego `makeRoute`) — to przed publicznym startem, więc OK. Opisz zmiany km w PR (tabela przed/po dla par z Berlina i Monachium).

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
