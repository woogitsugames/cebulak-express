import { test, expect, tapCanvas, screenshot } from './support';

const CASES = [
  { lang: 'pl', tagline: 'Kierunek Polska', over: 'Koniec trasy!' },
  { lang: 'en', tagline: 'Destination: Poland', over: 'End of the road!' },
  { lang: 'nl', tagline: 'Bestemming Polen', over: 'Einde van de rit!' },
  { lang: 'de', tagline: 'Ziel: Polen', over: 'Ende der Fahrt!' },
  { lang: 'fr', tagline: 'Direction la Pologne', over: 'Fin du trajet !' },
] as const;

for (const { lang, tagline, over } of CASES) {
  test(`menu i ekran końca w języku ${lang}`, async ({ page }, testInfo) => {
    await page.goto(`/?lang=${lang}&test=1&seed=20261030`);
    await expect(page.locator('#menu')).toBeVisible();
    await expect(page.locator('#ce-language')).toHaveValue(lang);
    await expect(page.locator('#menu .tagline')).toHaveText(tagline);
    await screenshot(page, testInfo, `58-menu-${lang}`);

    await page.locator('#btn-start').click();
    await expect(page.locator('#hud')).toBeVisible();
    await tapCanvas(page, testInfo.project.name);
    await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#over-title')).toHaveText(over);
    await screenshot(page, testInfo, `58-koniec-${lang}`);
  });
}

test('wybrany język przeżywa restart, a ?lang=pl wymusza polski', async ({ page }) => {
  await page.goto('/?lang=pl&test=1&seed=20261030');
  await page.locator('#ce-language').selectOption('nl');
  await expect(page.locator('#menu .tagline')).toHaveText('Bestemming Polen');

  await page.goto('/?test=1&seed=20261030');
  await expect(page.locator('#ce-language')).toHaveValue('nl');
  await expect(page.locator('#menu .tagline')).toHaveText('Bestemming Polen');

  await page.goto('/?lang=pl&test=1&seed=20261030');
  await expect(page.locator('#ce-language')).toHaveValue('pl');
  await expect(page.locator('#menu .tagline')).toHaveText('Kierunek Polska');
});
