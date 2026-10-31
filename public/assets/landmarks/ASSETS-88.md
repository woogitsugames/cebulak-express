# Zlecenie 88 — panoramy A+ (Finlandia i Szwecja)

**Data:** 2026-10-31. **Projekt:** Cebulak Express — Kierunek Polska.  
**Format:** PNG 1620 × 900, RGBA, przezroczyste niebo, grunt/nabrzeże u dołu.  
**Narzędzie:** wbudowany generator obrazów ChatGPT (GPT Image / DALL·E), kadrowanie i obróbka PNG w Pythonie (Pillow, OpenCV).  
**Prawo wykorzystania:** na potrzeby właściciela projektu, zgodnie z warunkami OpenAI. Wygenerowane obrazy nie zapewniają same w sobie gwarancji wyłącznych praw autorskich.

## Spis plików i scen

| Plik / id | Miasto | Główne sylwetki | Założony punkt obserwacji | Narzędzie / pochodzenie |
| --- | --- | --- | --- | --- |
| `helsinki.png` / `helsinki` | Helsinki (FI) | Katedra Helsińska (biała bryła, zielona kopuła), Sobór Uspieński (czerwona bryła i cebulaste kopuły), Stara Hala Targowa i pierzeja portowa | Od strony południowego portu, na zabudowę i katedry, z wodą w dolnym pasie | ChatGPT, ilustracja pojedyncza; Pillow/OpenCV |
| `tampere.png` / `tampere` | Tampere (FI) | XIX-wieczne czerwone fabryki Finlayson, komin przemysłowy, wieża Näsinneula, zabudowa młyna nad Tammerkoski | Schematycznie znad Tammerkoski w kierunku historycznych fabryk | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `turku.png` / `turku` | Turku (FI) | Katedra w Turku, historyczna klasycystyczna kamienica w centrum, zabudowa nad rzeką Aura i żaglowce | Z przeciwnego brzegu rzeki Aura w stronę katedry | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `goteborg.png` / `goteborg` | Göteborg (SE) | Most Älvsborgsbron, wieżowiec Lilla Bommen („Läppstiftet”), zabudowa nabrzeża i wieża historycznego kościoła, żaglowiec | Uogólniona szeroka perspektywa znad rzeki Göta älv | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `helsingborg.png` / `helsingborg` | Helsingborg (SE) | Ceglana wieża Kärnan, historyczna zabudowa centrum, prom na cieśninie Öresund | Od strony wody na wschodnie wybrzeże cieśniny | ChatGPT, wydzielony kadr arkusza; Pillow/OpenCV |
| `docs/art/podglady/panoramy-88.png` | Pięć miast | Arkusz podglądu na jasnoniebieskim tle z podpisami | Nie dotyczy | Pillow (z plików źródłowych, podpisy tylko na arkuszu) |

**Licencja / uwagi dla pięciu panoram:** wygenerowane w ChatGPT (GPT Image / DALL·E); dobór obiektów, kadrowanie, eliminacja elementów niezamierzonych, powiększenie, czyszczenie kanału alfa i wzmocnienie granatowego konturu: autor opracowania w ramach zlecenia dla właściciela projektu. Brak fotografii ani marek użytych w finalnych plikach. Zdjęcia/witryny turystyczne wykorzystano wyłącznie do weryfikacji obiektów, a nie do bezpośredniego kopiowania pikseli.

## Prompty odtworzeniowe

Zalecany wspólny prefiks dla **każdego** promptu:  
> Single continuous 16:9 transparent PNG skyline for a cheerful mobile game, flat warm-colour vector illustration, very bold uniform dark navy #1d2f3b outlines approximately 9–10 px at 1620×900, simple big recognizable architectural shapes, buildings occupy about 70–80 percent of image height, light from upper-left with flat hard-edged shading, simplified rectangular windows, historic proportions, readable when shrunk 5x. No sky, clouds, gradient, paper/photo texture, text, flags, logos, branding or people in foreground. Water or quayside only in bottom 0–40 pixels.

### `helsinki.png`

> Helsinki, Finland seen across the South Harbour facing the historic city: white Helsinki Cathedral with one big green central dome and smaller green domes on the left, red brick Uspenski Orthodox Cathedral with dark green onion domes on the right, a low warm-yellow harbourfront including the Old Market Hall in front, a small unbranded green tram and small white harbour ferries. Preserve legible skyline masses; one uninterrupted panorama on transparent background.

### `tampere.png`

> Tampere, Finland seen toward the Tammerkoski industrial riverscape: large red-brick nineteenth-century Finlayson factory mill buildings and tall brick chimney, recognisable slender Näsinneula observation tower in the distance, a compact step of foaming rapids and simple waterside blocks, deep green deciduous trees. Bold dark blue strokes, no sky or writing; one uninterrupted panorama on transparent background.

### `turku.png`

> Turku, Finland viewed from the opposite bank of the Aura River toward Turku Cathedral: large medieval reddish-brick cathedral with a tall dark-patinated green steeple as the focal point, modest historic low-rise classical waterfront facades and trees, two small unbranded sailing boats and a narrow quay line. Turku Castle must NOT be included because it is kilometres away and not visible at this scale from this viewpoint. Single uninterrupted game-layer panorama on transparent background.

### `goteborg.png`

> Gothenburg, Sweden maritime panorama from Göta älv: the landmark turquoise suspension bridge Älvsborgsbron at the left edge, the slender red-and-white tower Lilla Bommen/Läppstiftet and historic downtown roofscape, an anonymous multi-masted sailing ship below and quay structures. Huge simple shapes, no words or flags, no photo realism, no sky. NOTE: very wide geographically compressed illustrative view, not a photographically exact viewing angle.

### `helsingborg.png`

> Helsingborg, Sweden seen from the Öresund strait: medieval red-brick square keep Kärnan with a battlemented top standing above old waterfront houses, terraced greenery on the ridge and a white-and-blue generic unbranded passenger ferry on the strait. Simplified historical surroundings, not a reconstructed castle. One continuous transparent vector-style skyline without labels or flags.

**Uwaga techniczna:** prompty powyżej to kompletne prompty odtworzeniowe opisujące pożądane sceny. W tej sesji narzędzie generowało też arkusze wielomiejskiе; cztery kadry z arkuszy zostały wyodrębnione, a następnie przeskalowane do 1620×900. Nie należy ich traktować jako pięciu natywnych renderów w tej rozdzielczości. Powiększenie nie dodaje rzeczywistych szczegółów obrazu.

## Sprawdzenie i ograniczenia

- Wszystkie pięć PNG: 1620×900, RGBA, przezroczysta górna część, kontury w kolorze ciemnogranatowym, bez podpisów w samych panoramach.
- Błędy modeli obrazu ograniczono ręcznym kadrowaniem; w szczególności usunięto **fałszywe sąsiedztwo zamku Turku i katedry**.
- **Perspektywa nie jest w pełni kartograficzna:** Tampere i Göteborg są ilustracyjną syntezą obiektów z różnych odległości, a architektura drugiego planu Helsingborga została uproszczona. Przed przyjęciem do gry: kontrola rozpoznawalności przez mieszkańca i próbny render przy skali około 1/5.
- Wygenerowane źródła arkuszowe miały mniejszą rozdzielczość poszczególnych miast, więc dla finalnej produkcji warto zlecić dopracowanie każdego z czterech kadrów osobno w natywnej rozdzielczości. To **nie jest weryfikacja jakości A+** przez właściciela.
- `npm ci`, `npm run typecheck`, `npm test`, `npm run build` — **nie uruchomiono**: środowisko nie mogło sklonować repozytorium (`github.com` DNS); te pliki są wyłącznie graficzne i nie edytują TS.

## Źródła do weryfikacji obiektów (nie są licencjami na fotografie)

- Helsinki: [MyHelsinki, Helsinki Cathedral](https://www.myhelsinki.fi/places/helsinki-cathedral/), [Port of Helsinki](https://www.portofhelsinki.fi/en/passengers/information-for-passengers/things-to-do-in-helsinki/).
- Tampere: [Visit Tampere, atrakсje](https://visittampere.fi/en/articles/tampere-top-attractions/), [Finlayson](https://visittampere.fi/en/destination/finlayson-area/).
- Turku: [Visit Turku, Aura Riverside](https://en.visitturku.fi/the-aura-riverside-explore-local), [Miasto Turku, Cultural Waterfront](https://www.turku.fi/en/a-city-of-culture-under-renewal/cultural-waterfront).
- Göteborg: [Göteborg, Älvsborgsbron](https://www.goteborg.com/en/guides/10-instagram-places-in-gothenburg), [Göteborg, punkty widokowe i symboliczne miejsca](https://www.goteborg.com/en/attractions/viewpoints).
- Helsingborg: [Helsingborg.se, Kärnan](https://helsingborg.se/uppleva-och-gora/kultur-och-museer/the-keep-of-helsingborg/).
- Budynki mogą być swobodnie przedstawiane na mocy fińskiego [§25a ustawy o prawie autorskim](https://www.finlex.fi/en/legislation/1961/404/amendment-history/20230263) i szwedzkiego [§24 ustawy o prawie autorskim](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1960729-om-upphovsratt-till-litterara-och_sfs-1960-729/). Nie dotyczy odrębnych praw do zdjęć; żadne cudze zdjęcie nie jest składnikiem finalnych PNG.