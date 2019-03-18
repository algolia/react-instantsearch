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
    const indexContextValue = { targetedIndex: 'first' };

    it('provides current hits to the component', () => {
      const firstHits = [{}];
      const secondHits = [{}];
      let props = connect.getProvidedProps(
        { contextValue, indexContextValue },
        {},
        {
          results: { first: { hits: firstHits }, second: { hits: secondHits } },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHits, index: 'first' },
          { hits: secondHits, index: 'second' },
        ],
        currentRefinement: '',
      });

      props = connect.getProvidedProps(
        { contextValue, indexContextValue },
        { indices: { first: { query: 'query' } } },
        {
          results: { first: { hits: firstHits }, second: { hits: secondHits } },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHits, index: 'first' },
          { hits: secondHits, index: 'second' },
        ],
        currentRefinement: 'query',
      });

      props = connect.getProvidedProps(
        { defaultRefinement: 'query', contextValue, indexContextValue },
        {},
        {
          results: { first: { hits: firstHits }, second: { hits: secondHits } },
        }
      );
      expect(props).toEqual({
        hits: [
          { hits: firstHits, index: 'first' },
          { hits: secondHits, index: 'second' },
        ],
        currentRefinement: 'query',
      });
    });

    it('refines the query parameter', () => {
      const params = connect.getSearchParameters(
        new SearchParameters(),
        { contextValue, indexContextValue },
        { indices: { first: { query: 'bar' } } }
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
        indices: { first: { query: 'yep', page: 1 } },
      });
    });

    it('should return the right searchState when clean up', () => {
      const searchState = connect.cleanUp(
        { contextValue, indexContextValue },
        {
          indices: { first: { query: '' } },
          another: { searchState: 'searchState' },
        }
      );
      expect(searchState).toEqual({
        indices: { first: {} },
        another: { searchState: 'searchState' },
      });
    });
  });
});
