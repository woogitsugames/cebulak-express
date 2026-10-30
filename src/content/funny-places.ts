import type { CountryCode } from '../core/route';

/** Rodzaj zabawnej, lecz autentycznej nazwy widocznej na tablicy. */
export type FunnyPlaceKind = 'exit' | 'town' | 'district';

/**
 * Dane tablic. waypointId wskazuje punkt konkretnej trasy, a offsetKm
 * przesuwa znak wzgledem tego punktu (zamiast zmieniac rdzen gry).
 * Tymczasowe przyklady do zastapienia lista ze zlecenia 70.
 */
export interface FunnyPlace {
  id: string;
  name: string;
  country: CountryCode;
  waypointId: string;
  offsetKm: number;
  kind: FunnyPlaceKind;
  joke: string;
}

/** Piec rzeczywistych nazw; odleglosci sluza kompozycji tla, nie nawigacji. */
export const FUNNY_PLACES: readonly FunnyPlace[] = [
  {
    id: 'be-deurne', name: 'Deurne', country: 'BE', waypointId: 'antwerpia',
    offsetKm: 45, kind: 'district',
    joke: 'Deurne? Bagażnik pełny, a tu jeszcze dzielnica!',
  },
  {
    id: 'nl-dieren', name: 'Dieren', country: 'NL', waypointId: 'arnhem',
    offsetKm: 45, kind: 'town',
    joke: 'Dieren? Wszystkie zwierzaki już w kombi?',
  },
  {
    id: 'de-bad-oeynhausen', name: 'Bad Oeynhausen', country: 'DE', waypointId: 'bielefeld',
    offsetKm: 58, kind: 'exit',
    joke: 'Bad w nazwie, ale podróż całkiem dobra!',
  },
  {
    id: 'uk-barking', name: 'Barking', country: 'UK', waypointId: 'londyn',
    offsetKm: 61, kind: 'district',
    joke: 'Barking? Spokojnie, to tylko nazwa!',
  },
  {
    id: 'fr-bondy', name: 'Bondy', country: 'FR', waypointId: 'paryz',
    offsetKm: 72, kind: 'exit',
    joke: 'Bondy? Bagaże trzymają się mocno!',
  },
];
