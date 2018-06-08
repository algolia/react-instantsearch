import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createInstantSearch from 'react-instantsearch-vanilla';
import Context from './Context';

class InstantSearch extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    searchClient: PropTypes.shape({
      search: PropTypes.func.isRequired,
      searchForFacetValues: PropTypes.func.isRequired,
    }).isRequired,
    indexName: PropTypes.string.isRequired,
  };

  // It doesn't work with the StrictMode
  // we call createInstantSearch two times
  instance = createInstantSearch({
    searchClient: this.props.searchClient,
    indexName: this.props.indexName,
  });

  componentDidMount() {
    this.instance.start();
  }

  render() {
    return (
      // prettier-ignore
      <Context.Provider value={this.instance}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default InstantSearch;
