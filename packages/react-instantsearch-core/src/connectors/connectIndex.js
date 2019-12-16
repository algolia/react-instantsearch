import { index } from 'instantsearch.js/es/widgets';

import createConnector from '../core/createConnector';

export default component => createConnector(() => index, component);
