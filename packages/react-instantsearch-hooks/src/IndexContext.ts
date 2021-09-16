// eslint-disable-next-line import/named
import { IndexWidget } from 'instantsearch.js/es/widgets/index/index';
import { createContext } from 'react';

export const IndexContext = createContext<null | IndexWidget>(null);
