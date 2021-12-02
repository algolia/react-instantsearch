/**
 * @jest-environment node
 */

import React, { version as ReactVersion } from 'react';

import { createSearchClient } from '../../../../test/mock';
import {
  InstantSearch,
  InstantSearchSSRProvider,
  Index,
  useHits,
  useRefinementList,
  useSearchBox,
  version,
} from 'react-instantsearch-hooks';
import { getServerState } from '../getServerState';

import type {
  InstantSearchServerState,
  UseRefinementListProps,
} from 'react-instantsearch-hooks';
import type algoliasearch from 'algoliasearch/lite';

type SearchClient = ReturnType<typeof algoliasearch>;

type CreateTestEnvironmentProps = {
  searchClient: SearchClient;
};

function createTestEnvironment({ searchClient }: CreateTestEnvironmentProps) {
  function Search() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        initialUiState={{
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
        }}
      >
        <RefinementList attribute="brand" />
        <SearchBox />
        <Hits />

        <Index indexName="instant_search_price_asc">
          <Hits />

          <Index indexName="instant_search_rating_desc">
            <Hits />
          </Index>
        </Index>

        <Index indexName="instant_search_price_desc">
          <Hits />
        </Index>
      </InstantSearch>
    );
  }

  function App({ serverState }: { serverState?: InstantSearchServerState }) {
    return (
      <InstantSearchSSRProvider {...serverState}>
        <Search />
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
    const searchClient = createSearchClient();
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
    const searchClient = createSearchClient();
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
    const searchClient = createSearchClient();
    const { App } = createTestEnvironment({ searchClient });

    const serverState = await getServerState(<App />);

    expect(Object.keys(serverState.initialResults)).toHaveLength(4);
    expect(serverState.initialResults).toMatchInlineSnapshot(`
Object {
  "instant_search": Object {
    "results": Array [
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3AApple%22%5D%5D",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=1&page=0&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=brand",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
    ],
    "state": Object {
      "disjunctiveFacets": Array [
        "brand",
      ],
      "disjunctiveFacetsRefinements": Object {
        "brand": Array [
          "Apple",
        ],
      },
      "facets": Array [],
      "facetsExcludes": Object {},
      "facetsRefinements": Object {},
      "hierarchicalFacets": Array [],
      "hierarchicalFacetsRefinements": Object {},
      "highlightPostTag": "__/ais-highlight__",
      "highlightPreTag": "__ais-highlight__",
      "index": "instant_search",
      "maxValuesPerFacet": 10,
      "numericRefinements": Object {},
      "query": "iphone",
      "tagRefinements": Array [],
    },
  },
  "instant_search_price_asc": Object {
    "results": Array [
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_price_asc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3AApple%22%5D%5D",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_price_asc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=1&page=0&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=brand",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
    ],
    "state": Object {
      "disjunctiveFacets": Array [
        "brand",
      ],
      "disjunctiveFacetsRefinements": Object {
        "brand": Array [
          "Apple",
        ],
      },
      "facets": Array [],
      "facetsExcludes": Object {},
      "facetsRefinements": Object {},
      "hierarchicalFacets": Array [],
      "hierarchicalFacetsRefinements": Object {},
      "highlightPostTag": "__/ais-highlight__",
      "highlightPreTag": "__ais-highlight__",
      "index": "instant_search_price_asc",
      "maxValuesPerFacet": 10,
      "numericRefinements": Object {},
      "query": "iphone",
      "tagRefinements": Array [],
    },
  },
  "instant_search_price_desc": Object {
    "results": Array [
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_price_desc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3AApple%22%5D%5D",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_price_desc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=1&page=0&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=brand",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
    ],
    "state": Object {
      "disjunctiveFacets": Array [
        "brand",
      ],
      "disjunctiveFacetsRefinements": Object {
        "brand": Array [
          "Apple",
        ],
      },
      "facets": Array [],
      "facetsExcludes": Object {},
      "facetsRefinements": Object {},
      "hierarchicalFacets": Array [],
      "hierarchicalFacetsRefinements": Object {},
      "highlightPostTag": "__/ais-highlight__",
      "highlightPreTag": "__ais-highlight__",
      "index": "instant_search_price_desc",
      "maxValuesPerFacet": 10,
      "numericRefinements": Object {},
      "query": "iphone",
      "tagRefinements": Array [],
    },
  },
  "instant_search_rating_desc": Object {
    "results": Array [
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_rating_desc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3AApple%22%5D%5D",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
      Object {
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "hits": Array [],
        "hitsPerPage": 20,
        "index": "instant_search_rating_desc",
        "nbHits": 0,
        "nbPages": 0,
        "page": 0,
        "params": "maxValuesPerFacet=10&query=iphone&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=1&page=0&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=brand",
        "processingTimeMS": 0,
        "query": "",
        "renderingContent": Object {
          "facetOrdering": Object {
            "facets": Object {
              "order": Array [
                "brand",
                "hierarchicalCategories.lvl0",
                "categories",
              ],
            },
            "values": Object {
              "brand": Object {
                "sortRemainingBy": "count",
              },
              "categories": Object {
                "sortRemainingBy": "count",
              },
              "hierarchicalCategories.lvl0": Object {
                "sortRemainingBy": "count",
              },
            },
          },
        },
        "userData": Array [
          Object {
            "banner": "https://banner.jpg",
            "link": "https://banner.com/link/",
            "title": "Banner title",
          },
        ],
      },
    ],
    "state": Object {
      "disjunctiveFacets": Array [
        "brand",
      ],
      "disjunctiveFacetsRefinements": Object {
        "brand": Array [
          "Apple",
        ],
      },
      "facets": Array [],
      "facetsExcludes": Object {},
      "facetsRefinements": Object {},
      "hierarchicalFacets": Array [],
      "hierarchicalFacetsRefinements": Object {},
      "highlightPostTag": "__/ais-highlight__",
      "highlightPreTag": "__ais-highlight__",
      "index": "instant_search_rating_desc",
      "maxValuesPerFacet": 10,
      "numericRefinements": Object {},
      "query": "iphone",
      "tagRefinements": Array [],
    },
  },
}
`);
  });
});

function SearchBox() {
  useSearchBox();
  return null;
}

function Hits() {
  useHits();
  return null;
}

function RefinementList(props: UseRefinementListProps) {
  useRefinementList(props);
  return null;
}
