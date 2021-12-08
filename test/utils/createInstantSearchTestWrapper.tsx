import React from 'react';
import type { InstantSearchProps } from '../../packages/react-instantsearch-hooks/src';
// this exists, but eslint doesn't know due to not using the typescript resolver
// that's done to ensure .js extensions are allowed to import .ts files
// eslint-disable-next-line import/named
import { InstantSearch } from '../../packages/react-instantsearch-hooks/src';

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
