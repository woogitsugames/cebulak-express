import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS, applyPreferences, loadSettings, saveSettings, type SettingsStorage } from '../src/meta/preferences';
import * as panel from '../src/ui/settings';
import { PERFORMANCE_STORAGE_KEY, savePerformanceMode, storedPerformanceMode } from '../src/render/performance';
import { LANGUAGES } from '../src/content/i18n';

afterEach(() => vi.unstubAllGlobals());

function targets() {
  return {
    sfx: { setMuted: vi.fn() },
    music: { setEnabled: vi.fn(), setVolume: vi.fn() },
    haptics: { setEnabled: vi.fn() },
  };
}

function memoryLocalStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() { return items.size; },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (index) => [...items.keys()][index] ?? null,
    removeItem: (key) => { items.delete(key); },
    setItem: (key, value) => { items.set(key, String(value)); },
  };
}

describe('preferencje w grze', () => {
  it('wyciszenie, muzyka i wibracje trafiają do odtwarzaczy', () => {
    const t = targets();
    applyPreferences({ ...DEFAULT_SETTINGS, soundEffects: false, music: false, musicVolume: 0.2, vibrations: false }, t);
    expect(t.sfx.setMuted).toHaveBeenCalledWith(true);
    expect(t.music.setEnabled).toHaveBeenCalledWith(false);
    expect(t.music.setVolume).toHaveBeenCalledWith(0.2);
    expect(t.haptics.setEnabled).toHaveBeenCalledWith(false);
  });

  it('domyślnie wszystko włączone; brak muzyki (przed pierwszym gestem) nie przeszkadza', () => {
    const t = targets();
    applyPreferences({ ...DEFAULT_SETTINGS }, { sfx: t.sfx, haptics: t.haptics, music: undefined });
    expect(t.sfx.setMuted).toHaveBeenCalledWith(false);
    expect(t.haptics.setEnabled).toHaveBeenCalledWith(true);
  });

  it('wyciszenie przeżywa ponowne wczytanie z pamięci', async () => {
    const items = new Map<string, string>();
    const storage: SettingsStorage = {
      get: async (key) => items.get(key) ?? null,
      set: async (key, value) => { items.set(key, value); },
    };
    await saveSettings(storage, { ...DEFAULT_SETTINGS, soundEffects: false });
    const t = targets();
    applyPreferences(await loadSettings(storage), t);
    expect(t.sfx.setMuted).toHaveBeenCalledWith(true);
  });

  it('panel ustawień eksportuje to samo API co moduł preferencji (zgodność wsteczna)', () => {
    expect(panel.SETTINGS_STORAGE_KEY).toBe('ce.preferences.v1');
    expect(panel.normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(typeof panel.mountSettings).toBe('function');
  });
});

describe('tryb oszczędny grafiki', () => {
  it('zapisuje wybór i wraca do „auto” bez wpisu w pamięci', () => {
    const storage = memoryLocalStorage();
    vi.stubGlobal('localStorage', storage);
    expect(storedPerformanceMode()).toBe('auto');
    savePerformanceMode('always');
    expect(storedPerformanceMode()).toBe('always');
    savePerformanceMode('off');
    expect(storedPerformanceMode()).toBe('off');
    savePerformanceMode('auto');
    expect(storage.getItem(PERFORMANCE_STORAGE_KEY)).toBeNull();
    expect(storedPerformanceMode()).toBe('auto');
  });

  it('nie wywraca gry przy zablokowanej pamięci', () => {
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); }, removeItem: () => { throw new Error('blocked'); } });
    expect(() => savePerformanceMode('always')).not.toThrow();
    expect(storedPerformanceMode()).toBe('auto');
  });
});

describe('teksty ekranu ustawień', () => {
  it('każdy język ma podpisy trybu oszczędnego i przycisku ustawień', async () => {
    const keys = ['settingsPerformance', 'settingsPerformanceAuto', 'settingsPerformanceAlways',
      'settingsPerformanceOff', 'settingsPerformanceHint', 'settingsOpen'] as const;
    const pl = await import('../src/content/lang/pl');
    const all = [pl.UI, ...await Promise.all(LANGUAGES.filter((l) => l !== 'pl').map(async (l) =>
      (await import(`../src/content/lang/${l}.ts`)).default.UI as Record<string, string>))];
    for (const ui of all) {
      for (const key of keys) {
        expect(typeof ui[key]).toBe('string');
        expect(ui[key].length).toBeGreaterThan(0);
        expect(ui[key].toLowerCase()).not.toContain('cebulak');
      }
    }
  });
});
