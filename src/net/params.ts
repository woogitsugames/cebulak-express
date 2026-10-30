import { HOME_COUNTRIES, START_CITIES, type HomeCountry } from '../core/route';

/** Wybór trasy z URL. Miasto docelowe pozostaje ustawieniem gracza. */
export interface RoutePrefill {
  home: HomeCountry;
  from: string;
}

function findHome(value: string | null): HomeCountry | undefined {
  if (value === null) return undefined;
  const normalized = value.toUpperCase();
  return HOME_COUNTRIES.find((home) => home === normalized);
}

function knownCity(home: HomeCountry, cityId: string): boolean {
  return START_CITIES[home].some((city) => city.id === cityId);
}

/**
 * Obsługuje `?kraj=be&z=antwerpia` (iframe) i `?r=be-antwerpia` (karta wyniku).
 * Poprawne `r` ma pierwszeństwo. Błędne parametry są ignorowane, bez wyjątków.
 * Funkcja jest czysta; koordynator wywołuje ją z `location.search` przed `fillMenu()`.
 */
export function parseGameParams(search: string | URLSearchParams): RoutePrefill | null {
  const query = typeof search === 'string' ? new URLSearchParams(search) : search;
  const routeCode = query.get('r');
  if (routeCode !== null) {
    const match = /^([a-z]{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/i.exec(routeCode);
    if (match) {
      const home = findHome(match[1]);
      const from = match[2].toLowerCase();
      if (home && knownCity(home, from)) return { home, from };
    }
  }

  const home = findHome(query.get('kraj'));
  if (!home) return null;
  const cityId = query.get('z')?.toLowerCase();
  const from = cityId && knownCity(home, cityId) ? cityId : START_CITIES[home][0].id;
  return { home, from };
}

/** Krótki kod do parametrów udostępnianego linku: `r=be-antwerpia`. */
export function shareRouteCode(home: HomeCountry, from: string): string {
  if (!knownCity(home, from)) throw new Error('Nieznane miasto startowe dla kraju');
  return `${home.toLowerCase()}-${from}`;
}
