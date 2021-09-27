module.exports = {
  roots: ['<rootDir>/packages'],
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
