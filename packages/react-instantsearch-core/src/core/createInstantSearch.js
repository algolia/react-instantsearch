import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstantSearch from '../components/InstantSearch';
import version from './version';

/**
 * Creates a specialized root InstantSearch component. It accepts
 * a specification of the root Element.
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */
export default function createInstantSearch(root) {
  return class CreateInstantSearch extends Component {
    static propTypes = {
      searchClient: PropTypes.shape({
        search: PropTypes.func.isRequired,
        searchForFacetValues: PropTypes.func,
        addAlgoliaAgent: PropTypes.func,
        clearCache: PropTypes.func,
      }).isRequired,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
      indexName: PropTypes.string.isRequired,
      createURL: PropTypes.func,
      searchState: PropTypes.object,
      refresh: PropTypes.bool.isRequired,
      onSearchStateChange: PropTypes.func,
      onSearchParameters: PropTypes.func,
      resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      root: PropTypes.shape({
        Root: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.object,
        ]).isRequired,
        props: PropTypes.object,
      }),
    };

    static defaultProps = {
      refresh: false,
      root,
    };

    constructor(...args) {
      super(...args);

      this.client = this.props.searchClient;

      if (typeof this.client.addAlgoliaAgent === 'function') {
        this.client.addAlgoliaAgent(`react (${React.version})`);
        this.client.addAlgoliaAgent(`react-instantsearch (${version})`);
      }
    }

    componentWillReceiveProps(nextProps) {
      this.client = nextProps.searchClient;

      if (typeof this.client.addAlgoliaAgent === 'function') {
        // @TODO: maybe DidUpdate if that's not too late, otherwise side effect in derived state
        this.client.addAlgoliaAgent(`react (${React.version})`);
        this.client.addAlgoliaAgent(`react-instantsearch (${version})`);
      }
    }

    render() {
      return (
        <InstantSearch
          createURL={this.props.createURL}
          indexName={this.props.indexName}
          searchState={this.props.searchState}
          onSearchStateChange={this.props.onSearchStateChange}
          onSearchParameters={this.props.onSearchParameters}
          root={this.props.root}
          searchClient={this.client}
          refresh={this.props.refresh}
          resultsState={this.props.resultsState}
        >
          {this.props.children}
        </InstantSearch>
      );
    }
  };
}
