module.exports = {
  extends: ['algolia/react', 'algolia/jest'],
  rules: {
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
};
