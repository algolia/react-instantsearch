import connectRange from 'instantsearch.js/es/connectors/range/connectRange.js';

import { useConnector } from './useConnector';

import type {
  RangeConnectorParams,
  RangeWidgetDescription,
} from 'instantsearch.js/es/connectors/range/connectRange.js';

export type UseRangeProps = RangeConnectorParams;

export function useRange(props: UseRangeProps) {
  return useConnector<RangeConnectorParams, RangeWidgetDescription>(
    connectRange,
    props
  );
}
