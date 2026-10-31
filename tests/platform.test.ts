import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  native: false,
  share: vi.fn(),
  writeFile: vi.fn(),
  getUri: vi.fn(),
  getPref: vi.fn(),
  setPref: vi.fn(),
  vibrate: vi.fn(),
  addListener: vi.fn(),
  exitApp: vi.fn(),
  hideBars: vi.fn(),
  hideSplash: vi.fn(),
}));

vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => mocks.native },
  SystemBars: { hide: mocks.hideBars, setStyle: vi.fn() },
  SystemBarsStyle: { Dark: 'DARK' },
}));
vi.mock('@capacitor/share', () => ({ Share: { share: mocks.share } }));
vi.mock('@capacitor/filesystem', () => ({
  Directory: { Cache: 'CACHE' },
  Filesystem: { writeFile: mocks.writeFile, getUri: mocks.getUri },
}));
vi.mock('@capacitor/haptics', () => ({ Haptics: { vibrate: mocks.vibrate } }));
vi.mock('@capacitor/preferences', () => ({
  Preferences: { get: mocks.getPref, set: mocks.setPref },
}));
vi.mock('@capacitor/status-bar', () => ({
  StatusBar: { setStyle: vi.fn(), setBackgroundColor: vi.fn() },
  Style: { Dark: 'DARK' },
}));
vi.mock('@capacitor/splash-screen', () => ({
  SplashScreen: { hide: mocks.hideSplash },
}));
vi.mock('@capacitor/app', () => ({
  App: { addListener: mocks.addListener, exitApp: mocks.exitApp },
}));

import { platform } from '../src/platform/index';

beforeEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
  mocks.native = false;
});

describe('platform.storage', () => {
  it('obsługuje wyjątki localStorage bez zatrzymania gry', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('blocked'); },
      setItem: () => { throw new Error('blocked'); },
    });
    expect(await platform.storage.get('setting')).toBeNull();
    await expect(platform.storage.set('setting', 'x')).resolves.toBeUndefined();
  });

  it('korzysta z Preferences na urządzeniu', async () => {
    mocks.native = true;
    mocks.getPref.mockResolvedValue({ value: 'BE' });
    expect(await platform.storage.get('home')).toBe('BE');
    await platform.storage.set('home', 'NL');
    expect(mocks.getPref).toHaveBeenCalledWith({ key: 'home' });
    expect(mocks.setPref).toHaveBeenCalledWith({ key: 'home', value: 'NL' });
  });
});

describe('platform.share', () => {
  it('udostępnia obraz w web gdy canShare akceptuje plik', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { canShare: () => true, share });
    const png = new Blob(['png'], { type: 'image/png' });
    expect(await platform.share(png, 'Wynik', 'https://example.org')).toBe('shared');
    expect(share.mock.calls[0][0].files).toHaveLength(1);
  });

  it('kopiuje tekst po nieudanym udostępnieniu', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      share: vi.fn().mockRejectedValue(new Error('not supported')),
      clipboard: { writeText },
    });
    expect(await platform.share(null, 'Kilometry', 'https://example.org')).toBe('copied');
    expect(writeText).toHaveBeenCalledWith('Kilometry\nhttps://example.org');
  });

  it('nie uruchamia fallbacku po anulowaniu arkusza', async () => {
    const writeText = vi.fn();
    vi.stubGlobal('navigator', {
      share: vi.fn().mockRejectedValue({ name: 'AbortError' }),
      clipboard: { writeText },
    });
    expect(await platform.share(null, 'Wynik')).toBe('cancelled');
    expect(writeText).not.toHaveBeenCalled();
  });

  it('udostępnia tekst bez pliku przez natywny plugin', async () => {
    mocks.native = true;
    mocks.share.mockResolvedValue({});
    expect(await platform.share(null, 'Wynik', 'https://example.org')).toBe('shared');
    expect(mocks.share).toHaveBeenCalledWith(expect.objectContaining({
      text: 'Wynik', url: 'https://example.org', files: undefined,
    }));
  });
});

describe('platform.onBack', () => {
  it('wychodzi z menu tylko jeśli handler zwróci false', async () => {
    mocks.native = true;
    const remove = vi.fn();
    let callback: () => void = () => {};
    mocks.addListener.mockImplementation((_event: string, cb: () => void) => {
      callback = cb;
      return Promise.resolve({ remove });
    });
    const unsub = platform.onBack(() => false);
    await Promise.resolve();
    callback();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mocks.exitApp).toHaveBeenCalledTimes(1);
    unsub();
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
