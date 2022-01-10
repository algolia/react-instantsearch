import { usePoweredBy } from '../usePoweredBy';

describe('usePoweredBy', () => {
  test('returns the connector render state', () => {
    const { url } = usePoweredBy();

    expect(url).toBe(
      `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby`
    );
  });
});
