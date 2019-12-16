import { connectNumericMenu } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => createConnector(connectNumericMenu, component);
