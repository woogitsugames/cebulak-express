import { describe, expect, it } from 'vitest';
import { HOME_COUNTRIES } from '../src/core/route';
import { PORTALS, PORTAL_CAMPAIGN, portalLink } from '../src/content/portals';

describe('linki do portali', () => {
  it('każdy kraj gry ma etykietę i działający rodzaj linku', () => {
    expect(Object.keys(PORTALS).sort()).toEqual([...HOME_COUNTRIES].sort());
    for (const home of HOME_COUNTRIES) {
      expect(PORTALS[home].label).toBeTruthy();
      expect(PORTALS[home].news ?? PORTALS[home].guides).toMatch(/^https:\/\//);
    }
  });

  it('news ma pierwszeństwo przed poradnikami', () => {
    const url = new URL(portalLink('BE', 'result')!);
    expect(url.origin).toBe('https://aktualnosci.be');
    expect(url.searchParams.get('utm_source')).toBe('cebulak-express');
    expect(url.searchParams.get('utm_medium')).toBe('game');
    expect(url.searchParams.get('utm_campaign')).toBe(PORTAL_CAMPAIGN);
    expect(url.searchParams.get('utm_content')).toBe('result');
  });

  it('kraje bez portalu news kieruje do poradników', () => {
    expect(new URL(portalLink('CH', 'finish')!).host).toBe('popolsku.ch');
    expect(new URL(portalLink('NO', 'finish')!).host).toBe('popolsku.no');
  });

  it('pozwala świadomie wybrać poradniki', () => {
    expect(new URL(portalLink('NL', 'menu', 'guides')!).host).toBe('tuwiesz.nl');
  });

  it('nie tworzy fikcyjnego adresu Facebooka', () => {
    expect(portalLink('FR', 'result', 'facebook')).toBeUndefined();
  });

  it('odrzuca nieprawidłowy identyfikator miejsca', () => {
    for (const placement of ['', 'koniec gry', 'x&test=1', 'x'.repeat(65)]) {
      expect(() => portalLink('BE', placement)).toThrow();
    }
  });

  it('nieznany kraj w uruchomieniu z niezaufaną wartością nie prowadzi do obcej domeny', () => {
    expect(portalLink('XX' as never, 'result')).toBeUndefined();
  });
});
