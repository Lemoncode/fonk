import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
});
