# Zlecenie 97 — panoramy A+ (Karlsruhe, Trewir, Koblencja, Brno, Ołomuniec)

**Data:** 2026-10-31. **Narzędzie:** natywny generator obrazów ChatGPT (GPT Image) + ręczne kadrowanie, wycinanie, powiększenie i kontrola przezroczystości (Pillow).

**Format:** pięć plików PNG RGBA 1620 × 900 px, niebo przezroczyste, główne sylwetki zajmują około 78–79% wysokości, obrys ciemnogranatowy zbliżony do `#1d2f3b`. Bez ludzi na pierwszym planie, szyldów, logotypów, flag i tekstu.

**Prawa/licencja:** obrazy syntetyczne wygenerowane na potrzeby i do komercyjnego wykorzystania przez właściciela projektu Cebulak Express; nie zawierają wklejonych cudzych zdjęć. Zakres ewentualnej ochrony prawnoautorskiej wynika z prawa właściwego, a nie z samego użycia AI.

| Plik (id) | Miasto | Budowle i punkt widzenia | Prompt semantyczny / poprawki |
| --- | --- | --- | --- |
| `karlsruhe.png` | Karlsruhe, Niemcy | Schloss Karlsruhe: centralna wieża, skrzydła barokowego pałacu i aleje Schlossplatz, widok frontalny z południa | „Pałac Karlsruhe, ciepły płaski wektor, zieleń, gruby ciemnogranatowy kontur, bez nieba, ludzi i napisów”; docinanie i wzmocnienie obrysu |
| `trier.png` | Trewir, Niemcy | Porta Nigra i przylegające zabudowania Simeonstift, widok od południa z rejonu Porta-Nigra-Platz | „Wielka ciemna brama rzymska, uproszczone łuki, kamienice, płaski rysunek na alfie”; docinanie i wzmocnienie obrysu |
| `koblenz.png` | Koblencja, Niemcy | Deutsches Eck z pomnikiem konnym, historyczne wieże bazyliki św. Kastora i twierdza Ehrenbreitstein na przeciwległym wzgórzu; panorama z nadreńskiej promenady ku północy i wschodowi | „Deutsches Eck na lewo, zalesione wzgórze i twierdza na prawo, woda w dole, ciepły wektor bez nieba”; kontur i skala |
| `brno.png` | Brno, Czechy | Dwie charakterystyczne wieże katedry Petrov, historyczna zabudowa poniżej i generyczny czerwono-biały tramwaj; oglądane od południa w kierunku centrum | „Sylwetka katedry Petrov na wzgórzu, niskie kamienice i tramwaj, przezroczysta płaska panorama”; wyodrębnienie z wygenerowanego arkusza, usunięcie etykiety, skalowanie, kontur |
| `olomouc.png` | Ołomuniec, Czechy | Ratusz z wieżą, Kolumna Trójcy Świętej i otaczające kamienice Horní náměstí; widok z przeciwnej części rynku | „Ratusz i Kolumna Trójcy Świętej na Placu Górnym, barokowe kamienice, płaska kolorowa panorama”; wyodrębnienie z wygenerowanego arkusza, usunięcie etykiety, skalowanie, kontur |

Źródła referencyjne identyfikujące obiekty (bez kopiowania zdjęć):
- Karlsruhe: https://www.karlsruhe-erleben.de/
- Trewir: https://www.trier-info.de/en/places-of-interest/porta-nigra/
- Koblencja: https://www.germany.travel/en/cities-culture/koblenz.html
- Brno: https://upmb.brno.cz/wp-content/uploads/2022/06/03_Mesto.pdf
- Ołomuniec: https://whc.unesco.org/en/list/859/ oraz https://www.visitczechia.com/en-us/things-to-do/places/landmarks/urban-architecture/c-olomouc-city-hall

Most rzymski w Trewirze świadomie pominięto — Porta Nigra i most nie tworzą wiarygodnego bliskiego widoku z jednej perspektywy. Brneńska zabudowa wzgórza jest artystycznym uproszczeniem, nie rekonstrukcją wiernopomiarową Špilberka.

**Arkusz podglądu:** `docs/art/podglady/panoramy-97.png`. Rozmieszczone na niebieskim tle wyłącznie na arkuszu; panoramy mają przezroczystość. **Dokładnie pięć finalnych PNG i pełny plik ASSETS-97.md** dostępne także w paczce ZIP przekazanej właścicielowi z zachowaniem ścieżek repozytorium.

## Integracja
Podmienić pliki o tych samych nazwach w `public/assets/landmarks` na gałęzi PR, bez zmian w API. Skontrolować sylwetki w kadrze gry. Automatyczne testy i build nie zostały uruchomione w środowisku generującym zasoby — nie było możliwości wykonania `git clone`/`npm ci`.
