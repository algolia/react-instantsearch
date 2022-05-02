import React from 'react';

import { IndexContext } from '../lib/IndexContext';
import { InstantSearchContext } from '../lib/InstantSearchContext';
import { useInstantSearchProvider } from '../lib/useInstantSearchProvider';

import type { UseInstantSearchProviderProps } from '../lib/useInstantSearchProvider';

export type InstantSearchProps = UseInstantSearchProviderProps & {
  children?: React.ReactNode;
};

export function InstantSearch({ children, ...props }: InstantSearchProps) {
  const search = useInstantSearchProvider(props);

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
