# ASSETS-96 — Panoramy A+ (2026-10-31)

**Projekt:** Cebulak Express — Kierunek Polska. **Zlecenie:** 96.

Wszystkie pliki to ilustracje wygenerowane w natywnym generatorze obrazów **ChatGPT (GPT Image)**, następnie ręcznie wykadrowane i skorygowane przy użyciu Pillow/OpenCV. Pliki docelowe: **PNG RGBA 1620×900**, alfa (bez nieba), gruby kontur `#1d2f3b`, bez tekstu, logo i postaci.

**Licencja i autorstwo:** oryginalne grafiki generowane w ChatGPT dla właściciela projektu, z możliwością wykorzystania w grze na warunkach usługi OpenAI; nie użyto cudzych fotografii jako grafik ani znaków firmowych.

| ID / plik | Miasto | Budowle i elementy | Punkt widzenia | Generowanie i obróbka |
|---|---|---|---|---|
| `erfurt.png` | Erfurt | Krämerbrücke, wieża Ägidienkirche, historyczne kamienice | Stylizowany widok znad Gery na zabudowany most | GPT Image, skalowanie i kontury |
| `stuttgart.png` | Stuttgart | Stiftskirche, Fernsehturm na Hoher Bopser, zielona kotlina | Od centrum w kierunku zalesionego wzgórza | GPT Image, skalowanie i kontury |
| `jena.png` | Jena | JenTower, Stadtkirche St. Michael, domy i wzgórza Saaletal | Schematycznie z brzegu Soławy ku centrum | GPT Image (wyodrębnienie z wygenerowanego kolażu), korekta i kontury |
| `lubeka.png` | Lubeka | Holstentor, St. Marien i St. Petri, hanzeatycka ceglana zabudowa | Od zachodu, z publicznego przedpola bramy ku Altstadt | GPT Image (wyodrębnienie z wygenerowanego kolażu), korekta i kontury |
| `freiburg.png` | Fryburg Bryzgowijski | Freiburger Münster, zabudowa starego miasta, lasy Schwarzwaldu | Stylizowany widok od zachodu ku katedrze i wzgórzom | GPT Image (wyodrębnienie z wygenerowanego kolażu), korekta i kontury |

**Wspólny prompt odtworzeniowy:** `One isolated recognizable German city panorama for a casual 2D mobile game, flat warm vector/cartoon illustration, 2–4 big authentic landmark silhouettes from a public street viewpoint, strong 9–10 px navy #1d2f3b outlines, clear main shapes, reduced details, transparent 1620×900 PNG, no sky, no clouds, no people, no lettering, no logos, ground line at bottom, warm light from upper left.`

**Prompty tematyczne:**
- Erfurt: `Kraemerbruecke with its half-timbered houses and stone arches over the Gera; Gothic Aegidienkirche church tower, roofs and trees.`
- Stuttgart: `Stiftskirche with an ochre sandstone clock tower in the foreground, the slender concrete Fernsehturm on a wooded hillside, historic old town.`
- Jena: `JenTower glass cylinder, St. Michael Gothic bell tower, Saale bridge, terracotta roofs, wooded hills.`
- Lubeka: `Two round red-brick towers of Holstentor, stepped Gothic brickwork, St Marien twin spires, St Petri, old Hanseatic houses.`
- Freiburg: `Tall openwork sandstone spire of Freiburg Minster, compact historic houses and church turrets, wooded Black Forest hills behind.`

**Źródła identyfikacji:** https://www.erfurt-tourismus.de/sehenswertes/kraemerbruecke/ ; https://www.stuttgart-tourist.de/a-stiftskirche-stuttgart ; https://www.stuttgart.de/tourismus/sehenswuerdigkeiten/fernsehturm-stuttgart ; https://www.uni-jena.de/en/530/jena ; https://www.visit-jena.de/sehen-und-erleben/sehenswuerdigkeiten/stadtkirche-st-michael/ ; https://www.luebeck-tourismus.de/service/stadtplan ; https://visit.freiburg.de/stadterlebnis-freiburg

**Prawo do widoków architektury:** wyłącznie stylizowane zewnętrzne sylwetki budowli trwale widoczne z publicznych przestrzeni Niemiec; §59 UrhG: https://www.gesetze-im-internet.de/urhg/__59.html .

**Podgląd:** `docs/art/podglady/panoramy-96.png`.

**Uwaga do szkicu PR:** pełna wersja tego dokumentu wraz z sześcioma PNG znajduje się w paczce ZIP dostarczonej właścicielowi; należy umieścić pliki graficzne pod wskazanymi ścieżkami i podmienić ten plik na pełną wersję z paczki. Panoramy są stylizowane, a nie fotogrametryczne. Nie przeprowadzono testu w kadrze gry 1:5 ani `npm ci/typecheck/test/build`, gdyż lokalny dostęp git do GitHub był zablokowany.
