module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: [
      'error',
      { properties: 'never', ignoreDestructuring: true, ignoreImports: true }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'vue/multiline-html-element-content-newline': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-dangle': 'off',
    'vue/max-attributes-per-line': 'off'
    // "@typescript-eslint/comma-dangle": ["error", "only-multiline"]
  }
};
