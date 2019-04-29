import { isEqual } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import qs from 'qs';
import { Head, App, findResultsState } from '../components';

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

const searchStateToURL = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

class Page extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  };

  state = {
    searchState: this.props.searchState,
    lastRouter: this.props.router,
  };

  static async getInitialProps({ asPath }) {
    const searchState = pathToSearchState(asPath);
    const resultsState = await findResultsState(App, { searchState });

    return {
      resultsState,
      searchState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(state.lastRouter, props.router)) {
      return {
        searchState: pathToSearchState(props.router.asPath),
        lastRouter: props.router,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState);

      this.props.router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    this.setState({ searchState });
  };

  render() {
    return (
      <div>
        <Head title="Home" />
        <App
          searchState={this.state.searchState}
          resultsState={this.props.resultsState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
        />
      </div>
    );
  }
}

export default withRouter(Page);
