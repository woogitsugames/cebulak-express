# Zlecenie 11: Backend rankingu w Firebase z weryfikacją przejazdów

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express** (masz do niego dostęp). Dla szerszego kontekstu możesz zajrzeć do `docs/GDD.md` (sekcja „Decyzje właściciela”) i plików wymienionych w „Kontekst”.
> Gałąź: **`zlecenie/11-firebase-backend`** z aktualnego `main`. Na koniec: **szkic PR do `main`** z tytułem `[11] Backend rankingu w Firebase z weryfikacją przejazdów`.
> Koordynator (Claude) przegląda, integruje i scala. Nie czekaj na inne zlecenia — jeśli czegoś brakuje, użyj zaślepki i opisz to w PR.

**Rodzaj:** kod (TypeScript, Firebase) · **Zależności:** brak (kontrakt API poniżej — identyczny jak w zleceniu 12)

## Cel
Liga Polonii (tygodniowa suma km na kraj) i ranking graczy, odporne na oszustwa. Weryfikacja: serwer **odtwarza przejazd tym samym kodem `src/core`** (`replay()` z `src/core/game.ts`) i przyjmuje wynik tylko, gdy wynik się zgadza.

## Kontekst
`src/core/game.ts` (`Game`, `replay`, `flapTicks`), `src/core/route.ts` (`makeRoute`), `docs/GDD.md` (D4, D8, §6.5 prywatność).

## Zakres — folder `firebase/` (nowy) + `firebase.json`, `.firebaserc.example` w katalogu głównym
- Cloud Functions (2. generacja, Node 22, TypeScript), region `europe-west1`.
- Bundlowanie `src/core` do funkcji przez esbuild (import z `../../src/core/...`) — **jedna** wersja kodu rdzenia dla klienta i serwera.
- Firestore + reguły bezpieczeństwa; Anonymous Auth; przygotowanie pod App Check (włączane flagą, nie wymagane w emulatorze).
- Testy na emulatorze (`firebase-tools` emulators, Vitest lub Jest) uruchamiane skryptem `npm run test:firebase` (nie w głównym `npm test`, żeby CI web nie potrzebowało Javy — dodaj osobny job w `.github/workflows/firebase.yml`).

## Kontrakt API (callable functions, wszystkie wymagają zalogowania anonimowego)
```ts
// 1) Start przejazdu — serwer wydaje ziarno (klient nie może wybrać seeda).
startRun(req: { mode: 'ranked' | 'daily'; home: HomeCountry; from: string; to: string; daily?: string /* YYYY-MM-DD */ })
  -> { runId: string; seed: number; issuedAt: number /* ms */ }
// Dla 'daily' seed = seedFromString('daily:' + daily) (src/core/rng.ts) — ten sam dla wszystkich.

// 2) Zgłoszenie wyniku
submitRun(req: { runId: string; flapTicks: number[]; ticks: number; km: number; nickId: string })
  -> { accepted: boolean; km: number; reason?: 'replay_mismatch' | 'too_fast' | 'expired' | 'rate_limited' | 'bad_nick' | 'duplicate';
       week: string /* np. 2026-W50 */; countryRankKm?: number; playerBestKm?: number }
```
Walidacja w `submitRun`: run istnieje, należy do tego `uid`, nie był zgłoszony; `now - issuedAt >= ticks * TICK * 1000 * 0.9` (nie szybciej niż czas gry) i `<= 30 min`; `replay(...)` daje **identyczne** `km` i `ticks` oraz fazę `over`/`arrived`; `flapTicks` rosnące, długość ≤ ticks/6; limit: maks. 1 zgłoszenie / 3 s i 500 / dobę na `uid`; `nickId` poprawny wg `src/content/nicks.ts` (zlecenie 13 — do czasu scalenia akceptuj format `^[a-z0-9-]{3,40}$`).

## Model danych Firestore (zapis tylko przez funkcje; klient tylko czyta `league` i `leaderboard`)
- `runs/{runId}`: uid, seed, mode, home, from, to, issuedAt, status, km, ticks (klient: brak dostępu).
- `players/{uid}`: nickId, home, bestKm, updatedAt (klient: odczyt tylko własnego).
- `league/{week}`: `{ countries: { BE: { km, runs, players }, ... }, updatedAt }` — aktualizowane transakcją lub licznikami rozproszonymi (sharded counters), jeśli to potrzebne przy dużym ruchu.
- `leaderboard/{week}/entries/{uid}`: nickId, home, bestKm, at. Indeks: `bestKm desc`.
- `daily/{YYYY-MM-DD}/entries/{uid}`: nickId, home, km.
Tydzień: ISO, strefa **Europe/Warsaw**, od poniedziałku 00:00. Do Ligi liczą się tylko przejazdy `ranked` (tryb łagodny nie trafia do serwera).

## Prywatność
Nie zapisuj IP ani danych urządzenia. Brak pól tekstowych od użytkownika (nick tylko jako `nickId`). Dokument `firebase/PRIVACY.md`: jakie dane, po co, retencja (`runs` kasowane po 30 dniach — zaplanowana funkcja).

## Kryteria akceptacji
- Testy emulatora: poprawny przejazd przyjęty; zmieniony `flapTicks` → `replay_mismatch`; zgłoszenie szybsze niż czas gry → `too_fast`; ponowne zgłoszenie → `duplicate`; reguły: klient nie może pisać do `league`/`leaderboard`, nie czyta cudzych `players`.
- `firebase/README.md`: jak utworzyć projekt Firebase (plan Blaze dla Functions), włączyć Anonymous Auth, wdrożyć (`firebase deploy`), jakie klucze/konfiguracja trafiają do klienta (publiczna konfiguracja web) i czego **nie** commitować.
- Żadnych sekretów w repo. Konfigurację projektu podaj jako `.firebaserc.example`.

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
