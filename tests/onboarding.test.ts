import { describe, expect, it, vi } from 'vitest';
import { PL_CITIES } from '../src/core/route';
import { searchOnboardingCities, shouldShowOnboarding, sortedOnboardingCities, ONBOARDING_STORAGE_KEY } from '../src/ui/onboarding';
import { platform } from '../src/platform';

describe('pierwsze uruchomienie', () => {
  it('pokazuje popularne miasta przed alfabetyczną resztą, bez mutacji PL_CITIES', () => {
    const before = PL_CITIES.map((city) => city.id);
    const sorted = sortedOnboardingCities();
    expect(sorted.slice(0, 4).map((city) => city.id)).toEqual(['warszawa', 'krakow', 'wroclaw', 'poznan']);
    expect(PL_CITIES.map((city) => city.id)).toEqual(before);
    expect(sorted).toHaveLength(PL_CITIES.length);
  });

  it('wyszukuje bez polskich znaków i bez wrażliwości na wielkość liter', () => {
    expect(searchOnboardingCities(' LODZ ')[0]?.id).toBe('lodz');
    expect(searchOnboardingCities('biala podlaska')[0]?.id).toBe('biala-podlaska');
    expect(searchOnboardingCities('KRAKÓW')[0]?.id).toBe('krakow');
    expect(searchOnboardingCities('xyz-ghost-city')).toEqual([]);
  });

  it('link z r=, tryb redakcyjny i test E2E pomijają onboarding', async () => {
    expect(await shouldShowOnboarding('?r=be-antwerpia')).toBe(false);
    expect(await shouldShowOnboarding('?r=')).toBe(false);
    expect(await shouldShowOnboarding('?redakcja=1')).toBe(false);
    expect(await shouldShowOnboarding('?test=1')).toBe(false);
  });

  it('korzysta z pamięci platformy zamiast z localStorage', async () => {
    const get = vi.spyOn(platform.storage, 'get').mockResolvedValueOnce(null).mockResolvedValueOnce('1');
    try {
      expect(await shouldShowOnboarding('')).toBe(true);
      expect(await shouldShowOnboarding('')).toBe(false);
      expect(get).toHaveBeenCalledWith(ONBOARDING_STORAGE_KEY);
    } finally { get.mockRestore(); }
  });
});
