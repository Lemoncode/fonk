import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
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
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
              version: pkg.dependencies['@babel/runtime'],
            },
          ],
        ],
      }),
      minify ? terser() : null,
    ],
  };
});
