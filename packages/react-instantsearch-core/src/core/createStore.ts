import {
  SearchState,
  MetaData,
  SearchResults,
  SearchForFacetValuesResults,
} from '../types';

export type State = {
  widgets: SearchState;
  metadata: MetaData;
  results: SearchResults | null;
  resultsFacetValues: SearchForFacetValuesResults | null;
  error: any | null;
  searching: boolean;
  isSearchStalled: boolean;
  searchingForFacetValues: boolean;
};
type Listener = () => void;

export default function createStore(initialState: State) {
  let state = initialState;
  const listeners: Listener[] = [];
  return {
    getState() {
      return state;
    },
    setState(nextState: State) {
      state = nextState;
      listeners.forEach(listener => listener());
    },
    subscribe(listener: Listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    },
  };
}

export type Store = ReturnType<typeof createStore>;
