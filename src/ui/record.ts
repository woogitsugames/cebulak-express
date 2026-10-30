import { UI, fill } from '../content/pl';
import { saveRecordedVideo } from '../record/recorder';
import { RecordingState, isEditorialMode } from './record-state';
import {
  createCanvasRecordingBackend,
  portalAddress,
  RECORD_DURATION_MS,
  type RecordedVideo,
  type RecorderInput,
  type RecordingBackend,
} from './record-runtime';

export { isEditorialMode } from './record-state';
export type { RecordedVideo, RecordingBackend, RecorderInput } from './record-runtime';

export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'unavailable';

export interface RecordControlOptions {
  canvas: HTMLCanvasElement;
  getAudio: () => { context: AudioContext; source: AudioNode } | undefined;
  overlay: () => { km: number; route: string };
  portalUrl: () => string | undefined;
  /** Po scaleniu T23: adapter do VerticalVideoRecorder. Brak adaptera = samodzielny recorder. */
  recorderFactory?: (input: RecorderInput) => RecordingBackend;
  /** Po scaleniu T24: przekazać platform.share, aby natywnie udostępnić plik. */
  shareVideo?: (file: Blob | null, text?: string, url?: string) => Promise<ShareOutcome>;
  /** Po scaleniu T23/T24: saveRecordedVideo(video, galleryAdapter). */
  saveVideo?: (video: RecordedVideo) => Promise<unknown>;
}

export interface RecordControl {
  element: HTMLElement;
  start(): void;
  /** Przerywa bieżące nagranie; w podglądzie usuwa poprzedni klip. */
  stop(): void;
  dispose(): void;
}

const RECORD_CSS = `
.ce-record-control { position:absolute; z-index:40; left:50%; bottom:max(18px, env(safe-area-inset-bottom));
  transform:translateX(-50%); width:min(93vw, 420px); box-sizing:border-box; padding:0;
  font:600 15px/1.35 system-ui,sans-serif; color:#fff; pointer-events:auto; text-align:center; }
.ce-record-control [hidden] { display:none !important; }
.ce-record-control button { font:inherit; cursor:pointer; border:2px solid rgba(255,255,255,.64);
  border-radius:999px; background:#19394a; color:#fff; padding:11px 18px; touch-action:manipulation; }
.ce-record-control button:focus-visible { outline:3px solid #ffdc74; outline-offset:3px; }
.ce-record-control button:disabled { opacity:.5; cursor:wait; }
.ce-record-control .ce-record-start { background:#c12f39; box-shadow:0 5px 22px #0007; }
.ce-record-control .ce-record-start svg { width:21px; height:21px; fill:currentColor; vertical-align:middle; margin-right:8px; }
.ce-record-control .ce-record-live, .ce-record-control .ce-record-preview,
.ce-record-control .ce-record-editorial-hint { padding:14px; border-radius:16px; background:#13252de8;
  box-shadow:0 5px 24px #0008; backdrop-filter:blur(4px); }
.ce-record-control .ce-record-dot { display:inline-block; width:12px; height:12px;
  border-radius:100%; background:#fa3544; margin-right:8px; vertical-align:middle; }
.ce-record-control .ce-record-preview video { display:block; width:100%; max-height:56vh;
  margin:10px auto; border-radius:10px; background:#0c1824; }
.ce-record-control .ce-record-actions { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; }
.ce-record-control .ce-record-actions button { flex:1; white-space:nowrap; padding:10px 8px; }
.ce-record-control .ce-record-message { display:block; margin-top:8px; padding:5px 8px;
  border-radius:8px; background:#19394ae8; overflow-wrap:anywhere; }
.ce-record-control .ce-record-message:empty { display:none; }
[data-ce-record-editorial="1"] #menu, [data-ce-record-editorial="1"] #hud,
[data-ce-record-editorial="1"] #over { display:none !important; }
@media (prefers-reduced-motion:no-preference) {
  .ce-record-control .ce-record-dot { animation:ce-record-blink 1s ease-in-out infinite alternate; }
  @keyframes ce-record-blink { to { opacity:.3; } }
}
`;

function makeElement<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

function makeButton(label: string, className?: string): HTMLButtonElement {
  const button = makeElement('button', className);
  button.type = 'button';
  button.textContent = label;
  return button;
}

/** Nie udostępniamy schematów innych niż http/https ani nie zgadujemy domeny. */
function safePortalUrl(value: string | undefined): string {
  if (!portalAddress(value) || !value) return '';
  return new URL(value).toString();
}

async function shareOnWeb(video: RecordedVideo, url: string): Promise<ShareOutcome> {
  if (typeof navigator.share !== 'function') return 'unavailable';
  const file = new File([video.blob], video.filename, { type: video.mimeType });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: 'Cebulak Express', files: [file], ...(url ? { url } : {}) });
      return 'shared';
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return 'cancelled';
  }
  return 'unavailable'; // Udostępnienie samego linku nie jest udostępnieniem filmu.
}

/** UI działa bez integracji T23/T24; adaptery można przekazać z main.ts po scaleniu. */
export function createRecordControl(opts: RecordControlOptions): RecordControl {
  const state = new RecordingState();
  const editorial = typeof location !== 'undefined' && isEditorialMode(location.search);
  let disposed = false;
  let generation = 0;
  let backend: RecordingBackend | undefined;
  let currentVideo: RecordedVideo | undefined;
  let videoUrl: string | undefined;
  let startedAt = 0;
  let timer: number | undefined;
  let info = '';
  const root = makeElement('section', 'ce-record-control');
  root.setAttribute('aria-label', UI.recordControlLabel);
  const style = makeElement('style');
  style.textContent = RECORD_CSS;
  root.appendChild(style);

  const startButton = makeButton(UI.recordStart, 'ce-record-start');
  // Ikona SVG jest własna; na obecnym main brak public/assets/ui/.
  startButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h13a2 2 0 0 1 2 2v2.3l3-2V17l-3-2v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v8h13V8H3Z"/></svg> ' + UI.recordStart;
  const editorialHint = makeElement('div', 'ce-record-editorial-hint');
  editorialHint.textContent = UI.recordEditorialHint;
  const live = makeElement('div', 'ce-record-live');
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  const dot = makeElement('span', 'ce-record-dot');
  dot.setAttribute('aria-hidden', 'true');
  const countdown = makeElement('span');
  const cancelButton = makeButton(UI.recordCancel);
  live.append(dot, countdown, makeElement('div'));
  live.appendChild(cancelButton);

  const preview = makeElement('div', 'ce-record-preview');
  const previewHeading = makeElement('strong');
  previewHeading.textContent = UI.recordPreviewTitle;
  const player = makeElement('video');
  player.controls = true;
  player.playsInline = true;
  player.preload = 'metadata';
  player.setAttribute('aria-label', UI.recordPreviewLabel);
  const actions = makeElement('div', 'ce-record-actions');
  const saveButton = makeButton(UI.recordSave);
  const shareButton = makeButton(UI.recordShare);
  const resetButton = makeButton(UI.recordNew);
  actions.append(saveButton, shareButton, resetButton);
  preview.append(previewHeading, player, actions);
  const message = makeElement('span', 'ce-record-message');
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  root.append(startButton, editorialHint, live, preview, message);

  // Nie pozwalamy, by tapnięcie kontrolki oznaczało podskok pojazdu.
  const onPointer = (event: PointerEvent): void => event.stopPropagation();
  const onKey = (event: KeyboardEvent): void => {
    if (event.code === 'Space' || event.code === 'ArrowUp') event.stopPropagation();
  };
  root.addEventListener('pointerdown', onPointer);
  root.addEventListener('keydown', onKey);

  // Bez zmian w src/style.css i index.html (pliki koordynatora).
  const previousEditorial = document.documentElement.getAttribute('data-ce-record-editorial');
  if (editorial) document.documentElement.setAttribute('data-ce-record-editorial', '1');

  function clearTimer(): void {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
  }

  function releasePreview(): void {
    player.pause();
    player.removeAttribute('src');
    player.load();
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    videoUrl = undefined;
    currentVideo = undefined;
  }

  function render(): void {
    if (disposed) return;
    const phase = state.phase;
    // Gra czyta fazę, żeby chować przycisk w trakcie lotu, ale nie licznik nagrywania.
    root.setAttribute('data-phase', phase);
    startButton.hidden = editorial || phase !== 'idle';
    editorialHint.hidden = !editorial || phase !== 'idle';
    live.hidden = phase !== 'recording';
    preview.hidden = phase !== 'preview';
    message.textContent = info;
    if (phase === 'recording') {
      const remaining = Math.max(0, Math.ceil((RECORD_DURATION_MS - (performance.now() - startedAt)) / 1000));
      countdown.textContent = fill(UI.recordCountdown, { seconds: remaining });
    }
  }

  function abortRecording(reason = ''): void {
    if (!state.cancel()) return;
    ++generation;
    clearTimer();
    backend?.cancel();
    backend = undefined;
    info = reason;
    render();
  }

  function start(): void {
    if (disposed || !state.start()) return;
    ++generation;
    const thisGeneration = generation;
    info = '';
    startedAt = performance.now();
    const input: RecorderInput = { canvas: opts.canvas, getAudio: opts.getAudio, overlay: opts.overlay, portalUrl: opts.portalUrl };
    try {
      backend = opts.recorderFactory?.(input) ?? createCanvasRecordingBackend(input);
      const recording = backend.start();
      timer = window.setInterval(render, 200);
      render();
      void recording.then((video) => {
        if (disposed || generation !== thisGeneration || !state.finish()) return;
        clearTimer();
        backend = undefined;
        currentVideo = video;
        videoUrl = URL.createObjectURL(video.blob);
        player.src = videoUrl;
        info = fill(UI.recordReady, { size: (video.blob.size / 1_000_000).toFixed(1), format: video.filename.split('.').pop()?.toUpperCase() ?? 'VIDEO' });
        render();
      }).catch((error: unknown) => {
        if (disposed || generation !== thisGeneration || !state.cancel()) return;
        clearTimer();
        backend = undefined;
        info = error instanceof Error ? error.message : UI.recordError;
        render();
      });
    } catch (error) {
      state.cancel();
      backend = undefined;
      clearTimer();
      info = error instanceof Error ? error.message : UI.recordStartError;
      render();
    }
  }

  function stop(): void {
    if (disposed) return;
    if (state.phase === 'recording') abortRecording();
    else if (state.reset()) {
      ++generation;
      releasePreview();
      info = '';
      render();
    }
  }

  const onVisibility = (): void => {
    if (document.hidden && state.phase === 'recording') {
      abortRecording(UI.recordHidden);
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  const onEditorialTap = (): void => {
    if (!editorial || disposed || state.phase !== 'idle') return;
    // main.ts obsługuje ten sam tap i odblokowuje AudioContext; potem startuje recorder.
    queueMicrotask(start);
  };
  if (editorial) opts.canvas.addEventListener('pointerdown', onEditorialTap, { capture: true });

  const onSave = async (): Promise<void> => {
    if (!currentVideo || state.phase !== 'preview') return;
    const video = currentVideo;
    saveButton.disabled = true;
    const id = generation;
    try {
      const saved = opts.saveVideo ? await opts.saveVideo(video) : await saveRecordedVideo(video);
      if (!disposed && id === generation) {
        info = saved === 'gallery' ? UI.recordSavedGallery
          : saved === 'download' || !opts.saveVideo ? UI.recordDownloadStarted : UI.recordSaved;
      }
    } catch (error) {
      if (!disposed && id === generation) info = error instanceof Error ? error.message : UI.recordSaveError;
    } finally {
      saveButton.disabled = false;
      render();
    }
  };
  const onShare = async (): Promise<void> => {
    if (!currentVideo || state.phase !== 'preview') return;
    const video = currentVideo;
    const id = generation;
    shareButton.disabled = true;
    try {
      const url = safePortalUrl(opts.portalUrl());
      const outcome = opts.shareVideo
        ? await opts.shareVideo(video.blob, UI.recordShareText, url)
        : await shareOnWeb(video, url);
      if (disposed || id !== generation) return;
      if (outcome === 'unavailable') {
        await saveRecordedVideo(video);
        info = UI.recordShareFallback;
      } else if (outcome === 'shared') info = UI.recordShared;
      else if (outcome === 'copied') info = UI.recordCopied;
      else info = UI.recordShareCancelled;
    } catch (error) {
      if (!disposed && id === generation) info = error instanceof Error ? error.message : UI.recordShareError;
    } finally {
      shareButton.disabled = false;
      render();
    }
  };

  startButton.addEventListener('click', start);
  cancelButton.addEventListener('click', stop);
  resetButton.addEventListener('click', stop);
  saveButton.addEventListener('click', () => { void onSave(); });
  shareButton.addEventListener('click', () => { void onShare(); });
  render();

  return {
    element: root,
    start,
    stop,
    dispose(): void {
      if (disposed) return;
      ++generation;
      if (state.phase === 'recording') backend?.cancel();
      backend = undefined;
      clearTimer();
      releasePreview();
      disposed = true;
      document.removeEventListener('visibilitychange', onVisibility);
      if (editorial) {
        opts.canvas.removeEventListener('pointerdown', onEditorialTap, true);
        if (previousEditorial === null) document.documentElement.removeAttribute('data-ce-record-editorial');
        else document.documentElement.setAttribute('data-ce-record-editorial', previousEditorial);
      }
      root.removeEventListener('pointerdown', onPointer);
      root.removeEventListener('keydown', onKey);
      root.remove();
    },
  };
}
