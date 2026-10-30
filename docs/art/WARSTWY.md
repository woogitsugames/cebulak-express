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
  Panorama jest wyświetlana z pliku 1620×900 jako **330×183** logiczne,
  z dolną krawędzią na **y=555** (`far`).
- Punkty `border` i `rest` należą do warstwy **near**, również gdy posiadają
  obraz w `public/assets/landmarks/`. Wyświetlamy je jako **180×100** logiczne,
  z dolną krawędzią na **y=580** (przy drodze).
- Wybieramy **jeden punkt najbliższy kilometrowi środka ekranu**; podczas zmiany
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
