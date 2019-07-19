import { SearchParameters } from 'algoliasearch-helper';
import connect from '../connectAutoComplete';

jest.mock('../../core/createConnector', () => x => x);

describe('connectAutoComplete', () => {
  describe('single index', () => {
    const contextValue = { mainTargetedIndex: 'index' };

    it('provides current hits to the component', () => {
      const hits = [{}];
      let props = connect.getProvidedProps(
        { contextValue },
        {},
        {
          results: { hits },
        }
      );
      expect(props).toEqual({
        hits,
        currentRefinement: '',
      });

      props = connect.getProvidedProps(
        { contextValue },
        { query: 'query' },
        {
          results: { hits },
        }
      );
      expect(props).toEqual({
        hits,
        currentRefinement: 'query',
      });

      props = connect.getProvidedProps(
        { defaultRefinement: 'query', contextValue },
        {},
        {
          results: { hits },
        }
      );
      expect(props).toEqual({
        hits,
        currentRefinement: 'query',
      });
    });

    it('provides current hits to the component with queryID', () => {
      const hits = [{}];
      const hitsWithQueryID = [{ __queryID: 'zombo.com' }];
      let props = connect.getProvidedProps(
        { contextValue },
        {},
        {
          results: { hits, queryID: 'zombo.com' },
        }
      );
      expect(props).toEqual({
        hits: hitsWithQueryID,
        currentRefinement: '',
      });

      props = connect.getProvidedProps(
        { contextValue },
        { query: 'query' },
        {
          results: { hits, queryID: 'zombo.com' },
        }
      );
      expect(props).toEqual({
        hits: hitsWithQueryID,
        currentRefinement: 'query',
      });

      props = connect.getProvidedProps(
        { defaultRefinement: 'query', contextValue },
        {},
        {
          results: { hits, queryID: 'zombo.com' },
        }
      );
      expect(props).toEqual({
        hits: hitsWithQueryID,
        currentRefinement: 'query',
      });
    });

    it('refines the query parameter', () => {
      const params = connect.getSearchParameters(
        new SearchParameters(),
        { contextValue },
        { query: 'bar' }
      );
      expect(params.query).toBe('bar');
    });

    it("calling refine updates the widget's search state", () => {
      const nextState = connect.refine(
        { contextValue },
        { otherKey: 'val' },
        'yep'
      );
      expect(nextState).toEqual({
        otherKey: 'val',
        query: 'yep',
        page: 1,
      });
    });

    it('should return the right searchState when clean up', () => {
      const searchState = connect.cleanUp(
        { contextValue },
        {
          query: { searchState: 'searchState' },
          another: { searchState: 'searchState' },
        }
      );
      expect(searchState).toEqual({ another: { searchState: 'searchState' } });
    });
  });

  describe('multi index', () => {
    const contextValue = { mainTargetedIndex: 'first' };
    const indexContextValue = { targetedIndex: 'second' };

    it('provides current hits to the component', () => {
      const firstHits = [{}];
      const secondHits = [{}];
      const firstHitsWithQueryID = [{ __queryID: 'zombo.com' }];
      const secondHitsWithQueryID = [{ __queryID: 'html5zombo.com' }];
      let props = connect.getProvidedProps(
        { contextValue, indexContextValue },
        {},
        {
          results: {
            first: { hits: firstHits, queryID: 'zombo.com' },
            second: { hits: secondHits, queryID: 'html5zombo.com' },
          },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHitsWithQueryID, index: 'first' },
          { hits: secondHitsWithQueryID, index: 'second' },
        ],
        currentRefinement: '',
      });

      props = connect.getProvidedProps(
        { contextValue, indexContextValue },
        { indices: { second: { query: 'query' } } },
        {
          results: {
            first: { hits: firstHits, queryID: 'zombo.com' },
            second: { hits: secondHits, queryID: 'html5zombo.com' },
          },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHitsWithQueryID, index: 'first' },
          { hits: secondHitsWithQueryID, index: 'second' },
        ],
        currentRefinement: 'query',
      });

      props = connect.getProvidedProps(
        { defaultRefinement: 'query', contextValue, indexContextValue },
        {},
        {
          results: {
            first: { hits: firstHits, queryID: 'zombo.com' },
            second: { hits: secondHits, queryID: 'html5zombo.com' },
          },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHitsWithQueryID, index: 'first' },
          { hits: secondHitsWithQueryID, index: 'second' },
        ],
        currentRefinement: 'query',
      });
    });

    it('refines the query parameter', () => {
      const params = connect.getSearchParameters(
        new SearchParameters(),
        { contextValue, indexContextValue },
        { indices: { second: { query: 'bar' } } }
      );
      expect(params.query).toBe('bar');
    });

    it("calling refine updates the widget's search state", () => {
      const nextState = connect.refine(
        { contextValue, indexContextValue },
        { otherKey: 'val' },
        'yep'
      );
      expect(nextState).toEqual({
        otherKey: 'val',
        indices: { second: { query: 'yep', page: 1 } },
      });
    });

    it('should return the right searchState when clean up', () => {
      const searchState = connect.cleanUp(
        { contextValue, indexContextValue },
        {
          indices: { second: { query: '' } },
          another: { searchState: 'searchState' },
        }
      );
      expect(searchState).toEqual({
        indices: { second: {} },
        another: { searchState: 'searchState' },
      });
    });
  });
});
