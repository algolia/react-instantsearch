import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { version } from '../../package.json';
import algoliasearchHelper, {
  SearchResults,
  SearchParameters,
} from 'algoliasearch-helper';
import ReactDom from 'react-dom/server';
import { getIndex, hasMultipleIndex } from './indexUtils';
import { isEmpty } from 'lodash';
import cis from './createInstantSearch';

const searchParameters = [];
let client;
let indexName = '';

const onSearchParameters = function(
  getSearchParameters,
  context,
  props,
  searchState
) {
  const index = getIndex(context);
  searchParameters.push({
    getSearchParameters,
    context,
    props,
    searchState,
    index,
  });
};

const findResults = function(App, params) {
  ReactDom.renderToString(<App {...params} />);
  const sharedSearchParameters = searchParameters
    .filter(searchParameter => !hasMultipleIndex(searchParameter.context))
    .reduce(
      (acc, searchParameter) =>
        searchParameter.getSearchParameters.call(
          { context: searchParameter.context },
          acc,
          searchParameter.props,
          searchParameter.searchState
        ),
      new SearchParameters({ index: indexName })
    );

  const mergedSearchParameters = searchParameters
    .filter(searchParameter => hasMultipleIndex(searchParameter.context))
    .reduce((acc, searchParameter) => {
      const index = getIndex(searchParameter.context);
      const sp = searchParameter.getSearchParameters.call(
        { context: searchParameter.context },
        acc[index] ? acc[index] : sharedSearchParameters,
        searchParameter.props,
        searchParameter.searchState
      );
      acc[index] = sp;
      return acc;
    }, {});

  if (isEmpty(mergedSearchParameters)) {
    const helper = algoliasearchHelper(client, sharedSearchParameters.index);
    return helper.searchOnce(sharedSearchParameters);
  } else {
    const search = Object.keys(mergedSearchParameters).map(key => {
      const helper = algoliasearchHelper(
        client,
        mergedSearchParameters[key].index
      );
      return helper.searchOnce(mergedSearchParameters[key]);
    });
    return Promise.all(search);
  }
};

const decorateResults = function(results) {
  if (!results) {
    return undefined;
  }
  return Array.isArray(results)
    ? results.reduce((acc, result) => {
        acc[result.state.index] = new SearchResults(
          new SearchParameters(result.state),
          result._originalResponse.results
        );
        return acc;
      }, [])
    : new SearchResults(
        new SearchParameters(results.state),
        results._originalResponse.results
      );
};

/**
 * Creates a specialized root InstantSearch component. It accepts
 * an algolia client and a specification of the root Element. This is the version dedicated to
 * server side rendering. 
 * @param {function} defaultAlgoliaClient - a function that builds an Algolia client
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */

const createInstantSearch = function(defaultAlgoliaClient, root) {
  const InstantSearch = cis(defaultAlgoliaClient, root);
  return class CreateInstantSearch extends Component {
    static propTypes = {
      algoliaClient: PropTypes.object,
      appId: PropTypes.string,
      apiKey: PropTypes.string,
      indexName: PropTypes.string.isRequired,
      resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    constructor(props) {
      super();
      client =
        props.algoliaClient || defaultAlgoliaClient(props.appId, props.apiKey);
      client.addAlgoliaAgent(`react-instantsearch ${version}`);
      indexName = props.indexName;
    }

    render() {
      const resultsState = decorateResults(this.props.resultsState);
      return (
        <InstantSearch
          {...this.props}
          resultsState={resultsState}
          onSearchParameters={onSearchParameters}
        />
      );
    }
  };
};

export { createInstantSearch, findResults };
