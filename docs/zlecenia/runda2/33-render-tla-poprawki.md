# Zlecenie 33: Renderer teł: ostrość HiDPI, położenie warstw, nakładanie miast, pas nieba

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express** (masz do niego dostęp). To **runda 2 — poprawki** po integracji pierwszych 30 zleceń: gra na `main` ma już grafiki, dźwięk, ranking (mock), Androida.
> Gałąź: **`zlecenie/33-render-tla-poprawki`** z aktualnego `main`. Na koniec: **szkic PR do `main`** z tytułem `[33] Renderer teł: ostrość HiDPI, położenie warstw, nakładanie miast, pas nieba`.
> **Jeśli wypchnięcie na GitHub się nie uda:** spakuj zmienione pliki w ZIP z zachowaniem ścieżek repo (np. `public/assets/...`, `src/...`) i daj właścicielowi do pobrania — koordynator wgra je sam.
> Koordynator (Claude) przegląda, integruje i scala.

**Rodzaj:** kod (TypeScript, Canvas)

## Kontekst
Tła krajów i punkty trasy rysuje `src/render/background.ts` + `src/render/assets.ts` (zlecenie 30), wywoływane z `src/render/renderer.ts` (`Renderer.draw`). Pliki: `public/assets/countries/<cc>/<cc>-{sky,clouds,far,near,road}.png` (@3x: sky 1080×1920, clouds 2160×600, far 2160×900, near 2160×720, road 1080×330), `public/assets/landmarks/<id>.png` (1620×900). Świat logiczny 360×640, asfalt od `WORLD.groundY = 580`. Uruchom `npm run dev` i obejrzyj grę na profilu telefonu (390×844, DPR 2–3) — zrób zrzuty przed i po.

## Problemy do naprawy (wszystkie zweryfikowane)
1. **Rozmycie na HiDPI:** `AssetLoader` skaluje obrazy @3x „raz” do rozmiaru logicznego, a renderer rysuje z transformacją `scale` = DPR × dopasowanie, więc warstwy są powiększane 2–3× i miękkie. Rysuj z pełnej rozdzielczości (jak `src/render/sprites.ts`: obraz @3x rysowany w jednostkach logicznych), ewentualnie cache offscreen w rozmiarze `logiczny × renderer.scale` przeliczanym przy `resize`.
2. **Położenie warstw w pionie:** dokumentacja grafik (`public/assets/countries/pl/ASSETS.md`) zakłada: chmury y≈110, far y≈255, near y≈418, road y≈530 (logiczne), a loader rysuje inaczej (far/near dolną krawędzią na 580, road 574). Obecnie dalszy plan jest za wysoko i za duży. Ustal **jedno** położenie zgodne z podglądami grafików (`docs/art/podglady/countries-*-preview.png`) i opisz je w komentarzu w kodzie oraz w `docs/art/WARSTWY.md` (dla przyszłych grafików). Droga: górna krawędź asfaltu z grafiki musi pokrywać się z `WORLD.groundY` (580) — tam jest kolizja.
3. **Pas nieba na wysokich ekranach:** nad światem 9:16 renderer maluje pas jednolitym kolorem palety, który odcina się od obrazu `sky`. Wypełnij pasy poza światem przedłużeniem obrazu nieba (np. rozciągnięty górny wiersz pikseli `sky` lub jego kolor próbkowany przy wczytaniu), a pas pod asfaltem — przedłużeniem `road`. Zmiana w `src/render/renderer.ts` dozwolona tylko w tej części (początek `draw`).
4. **Nakładanie się panoram miast:** panorama ma ~108 km trasy szerokości, a wiele punktów jest bliżej (np. granica–stacja 8 km). Wprowadź politykę: pokazuj punkt najbliższy środka ekranu z przenikaniem 0,3–0,5 s, a punkty `border` i `rest` rysuj na warstwie `near` (stacja przy drodze) — tak, żeby nic się nie zakrywało. Test jednostkowy logiki wyboru.
5. **Ładowanie:** `prime()` ładuje wszystkie kraje; zmień na kraje z trasy (`route.waypoints[].country` + kraj startu), resztę leniwie. Usuń alokacje w każdej klatce (zbuforuj ścieżki).
6. **Zima:** obsłuż warianty `pl-*-zima.png` i `landmarks/dom-meta-zima.png` przez flagę `season: 'winter'` w `BackgroundState` (gra włączy ją w grudniu). Użyj też `countries/pl/pl-border-near.png` na odcinku granicznym, jeśli pasuje.

## Pliki, które możesz zmieniać
`src/render/background.ts`, `src/render/assets.ts`, testy w `tests/`, początek `Renderer.draw` w `src/render/renderer.ts` (pasy poza światem), nowy `docs/art/WARSTWY.md`.

## Kryteria akceptacji
- Zrzuty przed/po w PR (telefon 390×844 DPR 3) dla BE, DE i PL z granicą — ostre warstwy, brak pasa w innym kolorze, miasta się nie zakrywają, droga na wysokości kolizji.
- ≥ 55 fps w Chrome z ograniczeniem CPU 4× (opisz pomiar) albo napisz wprost, że nie zmierzono.
- `npm run typecheck && npm test && npm run build` przechodzą.

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
