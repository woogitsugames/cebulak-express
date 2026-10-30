import { test, expect, openMenu, screenshot } from './support';

const NEW_COUNTRIES = {
  IE: ['dublin', 'cork', 'limerick'],
  ES: ['barcelona', 'madryt', 'walencja'],
  IT: ['mediolan', 'rzym', 'bolonia'],
  AT: ['wieden', 'linz', 'salzburg'],
  SE: ['sztokholm', 'goteborg', 'malmo'],
  FI: ['helsinki', 'tampere', 'turku'],
  LU: ['luksemburg', 'esch-sur-alzette', 'differdange'],
} as const;

test('menu: 15 krajów, 7 nowych krajów i miasta; zrzut ekranu', async ({ page }, testInfo) => {
  await openMenu(page);
  const homes = await page.locator('#sel-home option').evaluateAll((list) =>
    list.map((option) => (option as HTMLOptionElement).value));
  expect(homes).toHaveLength(15);
  await page.locator('#route-toggle').click();
  for (const [home, starts] of Object.entries(NEW_COUNTRIES)) {
    await page.locator('#sel-home').selectOption(home);
    await expect(page.locator('#sel-home')).toHaveValue(home);
    const cities = await page.locator('#sel-from option').evaluateAll((list) =>
      list.map((option) => (option as HTMLOptionElement).value));
    expect(cities).toEqual([...starts]);
    await expect(page.locator('#route-info')).toContainText('km');
  }
  await page.locator('#sel-home').selectOption('ES');
  await page.locator('#sel-from').selectOption('madryt');
  await expect(page.locator('#route-info')).toContainText('Madryt');
  await screenshot(page, testInfo, 'menu-hiszpania-madryt');

  // Tylko na potrzeby zrzutu: rozwinięta lista pokazuje wszystkie 15 opcji.
  await page.locator('#sel-home').evaluate((select: HTMLSelectElement) => {
    select.size = 15;
    select.scrollIntoView({ block: 'center' });
  });
  await screenshot(page, testInfo, 'menu-lista-15-krajow');
});
