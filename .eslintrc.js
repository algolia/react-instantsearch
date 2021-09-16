/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: [
    'algolia',
    'algolia/jest',
    'algolia/react',
    'algolia/typescript',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        // The migration is an incremental process so we import TypeScript modules
        // from JavaScript files.
        // By default, `import/resolver` only supports JavaScript modules.
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-param-reassign': 'off',
    // @TODO: to remove once `eslint-config-algolia` ships the change
    'valid-jsdoc': 'off',
    // @TODO: remove once this is in `eslint-config-algolia`
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // @TODO: re-enable this once the code base is made for it
    '@typescript-eslint/consistent-type-assertions': 'off',
    // @TODO: re-enable once the rule is properly setup for monorepos
    // https://github.com/benmosher/eslint-plugin-import/issues/1103
    // https://github.com/benmosher/eslint-plugin-import/issues/1174
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['off'],
    '@typescript-eslint/camelcase': [
      'error',
      { allow: ['^EXPERIMENTAL_', 'free_shipping'] },
    ],
    'import/extensions': 'off',
    'eslint-comments/disable-enable-pair': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // This rule has issues with the TypeScript parser, but tsc catches
        // these sorts of errors anyway.
        // See: https://github.com/typescript-eslint/typescript-eslint/issues/342
        'no-undef': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['packages/react-instantsearch-core-next/**/*'],
      rules: {
        'react/prop-types': 'off',
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'always',
            groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
            pathGroups: [
              {
                pattern: '@/**/*',
                group: 'parent',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
      },
    },
  ],
};

module.exports = config;
