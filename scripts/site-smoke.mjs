/** Smoke w Chromium: landing na desktopie/telefonie i uruchomienie gry /graj/.
 * Uruchom serwer static w dist-site, potem SITE_TEST_URL=... node scripts/site-smoke.mjs.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const url = (process.env.SITE_TEST_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const base = process.env.SITE_BASE_PATH || '/';
const path = (suffix) => url + base + suffix;
const browser = await chromium.launch({ headless: true });
const failures = [];
mkdirSync('site-audit', { recursive: true });

try {
  for (const [name, options] of [
    ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path(''), { waitUntil: 'networkidle' });
    if (response?.status() !== 200) failures.push(name + ': kod strony ' + response?.status());
    if (!(await page.locator('a.button-primary[href$="graj/"]').count())) failures.push(name + ': brak linku do gry');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth + 2) failures.push(name + ': poziomy scroll ' + scrollWidth + ' > ' + clientWidth);
    await page.screenshot({ path: 'site-audit/' + name + '.png', fullPage: true });
    if (errors.length) failures.push(name + ': błędy JS: ' + errors.join('; '));

    const privacy = await page.goto(path('prywatnosc.html'), { waitUntil: 'domcontentloaded' });
    if (privacy?.status() !== 200 || !(await page.locator('main').innerText()).includes('Firebase')) {
      failures.push(name + ': polityka nie generuje się z Markdown');
    }
    const license = await page.goto(path('licencje.html'), { waitUntil: 'domcontentloaded' });
    if (license?.status() !== 200 || !(await page.locator('details.license-group').count())) {
      failures.push(name + ': nie ma wygenerowanych licencji');
    }
    const game = await page.goto(path('graj/'), { waitUntil: 'domcontentloaded' });
    if (game?.status() !== 200 || !(await page.locator('#game').count())) {
      failures.push(name + ': brak gry pod podścieżką');
    }
    await context.close();
  }
} finally {
  await browser.close();
}
if (failures.length) {
  failures.forEach((item) => console.error('BŁĄD: ' + item));
  process.exitCode = 1;
} else {
  console.log('Smoke: desktop i telefon OK, /graj/ OK. Zrzuty: site-audit/*.png');
}
