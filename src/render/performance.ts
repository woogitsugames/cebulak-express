/** Polityka wydajności renderera, bez zależności od rdzenia symulacji. */
export interface DevicePerformanceProfile {
  readonly pixelRatio: number;
  readonly memoryGiB: number | null;
  /** Skala rozdzielczości dekodowanych grafik (oryginał = 3). */
  readonly decodedScale: number;
  readonly maxCachedPixels: number;
  readonly maxConcurrent: number;
  readonly limitedPreload: boolean;
}

export function devicePerformanceProfile(
  pixelRatio = typeof window === 'undefined' ? 3 : window.devicePixelRatio || 1,
  memoryGiB: number | undefined = typeof navigator === 'undefined'
    ? undefined
    : (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
): DevicePerformanceProfile {
  const dpr = Number.isFinite(pixelRatio) && pixelRatio > 0 ? pixelRatio : 3;
  const ram = typeof memoryGiB === 'number' && Number.isFinite(memoryGiB) && memoryGiB > 0
    ? memoryGiB : null;
  const limitedPreload = ram !== null && ram <= 4;
  const decodedScale = Math.min(3, Math.max(1, dpr), ram !== null && ram <= 2 ? 1.5 : ram !== null && ram <= 4 ? 2 : 3);
  return {
    pixelRatio: dpr,
    memoryGiB: ram,
    decodedScale,
    maxCachedPixels: ram !== null && ram <= 2 ? 8_000_000 : limitedPreload ? 16_000_000 : 48_000_000,
    maxConcurrent: ram !== null && ram <= 2 ? 2 : 3,
    limitedPreload,
  };
}

export type PerformanceMode = 'auto' | 'always' | 'off';

export const PERFORMANCE_MODES: readonly PerformanceMode[] = ['auto', 'always', 'off'];
export const PERFORMANCE_STORAGE_KEY = 'ce.performanceMode';

/**
 * Odczyt synchroniczny: renderer tła potrzebuje trybu już w konstruktorze (przed pierwszą klatką).
 * localStorage działa także w WebView Capacitora; wybór zmienia ekran ustawień.
 */
export function storedPerformanceMode(): PerformanceMode {
  if (typeof localStorage === 'undefined') return 'auto';
  try {
    const value = localStorage.getItem(PERFORMANCE_STORAGE_KEY);
    return value === 'always' || value === 'off' ? value : 'auto';
  } catch {
    return 'auto';
  }
}

/** „auto” to brak wpisu — domyślne zachowanie wraca też po wyczyszczeniu pamięci. */
export function savePerformanceMode(mode: PerformanceMode): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (mode === 'auto') localStorage.removeItem(PERFORMANCE_STORAGE_KEY);
    else localStorage.setItem(PERFORMANCE_STORAGE_KEY, mode);
  } catch {
    /* brak pamięci — tryb działa do końca sesji */
  }
}

/**
 * Stan oszczędny po trzech kolejnych sekundach FPS < 45.
 * Powrót po dziesięciu sekundach FPS >= 55 zapobiega migotaniu jakości.
 * Gdy po powrocie urządzenie znów zwalnia (pełna jakość jest dla niego za ciężka),
 * zostaje w trybie oszczędnym do końca sesji — inaczej co ~13 s chmury i zimowe tła
 * znikałyby i wracały (cykliczne „mruganie” obrazu).
 * Stałe liczniki, bez tablic i alokacji w pętli animacji.
 */
export class AdaptiveQuality {
  private mode: PerformanceMode;
  private autoReduced = false;
  private recovered = false;
  private latched = false;
  private windowStart: number | null = null;
  private lastFrame: number | null = null;
  private frames = 0;
  private slowMs = 0;
  private fastMs = 0;
  private fpsValue: number | null = null;

  constructor(mode: PerformanceMode = 'auto') {
    this.mode = mode;
  }

  get preference(): PerformanceMode { return this.mode; }
  get reduced(): boolean {
    return this.mode === 'always' || (this.mode === 'auto' && this.autoReduced);
  }
  get fps(): number | null { return this.fpsValue; }

  setMode(mode: PerformanceMode): void {
    this.mode = mode;
    this.autoReduced = false;
    this.recovered = false;
    this.latched = false;
    this.resetSamples();
  }

  sample(nowMs: number, visible = true): void {
    if (this.mode !== 'auto' || !visible || !Number.isFinite(nowMs)) {
      this.resetSamples();
      return;
    }
    if (this.lastFrame !== null && (nowMs < this.lastFrame || nowMs - this.lastFrame > 2_000)) {
      this.resetSamples();
    }
    this.lastFrame = nowMs;
    if (this.windowStart === null) {
      this.windowStart = nowMs;
      return;
    }
    this.frames++;
    const elapsed = nowMs - this.windowStart;
    if (elapsed < 1_000) return;

    this.fpsValue = this.frames * 1_000 / elapsed;
    if (this.fpsValue < 45) {
      this.slowMs += elapsed;
      this.fastMs = 0;
      if (this.slowMs >= 3_000 && !this.autoReduced) {
        this.autoReduced = true;
        if (this.recovered) this.latched = true;
      }
    } else if (this.fpsValue >= 55) {
      this.fastMs += elapsed;
      this.slowMs = 0;
      if (this.fastMs >= 10_000 && this.autoReduced && !this.latched) {
        this.autoReduced = false;
        this.recovered = true;
      }
    } else {
      this.slowMs = 0;
      this.fastMs = 0;
    }
    this.frames = 0;
    this.windowStart = nowMs;
  }

  private resetSamples(): void {
    this.windowStart = null;
    this.lastFrame = null;
    this.frames = 0;
    this.slowMs = 0;
    this.fastMs = 0;
    this.fpsValue = null;
  }
}
