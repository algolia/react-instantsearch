import { useContext } from 'react';
import { InstantSearchContext } from 'react-instantsearch-core';

export function useSearch() {
  const { store, widgetsManager } = useContext(InstantSearchContext);
  const getResults = () => store.getState().results;
  const searchBox = widgetsManager
    .getWidgets()
    .find(widget => widget.name.startsWith('AlgoliaSearchBox'));
  const setQuery = query => searchBox && searchBox.refine(query);

  return {
    getResults,
    setQuery,
  };
}
