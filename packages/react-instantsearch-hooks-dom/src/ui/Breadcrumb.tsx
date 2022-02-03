import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

export type BreadcrumbItem = {
  label: string;
  value: string | null;
};

function DefaultBreadcrumbHomeItem() {
  return <>Home</>;
}

function DefaultBreadcrumbSeparator() {
  return <>&gt;</>;
}

function DefaultBreadcrumbItem({ item }) {
  return <>{item.label}</>;
}

export type BreadcrumbProps = React.ComponentProps<'div'> & {
  canRefine: boolean;
  getItemUrl: (item?: BreadcrumbItem) => string;
  items: BreadcrumbItem[];
  onSelect: (item?: BreadcrumbItem) => void;
  rootItemComponent?: () => JSX.Element;
  itemComponent?: ({ item }: { item: BreadcrumbItem }) => JSX.Element;
  separatorComponent?: () => JSX.Element;
};

export function Breadcrumb({
  canRefine,
  getItemUrl,
  items,
  onSelect,
  rootItemComponent: BreadcrumbRootItemComponent = DefaultBreadcrumbHomeItem,
  separatorComponent: BreadcrumbSeparatorComponent = DefaultBreadcrumbSeparator,
  itemComponent: BreadcrumbItemComponent = DefaultBreadcrumbItem,
  ...rest
}: BreadcrumbProps) {
  return (
    <div
      {...rest}
      className={cx(
        'ais-Breadcrumb',
        !canRefine && 'ais-Breadcrumb--noRefinement',
        rest.className
      )}
    >
      <ul className="ais-Breadcrumb-list">
        <li
          className={cx(
            'ais-Breadcrumb-item',
            !canRefine && 'ais-Breadcrumb-item--selected'
          )}
        >
          <a
            href={getItemUrl(undefined)}
            onClick={(event) => {
              if (!isModifierClick(event)) {
                event.preventDefault();
                onSelect(undefined);
              }
            }}
            className="ais-Breadcrumb-link"
          >
            <BreadcrumbRootItemComponent />
          </a>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={idx}
              className={cx(
                'ais-Breadcrumb-item',
                isLast && 'ais-Breadcrumb-item--selected'
              )}
            >
              <span aria-hidden="true" className="ais-Breadcrumb-separator">
                <BreadcrumbSeparatorComponent />
              </span>

              {isLast ? (
                <BreadcrumbItemComponent item={item} />
              ) : (
                <a
                  className="ais-Breadcrumb-link"
                  href={getItemUrl(item)}
                  onClick={(event) => {
                    if (!isModifierClick(event)) {
                      event.preventDefault();
                      onSelect(item);
                    }
                  }}
                >
                  <BreadcrumbItemComponent item={item} />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
