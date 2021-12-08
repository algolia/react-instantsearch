import connectDynamicWidgets from 'instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js';

import { useConnector } from './useConnector.js';

import type {
  DynamicWidgetsConnectorParams,
  DynamicWidgetsWidgetDescription,
} from 'instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js';

export type UseDynamicWidgetsProps = Omit<
  DynamicWidgetsConnectorParams,
  'widgets' | 'fallbackWidget'
>;

export function useDynamicWidgets(props?: UseDynamicWidgetsProps) {
  return useConnector<
    DynamicWidgetsConnectorParams,
    DynamicWidgetsWidgetDescription
  >(connectDynamicWidgets, {
    ...props,
    // We don't rely on InstantSearch.js for rendering widgets because React
    // directly manipulates the children.
    widgets: [],
  });
}
