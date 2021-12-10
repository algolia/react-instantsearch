import connectSearchBox from 'instantsearch.js/es/connectors/search-box/connectSearchBox.js';

import { useConnector } from './useConnector';

import type {
  SearchBoxConnectorParams,
  SearchBoxWidgetDescription,
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox.js';

export type UseSearchBoxProps = SearchBoxConnectorParams;

export function useSearchBox(props?: UseSearchBoxProps) {
  return useConnector<SearchBoxConnectorParams, SearchBoxWidgetDescription>(
    connectSearchBox,
    props
  );
}
