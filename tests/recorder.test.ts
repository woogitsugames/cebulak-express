import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UI } from '../src/content/pl';
import {
  GAMEPLAY_DURATION_MS, MAX_VIDEO_BYTES, OUTRO_DURATION_MS, VIDEO_DURATION_MS, VIDEO_FPS,
  VIDEO_HEIGHT, VIDEO_WIDTH, VerticalVideoRecorder, isEditorialMode, phaseAt,
  portraitCrop, preferredMimeType, saveRecordedVideo, wrapLink,
} from '../src/record/recorder';

describe('parametry rolki', () => {
  it('ma stałą rozdzielczość 9:16 i 15 s razem z planszą końcową', () => {
    expect([VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS]).toEqual([1080, 1920, 60]);
    expect(GAMEPLAY_DURATION_MS).toBe(13_500);
    expect(OUTRO_DURATION_MS).toBe(1_500);
    expect(GAMEPLAY_DURATION_MS + OUTRO_DURATION_MS).toBe(VIDEO_DURATION_MS);
    expect(MAX_VIDEO_BYTES).toBe(15_000_000);
    expect(phaseAt(0)).toBe('gameplay');
    expect(phaseAt(13_499)).toBe('gameplay');
    expect(phaseAt(13_500)).toBe('outro');
    expect(phaseAt(14_999)).toBe('outro');
    expect(phaseAt(15_000)).toBe('finished');
    expect(phaseAt(1_499, 3_000)).toBe('gameplay');
    expect(phaseAt(1_500, 3_000)).toBe('outro');
    expect(phaseAt(3_000, 3_000)).toBe('finished');
  });

  it('przycina boczne lub górne pasy, bez deformacji obrazu', () => {
    expect(portraitCrop(1080, 1920)).toEqual({ x: 0, y: 0, width: 1080, height: 1920 });
    expect(portraitCrop(1920, 1080)).toEqual({ x: 656.25, y: 0, width: 607.5, height: 1080 });
    const tall = portraitCrop(390, 844);
    expect(tall.x).toBe(0);
    expect(tall.y).toBeCloseTo(75.333333, 5);
    expect(tall.width).toBe(390);
    expect(tall.height).toBeCloseTo(693.333333, 5);
    expect(() => portraitCrop(0, 600)).toThrow();
  });

  it('wybiera H.264/MP4, a jeśli go brak to WebM i dobiera kodek audio', () => {
    expect(preferredMimeType(() => true, true)).toContain('mp4');
    expect(preferredMimeType((mime) => mime.includes('webm'), true)).toContain('vp9,opus');
    expect(preferredMimeType((mime) => mime.includes('webm'), false)).toBe('video/webm;codecs=vp9');
    expect(preferredMimeType(() => false, false)).toBeUndefined();
  });

  it('tryb redakcyjny wymaga dokładnie redakcja=1', () => {
    expect(isEditorialMode('?kraj=BE&redakcja=1')).toBe(true);
    expect(isEditorialMode('redakcja=0')).toBe(false);
    expect(isEditorialMode('?redakcja=true')).toBe(false);
  });

  it('długie adresy są zawijane i nie wychodzą poza 4 linie', () => {
    expect(wrapLink('https://gra.example.org/BE/gram')).toEqual(['https://gra.example.org/BE/', 'gram']);
    const lines = wrapLink('https://gra.example.org/' + 'a'.repeat(200));
    expect(lines.length).toBeLessThanOrEqual(4);
    expect(lines.every((line) => line.length <= 30)).toBe(true);
  });
});

// Bez jsdom: imitacja wyłącznie API używanych przez moduł, bez zależności npm.
describe('nagrywanie przez MediaRecorder', () => {
  let nextFrame: FrameRequestCallback | null;
  let canvasContext: {
    drawImage: ReturnType<typeof vi.fn>;
    fillRect: ReturnType<typeof vi.fn>;
    fillText: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    restore: ReturnType<typeof vi.fn>;
  };
  let stopTrack: ReturnType<typeof vi.fn>;
  let activeRecorder: FakeMediaRecorder;

  class FakeMediaRecorder {
    static isTypeSupported = (mime: string) => mime.includes('webm');
    mimeType = 'video/webm';
    state: RecordingState = 'inactive';
    ondataavailable: ((event: BlobEvent) => void) | null = null;
    onstop: (() => void) | null = null;
    onerror: (() => void) | null = null;
    start = vi.fn(() => { this.state = 'recording'; });
    stop = vi.fn(() => {
      this.state = 'inactive';
      this.ondataavailable?.({ data: new Blob(['poprawny plik'], { type: this.mimeType }) } as BlobEvent);
      this.onstop?.();
    });

    constructor(_stream: MediaStream, _options?: MediaRecorderOptions) {
      activeRecorder = this;
    }
  }

  beforeEach(() => {
    nextFrame = null;
    stopTrack = vi.fn();
    canvasContext = {
      drawImage: vi.fn(), fillRect: vi.fn(), fillText: vi.fn(), save: vi.fn(), restore: vi.fn(),
    };
    const stream = { getTracks: () => [{ stop: stopTrack }], addTrack: vi.fn() };
    const output = {
      width: 0, height: 0,
      getContext: () => canvasContext,
      captureStream: vi.fn(() => stream),
    };
    vi.stubGlobal('document', {
      hidden: false,
      createElement: vi.fn(() => output),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal('performance', { now: () => 0 });
    vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => { nextFrame = fn; return 1; });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => vi.unstubAllGlobals());

  const setupRecorder = () => new VerticalVideoRecorder({
    sourceCanvas: { width: 360, height: 640, captureStream: vi.fn() } as unknown as HTMLCanvasElement,
    routeName: 'Antwerpia → Rzeszów', portalName: 'Aktualności BE',
    playUrl: 'https://gra.example.org', getKm: () => 52,
  });

  it('uruchamia strumień 60 fps, umieszcza planszę końcową i sprząta ścieżki', async () => {
    const recorder = setupRecorder();
    const result = recorder.start();
    expect(recorder.isRecording).toBe(true);
    expect(activeRecorder.start).toHaveBeenCalledWith(1000);
    expect(canvasContext.drawImage).toHaveBeenCalled();
    expect(canvasContext.fillText).toHaveBeenCalledWith('52 km', 60, 1769, 958);
    const drawOutro = nextFrame!;
    drawOutro(13_500);
    expect(canvasContext.fillText).toHaveBeenCalledWith(UI.recordOutroPlay, 540, 940, 1000);
    nextFrame!(15_000);
    const video = await result;
    expect(recorder.isRecording).toBe(false);
    expect(activeRecorder.stop).toHaveBeenCalledTimes(1);
    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(video.mimeType).toBe('video/webm');
    expect(video.blob.size).toBeGreaterThan(0);
    expect(video.blob.size).toBeLessThan(MAX_VIDEO_BYTES);
    expect(video.width).toBe(1080);
    expect(video.height).toBe(1920);
  });

  it('odrzuca ponowne uruchomienie podczas nagrywania i anuluje poprawnie', async () => {
    const recorder = setupRecorder();
    const pending = recorder.start();
    await expect(recorder.start()).rejects.toThrow('już trwa');
    recorder.cancel();
    await expect(pending).rejects.toThrow('anulowane');
    expect(stopTrack).toHaveBeenCalled();
    expect(recorder.isRecording).toBe(false);
  });


  it('używa nagłówka i adresu portalu na planszy oraz zwraca czas krótkiego testu', async () => {
    const recorder = new VerticalVideoRecorder({
      sourceCanvas: { width: 360, height: 640, captureStream: vi.fn() } as unknown as HTMLCanvasElement,
      routeName: 'Antwerpia → Kraków',
      portalName: 'aktualnosci.be',
      playUrl: 'aktualnosci.be',
      outroHeadline: UI.recordOutroMore,
      getKm: () => 160,
      durationMs: 3_000,
    });
    const pending = recorder.start();
    nextFrame!(1_500);
    expect(canvasContext.fillText).toHaveBeenCalledWith(UI.recordOutroMore, 540, 940, 1000);
    expect(canvasContext.fillText).toHaveBeenCalledWith('aktualnosci.be', 540, 1070, 1000);
    nextFrame!(3_000);
    const result = await pending;
    expect(result.durationMs).toBe(3_000);
  });

  it('limit 15 MB odrzuca fragment bez zachowywania go w buforze', async () => {
    const recorder = setupRecorder();
    const pending = recorder.start();
    activeRecorder.ondataavailable?.({
      data: { size: MAX_VIDEO_BYTES + 1, type: 'video/webm' } as Blob,
    } as BlobEvent);
    await expect(pending).rejects.toThrow(UI.recordTooLarge);
    expect(stopTrack).toHaveBeenCalledTimes(1);
  });

  it('visibilitychange anuluje nagranie także bez aktywnej kontrolki UI', async () => {
    const recorder = setupRecorder();
    const pending = recorder.start();
    const doc = document as unknown as {
      hidden: boolean;
      addEventListener: ReturnType<typeof vi.fn>;
      removeEventListener: ReturnType<typeof vi.fn>;
    };
    const subscription = doc.addEventListener.mock.calls.find((call: unknown[]) => call[0] === 'visibilitychange');
    expect(subscription).toBeDefined();
    doc.hidden = true;
    (subscription![1] as () => void)();
    await expect(pending).rejects.toThrow(UI.recordHidden);
    expect(doc.removeEventListener).toHaveBeenCalledWith('visibilitychange', subscription![1]);
    expect(stopTrack).toHaveBeenCalledTimes(1);
  });

  it('odrzuca nieprawidłowy czas zamiast tworzyć MediaRecorder', async () => {
    const recorder = new VerticalVideoRecorder({
      sourceCanvas: { width: 360, height: 640, captureStream: vi.fn() } as unknown as HTMLCanvasElement,
      routeName: '', portalName: '', playUrl: '', getKm: () => 0, durationMs: 1_000,
    });
    await expect(recorder.start()).rejects.toThrow(UI.recordDurationInvalid);
  });

  it('adapter galerii przyjmuje wynik bez kopiowania filmu do base64', async () => {
    const saveVideoToGallery = vi.fn(async () => undefined);
    const video = {
      blob: new Blob(['film']), filename: 'film.webm', mimeType: 'video/webm',
      width: VIDEO_WIDTH, height: VIDEO_HEIGHT, durationMs: VIDEO_DURATION_MS,
    } as const;
    expect(await saveRecordedVideo(video, { saveVideoToGallery })).toBe('gallery');
    expect(saveVideoToGallery).toHaveBeenCalledWith(video);
  });
});
