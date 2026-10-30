# Warstwy tła Canvas — obowiązujący kontrakt zlecenia 33

Świat gry: **360 × 640 px logicznych**, źródłowe PNG: **@3x** (1 px logiczny = 3 px pliku).
Renderer skaluje układ logiczny do urządzenia, także przy DPR 2–3. **Nie wolno** zmniejszać
PNG do Canvas 1x przed renderowaniem: `drawImage(oryginał, x, y, width, height)` ma
bezpośrednio próbować obraz @3x.

## Wspólne kotwice warstw

| Warstwa | PNG @3x | Wymiary logiczne | Początek Y (logiczny) | Koniec Y | Paralaksa |
|---|---:|---:|---:|---:|---:|
| sky | 1080×1920 | 360×640 | 0 | 640 | 0 |
| clouds | 2160×600 | 720×200 | 110 | 310 | 0,15 |
| far | 2160×900 | 720×300 | 255 | 555 | 0,25 |
| near | 2160×720 | 720×240 | 418 | 658 (droga zasłania dół) | 0,5 |
| road | 1080×330 | 360×110 | **530** | 640 | 1,0 |

Wszystkie wartości są wspólne dla krajów: BE, NL, DE, UK, FR, CH, NO, DK, SE i PL.
Są zapisane w `src/render/background.ts` jako `LAYER_Y`. Powtarzalne warstwy
`clouds`, `far`, `near` i `road` przewijają się poziomo, bez skalowania wysokości
ani dodatkowego dopasowywania do dolnej krawędzi świata.

**Droga i kolizja:** obraz drogi zaczyna się na **y=530**. Jego górne 50 px
logicznych jest przeznaczone na pobocze/barierę; **górna krawędź asfaltu ma wypadać
na y=580**, dokładnie jak `WORLD.groundY` w `src/core/config.ts`.
Nie przesuwamy drogi do y=580 (wówczas asfalt byłby za nisko) ani do y=574.
Grafik eksportujący nowy kraj powinien sprawdzić przy y=580 przebieg krawędzi
asfaltu w wynikowym obrazie. Pasy i obiekty drogi rysujemy **po przeszkodach,
przed bohaterem**. Górny pas przezroczystości/ilustracji nie powinien przesłaniać
istotnych fragmentów przeszkód poza obszarem pobocza.

## Punkty trasy

- Punkt `city`, `landmark` lub `crossing` należy do warstwy **far**, przed `near`.
  Panorama jest wyświetlana z pliku 1620×900 jako **480×267** logicznych
  (decyzja D14 „A+”, ≈1,45× dawnego 330×183), z dolną krawędzią na **y=555**
  (`far`), więc jej górna krawędź wypada na **y≈288** — pod HUD i dymkami.
  Panorama jest **szersza niż ekran telefonu (360)**: gdy miasto jest na środku,
  widać ok. 3/4 obrazu; brzegi pliku pokazują się dopiero przy przewijaniu
  (paralaksa 0,25 = 5 px na km).
- **Co widzi gracz z pliku 1620×900:** 1 px logiczny ≈ 3,4 px pliku, na ekranie
  DPR 3 obraz jest wyświetlany ok. 1,1× mniejszy niż plik — kontur 9–10 px
  zostaje czytelny. Dolne ok. **25 px logicznych** (≈ 85 px pliku) zasłania
  zwykle near i bariera drogi (asfalt od y=530/580): grunt/wodę przy dolnej
  krawędzi traktujemy jako podstawę, nie jako ważny element sylwetki.
  Najważniejsze budowle trzymaj w środkowych ~70% szerokości.
- **Wygaszanie ogólnego far:** gdy panorama jest widoczna, ogólne domki i wzgórza
  z `<cc>-far.png` są ukrywane za nią (`farLayerAlphaAt` w `background.ts`):
  całkowicie w obrębie panoramy pomniejszonej o **40 px** z każdej strony,
  potem miękka rampa **96 px** na zewnątrz. Siła wygaszenia idzie za fade
  panoramy (0,4 s) i działa z przenikaniem krajów, wariantami zimowymi
  i szerokimi ekranami. Dlatego **tło panoramy musi być przezroczyste**
  (niebo daje warstwa sky), a przerwy między budynkami pokażą niebo, nie
  wzgórza far. Gdy PNG panoramy jeszcze się ładuje (zastępcza sylwetka),
  far zostaje bez zmian. W trybie oszczędnym rampa jest rysowana szerszymi pasami.
- Punkty `border` i `rest` należą do warstwy **near**, również gdy posiadają
  obraz w `public/assets/landmarks/`. Wyświetlamy je jako **180×100** logiczne,
  z dolną krawędzią na **y=580** (przy drodze).
- Wybieramy **jeden punkt najbliższy środkowi ekranu według przesunięcia X (z uwzględnieniem paralaksy)**; podczas zmiany
  przez **0,4 s** przenikają wyłącznie stary i nowy punkt. Przy jednakowej
  odległości pierwszeństwo ma wcześniejszy punkt w tablicy trasy. Dla
  przygranicznych `border` i `rest` oddalonych o 8 km oznacza to, że
  stacja nie przykrywa stale znaku granicy.
- Położenie X: `WORLD.width/2 + ((point.km - progressKm)/KM_PER_PX) * parallax`.
  `progressKm` i współczynnik paralaksy odpowiadają rzeczywistemu typowi
  warstwy; nie stosujemy współczynnika `far` dla stacji.
- `pl-border-near.png` jest **wariantem zastępującym near**, a nie kolejną
  warstwą na wierzchu. W sezonie letnim jest przenikany przy granicy:
  od 18 km przed punktem `border` do 18 km za następującym `rest`,
  z rampami 6 km. Gdy wariant przedstawia stację, nie rysujemy jej drugi raz
  jako landmarku. Zimą wariant jest wyłączony — obecnie brak wersji śnieżnej.

## Pasy na ekranach wyższych niż 9:16

Dla 390×844 px, DPR=3, `resize` wylicza skale i dodatnie `offsetY`.
Przed renderowaniem świata, z transformacją Canvas ustawioną już na WORLD:

- Powyżej y=0 przedłużamy **pierwsze 3 wiersze źródłowego sky** do górnego
  brzegu ekranu; nie używamy oddzielnego koloru palety, gdy PNG jest gotowy.
- Poniżej y=640 przedłużamy **ostatnie 3 wiersze road**, z takim samym
  przesunięciem X kafelka co w świecie. Podczas zmiany kraju stosujemy
  ten sam crossfade (1,5 s) co na całym tle.
- Gdy pliku brak lub jeszcze się ładuje, stosujemy zastępcze barwy;
  bez osobnej alokacji tekstury. Nie rysujemy proceduralnego nieba
  ani zastępczej drogi poza granicami świata, aby nie przykryły przedłużeń.
- W trybie poziomym skrajne boczne pasy pozostają fallbackiem palety;
  szczegółowe przedłużanie kolumn bocznych wykracza poza zakres zlecenia 33.

Początek `Renderer.draw` wywołuje `background.drawOutsideWorld(...)` przed
wycięciem poziomym i rysowaniem sceny. Obrazy są dostępne z tej samej instancji
`BackgroundRenderer`, której `drawBackground` i `drawRoad` używają w danej klatce.

## Warianty, ładowanie i budżet

- `BackgroundState.season`: `'summer'` (domyślnie) lub `'winter'`.
  Dla Polski zimowe źródła to `pl-sky-zima.png`, `pl-far-zima.png`
  i `pl-near-zima.png`. Chmury i droga pozostają wspólne.
  Meta trasy stosuje `landmarks/dom-meta-zima.png` z fallbackiem
  `dom-meta.png`; brak zimowego PNG kraju również daje fallback letni.
- `AssetLoader.prime(startCountry, route, heroPaths, season)` ładuje kraj
  startowy i **unikalne kraje z `route.waypoints`**. Kraje niewystępujące
  na trasie oraz landmarki ładuje leniwie. 404 jest pamiętane, nie ponawiane.
- Buforowane są wyliczone ścieżki plików; pętla animacji nie alokuje list
  kafelków ani list widocznych panoram. Cache bazuje na pikselach źródłowych
  @3x (domyślny próg: 48 mln pikseli), a evikcja LRU zachodzi po ładowaniu.

## Weryfikacja integracji

Sprawdzić na Chrome, profil **390×844, DPR=3**, dla BE, DE i granicy PL:

1. W panelu Performance sprawdzić ostrość (źródło PNG @3x), fps i brak
   niekontrolowanego pobierania innych krajów; test 4× CPU throttling.
2. W podglądzie sceny przyłożyć linię do **y=580 logicznego**: zaczyna się asfalt,
   a warstwy znajdują się na kotwicach z tabeli.
3. Zmienić kraj i punkt w trakcie przejazdu: fade 1,5 s / 0,4 s, bez stałego
   zasłaniania się panoram; `border` i `rest` są przy poboczu.
4. Porównać przed/po zrzuty z BE, DE i PL z granicą i dołączyć do PR.
   Zimą zweryfikować wymianę trzech polskich teł i `dom-meta`.

Ta dokumentacja określa kontrakt dla przyszłych grafików; faktyczne pomiary
fps i zrzuty należy wykonywać na uruchomionej grze z aktualnymi PNG.

---

## Uzupełnienie ze zlecenia 41 (pomiar krawędzi asfaltu)


Gra korzysta z logicznej siatki **360 × 640 px** i fizycznych assetów **@3x**.
Wspólna linia kolizji z podłożem to `WORLD.groundY = 580` (piksele logiczne).

## Droga: obowiązkowe wymiary i współrzędne

| Parametr | Wartość |
|---|---:|
| Plik `public/assets/countries/<cc>/<cc>-road*.png` | **1080 × 330 px** |
| Wymiary renderowanej warstwy | 360 × 110 px logicznych |
| Pozycja warstwy drogi w świecie | **y = 530** px logicznych |
| Początek asfaltu w pliku drogi | **wiersz 150 ±3** (fizyczny px) |
| Początek asfaltu we współrzędnych świata | `530 + 150 / 3 = 580` |
| Dolna krawędź PNG | `530 + 330 / 3 = 640` |
| Paralaksa warstwy | 1,0; poziome kafelkowanie bez szwu |

- **Wiersze 0–149**: bariera, pobocze i opcjonalne tło nad nawierzchnią; ich kolory nie mogą udawać długiego, szerokiego pasa asfaltu.
- **Wiersz 150**: górna, ciągła krawędź ciemnej nawierzchni — miejsce styku z hitboxem kombi.
- **Wiersze 150–329**: nieprzezroczysty asfalt, z oznakowaniem poziomym; nie zostawiaj przezroczystych pasków u dołu.
- **Krawędzie X**: pierwsza i ostatnia kolumna kafelka muszą się ze sobą zgadzać, aby podczas przewijania nie powstawał szew.
- **Warianty zimowe** `*-road-zima.png` i inne `*-road-*.png` muszą spełniać identyczną regułę, jeśli istnieją.

## Pomiar i test

```bash
node tools/art/measure-road.mjs
node tools/art/measure-road.mjs --json
npm run typecheck && npm test && npm run build
```

Narzędzie wykrywa górną krawędź długiego, ciemnego pasa na podstawie zdekodowanych pikseli PNG — nie odczytuje deklarowanych współrzędnych z nazwy ani metadanych. Test `tests/road-alignment.test.ts` wykrywa automatycznie wszystkie warianty dróg w każdym folderze kraju, odrzuca niewłaściwe wymiary i odchylenia powyżej trzech pikseli.

## Integracja renderera — zależność do weryfikacji przez koordynatora

**Uwaga:** w kodzie `src/render/background.ts` z `main` (stan w chwili pracy nad zleceniem 41) pozycja warstwy `road` wynosiła `WORLD.groundY - 6`, czyli **574**, a nie **530**. Przy takiej pozycji nawet prawidłowo przygotowana grafika ma asfalt w `574 + 150 / 3 = 624`, czyli **44 px logiczne poniżej** linii kolizji. Samą zmianą PNG tego nie da się skorygować bez naruszenia geometrii obrazu.

Właściciel `src/render/background.ts` powinien w odrębnym kroku umieszczać warstwę na `WORLD.groundY - 50` (**530**). Zlecenie 41 dotyczy przede wszystkim plików PNG, więc **nie zmienia** renderera ani fizyki `src/core/`.

Zmodyfikowane obrazy mają oryginalne kontury i oznakowanie poziome. Pomiędzy pierwotną barierą a nawierzchnią dodano poziomy pas pobocza odpowiednio do kraju. W razie regeneracji assetów z dawnych skryptów artystycznych trzeba ponownie zastosować tę regułę lub dostosować generatory, aby nie przywróciły starej geometrii.