import React from 'react';
import {
  useToggleRefinements,
  UseToggleRefinementsProps,
} from 'react-instantsearch-hooks';

import { cx } from '../cx';

export type ToggleRefinementsProps = React.ComponentProps<'div'> &
  UseToggleRefinementsProps;

export function ToggleRefinements(props: ToggleRefinementsProps) {
  const { refine, currentRefinement } = useToggleRefinements(props);

  return (
    <div className={cx('ais-ToggleRefinements', props.className)}>
      <label className="ais-ToggleRefinements-label">
        <input
          className="ais-ToggleRefinement-checkbox"
          type="checkbox"
          checked={currentRefinement.isRefined}
          onChange={(event) => refine({ isRefined: !event.target.checked })}
        />

        <span className="ais-ToggleRefinement-labelText">
          {currentRefinement}
        </span>
      </label>
    </div>
  );
}
