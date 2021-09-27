import { render } from '@testing-library/react';
import { InstantSearch as InstantSearchType } from 'instantsearch.js';
// eslint-disable-next-line import/named
import { IndexWidget } from 'instantsearch.js/es/widgets/index/index';
import React, { version as ReactVersion } from 'react';

import { createSearchClient } from '../../../../test/mock';
import { IndexContext } from '../IndexContext';
import { InstantSearch } from '../InstantSearch';
import { InstantSearchContext } from '../InstantSearchContext';
import version from '../version';

describe('InstantSearch', () => {
  test('renders children', () => {
    const searchClient = createSearchClient();

    const { container } = render(
      <InstantSearch indexName="indexName" searchClient={searchClient}>
        Children
      </InstantSearch>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        Children
      </div>
    `);
  });

  test('provides the search instance', () => {
    const searchClient = createSearchClient();
    let searchContext: InstantSearchType | null = null;

    render(
      <InstantSearch indexName="indexName" searchClient={searchClient}>
        <InstantSearchContext.Consumer>
          {context => {
            searchContext = context;
            return null;
          }}
        </InstantSearchContext.Consumer>
      </InstantSearch>
    );

    expect(searchContext).toEqual(
      expect.objectContaining({
        start: expect.any(Function),
        dispose: expect.any(Function),
        addWidgets: expect.any(Function),
        removeWidgets: expect.any(Function),
      })
    );
  });

  test('provides the main index', () => {
    const searchClient = createSearchClient();
    let indexContext: IndexWidget | null = null;

    render(
      <InstantSearch indexName="indexName" searchClient={searchClient}>
        <IndexContext.Consumer>
          {context => {
            indexContext = context;
            return null;
          }}
        </IndexContext.Consumer>
      </InstantSearch>
    );

    expect(indexContext).toEqual(
      expect.objectContaining({
        $$type: 'ais.index',
        addWidgets: expect.any(Function),
        removeWidgets: expect.any(Function),
      })
    );
  });

  test('attaches users agents', () => {
    const searchClient = createSearchClient();

    render(<InstantSearch indexName="indexName" searchClient={searchClient} />);

    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react (${ReactVersion})`
    );
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react-instantsearch-core (${version})`
    );
  });

  test('starts the search on mount', () => {
    const searchClient = createSearchClient();
    let searchContext: InstantSearchType | null = null;

    render(
      <InstantSearch indexName="indexName" searchClient={searchClient}>
        <InstantSearchContext.Consumer>
          {context => {
            searchContext = context;
            return null;
          }}
        </InstantSearchContext.Consumer>
      </InstantSearch>
    );

    expect(searchContext!.started).toEqual(true);
  });

  test('diposes the search on unmount', () => {
    const searchClient = createSearchClient();
    let searchContext: InstantSearchType | null = null;

    const { unmount } = render(
      <InstantSearch indexName="indexName" searchClient={searchClient}>
        <InstantSearchContext.Consumer>
          {context => {
            searchContext = context;
            return null;
          }}
        </InstantSearchContext.Consumer>
      </InstantSearch>
    );

    unmount();

    expect(searchContext!.started).toEqual(false);
  });
});