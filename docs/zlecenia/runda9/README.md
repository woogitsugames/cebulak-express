# Runda 9 — zimowe wersje grafik punktów trasy

Gra startuje 10–15.12.2026 w sezonie zimowym (1–26.12). Tła krajów mają zimowe warianty, ale grafiki punktów trasy (panoramy, przejścia, stacje, promy) były tylko letnie. Decyzja właściciela (31.10): 20 paczek po 5 grafik:
- **122–132 i część 133:** 57 polskich miast docelowych (meta widzi każdy gracz),
- **133:** dodatkowo 2 najczęściej mijane miasta po drodze (policzone po wszystkich trasach: Berlin, Drezno),
- **133–141:** 28 przejść granicznych, stacji i promów. **13 z nich miało stary płaski styl bez konturu A+** (m.in. Jędrzychowice — 855 tras, Świecko, Świnoujście, promy) — te GPT rysuje od nowa w A+ **w wersji letniej i zimowej**; pozostałe 15 dostaje tylko wersję zimową. Przy `granica-lv-lt` poprawka uciętej tablicy.
Razem 100 plików (limit 20 paczek × 5).
Pozostałe panoramy zimą zostają letnie (gra bierze `<id>.png`, gdy brak `<id>-zima.png`).

## Jak wysłać
Każda paczka to **ZIP `zlecenie-NN-paczka.zip`**: plik `.md` zlecenia + 5 (lub 4) letnich PNG. Do jednej sesji GPT wrzuć cały ZIP (albo .md i PNG osobno) — GPT robi zimowe wersje na podstawie letnich. Wraca **`zlecenie-NN.zip`**.

## Wgrywanie (koordynator)
Jak w rundzie 8 (`docs/HANDOVER.md`, sekcja 4): rozpakować do pustego katalogu, obejrzeć arkusz lato/zima (kompozycja 1:1, kontur A+, zero motywów religijnych), kwantyzacja Pillow FASTOCTREE + oxipng, `ASSETS-NN.md` na koniec `landmarks/ASSETS.md`, kadr w grze z `?sezon=zima`.

## Stan
| Zlecenie | Plik | Grafiki | Wysłane? | Wróciło? | Wgrane |
|---|---|---|---|---|---|
| 122 | `122-zima-warszawa-gdansk.md` | Warszawa, Kraków, Wrocław, Poznań, Gdańsk | nie | — | — |
| 123 | `123-zima-szczecin-rzeszow.md` | Szczecin, Łódź, Katowice, Lublin, Rzeszów | nie | — | — |
| 124 | `124-zima-bialystok-opole.md` | Białystok, Bydgoszcz, Olsztyn, Kielce, Opole | nie | — | — |
| 125 | `125-zima-zielona-gora-hajnowka.md` | Zielona Góra, Siemiatycze, Mońki, Bielsk Podlaski, Hajnówka | nie | — | — |
| 126 | `126-zima-sokolka-wysokie-mazowieckie.md` | Sokółka, Łomża, Grajewo, Kolno, Wysokie Mazowieckie | nie | — | — |
| 127 | `127-zima-zambrow-glogowek.md` | Zambrów, Strzelce Opolskie, Kędzierzyn-Koźle, Krapkowice, Głogówek | nie | — | — |
| 128 | `128-zima-prudnik-elk.md` | Prudnik, Olesno, Nowy Targ, Zakopane, Ełk | nie | — | — |
| 129 | `129-zima-olecko-bytow.md` | Olecko, Gołdap, Bartoszyce, Kętrzyn, Bytów | nie | — | — |
| 130 | `130-zima-slupsk-mielec.md` | Słupsk, Chojnice, Kartuzy, Stalowa Wola, Mielec | nie | — | — |
| 131 | `131-zima-jaslo-biala-podlaska.md` | Jasło, Przemyśl, Sanok, Lubaczów, Biała Podlaska | nie | — | — |
| 132 | `132-zima-zamosc-raciborz.md` | Zamość, Tomaszów Lubelski, Ostrowiec Świętokrzyski, Skarżysko-Kamienna, Racibórz | nie | — | — |
| 133 | `133-zima-walbrzych-granica-cieszyn.md` | Wałbrzych, Legnica, Berlin, Drezno, Granica (Cieszyn) | nie | — | — |
| 134 | `134-zima-granica-jedrzychowice-stacja-cieszyn.md` | Granica (Zgorzelec), Stacja przy A4, Stacja za granicą | nie | — | — |
| 135 | `135-zima-granica-swiecko-granica-olszyna.md` | Granica (Świecko), Stacja za granicą, Granica (Olszyna) | nie | — | — |
| 136 | `136-zima-ystad-stacja-olszyna.md` | Ystad, Prom przez Bałtyk, Stacja przy A18 | nie | — | — |
| 137 | `137-zima-swinoujscie-mikulov.md` | Świnoujście, Stacja przy S3, Mikulov | nie | — | — |
| 138 | `138-zima-prom-kanal-granica-kolbaskowo.md` | Prom przez kanał, Svinesund, Granica (Kołbaskowo) | nie | — | — |
| 139 | `139-zima-prom-irlandia-francja-stacja-kolbaskowo.md` | Prom do Francji, Prom przez Zatokę Fińską, Stacja przy A6 | nie | — | — |
| 140 | `140-zima-prom-fehmarn-tarvisio.md` | Prom przez Bałtyk, Rosslare, La Jonquera, Tarvisio | nie | — | — |
| 141 | `141-zima-port-helsinki-stacja-budzisko.md` | Port w Helsinkach, Granica Estonii i Łotwy, Granica Łotwy i Litwy, Granica (Budzisko), Stacja za granicą | nie | — | — |
