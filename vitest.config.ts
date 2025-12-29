import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    browser: {
      enabled: false,
      name: 'chrome', // or 'firefox', 'safari', etc.
    },
  },
});
