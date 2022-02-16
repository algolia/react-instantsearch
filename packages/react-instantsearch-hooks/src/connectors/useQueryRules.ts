import connectQueryRules from 'instantsearch.js/es/connectors/query-rules/connectQueryRules';

import { useConnector } from '../hooks/useConnector';

import type {
  QueryRulesConnectorParams,
  QueryRulesWidgetDescription,
} from 'instantsearch.js/es/connectors/query-rules/connectQueryRules';

export type UseQueryRulesProps = QueryRulesConnectorParams;

export function useQueryRules(props?: UseQueryRulesProps, widgetType?: string) {
  return useConnector<QueryRulesConnectorParams, QueryRulesWidgetDescription>(
    connectQueryRules,
    props,
    widgetType
  );
}
