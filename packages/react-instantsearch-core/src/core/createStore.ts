export type SearchState = {
  [key: string]: any;
};

type ResultsState = any;

type ResultsFacetsValues = any;

type Listener = () => void;

export type Metadata = {
  [key: string]: any;
};

type State = {
  widgets: SearchState;
  metadata: Metadata[];
  results: ResultsState | null;
  resultsFacetValues?: ResultsFacetsValues;
  error: Error | null;
  searching: boolean;
  isSearchStalled: boolean;
  searchingForFacetValues: boolean;
};

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
