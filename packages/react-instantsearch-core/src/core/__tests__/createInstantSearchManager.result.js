import createInstantSearchManager from '../createInstantSearchManager';

const createSearchClient = () => ({
  search: jest.fn(() =>
    Promise.resolve({
      results: [
        {
          hits: [{ value: 'results' }],
        },
      ],
    })
  ),
  searchForFacetValues: jest.fn(() =>
    Promise.resolve([
      {
        facetHits: [{ value: 'results' }],
      },
    ])
  ),
});

describe('createInstantSearchManager with results', () => {
  describe('on search', () => {
    it('updates the store on widget lifecycle', () => {
      expect.assertions(7);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.setQuery('search'),
        props: {},
        context: {},
      });

      expect(ism.store.getState().results).toBe(null);

      return Promise.resolve()
        .then()
        .then(() => {
          const store = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(1);
          expect(store.results.hits).toEqual([{ value: 'results' }]);
          expect(store.error).toBe(null);

          ism.widgetsManager.update();
        })
        .then()
        .then(() => {
          const store = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(2);
          expect(store.results.hits).toEqual([{ value: 'results' }]);
          expect(store.error).toBe(null);
        });
    });

    it('updates the store on external updates', () => {
      expect.assertions(6);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.onExternalStateUpdate({});

      return Promise.resolve()
        .then(() => {
          const store = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(1);
          expect(store.results.hits).toEqual([{ value: 'results' }]);
          expect(store.error).toBe(null);

          ism.onExternalStateUpdate({});
        })
        .then()
        .then(() => {
          const store = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(2);
          expect(store.results.hits).toEqual([{ value: 'results' }]);
          expect(store.error).toBe(null);
        });
    });
  });

  describe('on search for facet values', () => {
    // We should avoid to rely on such mock, we mostly do an integration tests rather than
    // a unit ones for the manager. We have to simulate a real helper environement (facet,
    // etc, ...) to have something that don't throw errors. An easier way would be to provide
    // the helper to the manager with the real implementation by default. With this, we can easily
    // pass a custom helper (mocked or not) and don't rely on the helper + client.

    it('updates the store and searches', () => {
      expect.assertions(4);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      // We have to register the facet to be able to search on it
      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.addFacet('facetName'),
        props: {},
        context: {},
      });

      return Promise.resolve()
        .then()
        .then(() => {
          ism.onSearchForFacetValues({
            facetName: 'facetName',
            query: 'query',
          });

          expect(ism.store.getState().searchingForFacetValues).toBe(true);
        })
        .then()
        .then(() => {
          expect(ism.store.getState().searchingForFacetValues).toBe(false);

          expect(searchClient.searchForFacetValues).toHaveBeenCalledWith(
            expect.arrayContaining([
              expect.objectContaining({
                params: expect.objectContaining({
                  facetName: 'facetName',
                  facetQuery: 'query',
                  maxFacetHits: 10,
                }),
              }),
            ])
          );

          expect(ism.store.getState().resultsFacetValues).toEqual({
            facetName: [expect.objectContaining({ value: 'results' })],
            query: 'query',
          });
        });
    });

    it('updates the store and searches with maxFacetHits', () => {
      expect.assertions(1);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      // We have to register the facet to be able to search on it
      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.addFacet('facetName'),
        props: {},
        context: {},
      });

      return Promise.resolve()
        .then()
        .then(() => {
          ism.onSearchForFacetValues({
            facetName: 'facetName',
            query: 'query',
            maxFacetHits: 25,
          });
        })
        .then()
        .then(() => {
          expect(searchClient.searchForFacetValues).toHaveBeenCalledWith(
            expect.arrayContaining([
              expect.objectContaining({
                params: expect.objectContaining({
                  maxFacetHits: 25,
                }),
              }),
            ])
          );
        });
    });

    it('updates the store and searches with maxFacetHits out of range (higher)', () => {
      expect.assertions(1);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      // We have to register the facet to be able to search on it
      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.addFacet('facetName'),
        props: {},
        context: {},
      });

      return Promise.resolve()
        .then()
        .then(() => {
          ism.onSearchForFacetValues({
            facetName: 'facetName',
            query: 'query',
            maxFacetHits: 125,
          });
        })
        .then()
        .then(() => {
          expect(searchClient.searchForFacetValues).toHaveBeenCalledWith(
            expect.arrayContaining([
              expect.objectContaining({
                params: expect.objectContaining({
                  maxFacetHits: 100,
                }),
              }),
            ])
          );
        });
    });

    it('updates the store and searches with maxFacetHits out of range (lower)', () => {
      expect.assertions(1);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      // We have to register the facet to be able to search on it
      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.addFacet('facetName'),
        props: {},
        context: {},
      });

      return Promise.resolve()
        .then()
        .then(() => {
          ism.onSearchForFacetValues({
            facetName: 'facetName',
            query: 'query',
            maxFacetHits: 0,
          });
        })
        .then()
        .then(() => {
          expect(searchClient.searchForFacetValues).toHaveBeenCalledWith(
            expect.arrayContaining([
              expect.objectContaining({
                params: expect.objectContaining({
                  maxFacetHits: 1,
                }),
              }),
            ])
          );
        });
    });
  });
});
