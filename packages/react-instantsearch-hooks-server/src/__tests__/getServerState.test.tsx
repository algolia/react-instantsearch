/**
 * @jest-environment node
 */

import React, { version as ReactVersion } from 'react';
import { renderToString } from 'react-dom/server';
import {
  InstantSearch,
  InstantSearchSSRProvider,
  Index,
  DynamicWidgets,
  version,
  useSearchBox,
} from 'react-instantsearch-hooks';
import { Hits, RefinementList } from 'react-instantsearch-hooks-web';

import {
  createMultiSearchResponse,
  createSearchClient,
  createSingleSearchResponse,
} from '../../../../test/mock';
import { getServerState } from '../getServerState';

import type {
  InstantSearchServerState,
  InstantSearchProps,
} from 'react-instantsearch-hooks';

function SearchBox() {
  const { query } = useSearchBox();

  return (
    <div className="ais-SearchBox">
      <form action="" className="ais-SearchBox-form" noValidate>
        <input className="ais-SearchBox-input" type="search" defaultValue={}={query}  />
      </form>
    </div>
  );
}

function Hit({ hit }) {
  return <>{hit.objectID}</>;
}

type CreateTestEnvironmentProps = {
  searchClient: InstantSearchProps['searchClient'];
  initialUiState?: InstantSearchProps['initialUiState'];
};

function createTestEnvironment({
  searchClient,
  initialUiState = {
    instant_search: {
      query: 'iphone',
      refinementList: {
        brand: ['Apple'],
      },
    },
    instant_search_price_asc: {
      query: 'iphone',
      refinementList: {
        brand: ['Apple'],
      },
    },
  },
}: CreateTestEnvironmentProps) {
  function Search({ children }: { children?: React.ReactNode }) {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        initialUiState={initialUiState}
      >
        {children}
        <RefinementList attribute="brand" />
        <SearchBox />

        <h2>instant_search</h2>
        <Hits hitComponent={Hit} />

        <Index indexName="instant_search_price_asc">
          <h2>instant_search_price_asc</h2>
          <Hits hitComponent={Hit} />

          <Index indexName="instant_search_rating_desc">
            <h2>instant_search_rating_desc</h2>
            <Hits hitComponent={Hit} />
          </Index>
        </Index>

        <Index indexName="instant_search_price_desc">
          <h2>instant_search_price_desc</h2>
          <Hits hitComponent={Hit} />
        </Index>
      </InstantSearch>
    );
  }

  function App({
    serverState,
    children,
  }: {
    serverState?: InstantSearchServerState;
    children?: React.ReactNode;
  }) {
    return (
      <InstantSearchSSRProvider {...serverState}>
        <Search>{children}</Search>
      </InstantSearchSSRProvider>
    );
  }

  return {
    App,
  };
}

describe('getServerState', () => {
  test('throws without <InstantSearch> component', async () => {
    function App() {
      return null;
    }

    await expect(
      getServerState(<App />)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to retrieve InstantSearch's server state in \`getServerState()\`. Did you mount the <InstantSearch> component?"`
    );
  });

  test('throws when the search client errors', async () => {
    const searchClient = createSearchClient({
      search: () => {
        throw new Error('Search client error');
      },
    });
    const { App } = createTestEnvironment({ searchClient });

    await expect(getServerState(<App />)).rejects.toThrow(
      /Search client error/
    );
  });

  test('adds the server user agents', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({ searchClient });

    await getServerState(<App />);

    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react (${ReactVersion})`
    );
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react-instantsearch (${version})`
    );
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react-instantsearch-hooks (${version})`
    );
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `react-instantsearch-server (${version})`
    );
  });

  test('calls search with widgets search parameters', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({ searchClient });

    await getServerState(<App />);

    expect(searchClient.search).toHaveBeenCalledTimes(1);
    expect(searchClient.search).toHaveBeenCalledWith([
      {
        indexName: 'instant_search',
        params: {
          facetFilters: [['brand:Apple']],
          facets: ['brand'],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          maxValuesPerFacet: 10,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search',
        params: {
          analytics: false,
          attributesToHighlight: [],
          attributesToRetrieve: [],
          attributesToSnippet: [],
          clickAnalytics: false,
          facets: 'brand',
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: 1,
          maxValuesPerFacet: 10,
          query: 'iphone',
          page: 0,
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_price_asc',
        params: {
          facetFilters: [['brand:Apple']],
          facets: ['brand'],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          maxValuesPerFacet: 10,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_price_asc',
        params: {
          analytics: false,
          attributesToHighlight: [],
          attributesToRetrieve: [],
          attributesToSnippet: [],
          clickAnalytics: false,
          facets: 'brand',
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: 1,
          maxValuesPerFacet: 10,
          page: 0,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_rating_desc',
        params: {
          facetFilters: [['brand:Apple']],
          facets: ['brand'],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          maxValuesPerFacet: 10,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_rating_desc',
        params: {
          analytics: false,
          attributesToHighlight: [],
          attributesToRetrieve: [],
          attributesToSnippet: [],
          clickAnalytics: false,
          facets: 'brand',
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: 1,
          maxValuesPerFacet: 10,
          page: 0,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_price_desc',
        params: {
          facetFilters: [['brand:Apple']],
          facets: ['brand'],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          maxValuesPerFacet: 10,
          query: 'iphone',
          tagFilters: '',
        },
      },
      {
        indexName: 'instant_search_price_desc',
        params: {
          analytics: false,
          attributesToHighlight: [],
          attributesToRetrieve: [],
          attributesToSnippet: [],
          clickAnalytics: false,
          facets: 'brand',
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: 1,
          maxValuesPerFacet: 10,
          page: 0,
          query: 'iphone',
          tagFilters: '',
        },
      },
    ]);
  });

  test('returns initialResults', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({ searchClient });

    const serverState = await getServerState(<App />);

    expect(Object.keys(serverState.initialResults)).toHaveLength(4);
    expect(serverState.initialResults).toMatchSnapshot();
  });

  test('searches twice (cached) with dynamic widgets', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({ searchClient, initialUiState: {} });

    await getServerState(
      <App>
        <DynamicWidgets fallbackComponent={RefinementList} />
      </App>
    );

    expect(searchClient.search).toHaveBeenCalledTimes(2);
    // both calls are the same, so they're cached
    expect((searchClient.search as jest.Mock).mock.calls[0][0]).toEqual(
      (searchClient.search as jest.Mock).mock.calls[1][0]
    );
  });

  test('searches twice (cached) with dynamic widgets inside index', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({ searchClient, initialUiState: {} });

    await getServerState(
      <App>
        <Index indexName="something">
          <DynamicWidgets fallbackComponent={RefinementList} />
        </Index>
      </App>
    );

    expect(searchClient.search).toHaveBeenCalledTimes(2);
    // both calls are the same, so they're cached
    expect((searchClient.search as jest.Mock).mock.calls[0][0]).toEqual(
      (searchClient.search as jest.Mock).mock.calls[1][0]
    );
  });

  test('searches twice with dynamic widgets and a refinement', async () => {
    const searchClient = createSearchClient({});
    const { App } = createTestEnvironment({
      searchClient,
      initialUiState: {
        instant_search: {
          refinementList: {
            categories: ['refined!'],
          },
        },
      },
    });

    await getServerState(
      <App>
        <DynamicWidgets fallbackComponent={RefinementList} />
      </App>
    );

    expect(searchClient.search).toHaveBeenCalledTimes(2);

    // first query doesn't have the fallback widget mounted yet
    expect((searchClient.search as jest.Mock).mock.calls[0][0][0]).toEqual({
      indexName: 'instant_search',
      params: {
        facets: ['*'],
        highlightPostTag: '__/ais-highlight__',
        highlightPreTag: '__ais-highlight__',
        maxValuesPerFacet: 20,
        query: '',
        tagFilters: '',
      },
    });

    // second query does have the fallback widget mounted, and thus also the refinement
    expect((searchClient.search as jest.Mock).mock.calls[1][0][0]).toEqual({
      indexName: 'instant_search',
      params: {
        facetFilters: [['categories:refined!']],
        facets: ['*'],
        highlightPostTag: '__/ais-highlight__',
        highlightPreTag: '__ais-highlight__',
        maxValuesPerFacet: 20,
        query: '',
        tagFilters: '',
      },
    });
  });

  test('returns HTML from server state', async () => {
    const searchClient = createSearchClient({
      search: jest.fn((requests) =>
        Promise.resolve(
          createMultiSearchResponse(
            ...requests.map(() =>
              createSingleSearchResponse({
                hits: [{ objectID: '1' }, { objectID: '2' }],
              })
            )
          )
        )
      ),
    });
    const { App } = createTestEnvironment({ searchClient });

    const serverState = await getServerState(<App />);
    const html = renderToString(<App serverState={serverState} />);

    expect(html).toMatchInlineSnapshot(`
      <div class="ais-RefinementList ais-RefinementList--noRefinement">
        <ul class="ais-RefinementList-list">
        </ul>
      </div>
      <div class="ais-SearchBox">
        <form action
              class="ais-SearchBox-form"
              novalidate
        >
          <input class="ais-SearchBox-input"
                 type="search"
                 value="iphone"
          >
        </form>
      </div>
      <h2>
        instant_search
      </h2>
      <div class="ais-Hits">
        <ol class="ais-Hits-list">
          <li class="ais-Hits-item">
            1
          </li>
          <li class="ais-Hits-item">
            2
          </li>
        </ol>
      </div>
      <h2>
        instant_search_price_asc
      </h2>
      <div class="ais-Hits">
        <ol class="ais-Hits-list">
          <li class="ais-Hits-item">
            1
          </li>
          <li class="ais-Hits-item">
            2
          </li>
        </ol>
      </div>
      <h2>
        instant_search_rating_desc
      </h2>
      <div class="ais-Hits">
        <ol class="ais-Hits-list">
          <li class="ais-Hits-item">
            1
          </li>
          <li class="ais-Hits-item">
            2
          </li>
        </ol>
      </div>
      <h2>
        instant_search_price_desc
      </h2>
      <div class="ais-Hits">
        <ol class="ais-Hits-list">
          <li class="ais-Hits-item">
            1
          </li>
          <li class="ais-Hits-item">
            2
          </li>
        </ol>
      </div>
    `);
  });
});
