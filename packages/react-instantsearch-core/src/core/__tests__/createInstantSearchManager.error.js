import createInstantSearchManager from '../createInstantSearchManager';

const createSearchClient = () => ({
  search: jest.fn(() =>
    Promise.resolve({
      results: [
        {
          hits: [],
        },
      ],
    })
  ),
  searchForFacetValues: jest.fn(() =>
    Promise.resolve([
      {
        facetHits: [],
      },
    ])
  ),
});

describe('createInstantSearchManager with errors', () => {
  describe('on search', () => {
    it('updates the store on widget lifecycle', () => {
      expect.assertions(7);

      const searchClient = createSearchClient();

      searchClient.search.mockImplementation(() =>
        Promise.reject(new Error('API_ERROR_1'))
      );

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.setQuery('search'),
        context: {},
        props: {},
      });

      expect(ism.store.getState().error).toBe(null);

      return Promise.resolve()
        .then() // flush helper.search.then
        .then() // flush helper.search.catch
        .then(() => {
          const state = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(1);
          expect(state.error).toEqual(new Error('API_ERROR_1'));
          expect(state.results).toEqual(null);

          searchClient.search.mockImplementation(() =>
            Promise.reject(new Error('API_ERROR_2'))
          );

          ism.widgetsManager.update();
        })
        .then() // flush helper.search.then
        .then() // flush helper.search.catch
        .then(() => {
          const state = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(2);
          expect(state.error).toEqual(new Error('API_ERROR_2'));
          expect(state.results).toEqual(null);
        });
    });

    it('updates the store on external updates', () => {
      expect.assertions(7);

      const searchClient = createSearchClient();

      searchClient.search.mockImplementation(() =>
        Promise.reject(new Error('API_ERROR_1'))
      );

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.onExternalStateUpdate({});

      expect(ism.store.getState().error).toBe(null);

      return Promise.resolve()
        .then() // flush helper.search.then
        .then() // flush helper.search.catch
        .then(() => {
          const state = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(1);
          expect(state.error).toEqual(new Error('API_ERROR_1'));
          expect(state.results).toEqual(null);

          searchClient.search.mockImplementation(() =>
            Promise.reject(new Error('API_ERROR_2'))
          );

          ism.onExternalStateUpdate({});
        })
        .then() // flush helper.search.then
        .then() // flush helper.search.catch
        .then(() => {
          const state = ism.store.getState();

          expect(searchClient.search).toHaveBeenCalledTimes(2);
          expect(state.error).toEqual(new Error('API_ERROR_2'));
          expect(state.results).toEqual(null);
        });
    });

    it('reset the error after a succesful search', () => {
      expect.assertions(5);

      const searchClient = createSearchClient();

      searchClient.search.mockImplementation(() =>
        Promise.reject(new Error('API_ERROR'))
      );

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getSearchParameters: params => params.setQuery('search'),
        context: {},
        props: {},
      });

      expect(ism.store.getState().error).toBe(null);

      return Promise.resolve()
        .then() // flush helper.search.then
        .then() // flush helper.search.catch
        .then(() => {
          const state = ism.store.getState();

          expect(state.error).toEqual(new Error('API_ERROR'));
          expect(state.results).toEqual(null);

          searchClient.search.mockImplementation(() =>
            Promise.resolve({
              results: [
                {
                  hits: [],
                },
              ],
            })
          );

          ism.widgetsManager.update();
        })
        .then()
        .then(() => {
          const state = ism.store.getState();

          expect(state.error).toEqual(null);
          expect(state.results).toEqual(
            expect.objectContaining({
              hits: [],
            })
          );
        });
    });
  });

  describe('on search for facet values', () => {
    it('updates the store on function call', () => {
      expect.assertions(4);

      const searchClient = createSearchClient();

      searchClient.searchForFacetValues.mockImplementation(() =>
        Promise.reject(new Error('API_ERROR'))
      );

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.onSearchForFacetValues({
        facetName: 'facetName',
        query: 'query',
      });

      expect(ism.store.getState().searchingForFacetValues).toBe(true);
      expect(ism.store.getState().error).toBe(null);

      return Promise.resolve()
        .then()
        .then(() => {
          expect(ism.store.getState().searchingForFacetValues).toBe(false);
          expect(ism.store.getState().error).toEqual(new Error('API_ERROR'));
        });
    });

    it('reset the error after a succesful search', () => {
      expect.assertions(5);

      const searchClient = createSearchClient();

      searchClient.searchForFacetValues.mockImplementation(() =>
        Promise.reject(new Error('API_ERROR'))
      );

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.onSearchForFacetValues({
        facetName: 'facetName',
        query: 'query',
      });

      expect(ism.store.getState().error).toBe(null);

      return Promise.resolve()
        .then()
        .then(() => {
          expect(ism.store.getState().error).toEqual(new Error('API_ERROR'));
          expect(ism.store.getState().resultsFacetValues).toBeUndefined();

          searchClient.searchForFacetValues.mockImplementation(() =>
            Promise.resolve([
              {
                facetHits: [],
              },
            ])
          );

          ism.onSearchForFacetValues({
            facetName: 'facetName',
            query: 'query',
          });
        })
        .then()
        .then(() => {
          expect(ism.store.getState().error).toBe(null);
          expect(ism.store.getState().resultsFacetValues).toEqual(
            expect.objectContaining({
              facetName: [],
              query: 'query',
            })
          );
        });
    });
  });
});
