import connectCurrentRefinements from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

import { useConnector } from '../hooks/useConnector';

import type {
  CurrentRefinementsConnectorParams,
  CurrentRefinementsWidgetDescription,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

export type UseCurrentRefinementsProps = CurrentRefinementsConnectorParams;

export function useCurrentRefinements(
  props?: UseCurrentRefinementsProps,
  widgetType?: string
) {
  return useConnector<
    CurrentRefinementsConnectorParams,
    CurrentRefinementsWidgetDescription
  >(connectCurrentRefinements, props, widgetType);
}
