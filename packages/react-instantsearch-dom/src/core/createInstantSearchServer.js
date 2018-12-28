import { isEmpty, zipWith } from 'lodash';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import algoliasearchHelper, {
  SearchResults,
  SearchParameters,
} from 'algoliasearch-helper';
import {
  createInstantSearch,
  version,
  HIGHLIGHT_TAGS,
} from 'react-instantsearch-core';

const getIndex = context =>
  context && context.multiIndexContext
    ? context.multiIndexContext.targetedIndex
    : context.ais.mainTargetedIndex;

const hasMultipleIndex = context => context && context.multiIndexContext;

const getSearchParameters = (indexName, searchParameters) => {
  const sharedParameters = searchParameters
    .filter(searchParameter => !hasMultipleIndex(searchParameter.context))
    .reduce(
      (acc, searchParameter) =>
        searchParameter.getSearchParameters(
          acc,
          searchParameter.props,
          searchParameter.searchState
        ),
      new SearchParameters({
        ...HIGHLIGHT_TAGS,
        index: indexName,
      })
    );

  const derivedParameters = searchParameters
    .filter(searchParameter => hasMultipleIndex(searchParameter.context))
    .reduce((acc, searchParameter) => {
      const index = getIndex(searchParameter.context);

      return {
        ...acc,
        [index]: searchParameter.getSearchParameters(
          acc[index] || sharedParameters,
          searchParameter.props,
          searchParameter.searchState
        ),
      };
    }, {});

  return {
    sharedParameters,
    derivedParameters,
  };
};

const createInstantSearchServer = algoliasearch => {
  const InstantSearch = createInstantSearch(algoliasearch, {
    Root: 'div',
    props: { className: 'ais-InstantSearch__root' },
  });

  let searchParameters = [];
  let client;
  let indexName = '';

  const onSearchParameters = (
    getWidgetSearchParameters,
    context,
    props,
    searchState
  ) => {
    searchParameters.push({
      getSearchParameters: getWidgetSearchParameters,
      index: getIndex(context),
      context,
      props,
      searchState,
    });
  };

  const findResultsState = function(App, props) {
    searchParameters = [];

    renderToString(<App {...props} />);

    const { sharedParameters, derivedParameters } = getSearchParameters(
      indexName,
      searchParameters
    );

    if (isEmpty(derivedParameters)) {
      const helper = algoliasearchHelper(client, sharedParameters.index);
      return helper.searchOnce(sharedParameters);
    } else {
      const helper = algoliasearchHelper(client, sharedParameters.index);
      const search = [];

      if (derivedParameters[indexName]) {
        search.push(
          helper.searchOnce({
            ...sharedParameters,
            ...derivedParameters[indexName],
          })
        );
        delete derivedParameters[indexName];
      } else {
        search.push(helper.searchOnce(sharedParameters));
      }

      const indexIds = Object.keys(derivedParameters);

      search.push(
        ...indexIds.map(indexId => {
          const derivedHelper = algoliasearchHelper(
            client,
            derivedParameters[indexId].index
          );
          return derivedHelper.searchOnce(derivedParameters[indexId]);
        })
      );

      return Promise.all(search).then(results =>
        zipWith([indexName, ...indexIds], results, (indexId, result) =>
          // We attach `indexId` on the results to be able to reconstruct the
          // object client side. We cannot rely on `state.index` anymore because
          // we may have multiple times the same index.
          ({
            ...result,
            _internalIndexId: indexId,
          })
        )
      );
    }
  };

  const decorateResults = function(results) {
    if (!results) {
      return undefined;
    }

    if (Array.isArray(results)) {
      return results.reduce(
        (acc, result) => ({
          ...acc,
          [result._internalIndexId]: new SearchResults(
            new SearchParameters(result.state),
            result._originalResponse.results
          ),
        }),
        {}
      );
    }

    return new SearchResults(
      new SearchParameters(results.state),
      results._originalResponse.results
    );
  };

  class CreateInstantSearchServer extends Component {
    static propTypes = {
      algoliaClient: PropTypes.object,
      searchClient: PropTypes.object,
      appId: PropTypes.string,
      apiKey: PropTypes.string,
      indexName: PropTypes.string.isRequired,
      resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    constructor(props) {
      super();

      if (props.searchClient) {
        if (props.appId || props.apiKey || props.algoliaClient) {
          throw new Error(
            'react-instantsearch:: `searchClient` cannot be used with `appId`, `apiKey` or `algoliaClient`.'
          );
        }
      }

      if (props.algoliaClient) {
        // eslint-disable-next-line no-console
        console.warn(
          '`algoliaClient` option was renamed `searchClient`. Please use this new option before the next major version.'
        );
      }

      client =
        props.searchClient ||
        props.algoliaClient ||
        algoliasearch(props.appId, props.apiKey);

      if (typeof client.addAlgoliaAgent === 'function') {
        client.addAlgoliaAgent(`react-instantsearch ${version}`);
      }

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
  }

  return { InstantSearch: CreateInstantSearchServer, findResultsState };
};

export default createInstantSearchServer;
