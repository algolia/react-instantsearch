import React from 'react';
import { useToggleRefinement } from 'react-instantsearch-hooks';

import { ToggleRefinement as ToggleRefinementUiComponent } from '../ui/ToggleRefinement';

import type { WidgetProps } from '../types';
import type { ToggleRefinementProps as ToggleRefinementUiComponentProps } from '../ui/ToggleRefinement';
import type { UseToggleRefinementProps } from 'react-instantsearch-hooks';

export type ToggleRefinementProps =
  WidgetProps<ToggleRefinementUiComponentProps> & UseToggleRefinementProps;

export function ToggleRefinement({
  attribute,
  on,
  off,
  ...props
}: ToggleRefinementProps) {
  const { refine, value } = useToggleRefinement(
    { attribute, on, off },
    {
      $$widgetType: 'ais.toggleRefinement',
    }
  );

  return (
    <ToggleRefinementUiComponent
      label={value.name}
      {...props}
      checked={value.isRefined}
      onChange={(isChecked) => {
        refine({ isRefined: !isChecked });
      }}
    />
  );
}
