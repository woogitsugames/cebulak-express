# Zlecenie 86 — Panoramy A+: Padwa, Mestre, Udine, Rzym, Bolonia

**Data:** 31.10.2026. **Autor/narzędzie:** generacja graficzna wbudowanym ChatGPT (GPT Image), korekta SVG/CairoSVG, Pillow/OpenCV. **Prawa:** oryginalne zasoby przygotowane dla właściciela projektu; do wykorzystania komercyjnego zgodnie z warunkami dostawcy narzędzi. Sam obraz AI nie zapewnia wyłącznej ochrony prawnoautorskiej.

**Ważne:** wielomegabajtowe pliki PNG i arkusz podglądu **nie są jeszcze na gałęzi GitHub**. Wszystkie siedem plików znajduje się w ZIP oddanym właścicielowi w sesji ChatGPT. Przed scaleniem wypakować ZIP w korzeniu repozytorium (z zachowaniem ścieżek) i zatwierdzić zmiany na tej gałęzi. Pełna wersja tego pliku z promptami jest także w ZIP.

| Plik (1620 × 900 px, RGBA/sRGB) | Miasto | Rozpoznawalne obiekty | Kadr / status | Źródło i licencja |
|---|---|---|---|---|
| `padwa.png` | Padwa | Torre dell'Orologio, Palazzo del Capitanio, Palazzo dei Camerlenghi, arkady | Piazza dei Signori — kierunek zachodni, stylizowany | ChatGPT GPT Image + Pillow; własne dla projektu |
| `mestre.png` | Mestre | Wieża miejska Torre Civica z zegarem, kamienice, kanał i most | **Montaż motywów:** Piazza Ferretto + Marzenego nie są jednym realnym widokiem; wymaga akceptacji | ChatGPT GPT Image + SVG/Pillow; własne dla projektu |
| `udine.png` | Udine | Castello di Udine, wieże Piazza della Libertà, alpejski krajobraz | **Montaż ikonograficzny**; nie jest ścisłym widokiem z jednego punktu | ChatGPT GPT Image + Pillow; własne dla projektu |
| `rzym.png` | Rzym | Colosseo i Arco di Costantino | Via di San Gregorio; zachowane rzeczywiste sąsiedztwo obiektów | ChatGPT GPT Image + autorski SVG/Pillow; własne dla projektu |
| `bolonia.png` | Bolonia | Torre degli Asinelli, Torre Garisenda, arkady, historyczny kościół | Rejon Via Rizzoli / Piazza di Porta Ravegnana | ChatGPT GPT Image + Pillow; własne dla projektu |

**Format:** każda panorama PNG 1620 × 900, przezroczystość RGBA, osadzony profil sRGB ICC, gruby obrys w barwie `#1d2f3b`, linia gruntu przy dolnej krawędzi, bez napisów w obrazach gry, bez nieba i logotypów. Arkusz z podpisami: `docs/art/podglady/panoramy-86.png`.

## Prompty koncepcyjne
- **Padwa:** zachodnia pierzeja Piazza dei Signori, Torre dell'Orologio ze złoto-niebieskim zegarem astronomicznym, monumentalne arkady, płaskie ciepłe kolory i ciężkie kontury; tło przezroczyste.
- **Mestre:** kanał, historyczna zabudowa i ceglasta wieża zegarowa; transparentne tło, styl A+; retusz blanków i tarczy zegarowej.
- **Udine:** zamek na wzgórzu, loggia i wieże Piazza della Libertà, Alpy; duże uproszczone bryły, transparentne tło.
- **Rzym:** Koloseum i łuk Konstantyna w rzeczywistym sąsiedztwie; kilka kondygnacji monumentalnych łuków, piaskowiec, gruby kontur, bez nieba; łuk zrekonstruowano w SVG.
- **Bolonia:** Due Torri, asymetryczna wysokość Asinelli/Garisenda, arkady i sylwetka pobliskiego zabytkowego kościoła; terakotowa paleta.

Opis promptów odtwarza instrukcje artystyczne; automatyczny generator nie zwrócił pełnego tekstu promptów w metadanych.

## Źródła identyfikacji budowli (referencje, nie skopiowane materiały)
- Padwa: https://www.turismopadova.it/luogo/piazza-dei-signori/
- Mestre: https://www.comune.venezia.it/it/node/25388
- Udine: https://www.italia.it/it/friuli-venezia-giulia/udine/piazza-della-liberta
- Rzym: https://colosseo.it/
- Bolonia: https://www.bolognawelcome.com/en/places/towers-historic-buildings/the-two-towers-garisenda-and-degli-asinelli-eng?gttd_currency=EUR&gttd_lang=it-IT

## QA
Wykonane: kontrola wymiarów i kanału alfa, osadzenie sRGB, sprawdzenie braku nieba i położenia gruntu, podgląd panoram w skali około 1:5 oraz test integralności ZIP.

**Do wykonania przed scaleniem:** wgranie grafik z ZIP, akceptacja kompozycji Mestre i Udine, wizualny test w Canvas gry, uruchomienie `npm ci && npm run typecheck && npm test && npm run build` (brak lokalnego klona repo; próba Git HTTPS nie powiodła się z powodu DNS).
