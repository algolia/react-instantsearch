import React from 'react';
import { useHits } from 'react-instantsearch-hooks';

import { Hits as HitsUiComponent } from '../ui/Hits';
import { cx } from '../ui/lib/cx';

import type { ClassNames } from '../types';
import type { HitsProps as HitsUiComponentProps } from '../ui/Hits';
import type { Hit, BaseHit } from 'instantsearch.js';
import type { UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit extends BaseHit> = Omit<
  ClassNames<HitsUiComponentProps<Hit<THit>>>,
  'hits'
> &
  UseHitsProps<THit>;

export function Hits<THit extends BaseHit = BaseHit>({
  classNames = {},
  ...props
}: HitsProps<THit>) {
  const { hits } = useHits<THit>(props, { $$widgetType: 'ais.hits' });

  return (
    <HitsUiComponent
      {...props}
      classNames={{
        root: cx('ais-Hits', classNames.root),
        list: cx('ais-Hits-list', classNames.list),
        item: cx('ais-Hits-item', classNames.item),
      }}
      hits={hits}
    />
  );
}
