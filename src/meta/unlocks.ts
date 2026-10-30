import type { HeroSkinId } from '../render/sprites';

/** Samochody zdobywane za sumę kilometrów ze wszystkich trybów gry. */
export const UNLOCKABLE_CARS = [
  { id: 'mala-japonka', name: 'Mała Japonka', requiredKm: 500 },
  { id: 'kompakt-szwagra', name: 'Kompakt od szwagra', requiredKm: 1_500 },
  { id: 'dieselek-dziadka', name: 'Dieselek po dziadku', requiredKm: 3_000 },
  { id: 'pradziak-z-oslo', name: 'Prądziak z Oslo', requiredKm: 6_000 },
  { id: 'furgonetka-pl', name: 'Furgonetka „PL–BE–NL”', requiredKm: 10_000 },
  { id: 'kamper-wakacje', name: 'Kamper na wakacje', requiredKm: 20_000 },
  { id: 'kombi-prezesa', name: 'Kombi prezesa', requiredKm: 40_000 },
] as const satisfies readonly { id: HeroSkinId; name: string; requiredKm: number }[];

export type UnlockableSkinId = (typeof UNLOCKABLE_CARS)[number]['id'];

const STARTER_SKINS = [
  'default', 'pan-cebulek', 'pani-cebulka', 'bus-kurierski',
] as const satisfies readonly HeroSkinId[];

export interface UnlockState {
  readonly totalKm: number;
}

export interface UnlockStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export const UNLOCK_STATE_STORAGE_KEY = 'ce.unlocks.v1';
export const EMPTY_UNLOCK_STATE: UnlockState = { totalKm: 0 };

function safeKm(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value)))
    : 0;
}

/** Czysta funkcja: startery są dostępne nawet przy zerowym postępie. */
export function unlockedSkins(totalKm: number): HeroSkinId[] {
  const km = safeKm(totalKm);
  return [
    ...STARTER_SKINS,
    ...UNLOCKABLE_CARS.filter((car) => km >= car.requiredKm).map((car) => car.id),
  ];
}

/** Najbliższy niezdobyty samochód, w kolejności rosnących progów. */
export function nextUnlock(totalKm: number): { id: UnlockableSkinId; missingKm: number } | null {
  const km = safeKm(totalKm);
  const car = UNLOCKABLE_CARS.find((item) => km < item.requiredKm);
  return car ? { id: car.id, missingKm: car.requiredKm - km } : null;
}

/**
 * Zapisuje wynik pojedynczego, ZAKOŃCZONEGO przejazdu.
 * Wynik pochodzi z Game.km; nie rozróżniamy trybu zwykłego, dziennego ani łagodnego.
 * Nie mutujemy stanu i zwracamy wszystkie progi przekroczone w tym przejeździe.
 */
export function applyRunKm(state: UnlockState, km: number): {
  state: UnlockState;
  newlyUnlocked: UnlockableSkinId[];
} {
  const before = safeKm(state.totalKm);
  const after = Math.min(Number.MAX_SAFE_INTEGER, before + safeKm(km));
  return {
    state: { ...state, totalKm: after },
    newlyUnlocked: UNLOCKABLE_CARS
      .filter((car) => before < car.requiredKm && after >= car.requiredKm)
      .map((car) => car.id),
  };
}

export function unlockAnnouncement(id: UnlockableSkinId): string {
  const car = UNLOCKABLE_CARS.find((item) => item.id === id);
  return car ? `Nowe auto w garażu: ${car.name}!` : '';
}

/** Format używany w podpowiedziach zablokowanych aut w garażu. */
export function unlockHint(id: UnlockableSkinId, totalKm: number): string {
  const car = UNLOCKABLE_CARS.find((item) => item.id === id);
  if (!car) return '';
  const format = (value: number): string => String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ');
  return `Odblokujesz po ${format(car.requiredKm)} km łącznie (brakuje ${format(Math.max(0, car.requiredKm - safeKm(totalKm)))} km)`;
}

/** Uszkodzony lub starszy zapis nie wyłącza gry. */
export function parseUnlockState(raw: string | null): UnlockState {
  if (!raw) return { ...EMPTY_UNLOCK_STATE };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed) ||
        !('totalKm' in parsed)) return { ...EMPTY_UNLOCK_STATE };
    return { totalKm: safeKm(parsed.totalKm) };
  } catch {
    return { ...EMPTY_UNLOCK_STATE };
  }
}

/** Adapter platform.storage obsługuje zarówno WWW, jak i Capacitor Preferences. */
export async function loadUnlockState(storage: UnlockStorage): Promise<UnlockState> {
  try {
    return parseUnlockState(await storage.get(UNLOCK_STATE_STORAGE_KEY));
  } catch {
    return { ...EMPTY_UNLOCK_STATE };
  }
}

export async function saveUnlockState(storage: UnlockStorage, state: UnlockState): Promise<void> {
  try {
    await storage.set(UNLOCK_STATE_STORAGE_KEY, JSON.stringify({ totalKm: safeKm(state.totalKm) }));
  } catch {
    // Odrzucenie zapisu nie może przerwać przejazdu.
  }
}
