import connectHitsPerPage from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js';

import { useConnector } from './useConnector';

import type {
  HitsPerPageConnectorParams,
  HitsPerPageWidgetDescription,
} from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js';

export type UseHitsPerPageProps = HitsPerPageConnectorParams;

export function useHitsPerPage(props: UseHitsPerPageProps) {
  return useConnector<HitsPerPageConnectorParams, HitsPerPageWidgetDescription>(
    connectHitsPerPage,
    props
  );
}
