/**
 * Autorska melodia w rytmie polki (2/4), syntezowana przez Web Audio.
 * Nie używa nagrań, sampli ani melodii z cudzych utworów.
 * AudioContext można współdzielić z createSfx(ctx) ze zlecenia 19.
 */

export const MUSIC_BPM = 124;
export const MUSIC_BAR_COUNT = 32;

export type MusicSeason = 'regular' | 'holiday';
export type MusicState = 'stopped' | 'playing' | 'paused';

export interface MusicOptions {
  /** Węzeł docelowy; domyślnie ctx.destination. */
  destination?: AudioNode;
  /** Głośność 0–1; 1 nadal jest ciszej niż typowe efekty gry. */
  volume?: number;
  enabled?: boolean;
  season?: MusicSeason;
}

export interface MusicPlayer {
  /** Wywołaj z pierwszego gestu gracza; nie uruchamia muzyki. */
  unlock(): Promise<void>;
  /** Zaczyna utwór od początku; można wywołać z gestu gracza. */
  start(): void;
  /** Łagodnie wycisza i zapamiętuje miejsce w utworze. */
  pause(): void;
  /** Wznawia muzykę od zapamiętanego miejsca. */
  resume(): void;
  /** Łagodnie wycisza i resetuje odtwarzanie. */
  stop(): void;
  /** Zatrzymuje trasę i odtwarza krótki jingiel mety. */
  playFinishJingle(): void;
  setEnabled(enabled: boolean): void;
  setVolume(volume: number): void;
  setSeason(season: MusicSeason): void;
  getState(): Readonly<{ state: MusicState; enabled: boolean; volume: number; season: MusicSeason }>;
  /** Usuwa nasłuch i węzły; nie zamyka AudioContext przekazanego z zewnątrz. */
  dispose(): void;
}

type Chord = 'G' | 'D' | 'Em' | 'C' | 'Am';
type Bar = readonly [melody: string, chord: Chord];

// Oryginalna 32-taktowa kompozycja AABB: cztery ósemki na takt 2/4.
// Podkreślenie oznacza pauzę, nie przedłużenie dźwięku.
const SCORE: readonly Bar[] = [
  ['G4 B4 D5 B4', 'G'],
  ['A4 C5 F#5 A4', 'D'],
  ['B4 G4 E5 G4', 'Em'],
  ['G4 E5 C5 G4', 'C'],
  ['B4 D5 G5 D5', 'G'],
  ['E5 G5 E5 C5', 'C'],
  ['F#5 A5 D5 F#5', 'D'],
  ['G5 D5 B4 G4', 'G'],
  ['D5 B4 G4 B4', 'G'],
  ['C5 A4 F#4 A4', 'D'],
  ['G4 B4 E5 B4', 'Em'],
  ['E5 D5 C5 G4', 'C'],
  ['A4 C5 E5 C5', 'Am'],
  ['D5 F#5 A5 F#5', 'D'],
  ['G5 E5 D5 B4', 'G'],
  ['G4 B4 G4 _', 'G'],
  ['C5 E5 G5 E5', 'C'],
  ['D5 B4 G4 B4', 'G'],
  ['C5 E5 A5 E5', 'Am'],
  ['G5 E5 B4 G4', 'Em'],
  ['E5 G5 C6 G5', 'C'],
  ['B4 D5 G5 D5', 'G'],
  ['F#5 E5 D5 C5', 'D'],
  ['B4 G4 D5 _', 'G'],
  ['E5 G5 B5 G5', 'Em'],
  ['A5 E5 C5 A4', 'Am'],
  ['F#5 A5 F#5 D5', 'D'],
  ['B4 D5 G5 B4', 'G'],
  ['C5 E5 G5 C5', 'C'],
  ['A4 C5 D5 F#5', 'D'],
  ['G5 D5 B4 G4', 'G'],
  ['G4 _ B4 G4', 'G'],
];

const HARMONY: Record<Chord, { bass: readonly [string, string]; notes: readonly string[] }> = {
  G: { bass: ['G2', 'D3'], notes: ['G3', 'B3', 'D4'] },
  D: { bass: ['D3', 'A2'], notes: ['D4', 'F#4', 'A4'] },
  Em: { bass: ['E2', 'B2'], notes: ['E3', 'G3', 'B3'] },
  C: { bass: ['C3', 'G2'], notes: ['C4', 'E4', 'G4'] },
  Am: { bass: ['A2', 'E3'], notes: ['A3', 'C4', 'E4'] },
};

const STEPS_PER_BAR = 4;
const STEP_COUNT = MUSIC_BAR_COUNT * STEPS_PER_BAR;
const STEP_SECONDS = 30 / MUSIC_BPM;
const BEAT_SECONDS = 60 / MUSIC_BPM;
const SCHEDULE_AHEAD = 0.2;
const CLOCK_INTERVAL_MS = 25;
const FADE_SECONDS = 0.16;
const MELODY = SCORE.map(([notes]) => notes.split(' '));
const PITCHES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function frequency(note: string): number {
  const parts = /^([A-G])(#?)([2-6])$/.exec(note);
  if (!parts) throw new Error(`Nieprawidłowa nuta: ${note}`);
  const midi = (Number(parts[3]) + 1) * 12 + PITCHES[parts[1]] + (parts[2] ? 1 : 0);
  return 440 * 2 ** ((midi - 69) / 12);
}

function clampVolume(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.5;
}

function tone(
  ctx: AudioContext,
  destination: AudioNode,
  pitch: string,
  at: number,
  length: number,
  wave: OscillatorType,
  gain: number,
): void {
  const oscillator = ctx.createOscillator();
  const envelope = ctx.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency(pitch), at);
  const attack = Math.min(0.009, length / 4);
  envelope.gain.setValueAtTime(0.0001, at);
  envelope.gain.linearRampToValueAtTime(gain, at + attack);
  envelope.gain.exponentialRampToValueAtTime(0.0001, at + length);
  oscillator.connect(envelope);
  envelope.connect(destination);
  oscillator.onended = () => {
    oscillator.disconnect();
    envelope.disconnect();
  };
  oscillator.start(at);
  oscillator.stop(at + length + 0.01);
}

function bell(ctx: AudioContext, destination: AudioNode, note: string, at: number, gain: number): void {
  tone(ctx, destination, note, at, 0.23, 'sine', gain);
  // Metaliczny przydźwięk bez sampli (oktawa wyżej, krótszy czas).
  const parts = /^([A-G]#?)([2-5])$/.exec(note);
  if (parts) tone(ctx, destination, `${parts[1]}${Number(parts[2]) + 1}`, at, 0.1, 'sine', gain * 0.35);
}

function playStep(ctx: AudioContext, output: AudioNode, step: number, at: number, season: MusicSeason): void {
  const bar = Math.floor(step / STEPS_PER_BAR);
  const position = step % STEPS_PER_BAR;
  const chord = HARMONY[SCORE[bar][1]];
  const note = MELODY[bar][position];

  if (note !== '_') {
    if (season === 'holiday') bell(ctx, output, note, at, 0.075);
    else tone(ctx, output, note, at, STEP_SECONDS * 0.79, 'square', position === 0 ? 0.077 : 0.061);
  }

  if (position % 2 === 0) {
    tone(ctx, output, chord.bass[position / 2], at, STEP_SECONDS * 0.87, 'triangle', 0.17);
  } else {
    for (const pitch of chord.notes) {
      tone(ctx, output, pitch, at, STEP_SECONDS * 0.67, 'triangle', season === 'holiday' ? 0.021 : 0.031);
    }
    if (season === 'holiday') bell(ctx, output, position === 1 ? 'E5' : 'G5', at, 0.022);
  }
}

// Krótka autorska kadencja: 4 jednostki ćwierćnutowe, nie cytuje żadnej kolędy.
const FINISH: readonly (readonly [note: string, beats: number])[] = [
  ['G5', 0.5],
  ['B5', 0.5],
  ['D6', 0.75],
  ['B5', 0.25],
  ['G5', 0.5],
  ['A5', 0.5],
  ['G5', 1],
];

/** Wstrzyknij ten sam `ctx` do `createSfx(ctx)` i `createMusic(ctx)`. */
export function createMusic(ctx?: AudioContext, options: MusicOptions = {}): MusicPlayer {
  let context = ctx;
  let ownContext = false;
  let master: GainNode | undefined;
  let loopBus: GainNode | undefined;
  let finishBus: GainNode | undefined;
  let clock: ReturnType<typeof setInterval> | undefined;
  let state: MusicState = 'stopped';
  let enabled = options.enabled ?? true;
  let volume = clampVolume(options.volume ?? 0.5);
  let season: MusicSeason = options.season ?? 'regular';
  let disposed = false;
  let generation = 0;
  let savedStep = 0;
  let firstStep = 0;
  let anchorTime = 0;
  let nextStep = 0;
  let nextTime = 0;
  let resumeOnShow = false;
  let resumeOnEnable = false;
  const channels = new Set<GainNode>();

  function hidden(): boolean {
    return typeof document !== 'undefined' && document.hidden;
  }

  async function prepare(): Promise<AudioContext | undefined> {
    if (disposed) return undefined;
    if (!context) {
      if (typeof AudioContext === 'undefined') return undefined;
      try {
        context = new AudioContext();
        ownContext = true;
      } catch {
        return undefined;
      }
    }
    if (context.state === 'closed') return undefined;
    if (!master) {
      master = context.createGain();
      master.gain.value = volume * 0.26;
      master.connect(options.destination ?? context.destination);
    }
    if (context.state === 'suspended') {
      try {
        await context.resume();
      } catch {
        return undefined;
      }
    }
    return context.state === 'running' ? context : undefined;
  }

  function newChannel(ctx: AudioContext): GainNode {
    const node = ctx.createGain();
    node.gain.setValueAtTime(0, ctx.currentTime);
    node.gain.linearRampToValueAtTime(1, ctx.currentTime + FADE_SECONDS);
    node.connect(master!);
    channels.add(node);
    return node;
  }

  function fadeChannel(node: GainNode | undefined, delay = FADE_SECONDS): void {
    if (!node || !context) return;
    const now = context.currentTime;
    node.gain.cancelScheduledValues(now);
    node.gain.setValueAtTime(node.gain.value, now);
    node.gain.linearRampToValueAtTime(0, now + delay);
    // Zaplanowane oscylatory kończą się same; odłączamy ich wspólną szynę po wyciszeniu.
    setTimeout(() => {
      node.disconnect();
      channels.delete(node);
    }, Math.ceil((delay + 0.35) * 1000));
  }

  function endLoop(): void {
    if (clock !== undefined) clearInterval(clock);
    clock = undefined;
    fadeChannel(loopBus);
    loopBus = undefined;
  }

  function currentStep(): number {
    if (!context || !loopBus) return savedStep;
    const elapsed = Math.max(0, Math.floor((context.currentTime - anchorTime) / STEP_SECONDS));
    return (firstStep + elapsed) % STEP_COUNT;
  }

  function schedule(): void {
    if (!context || !loopBus || state !== 'playing' || hidden()) return;
    const now = context.currentTime;
    // Po uśpieniu karty pomijamy spóźnione nuty zamiast odtwarzać je naraz.
    if (nextTime < now - 0.05) {
      const skipped = Math.ceil((now + 0.025 - nextTime) / STEP_SECONDS);
      nextTime += skipped * STEP_SECONDS;
      nextStep += skipped;
    }
    let work = 0;
    while (nextTime < now + SCHEDULE_AHEAD && work++ < 16) {
      playStep(context, loopBus, nextStep % STEP_COUNT, nextTime, season);
      nextTime += STEP_SECONDS;
      nextStep += 1;
    }
  }

  function requestLoop(): void {
    const request = ++generation;
    // prepare() uruchamia AudioContext w tym samym wywołaniu co gest użytkownika.
    void prepare().then((active) => {
      if (!active || disposed || request !== generation || state !== 'playing' || !enabled || hidden()) return;
      endLoop();
      const bus = newChannel(active);
      loopBus = bus;
      firstStep = savedStep;
      anchorTime = active.currentTime + 0.045;
      nextStep = savedStep;
      nextTime = anchorTime;
      schedule();
      clock = setInterval(schedule, CLOCK_INTERVAL_MS);
    });
  }

  function pauseInternal(): void {
    if (state !== 'playing') return;
    savedStep = currentStep();
    state = 'paused';
    ++generation;
    endLoop();
  }

  function stopInternal(): void {
    ++generation;
    state = 'stopped';
    savedStep = 0;
    resumeOnShow = false;
    resumeOnEnable = false;
    endLoop();
    fadeChannel(finishBus);
    finishBus = undefined;
  }

  function start(): void {
    if (disposed) return;
    stopInternal();
    if (!enabled || hidden()) {
      state = 'paused';
      resumeOnEnable = !enabled;
      resumeOnShow = hidden();
      return;
    }
    state = 'playing';
    requestLoop();
  }

  function pause(): void {
    resumeOnShow = false;
    resumeOnEnable = false;
    pauseInternal();
  }

  function resume(): void {
    if (disposed || state !== 'paused') return;
    if (!enabled) {
      resumeOnEnable = true;
      return;
    }
    if (hidden()) {
      resumeOnShow = true;
      return;
    }
    resumeOnShow = false;
    resumeOnEnable = false;
    state = 'playing';
    requestLoop();
  }

  function playFinishJingle(): void {
    if (disposed) return;
    stopInternal();
    if (!enabled || hidden()) return;
    const request = ++generation;
    void prepare().then((active) => {
      if (!active || disposed || request !== generation || !enabled || hidden()) return;
      const output = newChannel(active);
      finishBus = output;
      let at = active.currentTime + 0.045;
      for (const [note, beats] of FINISH) {
        if (season === 'holiday') bell(active, output, note, at, 0.11);
        else tone(active, output, note, at, Math.min(beats * BEAT_SECONDS * 0.93, 0.43), 'square', 0.11);
        at += beats * BEAT_SECONDS;
      }
      if (season === 'holiday') {
        for (let beat = 0; beat < 8; beat++) {
          bell(active, output, beat % 2 ? 'G5' : 'E5', active.currentTime + 0.045 + beat * BEAT_SECONDS / 2, 0.023);
        }
      }
      const bus = output;
      setTimeout(() => {
        if (finishBus === bus) finishBus = undefined;
        bus.disconnect();
        channels.delete(bus);
      }, Math.ceil((at - active.currentTime + 0.45) * 1000));
    });
  }

  function onVisibility(): void {
    if (hidden()) {
      if (state === 'playing') {
        resumeOnShow = true;
        pauseInternal();
      }
      fadeChannel(finishBus);
      finishBus = undefined;
    } else if (resumeOnShow) {
      resumeOnShow = false;
      resume();
    }
  }

  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisibility);

  return {
    unlock: async () => { await prepare(); },
    start,
    pause,
    resume,
    stop: stopInternal,
    playFinishJingle,
    setEnabled(value) {
      if (disposed || value === enabled) return;
      enabled = value;
      if (!value) {
        resumeOnEnable = state === 'playing' || resumeOnShow;
        pauseInternal();
        fadeChannel(finishBus);
        finishBus = undefined;
      } else if (resumeOnEnable) {
        resumeOnEnable = false;
        resume();
      }
    },
    setVolume(value) {
      if (disposed) return;
      volume = clampVolume(value);
      if (context && master) master.gain.setTargetAtTime(volume * 0.26, context.currentTime, 0.025);
    },
    setSeason(value) {
      if (disposed || value === season) return;
      season = value;
      if (state === 'playing') {
        savedStep = currentStep();
        ++generation;
        endLoop();
        requestLoop();
      }
    },
    getState: () => ({ state, enabled, volume, season }),
    dispose() {
      if (disposed) return;
      stopInternal();
      disposed = true;
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility);
      for (const node of channels) node.disconnect();
      channels.clear();
      master?.disconnect();
      if (ownContext && context) void context.close().catch(() => undefined);
    },
  };
}
