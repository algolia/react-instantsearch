type SearchState = any; // @TODO: give searchState type
type ResultsState = any; // @TODO: give results type
type ResultsFacetsValues = any;
type Listener = () => any;
type State = {
  widgets: SearchState;
  metadata: any[];
  results: ResultsState | null;
  resultsFacetValues: ResultsFacetsValues | null;
  error: any | null;
  searching: boolean;
  isSearchStalled: boolean;
  searchingForFacetValues: boolean;
};
export default function createStore(initialState: State) {
  let state = initialState;
  const listeners: Listener[] = [];
  function dispatch() {
    listeners.forEach(listener => listener());
  }
  return {
    getState() {
      return state;
    },
    setState(nextState: State) {
      state = nextState;
      dispatch();
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
