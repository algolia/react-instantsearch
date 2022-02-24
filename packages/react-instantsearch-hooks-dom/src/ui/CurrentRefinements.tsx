import React from 'react';

import { cx } from './lib/cx';

type CurrentRefinementCategory = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> & { label: string };

type CurrentRefinement = {
  label: string;
  category: CurrentRefinementCategory[];
};

export type CurrentRefinementsProps = React.HTMLAttributes<HTMLDivElement> & {
  items?: CurrentRefinement[];
  hasRefinements?: boolean;
};

export function CurrentRefinements({
  items = [],
  hasRefinements = false,
  ...props
}: CurrentRefinementsProps) {
  return (
    <div
      {...props}
      className={cx(
        'ais-CurrentRefinements',
        !hasRefinements && 'ais-CurrentRefinements--noRefinement',
        props.className
      )}
    >
      <ul
        className={cx(
          'ais-CurrentRefinements-list',
          !hasRefinements && 'ais-CurrentRefinements-list--noRefinement'
        )}
      >
        {items.map((item) => (
          <li key={item.label} className="ais-CurrentRefinements-item">
            <span className="ais-CurrentRefinements-label">{item.label}:</span>
            {item.category.map(({ label, onClick }) => (
              <span key={label} className="ais-CurrentRefinements-category">
                <span className="ais-CurrentRefinements-categoryLabel">
                  {label}
                </span>
                <button
                  onClick={onClick}
                  className="ais-CurrentRefinements-delete"
                >
                  ✕
                </button>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
