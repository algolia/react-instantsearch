import instantsearch from 'instantsearch.js';
import { useEffect, useMemo, version as ReactVersion } from 'react';

import { useStableValue } from './useStableValue';
import version from './version';

import type { InstantSearchOptions } from 'instantsearch.js';

export type UseInstantSearchProps = InstantSearchOptions;

export function useInstantSearch(props: UseInstantSearchProps) {
  const stableProps = useStableValue(props);
  const search = useMemo(() => instantsearch(stableProps), [stableProps]);

  useEffect(() => {
    if (typeof stableProps.searchClient.addAlgoliaAgent === 'function') {
      stableProps.searchClient.addAlgoliaAgent(`react (${ReactVersion})`);
      stableProps.searchClient.addAlgoliaAgent(
        `react-instantsearch (${version})`
      );
      stableProps.searchClient.addAlgoliaAgent(
        `react-instantsearch-hooks (${version})`
      );
    }
  }, [stableProps.searchClient]);

  useEffect(() => {
    search.start();

    return () => {
      search.dispose();
    };
  }, [search]);

  return search;
}
