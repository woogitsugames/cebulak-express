/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { pwaPlugin } from './scripts/pwa-plugin';

export default defineConfig({
  base: './',
  plugins: [pwaPlugin(), {
    // Na wolnym internecie kod gry ma pierwszeństwo przed grafikami menu (budżet pierwszej klatki).
    name: 'entry-fetchpriority',
    transformIndexHtml: (html) => html.replace(/<script type="module" crossorigin src=/, '<script type="module" crossorigin fetchpriority="high" src='),
  }],
  build: { target: 'es2020', assetsInlineLimit: 0 },
  test: { include: ['tests/**/*.test.ts'] },
});
