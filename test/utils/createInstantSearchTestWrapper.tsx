import type { SearchClient } from '@algolia/client-search';
import React from 'react';
import type { InstantSearchProps } from '../../packages/react-instantsearch-hooks/src';
import { InstantSearch } from '../../packages/react-instantsearch-hooks/src';

import { createSearchClient } from '../mock';

export function createInstantSearchTestWrapper(
  props?: Partial<InstantSearchProps>,
  options: { searchClient: SearchClient } = {
    searchClient: createSearchClient(),
  }
) {
  const wrapper = ({ children }) => (
    <InstantSearch
      searchClient={options.searchClient}
      indexName="indexName"
      {...props}
    >
      {children}
    </InstantSearch>
  );

  return wrapper;
}
