import type { HomeCountry } from '../core/route';

/** Sezon kampanii UTM. Zmienić przy starcie kolejnego sezonu. */
export const PORTAL_CAMPAIGN = 'na-wigilie-2026';

export interface PortalInfo {
  label: string;
  news?: string;
  guides?: string;
  facebook?: string;
}

/** Wyłącznie adresy przypisane do krajów obsługiwanych przez rdzeń gry.
 * Niepotwierdzonych kont Facebook nie dodajemy na podstawie samego sluga.
 * Brak publicznej weryfikacji (IE/AT/FI/LU) oznacza samą etykietę, bez URL.
 * Źródła i status weryfikacji: docs/portale.md i docs/trasy-nowe-kraje.md.
 */
export const PORTALS: Readonly<Record<HomeCountry, Readonly<PortalInfo>>> = {
  BE: { label: 'Belgia', news: 'https://aktualnosci.be/', guides: 'https://popolsku.be/' },
  NL: { label: 'Holandia', news: 'https://aktualnosci.nl/', guides: 'https://tuwiesz.nl/' },
  DE: { label: 'Niemcy', news: 'https://aktualnosci.de/', guides: 'https://tuwiesz.de/' },
  UK: { label: 'Wielka Brytania', news: 'https://aktualnosci.uk/', guides: 'https://popolsku.uk/' },
  FR: { label: 'Francja', news: 'https://aktualnosci.fr/', guides: 'https://popolsku.fr/' },
  CH: { label: 'Szwajcaria', guides: 'https://popolsku.ch/' },
  NO: { label: 'Norwegia', guides: 'https://popolsku.no/' },
  DK: { label: 'Dania', guides: 'https://popolsku.dk/' },
  IE: { label: 'Irlandia' },
  ES: { label: 'Hiszpania', guides: 'https://popolsku.es/' },
  IT: { label: 'Włochy', guides: 'https://popolsku.it/' },
  AT: { label: 'Austria' },
  SE: { label: 'Szwecja', guides: 'https://popolsku.se/' },
  FI: { label: 'Finlandia' },
  LU: { label: 'Luksemburg' },
};

export type PortalChannel = 'news' | 'guides' | 'facebook';

/** Link do portalu kraju. Domyślnie newsy, a przy ich braku poradniki.
 * Brak zweryfikowanego kanału (np. Facebook) oznacza `undefined`, nie zgadywany URL.
 * `placement` jest identyfikatorem miejsca w UI, np. `result`, `finish`, `menu`.
 */
export function portalLink(home: HomeCountry, placement: string, channel: PortalChannel = 'news'): string | undefined {
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(placement)) {
    throw new Error('Niepoprawny identyfikator miejsca linku');
  }
  const portal = PORTALS[home];
  if (!portal) return undefined;
  const target = channel === 'facebook' ? portal.facebook : channel === 'guides' ? (portal.guides ?? portal.news) : (portal.news ?? portal.guides);
  if (!target) return undefined;

  const url = new URL(target);
  url.searchParams.set('utm_source', 'cebulak-express');
  url.searchParams.set('utm_medium', 'game');
  url.searchParams.set('utm_campaign', PORTAL_CAMPAIGN);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
