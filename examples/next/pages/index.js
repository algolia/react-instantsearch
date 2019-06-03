import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import qs from 'qs';
import { Head, App, findResultsState } from '../components';

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

const SearchPage = ({ initialSearchState, resultsState }) => {
  const [searchState, setSearchState] = useState(initialSearchState);

  useEffect(() => {
    setSearchState(qs.parse(window.location.search.slice(1)));
  }, []);

  const onSearchStateChange = searchState => {
    clearTimeout(debouncedSetState);

    const debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState);

      Router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    setSearchState(searchState);
  };

  return (
    <div>
      <Head title="Home" />
      <div>
        <App
          searchState={searchState}
          resultsState={resultsState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        />
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  resultsState: PropTypes.object,
  initialSearchState: PropTypes.object,
};

SearchPage.getInitialProps = async ({ query }) => {
  const searchState = query ? qs.parse(query) : {};
  const resultsState = await findResultsState(App, { searchState });

  return { resultsState, initialSearchState: searchState };
};

export default withRouter(SearchPage);
