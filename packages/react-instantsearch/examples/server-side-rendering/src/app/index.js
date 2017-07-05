import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch/dom';
import { InstantSearch } from 'react-instantsearch/server';

export default class App extends Component {
  render() {
    const { resultsState } = this.props;

    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="ikea"
        resultsState={resultsState}
      >
        <Configure hitsPerPage={3} />
        <SearchBox />
        <Hits />
        <RefinementList attributeName="category" />
      </InstantSearch>
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object,
};
