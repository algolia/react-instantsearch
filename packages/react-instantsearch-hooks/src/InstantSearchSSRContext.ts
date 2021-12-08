import { createContext } from 'react';

import type { InstantSearchServerState } from './InstantSearchSSRProvider.js';

export const InstantSearchSSRContext =
  createContext<Partial<InstantSearchServerState> | null>(null);

if (__DEV__) {
  InstantSearchSSRContext.displayName = 'InstantSearchSSR';
}
