import { connectPagination } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  /**
   * Compatibility layer
   *
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */
  component.getRenderParams = props => {
    return {
      ...props,
      canRefine: props.nbPages > 1,
    };
  };

  return createConnector(connectPagination, component);
};
