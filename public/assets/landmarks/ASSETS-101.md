# Zlecenie 101 — panoramy miast A+

- **Data wygenerowania i obróbki:** 2026-10-31.
- **Format wyjściowy:** PNG, 1620 × 900 px, RGBA, profil sRGB, przezroczyste niebo, linia gruntu/wody przy dolnej krawędzi.
- **Autor/narzędzia:** generowanie wbudowanym generatorem obrazów ChatGPT (GPT Image); obróbka techniczna w Pythonie (Pillow i OpenCV): wyodrębnienie sylwetek z arkusza, usunięcie podpisów i tła, skalowanie do 1620 × 900, wzmocnienie ciemnogranatowych konturów, spłaszczenie barw, profil sRGB.
- **Prawa/licencja:** oryginalne materiały generowane AI na zamówienie projektu. Użycie, także komercyjne, przez właściciela projektu na warunkach ChatGPT/OpenAI. Nie użyto ani nie włączono żadnej cudzej fotografii, tekstury ani logotypu. Ochrona prawnoautorska elementów tworzonych wyłącznie przez AI zależy od właściwego prawa — nie należy twierdzić, że jest automatycznie gwarantowana. Budynki są interpretacją graficzną, a nie odwzorowaniem fotografii.

## Inwentarz

| Plik | Miasto | Główne obiekty (od lewej) | Punkt widzenia / zgodność geograficzna | Narzędzie / źródło | Licencja / prawa |
|---|---|---|---|---|---|
| `mariampol.png` | Mariampol (Marijampolė, Litwa) | neobarokowa bazylika św. Michała Archanioła (dwie białe wieże); park i niska zabudowa; stylizowany zabytkowy dworzec kolejowy z ceglanym korpusem i wysoką wieżą | **Umowny montaż** centrum i dworca (nie jeden rzeczywisty punkt obserwacji); zaakcentowana zielona zabudowa miejska | ChatGPT GPT Image, scena indywidualna; Pillow/OpenCV | Wygenerowane w ChatGPT; możliwość użycia w projekcie, z zastrzeżeniami powyżej |
| `oslo.png` | Oslo (Norwegia) | ratusz Oslo Rådhus z dwiema ceglanymi wieżami; twierdza Akershus na wzniesieniu; biały ukośny dach Opery nad wodą | **Widok poglądowy od Oslofjordu ku północy**; położenie zachód → wschód: ratusz – Akershus – opera. Budynki celowo zwiększone dla czytelności | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast, odbicie poziome, Pillow/OpenCV | Wygenerowane w ChatGPT; architekturę Norwegii wolno obrazować (§ 31 åndsverkloven) |
| `krakow.png` | Kraków (Polska) | Wawel na wzgórzu, zespół sukiennic z arkadami, bazylika Mariacka z nierównymi wieżami | **Kompozycja ikonograficzna**, nie autentyczny widok z jednej ulicy: Wawel i Rynek Główny nie mogą w rzeczywistym ujęciu mieć jednocześnie takich rozmiarów | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast; Pillow/OpenCV | Wygenerowane w ChatGPT; zabytki i panorama miejska |
| `katowice.png` | Katowice (Polska) | hala Spodek, przeszklone bryły nawiązujące do Muzeum Śląskiego, czerwonoceglasty NOSPR, familoki Nikiszowca; dodatkowo sylweta wieży szybowej | **Kolaż Strefy Kultury i Nikiszowca**, nie jeden rzeczywisty widok: Nikiszowiec jest oddzielony od centrum; przesadne gabaryty przeszkleń dla czytelności w grze | ChatGPT GPT Image, wyodrębnione z atlasu czterech miast; Pillow/OpenCV | Wygenerowane w ChatGPT; budynki stale dostępne publicznie: uwaga na art. 33 pkt 1 polskiej ustawy o prawie autorskim |

**Podgląd:** `docs/art/podglady/panoramy-101.png` — arkusz 2 × 2, jasnoniebieskie tło, podpisy poza samymi panoramami.

## Prompty źródłowe

### Mariampol — osobna generacja

> A panoramic flat-vector sticker illustration on a transparent background, featuring a straight-on townscape with bold dark outlines and no people or text: a white twin-spired baroque cathedral anchors the left, a tree-filled park with benches, lamps, paths, and low cream/blue buildings spans the center, and a red-brick historic civic building with a tall terracotta-roofed tower stands on the right. The foreground combines green lawns, shrubs, and a pale paved edge, while simplified solid colors, subtle shading, arched windows, decorative façades, greenery, and clean graphic shapes create a crisp cartoon-like skyline.

W obróbce dopasowano budynek po prawej do roli **stylizowanego dworca** (charakterystyczny materiał i wieża), choć generator określał go jako budynek publiczny. To **interpretacja**, a nie precyzyjny rysunek elewacji dworca.

### Kraków i Katowice — wspólna generacja arkusza

> A playful flat-vector collage on a light-blue background presents four postcard-style city skylines in a neat two-by-two grid, each rendered with bold outlines, vivid colors, crisp shading, greenery, and a centered dark sans-serif city label beneath it. The scenes feature Mariampol’s neoclassical churches and civic tower, Oslo’s waterfront landmarks and fortress, Kraków’s castle, cloth hall, and twin-towered church, and Katowice’s Spodek, modern towers, industrial structures, and brick neighborhoods—without people or extra text.

Obie miejskie sylwetki wyodrębniono z arkusza algorytmem komponentów spójnych. Podpisy nie zostały przeniesione do PNG gry.

### Oslo — wspólna generacja arkusza, alternatywna kompozycja

> A crisp flat-vector panorama sheet presents four transparent-background city skyline cutouts—Mariampol, Oslo, Kraków, and Katowice—in a two-by-two layout, using bold dark outlines, vibrant colors, simplified architecture, greenery, and water; each scene highlights its signature landmarks, from Mariampol’s churches and riverside townscape to Oslo’s opera house and fortress, Kraków’s basilica, Cloth Hall, and Wawel Castle, and Katowice’s Spodek, modern cultural buildings, industrial tower, and brick workers’ homes. A light-blue footer contains miniature previews labeled “Mariampol,” “Oslo,” “Kraków,” and “Katowice,” creating a polished collection of game-ready skyline stickers with no people.

Użyto odbicia poziomego wyizolowanej sylwetki Oslo w celu poprawnej kolejności geograficznej: ratusz – Akershus – opera. Nie jest to kopia ani przeróbka zdjęcia.

## Referencje faktograficzne (bez użycia plików zewnętrznych w grafice)

- Mariampol: oficjalny portal turystyczny, [bazylika](https://marijampoletic.lt/en/places-to-visit/architectural-values/basilica-of-saint-michael-the-archangel-in-marijampole/), [dworzec](https://marijampoletic.lt/en/places-to-visit/architectural-values/railway-station/) i [lista architektury](https://marijampoletic.lt/lankytinos-vietos/architekturos-vertybes/).
- Oslo: oficjalny [VisitOSLO — atrakcje](https://www.visitoslo.com/en/activities-and-attractions/10-suggestions/top-attractions/); norweska ustawa [åndsverkloven, § 31](https://lovdata.no/nav/lov/2018-06-15-40/kapI/%C2%A730) (zwłaszcza: *Byggverk kan fritt avbildes*).
- Kraków: [Kraków — Stare Miasto](https://convention.krakow.pl/getHtml?dok_id=39903) i [Kościół Mariacki](https://www.krakow.pl/getHtml?dok_id=11175).
- Katowice: [Strefa Kultury — Śląskie.travel](https://www.slaskie.travel/poi/509072/the-space-of-culture-in-katowice), [Strefa Kultury — Spodek](https://www.spodekkatowice.pl/pl/strefa-kultury/24/), [Nikiszowiec](https://www.metropolia.slaskie.travel/culturalheritage/1715/osiedle-nikiszowiec). Polska [ustawa o prawie autorskim — art. 33](https://eli.gov.pl/api/acts/DU/2021/1062/text.html) (przy komercyjnym wykorzystaniu ostateczna kwalifikacja prawna zależy od okoliczności).

## Kontrola i integracja

- [x] Cztery oddzielne obrazy `.png`, 1620 × 900, RGBA, sRGB, bez tła nieba.
- [x] Kontur ciemny, wzmocniony na zewnętrznych i wewnętrznych krawędziach; czytelność po zmniejszeniu i skala najważniejszych budowli sprawdzone wizualnie w arkuszu.
- [x] Brak tekstów i logotypów w obrazach produkcyjnych; podpisy tylko na arkuszu podglądowym.
- [x] Arkusz podglądów i niniejsza dokumentacja.
- [ ] Weryfikacja w **docelowym kadrze silnika gry** — do przeprowadzenia przez koordynatora.
- [ ] Akceptacja **kolażu ikonograficznego** zamiast rzeczywistej perspektywy dla Mariampola, Krakowa i Katowic.
- [ ] Po dołączeniu ZIP do repo uruchomić `npm ci && npm run typecheck && npm test && npm run build` oraz sprawdzić CI.

## Uwagi do koordynatora

1. Cel identyfikowalności zabytków powoduje konflikt z warunkiem jednego autentycznego punktu widzenia dla Krakowa i Katowic. W tej wersji świadomie pierwszeństwo mają rozpoznawalne sylwetki i proporcje w grze; **to decyzja do akceptacji**.
2. Stylizowany dworzec w Mariampolu oraz przeszklone bryły Muzeum Śląskiego nie są dokumentalnie dokładnymi rekonstrukcjami. Zalecane sprawdzenie przez osobę znającą miasta.
3. Przed publikacją gry zalecana jest kontrola zakresu swobody panoramy dla każdego obiektu chronionej współczesnej architektury w danej jurysdykcji. Norwegia dopuszcza obrazowanie budynków, a w Polsce art. 33 pkt 1 przewiduje odrębny wyjątek. Nie używano cudzych fotografii w produktowych PNG.