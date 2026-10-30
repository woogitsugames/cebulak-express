import { expect, test as base, type Page, type TestInfo } from '@playwright/test';

/** Przechwytujemy zarówno console.error, jak i nieobsłużone wyjątki strony. */
export const test = base.extend<{ runtimeErrors: string[] }>({
  runtimeErrors: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    await use(errors);
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
  await page.goto('/?test=1&seed=20261030');
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#sel-home option')).toHaveCount(15);
  await expect(page.locator('#route-info')).toContainText('km');
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
