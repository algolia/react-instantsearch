import { render } from '@testing-library/react';
import React from 'react';
import { connectHierarchicalMenu, connectRefinementList } from '../..';
import DynamicWidgets from '../DynamicWidgets';
import InstantSearch from '../InstantSearch';

const EMPTY_RESPONSE = {
  results: [
    {
      hits: [],
      nbHits: 0,
      page: 0,
      nbPages: 0,
      hitsPerPage: 20,
      exhaustiveNbHits: true,
      query: '',
      queryAfterRemoval: '',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&query=&facets=%5B%5D&tagFilters=',
      index: 'instant_search',
      processingTimeMS: 2,
    },
  ],
};

const createSearchClient = () => ({
  search: jest.fn(() => Promise.resolve(EMPTY_RESPONSE)),
  searchForFacetValues: jest.fn(() => Promise.resolve({})),
});

const RefinementList = connectRefinementList(
  ({ attribute }) => `RefinementList(${attribute})`
);

const HierarchicalMenu = connectHierarchicalMenu(
  ({ attributes }) => `HierarchicalMenu(${attributes.join(',')})`
);

describe('DynamicWidgets', () => {
  describe('before results', () => {
    test('does not render the result of transformItems', () => {
      const searchClient = createSearchClient();

      const { container } = render(
        <InstantSearch searchClient={searchClient} indexName="test">
          <DynamicWidgets transformItems={() => ['test1']}>
            <RefinementList attribute="test1" />
          </DynamicWidgets>
        </InstantSearch>
      );

      expect(container.innerHTML).toMatchInlineSnapshot(`""`);
    });
  });

  describe('with results', () => {
    const resultsState = {
      metadata: [],
      rawResults: EMPTY_RESPONSE.results,
      state: {
        index: 'instant_search',
        query: '',
      },
    };

    test('transformItems is required', () => {
      // Prevent writing to stderr during this render.
      const spy = jest.spyOn(window.console, 'error');
      spy.mockImplementation(() => {});

      const searchClient = createSearchClient();

      expect(() =>
        render(
          <InstantSearch
            searchClient={searchClient}
            indexName="test"
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            resultsState={resultsState}
          >
            <DynamicWidgets>
              <RefinementList attribute="test1" />
            </DynamicWidgets>
          </InstantSearch>
        )
      ).toThrowErrorMatchingInlineSnapshot(
        `"props.transformItems is not a function"`
      );

      // Restore writing to stderr.
      spy.mockRestore();
    });

    test('default items is empty', () => {
      const searchClient = createSearchClient();

      const { container } = render(
        <InstantSearch
          searchClient={searchClient}
          indexName="test"
          // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
          resultsState={resultsState}
        >
          <DynamicWidgets transformItems={items => items}>
            <RefinementList attribute="test1" />
          </DynamicWidgets>
        </InstantSearch>
      );

      expect(container.innerHTML).toMatchInlineSnapshot(`""`);
    });

    test('renders return of transformItems', () => {
      const searchClient = createSearchClient();

      const { container } = render(
        <InstantSearch
          searchClient={searchClient}
          indexName="test"
          // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
          resultsState={resultsState}
        >
          <DynamicWidgets transformItems={() => ['test1']}>
            <RefinementList attribute="test1" />
            <HierarchicalMenu attributes={['test2', 'test3']} />
          </DynamicWidgets>
        </InstantSearch>
      );

      expect(container.innerHTML).toMatchInlineSnapshot(
        `"RefinementList(test1)"`
      );
    });

    test('renders from results', () => {
      const searchClient = createSearchClient();

      const RESULTS = [
        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              userData: [{ MOCK_ORDERING: ['test1', 'test2'] }],
            },
          ],
        },

        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              userData: [{ MOCK_ORDERING: ['test2', 'test1'] }],
            },
          ],
        },

        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              userData: [{ MOCK_ORDERING: ['test1'] }],
            },
          ],
        },
      ];

      const Component = ({
        result,
      }: {
        result: React.ComponentProps<typeof InstantSearch>['resultsState'];
      }) => (
        <InstantSearch
          searchClient={searchClient}
          indexName="test"
          resultsState={result}
        >
          <DynamicWidgets
            transformItems={(_items, { results }) =>
              (results &&
                results.userData &&
                results.userData[0].MOCK_ORDERING) ||
              []
            }
          >
            <RefinementList attribute="test1" />
            <HierarchicalMenu attributes={['test2', 'test3']} />
          </DynamicWidgets>
        </InstantSearch>
      );
      {
        const { container } = render(
          <Component
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            result={RESULTS[0]}
          />
        );

        expect(container.innerHTML).toMatchInlineSnapshot(
          `"RefinementList(test1)HierarchicalMenu(test2,test3)"`
        );
      }
      {
        const { container } = render(
          <Component
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            result={RESULTS[1]}
          />
        );

        expect(container.innerHTML).toMatchInlineSnapshot(
          `"HierarchicalMenu(test2,test3)RefinementList(test1)"`
        );
      }
      {
        const { container } = render(
          <Component
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            result={RESULTS[2]}
          />
        );

        expect(container.innerHTML).toMatchInlineSnapshot(
          `"RefinementList(test1)"`
        );
      }
    });
  });
});
