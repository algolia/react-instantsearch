import React from 'react';
import type { InstantSearchProps } from '../../packages/react-instantsearch-core-next/src';
import { InstantSearch } from '../../packages/react-instantsearch-core-next/src';

import { createSearchClient } from '../mock';

export function createInstantSearchTestWrapper(
  props?: Partial<InstantSearchProps>
) {
  const searchClient = createSearchClient();
  const wrapper = ({ children }) => (
    <InstantSearch searchClient={searchClient} indexName="indexName" {...props}>
      {children}
    </InstantSearch>
  );

  return wrapper;
}
