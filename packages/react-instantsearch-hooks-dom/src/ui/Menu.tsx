import React from 'react';

import { cx } from './lib/cx';
import { ShowMoreButton } from './ShowMoreButton';

import type { CreateURL } from 'instantsearch.js';
import type { MenuItem } from 'instantsearch.js/es/connectors/menu/connectMenu';

export type MenuProps = React.HTMLAttributes<HTMLDivElement> & {
  items: MenuItem[];
  classNames?: Partial<MenuCSSClasses>;
  showMore?: boolean;
  canToggleShowMore: boolean;
  toggleShowMore: () => void;
  isShowingMore: boolean;
  createURL: CreateURL<MenuItem['value']>;
  onRefine: (item: MenuItem) => void;
};

export type MenuCSSClasses = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the list element
   */
  list: string;
  /**
   * Class names to apply to each item element
   */
  item: string;
  /**
   * Class names to apply to each selected item element
   */
  itemSelected: string;
  /**
   * Class names to apply to each link element
   */
  link: string;
  /**
   * Class names to apply to each label element
   */
  label: string;
  /**
   * Class names to apply to each facet count element
   */
  count: string;
  /**
   * Class names to apply to the show more button
   */
  showMore: string;
  /**
   * Class names to apply to the show more button if it's disabled
   */
  showMoreDisabled: string;
};

export function Menu({
  items,
  classNames = {},
  showMore,
  canToggleShowMore,
  toggleShowMore,
  isShowingMore,
  createURL,
  onRefine,
  ...props
}: MenuProps) {
  return (
    <div
      {...props}
      className={cx('ais-Menu', classNames.root, props.className)}
    >
      <ul className={cx('ais-Menu-list', classNames.list)}>
        {items.map((item) => (
          <li
            key={item.label}
            className={cx(
              'ais-Menu-item',
              classNames.item,
              item.isRefined &&
                cx('ais-Menu-item--selected', classNames.itemSelected)
            )}
          >
            <a
              className={cx('ais-Menu-link', classNames.link)}
              href={createURL(item.value)}
              onClick={(e) => {
                e.preventDefault();
                onRefine(item);
              }}
            >
              <span className={cx('ais-Menu-label', classNames.label)}>
                {item.label}
              </span>
              <span className={cx('ais-Menu-count', classNames.count)}>
                {item.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {showMore && (
        <ShowMoreButton
          className={cx(
            'ais-Menu-showMore',
            classNames.showMore,
            !canToggleShowMore &&
              cx('ais-Menu-showMore--disabled', classNames.showMoreDisabled)
          )}
          disabled={!canToggleShowMore}
          onClick={toggleShowMore}
          isShowingMore={isShowingMore}
        />
      )}
    </div>
  );
}
