import connectCurrentRefinements from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js';

import { useConnector } from './useConnector.js';

import type {
  CurrentRefinementsConnectorParams,
  CurrentRefinementsWidgetDescription,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js';

export type UseCurrentRefinementsProps = CurrentRefinementsConnectorParams;

export function useCurrentRefinements(props?: UseCurrentRefinementsProps) {
  return useConnector<
    CurrentRefinementsConnectorParams,
    CurrentRefinementsWidgetDescription
  >(connectCurrentRefinements, props);
}
