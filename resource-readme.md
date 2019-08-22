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
>
> > resolve(),
> > commonjs(),
> > typescript(),
> > babel(),
> > ]

- Babel: (rollup-plugin-babel)[https://github.com/rollup/rollup-plugin-babel]

- Commonjs: (rollup-plugin-commonjs)[https://github.com/rollup/rollup-plugin-commonjs]

- Node resolve: (rollup-plugin-node-resolve)[https://github.com/rollup/rollup-plugin-node-resolve]

# ESLINT

Post: https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

- Core libraries:

```bash
npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

- Config file:

_.eslintrc.js_

```javascript
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

- With react:

```bash
npm i eslint-plugin-react -D
```

- Config file:

_.eslintrc.js_

```javascript
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
```

- With `prettier`:

```bash
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

- Config file:

_.eslintrc.js_

```javascript
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
};
```

- To ignore folder and files: .eslintignore
