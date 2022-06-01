import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  InstantSearchHooksTestWrapper,
  wait,
  createInstantSearchTestWrapper,
} from '../../../../../test/utils';
import { useSearchBox } from '../../connectors/useSearchBox';
import { useSearchState } from '../useSearchState';

function SearchBox() {
  const { query } = useSearchBox({});
  return <>{query}</>;
}

describe('useSearchState', () => {
  test('returns the ui state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(() => useSearchState(), {
      wrapper,
    });

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      uiState: {
        indexName: {},
      },
      indexUiState: {},
      setUiState: expect.any(Function),
      setIndexUiState: expect.any(Function),
    });

    const setUiState = result.current.setUiState;
    const setIndexUiState = result.current.setIndexUiState;

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      uiState: {
        indexName: {},
      },
      indexUiState: {},
      setUiState,
      setIndexUiState,
    });
  });

  test('returns the ui state with initial state', async () => {
    const wrapper = createInstantSearchTestWrapper({
      initialUiState: {
        indexName: {
          query: 'iphone',
        },
      },
    });
    const { result, waitForNextUpdate } = renderHook(() => useSearchState(), {
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

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      uiState: {
        indexName: { query: 'iphone' },
      },
      indexUiState: { query: 'iphone' },
      setUiState: expect.any(Function),
      setIndexUiState: expect.any(Function),
    });

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      uiState: {
        indexName: { query: 'iphone' },
      },
      indexUiState: { query: 'iphone' },
      setUiState: expect.any(Function),
      setIndexUiState: expect.any(Function),
    });
  });

  test('returns a function to modify the whole state', async () => {
    function App() {
      const { uiState, setUiState } = useSearchState();

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
      const { indexUiState, setIndexUiState } = useSearchState();

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
