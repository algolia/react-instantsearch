import { createContext } from 'react';
import { Store } from '../core/createStore';

export type InstantSearchContext = {
  onInternalStateUpdate: (...args: any[]) => any;
  createHrefForState: (...args: any[]) => string;
  onSearchForFacetValues: (...args: any[]) => any;
  onSearchStateChange: (...args: any[]) => any;
  onSearchParameters: (...args: any[]) => any;
  store: Store;
  widgetsManager: any;
  mainTargetedIndex: string;
};

export const {
  Consumer: InstantSearchConsumer,
  Provider: InstantSearchProvider,
} = createContext<InstantSearchContext>({
  onInternalStateUpdate: () => undefined,
  createHrefForState: () => '#',
  onSearchForFacetValues: () => undefined,
  onSearchStateChange: () => undefined,
  onSearchParameters: () => undefined,
  store: {} as Store,
  widgetsManager: {},
  mainTargetedIndex: '',
});
