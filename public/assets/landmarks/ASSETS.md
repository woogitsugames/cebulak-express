# Zasoby: panoramy punktów trasy (Z09)

Każdy sprite: **1620×900 px, PNG RGBA z profilem sRGB, tło przezroczyste**. Panoramy są autorskimi, ręcznie dopracowanymi grafikami proceduralnymi (Python, CairoSVG, Pillow); **licencja: własna, do użycia w projekcie Cebulak Express**.

| Plik | Źródło/narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `zurych.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `wodospad-renski.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `oslo.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `svinesund.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `goteborg.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `helsingborg.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `malmo.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `ystad.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `prom-baltyk.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `kopenhaga.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `roskilde.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `most-falster.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `prom-fehmarn.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Identyfikator zgodny z `src/content/waypoints.ts`. |
| `genewa.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `bazylea.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `bergen.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `stavanger.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `odense.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `aarhus.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `most-wielki-belt.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `most-oresund.png` | Python / CairoSVG / Pillow | własna, do użytku projektu | Dodatkowa grafika motywu z briefu — bez identyfikatora CH/NO/SE/DK na aktualnej trasie. |
| `preview.png` | Arkusz kontaktowy Pillow | własna, do użytku projektu | 21 panoram na szachownicy, z nazwami w arkuszu (bez tekstów na sprite'ach). |

## Integracja i uwagi

- Promy są generyczne; bez marek i oznaczeń linii promowej.
- Sylwetki zabytków są uproszczone i stylizowane; nie występują logotypy ani symbole oficjalne.
- `most-oresund.png` jest osobnym motywem z briefu, niezależnym od panoramy `malmo.png`.
- `prom-baltyk.png` zawiera prom pasażersko-samochodowy i wiatrak-stawę portu w Świnoujściu.
- Nie zmieniano definicji tras ani żadnego pliku TypeScript.

**Stan szkicu PR:** komplet 21 plików PNG znajduje się w paczce `cebulak-09-do-repo.zip` udostępnionej w rozmowie ChatGPT. Przed scaleniem należy wgrać te pliki oraz warstwy czterech krajów do tej gałęzi.
