import React from 'react';
import { useInfiniteHits } from 'react-instantsearch-hooks';

import { InfiniteHits as InfiniteHitsUiComponent } from '../ui/InfiniteHits';

import type { InfiniteHitsProps as InfiniteHitsUiComponentProps } from '../ui/InfiniteHits';
import type { Hit } from 'instantsearch.js';
import type { UseInfiniteHitsProps } from 'react-instantsearch-hooks';

export type InfiniteHitsProps<THit> = Omit<
  InfiniteHitsUiComponentProps<Hit & THit>,
  'hits' | 'showPrevious' | 'showMore' | 'isFirstPage' | 'isLastPage'
> &
  UseInfiniteHitsProps & {
    /**
     * Enable the display of "show previous" if the interface is loaded from
     * a page past the first page
     * @default true
     */
    showPrevious?: boolean;
  };

export function InfiniteHits<
  THit extends Record<string, unknown> = Record<string, unknown>
>({
  showPrevious: shouldShowPrevious = true,
  ...props
}: InfiniteHitsProps<THit>) {
  const { hits, showPrevious, showMore, isFirstPage, isLastPage } =
    useInfiniteHits(props);

  return (
    <InfiniteHitsUiComponent
      {...props}
      // @TODO: make useInfiniteHits generic so this cast is no longer needed.
      // for that, connectInfiniteHits needs to be generic too,
      // and therefore Connector as well
      hits={hits as Array<Hit & THit>}
      showPrevious={shouldShowPrevious ? showPrevious : undefined}
      showMore={showMore}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
}
