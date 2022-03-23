import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

import type { CreateURL } from 'instantsearch.js';

export type PaginationTranslations = {
  /**
   * The label for the first page's button.
   */
  first: string;
  /**
   * The label for the previous page's button.
   */
  previous: string;
  /**
   * The label for the next page's button.
   */
  next: string;
  /**
   * The label for the last page's button.
   */
  last: string;
  /**
   * The label for a page's button.
   */
  page(currentPage: number): string;
  /**
   * The accessible label for the first page's button.
   */
  ariaFirst: string;
  /**
   * The accessible label for the previous page's button.
   */
  ariaPrevious: string;
  /**
   * The accessible label for the next page's button.
   */
  ariaNext: string;
  /**
   * The accessible label for the last page's button.
   */
  ariaLast: string;
  /**
   * The accessible label for a page's button.
   */
  ariaPage(currentPage: number): string;
};

export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames: PaginationClassNames;
  pages: number[];
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nbPages: number;
  showFirst?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  showLast?: boolean;
  createURL: CreateURL<number>;
  onNavigate: (page: number) => void;
} & { translations: PaginationTranslations };

export type PaginationClassNames = {
  /**
   * Class names to apply to the root element.
   */
  root: string;
  /**
   * Class names to apply to the root element, when there's no refinement possible.
   */
  rootNoRefinement: string;
  /**
   * Class names to apply to the list element.
   */
  list: string;
  /**
   * Class names to apply to the first page element.
   */
  itemFirstPage: string;
  /**
   * Class names to apply to the previous page element.
   */
  itemPreviousPage: string;
  /**
   * Class names to apply to any page element.
   */
  itemPage: string;
  /**
   * Class names to apply to a selected page element.
   */
  itemSelected: string;
  /**
   * Class names to apply to the next page element.
   */
  itemNextPage: string;
  /**
   * Class names to apply to the last page element.
   */
  itemLastPage: string;
};

export function Pagination({
  pages,
  currentPage,
  nbPages,
  isFirstPage,
  isLastPage,
  showFirst = true,
  showPrevious = true,
  showNext = true,
  showLast = true,
  createURL,
  onNavigate,
  translations,
  classNames,
  ...props
}: PaginationProps) {
  const firstPageIndex = 0;
  const previousPageIndex = currentPage - 1;
  const nextPageIndex = currentPage + 1;
  const lastPageIndex = nbPages - 1;

  return (
    <div
      {...props}
      className={cx(
        classNames.root,
        nbPages <= 1 && classNames.rootNoRefinement,
        props.className
      )}
    >
      <ul className={classNames.list}>
        {showFirst && (
          <PaginationItem
            isDisabled={isFirstPage}
            aria-label={translations.ariaFirst}
            className={classNames.itemFirstPage}
            href={createURL(firstPageIndex)}
            onClick={() => onNavigate(firstPageIndex)}
          >
            {translations.first}
          </PaginationItem>
        )}
        {showPrevious && (
          <PaginationItem
            isDisabled={isFirstPage}
            aria-label={translations.ariaPrevious}
            className={classNames.itemPreviousPage}
            href={createURL(previousPageIndex)}
            onClick={() => onNavigate(previousPageIndex)}
          >
            {translations.previous}
          </PaginationItem>
        )}
        {pages.map((page) => {
          return (
            <PaginationItem
              key={page}
              isDisabled={false}
              className={cx(
                classNames.itemPage,
                page === currentPage && classNames.itemSelected
              )}
              aria-label={translations.ariaPage(page + 1)}
              href={createURL(page)}
              onClick={() => onNavigate(page)}
            >
              {translations.page(page + 1)}
            </PaginationItem>
          );
        })}
        {showNext && (
          <PaginationItem
            isDisabled={isLastPage}
            aria-label={translations.ariaNext}
            className={classNames.itemNextPage}
            href={createURL(nextPageIndex)}
            onClick={() => onNavigate(nextPageIndex)}
          >
            {translations.next}
          </PaginationItem>
        )}
        {showLast && (
          <PaginationItem
            isDisabled={isLastPage}
            aria-label={translations.ariaLast}
            className={classNames.itemLastPage}
            href={createURL(lastPageIndex)}
            onClick={() => onNavigate(lastPageIndex)}
          >
            {translations.last}
          </PaginationItem>
        )}
      </ul>
    </div>
  );
}

type PaginationItemProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick'
> & {
  onClick: NonNullable<
    React.AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  >;
} & {
  isDisabled: boolean;
};

function PaginationItem({
  isDisabled,
  className,
  href,
  onClick,
  ...props
}: PaginationItemProps) {
  if (isDisabled) {
    return (
      <li
        className={cx(
          'ais-Pagination-item ais-Pagination-item--disabled',
          className
        )}
      >
        <span className="ais-Pagination-link" {...props} />
      </li>
    );
  }

  return (
    <li className={cx('ais-Pagination-item', className)}>
      <a
        className="ais-Pagination-link"
        href={href}
        onClick={(event) => {
          if (isModifierClick(event)) {
            return;
          }

          event.preventDefault();

          onClick(event);
        }}
        {...props}
      />
    </li>
  );
}
