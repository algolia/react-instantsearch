import React from 'react';

import { cx } from './lib/cx';
import { SearchBox } from './SearchBox';

import type { ChangeEvent, RefObject, FormEventHandler } from 'react';

export type RefinementListProps = React.ComponentProps<'div'> & {
  canToggleShowMore: boolean;
  inputRef: RefObject<HTMLInputElement>;
  isFromSearch: boolean;
  isShowingMore: boolean;
  items: RefinementListItem[];
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onItemChange: (item: RefinementListItem) => void;
  onReset: (event: FormEventHandler<HTMLFormElement>) => void;
  onSubmit: (event: FormEventHandler<HTMLFormElement>) => void;
  query: string;
  searchable?: boolean;
  searchablePlaceholder?: string;
  showMore?: boolean;
  toggleShowMore: () => void;
};

export type RefinementListItem = {
  value: string;
  isRefined: boolean;
  highlighted?: string;
  label: string;
  count: number;
};

export function RefinementList({
  canToggleShowMore,
  inputRef,
  isFromSearch,
  isShowingMore,
  items,
  onInputChange,
  onItemChange,
  onReset,
  onSubmit,
  query,
  searchable,
  searchablePlaceholder,
  showMore,
  toggleShowMore,
  ...rest
}: RefinementListProps) {
  return (
    <div {...rest} className={cx('ais-RefinementList', rest.className)}>
      {searchable && (
        <div className="ais-RefinementList-searchBox">
          <SearchBox
            inputRef={inputRef}
            placeholder={searchablePlaceholder}
            onChange={onInputChange}
            onReset={onReset}
            onSubmit={onSubmit}
            value={query}
          />
        </div>
      )}
      {searchable && isFromSearch && items.length === 0 && (
        <div className="ais-RefinementList-noResults">No results.</div>
      )}

      <ul className="ais-RefinementList-list">
        {items.map((item) => (
          <li
            key={item.value}
            className={cx(
              'ais-RefinementList-item',
              item.isRefined && 'ais-RefinementList-item--selected'
            )}
          >
            <label className="ais-RefinementList-label">
              <input
                className="ais-RefinementList-checkbox"
                type="checkbox"
                value={item.value}
                checked={item.isRefined}
                onChange={() => onItemChange(item)}
              />
              {isFromSearch ? (
                <span
                  className="ais-RefinementList-labelText"
                  dangerouslySetInnerHTML={{ __html: item.highlighted! }}
                />
              ) : (
                <span className="ais-RefinementList-labelText">
                  {item.label}
                </span>
              )}

              <span className="ais-RefinementList-count">{item.count}</span>
            </label>
          </li>
        ))}
      </ul>

      {showMore && (
        <button
          className={cx(
            'ais-RefinementList-showMore',
            !canToggleShowMore && 'ais-RefinementList-showMore--disabled'
          )}
          disabled={!canToggleShowMore}
          onClick={toggleShowMore}
        >
          {isShowingMore ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
