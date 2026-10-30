/** Stany kontrolki nagrywania, niezależne od DOM i MediaRecorder. */
export type RecordPhase = 'idle' | 'recording' | 'preview';

export class RecordingState {
  private current: RecordPhase = 'idle';

  get phase(): RecordPhase {
    return this.current;
  }

  start(): boolean {
    if (this.current !== 'idle') return false;
    this.current = 'recording';
    return true;
  }

  finish(): boolean {
    if (this.current !== 'recording') return false;
    this.current = 'preview';
    return true;
  }

  /** Przerwanie oznacza odrzucenie niepełnego nagrania. */
  cancel(): boolean {
    if (this.current !== 'recording') return false;
    this.current = 'idle';
    return true;
  }

  reset(): boolean {
    if (this.current !== 'preview') return false;
    this.current = 'idle';
    return true;
  }

  /** W ukrytej karcie przeglądarka może wstrzymać klatki wideo. */
  visibilityChange(hidden: boolean): boolean {
    return hidden && this.cancel();
  }
}

export function isEditorialMode(search: string): boolean {
  return new URLSearchParams(search).get('redakcja') === '1';
}
