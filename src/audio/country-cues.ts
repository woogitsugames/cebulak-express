/**
 * Autorskie, proceduralne sygnały przekroczenia granicy.
 * Dźwięki są syntezowane w Web Audio bez sampli i bez cytowania cudzych melodii.
 */

export const COUNTRY_CUE_CODES = [
  'BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'AT', 'NO',
  'SE', 'DK', 'FI', 'PL', 'ES', 'IT', 'IE', 'CZ',
] as const;
export type CountryCueCode = (typeof COUNTRY_CUE_CODES)[number];

type Instrument = 'organ' | 'brass' | 'bells' | 'accordion' | 'alphorn'
  | 'fiddle' | 'home' | 'guitar' | 'mandolin' | 'flute' | 'polka' | 'bass';
type Pulse = 'oompah' | 'mazurka' | 'drone';
type Note = readonly [pitch: string, beats: number];

interface CueScore {
  readonly label: string;
  readonly instrument: Exclude<Instrument, 'bass'>;
  readonly bpm: number;
  readonly notes: readonly Note[];
  readonly bass?: string;
  readonly chord?: readonly [string, string];
  readonly pulse?: Pulse;
}

function score(
  label: string, instrument: CueScore['instrument'], bpm: number,
  melody: string, rhythm: readonly number[], bass?: string,
  chord?: readonly [string, string], pulse?: Pulse,
): CueScore {
  const pitches = melody.split(' ');
  if (pitches.length !== rhythm.length) throw new Error(`Błędny rytm: ${label}`);
  return {
    label, instrument, bpm,
    notes: pitches.map((pitch, i) => [pitch, rhythm[i]] as const),
    bass, chord, pulse,
  };
}

// Wszystkie frazy napisano specjalnie do gry. Barwa nawiązuje do tradycji,
// ale żadna fraza nie jest hymnem, kolędą ani aranżacją konkretnego utworu.
const HALF = [0.5, 0.5, 0.5, 0.5, 0.75, 0.25, 1, 1.5] as const; // 5,5 miary
const COUNTRY_CUES: Record<CountryCueCode, CueScore> = {
  BE: score('Belgia · katarynka', 'organ', 136, 'G5 B5 A5 D6 B5 G5 F#5 G5', HALF, 'G3', ['B4', 'D5'], 'oompah'),
  NL: score('Holandia · katarynka', 'organ', 138, 'A5 C#6 B5 E6 C#6 A5 G#5 A5', HALF, 'A3', ['C#5', 'E5'], 'oompah'),
  DE: score('Niemcy · krótka fanfara', 'brass', 136, 'C5 G5 C6 E6 D6 G5 B5 C6', HALF, 'C3', ['E4', 'G4'], 'oompah'),
  UK: score('Wielka Brytania · dzwony', 'bells', 134, 'E5 B5 G5 C6 A5 E5 D5 G5', HALF),
  FR: score('Francja · akordeon musette', 'accordion', 140, 'A4 C5 E5 D5 F5 E5 C5 A4', HALF, 'A3', ['C4', 'E4'], 'oompah'),
  CH: score('Szwajcaria · echo alpejskie', 'alphorn', 132, 'G4 D5 G5 B4 D6 B4 G5 G4', HALF, 'G3', ['D4', 'G4'], 'drone'),
  AT: score('Austria · echo alpejskie', 'alphorn', 134, 'C5 G4 E5 G5 C6 G5 E5 C5', HALF, 'C3', ['E4', 'G4'], 'drone'),
  NO: score('Norwegia · skrzypce', 'fiddle', 138, 'D5 F5 A5 G5 F5 D5 C5 D5', HALF, 'D3', ['A3', 'D4'], 'drone'),
  SE: score('Szwecja · skrzypce', 'fiddle', 136, 'G4 B4 D5 E5 D5 B4 A4 G4', HALF, 'G3', ['D4', 'G4'], 'drone'),
  DK: score('Dania · skrzypce', 'fiddle', 140, 'A4 C5 E5 F5 E5 C5 B4 A4', HALF, 'A3', ['E4', 'A4'], 'drone'),
  FI: score('Finlandia · skrzypce', 'fiddle', 132, 'E5 G5 B4 E5 D5 B4 G4 E5', HALF, 'E3', ['B3', 'E4'], 'drone'),
  PL: score('Polska · ciepły mazurek', 'home', 154, 'D5 F#5 A5 G5 B5 A5 F#5 E5 D5',
    [0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1], 'D3', ['F#4', 'A4'], 'mazurka'),
  ES: score('Hiszpania · gitara', 'guitar', 136, 'E5 G5 B4 C5 E5 D5 B4 E5', HALF, 'E3', ['G3', 'B3'], 'oompah'),
  IT: score('Włochy · mandolina', 'mandolin', 138, 'D5 F#5 A5 B5 A5 F#5 E5 D5', HALF, 'D3', ['F#4', 'A4'], 'oompah'),
  IE: score('Irlandia · flet', 'flute', 136, 'A4 D5 F#5 E5 A5 F#5 E5 D5', HALF, 'D3', ['A3', 'D4'], 'drone'),
  CZ: score('Czechy · polka', 'polka', 142, 'G4 B4 D5 B4 C5 E5 D5 G5', HALF, 'G3', ['B3', 'D4'], 'oompah'),
};

const NOTE_SEMITONES: Readonly<Record<string, number>> = {
  C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11,
};

function hz(pitch: string): number {
  const match = /^([A-G])(#?)([2-6])$/.exec(pitch);
  if (!match) throw new Error(`Nieprawidłowa nuta: ${pitch}`);
  const midi = (Number(match[3]) + 1) * 12 + NOTE_SEMITONES[match[1]] + (match[2] ? 1 : 0);
  return 440 * 2 ** ((midi - 69) / 12);
}

interface Partial {
  readonly wave: OscillatorType;
  readonly multiplier: number;
  readonly gain: number;
  readonly cents?: number;
}

interface VoiceStyle {
  readonly partials: readonly Partial[];
  readonly level: number;
  readonly cutoff: number;
  readonly attack: number;
  readonly decay: number;
}

const STYLES: Readonly<Record<Instrument, VoiceStyle>> = {
  organ: { partials: [{ wave: 'square', multiplier: 1, gain: 0.64 }, { wave: 'sine', multiplier: 2, gain: 0.23 }], level: 0.093, cutoff: 1900, attack: 0.018, decay: 0.85 },
  brass: { partials: [{ wave: 'sawtooth', multiplier: 1, gain: 0.68 }, { wave: 'triangle', multiplier: 1, gain: 0.36 }], level: 0.095, cutoff: 1600, attack: 0.045, decay: 0.89 },
  bells: { partials: [{ wave: 'sine', multiplier: 1, gain: 0.8 }, { wave: 'sine', multiplier: 2.01, gain: 0.22 }, { wave: 'sine', multiplier: 3.93, gain: 0.11 }], level: 0.093, cutoff: 5200, attack: 0.006, decay: 1.16 },
  accordion: { partials: [{ wave: 'sawtooth', multiplier: 1, gain: 0.47, cents: -7 }, { wave: 'sawtooth', multiplier: 1, gain: 0.47, cents: 7 }], level: 0.096, cutoff: 1700, attack: 0.032, decay: 0.96 },
  alphorn: { partials: [{ wave: 'triangle', multiplier: 1, gain: 0.76 }, { wave: 'sine', multiplier: 2, gain: 0.22 }], level: 0.115, cutoff: 2200, attack: 0.05, decay: 0.94 },
  fiddle: { partials: [{ wave: 'sawtooth', multiplier: 1, gain: 0.63 }, { wave: 'triangle', multiplier: 1, gain: 0.25 }], level: 0.091, cutoff: 2050, attack: 0.028, decay: 0.93 },
  home: { partials: [{ wave: 'triangle', multiplier: 1, gain: 0.8 }, { wave: 'sine', multiplier: 2, gain: 0.18 }], level: 0.096, cutoff: 2000, attack: 0.022, decay: 0.96 },
  guitar: { partials: [{ wave: 'triangle', multiplier: 1, gain: 0.75 }, { wave: 'sine', multiplier: 2, gain: 0.25 }], level: 0.105, cutoff: 3600, attack: 0.004, decay: 0.85 },
  mandolin: { partials: [{ wave: 'triangle', multiplier: 1, gain: 0.7 }, { wave: 'square', multiplier: 2, gain: 0.15 }], level: 0.092, cutoff: 2750, attack: 0.004, decay: 0.84 },
  flute: { partials: [{ wave: 'sine', multiplier: 1, gain: 0.83 }, { wave: 'triangle', multiplier: 2, gain: 0.16 }], level: 0.11, cutoff: 3400, attack: 0.05, decay: 0.94 },
  polka: { partials: [{ wave: 'square', multiplier: 1, gain: 0.61 }, { wave: 'triangle', multiplier: 1, gain: 0.31 }], level: 0.087, cutoff: 1950, attack: 0.016, decay: 0.86 },
  bass: { partials: [{ wave: 'triangle', multiplier: 1, gain: 0.83 }, { wave: 'sine', multiplier: 1, gain: 0.17 }], level: 0.052, cutoff: 1100, attack: 0.008, decay: 0.84 },
};

/** Dane publiczne dla testów i strony odsłuchu. */
export const COUNTRY_CUE_INFO: Readonly<Record<CountryCueCode, Readonly<{
  label: string; instrument: CueScore['instrument']; durationSeconds: number;
}>>> = Object.fromEntries(COUNTRY_CUE_CODES.map((country) => {
  const cue = COUNTRY_CUES[country];
  const secondsPerBeat = 60 / cue.bpm;
  let at = 0;
  let end = 0;
  for (const [, beats] of cue.notes) {
    const length = Math.min(0.82, beats * secondsPerBeat * STYLES[cue.instrument].decay);
    end = Math.max(end, at + length * (cue.instrument === 'mandolin' ? 1.04 : 1));
    at += beats * secondsPerBeat;
  }
  // Bufor na wygładzenie szyny, bez dodatkowych dźwięków.
  return [country, { label: cue.label, instrument: cue.instrument, durationSeconds: end + 0.08 }];
})) as Record<CountryCueCode, { label: string; instrument: CueScore['instrument']; durationSeconds: number }>;

function synth(
  ctx: AudioContext, destination: AudioNode, pitch: string, at: number,
  length: number, instrument: Instrument, velocity: number,
): void {
  const style = STYLES[instrument];
  const envelope = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(style.cutoff, at);
  if (instrument === 'brass') {
    filter.frequency.setValueAtTime(style.cutoff * 0.63, at);
    filter.frequency.exponentialRampToValueAtTime(style.cutoff, at + Math.min(0.1, length / 2));
  }
  const attack = Math.min(style.attack, length * 0.3);
  envelope.gain.setValueAtTime(0.0001, at);
  envelope.gain.linearRampToValueAtTime(style.level * velocity, at + attack);
  envelope.gain.exponentialRampToValueAtTime(0.0001, at + length);
  filter.connect(envelope);
  envelope.connect(destination);
  let pending = style.partials.length;
  for (const partial of style.partials) {
    const oscillator = ctx.createOscillator();
    oscillator.type = partial.wave;
    const pitchHz = hz(pitch) * partial.multiplier;
    oscillator.frequency.setValueAtTime(pitchHz, at);
    if (partial.cents !== undefined) oscillator.detune.setValueAtTime(partial.cents, at);
    if (instrument === 'fiddle' || instrument === 'flute' || instrument === 'alphorn') {
      oscillator.frequency.setValueAtTime(pitchHz * 0.985, at);
      oscillator.frequency.linearRampToValueAtTime(pitchHz, at + Math.min(0.09, length * 0.4));
      if (length > 0.23) {
        oscillator.frequency.linearRampToValueAtTime(pitchHz * 1.008, at + length * 0.6);
        oscillator.frequency.linearRampToValueAtTime(pitchHz, at + length * 0.85);
      }
    }
    const balance = ctx.createGain();
    balance.gain.value = partial.gain;
    oscillator.connect(balance);
    balance.connect(filter);
    oscillator.onended = () => {
      oscillator.disconnect();
      balance.disconnect();
      if (--pending === 0) {
        filter.disconnect();
        envelope.disconnect();
      }
    };
    oscillator.start(at);
    oscillator.stop(at + length);
  }
}

/**
 * Planuje frazę od `at` (w sekundach zegara AudioContext).
 * Zwraca czas zakończenia względem `at`; nie zmienia globalnej głośności.
 */
export function scheduleCountryCue(
  ctx: AudioContext, destination: AudioNode, country: CountryCueCode, at: number,
): number {
  const cue = COUNTRY_CUES[country];
  if (!cue) return 0; // Bez dźwięku przy nieobsługiwanym kodzie z obcych danych.
  const beat = 60 / cue.bpm;
  let elapsed = 0;
  let end = 0;
  for (const [pitch, beats] of cue.notes) {
    const length = Math.min(0.82, beats * beat * STYLES[cue.instrument].decay);
    if (cue.instrument === 'mandolin') {
      // Lekkie tremolo: dwa uderzenia dla jednej nuty, bez sampli.
      const part = length * 0.56;
      synth(ctx, destination, pitch, at + elapsed, part, 'mandolin', 0.88);
      synth(ctx, destination, pitch, at + elapsed + length * 0.48, part, 'mandolin', 0.68);
      end = Math.max(end, elapsed + length * 1.04);
    } else {
      synth(ctx, destination, pitch, at + elapsed, length, cue.instrument, elapsed === 0 ? 1.06 : 0.91);
      end = Math.max(end, elapsed + length);
    }
    elapsed += beats * beat;
  }
  if (cue.bass && cue.chord && cue.pulse) {
    const beats = Math.ceil(elapsed / beat);
    for (let i = 0; i < beats; i++) {
      const start = at + i * beat;
      if (cue.pulse === 'drone') {
        if (i === 0 || i === 3) synth(ctx, destination, cue.bass, start, beat * 1.3, 'bass', 0.69);
      } else {
        const isBass = cue.pulse === 'mazurka' ? i % 3 === 0 : i % 2 === 0;
        if (isBass) synth(ctx, destination, cue.bass, start, beat * 0.51, 'bass', 0.82);
        else {
          for (const note of cue.chord) synth(ctx, destination, note, start, beat * 0.39, 'bass', 0.28);
        }
      }
    }
  }
  return end + 0.08;
}
