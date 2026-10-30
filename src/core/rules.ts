import type { GameOptions } from './game';
import type { Route } from './route';

/**
 * Wersja zasad gry = sezon rankingu. Podnieś ją przy KAŻDEJ zmianie rdzenia,
 * która zmienia wynik odtworzenia (fizyka, przeszkody, bonusy, trasy, KM_PER_PX).
 * Serwer odrzuca przejazdy z inną wersją, a Liga Polonii, ranking graczy
 * i wyzwanie dnia czytają tylko dokumenty bieżącego sezonu
 * (opis: docs/sezony-rankingu.md).
 *
 * Historia: 1 — pierwsze wydanie (8 krajów, bez wersji w dokumentach),
 * 2 — bonusy i bramka bagażowa (zlecenie 52), lot powrotny (51),
 * 15 krajów domowych i kraje tranzytowe (55).
 */
export const RULES_VERSION = 2;

export function isCurrentRulesVersion(value: unknown): value is typeof RULES_VERSION {
  return value === RULES_VERSION;
}

/**
 * Identyfikator dokumentu okresu (tydzień ISO lub dzień) w danym sezonie,
 * np. `r2_2026-W44` albo `r2_2026-10-30`. Dokumenty starszych sezonów zostają
 * w bazie, ale nikt ich już nie czyta ani nie zapisuje.
 */
export function seasonKey(period: string, version: number = RULES_VERSION): string {
  return 'r' + String(version) + '_' + period;
}

/**
 * Jedyne źródło opcji gry dla przejazdu rankingowego (także wyzwania dnia).
 * Klient, mock i serwer tworzą grę rankingową wyłącznie przez tę funkcję —
 * bez `baseWeight` (lot powrotny jest zawsze swobodny i poza rankingiem).
 */
export function rankedGameOptions(seed: number, route: Route): GameOptions {
  return { seed, mode: 'ranked', route };
}
