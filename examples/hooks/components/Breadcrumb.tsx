import React from 'react';
import { useBreadcrumb, UseBreadcrumbProps } from 'react-instantsearch-hooks';

import { cx } from '../cx';

export type BreadcrumbProps = React.ComponentProps<'div'> & UseBreadcrumbProps;

export function Breadcrumb(props: BreadcrumbProps) {
  const { items, refine, createURL } = useBreadcrumb(props);

  return (
    <div
      className={cx(
        'ais-Breadcrumb',
        items.length === 0 && 'ais-Breadcrumb--noRefinement',
        props.className
      )}
    >
      <ul className="ais-Breadcrumb-list">
        <li
          className={cx(
            'ais-Breadcrumb-item',
            items.length === 0 && 'ais-Breadcrumb-item--selected'
          )}
        >
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              refine(undefined);
            }}
            className="ais-Breadcrumb-link"
          >
            Home
          </a>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={item.label + idx}
              className={cx(
                'ais-Breadcrumb-item',
                isLast && 'ais-Breadcrumb-item--selected'
              )}
            >
              <span aria-hidden="true" className="ais-Breadcrumb-separator">
                &gt;
              </span>

              {isLast ? (
                item.label
              ) : (
                <a
                  className="ais-Breadcrumb-link"
                  href={createURL(item.value)}
                  onClick={(event) => {
                    event.preventDefault();
                    refine(item.value);
                  }}
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
