import { useContext } from 'react';

import { InstantSearchSSRContext } from './InstantSearchSSRContext.js';

export function useInstantSearchSSRContext() {
  return useContext(InstantSearchSSRContext);
}
