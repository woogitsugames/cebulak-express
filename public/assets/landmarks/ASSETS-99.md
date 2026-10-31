# Zlecenie 99 — Panoramy A+ (2026-10-31)

## Status
Pięć osobnych plików PNG RGBA 1620 × 900 px, przezroczyste tło, wyraźne kontury #1d2f3b, brak napisów i logotypów. Obrazy oraz arkusz podglądu przekazano właścicielowi w archiwum ZIP w sesji ChatGPT. Z powodu ograniczeń środowiska pliki binarne nie zostały wypchnięte na GitHub. Szkic PR pozostaje niekompletny do ich ręcznego wgrania.

## Pliki i motywy

| Ścieżka w paczce | Miejsce, budowle i motywy | Perspektywa |
|---|---|---|
| public/assets/landmarks/lomza.png | Łomża — katedra św. Michała Archanioła, zabudowa starego miasta z ratuszem, most nad Narwią | od przeciwległego brzegu Narwi; ujęcie stylizowane |
| public/assets/landmarks/olsztyn.png | Olsztyn — Zamek Kapituły Warmińskiej, ceglana wieża starej zabudowy, jezioro z przystanią | kompozycyjnie zza wody w kierunku starego miasta |
| public/assets/landmarks/bialystok.png | Białystok — ratusz z wieżą zegarową, archikatedra z dwiema wieżami, Rynek Kościuszki i drzewa | orientacyjnie z zachodniej strony rynku na wschód |
| public/assets/landmarks/gdansk.png | Gdańsk — Żuraw, kamienice Długiego Pobrzeża, gotyckie wieże, historyczny żaglowiec | od strony Ołowianki przez Motławę |
| public/assets/landmarks/tallinn.png | Tallinn — wieża św. Olafa, średniowieczne baszty, zabudowa starówki i port z promem | od strony nabrzeża portowego na stare miasto |

Arkusz: docs/art/podglady/panoramy-99.png (jasnoniebieskie tło, podpisy wyłącznie w podglądzie).

## Narzędzia / źródło / licencja

Grafika generowana natywnie w ChatGPT (GPT Image), poprawki techniczne w Pythonie/Pillow/OpenCV: wydzielenie czterech widoków z wielomiejskiej kompozycji, osobna grafika dla Łomży, kadrowanie, usunięcie etykiet, skalowanie, wzmocnienie granatowych linii, poprawa alfa. Bez kopiowania pikseli fotografii referencyjnych. Data: 2026-10-31. Dysponent: właściciel projektu; wykorzystanie komercyjne zgodnie z warunkami dostawcy generatora.

Prompt osobnej grafiki Łomży:
> Panoramic vector-style sticker illustration on a transparent background, showing a colorful historic European riverside town with no people, text, or vehicles. A Gothic red-brick church crowns the leafy hill at left, pastel town buildings and a towered civic hall stretch across the skyline, and a broad arched bridge crosses the glossy blue river in front, all rendered with bold dark outlines, flat saturated colors, simple shading, and crisp cutout-style shapes.

Prompt wspólnej kompozycji źródłowej dla Olsztyna, Białegostoku, Gdańska i Tallinna:
> A polished vector collage on a pale sky-blue background presents five labeled cityscape panoramas in a crisp, postcard-like style, using bold outlines, flat colors, simplified architecture, greenery, water, bridges, and harbors, with no people. The top row features Łomża’s river and arched bridge, Olsztyn’s red-brick castle and boats, and Białystok’s clock-towered civic buildings and twin-spired church; below are Gdańsk’s colorful waterfront, cathedral, crane, and sailing ship, plus Tallinn’s medieval towers, church spire, and cruise harbor.

## Kontrola i ograniczenia

Format pięciu PNG potwierdzony (1620 × 900 RGBA), przeźroczystość na górze grafiki, dolna krawędź przy y=854–877, ZIP zawiera siedem plików bez uszkodzeń. Panoramy podlegają akceptacji w kadrze gry.

**Uwaga:** nie wszystkie budowle mają proporcje i kolejność odpowiadające dokładnie jednemu punktowi obserwacji. Olsztyn pokazuje zamek i jezioro w syntetycznej kompozycji — to świadomy kompromis między rozpoznawalnością motywów a topografią. Koordynator musi zaakceptować ten wariant lub zlecić korektę.

Źródła motywów (bez wykorzystania fotografii w assetach):
- Łomża: https://zabytek.pl/pl/obiekty/lomza-katedra i https://www.lomza.pl/index.php/zalaczniki/index.php?wiad=151
- Olsztyn: https://www.zalesiemazury.pl/en/old-town-in-olsztyn
- Białystok: https://historia3d.pl/3462/ratusz-na-rynku-kosciuszki-w-bialymstoku/
- Gdańsk: https://muzeumpomorza.pl/resource/4849_gdansk-zuraw.html
- Tallinn: https://www.visittallinn.ee/eng/visitor/ideas-tips/tips-and-guides/unforgettable-views-of-tallinn
