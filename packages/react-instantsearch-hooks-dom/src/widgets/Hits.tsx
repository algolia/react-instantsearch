import React from 'react';
import { useHits } from 'react-instantsearch-hooks';

import { Hits as HitsUiComponent } from '../ui/Hits';

import type { HitsProps as HitsUiComponentProps } from '../ui/Hits';
import type { Hit, BaseHit } from 'instantsearch.js';
import type { UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit> = Omit<HitsUiComponentProps<Hit & THit>, 'hits'> &
  UseHitsProps;

export function Hits<THit extends BaseHit = BaseHit>(props: HitsProps<THit>) {
  // @TODO: make useHit generic so this cast is no longer needed.
  // for that, connectHits needs to be generic too,
  // and therefore Connector as well
  const hits = useHits(props, { $$widgetType: 'ais.hits' }).hits as Array<
    THit & Hit
  >;

  return <HitsUiComponent {...props} hits={hits} />;
}
