# Zrzuty ekranu — specyfikacja produkcyjna Google Play

**Status:** specyfikacja, **nie gotowe zrzuty do sklepu**. Sprawdzono drzewo `main` 30.10.2026: brak `public/assets/brand/` i `public/assets/backgrounds/` / zasobów z zleceń 05–10. Nie komponujemy fikcyjnych ekranów gry. Gotowe pliki PNG należy wykonać po integracji modułów i przechwycić z działającej aplikacji.

## Parametry wspólne

- **8 obrazów:** `1080 × 1920 px` (9:16), pion; PNG 24-bit RGB (bez kanału alfa, profil sRGB). To poprawny format dla telefonu w Google Play. Dopuszczalny też JPEG, ale rekomendujemy PNG dla tekstów.
- **Podstawa każdej grafiki:** autentyczny kadr z aplikacji Android (Capacitor) 1080×1920 albo autentyczny kadr 360×640 renderowany 3×; *nie* podstawiać widoku z innej gry ani atrakcyjniejszych, nieistniejących elementów UI.
- **Nagłówek:** jedna, maks. dwuwierszowa fraza z tabeli, bez logo/flag/ikon cudzych marek. Proponowana typografia: mocny bezszeryfowy krój z OFL, biały z ciemnym konturem; tekst tworzyć oddzielną warstwą po zrzucie (renderowanie po 3×).
- **Kompozycja:** cała plansza to autentyczny zrzut. Na wierzchu dyskretny gradient w górnym obszarze **y=0–320 px**, nagłówek na **y≈110–260 px**. Jeśli zasłania HUD lub interakcję, przenieść nagłówek w inne *puste* miejsce, nie usuwać elementów gry. Zostawić 60 px bocznego marginesu. Nie naśladować systemowego paska powiadomień.
- **Kolorystyka:** ciepła, nasycona (słońce z lewej góry), grube kontury zgodnie z GDD; spójny styl w całej serii. Pierwsze trzy muszą jasno pokazywać prawdziwą rozgrywkę i wybór trasy.
- **Uczciwość:** nie tworzyć sztucznych wyników, ocen, liczników instalacji, komentarzy użytkowników ani rzekomych cech, których nie ma w wersji produkcyjnej.
- **Ograniczenia Google Play:** 2 zrzuty minimum dla publikacji; maksymalnie 8 na typ urządzenia; dla rekomendowania gier przydatne ≥3 pionowe 1080×1920 prezentujące gameplay. Własne osiem to pełna seria; nie należy publikować niewdrożonych ekranów. 1080×1920 jest krótszy niż maksymalny dozwolony stosunek dłuższego boku do krótszego (2:1).

## Scenariusz ośmiu ekranów

| Nr | Plik docelowy | Nagłówek | Kadr z gry (brief graficzny) | Warunek przed eksportem |
|---:|---|---|---|---|
| 1 | `01-jeden-dotyk.png` | **JEDEN DOTYK. I LECISZ!** | Pierwszy kadr rozgrywki: generyczne kombi w locie, czytelny HUD km, przeszkoda infrastrukturalna, 8:16 fragment bez liter z cudzych marek. | sterowanie one-tap; rzeczywista scena z bieżącego builda |
| 2 | `02-z-osmiu-krajow.png` | **Z 8 KRAJÓW DO POLSKI** | Rzeczywisty ekran wyboru kraju; osiem dostępnych kierunków wyjazdu: BE, NL, DE, UK, FR, CH, NO, DK. | wszystkie osiem krajów uruchamia grywalne trasy |
| 3 | `03-bagaz-na-dachu.png` | **BAGAŻ? JESZCZE SIĘ ZMIEŚCI** | Rozgrywka: kombi z walizkami na dachu nad drogą; widoczny element otoczenia i odległość w km. | sprite kombi z produkcyjnej grafiki, nie model prawdziwego auta |
| 4 | `04-sloiki-i-paczki.png` | **SŁOIKI DODAJĄ KILOMETRY** | Moment zbierania słoika/paczki z prawdziwym komunikatem +km oraz widocznym pojazdem. | premia kilometrów i chwilowe obciążenie działają |
| 5 | `05-po-drodze-do-domu.png` | **PO DRODZE DO DOMU** | Rzeczywisty widok trasy z przejściem krajobrazu/granicą i komunikatem o dalszym dystansie. | checkpointy i zmiana tła istnieją w buildzie |
| 6 | `06-liga-polonii.png` | **KAŻDY KM DLA POLONII** | Rzeczywisty ekran Ligi Polonii: państwa, suma km i uczciwie wyświetlony ranking; nie podmieniać liczb w grafice. | ranking połączony z produkcyjnym backendem; brak demonstracyjnych fałszywych rekordów |
| 7 | `07-wyzwanie-dnia.png` | **TA SAMA TRASA. NOWY WYNIK** | Rzeczywisty ekran trybu dziennego i/lub gry ze wskazanym wyzwaniem i wynikiem. | codzienny seed i ekran wyzwania faktycznie dostępne |
| 8 | `08-udostepnij-wynik.png` | **POCHWAL SIĘ KILOMETRAMI** | Prawdziwa karta po zakończonym przejeździe: km, trasa, dostępna funkcja udostępniania. | eksport karty działa; wynik pochodzi z prawdziwego przejazdu |

## Kolejność narracyjna w sklepie

1–3: natychmiast rozpoznawalna gra, wybór ośmiu krajów i wizualna osobowość przeładowanego kombi. 4–5: unikatowa mechanika bagażu i podróż do Polski. 6–8: aspekt społeczny, powtarzalne wyzwanie, udostępnianie wyniku. **Jeśli zlecenia 11, 14 lub 18 nie zostaną ukończone, dany kadr należy pominąć** i zastąpić nowym *istniejącym* wariantem rozgrywki; nigdy nie umieszczać zrzutu funkcji planowanej.

## Pipeline po scaleniu zależności

1. Zbudować APK/AAB z aktualnego `main`; potwierdzić, że assety z 05–10 i funkcje z 11, 14, 18 rzeczywiście działają.
2. Na urządzeniu w 9:16 nagrać testowe przejazdy lub wykonać screen capture przy stabilnej rozdzielczości. Wykonać co najmniej 3 warianty gameplayu do wyboru, bez danych osobowych na pasku powiadomień.
3. W edytorze graficznym dodać jedynie nagłówek + subtelny gradient; przeprowadzić kontrolę autentyczności 1:1 z aplikacją i kontrolę czytelności w miniaturze (np. 180×320).
4. Wyeksportować 8 PNG RGB do `public/assets/store/`. Do `ASSETS.md` dodać dla każdego pliku źródło kadru, wersję builda i autora nakładki.
5. Sprawdzić każdą grafikę: 1080×1920, brak alfa, kolory sRGB, zrozumiały nagłówek, brak realnych znaków, twarzy i godła. Przeprowadzić podgląd w konsoli sklepu.
6. Jeśli App Store użyje innych proporcji ekranów urządzeń, **wykonać osobne przechwycenia z odpowiedniego symulatora/urządzenia**, nie rozciągać Androidowych obrazów.

## Zimowe ramki (zlecenie 119)

Grudniowy wariant planszy: prawdziwy zrzut w zimowej ramce z [`ramki/`](ramki/ASSETS.md). Ramki zostają w `docs/`.

1. `npm run build && npm run store:shots` — zapisuje autentyczne kadry Google Play 1080×1920 jako
   `public/assets/store/screenshot-01.png` … `-08.png` (skrypt nie ustawia `?sezon=zima` — zimowe kadry wymagają dopisania tego parametru w `tools/store-shots/shoot.mjs` albo przechwycenia 1–26 grudnia; letnie kadry w zimowej ramce też są dopuszczalne, bo pokazują prawdziwą grę).
2. Złożyć planszę (Pillow: `python -m pip install Pillow`), np. kadr z wyborem kraju w ramce 02:
   ```sh
   mkdir -p /tmp/ramki-zima
   python docs/sklep/ramki/skladaj.py public/assets/store/screenshot-02.png 2 /tmp/ramki-zima/02.png
   ```
   Skrypt skaluje zrzut proporcjonalnie do 840 px szerokości, wyrównuje do góry okna i przycina tylko dół
   (z 1080×1920 ginie ok. 113 px na dole — sprawdzić, czy nie znika tam istotny element UI).
3. Numer ramki dobrać do treści zrzutu (podpisy w `ramki/ASSETS.md`); nie publikować podpisu o funkcji, której nie widać na kadrze.
4. Wyników nie commitować do `public/` (nie są potrzebne w aplikacji); wgrać ręcznie w konsoli Google Play po kontroli w miniaturze 180×320.

## Uzupełniające assety

Ikona oraz `play-feature-1024x500.png` należą do **zlecenia 10**, nie duplikujemy ich w tym PR. Tutaj przygotowujemy wyłącznie osiem zrzutów po integracji.

**Źródła (dostęp 30.10.2026):** [Google Play — Add preview assets](https://support.google.com/googleplay/android-developer/answer/9866151), [Google Play — Best practices](https://support.google.com/googleplay/android-developer/answer/13393723), [Google Play — Metadata and deceptive behaviour](https://support.google.com/googleplay/android-developer/answer/18265346).
