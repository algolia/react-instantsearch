import React from 'react';

import { cx } from './lib/cx';

import type { Hit } from 'instantsearch.js';
import type { JSXElementConstructor } from 'react';

export type InfiniteHitsProps<THit> = React.ComponentProps<'div'> & {
  hitComponent?: JSXElementConstructor<{ hit: THit }>;
  hits: THit[];
  isFirstPage: boolean;
  isLastPage: boolean;
  showPrevious?: () => void;
  showMore: () => void;
};

function DefaultHitComponent({ hit }: { hit: Hit }) {
  return (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
        wordBreak: 'break-all',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}…
    </div>
  );
}

export function InfiniteHits<THit extends Hit>({
  hitComponent: HitComponent = DefaultHitComponent,
  hits,
  isFirstPage,
  isLastPage,
  showPrevious,
  showMore,
  ...props
}: InfiniteHitsProps<THit>) {
  return (
    <div {...props} className={cx('ais-InfiniteHits', props.className)}>
      {showPrevious && (
        <button
          className={cx(
            'ais-InfiniteHits-loadPrevious',
            isFirstPage && 'ais-InfiniteHits-loadPrevious--disabled'
          )}
          onClick={showPrevious}
          disabled={isFirstPage}
        >
          Show previous results
        </button>
      )}
      <ol className="ais-InfiniteHits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-InfiniteHits-item">
            <HitComponent hit={hit} />
          </li>
        ))}
      </ol>
      <button
        className={cx(
          'ais-InfiniteHits-loadMore',
          isLastPage && 'ais-InfiniteHits-loadMore--disabled'
        )}
        onClick={showMore}
        disabled={isLastPage}
      >
        Show more results
      </button>
    </div>
  );
}
