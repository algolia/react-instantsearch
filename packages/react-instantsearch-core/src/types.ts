export type SearchParameters = any; // AlgoliaSearchHelper.SearchParameters
export type SearchResults = any; // AlgoliaSearchHelper.SearchResults
export type SearchForFacetValuesResults = any;

// internal
type SingleIndexSearchState = {
  [widget: string]: any;
};

type MultiIndexSearchState = SingleIndexSearchState & {
  indices?: {
    [index: string]: SingleIndexSearchState;
  };
};

export type SearchState = SingleIndexSearchState | MultiIndexSearchState;

export type SearchMetadata = any;
