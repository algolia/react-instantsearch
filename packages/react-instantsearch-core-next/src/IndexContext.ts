import { createContext } from 'react';

import type { IndexWidget } from 'instantsearch.js/es/widgets/index/index';

export const IndexContext = createContext<null | IndexWidget>(null);
