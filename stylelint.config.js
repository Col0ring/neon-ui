const prettierConfig = require('./prettier.config')
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-less',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'prettier/prettier': [true, prettierConfig],
    'no-invalid-position-at-import-rule': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: 'plugin' }],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  ignoreFiles: [
    '**/node_modules/**/*',
    '**/es/**/*',
    '**/lib/**/*',
    '**/docs-dist/**/*',
    '**/.umi/**/*',
  ],
}
