import connectPoweredBy from 'instantsearch.js/es/connectors/powered-by/connectPoweredBy';
import { safelyRunOnBrowser } from 'instantsearch.js/es/lib/utils';

import { useConnector } from './useConnector';

import type {
  PoweredByConnectorParams,
  PoweredByWidgetDescription,
} from 'instantsearch.js/es/connectors/powered-by/connectPoweredBy';

export function usePoweredBy() {
  return useConnector<PoweredByConnectorParams, PoweredByWidgetDescription>(
    connectPoweredBy,
    {
      url: `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=${safelyRunOnBrowser(
        ({ window }) => window.location?.hostname || '',
        { fallback: () => '' }
      )}&utm_campaign=poweredby`,
    }
  );
}
