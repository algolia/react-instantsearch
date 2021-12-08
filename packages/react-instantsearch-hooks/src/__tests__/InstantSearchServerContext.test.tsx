import { InstantSearchServerContext } from '../InstantSearchServerContext.js';

describe('InstantSearchServerContext', () => {
  test('exposes a displayName', () => {
    expect(InstantSearchServerContext.displayName).toEqual(
      'InstantSearchServer'
    );
  });
});
