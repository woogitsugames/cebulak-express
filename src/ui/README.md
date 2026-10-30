# Nagrywanie rolki — wspólny silnik (T44)

`src/record/recorder.ts` jest **jedynym silnikiem MediaRecorder**. `src/ui/record-runtime.ts` utrzymuje API zgodne z T37, ale deleguje wyłącznie do `VerticalVideoRecorder`. Kontrolka nie tworzy własnego strumienia ani nie implementuje osobno pobierania; używa `saveRecordedVideo`.

## API publiczne (bez zmian)

```ts
const control = createRecordControl({
  canvas,
  getAudio: () => audioCtx && audioMix ? { context: audioCtx, source: audioMix } : undefined,
  overlay: () => ({ km: game?.km ?? 0, route: route.from.name + ' → ' + route.to.name }),
  portalUrl: () => portalLink(settings.home, 'record'),
  shareVideo: (file, text, url) => platform.share(file, text, url),
  saveVideo: (video) => saveRecordedVideo(video),
});
document.getElementById('stage')!.appendChild(control.element);
// control.start(), control.stop(), control.dispose()
```

`recorderFactory?: (input) => RecordingBackend` pozostaje dla zgodności i testów, lecz standardowy backend już korzysta z T23. **Nie należy tworzyć kolejnego MediaRecorder w adapterze.** API `canvas`, `getAudio`, `overlay`, `portalUrl`, `shareVideo`, `saveVideo` nie zmieniło się.

## Zachowanie

- 1080 × 1920, docelowo 60 FPS, domyślnie 15 s (13,5 s rozgrywki + 1,5 s planszy końcowej).
- Plansza końcowa pokazuje adres portalu (host oraz ścieżkę bez UTM); przy braku poprawnego HTTP(S) nie zgadujemy portalu. W T23 można nadal używać osobnego tekstu „Zagraj”.
- Format dobierany w jednym miejscu: preferowane MP4/H.264 (z audio AAC, jeśli dostępne), w przeciwnym razie WebM. Format podawany w metadanych jest rzeczywistym `MediaRecorder.mimeType`.
- Podłączony miks Web Audio nie jest rozłączany od głośników; po nagraniu usuwana jest tylko gałąź `MediaStreamDestination`.
- Limit 15 MB jest sprawdzany na fragmentach i pliku końcowym. Zanik widoczności karty lub anulowanie odrzuca wynik i usuwa strumień, więc nie pojawia się ucięty podgląd.
- Pobranie w przeglądarce wykorzystuje `saveRecordedVideo`; sam adapter galerii Android/iOS nadal wymaga integracji natywnej. Funkcja `platform.share` to udostępnianie, nie zapis w galerii.
- Napisy i komunikaty kontrolki pochodzą z `UI` w `src/content/pl.ts`.

## Uruchomienie testów

```sh
npm ci
npm run typecheck
npm test
npm run build
npx playwright test e2e/recording.spec.ts --project="Desktop 1280x800 (Chromium)"
```

Test Playwright kompiluje produkcyjny `VerticalVideoRecorder` przez Vite do pamięci, uruchamia go w rzeczywistym Chromium na animowanym canvasie przez `canvas.captureStream`, zapisuje **3 s** i sprawdza MIME, nagłówek MP4/WebM, rozmiar pliku i czas nagrania. Parametr `durationMs` jest opcjonalnym skróceniem czasu na potrzeby testu (limit 15 s); standardowy przycisk go nie używa. Nie jest to dowód działania na fizycznym telefonie, w natywnym WebView ani w osadzonym iframe.

**Integracja:** T44 opiera się na oczekującym PR #42, który dodaje `record.ts` do `main.ts` i montuje kontrolkę. Po jego scaleniu T44 nie wymaga zmiany `src/main.ts`. Obecny przycisk zachowuje istniejące zachowanie, a jego domyślny backend wybiera jeden silnik.
