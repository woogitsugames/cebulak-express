# Zasoby zimowych ramek sklepu (zlecenie 119)

Pełna tabela plików, licencje, prompty, opis fontu i integracja: [ASSETS-119.md](ASSETS-119.md).

## W skrócie

| Pliki | Format | Rola |
|---|---|---|
| `ramka-01…08-tlo.png` | 1080×1920, PNG RGB, sRGB | Zimowe tło planszy z pasem tytułowym (y 0–420) |
| `ramka-01…08-okno.png` | 1080×1920, PNG RGBA | Kremowa ramka; otwór na zrzut x 120–960, y 470–1850 (840×1380, promień 55 px), alfa 0 w środku |
| `ramka-01…08-podpis.png` | 1080×420, PNG RGBA | Podpis nakładany w (0,0); podmienialny bez zmiany tła |
| `skladaj.py` | Python 3 + Pillow | Składa **prawdziwy** zrzut z gry z wybraną ramką |
| `../../art/podglady/ramki-sklep-119.png` | arkusz 4×2 | Tylko podgląd kompozycji („TU ZRZUT Z GRY”), nie do sklepu |

Podpisy ramek: 01 „Jeden dotyk. I lecisz!”, 02 „Z 15 krajów do Polski”, 03 „Bagaż? Jeszcze się zmieści”,
04 „Słoiki dodają kilometry”, 05 „Po drodze do domu”, 06 „Twoje miasto na mecie”,
07 „Zbieraj pocztówki z trasy”, 08 „Pochwal się kilometrami”.

## Zasady

- Pliki zostają w `docs/` — nie kopiować do `public/` (nie trafiają do aplikacji ani APK).
- W okno wstawiamy wyłącznie autentyczny zrzut z działającej gry; ramkę wybieramy tak, by podpis
  opisywał to, co widać na zrzucie. Sposób użycia z `npm run store:shots`: [../zrzuty.md](../zrzuty.md#zimowe-ramki-zlecenie-119).
- Gotowe plansze sprawdzić w pełnym rozmiarze i w miniaturze 180×320.
