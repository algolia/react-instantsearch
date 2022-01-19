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
  // When there is dynamic widgets on the page, a second Provider is used
  // above the user-land InstantSearchSSRProvider. To avoid the user's provider
  // overriding the value with an empty object, this provider is skipped
  if (Object.keys(props).length === 0) {
    return <>{children}</>;
  }

  return (
    <InstantSearchSSRContext.Provider value={props}>
      {children}
    </InstantSearchSSRContext.Provider>
  );
}
