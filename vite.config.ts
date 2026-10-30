/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { pwaPlugin } from './scripts/pwa-plugin';

export default defineConfig({
  base: './',
  plugins: [pwaPlugin()],
  build: { target: 'es2020', assetsInlineLimit: 0 },
  test: { include: ['tests/**/*.test.ts'] },
});
