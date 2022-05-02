import { useConnector } from '../hooks/useConnector';
import { useInstantSearchContext } from '../lib/useInstantSearchContext';

import type { SearchResults } from 'algoliasearch-helper';
import type {
  Connector,
  RenderState,
  ScopedResult,
  UiState,
} from 'instantsearch.js';

export { useInstantSearchContext };

type SearchResultsWidgetDescription = {
  $$type: 'ais.searchResults';
  renderState: {
    results: SearchResults<any>;
    scopedResults: ScopedResult[];
    isSearchStalled: boolean;
  };
};

const connectSearchResults: Connector<SearchResultsWidgetDescription, never> = (
  renderFn
) => {
  return (widgetParams) => {
    return {
      $$type: 'ais.searchResults',
      getWidgetRenderState({ results, scopedResults, instantSearchInstance }) {
        return {
          results: results!,
          scopedResults,
          isSearchStalled: instantSearchInstance._isSearchStalled,
          widgetParams,
        };
      },
      render(renderOptions) {
        renderFn(
          {
            ...this.getWidgetRenderState!(renderOptions),
            instantSearchInstance: renderOptions.instantSearchInstance,
          },
          false
        );
      },
      dispose() {},
    };
  };
};

export function useSearchResults() {
  return useConnector(connectSearchResults);
}

type SearchStateWidgetDescription = {
  $$type: 'ais.searchState';
  renderState: {
    uiState: UiState;
    setUiState: (
      uiState: UiState | ((previousUiState: UiState) => UiState)
    ) => void;
    renderState: RenderState;
  };
};

const connectSearchState: Connector<SearchStateWidgetDescription, never> = (
  renderFn
) => {
  return (widgetParams) => {
    return {
      $$type: 'ais.searchState',
      getWidgetRenderState({ instantSearchInstance }) {
        return {
          uiState: instantSearchInstance.getUiState(),
          setUiState: instantSearchInstance.setUiState,
          renderState: instantSearchInstance.renderState,
          widgetParams,
        };
      },
      render(renderOptions) {
        renderFn(
          {
            ...this.getWidgetRenderState!(renderOptions),
            instantSearchInstance: renderOptions.instantSearchInstance,
          },
          false
        );
      },
      dispose() {},
    };
  };
};

export function useSearchState() {
  return useConnector(connectSearchState);
}
