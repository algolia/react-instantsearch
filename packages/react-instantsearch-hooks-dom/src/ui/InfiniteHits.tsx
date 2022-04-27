import React from 'react';

import { cx } from './lib/cx';

import type { Hit } from 'instantsearch.js';

type WrapperProps = React.ComponentProps<'div'>;

export type InfiniteHitsWidgetProps<THit> = WrapperProps & {
  classNames?: Partial<InfiniteHitsClassNames>;
  hitComponent?: React.JSXElementConstructor<{ hit: THit }>;
};

export type InfiniteHitsProps<THit> = Omit<
  InfiniteHitsWidgetProps<THit>,
  'hitComponent'
> &
  Required<Pick<InfiniteHitsWidgetProps<THit>, 'hitComponent'>> & {
    hits: THit[];
    isFirstPage: boolean;
    isLastPage: boolean;
    onShowPrevious: (() => void) | undefined;
    onShowMore: () => void;
    translations: InfiniteHitsTranslations;
  };

export type InfiniteHitsClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the root element without results
   */
  emptyRoot: string;
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

export function InfiniteHits<THit extends Hit>({
  hitComponent: HitComponent,
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
      className={cx(
        'ais-InfiniteHits',
        classNames.root,
        hits.length === 0 &&
          cx('ais-InfiniteHits--empty', classNames.emptyRoot),
        props.className
      )}
    >
      {onShowPrevious && (
        <button
          className={cx(
            'ais-InfiniteHits-loadPrevious',
            classNames.loadPrevious,
            isFirstPage &&
              cx(
                'ais-InfiniteHits-loadPrevious--disabled',
                classNames.disabledLoadPrevious
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
