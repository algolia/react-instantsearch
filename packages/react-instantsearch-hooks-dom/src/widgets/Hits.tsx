import React from 'react';
import { useHits } from 'react-instantsearch-hooks';

import { Hits as HitsUiComponent } from '../ui/Hits';

import type { Hit as AlgoliaHit } from '@algolia/client-search';
import type { UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

function getHitId<THit extends AlgoliaHit<Record<string, unknown>>>(hit: THit) {
  return hit.objectID;
}

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  ...props
}: HitsProps<THit>) {
  const { hits } = useHits(props);

  return <HitsUiComponent<THit> {...props} hits={hits} getHitId={getHitId} />;
}
