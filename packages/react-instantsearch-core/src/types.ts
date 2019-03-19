// from AlgoliaSearchHelper:
export type SearchParameters = any; // AlgoliaSearchHelper.SearchParameters
export type SearchResults = any; // AlgoliaSearchHelper.SearchResults
export type SearchForFacetValuesResults = any;

// internal
type UIState = {
  [index: string]: any;
};
export type SearchState = { indices?: UIState } | UIState;

export type MetaData = any[];
