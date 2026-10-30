import type { ObstacleKind } from '../core/obstacles';
import type { CountryCode } from '../core/route';

/**
 * Wszystkie teksty gry w jednym miejscu — do przeglądu „testem babci i kolegi z pracy”.
 * Zasady: żartujemy z sytuacji, nie z ludzi; kraje nie są winowajcami;
 * słowo „cebulak” nie pada w komunikatach do gracza.
 */

export const COUNTRY_NAME: Record<CountryCode, string> = {
  BE: 'Belgia',
  NL: 'Holandia',
  DE: 'Niemcy',
  UK: 'Wielka Brytania',
  FR: 'Francja',
  CH: 'Szwajcaria',
  NO: 'Norwegia',
  DK: 'Dania',
  SE: 'Szwecja',
  PL: 'Polska',
};

/** „Witamy w …” przy przekroczeniu granicy. */
export const COUNTRY_LOCATIVE: Record<CountryCode, string> = {
  BE: 'w Belgii',
  NL: 'w Holandii',
  DE: 'w Niemczech',
  UK: 'w Wielkiej Brytanii',
  FR: 'we Francji',
  CH: 'w Szwajcarii',
  NO: 'w Norwegii',
  DK: 'w Danii',
  SE: 'w Szwecji',
  PL: 'w Polsce',
};

export const OBSTACLE_NAME: Record<ObstacleKind, string> = {
  viaduct: 'Niski wiadukt',
  sign: 'Wielki znak drogowy',
  crane: 'Dźwig budowlany',
  roadworks: 'Remont drogi',
  barrier: 'Szlaban',
  truck: 'Ciężarówka',
  ground: 'Asfalt',
};

/** Jeden żart na ekranie końca, losowany z puli dla przyczyny. */
export const FAIL_JOKES: Record<ObstacleKind, string[]> = {
  viaduct: ['Kombi było jednak trochę za wysokie.', 'Walizki na dachu miały inne zdanie.'],
  sign: ['Do Polski? Prosto. Podobno.', 'Znak był duży. Za duży.'],
  crane: ['Budowa trwa. Twoja podróż — już nie.', 'Dźwig nie ustąpił pierwszeństwa.'],
  roadworks: ['Remont. Objazd 40 km.', 'Pachołki zawsze wygrywają.'],
  barrier: ['Szlaban był szybszy.', 'Zapomniałeś biletu. I wysokości.'],
  truck: ['W trasie zawsze znajdzie się większy.', 'Ciężarówka też jechała do domu.'],
  ground: ['Za dużo słoików, za mało lotu.', 'Lądowanie awaryjne. Słoiki całe!'],
};

export const PICKUP_TOAST = {
  parcel: 'Paczka od mamy! +{km} km',
  jar: 'Słoik ogórków! +{km} km',
} as const;

export const UI = {
  tapToStart: 'Dotknij, aby wystartować',
  tapToFly: 'Dotknij, aby podskoczyć',
  remaining: 'do domu: {km} km',
  welcome: 'Witamy {where}!',
  over: 'Koniec trasy!',
  arrived: 'Jesteś w domu!',
  arrivedSub: 'Mama już nakrywa do stołu.',
  stoppedBy: 'Zatrzymał cię: {what}',
  distance: '{km} km',
  best: 'Rekord: {km} km',
  newBest: 'Nowy rekord!',
  again: 'Jeszcze raz',
  share: 'Udostępnij',
  modeRanked: 'Rankingowy',
  modeCozy: 'Łagodny',
  shareText: 'Przeleciałem {km} km z {from} w stronę {to}! Dasz radę dalej?',
  shareArrivedText: 'Doleciałem z {from} do {to} w {sec} s! A Ty?',
} as const;

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}
