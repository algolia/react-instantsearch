import connectConfigure from 'instantsearch.js/es/connectors/configure/connectConfigure.js';

import { useConnector } from './useConnector.js';

import type {
  ConfigureConnectorParams,
  ConfigureWidgetDescription,
} from 'instantsearch.js/es/connectors/configure/connectConfigure.js';

export type UseConfigureProps = ConfigureConnectorParams['searchParameters'];

export function useConfigure(props: UseConfigureProps) {
  return useConnector<ConfigureConnectorParams, ConfigureWidgetDescription>(
    connectConfigure,
    { searchParameters: props }
  );
}
