import { Game } from '../src/core/game';
import { makeRoute } from '../src/core/route';
import { randomNickChoices } from '../src/content/nicks';
import { encodeGhost } from '../src/share/ghost';
import type {} from '../src/test-hooks';
import { test, expect, startRun, tapCanvas, screenshot } from './support';

const ROUTE = makeRoute('NL', 'rotterdam', 'poznan');
const SEED = 20261030;

/** Przejazd nadawcy: utrzymuje się w powietrzu przez `seconds`, potem spada. */
function senderRun(seconds: number): Game {
  const game = new Game({ seed: SEED, mode: 'ranked', route: ROUTE });
  game.flap();
  while (game.phase === 'playing') {
    if (game.ticks < seconds * 120 && game.vy >= 0 && game.y > 300) game.flap();
    game.tick();
  }
  return game;
}

test('link z duchem: ta sama trasa, duch w trakcie lotu i wynik na ekranie końca', async ({ page }, testInfo) => {
  const sender = senderRun(4);
  const { code } = encodeGhost(sender);
  const nickId = randomNickChoices(() => 0.4, 1, 'NL')[0];
  await page.goto(`/?test=1&lang=pl&g=${code}&n=${encodeURIComponent(nickId)}`);
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#ghost-info')).toBeVisible();
  await expect(page.locator('#ghost-info')).toContainText('Wyzwanie od:');
  await expect(page.locator('#ghost-info')).toContainText('Rotterdam → Poznań');
  await expect(page.locator('#ghost-info')).toContainText(`${sender.km} km`);
  await screenshot(page, testInfo, '01-menu-wyzwanie');

  await startRun(page);
  // Ziarno z linku, nie z serwera rankingu.
  expect(await page.evaluate(() => window.__ceTest?.snapshot()?.seed)).toBe(SEED);
  await tapCanvas(page, testInfo.project.name);
  await screenshot(page, testInfo, '02-lot-z-duchem');
  // Gracz tapnął raz i spada — duch nadawcy leciał dłużej.
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#over-route')).toHaveText('Rotterdam → Poznań');
  await expect(page.locator('#over-ghost')).toBeVisible();
  await expect(page.locator('#over-ghost')).toHaveText(/^Duch był szybszy o \d+ km\.$/);
  await expect(page.locator('#btn-challenge')).toBeVisible();
  await expect(page.locator('#btn-challenge')).toHaveText('Wyzwij znajomego');
  await screenshot(page, testInfo, '03-wynik-z-duchem');

  // „Zagraj ponownie” to znów wyzwanie z tym samym duchem.
  await page.locator('#btn-again').click();
  await expect(page.locator('#over')).toBeHidden();
  expect(await page.evaluate(() => window.__ceTest?.snapshot()?.seed)).toBe(SEED);
});

test('remis z duchem, gdy przejazd jest identyczny', async ({ page }, testInfo) => {
  const { code } = encodeGhost(senderRun(0));
  await page.goto(`/?test=1&lang=pl&g=${code}`);
  await expect(page.locator('#ghost-info')).toContainText('Wyzwanie znajomego:');
  await startRun(page);
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#over-ghost')).toHaveText('Remis z duchem!');
});

test('nieprawidłowy lub stary link z duchem jest ignorowany bez błędów', async ({ page }, testInfo) => {
  await page.goto('/?test=1&seed=20261030&lang=pl&g=AQIDBAUGBwgJCgsMDQ4PEBESExQ&n=%3Cscript%3E');
  await expect(page.locator('#menu')).toBeVisible();
  await startRun(page);
  await expect(page.locator('#ghost-info')).toBeHidden();
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#over-ghost')).toBeHidden();
  await expect(page.locator('#toast')).toBeHidden();
});
