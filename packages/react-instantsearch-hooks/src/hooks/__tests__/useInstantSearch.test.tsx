import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { AlgoliaSearchHelper, SearchResults } from 'algoliasearch-helper';
import InstantSearch from 'instantsearch.js/es/lib/InstantSearch';
import React, { useEffect } from 'react';

import { createSearchClient } from '../../../../../test/mock';
import {
  createInstantSearchTestWrapper,
  InstantSearchHooksTestWrapper,
  wait,
} from '../../../../../test/utils';
import { useSearchBox } from '../../connectors/useSearchBox';
import { useInstantSearch } from '../useInstantSearch';

function SearchBox() {
  const { query } = useSearchBox({});

  return <>{query}</>;
}

describe('useInstantSearch', () => {
  describe('usage', () => {
    test('it errors when not nested in InstantSearch', () => {
      const { result } = renderHook(() => useInstantSearch());

      expect(result.error).toBeInstanceOf(Error);
      expect(result.error?.message).toMatchInlineSnapshot(`
        "[InstantSearch] Hooks must be used inside the <InstantSearch> component.

        They are not compatible with the \`react-instantsearch-core\` and \`react-instantsearch-dom\` packages, so make sure to use the <InstantSearch> component from \`react-instantsearch-hooks\`."
      `);
    });

    test('it returns all expected keys', () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result } = renderHook(() => useInstantSearch(), { wrapper });

      expect(Object.keys(result.current)).toEqual([
        'results',
        'scopedResults',
        'uiState',
        'setUiState',
        'indexUiState',
        'setIndexUiState',
        'use',
        'refresh',
        'search',
      ]);
    });
  });

  describe('results', () => {
    test('gives access to results', async () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result, waitForNextUpdate } = renderHook(
        () => useInstantSearch(),
        { wrapper }
      );

      // Initial render state from manual `getWidgetRenderState`
      expect(result.current).toEqual(
        expect.objectContaining({
          results: expect.any(SearchResults),
          scopedResults: [
            expect.objectContaining({
              helper: expect.any(AlgoliaSearchHelper),
              indexId: 'indexName',
              results: expect.any(SearchResults),
            }),
          ],
        })
      );

      await waitForNextUpdate();

      // InstantSearch.js state from the `render` lifecycle step
      expect(result.current).toEqual(
        expect.objectContaining({
          results: expect.any(SearchResults),
          scopedResults: [
            expect.objectContaining({
              helper: expect.any(AlgoliaSearchHelper),
              indexId: 'indexName',
              results: expect.any(SearchResults),
            }),
          ],
        })
      );
    });
  });

  describe('state', () => {
    test('returns the ui state', async () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result, waitForNextUpdate } = renderHook(
        () => useInstantSearch(),
        { wrapper }
      );

      // Initial render state from manual `getWidgetRenderState`
      expect(result.current).toEqual(
        expect.objectContaining({
          uiState: {
            indexName: {},
          },
          indexUiState: {},
          setUiState: expect.any(Function),
          setIndexUiState: expect.any(Function),
        })
      );

      const setUiState = result.current.setUiState;
      const setIndexUiState = result.current.setIndexUiState;

      await waitForNextUpdate();

      // InstantSearch.js state from the `render` lifecycle step
      expect(result.current).toEqual(
        expect.objectContaining({
          uiState: {
            indexName: {},
          },
          indexUiState: {},
          setUiState,
          setIndexUiState,
        })
      );
    });

    test('returns the ui state with initial state', async () => {
      const wrapper = createInstantSearchTestWrapper({
        initialUiState: {
          indexName: {
            query: 'iphone',
          },
        },
      });
      const { result, waitForNextUpdate } = renderHook(
        () => useInstantSearch(),
        {
          wrapper: ({ children }) =>
            wrapper({
              children: (
                <>
                  <SearchBox />
                  {children}
                </>
              ),
            }),
        }
      );

      // Initial render state from manual `getWidgetRenderState`
      expect(result.current).toEqual(
        expect.objectContaining({
          uiState: {
            indexName: { query: 'iphone' },
          },
          indexUiState: { query: 'iphone' },
          setUiState: expect.any(Function),
          setIndexUiState: expect.any(Function),
        })
      );

      await waitForNextUpdate();

      // InstantSearch.js state from the `render` lifecycle step
      expect(result.current).toEqual(
        expect.objectContaining({
          uiState: {
            indexName: { query: 'iphone' },
          },
          indexUiState: { query: 'iphone' },
          setUiState: expect.any(Function),
          setIndexUiState: expect.any(Function),
        })
      );
    });

    test('returns a function to modify the whole state', async () => {
      function App() {
        const { uiState, setUiState } = useInstantSearch();

        return (
          <>
            <button
              type="button"
              onClick={() => {
                setUiState({ indexName: { query: 'hey' } });
              }}
            >
              {uiState.indexName.query}
            </button>
            <SearchBox />
          </>
        );
      }

      const { container } = render(
        <InstantSearchHooksTestWrapper>
          <App />
        </InstantSearchHooksTestWrapper>
      );

      await wait(0);

      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<button type=\\"button\\"></button>"`
      );

      userEvent.click(container.querySelector('button')!);

      await wait(0);

      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<button type=\\"button\\">hey</button>hey"`
      );
    });

    test('returns a function to modify the index state', async () => {
      function App() {
        const { indexUiState, setIndexUiState } = useInstantSearch();

        return (
          <>
            <button
              type="button"
              onClick={() => {
                setIndexUiState({ query: 'hey' });
              }}
            >
              {indexUiState.query}
            </button>
            <SearchBox />
          </>
        );
      }

      const { container } = render(
        <InstantSearchHooksTestWrapper>
          <App />
        </InstantSearchHooksTestWrapper>
      );

      await wait(0);

      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<button type=\\"button\\"></button>"`
      );

      userEvent.click(container.querySelector('button')!);

      await wait(0);

      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<button type=\\"button\\">hey</button>hey"`
      );
    });
  });

  describe('middleware', () => {
    test('gives access use function', async () => {
      const wrapper = createInstantSearchTestWrapper();

      const subscribe = jest.fn();
      const onStateChange = jest.fn();
      const unsubscribe = jest.fn();
      const middleware = jest.fn(() => ({
        subscribe,
        onStateChange,
        unsubscribe,
      }));

      const { result, waitForNextUpdate, unmount } = renderHook(
        () => {
          const { use, search } = useInstantSearch();
          useEffect(() => use(middleware), [use]);

          return search;
        },
        {
          wrapper: ({ children }) =>
            wrapper({
              children: (
                <>
                  <SearchBox />
                  {children}
                </>
              ),
            }),
        }
      );

      // augmented once middleware was used
      expect(result.current.middleware).toEqual([
        {
          creator: middleware,
          instance: {
            onStateChange,
            subscribe,
            unsubscribe,
          },
        },
      ]);

      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(onStateChange).toHaveBeenCalledTimes(0);
      expect(unsubscribe).toHaveBeenCalledTimes(0);
      expect(middleware).toHaveBeenCalledTimes(1);

      await waitForNextUpdate();

      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(onStateChange).toHaveBeenCalledTimes(0);
      expect(unsubscribe).toHaveBeenCalledTimes(0);

      // simulate a change in query
      result.current.renderState.indexName.searchBox!.refine('new query');
      await waitForNextUpdate();

      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(onStateChange).toHaveBeenCalledTimes(1);
      expect(unsubscribe).toHaveBeenCalledTimes(0);

      unmount();

      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(onStateChange).toHaveBeenCalledTimes(1);
      // unsubscribe is first called by the parent InstantSearch unmounting
      // 🚨 dispose doesn't remove middleware (because otherwise routing would break)
      // then unuse is called by this widget itself unmounting.
      // if only the component with useInstantSearch is unmounted, unsubscribe is called once.
      expect(unsubscribe).toHaveBeenCalledTimes(2);

      // middleware was removed
      expect(result.current.middleware).toEqual([]);
    });
  });

  describe('refresh', () => {
    test('refreshes the search', async () => {
      const searchClient = createSearchClient({});
      function App() {
        const { refresh } = useInstantSearch();

        return (
          <>
            <button
              type="button"
              onClick={() => {
                refresh();
              }}
            >
              refresh
            </button>
          </>
        );
      }

      const { container } = render(
        <InstantSearchHooksTestWrapper searchClient={searchClient}>
          <App />
        </InstantSearchHooksTestWrapper>
      );

      await wait(0);

      expect(searchClient.search).toHaveBeenCalledTimes(1);

      userEvent.click(container.querySelector('button')!);

      expect(searchClient.search).toHaveBeenCalledTimes(2);
    });

    test('provides a stable reference', async () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result, waitForNextUpdate, rerender } = renderHook(
        () => useInstantSearch(),
        { wrapper }
      );

      expect(result.current.refresh).toEqual(expect.any(Function));

      const ref = result.current.refresh;

      await waitForNextUpdate();

      // reference has not changed
      expect(result.current.refresh).toEqual(ref);

      rerender();

      // reference has not changed
      expect(result.current.refresh).toEqual(ref);
    });
  });

  describe('other instantsearch access', () => {
    test('gives access to search instance', async () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result, waitForNextUpdate } = renderHook(
        () => useInstantSearch(),
        { wrapper }
      );

      // Initial render state from manual `getWidgetRenderState`
      expect(result.current).toEqual(
        expect.objectContaining({
          search: expect.any(InstantSearch),
        })
      );

      await waitForNextUpdate();

      // InstantSearch.js state from the `render` lifecycle step
      expect(result.current).toEqual(
        expect.objectContaining({
          search: expect.any(InstantSearch),
        })
      );
    });

    test('search instance is the same reference across renders', async () => {
      const wrapper = createInstantSearchTestWrapper();
      const { result, waitForNextUpdate, rerender } = renderHook(
        () => useInstantSearch(),
        { wrapper }
      );

      // Initial render state from manual `getWidgetRenderState`
      expect(result.current).toEqual(
        expect.objectContaining({
          search: expect.any(InstantSearch),
        })
      );
      const firstReference = result.current.search;

      await waitForNextUpdate();

      // InstantSearch.js state from the `render` lifecycle step
      expect(result.current).toEqual(
        expect.objectContaining({
          search: firstReference,
        })
      );

      rerender();

      expect(result.current).toEqual(
        expect.objectContaining({
          search: firstReference,
        })
      );
    });
  });
});
