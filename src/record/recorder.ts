import { UI } from '../content/i18n';

/** Pionowa rolka z obrazu gry. Moduł nie dotyka głównej pętli ani UI gry. */

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 60;
export const VIDEO_DURATION_MS = 15_000;
export const OUTRO_DURATION_MS = 1_500;
export const GAMEPLAY_DURATION_MS = VIDEO_DURATION_MS - OUTRO_DURATION_MS;
export const MAX_VIDEO_BYTES = 15_000_000;

// ~9 MB obrazu na 15 s; zapas na audio, narzut kontenera i różnice enkoderów.
const VIDEO_BITRATE = 4_800_000;
const AUDIO_BITRATE = 96_000;

type VideoPhase = 'gameplay' | 'outro' | 'finished';

export interface RecordingAudio {
  context: AudioContext;
  /** Master gain/bus dźwięku gry; sam AudioContext nie udostępnia gotowego miksu. */
  source: AudioNode;
}

export interface RecordingOptions {
  /** Główny canvas renderera. Menu HTML nie jest z niego przechwytywane. */
  sourceCanvas: HTMLCanvasElement;
  /** Np. „Antwerpia → Rzeszów”. */
  routeName: string;
  /** Nazwa własnego portalu dla wybranego kraju; bez zgadywania domen. */
  portalName: string;
  /** Publiczny link do gry, pokazywany na planszy końcowej. */
  playUrl: string;
  /** Bieżący wynik gry w kilometrach. */
  getKm: () => number;
  /** Opcjonalne obrazy z własną licencją; do czasu T10 stosowane są zaślepki. */
  gameLogo?: CanvasImageSource;
  portalLogo?: CanvasImageSource;
  /** Opcjonalna ścieżka audio z Web Audio (integracja ze zleceniem T19). */
  audio?: RecordingAudio;
  /** Nagłówek planszy (domyślnie wezwanie do gry). */
  outroHeadline?: string;
  /** Krótszy czas wyłącznie do testów integracyjnych; produkcyjnie 15 s. */
  durationMs?: number;
}

export interface RecordedVideo {
  blob: Blob;
  filename: string;
  mimeType: string;
  width: typeof VIDEO_WIDTH;
  height: typeof VIDEO_HEIGHT;
  durationMs: number;
}

/** Dostarcza zlecenie T24 w src/platform/ (Capacitor / natywny MediaStore). */
export interface GalleryVideoAdapter {
  saveVideoToGallery(video: RecordedVideo): Promise<void>;
}

interface RecordingSession {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stream: MediaStream;
  recorder: MediaRecorder;
  audioBridge?: MediaStreamAudioDestinationNode;
  chunks: Blob[];
  bytes: number;
  startedAt: number;
  durationMs: number;
  frameId: number;
  stopping: boolean;
  failure: Error | null;
  resolve: (video: RecordedVideo) => void;
  reject: (error: Error) => void;
}

export function isEditorialMode(search: string): boolean {
  return new URLSearchParams(search).get('redakcja') === '1';
}

export function phaseAt(elapsedMs: number, durationMs = VIDEO_DURATION_MS): VideoPhase {
  if (elapsedMs >= durationMs) return 'finished';
  if (elapsedMs >= durationMs - OUTRO_DURATION_MS) return 'outro';
  return 'gameplay';
}

/** Wycina środkowy obszar 9:16 bez rozciągania obrazu (desktop ma boczne pasy). */
export function portraitCrop(width: number, height: number): { x: number; y: number; width: number; height: number } {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error(UI.recordCanvasSizeInvalid);
  }
  const scale = Math.min(width / 9, height / 16);
  const cropWidth = 9 * scale;
  const cropHeight = 16 * scale;
  return { x: (width - cropWidth) / 2, y: (height - cropHeight) / 2, width: cropWidth, height: cropHeight };
}

/** MP4/H.264 w pierwszej kolejności; WebM, gdy MP4 nie jest dostępny. */
export function preferredMimeType(supports: (mimeType: string) => boolean, withAudio: boolean): string | undefined {
  const candidates = withAudio
    ? [
        'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
        'video/mp4',
        'video/webm;codecs="vp9,opus"',
        'video/webm;codecs="vp8,opus"',
        'video/webm',
      ]
    : [
        'video/mp4;codecs="avc1.42E01E"',
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
      ];
  return candidates.find((mime) => supports(mime));
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  logo: CanvasImageSource | undefined,
  x: number,
  y: number,
  size: number,
  fallback: string,
): void {
  if (logo) {
    try {
      ctx.drawImage(logo, x, y, size, size);
      return;
    } catch {
      // Obraz może jeszcze się ładować; użyj bezpiecznej zaślepki.
    }
  }
  ctx.fillStyle = '#e9ba43';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#24333c';
  ctx.font = `bold ${Math.round(size * 0.34)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(fallback, x + size / 2, y + size / 2, size - 8);
}

function drawGameOverlay(ctx: CanvasRenderingContext2D, options: RecordingOptions): void {
  ctx.save();
  ctx.fillStyle = 'rgba(19, 31, 40, 0.79)';
  ctx.fillRect(28, 32, VIDEO_WIDTH - 56, 174);
  drawLogo(ctx, options.gameLogo, 48, 52, 132, 'CE');
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 51px system-ui, sans-serif';
  ctx.fillText('Cebulak Express', 200, 104, 815);
  if (options.portalLogo) {
    drawLogo(ctx, options.portalLogo, 200, 138, 48, '');
  }
  ctx.font = '35px system-ui, sans-serif';
  ctx.fillStyle = '#ffe8a0';
  ctx.fillText(options.portalName, options.portalLogo ? 262 : 200, 164, options.portalLogo ? 748 : 810);

  ctx.fillStyle = 'rgba(19, 31, 40, 0.8)';
  ctx.fillRect(28, 1709, VIDEO_WIDTH - 56, 177);
  const rawKm = options.getKm();
  const km = Number.isFinite(rawKm) ? Math.max(0, Math.floor(rawKm)) : 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 71px system-ui, sans-serif';
  ctx.fillText(`${km} km`, 60, 1769, 958);
  ctx.fillStyle = '#ffe8a0';
  ctx.font = '40px system-ui, sans-serif';
  ctx.fillText(options.routeName, 60, 1838, 958);
  ctx.restore();
}

/** Podział linku także po znakach „/”, „-” i „?”; nigdy poza obszarem planszy. */
export function wrapLink(link: string, limit = 30): string[] {
  const text = link.trim();
  if (!text) return [''];
  const parts: string[] = [];
  let remaining = text;
  while (remaining.length > limit && parts.length < 3) {
    let splitAt = Math.max(remaining.lastIndexOf('/', limit), remaining.lastIndexOf('-', limit), remaining.lastIndexOf('?', limit));
    if (splitAt < Math.floor(limit / 2)) splitAt = limit - 1;
    else splitAt += 1;
    parts.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  if (remaining) parts.push(remaining.length > limit ? `${remaining.slice(0, limit - 1)}…` : remaining);
  return parts.slice(0, 4);
}

function drawOutro(ctx: CanvasRenderingContext2D, options: RecordingOptions): void {
  ctx.save();
  ctx.fillStyle = '#19394a';
  ctx.fillRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  ctx.textBaseline = 'middle';
  drawLogo(ctx, options.gameLogo, 390, 310, 300, 'CE');
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 91px system-ui, sans-serif';
  ctx.fillText('Cebulak Express', VIDEO_WIDTH / 2, 710, 1010);
  ctx.fillStyle = '#ffe8a0';
  ctx.font = 'bold 79px system-ui, sans-serif';
  ctx.fillText(options.outroHeadline ?? UI.recordOutroPlay, VIDEO_WIDTH / 2, 940, 1000);
  ctx.font = '52px system-ui, sans-serif';
  for (const [i, line] of wrapLink(options.playUrl || UI.recordOutroMissing).entries()) {
    ctx.fillText(line, VIDEO_WIDTH / 2, 1070 + i * 71, 1000);
  }
  ctx.fillStyle = '#ffffff';
  ctx.font = '42px system-ui, sans-serif';
  if (options.portalName) ctx.fillText(options.portalName, VIDEO_WIDTH / 2, 1575, 970);
  ctx.restore();
}

function drawRecordingFrame(ctx: CanvasRenderingContext2D, options: RecordingOptions, elapsedMs: number, durationMs: number): void {
  const phase = phaseAt(elapsedMs, durationMs);
  if (phase !== 'gameplay') {
    drawOutro(ctx, options);
    return;
  }
  const crop = portraitCrop(options.sourceCanvas.width, options.sourceCanvas.height);
  ctx.drawImage(options.sourceCanvas, crop.x, crop.y, crop.width, crop.height, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  drawGameOverlay(ctx, options);
}

/**
 * Nagrywa NASTĘPNE 15 s (13,5 s rozgrywki i 1,5 s planszy końcowej).
 * Nie utrzymuje nieograniczonego bufora ramek/fragmentów z całego przejazdu.
 */
export class VerticalVideoRecorder {
  private session: RecordingSession | null = null;

  constructor(private readonly options: RecordingOptions) {}

  get isRecording(): boolean {
    return this.session !== null;
  }

  start(): Promise<RecordedVideo> {
    if (this.session) return Promise.reject(new Error(UI.recordAlreadyRecording));
    const durationMs = this.options.durationMs ?? VIDEO_DURATION_MS;
    if (!Number.isFinite(durationMs) || durationMs <= OUTRO_DURATION_MS || durationMs > VIDEO_DURATION_MS) {
      return Promise.reject(new Error(UI.recordDurationInvalid));
    }
    if (typeof MediaRecorder === 'undefined') return Promise.reject(new Error(UI.recordUnsupported));
    if (typeof this.options.sourceCanvas.captureStream !== 'function') {
      return Promise.reject(new Error(UI.recordCanvasUnsupported));
    }

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let stream!: MediaStream;
    let audioBridge: MediaStreamAudioDestinationNode | undefined;
    let recorder: MediaRecorder;
    try {
      // Nie zmieniamy rozdzielczości renderera na ekranie gracza.
      canvas = document.createElement('canvas');
      canvas.width = VIDEO_WIDTH;
      canvas.height = VIDEO_HEIGHT;
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) throw new Error(UI.recordCanvasContextMissing);
      ctx = context;
      drawRecordingFrame(ctx, this.options, 0, durationMs);
      stream = canvas.captureStream(VIDEO_FPS);
      const audio = this.options.audio;
      if (audio) {
        if (audio.source.context !== audio.context) throw new Error(UI.recordAudioContextMismatch);
        audioBridge = audio.context.createMediaStreamDestination();
        audio.source.connect(audioBridge);
        for (const track of audioBridge.stream.getAudioTracks()) stream.addTrack(track);
      }
      const isSupported = (mime: string): boolean =>
        typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported(mime);
      const mimeType = preferredMimeType(isSupported, !!audioBridge);
      const settings: MediaRecorderOptions = {
        videoBitsPerSecond: VIDEO_BITRATE,
        ...(audioBridge ? { audioBitsPerSecond: AUDIO_BITRATE } : {}),
        ...(mimeType ? { mimeType } : {}),
      };
      try {
        recorder = new MediaRecorder(stream, settings);
      } catch {
        // Błędne raportowanie kodeka w WebView: spróbuj ustawień domyślnych.
        recorder = new MediaRecorder(stream, { videoBitsPerSecond: VIDEO_BITRATE });
      }
    } catch (error) {
      if (audioBridge && this.options.audio) {
        try { this.options.audio.source.disconnect(audioBridge); } catch { /* bez efektu dla gry */ }
        for (const track of audioBridge.stream.getTracks()) track.stop();
      }
      // Canvas/ścieżka mogły zostać utworzone przed błędem konstruktora.
      if (typeof stream!=='undefined') for (const track of stream.getTracks()) track.stop();
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }

    return new Promise<RecordedVideo>((resolve, reject) => {
      const session: RecordingSession = {
        canvas, ctx, stream, recorder, audioBridge,
        chunks: [], bytes: 0, startedAt: performance.now(), durationMs, frameId: 0,
        stopping: false, failure: null, resolve, reject,
      };
      this.session = session;
      recorder.ondataavailable = (event: BlobEvent) => {
        if (session.stopping && session.failure) return;
        if (!event.data || event.data.size === 0) return;
        session.bytes += event.data.size;
        if (session.bytes > MAX_VIDEO_BYTES) {
          this.stopSession(session, new Error(UI.recordTooLarge));
          return;
        }
        session.chunks.push(event.data);
      };
      recorder.onerror = () => this.stopSession(session, new Error(UI.recordEncodingError));
      recorder.onstop = () => this.finishSession(session);
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      try {
        recorder.start(1_000); // Trzymamy tylko skompresowane fragmenty przez maks. 15 sekund.
        session.startedAt = performance.now();
        session.frameId = requestAnimationFrame((now) => this.frame(session, now));
      } catch (error) {
        this.stopSession(session, error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  /** Zatrzymanie przez użytkownika oznacza odrzucenie wyniku; nie zwraca uciętego filmu. */
  cancel(): void {
    if (this.session) this.stopSession(this.session, new Error(UI.recordCancelled));
  }

  private readonly onVisibilityChange = (): void => {
    // W tle requestAnimationFrame bywa wstrzymany, więc czas i klatki nie byłyby wiarygodne.
    if (document.hidden && this.session) this.stopSession(this.session, new Error(UI.recordHidden));
  };

  private frame(session: RecordingSession, now: number): void {
    if (session.stopping || this.session !== session) return;
    const elapsed = Math.max(0, now - session.startedAt);
    if (elapsed >= session.durationMs) {
      this.stopSession(session);
      return;
    }
    try {
      drawRecordingFrame(session.ctx, this.options, elapsed, session.durationMs);
    } catch (error) {
      this.stopSession(session, error instanceof Error ? error : new Error(String(error)));
      return;
    }
    session.frameId = requestAnimationFrame((time) => this.frame(session, time));
  }

  private stopSession(session: RecordingSession, failure?: Error): void {
    if (session.stopping) return;
    session.stopping = true;
    session.failure = failure ?? null;
    cancelAnimationFrame(session.frameId);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    try {
      if (session.recorder.state !== 'inactive') session.recorder.stop();
      else this.finishSession(session);
    } catch (error) {
      session.failure ??= error instanceof Error ? error : new Error(String(error));
      this.finishSession(session);
    }
  }

  private finishSession(session: RecordingSession): void {
    if (this.session !== session) return;
    cancelAnimationFrame(session.frameId);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    for (const track of session.stream.getTracks()) track.stop();
    if (session.audioBridge && this.options.audio) {
      try { this.options.audio.source.disconnect(session.audioBridge); } catch { /* graf gry działa dalej */ }
      for (const track of session.audioBridge.stream.getTracks()) track.stop();
    }
    this.session = null;
    if (session.failure) {
      session.reject(session.failure);
      return;
    }
    const mimeType = session.recorder.mimeType || (session.chunks[0]?.type ?? 'video/webm');
    const blob = new Blob(session.chunks, { type: mimeType });
    if (!blob.size) {
      session.reject(new Error(UI.recordEmpty));
      return;
    }
    if (blob.size > MAX_VIDEO_BYTES) {
      session.reject(new Error(UI.recordTooLarge));
      return;
    }
    const extension = mimeType.toLowerCase().includes('mp4') ? 'mp4' : 'webm';
    session.resolve({ blob, filename: `cebulak-express-rolka.${extension}`, mimeType, width: VIDEO_WIDTH, height: VIDEO_HEIGHT, durationMs: session.durationMs });
  }
}

/** Web: pobranie pliku. Capacitor: adapter zapisuje wideo do galerii urządzenia. */
export async function saveRecordedVideo(video: RecordedVideo, adapter?: GalleryVideoAdapter): Promise<'gallery' | 'download'> {
  if (adapter) {
    await adapter.saveVideoToGallery(video);
    return 'gallery';
  }
  const objectUrl = URL.createObjectURL(video.blob);
  try {
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = video.filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    return 'download';
  } finally {
    // Późniejsza revokacja pozwala dokończyć pobieranie w wolniejszym WebView.
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}
