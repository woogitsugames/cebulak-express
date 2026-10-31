# Licencje i prawa — lista kontrolna przed wydaniem (Google Play, App Store)

**Stan: 31.10.2026.** Przejść całą listę **przed każdym wydaniem w sklepie** (pierwsze wydanie: start 10–15.12.2026) i po każdej większej zmianie zasobów lub bibliotek. To lista robocza koordynatora, nie opinia prawna. Punkty oznaczone [prawnik] wymagają rzecznika patentowego lub prawnika. Szczegóły sklepów: `docs/prawo/sklepy.md`, znaki: `docs/prawo/znaki.md`, symbole i zabytki: `docs/prawo/symbole.md`.

## 1. Stan na 31.10.2026 (sprawdzone)

| Obszar | Stan | Gdzie |
|---|---|---|
| **Czcionki w grze** | Brak plików czcionek. Gra używa wyłącznie czcionek systemowych urządzenia (`system-ui`; tablice: „DIN Alternate”/„Bahnschrift”/„Roboto Condensed” tylko gdy są w systemie). Nic nie rozpowszechniamy. | `src/**/*.ts`, `src/**/*.css` |
| **Czcionki w grafikach** (napisy wtopione w PNG: logo, Google Play, OG, ramki sklepu, rolki) | Inter i Liberation — SIL OFL 1.1; DejaVu — licencja Bitstream Vera. Wszystkie pozwalają na użytek komercyjny i osadzanie w obrazach. | `tools/art/*.py`, `ASSETS.md` |
| **Muzyka i dźwięki** | Autorskie, syntezowane w kodzie (Web Audio). Brak plików audio. | `src/audio/` |
| **Grafiki** | Własne generatory albo ChatGPT (warunki OpenAI: wynik do użytku komercyjnego). Każdy plik opisany w `ASSETS.md`; strona „Licencje” w grze (779 pozycji). Bez marek, flag, godeł, herbów; bez Atomium i nocnej iluminacji wieży Eiffla. | `public/assets/**/ASSETS.md`, `public/licencje.html` |
| **Biblioteki JS** (trafiają do gry i APK) | 98 pakietów: Apache-2.0 (53), MIT (28), BSD-3-Clause (10), ISC (6), 0BSD (1). Wykaz z pełnymi tekstami licencji i NOTICE generuje się automatycznie przy każdym buildzie (`tools/licenses.mjs` → `public/licencje.html`, sekcja „Biblioteki open source”, przycisk „Licencje” w ustawieniach). | `tools/licenses.mjs` |
| **Strażnik licencji** | Build **zatrzyma się**, gdy pojawi się biblioteka z licencją spoza listy dozwolonych (`ALLOWED_LIBRARY_LICENSES`: MIT, Apache-2.0, BSD, ISC, 0BSD, Unlicense, CC0…). GPL/LGPL/AGPL, „non-commercial” i brak licencji wymagają decyzji właściciela. | `tools/licenses.mjs`, `tools/licenses.test.mjs` |

## 2. Do zrobienia przed pierwszym wydaniem

- [ ] **Natywne biblioteki Android/iOS.** Wykaz w grze obejmuje biblioteki JS. APK zawiera też natywne: AndroidX (`appcompat`, `coordinatorlayout`, `core-splashscreen` — Apache-2.0), Capacitor Android/iOS (MIT), a po wdrożeniu Firebase natywne SDK Firebase / Google Play services (App Check). Przed wydaniem: dodać ich wykaz z licencjami do strony „Licencje” (ręcznie albo wtyczką Google `oss-licenses-plugin` dla Androida; na iOS — wykaz ręczny z `Podfile.lock`/SPM).
- [ ] **Nazwa „Cebulak Express”** — badanie znaków w EUIPO, UPRP i WIPO (klasy 9, 41) przed publikacją i drukiem. [prawnik]
- [ ] **Podtytuł „Kierunek Polska”** — w UPRP istnieje znak „Kierunek POLSKA” (R.315691). Ocenić ryzyko albo zmienić podtytuł w sklepach. [prawnik]
- [ ] **App Store — wytyczne 4.1 i 4.3 (kopie i klony).** W opisie, zrzutach i nagraniu pokazać własne mechaniki (waga bagażu, prawdziwe trasy, 15 krajów, panoramy, album pocztówek). Nigdzie nie odwoływać się do innych gier.
- [ ] **Grafiki z AI** mogą nie mieć ochrony prawa autorskiego (ktoś może je skopiować). Kluczowe postacie i logo dopracować ręcznie (decyzja D5); zachować źródła i prompty w `ASSETS.md`.
- [ ] **Rozpoznawalne budynki w panoramach** — przegląd budowli współczesnych (prawo panoramy różni się w krajach; np. Belgia, Francja). Lista wątpliwych → `docs/prawo/symbole.md`. [prawnik przy wątpliwościach]
- [ ] **Polityka prywatności, Data safety (Google), App Privacy (Apple), klasyfikacja wiekowa (IARC / Apple)** — według finalnej paczki z Firebase (`docs/prawo/sklepy.md`).
- [ ] **Konto Google Play organizacji** (D-U-N-S) i konto Apple Developer na tę samą organizację; dane spójne z polityką prywatności.
- [ ] **Materiały sklepowe** (zrzuty w ramkach 119, grafika Play 118, okładki rolek 120): tylko prawdziwa rozgrywka, bez daty, która może się zmienić; napisy bez „cebulak” poza nazwą gry.

## 3. Zasady na co dzień (przy każdej zmianie)

- **Nowa biblioteka npm** → po `npm install` uruchomić `npm run build` (strażnik licencji). Licencja spoza listy = pytanie do właściciela, nie dopisywanie do listy.
- **Nowa czcionka w grze** (plik `.woff2`/`.ttf`) → tylko OFL/Apache/podobna; wpis do `ASSETS.md` i do sekcji czcionek w `tools/licenses.mjs`.
- **Nowy dźwięk lub muzyka z zewnątrz** → licencja komercyjna bez obowiązku opłat od sprzedaży (np. CC0); wpis w `ASSETS.md`.
- **Nowa grafika** → wpis w `ASSETS.md` (źródło, narzędzie, licencja). Bez marek, logo, flag, godeł, herbów, prawdziwych tablic rejestracyjnych; budynki chronione — pominąć.
- **Treść**: zero słowa „Flappy”; „cebulak” tylko w tytule i nazwach skórek.
