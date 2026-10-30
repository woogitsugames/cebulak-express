import { defineConfig, devices } from '@playwright/test';

/** Przeglądarki i urządzenia z zadania 22. Serwujemy build produkcyjny. */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  outputDir: './e2e/.results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'e2e/.report', open: 'never' }],
    ['json', { outputFile: 'e2e/.results/results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Pixel 7 (Chromium)',
      use: { ...devices['Pixel 7'], browserName: 'chromium' },
    },
    {
      name: 'iPhone 14 (WebKit)',
      use: { ...devices['iPhone 14'], browserName: 'webkit' },
    },
    {
      name: 'Desktop 1280x800 (Chromium)',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
