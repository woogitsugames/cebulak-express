# Zlecenie 09: Tła: Szwajcaria, Norwegia, Dania, Szwecja, prom bałtycki

> **Dla sesji ChatGPT — ten plik zawiera wszystko, czego potrzebujesz** (zadanie + wspólne zasady na końcu). Repo: **https://github.com/woogitsugames/cebulak-express** (masz do niego dostęp). Dla szerszego kontekstu możesz zajrzeć do `docs/GDD.md` (sekcja „Decyzje właściciela”) i plików wymienionych w „Kontekst”.
> Gałąź: **`zlecenie/09-tla-ch-skandynawia`** z aktualnego `main`. Na koniec: **szkic PR do `main`** z tytułem `[09] Tła: Szwajcaria, Norwegia, Dania, Szwecja, prom bałtycki`.
> Koordynator (Claude) przegląda, integruje i scala. Nie czekaj na inne zlecenia — jeśli czegoś brakuje, użyj zaślepki i opisz to w PR.

**Rodzaj:** grafika · **Zależności:** brak (lista punktów: `src/content/waypoints.ts` na `main`)

## Cel
Tła krajów CH, NO, DK i SE — tak, żeby gracz od razu rozpoznał, nad czym leci. Gracz z tego kraju ma poczuć „to moja okolica”, a przelatujący — że zwiedza Europę. Sympatycznie i z czułością dla kraju (Polonia tam mieszka).

## Układ warstw tła (paralaksa) — dla każdego kraju `<cc>`
Świat przewija się w lewo. Koordynator złoży warstwy w kodzie.
| Plik | Rozmiar | Zawartość | Przewijanie |
|---|---|---|---|
| `<cc>-sky.png` | 1080×1920 | niebo kraju (pora dnia: słonecznie; UK/NO mogą mieć więcej chmur), bez chmur ruchomych | stoi |
| `<cc>-clouds.png` | 2160×600, kafelek poziomy | chmury | 0,15 |
| `<cc>-far.png` | 2160×900, **kafelek poziomy bez szwu** | daleki krajobraz kraju (wzgórza, pola, typowa zabudowa), przezroczyste niebo | 0,25 |
| `<cc>-near.png` | 2160×720, kafelek poziomy | bliski plan: drzewa, ekrany akustyczne, płoty, typowe elementy pobocza | 0,5 |
| `<cc>-road.png` | 1080×330, kafelek poziomy | asfalt autostrady z pasami i barierą (wspólny dla krajów, kolor znaków poziomych/barier może się różnić) | 1,0 |

Do tego **punkty trasy** (miasta i miejsca, nad którymi przelatujemy). Pełna lista punktów, ich motywy wizualne (`motifs`) i identyfikatory (`id`) są w repo w **`src/content/waypoints.ts`** — przeczytaj go i zrób grafikę dla **każdego** punktu z pola `country` równego Twoim krajom. Dla każdego punktu:
- `public/assets/landmarks/<id>.png` — panorama/sylwetka miasta lub miejsca, **1620×900 px**, przezroczyste tło, do wstawienia w warstwę `far` w chwili przelotu (motyw zgodny z `motifs`, np. Kolonia: katedra nad Renem; Düsseldorf: smukła wieża telewizyjna nad Renem; Hanower: ratusz z kopułą).

Pliki do folderu `public/assets/countries/<cc>/` (warstwy) i `public/assets/landmarks/` (punkty). Plus `preview.png` (złożone warstwy kraju z jednym punktem) i `ASSETS.md` w każdym folderze.


## Motywy
- **Szwajcaria:** Alpy z ośnieżonymi szczytami, jeziora, drewniane chalety, krowy z dzwonkami na łąkach, tunele w zboczach. Punkty: Zurych (wieże nad jeziorem), Genewa (fontanna nad jeziorem), Bazylea (Ren, katedra z czerwonego piaskowca).
- **Norwegia:** fiordy, czerwone drewniane domki, łosie na skałach, wodospady, zorza (efekt opcjonalny), śnieg na szczytach. Punkty: Oslo (opera nad wodą — ogólna sylwetka), Bergen (kolorowe domy portowe), Stavanger.
- **Szwecja:** czerwone domki z białymi narożnikami, lasy i jeziora, łosie (znak drogowy z łosiem — piktogram bez tekstu). Punkty: Göteborg, Malmö (skręcony wieżowiec — sylwetka), **most nad cieśniną** (`most-oresund.png`).
- **Dania:** płaskie pola z wiatrakami, kolorowe domki portowe, rowery. Punkty: Kopenhaga (kolorowe kamienice nad kanałem), Odense, Aarhus, most przez Wielki Bełt.
- **Prom bałtycki:** `public/assets/landmarks/prom-baltyk.png` — duży prom pasażersko‑samochodowy (generyczny), widok Bałtyku, mewy; port w Świnoujściu (wiatrak‑stawa).


## Wymagania techniczne grafiki (wspólne)
- Styl jak w makietach `docs/research/gpt6-makiety/` (kolorowa ilustracja, grube kontury, ciepłe słońce z lewej góry), ale **bez** godła, marek, konkretnych modeli aut i tekstu w grafice.
- PNG z przezroczystością, sRGB, skala **@3x** (1 px logiczny = 3 px). Świat gry: 360×640 px logicznych (pion).
- Każdy plik zoptymalizowany (np. `oxipng`/`pngquant`, bez widocznej utraty jakości). Rozsądny budżet: pojedynczy sprite < 300 kB, warstwa tła < 1,2 MB.
- `ASSETS.md` w swoim folderze (plik, źródło/narzędzie, licencja, uwagi).
- W PR: **arkusz podglądu** `preview.png` (wszystkie pliki na jednym obrazie, na szachownicy) — koordynator ocenia styl bez uruchamiania gry.

## Kryteria akceptacji
- Kafelki `far`, `near`, `road`, `clouds` łączą się bez szwu (pokaż w `preview.png` dwa kafelki obok siebie).
- Punkty trasy rozpoznawalne w sylwetce; bez napisów, logo i marek.
- Kraj rozpoznawalny po samym tle, bez flagi.

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
