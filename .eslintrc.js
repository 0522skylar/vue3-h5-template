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
  'overrides': [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: false,
        },
      },
      rules: {
        'vue/no-v-html': 0,
        'vue/require-default-prop': 0,
        'vue/require-explicit-emits': 0,
        'vue/multi-word-component-names': 0,
        'vue/prefer-import-from-vue': 0,
        'vue/no-v-text-v-html-on-component': 0,
        'vue/html-self-closing': 0,
        'vue/no-multiple-template-root': 0,
        'vue/no-useless-template-attributes': 0,
        'vue/no-ref-as-operand': 0,
        'vue/no-setup-props-destructure': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/attribute-hyphenation': 0,
        'vue/v-slot-style': 0,
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 3,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/no-unused-vars': 0,
        'vue/no-reserved-component-names': 0,
        'vue/no-unused-components': 0,
        'vue/v-on-event-hyphenation': 0,
        'vue/valid-next-tick': 0,
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['vue', '@typescript-eslint'],
  'rules': {
    'comma-dangle': 0,
    'prefer-template': 0,
    'array-bracket-spacing': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
    '@typescript-eslint/no-loop-func': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/typedef': 1,
    indent: 0,
  },
}
