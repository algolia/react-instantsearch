import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch-hooks';

import { CurrentRefinements as CurrentRefinementsUiComponent } from '../ui/CurrentRefinements';

import type { CurrentRefinementsProps as CurrentRefinementsUiComponentProps } from '../ui/CurrentRefinements';
import type { UseCurrentRefinementsProps } from 'react-instantsearch-hooks';

export type CurrentRefinementsProps = Omit<
  CurrentRefinementsUiComponentProps,
  'disabled' | 'onClick' | 'items'
> &
  UseCurrentRefinementsProps;

export function CurrentRefinements({
  includedAttributes,
  excludedAttributes,
  transformItems,
  ...props
}: CurrentRefinementsProps) {
  const { items, refine } = useCurrentRefinements(
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
    <CurrentRefinementsUiComponent {...props} items={items} onRemove={refine} />
  );
}
