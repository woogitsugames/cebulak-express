import { UI } from '../content/i18n';
import './tutorial.css';

/** Model samouczka odłączony od DOM i symulacji gry. */
export interface TutorialProgress {
  readonly visible: boolean;
  /** Gracz opanował skok (3 tapnięcia); wraca do false po serii szybkich wypadków. */
  readonly dismissed: boolean;
  onTap(): void;
  onCrash(seconds: number): void;
  resetRun(): void;
}

export interface TutorialOptions {
  /** Samouczek zaliczony w poprzedniej sesji: startujemy ukryci, ale nadal liczymy szybkie wypadki. */
  dismissed?: boolean;
  /** Wywoływane raz przy każdym zaliczeniu (np. zapis w pamięci). */
  onDismiss?(): void;
}

/** Po 3 tapnięciach znika; po 3 kolejnych szybkich wypadkach wraca w następnym locie. */
export function createTutorialProgress(options: TutorialOptions = {}): TutorialProgress {
  let taps = 0;
  let earlyCrashes = 0;
  let dismissed = options.dismissed === true;
  let visible = !dismissed;
  let reportedCrash = false;
  return {
    get visible(): boolean { return visible; },
    get dismissed(): boolean { return dismissed; },
    onTap(): void {
      if (!visible) return;
      taps++;
      if (taps >= 3) {
        dismissed = true;
        visible = false;
        options.onDismiss?.();
      }
    },
    onCrash(seconds: number): void {
      if (reportedCrash) return;
      reportedCrash = true;
      visible = false;
      if (Number.isFinite(seconds) && seconds >= 0 && seconds < 5) {
        earlyCrashes++;
        if (earlyCrashes >= 3) {
          earlyCrashes = 0;
          taps = 0;
          dismissed = false;
        }
      } else {
        earlyCrashes = 0;
      }
    },
    resetRun(): void {
      reportedCrash = false;
      visible = !dismissed;
    },
  };
}

export interface TutorialControl {
  readonly element: HTMLElement;
  /** Dłoń jest teraz na ekranie. */
  readonly visible: boolean;
  onTap(): void;
  /** Wywołać raz po zdarzeniu `over`, podając game.seconds. */
  onCrash(seconds: number): void;
  /** Wywołać po utworzeniu nowej gry, także przed pierwszym lotem. */
  resetRun(): void;
  /** Ukryć po wyjściu do menu, bez resetowania postępu. */
  hide(): void;
  dispose(): void;
}

/** Samouczek nie przechwytuje pointerów; tap zawsze trafia do gry pod spodem. */
export function mountTutorial(container: HTMLElement, options: TutorialOptions = {}): TutorialControl {
  const state = createTutorialProgress(options);
  let disposed = false;
  const root = document.createElement('div');
  root.className = 'ce-tutorial';
  root.id = 'tutorial';
  root.setAttribute('role', 'status');
  const pulse = document.createElement('span');
  pulse.className = 'ce-tutorial__pulse';
  pulse.setAttribute('aria-hidden', 'true');
  const hand = document.createElement('img');
  hand.className = 'ce-tutorial__hand';
  hand.src = (import.meta.env?.BASE_URL ?? '/').replace(/\/?$/, '/') + 'assets/ui/hand-tap.png';
  hand.alt = '';
  hand.setAttribute('aria-hidden', 'true');
  const hint = document.createElement('span');
  hint.className = 'ce-tutorial__caption';
  root.append(pulse, hand, hint);
  container.append(root);
  function sync(): void {
    root.hidden = disposed || !state.visible;
    // Język może się zmienić między lotami — podpis czytamy przy każdym pokazaniu.
    if (!root.hidden && hint.textContent !== UI.tapToFly) {
      hint.textContent = UI.tapToFly;
      root.setAttribute('aria-label', UI.tapToFly);
    }
  }
  sync();
  return {
    get element(): HTMLElement { return root; },
    get visible(): boolean { return !root.hidden; },
    onTap(): void { if (disposed) return; state.onTap(); sync(); },
    onCrash(seconds: number): void { if (disposed) return; state.onCrash(seconds); sync(); },
    resetRun(): void { if (disposed) return; state.resetRun(); sync(); },
    hide(): void { root.hidden = true; },
    dispose(): void { if (disposed) return; disposed = true; root.remove(); },
  };
}
