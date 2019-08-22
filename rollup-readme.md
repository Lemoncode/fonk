# Rollup

https://rollupjs.org/guide/en/

# API

- output.format: [link](https://rollupjs.org/guide/en/#core-functionality) and search `output.format`

- output.globals: [link](https://rollupjs.org/guide/en/#core-functionality) and search `output.globals`. Required for `umd/iief` formats.

- output.exports: [link](https://rollupjs.org/guide/en/#core-functionality) and search `output.exports`

# Plugins

- Typescript: (rollup-plugin-typescript2)[https://github.com/ezolenko/rollup-plugin-typescript2]. We could use with `rollup-plugin-babel`, `rollup-plugin-commonjs` and `rollup-plugin-node-resolve`.

> It's IMPORTANT the order when we use it
> plugins: [
> > resolve(),
> > commonjs(),
> > typescript(),
> > babel(),
> > ]

- Babel: (rollup-plugin-babel)[https://github.com/rollup/rollup-plugin-babel]

- Commonjs: (rollup-plugin-commonjs)[https://github.com/rollup/rollup-plugin-commonjs]

- Node resolve: (rollup-plugin-node-resolve)[https://github.com/rollup/rollup-plugin-node-resolve]
