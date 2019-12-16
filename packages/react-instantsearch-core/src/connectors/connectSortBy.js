import { connectSortBy } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  /**
   * Compatibility layer
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */
  component.getDefaultRefinement = defaultRefinement => ({
    sortBy: defaultRefinement,
  });

  return createConnector(connectSortBy, component);
};
