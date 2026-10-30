import { describe, expect, it } from 'vitest';
import { Game, replay } from '../src/core/game';
import { randomNickChoices } from '../src/content/nicks';
import { makeRoute } from '../src/core/route';
import { decodeGhost, encodeGhost, MAX_GHOST_PARAM_LENGTH, parseGhostParams, withGhostChallenge } from '../src/share/ghost';
import { GhostRunner } from '../src/render/ghost';
import { botStep, playWithBot } from './helpers';

const route = makeRoute('BE', 'bruksela', 'rzeszow');

function shortRun(mode: 'ranked' | 'cozy' = 'ranked'): Game {
  const game = new Game({ seed: 0xffffffff, mode, route });
  game.flap();
  while (game.phase === 'playing') game.tick();
  return game;
}

function fromBase64(code: string): number[] {
  return [...atob(code.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - code.length % 4) % 4))]
    .map((character) => character.charCodeAt(0));
}

function toBase64(bytes: number[]): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function updateCrc(bytes: number[]): string {
  let crc = 0xffffffff;
  for (const byte of bytes.slice(0, -4)) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  crc = (crc ^ 0xffffffff) >>> 0;
  bytes.splice(-4, 4, crc & 255, (crc >>> 8) & 255, (crc >>> 16) & 255, (crc >>> 24) & 255);
  return toBase64(bytes);
}

function readVarint(bytes: number[], cursor: { at: number }): number {
  let result = 0;
  let shift = 1;
  while (true) {
    const byte = bytes[cursor.at++];
    result += (byte & 127) * shift;
    if (!(byte & 128)) return result;
    shift *= 128;
  }
}

describe('zapis wyzwania g=', () => {
  it.each(['ranked', 'cozy'] as const)('odtwarza kompletny przejazd trybu %s', (mode) => {
    const original = shortRun(mode);
    const result = encodeGhost(original);
    const decoded = decodeGhost(result.code);
    expect(result.code.length).toBeLessThanOrEqual(MAX_GHOST_PARAM_LENGTH);
    expect(result.truncated).toBe(false);
    expect(decoded).toMatchObject({
      version: 1, home: 'BE', from: 'bruksela', to: 'rzeszow', mode,
      seed: 0xffffffff, km: original.km, ticks: original.ticks,
      truncated: false, flapTicks: [...original.flapTicks],
    });
    expect(replay({ seed: decoded!.seed, mode, route: decoded!.route }, decoded!.flapTicks, decoded!.ticks).km)
      .toBe(original.km);
  });

  it('ignoruje błędny base64url i uszkodzenie CRC', () => {
    const code = encodeGhost(shortRun()).code;
    expect(decodeGhost('')).toBeNull();
    expect(decodeGhost(code + '=')).toBeNull();
    expect(decodeGhost('a'.repeat(1501))).toBeNull();
    const bytes = fromBase64(code);
    bytes[6] ^= 1;
    expect(decodeGhost(toBase64(bytes))).toBeNull();
  });

  it('odrzuca sfałszowany wynik nawet po ponownym obliczeniu CRC', () => {
    const bytes = fromBase64(encodeGhost(shortRun()).code);
    const cursor = { at: 3 };
    const fromLength = readVarint(bytes, cursor);
    cursor.at += fromLength;
    const toLength = readVarint(bytes, cursor);
    cursor.at += toLength + 4; // seed
    readVarint(bytes, cursor); // ticks
    const kmAt = cursor.at;
    const originalKm = readVarint(bytes, cursor);
    expect(originalKm).toBeLessThan(127);
    bytes[kmAt] = originalKm + 1;
    expect(decodeGhost(updateCrc(bytes))).toBeNull();
  });

  it('odrzuca zmodyfikowane flagi nawet z poprawnym CRC', () => {
    const bytes = fromBase64(encodeGhost(shortRun()).code);
    bytes[1] |= 128;
    expect(decodeGhost(updateCrc(bytes))).toBeNull();
  });

  it('odrzuca grę w fazie ready / playing i zmieniony wynik przejazdu', () => {
    const notStarted = new Game({ seed: 1, mode: 'ranked', route });
    expect(() => encodeGhost(notStarted)).toThrow();
    const broken = shortRun();
    broken.bonusKm = 100;
    expect(() => encodeGhost(broken)).toThrow('Wynik różni się');
  });

  it('przy krótkim limicie wycina prefiks, zapisuje jego wynik i oznacza skrócenie', () => {
    const run = new Game({ seed: 17, mode: 'ranked', route });
    playWithBot(run, 120 * 60 * 5);
    expect(['over', 'arrived']).toContain(run.phase);
    const packed = encodeGhost(run, 64);
    const decoded = decodeGhost(packed.code);
    expect(packed.code.length).toBeLessThanOrEqual(64);
    expect(packed.truncated).toBe(true);
    expect(decoded?.truncated).toBe(true);
    expect(decoded!.ticks).toBeLessThan(run.ticks);
    expect(decoded!.km).toBe(packed.km);
    const reconstructed = replay({ seed: decoded!.seed, mode: decoded!.mode, route: decoded!.route }, decoded!.flapTicks, decoded!.ticks);
    expect(reconstructed.km).toBe(decoded!.km);
    expect(reconstructed.phase).toBe('playing');
  });

  it('dokleja g i wyłącznie znormalizowany nickId do linku', () => {
    const nickId = randomNickChoices(() => 0.1, 1, 'BE')[0];
    const url = withGhostChallenge('https://gra.example.invalid/?r=BE-bruksela', shortRun(), nickId);
    const parsed = new URL(url);
    expect(parsed.searchParams.get('r')).toBe('BE-bruksela');
    expect(parseGhostParams(parsed.search)).toMatchObject({ nickId, home: 'BE' });
    expect(parseGhostParams(`?g=${parsed.searchParams.get('g')}&n=<script>`)?.nickId).toBeUndefined();
    expect(parseGhostParams(`?g=${parsed.searchParams.get('g')}&g=fake`)).toBeNull();
    expect(() => withGhostChallenge('https://gra.example.invalid/', shortRun(), 'dane-osobowe')).toThrow();
  });
});

describe('duch na stałych tickach', () => {
  it('symuluje osobną grę; wynik remisu dla identycznego przejazdu', () => {
    const record = shortRun();
    const challenge = decodeGhost(encodeGhost(record).code)!;
    const runner = new GhostRunner(challenge);
    const player = new Game({ seed: challenge.seed, mode: challenge.mode, route: challenge.route });
    player.flap();
    while (player.phase === 'playing') {
      player.tick();
      runner.sync(player);
      expect(runner.game.ticks).toBe(player.ticks);
      expect(runner.game.y).toBe(player.y);
    }
    expect(runner.game).not.toBe(player);
    expect(runner.outcome(player)).toMatchObject({ differenceKm: 0, message: 'Remis z duchem!' });
  });

  it('porównuje ucięty zapis na granicy limitu, nie na końcu dłuższego przejazdu', () => {
    const record = new Game({ seed: 17, mode: 'ranked', route });
    playWithBot(record, 120 * 60 * 5);
    const challenge = decodeGhost(encodeGhost(record, 64).code)!;
    const runner = new GhostRunner(challenge);
    const player = new Game({ seed: 17, mode: 'ranked', route });
    player.flap();
    while (player.phase === 'playing') {
      botStep(player);
      player.tick();
      runner.sync(player);
    }
    expect(player.ticks).toBeGreaterThan(challenge.ticks);
    expect(runner.outcome(player)).toMatchObject({
      truncated: true, playerKm: challenge.km, ghostKm: challenge.km, differenceKm: 0,
    });
  });

  it('nie pozwala uruchomić ducha na innej trasie', () => {
    const challenge = decodeGhost(encodeGhost(shortRun()).code)!;
    const runner = new GhostRunner(challenge);
    const player = new Game({ seed: 123, mode: 'ranked', route: challenge.route });
    expect(() => runner.sync(player)).toThrow('Duch i gracz');
  });

  it('rysuje półprzezroczyste kombi i etykietę na canvasie logicznym', () => {
    const challenge = decodeGhost(encodeGhost(shortRun()).code)!;
    const runner = new GhostRunner(challenge);
    const calls: string[] = [];
    const ctx = {
      globalAlpha: 1,
      save() { calls.push('save'); },
      restore() { calls.push('restore'); },
      translate() {}, rotate() {}, fillRect() {},
      beginPath() {}, arc() {}, fill() {}, roundRect() {},
      measureText(text: string) { return { width: text.length * 7 }; },
      fillText(text: string) { calls.push(text); },
      fillStyle: '', font: '', textBaseline: '',
    } as unknown as CanvasRenderingContext2D;
    runner.draw(ctx, 0.2);
    expect(calls).toContain('Duch znajomego');
    expect(calls.filter((item) => item === 'save').length).toBe(calls.filter((item) => item === 'restore').length);
  });
});
