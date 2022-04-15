import React from 'react';

import { cx } from './lib/cx';

import type { Hit } from 'instantsearch.js';

export type InfiniteHitsProps<THit> = React.ComponentProps<'div'> & {
  hitComponent?: React.JSXElementConstructor<{ hit: THit }>;
  hits: THit[];
  isFirstPage: boolean;
  isLastPage: boolean;
  onShowPrevious?: () => void;
  onShowMore: () => void;
  classNames?: Partial<InfiniteHitsClassNames>;
  translations: InfiniteHitsTranslations;
};

export type InfiniteHitsClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the "load previous" button
   */
  loadPrevious: string;
  /**
   * Class names to apply to the "load previous" button when it's disabled
   */
  disabledLoadPrevious: string;
  /**
   * Class names to apply to the "load more" button
   */
  loadMore: string;
  /**
   * Class names to apply to the "load more" button when it's disabled
   */
  disabledLoadMore: string;
  /**
   * Class names to apply to the list element
   */
  list: string;
  /**
   * Class names to apply to each item element
   */
  item: string;
};

export type InfiniteHitsTranslations = {
  showPrevious: string;
  showMore: string;
};

function DefaultHitComponent({ hit }: { hit: Hit }) {
  return (
    <div style={{ wordBreak: 'break-all' }}>
      {JSON.stringify(hit).slice(0, 100)}…
    </div>
  );
}

export function InfiniteHits<THit extends Hit>({
  hitComponent: HitComponent = DefaultHitComponent,
  hits,
  isFirstPage,
  isLastPage,
  onShowPrevious,
  onShowMore,
  classNames = {},
  translations,
  ...props
}: InfiniteHitsProps<THit>) {
  return (
    <div
      {...props}
      className={cx('ais-InfiniteHits', classNames.root, props.className)}
    >
      {onShowPrevious && (
        <button
          className={cx(
            'ais-InfiniteHits-loadPrevious',
            classNames.loadPrevious,
            isFirstPage &&
              cx(
                classNames.disabledLoadPrevious,
                'ais-InfiniteHits-loadPrevious--disabled'
              )
          )}
          onClick={onShowPrevious}
          disabled={isFirstPage}
        >
          {translations.showPrevious}
        </button>
      )}
      <ol className={cx('ais-InfiniteHits-list', classNames.list)}>
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className={cx('ais-InfiniteHits-item', classNames.item)}
          >
            <HitComponent hit={hit} />
          </li>
        ))}
      </ol>
      <button
        className={cx(
          'ais-InfiniteHits-loadMore',
          classNames.loadMore,
          isLastPage &&
            cx(
              'ais-InfiniteHits-loadMore--disabled',
              classNames.disabledLoadMore
            )
        )}
        onClick={onShowMore}
        disabled={isLastPage}
      >
        {translations.showMore}
      </button>
    </div>
  );
}
