# ASSETS-76 — Panoramy A+ Eindhoven / Kolonia / Dortmund / Bielefeld / Hanower

Data: **2026-10-30**. Format: **PNG 1620×900, RGBA, sRGB**. Narzędzie: **natywny generator obrazów ChatGPT (GPT Image)**. Postprocessing: Python/Pillow (kadrowanie, skalowanie Lanczos, alfa, pogrubienie konturu zewnętrznego, usunięcie fragmentów arkusza).

| Plik | Miasto i budowle | Punkt widzenia | Źródło / obróbka |
|---|---|---|---|
| `eindhoven.png` | Eindhoven: Strijp-S, Klokgebouw (wieża zegarowa), hale poprzemysłowe | Umowna szeroka panorama zespołu przemysłowego, nie dokładny fotopunkt | Oddzielny obraz ChatGPT |
| `kolonia.png` | Kolonia: Dom, Hohenzollernbrücke, kolorowe kamienice Altstadt | Od strony Deutz na zachód przez Ren; katedra za mostem | Oddzielny obraz ChatGPT |
| `dortmund.png` | Dortmund/Ruhr: Dortmunder U (bez znaku U), Florian, wieża wyciągowa kopalni, komin | Panorama syntetyczna, **nie jeden prawdziwy fotopunkt** | Oddzielny obraz ChatGPT |
| `bielefeld.png` | Bielefeld: Sparrenburg na zielonym wzgórzu, stylizowany kościół starego miasta | Widok na wzgórze od strony miasta; uproszczone proporcje | Wyodrębniony z arkusza AI; usunięte resztki napisów i chorągiewka |
| `hanower.png` | Hanower: Neues Rathaus z kopułą, Marktkirche, Maschteich | Od południa nad stawem; wieża Marktkirche po lewej, w tle | Wyodrębniony z arkusza AI, oczyszczony i odbity w poziomie |

## Opisy promptów

Każdy prompt uwzględnia styl **A+**: flat vector cartoon, warm opaque color blocks, deep-navy outlines near `#1d2f3b`, left-top light, large simplified buildings occupying ~70–80% height, transparent sky, foreground ground/water strip, no labels, logos, brands, people or flags.

- **Eindhoven:** “Panoramic flat-vector cityscape on a transparent background; clock tower inspired by Klokgebouw, historic Eindhoven Strijp-S industrial factories, warm red brick and cream facades, a few modern offices, thick dark outlines, greenery, continuous ground.”
- **Kolonia:** “Cologne riverfront viewed from east bank of Rhine, huge twin Gothic spires of the Cathedral at center-left, famous repeating iron arches of Hohenzollern Bridge from right, colorful Altstadt townhouses to left, thin turquoise Rhine at bottom, flat vector drawing, transparent sky.”
- **Dortmund:** “Flat-vector Ruhr industrial skyline: historic mining headframe and chimney on left, old brick U-Tower with blank top (no letter or logo) center, slender disc-topped Florian television tower on right, low roofs and greenery, crisp navy outlines, transparent background.”
- **Bielefeld i Hanower:** “A vector-style five-city panorama overview including Bielefeld Sparrenburg Castle on wooded hill and old-town church, and Hanover domed Neues Rathaus by Maschteich and Marktkirche; thick outlines and warm colors.” Te dwa assety wycięto z wygenerowanego obrazu zbiorczego, usuwając podpisy i zachowując przezroczystość.

## Licencja, źródła i ograniczenia

Grafiki są wygenerowane w ChatGPT na zlecenie właściciela projektu; nie skopiowano obcych zdjęć ani znaków firmowych. Wykorzystanie zgodnie z warunkami usługi ChatGPT; prawa do korzystania z materiałów wyjściowych przeznaczone dla właściciela projektu. Samo wygenerowanie obrazu AI nie daje gwarancji ochrony prawnoautorskiej każdego elementu.

Referencje architektoniczne: https://www.strijp-s.nl/gebouw/klokgebouw i https://www.hannover.de/ (fotografie wyłącznie referencyjne, nie kopiowane).

**Arkusz:** `docs/art/podglady/panoramy-76.png` (podpisy są wyłącznie na arkuszu).

**Do sprawdzenia przez koordynatora:** rozpoznawalność w kadrze gry przy skali ~1:5; weryfikacja punktu widzenia Dortmund; Bielefeld i Hanower mają niższą rozdzielczość źródłową, ponieważ wycięto je z jednego wygenerowanego arkusza. Paczka pełnych plików graficznych i pełniejszy dokument ASSETS są dostarczone w ZIP do ręcznego przeniesienia na tę gałąź.
