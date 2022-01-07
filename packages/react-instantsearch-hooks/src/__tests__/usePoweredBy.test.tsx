import { usePoweredBy } from '../usePoweredBy';

describe('usePoweredBy', () => {
  test('returns the connector render state', async () => {
    const { url } = usePoweredBy();

    expect(url).toBe(
      `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=${
        window.location?.hostname || ''
      }&utm_campaign=poweredby`
    );
  });
});
