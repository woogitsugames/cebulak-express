import { afterEach, describe, expect, it, vi } from 'vitest';
import { UI } from '../src/content/pl';
import { VerticalVideoRecorder, type RecordedVideo, type RecordingOptions } from '../src/record/recorder';
import { createCanvasRecordingBackend, portalAddress } from '../src/ui/record-runtime';

const video: RecordedVideo = {
  blob: new Blob(['webm'], { type: 'video/webm' }),
  filename: 'cebulak-express-rolka.webm',
  mimeType: 'video/webm',
  width: 1080,
  height: 1920,
  durationMs: 15_000,
};

afterEach(() => vi.restoreAllMocks());

describe('jeden silnik wideo i adapter T37', () => {
  it('przekazuje źródło, miks, żywy wynik i adres portalu do VerticalVideoRecorder', async () => {
    let instance: VerticalVideoRecorder | undefined;
    vi.spyOn(VerticalVideoRecorder.prototype, 'start').mockImplementation(function (this: VerticalVideoRecorder) {
      instance = this;
      return Promise.resolve(video);
    });
    const canvas = {} as HTMLCanvasElement;
    const audio = { context: {} as AudioContext, source: {} as AudioNode };
    let km = 80;
    const backend = createCanvasRecordingBackend({
      canvas,
      getAudio: () => audio,
      overlay: () => ({ km, route: 'Antwerpia → Rzeszów' }),
      portalUrl: () => 'https://www.aktualnosci.be/wiadomosci?utm_source=game#test',
    });
    expect(await backend.start()).toBe(video);
    const options = (instance as unknown as { options: RecordingOptions }).options;
    expect(options.sourceCanvas).toBe(canvas);
    expect(options.audio).toBe(audio);
    expect(options.routeName).toBe('Antwerpia → Rzeszów');
    expect(options.portalName).toBe('aktualnosci.be/wiadomosci');
    expect(options.playUrl).toBe('aktualnosci.be/wiadomosci');
    expect(options.outroHeadline).toBe(UI.recordOutroMore);
    km = 123;
    expect(options.getKm()).toBe(123);
  });

  it('blokuje drugie nagranie, anuluje ten sam silnik i pozwala ponowić', async () => {
    let resolve!: (value: RecordedVideo) => void;
    const cancel = vi.spyOn(VerticalVideoRecorder.prototype, 'cancel').mockImplementation(() => {});
    const start = vi.spyOn(VerticalVideoRecorder.prototype, 'start').mockImplementation(
      () => new Promise<RecordedVideo>((res) => { resolve = res; }),
    );
    const backend = createCanvasRecordingBackend({
      canvas: {} as HTMLCanvasElement,
      getAudio: () => undefined,
      overlay: () => ({ km: 3, route: 'W drodze' }),
      portalUrl: () => 'javascript:alert(1)',
    });
    const pending = backend.start();
    await expect(backend.start()).rejects.toThrow(UI.recordAlreadyRecording);
    backend.cancel();
    expect(cancel).toHaveBeenCalledTimes(1);
    resolve(video);
    await expect(pending).resolves.toBe(video);
    const next = backend.start();
    expect(start).toHaveBeenCalledTimes(2);
    resolve(video);
    await expect(next).resolves.toBe(video);
  });

  it('nie przyjmuje obcych schematów, danych logowania ani UTM', () => {
    expect(portalAddress('https://www.aktualnosci.be/?utm_source=game')).toBe('aktualnosci.be');
    expect(portalAddress('https://tuwiesz.nl/aktualnosci?q=1')).toBe('tuwiesz.nl/aktualnosci');
    expect(portalAddress('https://user:pass@host.example/')).toBeUndefined();
    expect(portalAddress('javascript:alert(1)')).toBeUndefined();
    expect(portalAddress(undefined)).toBeUndefined();
  });
});
