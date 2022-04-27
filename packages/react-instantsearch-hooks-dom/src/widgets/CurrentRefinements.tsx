import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch-hooks';

import { CurrentRefinements as CurrentRefinementsUiComponent } from '../ui/CurrentRefinements';

import type { CurrentRefinementsWidgetProps } from '../ui/CurrentRefinements';
import type { UseCurrentRefinementsProps } from 'react-instantsearch-hooks';

export type CurrentRefinementsProps = CurrentRefinementsWidgetProps &
  UseCurrentRefinementsProps;

export function CurrentRefinements({
  includedAttributes,
  excludedAttributes,
  transformItems,
  ...props
}: CurrentRefinementsProps) {
  const { items, refine, canRefine } = useCurrentRefinements(
    {
      includedAttributes,
      excludedAttributes,
      transformItems,
    },
    {
      $$widgetType: 'ais.currentRefinements',
    }
  );

  return (
    <CurrentRefinementsUiComponent
      {...props}
      hasRefinements={canRefine}
      items={items}
      onRemove={refine}
    />
  );
}
