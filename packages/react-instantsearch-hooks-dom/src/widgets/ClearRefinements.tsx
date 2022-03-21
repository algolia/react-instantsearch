import React from 'react';
import { useClearRefinements } from 'react-instantsearch-hooks';

import { ClearRefinements as ClearRefinementsUiComponent } from '../ui/ClearRefinements';

import type { Translatable } from '../types';
import type { ClearRefinementsProps as ClearRefinementsUiComponentProps } from '../ui/ClearRefinements';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks';

export type ClearRefinementsProps = Omit<
  Translatable<ClearRefinementsUiComponentProps>,
  'disabled' | 'onClick'
> &
  UseClearRefinementsProps;

export function ClearRefinements(props: ClearRefinementsProps) {
  const {
    includedAttributes,
    excludedAttributes,
    transformItems,
    translations,
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
      translations={{
        resetLabel: 'Clear refinements',
        ...translations,
      }}
      onClick={refine}
      disabled={!canRefine}
    />
  );
}
