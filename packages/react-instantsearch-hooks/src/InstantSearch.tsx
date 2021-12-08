import React from 'react';

import { IndexContext } from './IndexContext.js';
import { InstantSearchContext } from './InstantSearchContext.js';
import { useInstantSearch } from './useInstantSearch.js';

import type { UseInstantSearchProps } from './useInstantSearch.js';

export type InstantSearchProps = UseInstantSearchProps & {
  children?: React.ReactNode;
};

export function InstantSearch({ children, ...props }: InstantSearchProps) {
  const search = useInstantSearch(props);

  if (!search.started) {
    return null;
  }

  return (
    <InstantSearchContext.Provider value={search}>
      <IndexContext.Provider value={search.mainIndex}>
        {children}
      </IndexContext.Provider>
    </InstantSearchContext.Provider>
  );
}
