import { renderHook } from '@testing-library/react-hooks';

import { createInstantSearchTestWrapper } from '../../../../test/utils';
import { useCurrentRefinements } from '../useCurrentRefinements';

describe('useCurrentRefinements', () => {
  test('returns the connector render state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () => useCurrentRefinements(),
      {
        wrapper,
      }
    );

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      items: [],
      canRefine: false,
      refine: expect.any(Function),
      createURL: expect.any(Function),
    });

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      items: [],
      canRefine: false,
      refine: expect.any(Function),
      createURL: expect.any(Function),
    });
  });
});
