import React from 'react';

import { cx } from './lib/cx';
import { isModifierClick } from './lib/isModifierClick';

import type {
  CurrentRefinementsConnectorParamsItem,
  CurrentRefinementsConnectorParamsRefinement,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

export type CurrentRefinementsProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames: CurrentRefinementsClassNames;
  items?: Array<
    Pick<CurrentRefinementsConnectorParamsItem, 'label' | 'refinements'> &
      Record<string, unknown>
  >;
  onRemove?(refinement: CurrentRefinementsConnectorParamsRefinement): void;
  hasRefinements?: boolean;
};

export type CurrentRefinementsClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the root element when there is no refinement
   */
  rootNoRefinement: string;
  /**
   * Class names to apply to the list element
   */
  list: string;
  /**
   * Class names to apply to the list element when there is no refinement
   */
  listNoRefinement: string;
  /**
   * Class names to apply to the individual refinement
   */
  item: string;
  /**
   * Class names to apply to the individual refinement's label
   */
  label: string;
  /**
   * Class names to apply to the individual refinement value
   */
  category: string;
  /**
   * Class names to apply to the individual refinement value's label
   */
  categoryLabel: string;
  /**
   * Class names to apply to the remove button for a refinement
   */
  delete: string;
};

export function CurrentRefinements({
  classNames,
  items = [],
  onRemove = () => {},
  hasRefinements = false,
  ...props
}: CurrentRefinementsProps) {
  return (
    <div
      {...props}
      className={cx(
        classNames.root,
        !hasRefinements && classNames.rootNoRefinement,
        props.className
      )}
    >
      <ul
        className={cx(
          classNames.list,
          !hasRefinements && classNames.listNoRefinement
        )}
      >
        {items.map((item) => (
          <li key={item.label} className={classNames.item}>
            <span className={classNames.label}>{item.label}:</span>
            {item.refinements.map((refinement) => (
              <span key={refinement.label} className={classNames.category}>
                <span className={classNames.categoryLabel}>
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
                  className={classNames.delete}
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
