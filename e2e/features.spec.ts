import { test, expect, openMenu, startRun, tapCanvas, screenshot } from './support';

test('Wyzwanie dnia pokazuje tytuł dnia w podpowiedzi', async ({ page }, testInfo) => {
  await page.clock.setFixedTime(new Date('2026-10-30T12:00:00.000Z'));
  await openMenu(page);
  const dayHint = await page.locator('#daily-info').innerText();
  expect(dayHint).toMatch(/^Ta sama trasa dla wszystkich:\s*\S/);
  const title = dayHint.replace(/^Ta sama trasa dla wszystkich:\s*/, '').trim();
  expect(title.length).toBeGreaterThan(3);

  await page.locator('#btn-daily').click();
  await expect(page.locator('#menu')).toBeHidden();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#hint')).toHaveText(title);
  await screenshot(page, testInfo, 'wyzwanie-dnia-tytul');
});

test('Liga Polonii otwiera się i zamyka na mocku bez Firebase', async ({ page }, testInfo) => {
  await openMenu(page);
  await page.locator('#btn-league').click();
  const league = page.locator('#league');
  await expect(league).toBeVisible();
  await expect(page.locator('#menu')).toBeHidden();
  await expect(league.getByRole('heading', { name: 'Liga Polonii' })).toBeVisible();
  await expect(league.locator('.ce-league__demo')).toContainText('Wersja pokazowa');
  await expect(league.getByRole('tabpanel').getByRole('table')).toBeVisible();
  await screenshot(page, testInfo, 'liga-kraje');

  await league.getByRole('tab', { name: 'Gracze' }).click();
  await expect(league.getByRole('tabpanel')).toContainText('Najlepsi w tygodniu');
  await league.getByRole('tab', { name: 'Wyzwanie dnia' }).click();
  await expect(league.getByRole('tabpanel')).toContainText('Ten sam układ');
  await screenshot(page, testInfo, 'liga-wyzwanie');

  await page.locator('#btn-league-close').click();
  await expect(league).toBeHidden();
  await expect(page.locator('#league-body .ce-league')).toHaveCount(0);
  await expect(page.locator('#menu')).toBeVisible();
});

test('Link do portalu na końcu ma target blank i parametry UTM', async ({ page }, testInfo) => {
  await openMenu(page);
  await page.locator('#route-toggle').click();
  await page.locator('#sel-home').selectOption('BE');
  await startRun(page);
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 20_000 });

  const link = page.locator('#over-portal');
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
  const href = await link.getAttribute('href');
  expect(href).not.toBeNull();
  const url = new URL(href!);
  expect(url.protocol).toBe('https:');
  expect(url.hostname).toBe('aktualnosci.be');
  expect(url.searchParams.get('utm_source')).toBe('cebulak-express');
  expect(url.searchParams.get('utm_medium')).toBe('game');
  expect(url.searchParams.get('utm_content')).toBe('result');
  expect(url.searchParams.get('utm_campaign')).toBeTruthy();
  await screenshot(page, testInfo, 'link-do-portalu');
});

test('r=be-antwerpia ma pierwszeństwo przed zapisaną trasą', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('ce.settings', JSON.stringify({
      home: 'NL', from: 'rotterdam', to: 'poznan', mode: 'cozy',
    }));
  });
  await page.goto('/?test=1&seed=20261030&lang=pl&r=be-antwerpia');
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#sel-home')).toHaveValue('BE');
  await expect(page.locator('#sel-from')).toHaveValue('antwerpia');
  await expect(page.locator('#sel-to')).toHaveValue('poznan');
  await expect(page.locator('[data-mode="cozy"]')).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('#route-info')).toContainText('Antwerpia');
  await screenshot(page, testInfo, 'link-z-trasa');
});
