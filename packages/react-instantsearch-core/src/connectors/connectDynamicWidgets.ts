import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import { getResults } from '../core/indexUtils';

export default createConnector({
  displayName: 'AlgoliaDynamicWidgets',

  defaultProps: {
    transformItems: items => items,
    requestAllFacets: true,
  },

  propTypes: {
    transformItems: PropTypes.func,
    requestAllFacets: PropTypes.bool,
  },

  getSearchParameters(searchParameters, props) {
    if (!props.requestAllFacets) {
      return searchParameters;
    }

    return searchParameters.setQueryParameter('facets', ['*']);
  },

  getProvidedProps(props, _searchState, searchResults) {
    const results = getResults(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue,
    });

    if (!results) {
      return { attributesToRender: [] };
    }

    const facetOrder =
      (results.renderingContent &&
        results.renderingContent.facetOrdering &&
        results.renderingContent.facetOrdering.facets &&
        results.renderingContent.facetOrdering.facets.order) ||
      [];

    return {
      attributesToRender: props.transformItems(facetOrder, { results }),
    };
  },
});
