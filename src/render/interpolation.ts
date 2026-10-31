/**
 * Interpolacja renderu między dwoma stanami symulacji (stały krok TICK).
 *
 * Symulacja liczy pełne ticki 1/120 s, a ekran odświeża się 60/90/120/144 razy na sekundę.
 * Bez interpolacji liczba ticków na klatkę skacze (90 Hz: 1-1-2, 144 Hz: 1-1-1-1-0…),
 * więc tło i auto przesuwają się nierówno — oko widzi to jako „klatkowanie”.
 * Render rysuje więc stan pośredni: prev + (cur − prev) · alpha, gdzie alpha = acc / TICK
 * (ułamek ticku, który już upłynął). Kosztem jest opóźnienie obrazu o ≤ 1 tick (8 ms).
 * Moduł tylko czyta stan gry — rdzeń (współdzielony z weryfikacją rankingu) się nie zmienia.
 */

/** Część stanu gry, którą rysujemy w pozycji pośredniej. Game spełnia ten interfejs. */
export interface RenderPose {
  distancePx: number;
  y: number;
  vy: number;
}

/** Ułamek ticku do interpolacji: 0 = poprzedni stan, 1 = bieżący. Odporny na NaN i ujemne acc. */
export function renderAlpha(acc: number, tick: number): number {
  if (!(tick > 0) || !(acc > 0)) return 0;
  return Math.min(1, acc / tick);
}

/**
 * Pozycja do narysowania. Bez poprzedniego stanu (nowy przejazd, pierwsza klatka)
 * zwraca bieżący. `out` pozwala nie alokować obiektu w każdej klatce.
 */
export function interpolatePose(
  prev: RenderPose | null, cur: RenderPose, alpha: number,
  out: RenderPose = { distancePx: 0, y: 0, vy: 0 },
): RenderPose {
  const a = Number.isFinite(alpha) ? Math.min(1, Math.max(0, alpha)) : 1;
  if (!prev || a >= 1) {
    out.distancePx = cur.distancePx;
    out.y = cur.y;
    out.vy = cur.vy;
    return out;
  }
  out.distancePx = prev.distancePx + (cur.distancePx - prev.distancePx) * a;
  out.y = prev.y + (cur.y - prev.y) * a;
  out.vy = prev.vy + (cur.vy - prev.vy) * a;
  return out;
}

/** Zapamiętuje stan sprzed ostatniego ticku jednej instancji gry (bez alokacji w pętli). */
export class PoseHistory<T extends RenderPose = RenderPose> {
  private owner: T | null = null;
  private readonly prev: RenderPose = { distancePx: 0, y: 0, vy: 0 };
  private readonly out: RenderPose = { distancePx: 0, y: 0, vy: 0 };

  /** Wywołuj tuż przed każdym tick() — zapisuje stan, z którego tick wystartuje. */
  beforeTick(game: T): void {
    this.owner = game;
    this.prev.distancePx = game.distancePx;
    this.prev.y = game.y;
    this.prev.vy = game.vy;
  }

  /** Pozycja do narysowania; dla innej instancji gry (nowy przejazd) — stan bieżący. */
  pose(game: T, alpha: number): RenderPose {
    return interpolatePose(this.owner === game ? this.prev : null, game, alpha, this.out);
  }
}
