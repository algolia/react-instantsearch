/* eslint-disable import/no-commonjs */

module.exports = {
  // @TODO: Jest supports TypeScript by default in the next major (24.x.x). We
  // can remove the specific configuration once it's released.
  // https://github.com/facebook/jest/pull/7533
  roots: ['<rootDir>/packages'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '**/__tests__/**/*.(js|ts|tsx)',
    '**/?(*.)+(spec|test).(js|ts|tsx)',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
