import { describe, expect, it, vi } from 'vitest';
import { createTutorialProgress } from '../src/ui/tutorial';

describe('samouczek tapnięć', () => {
  it('znika dokładnie po trzech tapnięciach', () => {
    const state = createTutorialProgress();
    expect(state.visible).toBe(true);
    state.onTap(); state.onTap();
    expect(state.visible).toBe(true);
    state.onTap();
    expect(state.visible).toBe(false);
    state.resetRun();
    expect(state.visible).toBe(false);
  });

  it('wraca dopiero po trzech kolejnych wypadkach przed 5 s', () => {
    const state = createTutorialProgress();
    for (let i = 0; i < 3; i++) state.onTap();
    for (let i = 0; i < 2; i++) {
      state.onCrash(4.9);
      state.resetRun();
      expect(state.visible).toBe(false);
    }
    state.onCrash(0);
    state.resetRun();
    expect(state.visible).toBe(true);
    state.onTap(); state.onTap(); state.onTap();
    expect(state.visible).toBe(false);
  });

  it('wypadek przy 5 s zeruje serię i podwójne zgłoszenie się nie liczy', () => {
    const state = createTutorialProgress();
    for (let i = 0; i < 3; i++) state.onTap();
    state.onCrash(1);
    state.onCrash(1);
    state.resetRun();
    state.onCrash(5);
    state.resetRun();
    state.onCrash(1);
    state.resetRun();
    state.onCrash(1);
    state.resetRun();
    expect(state.visible).toBe(false);
    state.onCrash(1);
    state.resetRun();
    expect(state.visible).toBe(true);
  });

  it('zaliczony w poprzedniej sesji startuje ukryty, ale wraca po serii szybkich wypadków', () => {
    const state = createTutorialProgress({ dismissed: true });
    expect(state.visible).toBe(false);
    expect(state.dismissed).toBe(true);
    for (let i = 0; i < 3; i++) {
      state.resetRun();
      state.onCrash(2);
    }
    state.resetRun();
    expect(state.visible).toBe(true);
    expect(state.dismissed).toBe(false);
  });

  it('zgłasza zaliczenie dokładnie raz, przy trzecim tapnięciu', () => {
    const onDismiss = vi.fn();
    const state = createTutorialProgress({ onDismiss });
    state.onTap(); state.onTap();
    expect(onDismiss).not.toHaveBeenCalled();
    state.onTap(); state.onTap();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
