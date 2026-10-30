import { UI } from '../content/i18n';
import {
  applyReducedMotion, motionQuery, normalizeSettings, shouldReduceMotion, type Settings,
} from '../meta/preferences';
import { PERFORMANCE_MODES, type PerformanceMode } from '../render/performance';
import './settings.css';

// Logika preferencji żyje w małym module ładowanym od startu; panel (ten plik) ładuje się leniwie.
export {
  DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY, applyReducedMotion, loadSettings, normalizeSettings,
  parseSettings, saveSettings, shouldReduceMotion, watchReducedMotion,
  type Settings, type SettingsStorage,
} from '../meta/preferences';

export interface SettingsOptions {
  get(): Settings;
  set(next: Settings): void;
  onClose(): void;
  /** Tryb oszczędny grafiki (zlecenie 63); bez tej opcji panel go nie pokazuje. */
  performance?: {
    get(): PerformanceMode;
    set(mode: PerformanceMode): void;
  };
}

const PERFORMANCE_LABEL: Record<PerformanceMode, () => string> = {
  auto: () => UI.settingsPerformanceAuto,
  always: () => UI.settingsPerformanceAlways,
  off: () => UI.settingsPerformanceOff,
};

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
  root.id = 'settings';
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

  function makeSwitch(name: string, label: string, checked: boolean): { row: HTMLLabelElement; input: HTMLInputElement } {
    const row = element('label', 'ce-settings__switch');
    const text = element('span', 'ce-settings__switch-text', label);
    const input = element('input');
    input.type = 'checkbox';
    input.name = name;
    input.setAttribute('role', 'switch');
    input.checked = checked;
    const track = element('span', 'ce-settings__track');
    track.setAttribute('aria-hidden', 'true');
    row.append(text, input, track);
    return { row, input };
  }

  const sound = makeSwitch('sound', UI.settingsSound, current.soundEffects);
  const music = makeSwitch('music', UI.settingsMusic, current.music);
  const vibrations = makeSwitch('vibrations', UI.settingsVibrations, current.vibrations);
  const motion = makeSwitch('motion', UI.settingsLessMotion, shouldReduceMotion(current, query?.matches ?? false));
  const volumeRow = element('div', 'ce-settings__volume');
  const volumeLabel = element('label', '', UI.settingsMusicVolume);
  volumeLabel.htmlFor = `${id}-volume`;
  const volumeOutput = element('output', '', '50%');
  volumeOutput.htmlFor = `${id}-volume`;
  const volume = element('input');
  volume.id = `${id}-volume`;
  volume.name = 'music-volume';
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

  // Tryb oszczędny: trzy stany, więc grupa radiowa zamiast przełącznika.
  const performance = opts.performance;
  const performanceInputs: HTMLInputElement[] = [];
  if (performance) {
    const group = element('fieldset', 'ce-settings__choice');
    const legend = element('legend', '', UI.settingsPerformance);
    const options = element('div', 'ce-settings__choice-options');
    for (const mode of PERFORMANCE_MODES) {
      const option = element('label', 'ce-settings__choice-option');
      const input = element('input');
      input.type = 'radio';
      input.name = `${id}-performance`;
      input.value = mode;
      input.checked = performance.get() === mode;
      input.addEventListener('change', () => { if (input.checked) performance.set(mode); });
      option.append(input, element('span', '', PERFORMANCE_LABEL[mode]()));
      options.append(option);
      performanceInputs.push(input);
    }
    const hint = element('p', 'ce-settings__hint', UI.settingsPerformanceHint);
    group.append(legend, options, hint);
    list.append(group);
  }

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
    if (performance) for (const input of performanceInputs) input.checked = input.value === performance.get();
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
