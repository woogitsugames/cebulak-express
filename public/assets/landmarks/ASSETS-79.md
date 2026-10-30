# Zlecenie 79 — Panoramy A+: Paryż, Lyon, Lille, Zurych, Genewa

**Data:** 2026-10-30. **Generator:** GPT Image w ChatGPT. **Postprodukcja:** Pillow, OpenCV.
**Przekazanie:** grafiki wygenerowano na potrzeby właściciela gry zgodnie z warunkami OpenAI; bez kopiowania cudzych fotografii. Prawa do wyników przysługują właścicielowi projektu w zakresie wynikającym z właściwego prawa i warunków usługi.

## Pliki, motywy i orientacyjne punkty widzenia

| Plik | Miasto | Motywy | Perspektywa i źródło |
|---|---|---|---|
| `paryz.png` | Paryż | Wieża Eiffla za dnia, Łuk Triumfalny, Notre-Dame, kopuła Invalides, Sekwana | Stylizowany szeroki widok inspirowany Montparnasse; osobna generacja GPT Image |
| `lyon.png` | Lyon | Notre-Dame de Fourvière, historyczna Tour métallique de Fourvière, kolorowe kamienice Vieux Lyon i Saona | Widok od wschodniego brzegu Saony; wycinek arkusza GPT Image |
| `lille.png` | Lille | Historyczna wieża typu beffroi, flamandzkie kamienice i Vieille Bourse | Kompozycja motywów Grand-Place; wycinek arkusza GPT Image |
| `zurych.png` | Zurych | Grossmünster, Fraumünster, Limmat, jezioro i Alpy | Widok ku jezioru od północnego odcinka Limmat; wycinek arkusza GPT Image |
| `genewa.png` | Genewa | Fontanna Jet d’Eau, umowna sylwetka katedry św. Piotra, jezioro, Alpy | Kompozycja widoku znad jeziora; wycinek arkusza GPT Image |

**Format:** pięć grafik PNG RGBA 1620 × 900, ICC sRGB, bez nieba, przezroczysta góra kadru. Kontur ciemnogranatowy `#1d2f3b`, wzmocniony w postprodukcji; linia gruntu albo wody przy dole. Podpisy są wyłącznie na arkuszu podglądu `docs/art/podglady/panoramy-79.png`.

## Prompty / opisy do powtórzenia

- **Paryż:** duża Wieża Eiffla za dnia, Łuk, Notre-Dame, typowe kamienice i nabrzeże; płaskie kolory, gruby granatowy kontur, światło z lewej góry, transparentny skyline, bez napisów i marek.
- **Lyon:** bazylika Fourvière na wzgórzu, stara metalowa wieża, pastelowe domy nad Saoną, uproszczona ilustracja, mocny obrys, bez współczesnego wieżowca Part-Dieu.
- **Lille:** historyczny beffroi, Vieille Bourse, flamandzkie szczyty na Grand-Place, duże bryły, płaskie kolory, bez podpisów, przezroczysta przestrzeń ponad dachami.
- **Zurych:** dwie wieże Grossmünster i jeden zielony szpic Fraumünster, historyczne dachy, Limmat, Alpy i jezioro, widok poziomy w stylu A+.
- **Genewa:** silna struga Jet d’Eau, dawne miasto, katedra na wzgórzu, alpejski masyw, woda i panorama; brak napisów, bez nieba.

Prompty to opis redakcyjny, a nie dosłowne wewnętrzne prompty generatora. Cztery grafiki wycięto z arkuszy wielomiejskich wygenerowanych w ChatGPT; Paryż jest osobną generacją. Kadrowanie, usunięcie podpisów, skalowanie Lanczos, oczyszczenie alfa i pogrubienie ciemnych linii wykonano za pomocą Pillow/OpenCV.

## Weryfikacja i ograniczenia

- Tour Part-Dieu nie jest użyta w finalnym Lyonie, ponieważ współczesna architektura nie jest objęta francuskim wyjątkiem panoramy do użytku komercyjnego (CPI art. L122-5 pkt 11). W zamian widoczna jest starsza wieża metalowa Fourvière.
- Panoramy są stylizowane i nie gwarantują pełnej zgodności z jednym rzeczywistym punktem widzenia. Zwłaszcza Lille i Genewa wymagają weryfikacji topograficznej/architektonicznej przed zatwierdzeniem.
- Grafiki przygotowano bez tekstów, logotypów, flag i iluminacji nocnej Eiffla. Obiekty trzeba ocenić po przeskalowaniu około 5× w rzeczywistym kadrze gry.
- Pełna wersja tego manifestu oraz siedem plików w strukturze repo zostały przekazane właścicielowi osobno jako ZIP.
