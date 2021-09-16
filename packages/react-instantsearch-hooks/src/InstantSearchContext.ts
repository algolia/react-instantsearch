import { InstantSearch } from 'instantsearch.js';
import { createContext } from 'react';

export const InstantSearchContext = createContext<null | InstantSearch>(null);
