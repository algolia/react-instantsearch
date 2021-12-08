import { InstantSearchSSRContext } from '../InstantSearchSSRContext.js';

describe('InstantSearchSSRContext', () => {
  test('exposes a displayName', () => {
    expect(InstantSearchSSRContext.displayName).toEqual('InstantSearchSSR');
  });
});
