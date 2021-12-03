import { createContext } from 'react';

import type { InstantSearch } from 'instantsearch.js';

export type InstantSearchSSRClient = {
  search?: InstantSearch;
};

export type InstantSearchServerApi = {
  /**
   * Notifies search internals to the server execution context to access them
   * in `getServerState()`.
   */
  notifyServer(params: Required<InstantSearchSSRClient>): void;
};

export const InstantSearchServerContext =
  createContext<InstantSearchServerApi | null>(null);

if (__DEV__) {
  InstantSearchServerContext.displayName = 'InstantSearchServer';
}
