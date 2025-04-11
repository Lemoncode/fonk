import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    coverage: {
      exclude: [...defaultExclude, './config/**', './src/**/index.ts', './src/**/*model.ts'],
    },
  },
});
