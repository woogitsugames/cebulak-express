# [69] Próbki panoram miast w 3 stylach: Düsseldorf i Amsterdam

## Zakres

Przygotowano sześć próbek PNG 1620×900 RGBA z przezroczystym niebem, dwa porównania na podkładzie gry, katalog ASSETS.md i skrypt Pillow do walidacji oraz odtwarzania porównań.

**Status gałęzi:** ten szkic PR zawiera na razie opis. Pliki PNG, pełne ASSETS.md i skrypt udostępniono w ZIP `zlecenie-69-probki-panoram-de-nl.zip` w rozmowie ChatGPT. Nie zostały umieszczone na GitHub, ponieważ kontener nie posiada dostępu sieciowego, a dostępne narzędzia GitHub nie przekazują lokalnych plików binarnych. Koordynator powinien dodać pliki ZIP na tę gałąź przed scaleniem.

## Widoki i budynki

- **Düsseldorf**: perspektywa z lewego brzegu Renu (Oberkassel). Wizerunek obejmuje most Oberkasseler Brücke, Altstadt i motyw Schlossturm, Rheinturm, pofalowane budynki Neuer Zollhof w MedienHafen. Scena jest kompozycją kondensującą motywy miasta, a nie geodezyjnie wiernym odtworzeniem jednej fotografii.
- **Amsterdam**: inspiracja okolicami Damrak/Oudebrugsteeg ku Amsterdam Centraal. Wąskie, ciasno zestawione kamienice ze szczytami schodkowymi i dzwonowymi, most z rowerami, łodzie i Dworzec Centralny w tle. Bez motywów dla dorosłych. Widok jest koncepcyjny, nie jest w pełni zweryfikowaną osią widokową.

## Rekomendacja

**Styl A (rysunkowy)** — najpełniej współgra z wektorową oprawą gry, grubymi konturami i ciepłą paletą. Styl B jest alternatywą o wyższym realizmie. Styl C odróżnia się zbyt mocno od pozostałych warstw gry. Przed seryjną produkcją warto przetestować rozpoznawalność u mieszkańców obu miast.

## Weryfikacja

Po zaimportowaniu ZIP do repo:
```sh
python -m pip install Pillow
python tools/art/probki-panoram.py --check --strict
npm ci
npm run typecheck
npm test
npm run build
```

Lokalnie sprawdzono 6 PNG (1620×900, RGBA z rzeczywistym kanałem alpha), oba porównania, składanie skryptem i kompilację Pythona. Testy npm **nie zostały uruchomione** (brak klonu repo/połączenia sieciowego). Porównania w ZIP pokazują podkład zastępczy; uruchomienie skryptu w repo korzysta z rzeczywistych assetów krajów i kombi.

## Lista plików w ZIP

- `docs/art/probki-panoram/{dusseldorf,amsterdam}-{A-rysunkowa,B-stylizowana,C-foto}.png` (6)
- `docs/art/probki-panoram/{dusseldorf,amsterdam}-porownanie.png` (2)
- `docs/art/probki-panoram/ASSETS.md`
- `docs/art/probki-panoram/PR-OPIS.md`
- `tools/art/probki-panoram.py`

## Podglądy po wgraniu PNG

![Düsseldorf - porównanie](../blob/zlecenie/69-probki-panoram-de-nl/docs/art/probki-panoram/dusseldorf-porownanie.png)

![Amsterdam - porównanie](../blob/zlecenie/69-probki-panoram-de-nl/docs/art/probki-panoram/amsterdam-porownanie.png)

## Pytania do koordynatora

1. Czy liczy się geograficzna wierność pojedynczej panoramy, czy rozpoznawalność zestawu symboli miasta?
2. Czy seria powinna powstawać w stylu A po konsultacji z mieszkańcami?
3. Amsterdam B/C są powiększone z planszy AI — po decyzji o stylu konieczne będzie wygenerowanie ich w pełnej rozdzielczości.
