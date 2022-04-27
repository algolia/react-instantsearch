import React from 'react';
import { useClearRefinements } from 'react-instantsearch-hooks';

import { ClearRefinements as ClearRefinementsUiComponent } from '../ui/ClearRefinements';

import type { ClearRefinementsWidgetProps } from '../ui/ClearRefinements';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks';

export type ClearRefinementsProps = ClearRefinementsWidgetProps &
  UseClearRefinementsProps;

export function ClearRefinements({
  includedAttributes,
  excludedAttributes,
  transformItems,
  ...props
}: ClearRefinementsProps) {
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
      {...props}
      translations={{
        resetLabel: 'Clear refinements',
      }}
      onClick={refine}
      disabled={!canRefine}
    />
  );
}
