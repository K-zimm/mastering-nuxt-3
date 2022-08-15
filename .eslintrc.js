module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-len': ['off', { code: 120 }],
    'operator-linebreak': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    'implicit-arrow-linebreak': 'off',
    'no-restricted-syntax': ['error'],
    'no-await-in-loop': 'off',
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }],
    'vue/no-v-html': 'off',
    'no-param-reassign': 'off',
    'vue/script-setup-no-uses-vars': 'off'
  }
};
