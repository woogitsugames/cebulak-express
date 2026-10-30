import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

/** 'shared' oznacza zamknięcie systemowego okna, nie potwierdzenie publikacji. */
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'unavailable';
export type BackHandler = () => boolean | void | Promise<boolean | void>;
export type VibrationPattern = number | readonly number[];

const SHARE_DIR = 'ce-shares';
const BAR_COLOR = '#1b2733';

function getNavigator(): Navigator | undefined {
  return typeof navigator === 'undefined' ? undefined : navigator;
}

function getLocalStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function isCancelled(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const name = 'name' in error ? String(error.name) : '';
  const message = 'message' in error ? String(error.message) : '';
  return name === 'AbortError' || /(?:cancelled|canceled|user cancelled)/i.test(message);
}

function extension(file: Blob): string {
  const mime = file.type.split(';')[0].toLowerCase();
  const supported: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
  };
  if (supported[mime]) return supported[mime];
  const name = typeof File !== 'undefined' && file instanceof File ? file.name : '';
  return name.match(/\.([a-z0-9]{2,8})$/i)?.[1]?.toLowerCase() ?? 'bin';
}

function base64FromBlob(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Błąd odczytu pliku'));
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== 'string' || !dataUrl.includes(',')) {
        reject(new Error('Nieprawidłowe dane pliku'));
        return;
      }
      resolve(dataUrl.slice(dataUrl.indexOf(',') + 1));
    };
    reader.readAsDataURL(file);
  });
}

/** Tylko pliki w Cache: FileProvider Androida nie udostępnia innych ścieżek. */
async function saveShareFile(file: Blob): Promise<string> {
  const path = SHARE_DIR + '/share-' + Date.now() + '-' +
    Math.random().toString(36).slice(2) + '.' + extension(file);
  const data = await base64FromBlob(file);
  await Filesystem.writeFile({ path, data, directory: Directory.Cache, recursive: true });
  const { uri } = await Filesystem.getUri({ path, directory: Directory.Cache });
  return uri;
}

async function copyText(text: string, url: string): Promise<ShareResult> {
  const value = [text, url].filter(Boolean).join('\n');
  if (!value) return 'unavailable';
  try {
    const clipboard = getNavigator()?.clipboard;
    if (!clipboard?.writeText) return 'unavailable';
    await clipboard.writeText(value);
    return 'copied';
  } catch {
    return 'unavailable';
  }
}

async function shareWeb(file: Blob | null, text: string, url: string): Promise<ShareResult> {
  const nav = getNavigator();
  if (nav?.share) {
    const payload: ShareData = { text, url };
    if (file?.size && typeof File !== 'undefined') {
      const asFile = file instanceof File
        ? file
        : new File([file], 'wynik.' + extension(file), { type: file.type || 'application/octet-stream' });
      // Brak canShare oznacza udostępnianie tylko tekstu.
      try {
        if (nav.canShare?.({ files: [asFile] })) payload.files = [asFile];
      } catch {
        /* Przeglądarka nie obsługuje plików. */
      }
    }
    try {
      await nav.share(payload);
      return 'shared';
    } catch (error) {
      if (isCancelled(error)) return 'cancelled';
      if (payload.files) {
        try {
          await nav.share({ text, url });
          return 'shared';
        } catch (fallbackError) {
          if (isCancelled(fallbackError)) return 'cancelled';
        }
      }
    }
  }
  return copyText(text, url);
}

/** Tytuł systemowego okna udostępniania; język z <html lang> (ustawia go i18n — bez importu, by uniknąć cyklu). */
const SHARE_DIALOG_TITLE: Record<string, string> = {
  pl: 'Udostępnij wynik', en: 'Share your result', nl: 'Deel je resultaat', de: 'Ergebnis teilen', fr: 'Partager le résultat',
};
function shareDialogTitle(): string {
  const lang = typeof document === 'undefined' ? 'pl' : document.documentElement.lang;
  return SHARE_DIALOG_TITLE[lang] ?? SHARE_DIALOG_TITLE.pl;
}

async function shareNative(file: Blob | null, text: string, url: string): Promise<ShareResult> {
  const dialogTitle = shareDialogTitle();
  try {
    const files = file?.size ? [await saveShareFile(file)] : undefined;
    if (!files && !text && !url) return 'unavailable';
    await Share.share({
      title: 'Cebulak Express',
      text,
      url,
      files,
      dialogTitle,
    });
    return 'shared';
  } catch (error) {
    if (isCancelled(error)) return 'cancelled';
    // Gdy zapis pliku/odbiorca zawiedzie, gracz nadal może wysłać link.
    if (file && (text || url)) {
      try {
        await Share.share({ text, url, dialogTitle });
        return 'shared';
      } catch (fallbackError) {
        if (isCancelled(fallbackError)) return 'cancelled';
      }
    }
    return copyText(text, url);
  }
}

async function share(file: Blob | null = null, text = '', url = ''): Promise<ShareResult> {
  return Capacitor.isNativePlatform()
    ? shareNative(file, text, url)
    : shareWeb(file, text, url);
}

const storage = {
  async get(key: string): Promise<string | null> {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await Preferences.get({ key });
        return result.value;
      }
      return getLocalStorage()?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },

  async set(key: string, value: string): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await Preferences.set({ key, value });
      } else {
        getLocalStorage()?.setItem(key, value);
      }
    } catch {
      // Brak pamięci nie może zablokować rozgrywki.
    }
  },
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Na iOS czas pojedynczego impulsu jest kontrolowany przez system. */
async function vibrate(pattern: VibrationPattern): Promise<void> {
  const nav = getNavigator();
  if (!Capacitor.isNativePlatform()) {
    try {
      nav?.vibrate?.(pattern as number | number[]);
    } catch {
      /* Nie każda przeglądarka wspiera wibracje. */
    }
    return;
  }

  const steps = (typeof pattern === 'number' ? [pattern] : [...pattern]).slice(0, 12);
  let elapsed = 0;
  for (let i = 0; i < steps.length && elapsed < 4000; i++) {
    const ms = Math.max(0, Math.min(1000, Number.isFinite(steps[i]) ? Math.round(steps[i]) : 0, 4000 - elapsed));
    elapsed += ms;
    if (!ms) continue;
    if (i % 2 === 0) {
      try {
        await Haptics.vibrate({ duration: ms });
      } catch {
        try { nav?.vibrate?.(ms); } catch { /* Haptics wyłączone. */ }
      }
    }
    // Plugin może zakończyć wywołanie przed fizycznym końcem impulsu.
    await sleep(ms);
  }
}

/**
 * Na Androidzie false oznacza: wyjdź z aplikacji.
 * Dla aktywnej gry handler powinien wyświetlić pauzę/menu i zwrócić true.
 * Na web Escape wywołuje handler, ale nie zamyka przeglądarki.
 */
function onBack(handler: BackHandler): () => void {
  let active = true;
  let subscription: PluginListenerHandle | undefined;

  if (Capacitor.isNativePlatform()) {
    void App.addListener('backButton', () => {
      if (!active) return;
      void Promise.resolve()
        .then(() => handler())
        .then((handled) => {
          if (active && handled === false) return App.exitApp();
        })
        .catch(() => { /* Nie zamykaj aplikacji po błędzie menu. */ });
    }).then((listener) => {
      if (active) subscription = listener;
      else void listener.remove();
    }).catch(() => { /* Nieblokujący brak listenera. */ });
  } else if (typeof window !== 'undefined') {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      event.preventDefault();
      void Promise.resolve().then(() => handler()).catch(() => {});
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      active = false;
      window.removeEventListener('keydown', handleEscape);
    };
  }

  return () => {
    active = false;
    if (subscription) void subscription.remove();
  };
}

/** Wywołaj po uruchomieniu interfejsu; startowy fullscreen ustawia też config. */
async function initialize(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  await Promise.allSettled([
    SystemBars.setStyle({ style: SystemBarsStyle.Dark }),
    SystemBars.hide(),
    StatusBar.setStyle({ style: Style.Dark }),
    // Android 16/API 36 nie pozwala już ustawiać koloru status bara.
    StatusBar.setBackgroundColor({ color: BAR_COLOR }),
    SplashScreen.hide(),
  ]);
}

export const platform = {
  get isNative(): boolean { return Capacitor.isNativePlatform(); },
  share,
  vibrate,
  storage,
  onBack,
  initialize,
} as const;

export default platform;
