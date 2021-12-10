import connectHits from 'instantsearch.js/es/connectors/hits/connectHits.js';

import { useConnector } from './useConnector';

import type {
  HitsConnectorParams,
  HitsWidgetDescription,
} from 'instantsearch.js/es/connectors/hits/connectHits.js';

export type UseHitsProps = HitsConnectorParams;

export function useHits(props?: UseHitsProps) {
  return useConnector<HitsConnectorParams, HitsWidgetDescription>(
    connectHits,
    props
  );
}
