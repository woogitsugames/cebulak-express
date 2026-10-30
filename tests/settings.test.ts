import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  applyReducedMotion, DEFAULT_SETTINGS, loadSettings, normalizeSettings, parseSettings,
  saveSettings, SETTINGS_STORAGE_KEY, shouldReduceMotion, watchReducedMotion,
  type Settings, type SettingsStorage,
} from '../src/ui/settings';

afterEach(() => vi.unstubAllGlobals());

const configured: Settings = {
  soundEffects: false, music: false, musicVolume: 0.75, vibrations: false, reducedMotion: false,
};

function inMemoryStorage(): SettingsStorage & { items: Map<string, string> } {
  const items = new Map<string, string>();
  return {
    items,
    get: async (key) => items.get(key) ?? null,
    set: async (key, value) => { items.set(key, value); },
  };
}

describe('trwałe ustawienia gracza', () => {
  it('ustawia wartości domyślne i nie wycieka mutacja między odczytami', () => {
    const a = parseSettings(null);
    const b = parseSettings(null);
    expect(a).toEqual(DEFAULT_SETTINGS);
    a.musicVolume = 0;
    expect(b.musicVolume).toBe(0.5);
  });

  it('zapisuje i odczytuje wszystkie wartości przez platform.storage', async () => {
    const storage = inMemoryStorage();
    await saveSettings(storage, configured);
    expect(storage.items.has(SETTINGS_STORAGE_KEY)).toBe(true);
    expect(await loadSettings(storage)).toEqual(configured);
  });

  it('ignoruje uszkodzony JSON, błędne typy i wartości pozazakresowe', () => {
    expect(parseSettings('{')).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings('false')).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings('[]')).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings(JSON.stringify({ soundEffects: 'no', music: false, musicVolume: 99, vibrations: null, reducedMotion: true })))
      .toEqual({ ...DEFAULT_SETTINGS, music: false, musicVolume: 1, reducedMotion: true });
    expect(normalizeSettings({ musicVolume: -5 }).musicVolume).toBe(0);
    expect(normalizeSettings({ musicVolume: Number.POSITIVE_INFINITY }).musicVolume).toBe(0.5);
  });

  it('nie wyrzuca błędu przy odmowie dostępu do pamięci', async () => {
    const blocked: SettingsStorage = {
      get: async () => { throw new Error('not allowed'); },
      set: async () => { throw new Error('not allowed'); },
    };
    expect(await loadSettings(blocked)).toEqual(DEFAULT_SETTINGS);
    await expect(saveSettings(blocked, configured)).resolves.toBeUndefined();
  });
});

describe('ograniczenie animacji', () => {
  it('domyślnie podąża za systemem, ale oba jawne wybory go nadpisują', () => {
    expect(shouldReduceMotion({ ...DEFAULT_SETTINGS }, true)).toBe(true);
    expect(shouldReduceMotion({ ...DEFAULT_SETTINGS }, false)).toBe(false);
    expect(shouldReduceMotion({ ...DEFAULT_SETTINGS, reducedMotion: false }, true)).toBe(false);
    expect(shouldReduceMotion({ ...DEFAULT_SETTINGS, reducedMotion: true }, false)).toBe(true);
  });

  it('ustawia atrybut CSS także dla jawnie wyłączonego reduced motion', () => {
    const target = { dataset: {} as DOMStringMap } as HTMLElement;
    expect(applyReducedMotion({ ...DEFAULT_SETTINGS, reducedMotion: false }, target, true)).toBe(false);
    expect(target.dataset.ceReducedMotion).toBe('false');
    expect(applyReducedMotion({ ...DEFAULT_SETTINGS, reducedMotion: true }, target, false)).toBe(true);
    expect(target.dataset.ceReducedMotion).toBe('true');
  });

  it('reaguje na zmianę systemową i pozwala odłączyć nasłuch', () => {
    let listener: (() => void) | undefined;
    let systemReduced = false;
    const add = vi.fn((_event: string, callback: () => void) => { listener = callback; });
    const remove = vi.fn();
    const media = { get matches() { return systemReduced; }, addEventListener: add, removeEventListener: remove };
    vi.stubGlobal('window', { matchMedia: () => media });
    const target = { dataset: {} as DOMStringMap } as HTMLElement;
    let settings: Settings = { ...DEFAULT_SETTINGS };
    const dispose = watchReducedMotion(() => settings, target);
    expect(target.dataset.ceReducedMotion).toBe('false');
    systemReduced = true;
    listener?.();
    expect(target.dataset.ceReducedMotion).toBe('true');
    settings = { ...settings, reducedMotion: false };
    listener?.();
    expect(target.dataset.ceReducedMotion).toBe('false');
    dispose();
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
