import connectQueryRules from 'instantsearch.js/es/connectors/query-rules/connectQueryRules.js';

import { useConnector } from './useConnector.js';

import type {
  QueryRulesConnectorParams,
  QueryRulesWidgetDescription,
} from 'instantsearch.js/es/connectors/query-rules/connectQueryRules.js';

export type UseQueryRulesProps = QueryRulesConnectorParams;

export function useQueryRules(props?: UseQueryRulesProps) {
  return useConnector<QueryRulesConnectorParams, QueryRulesWidgetDescription>(
    connectQueryRules,
    props
  );
}
