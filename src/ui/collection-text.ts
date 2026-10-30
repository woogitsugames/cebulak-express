import type { MedalId } from '../meta/progress';

/** Do przeniesienia do src/content/pl.ts przez właściciela T01 przy integracji. */
export const COLLECTION_TEXT = {
  title: 'Album podróżnika',
  eyebrow: 'Widoki z drogi do domu',
  subtitle: 'Każde nowe miasto to pocztówka. Medale zdobywasz wyłącznie za grę.',
  close: 'Zamknij album',
  postcards: 'Pocztówki z miast',
  medals: 'Medale',
  unlocked: 'Odkryto',
  locked: 'Jeszcze nieodkryta',
  medalLocked: 'Do zdobycia',
  totalRuns: 'Przejazdy',
  totalKm: 'Łącznie',
  totalArrivals: 'Dojazdy',
  newPostcard: 'Nowa pocztówka: {city}!',
  newMedal: 'Medal: {name}!',
} as const;

export const MEDAL_TEXT: Record<MedalId, { name: string; description: string; symbol: string }> = {
  'first-run': { name: 'Pierwsza jazda', description: 'Zakończ pierwszy przejazd.', symbol: '✦' },
  'first-border': { name: 'Lot krajowy', description: 'Przekrocz pierwszą granicę.', symbol: '↗' },
  european: { name: 'Europejczyk', description: 'Odwiedź łącznie 3 różne kraje.', symbol: '✳' },
  'five-countries': { name: 'Obieżyświat', description: 'Odwiedź łącznie 5 różnych krajów.', symbol: '✺' },
  'first-arrival': { name: 'Ekspres do Mamy', description: 'Dotrzyj do domu w Polsce.', symbol: '⌂' },
  'five-arrivals': { name: 'Stały bywalec', description: 'Dotrzyj do domu 5 razy.', symbol: '★' },
  'winter-arrival': { name: 'Wigilijny As', description: 'Dotrzyj do domu w zimowym wyzwaniu.', symbol: '❄' },
  'ten-jars-run': { name: 'Słoikowy Mistrz', description: 'Zdobądź 10 słoików w jednym przejeździe.', symbol: '✹' },
  'fifty-jars': { name: 'Pełna spiżarnia', description: 'Zbierz łącznie 50 słoików.', symbol: '◆' },
  'ten-parcels': { name: 'Dach pełen paczek', description: 'Zbierz łącznie 10 paczek.', symbol: '▣' },
  'hundred-km': { name: 'Pierwsza setka', description: 'Przejedź łącznie 100 km.', symbol: '①' },
  'thousand-km': { name: 'Długodystansowiec', description: 'Przejedź łącznie 1000 km.', symbol: '➤' },
  'ten-thousand-km': { name: 'Król autostrad', description: 'Przejedź łącznie 10 000 km.', symbol: '♛' },
  'ten-postcards': { name: 'Album rośnie', description: 'Odkryj 10 różnych pocztówek.', symbol: '▤' },
  'thirty-postcards': { name: 'Kolekcjoner widoków', description: 'Odkryj 30 różnych pocztówek.', symbol: '▥' },
};
