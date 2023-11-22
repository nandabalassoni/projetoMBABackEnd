module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  globals: {
    NodeJS: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'import/extensions': ['error', 'never'],
    'no-use-before-define': ['error'],
    'linebreak-style': ['error', 'unix'],
    'consistent-return': 'off',
    'default-case': 'off',
    'no-unreachable': 'off',
    quotes: ['error', 'single'],
  },
}
