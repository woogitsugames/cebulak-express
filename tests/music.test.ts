import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMusic, MUSIC_BAR_COUNT, MUSIC_BPM } from '../src/audio/music';

interface ScheduledTone { start: number; stop: number }

function fakeAudio() {
  const tones: ScheduledTone[] = [];
  const makeParam = () => ({
    value: 0,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    cancelScheduledValues: vi.fn(),
    setTargetAtTime: vi.fn(),
  });
  const createGain = vi.fn(() => ({ gain: makeParam(), connect: vi.fn(), disconnect: vi.fn() }));
  const createOscillator = vi.fn(() => {
    const record = { start: 0, stop: 0 };
    tones.push(record);
    return {
      type: 'sine', frequency: makeParam(), connect: vi.fn(), disconnect: vi.fn(), onended: null,
      start: (at: number) => { record.start = at; },
      stop: (at: number) => { record.stop = at; },
    };
  });
  const resume = vi.fn(async () => undefined);
  const close = vi.fn(async () => undefined);
  const ctx = {
    state: 'running', currentTime: 10, destination: {},
    createGain, createOscillator, resume, close,
  } as unknown as AudioContext;
  return { ctx, tones, createGain, createOscillator, close };
}

afterEach(() => vi.unstubAllGlobals());

describe('muzyka proceduralna', () => {
  it('ma 32 takty 2/4 w dopuszczalnym tempie', () => {
    expect(MUSIC_BAR_COUNT).toBe(32);
    expect(MUSIC_BPM).toBeGreaterThanOrEqual(110);
    expect(MUSIC_BPM).toBeLessThanOrEqual(130);
  });

  it('nie rzuca wyjątków bez AudioContext (Node lub starsza przeglądarka)', async () => {
    vi.stubGlobal('AudioContext', undefined);
    const player = createMusic();
    await expect(player.unlock()).resolves.toBeUndefined();
    expect(() => { player.start(); player.pause(); player.resume(); player.playFinishJingle(); player.stop(); player.dispose(); }).not.toThrow();
  });

  it('odtwarza nuty, wznawia po pauzie i nie zamyka współdzielonego kontekstu', async () => {
    const audio = fakeAudio();
    const player = createMusic(audio.ctx);
    player.start();
    await Promise.resolve();
    expect(audio.tones.length).toBeGreaterThan(0);
    expect(player.getState().state).toBe('playing');
    player.pause();
    expect(player.getState().state).toBe('paused');
    player.resume();
    await Promise.resolve();
    expect(player.getState().state).toBe('playing');
    player.stop();
    expect(player.getState().state).toBe('stopped');
    player.dispose();
    expect(audio.close).not.toHaveBeenCalled();
  });

  it('wyciszenie blokuje nuty, a ponowne włączenie przywraca odtwarzanie', async () => {
    const audio = fakeAudio();
    const player = createMusic(audio.ctx, { enabled: false });
    player.start();
    await Promise.resolve();
    expect(audio.tones).toHaveLength(0);
    expect(player.getState().state).toBe('paused');
    player.setEnabled(true);
    await Promise.resolve();
    expect(audio.tones.length).toBeGreaterThan(0);
    player.setEnabled(false);
    expect(player.getState().state).toBe('paused');
    player.setVolume(Number.NaN);
    expect(player.getState().volume).toBe(0.5);
    player.dispose();
  });

  it('jingiel kończy się przed 2,5 sekundy i wariant świąteczny dodaje dzwonki', async () => {
    const standard = fakeAudio();
    const normal = createMusic(standard.ctx);
    normal.playFinishJingle();
    await Promise.resolve();
    expect(standard.tones.length).toBeGreaterThan(0);
    expect(Math.max(...standard.tones.map((x) => x.stop - standard.ctx.currentTime))).toBeLessThan(2.5);
    normal.dispose();

    const festive = fakeAudio();
    const holiday = createMusic(festive.ctx, { season: 'holiday' });
    holiday.playFinishJingle();
    await Promise.resolve();
    expect(festive.tones.length).toBeGreaterThan(standard.tones.length);
    expect(Math.max(...festive.tones.map((x) => x.stop - festive.ctx.currentTime))).toBeLessThan(2.5);
    holiday.dispose();
  });

  it('pauzuje po ukryciu karty i wznawia po powrocie', async () => {
    const listeners = new Map<string, () => void>();
    const documentStub = {
      hidden: false,
      addEventListener: (name: string, handler: () => void) => listeners.set(name, handler),
      removeEventListener: (name: string) => listeners.delete(name),
    };
    vi.stubGlobal('document', documentStub);
    const audio = fakeAudio();
    const player = createMusic(audio.ctx);
    player.start();
    await Promise.resolve();
    documentStub.hidden = true;
    listeners.get('visibilitychange')?.();
    expect(player.getState().state).toBe('paused');
    documentStub.hidden = false;
    listeners.get('visibilitychange')?.();
    await Promise.resolve();
    expect(player.getState().state).toBe('playing');
    player.dispose();
    expect(listeners.size).toBe(0);
  });
});
