import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { findResultsState } from 'react-instantsearch-dom/server';
import { Head, App } from '../components';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

const searchStateToURL = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

const DEFAULT_PROPS = {
  searchClient,
  indexName: 'instant_search',
};

class Page extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  };

  static async getInitialProps({ asPath }) {
    const searchState = pathToSearchState(asPath);
    const resultsState = await findResultsState(App, {
      ...DEFAULT_PROPS,
      searchState,
    });

    return {
      resultsState,
      searchState,
    };
  }

  onSearchStateChange = searchState => {
    const href = searchStateToURL(searchState);
    this.props.router.push(href, href);
  };

  render() {
    return (
      <div>
        <Head title="Home" />
        <App
          {...DEFAULT_PROPS}
          searchState={this.props.searchState}
          resultsState={this.props.resultsState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
        />
      </div>
    );
  }
}

export default withRouter(Page);
