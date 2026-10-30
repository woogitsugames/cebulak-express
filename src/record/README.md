# T23 — nagrywanie pionowej rolki

Moduł `recorder.ts` nie modyfikuje `src/main.ts`, `src/render/renderer.ts` ani `src/platform/` — integrację tych plików prowadzi koordynator. Nie dodaje zależności npm.

## Decyzja techniczna: nagrywanie kolejnych 15 s

Po kliknięciu „Nagraj rolkę” zapisujemy **13,5 s rozgrywki + 1,5 s planszy „Zagraj: link”**. W ten sposób rolka trwa 15 s. Nie utrzymujemy bufora ostatnich 15 s: surowe ramki 1080×1920×4 bajty × 60 fps × 15 s wymagałyby ok. 7,5 GB RAM, a bezpieczne przycinanie fragmentów skompresowanego WebM/MP4 bez remuksowania jest niepewne. W pamięci znajdują się tylko skompresowane fragmenty jednego krótkiego nagrania. Po ukryciu karty nagrywanie jest przerywane, bo przeglądarka wstrzymuje requestAnimationFrame.

Film ma rozdzielczość 1080×1920 i żądane 60 FPS (`canvas.captureStream(60)`). Fizyczna liczba klatek może spaść na słabym urządzeniu. Obraz źródłowy Canvas jest przycinany do pionu 9:16, bez menu HTML i bez deformacji obrazu. Nad filmem dodawany jest znak wodny gry (własny obraz lub zaślepka „CE”), nazwa własnego portalu danego kraju, licznik km i nazwa trasy.

## Integracja dla koordynatora

Przycisk „Nagraj rolkę”, wskazanie konkretnego portalu, dobór linku, uruchomienie przejazdu i podłączenie adaptera są po stronie koordynatora (właściciela `src/main.ts`). Przykład:

~~~ts
import { VerticalVideoRecorder, isEditorialMode, saveRecordedVideo } from './record/recorder';
import type { GalleryVideoAdapter } from './record/recorder';

function newClip(): VerticalVideoRecorder {
  return new VerticalVideoRecorder({
    sourceCanvas: canvas,
    routeName: route.from.name + ' → ' + route.to.name,
    portalName: portalForCountry(settings.home), // mapa własnych portali po stronie koordynatora
    playUrl: new URL('/', location.href).href,   // publiczny, krótki adres gry
    getKm: () => game?.km ?? 0,
    // gameLogo: wczytany obraz z T10,
    // portalLogo: wczytany obraz portalu,
    // audio: { context: audioContext, source: masterGain }, // T19
  });
}

async function recordClip(adapter?: GalleryVideoAdapter): Promise<void> {
  const recorder = newClip();
  try {
    const video = await recorder.start();
    await saveRecordedVideo(video, adapter);
  } catch (error) {
    // Pokaż graczowi czytelną informację: anulowanie, brak kodeka itp.
    console.error('Błąd nagrywania', error);
  }
}

// btnRecord.addEventListener('click', () => void recordClip(platform.galleryAdapter));
if (isEditorialMode(location.search)) {
  // W trybie ?redakcja=1 pomiń menu: newRun(); game?.flap();
  // i rozpocznij recordClip() automatycznie lub po pierwszym kliknięciu.
}
~~~

Nie uruchamiaj równolegle dwóch nagrań tej samej instancji; `start()` drugiego nagrania zwróci błąd. Przy końcu/wyjściu gry wywołaj `cancel()`, co odrzuci wynik bez zapisania uciętego filmu. Menu jest osobnym HTML i w kadrze nie pojawia się nawet w standardowym trybie; w `?redakcja=1` koordynator ma również ukryć menu na ekranie redaktora. Utwórz nową instancję dla zmienionej trasy.

### Audio z T19

Opcjonalne `audio: { context, source }` musi wskazywać na ten sam `AudioContext` i na główny węzeł miksu (`AudioNode`, np. masterGain). Sam kontekst nie pozwala odczytać jego miksu. Moduł tworzy `createMediaStreamDestination()`, dołącza węzeł i ścieżkę audio do strumienia, a po nagraniu odłącza tylko tę gałąź — dźwięk słyszany przez gracza pozostaje nienaruszony. Wznowienie `AudioContext.resume()` należy wykonać w handlerze kliknięcia przed rozpoczęciem nagrywania.

### Zapis do galerii w Capacitor (T24)

Interfejs eksportowany przez moduł:

~~~ts
interface GalleryVideoAdapter {
  saveVideoToGallery(video: RecordedVideo): Promise<void>;
}
interface RecordedVideo {
  blob: Blob;
  filename: string;
  mimeType: string;
  width: 1080;
  height: 1920;
  durationMs: 15000;
}
~~~

Adapter po stronie `src/platform/` ma zapisywać wideo do **Android MediaStore** lub **iOS Photos** z właściwymi uprawnieniami. `@capacitor/filesystem` samodzielnie zapisuje zwykle do sandboxa aplikacji i nie gwarantuje widoczności w galerii. Plik WebM może wymagać konwersji do MP4/H.264 na iOS. Nie wolno zakładać, że natywny zapis do galerii już działa — T24 ma go zaimplementować i przetestować. Wywołanie `saveRecordedVideo(video, adapter)` deleguje zapis, bez adaptera uruchamia pobranie pliku na web. W `iframe sandbox` może być wymagane `allow-downloads`. Pobranie przez Safari iOS nie jest równoważne zapisowi do Zdjęć.

### Kodeki, rozmiar i ograniczenia

W pierwszej kolejności wybierany jest MP4/H.264 (z AAC przy dołączonym audio), później WebM VP9/VP8. Obsługa MIME jest weryfikowana przez `MediaRecorder.isTypeSupported()`; gdy konstruktor odrzuci opcje, moduł podejmuje próbę z opcjami domyślnymi. Nazwa pliku i MIME wynikają z faktycznie wybranego formatu.

Założone bitrate: 4,8 Mb/s wideo i 96 kb/s audio; oczekiwany plik ma ok. 9,2 MB. **Limit 15 000 000 bajtów jest egzekwowany**: w razie przekroczenia nagranie kończy się błędem, nie jest wysyłany za duży plik. Enkodery mogą nie przestrzegać sugerowanego bitrate. Nie ma dodatkowego transkodowania.

- **Chrome Android i desktop**: podstawowa ścieżka MediaRecorder jest zaimplementowana; wymagany test na prawdziwym urządzeniu (60 FPS, audio, odtwarzanie MP4/WebM, rozmiar).
- **Safari iOS i WKWebView**: różna dostępność captureStream, MediaRecorder, kodeków, Web Audio i pobierania plików. Moduł zwraca jawne błędy, jeśli API nie istnieje. iOS nie został przetestowany.
- Skalowanie gotowego obrazu do 1080×1920 nie zwiększa natywnej ostrości aktualnego canvasu; dla najwyższej jakości koordynator może w przyszłości dodać dedykowany render w pełnej rozdzielczości. Nagrywanie 60 FPS może obciążyć słabszego Androida.

## Testy

`tests/recorder.test.ts` obejmuje stałe czasu/obrazu, wybór MIME, kadr 9:16, tryb redakcyjny, dzielenie linków, start→CTA→stop, anulowanie, sprzątanie ścieżek i adapter galerii. Testy nie stanowią dowodu, że wybrany telefon poprawnie koduje film. Polecenia projektu: `npm ci && npm run typecheck && npm test && npm run build`.
