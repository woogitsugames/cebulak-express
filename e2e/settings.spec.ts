import { test, expect, openMenu, screenshot, startRun, tapCanvas, waitForMenuReady } from './support';

/** Zrzuty 390×844 do przeglądu (ścieżka z E2E_SHOTS_DIR); bez zmiennej tylko załącznik raportu. */
async function shot(page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo, name: string): Promise<void> {
  await screenshot(page, testInfo, name);
  const dir = process.env.E2E_SHOTS_DIR;
  if (dir && testInfo.project.name.startsWith('Pixel')) {
    await page.screenshot({ path: `${dir}/${name}.png`, animations: 'disabled' });
  }
}

test.describe('ekran ustawień', () => {
  test('zębatka w menu otwiera ustawienia, a wyciszenie przeżywa przeładowanie', async ({ page }, testInfo) => {
    if (testInfo.project.name.startsWith('Pixel')) await page.setViewportSize({ width: 390, height: 844 });
    await openMenu(page);
    const gear = page.locator('#btn-settings');
    await expect(gear).toBeVisible();
    await expect(gear).toHaveAttribute('aria-label', 'Otwórz ustawienia');
    await expect(gear.locator('img')).toHaveAttribute('src', /icon-settings\.png$/);
    await shot(page, testInfo, 'menu-z-zebatka');

    await gear.click();
    const dialog = page.getByRole('dialog', { name: 'Ustawienia' });
    await expect(dialog).toBeVisible();
    const sound = dialog.getByRole('switch', { name: 'Efekty dźwiękowe' });
    const music = dialog.getByRole('switch', { name: 'Muzyka' });
    const vibrations = dialog.getByRole('switch', { name: 'Wibracje' });
    await expect(sound).toBeChecked();
    await expect(music).toBeChecked();
    await expect(vibrations).toBeChecked();
    await expect(dialog.getByRole('radio', { name: 'Auto' })).toBeChecked();
    await shot(page, testInfo, 'ustawienia');

    // Klik w etykietę (cały wiersz), tak jak palcem na telefonie.
    await dialog.locator('label', { hasText: 'Efekty dźwiękowe' }).click();
    await dialog.locator('label', { hasText: 'Wibracje' }).click();
    await dialog.locator('label', { hasText: 'Zawsze' }).click();
    await expect(sound).not.toBeChecked();
    await expect(vibrations).not.toBeChecked();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ce.preferences.v1') ?? '{}')))
      .toMatchObject({ soundEffects: false, music: true, vibrations: false });
    await expect.poll(() => page.evaluate(() => localStorage.getItem('ce.performanceMode'))).toBe('always');

    await dialog.getByRole('button', { name: 'Zamknij' }).last().click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('#menu')).toBeVisible();
    await expect(gear).toBeFocused();

    await page.reload();
    await waitForMenuReady(page);
    await gear.click();
    await expect(sound).not.toBeChecked();
    await expect(music).toBeChecked();
    await expect(vibrations).not.toBeChecked();
    await expect(dialog.getByRole('radio', { name: 'Zawsze' })).toBeChecked();

    // Powrót do „auto” usuwa wpis; Escape zamyka panel.
    await dialog.locator('label', { hasText: 'Auto' }).click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('ce.performanceMode'))).toBeNull();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  });

  test('wyłączona muzyka blokuje suwak głośności, „mniej animacji” ustawia atrybut strony', async ({ page }) => {
    await openMenu(page);
    await page.locator('#btn-settings').click();
    const dialog = page.getByRole('dialog', { name: 'Ustawienia' });
    const volume = dialog.getByRole('slider', { name: 'Głośność muzyki' });
    await expect(volume).toBeEnabled();
    await dialog.locator('label', { hasText: /^Muzyka$/ }).click();
    await expect(volume).toBeDisabled();
    await dialog.locator('label', { hasText: 'Mniej animacji' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-ce-reduced-motion', 'true');
    await page.reload();
    await waitForMenuReady(page);
    // Preferencja ruchu działa od startu, zanim ktoś otworzy ustawienia.
    await expect(page.locator('html')).toHaveAttribute('data-ce-reduced-motion', 'true');
  });

  test('tapnięcie w panel ustawień nie startuje gry', async ({ page }) => {
    await openMenu(page);
    await page.locator('#btn-settings').click();
    const dialog = page.getByRole('dialog', { name: 'Ustawienia' });
    await dialog.locator('.ce-settings__hint').first().click();
    await expect(dialog).toBeVisible();
    await expect(page.locator('#hud')).toBeHidden();
  });

  test('ustawienia mówią językiem gracza', async ({ page }) => {
    await page.goto('/?test=1&seed=20261030&lang=en');
    await waitForMenuReady(page);
    const gear = page.locator('#btn-settings');
    await expect(gear).toHaveAttribute('aria-label', 'Open settings');
    await gear.click();
    const dialog = page.getByRole('dialog', { name: 'Settings' });
    await expect(dialog.getByRole('switch', { name: 'Sound effects' })).toBeVisible();
    await expect(dialog.getByText('Battery saver graphics')).toBeVisible();
  });
});

test.describe('samouczek bez słów', () => {
  test('dłoń przy pierwszym locie znika po trzech tapnięciach i zapisuje zaliczenie', async ({ page }, testInfo) => {
    if (testInfo.project.name.startsWith('Pixel')) await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?test=1&seed=20261030&lang=pl&tutorial=1');
    await waitForMenuReady(page);
    await expect(page.locator('#tutorial')).toBeAttached();
    await expect(page.locator('#tutorial')).toBeHidden();
    await page.locator('#btn-start').click();
    const tutorial = page.locator('#tutorial');
    await expect(tutorial).toBeVisible();
    await expect(tutorial).toContainText('Dotknij, aby podskoczyć');
    // Jedna dłoń naraz: zwykła podpowiedź startu chowa się pod samouczkiem.
    await expect(page.locator('#hint')).toBeHidden();
    await shot(page, testInfo, 'samouczek');

    for (let i = 0; i < 3; i++) await tapCanvas(page, testInfo.project.name);
    await expect(tutorial).toBeHidden();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('ce.tutorial.v1.done'))).toBe('1');
  });

  test('w trybie testowym samouczka nie ma (zrzuty i inne testy bez nakładki)', async ({ page }) => {
    await openMenu(page);
    await startRun(page);
    await expect(page.locator('#tutorial')).toHaveCount(0);
  });
});
