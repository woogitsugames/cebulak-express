import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeRoute } from '../src/core/route';
import type { CardData } from '../src/share/card';
import { setNativeShareAdapter, shareResult, shareUrl } from '../src/share/share';

const route = makeRoute('BE', 'antwerpia', 'rzeszow');
const data: CardData = {
  home: 'BE',
  from: route.from,
  to: route.to,
  km: 684,
  totalKm: route.totalKm,
  arrived: false,
  seconds: 47,
  causeText: 'Walizki miały inne plany.',
};

const image = new Blob(['png'], { type: 'image/png' });

beforeEach(() => {
  setNativeShareAdapter(null);
  vi.stubGlobal('window', {});
  vi.stubGlobal('navigator', {});
  // Ujednolicenie w Node i w przeglądarce, by testować canShare({files}).
  vi.stubGlobal('File', class extends Blob {
    readonly name: string;
    readonly lastModified = 0;
    constructor(parts: BlobPart[], name: string, options?: FilePropertyBag) {
      super(parts, options);
      this.name = name;
    }
  });
});
afterEach(() => {
  setNativeShareAdapter(null);
  vi.unstubAllGlobals();
});

describe('adres udostępnienia', () => {
  it('łączy kraj i identyfikator miasta w parametrze r', () => {
    expect(shareUrl(data)).toBe('https://gra.example.invalid/?r=BE-antwerpia');
    const other = makeRoute('NL', 'rotterdam', 'warszawa');
    expect(shareUrl({ home: 'NL', from: other.from })).toBe(
      'https://gra.example.invalid/?r=NL-rotterdam',
    );
  });
});

describe('wybór metody udostępnienia', () => {
  it('na Capacitorze najpierw przekazuje Blob do adaptera natywnego', async () => {
    vi.stubGlobal('window', { Capacitor: { isNativePlatform: () => true } });
    const nativeShare = { share: vi.fn().mockResolvedValue(undefined) };
    const web = vi.fn();
    vi.stubGlobal('navigator', { share: web });
    const result = await shareResult(data, { image, nativeShare, showPreview: false });
    expect(result.method).toBe('native');
    expect(nativeShare.share).toHaveBeenCalledWith(image, result.text, result.url);
    expect(web).not.toHaveBeenCalled();
  });

  it('obsługuje adapter zarejestrowany przez koordynatora', async () => {
    vi.stubGlobal('window', { Capacitor: { isNativePlatform: () => true } });
    const adapter = { share: vi.fn().mockResolvedValue(undefined) };
    setNativeShareAdapter(adapter);
    expect((await shareResult(data, { image, showPreview: false })).method).toBe('native');
    expect(adapter.share).toHaveBeenCalledOnce();
  });

  it('na web preferuje natywne udostępnienie pliku PNG', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const canShare = vi.fn().mockReturnValue(true);
    vi.stubGlobal('navigator', { share, canShare });
    const result = await shareResult(data, { image, showPreview: false });
    expect(result.method).toBe('web-file');
    expect(canShare).toHaveBeenCalledOnce();
    const payload = share.mock.calls[0][0] as ShareData;
    expect(payload.files).toHaveLength(1);
    expect(payload.files![0].name).toBe('wynik-kierunek-polska.png');
    expect(payload.text).toContain('z Antwerpii');
    expect(payload.url).toBe(result.url);
  });

  it('gdy plik nie jest obsługiwany, udostępnia sam tekst i link', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share, canShare: vi.fn().mockReturnValue(false) });
    expect((await shareResult(data, { image, showPreview: false })).method).toBe('web-link');
    expect(share).toHaveBeenCalledWith({
      title: 'Kierunek Polska',
      text: expect.stringContaining('684 km'),
      url: 'https://gra.example.invalid/?r=BE-antwerpia',
    });
  });

  it('po błędzie plikowego Web Share próbuje udostępnić link', async () => {
    const share = vi.fn().mockRejectedValueOnce(new Error('Unsupported')).mockResolvedValueOnce(undefined);
    vi.stubGlobal('navigator', { share, canShare: () => true });
    expect((await shareResult(data, { image, showPreview: false })).method).toBe('web-link');
    expect(share).toHaveBeenCalledTimes(2);
    expect(share.mock.calls[1][0].files).toBeUndefined();
  });

  it('błąd canShare nie blokuje wysłania linku', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share, canShare: () => { throw Error('security'); } });
    expect((await shareResult(data, { image, showPreview: false })).method).toBe('web-link');
    expect(share).toHaveBeenCalledOnce();
  });

  it('po anulowaniu nie wymusza kolejnych dialogów ani schowka', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('Anulowano', 'AbortError'));
    const writeText = vi.fn();
    vi.stubGlobal('navigator', { share, canShare: () => true, clipboard: { writeText } });
    expect((await shareResult(data, { image, showPreview: false })).method).toBe('cancelled');
    expect(share).toHaveBeenCalledOnce();
    expect(writeText).not.toHaveBeenCalled();
  });

  it('bez Web Share kopiuje tekst i link, zachowując obraz do zapisania', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const result = await shareResult(data, { image, showPreview: false });
    expect(result.method).toBe('clipboard');
    expect(result.image).toBe(image);
    expect(writeText).toHaveBeenCalledWith(result.text + '\n' + result.url);
  });

  it('gdy schowek odmawia dostępu, pozostawia podgląd do pobrania', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    const result = await shareResult(data, { image, showPreview: false });
    expect(result.method).toBe('preview');
    expect(result.image).toBe(image);
  });
});
