import connectConfigure from 'instantsearch.js/es/connectors/configure/connectConfigure';

import { useConnector } from '../hooks/useConnector';

import type {
  ConfigureConnectorParams,
  ConfigureWidgetDescription,
} from 'instantsearch.js/es/connectors/configure/connectConfigure';

export type UseConfigureProps = ConfigureConnectorParams['searchParameters'];

export function useConfigure(props: UseConfigureProps, widgetType?: string) {
  return useConnector<ConfigureConnectorParams, ConfigureWidgetDescription>(
    connectConfigure,
    { searchParameters: props },
    widgetType
  );
}
