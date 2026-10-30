import { test, expect, openMenu, startRun, tapCanvas, screenshot } from './support';

test('menu → kraj i miasta → lot → kolizja → ekran końca → natychmiastowy restart', async ({ page }, testInfo) => {
  await openMenu(page);
  await page.locator('#route-toggle').click();
  await page.locator('#sel-home').selectOption('NL');
  await page.locator('#sel-from').selectOption('rotterdam');
  await page.locator('#sel-to').selectOption('poznan');
  await expect(page.locator('#route-info')).toContainText('Rotterdam → Poznań');
  await screenshot(page, testInfo, '01-menu-wybrana-trasa');

  await startRun(page);
  await screenshot(page, testInfo, '02-gra-przed-pierwszym-tapnieciem');
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#hint')).toBeHidden();
  // Bez kolejnych tapnięć kolizja z podłożem następuje niezależnie od seeda.
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#over-title')).toHaveText('Koniec trasy!');
  await expect(page.locator('#over-cause')).toContainText('Zatrzymał cię:');
  await expect(page.locator('#over-route')).toHaveText('Rotterdam → Poznań');
  await screenshot(page, testInfo, '03-ekran-kolizji');

  await page.locator('#btn-again').click();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#over')).toBeHidden();
  await expect(page.locator('#hint')).toBeVisible();
  await expect(page.locator('#hud-km')).toHaveText('0 km');
  await screenshot(page, testInfo, '04-restart-natychmiast');
});

test('tryb łagodny ma 3 życia i kończy się dopiero po trzeciej kolizji', async ({ page }, testInfo) => {
  await openMenu(page);
  await page.locator('[data-mode="cozy"]').click();
  await expect(page.locator('[data-mode="cozy"]')).toHaveAttribute('aria-checked', 'true');
  await startRun(page);
  const lives = page.locator('#hud-lives');
  await expect(lives).toBeVisible();
  await expect(lives).toHaveText('🫙🫙🫙');
  await screenshot(page, testInfo, 'lagodny-trzy-zycia');

  await tapCanvas(page, testInfo.project.name);
  await expect(lives).toHaveText('🫙🫙', { timeout: 10_000 });
  await expect(page.locator('#over')).toBeHidden();
  await expect(lives).toHaveText('🫙', { timeout: 10_000 });
  await expect(page.locator('#over')).toBeHidden();
  await expect(page.locator('#over')).toBeVisible({ timeout: 12_000 });
  await screenshot(page, testInfo, 'lagodny-po-trzeciej-kolizji');
});

test('po końcu można zmienić kraj, miasto startu i cel', async ({ page }, testInfo) => {
  await openMenu(page);
  await startRun(page);
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });

  await page.locator('#btn-menu').click();
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#over')).toBeHidden();
  await page.locator('#route-toggle').click();
  await page.locator('#sel-home').selectOption('UK');
  await expect(page.locator('#sel-from')).toHaveValue('londyn');
  await page.locator('#sel-from').selectOption('manchester');
  await page.locator('#sel-to').selectOption('gdansk');
  await expect(page.locator('#route-info')).toContainText('Manchester → Gdańsk');
  await screenshot(page, testInfo, 'zmieniona-trasa');

  await startRun(page);
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#over-route')).toHaveText('Manchester → Gdańsk');
});

test('spacja uruchamia przejazd i nalicza kilometry', async ({ page }, testInfo) => {
  await openMenu(page);
  await startRun(page);
  await page.keyboard.press('Space');
  await expect(page.locator('#hint')).toBeHidden();
  await expect.poll(async () => {
    const text = (await page.locator('#hud-km').textContent()) ?? '';
    return Number(text.replace(/[^0-9]/g, ''));
  }, { timeout: 8_000 }).toBeGreaterThan(0);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await screenshot(page, testInfo, 'sterowanie-spacja');
});

test('osiem krajów ma dostępne miasta startu i poprawne podsumowanie trasy', async ({ page }, testInfo) => {
  await openMenu(page);
  await page.locator('#route-toggle').click();
  const home = page.locator('#sel-home');
  const countries = await home.locator('option').evaluateAll((options) =>
    options.map((option) => (option as HTMLOptionElement).value),
  );
  expect(countries).toEqual(['BE', 'NL', 'DE', 'UK', 'FR', 'CH', 'NO', 'DK']);

  for (const country of countries) {
    await home.selectOption(country);
    await expect(page.locator('#sel-from option').first()).toBeAttached();
    await expect(page.locator('#sel-from')).not.toHaveValue('');
    await expect(page.locator('#route-info')).toContainText('km');
  }
  await screenshot(page, testInfo, 'lista-krajow-i-miast');
});
