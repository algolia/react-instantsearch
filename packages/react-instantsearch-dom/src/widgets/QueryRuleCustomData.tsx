import React from 'react';
import { connectQueryRules, CustomUserData } from 'react-instantsearch-core';
import PanelCallbackHandler from '../components/PanelCallbackHandler';
import QueryRuleCustomData, {
  QueryRuleCustomDataProps,
} from '../components/QueryRuleCustomData';

const QueryRuleCustomDataWidget: React.SFC<
  QueryRuleCustomDataProps<CustomUserData>
> = props => (
  <PanelCallbackHandler {...props}>
    <QueryRuleCustomData {...props} />
  </PanelCallbackHandler>
);

export default connectQueryRules(QueryRuleCustomDataWidget);
