module.exports = {
  rules: {
    'import/extensions': ['error', 'always'],
    // conflicts with import/extensions
    'import/no-unresolved': ['off'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
