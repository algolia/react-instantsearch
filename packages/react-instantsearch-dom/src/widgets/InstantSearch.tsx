import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { InstantSearchProvider } from '../core/context';
import { PlainSearchParameters } from 'algoliasearch-helper';
import { MultiResponse } from 'algoliasearch';
import instantsearch from 'instantsearch.js';

type ResultsState = {
  state: PlainSearchParameters;
  rawResults: MultiResponse;
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
  resultsState: ResultsState | { [indexId: string]: ResultsState };
};

type State = {
  instantSearchInstance: Record<string, any>;
};

export class InstantSearch extends Component<Props, State> {
  static defaultProps = {
    stalledSearchDelay: 200,
    refresh: false,
  };

  static propTypes = {
    // @TODO: These props are currently constant.
    indexName: PropTypes.string.isRequired,

    searchClient: PropTypes.shape({
      search: PropTypes.func.isRequired,
      searchForFacetValues: PropTypes.func,
      addAlgoliaAgent: PropTypes.func,
      clearCache: PropTypes.func,
    }).isRequired,

    createURL: PropTypes.func,

    refresh: PropTypes.bool,

    searchState: PropTypes.object,
    onSearchStateChange: PropTypes.func,

    onSearchParameters: PropTypes.func,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    children: PropTypes.node,
    stalledSearchDelay: PropTypes.number,
  };

  constructor(props: Props) {
    super(props);

    this.instantSearchInstance = instantsearch({
      indexName: props.indexName,
      searchClient: props.searchClient,
    });

    this.state = {
      instantSearchInstance: this.instantSearchInstance,
    };
  }

  componentDidMount() {
    this.instantSearchInstance.start();
  }

  render() {
    if (Children.count(this.props.children) === 0) {
      return null;
    }

    return (
      <InstantSearchProvider value={this.state.instantSearchInstance}>
        {this.props.children}
      </InstantSearchProvider>
    );
  }
}
