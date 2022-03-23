import React from 'react';
import { usePagination } from 'react-instantsearch-hooks';

import { cx } from '../ui/lib/cx';
import { Pagination as PaginationUiComponent } from '../ui/Pagination';

import type { ClassNames } from '../types';
import type { PaginationProps as PaginationUiComponentProps } from '../ui/Pagination';
import type { UsePaginationProps } from 'react-instantsearch-hooks';

export type PaginationProps = Omit<
  ClassNames<PaginationUiComponentProps>,
  | 'pages'
  | 'currentPage'
  | 'isFirstPage'
  | 'isLastPage'
  | 'nbPages'
  | 'createURL'
  | 'onNavigate'
  | 'translations'
> &
  UsePaginationProps;

export function Pagination({
  showFirst,
  showPrevious,
  showNext,
  showLast,
  padding,
  totalPages,
  classNames = {},
  ...props
}: PaginationProps) {
  const {
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    nbPages,
    createURL,
    refine,
  } = usePagination(
    { padding, totalPages },
    {
      $$widgetType: 'ais.pagination',
    }
  );

  return (
    <PaginationUiComponent
      {...props}
      translations={{
        first: '‹‹',
        previous: '‹',
        next: '›',
        last: '››',
        page: (currentPage: number) => String(currentPage),
        ariaFirst: 'First',
        ariaPrevious: 'Previous',
        ariaNext: 'Next',
        ariaLast: 'Last',
        ariaPage: (currentPage: number) => `Page ${currentPage}`,
      }}
      classNames={{
        root: cx('ais-Pagination', classNames.root),
        rootNoRefinement: cx(
          'ais-Pagination--noRefinement',
          classNames.rootNoRefinement
        ),
        list: cx('ais-Pagination-list', classNames.list),
        itemFirstPage: cx(
          'ais-Pagination-item--firstPage',
          classNames.itemFirstPage
        ),
        itemPreviousPage: cx(
          'ais-Pagination-item--previousPage',
          classNames.itemPreviousPage
        ),
        itemPage: cx('ais-Pagination-item--page', classNames.itemPage),
        itemSelected: cx(
          'ais-Pagination-item--selected',
          classNames.itemSelected
        ),
        itemNextPage: cx(
          'ais-Pagination-item--nextPage',
          classNames.itemNextPage
        ),
        itemLastPage: cx(
          'ais-Pagination-item--lastPage',
          classNames.itemLastPage
        ),
      }}
      showFirst={showFirst}
      showPrevious={showPrevious}
      showNext={showNext}
      showLast={showLast}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      currentPage={currentRefinement}
      nbPages={nbPages}
      createURL={createURL}
      onNavigate={refine}
      pages={pages}
    />
  );
}
