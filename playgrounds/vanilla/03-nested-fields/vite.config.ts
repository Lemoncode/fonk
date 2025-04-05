import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
});
