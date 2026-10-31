# ASSETS-120 — zimowe okładki rolek i plansze

Format: 1080×1920 px, ilustracje RGB i teksty RGBA; całość sRGB. Zasoby przeznaczone wyłącznie do marketingu (poza `public/`).
Inspiracja wizualna: ikona gry `public/assets/brand/icon-1024.png` (podgląd repozytorium), paleta z briefu i obraz koncepcyjny wygenerowany w ChatGPT (GPT Image). Ostateczne ilustracje zostały ręcznie złożone jako wektory i wyrenderowane za pomocą CairoSVG/Python, bez kopiowania oryginalnych plików marki.

| Plik | Narzędzie | Prompt / założenia | Licencja | Font |
|---|---|---|---|---|
| `okladka-01-bagaznik.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Zimowy ośnieżony wiadukt i absurdalna wieża walizek; niebieskie kombi; bez znaków pisanych | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `okladka-02-objazd.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Objazd w śniegu: samochód nad pachołkami, puste żółte tablice | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `okladka-03-paczka-od-mamy.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Prezent i słoiki spadające do kombi, śnieg, ciepłe okna domu | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `okladka-04-daleka-droga.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Długa zimowa droga przy fiordzie, zorza, góry Norwegii | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `okladka-05-liga.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Liga podróżników, kombi w kolorach, bez flag i marek | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `okladka-06-start.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Premiera: kombi rusza, pusta zielona tablica, fajerwerki i konfetti | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `plansza-koncowa.png` | ChatGPT GPT Image (koncepcja); autorskie SVG/Python, CairoSVG | Plansza końcowa: odjeżdżające kombi, pusta tablica na logo i miejsce na link | Własna ilustracja wygenerowana i opracowana dla zamawiającego; bez zasobów stron trzecich | — |
| `tekst-juz-wkrotce.png` | Python + Pillow | Już wkrótce!; białe litery z ciemnym konturem; y ok. 282 | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-w-grudniu.png` | Python + Pillow | W grudniu ruszamy do domu; trzy linie; y ok. 277 | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-zapowiedz-data.png` | Python + Pillow | Pusta żółta tabliczka; bez daty; pole na wpisanie daty przez koordynatora | Własny skład; font SIL Open Font License 1.1 | — |
| `tekst-gramy.png` | Python + Pillow | Gramy! Leć do domu na święta; trzy linie | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-wizualizacja.png` | Python + Pillow | WIZUALIZACJA / PRZED PREMIERĄ; dwie linie, prawy górny bezpieczny fragment | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-01.png` | Python + Pillow | Czy to się / zmieści? | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-02.png` | Python + Pillow | Objazd w / najgorszym / momencie | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-03.png` | Python + Pillow | Paczka od mamy / w drodze | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-04.png` | Python + Pillow | Z Oslo do domu? | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-05.png` | Python + Pillow | Który kraj / doleci najdalej? | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `tekst-tytuly-06.png` | Python + Pillow | Startujemy! | Własny skład; font SIL Open Font License 1.1 | Inter Black (SIL OFL 1.1) |
| `docs/art/podglady/rolki-okladki-120.png` | Python + Pillow | Arkusz: sześć okładek z tytułami i półprzezroczystymi polami UI | Własny skład | Inter Black (SIL OFL 1.1) |

## Instrukcja dla koordynatora

- Najpierw tło `okladka-*.png` (RGB), nad nim wybrana warstwa `tekst-*.png` (RGBA). Pozycja tekstu jest zapisana w pełnoekranowym PNG: nakładaj **1:1 w (0,0)**.
- Dla teaserów można nałożyć `tekst-juz-wkrotce.png` i odpowiedni `tekst-tytuly-NN.png`; przykład pokazuje arkusz.
- Pole `tekst-zapowiedz-data.png` celowo nie zawiera żadnej daty. Datę należy później dodać w oddzielnej warstwie, pozostawiając tło niezmienione.
- Na `plansza-koncowa.png` umieść prawdziwe logo z `public/assets/brand/logo.png` w zielonym pustym polu. Nie wprowadzono tego pliku do archiwum, aby nie dublować zasobów marki.
- Pusty biały panel pod link na planszy końcowej: x=165–860, y=1454–1530. Aby nie zakrywał go dolny interfejs, link umieść do y=1530.
- Główny bezpieczny obszar dla nakładek: x=0–940, y=220–1540. **Praktyczne marginesy**: x=140–900, y=245–1520. Półprzezroczyste pasy na arkuszu to wyłącznie podgląd, nie część okładek.

## Weryfikacja

- Bez daty premiery, flag, czytelnych znaków drogowych, marek pojazdów, treści politycznych, religijnych lub alkoholowych.
- Teksty obecne wyłącznie w osobnych PNG RGBA, a nie w sześciu okładkach.
- Trzy walizki (pomarańczowa, czerwona, zielona) oraz dwa miękkie tobołki tworzą spójny znak rozpoznawczy kombi; w wariancie 01 wieża walizek jest celowo wyższa.
- Główne elementy i tytuły zaprojektowano powyżej y=1540 i na lewo od x=940; zimowe tło jest dekoracją także w obszarach interfejsu.

## Pochodzenie i prawa

Grafiki kampanii są nowymi, ręcznie zbudowanymi ilustracjami wektorowymi wspomaganymi generatywnym moodboardem (ChatGPT GPT Image). Font Inter jest udostępniany na SIL Open Font License 1.1; plików czcionki **nie dołączono**. Nie pobierano zewnętrznych fotografii ani elementów chronionych prawami stron trzecich.
