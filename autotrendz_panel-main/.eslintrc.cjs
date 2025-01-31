/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    'react/no-unknown-property': 'off',
    'no-use-before-define': [0],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-undef': 'off',
    'no-unused-vars': [0],
    'no-redeclare': 'off',
    camelcase: 'off',
    'no-useless-constructor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 'off',
    'space-before-function-paren': 'off',
    'multiline-ternary': 'off'
  }
}
