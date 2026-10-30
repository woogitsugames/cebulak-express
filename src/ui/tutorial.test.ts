import { describe, expect, it } from 'vitest';
import { createTutorialProgress } from './tutorial';

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
});
