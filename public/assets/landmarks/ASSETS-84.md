# Zlecenie 84: Panoramy A+ - dokumentacja zasobów

Data: **2026-10-31**. Narzędzie: **wbudowany generator obrazów ChatGPT (GPT Image)**, następnie Pillow (skalowanie, oczyszczenie kanału alfa, osadzenie profilu sRGB, montaż podglądu).

## Pliki

| ID | Miasto | Plik | Budowle i motywy | Punkt widzenia | Narzędzie i prawa |
|---|---|---|---|---|---|
| `dublin` | Dublin | `dublin.png` | Custom House z charakterystyczną zieloną kopułą; most O'Connell Bridge i kamienice nad Liffey | Stylizowane spojrzenie z południowego nabrzeża Liffey ku północno-wschodniemu brzegowi w okolicy O'Connell Bridge. Most na pierwszym planie, Custom House dalej na prawym skrzydle panoramy. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `wicklow` | Wicklow | `wicklow.png` | Ruiny Black Castle na cyplu; falochron i latarnia portowa Wicklow Harbour; zabudowa nadbrzeżna i zielone wzgórza | Umowny widok od strony morza w kierunku portu Wicklow: falochron po lewej, miasto w głębi, ruiny na skalistym cyplu po prawej. Sylwetki są uproszczone. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `cork` | Cork | `cork.png` | Wieża St Anne's Church (Shandon Bells, zegar i pozłacany łosoś); North Cathedral (St Mary and St Anne); most i kamienice nad rzeką Lee | Stylizowane spojrzenie z południowego brzegu północnej odnogi rzeki Lee na dzielnicę Shandon, z mostem na lewym skraju. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `limerick` | Limerick | `limerick.png` | King John's Castle; Thomond Bridge; katedra St Mary's Cathedral; nabrzeże Shannon | Stylizowane spojrzenie z zachodniego/południowo-zachodniego brzegu Shannon ku King's Island, z mostem Thomond po lewej, zamkiem pośrodku i katedrą z tyłu po prawej. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |
| `barcelona` | Barcelona | `barcelona.png` | Sagrada Familia (uproszczona historyczna sylwetka czterech wież); kompleks Hospital de Sant Pau; zabudowa Eixample i palmy | Widok inspirowany osią Avinguda Gaudi od okolic Sant Pau w stronę Sagrada Familia. Perspektywa silnie skompresowana, zabytek w tle powiększony dla czytelności. | ChatGPT GPT Image, 2026-10-31; grafika wygenerowana dla właściciela projektu, do wykorzystania zgodnie z warunkami OpenAI. |

## Licencja i metodyka

- Wszystkie grafiki zostały wygenerowane specjalnie dla projektu; nie zawierają skopiowanych fotografii ani cudzych logotypów. Materiały zewnętrzne służyły weryfikacji miejsc i rozpoznawalnych sylwetek, nie były wklejane do generowanych PNG.
- Wykorzystanie i eksploatacja wygenerowanych wyników: na rzecz właściciela projektu, zgodnie z warunkami OpenAI; prawnoautorska ochrona samych materiałów AI może zależeć od jurysdykcji.
- Wszystkie pliki: 1620 x 900 px, RGBA, przezroczyste niebo i tło, profil sRGB, PNG.
- Kontury ciemnogranatowe, rysunkowe. Szerokość linii pochodzi z generatora i nie jest wszędzie ściśle 9-10 px: wymaga ewentualnego retuszu przed odbiorem produkcyjnym.
- Kompozycje są stylizowane. Zbliżenie budowli i kompresja dystansu są zabiegiem czytelności w grze, nie tworzą ściśle geodezyjnej rekonstrukcji konkretnej fotografii.
- W przypadku Barcelony zrezygnowano z wiernego przedstawiania współczesnych detali budowlanych Sagrada Familia; pokazano uproszczoną sylwetkę historycznej fasady Gaudiego. Nie umieszczono współczesnych ikon wymagających osobnych licencji.

## Prompty oraz źródła odniesienia

### dublin - Dublin

Widok: Stylizowane spojrzenie z południowego nabrzeża Liffey ku północno-wschodniemu brzegowi w okolicy O'Connell Bridge. Most na pierwszym planie, Custom House dalej na prawym skrzydle panoramy.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://heritageireland.ie/places-to-visit/custom-house-visitor-centre/; https://www.visitdublin.com/guides/best-views-dublin

Prompt generacyjny:

> Create a wide, sticker-like vector illustration on a transparent background, depicting a Dublin-inspired riverside panorama in a bold flat-cartoon style with thick dark outlines, clean cutout edges, and no people, vehicles, text, or sky. Show a teal river strip and stone quay along the bottom, a multi-arched block-stone bridge with ornate glowing lampposts on the left, warm Georgian brick buildings and layered green trees behind it, and a grand Custom House-style neoclassical building on the right with a pale symmetrical facade, colonnades, arched windows, rooftop ornaments, and a prominent teal-green domed drum topped by a finial.


### wicklow - Wicklow

Widok: Umowny widok od strony morza w kierunku portu Wicklow: falochron po lewej, miasto w głębi, ruiny na skalistym cyplu po prawej. Sylwetki są uproszczone.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://visitwicklow.ie/top-things-to-see-do-in-wicklow-town/; https://wicklowtown.ie/see-and-do-wicklow-town/black-castle-harbour

Prompt generacyjny:

> Panoramic flat-vector sticker illustration of a coastal Irish-style harbor on a transparent background, featuring a blue, wave-highlighted waterfront, a block-built breakwater and red-and-white banded lighthouse on the left, a tightly packed row of colorful slate-roofed seaside buildings at center, and a rocky, grassy castle ruin on the right. Rolling green hills, field patterns, trees, bold navy outlines, and simple comic-style shading complete the crisp horizontal scene, with no sky, people, text, or logos.


### cork - Cork

Widok: Stylizowane spojrzenie z południowego brzegu północnej odnogi rzeki Lee na dzielnicę Shandon, z mostem na lewym skraju.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://www.corkcity.ie/en/cork-heritage-open-day/buildings/sacred-spaces/st-anne-s-church-shandon/; https://www.discoverireland.ie/cork/shandon-bells-tower-st-anne-s-church

Prompt generacyjny:

> A crisp, sticker-like vector panorama depicts a colorful historic European riverside town on a transparent background, with a three-arched stone bridge at left, layered blue-green water and quay in front, and a lively row of pastel facades, trees, rooftops, chimneys, and dormers along the waterfront. Behind the town rises a Gothic cathedral with crenellations and spires, while a redbrick-and-stone clock tower church with a gold-accented clock, cupola, and fish-shaped weather vane anchors the right, all rendered in flat cel shading with bold dark outlines and no people, sky, or text.


### limerick - Limerick

Widok: Stylizowane spojrzenie z zachodniego/południowo-zachodniego brzegu Shannon ku King's Island, z mostem Thomond po lewej, zamkiem pośrodku i katedrą z tyłu po prawej.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://www.limerick.ie/discover/explore/recommended-trips/self-guided-walking-tour-of-historic-limerick-city; https://www.limerick.ie/discover/eat-see-do/history-heritage/historic-attractions/king-johns-castle

Prompt generacyjny:

> Panoramic cartoon vector cutout of a historic riverside town on a transparent checkerboard background, rendered with bold dark outlines, crisp flat/cel shading, and no sky: a colorful castle-and-church skyline rises behind a stone bridge, while a stylized blue-green river with angular ripples spans the foreground. A central medieval fortress features rounded towers, battlements, slit windows, slate roofs, and block-like stone shading; a Gothic church with spires stands to the right, warm townhouses and chimneys cluster on both banks, and bright green trees and shrubs fill the spaces, with the multi-arched lamp-lined bridge extending in from the left and all elements styled as a clean sticker/PNG asset.


### barcelona - Barcelona

Widok: Widok inspirowany osią Avinguda Gaudi od okolic Sant Pau w stronę Sagrada Familia. Perspektywa silnie skompresowana, zabytek w tle powiększony dla czytelności.

Zweryfikowane motywy (strony informacyjne; nie wykorzystano obrazów w grafice): https://santpaubarcelona.org/en/activitat/exhibition-the-sagrada-familia-and-the-hospital-de-sant-pau-a-living-memory/; https://sagradafamilia.org/en/

Prompt generacyjny:

> Panoramic cartoon-vector illustration on a transparent checkerboard background, styled like a crisp sticker with bold dark outlines, flat shading, and no people, text, or sky: a Barcelona-inspired streetscape runs from a richly ornamented Hospital de Sant Pau-like brick building on the left, through a tree- and palm-lined Eixample avenue, toward a distant Sagrada Familia-style cathedral on the right. Warm terracotta and cream architecture, teal domes and windows, ornate arches, balconies, greenery, fences, and receding mid-rise blocks create a colorful, layered city scene designed for easy compositing.

## Weryfikacja

- Lokalna kontrola wymiarow i kanału alfa: zaliczona dla 5/5 plikow.
- Podglad `docs/art/podglady/panoramy-84.png` prezentuje panoramy na jasnoniebieskim tle w skali podgladowej i 1:5.
- Nie uruchomiono testów aplikacji ani testow integracyjnych z Canvas (brak dostępu sieciowego do checkoutu w kontenerze).
- Przed finalnym scaleniem koordynator powinien sprawdzić czytelność w realnym kadrze gry i ewentualna korekte konturów / rozmiaru wzgórz oraz budowli.