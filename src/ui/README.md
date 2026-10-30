# T37 — kontrolka „Nagraj rolkę”

Moduł `src/ui/record.ts` dostarcza `createRecordControl({ canvas, getAudio, overlay, portalUrl })`, zwracające `element`, `start()`, `stop()`, `dispose()`. Element należy dodać do `#stage`. Nie modyfikujemy plików koordynatora (`src/main.ts`, `index.html`, `src/style.css`). CSS kontrolki jest lokalny; w trybie `?redakcja=1` ukrywa `#menu`, `#hud`, `#over`. Tryb redakcyjny automatycznie zaczyna nagrywać po pierwszym tapnięciu canvasu. Koordynator musi dodatkowo uruchomić przejazd bez menu, aby tapnięcie uruchamiało rozgrywkę.

## Integracja w `src/main.ts` (po scaleniu zależności)

~~~ts
import { createRecordControl } from './ui/record';
import { portalLink } from './content/portals';
import { platform } from './platform';
import { VerticalVideoRecorder, saveRecordedVideo } from './record/recorder';
import { isEditorialMode } from './ui/record';

const recordControl = createRecordControl({
  canvas,
  getAudio: () => audioContext && mix ? { context: audioContext, source: mix } : undefined,
  overlay: () => ({ km: game?.km ?? 0, route: `${route.from.name} → ${route.to.name}` }),
  portalUrl: () => portalLink(settings.home, 'record'),
  shareVideo: platform.share,
  saveVideo: (video) => saveRecordedVideo(video), // native: dopiąć MediaStore/Photos adapter, gdy będzie dostępny
  recorderFactory: (input) => {
    // Opcjonalne: zamiast samodzielnego engine T37 użyj rejestratora z T23.
    const recorder = new VerticalVideoRecorder({
      sourceCanvas: input.canvas,
      routeName: input.overlay().route,
      portalName: new URL(input.portalUrl() ?? location.origin).hostname,
      playUrl: new URL('/', location.href).toString(),
      getKm: () => input.overlay().km,
      audio: input.getAudio(),
    });
    return { start: () => recorder.start(), cancel: () => recorder.cancel() };
  },
});
document.getElementById('stage')!.appendChild(recordControl.element);

// W main.ts: init audio przed startem nagrywania, udostępnij AudioContext oraz mix.
// W trybie redakcyjnym utwórz run na starcie bez menu. Pierwszy tap uruchomi
// zarówno game.flap(), jak i nagrywanie (listener canvasu ma capture=true).
if (isEditorialMode(location.search)) newRun();
// Gdy gra zostanie zdemontowana / zmieniony widok, wywołaj recordControl.dispose().
~~~

**Ważne:** przy rozpoczęciu T37 gałąź `main` nie zawierała jeszcze `src/record/recorder.ts`, `src/platform/index.ts` ani `src/content/portals.ts` (osobne T23/T24/T16). Podczas realizacji moduły te zostały scalone do `main`; samodzielny silnik MediaRecorder wciąż działa bez nich, ale przy integracji zalecane jest użycie pokazanych adapterów i istniejącego `VerticalVideoRecorder`. `getAudio` musi otrzymać istniejący miks gry (GainNode podpięty do efektów i muzyki) odblokowany po interakcji. Dla `shareVideo` natywne `platform.share(file,text,url)` z T24 udostępnia plik, ale **nie oznacza zapisu do galerii**. Natychmiastowy zapis do galerii wymaga osobnego adaptera MediaStore/Photos; T24 obecnie go nie udostępnia.

## Działanie i ograniczenia

- 1080×1920, docelowe 60 FPS, 15 s: 13,5 s gry i 1,5 s planszy z adresem portalu. Canvas źródłowy przycinany 9:16 bez rozciągania; DOM/HUD nie trafia do filmu.
- Najpierw próbujemy MP4/H.264 + AAC, potem WebM/VP9/Opus; ogólny MP4 jest ostatnią opcją (Chromium bywa w stanie zapisać VP9/Opus w kontenerze MP4, trudnym do publikacji).
- Limit pliku 15 MB; brak nieograniczonego bufora surowych klatek. `visibilitychange` przerywa, a przerwany film nie trafia do podglądu.
- W trybie web: Web Share z `File`, jeśli `canShare` pozwala; w innym przypadku pobieranie. Dla osadzonego iframe sprawdzić `allow="web-share"`, `sandbox="allow-downloads ..."`.
- Bez dodatkowych paczek npm, bez ikon firm trzecich. Ikona kamery jest lokalnym inline SVG; na `main` nie ma `public/assets/ui/`.

## Weryfikacja

- `tsc --strict --noEmit` dla dodanych plików przechodzi lokalnie (TypeScript 5.8.3). Pełna ścieżka `npm ci && npm run typecheck && npm test && npm run build` przeszła na GitHub Actions CI w PR #39 (30.10.2026). Lokalnie pełnego zestawu npm nie uruchomiono ze względu na brak dostępu do rejestru.
- **Rzeczywisty Chromium na desktopie (headless, 30.10.2026)**: nagrano demonstracyjny animowany canvas wraz z tonem Web Audio podłączonym do miksu. WebM VP9/Opus, 1080×1920, 1 678 766 bajtów. Ostatnia klatka 14,984 s, ostatni pakiet audio 14,967 s. Test `ffprobe` potwierdził osobne strumienie wideo i audio, `ffmpeg volumedetect` zmierzył średnio −13,5 dB. Plansza końcowa wyświetlała `aktualnosci.be`.
- **Nie sprawdzono** produkcyjnej gry z docelowymi efektami, Chrome na fizycznym Androidzie, natywnego udostępniania przez Capacitor, pobierania z iframe ani zapisu do galerii. Rozmiar 1,68 MB dotyczy prostej animacji testowej, a nie pełnego renderera gry.
