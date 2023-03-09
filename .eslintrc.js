module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  'overrides': [],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['vue', '@typescript-eslint'],
  'rules': {
    'comma-dangle': 0,
    'array-bracket-spacing': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
    '@typescript-eslint/no-loop-func': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/typedef': 1,
    indent: 0,
  },
}
