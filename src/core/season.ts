/** Sezon wpływa wyłącznie na oprawę, nie na mechanikę ani ranking. */
export type Season = 'regular' | 'winter';

const WARSAW_DATE = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  calendar: 'gregory',
  numberingSystem: 'latn',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Zima trwa od 1 do 26 grudnia (włącznie), według zegara w Warszawie.
 * `search` pozwala przekazać `location.search` bez zależności rdzenia od DOM.
 * ?sezon=zima i ?sezon=lato mają pierwszeństwo przed kalendarzem.
 */
export function seasonAt(date: Date, search = ''): Season {
  if (!Number.isFinite(date.getTime())) throw new RangeError('Nieprawidłowa data sezonu');

  const forced = new URLSearchParams(search).get('sezon');
  if (forced === 'zima') return 'winter';
  if (forced === 'lato') return 'regular';

  const parts = WARSAW_DATE.formatToParts(date);
  let month = '';
  let day = '';
  for (const part of parts) {
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
  }
  if (!month || !day) throw new RangeError('Nie można ustalić daty w Warszawie');
  return month === '12' && day >= '01' && day <= '26' ? 'winter' : 'regular';
}
