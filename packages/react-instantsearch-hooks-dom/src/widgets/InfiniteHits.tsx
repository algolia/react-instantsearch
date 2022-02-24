import React from 'react';
import { useInfiniteHits } from 'react-instantsearch-hooks';

import { InfiniteHits as InfiniteHitsUiComponent } from '../ui/InfiniteHits';

import type { InfiniteHitsProps as InfiniteHitsUiComponentProps } from '../ui/InfiniteHits';
import type { BaseHit, Hit } from 'instantsearch.js';
import type { UseInfiniteHitsProps } from 'react-instantsearch-hooks';

export type InfiniteHitsProps<THit extends BaseHit = BaseHit> = Omit<
  InfiniteHitsUiComponentProps<Hit<THit>>,
  'hits' | 'showPrevious' | 'showMore' | 'isFirstPage' | 'isLastPage'
> &
  UseInfiniteHitsProps<THit> & {
    /**
     * Enable the display of "show previous" if the interface is loaded from
     * a page past the first page
     * @default true
     */
    showPrevious?: boolean;
  };

export function InfiniteHits<THit extends BaseHit = BaseHit>({
  showPrevious: shouldShowPrevious = true,
  ...props
}: InfiniteHitsProps<THit>) {
  const { hits, showPrevious, showMore, isFirstPage, isLastPage } =
    useInfiniteHits<THit>(props, { $$widgetType: 'ais.infiniteHits' });

  return (
    <InfiniteHitsUiComponent
      {...props}
      hits={hits}
      showPrevious={shouldShowPrevious ? showPrevious : undefined}
      showMore={showMore}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
}
