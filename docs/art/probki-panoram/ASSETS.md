# Zlecenie 68 — próbki panoram miast: Antwerpia i Bruksela

**Data:** 2026-10-30  
**Wymiary i format każdego wariantu:** 1620 × 900 px, PNG, RGBA / przezroczyste niebo.  
**Status:** próbki do oceny kierunku wizualnego; **nie** zastępują istniejących `public/assets/landmarks/*.png`.  
**Autor i narzędzia:** ChatGPT — natywny generator obrazów (GPT Image / DALL·E), następnie autorskie korekty kompozycyjne w Pythonie (Pillow, OpenCV), bez fotografii pobranych z internetu.

## Licencja i pochodzenie

Grafiki zostały wygenerowane na potrzeby właściciela projektu i są przeznaczone do używania, modyfikowania i publikowania przez właściciela w ramach warunków usług OpenAI. **Nie jest to gwarancja wyłącznych praw autorskich do treści wygenerowanych przez AI** — kwalifikacja podlega właściwemu prawu. Obce fotografie oglądano **wyłącznie jako referencje architektoniczne**, nie kopiowano ich pikseli ani nie dołączano do pakietu. Nie użyto zasobów z rozpoznawalnymi markami, flagami, logotypami ani osobami.

## Rejestr

| Plik | Narzędzie, data | Prompt zadaniowy i wyjście bazowe | Licencja / ręczne poprawki |
|---|---|---|---|
| `antwerpia-A-rysunkowa.png` | ChatGPT GPT Image, Pillow; 2026-10-30 | **G1:** „Szeroka wycięta ilustracja Antwerpii od Linkeroever; grube granatowe kontury i ciepłe pastele; katedra, Het Steen, MAS, port; tło przezroczyste, światło z lewej”. Wygenerowane jako samodzielna panorama (`gen_id: a1192a66-0843-42a8-b1e4-dfda5646cf0c`). | Do dyspozycji właściciela; dostosowano proporcje do 1620 × 900, ustalono linię gruntu. |
| `antwerpia-B-stylizowana.png` | ChatGPT GPT Image, OpenCV, Pillow; 2026-10-30 | **G2:** „Plansza porównująca Antwerpia/Bruksela i style A: rysunkowy, B: foto-stylizowany, C: foto na tle gry; katedra, Het Steen, MAS, dworzec, dźwigi; bez logo i osób”. Wyodrębniono panel **Antwerpia B** (`gen_id: d3e8b4cf-6d51-4302-9a0f-d5ae677872ef`). | Do dyspozycji właściciela; usunięto niebo, wtopione podpisy, drogę i auto; ocieplono paletę. |
| `antwerpia-C-foto.png` | ChatGPT GPT Image, OpenCV, Pillow; 2026-10-30 | **G2** — panel **Antwerpia C**. | Do dyspozycji właściciela; wycięto tło, auto, podpisy, zachowano bardziej fotograficzny detal. |
| `bruksela-A-rysunkowa.png` | ChatGPT GPT Image, OpenCV, Pillow; 2026-10-30 | **G2** — panel **Bruksela A** z ratuszem, bazyliką i dzielnicą północną. | Do dyspozycji właściciela; **usunięto Atomium**, odtworzono w odrębnej warstwie biurowce północne, usunięto niebo i teksty. |
| `bruksela-B-stylizowana.png` | ChatGPT GPT Image, OpenCV, Pillow; 2026-10-30 | **G2** — panel **Bruksela B**. | Do dyspozycji właściciela; **usunięto Atomium**, dodano uproszczoną, materiałową sylwetkę biurowców; tło alfa. |
| `bruksela-C-foto.png` | ChatGPT GPT Image, OpenCV, Pillow; 2026-10-30 | **G2** — panel **Bruksela C**. | Do dyspozycji właściciela; **usunięto Atomium**, uzupełniono fotograficznie stylizowaną dzielnicę północną; tło alfa. |
| `antwerpia-porownanie.png` | Python, Pillow; 2026-10-30 | Trzy warianty na makiecie sceny gry — 3240 × 2140 px. | Do dyspozycji właściciela; **wersja z makietowym tłem**, ponieważ checkout repo był niedostępny w środowisku wykonawczym. |
| `bruksela-porownanie.png` | Python, Pillow; 2026-10-30 | Trzy warianty na makiecie sceny gry — 3240 × 2140 px. | Do dyspozycji właściciela; **wersja z makietowym tłem**; nie użyto Atomium. |
| `tools/art/probki-panoram.py` | Własny skrypt Python/Pillow; 2026-10-30 | Dokładny składacz porównań po checkoutcie repo, wykorzystuje oryginalne BE sky/clouds/far/near/road i sprite kombi. | Kod własny projektu; bez kopiowania gotowej grafiki. |

**Uwaga dotycząca promptów:** G1 i G2 są opisami poleceń użytych do kierowania natywnym generatorem. Wyjścia bazowe mają wymienione identyfikatory generacji; generator nie udostępnił pełnego technicznego promptu. Panel G2 służył tylko jako materiał źródłowy do wyciętych próbek; zintegrowane etykiety i tła nie trafiły do zasobów finalnych.

## Rozpoznawalne obiekty i geografia

- **Antwerpia:** wysoka wieża katedry NMP, Het Steen, czerwony blok MAS, dachy starego miasta i dźwigi portowe; w wariancie A również stylizowana kopuła przypominająca Antwerpia-Centralna. Orientacja inspirowana widokiem z Linkeroever w kierunku prawego brzegu Skaldy. **Nie jest to odwzorowanie z jednego obiektywu:** kopuła dworca leży w głębi zabudowy i nie powinna być przedstawiana jako widoczna wprost nad nabrzeżem w geograficznie wiernym widoku.
- **Bruksela:** gotycka wieża ratusza, sylweta Bazyliki Koekelberg, skupisko biurowców dzielnicy północnej oraz szeregi fasad centrum. Referencją dla zbioru dominant jest widok z okolic dzielnicy administracyjnej (Administratief Centrum / Cité administrative). **To stylizowane zestawienie, nie kalibrowany fotomontaż**.
- **Atomium:** nie występuje w żadnym wyjściowym pliku z tego pakietu. Choć opis miasta w zleceniu wymienia obiekt, późniejsza twarda reguła dokumentu go zakazuje, więc pierwszeństwo przyznano zakazowi. Żadnej flagi UE ani państwowej.

Źródła referencyjne (tylko research, **nie** źródła pikseli): [MAS — widoki Antwerpii](https://mas.be/nl/node/475), [visit.brussels — best views](https://www.visit.brussels/en/visitors/what-to-do/the-best-views-in-brussels).

## Jak złożyć porównania z oryginalnymi tłami gry

Po skopiowaniu folderu do pełnego checkoutu repo `woogitsugames/cebulak-express`:

```bash
python3 -m pip install Pillow
python3 tools/art/probki-panoram.py
```

Skrypt domyślnie **wymaga** realnych warstw `public/assets/countries/be/` oraz oryginalnych sprite'ów `public/assets/hero/`. W razie braku któregoś pliku zgłasza błąd zamiast podszywać się pod oryginalną scenę. Uruchomienie z `--fallback` tworzy poglądową makietę na wypadek niedostępnego checkoutu. Podglądy dostarczone w niniejszym pakiecie utworzono właśnie z `--fallback`; przed decyzją o wdrożeniu **należy je ponownie wygenerować bez tego przełącznika**.

### Ograniczenia i kontrola jakości

1. B i C pochodzą z arkusza porównawczego generatora, więc ich **detal jest niższy**, a różnice stylów mniejsze niż w przypadku osobnych generacji pełnej rozdzielczości. To próbki do decyzji artystycznej, nie gotowe finalne panoramy produkcyjne.
2. Modele obrazowe nie zapewniają pomiarowo dokładnego rozmieszczenia budynków. Przed produkcją kompletu ~50 miast należy wybrać między **ścisłą geograficzną zgodnością** (wówczas pomijać niedostrzegalne obiekty) a rozpoznawalnym **montażem najważniejszych symboli**.
3. Testowano lokalnie poprawny wymiar 1620 × 900 oraz przezroczystość sześciu plików. Nie testowano odbioru przez mieszkańców miast ani oryginalnej sceny Canvas 2D w działającej grze.
4. Nie podmieniono istniejących plików `public/assets/landmarks`.
# Zlecenie 69 - próbki panoram: Düsseldorf i Amsterdam

Data przygotowania: **2026-10-30**. Repozytorium docelowe: `woogitsugames/cebulak-express`.

## Przeznaczenie i format

6 autorskich, generowanych przez AI próbek koncepcyjnych (A/B/C), 2 porównania oraz skrypt Pillow. Każda próbka: **1620 x 900 px, RGBA/sRGB, przezroczyste niebo, podstawa przy dolnej krawędzi**. Bez osadzonych napisów, reklam, logotypów i rozpoznawalnych osób. Próbki nie zastępują obecnych plików w `public/assets/landmarks/`.

**Prawa użycia:** grafika wygenerowana za pomocą ChatGPT/GPT Image na potrzeby właściciela projektu; właściciel może wykorzystywać i modyfikować otrzymane wyniki zgodnie z warunkami OpenAI. Materiał nie zawiera zapożyczonych zdjęć. Nie stanowi gwarancji wyłącznych praw autorskich do wszystkich elementów w każdej jurysdykcji.

## Ewidencja zasobów

| Plik | Źródło/narzędzie | Licencja/prawa | Autor/uwagi |
|---|---|---|---|
| `dusseldorf-A-rysunkowa.png` | GPT Image, Pillow, 2026-10-30 | Grafika generowana AI, prawa użycia właściciela projektu | Wariant A; kontury, ciepłe kolory, panoramowanie i dopasowanie do 1620x900; prompt DUS-A |
| `dusseldorf-B-stylizowana.png` | GPT Image, Pillow, 2026-10-30 | Jak wyżej | Wariant B; bardziej malarski, wygładzone barwy, prompt DUS-B |
| `dusseldorf-C-foto.png` | GPT Image, Pillow, 2026-10-30 | Jak wyżej | Wariant C; fotorealistyczny, prompt DUS-C; całkowicie wygenerowany, nie pochodzi ze zdjęcia |
| `amsterdam-A-rysunkowa.png` | GPT Image, OpenCV/Pillow, 2026-10-30 | Jak wyżej | Wariant A; usunięcie sztucznego tła-szachownicy (połączone neutralne piksele); prompt AMS-A |
| `amsterdam-B-stylizowana.png` | GPT Image, kadrowanie planszy porównawczej, Pillow, 2026-10-30 | Jak wyżej | Wariant B; wyodrębniony z wielowariantowej planszy AI, usunięte napisy i niebo, przeskalowany, prompt AMS-ABC |
| `amsterdam-C-foto.png` | GPT Image, kadrowanie planszy porównawczej, Pillow, 2026-10-30 | Jak wyżej | Wariant C; analogicznie; mniejsza rozdzielczość źródłowa niż A, prompt AMS-ABC |
| `dusseldorf-porownanie.png` | Python/Pillow, `tools/art/probki-panoram.py` | Autorskie zestawienie projektu | Trzy próbki na podkładzie krajobraz/droga/kombi |
| `amsterdam-porownanie.png` | Python/Pillow, `tools/art/probki-panoram.py` | Autorskie zestawienie projektu | Trzy próbki na podkładzie krajobraz/droga/kombi |
| `tools/art/probki-panoram.py` | Python/Pillow | Kod autorski projektu | Skrypt do składania porównań i sprawdzania PNG; przy uruchomieniu w repo automatycznie wczytuje oryginalne warstwy DE/NL i sprite'y auta |

## Prompty użyte do generowania (opis redakcyjny)

- **DUS-A**: "Düsseldorf Rhein skyline, Oberkassel opposite bank, cable-stayed bridge on the left, Altstadt church spires and round Schlossturm, Rheinturm at centre, Gehry Neuer Zollhof/media harbour on the right, warmly lit daylight, cartoon vector game aesthetic, bold dark-navy contours, pastel flat colours, transparent sky, continuous quay at bottom, no logos, no people, no readable text".
- **DUS-B**: "The same Düsseldorf Rhine skyline and landmark arrangement; semi-realistic stylized painting with subdued outlines, crisp architectural forms, smoothed textures, left-upper sunlight; no sky, no text, true transparent cutout".
- **DUS-C**: "Photorealistic Düsseldorf skyline from the opposite Rhine bank with cable bridge, historic riverside, Rheinturm, Gehry MedienHafen, riverboats and water reflections, bright daylight, photo-accurate materials, no people, no sky, clean transparent PNG cutout".
- **AMS-A**: "Amsterdam narrow canal houses, closely packed lean gabled facades with stepped and bell-shaped rooflines, a brick arch bridge and parked bicycles, canal boats and water, Amsterdam Centraal in the far right background, bright flat cartoon-vector game style with dark outlines, light from upper left, no sky, no people, family friendly".
- **AMS-ABC**: "Amsterdam canal waterfront and Central Station from the Damrak/Oudebrugsteeg area, three increasingly realistic renderings of the same group of narrow, close-packed gabled canal houses, small stone bridge with bicycles, boats, distant Centraal; A vector; B painterly stylization; C photorealistic; cutout skyline, no logos, no people". **B i C wycięto z wygenerowanej planszy; nie są to dwa oddzielne zdjęcia.**

## Punkty widokowe i rozpoznawalność

**Düsseldorf**: perspektywa z lewego/zachodniego brzegu Renu (Oberkassel) w stronę miejskiego brzegu: most Oberkasseler Brücke, zabudowa Altstadt, okrągła wieża Schlossturm jako motyw, Rheinturm, trzy pofalowane bryły Neuer Zollhof w MedienHafen. Krajobraz celowo skondensowany na potrzeby gry; nie jest geodezyjnie wiernym panoramowaniem jednego zdjęcia.

**Amsterdam**: inspiracja spojrzeniem w rejonie Damrak/Oudebrugsteeg ku Amsterdam Centraal; wąskie kamienice nad kanałem, szczyty schodkowe/dzwonowe, niewielki most z rowerami, łodzie i czerwono-ceglana stacja w tle. Scena jest stylizowanym montażem motywów miejskich, a nie udokumentowanym zestawem budynków w jednej dokładnej osi widokowej.

Research wyglądu wyłącznie jako materiał odniesienia; **bez kopiowania fotografii**:

- https://www.duesseldorf.de/int/tourism/discover/rheinturm
- https://www.duesseldorf.de/int/tourism/discover/media-harbour
- https://www.solosophie.com/damrak-canal-houses-dancing-gingerbread/

## Regeneracja porównań

W korzeniu repo:

```sh
python -m pip install Pillow
python tools/art/probki-panoram.py --check --strict
```

`--strict` wymaga prawdziwych assetów `public/assets/countries/{de,nl}/` (nie są one kopiowane do tego folderu) i renderuje je z pozycjonowaniem poglądowym. Uruchomienie na samym ZIP-ie (bez sklonowanego repo) wykorzystuje awaryjne, rysowane tło. To **wizualizacja podglądowa, nie zrzut z silnika gry**, a pierwotne pliki podglądów w dostarczonym ZIP wykonano w trybie awaryjnym.

## Kontrola jakości i ograniczenia

- Weryfikacja Pillow: **6/6** plików ma 1620x900 px, RGBA i rzeczywisty kanał alfa (przezroczystość górnej krawędzi, widoczny pas gruntu/wody na dole).
- Wizualnie sprawdzono wszystkie sześć na błękitnym tle oraz dwa porównania.
- Amsterdam B i C to powiększone wycinki obrazu źródłowego, **nie są materiałem produkcyjnym** bez dalszej regeneracji w pełnej rozdzielczości. B/C są wystarczające do wstępnego porównania stylu.
- Modele obrazu nie gwarantują architektonicznej wierności rzeczywistym rzutom i proporcjom; wymagana jest **weryfikacja lokalna przez mieszkańców** przed produkcją około 50 panoram.
- `npm ci`, `npm run typecheck`, `npm test`, `npm run build` nie zostały wykonane, ponieważ nie dało się sklonować repo z kontenera (brak DNS/sieci). PR pozostaje szkicem.
