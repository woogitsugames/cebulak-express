import { expect, test as base, type Page, type TestInfo } from '@playwright/test';
import type {} from '../src/test-hooks';

/** Przechwytujemy zarówno console.error, jak i nieobsłużone wyjątki strony. */
export const test = base.extend<{ runtimeErrors: string[] }>({
  runtimeErrors: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    // Diagnostyka zawieszeń w CI: długie zadania głównego wątku i zmiany widoczności strony.
    await page.addInitScript(() => {
      const w = window as unknown as { __ceDiag: { longTasks: number[][]; visibility: string[] } };
      w.__ceDiag = { longTasks: [], visibility: [] };
      try {
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) w.__ceDiag.longTasks.push([Math.round(e.startTime), Math.round(e.duration)]);
        }).observe({ type: 'longtask', buffered: true });
      } catch { /* brak API */ }
      document.addEventListener('visibilitychange', () => {
        w.__ceDiag.visibility.push(`${Math.round(performance.now())}:${document.visibilityState}`);
      });
    });
    await use(errors);
    if (testInfo.status !== testInfo.expectedStatus && !page.isClosed()) {
      const state = await Promise.race([
        page.evaluate(() => JSON.stringify({
          now: Math.round(performance.now()),
          visibility: document.visibilityState,
          diag: (window as unknown as { __ceDiag?: unknown }).__ceDiag,
          game: (() => { const s = window.__ceTest?.snapshot(); return s ? { phase: s.phase, km: s.km, y: s.y, vy: s.vy } : null; })(),
          overHidden: document.getElementById('over')?.hidden,
        }, null, 1)).catch((e: Error) => `evaluate: ${e.message}`),
        new Promise<string>((resolve) => setTimeout(() => resolve('evaluate: brak odpowiedzi strony w 10 s'), 10_000)),
      ]);
      await testInfo.attach('diagnostyka-strony', { body: Buffer.from(String(state), 'utf8'), contentType: 'application/json' });
      console.log(`[diagnostyka] ${testInfo.title}: ${state}`);
    }
    if (errors.length > 0) {
      await testInfo.attach('bledy-konsoli', {
        body: Buffer.from(errors.join('\n'), 'utf8'),
        contentType: 'text/plain',
      });
    }
    expect(errors, 'Strona nie może zgłaszać błędów w konsoli ani nieobsłużonych wyjątków').toEqual([]);
  }, { auto: true }],
});

export { expect };

export async function openMenu(page: Page): Promise<void> {
  await page.goto('/?test=1&seed=20261030&lang=pl');
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#sel-home option')).toHaveCount(15);
  await expect(page.locator('#route-info')).toContainText('km');
  await waitForMenuReady(page);
  await expect(page.locator('#ce-language')).toHaveValue('pl');
}

/**
 * Przełącznik języka ładuje się leniwie po pierwszej klatce i dokłada kontrolkę do menu
 * (przesuwa układ i tłumaczy teksty). Czekamy na sygnał gotowości, żeby test klikał
 * w ustalone menu, a nie w trakcie jego montowania.
 */
export async function waitForMenuReady(page: Page): Promise<void> {
  await expect(page.locator('#menu')).toHaveAttribute('data-ready', 'true');
}

export async function startRun(page: Page): Promise<void> {
  await page.locator('#btn-start').click();
  await expect(page.locator('#menu')).toBeHidden();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#hint')).toBeVisible();
  await expect(page.locator('#over')).toBeHidden();
}

export async function tapCanvas(page: Page, projectName: string): Promise<void> {
  const canvas = page.locator('#game');
  const position = { x: 20, y: 20 };
  if (projectName.startsWith('Desktop')) {
    await canvas.click({ position });
  } else {
    await canvas.tap({ position });
  }
}

export async function screenshot(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  await testInfo.attach(name, {
    body: await page.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
}
