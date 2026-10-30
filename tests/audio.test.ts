import { afterEach, describe, expect, it, vi } from 'vitest';
import { SFX_DURATION_MS, SFX_NAMES, createSfx, sfxForGameEvent } from '../src/audio/sfx';
import { createHaptics, hapticForGameEvent } from '../src/audio/haptics';

class FakeParam {
  value = 1;
  setValueAtTime(value: number): void { this.value = value; }
  linearRampToValueAtTime(value: number): void { this.value = value; }
  exponentialRampToValueAtTime(value: number): void { this.value = value; }
  setTargetAtTime(value: number): void { this.value = value; }
}

class FakeNode {
  onended: (() => void) | null = null;
  connect(_destination: FakeNode): FakeNode { return this; }
  disconnect(): void {}
}

class FakeOscillator extends FakeNode {
  type: OscillatorType = 'sine';
  frequency = new FakeParam();
  starts: number[] = [];
  stops: number[] = [];
  start(time: number): void { this.starts.push(time); }
  stop(time: number): void { this.stops.push(time); }
}

class FakeBufferSource extends FakeNode {
  buffer: unknown;
  starts: number[] = [];
  stops: number[] = [];
  start(time: number): void { this.starts.push(time); }
  stop(time: number): void { this.stops.push(time); }
}

class FakeGain extends FakeNode { gain = new FakeParam(); }
class FakeFilter extends FakeNode { type = 'bandpass'; frequency = new FakeParam(); Q = new FakeParam(); }

class FakeAudioContext {
  state: AudioContextState = 'running';
  currentTime = 1;
  sampleRate = 44100;
  destination = new FakeNode();
  oscillators: FakeOscillator[] = [];
  buffers: FakeBufferSource[] = [];
  gains: FakeGain[] = [];
  resume = vi.fn(async () => { this.state = 'running'; });

  createGain(): FakeGain {
    const gain = new FakeGain();
    this.gains.push(gain);
    return gain;
  }
  createOscillator(): FakeOscillator {
    const oscillator = new FakeOscillator();
    this.oscillators.push(oscillator);
    return oscillator;
  }
  createBufferSource(): FakeBufferSource {
    const source = new FakeBufferSource();
    this.buffers.push(source);
    return source;
  }
  createBiquadFilter(): FakeFilter { return new FakeFilter(); }
  createBuffer(_channels: number, samples: number): { getChannelData: () => Float32Array } {
    const data = new Float32Array(samples);
    return { getChannelData: () => data };
  }
}

function audio(ctx: FakeAudioContext): AudioContext {
  return ctx as unknown as AudioContext;
}

afterEach(() => vi.unstubAllGlobals());

describe('Web Audio', () => {
  it('działa bez AudioContext w Node/SSR i przy braku obsługi', async () => {
    vi.stubGlobal('AudioContext', undefined);
    vi.stubGlobal('webkitAudioContext', undefined);
    const sfx = createSfx();
    expect(() => sfx.play('flap')).not.toThrow();
    expect(() => sfx.setMuted(true)).not.toThrow();
    await expect(sfx.unlock()).resolves.toBeUndefined();
  });

  it('tworzy wszystkie osiem efektów proceduralnie z poprawnymi czasami', () => {
    for (const name of SFX_NAMES) {
      const ctx = new FakeAudioContext();
      createSfx(audio(ctx)).play(name);
      const sources = [...ctx.oscillators, ...ctx.buffers];
      expect(sources.length).toBeGreaterThan(0);
      const lastStop = Math.max(...sources.flatMap((source) => source.stops));
      expect(lastStop - ctx.currentTime).toBeLessThanOrEqual(SFX_DURATION_MS[name] / 1000);
      expect(SFX_DURATION_MS[name]).toBeLessThan(name === 'arrived' ? 2500 : 600);
    }
  });

  it('wycisza również trwający efekt i wstrzymuje nowe odtworzenia', () => {
    const ctx = new FakeAudioContext();
    const sfx = createSfx(audio(ctx));
    sfx.play('flap');
    const count = ctx.oscillators.length;
    sfx.setMuted(true);
    expect(ctx.gains[0].gain.value).toBe(0);
    sfx.play('hit');
    expect(ctx.oscillators.length).toBe(count);
    sfx.setMuted(false);
    sfx.play('click');
    expect(ctx.oscillators.length).toBeGreaterThan(count);
  });

  it('odblokowuje zawieszony kontekst i toleruje odmowę autoplay', async () => {
    const ctx = new FakeAudioContext();
    ctx.state = 'suspended';
    const sfx = createSfx(audio(ctx));
    await sfx.unlock();
    expect(ctx.resume).toHaveBeenCalledOnce();
    ctx.state = 'suspended';
    ctx.resume.mockRejectedValueOnce(new Error('autoplay'));
    await expect(sfx.unlock()).resolves.toBeUndefined();
  });

  it('ogranicza nakładające się dźwięki oraz nietypowe parametry', () => {
    const ctx = new FakeAudioContext();
    const sfx = createSfx(audio(ctx));
    expect(() => sfx.play('flap', { pitch: Number.NaN, volume: -5 })).not.toThrow();
    expect(ctx.oscillators).toHaveLength(0);
    for (let i = 0; i < 8; i++) sfx.play('flap', { pitch: 99, volume: 99 });
    expect(ctx.oscillators).toHaveLength(12); // 6 głosów, każdy po 2 oscylatory.
  });

  it('mapuje zdarzenia rdzenia bez podwójnego dźwięku przy końcu gry', () => {
    expect(sfxForGameEvent({ type: 'flap' })).toBe('flap');
    expect(sfxForGameEvent({ type: 'pickup', kind: 'jar', bonusKm: 30 })).toBe('jar');
    expect(sfxForGameEvent({ type: 'pickup', kind: 'parcel', bonusKm: 15 })).toBe('parcel');
    expect(sfxForGameEvent({ type: 'hit', kind: 'ground', livesLeft: 0 })).toBe('hit');
    expect(sfxForGameEvent({ type: 'border', country: 'PL' })).toBe('border');
    expect(sfxForGameEvent({ type: 'over', cause: 'ground' })).toBeNull();
    expect(sfxForGameEvent({ type: 'waypoint', waypoint: {} as never })).toBeNull();
    expect(sfxForGameEvent({ type: 'arrived' })).toBe('arrived');
  });
});

describe('wibracje', () => {
  it('nie rzuca wyjątku bez navigator ani adaptera', () => {
    vi.stubGlobal('navigator', undefined);
    const haptics = createHaptics();
    expect(() => haptics.play('hit')).not.toThrow();
    expect(() => haptics.setEnabled(false)).not.toThrow();
  });

  it('korzysta z navigator.vibrate, respektuje wyłączenie i odwołuje wibrację', () => {
    const vibrate = vi.fn();
    vi.stubGlobal('navigator', { vibrate });
    const haptics = createHaptics();
    haptics.play('flap');
    expect(vibrate).toHaveBeenCalledWith(12);
    haptics.setEnabled(false);
    expect(vibrate).toHaveBeenLastCalledWith(0);
    const calls = vibrate.mock.calls.length;
    haptics.play('hit');
    expect(vibrate.mock.calls.length).toBe(calls);
    haptics.setEnabled(true);
    haptics.play('hit');
    expect(vibrate).toHaveBeenLastCalledWith([45, 35, 55]);
  });

  it('przyjmuje adapter przyszłej platformy i obsługuje jego błędy', async () => {
    const vibrate = vi.fn().mockRejectedValue(new Error('hardware'));
    const haptics = createHaptics({ vibrate });
    expect(() => haptics.play('border')).not.toThrow();
    await Promise.resolve();
    expect(vibrate).toHaveBeenCalledWith([16, 35, 22]);
  });

  it('mapuje zdarzenia bez podwójnego uderzenia na przegranej', () => {
    expect(hapticForGameEvent({ type: 'pickup', kind: 'parcel', bonusKm: 15 })).toBe('pickup');
    expect(hapticForGameEvent({ type: 'hit', kind: 'ground', livesLeft: 0 })).toBe('hit');
    expect(hapticForGameEvent({ type: 'over', cause: 'ground' })).toBeNull();
  });
});
