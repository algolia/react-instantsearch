import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createInstantSearch } from 'react-instantsearch-dom/server';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const { InstantSearch, findResultsState } = createInstantSearch();

class App extends Component {
  render() {
    const { resultsState } = this.props;

    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        resultsState={resultsState}
      >
        <Configure hitsPerPage={3} />
        <SearchBox />
        <Hits />
        <RefinementList attribute="categories" />
      </InstantSearch>
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object,
};

export { App, findResultsState };
