import connectInfiniteHits from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

import { useConnector } from '../hooks/useConnector';

import type { AdditionalWidgetProperties } from '../hooks/useConnector';
import type {
  InfiniteHitsConnectorParams,
  InfiniteHitsWidgetDescription,
} from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

export type UseInfiniteHitsProps = InfiniteHitsConnectorParams;

export function useInfiniteHits(
  props?: UseInfiniteHitsProps,
  additionalWidgetProperties?: AdditionalWidgetProperties
) {
  return useConnector<
    InfiniteHitsConnectorParams,
    InfiniteHitsWidgetDescription
  >(connectInfiniteHits, props, additionalWidgetProperties);
}
