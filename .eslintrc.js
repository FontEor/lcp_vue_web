module.exports = {
  root: true,
  env: {
    node: true
  },
  settings: {
    settings: {
      'import/resolver': {
        node: {
          paths: ['src']
        }
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'lines-between-class-members': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-empty-function': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
