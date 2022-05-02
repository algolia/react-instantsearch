import { Hit as AlgoliaHit } from 'instantsearch.js';
import algoliasearch from 'algoliasearch/lite';
import React, { useEffect } from 'react';
import {
  InstantSearch,
  Breadcrumb,
  Configure,
  ClearRefinements,
  CurrentRefinements,
  DynamicWidgets,
  HierarchicalMenu,
  Highlight,
  Hits,
  HitsPerPage,
  InfiniteHits,
  Menu,
  Pagination,
  RangeInput,
  RefinementList,
  PoweredBy,
  SearchBox,
  SortBy,
  ToggleRefinement,
  useSearchResults,
  useSearchState,
  useInstantSearchContext,
} from 'react-instantsearch-hooks-web';

import { Panel, QueryRuleContext, QueryRuleCustomData } from './components';
import { Tab, Tabs } from './components/layout';

import './App.css';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

function App() {
  // const search = useInstantSearchContext();
  const { results, scopedResults, isSearchStalled } = useSearchResults();
  // const { uiState, setUiState } = useSearchState();

  // useEffect(() => {
  //   const middleware = createInsightsMiddleware({ insightsClient: null });
  //   search.use(middleware);

  //   return () => search.unuse(middleware);
  // }, [search]);

  // const totalNbHits = scopedResults.reduce(
  //   (acc, { results: { nbHits } }) => acc + nbHits,
  //   0
  // );

  return (
    <>
      {/* <button
        type="button"
        onClick={() => {
          search.refresh();
        }}
      >
        refresh
      </button> */}
      {/* {isSearchStalled && <span>loading...</span>} */}
      <p>There are {results.nbHits} results</p>
      {/* <p>Across all indices there are {totalNbHits} results</p> */}
      {/* <button
        type="button"
        onClick={() =>
          setUiState((previous) => ({
            ...previous,
            instant_search: {
              ...previous.instant_search,
              page: previous.instant_search.page ?? 0 + 1,
            },
          }))
        }
      >
        increase page {uiState.instant_search.page ?? 0}
      </button> */}

      <Configure ruleContexts={[]} />

      <div className="Container">
        <div>
          <DynamicWidgets>
            <Panel header="Brands">
              <RefinementList
                attribute="brand"
                searchable={true}
                searchablePlaceholder="Search brands"
                showMore={true}
              />
            </Panel>
            <Panel header="Categories">
              <Menu attribute="categories" showMore={true} />
            </Panel>
            <Panel header="Hierarchy">
              <HierarchicalMenu
                attributes={[
                  'hierarchicalCategories.lvl0',
                  'hierarchicalCategories.lvl1',
                  'hierarchicalCategories.lvl2',
                ]}
                showMore={true}
              />
            </Panel>
            <Panel header="Price">
              <RangeInput attribute="price" />
            </Panel>
            <Panel header="Free Shipping">
              <ToggleRefinement
                attribute="free_shipping"
                label="Free shipping"
              />
            </Panel>
          </DynamicWidgets>
        </div>
        <div className="Search">
          <Breadcrumb
            attributes={[
              'hierarchicalCategories.lvl0',
              'hierarchicalCategories.lvl1',
              'hierarchicalCategories.lvl2',
            ]}
          />

          <div className="Search-header">
            <SearchBox placeholder="Search" />
            <SortBy
              items={[
                { label: 'Relevance', value: 'instant_search' },
                { label: 'Price (asc)', value: 'instant_search_price_asc' },
                { label: 'Price (desc)', value: 'instant_search_price_desc' },
              ]}
            />
            <HitsPerPage
              items={[
                { label: '20 hits per page', value: 20, default: true },
                { label: '40 hits per page', value: 40 },
              ]}
            />
          </div>
          <PoweredBy />

          <div className="CurrentRefinements">
            <ClearRefinements />
            <CurrentRefinements
              transformItems={(items) =>
                items.map((item) => {
                  const label = item.label.startsWith('hierarchicalCategories')
                    ? 'Hierarchy'
                    : item.label;

                  return {
                    ...item,
                    attribute: label,
                  };
                })
              }
            />
          </div>

          <QueryRuleContext
            trackedFilters={{
              brand: () => ['Apple'],
            }}
          />

          <QueryRuleCustomData>
            {({ items }) => (
              <>
                {items.map((item) => (
                  <a href={item.link} key={item.banner}>
                    <img src={item.banner} alt={item.title} />
                  </a>
                ))}
              </>
            )}
          </QueryRuleCustomData>

          <Tabs>
            <Tab title="Hits">
              <Hits hitComponent={Hit} />
              <Pagination className="Pagination" />
            </Tab>
            <Tab title="InfiniteHits">
              <InfiniteHits showPrevious hitComponent={Hit} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export function Root() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instant_search"
      routing={true}
    >
      <App />
    </InstantSearch>
  );
}
