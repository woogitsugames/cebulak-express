import { describe, expect, it } from 'vitest';
import { FUNNY_PLACES } from '../src/content/funny-places';
import {
  BERLIN_ALTERNATIVE_EXITS,
  MUNICH_TO_JEDRZYCHOWICE,
  PL_TRANSIT,
  ROUTE_WAYPOINTS,
} from '../src/content/waypoints';

const allWaypointIds = new Set([
  ...Object.values(ROUTE_WAYPOINTS).flatMap((route) => route.map((point) => point.id)),
  ...Object.values(BERLIN_ALTERNATIVE_EXITS).flatMap((route) => route.map((point) => point.id)),
  ...MUNICH_TO_JEDRZYCHOWICE.map((point) => point.id),
  ...PL_TRANSIT.map((point) => point.id),
]);

// Sprawdzamy pełne słowa, żeby nie karać neutralnych fragmentów nazw geograficznych.
// Filtr obejmuje przekleństwa, treści dla dorosłych, marki, nazwę gry i napoje odurzające.
const forbiddenWords = [
  'kurwa', 'kurwy', 'chuj', 'chuja', 'pierdolić', 'pierdole', 'jebać',
  'jebany', 'dupa', 'gówno', 'srać', 'seks', 'porno',
  'cebulak', 'orlen', 'shell', 'lidl', 'biedronka', 'żabka',
  'tesco', 'aldi', 'ikea', 'fiat', 'bmw', 'audi', 'volkswagen',
  'alkohol', 'piwo', 'wino', 'wódka', 'whisky', 'whiskey', 'browar',
];
const blockedText = new RegExp(
  `(^|[^\\p{L}])(?:${forbiddenWords.join('|')})(?=$|[^\\p{L}])`,
  'iu',
);

describe('zabawne nazwy prawdziwych miejsc [70]', () => {
  it('ma co najmniej 50 nazw z różnych krajów', () => {
    expect(FUNNY_PLACES.length).toBeGreaterThanOrEqual(50);
    expect(new Set(FUNNY_PLACES.map((p) => p.country)).size).toBeGreaterThanOrEqual(8);
  });

  it('każde near wskazuje na istniejący waypoint, również odnogi i PL', () => {
    for (const place of FUNNY_PLACES) {
      expect(allWaypointIds.has(place.near), `${place.id}: nieznany waypoint ${place.near}`).toBe(true);
    }
  });

  it('każdy identyfikator jest unikalnym slugiem', () => {
    const ids = FUNNY_PLACES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it('każdy żart mieści się w 110 znakach i przechodzi filtr językowy', () => {
    for (const place of FUNNY_PLACES) {
      expect(place.joke.length, place.id).toBeLessThanOrEqual(110);
      expect(place.joke.trim().length, place.id).toBeGreaterThan(0);
      expect(blockedText.test([place.name, place.soundsLike, place.joke].join(' ')), place.id).toBe(false);
    }
  });

  it('pozycje, typy znaków i linki mają poprawny format', () => {
    for (const place of FUNNY_PLACES) {
      expect(place.offsetKm, place.id).toBeGreaterThanOrEqual(-40);
      expect(place.offsetKm, place.id).toBeLessThanOrEqual(40);
      expect(place.offsetKm, place.id).not.toBe(0);
      expect(['exit', 'district', 'town']).toContain(place.sign);
      expect(() => new URL(place.source), place.id).not.toThrow();
      expect(new URL(place.source).protocol, place.id).toBe('https:');
      expect(place.name.trim()).not.toBe('');
      expect(place.soundsLike.trim()).not.toBe('');
    }
  });

  it('znaki przy tym samym waypointcie nie nakładają się dokładnie', () => {
    const positions = FUNNY_PLACES.map((p) => `${p.near}:${p.offsetKm}`);
    expect(new Set(positions).size).toBe(positions.length);
  });
});
