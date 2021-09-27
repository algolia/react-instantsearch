module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/examples/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '^react-instantsearch-(.*)$':
      '<rootDir>/packages/react-instantsearch-$1/src/',
  },
};
