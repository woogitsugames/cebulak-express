# DE — panoramy punktów trasy

Dokładnie **21 unikalnych identyfikatorów `country: 'DE'`** z `src/content/waypoints.ts` na gałęzi `main` w dniu 30.10.2026. Panoramy w stylu ilustracyjnym (mocny kontur, jasne ciepłe barwy, charakterystyczna sylwetka), osobne PNG z przezroczystą górą. Nie użyto zdjęć, elementów zewnętrznych, znaków handlowych, flag ani napisów.

| Plik | Wymiary | Źródło / narzędzie | Licencja | Motyw |
|---|---:|---|---|---|
| `akwizgran.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Ośmioboczna kopuła katedry i stara brama |
| `kolonia.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Dwie ostre wieże katedry i most nad Renem |
| `dusseldorf.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Rheinturm — smukła wieża nad Renem |
| `zaglebie-ruhry.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Szyby kopalniane, kominy, gazometr |
| `dortmund.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Stadion z owalnym dachem i wieża telewizyjna |
| `bielefeld.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Zamek na wzgórzu wśród drzew |
| `hanower.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Symetryczny ratusz z zieloną kopułą i stawem |
| `magdeburg.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Dwie wieże katedry nad Łabą |
| `berlin.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła kula na wieży i klasycystyczna brama |
| `frankfurt-oder.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Ceglany ratusz i most nad Odrą |
| `oberhausen.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wielki gazometr, hutnicze kominy i wieża kopalni |
| `saarbrucken.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Most nad Saarą, przemysłowe kominy |
| `mannheim.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła wieża ciśnień i fontanny |
| `frankfurt-main.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wieżowce nad Menem |
| `erfurt.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Domy na moście oraz gotyckie wieże |
| `drezno.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Barokowa kopuła, Łaba i parowiec |
| `stuttgart.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Wieża telewizyjna na wzgórzu i winnice |
| `norymberga.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Kamienny zamek na skale i domy szachulcowe |
| `jena.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Okrągła wieża nad wzgórzami doliny Sali |
| `lubeka.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Bramy i dwie masywne wieże w czerwonej cegle |
| `hamburg.png` | 1620×900 | SVG autorski → CairoSVG/Pillow, koncept stylistyczny GPT Image | Oryginalna ilustracja do projektu | Żurawie portowe, czerwone spichlerze nad wodą |
| `preview.png` | 2100×1840 | Własny arkusz Pillow | Oryginalne materiały do projektu | Wszystkie 21 panoram na tle szachownicy |

## Montaż

- Umieszczać jako osobną panoramę w chwili wejścia w punkt trasy, **nad `de-far.png` i pod `de-near.png`**.
- Identyfikatory plików odpowiadają dokładnie `waypoint.id` bez tłumaczenia na angielski.
- Monachium występuje w ogólnym opisie możliwych motywów, **nie występuje** w aktualnym `waypoints.ts`; dlatego nie dodano martwego pliku `monachium.png`.
- Grafiki powstały jako autorskie, programowo złożone ilustracje wektorowe; GPT Image wykorzystano wyłącznie do uzyskania orientacji stylistycznej. Korekty wykonywane ręcznie w `countries/de/generate_de.py`: sylwetki, wymiary, warstwy, alfa, optymalizacja, format @3x, styki kafli.
- Brak zależności uruchomieniowych npm; PNG są gotowe do gry.
