import { TextEncoder, TextDecoder } from 'util';
import { warnCache } from '../../packages/react-instantsearch-hooks/src/lib/warn';
import { toWarnDev } from './matchers';

expect.extend({ toWarnDev });

// We hide console warnings to not pollute the test logs.
global.console.warn = jest.fn();

beforeEach(() => {
  // We reset the log's cache for our log assertions to be isolated in each test.
  warnCache.current = {};
});

// See https://github.com/inrupt/solid-client-authn-js/issues/1676#issuecomment-917016646
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
