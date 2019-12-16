import React from 'react';

import { connectConfigure } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  const ConnectedConfigure = createConnector(connectConfigure, component);

  /**
   * Compatibility layer
   *
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */

  const CompatibleConnectedConfigure = props => {
    const newProps = {
      searchParameters: props,
    };
    return <ConnectedConfigure {...newProps} />;
  };

  component.getProvidedProps = props => props;

  return CompatibleConnectedConfigure;
};
