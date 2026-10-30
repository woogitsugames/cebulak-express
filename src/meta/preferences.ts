/**
 * Preferencje dźwięku i dostępności (zlecenie 49), bez DOM panelu i bez CSS.
 * Mały moduł ładowany od startu: wyciszenie i wibracje muszą działać,
 * zanim gracz pierwszy raz otworzy ekran ustawień (ten ładuje się leniwie).
 */
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

export function motionQuery(): MediaQueryList | null {
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

/** Dźwięk, muzyka i wibracje w grze — to, co main.ts musi przestawić po każdej zmianie. */
export interface PreferenceTargets {
  sfx?: { setMuted(muted: boolean): void };
  music?: { setEnabled(enabled: boolean): void; setVolume(volume: number): void };
  haptics?: { setEnabled(enabled: boolean): void };
}

/** Przenosi preferencje na odtwarzacze; brakujące (np. muzyka przed pierwszym gestem) pomija. */
export function applyPreferences(settings: Settings, targets: PreferenceTargets): void {
  targets.sfx?.setMuted(!settings.soundEffects);
  targets.music?.setVolume(settings.musicVolume);
  targets.music?.setEnabled(settings.music);
  targets.haptics?.setEnabled(settings.vibrations);
}
