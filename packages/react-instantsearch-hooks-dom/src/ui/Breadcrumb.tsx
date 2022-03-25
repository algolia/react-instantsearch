import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

import type { CreateURL } from 'instantsearch.js';
import type { BreadcrumbConnectorParamsItem as BreadcrumbItem } from 'instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb';

export type BreadcrumbTranslations = {
  /**
   * The label of the root element.
   */
  root: string;
  /**
   * The character used to separate the elements of the breadcrumb.
   */
  separator: string;
};

export type BreadcrumbClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the root element, when there's no refinement possible
   */
  rootNoRefinement: string;
  /**
   * Class names to apply to the list element
   */
  list: string;
  /**
   * Class names to apply to each item element
   */
  item: string;
  /**
   * Class names to apply to a selected breadcrumb element
   */
  itemSelected: string;
  /**
   * Class names to apply to the separator between breadcrumb elements
   */
  separator: string;
  /**
   * Class names to apply to the link element
   */
  link: string;
};

export type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames?: Partial<BreadcrumbClassNames>;
  items: BreadcrumbItem[];
  hasItems: boolean;
  createURL: CreateURL<BreadcrumbItem['value']>;
  onNavigate: (value: BreadcrumbItem['value']) => void;
  translations: BreadcrumbTranslations;
};

export function Breadcrumb({
  classNames = {},
  items = [],
  hasItems,
  createURL,
  onNavigate,
  translations,
  ...props
}: BreadcrumbProps) {
  const handleClick =
    (value: BreadcrumbItem['value']) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!isModifierClick(event)) {
        event.preventDefault();
        onNavigate(value);
      }
    };

  return (
    <div
      {...props}
      className={cx(
        'ais-Breadcrumb',
        classNames.root,
        !hasItems &&
          cx('ais-Breadcrumb--noRefinement', classNames.rootNoRefinement),
        props.className
      )}
    >
      <ul className={cx('ais-Breadcrumb-list', classNames.list)}>
        <li
          className={cx(
            'ais-Breadcrumb-item',
            classNames.item,
            !hasItems &&
              cx('ais-Breadcrumb-item--selected', classNames.itemSelected)
          )}
        >
          <a
            href={createURL(null)}
            onClick={handleClick(null)}
            className={cx('ais-Breadcrumb-link', classNames.link)}
          >
            {translations.root}
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={cx(
                'ais-Breadcrumb-item',
                classNames.item,
                isLast &&
                  cx('ais-Breadcrumb-item--selected', classNames.itemSelected)
              )}
            >
              <span
                aria-hidden="true"
                className={cx('ais-Breadcrumb-separator', classNames.separator)}
              >
                {translations.separator}
              </span>

              {isLast ? (
                item.label
              ) : (
                <a
                  className={cx('ais-Breadcrumb-link', classNames.link)}
                  href={createURL(item.value)}
                  onClick={handleClick(item.value)}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
