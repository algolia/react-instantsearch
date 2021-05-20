import createConnector from '../core/createConnector';
import { getResults } from '../core/indexUtils';

export default createConnector({
  displayName: 'AlgoliaDynamicWidgets',

  getProvidedProps(props, _searchState, searchResults) {
    const results = getResults(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue,
    });

    if (!results) {
      return { attributesToRender: [] };
    }

    // retrieve the facet order out of the results:
    // results.facetOrder.map(facet => facet.attribute)
    const facetOrder = [];

    return {
      attributesToRender: props.transformItems(facetOrder, { results }),
    };
  },
});
