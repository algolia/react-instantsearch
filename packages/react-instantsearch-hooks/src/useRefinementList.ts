import connectRefinementList from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList.js';

import { useConnector } from './useConnector.js';

import type {
  RefinementListConnectorParams,
  RefinementListWidgetDescription,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList.js';

export type UseRefinementListProps = RefinementListConnectorParams;

export function useRefinementList(props: UseRefinementListProps) {
  return useConnector<
    RefinementListConnectorParams,
    RefinementListWidgetDescription
  >(connectRefinementList, props);
}
