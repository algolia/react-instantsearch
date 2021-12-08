import { useContext } from 'react';

import { InstantSearchServerContext } from './InstantSearchServerContext.js';

export function useInstantSearchServerContext() {
  return useContext(InstantSearchServerContext);
}
