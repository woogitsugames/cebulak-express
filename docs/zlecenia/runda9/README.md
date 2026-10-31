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
**31.10 wieczorem:** wróciło wszystkie 20 paczek; wgrano 92 z 100 plików. 13 nowych letnich grafik przy drodze jest prostszych niż panoramy A+, ale wyraźnie lepszych od starych (gruby kontur, więcej detalu) — przyjęte. Odrzucone 8 zimowych panoram (białe kreski przez fasady, szew tła) → poprawki **142** (Warszawa, Kraków, Wrocław, Poznań, Gdańsk) i **143** (Nowy Targ, Zakopane, Tomaszów Lubelski).

| Zlecenie | Plik | Grafiki | Wysłane? | Wróciło? | Wgrane |
|---|---|---|---|---|---|
| 122 | `122-zima-warszawa-gdansk.md` | Warszawa, Kraków, Wrocław, Poznań, Gdańsk | tak | tak (31.10) | **odrzucone 5/5** → 142 |
| 123 | `123-zima-szczecin-rzeszow.md` | Szczecin, Łódź, Katowice, Lublin, Rzeszów | tak | tak (31.10) | tak |
| 124 | `124-zima-bialystok-opole.md` | Białystok, Bydgoszcz, Olsztyn, Kielce, Opole | tak | tak (31.10) | tak |
| 125 | `125-zima-zielona-gora-hajnowka.md` | Zielona Góra, Siemiatycze, Mońki, Bielsk Podlaski, Hajnówka | tak | tak (31.10) | tak |
| 126 | `126-zima-sokolka-wysokie-mazowieckie.md` | Sokółka, Łomża, Grajewo, Kolno, Wysokie Mazowieckie | tak | tak (31.10) | tak |
| 127 | `127-zima-zambrow-glogowek.md` | Zambrów, Strzelce Opolskie, Kędzierzyn-Koźle, Krapkowice, Głogówek | tak | tak (31.10) | tak |
| 128 | `128-zima-prudnik-elk.md` | Prudnik, Olesno, Nowy Targ, Zakopane, Ełk | tak | tak (31.10) | 3/5 (Nowy Targ, Zakopane → 143) |
| 129 | `129-zima-olecko-bytow.md` | Olecko, Gołdap, Bartoszyce, Kętrzyn, Bytów | tak | tak (31.10) | tak |
| 130 | `130-zima-slupsk-mielec.md` | Słupsk, Chojnice, Kartuzy, Stalowa Wola, Mielec | tak | tak (31.10) | tak |
| 131 | `131-zima-jaslo-biala-podlaska.md` | Jasło, Przemyśl, Sanok, Lubaczów, Biała Podlaska | tak | tak (31.10) | tak |
| 132 | `132-zima-zamosc-raciborz.md` | Zamość, Tomaszów Lubelski, Ostrowiec Świętokrzyski, Skarżysko-Kamienna, Racibórz | tak | tak (31.10) | 4/5 (Tomaszów Lubelski → 143) |
| 133 | `133-zima-walbrzych-granica-cieszyn.md` | Wałbrzych, Legnica, Berlin, Drezno, Granica (Cieszyn) | tak | tak (31.10) | tak |
| 134 | `134-zima-granica-jedrzychowice-stacja-cieszyn.md` | Granica (Zgorzelec), Stacja przy A4, Stacja za granicą | tak | tak (31.10) | tak |
| 135 | `135-zima-granica-swiecko-granica-olszyna.md` | Granica (Świecko), Stacja za granicą, Granica (Olszyna) | tak | tak (31.10) | tak |
| 136 | `136-zima-ystad-stacja-olszyna.md` | Ystad, Prom przez Bałtyk, Stacja przy A18 | tak | tak (31.10) | tak |
| 137 | `137-zima-swinoujscie-mikulov.md` | Świnoujście, Stacja przy S3, Mikulov | tak | tak (31.10) | tak |
| 138 | `138-zima-prom-kanal-granica-kolbaskowo.md` | Prom przez kanał, Svinesund, Granica (Kołbaskowo) | tak | tak (31.10) | tak |
| 139 | `139-zima-prom-irlandia-francja-stacja-kolbaskowo.md` | Prom do Francji, Prom przez Zatokę Fińską, Stacja przy A6 | tak | tak (31.10) | tak |
| 140 | `140-zima-prom-fehmarn-tarvisio.md` | Prom przez Bałtyk, Rosslare, La Jonquera, Tarvisio | tak | tak (31.10) | tak |
| 141 | `141-zima-port-helsinki-stacja-budzisko.md` | Port w Helsinkach, Granica Estonii i Łotwy, Granica Łotwy i Litwy, Granica (Budzisko), Stacja za granicą | tak | tak (31.10) | 5/5 (tablica LV–LT nadal ucięta) |
| 142 | `142-zima-poprawka-warszawa-gdansk.md` | poprawka: Warszawa, Kraków, Wrocław, Poznań, Gdańsk | nie | — | — |
| 143 | `143-zima-poprawka-nowy-targ-tomaszow-lubelski.md` | poprawka: Nowy Targ, Zakopane, Tomaszów Lubelski | nie | — | — |
