import instantsearch, { InstantSearchOptions } from 'instantsearch.js';
import { useEffect, useMemo, version as ReactVersion } from 'react';

import version from './version';

export type UseInstantSearchProps = InstantSearchOptions;

export function useInstantSearch(props: UseInstantSearchProps) {
  const search = useMemo(() => instantsearch(props), [props]);

  useEffect(() => {
    if (typeof props.searchClient.addAlgoliaAgent === 'function') {
      props.searchClient.addAlgoliaAgent(`react (${ReactVersion})`);
      props.searchClient.addAlgoliaAgent(
        `react-instantsearch-core (${version})`
      );
    }
  }, [props.searchClient]);

  useEffect(() => {
    search.start();

    return () => {
      search.dispose();
    };
  }, [search]);

  return search;
}
