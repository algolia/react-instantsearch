import React from 'react';

import { cx } from './lib/cx';

import type { CreateURL } from 'instantsearch.js';

export type PaginationItem = {
  label: string;
  value: number;
};

export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  items: PaginationItem[];
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nbPages: number;
  createURL: CreateURL<number>;
  onClick: React.AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
};

export function Pagination({
  items,
  currentPage,
  nbPages,
  isFirstPage,
  isLastPage,
  createURL,
  onClick,
  ...props
}: PaginationProps) {
  return (
    <div
      {...props}
      className={cx(
        'ais-Pagination',
        items.length === 0 && 'ais-Pagination--noRefinement',
        props.className
      )}
    >
      <ul className="ais-Pagination-list">
        <PaginationItem
          isDisabled={isFirstPage}
          className="ais-Pagination-item--firstPage"
          aria-label="First"
          href={createURL(0)}
          onClick={onClick}
        >
          ‹‹
        </PaginationItem>
        <PaginationItem
          isDisabled={isFirstPage}
          className="ais-Pagination-item--previousPage"
          aria-label="Previous"
          href={createURL(currentPage - 1)}
          onClick={onClick}
        >
          ‹
        </PaginationItem>
        {items.map(({ label }, index) => (
          <PaginationItem
            key={index}
            isDisabled={false}
            className={cx(
              index === currentPage && 'ais-Pagination-item--selected'
            )}
            aria-label={label}
            href={createURL(index)}
            onClick={onClick}
          >
            {label}
          </PaginationItem>
        ))}
        <PaginationItem
          isDisabled={isLastPage}
          className="ais-Pagination-item--nextPage"
          aria-label="Next"
          href={createURL(currentPage + 1)}
          onClick={onClick}
        >
          ›
        </PaginationItem>
        <PaginationItem
          isDisabled={isLastPage}
          className="ais-Pagination-item--lastPage"
          aria-label="Last"
          href={createURL(nbPages - 1)}
          onClick={onClick}
        >
          ››
        </PaginationItem>
      </ul>
    </div>
  );
}

type PaginationItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
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
        onClick={onClick}
        {...props}
      />
    </li>
  );
}
