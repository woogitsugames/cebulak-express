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
