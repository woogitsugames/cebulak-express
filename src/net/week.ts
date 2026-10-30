/** Daty ligi liczone są w strefie Warszawy, niezależnie od strefy urządzenia. */
const WARSAW = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
function warsawParts(date: Date): { year: number; month: number; day: number } {
  if (Number.isNaN(date.getTime())) throw new RangeError('Niepoprawna data');
  const parts = WARSAW.formatToParts(date);
  const value = (type: 'year' | 'month' | 'day') => Number(parts.find((p) => p.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}
export function warsawDateKey(date: Date = new Date()): string {
  const { year, month, day } = warsawParts(date);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
/** Tydzień ISO 8601: poniedziałek jako początek; rok tygodniowy może różnić się od kalendarzowego. */
export function warsawWeekKey(date: Date = new Date()): string {
  const { year, month, day } = warsawParts(date);
  const utcDay = new Date(Date.UTC(year, month - 1, day));
  const weekday = (utcDay.getUTCDay() + 6) % 7;
  utcDay.setUTCDate(utcDay.getUTCDate() + 3 - weekday);
  const isoYear = utcDay.getUTCFullYear();
  const firstThursday = new Date(Date.UTC(isoYear, 0, 4));
  firstThursday.setUTCDate(firstThursday.getUTCDate() + 3 - (firstThursday.getUTCDay() + 6) % 7);
  const week = 1 + Math.round((utcDay.getTime() - firstThursday.getTime()) / 604_800_000);
  return `${isoYear}-W${String(week).padStart(2, '0')}`;
}
