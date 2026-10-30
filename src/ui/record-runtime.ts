/** Cienki adapter zgodności T37 -> jeden silnik MediaRecorder w src/record/recorder.ts. */
import { UI } from '../content/pl';
import {
  VerticalVideoRecorder,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_FPS,
  VIDEO_DURATION_MS,
  OUTRO_DURATION_MS,
  MAX_VIDEO_BYTES,
  preferredMimeType,
  phaseAt,
} from '../record/recorder';

export { portraitCrop } from '../record/recorder';
export type { RecordedVideo } from '../record/recorder';
import type { RecordedVideo } from '../record/recorder';

export const RECORD_DURATION_MS = VIDEO_DURATION_MS;
export const RECORD_OUTRO_MS = OUTRO_DURATION_MS;
export const RECORD_WIDTH = VIDEO_WIDTH;
export const RECORD_HEIGHT = VIDEO_HEIGHT;
export const RECORD_FPS = VIDEO_FPS;
export const RECORD_MAX_BYTES = MAX_VIDEO_BYTES;

export interface RecorderInput {
  canvas: HTMLCanvasElement;
  getAudio: () => { context: AudioContext; source: AudioNode } | undefined;
  overlay: () => { km: number; route: string };
  portalUrl: () => string | undefined;
}

export interface RecordingBackend {
  start(): Promise<RecordedVideo>;
  cancel(): void;
}

/** Na planszę trafia tylko adres HTTP(S), bez parametrów i fragmentów URL. */
export function portalAddress(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if ((url.protocol !== 'https:' && url.protocol !== 'http:') || !url.hostname || url.username || url.password) {
      return undefined;
    }
    return url.host.replace(/^www\./i, '') + (url.pathname === '/' ? '' : url.pathname);
  } catch {
    return undefined;
  }
}

/** Zachowane API testów T37; nie ma tu drugiej listy kodeków. */
export function chooseMimeType(supported: (mime: string) => boolean, audio: boolean): string | undefined {
  return preferredMimeType(supported, audio);
}

export function clipSection(elapsed: number): 'game' | 'outro' | 'end' {
  const phase = phaseAt(elapsed);
  return phase === 'gameplay' ? 'game' : phase === 'outro' ? 'outro' : 'end';
}

/**
 * Jeden silnik wideo. Zachowujemy API createCanvasRecordingBackend oraz
 * możliwość ponownego nagrywania tą samą instancją backendu.
 */
export function createCanvasRecordingBackend(input: RecorderInput): RecordingBackend {
  let current: VerticalVideoRecorder | undefined;
  let active = false;

  return {
    start(): Promise<RecordedVideo> {
      if (active) return Promise.reject(new Error(UI.recordAlreadyRecording));
      active = true;
      try {
        const address = portalAddress(input.portalUrl());
        const route = String(input.overlay().route ?? '').slice(0, 140);
        current = new VerticalVideoRecorder({
          sourceCanvas: input.canvas,
          routeName: route,
          portalName: address ?? '',
          playUrl: address ?? '',
          outroHeadline: UI.recordOutroMore,
          getKm: () => input.overlay().km,
          audio: input.getAudio(),
        });
        return current.start().finally(() => {
          current = undefined;
          active = false;
        });
      } catch (error) {
        current = undefined;
        active = false;
        return Promise.reject(error);
      }
    },
    cancel(): void {
      current?.cancel();
    },
  };
}
