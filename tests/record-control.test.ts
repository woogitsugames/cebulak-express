import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRecordControl } from '../src/ui/record';
import type { RecordedVideo, RecordingBackend } from '../src/ui/record-runtime';

type Listener = (...args: never[]) => void;

class FakeElement {
  className = '';
  children: FakeElement[] = [];
  attributes = new Map<string, string>();
  listeners = new Map<string, Set<Listener>>();
  hidden = false;
  disabled = false;
  removed = false;
  textContent = '';
  innerHTML = '';
  src = '';
  href = '';
  download = '';
  type = '';
  controls = false;
  playsInline = false;
  preload = '';
  pause = vi.fn();
  load = vi.fn();

  append(...children: FakeElement[]): void { this.children.push(...children); }
  appendChild(element: FakeElement): FakeElement { this.children.push(element); return element; }
  setAttribute(name: string, value: string): void { this.attributes.set(name, value); }
  getAttribute(name: string): string | null { return this.attributes.get(name) ?? null; }
  removeAttribute(name: string): void { this.attributes.delete(name); }
  addEventListener(name: string, listener: Listener): void {
    const set = this.listeners.get(name) ?? new Set<Listener>();
    set.add(listener);
    this.listeners.set(name, set);
  }
  removeEventListener(name: string, listener: Listener): void { this.listeners.get(name)?.delete(listener); }
  emit(name: string): void {
    for (const cb of this.listeners.get(name) ?? []) cb({ stopPropagation: () => {} } as never);
  }
  remove(): void { this.removed = true; }
}

class FakeDocument extends FakeElement {
  documentElement = new FakeElement();
  body = new FakeElement();
  createElement = (_tag: string): FakeElement => new FakeElement();
  hidden = false;
}

const fakeVideo: RecordedVideo = {
  blob: new Blob(['wideo'], { type: 'video/webm' }),
  mimeType: 'video/webm', filename: 'cebulak-express-rolka.webm', width: 1080,
  height: 1920, durationMs: 15_000,
};

function find(root: FakeElement, className: string): FakeElement {
  if (root.className.split(' ').includes(className)) return root;
  for (const child of root.children) {
    const found = findOrNull(child, className);
    if (found) return found;
  }
  throw new Error(`Nie znaleziono klasy ${className}`);
}

function findOrNull(root: FakeElement, className: string): FakeElement | null {
  if (root.className.split(' ').includes(className)) return root;
  for (const child of root.children) {
    const found = findOrNull(child, className);
    if (found) return found;
  }
  return null;
}

function buildBackend(): { backend: RecordingBackend; succeed: () => void; fail: () => void } {
  let resolve!: (video: RecordedVideo) => void;
  let reject!: (error: Error) => void;
  const backend: RecordingBackend = {
    start: vi.fn(() => new Promise<RecordedVideo>((res, rej) => { resolve = res; reject = rej; })),
    cancel: vi.fn(),
  };
  return { backend, succeed: () => resolve(fakeVideo), fail: () => reject(new Error('Błąd kodowania')) };
}

describe('createRecordControl', () => {
  let doc: FakeDocument;
  let canvas: FakeElement;

  beforeEach(() => {
    doc = new FakeDocument();
    canvas = new FakeElement();
    vi.stubGlobal('document', doc);
    vi.stubGlobal('window', { setInterval, clearInterval, setTimeout });
    vi.stubGlobal('location', { search: '', href: 'https://example.org/game' });
    vi.stubGlobal('performance', { now: () => 1000 });
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  });

  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  it('obsługuje nagranie, podgląd, ponowienie i zwalnia URL', async () => {
    const recording = buildBackend();
    const control = createRecordControl({
      canvas: canvas as unknown as HTMLCanvasElement,
      getAudio: () => undefined, overlay: () => ({ km: 150, route: 'Bruksela → Kraków' }),
      portalUrl: () => 'https://aktualnosci.be/',
      recorderFactory: () => recording.backend,
    });
    const root = control.element as unknown as FakeElement;
    expect(find(root, 'ce-record-start').hidden).toBe(false);
    control.start();
    expect(recording.backend.start).toHaveBeenCalledTimes(1);
    expect(find(root, 'ce-record-live').hidden).toBe(false);
    control.start();
    expect(recording.backend.start).toHaveBeenCalledTimes(1);
    recording.succeed();
    await Promise.resolve();
    expect(find(root, 'ce-record-preview').hidden).toBe(false);
    expect(find(root, 'ce-record-live').hidden).toBe(true);
    control.stop();
    expect(find(root, 'ce-record-preview').hidden).toBe(true);
    expect(find(root, 'ce-record-start').hidden).toBe(false);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');
    control.dispose();
    expect(root.removed).toBe(true);
  });

  it('visibilitychange przerywa nagrywanie, a późny wynik nie otwiera podglądu', async () => {
    const recording = buildBackend();
    const control = createRecordControl({
      canvas: canvas as unknown as HTMLCanvasElement,
      getAudio: () => undefined, overlay: () => ({ km: 0, route: '' }),
      portalUrl: () => undefined, recorderFactory: () => recording.backend,
    });
    const root = control.element as unknown as FakeElement;
    control.start();
    doc.hidden = true;
    doc.emit('visibilitychange');
    expect(recording.backend.cancel).toHaveBeenCalledTimes(1);
    expect(find(root, 'ce-record-start').hidden).toBe(false);
    recording.succeed();
    await Promise.resolve();
    expect(find(root, 'ce-record-preview').hidden).toBe(true);
    control.dispose();
    expect(doc.listeners.get('visibilitychange')?.size).toBe(0);
  });

  it('po niepowodzeniu umożliwia następne nagrywanie', async () => {
    const recording = buildBackend();
    const control = createRecordControl({
      canvas: canvas as unknown as HTMLCanvasElement,
      getAudio: () => undefined, overlay: () => ({ km: 0, route: '' }),
      portalUrl: () => undefined, recorderFactory: () => recording.backend,
    });
    const root = control.element as unknown as FakeElement;
    control.start();
    recording.fail();
    await Promise.resolve();
    expect(find(root, 'ce-record-start').hidden).toBe(false);
    control.dispose();
  });

  it('w trybie redakcyjnym ukrywa menu/HUD, nagrywa po pierwszym tapnięciu i sprząta po dispose', async () => {
    vi.stubGlobal('location', { search: '?redakcja=1', href: 'https://example.org/game' });
    const recording = buildBackend();
    const control = createRecordControl({
      canvas: canvas as unknown as HTMLCanvasElement,
      getAudio: () => undefined, overlay: () => ({ km: 200, route: 'Antwerpia → Łódź' }),
      portalUrl: () => 'https://aktualnosci.be/', recorderFactory: () => recording.backend,
    });
    const root = control.element as unknown as FakeElement;
    expect(doc.documentElement.getAttribute('data-ce-record-editorial')).toBe('1');
    expect(find(root, 'ce-record-start').hidden).toBe(true);
    canvas.emit('pointerdown');
    await Promise.resolve();
    expect(recording.backend.start).toHaveBeenCalledTimes(1);
    control.dispose();
    expect(recording.backend.cancel).toHaveBeenCalledTimes(1);
    expect(doc.documentElement.getAttribute('data-ce-record-editorial')).toBeNull();
    expect(canvas.listeners.get('pointerdown')?.size).toBe(0);
  });
});
