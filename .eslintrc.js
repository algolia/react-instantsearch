module.exports = {
  extends: ['algolia/react', 'algolia/jest'],
  rules: {
    'max-params': ['error', 7],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: ['./', './packages/*'] },
    ],
  },
};
