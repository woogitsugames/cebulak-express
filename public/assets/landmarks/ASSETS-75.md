# Zlecenie 75 — Panoramy A+ BE/NL

**Data:** 30.10.2026  
**Narzędzie:** generator obrazów ChatGPT / GPT Image; postprocessing Python Pillow (kadrowanie, skalowanie, korekta alfa i kompozycji).  
**Format:** PNG RGBA 1620 × 900 px, osadzony profil sRGB; transparentne niebo, linia lądu/wody przy dolnej krawędzi.  
**Licencja/użycie:** grafika wygenerowana dla właściciela projektu zgodnie z warunkami usługi; bez kopii fotografii i bez materiałów stockowych. Ochrona prawnoautorska samego outputu AI nie jest gwarantowana.

| Plik / id | Miasto | Charakterystyczne elementy | Punkt widzenia | Narzędzie / licencja |
|---|---|---|---|---|
| `bruksela.png` | Bruksela | Ratusz na Grand-Place, gotycka wieża i domy cechowe | Z poziomu Grand-Place, w stronę fasady ratusza; historyczne pierzeje po bokach | ChatGPT GPT Image → Pillow / wygenerowane dla projektu |
| `antwerpia.png` | Antwerpia | Katedra NMP, Het Steen i zabudowa nabrzeża | Z Linkeroever, zachodni brzeg Skaldy ku centrum; uproszczona perspektywa | ChatGPT GPT Image → Pillow / wygenerowane dla projektu |
| `gandawa.png` | Gandawa | Św. Mikołaj, beffroi, św. Bawon i kamienice nad kanałem | Okolice mostu św. Michała; trzy historyczne wieże od lewej do prawej | ChatGPT GPT Image → Pillow / wygenerowane dla projektu |
| `amsterdam.png` | Amsterdam | Kamienice kanałowe o różnych szczytach, łukowy most, rowery | Z drugiej strony kanału; typ Brouwersgracht / Grachtengordel | ChatGPT GPT Image → Pillow / wygenerowane dla projektu |
| `rotterdam.png` | Rotterdam | Euromast, Erasmusbrug i wieżowce nad Nieuwe Maas | Z południowego brzegu Nieuwe Maas ku północnemu; stylizacja panoramy | ChatGPT GPT Image → Pillow / wygenerowane dla projektu |

## Opisy użyte jako założenia promptów

### Bruksela (`bruksela.png`)

> Historyczna Grand-Place bez Atomium, 2D, płaskie barwy, gruby granatowy kontur, bez nieba i napisów.

### Antwerpia (`antwerpia.png`)

> Panorama historycznego nabrzeża ze średniowiecznym zamkiem i katedrą; bez MAS, płaskie 2D, przejrzyste alfa.

### Gandawa (`gandawa.png`)

> Trzy wieże Gandawy i kamienice; bez Gravensteen, ciepłe kolory, czysty transparentny kadr.

### Amsterdam (`amsterdam.png`)

> Wąskie kolorowe kamienice nad kanałem z małym mostem; bez dworca Centraal, bez tekstów i nieba.

### Rotterdam (`rotterdam.png`)

> Euromast na zachód od Erasmusa, miejski skyline, woda u podstawy; grube kontury i transparentne tło.

## Sposób wykonania i korekty

- **Bruksela:** niezależna ilustracja wygenerowana przez ChatGPT, dopasowane wymiary.
- **Antwerpia, Gandawa, Amsterdam i Rotterdam:** osobne wycinki wygenerowanego przez ChatGPT arkusza pięciu panoram, rozdzielone i przeskalowane w Pillow. Usunięte elementy o niespójnej perspektywie oraz MAS.
- **Rotterdam:** odbicie poziome do poprawienia kolejności Euromast względem Erasmusbrug.
- Grafiki są syntetyczną, rysunkową stylizacją, a nie precyzyjnym renderem fotogrametrycznym. Należy przeprowadzić ocenę w kadrze gry.

## Weryfikacja i źródła prawne

- [x] Pięć plików PNG 1620 × 900, alfa, ICC sRGB
- [x] Arkusz `docs/art/podglady/panoramy-75.png` z podpisami na jasnoniebieskim tle
- [x] Bez Atomium i MAS, napisów w sprite'ach, firmowych znaków i flag państwowych
- [ ] Test rozpoznawalności i konturów w docelowym kadrze Canvas — koordynator
- [ ] `npm ci && npm run typecheck && npm test && npm run build` — wymaga checkoutu repo

Atomium: https://atomium.be/copyright?lang=en  
Belgia, wolność panoramy i ograniczenia komercyjne: https://www.deauteurs.be/nieuws/panorama-uitzondering/  
Holandia, Auteurswet art. 18: https://www.wetten-overheid.nl/wet/BWBR0001886/artikel/18
