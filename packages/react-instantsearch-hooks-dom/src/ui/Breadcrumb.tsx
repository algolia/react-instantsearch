import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

import type { CreateURL } from 'instantsearch.js';
import type { BreadcrumbConnectorParamsItem as BreadcrumbItem } from 'instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb';

export type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  items: BreadcrumbItem[];
  createURL: CreateURL<BreadcrumbItem['value']>;
  onNavigate: (value: BreadcrumbItem['value']) => void;
  rootComponent?: React.ReactNode;
  separatorComponent?: React.ReactNode;
};

export function Breadcrumb({
  items = [],
  createURL,
  onNavigate,
  rootComponent: RootComponent = 'Home',
  separatorComponent: SeparatorComponent = '>',
  ...props
}: BreadcrumbProps) {
  const hasItems = items.length > 0;
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
            {RootComponent}
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
                {SeparatorComponent}
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
