import { cardShareText, renderCard, type CardData, type CardFormat } from './card';
import { GAME_ORIGIN } from './config';

/**
 * Kontrakt adaptera z src/platform/share.ts (zlecenie 24).
 * Adapter zapisuje plik natywnie i otwiera systemowe udostępnianie.
 */
export interface NativeShare {
  share(file: Blob, text: string, url: string): Promise<void>;
}

export interface ShareOptions {
  format?: CardFormat;
  /** PNG przygotowany przed kliknięciem, by Web Share zachował aktywację użytkownika. */
  image?: Blob;
  /** Opcjonalny adapter podany bezpośrednio, np. w testach. */
  nativeShare?: NativeShare;
  /** Wyłączenie podglądu przy testach lub niestandardowym interfejsie. */
  showPreview?: boolean;
  /** Inny link niż `shareUrl(data)`, np. wyzwanie z duchem (`g=`). */
  url?: string;
  /** Inny tekst niż `cardShareText(data)`. */
  text?: string;
}

export type ShareMethod = 'native' | 'web-file' | 'web-link' | 'clipboard' | 'preview' | 'cancelled';

export interface ShareOutcome {
  method: ShareMethod;
  text: string;
  url: string;
  image: Blob;
}

let nativeShareAdapter: NativeShare | null = null;

/** Rejestracja na etapie integracji z modułem platform (zlecenie 24). */
export function setNativeShareAdapter(adapter: NativeShare | null): void {
  nativeShareAdapter = adapter;
}

/** Link zawsze prowadzi do gry, nie do bieżącego portalu z iframe. */
export function shareUrl(data: Pick<CardData, 'home' | 'from'>): string {
  const url = new URL('/', GAME_ORIGIN);
  url.searchParams.set('r', data.home + '-' + data.from.id);
  return url.toString();
}

function isNative(): boolean {
  if (typeof window === 'undefined') return false;
  const bridge = (window as Window & {
    Capacitor?: { isNativePlatform?: () => boolean };
  }).Capacitor;
  try {
    return bridge?.isNativePlatform?.() === true;
  } catch {
    return false;
  }
}

function isCancellation(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as { name?: string; code?: string; message?: string };
  return e.name === 'AbortError' || e.code === 'CANCELLED' ||
    (typeof e.message === 'string' && /cancelled|canceled|anulowan/i.test(e.message));
}

/** Fallback również dla Safari i osadzenia bez uprawnień do schowka. */
async function copyText(value: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Kolejna próba korzysta z selekcji w dokumencie.
    }
  }
  if (typeof document === 'undefined' || !document.body || typeof document.execCommand !== 'function') return false;
  const field = document.createElement('textarea');
  field.value = value;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
  document.body.append(field);
  field.focus();
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

let closePreview: (() => void) | null = null;

/** Podgląd obrazu z przyciskiem pobrania i instrukcją dla iOS. */
export function showSavePreview(image: Blob, text: string, url: string): void {
  if (typeof document === 'undefined' || !document.body || typeof URL.createObjectURL !== 'function') return;
  closePreview?.();
  const imageUrl = URL.createObjectURL(image);
  const backdrop = document.createElement('div');
  backdrop.id = 'ce-result-preview';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Zapisz kartę wyniku');
  backdrop.style.cssText =
    'position:fixed;inset:0;z-index:2147483647;background:rgba(4,21,25,.92);' +
    'display:flex;align-items:center;justify-content:center;overflow:auto;padding:18px;';
  const box = document.createElement('div');
  box.style.cssText =
    'width:min(100%,520px);max-height:96vh;overflow:auto;box-sizing:border-box;' +
    'border-radius:22px;background:#fdf8e9;color:#173d37;padding:18px;' +
    'font:16px/1.4 system-ui,sans-serif;text-align:center;';
  const heading = document.createElement('h2');
  heading.textContent = 'Zapisz kartę wyniku';
  heading.style.cssText = 'margin:0 0 8px;font-size:22px;';
  const hint = document.createElement('p');
  hint.textContent = 'Zapisz PNG lub przytrzymaj obraz na iPhonie, aby zachować go w Zdjęciach.';
  hint.style.cssText = 'margin:0 0 12px;';
  const preview = document.createElement('img');
  preview.src = imageUrl;
  preview.alt = 'Karta z wynikiem przejazdu';
  preview.style.cssText = 'max-width:100%;max-height:55vh;object-fit:contain;border-radius:12px;';
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:16px 0;';
  const download = document.createElement('a');
  download.href = imageUrl;
  download.download = 'wynik-kierunek-polska.png';
  download.textContent = 'Pobierz PNG';
  download.style.cssText =
    'display:inline-block;padding:12px 18px;border-radius:12px;background:#15644e;' +
    'color:white;font-weight:700;text-decoration:none;';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = 'Kopiuj tekst i link';
  copy.style.cssText = 'padding:12px 18px;border-radius:12px;border:0;background:#f7d76f;color:#193e37;font-weight:700;';
  copy.addEventListener('click', () => {
    void copyText(text + '\n' + url).then((ok) => {
      copy.textContent = ok ? 'Skopiowano' : 'Wybierz tekst poniżej';
    });
  });
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Zamknij';
  close.style.cssText = 'padding:12px 18px;border-radius:12px;border:1px solid #57776e;background:white;color:#193e37;';
  const source = document.createElement('textarea');
  source.readOnly = true;
  source.value = text + '\n' + url;
  source.setAttribute('aria-label', 'Tekst i link do skopiowania');
  source.style.cssText = 'box-sizing:border-box;width:100%;height:72px;border-radius:9px;padding:8px;';
  source.addEventListener('focus', () => source.select());
  const cleanup = (): void => {
    backdrop.remove();
    URL.revokeObjectURL(imageUrl);
    window.removeEventListener('keydown', onKey);
    if (closePreview === cleanup) closePreview = null;
  };
  const onKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') cleanup();
  };
  close.addEventListener('click', cleanup);
  controls.append(download, copy, close);
  box.append(heading, hint, preview, controls, source);
  backdrop.append(box);
  document.body.append(backdrop);
  window.addEventListener('keydown', onKey);
  closePreview = cleanup;
  close.focus();
}

/**
 * Kolejność: adapter natywny, plik przez Web Share, tekst+URL przez Web Share,
 * schowek i podgląd obrazu. Nie ponawiamy po anulowaniu przez gracza.
 *
 * Wywoływać bezpośrednio z kliknięcia. Na iOS warto wcześniej wyrenderować PNG
 * i przekazać go w options.image, bo renderowanie może wygasić user activation.
 */
export async function shareResult(data: CardData, options: ShareOptions = {}): Promise<ShareOutcome> {
  const text = options.text ?? cardShareText(data);
  const url = options.url ?? shareUrl(data);
  const image = options.image ?? await renderCard(data, options.format ?? 'story');
  const outcome = (method: ShareMethod): ShareOutcome => ({ method, text, url, image });

  const adapter = options.nativeShare ?? nativeShareAdapter;
  if (isNative() && adapter) {
    try {
      await adapter.share(image, text, url);
      return outcome('native');
    } catch (error) {
      if (isCancellation(error)) return outcome('cancelled');
      // Niedostępny adapter nie blokuje pozostałych ścieżek.
    }
  }

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    if (typeof navigator.canShare === 'function' && typeof File !== 'undefined') {
      const file = new File([image], 'wynik-kierunek-polska.png', { type: 'image/png' });
      let canShareFile = false;
      try {
        canShareFile = navigator.canShare({ files: [file] });
      } catch {
        // Przeglądarki różnie traktują nieobsługiwane pola Web Share API.
      }
      if (canShareFile) {
        try {
          await navigator.share({ files: [file], title: 'Kierunek Polska', text, url });
          return outcome('web-file');
        } catch (error) {
          if (isCancellation(error)) return outcome('cancelled');
        }
      }
    }
    try {
      await navigator.share({ title: 'Kierunek Polska', text, url });
      return outcome('web-link');
    } catch (error) {
      if (isCancellation(error)) return outcome('cancelled');
    }
  }

  const copied = await copyText(text + '\n' + url);
  if (options.showPreview !== false) showSavePreview(image, text, url);
  return outcome(copied ? 'clipboard' : 'preview');
}
