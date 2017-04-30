/* eslint-env jest, jasmine */

import connect from './connectAutoComplete.js';
import { SearchParameters } from 'algoliasearch-helper';

jest.mock('../core/createConnector');

const { getSearchParameters, refine } = connect;

describe('connectAutoComplete', () => {
  const context = {};
  const getProvidedProps = connect.getProvidedProps.bind(context);
  describe('provides current hits to the component', () => {
    it('for multi-index', () => {
      const firstHits = [{}];
      const secondHits = [{}];
      let props = getProvidedProps(
        {},
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

      props = getProvidedProps(
        {},
        { query: 'query' },
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

      props = getProvidedProps(
        { defaultRefinement: 'query' },
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

    it('for single index', () => {
      const hits = [{}];
      let props = getProvidedProps(
        {},
        {},
        {
          results: { hits },
        }
      );
      expect(props).toEqual({
        hits,
        currentRefinement: '',
      });

      props = getProvidedProps(
        {},
        { query: 'query' },
        {
          results: { hits },
        }
      );
      expect(props).toEqual({
        hits,
        currentRefinement: 'query',
      });

      props = getProvidedProps(
        { defaultRefinement: 'query' },
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
  });

  it('refines the query parameter', () => {
    const params = getSearchParameters(
      new SearchParameters(),
      {},
      { query: 'bar' }
    );
    expect(params.query).toBe('bar');
  });

  it("calling refine updates the widget's search state", () => {
    const nextState = refine({}, { otherKey: 'val' }, 'yep');
    expect(nextState).toEqual({
      otherKey: 'val',
      query: 'yep',
    });
  });
});
