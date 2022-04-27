import React from 'react';
import { useInfiniteHits } from 'react-instantsearch-hooks';

import { InfiniteHits as InfiniteHitsUiComponent } from '../ui/InfiniteHits';

import type { InfiniteHitsWidgetProps } from '../ui/InfiniteHits';
import type { BaseHit, Hit } from 'instantsearch.js';
import type { UseInfiniteHitsProps } from 'react-instantsearch-hooks';

export type InfiniteHitsProps<THit extends BaseHit = BaseHit> =
  InfiniteHitsWidgetProps<Hit<THit>> &
    UseInfiniteHitsProps<THit> & {
      /**
       * Displays the "Show Previous" button when the UI is loaded from a page
       * beyond the first one.
       * @default true
       */
      showPrevious?: boolean;
    };

function DefaultHitComponent({ hit }: { hit: Hit }) {
  return (
    <div style={{ wordBreak: 'break-all' }}>
      {JSON.stringify(hit).slice(0, 100)}…
    </div>
  );
}

export function InfiniteHits<THit extends BaseHit = BaseHit>({
  showPrevious: shouldShowPrevious = true,
  hitComponent = DefaultHitComponent,
  ...props
}: InfiniteHitsProps<THit>) {
  const { hits, showPrevious, showMore, isFirstPage, isLastPage } =
    useInfiniteHits<THit>(props, { $$widgetType: 'ais.infiniteHits' });

  return (
    <InfiniteHitsUiComponent
      {...props}
      translations={{
        showPrevious: 'Show previous results',
        showMore: 'Show more results',
      }}
      hits={hits}
      hitComponent={hitComponent}
      onShowPrevious={shouldShowPrevious ? showPrevious : undefined}
      onShowMore={showMore}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
}
