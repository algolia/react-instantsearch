import React from 'react';
import { useClearRefinements } from 'react-instantsearch-hooks';

import { ClearRefinements as ClearRefinementsUiComponent } from '../ui';

import type { ClearRefinementsProps as ClearRefinementsUiComponentProps } from '../ui';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks';

export type ClearRefinementsProps = Omit<
  ClearRefinementsUiComponentProps,
  'disabled' | 'onClick'
> &
  UseClearRefinementsProps;

export function ClearRefinements(props: ClearRefinementsProps) {
  const {
    resetLabel,
    includedAttributes,
    excludedAttributes,
    transformItems,
    ...otherProps
  } = props;
  const { canRefine, refine } = useClearRefinements(
    {
      includedAttributes,
      excludedAttributes,
      transformItems,
    },
    {
      $$widgetType: 'ais.clearRefinements',
    }
  );

  return (
    <ClearRefinementsUiComponent
      {...otherProps}
      resetLabel={resetLabel}
      onClick={refine}
      disabled={!canRefine}
    />
  );
}
