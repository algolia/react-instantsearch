import connectPagination from 'instantsearch.js/es/connectors/pagination/connectPagination.js';

import { useConnector } from './useConnector.js';

import type {
  PaginationConnectorParams,
  PaginationWidgetDescription,
} from 'instantsearch.js/es/connectors/pagination/connectPagination.js';

export type UsePaginationProps = PaginationConnectorParams;

export function usePagination(props?: UsePaginationProps) {
  return useConnector<PaginationConnectorParams, PaginationWidgetDescription>(
    connectPagination,
    props
  );
}
