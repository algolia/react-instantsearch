import { renderHook } from '@testing-library/react-hooks';

import { createInstantSearchTestWrapper } from '../../../../test/utils';
import { usePoweredBy } from '../usePoweredBy';

describe('usePoweredBy', () => {
  test('returns the connector render state', async () => {
    const hostname = window.location?.hostname || '';
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(() => usePoweredBy(), {
      wrapper,
    });

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      url: `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=${hostname}&utm_campaign=poweredby`,
    });

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      url: `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=${hostname}&utm_campaign=poweredby`,
    });
  });
});
