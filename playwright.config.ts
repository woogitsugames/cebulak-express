import { defineConfig, devices } from '@playwright/test';

const output = process.env.E2E_RUN ? `run-${process.env.E2E_RUN}` : 'local';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  outputDir: `e2e/.results/${output}`,
  reporter: [
    ['list'],
    ['html', { outputFolder: `e2e/.report/${output}`, open: 'never' }],
    ['json', { outputFile: `e2e/.results/${output}/results.json` }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    serviceWorkers: 'block',
  },
  projects: [
    {
      name: 'Pixel 7 (Chromium)',
      testIgnore: /performance\.spec\.ts$/,
      use: { ...devices['Pixel 7'], browserName: 'chromium' },
    },
    {
      name: 'iPhone 14 (WebKit)',
      testIgnore: /performance\.spec\.ts$/,
      use: { ...devices['iPhone 14'], browserName: 'webkit' },
    },
    {
      name: 'Desktop 1280x800 (Chromium)',
      testIgnore: /performance\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'Slow 4G + CPU 4x (Chromium)',
      testMatch: /performance\.spec\.ts$/,
      use: { ...devices['Pixel 7'], browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
