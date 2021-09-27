import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { createSearchClient } from '../../../../test/mock';
import { InstantSearch } from '../InstantSearch';
import { useConnector } from '../useConnector';
import { noop } from '../utils';

import type { Connector } from 'instantsearch.js';

type CustomSearchBoxConnector = {
  $$type: 'test.searchBox';
  renderState: {
    query: string;
  };
};

const connectCustomSearchBox: Connector<
  CustomSearchBoxConnector,
  Record<string, never>
> =
  (renderFn, unmountFn = noop) =>
  (widgetParams) => ({
    $$type: 'test.searchBox',
    init({ instantSearchInstance }) {
      renderFn(
        { query: 'query at init', instantSearchInstance, widgetParams },
        true
      );
    },
    render({ instantSearchInstance }) {
      renderFn({ query: 'query', instantSearchInstance, widgetParams }, false);
    },
    dispose() {
      unmountFn();
    },
  });

describe('useConnector', () => {
  test('returns the connector render state', async () => {
    const searchClient = createSearchClient();
    const wrapper = ({ children }) => (
      <InstantSearch searchClient={searchClient} indexName="indexName">
        {children}
      </InstantSearch>
    );
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useConnector(
          connectCustomSearchBox,
          {},
          {
            query: '',
          }
        ),
      { wrapper }
    );

    // Initial render state
    expect(result.current).toEqual({ query: '' });

    await waitForNextUpdate();

    // It should never be "query at init" because we skip the `init` step.
    expect(result.current).not.toEqual({ query: 'query at init' });

    // Render state provided by InstantSearch Core during `render`.
    expect(result.current).toEqual({ query: 'query' });
  });
});
