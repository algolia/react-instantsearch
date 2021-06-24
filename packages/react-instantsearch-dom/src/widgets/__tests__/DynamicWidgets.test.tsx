import { render } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  HierarchicalMenu,
  Pagination,
  connectRefinementList,
  Panel,
  InstantSearch,
} from '../..';
import DynamicWidgets from '../DynamicWidgets';

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

      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="ais-DynamicWidgets"
          />
        </div>
      `);
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

      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="ais-DynamicWidgets"
          />
        </div>
      `);
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

      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="ais-DynamicWidgets"
          >
            RefinementList(test1)
          </div>
        </div>
      `);
    });

    test('renders from results', () => {
      const searchClient = createSearchClient();

      const RESULTS = [
        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              renderingContent: {
                facetOrdering: { facet: { order: ['test1', 'test2'] } },
              },
            },
          ],
        },

        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              renderingContent: {
                facetOrdering: { facet: { order: ['test2', 'test1'] } },
              },
            },
          ],
        },

        {
          ...resultsState,
          rawResults: [
            {
              ...resultsState.rawResults[0],
              renderingContent: {
                facetOrdering: { facet: { order: ['test1'] } },
              },
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
          <DynamicWidgets>
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

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="ais-DynamicWidgets"
            >
              RefinementList(test1)
              <div
                class="ais-HierarchicalMenu ais-HierarchicalMenu--noRefinement"
              />
            </div>
          </div>
        `);
      }
      {
        const { container } = render(
          <Component
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            result={RESULTS[1]}
          />
        );

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="ais-DynamicWidgets"
            >
              <div
                class="ais-HierarchicalMenu ais-HierarchicalMenu--noRefinement"
              />
              RefinementList(test1)
            </div>
          </div>
        `);
      }
      {
        const { container } = render(
          <Component
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            result={RESULTS[2]}
          />
        );

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="ais-DynamicWidgets"
            >
              RefinementList(test1)
            </div>
          </div>
        `);
      }
    });

    test('renders items in panel', () => {
      const searchClient = createSearchClient();

      const { container } = render(
        <InstantSearch
          searchClient={searchClient}
          indexName="test"
          // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
          resultsState={resultsState}
        >
          <DynamicWidgets transformItems={() => ['test1', 'test3']}>
            <RefinementList attribute="test1" />
            <RefinementList attribute="test2" />
            <Panel>
              <RefinementList attribute="test3" />
            </Panel>
            <Panel>
              <RefinementList attribute="test4" />
            </Panel>
          </DynamicWidgets>
        </InstantSearch>
      );

      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="ais-DynamicWidgets"
          >
            RefinementList(test1)
            <div
              class="ais-Panel"
            >
              <div
                class="ais-Panel-body"
              >
                RefinementList(test3)
              </div>
            </div>
          </div>
        </div>
      `);
    });

    test("does not render items that aren't directly in children", () => {
      const fallbackRender = jest.fn(() => null);

      // prevent duplicate console errors still showing up
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});

      const searchClient = createSearchClient();

      const Wrapped = ({ attr }: { attr: string }) => (
        <div>
          <HierarchicalMenu attributes={[attr, `${attr}.1`]} />
        </div>
      );

      render(
        <ErrorBoundary fallbackRender={fallbackRender}>
          <InstantSearch
            searchClient={searchClient}
            indexName="test"
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            resultsState={resultsState}
          >
            <DynamicWidgets transformItems={() => ['test1']}>
              <Wrapped attr="test1" />
            </DynamicWidgets>
          </InstantSearch>
        </ErrorBoundary>
      );

      expect(
        (fallbackRender.mock.calls[0] as any)[0].error
      ).toMatchInlineSnapshot(
        `[Error: Could not find "attribute" prop for UnknownComponent.]`
      );
    });

    test('does not render items non-attribute widgets', () => {
      const fallbackRender = jest.fn(() => null);

      // prevent duplicate console errors still showing up
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});

      const searchClient = createSearchClient();

      render(
        <ErrorBoundary fallbackRender={fallbackRender}>
          <InstantSearch
            searchClient={searchClient}
            indexName="test"
            // @ts-ignore resultsState in InstantSearch is typed wrongly to deal with multi-index
            resultsState={resultsState}
          >
            <DynamicWidgets transformItems={() => ['test1']}>
              <Pagination />
            </DynamicWidgets>
          </InstantSearch>
        </ErrorBoundary>
      );

      expect(
        (fallbackRender.mock.calls[0] as any)[0].error
      ).toMatchInlineSnapshot(
        `[Error: Could not find "attribute" prop for UnknownComponent.]`
      );
    });
  });
});
