import React from 'react';
import { useClearRefinements } from 'react-instantsearch-hooks';

import { ClearRefinements as ClearRefinementsUiComponent } from '../ui/ClearRefinements';
import { cx } from '../ui/lib/cx';

import type { ClassNames } from '../types';
import type { ClearRefinementsProps as ClearRefinementsUiComponentProps } from '../ui/ClearRefinements';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks';

export type ClearRefinementsProps = Omit<
  ClassNames<ClearRefinementsUiComponentProps>,
  'disabled' | 'onClick' | 'translations'
> &
  UseClearRefinementsProps;

export function ClearRefinements({
  includedAttributes,
  excludedAttributes,
  transformItems,
  classNames = {},
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
      classNames={{
        root: cx('ais-ClearRefinements', classNames.root),
        button: cx('ais-ClearRefinements-button', classNames.button),
        buttonDisabled: cx(
          'ais-ClearRefinements-button--disabled',
          classNames.buttonDisabled
        ),
      }}
      onClick={refine}
      disabled={!canRefine}
    />
  );
}
