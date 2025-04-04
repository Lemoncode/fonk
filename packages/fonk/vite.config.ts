import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Fonk',
      fileName: 'index',
    },
  },
  plugins: [externalizeDeps(), dts({ rollupTypes: true, tsconfigPath: './tsconfig.dts.json' })],
});
