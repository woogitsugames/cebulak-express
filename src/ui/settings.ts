import { UI } from '../content/pl';
import './settings.css';

/** Preferencje dźwięku i dostępności niezależne od ustawień trasy. */
export interface Settings {
  soundEffects: boolean;
  music: boolean;
  musicVolume: number;
  vibrations: boolean;
  /** null = preferencja systemowa; boolean = świadomy wybór gracza. */
  reducedMotion: boolean | null;
}

export interface SettingsStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export interface SettingsOptions {
  get(): Settings;
  set(next: Settings): void;
  onClose(): void;
}

export const SETTINGS_STORAGE_KEY = 'ce.preferences.v1';
export const DEFAULT_SETTINGS: Readonly<Settings> = Object.freeze({
  soundEffects: true,
  music: true,
  musicVolume: 0.5,
  vibrations: true,
  reducedMotion: null,
});

/** Odrzucamy błędne dane z pamięci, zachowując pozostałe poprawne pola. */
export function normalizeSettings(value: unknown): Settings {
  const data: Record<string, unknown> = value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const volume = data.musicVolume;
  return {
    soundEffects: typeof data.soundEffects === 'boolean' ? data.soundEffects : DEFAULT_SETTINGS.soundEffects,
    music: typeof data.music === 'boolean' ? data.music : DEFAULT_SETTINGS.music,
    musicVolume: typeof volume === 'number' && Number.isFinite(volume)
      ? Math.max(0, Math.min(1, volume))
      : DEFAULT_SETTINGS.musicVolume,
    vibrations: typeof data.vibrations === 'boolean' ? data.vibrations : DEFAULT_SETTINGS.vibrations,
    reducedMotion: typeof data.reducedMotion === 'boolean' ? data.reducedMotion : null,
  };
}

export function parseSettings(raw: string | null): Settings {
  if (!raw) return normalizeSettings(null);
  try { return normalizeSettings(JSON.parse(raw)); }
  catch { return normalizeSettings(null); }
}

/** Działa także przy zablokowanym localStorage lub niedostępnych Preferences. */
export async function loadSettings(storage: SettingsStorage): Promise<Settings> {
  try { return parseSettings(await storage.get(SETTINGS_STORAGE_KEY)); }
  catch { return normalizeSettings(null); }
}

export async function saveSettings(storage: SettingsStorage, settings: Settings): Promise<void> {
  try { await storage.set(SETTINGS_STORAGE_KEY, JSON.stringify(normalizeSettings(settings))); }
  catch { /* Brak możliwości zapisu nie przerywa gry. */ }
}

export function shouldReduceMotion(settings: Settings, systemPreference: boolean): boolean {
  return settings.reducedMotion ?? systemPreference;
}

function motionQuery(): MediaQueryList | null {
  try { return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)') : null; }
  catch { return null; }
}

/** Atrybut umożliwia nadpisanie media query także przy włączonym ruchu. */
export function applyReducedMotion(settings: Settings, target: HTMLElement, systemPreference = motionQuery()?.matches ?? false): boolean {
  const enabled = shouldReduceMotion(settings, systemPreference);
  target.dataset.ceReducedMotion = String(enabled);
  return enabled;
}

/** Wywołaj raz po starcie gry. Reaguje na zmiany ustawień systemowych. */
export function watchReducedMotion(get: () => Settings, target: HTMLElement): () => void {
  const query = motionQuery();
  const update = (): void => { applyReducedMotion(get(), target, query?.matches ?? false); };
  update();
  query?.addEventListener?.('change', update);
  return () => { query?.removeEventListener?.('change', update); };
}

let nextId = 0;

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** Samodzielny panel; cleanup usuwa wszystkie nasłuchy i przywraca fokus. */
export function mountSettings(container: HTMLElement, opts: SettingsOptions): () => void {
  const id = `ce-settings-${++nextId}`;
  let current = normalizeSettings(opts.get());
  let disposed = false;
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const query = motionQuery();

  const root = element('section', 'ce-settings');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', `${id}-title`);
  root.tabIndex = -1;
  // Gra ma globalny handler pointerdown do skoku; nie przepuszczamy gestu przez panel.
  root.addEventListener('pointerdown', (event) => event.stopPropagation());
  const panel = element('div', 'ce-settings__panel');
  const header = element('header', 'ce-settings__header');
  const title = element('h2', '', UI.settingsTitle);
  title.id = `${id}-title`;
  const closeButton = element('button', 'ce-settings__close', '×');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', UI.close);
  header.append(title, closeButton);
  panel.append(header);

  function makeSwitch(label: string, checked: boolean): { row: HTMLLabelElement; input: HTMLInputElement } {
    const row = element('label', 'ce-settings__switch');
    const name = element('span', 'ce-settings__switch-text', label);
    const input = element('input');
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');
    input.checked = checked;
    const track = element('span', 'ce-settings__track');
    track.setAttribute('aria-hidden', 'true');
    row.append(name, input, track);
    return { row, input };
  }

  const sound = makeSwitch(UI.settingsSound, current.soundEffects);
  const music = makeSwitch(UI.settingsMusic, current.music);
  const vibrations = makeSwitch(UI.settingsVibrations, current.vibrations);
  const motion = makeSwitch(UI.settingsLessMotion, shouldReduceMotion(current, query?.matches ?? false));
  const volumeRow = element('div', 'ce-settings__volume');
  const volumeLabel = element('label', '', UI.settingsMusicVolume);
  volumeLabel.htmlFor = `${id}-volume`;
  const volumeOutput = element('output', '', '50%');
  volumeOutput.htmlFor = `${id}-volume`;
  const volume = element('input');
  volume.id = `${id}-volume`;
  volume.type = 'range';
  volume.min = '0';
  volume.max = '100';
  volume.step = '5';
  volume.setAttribute('aria-label', UI.settingsMusicVolume);
  volumeRow.append(volumeLabel, volumeOutput, volume);

  const motionSection = element('div', 'ce-settings__motion');
  const motionHint = element('p', 'ce-settings__hint', UI.settingsMotionHint);
  motionHint.id = `${id}-motion-hint`;
  motion.input.setAttribute('aria-describedby', motionHint.id);
  const motionReset = element('button', 'ce-settings__reset', UI.settingsMotionSystem);
  motionReset.type = 'button';
  motionSection.append(motion.row, motionHint, motionReset);

  const list = element('div', 'ce-settings__options');
  list.append(sound.row, music.row, volumeRow, vibrations.row, motionSection);
  const links = element('nav', 'ce-settings__links');
  links.setAttribute('aria-label', UI.settingsLinks);
  const privacy = element('a', '', UI.settingsPrivacy);
  privacy.href = 'https://github.com/woogitsugames/cebulak-express/blob/main/docs/prawo/polityka-prywatnosci.md';
  const licenses = element('a', '', UI.settingsLicenses);
  licenses.href = './licencje.html';
  for (const link of [privacy, licenses]) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    links.append(link);
  }
  panel.append(list, links);
  const done = element('button', 'ce-settings__done', UI.close);
  done.type = 'button';
  panel.append(done);
  root.append(panel);
  container.append(root);

  function sync(): void {
    sound.input.checked = current.soundEffects;
    music.input.checked = current.music;
    vibrations.input.checked = current.vibrations;
    motion.input.checked = shouldReduceMotion(current, query?.matches ?? false);
    volume.value = String(Math.round(current.musicVolume * 100));
    volume.disabled = !current.music;
    volumeOutput.textContent = `${Math.round(current.musicVolume * 100)}%`;
    motionReset.hidden = current.reducedMotion === null;
    applyReducedMotion(current, document.documentElement, query?.matches ?? false);
  }

  function commit(change: Partial<Settings>): void {
    current = normalizeSettings({ ...opts.get(), ...change });
    opts.set({ ...current });
    sync();
  }

  sound.input.addEventListener('change', () => commit({ soundEffects: sound.input.checked }));
  music.input.addEventListener('change', () => commit({ music: music.input.checked }));
  volume.addEventListener('input', () => commit({ musicVolume: Number(volume.value) / 100 }));
  vibrations.input.addEventListener('change', () => commit({ vibrations: vibrations.input.checked }));
  motion.input.addEventListener('change', () => commit({ reducedMotion: motion.input.checked }));
  motionReset.addEventListener('click', () => commit({ reducedMotion: null }));
  const onMediaChange = (): void => {
    if (current.reducedMotion === null) sync();
  };
  query?.addEventListener?.('change', onMediaChange);

  function dispose(): void {
    if (disposed) return;
    disposed = true;
    query?.removeEventListener?.('change', onMediaChange);
    root.removeEventListener('keydown', onKeyDown);
    root.remove();
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  }
  function close(): void { if (!disposed) { dispose(); opts.onClose(); } }
  function onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    }
    // Zatrzymaj klawisze gry, jednocześnie nie blokując obsługi suwaka i przełączników.
    if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'ArrowDown') event.stopPropagation();
    if (event.key !== 'Tab') return;
    const focusable = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]):not([hidden]), input:not([disabled]), a[href]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  root.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', close);
  done.addEventListener('click', close);
  sync();
  sound.input.focus({ preventScroll: true });
  return dispose;
}
