import createInstantSearchManager from '../createInstantSearchManager';

jest.useFakeTimers();

const createSearchClient = () => ({
  search: jest.fn(() =>
    Promise.resolve({
      results: [
        {
          params: 'query=&hitsPerPage=10&page=0&facets=%5B%5D&tagFilters=',
          page: 0,
          hits: [],
          hitsPerPage: 10,
          nbPages: 0,
          processingTimeMS: 4,
          query: '',
          nbHits: 0,
          index: 'index',
        },
      ],
    })
  ),
});

describe('createInstantSearchManager', () => {
  it('initializes the manager with an empty state', () => {
    const ism = createInstantSearchManager({
      indexName: 'index',
      searchClient: createSearchClient(),
    });

    const state = ism.store.getState();
    expect(state).toEqual({
      error: null,
      isSearchStalled: true,
      metadata: [],
      results: null,
      searching: false,
      searchingForFacetValues: false,
      widgets: {},
    });

    const widgets = ism.widgetsManager.getWidgets();
    expect(widgets).toEqual([]);

    const nextState = {};
    const transitionnedState = ism.transitionState(nextState);
    expect(transitionnedState).toBe(nextState);

    const widgetIds = ism.getWidgetsIds();
    expect(widgetIds).toEqual([]);
  });

  it('initialize with results', () => {
    const ism = createInstantSearchManager({
      indexName: 'index',
      resultsState: { some: 'results' },
      searchClient: createSearchClient(),
    });

    const state = ism.store.getState();
    expect(state).toEqual({
      error: null,
      metadata: [],
      results: { some: 'results' },
      searching: false,
      searchingForFacetValues: false,
      widgets: {},
      isSearchStalled: true,
    });
  });

  describe('widget manager', () => {
    it('triggers a search when a widget is added', () => {
      expect.assertions(2);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getSearchParameters: () => ({}),
        props: {},
        context: {},
      });

      expect(ism.store.getState().searching).toBe(false);

      return Promise.resolve().then(() => {
        expect(ism.store.getState().searching).toBe(true);
      });
    });
  });

  describe('transitionState', () => {
    it('executes widgets hook', () => {
      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient: createSearchClient(),
      });

      const nextSearchState = {};

      ism.widgetsManager.registerWidget({
        transitionState: (next, current) => {
          expect(next).toEqual(nextSearchState);

          return {
            ...current,
            a: 1,
          };
        },
      });

      ism.widgetsManager.registerWidget({
        transitionState: (next, current) => {
          expect(next).toEqual(nextSearchState);

          return {
            ...current,
            b: 2,
          };
        },
      });

      expect(ism.transitionState()).toEqual({
        a: 1,
        b: 2,
      });
    });
  });

  describe('getWidgetsIds', () => {
    it('returns the list of ids of all registered widgets', () => {
      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient: createSearchClient(),
      });

      expect(ism.getWidgetsIds()).toEqual([]);

      ism.widgetsManager.registerWidget({ getMetadata: () => ({ id: 'a' }) });
      ism.widgetsManager.registerWidget({ getMetadata: () => ({ id: 'b' }) });
      ism.widgetsManager.registerWidget({ getMetadata: () => ({ id: 'c' }) });
      ism.widgetsManager.registerWidget({ getMetadata: () => ({ id: 'd' }) });

      return Promise.resolve().then(() => {
        expect(ism.getWidgetsIds()).toEqual(['a', 'b', 'c', 'd']);
      });
    });
  });

  describe('searchStalled', () => {
    it('should be updated if search is stalled', () => {
      expect.assertions(10);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getMetadata: () => {},
        transitionState: () => {},
      });

      expect(searchClient.search).not.toHaveBeenCalled();
      expect(ism.store.getState()).toMatchObject({
        isSearchStalled: true,
      });

      return Promise.resolve()
        .then(() => {
          expect(searchClient.search).toHaveBeenCalledTimes(1);

          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: true,
          });

          jest.runAllTimers();

          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: true,
          });
        })
        .then(() => {
          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: false,
          });

          ism.widgetsManager.update();

          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: false,
          });
        })
        .then(() => {
          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: false,
          });

          jest.runAllTimers();

          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: true,
          });
        })
        .then(() => {
          expect(ism.store.getState()).toMatchObject({
            isSearchStalled: false,
          });
        });
    });
  });

  describe('client.search', () => {
    it('should be called when there is a new widget', () => {
      expect.assertions(2);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.widgetsManager.registerWidget({
        getMetadata: () => {},
        transitionState: () => {},
      });

      expect(searchClient.search).toHaveBeenCalledTimes(0);

      return Promise.resolve().then(() => {
        expect(searchClient.search).toHaveBeenCalledTimes(1);
      });
    });

    it('should be called when there is a new client', () => {
      expect.assertions(4);

      const searchClient = createSearchClient();
      const nextSearchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      expect(searchClient.search).toHaveBeenCalledTimes(0);
      expect(nextSearchClient.search).toHaveBeenCalledTimes(0);

      ism.updateClient(nextSearchClient);

      return Promise.resolve().then(() => {
        expect(searchClient.search).toHaveBeenCalledTimes(0);
        expect(nextSearchClient.search).toHaveBeenCalledTimes(1);
      });
    });

    it('should not be called when the search is skipped', () => {
      expect.assertions(1);

      const searchClient = createSearchClient();

      const ism = createInstantSearchManager({
        indexName: 'index',
        searchClient,
      });

      ism.skipSearch();

      ism.widgetsManager.registerWidget({
        getMetadata: () => {},
        transitionState: () => {},
      });

      return Promise.resolve().then(() => {
        expect(searchClient.search).toHaveBeenCalledTimes(0);
      });
    });
  });
});
