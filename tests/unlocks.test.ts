import { describe, expect, it, vi } from 'vitest';
import { HERO_SKINS, normalizeHeroSkin } from '../src/render/sprites';
import {
  applyRunKm, EMPTY_UNLOCK_STATE, loadUnlockState, nextUnlock, parseUnlockState,
  saveUnlockState, UNLOCKABLE_CARS, UNLOCK_STATE_STORAGE_KEY, unlockAnnouncement,
  unlockHint, unlockedSkins, type UnlockStorage,
} from '../src/meta/unlocks';

describe('auta odblokowywane za sumę kilometrów', () => {
  it('ma siedem unikalnych aut z progami 500–40 000 km', () => {
    expect(UNLOCKABLE_CARS.map((car) => car.id)).toEqual([
      'mala-japonka', 'kompakt-szwagra', 'dieselek-dziadka', 'pradziak-z-oslo',
      'furgonetka-pl', 'kamper-wakacje', 'kombi-prezesa',
    ]);
    expect(UNLOCKABLE_CARS.map((car) => car.requiredKm)).toEqual([
      500, 1_500, 3_000, 6_000, 10_000, 20_000, 40_000,
    ]);
    expect(new Set(HERO_SKINS).size).toBe(HERO_SKINS.length);
    expect(HERO_SKINS).toHaveLength(11);
  });

  it('zostawia cztery startery i odblokowuje auta dokładnie na każdym progu', () => {
    const starters = ['default', 'pan-cebulek', 'pani-cebulka', 'bus-kurierski'];
    expect(unlockedSkins(0)).toEqual(starters);
    for (const [index, car] of UNLOCKABLE_CARS.entries()) {
      expect(unlockedSkins(car.requiredKm - 1)).not.toContain(car.id);
      expect(unlockedSkins(car.requiredKm)).toEqual([
        ...starters, ...UNLOCKABLE_CARS.slice(0, index + 1).map((item) => item.id),
      ]);
      expect(normalizeHeroSkin(car.id, car.requiredKm - 1)).toBe('default');
      expect(normalizeHeroSkin(car.id, car.requiredKm)).toBe(car.id);
    }
    expect(normalizeHeroSkin('pan-cebulek')).toBe('pan-cebulek');
    expect(normalizeHeroSkin('mala-japonka')).toBe('default');
    expect(normalizeHeroSkin('nie-ma-takiego')).toBe('default');
    expect(unlockedSkins(40_000)).toEqual([...HERO_SKINS]);
  });

  it('pokazuje najbliższy próg i poprawną polską podpowiedź', () => {
    expect(nextUnlock(0)).toEqual({ id: 'mala-japonka', missingKm: 500 });
    expect(nextUnlock(500)).toEqual({ id: 'kompakt-szwagra', missingKm: 1_000 });
    expect(nextUnlock(1_180)).toEqual({ id: 'kompakt-szwagra', missingKm: 320 });
    expect(unlockHint('kompakt-szwagra', 1_180))
      .toBe('Odblokujesz po 1 500 km łącznie (brakuje 320 km)');
    expect(nextUnlock(40_000)).toBeNull();
    expect(nextUnlock(50_000)).toBeNull();
  });

  it('sumuje zakończone przejazdy niezależnie od trybu i nie powiela odblokowań', () => {
    const first = applyRunKm(EMPTY_UNLOCK_STATE, 460);
    expect(first.state).toEqual({ totalKm: 460 });
    expect(first.newlyUnlocked).toEqual([]);
    expect(EMPTY_UNLOCK_STATE.totalKm).toBe(0);
    // Do applyRunKm trafia Game.km z każdego trybu, także łagodnego.
    const cozy = applyRunKm(first.state, 80);
    expect(cozy.state.totalKm).toBe(540);
    expect(cozy.newlyUnlocked).toEqual(['mala-japonka']);
    const ranked = applyRunKm(cozy.state, 4_600);
    expect(ranked.state.totalKm).toBe(5_140);
    expect(ranked.newlyUnlocked).toEqual(['kompakt-szwagra', 'dieselek-dziadka']);
    expect(applyRunKm(ranked.state, 0).newlyUnlocked).toEqual([]);
    expect(unlockAnnouncement('kompakt-szwagra'))
      .toBe('Nowe auto w garażu: Kompakt od szwagra!');
  });

  it('odrzuca ujemne, ułamkowe i nieprawidłowe kilometry bez nadpisania stanu', () => {
    expect(applyRunKm({ totalKm: 600 }, -200).state.totalKm).toBe(600);
    expect(applyRunKm({ totalKm: 600 }, Number.NaN).state.totalKm).toBe(600);
    expect(applyRunKm({ totalKm: 600 }, Number.POSITIVE_INFINITY).state.totalKm).toBe(600);
    expect(applyRunKm({ totalKm: 600 }, 12.9).state.totalKm).toBe(612);
    expect(applyRunKm({ totalKm: Number.NaN }, 2).state.totalKm).toBe(2);
    expect(applyRunKm({ totalKm: Number.MAX_SAFE_INTEGER - 3 }, 10).state.totalKm)
      .toBe(Number.MAX_SAFE_INTEGER);
    expect(unlockedSkins(-1)).toHaveLength(4);
  });
});

describe('trwały licznik kilometrów (WWW / Capacitor)', () => {
  it('zapisuje i odczytuje przez dostarczony platform.storage', async () => {
    const values = new Map<string, string>();
    const storage: UnlockStorage = {
      get: vi.fn(async (key) => values.get(key) ?? null),
      set: vi.fn(async (key, value) => { values.set(key, value); }),
    };
    await saveUnlockState(storage, { totalKm: 1_180 });
    expect(values.get(UNLOCK_STATE_STORAGE_KEY)).toBe('{"totalKm":1180}');
    expect(await loadUnlockState(storage)).toEqual({ totalKm: 1_180 });
  });

  it('po uszkodzonych danych wraca do zera', () => {
    expect(parseUnlockState(null)).toEqual({ totalKm: 0 });
    expect(parseUnlockState('invalid')).toEqual({ totalKm: 0 });
    expect(parseUnlockState('[]')).toEqual({ totalKm: 0 });
    expect(parseUnlockState('{"totalKm":"1500"}')).toEqual({ totalKm: 0 });
    expect(parseUnlockState('{"totalKm":-1}')).toEqual({ totalKm: 0 });
    expect(parseUnlockState('{"totalKm":1540.8}')).toEqual({ totalKm: 1540 });
  });

  it('przy zablokowanej pamięci nie wyłącza gry', async () => {
    const blocked: UnlockStorage = {
      get: async () => { throw new Error('blocked'); },
      set: async () => { throw new Error('blocked'); },
    };
    expect(await loadUnlockState(blocked)).toEqual({ totalKm: 0 });
    await expect(saveUnlockState(blocked, { totalKm: 800 })).resolves.toBeUndefined();
  });
});
