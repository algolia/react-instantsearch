import { renderHook } from '@testing-library/react-hooks';
import { AlgoliaSearchHelper, SearchResults } from 'algoliasearch-helper';
import React from 'react';
import { SearchBox } from 'react-instantsearch-hooks-web';

import {
  createMultiSearchResponse,
  createSearchClient,
} from '../../../../../test/mock';
import { createInstantSearchTestWrapper } from '../../../../../test/utils';
import { useSearchResults } from '../useSearchResults';

describe('useSearchResults', () => {
  test('returns the connector render state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(() => useSearchResults(), {
      wrapper: ({ children }) =>
        wrapper({
          children: (
            <>
              <SearchBox />
              {children}
            </>
          ),
        }),
    });

    // Initial render
    expect(result.current).toEqual({
      results: expect.any(SearchResults),
      scopedResults: [
        expect.objectContaining({
          helper: expect.any(AlgoliaSearchHelper),
          indexId: 'indexName',
          results: expect.any(SearchResults),
        }),
      ],
    });
    expect(result.current.results.__isArtificial).toEqual(true);

    await waitForNextUpdate();

    // Update caused by <SearchBox>
    expect(result.current).toEqual({
      results: expect.any(SearchResults),
      scopedResults: [
        expect.objectContaining({
          helper: expect.any(AlgoliaSearchHelper),
          indexId: 'indexName',
          results: expect.any(SearchResults),
        }),
      ],
    });
    expect(result.current.results.__isArtificial).toBeUndefined();
  });

  test('should not return null results when first search is stalled', async () => {
    const wrapper = createInstantSearchTestWrapper({
      stalledSearchDelay: 0,
      searchClient: createSearchClient({
        search: async () => {
          // Simulate a stalled search
          await new Promise((resolve) => setTimeout(resolve, 50));

          return createMultiSearchResponse();
        },
      }),
    });
    const { result, waitForNextUpdate } = renderHook(() => useSearchResults(), {
      wrapper: ({ children }) =>
        wrapper({
          children: (
            <>
              <SearchBox />
              {children}
            </>
          ),
        }),
    });

    // Initial render
    expect(result.current).toEqual({
      results: expect.any(SearchResults),
      scopedResults: [
        expect.objectContaining({
          helper: expect.any(AlgoliaSearchHelper),
          indexId: 'indexName',
          results: expect.any(SearchResults),
        }),
      ],
    });
    expect(result.current.results.__isArtificial).toEqual(true);

    await waitForNextUpdate();

    // Update caused by <SearchBox>
    expect(result.current.results).not.toBeNull();
  });
});
