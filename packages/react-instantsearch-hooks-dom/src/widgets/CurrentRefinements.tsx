import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch-hooks';

import { CurrentRefinements as CurrentRefinementsUiComponent } from '../ui/CurrentRefinements';

import type { CurrentRefinementsProps as CurrentRefinementsUiComponentProps } from '../ui/CurrentRefinements';
import type { UseCurrentRefinementsProps } from 'react-instantsearch-hooks';

export type CurrentRefinementsProps = Omit<
  CurrentRefinementsUiComponentProps,
  'disabled' | 'onClick' | 'items' | 'hasRefinements'
> &
  UseCurrentRefinementsProps;

export function CurrentRefinements(props: CurrentRefinementsProps) {
  const {
    includedAttributes,
    excludedAttributes,
    transformItems,
    ...otherProps
  } = props;
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
      {...otherProps}
      hasRefinements={canRefine}
      items={items}
      onRemove={refine}
    />
  );
}
