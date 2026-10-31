import { test as baseTest, type Page, type Route as PwRoute } from '@playwright/test';
import { Game } from '../src/core/game';
import { makeRoute } from '../src/core/route';
import { encodeGhost } from '../src/share/ghost';
import type {} from '../src/test-hooks';
import { test, expect, openMenu, startRun, tapCanvas, waitForMenuReady } from './support';

/**
 * Regresje z przeglądu QA (integracja modułów leniwych w main.ts):
 * wyścigi z dynamicznymi importami, przecieki stanu między przejazdami,
 * toasty po zmianie ekranu i ścieżki z niedziałającą pamięcią.
 */

/** Zapisuje każdy tekst, który pojawił się w #toast (także na chwilę). */
async function recordToasts(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as { __toasts: string[] };
    w.__toasts = [];
    const toast = document.getElementById('toast')!;
    const note = () => { if (!toast.hidden && toast.textContent) w.__toasts.push(toast.textContent); };
    new MutationObserver(note).observe(toast, { attributes: true, childList: true, characterData: true, subtree: true });
  });
}
const toasts = (page: Page) => page.evaluate(() => (window as unknown as { __toasts: string[] }).__toasts);

/** Opóźnia jeden leniwy chunk — symulacja wolnej sieci dla wyścigów z dynamicznym importem. */
async function delayChunk(page: Page, name: string, ms: number): Promise<void> {
  await page.route(new RegExp(`/assets/${name}-[\\w-]+\\.js$`), async (route: PwRoute) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    await route.continue();
  });
}

async function crash(page: Page, projectName: string): Promise<void> {
  await startRun(page);
  await tapCanvas(page, projectName);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
}

test.describe('toasty po przejeździe', () => {
  test('medal za pierwszy przejazd widać na ekranie końca', async ({ page }, testInfo) => {
    await openMenu(page);
    await crash(page, testInfo.project.name);
    await expect(page.locator('#toast')).toBeVisible();
    await expect(page.locator('#toast')).toHaveText('Medal: Pierwsza jazda!');
    await expect(page.locator('#over')).toBeVisible();
  });

  test('zaległe toasty z poprzedniego końca nie wchodzą do nowego przejazdu ani do menu', async ({ page }, testInfo) => {
    await openMenu(page);
    await crash(page, testInfo.project.name);
    await recordToasts(page);
    // Natychmiastowy restart, zanim medal zdąży się pojawić (700 ms).
    await page.locator('#btn-again').click();
    await expect(page.locator('#hud')).toBeVisible();
    await page.waitForTimeout(2600);
    expect((await toasts(page)).filter((text) => text.startsWith('Medal:') || text.startsWith('Nowa pocztówka'))).toEqual([]);
    await expect(page.locator('#toast')).toBeHidden();
  });
});

test('pamięć bez zapisu: album nie cofa postępu i medal nie przychodzi drugi raz', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === 'ce.collection.progress.v1') throw new DOMException('Brak miejsca', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await openMenu(page);
  await crash(page, testInfo.project.name);
  await expect(page.locator('#toast')).toHaveText('Medal: Pierwsza jazda!');
  await page.locator('#btn-menu').click();

  await page.locator('#btn-album').click();
  const album = page.locator('#album .ce-collection');
  await expect(album).toBeVisible();
  await expect(album.locator('.ce-collection__stat').first()).toContainText('1');
  await album.locator('.ce-collection__close').click();
  await expect(page.locator('#menu')).toBeVisible();

  await crash(page, testInfo.project.name);
  await recordToasts(page);
  await page.waitForTimeout(2600);
  expect(await toasts(page)).not.toContain('Medal: Pierwsza jazda!');
});

test('Escape tuż po „Lecimy!” zostawia menu (przejazd nie startuje po powrocie)', async ({ page }) => {
  await openMenu(page);
  await page.evaluate(() => {
    document.getElementById('btn-start')!.click();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  });
  await page.waitForTimeout(500);
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#hud')).toBeHidden();
  expect(await page.evaluate(() => window.__ceTest?.snapshot() ?? null)).toBeNull();
});

test('album: szybkie otwórz–wstecz–otwórz przy wolnym chunku montuje jeden album', async ({ page }) => {
  await delayChunk(page, 'collection', 1500);
  await openMenu(page);
  await page.locator('#btn-album').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#menu')).toBeVisible();
  await page.locator('#btn-album').click();
  await expect(page.locator('#album .ce-collection')).toBeVisible({ timeout: 10_000 });
  await page.waitForTimeout(500);
  await expect(page.locator('#album .ce-collection')).toHaveCount(1);
});

test('zmiana trasy przed zdekodowaniem wyzwania ?g= nie przywraca ducha', async ({ page }, testInfo) => {
  const sender = new Game({ seed: 20261030, mode: 'ranked', route: makeRoute('NL', 'rotterdam', 'poznan') });
  sender.flap();
  while (sender.phase === 'playing') sender.tick();
  const { code } = encodeGhost(sender);
  await delayChunk(page, 'ghost-session', 2500);
  const decoded = page.waitForResponse(/ghost-session-[\w-]+\.js$/);
  await page.goto(`/?test=1&lang=pl&g=${code}`);
  await expect(page.locator('#sel-home option')).toHaveCount(15);
  await page.locator('#route-toggle').click();
  await page.locator('#sel-home').selectOption('DE');
  await expect(page.locator('#ghost-info')).toBeHidden();
  // Dekodowanie kończy się po zmianie trasy.
  await decoded;
  await page.waitForTimeout(300);
  await expect(page.locator('#ghost-info')).toBeHidden();
  await crash(page, testInfo.project.name);
  await expect(page.locator('#over-route')).not.toHaveText('Rotterdam → Poznań');
  await expect(page.locator('#over-ghost')).toBeHidden();
});

test('zapisany niepoprawny nick jest zastępowany (wynik offline trafia do kolejki bez wyjątku)', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('qa-seeded')) return;
    sessionStorage.setItem('qa-seeded', '1');
    localStorage.setItem('ce.settings', JSON.stringify({ home: 'BE', from: 'antwerpia', to: 'rzeszow', mode: 'ranked', nickId: 'zly-nick' }));
  });
  await openMenu(page);
  await startRun(page);
  // Brak sieci tylko dla kolejki rankingu (chunki zostają dostępne).
  await page.evaluate(() => Object.defineProperty(Navigator.prototype, 'onLine', { configurable: true, get: () => false }));
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ce.ranking.pending.v1') ?? '[]').length)).toBe(1);
  const queued = await page.evaluate(() => JSON.parse(localStorage.getItem('ce.ranking.pending.v1') ?? '[]')[0].nickId as string);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ce.settings') ?? '{}').nickId as string);
  expect(queued).not.toBe('zly-nick');
  expect(saved).toBe(queued);
});

baseTest('koniec przejazdu bez sieci: postęp się liczy, brak nieobsłużonych wyjątków z leniwych chunków', async ({ page, context }, testInfo) => {
  // Bez wspólnego strażnika konsoli: offline przeglądarka sama loguje nieudane pobrania zasobów.
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await openMenu(page);
  await startRun(page);
  await context.setOffline(true);
  await tapCanvas(page, testInfo.project.name);
  await expect(page.locator('#over')).toBeVisible({ timeout: 15_000 });
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ce.collection.progress.v1') ?? '{}')?.stats?.runs ?? 0)).toBe(1);
  await page.waitForTimeout(1000);
  await context.setOffline(false);
  expect(pageErrors).toEqual([]);
});

test.describe('pierwsze uruchomienie', () => {
  const FRESH = '/?lang=pl';

  test('świeży profil widzi onboarding także po przeładowaniu przed wyborem', async ({ page }) => {
    await page.goto(FRESH);
    await expect(page.locator('.ce-onboarding')).toBeVisible();
    await page.reload();
    await expect(page.locator('.ce-onboarding')).toBeVisible();
  });

  test('po wyborze kraju i miasta onboarding się nie powtarza, a trasa trafia do menu', async ({ page }) => {
    await page.goto(FRESH);
    const dialog = page.locator('.ce-onboarding');
    await expect(dialog).toBeVisible();
    await dialog.locator('button[data-home="DE"]').click();
    await dialog.locator('button[data-city-id="krakow"]').click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('#sel-home')).toHaveValue('DE');
    await expect(page.locator('#sel-to')).toHaveValue('krakow');
    await page.reload();
    await waitForMenuReady(page);
    await page.waitForTimeout(500);
    await expect(page.locator('.ce-onboarding')).toHaveCount(0);
  });

  test('gracz z rozegranymi przejazdami nie dostaje onboardingu', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('ce.settings', JSON.stringify({ home: 'NL', from: 'rotterdam', to: 'poznan', mode: 'ranked' }));
      localStorage.setItem('ce.best.ranked', JSON.stringify({ km: 120 }));
    });
    await page.goto(FRESH);
    await waitForMenuReady(page);
    await page.waitForTimeout(500);
    await expect(page.locator('.ce-onboarding')).toHaveCount(0);
    await expect(page.locator('#sel-home')).toHaveValue('NL');
  });

  test('onboarding nie wyskakuje nad przejazdem, gdy gracz wystartował przed jego wczytaniem', async ({ page }) => {
    await delayChunk(page, 'onboarding', 2500);
    const loaded = page.waitForResponse(/onboarding-[\w-]+\.js$/);
    await page.goto(FRESH);
    await expect(page.locator('#sel-home option')).toHaveCount(15);
    await page.locator('#btn-start').click();
    await expect(page.locator('#hud')).toBeVisible();
    await loaded;
    await page.waitForTimeout(500);
    await expect(page.locator('.ce-onboarding')).toHaveCount(0);
  });
});

test.describe('panele menu', () => {
  test('album otwiera się i zamyka (× i Escape)', async ({ page }) => {
    await openMenu(page);
    await page.locator('#btn-album').click();
    const album = page.locator('#album');
    await expect(album).toBeVisible();
    await expect(page.locator('#menu')).toBeHidden();
    await expect(album.getByRole('heading', { name: 'Album podróżnika' })).toBeVisible();
    await expect(album.locator('.ce-collection__postcard').first()).toBeVisible();
    await album.locator('.ce-collection__close').click();
    await expect(album).toBeHidden();
    await expect(album.locator('.ce-collection')).toHaveCount(0);
    await expect(page.locator('#menu')).toBeVisible();

    await page.locator('#btn-album').click();
    await expect(album.locator('.ce-collection')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(album).toBeHidden();
    await expect(album.locator('.ce-collection')).toHaveCount(0);
    await expect(page.locator('#menu')).toBeVisible();
  });

  test('zablokowanego auta nie da się wybrać w garażu', async ({ page }) => {
    await openMenu(page);
    await page.locator('#btn-garage').click();
    const garage = page.locator('#garage .ce-garage');
    await expect(garage).toBeVisible();
    const locked = garage.locator('.ce-garage__pick', { hasText: 'Mała Japonka' });
    await expect(locked).toBeDisabled();
    await expect(locked).toHaveText(/^🔒/);
    // Strzałkami da się obejrzeć zamknięte auto, ale nie zostaje wybrane.
    for (let i = 0; i < 4; i++) await garage.locator('.ce-garage__arrow').last().click();
    await expect(garage.locator('.ce-garage__skin-name')).toHaveText('Mała Japonka');
    await expect(garage.locator('.ce-garage__lock-hint')).toContainText('Odblokujesz po 500 km');
    await expect(locked).toHaveAttribute('aria-pressed', 'false');
    const skin = await page.evaluate(() => JSON.parse(localStorage.getItem('ce.settings') ?? '{}').skin ?? 'default');
    expect(skin).not.toBe('mala-japonka');
    await page.keyboard.press('Escape');
    await expect(page.locator('#garage')).toBeHidden();
    await expect(page.locator('#menu')).toBeVisible();
  });

  test('ustawienia zamyka Escape (także bez fokusu w panelu), a drugi Escape nie chowa menu', async ({ page }) => {
    await openMenu(page);
    await page.locator('#btn-settings').click();
    const dialog = page.getByRole('dialog', { name: 'Ustawienia' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('#menu')).toBeVisible();

    await page.locator('#btn-settings').click();
    await expect(dialog).toBeVisible();
    // Fokus poza panelem (np. po kliknięciu w tło): obsługuje to wspólny „wstecz”.
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('#menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(page.locator('#menu')).toBeVisible();
  });
});
