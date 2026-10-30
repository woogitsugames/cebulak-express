import type { Waypoint } from './waypoints';
import { UI, fill, getLanguage, localized } from './i18n';
import { localizedCityName } from './lang/cities';

/**
 * Komunikat nad punktem trasy w bieżącym języku. Polski tekst siedzi w danych trasy,
 * tłumaczenia — w leniwych słownikach (WAYPOINTS), żeby nie powiększać głównego pakietu.
 */
export function waypointText(point: Pick<Waypoint, 'id' | 'name' | 'text' | 'textKey'>): string {
  if (getLanguage() === 'pl') return point.text;
  const key = point.textKey ?? point.id;
  if (key === 'start' || key === 'home') {
    const id = key === 'home' ? point.id.replace(/^dom-/, '') : point.id;
    return fill(key === 'home' ? UI.waypointHome : UI.waypointStart, { city: localizedCityName({ id, name: point.name }) });
  }
  return localized('WAYPOINTS')?.[key] ?? point.text;
}
