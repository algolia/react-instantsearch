import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

import { useConnector } from '../hooks/useConnector';

import type { AdditionalWidgetProperties } from '../hooks/useConnector';
import type {
  HitsConnectorParams,
  HitsWidgetDescription,
} from 'instantsearch.js/es/connectors/hits/connectHits';

export type UseHitsProps = HitsConnectorParams;

export function useHits(
  props?: UseHitsProps,
  additionalWidgetProperties?: AdditionalWidgetProperties
) {
  return useConnector<HitsConnectorParams, HitsWidgetDescription>(
    connectHits,
    props,
    additionalWidgetProperties
  );
}
