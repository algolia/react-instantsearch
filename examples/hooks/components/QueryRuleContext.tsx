import { useQueryRules, UseQueryRulesProps } from 'react-instantsearch-hooks';

export type QueryRuleContextProps = UseQueryRulesProps;

export function QueryRuleContext(props: QueryRuleContextProps) {
  useQueryRules(props);
  return null;
}
