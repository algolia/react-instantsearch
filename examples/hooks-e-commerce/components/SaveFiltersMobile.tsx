import React from 'react';
import { connectStats } from 'instantsearch.js/es/connectors';
import {
  StatsConnectorParams,
  StatsWidgetDescription,
} from 'instantsearch.js/es/connectors/stats/connectStats';
import { useConnector } from 'react-instantsearch-hooks-web';
import { formatNumber } from '../utils';

export function SaveFiltersMobile({ onClick }: { onClick: () => void }) {
  const { nbHits } = useConnector<StatsConnectorParams, StatsWidgetDescription>(
    connectStats,
    {},
    { $$widgetType: 'e-commerce.stats' }
  );
  return (
    <button className="button button-primary" onClick={onClick}>
      See {formatNumber(nbHits)} results
    </button>
  );
}
