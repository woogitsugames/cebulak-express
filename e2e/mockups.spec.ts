import { test, expect, openMenu, startRun, tapCanvas, screenshot } from './support';

/**
 * Dokumentacja wyglądu ekranów w dwóch rozmiarach z akceptacji zlecenia 48.
 * Ostatni kadr to wyłącznie wizualny stan „dojazd” — mechanikę mety testuje rdzeń.
 */
for (const viewport of [
  { width: 390, height: 844, label: '390x844' },
  { width: 1280, height: 800, label: '1280x800' },
]) {
  test('makiety: menu, podpowiedź, kolizja i dojazd — ' + viewport.label, async ({ page }, testInfo) => {
    test.setTimeout(55_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openMenu(page);
    await expect(page.locator('.menu-logo img')).toBeVisible();
    await expect(page.locator('#btn-garage')).toBeVisible();
    await expect(page.locator('#route-picker')).not.toHaveAttribute('open', '');
    await screenshot(page, testInfo, '48-' + viewport.label + '-01-menu');

    await startRun(page);
    await expect(page.locator('#hint')).toBeVisible();
    await screenshot(page, testInfo, '48-' + viewport.label + '-02-podpowiedz');

    await tapCanvas(page, testInfo.project.name);
    await expect(page.locator('#over')).toBeVisible({ timeout: 16_000 });
    await expect(page.locator('#over-title')).toHaveText('Koniec trasy!');
    await expect(page.locator('#over-cause-icon')).toBeVisible();
    await expect(page.locator('#over-mini-league')).toBeVisible();
    await expect(page.locator('#over-league-list li')).toHaveCount(3);
    await screenshot(page, testInfo, '48-' + viewport.label + '-03-kolizja');

    // Fixture wizualny: stan osiągnięcia mety bez sztucznego przyspieszania fizyki.
    await page.evaluate(() => {
      const over = document.getElementById('over')!;
      over.classList.add('is-arrived');
      document.getElementById('over-title')!.textContent = 'Jesteś w domu!';
      document.getElementById('over-cause')!.textContent = 'Mama już nakrywa do stołu.';
      document.getElementById('over-joke')!.textContent = '172 s';
      document.getElementById('over-best')!.textContent = 'Nowy rekord!';
      const icon = document.getElementById('over-cause-icon') as HTMLImageElement;
      icon.src = 'assets/ui/icon-jar.png';
    });
    await screenshot(page, testInfo, '48-' + viewport.label + '-04-dojazd-fixture');
  });
}

test('zmiana trasy i trybu oraz klawisze zachowują dostępność', async ({ page }) => {
  await openMenu(page);
  const details = page.locator('#route-picker');
  await page.locator('#route-toggle').focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await page.locator('#sel-home').selectOption('NL');
  await expect(page.locator('#route-flag')).toHaveAttribute('src', /flag-nl\.png/);

  await page.locator('[data-mode="ranked"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-mode="cozy"]')).toHaveAttribute('aria-checked', 'true');

  await page.locator('#btn-start').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#hint')).toBeVisible();
});

test('przycisk garażu otwiera i zamyka garaż', async ({ page }) => {
  await openMenu(page);
  await page.locator('#btn-garage').click();
  await expect(page.locator('#garage')).toBeVisible();
  await page.locator('#garage .ce-garage__close').click();
  await expect(page.locator('#garage')).toBeHidden();
  await expect(page.locator('#menu')).toBeVisible();
});
