// lint rule disabled, as due to disabling no-unresolved and having .js extensions
// eslint can no longer know that warnCache actually is exported (and ts can't)
// help here either.
// eslint-disable-next-line import/named
import { warnCache } from '../../packages/react-instantsearch-hooks/src/utils';
import { toWarnDev } from './matchers';

expect.extend({ toWarnDev });

// We hide console warnings to not pollute the test logs.
global.console.warn = jest.fn();

beforeEach(() => {
  // We reset the log's cache for our log assertions to be isolated in each test.
  warnCache.current = {};
});
