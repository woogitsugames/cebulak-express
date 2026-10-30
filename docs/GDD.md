# Dokument projektowy (GDD) — polonijna gra one‑tap

**Etap 1: synteza dwóch researchy.** Stan: 30.10.2026. Wersja robocza do decyzji właściciela.

Źródła wejściowe (kopie w repo):
- [`research/RESEARCH_CLAUDE.md`](research/RESEARCH_CLAUDE.md) (dalej **[C]**): „Lecę do Domu!”, bocian Bogdan;
- [`research/RESEARCH_GPT6.md`](research/RESEARCH_GPT6.md) (dalej **[G]**): „Cebulak Express: Kierunek Polska”, latające kombi z cebulowym kierowcą, oraz cztery makiety w [`research/gpt6-makiety/`](research/gpt6-makiety/).

Oznaczenia: **✅ zweryfikowane** = sprawdzone w sieci 30.10.2026, ze źródłem na końcu (§9); **⚠️ niezweryfikowane** = przyjęte z researchu bez sprawdzenia; **[szacunek]** = ocena projektowa.

---

## Decyzje właściciela (30.10.2026) — obowiązują ponad resztą dokumentu

| # | Decyzja | Konsekwencje |
|---|---|---|
| D1 | **Nazwa: „Cebulak Express”** | Zasada tonu nr 5 zmieniona: „cebulak” wolno w **tytule i marce** jako autoironiczna nazwa; **nigdy** w komunikatach skierowanych do gracza („Przegrałeś, cebulaku” — zakazane). Przed startem: wyszukiwanie w EUIPO/UPRP i domena. |
| D2 | **Bohater: przeładowane kombi z neutralnym, sympatycznym kierowcą** | Cebulek (Pan Cebulek) jako skórka do wyboru gracza. Kombi generyczne (nie Fiat 125p ani Łada), bez godła. |
| D3 | **Kraje w MVP: BE, NL, DE, UK, FR, CH, NO, DK** (8) **z pełnymi tłami** | UK: przeprawa promem lub tunelem jako etap. NO/DK: przeprawa promem przez Bałtyk albo trasa lądowa przez Szwecję. Kraj zmienia oprawę, nie trudność. |
| D4 | **Pełny ranking od razu** | Liga Polonii (suma km krajów) + ranking graczy z nickami z generowanej listy + weryfikacja przejazdów na serwerze (odtworzenie ziarna i wejść) od startu. |
| D5 | **Grafika: ładna, memiczna, sprzedawalna, wiralowa; limit 1 MB nie obowiązuje** | Bogaty, ilustracyjny styl w duchu makiet (nie musi być płaski wektor). Szybki start mimo to: ekran startu i pierwszy przejazd ładują się najpierw, tła pozostałych krajów doładowujemy w tle. Kluczowe postacie dopracowane ręcznie (obrazy z AI nie dają pewnej ochrony autorskiej); każdy plik w `ASSETS.md`. |
| D6 | **Termin: start ok. 10–15.12.2026** zamiast 1.12 | Wynika z D3 i D4 (decyzja: „8 krajów i pełne tła”). Sezon „Na Wigilię!” nadal się mieści; zapowiedzi w rolkach można zacząć 1.12. |
| D7 | **Platformy: aplikacja Android (najpierw APK, potem Google Play), potem iOS; wersja web zostaje** | Jeden kod web opakowany w **Capacitor** (Android/iOS). Wersja web/PWA służy do osadzania w portalach i do linków z karty wyniku (gra startuje od razu, bez instalacji). APK budowany w GitHub Actions. Google Play: zalecane **konto organizacji** (konto osobiste po 13.11.2023 wymaga testu zamkniętego: 12 testerów przez 14 dni [S6]). Sideload APK: od 2026 Google wprowadza weryfikację deweloperów także dla APK spoza sklepu, najpierw w wybranych krajach, globalnie w 2027 [S7]. |
| D8 | **Backend: Firebase** | Anonymous Auth, Firestore (Liga Polonii, ranking graczy), Cloud Functions w TypeScript, które **odtwarzają przejazd tym samym kodem `src/core`** (wiarygodna weryfikacja). Cloud Functions wymagają planu Blaze (płatność za użycie, z darmowym limitem). Serwer wydaje ziarno przejazdu, a wynik przyjmuje tylko z poprawnym odtworzeniem. |
| D9 | **Organizacja pracy:** koordynator (Claude) + zlecenia dla sesji ChatGPT | Zlecenia w `docs/zlecenia/`. Każde ma własną gałąź `zlecenie/NN-…`, szkic PR do `main` i własne pliki. Koordynator przegląda i scala po zielonym CI (zgoda właściciela z 30.10). |
| D10 | **Auta do odblokowania za km łącznie — rozpoznawalne sylwetką, bez marek** (30.10.2026) | Żadnych logo, emblematów, nazw marek i modeli ani ich przeróbek. Nazwy to polonijne przezwiska („Mała Japonka”, „Kompakt od szwagra”, „Dieselek po dziadku”…). Zlecenia 72–74. |
| D11 | **Panoramy miast mają być rozpoznawalne** (30.10.2026) | Najpierw próbki w 3 stylach (rysunkowy / stylizowane zdjęcie / foto) dla Antwerpii, Brukseli, Düsseldorfu i Amsterdamu; właściciel wybiera styl, potem reszta miast. Zlecenia 68–69. |
| D12 | **Zabawnie brzmiące prawdziwe nazwy miejsc** (np. Deurne → „durne”) na tablicach przy trasie (30.10.2026) | Test babci: bez wulgaryzmów i skojarzeń dla dorosłych. Amsterdam/Bruksela: żart o ciasnych kamienicach tak, dzielnice czerwonych latarni nie. Zlecenia 70–71. |
| D13 | **Składaki i tablety** (30.10.2026) | Na szerokich ekranach tło na całą szerokość, pole gry zostaje w kolumnie 9:16 (uczciwy ranking). |
| D14 | **Panoramy miast w stylu A+** (30.10.2026) | Rysunkowe, rozpoznawalne, z grubszym konturem i mniejszą liczbą detali, 2–4 duże budowle. Najpierw ~40 najważniejszych miast (zlecenia 75–82), reszta później. Pocztówki albumu będą generowane z tych panoram. |
| D15 | **Auta: poprawki sylwetek** (30.10.2026) | „Mała Japonka” ma być miejską trzydrzwiówką, „Dieselek po dziadku” długim kombi z lat 2000 (zlecenie 83). |

Wpływ na §5: limit „< 1 MB” zniesiony, ale **czysty Canvas + TypeScript** zostaje — głównym powodem jest testowalna logika `src/core/` współdzielona z serwerem do weryfikacji rankingu, nie sama waga.

---

## 0. TL;DR — co proponuję

| Obszar | Rekomendacja | Skąd |
|---|---|---|
| Rdzeń | One‑tap, przewijanie w prawo, kolizja = koniec, wynik w **kilometrach** na realnej trasie „miasto → miasto w PL” | C+G |
| Wyróżnik mechaniczny | **Waga bagażu**: znajdźki dają punkty, ale chwilowo obciążają bohatera. Bramka bagażowa dopiero w v1.1 | G (prostsza wersja) + C (bramka później) |
| Tryby | **Rankingowy** (klasyczny) + **łagodny** (3 słoiki = 3 „życia”, bez rankingu) | C, zgodnie z briefem |
| Uczciwość | Kraj zmienia **tło i żarty, nie trudność**. Generator z ziarnem gwarantuje, że każdą przeszkodę da się przelecieć | G |
| Viral | Karta wyniku (obraz + link z parametrem kraju), „Liga Polonii” jako **tygodniowa suma km na kraj**, codzienne wyzwanie z jednym ziarnem dla wszystkich | C (suma km) + G (daily seed) |
| Technologia | **Czysty Canvas 2D + TypeScript + Vite**, PWA, osadzanie przez `<iframe>`. Logika gry jako czysty, testowalny moduł bez DOM | zmiana względem obu (uzasadnienie w §5) |
| Grafika | **Płaski wektor** z grubym konturem (SVG → atlas). Makiety GPT traktujemy jako kierunek klimatu, nie jako styl do odtworzenia | C |
| Platformy | Faza 1: web/PWA. Faza 2: Facebook Instant Games (Zero Permissions, własny backend rankingu). Faza 3: Google Play przez TWA | C, zweryfikowane |
| Termin | Patrz decyzja D6: start ok. 10–15.12 | — |

Otwarte decyzje (nazwa, bohater, „cebulak” w tytule, ranking, styl) są w §8.

---

## 1. Gdzie researche się zgadzają

1. **Mechanika:** jeden dotyk, natychmiastowa porażka, natychmiastowy restart, pierwsze sekundy łagodne, bez tutoriala.
2. **Własna mechaniczna tożsamość jest konieczna.** Oba proponują ten sam wyróżnik: **bagaż, który zwiększa ciężar**. Ryzyko i nagroda w jednej decyzji: „łapię czy lecę bezpiecznie?”.
3. **Podróż „kraj zamieszkania → Polska”** z tłami krajów, wybór kraju bez geolokalizacji.
4. **Powrót z Polski** (mama pakuje słoiki, lot powrotny trudniejszy) jako rozszerzenie po MVP.
5. **Rywalizacja krajów Polonii** jako główny silnik udostępnień i tematów rolek.
6. **Karta wyniku do udostępniania** z linkiem otwierającym grę.
7. **Web/PWA najpierw**, sklepy później; Phaser lub Canvas + Vite; hosting statyczny.
8. **Cel biznesowy:** ruch do portali i marka. Przychód z reklam będzie symboliczny. Sponsor sezonu jest lepszy niż reklamy programatyczne. Żadnego pay‑to‑win.
9. **Ton:** sympatyczny bohater, żarty z sytuacji (bagaż, objazdy, tęsknota), nie z ludzi.
10. **Prywatność:** bez kont, minimalne dane, bez śledzenia reklamowego.
11. **Ranking wymaga ochrony przed oszustwami**, inaczej rywalizacja krajów się sypie.
12. **Zakres:** mały MVP, decyzja go/no‑go po pierwszych tygodniach.

---

## 2. Gdzie się różnią — i co rekomenduję

| # | Temat | [C] Claude | [G] GPT‑6 | Rekomendacja i uzasadnienie |
|---|---|---|---|---|
| R1 | **Bohater** | Bocian Bogdan z walizką; cebulak tylko jako skórka | Latające, przeładowane kombi z cebulą‑kierowcą („Pan Cebulek”) | **Do Twojej decyzji (P2).** Kombi z bagażami na dachu to najmocniejszy *obrazek* z obu researchy: od razu widać przeładowanie, więc mechanika wagi bagażu jest czytelna wizualnie. Bocian jest bezpieczniejszy tonalnie, naturalnie lata i ma dużo motywów (gniazdo, powroty). Moja rekomendacja: **kombi jako pojazd, kierowca neutralny** (sympatyczny człowiek albo bocian za kierownicą), a cebulkowa postać jako skórka do wyboru. Bierzemy obrazek z [G], a ton zostaje zgodny z zasadami. |
| R2 | **Nazwa** | „Lecę do Domu!” | „Cebulak Express: Kierunek Polska” | **Do Twojej decyzji (P1).** Zauważ konflikt: Twoja twarda zasada mówi, że „cebulak” pada **tylko jako wybór gracza**. Nazwa „Cebulak Express” łamie ją z definicji, bo gra sama nadaje tę etykietę. Repo i paczka nazywają się „Cebulak Express”, więc potrzebna jest świadoma decyzja: albo nazwa neutralna, albo zmiana zasady (np. „cebulak” wolno w tytule jako autoironiczna marka, ale nigdy w komunikatach do gracza). |
| R3 | **Waga bagażu** | Stała waga z każdym jedzeniem, bramka 10 kg co ~300 km, „zjedz na miejscu” | Złapanie paczki = przez kilka sekund szybsze opadanie | **MVP: model [G]** (chwilowe obciążenie, które zanika), bo łatwo go zbalansować i wytłumaczyć bez tekstu. Widoczny na pojeździe/bohaterze stos bagażu rośnie. **v1.1: bramka bagażowa [C]** jako „boss” etapu. „Zjedz na miejscu” (tap‑spam) wycinam, bo to drugi gest w grze jednego gestu. |
| R4 | **Wynik** | Kilometry (1 przeszkoda ≈ 10 km) | Punkty + dystans + monety (dwa liczniki) | **Jedna liczba: kilometry.** Znajdźki dają premię w km („+15 km — paczka od mamy”). Jedna metryka upraszcza kartę, ranking („suma km kraju”) i rolki („doleciał 684 km”). |
| R5 | **Ranking online w MVP** | Tak (PHP + MySQL, ranking tygodniowy krajów) | Nie, dopiero v1.1 | **Do Twojej decyzji (P4).** Rekomenduję **wersję lekką na start 1.12**: jeden endpoint „dopisz km do kraju” i tablica sum krajów, bez nicków i list graczy. Rywalizacja krajów to główny haczyk sezonu, a wersja lekka ma mały koszt i małe ryzyko RODO. Pełny ranking graczy z nickami z listy i odtwarzaniem przejazdów (replay) w v1.1. |
| R6 | **Backend** | PHP + MySQL/SQLite na serwerze portali | „Lekki serwer API + PostgreSQL” | **PHP + SQLite/MySQL na istniejącym hostingu portali** (zespół zna PHP, zero nowej infrastruktury, ten sam RODO‑administrator). Dokładne miejsce zależy od tego, gdzie stoją portale — do ustalenia przy etapie 2. |
| R7 | **Tryb łagodny** | Jest („Lot z przesiadką”, 3 słoiki) | Brak | **Bierzemy** (jest w briefie). Bez wpływu na ranking, z licznikiem km „dla siebie”. |
| R8 | **Styl grafiki** | Płaski wektor (SVG → atlas) | „Kolorowy pixel art”, ale makiety są malarskie, bardzo szczegółowe | **Płaski wektor** (P5). Malarski styl z makiet nie zmieści się w < 1 MB i jest trudny do ręcznej, spójnej produkcji. Do tego obrazy AI nie dają pewnej ochrony autorskiej, a kluczowe postacie mamy dopracować ręcznie ([C]). Z makiet bierzemy: kompozycję pionową, kolorystykę, czytelny HUD, ekran końca z „co cię zatrzymało”. |
| R9 | **Silnik** | Phaser 3 albo czysty Canvas | Phaser + TypeScript | **Czysty Canvas 2D + TypeScript** — patrz §5. |
| R10 | **Skala publiczności** | ok. 1,37 mln w Europie (UK 412 tys., DE 386 tys., NL 130 tys.) | ok. 1,513 mln za granicą ogółem | **Obie liczby są poprawne ✅** — mierzą co innego (Europa vs. świat). Do materiałów: „ok. 1,5 mln Polaków przebywa czasowo za granicą, z czego ok. 1,37 mln w Europie (GUS, szacunek na koniec 2025)” [S1]. |
| R11 | **Przeszkody** | Motywy krajowe (Atomium, gofry, wiatraki, budki) | Infrastruktura drogowa (roboty drogowe, mosty, bramki, ciężarówki) | **Wspólna baza z [G]** (roboty drogowe, wiadukt, szlaban, znak, wiatrak) — uniwersalna, nie obraża nikogo i pasuje do kombi. **Akcenty krajowe z [C]** jako elementy tła i 1 przeszkoda specjalna na kraj. Uwaga: Atomium jest chronione prawem autorskim w Belgii (dysponentem jest SABAM/fundacja); bezpieczniej użyć ogólnej „kuli na tyczce” ⚠️ (do sprawdzenia, jeśli zostanie). |
| R12 | **Komunikaty przegranej** | — | Żart o tym, co zatrzymało („Niemcy. Baustelle. Jak zwykle w grze.”) | **Bierzemy pomysł**, ale każdy tekst przechodzi test babci i kolegi z pracy. Część przykładów [G] celuje w kraj, a nie w sytuację — np. zamiast „Niemiecki remont drogowy” → „Remont drogowy. Objazd 40 km.” Kraje nie są winowajcami. |

---

## 3. Co jest tylko w jednym researchu — i czy brać

### Tylko w [C] — warto wziąć
- **Wynik jako realna trasa** „Antwerpia → Rzeszów” i karta „Doleciałem … w 47 s” (MVP).
- **Ranking jako suma km kraju**, nie top‑1: każdy gracz dokłada, a ranking jest odporniejszy na oszustwa (MVP‑lekki).
- **Nicki z generowanej listy** („Bocian z Gandawy #423”) zamiast wolnego tekstu (v1.1, gdy będą nicki).
- **Tryb nagrywania 15 s** (MediaRecorder z canvasu) jako gotowa rolka z watermarkiem portalu (v1.1, świetne dla Twoich rolek).
- **Ekran mety z nagłówkiem z portalu kraju** („Co nowego w Polonii BE”) — bezpośredni ruch do portali (MVP: statyczny link; v1.1: najnowszy wpis z RSS).
- **Sezony** z wykluczeniem Wszystkich Świętych; event „Na Wigilię!”.
- **Precedensy tonu i lekcje negatywne** (Flappy Smoleńsk, Polish jokes, POT i „polski hydraulik”).
- **Zdarzenia analityczne:** `run_start`, `run_end`, `share_click`, `portal_click` do istniejącej analityki.
- Power‑upy i „bossowie” — **później**, nie w MVP.

### Tylko w [G] — warto wziąć
- **Kraj nie zmienia trudności** (sprawiedliwy ranking) — zasada projektowa od MVP.
- **Generator z gwarancją osiągalności** — wymóg, z testem automatycznym.
- **Codzienne wyzwanie z jednym ziarnem** (precedens Wordle). Tanie, bo generator z ziarnem i tak powstaje. Proponuję je do MVP jako „Wyzwanie dnia” bez rankingu, tylko z wynikiem na karcie.
- **Fizyka ze stałym krokiem czasowym** (niezależna od odświeżania ekranu) — warunek uczciwego rankingu i powtarzalnych testów.
- **Inne pomysły na gry** (Bagażnik Challenge, Busiarz 3000) — dobry materiał na drugą minigrę sezonu, poza zakresem.
- **Sprawdzenie konkurencji memowej** (Janusz Misja Passat, Kroksy) ⚠️ — potwierdza, że sam „Janusz z cebulą” nie jest nowy.
- **Kryteria testu MVP:** mediana próby 10–25 s, 3+ próby na sesję, ≥ 5% udostępnień, start do 5 s (u nas twardziej: < 2 s).

### Tylko w [G] — nie bierzemy
- **Godło RP na samochodzie (makiety).** Art. 16 ustawy o godle zakazuje umieszczania symboli RP na przedmiotach w obrocie handlowym, ale dopuszcza godło i barwy „w formie stylizowanej lub artystycznie przetworzonej” ✅ [S5]. Gra to nie „przedmiot”, ale ryzyko wizerunkowe jest realne: godło na rozbitym aucie z ekranu przegranej nie przejdzie testu babci. **Decyzja: bez godła; biało‑czerwone barwy wolno.**
- **Auto przypominające konkretny model** (makiety wyglądają jak Fiat 125p/Łada kombi). Kształt kultowego auta bywa chroniony jako wzór/znak. Rysujemy **generyczne kombi**.
- **Flaga UE / gwiazdy UE na znakach** (makieta 1–2) — zbędne, pomijamy.
- **Prawdziwe zabytki jako ikony krajów** (Brama Brandenburska, Big Ben z makiety 3) — legalne jako sylwetki, ale wolę generyczne sylwetki miast, żeby nie mylić z oficjalną promocją.
- **Waluta „monety” obok km** (patrz R4).

---

## 4. Weryfikacja faktów, które zmieniają decyzje

| Twierdzenie | Status | Wpływ na decyzje |
|---|---|---|
| Facebook Instant Games: nowe gry od **1.08.2025 tylko w trybie Zero Permissions**; Web Games (Canvas) wygaszone **30.09.2026** [C] | ✅ potwierdzone [S2] | FB Instant to tylko droga Instant Games. |
| Zero Permissions: co z rankingami i imionami? [C: „trzeba sprawdzić”] | ✅ Kod gry **nie dostaje imienia ani zdjęcia** gracza (renderuje je nakładka Meta); wbudowane **Global Leaderboards są wycofane**, Meta zaleca **własny backend** [S3] | Backend rankingu z MVP da się użyć ponownie w fazie 2. Projektujemy go od razu niezależnie od platformy. |
| GUS: 1,513 mln za granicą [G] / 1,37 mln w Europie [C] | ✅ oba poprawne (publikacja GUS 12.08.2026, szacunek na koniec 2025) [S1] | Liczby do materiałów prasowych. |
| Znak „Flappy Bird” jest aktywny i w rękach podmiotu z rebootu [C] | ✅ rejestracja USPTO nr 5430683 **żywa**, deklaracja z sekcji 8 przyjęta 10.04.2025, zmiana właściciela odnotowana 29.07.2026 [S4] | Utrzymujemy zakaz słowa „Flappy” wszędzie, także w opisach i tagach. |
| Mechaniki nie chroni prawo autorskie, chroniona jest ekspresja [C, G] | ⚠️ zgodne z ogólną zasadą prawa UE (ochrona sposobu wyrażenia, nie idei), nie jest to porada prawna | Własna grafika, dźwięki, układ ekranów; żadnych rur, żółtego ptaka ani układu „Get Ready / medal”. |
| Godło RP na przedmiotach handlowych | ✅ zakaz z art. 16 ust. 1, wyjątek dla formy stylizowanej z ust. 2 [S5] | Bez godła (patrz §3). |
| Google Play przez TWA działa | ⚠️ technicznie tak; **nowe osobiste konta deweloperskie** (po 13.11.2023) muszą przejść **test zamknięty: 12 testerów przez 14 dni** przed produkcją [S6]; od 2026 obowiązuje weryfikacja tożsamości deweloperów Androida [S7] | Google Play **nie zdąży na 1.12** bez istniejącego konta firmowego. Faza 3 — nie zmienia MVP. |
| App Store odrzuca klony (wytyczna 4.3) | ⚠️ nie sprawdzałem bieżącej treści | iOS = przeglądarka + „Dodaj do ekranu”. |
| Ryanair egzekwuje znaki [C] | ⚠️ nie sprawdzałem (źródło z 2012/13) | Bez zmian: zero prawdziwych marek i parodii nazw — to i tak Twoja twarda zasada. |
| Nazwy „Cebulak Express” / „Lecę do Domu” wolne | ⚠️ **wstępnie**: wyszukiwarka nie znalazła gier o tych nazwach [S8]. **Nie sprawdziłem baz EUIPO/UPRP** (wymagają ręcznego wyszukiwania) | Przed publicznym startem: wyszukiwanie w eSearch EUIPO i bazie UPRP (ok. 30 min) i sprawdzenie domeny. |

**Techniczne fakty, których żaden research nie podniósł, a które dotyczą osadzania w portalach:**
- **Partycjonowanie pamięci w iframe.** Przeglądarki (Chrome, Safari, Firefox) dzielą `localStorage` osadzonej gry per strona nadrzędna. Rekord zapisany w grze na aktualnosci.be **nie będzie widoczny** w tej samej grze na popolsku.be ani na domenie gry. Wniosek: rekord jest „per portal” i to akceptujemy; anonimowy ID też będzie per portal (ważne dla liczenia unikalnych graczy).
- **Udostępnianie z iframe** (Web Share API) wymaga atrybutu `allow="web-share"` w `<iframe>`, a pełny ekran — `allow="fullscreen"`. Dostarczymy gotowy kod do wklejenia w WordPress.
- **Dźwięk** może ruszyć dopiero po pierwszym dotyku (zasady autoplay). Pasuje do gry one‑tap: pierwszy tap = start i dźwięk.
- **Karta wyniku z podglądem w FB/WhatsApp** (Open Graph z wynikiem) wymaga serwera generującego obraz. W MVP: **statyczny obraz OG per kraj** + karta jako plik obrazu udostępniany przez Web Share (tam, gdzie obsługiwane), a w pozostałych przypadkach pobranie obrazu + kopiowanie linku.

---

## 5. Technologia (rekomendacja z uzasadnieniem)

**Czysty Canvas 2D + TypeScript + Vite + Vitest, PWA.**

Dlaczego nie Phaser (obie wersje researchu go dopuszczają):
- Phaser 3 to ok. 1 MB zminifikowany (ok. 300+ kB gzip) — sam silnik zjadłby budżet „< 1 MB i start < 2 s na słabym Androidzie”, zanim dodamy grafikę ⚠️ [szacunek na podstawie znanych rozmiarów paczki].
- Gra one‑tap potrzebuje: pętli ze stałym krokiem, kolizji prostokąt/koło, przewijania, sprite’ów, dźwięku. To kilkaset linii, które **w pełni kontrolujemy i testujemy**.
- Logika (`src/core/`: fizyka, kolizje, generator z ziarnem, dystans, punktacja) bez zależności od DOM — testy w Vitest bez przeglądarki, a ta sama logika posłuży serwerowi do weryfikacji przejazdów (odtwarzanie ziarna + wejść).

Pozostałe:
- **Budżet:** JS < 60 kB gzip, cała gra z grafiką i dźwiękiem < 1 MB, pierwszy kadr < 2 s na tanim Androidzie (pomiar Lighthouse, profil mobilny z ograniczeniem CPU).
- **Render:** pionowo 9:16 (logiczna rozdzielczość np. 360×640, skalowanie), działa też poziomo na desktopie z bocznymi pasami.
- **Grafika:** SVG rysowane ręcznie → atlas PNG/WebP przy budowaniu.
- **Dźwięk:** krótkie efekty (Web Audio), jingiel własny; rejestr licencji w `ASSETS.md`.
- **PWA:** manifest + service worker (offline po pierwszym wejściu).
- **Backend (lekki ranking):** PHP + SQLite na hostingu portali; endpoint `POST /run` (kraj, km, ziarno, czas, skrót wejść) z limitami tempa i odrzucaniem nierealnych wyników; `GET /league` (sumy tygodniowe krajów). Bez IP w bazie, anonimowy ID jako losowy UUID.
- **Hosting:** statyczny, własna (sub)domena + `<iframe>` w portalach.

---

## 6. Projekt gry — wersja zsyntetyzowana

### 6.1 Pętla jednego przejazdu (10–60 s)
1. Ekran startu: wybrany wcześniej kraj i miasto docelowe, duży przycisk/tap „Lecimy”.
2. Tap = podskok; grawitacja; świat przesuwa się w lewo; stały krok fizyki (np. 120 Hz).
3. Przeszkody parami góra/dół (wiadukt + pachołki, szlaban, znak, dźwig, wiatrak). Szczelina zawsze przelotna (gwarancja generatora).
4. Znajdźki: **paczka od mamy** (+km, chwilowo cięższy) i **słoik** (rzadki: +więcej km, mocniej cięży; w trybie łagodnym = dodatkowe życie). Bagaż widać na dachu/grzbiecie.
5. Granice krajów = zmiana tła, checkpoint i komunikat („Witamy w Niemczech — jeszcze 900 km”). Trudność zależy tylko od czasu/dystansu, nie od kraju.
6. Kolizja → ekran końca: km, „co cię zatrzymało” + jeden żart z sytuacji, rekord, przyciski **Jeszcze raz** (natychmiast) i **Udostępnij**, link „Co słychać w Polonii BE?”.
7. Dotarcie do domu (pełna trasa) = ekran mety (ciepły akcent: okno, stół, mama). W MVP przejazd się kończy; „lot powrotny” w v1.2.

### 6.2 Trasa i dystans
- Wybór kraju zamieszkania (MVP: BE, NL, DE) i miasta startowego (3–5 na kraj) oraz miasta w Polsce (ok. 15 miast wojewódzkich + Rzeszów itd.).
- Dystans trasy = odległość po wielkim kole × współczynnik drogowy ~1,2 [szacunek], zaokrąglony. Przejście jednej przeszkody ≈ stała porcja km (tak, by dobry gracz kończył trasę w 60–120 s — do strojenia).
- Wybór kraju ustawia link do portalu (tabela kraj → portale w konfiguracji).

### 6.3 Tryby
- **Rankingowy (domyślny):** 1 kolizja = koniec; wynik idzie do sumy kraju.
- **Łagodny:** 3 słoiki = 3 kolizje z krótkim „mrugnięciem” niezniszczalności; bez rankingu; dobry dla dzieci i do gry rodzinnej w święta.
- **Wyzwanie dnia:** to samo ziarno dla wszystkich tego dnia; wynik na karcie („Wyzwanie 1.12: 684 km”).

### 6.4 Zasady tonu (wiążące — scalone z obu researchy i briefu)
1. Śmiejemy się z sytuacji (bagaż, objazdy, opóźnienia, tęsknota), nie z ludzi.
2. Bohater jest sympatyczny i zaradny; „cebulowy” spryt = strategia, nie wstyd.
3. Bez alkoholu, polityki, religii, tragedii; bez godła.
4. Kraje zamieszkania nie są wrogami; przeszkody to infrastruktura i pogoda.
5. „Cebulak” tylko jako wybór gracza (skórka) — **chyba że zdecydujesz inaczej przy nazwie (P1)**.
6. Zero prawdziwych marek, logo i parodii nazw; zero „Flappy”.
7. Każdy tekst: test babci i kolegi z pracy. Wszystkie teksty gry w jednym pliku (`src/content/pl.ts`) do łatwego przeglądu.

### 6.5 Prywatność
Bez kont; anonimowy losowy ID; bez reklam; bez IP w bazie rankingu; nicki tylko z generowanej listy (v1.1). Krótka nota prywatności podlinkowana z ekranu startu.

---

## 7. Zakres MVP i termin 1.12.2026

Dziś jest 30.10 — do startu zostaje ok. 4,5 tygodnia. Proponowany plan:

| Tydzień | Wynik do sprawdzenia przez Ciebie na telefonie |
|---|---|
| 1 (do 6.11) | **Grywalny prototyp rdzenia:** fizyka, przeszkody, kolizje, restart, km, prosta grafika zastępcza; testy logiki; link do podglądu |
| 2 (do 13.11) | Waga bagażu, 2 znajdźki, tryb łagodny, trasa BE/NL/DE → PL, ekran końca z żartami, wybór kraju → link do portalu |
| 3 (do 20.11) | Docelowa grafika (bohater + 4 tła), dźwięk, karta wyniku, PWA, kod iframe; zamknięta beta w jednej grupie FB |
| 4 (do 27.11) | Lekki ranking krajów (PHP), wyzwanie dnia, balans, poprawki z bety, weryfikacja nazwy w EUIPO/UPRP |
| 1.12 | Start sezonu „Na Wigilię!” |

**Co uciąć, jeśli się nie zmieścimy (w tej kolejności):** 1) ranking online → zostaje karta wyniku + ręczny „ranking redakcji” w rolkach; 2) wyzwanie dnia; 3) tryb łagodny; 4) liczba miast (zostają stolice).
**Poza MVP:** pozostałe kraje, skórki, bramka bagażowa, power‑upy, lot powrotny, nagrywanie 15 s, duchy znajomych, FB Instant, Google Play, sponsorzy, wersje językowe.

**Ryzyko największe:** grafika postaci wysokiej jakości robiona ręcznie. Bezpiecznik: od tygodnia 1 ustalamy styl na jednej postaci, zanim powstaną tła.

---

## 8. Pytania decyzyjne (do etapu 2)

- **P1 — Nazwa:** „Cebulak Express” (wymaga zmiany zasady o słowie „cebulak”) / „Lecę do Domu!” / inna.
- **P2 — Bohater:** kombi z neutralnym kierowcą + cebulek jako skórka / bocian Bogdan / kombi z Panem Cebulkiem.
- **P3 — Kraje w MVP:** BE, NL, DE / BE, NL, DE, UK / tylko BE.
- **P4 — Ranking:** lekka suma km krajów od 1.12 / pełny ranking od razu / bez backendu w MVP.
- **P5 — Styl grafiki:** płaski wektor / pixel art.

---

## 9. Źródła weryfikacji (30.10.2026)

- [S1] GUS — *Information on the size and directions of emigration for temporary stay from Poland in 2020–2025* (12.08.2026): https://stat.gov.pl/en/topics/population/internationa-migration/information-on-the-size-and-directions-of-emigration-for-temporary-stay-from-poland-in-2020-2025,8,17.html ; RMF24: https://www.rmf24.pl/fakty/ekonomia/news-gus-policzyl-polakow-za-granica-oto-najpopularniejsze-kierun,nIdn,1013558
- [S2] Meta for Developers — *Important changes to Web Games and Instant Games*: https://developers.facebook.com/blog/post/2025/07/31/web-and-instant-games-changes/
- [S3] Meta — Zero Permissions, Social Features Overview: https://developers.facebook.com/documentation/games/build/zero-permissions/social-features/overview ; Global Leaderboards: https://developers.secure.facebook.com/docs/games/build/instant-games/network-enabled-zero-permissions/social-features/global-leaderboards/
- [S4] USPTO TSDR — „Flappy Bird”, rejestracja 5430683 (sn 86188824): https://tsdr.uspto.gov/statusview/sn86188824 ; zgłoszenie sn 98007245: https://tsdr.uspto.gov/statusview/sn98007245
- [S5] Ustawa o godle, barwach i hymnie RP, tekst jednolity Dz.U. 2024 poz. 155, art. 16: https://api.sejm.gov.pl/eli/acts/DU/2024/155/text.html
- [S6] Google Play Console Help — wymagania testów dla nowych kont osobistych: https://support.google.com/googleplay/android-developer/answer/14151465 (szczegóły 12 testerów / 14 dni potwierdzone w źródłach wtórnych, np. https://www.testerscommunity.com/guides/how-many-testers-do-you-need-google-play)
- [S7] Android Authority — harmonogram weryfikacji deweloperów: https://www.androidauthority.com/android-sideloading-changes-timeline-3679204/
- [S8] Wyszukiwanie webowe nazw „Cebulak Express” / „Lecę do domu” — brak trafień w grach (wynik negatywny, nie zastępuje wyszukiwania znaków).

*Kwestie prawne to analiza, nie porada prawna.*
