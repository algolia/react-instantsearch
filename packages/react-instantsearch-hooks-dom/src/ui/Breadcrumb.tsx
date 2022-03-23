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

export type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  items: BreadcrumbItem[];
  hasItems: boolean;
  createURL: CreateURL<BreadcrumbItem['value']>;
  onNavigate: (value: BreadcrumbItem['value']) => void;
  translations: BreadcrumbTranslations;
};

export function Breadcrumb({
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
        !hasItems && 'ais-Breadcrumb--noRefinement',
        props.className
      )}
    >
      <ul className="ais-Breadcrumb-list">
        <li
          className={cx(
            'ais-Breadcrumb-item',
            !hasItems && 'ais-Breadcrumb-item--selected'
          )}
        >
          <a
            href={createURL(null)}
            onClick={handleClick(null)}
            className="ais-Breadcrumb-link"
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
                isLast && 'ais-Breadcrumb-item--selected'
              )}
            >
              <span aria-hidden="true" className="ais-Breadcrumb-separator">
                {translations.separator}
              </span>

              {isLast ? (
                item.label
              ) : (
                <a
                  className="ais-Breadcrumb-link"
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
