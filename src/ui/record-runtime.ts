/** Samodzielny wariant nagrywania do czasu scalenia zlecenia T23. */
export const RECORD_DURATION_MS = 15_000;
export const RECORD_OUTRO_MS = 1_500;
export const RECORD_WIDTH = 1080;
export const RECORD_HEIGHT = 1920;
export const RECORD_FPS = 60;
export const RECORD_MAX_BYTES = 15_000_000;

export interface RecordedVideo {
  blob: Blob;
  filename: string;
  mimeType: string;
  width: typeof RECORD_WIDTH;
  height: typeof RECORD_HEIGHT;
  durationMs: typeof RECORD_DURATION_MS;
}

export interface RecorderInput {
  canvas: HTMLCanvasElement;
  getAudio: () => { context: AudioContext; source: AudioNode } | undefined;
  overlay: () => { km: number; route: string };
  portalUrl: () => string | undefined;
}

/** Adapter może wskazywać na VerticalVideoRecorder z T23 po jego scaleniu. */
export interface RecordingBackend {
  start(): Promise<RecordedVideo>;
  cancel(): void;
}

/** Na planszy wyświetlamy domenę z bezpiecznego URL, bez parametrów UTM. */
export function portalAddress(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    return url.host.replace(/^www\./i, '') + (url.pathname === '/' ? '' : url.pathname);
  } catch {
    return undefined;
  }
}

/** Zwraca kadr pionowy 9:16 bez deformacji obrazu. */
export function portraitCrop(width: number, height: number): { x: number; y: number; width: number; height: number } {
  if (!(width > 0 && height > 0 && Number.isFinite(width) && Number.isFinite(height))) {
    throw new Error('Nieprawidłowe wymiary canvasu');
  }
  const size = Math.min(width / 9, height / 16);
  const w = 9 * size;
  const h = 16 * size;
  return { x: (width - w) / 2, y: (height - h) / 2, width: w, height: h };
}

export function chooseMimeType(supported: (mime: string) => boolean, audio: boolean): string | undefined {
  const types = audio
    ? ['video/mp4;codecs="avc1.42E01E,mp4a.40.2"', 'video/webm;codecs="vp9,opus"', 'video/webm;codecs="vp8,opus"', 'video/webm', 'video/mp4']
    : ['video/mp4;codecs="avc1.42E01E"', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
  return types.find(supported);
}

export function clipSection(elapsed: number): 'game' | 'outro' | 'end' {
  return elapsed >= RECORD_DURATION_MS ? 'end' : elapsed >= RECORD_DURATION_MS - RECORD_OUTRO_MS ? 'outro' : 'game';
}

function safeOverlay(input: RecorderInput): { km: number; route: string } {
  const overlay = input.overlay();
  return {
    km: Number.isFinite(overlay.km) ? Math.max(0, Math.floor(overlay.km)) : 0,
    route: String(overlay.route ?? '').slice(0, 140),
  };
}

function drawFrame(ctx: CanvasRenderingContext2D, input: RecorderInput, elapsed: number): void {
  const section = clipSection(elapsed);
  const width = RECORD_WIDTH;
  const height = RECORD_HEIGHT;
  if (section !== 'game') {
    ctx.fillStyle = '#19394a';
    ctx.fillRect(0, 0, width, height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffe8a0';
    ctx.font = 'bold 104px system-ui, sans-serif';
    ctx.fillText('Cebulak Express', width / 2, 650, width - 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px system-ui, sans-serif';
    ctx.fillText('Więcej wiadomości:', width / 2, 950, width - 60);
    const address = portalAddress(input.portalUrl());
    ctx.font = 'bold 69px system-ui, sans-serif';
    ctx.fillStyle = '#ffe8a0';
    ctx.fillText(address ?? 'Kierunek Polska!', width / 2, 1110, width - 70);
    const result = safeOverlay(input);
    ctx.font = '48px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${result.km} km`, width / 2, 1460, width - 70);
    ctx.fillText(result.route, width / 2, 1540, width - 70);
    return;
  }
  const crop = portraitCrop(input.canvas.width, input.canvas.height);
  ctx.drawImage(input.canvas, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
  const result = safeOverlay(input);
  ctx.fillStyle = 'rgba(19, 31, 40, 0.82)';
  ctx.fillRect(24, 36, width - 48, 142);
  ctx.fillRect(24, height - 221, width - 48, 184);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 65px system-ui, sans-serif';
  ctx.fillText('Cebulak Express', 58, 107, width - 110);
  ctx.font = 'bold 75px system-ui, sans-serif';
  ctx.fillText(`${result.km} km`, 58, height - 151, width - 110);
  ctx.font = '42px system-ui, sans-serif';
  ctx.fillStyle = '#ffe8a0';
  ctx.fillText(result.route, 58, height - 87, width - 110);
}

/** Nagrywa 13,5 s gry i 1,5 s planszy z portalem. Zero zależności npm. */
export function createCanvasRecordingBackend(input: RecorderInput): RecordingBackend {
  let abort: (() => void) | undefined;

  return {
    start(): Promise<RecordedVideo> {
      if (abort) return Promise.reject(new Error('Nagrywanie już trwa'));
      if (typeof MediaRecorder === 'undefined' || typeof input.canvas.captureStream !== 'function') {
        return Promise.reject(new Error('Ta przeglądarka nie obsługuje nagrywania canvasu'));
      }

      let stream: MediaStream | undefined;
      let bridge: MediaStreamAudioDestinationNode | undefined;
      let audio: ReturnType<RecorderInput['getAudio']>;
      let recorder: MediaRecorder;
      let ctx: CanvasRenderingContext2D;
      try {
        const output = document.createElement('canvas');
        output.width = RECORD_WIDTH;
        output.height = RECORD_HEIGHT;
        const context = output.getContext('2d', { alpha: false });
        if (!context) throw new Error('Brak kontekstu Canvas 2D');
        ctx = context;
        drawFrame(ctx, input, 0);
        stream = output.captureStream(RECORD_FPS);
        audio = input.getAudio();
        if (audio) {
          if (audio.source.context !== audio.context) throw new Error('Miks dźwięku należy do innego AudioContext');
          bridge = audio.context.createMediaStreamDestination();
          audio.source.connect(bridge);
          for (const track of bridge.stream.getAudioTracks()) stream.addTrack(track);
          // Wznowienie miksu powinno następować w obsłudze tapnięcia w main.ts.
        }
        const mimeType = chooseMimeType((mime) => MediaRecorder.isTypeSupported?.(mime) ?? false, !!bridge);
        try {
          recorder = new MediaRecorder(stream, {
            videoBitsPerSecond: 4_800_000,
            ...(bridge ? { audioBitsPerSecond: 96_000 } : {}),
            ...(mimeType ? { mimeType } : {}),
          });
        } catch {
          recorder = new MediaRecorder(stream, { videoBitsPerSecond: 4_800_000 });
        }
      } catch (error) {
        if (bridge && audio) {
          try { audio.source.disconnect(bridge); } catch { /* Pozostałe wyjścia miksu pozostają podłączone. */ }
          bridge.stream.getTracks().forEach((track) => track.stop());
        }
        stream?.getTracks().forEach((track) => track.stop());
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
      }

      return new Promise<RecordedVideo>((resolve, reject) => {
        const videoStream = stream!;
        let finished = false;
        let stopping = false;
        let failure: Error | undefined;
        let raf = 0;
        let timer = 0;
        let bytes = 0;
        const chunks: Blob[] = [];
        let startedAt = performance.now();

        const cleanup = (): void => {
          cancelAnimationFrame(raf);
          clearTimeout(timer);
          videoStream.getTracks().forEach((track) => track.stop());
          if (bridge && audio) {
            try { audio.source.disconnect(bridge); } catch { /* Nie naruszamy wyjścia do głośników. */ }
            bridge.stream.getTracks().forEach((track) => track.stop());
          }
          abort = undefined;
        };
        const finish = (): void => {
          if (finished) return;
          finished = true;
          cleanup();
          if (failure) { reject(failure); return; }
          const type = recorder.mimeType || chunks[0]?.type || 'video/webm';
          const blob = new Blob(chunks, { type });
          if (!blob.size || blob.size > RECORD_MAX_BYTES) {
            reject(new Error(blob.size ? 'Plik przekroczył limit 15 MB' : 'Nie udało się zakodować wideo'));
            return;
          }
          resolve({
            blob, mimeType: type,
            filename: `cebulak-express-rolka.${type.toLowerCase().includes('mp4') ? 'mp4' : 'webm'}`,
            width: RECORD_WIDTH, height: RECORD_HEIGHT, durationMs: RECORD_DURATION_MS,
          });
        };
        const stop = (error?: Error): void => {
          if (stopping || finished) return;
          stopping = true;
          failure = error;
          cancelAnimationFrame(raf);
          clearTimeout(timer);
          try {
            if (recorder.state === 'inactive') finish();
            else recorder.stop();
          } catch (cause) {
            failure ??= cause instanceof Error ? cause : new Error(String(cause));
            finish();
          }
        };
        abort = () => stop(new Error('Nagrywanie anulowane'));
        recorder.ondataavailable = (event) => {
          if (!event.data?.size || finished || failure) return;
          bytes += event.data.size;
          if (bytes > RECORD_MAX_BYTES) { stop(new Error('Plik przekroczył limit 15 MB')); return; }
          chunks.push(event.data);
        };
        recorder.onerror = () => stop(new Error('Błąd MediaRecorder'));
        recorder.onstop = finish;
        const frame = (now: number): void => {
          if (stopping || finished) return;
          const elapsed = Math.max(0, now - startedAt);
          try { drawFrame(ctx, input, elapsed); }
          catch (error) { stop(error instanceof Error ? error : new Error(String(error))); return; }
          if (elapsed >= RECORD_DURATION_MS) stop();
          else raf = requestAnimationFrame(frame);
        };
        try {
          recorder.start(1_000);
          startedAt = performance.now();
          raf = requestAnimationFrame(frame);
          timer = window.setTimeout(() => {
            if (!stopping && !finished) {
              try { drawFrame(ctx, input, RECORD_DURATION_MS); }
              catch (error) { stop(error instanceof Error ? error : new Error(String(error))); return; }
              stop();
            }
          }, RECORD_DURATION_MS);
        } catch (error) {
          stop(error instanceof Error ? error : new Error(String(error)));
        }
      });
    },
    cancel(): void { abort?.(); },
  };
}
