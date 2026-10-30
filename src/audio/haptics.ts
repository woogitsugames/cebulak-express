import type { GameEvent } from '../core/game';

export const HAPTIC_NAMES = ['flap', 'pickup', 'overload', 'hit', 'border', 'arrived', 'click'] as const;
export type HapticName = (typeof HAPTIC_NAMES)[number];

/** Adapter do wstrzyknięcia z src/platform/ po dodaniu natywnej obsługi Capacitor. */
export interface HapticsAdapter {
  vibrate(pattern: number | number[]): boolean | void | Promise<unknown>;
}

export interface HapticsPlayer {
  play(name: HapticName): void;
  setEnabled(enabled: boolean): void;
}

const PATTERNS: Readonly<Record<HapticName, number | readonly number[]>> = {
  flap: 12,
  pickup: 22,
  overload: [24, 35, 30],
  hit: [45, 35, 55],
  border: [16, 35, 22],
  arrived: [18, 55, 28, 55, 42],
  click: 8,
};

export function hapticForGameEvent(event: GameEvent): HapticName | null {
  switch (event.type) {
    case 'flap': return 'flap';
    case 'pickup': return 'pickup';
    case 'hit': return 'hit';
    case 'border': return 'border';
    case 'arrived': return 'arrived';
    // Po 'hit' następuje 'over'; nie wibruj dwa razy.
    case 'over':
    case 'waypoint':
    case 'powerup-start':
    case 'powerup-end': return null;
  }
}

/** Na webie Navigator.vibrate; bez niego (także w Node) bezpieczny no-op. */
export function createHaptics(adapter?: HapticsAdapter): HapticsPlayer {
  let enabled = true;

  function vibrate(pattern: number | number[]): void {
    try {
      const result = adapter
        ? adapter.vibrate(pattern)
        : typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
          ? navigator.vibrate(pattern)
          : undefined;
      // Natywny adapter może zwrócić odrzuconą obietnicę (np. wyłączone uprawnienia).
      if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
        Promise.resolve(result).catch(() => {});
      }
    } catch { /* Brak sprzętu/uprawnień nie wpływa na rozgrywkę. */ }
  }

  return {
    play(name) {
      if (!enabled || !(HAPTIC_NAMES as readonly string[]).includes(name)) return;
      const pattern = PATTERNS[name];
      vibrate(Array.isArray(pattern) ? [...pattern] : pattern as number);
    },
    setEnabled(value) {
      if (enabled && !value) vibrate(0); // Przerwij bieżącą wibrację.
      enabled = value;
    },
  };
}
