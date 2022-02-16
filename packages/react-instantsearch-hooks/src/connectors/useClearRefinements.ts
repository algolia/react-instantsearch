import connectClearRefinements from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

import { useConnector } from '../hooks/useConnector';

import type {
  ClearRefinementsConnectorParams,
  ClearRefinementsWidgetDescription,
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

export type UseClearRefinementsProps = ClearRefinementsConnectorParams;

export function useClearRefinements(
  props?: UseClearRefinementsProps,
  widgetType?: string
) {
  return useConnector<
    ClearRefinementsConnectorParams,
    ClearRefinementsWidgetDescription
  >(connectClearRefinements, props, widgetType);
}
