import { connectHitsWithInsights } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => createConnector(connectHitsWithInsights, component);
