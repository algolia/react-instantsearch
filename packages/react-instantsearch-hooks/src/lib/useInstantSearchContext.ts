import { useContext } from 'react';

import { invariant } from '../lib/invariant';

import { InstantSearchContext } from './InstantSearchContext';

import type { InstantSearch, UiState } from 'instantsearch.js';

export function useInstantSearchContext<
  TUiState extends UiState,
  TRouteState = TUiState
>() {
  // React context can't be generic itself, so we need to cast here.
  const search: InstantSearch<TUiState, TRouteState> | null =
    useContext(InstantSearchContext);

  invariant(
    search !== null,
    'Hooks must be used inside the <InstantSearch> component.\n\n' +
      'They are not compatible with the `react-instantsearch-core` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch> component from `react-instantsearch-hooks`.'
  );

  return search;
}
