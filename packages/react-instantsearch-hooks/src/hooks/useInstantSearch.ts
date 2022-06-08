import { useCallback } from 'react';

import { useInstantSearchContext } from '../lib/useInstantSearchContext';
import { useSearchResults } from '../lib/useSearchResults';
import { useSearchState } from '../lib/useSearchState';

import type { SearchResults } from 'algoliasearch-helper';
import type {
  InstantSearch,
  Middleware,
  ScopedResult,
  UiState,
} from 'instantsearch.js';

type InstantSearchApi<TUiState extends UiState> = {
  scopedResults: ScopedResult[];
  results: SearchResults<any>;
  uiState: TUiState;
  setUiState: InstantSearch<TUiState>['setUiState'];
  indexUiState: TUiState[keyof TUiState];
  setIndexUiState: (indexUiState: TUiState[keyof TUiState]) => void;
  use: (...middlewares: Middleware[]) => () => void;
  refresh: InstantSearch['refresh'];
};

export function useInstantSearch<
  TUiState extends UiState = UiState
>(): InstantSearchApi<TUiState> {
  const search = useInstantSearchContext<TUiState>();
  const { uiState, setUiState, indexUiState, setIndexUiState } =
    useSearchState<TUiState>();
  const { results, scopedResults } = useSearchResults();

  const use: InstantSearchApi<TUiState>['use'] = useCallback(
    (...middlewares: Middleware[]) => {
      search.use(...middlewares);

      return () => {
        search.unuse(...middlewares);
      };
    },
    [search]
  );

  const refresh: InstantSearchApi<TUiState>['refresh'] = useCallback(() => {
    search.refresh();
  }, [search]);

  return {
    results,
    scopedResults,
    uiState,
    setUiState,
    indexUiState,
    setIndexUiState,
    use,
    refresh,
  };
}
