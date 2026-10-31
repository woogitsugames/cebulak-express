# Cebulak Express — zasoby marki

Oryginalne, autorskie grafiki wektorowe (kształty, kolory, kompozycja) przygotowane programowo w `generate.py` przy użyciu CairoSVG, Pillow i FontTools. Teksty logo przekształcone na krzywe; do działania gry **nie są wymagane pliki fontów**. Projekt logo, kombi, tła i piktogramu nie wykorzystują cudzych znaków towarowych ani postaci z innych gier. Materiał wygenerowany z wytycznych projektu; poglądowy arkusz koncepcyjny z ChatGPT Image nie jest częścią plików produkcyjnych.

## Pliki, źródła i licencje

| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |
|---|---|---|---|
| `logo.svg` | Własna ilustracja SVG, FontTools | Własne / do użytku w grze | Zielona tablica, złota cebulka, oznaczenie kierunku; liternictwo jako krzywe |
| `logo.png` | SVG → CairoSVG/Pillow | Własne | 2048 × 1203, RGBA |
| `logo-small.png` | SVG → CairoSVG/Pillow | Własne | 720 × 423, RGBA |
| `icon-1024.png` | Własny SVG → PNG | Własne | 1024 × 1024, pełne tło |
| `icon-foreground.png` | Własny SVG → PNG | Własne | 432 × 432, kanał alfa, kombi w bezpiecznym kole 264 px |
| `icon-background.png` | Własny SVG → PNG | Własne | 432 × 432, pełne tło, bez kombi |
| `icon-monochrome.png` | Własny SVG → PNG | Własne | 432 × 432, biała sylwetka RGBA dla Android themed icons |
| `icon-maskable-512.png` | Własny SVG → PNG | Własne | 512 × 512, widoczny główny motyw w obszarze centralnym |
| `splash-2732.png` | Własny SVG → PNG | Własne | 2732 × 2732, logo w obszarze środkowym 1200 × 1200 |
| `play-feature-1024x500.png` | Własny SVG → PNG | Własne | 1024 × 500, Google Play feature graphic |
| `og-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, ogólny OG |
| `og-be-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, zabudowa ceglana |
| `og-nl-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, wiatraki i kanał |
| `og-de-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, las i most |
| `og-uk-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, miejska architektura i wieża zegarowa |
| `og-fr-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, zieleń i pola |
| `og-ch-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, góry i drewniana zabudowa |
| `og-no-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, fiord i świerki |
| `og-dk-1200x630.png` | Własny SVG → PNG | Własne | 1200 × 630, wiatraki i miasteczko |
| `card-bg-1080x1920.png` | Własny SVG → PNG | Własne | 1080 × 1920, wolne pole na rezultat |
| `card-bg-1080x1080.png` | Własny SVG → PNG | Własne | 1080 × 1080, wolne pole na rezultat |
| `preview.png` | Pillow | Własne | Arkusz kontaktowy obrazów |
| `generate.py` | Python, CairoSVG, Pillow, FontTools | Własne | Deterministyczny generator grafik; można ponowić render |

**Font:** wykorzystane do obrysów liter krzywe z Inter Display Black, licencja **SIL Open Font License 1.1** (projekt Rasmus Andersson). Font nie jest dołączany ani udostępniany. W `logo.svg` krzywe są zapisane jako ścieżki, a nie jako osadzony plik fontu.

## Paleta

- Zieleń drogowa: `#14654F`, grafitowy kontur: `#16323D`.
- Słoneczna żółć: `#FFBD37`, czerwony kierunkowskaz: `#CF2E37`.
- Samochód: niebiesko-turkusowy, bez oznaczeń producenta.
- Ciepłe światło zawsze od góry z lewej.

## Użycie i integracja

1. `logo.png`/`logo-small.png`: UI, marketing, nagłówek strony. Podstawowy wektor `logo.svg`.
2. `icon-1024.png`: główne źródło ikony sklepu. Android adaptive: **oddzielnie** `icon-foreground.png` i `icon-background.png`; `icon-monochrome.png` jako osobny glyph themed icons. Przy integracji Androida koordynator konwertuje te pliki do odpowiednich zasobów mipmap i XML.
3. `icon-maskable-512.png`: `manifest.webmanifest` → `purpose: "maskable"`; do ikony `any` można wykorzystać `icon-1024.png`.
4. `splash-2732.png`: można skalować proporcjonalnie i wycentrować, bez przycinania centralnych 1200 × 1200 px.
5. `og*.png`: statyczne metadane Open Graph dla kraju. Podmiana ogólnej ścieżki zależnie od parametrów adresu i ustawień serwera należy do koordynatora.
6. `card-bg*.png`: rysować wynik i tekst gry dynamicznie na pustym, jasnym panelu; nie zawierają liczb.

## Weryfikacja

`python generate.py` generuje wszystkie PNG od nowa i `preview.png`. Wymaga `pip install pillow cairosvg fonttools`. PNG nie mają przezroczystości tam, gdzie jest wymagana pełna powierzchnia (ikona sklepu, splash, OG, tła), a logo i warstwa foreground mają kanał alfa. Wszystkie PNG zapisane jako lossless sRGB (bez osadzonych profili niezgodnych z sRGB). Grafiki nie zawierają flag UE, godła ani cudzych logotypów.

## Zlecenie 118 — Google Play: grafika zimowa i kontrola masek

> **Notka koordynatora:** `play-feature-zima-*.png` są wykluczone z dist/APK (`EXCLUDED_BRAND` w
> `scripts/pwa-plugin.ts`); arkusz masek: `docs/art/podglady/ikona-maski-118.png`.

**Data:** 2026-10-31  
**Wydanie:** ZIP z zachowaniem ścieżek, bez zmian w GitHub i bez PR  
**Projekt:** „Cebulak Express — Kierunek Polska”

### Pliki, narzędzia, prompty i licencje

| Plik | Narzędzie / źródło | Prompt | Licencja / prawa | Uwagi |
|---|---|---|---|---|
| `play-feature-zima-1024x500.png` | ChatGPT Image + Python (Pillow, CairoSVG) | P118-W1 + składanie P118-W2 | Generowana sceneria: wynik ChatGPT Image do wykorzystania zgodnie z warunkami OpenAI; kombi: własne zasoby gry; liternictwo Inter Display Black: SIL OFL 1.1 | Finalny PNG **1024 × 500**, **RGB**, z osadzonym profilem **sRGB**, bez alfa; bez daty startu |
| `play-feature-zima-tlo-1024x500.png` | ChatGPT Image + Python/Pillow + wektor kombi z `tools/art/brand-generate.py` | P118-W1 + P118-W2 | Jak wyżej; wektor kombi jest własnym zasobem projektu | **1024 × 500, RGB, sRGB**. Zimowa sceneria oraz dokładny wektor bohatera z przyprószonymi śniegiem walizkami; **bez jakichkolwiek tablic i napisów** |
| `play-feature-zima-tekst-1024x500.png` | Pillow, Inter Display Black | P118-W2 | Własna kompozycja / Inter Display Black: SIL OFL 1.1 | **1024 × 500, RGBA, sRGB**. Zielona tablica „Cebulak Express”, biało-czerwona strzałka „Kierunek Polska”, dolna tabliczka „Na święta do domu” |
| `play-feature-zima-tekst-alt1-1024x500.png` | Pillow, Inter Display Black | P118-W2 | Jak wyżej | Wariant dolnego podpisu: **„Do Polski na święta”**. W pełni przezroczysta poza tablicami; zamienna warstwa 1:1 |
| `play-feature-zima-tekst-alt2-1024x500.png` | Pillow, Inter Display Black | P118-W2 | Jak wyżej | Wariant dolnego podpisu: **„Dom czeka w Polsce”**. W pełni przezroczysta poza tablicami; zamienna warstwa 1:1 |
| `docs/art/podglady/ikona-maski-118.png` | Pillow + CairoSVG, referencja: istniejący generator marki | Kontrola P118-K1 | Własne zasoby gry; bez materiałów zewnętrznych | Arkusz 4 masek × 3 rozmiary, koło strefy bezpiecznej, przycięcie ikony Google Play do koła, finalna grafika i miniatura 512 × 250 |

### Prompty / operacje

**P118-W1 — oryginalny prompt obrazu scenerii, ChatGPT Image:**

> A bright, cartoon-style winter countryside serves as a polished Google Play feature graphic background, using bold dark teal outlines, rounded shapes, cel-shaded color blocks, and smooth gradients; the wide scene leaves the right side clear for signage and the left foreground open for a vehicle. A winding snowy road leads toward a warmly lit village beneath a twilight teal-and-sapphire sky, with snow-laden pines, berry-covered shrubs, glowing windows, smoke-filled chimneys, a light-wrapped evergreen, rolling fields, falling snow, and no people, text, logos, or signage.

**P118-W2 — montaż grafiki i warstwy oznaczeń:** zachować *dokładnie oryginalny kształt* turkusowo-niebieskiego kombi oraz trzech walizek (pomarańczowa/czerwona/zielona) i dwóch tobołków z pliku `tools/art/brand-generate.py`; kontur `#16323D`, światło z góry z lewej. Dodać jedynie białe czapy śniegu na bagażach i śnieg na relingu. Samochód umieścić po lewej, zieloną tablicę marki i czerwoną strzałkę po prawej; kolor drogowowskazu `#14654F`, żółć `#FFBD37`, czerwień `#CF2E37`. Napisy wygenerować **wyłącznie na warstwie RGBA**. Zachować środek kadru dla istotnej treści, bez dat startu, ocen i reklamowych haseł niezgodnych z Google Play.

**P118-K1 — kontrola ikon:** odtworzyć oryginalne `icon-background.png`, `icon-foreground.png` i `icon-1024.png` z autorskiego kodu repozytorium, sprawdzić maski: koło, superelipsa/squircle (potęga 4,25), zaokrąglony kwadrat (promień 26%) i kropla (orientacyjna maska typu teardrop). Rozmiary: 192, 96, 48 px. Żółta okrągła linia oznacza strefę bezpieczną. Ikonę sklepową dodatkowo przyciąć kołowo.

### Audyt ikony — wynik

Źródła porównawcze na `main` (dostęp tylko do odczytu):

- `public/assets/brand/icon-foreground.png` — SHA pliku Git: `aba8618bdf1c0e75ec982c41ee67e9cc3089458e`
- `public/assets/brand/icon-background.png` — SHA pliku Git: `fd13bd5f8c6a7d6a938e886607394ab519625783`
- `public/assets/brand/icon-1024.png` — SHA pliku Git: `97d75bfcc64571981690d40de8ae6cc606931c75`
- [`tools/art/brand-generate.py`](https://github.com/woogitsugames/cebulak-express/blob/main/tools/art/brand-generate.py) — SHA pliku Git: `1dbaa905695b4a6bb69f2388f4e1f4f5afe03808`.

Bieżące PNG z repozytorium obejrzano w podglądzie. Dla kontroli w Pillow **lokalnie odtworzono ich odpowiedniki ze źródłowych funkcji SVG** generatora, bez pobierania i modyfikowania binarnych plików repozytorium. Arkusz masek jest więc renderem tych samych kształtów i gradientów, a nie zrzutem z urządzenia ani automatycznym testem konkretnych launcherów OEM.

1. **Samochód i wszystkie bagaże mieszczą się w kole o średnicy 264 px** na płótnie 432 × 432. Po wyłączeniu wyłącznie dekoracyjnego cienia i dwóch krótkich kresek ruchu test alfa >25 daje **0 pikseli** sylwetki auta i bagaży poza strefą.
2. W całej oryginalnej warstwie foreground występują **452 piksele** poza kołem przy progu alfa >25 (ok. **1,75%** nieprzezroczystego rysunku). Są to dwie krótkie kreski ruchu i skraj cienia po lewej stronie (ograniczenie x=55–111, y=276–297), **nie** auto, koła czy walizki. Ich przycięcie przez maski nie zagraża rozpoznawalności ikony.
3. Przy **48 px** gruby ciemny kontur pozostaje widoczny, a niebieskie kombi i trzy kolorowe walizki nadal dają się rozróżnić. W 96 i 192 px zachowane są także drobne detale.
4. `icon-1024.png` po przycięciu do koła nie traci samochodu ani walizek.
5. **Wniosek: nie zmieniać ikony.** Nie dołączono nowej `icon-foreground.png`, zgodnie z zakazem niepotrzebnych zmian i z wymogiem zachowania identyfikacji w sklepie.

**Uwaga o wymaganiach matematycznych:** 264/432 = **61,11%**, a nie 66%. W arkuszu przyjęto bezsporny wymiar **264 px** z opisu oryginalnego foreground, a nie procent 66% (który oznaczałby 285,12 px).

### Kontrola grafiki Google Play

- Złożenie: `tlo` + `tekst` = wersja finalna, bez wtopionego tekstu w scenerię. Oba alternatywne PNG mogą zastąpić warstwę `tekst` 1:1.
- Finalny plik: 1024 × 500, PNG **RGB**, profil ICC **sRGB**, brak kanału alfa. Tło: RGB. Warstwy napisów: RGBA.
- Kontrola miniatury: 512 × 250; napisy pozostają czytelne.
- Motywy: śnieg, zimowy zmierzch, domy z ciepłym światłem, oświetlone drzewko, generyczne kombi z bagażami. Bez marek samochodowych, oznaczeń rejestracyjnych, flag, alkoholu, polityki, scen religijnych i daty startu.
- Nie zmieniano letnich grafik, ikon ani żadnych plików repozytorium.

### Instrukcja wdrożenia

1. Rozpakować ZIP w **katalogu głównym repo**, zachowując strukturę `public/assets/brand/` i `docs/art/podglady/`.
2. W grudniowym wpisie Google Play użyć pliku `public/assets/brand/play-feature-zima-1024x500.png` jako feature graphic.
3. Jeśli zmieni się napis, nałożyć wybraną warstwę PNG na `play-feature-zima-tlo-1024x500.png` albo przerysować warstwę napisów osobno; **nie** nadpisywać letniego feature graphic bez uzgodnionej zmiany w integracji.
4. Obecna ikona sklepu i warstwy adaptacyjne Androida pozostają bez zmian.

## Zlecenie 121 — zimowe tła karty wyniku i OG (zimowy oraz IE, ES, IT, AT, SE, FI, LU)

> **Notka koordynatora (integracja 31.10.2026):** do `public/assets/brand/` trafiły tylko gotowe
> obrazy, pod nazwami jak istniejące OG krajów (tekst wtopiony, jak w `og-be-1200x630.png`):
> `og-<kod>-1200x630-z-tekstem.png` → **`og-<kod>-1200x630.png`** (ie, es, it, at, se, fi, lu),
> `og-zima-1200x630-z-tekstem.png` → **`og-zima-1200x630.png`**.
> Warstwy źródłowe — tła bez tekstu (`og-<kod>-1200x630.png`, `og-zima-1200x630.png`) i warstwy napisów
> (`og-<kod>-tekst-1200x630.png`, `og-zima-tekst-1200x630.png`) — leżą w `docs/art/zrodla/og/`, bo
> wszystkie `og-*` z `public/assets/brand/` trafiają do dist i APK (`isShippedAsset` w `scripts/pwa-plugin.ts`).
> W tabeli niżej nazwy plików są takie, jak w dostawie grafika.
> Tła `card-bg-zima-1080x{1920,1080}.png` czyta `src/share/card.ts` w sezonie zimowym (`seasonAt`: 1–26 grudnia
> lub `?sezon=zima`), z powrotem do letniego tła, gdy zimowe się nie wczyta.

Zlecenie 121, runda 8 (31.10.2026). Pliki przekazywane w ZIP-ie z zachowaniem ścieżek repo; bez zmian w repozytorium.

### Lista plików i pochodzenie

| Plik | Narzędzie / źródło | Prompt / opis | Licencja / pochodzenie | Uwagi |
|---|---|---|---|---|
| `public/assets/brand/card-bg-zima-1080x1920.png` | ChatGPT GPT Image + Python/Pillow | Zimowa ilustracja 9:16: księżyc, zmierzch, śnieg, ciepłe domy, iluminowana choinka, droga i turkusowo-niebieskie kombi; dokładny panel x104–976, y380–1425 | Grafika własna na potrzeby projektu; element AI: zgodnie z warunkami ChatGPT | PNG RGB 1080×1920; bez napisów; jasny panel z osobnej warstwy; ciemna stopka y1780–1830 |
| `public/assets/brand/card-bg-zima-1080x1080.png` | ChatGPT GPT Image + Python/Pillow | Zimowy krajobraz 1:1, śnieg i oświetlone chaty, droga z kombi; panel x104–976, y212–760 | Grafika własna na potrzeby projektu; element AI: zgodnie z warunkami ChatGPT | PNG RGB 1080×1080; bez napisów; ciemna stopka y1020–1060 |
| `public/assets/brand/og-zima-1200x630.png` | ChatGPT GPT Image + Pillow | Zimowa droga do domu, turkusowo-niebieskie kombi z 3 walizkami i 2 tobołkami, śnieg, choinka, rozświetlone domy; puste miejsce na logo po prawej | Grafika własna na potrzeby projektu; element AI: zgodnie z warunkami ChatGPT | PNG RGB 1200×630; bez napisów; środek bezpieczny 1000×530 |
| `public/assets/brand/og-zima-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Transparentna stylizacja logo: Cebulak Express — Kierunek Polska; podtytuł: Leć do domu na święta | Autorski skład typografii; czcionka Inter: SIL OFL 1.1 | PNG RGBA 1200×630; 100% przezroczyste tło poza elementami tekstowymi |
| `public/assets/brand/og-zima-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć zimową warstwę tekstu RGBA na zimowe tło RGB | Grafika własna na potrzeby projektu; element AI: zgodnie z warunkami ChatGPT | PNG RGB 1200×630; gotowe do ustawienia w metadanych OG |
| `public/assets/brand/og-ie-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Irlandia: zielone wzgórza, murki z kamienia, pasące się owce, kamienna chata; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-ie-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Irlandia | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-ie-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Irlandia na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-es-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Hiszpania: gaje oliwne, suchsze wzgórza, białe domy, dachy terakotowe; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-es-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Hiszpania | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-es-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Hiszpania na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-it-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Włochy: pagórki Toskanii, cyprysy, kamienny dom z dachówką; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-it-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Włochy | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-it-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Włochy na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-at-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Austria: Alpy z ośnieżonymi szczytami, drewniane alpejskie domy, świerki; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-at-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Austria | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-at-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Austria na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-se-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Szwecja: jezioro wśród świerków i sosnowych lasów, czerwony drewniany dom; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-se-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Szwecja | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-se-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Szwecja na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-fi-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Finlandia: duże jezioro, las iglasty i brzozy, drewniana chata; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-fi-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Finlandia | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-fi-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Finlandia na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `public/assets/brand/og-lu-1200x630.png` | Python/Pillow + ilustracja AI kombi | Letni krajobraz kraju Luksemburg: zielona dolina, zalesione wzgórza, anonimowy historyczny zamek na skale; generyczne błękitne kombi z trzema walizkami i dwoma tobołkami; bez logo i tekstu | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; podkład na osobny napis |
| `public/assets/brand/og-lu-tekst-1200x630.png` | Python/Pillow, czcionka Inter OFL | Logo Cebulak Express / Kierunek Polska i podpis trasy z kraju: Luksemburg | Autorski skład typografii; Inter: SIL OFL 1.1 | PNG RGBA 1200×630; osobna, edytowalna przez ponowne renderowanie warstwa |
| `public/assets/brand/og-lu-1200x630-z-tekstem.png` | Python/Pillow: kompozycja | Nałożyć warstwę tytułową kraju Luksemburg na letni krajobraz RGB | Autorska ilustracja proceduralna Pillow; kombi: AI na warunkach ChatGPT | PNG RGB 1200×630; wersja OG gotowa do publikacji |
| `docs/art/podglady/karta-zima-121.png` | Python/Pillow | Zmontować podgląd pionowej i kwadratowej karty z przykładowymi napisami gry: Dojechałem!, 1234 km, Z Brukseli do Siemiatycz, pasek i liga | Autorski skład poglądowy, grafiki AI na warunkach ChatGPT | TYLKO PODGLĄD; tekst przykładowy nie znajduje się na tłach produkcyjnych |
| `docs/art/podglady/og-kraje-121.png` | Python/Pillow | Zestawić siedem letnich OG z warstwami tekstowymi jako tablicę przeglądową | Autorski skład poglądowy, grafiki AI na warunkach ChatGPT | TYLKO PODGLĄD; nie podłączać jako OG |

### Wskazówki integracyjne

- **Karta wyniku:** jako tło pionowe lub kwadratowe wybierz odpowiedni `card-bg-zima-…png`. Nie są w nim zapisane żadne napisy; gra rysuje cały interfejs. Panele wykonane w podanych współrzędnych, bez zmiany obecnych miejsc tekstów.
- **OG zimowy:** `og-zima-1200x630.png` to samo tło; `og-zima-tekst-1200x630.png` to warstwa RGBA; `og-zima-1200x630-z-tekstem.png` jest kompozycją gotową do użycia jako obraz podglądu 1200×630.
- **OG krajowe:** analogicznie pliki `og-<kod>-1200x630.png` są bez tekstu; `og-<kod>-tekst-1200x630.png` to osobne napisy; `og-<kod>-1200x630-z-tekstem.png` to gotowa grafika z treścią, na wzór wcześniejszych grafik krajowych. **Do metadanych wymagających tytułu używaj wersji `-z-tekstem`.**
- **W razie aktualizacji hasła:** edytować i odtworzyć oddzielną warstwę RGBA, następnie ponownie nałożyć na podkład RGB. Nie trzeba regenerować tła.
- **Fonty:** wykorzystano czcionkę Inter z licencją SIL Open Font License 1.1. Nie dołączono plików fontów. Wszystkie napisy zawarte w warstwach są zrasteryzowane w PNG.
- **Styl pojazdu:** bez marki i emblematów; turkusowo-niebieskie kombi z pomarańczową, czerwoną i zieloną walizką oraz dwoma tobołkami, gruby ciemny kontur. Kolory odniesienia: `#14654F`, `#16323D`, `#FFBD37`, `#CF2E37`.
- **Pochodzenie:** sceny zimowe i izolowane kombi zostały wygenerowane przez ChatGPT GPT Image; skorygowano układ, podłożono własne panele, drogę, cienie i liternictwo w Pythonie/Pillow. Letnie krajobrazy są osobnymi ilustracjami proceduralnymi; wykorzystują tę samą wygenerowaną warstwę kombi. Istniejące grafiki repozytorium służyły wyłącznie za odniesienie stylistyczne; nie podmieniono oryginałów.
- **Brak elementów wykluczonych:** bez alkoholu, znaków religijnych, flag, logotypów innych firm, znaków politycznych, tablic rejestracyjnych oraz konkretnej daty premiery.

### Kontrola techniczna

- PNG w docelowej rozdzielczości: 1080×1920, 1080×1080, 1200×630.
- Tła i wersje gotowe: RGB (bez alfy); niezależne warstwy tekstowe: RGBA (z alfą).
- Panel pionowy: `x=104..976, y=380..1425`; panel kwadratowy: `x=104..976, y=212..760`.
- Obszar bezpieczny zimowego OG: `x=100..1100, y=50..580` — tekst oraz główna część kombi w tych granicach.
- Karta przykładowa wyłącznie w `docs/art/podglady/karta-zima-121.png`.
- Integrację warstw, sprawdzenie w Canvas 2D i podglądu linków Facebook/Messenger musi przeprowadzić koordynator po wdrożeniu. Brak lokalnego uruchomienia aplikacji.

### Pytania do koordynatora

- Czy zimowa wersja OG ma zastąpić dotychczasową `og-1200x630.png` wyłącznie w sezonie 1–26 grudnia, czy być wybierana w zależności od URL/regionu? Zestaw udostępnia osobne pliki i nie ingeruje w kod.
- W repo istnieją krajowe OG z wtopionym tekstem, ale zlecenie wymaga osobnych warstw. Z tego powodu nowe kraje otrzymują podkład bez tekstu oraz wersję `-z-tekstem` do metadata.
