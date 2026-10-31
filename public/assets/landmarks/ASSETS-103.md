# ASSETS-103 — panoramy A+ (runda 7, poprawka)

Data: **2026-10-31**. Format obu grafik: **PNG 1620×900, RGBA, przezroczyste tło**. Pliki binarne są przekazywane do integracji w ZIP z zachowaniem ścieżek repozytorium: `public/assets/landmarks/nykoping.png`, `public/assets/landmarks/cesky-tesin.png`, `docs/art/podglady/panoramy-103.png`. Nie są jeszcze w tej gałęzi — koordynator ma dodać je z ZIP przed scaleniem.

| Plik / miasto | Widok i obiekty | Narzędzie i poprawki | Prawa |
|---|---|---|---|
| `nykoping.png` — Nyköping (Szwecja) | Wysoki brzeg Nyköpingsån widziany przez rzekę: zamek Nyköpingshus z białą wieżą Kungstornet i ciemnym dachem, ceglane skrzydła i kamienne mury, pas starych domów, drzewa i stylizowany most. Most nie jest wiernym przedstawieniem jednego istniejącego mostu w tym punkcie. | Wbudowany generator obrazów **ChatGPT GPT Image**; dopasowanie 1620×900 w Pillow. | Oryginalna generacja na zamówienie właściciela projektu, prawo do użytkowania zgodnie z warunkami OpenAI. |
| `cesky-tesin.png` — Český Těšín (Czechy) | Autorska synteza czeskiego brzegu Olzy widzianego z polskiej strony: Most Przyjaźni (most Přátelství), ochrowy ratusz 1928/1929 z charakterystycznym schodkowo-łukowym szczytem i zegarem, kościół Najświętszego Serca Jezusowego (1894) ze smukłą wieżą, kamienice, drzewa i woda. Ratusz stoi przy náměstí ČSA, nie bezpośrednio nad Olzą — układ jest skrótem kompozycyjnym. | Wbudowany generator **ChatGPT GPT Image** + poprawki **Pillow, CairoSVG**: usunięcie fantazyjnego mostu łukowego i wieży ratusza; w ich miejsce oryginalne elementy wektorowe z grubym konturem. | Oryginalna generacja i ręczny retusz na zamówienie właściciela projektu, prawo do użytkowania zgodnie z warunkami OpenAI. |

## Opis promptów

- **Nyköping:** „Ilustracja 16:9 A+, monumentalny Nyköpingshus nad Nyköpingsån, biała wieża z czterospadowym ciemnym dachem, ceglane skrzydła, kamienne mury, zieleń, most i niska zabudowa, ciepłe płaskie kolory, gruby granatowy kontur #1d2f3b, przezroczyste tło bez nieba, chmur, napisów, ludzi, flag i herbów”.
- **Český Těšín:** „Panorama A+ czeskiego brzegu Olzy, betonowy Most Přátelství, ratusz z charakterystycznym schodkowym szczytem i zegarem, wysoka iglica neogotyckiego kościoła Božského Srdce Páně, nabrzeże, kamienice i drzewa. Gruby kontur #1d2f3b, światło z lewej góry, ciepłe barwy, PNG z przezroczystością, bez tekstów i symboli”. To opisowy brief — wewnętrzny surowy prompt generatora nie jest udostępniany.

## Sprawdzone źródła (referencje architektoniczne; zdjęć nie odrysowano ani nie użyto w plikach)

- Zamek i wieża Kungstornet — Nyköpingsguiden: https://www.nykopingsguiden.se/se-och-gora/nykopingshus/
- Lokalizacja zamku nad Nyköpingsån — Nyköpings kommun: https://www.nykoping.se/contentassets/01d21b5ca23340dbaede14bd21f395cc/kulturhistoriska-omradesbeskrivningar-nykopings-tatort.-kmv-forum.-2019..pdf
- Ratusz Český Těšín, szczyt i daty — https://www.archives.cz/web/soka/karvina/projekt/resources/karvina/Mestska_radnice_v_Ceskem_Tesine.pdf
- Kościół z 1894 r. — https://www.archmap.cz/cs/objekt/28659
- Mosty na Olzie — https://moravskoslezsky.kraj.cz/encyklopedie/objekty1.phtml?id=112054
- Most Přátelství i czeskie nabrzeże — https://olza.pl/cz/turystyka/produkty-i-atrakcje/inne

## Kontrola jakości i integracja

Każda panorama jest osobnym PNG 1620×900 RGBA z przezroczystym niebem; w plikach brak tekstów, logo, flag i godeł. Arkusz kontrolny `docs/art/podglady/panoramy-103.png` pokazuje obie grafiki na błękitnym tle z podpisami. Wierność przestrzenna: obiekty są stylizowaną syntezą panoramy, zwłaszcza ratusz nie jest w rzeczywistym położeniu tuż nad Olzą; wymaga to oceny przez koordynatora przy odbiorze. **Przed scaleniem**: koordynator wgrywa pliki binarne z ZIP, sprawdza scenę w 1/5 skali i uruchamia `npm ci && npm run typecheck && npm test && npm run build`. Tych testów nie uruchomiono, ponieważ lokalne `git clone` nie mogło połączyć się z GitHub.
