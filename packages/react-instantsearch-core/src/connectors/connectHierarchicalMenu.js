import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  const ConnectedHierarchicalMenu = createConnector(
    connectHierarchicalMenu,
    component
  );

  /**
   * Compatibility layer
   *
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */

  component.getProvidedProps = props => {
    const canRefine = props.nbPages > 1;

    props.items = props.items.map(item => {
      item.items = item.data;
      delete item.data;
      return item;
    });

    const newProps = {
      ...props,
      canRefine,
    };

    return newProps;
  };

  return ConnectedHierarchicalMenu;
};
