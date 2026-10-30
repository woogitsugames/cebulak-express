import type { GameEvent } from '../core/game';

/** Efekty tworzone w Web Audio; bez próbek, plików i zewnętrznych zależności. */
export const SFX_NAMES = ['flap', 'jar', 'parcel', 'overload', 'hit', 'border', 'arrived', 'click'] as const;
export type SfxName = (typeof SFX_NAMES)[number];

export interface SfxPlayOptions {
  /** Głośność danego odtworzenia, od 0 do 1. */
  volume?: number;
  /** Mnożnik wysokości tonu, od 0,75 do 1,25. */
  pitch?: number;
}

export interface SfxPlayer {
  play(name: SfxName, opts?: SfxPlayOptions): void;
  setMuted(muted: boolean): void;
  /** Wywołaj bezpośrednio w obsłudze pierwszego dotyku/kliknięcia. */
  unlock(): Promise<void>;
}

/** Całkowity czas brzmienia: pozostałe efekty < 600 ms, fanfara < 2,5 s. */
export const SFX_DURATION_MS: Readonly<Record<SfxName, number>> = {
  flap: 145,
  jar: 240,
  parcel: 280,
  overload: 500,
  hit: 550,
  border: 550,
  arrived: 1800,
  click: 75,
};

const MAX_SIMULTANEOUS = 6;
const MASTER_LEVEL = 0.42;
const VOICE_LEVEL = 0.3;

function clamp(value: number | undefined, fallback: number, min: number, max: number): number {
  return value === undefined || !Number.isFinite(value) ? fallback : Math.min(max, Math.max(min, value));
}

/** Rozpoznawanie zdarzeń bez modyfikowania deterministycznego rdzenia gry. */
export function sfxForGameEvent(event: GameEvent): SfxName | null {
  switch (event.type) {
    case 'flap': return 'flap';
    case 'pickup': return event.kind === 'jar' ? 'jar' : event.kind === 'parcel' ? 'parcel' : null;
    case 'powerup-start':
      return event.kind === 'boarding' ? 'border' : event.kind === 'tailwind' ? 'overload' : 'jar';
    case 'powerup-end': return null;
    case 'hit': return 'hit';
    case 'border': return 'border';
    case 'arrived': return 'arrived';
    // 'over' następuje po 'hit' w tej samej klatce; podwójny huk byłby zbyt głośny.
    case 'over':
    case 'waypoint': return null;
  }
}

interface Voice {
  ctx: AudioContext;
  bus: GainNode;
  pending: number;
  track(source: AudioScheduledSourceNode, nodes: AudioNode[]): void;
}

/** Jeden miks na efekt; automatycznie odłączamy węzły po zakończeniu. */
function createVoice(ctx: AudioContext, master: GainNode, volume: number): Voice {
  const bus = ctx.createGain();
  bus.gain.value = VOICE_LEVEL * volume;
  bus.connect(master);
  const voice: Voice = {
    ctx, bus, pending: 0,
    track(source, nodes) {
      voice.pending++;
      source.onended = () => {
        source.disconnect();
        for (const node of nodes) node.disconnect();
        if (--voice.pending === 0) bus.disconnect();
      };
    },
  };
  return voice;
}

function envelope(param: AudioParam, start: number, length: number, peak: number, attack = 0.006): void {
  param.setValueAtTime(0, start);
  param.linearRampToValueAtTime(peak, start + Math.min(attack, length * 0.3));
  param.exponentialRampToValueAtTime(0.0001, start + length);
}

function tone(
  voice: Voice, start: number, length: number, from: number, to: number,
  type: OscillatorType, amplitude: number,
): void {
  const { ctx, bus } = voice;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, from), start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + length);
  envelope(gain.gain, start, length, amplitude);
  osc.connect(gain);
  gain.connect(bus);
  voice.track(osc, [gain]);
  osc.start(start);
  osc.stop(start + length);
}

function makeNoise(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.6), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function noise(
  voice: Voice, buffer: AudioBuffer, start: number, length: number,
  frequency: number, amplitude: number,
): void {
  const { ctx, bus } = voice;
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = buffer;
  filter.type = 'bandpass';
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;
  envelope(gain.gain, start, length, amplitude, 0.002);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(bus);
  voice.track(src, [filter, gain]);
  src.start(start, 0, length);
  src.stop(start + length);
}

function synthesize(voice: Voice, name: SfxName, pitch: number, start: number, getNoise: () => AudioBuffer): void {
  const t = (offset: number, duration: number, from: number, to: number, shape: OscillatorType, amp: number): void =>
    tone(voice, start + offset, duration, from * pitch, to * pitch, shape, amp);
  const n = (offset: number, duration: number, freq: number, amp: number): void =>
    noise(voice, getNoise(), start + offset, duration, freq * pitch, amp);

  switch (name) {
    case 'flap':
      // Krótkie, łagodne „pyk” w stylu klaksonu.
      t(0, 0.13, 340, 235, 'square', 0.23);
      t(0.005, 0.12, 265, 215, 'sine', 0.27);
      break;
    case 'jar':
      // Szklane stuknięcie: dwie szybko gasnące harmoniczne.
      t(0, 0.22, 940, 895, 'sine', 0.5);
      t(0.008, 0.13, 1420, 1270, 'triangle', 0.2);
      break;
    case 'parcel':
      // Trzy krótkie szelesty papieru i niski stuk paczki.
      n(0, 0.07, 2350, 0.48);
      n(0.085, 0.06, 3100, 0.38);
      n(0.17, 0.09, 1950, 0.35);
      t(0, 0.08, 180, 112, 'sine', 0.22);
      break;
    case 'overload':
      // Sprężyna kombi wygina się, odbija i komicznie wibruje.
      t(0, 0.2, 345, 115, 'sawtooth', 0.28);
      t(0.16, 0.24, 130, 255, 'triangle', 0.38);
      t(0.37, 0.1, 240, 195, 'sine', 0.22);
      break;
    case 'hit':
      // Blacha, miękki łomot i kilka walizek wysypujących się z dachu.
      t(0, 0.3, 445, 80, 'sawtooth', 0.29);
      t(0, 0.23, 140, 48, 'sine', 0.44);
      n(0.018, 0.15, 820, 0.42);
      n(0.25, 0.075, 1250, 0.32);
      n(0.36, 0.075, 1750, 0.26);
      n(0.46, 0.065, 2250, 0.2);
      break;
    case 'border':
      // Dwa ciepłe uderzenia w dzwonek graniczny.
      t(0, 0.27, 784, 775, 'sine', 0.48);
      t(0, 0.17, 1568, 1540, 'sine', 0.15);
      t(0.2, 0.33, 988, 978, 'sine', 0.44);
      t(0.2, 0.22, 1976, 1950, 'sine', 0.13);
      break;
    case 'arrived': {
      // Autorska, krótka fanfara: cztery wznoszące się stopnie i akord mety.
      const notes: readonly [number, number, number][] = [
        [0, 392, 0.19], [0.21, 494, 0.19], [0.42, 587, 0.2],
        [0.65, 784, 0.35], [1.07, 587, 0.18], [1.26, 784, 0.5],
      ];
      for (const [offset, freq, duration] of notes) {
        t(offset, duration, freq, freq * 0.997, 'triangle', 0.24);
        t(offset, duration * 0.85, freq * 2, freq * 1.99, 'sine', 0.07);
      }
      t(1.26, 0.48, 494, 493, 'sine', 0.15);
      t(1.26, 0.48, 587, 586, 'sine', 0.15);
      break;
    }
    case 'click':
      t(0, 0.062, 800, 480, 'sine', 0.4);
      n(0, 0.03, 2500, 0.13);
      break;
  }
}

/**
 * Nie inicjalizuje urządzenia dźwiękowego do pierwszego `unlock()` lub `play()`.
 * Działa również bez Web Audio (Node, SSR, ograniczone WebView): cichy no-op.
 * `destination` pozwala podpiąć efekty pod wspólny miks gry (potrzebny do nagrywania rolek).
 */
export function createSfx(ctx?: AudioContext, destination?: AudioNode): SfxPlayer {
  let context: AudioContext | undefined = ctx;
  let master: GainNode | undefined;
  let noiseBuffer: AudioBuffer | undefined;
  let muted = false;
  const activeUntil: number[] = [];

  function ensureContext(): AudioContext | undefined {
    if (context) return context;
    const browser = globalThis as typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const Constructor = typeof AudioContext !== 'undefined' ? AudioContext : browser.webkitAudioContext;
    if (!Constructor) return undefined;
    try { context = new Constructor(); } catch { /* Web Audio zablokowane przez urządzenie. */ }
    return context;
  }

  function ensureMaster(audio: AudioContext): GainNode {
    if (!master) {
      master = audio.createGain();
      master.gain.value = muted ? 0 : MASTER_LEVEL;
      // Wspólny miks (muzyka + efekty + nagrywanie rolki) albo wprost głośniki.
      master.connect(destination ?? audio.destination);
    }
    return master;
  }

  return {
    play(name, opts) {
      if (muted || !(SFX_NAMES as readonly string[]).includes(name)) return;
      const audio = ensureContext();
      if (!audio || audio.state === 'closed') return;
      const now = audio.currentTime;
      // Chroni przed przesterem podczas szybkiego stukania oraz nakładających się efektów.
      for (let i = activeUntil.length - 1; i >= 0; i--) {
        if (activeUntil[i] <= now) activeUntil.splice(i, 1);
      }
      if (activeUntil.length >= MAX_SIMULTANEOUS) return;
      const volume = clamp(opts?.volume, 1, 0, 1);
      if (volume === 0) return;
      const pitch = clamp(opts?.pitch, 1, 0.75, 1.25);
      try {
        const voice = createVoice(audio, ensureMaster(audio), volume);
        synthesize(voice, name, pitch, now, () => (noiseBuffer ??= makeNoise(audio)));
        activeUntil.push(now + SFX_DURATION_MS[name] / 1000);
      } catch {
        // Nie zatrzymuj gry, jeśli konkretny sterownik audio odrzuci dźwięk.
      }
    },
    setMuted(value) {
      muted = value;
      if (master && context) master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, context.currentTime, 0.008);
    },
    async unlock() {
      const audio = ensureContext();
      if (!audio || audio.state !== 'suspended') return;
      try { await audio.resume(); } catch { /* Autoplay odmówiony; następny gest może pomóc. */ }
    },
  };
}
