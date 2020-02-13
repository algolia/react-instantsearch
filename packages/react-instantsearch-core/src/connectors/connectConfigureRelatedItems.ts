import { EXPERIMENTAL_connectConfigureRelatedItems } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component =>
  createConnector(EXPERIMENTAL_connectConfigureRelatedItems, component);
