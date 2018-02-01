import connect from './connectStateResults';

jest.mock('../core/createConnector');

describe('connectStateResults', () => {
  describe('single index', () => {
    const context = {
      context: {
        ais: { mainTargetedIndex: 'index' },
      },
    };

    const getProvidedProps = connect.getProvidedProps.bind(context);

    it('provides the correct props to the component', () => {
      const searchState = { state: 'state' };
      const error = 'error';
      const searching = true;
      const searchingForFacetValues = true;
      const searchResults = {
        results: { nbHits: 25, hits: [] },
        error,
        searching,
        searchingForFacetValues,
      };

      const expectation = {
        searchState,
        searchResults: searchResults.results,
        allSearchResults: searchResults.results,
        error,
        searching,
        searchingForFacetValues,
        props: { props: 'props' },
      };

      const actual = getProvidedProps(
        { props: 'props' },
        searchState,
        searchResults
      );

      expect(actual).toEqual(expectation);
    });
  });

  describe('multi index', () => {
    const context = {
      context: {
        ais: { mainTargetedIndex: 'first' },
        multiIndexContext: { targetedIndex: 'first' },
      },
    };

    const getProvidedProps = connect.getProvidedProps.bind(context);

    it('provides the correct props to the component', () => {
      const searchState = { state: 'state' };
      const error = 'error';
      const searching = true;
      const searchingForFacetValues = true;
      const searchResults = {
        results: {
          first: { nbHits: 25, hits: [] },
          second: { nbHits: 25, hits: [] },
        },
        error,
        searching,
        searchingForFacetValues,
      };

      const expectation = {
        searchState,
        searchResults: searchResults.results.first,
        allSearchResults: searchResults.results,
        error,
        searching,
        searchingForFacetValues,
        props: { props: 'props' },
      };

      const actual = getProvidedProps(
        { props: 'props' },
        searchState,
        searchResults
      );

      expect(actual).toEqual(expectation);
    });
  });
});
