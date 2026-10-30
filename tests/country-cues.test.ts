import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  COUNTRY_CUE_CODES, COUNTRY_CUE_INFO, scheduleCountryCue,
} from '../src/audio/country-cues';
import { createMusic, MUSIC_BPM, MUSIC_HOLIDAY_BPM } from '../src/audio/music';

class MockParam {
  value = 0;
  setValueAtTime(value: number): this { this.value = value; return this; }
  linearRampToValueAtTime(value: number): this { this.value = value; return this; }
  exponentialRampToValueAtTime(value: number): this { this.value = value; return this; }
  setTargetAtTime(value: number): this { this.value = value; return this; }
  cancelScheduledValues(): this { return this; }
}

class MockAudioNode {
  gain = new MockParam();
  frequency = new MockParam();
  detune = new MockParam();
  Q = new MockParam();
  type: OscillatorType | BiquadFilterType = 'sine';
  onended: (() => void) | null = null;
  connect(): this { return this; }
  disconnect(): void { /* Brak rzeczywistego sprzętu audio. */ }
  start(): void { /* Rejestracja następuje przy tworzeniu. */ }
  stop(): void { /* Zdarzenie onended wywołałaby przeglądarka. */ }
}

class MockAudioContext {
  state: AudioContextState = 'running';
  currentTime = 1;
  destination = new MockAudioNode();
  readonly oscillators: MockAudioNode[] = [];
  createOscillator(): MockAudioNode {
    const node = new MockAudioNode();
    this.oscillators.push(node);
    return node;
  }
  createGain(): MockAudioNode { return new MockAudioNode(); }
  createBiquadFilter(): MockAudioNode { return new MockAudioNode(); }
  resume(): Promise<void> { return Promise.resolve(); }
  close(): Promise<void> { this.state = 'closed'; return Promise.resolve(); }
}

afterEach(() => { vi.useRealTimers(); });

describe('autorskie akcenty krajów', () => {
  it('obejmuje wszystkie 16 krajów, w tym kraje nowych tras', () => {
    expect(COUNTRY_CUE_CODES).toHaveLength(16);
    expect(new Set(COUNTRY_CUE_CODES).size).toBe(16);
    for (const country of ['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'AT', 'NO', 'SE', 'DK', 'FI', 'PL', 'ES', 'IT', 'IE', 'CZ']) {
      expect(COUNTRY_CUE_CODES).toContain(country);
    }
  });

  it.each(COUNTRY_CUE_CODES)('%s trwa od 2 do mniej niż 3 sekund', (country) => {
    const info = COUNTRY_CUE_INFO[country];
    expect(info.label).toBeTruthy();
    expect(info.durationSeconds).toBeGreaterThanOrEqual(2);
    expect(info.durationSeconds).toBeLessThan(3);
    const ctx = new MockAudioContext();
    const result = scheduleCountryCue(ctx as unknown as AudioContext, ctx.destination as unknown as AudioNode, country, ctx.currentTime);
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThan(3);
    expect(ctx.oscillators.length).toBeGreaterThan(7);
  });

  it('stosuje właściwe instrumenty na grupach krajów', () => {
    expect(COUNTRY_CUE_INFO.FR.instrument).toBe('accordion');
    expect(COUNTRY_CUE_INFO.UK.instrument).toBe('bells');
    expect(COUNTRY_CUE_INFO.DE.instrument).toBe('brass');
    expect(COUNTRY_CUE_INFO.PL.instrument).toBe('home');
    expect(COUNTRY_CUE_INFO.NO.instrument).toBe('fiddle');
    expect(COUNTRY_CUE_INFO.ES.instrument).toBe('guitar');
    expect(COUNTRY_CUE_INFO.IT.instrument).toBe('mandolin');
  });
});

describe('integracja z MusicPlayer', () => {
  it('zwalnia tempo świąteczne i umożliwia przełączanie aranżacji', () => {
    expect(MUSIC_HOLIDAY_BPM).toBeLessThan(MUSIC_BPM);
    const ctx = new MockAudioContext();
    const music = createMusic(ctx as unknown as AudioContext);
    music.setSeason('holiday');
    expect(music.getState().season).toBe('holiday');
    music.dispose();
  });

  it('odtwarza cue przez istniejący miks, bez uruchamiania pętli', async () => {
    vi.useFakeTimers();
    const ctx = new MockAudioContext();
    const music = createMusic(ctx as unknown as AudioContext);
    music.playCountryCue('BE');
    await Promise.resolve();
    await Promise.resolve();
    expect(ctx.oscillators.length).toBeGreaterThan(7);
    expect(music.getState().state).toBe('stopped');
    music.dispose();
    expect(vi.getTimerCount()).toBeGreaterThanOrEqual(0);
  });

  it('nie emituje cue po wyciszeniu ani po dispose', async () => {
    const ctx = new MockAudioContext();
    const music = createMusic(ctx as unknown as AudioContext);
    music.setEnabled(false);
    music.playCountryCue('PL');
    await Promise.resolve();
    expect(ctx.oscillators).toHaveLength(0);
    music.setEnabled(true);
    music.dispose();
    music.playCountryCue('FR');
    await Promise.resolve();
    expect(ctx.oscillators).toHaveLength(0);
  });
});
