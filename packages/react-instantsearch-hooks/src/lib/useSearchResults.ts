import { useEffect, useState } from 'react';

import { getIndexSearchResults } from './getIndexSearchResults';
import { useIndexContext } from './useIndexContext';
import { useInstantSearchContext } from './useInstantSearchContext';

import type { SearchResults } from 'algoliasearch-helper';
import type { ScopedResult } from 'instantsearch.js';

export type SearchResultsApi = {
  results: SearchResults<any>;
  scopedResults: ScopedResult[];
};

export function useSearchResults(): SearchResultsApi {
  const search = useInstantSearchContext();
  const searchIndex = useIndexContext();
  const [searchResults, setSearchResults] = useState(() =>
    getIndexSearchResults(searchIndex)
  );

  useEffect(() => {
    function handleRender() {
      const results = searchIndex.getResults();

      // results can be null when first search is stalled, in this case we skip the update
      if (results !== null) {
        setSearchResults({
          results,
          scopedResults: searchIndex.getScopedResults(),
        });
      }
    }

    search.addListener('render', handleRender);

    return () => {
      search.removeListener('render', handleRender);
    };
  }, [search, searchIndex]);

  return searchResults;
}
