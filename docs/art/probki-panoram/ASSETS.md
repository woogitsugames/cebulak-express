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
