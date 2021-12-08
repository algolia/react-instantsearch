module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './scripts/jest/setupTests.ts',
  ],
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
    // for es modules we import .js of TS files, which jest-resolve doesn't deal with by default
    // to solve this, we strip the extension, and it can be resolved
    '^(\\..*)\\.js$': '$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(instantsearch.js)/)'],
  globals: {
    __DEV__: true,
  },
};
