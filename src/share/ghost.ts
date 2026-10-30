import { Game, replay, type Mode } from '../core/game';
import { HOME_COUNTRIES, makeRoute, type HomeCountry, type Route } from '../core/route';
import { isValidNickId } from '../content/nicks';

/** Format binarny v1: wersja, flagi, kraj, ID miast, seed LE32, ticki,
 * km, liczba tapnięć, odstępy między nimi (varint), CRC32 LE32. */
const VERSION = 1;
const FLAG_COZY = 1;
const FLAG_TRUNCATED = 2;
const MAX_TICKS = 120 * 60 * 10;
export const MAX_GHOST_PARAM_LENGTH = 1500;

export interface GhostChallenge {
  readonly version: 1;
  readonly home: HomeCountry;
  readonly from: string;
  readonly to: string;
  readonly route: Route;
  readonly seed: number;
  readonly mode: Mode;
  readonly ticks: number;
  readonly km: number;
  readonly flapTicks: readonly number[];
  readonly truncated: boolean;
  /** Wyłącznie identyfikator z zamkniętego słownika, nigdy swobodny tekst. */
  readonly nickId?: string;
}

export interface EncodedGhost {
  /** Gotowa wartość parametru `g` (bez `g=`). */
  readonly code: string;
  readonly ticks: number;
  readonly km: number;
  /** Prawda, jeśli porównujemy tylko pierwsze ticki/sekundy przejazdu. */
  readonly truncated: boolean;
}

function assertUint32(n: number): void {
  if (!Number.isSafeInteger(n) || n < 0 || n > 0xffffffff) throw new RangeError('Liczba poza zakresem uint32');
}

function putVarint(out: number[], n: number): void {
  assertUint32(n);
  do {
    const byte = n % 128;
    n = Math.floor(n / 128);
    out.push(n ? byte | 128 : byte);
  } while (n);
}

function readVarint(bytes: Uint8Array, cursor: { at: number }, end: number): number {
  let n = 0;
  for (let i = 0; i < 5; i++) {
    if (cursor.at >= end) throw new Error('Niekompletny varint');
    const byte = bytes[cursor.at++];
    if (i === 4 && (byte & 0xf0) !== 0) throw new Error('Przepełniony varint');
    n += (byte & 0x7f) * 2 ** (i * 7);
    if (!(byte & 0x80)) {
      if (i > 0 && (byte & 0x7f) === 0) throw new Error('Nadmiarowe bajty varint');
      assertUint32(n);
      return n;
    }
  }
  throw new Error('Varint dłuższy niż 5 bajtów');
}

function putU32(out: number[], n: number): void {
  assertUint32(n);
  out.push(n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255);
}

function readU32(bytes: Uint8Array, at: number): number {
  return (bytes[at] | (bytes[at + 1] << 8) | (bytes[at + 2] << 16) | (bytes[at + 3] << 24)) >>> 0;
}

/** CRC32 (IEEE). Wykrywa uszkodzenia, nie jest kryptograficznym podpisem. */
function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function putCity(out: number[], id: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 100) {
    throw new Error('Nieprawidłowy identyfikator miasta');
  }
  putVarint(out, id.length);
  for (let i = 0; i < id.length; i++) out.push(id.charCodeAt(i));
}

function readCity(bytes: Uint8Array, cursor: { at: number }, end: number): string {
  const length = readVarint(bytes, cursor, end);
  if (length === 0 || length > 100 || cursor.at + length > end) throw new Error('Długość identyfikatora miasta');
  let id = '';
  for (let i = 0; i < length; i++) id += String.fromCharCode(bytes[cursor.at++]);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error('Nieprawidłowy identyfikator miasta');
  return id;
}

function base64url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function unbase64url(code: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(code) || code.length % 4 === 1) throw new Error('Nieprawidłowy base64url');
  const binary = atob(code.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - code.length % 4) % 4));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  if (base64url(bytes) !== code) throw new Error('Niekanoniczny base64url');
  return bytes;
}

function assertTicks(ticks: readonly number[], until: number): void {
  if (!Number.isSafeInteger(until) || until < 1) throw new RangeError('Nieprawidłowa liczba ticków');
  if (!ticks.length || ticks[0] !== 0) throw new Error('Przejazd musi zaczynać się od tapnięcia w ticku 0');
  let prev = -1;
  for (const tick of ticks) {
    if (!Number.isSafeInteger(tick) || tick <= prev || tick >= until) {
      throw new Error('Tapnięcia muszą być rosnące i należeć do przejazdu');
    }
    prev = tick;
  }
}

function pack(run: Game, ticks: number, km: number, flaps: readonly number[], truncated: boolean): string {
  const index = HOME_COUNTRIES.indexOf(run.route.home);
  if (index < 0) throw new Error('Nieznany kraj');
  const out = [VERSION, (run.mode === 'cozy' ? FLAG_COZY : 0) | (truncated ? FLAG_TRUNCATED : 0), index];
  putCity(out, run.route.from.id);
  putCity(out, run.route.to.id);
  putU32(out, run.seed);
  putVarint(out, ticks);
  putVarint(out, km);
  putVarint(out, flaps.length);
  let prev = 0;
  for (const tick of flaps) {
    putVarint(out, tick - prev);
    prev = tick;
  }
  putU32(out, crc32(Uint8Array.from(out)));
  return base64url(Uint8Array.from(out));
}

/**
 * Weryfikuje i koduje zakończony przejazd. Jeśli nie mieści się w limicie,
 * zapisuje NAJDŁUŻSZY mieszczący się prefiks ticków i jego rzeczywisty wynik.
 * Ograniczenie czasowe 10 minut chroni odbiorcę przed kosztownym replay.
 */
export function encodeGhost(run: Game, maxLength = MAX_GHOST_PARAM_LENGTH): EncodedGhost {
  if (!Number.isSafeInteger(maxLength) || maxLength < 64 || maxLength > MAX_GHOST_PARAM_LENGTH) {
    throw new RangeError('Nieprawidłowy limit długości kodu');
  }
  if (run.phase !== 'over' && run.phase !== 'arrived') throw new Error('Wyzwanie wymaga zakończonego przejazdu');
  assertUint32(run.seed);
  assertTicks(run.flapTicks, run.ticks);
  // Nie polegamy na modyfikowalnym obiekcie trasy przekazanym przez wywołującego.
  const route = makeRoute(run.route.home, run.route.from.id, run.route.to.id);
  if (route.totalKm !== run.route.totalKm) throw new Error('Niespójne dane trasy');
  if (run.mode !== 'cozy' && run.mode !== 'ranked') throw new Error('Nieznany tryb');

  const upper = Math.min(run.ticks, MAX_TICKS);
  const opts = { seed: run.seed, mode: run.mode, route };
  const make = (until: number): EncodedGhost => {
    const flaps = run.flapTicks.filter((t) => t < until);
    const played = replay(opts, flaps, until);
    if (played.ticks !== until || played.phase === 'ready') throw new Error('Nieodtwarzalny przejazd');
    const truncated = until < run.ticks;
    if (!truncated && (played.km !== run.km || played.phase !== run.phase)) {
      throw new Error('Wynik różni się od odtworzonego');
    }
    if (truncated && played.phase !== 'playing') throw new Error('Niepoprawny prefiks przejazdu');
    return { code: pack(run, until, played.km, flaps, truncated), ticks: until, km: played.km, truncated };
  };

  const whole = make(upper);
  if (whole.code.length <= maxLength) return whole;

  // Długość rośnie wraz z liczbą tapnięć; wyszukiwanie ogranicza koszty replay.
  let low = 1;
  let high = upper - 1;
  let best: EncodedGhost | null = null;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = make(mid);
    if (candidate.code.length <= maxLength) {
      best = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  if (!best) throw new Error('Nagłówek wyzwania przekracza limit URL');
  return best;
}

/** Błędne, uszkodzone i nieodtwarzalne kody zwracają `null` bez wyjątku. */
export function decodeGhost(code: string): GhostChallenge | null {
  if (typeof code !== 'string' || !code.length || code.length > MAX_GHOST_PARAM_LENGTH) return null;
  try {
    const bytes = unbase64url(code);
    if (bytes.length < 18) return null;
    const end = bytes.length - 4;
    if (crc32(bytes.subarray(0, end)) !== readU32(bytes, end)) return null;
    const cursor = { at: 0 };
    if (bytes[cursor.at++] !== VERSION) return null;
    const flags = bytes[cursor.at++];
    if (flags & ~(FLAG_COZY | FLAG_TRUNCATED)) return null;
    const home = HOME_COUNTRIES[bytes[cursor.at++]];
    if (!home) return null;
    const from = readCity(bytes, cursor, end);
    const to = readCity(bytes, cursor, end);
    if (cursor.at + 4 > end) return null;
    const seed = readU32(bytes, cursor.at);
    cursor.at += 4;
    const ticks = readVarint(bytes, cursor, end);
    const km = readVarint(bytes, cursor, end);
    const count = readVarint(bytes, cursor, end);
    if (!ticks || ticks > MAX_TICKS || count === 0 || count > ticks) return null;
    const flapTicks: number[] = [];
    let previous = 0;
    for (let i = 0; i < count; i++) {
      const delta = readVarint(bytes, cursor, end);
      if (i > 0 && !delta) return null;
      const tick = previous + delta;
      if (tick >= ticks) return null;
      flapTicks.push(tick);
      previous = tick;
    }
    if (cursor.at !== end || flapTicks[0] !== 0) return null;
    const route = makeRoute(home, from, to);
    if (km > route.totalKm) return null;
    const mode: Mode = flags & FLAG_COZY ? 'cozy' : 'ranked';
    const truncated = !!(flags & FLAG_TRUNCATED);
    const result = replay({ seed, mode, route }, flapTicks, ticks);
    if (result.ticks !== ticks || result.km !== km) return null;
    if (truncated ? result.phase !== 'playing' : (result.phase !== 'over' && result.phase !== 'arrived')) return null;
    return { version: VERSION, home, from, to, route, seed, mode, ticks, km, flapTicks, truncated };
  } catch {
    return null;
  }
}

/** `n=` zawiera tylko poprawny nickId; obcy tekst jest ignorowany. */
export function parseGhostParams(search: string | URLSearchParams): GhostChallenge | null {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const code = params.get('g');
  if (!code || params.getAll('g').length !== 1) return null;
  const challenge = decodeGhost(code);
  if (!challenge) return null;
  const nick = params.get('n');
  if (nick && params.getAll('n').length === 1 && isValidNickId(nick)) {
    return { ...challenge, nickId: nick };
  }
  return challenge;
}

/** Nakładka na istniejące `shareUrl()`; nie modyfikuje kodu udostępniania. */
export function withGhostChallenge(url: string, game: Game, nickId?: string): string {
  const link = new URL(url);
  link.searchParams.set('g', encodeGhost(game).code);
  link.searchParams.delete('n');
  if (nickId !== undefined) {
    if (!isValidNickId(nickId)) throw new Error('Nieprawidłowy nickId');
    link.searchParams.set('n', nickId);
  }
  return link.toString();
}
