import { renderHook } from '@testing-library/react-hooks';

import { createInstantSearchTestWrapper } from '../../../../test/utils/index.js';
import { useSortBy } from '../useSortBy.js';

const items = [
  { label: 'Featured', value: 'indexName' },
  { label: 'Price (asc)', value: 'indexName_price_asc' },
  { label: 'Price (desc)', value: 'indexName_price_desc' },
];

describe('useSortBy', () => {
  test('returns the connector render state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () => useSortBy({ items }),
      { wrapper }
    );

    expect(result.current).toEqual({
      currentRefinement: 'indexName',
      options: items,
      refine: expect.any(Function),
      hasNoResults: expect.any(Boolean),
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      currentRefinement: 'indexName',
      options: items,
      refine: expect.any(Function),
      hasNoResults: expect.any(Boolean),
    });
  });
});
