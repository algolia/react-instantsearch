import React from 'react';
import { useHits } from 'react-instantsearch-hooks';

import { Hits as HitsUiComponent } from '../ui/Hits';

import type { HitsWidgetProps } from '../ui/Hits';
import type { Hit, BaseHit } from 'instantsearch.js';
import type { UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit extends BaseHit> = HitsWidgetProps<Hit<THit>> &
  UseHitsProps<THit>;

function DefaultHitComponent({ hit }: { hit: Hit }) {
  return (
    <div style={{ wordBreak: 'break-all' }}>
      {JSON.stringify(hit).slice(0, 100)}…
    </div>
  );
}

export function Hits<THit extends BaseHit = BaseHit>({
  hitComponent = DefaultHitComponent,
  ...props
}: HitsProps<THit>) {
  const { hits } = useHits<THit>(props, { $$widgetType: 'ais.hits' });

  return <HitsUiComponent {...props} hits={hits} hitComponent={hitComponent} />;
}
