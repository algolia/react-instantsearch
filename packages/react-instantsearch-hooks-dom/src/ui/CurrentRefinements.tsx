import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

import type {
  CurrentRefinementsConnectorParamsItem,
  CurrentRefinementsConnectorParamsRefinement,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

export type CurrentRefinementsProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames?: Partial<CurrentRefinementsClassNames>;
  items?: Array<
    Pick<CurrentRefinementsConnectorParamsItem, 'label' | 'refinements'> &
      Record<string, unknown>
  >;
  onRemove?(refinement: CurrentRefinementsConnectorParamsRefinement): void;
};

export type CurrentRefinementsClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the list element
   */
  list: string;
  /**
   * Class names to apply to each refinement
   */
  item: string;
  /**
   * Class names to apply to the label of each refinement
   */
  label: string;
  /**
   * Class names to apply to the container of each refinement's value
   */
  category: string;
  /**
   * Class names to apply to the text element of each refinement's value
   */
  categoryLabel: string;
  /**
   * Class names to apply to the each refinement's delete button
   */
  delete: string;
};

export function CurrentRefinements({
  classNames = {},
  items = [],
  onRemove = () => {},
  ...props
}: CurrentRefinementsProps) {
  return (
    <div
      {...props}
      className={cx('ais-CurrentRefinements', classNames.root, props.className)}
    >
      <ul className={cx('ais-CurrentRefinements-list', classNames.list)}>
        {items.map((item) => (
          <li
            key={item.label}
            className={cx('ais-CurrentRefinements-item', classNames.item)}
          >
            <span
              className={cx('ais-CurrentRefinements-label', classNames.label)}
            >
              {item.label}:
            </span>
            {item.refinements.map((refinement) => (
              <span
                key={refinement.label}
                className={cx(
                  'ais-CurrentRefinements-category',
                  classNames.category
                )}
              >
                <span
                  className={cx(
                    'ais-CurrentRefinements-categoryLabel',
                    classNames.categoryLabel
                  )}
                >
                  {refinement.label}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    if (isModifierClick(event)) {
                      return;
                    }

                    onRemove(refinement);
                  }}
                  className={cx(
                    'ais-CurrentRefinements-delete',
                    classNames.delete
                  )}
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
