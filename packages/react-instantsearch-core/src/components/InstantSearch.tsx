import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import createInstantSearchManager from '../core/createInstantSearchManager';
import { InstantSearchProvider, InstantSearchContext } from '../core/context';
import { Store } from '../core/createStore';

function isControlled(props: Props) {
  return Boolean(props.searchState);
}

function validateNextProps(props, nextProps) {
  if (!props.searchState && nextProps.searchState) {
    throw new Error(
      "You can't switch <InstantSearch> from being uncontrolled to controlled"
    );
  } else if (props.searchState && !nextProps.searchState) {
    throw new Error(
      "You can't switch <InstantSearch> from being controlled to uncontrolled"
    );
  }
}

// @TODO: move this to the helper?
type SearchParameters = any; // algoliaHelper.SearchParameters
type SearchResults = any; // algoliaHelper.SearchResults

// @TODO: move to createInstantSearchManager when it's TS
type InstantSearchManager = {
  store: Store;
  widgetsManager: any;
  getWidgetsIds: any;
  getSearchParameters: (
    ...args: any[]
  ) => {
    mainParameters: SearchParameters;
    derivedParameters: SearchParameters;
  };
  onSearchForFacetValues: (...args: any[]) => any;
  onExternalStateUpdate: (...args: any[]) => any;
  transitionState: any;
  updateClient: any;
  updateIndex: any;
  clearCache: () => void;
  skipSearch: any;
};

type SearchClient = {
  search: (requests: Array<{}>) => Promise<{}>;
  searchForFacetValues: (requests: Array<{}>) => Promise<{}>;
};

type SearchState = any;

type Props = {
  refresh: boolean;
  indexName: string;
  searchClient: SearchClient;
  createURL?: (searchState: SearchState, knownKeys: any) => string;
  onSearchStateChange?: (searchState: SearchState) => void;
  searchState?: SearchState;
  onSearchParameters?: (
    getSearchParameters: (...args: any) => any,
    context: any,
    props: any,
    searchState: SearchState
  ) => void;
  stalledSearchDelay?: number;
  resultsState: SearchResults | { [indexId: string]: SearchResults };
};

type State = {
  isControlled: boolean;
  contextValue: InstantSearchContext;
};

/**
 * @description
 * `<InstantSearch>` is the root component of all React InstantSearch implementations.
 * It provides all the connected components (aka widgets) a means to interact
 * with the searchState.
 * @kind widget
 * @name <InstantSearch>
 * @requirements You will need to have an Algolia account to be able to use this widget.
 * [Create one now](https://www.algolia.com/users/sign_up).
 * @propType {string} indexName - Main index in which to search.
 * @propType {boolean} [refresh=false] - Flag to activate when the cache needs to be cleared so that the front-end is updated when a change occurs in the index.
 * @propType {object} [searchClient] - Provide a custom search client.
 * @propType {func} [onSearchStateChange] - Function to be called everytime a new search is done. Useful for [URL Routing](guide/Routing.html).
 * @propType {object} [searchState] - Object to inject some search state. Switches the InstantSearch component in controlled mode. Useful for [URL Routing](guide/Routing.html).
 * @propType {func} [createURL] - Function to call when creating links, useful for [URL Routing](guide/Routing.html).
 * @propType {SearchResults|SearchResults[]} [resultsState] - Use this to inject the results that will be used at first rendering. Those results are found by using the `findResultsState` function. Useful for [Server Side Rendering](guide/Server-side_rendering.html).
 * @propType {number} [stalledSearchDelay=200] - The amount of time before considering that the search takes too much time. The time is expressed in milliseconds.
 * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox />
 *     <Hits />
 *   </InstantSearch>
 * );
 */
class InstantSearch extends Component<Props, State> {
  static defaultProps = {
    stalledSearchDelay: 200,
    refresh: false,
  };

  static propTypes = {
    // @TODO: These props are currently constant.
    indexName: PropTypes.string.isRequired,

    searchClient: PropTypes.object.isRequired,

    createURL: PropTypes.func,

    refresh: PropTypes.bool,

    searchState: PropTypes.object,
    onSearchStateChange: PropTypes.func,

    onSearchParameters: PropTypes.func,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    children: PropTypes.node,
    stalledSearchDelay: PropTypes.number,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const nextState = {
      isControlled: isControlled(nextProps),
    };

    if (!prevState.isControlled && nextState.isControlled) {
      throw new Error(
        "You can't switch <InstantSearch> from being uncontrolled to controlled"
      );
    }

    if (prevState.isControlled && !nextState.isControlled) {
      throw new Error(
        "You can't switch <InstantSearch> from being controlled to uncontrolled"
      );
    }

    return nextState;
  }

  isUnmounting: boolean;
  aisManager: InstantSearchManager;

  constructor(props: Props) {
    super(props);
    const initialState = props.searchState || {};
    this.isUnmounting = false;

    this.aisManager = createInstantSearchManager({
      indexName: props.indexName,
      searchClient: props.searchClient,
      initialState,
      resultsState: props.resultsState,
      stalledSearchDelay: props.stalledSearchDelay,
    });

    this.state = {
      isControlled: isControlled(this.props),
      contextValue: {
        onInternalStateUpdate: this.onWidgetsInternalStateUpdate.bind(this),
        createHrefForState: this.createHrefForState.bind(this),
        onSearchForFacetValues: this.onSearchForFacetValues.bind(this),
        onSearchStateChange: this.onSearchStateChange.bind(this),
        onSearchParameters: this.onSearchParameters.bind(this),
        store: this.aisManager.store,
        widgetsManager: this.aisManager.widgetsManager,
        mainTargetedIndex: this.props.indexName,
      },
    };
  }

  componentDidUpdate() {
    if (this.props.refresh) {
      this.aisManager.clearCache();
    }

    if (this.state.isControlled) {
      this.aisManager.onExternalStateUpdate(this.props.searchState);
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true;
    this.aisManager.skipSearch();
  }

  createHrefForState(searchState: SearchState) {
    searchState = this.aisManager.transitionState(searchState);
    return this.state.isControlled && this.props.createURL
      ? this.props.createURL(searchState, this.getKnownKeys())
      : '#';
  }

  onWidgetsInternalStateUpdate(searchState: SearchState) {
    searchState = this.aisManager.transitionState(searchState);

    this.onSearchStateChange(searchState);

    if (!this.state.isControlled) {
      this.aisManager.onExternalStateUpdate(searchState);
    }
  }

  onSearchStateChange(searchState) {
    if (this.props.onSearchStateChange && !this.isUnmounting) {
      this.props.onSearchStateChange(searchState);
    }
  }

  onSearchParameters(getSearchParameters, context, props) {
    if (this.props.onSearchParameters) {
      const searchState = this.props.searchState ? this.props.searchState : {};
      this.props.onSearchParameters(
        getSearchParameters,
        context,
        props,
        searchState
      );
    }
  }

  onSearchForFacetValues(searchState) {
    this.aisManager.onSearchForFacetValues(searchState);
  }

  getKnownKeys() {
    return this.aisManager.getWidgetsIds();
  }

  render() {
    if (Children.count(this.props.children) === 0) {
      return null;
    }

    // @TODO: should this be in a different spot
    this.aisManager.updateIndex(this.props.indexName);
    this.aisManager.updateClient(this.props.searchClient);

    return (
      <InstantSearchProvider value={this.state.contextValue}>
        {this.props.children}
      </InstantSearchProvider>
    );
  }
}

export default InstantSearch;
