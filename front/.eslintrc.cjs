/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-empty-function': 0,
    'no-return-await': 2,
    'javascript.suggestionActions.enabled': 0,
    'typescript.suggestionActions.enabled': 0,
    curly: 0,
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-vars': 0,
    'prettier/prettier': 0,
    'vue/multi-word-component-names': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
