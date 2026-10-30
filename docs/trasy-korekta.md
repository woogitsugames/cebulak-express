# Zlecenie 42 — korekta korytarzy do Polski

**Weryfikacja: 30.10.2026.** Podstawą odległości były strony planera ADAC Maps
(z bieżącymi wariantami trasy) oraz polski planer AutoTrasa.
Publiczny endpoint OSRM nie był dostępny z narzędzia przeglądarkowego,
więc nie przypisuję mu żadnych wyników. Nie są to pomiary GPS ani stałe
niezależne od wariantu przebiegu i ruchu.

## Dwa wskazane odcinki FR / CH

| Odcinek | Na main przed zleceniem | Po zmianie | ADAC |
| --- | ---: | ---: | ---: |
| Jena → Drezno (CH) | 175 km | 175 km (bez zmiany) | 175 km |
| Mannheim → Frankfurt nad Menem (FR) | 80 km | 83 km | 83 km |

Źródła:
- [ADAC — Jena–Dresden](https://maps.adac.de/routenplaner/route-von-jena-nach-dresden)
- [ADAC — Mannheim–Frankfurt](https://maps.adac.de/routenplaner/route-von-mannheim-nach-frankfurt)

Odległości 140 km i 50 km ze zgłoszenia nie występowały już w odczytanym
`main` (commit `a31d609797de33c1958fbb8071467ac00162d09e`).

## Starty z Berlina i Monachium — przed / po

| Trasa | Przed (km) | Po (km) | Drogowo (km) | Odchylenie | Korytarz po zmianie |
| --- | ---: | ---: | ---: | ---: | --- |
| Berlin → Szczecin | 270 | 160 | 150 | +6,7% | A11 → Kołbaskowo |
| Berlin → Wrocław | 380 | 340 | 344 | −1,2% | A13/A15 → Olszyna, A18 |
| Berlin → Poznań | 310 | 280 | 274 | +2,2% | A12 → Świecko, A2 |
| Berlin → Gdańsk | 540 | 510 | 510 | 0,0% | A11 → Kołbaskowo, S6 |
| Berlin → Kraków | 660 | 600 | 597 | +0,5% | A13/A15 → Olszyna, A18/A4 |
| Monachium → Wrocław | 840 | 720 | 719 | +0,1% | A9/A72 → Drezno → Zgorzelec |
| Monachium → Kraków | 1110 | 990 | 912 | +8,6% | uproszczony szlak niemiecki; realna najkrótsza trasa przez Czechy |
| Monachium → Katowice | 1030 | 870 | 836 | +4,1% | uproszczony szlak niemiecki; realna trasa przez Czechy |
| Monachium → Rzeszów | 1280 | 1030 | 1079 | −4,5% | uproszczony szlak niemiecki; realna trasa przez Czechy |

**Odniesienia drogowe (odczyt 30.10.2026):**
- [ADAC — Berlin–Szczecin](https://maps.adac.de/routenplaner/route-von-berlin-nach-stettin)
- [ADAC — Berlin–Wrocław](https://maps.adac.de/routenplaner/route-von-berlin-nach-breslau)
- [ADAC — Berlin–Poznań](https://maps.adac.de/routenplaner/route-von-berlin-nach-posen)
- [ADAC — Berlin–Gdańsk](https://maps.adac.de/routenplaner/route-von-berlin-nach-danzig)
- [ADAC — Berlin–Kraków](https://maps.adac.de/routenplaner/route-von-berlin-nach-krakau)
- [AutoTrasa — Wrocław–Monachium](https://autotrasa.pl/trasy/wroclaw-monachium/)
- [ADAC — Monachium–Kraków](https://maps.adac.de/routenplaner/route-von-muenchen-nach-krakau)
- [ADAC — Monachium–Drezno](https://maps.adac.de/routenplaner/route-von-muenchen-nach-dresden)
- [ADAC — Norymberga–Drezno](https://maps.adac.de/routenplaner/route-von-nuernberg-nach-dresden)
- [AutoTrasa — Katowice–Monachium](https://autotrasa.pl/trasy/katowice-monachium/)
- [AutoTrasa — Rzeszów–Monachium](https://autotrasa.pl/trasy/rzeszow-monachium/)

Wartości „przed” to `makeRoute` na powyższym `main`:
od stacji Świecko / Jędrzychowice do miasta w PL liczona była odległość
Haversine × 1,2, zaokrąglana do 10 km.

## Implementacja

1. `src/content/waypoints.ts`: dwa kompletne wyjazdy z Berlina
   (przejście `border` + generyczna stacja `rest`), po A11 do Kołbaskowa
   oraz A13/A15 do Olszyny. Nowy wariant Monachium omija Jenę,
   jadąc z Norymbergi przez Bayreuth i Chemnitz do Drezna.
2. `src/core/route.ts`: `makeRoute` zachowuje punkty przed Berlinem,
   następnie porównuje całkowite km do wybranego polskiego miasta
   dla trzech przejść. Wygrywa minimalna suma km do stacji i km po Polsce.
   Mechanizm działa też przy starcie BE/NL/UK/DK oraz DE Hamburg.
3. Dla najważniejszych kierunków krajowych wprowadzono kilometraż
   szacowany według przebiegu dróg (A2, A6/S6, A18/A4);
   inne cele nadal korzystają z Haversine × 1,2.
4. Po stronie Monachium skorygowano także kilometraż do Katowic
   i Rzeszowa. Ich rzeczywiste trasy prowadzą często przez Czechy
   i są krótsze niż odtworzony w grze korytarz przez Drezno.
   Pozostawiono niemiecki wariant ilustracyjny zgodnie z możliwością
   dopuszczoną w zleceniu; **to nie jest nawigacja drogowa**.
5. Wynik jest deterministyczny; `functions/src/validation.ts` importuje
   tę samą funkcję `makeRoute`. Po wdrożeniu klient i serwer muszą być
   z tej samej wersji, ponieważ zmienia się `totalKm` używane w rankingu.

## Ograniczenia i dalsza weryfikacja

- Tabela odległości przy granicy nie obejmuje wszystkich polskich miast.
  Dla mniejszych miejscowości pozostaje szacunek 1,2 × linia prosta.
- Dla południowych wyjazdów z Monachium celowo uproszczono przebieg
  niemieckich punktów, kalibrując km do wariantów przez Czechy. W przyszłości
  można wprowadzić punkty CZ i tła, jeżeli koordynator uzna je za konieczne.
- Nie wprowadzono nowych zależności, grafik ani modyfikacji rankingu.
- Testy regresyjne: `tests/route.test.ts`, w tym dziewięć tras z referencjami,
  wybór przejścia dla innych krajów i obie wskazane poprawki DE/FR/CH.
