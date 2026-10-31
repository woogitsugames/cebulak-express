# ASSETS-94 — panoramy A+ (31.10.2026)

**Projekt:** Cebulak Express — Kierunek Polska. **Pliki produkcyjne:** PNG 1620×900, RGBA z przezroczystością, sRGB, ciemnogranatowy kontur `#1d2f3b`, linia gruntu na dole. Wszystkie grafiki wyprodukowane w ChatGPT (GPT Image) i skorygowane przy użyciu Pillow/OpenCV; dodatkowo ręczna ilustracja wieży ciśnień Forst.

| Plik / miasto | Obiekty | Perspektywa | Narzędzie | Licencja |
|---|---|---|---|---|
| `mulhouse.png` — Mulhouse, FR | Hôtel de Ville, Temple Saint-Étienne, pierzeje Place de la Réunion | Stylizowany widok z placu; ratusz po lewej, wysoka wieża świątyni po prawej | GPT Image (samodzielna panorama), Pillow/OpenCV | Grafika AI na potrzeby właściciela projektu |
| `akwizgran.png` — Aachen, DE | Katedra z ośmioboczną kopułą, historyczna brama inspirowana Ponttor, zabudowa starego miasta | Syntetyczny widok centrum; katedra lewa, brama prawa; **nie jest jednym fotograficznym punktem widzenia** | GPT Image (plansza), Pillow/OpenCV | Jak wyżej |
| `dusseldorf.png` — Düsseldorf, DE | Rheinturm, wieża historycznej świątyni, zabudowa nabrzeża, Rheinkniebrücke | Umowny widok z Oberkassel ku Altstadt; budynki po lewej, wieża i most dalej na prawo | GPT Image (plansza), Pillow/OpenCV | Jak wyżej |
| `cottbus.png` — Cottbus, DE | Ceglany Spremberger Turm, Oberkirche St. Nikolai, stare kamienice, zieleń | Od strony południowej w stronę Altstadt, wieża z zegarem po lewej | GPT Image (plansza), Pillow/OpenCV | Jak wyżej |
| `forst.png` — Forst (Lausitz), DE | Stadtkirche St. Nikolai, historyczny Forster Wasserturm, stylizowany most i Nysa Łużycka | **Syntetyczne zestawienie** elementów nadrzecznych, nie ścisły widok z jednego punktu | GPT Image (plansza) + ręczny wektor wieży, Pillow/OpenCV | Jak wyżej |

**Podgląd:** `docs/art/podglady/panoramy-94.png` — wszystkie pięć panoram na jasnoniebieskim tle z podpisami (same sprite'y bez podpisów).

## Prompt / instrukcja koncepcyjna

*Flat warm-colored horizontal 2D city game panorama, bold dark navy outlines, 2–4 large iconic buildings, simple rectangular windows, soft block-shadows, sun from upper left, transparent sky, baseline at bottom, no logos, flags, texts, people or copied photographs. Individual city landmarks verified from official tourism and city sources.*

Kontekst lokalizacji: Mulhouse — renesansowy ratusz i Temple Saint-Étienne; Aachen — katedra, Ponttor; Düsseldorf — Rheinturm, promenade, most; Cottbus — Spremberger Turm, Oberkirche; Forst — St. Nikolai, Wasserturm, Nysa. Faktyczne pole `prompt` w metadanych narzędzia było puste (generator przejął instrukcje z kontekstu rozmowy i zlecenia). Mulhouse powstał jako samodzielny obraz; pozostałe miasta wycięto z wygenerowanej planszy i powiększono; Forst uzupełniono autorskim rysunkiem wieży.

## Podstawy weryfikacji

- [Mulhouse: centrum historyczne](https://www.tourisme-mulhouse.com/experiences/centre-historique/) i [Saint-Étienne](https://www.tourisme-mulhouse.com/offres/temple-saint-etienne-mulhouse-fr-3839613/)
- [Akwizgran: Katschhof](https://charlie.aachen-tourismus.de/en/poi/katschhof) i [Ponttor](https://www.aachen-tourismus.de/aachen-entdecken/details/poi/ponttor/)
- [Düsseldorf: Rheinturm](https://www.duesseldorf.de/int/tourism/discover/rheinturm) i [Stare Miasto](https://www.duesseldorf.de/int/tourism/discover/old-town)
- [Cottbus: panorama](https://cottbus-tourismus.de/de/sommer/cottbus-entdecken/cottbus-von-oben.html) i [Oberkirche](https://cottbus-tourismus.de/de/winter/cottbus-besonders/winter-in-cottbus/sehenswuerdigkeiten-in-cottbus/artikel-oberkirche-st-nikolai-cottbus.html)
- [Forst: wieża ciśnień](https://www.forst-lausitz.de/forster-wasserturm.128510.htm) i [St. Nikolai](https://forst-stadtentwicklung.de/stadtkirche-st-nikolai/)

**Uwaga prawna:** grafiki nie zawierają skopiowanych fotografii. Wykorzystanie materiałów AI zgodnie z warunkami OpenAI; wyłączność prawnoautorska nie jest gwarantowana. Rheinturm to budowla współczesna; koordynator powinien potwierdzić możliwość wykorzystania sylwetki zgodnie z lokalnymi przepisami o swobodzie panoramy.

## Stan integracji i QA

5 plików PNG + arkusz podglądu dostarczono właścicielowi jako ZIP ze ścieżkami repo. **Binaria nie zostały przesłane do gałęzi przez GitHub API** i wymagają importu z ZIP przed scałeniem draft PR. Lokalnie sprawdzono format, rozdzielczość, przezroczystość i sRGB; przeprowadzono wizualną kontrolę w skali ~324×180. Nie uruchomiono `npm ci`, `npm run typecheck`, `npm test`, `npm run build` (brak lokalnego checkoutu repo: klonowanie z kontenera blokuje DNS). Koordynator powinien wykonać te testy i ocenić panoramy w kadrze gry.

**Pytania do koordynatora:** Czy dopuszczalna jest kompresja przestrzenna zabytków w Akwizgranie i Forst? Czy po sprawdzeniu miniatur zaakceptować stylizację Ponttor i wodnego mostu Forst? Czy potwierdzono podstawę prawną komercyjnego użycia sylwetki Rheinturm?
