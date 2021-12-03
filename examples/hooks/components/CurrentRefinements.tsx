import React from 'react';
import {
  useCurrentRefinements,
  UseCurrentRefinementsProps,
} from 'react-instantsearch-hooks';
import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

import { cx } from '../cx';
import { isSpecialClick } from '../isSpecialClick';

export type CurrentRefinements = React.ComponentProps<'div'> &
  UseCurrentRefinementsProps;

export function CurrentRefinements(props: CurrentRefinements) {
  const { items, refine, canRefine } = useCurrentRefinements(props);
  const refinements = items.reduce(
    (acc, item) => [...acc, ...item.refinements],
    []
  );

  return (
    <div
      className={cx(
        'ais-CurrentRefinements',
        !canRefine && 'ais-CurrentRefinements-noRefinement',
        props.className
      )}
    >
      <ul
        className={cx(
          'ais-CurrentRefinements-list',
          !canRefine && 'ais-CurrentRefinements-list--noRefinement'
        )}
      >
        {refinements.map((refinement) => (
          <li key={refinement.label} className="ais-CurrentRefinements-item">
            <span className="ais-CurrentRefinements-label">
              {getCategoryName(refinement)}:
            </span>
            <span className="ais-CurrentRefinements-category">
              <span className="ais-CurrentRefinements-categoryLabel">
                {refinement.label}
              </span>
            </span>
            <button
              aria-label={`Remove ${refinement.label} from refinements`}
              onClick={(event) => {
                if (isSpecialClick(event)) {
                  return;
                }

                event.preventDefault();

                refine(refinement);
              }}
              className="ais-CurrentRefinements-delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getCategoryName({
  attribute,
}: CurrentRefinementsConnectorParamsRefinement) {
  if (attribute.startsWith('hierarchicalCategories')) {
    return 'Hierarchy';
  }

  return attribute;
}
