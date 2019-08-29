import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pkg from './package.json';

const builds = [
  { format: 'esm', minify: false },
  { format: 'cjs', minify: false },
  { format: 'umd', minify: false },
  { format: 'umd', minify: true },
];
const extensions = [...DEFAULT_EXTENSIONS, '.ts'];

export default builds.map(({ format, minify }) => {
  const minExtension = minify ? '.min' : '';
  return {
    input: 'src/index.ts',
    output: {
      name: pkg.name,
      exports: 'named',
      file: `dist/${pkg.name}.${format}${minExtension}.js`,
      format,
      // globals: {}, // Necessary for externals libraries and umd format
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        rollupCommonJSResolveHack: true, // To be compatible with commonjs plugin
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      minify ? terser() : null,
    ],
  };
});
