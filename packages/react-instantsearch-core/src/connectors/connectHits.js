import { connectHits } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  /**
   * Compatibility layer
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */
  component.getWidgetParams = props => props;

  component.getRenderParams = props => {
    const { hits, widgetParams } = props;
    const { hitComponent } = widgetParams;

    const providedProps = {
      hits,
      hitComponent,
    };

    return providedProps;
  };

  return createConnector(connectHits, component);
};
