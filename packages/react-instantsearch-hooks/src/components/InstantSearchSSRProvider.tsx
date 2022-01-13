import React from 'react';

import { InstantSearchSSRContext } from '../lib/InstantSearchSSRContext';

import type { InitialResults } from 'instantsearch.js';
import type { ReactNode } from 'react';

export type InstantSearchServerState = {
  initialResults: InitialResults;
};

export type InstantSearchSSRProviderProps =
  Partial<InstantSearchServerState> & {
    children?: ReactNode;
  };

/**
 * Provider to pass the server state retrieved from `getServerState()` to
 * <InstantSearch>.
 */
export function InstantSearchSSRProvider({
  children,
  ...props
}: InstantSearchSSRProviderProps) {
  // If there's no server state passed, we don't want to override something
  // passed from higher in the tree
  if (Object.keys(props).length === 0) {
    return <>{children}</>;
  }

  return (
    <InstantSearchSSRContext.Provider value={props}>
      {children}
    </InstantSearchSSRContext.Provider>
  );
}
