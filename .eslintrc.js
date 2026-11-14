module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
  },
  overrides: [
    {
      // Node.js command-line tools (not shipped to the browser): sequential network calls are
      // intended, and jsdom is a devDependency.
      files: ['tools/importer/da-sync/*.mjs'],
      env: { browser: false, node: true },
      rules: {
        'import/extensions': ['error', { mjs: 'always' }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-await-in-loop': 'off',
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-console': 'off',
      },
    },
  ],
};
