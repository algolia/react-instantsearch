import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { createSearchClient } from '../../../../test/mock';
import { createInstantSearchTestWrapper } from '../../../../test/utils';
import { IndexContext } from '../IndexContext';
import { InstantSearch } from '../InstantSearch';
import { useConnector } from '../useConnector';
import { noop } from '../utils';

import type { Connector } from 'instantsearch.js';
import type { IndexWidget } from 'instantsearch.js/es/widgets/index/index';

type CustomSearchBoxConnector = {
  $$type: 'test.searchBox';
  renderState: {
    query: string;
    refine(value: string): void;
  };
};

const connectCustomSearchBox: Connector<
  CustomSearchBoxConnector,
  Record<string, never>
> =
  (renderFn, unmountFn = noop) =>
  (widgetParams) => {
    const refineRef = { current: noop };

    return {
      $$type: 'test.searchBox',
      init({ instantSearchInstance }) {
        renderFn(
          {
            query: 'query at init',
            refine: refineRef.current,
            instantSearchInstance,
            widgetParams,
          },
          true
        );
      },
      render({ instantSearchInstance, helper }) {
        refineRef.current = (value) => helper.setQuery(value).search();

        renderFn(
          {
            query: 'query',
            refine: refineRef.current,
            instantSearchInstance,
            widgetParams,
          },
          false
        );
      },
      dispose() {
        unmountFn();
      },
      getWidgetUiState(uiState, { searchParameters }) {
        return {
          ...uiState,
          query: searchParameters.query,
        };
      },
    };
  };

describe('useConnector', () => {
  test('returns the connector render state', async () => {
    const wrapper = createInstantSearchTestWrapper();

    const { result, waitForNextUpdate } = renderHook(
      () =>
        useConnector(
          connectCustomSearchBox,
          {},
          {
            query: '',
            refine: noop,
          }
        ),
      { wrapper }
    );

    // Initial render state
    expect(result.current).toEqual({ query: '', refine: noop });

    await waitForNextUpdate();

    // It should never be "query at init" because we skip the `init` step.
    expect(result.current).not.toEqual({
      query: 'query at init',
      refine: expect.any(Function),
    });

    // Render state provided by InstantSearch Core during `render`.
    expect(result.current).toEqual({
      query: 'query',
      refine: expect.any(Function),
    });
  });

  test('adds the widget to the parent index', () => {
    const searchClient = createSearchClient();
    let indexContext: IndexWidget | null = null;

    function CustomSearchBox() {
      const { query } = useConnector(
        connectCustomSearchBox,
        {},
        {
          query: '',
          refine: noop,
        }
      );

      return <div>{query}</div>;
    }

    function InstantSearchMock({ children }) {
      return (
        <InstantSearch searchClient={searchClient} indexName="indexName">
          <IndexContext.Consumer>
            {(value) => {
              indexContext = {
                ...value!,
                addWidgets: jest.fn(),
                removeWidgets: jest.fn(),
              };

              return (
                <IndexContext.Provider value={indexContext}>
                  {children}
                </IndexContext.Provider>
              );
            }}
          </IndexContext.Consumer>
        </InstantSearch>
      );
    }

    const { unmount } = render(
      <InstantSearchMock>
        <CustomSearchBox />
      </InstantSearchMock>
    );

    expect(indexContext!.addWidgets).toHaveBeenCalledTimes(1);
    expect(indexContext!.addWidgets).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ $$type: 'test.searchBox' }),
      ])
    );

    unmount();

    expect(indexContext!.removeWidgets).toHaveBeenCalledTimes(1);
    expect(indexContext!.removeWidgets).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ $$type: 'test.searchBox' }),
      ])
    );
  });
});
