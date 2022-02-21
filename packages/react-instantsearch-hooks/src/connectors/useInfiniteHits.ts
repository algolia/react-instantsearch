import connectInfiniteHits from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

import { useConnector } from '../hooks/useConnector';

import type { AdditionalWidgetProperties } from '../hooks/useConnector';
import type {
  InfiniteHitsConnectorParams,
  InfiniteHitsWidgetDescription,
  InfiniteHitsConnector,
} from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

export type UseInfiniteHitsProps<
  THit extends Record<string, unknown> = Record<string, unknown>
> = InfiniteHitsConnectorParams<THit>;

export function useInfiniteHits<
  THit extends Record<string, unknown> = Record<string, unknown>
>(
  props?: UseInfiniteHitsProps<THit>,
  additionalWidgetProperties?: AdditionalWidgetProperties
) {
  return useConnector<
    InfiniteHitsConnectorParams<THit>,
    InfiniteHitsWidgetDescription<THit>
  >(
    connectInfiniteHits as InfiniteHitsConnector<THit>,
    props,
    additionalWidgetProperties
  );
}
