import { replay } from '../../src/core/game';
import { makeRoute, type HomeCountry } from '../../src/core/route';

/** Limit symulacji chroni funkcję przed kosztownymi, wielogodzinnymi odtworzeniami. */
export const MAX_RUN_TICKS = 120 * 60 * 10;
export const RUN_EXPIRES_MS = 30 * 60 * 1000;
export const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

const warsawFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function warsawDay(ms: number): string {
  const parts = warsawFormatter.formatToParts(new Date(ms));
  const value = (key: string): string => parts.find((p) => p.type === key)?.value ?? '';
  return value('year') + '-' + value('month') + '-' + value('day');
}

/** Tydzień ISO jest liczony z lokalnej daty w Polsce, bez zależności od TZ serwera. */
export function warsawWeek(ms: number): string {
  const [year, month, day] = warsawDay(ms).split('-').map(Number);
  const thursday = new Date(Date.UTC(year, month - 1, day));
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const isoYear = thursday.getUTCFullYear();
  const firstDay = Date.UTC(isoYear, 0, 1);
  const week = Math.ceil(((thursday.getTime() - firstDay) / 86_400_000 + 1) / 7);
  return isoYear + '-W' + String(week).padStart(2, '0');
}

export function isCalendarDay(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export interface RunReplayData {
  seed: number;
  home: HomeCountry;
  from: string;
  to: string;
}

export function verifyReplay(
  run: RunReplayData,
  flapTicks: unknown,
  ticks: unknown,
  km: unknown,
): boolean {
  if (!Number.isSafeInteger(ticks) || (ticks as number) < 1 || (ticks as number) > MAX_RUN_TICKS) return false;
  if (!Number.isSafeInteger(km) || (km as number) < 0) return false;
  if (!Array.isArray(flapTicks) || flapTicks.length === 0 || flapTicks.length > Math.floor((ticks as number) / 6)) return false;
  if (flapTicks[0] !== 0) return false;
  let previous = -1;
  for (const tick of flapTicks) {
    if (!Number.isSafeInteger(tick) || tick <= previous || tick >= (ticks as number)) return false;
    previous = tick;
  }

  try {
    const route = makeRoute(run.home, run.from, run.to);
    if ((km as number) > route.totalKm) return false;
    const result = replay({ seed: run.seed, mode: 'ranked', route }, flapTicks as number[], ticks as number);
    // Sam limit replay() nie może być traktowany jak legalne zakończenie.
    return (result.phase === 'over' || result.phase === 'arrived')
      && result.km === km
      && result.ticks === ticks
      && result.flapTicks.length === flapTicks.length
      && result.flapTicks.every((tick, i) => tick === flapTicks[i]);
  } catch {
    return false;
  }
}
