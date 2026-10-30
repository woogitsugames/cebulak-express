# Zasoby: Norwegia (NO)

| Plik | Źródło/narzędzie | Licencja | Autor / uwagi |
|---|---|---|---|
| `no-sky.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | 1080×1920; statyczny gradient, ciepłe światło z lewej góry; nie kafelkować |
| `no-clouds.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×600; bezszwowy kafelek, alpha; mnożnik 0,15 |
| `no-far.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×900; bezszwowy kafelek, alpha; mnożnik 0,25 |
| `no-near.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | 2160×720; bezszwowy kafelek, alpha; mnożnik 0,5 |
| `no-road.png` | Ilustracja wektorowa narysowana proceduralnie: Python / CairoSVG / Pillow | własna — do użytku projektu | 1080×330; bezszwowy kafelek, mnożnik 1,0 |
| `preview.png` | Kompozycja i test powtarzania kafelków: Pillow | własna — do użytku projektu | Zawiera etykiety informacyjne i czerwoną linię szwu, tylko dla koordynatora, nie do gry. |

## Integracja

Pliki zawierają grafikę @3x. Kolejność warstw od spodu: `sky`, `clouds`, `far` + okazjonalny `landmark`, `near`, `road`.

Każda warstwa jest gotowym, niezależnym PNG w sRGB, bez tekstu i prawdziwych marek.
