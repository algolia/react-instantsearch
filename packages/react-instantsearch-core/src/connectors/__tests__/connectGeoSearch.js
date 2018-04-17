import { SearchResults, SearchParameters } from 'algoliasearch-helper';
import connector from '../connectGeoSearch';

jest.mock('../../core/createConnector', () => x => x);

describe('connectGeoSearch', () => {
  const empty = {};

  const createSingleIndexInstance = () => ({
    context: {
      ais: {
        mainTargetedIndex: 'index',
      },
    },
  });

  const createSearchResults = (hits = [], state) => ({
    results: new SearchResults(new SearchParameters(state), [
      {
        hits,
      },
    ]),
  });

  describe('getProvidedProps', () => {
    it('expect to return default provided props', () => {
      const instance = createSingleIndexInstance();
      const props = {};
      const searchState = {};
      const searchResults = empty;

      const actual = connector.getProvidedProps.call(
        instance,
        props,
        searchState,
        searchResults
      );

      const expectation = {
        hits: [],
        position: null,
        currentRefinement: null,
        isRefinedWithMap: false,
      };

      expect(actual).toEqual(expectation);
    });

    describe('hits', () => {
      it('expect to return hits when we have results', () => {
        const hits = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults(hits);

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        const expectation = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        expect(actual.hits).toEqual(expectation);
      });

      it('expect to return hits with only "_geoloc" when we have results', () => {
        const hits = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: false },
          { objectID: '789', _geoloc: true },
        ];

        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults(hits);

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        const expectation = [
          { objectID: '123', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        expect(actual.hits).toEqual(expectation);
      });

      it("expect to return empty hits when we don't have results", () => {
        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = empty;

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        const expectation = [];

        expect(actual.hits).toEqual(expectation);
      });
    });

    describe('position', () => {
      it('expect to return the position from the searchState', () => {
        const instance = createSingleIndexInstance();
        const props = {};
        const searchResults = createSearchResults();
        const searchState = {
          aroundLatLng: {
            lat: 10,
            lng: 12,
          },
        };

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.position).toEqual({
          lat: 10,
          lng: 12,
        });
      });

      it('expect to return null from an empty searchState', () => {
        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults();

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.position).toBe(null);
      });
    });

    describe('currentRefinement', () => {
      it('expect to return the boundingBox from the searchState', () => {
        const instance = createSingleIndexInstance();
        const props = {};
        const searchResults = createSearchResults();
        const searchState = {
          boundingBox: {
            northEast: {
              lat: 10,
              lng: 12,
            },
            southWest: {
              lat: 12,
              lng: 14,
            },
          },
        };

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.currentRefinement).toEqual({
          northEast: {
            lat: 10,
            lng: 12,
          },
          southWest: {
            lat: 12,
            lng: 14,
          },
        });
      });

      it('expect to return an null from an empty searchState', () => {
        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults();

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.currentRefinement).toBe(null);
      });
    });

    describe('isRefinedWithMap', () => {
      it("expect to return true when it's refined with the map (from the searchState)", () => {
        const hits = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        const instance = createSingleIndexInstance();
        const props = {};
        const searchResults = createSearchResults(hits);
        const searchState = {
          boundingBox: {
            northEast: {
              lat: 10,
              lng: 12,
            },
            southWest: {
              lat: 12,
              lng: 14,
            },
          },
        };

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.isRefinedWithMap).toBe(true);
      });

      it("expect to return true when it's refined with the map (from the searchParameters)", () => {
        const sliceSearchParameters = {
          insideBoundingBox: '10, 12, 12, 14',
        };

        const hits = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults(hits, sliceSearchParameters);

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.isRefinedWithMap).toBe(true);
      });

      it("expect to return false when it's not refined with the map", () => {
        const hits = [
          { objectID: '123', _geoloc: true },
          { objectID: '456', _geoloc: true },
          { objectID: '789', _geoloc: true },
        ];

        const instance = createSingleIndexInstance();
        const props = {};
        const searchState = {};
        const searchResults = createSearchResults(hits);

        const actual = connector.getProvidedProps.call(
          instance,
          props,
          searchState,
          searchResults
        );

        expect(actual.isRefinedWithMap).toBe(false);
      });
    });
  });

  describe('refine', () => {
    it('expect to set the boundingBox when boundingBox is provided', () => {
      const instance = createSingleIndexInstance();
      const props = {};
      const searchState = {};
      const nextRefinement = {
        northEast: {
          lat: 10,
          lng: 12,
        },
        southWest: {
          lat: 12,
          lng: 14,
        },
      };

      const actual = connector.refine.call(
        instance,
        props,
        searchState,
        nextRefinement
      );

      const expectation = {
        page: 1,
        boundingBox: {
          northEast: {
            lat: 10,
            lng: 12,
          },
          southWest: {
            lat: 12,
            lng: 14,
          },
        },
      };

      expect(actual).toEqual(expectation);
    });

    it('expect to replace the previous value when boundingBox is provided', () => {
      const instance = createSingleIndexInstance();
      const props = {};
      const searchState = {
        boundingBox: {
          northEast: {
            lat: 8,
            lng: 10,
          },
          southWest: {
            lat: 10,
            lng: 12,
          },
        },
      };

      const nextRefinement = {
        northEast: {
          lat: 10,
          lng: 12,
        },
        southWest: {
          lat: 12,
          lng: 14,
        },
      };

      const actual = connector.refine.call(
        instance,
        props,
        searchState,
        nextRefinement
      );

      const expectation = {
        page: 1,
        boundingBox: {
          northEast: {
            lat: 10,
            lng: 12,
          },
          southWest: {
            lat: 12,
            lng: 14,
          },
        },
      };

      expect(actual).toEqual(expectation);
    });

    it('expect to clear the previous value when boundingBox is omit', () => {
      const instance = createSingleIndexInstance();
      const props = {};
      const searchState = {
        boundingBox: {
          northEast: {
            lat: 8,
            lng: 10,
          },
          southWest: {
            lat: 10,
            lng: 12,
          },
        },
      };

      const actual = connector.refine.call(instance, props, searchState);

      const expectation = {
        page: 1,
      };

      expect(actual).toEqual(expectation);
    });
  });
});
