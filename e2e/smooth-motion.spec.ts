import type { Page } from '@playwright/test';
import { test, expect, openMenu, startRun } from './support';

/**
 * Płynność przesuwu tła na ekranach 60/90/144 Hz (zgłoszenie „tło klatkuje, bolą oczy”).
 * Headless Chromium nie ma wyświetlacza 90/144 Hz i nie nadąża z rysowaniem w czasie
 * rzeczywistym, więc strona dostaje wirtualny zegar: requestAnimationFrame i performance.now
 * idą równymi krokami 1/hz s, jak vsync telefonu. Mierzymy pozycję świata faktycznie
 * narysowaną w każdej klatce (hak ?test=1) i porównujemy przyrosty między klatkami.
 */
interface MotionStats { frames: number; meanDx: number; cv: number; jerk: number }

interface MotionProbe { samples: number[]; on: boolean }

async function measure(page: Page, hz: number): Promise<MotionStats> {
  await page.addInitScript((rate: number) => {
    const period = 1000 / rate;
    const queue: FrameRequestCallback[] = [];
    const probe: MotionProbe = { samples: [], on: false };
    (window as unknown as { __ceMotion: MotionProbe }).__ceMotion = probe;
    const realNow = performance.now.bind(performance);
    let virtual = realNow();
    performance.now = () => virtual;
    window.requestAnimationFrame = (cb) => { queue.push(cb); return queue.length; };
    window.cancelAnimationFrame = () => undefined;
    const press = (): boolean => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    const pump = (): void => {
      virtual += period;
      for (const cb of queue.splice(0)) cb(virtual);
      const t = window.__ceTest;
      const s = probe.on ? t?.snapshot() : null;
      if (s?.phase === 'playing') {
        probe.samples.push(t?.renderPose?.()?.distancePx ?? s.distancePx);
        // Autopilot w wirtualnym czasie: tapnięcie, gdy auto opada poniżej środka (bez losowości).
        if (s.y > 320 && s.vy > 0) press();
      }
      setTimeout(pump, 4);
    };
    setTimeout(pump, 4);
  }, hz);
  await openMenu(page);
  await page.locator('[data-mode="cozy"]').click();
  await startRun(page);
  await page.keyboard.press('Space');
  await page.waitForFunction(() => window.__ceTest?.snapshot()?.phase === 'playing', undefined, { polling: 50 });
  await page.evaluate(() => { (window as unknown as { __ceMotion: MotionProbe }).__ceMotion.on = true; });
  await page.waitForFunction(() => {
    const { samples } = (window as unknown as { __ceMotion: MotionProbe }).__ceMotion;
    return samples.length >= 200 || (samples.length > 0 && window.__ceTest?.snapshot()?.phase !== 'playing');
  }, undefined, { timeout: 30_000, polling: 50 });
  const xs = await page.evaluate(() => (window as unknown as { __ceMotion: MotionProbe }).__ceMotion.samples.slice(0, 200));
  return motionStats(xs);
}

/** Przyrosty pozycji między klatkami: odchylenie (cv) i największy skok sąsiednich przyrostów (jerk). */
function motionStats(xs: number[]): MotionStats {
  const dx = xs.slice(1).map((x, i) => x - xs[i]).filter((d) => d >= 0); // 0 = klatka bez ruchu (też szarpnięcie)
  const mean = dx.reduce((a, b) => a + b, 0) / dx.length;
  const std = Math.sqrt(dx.reduce((a, b) => a + (b - mean) ** 2, 0) / dx.length);
  const jerk = Math.max(...dx.slice(1).map((d, i) => Math.abs(d - dx[i])));
  return { frames: dx.length, meanDx: +mean.toFixed(4), cv: +(std / mean).toFixed(4), jerk: +(jerk / mean).toFixed(4) };
}

for (const hz of [60, 90, 144]) {
  test(`tło przesuwa się równomiernie przy ${hz} Hz`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('WebKit'), 'Wirtualny zegar klatek sprawdzamy w Chromium.');
    const stats = await measure(page, hz);
    console.log(`[płynność ${hz} Hz] ${testInfo.project.name}: ${JSON.stringify(stats)}`);
    await testInfo.attach(`plynnosc-${hz}hz`, { body: JSON.stringify(stats), contentType: 'application/json' });
    expect(stats.frames).toBeGreaterThan(40);
    // Przyrost na klatkę stały co do 3% (zostaje tylko powolne przyspieszanie trasy, bonusy, kolizje).
    expect(stats.cv).toBeLessThan(0.03);
    expect(stats.jerk).toBeLessThan(0.15);
  });
}
