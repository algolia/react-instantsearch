import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch-hooks';

import { cx } from '../../../../examples/hooks/cx';
import { CurrentRefinements as CurrentRefinementsUiComponent } from '../ui/CurrentRefinements';

import type { ClassNames } from '../types';
import type { CurrentRefinementsProps as CurrentRefinementsUiComponentProps } from '../ui/CurrentRefinements';
import type { UseCurrentRefinementsProps } from 'react-instantsearch-hooks';

export type CurrentRefinementsProps = Omit<
  ClassNames<CurrentRefinementsUiComponentProps>,
  'disabled' | 'onClick' | 'items' | 'hasRefinements'
> &
  UseCurrentRefinementsProps;

export function CurrentRefinements({
  includedAttributes,
  excludedAttributes,
  transformItems,
  classNames = {},
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
      classNames={{
        root: cx('ais-CurrentRefinements', classNames.root),
        rootNoRefinement: cx(
          'ais-CurrentRefinements--noRefinement',
          classNames.rootNoRefinement
        ),
        list: cx('ais-CurrentRefinements-list', classNames.list),
        listNoRefinement: cx(
          'ais-CurrentRefinements-list--noRefinement',
          classNames.listNoRefinement
        ),
        item: cx('ais-CurrentRefinements-item', classNames.item),
        label: cx('ais-CurrentRefinements-label', classNames.label),
        category: cx('ais-CurrentRefinements-category', classNames.category),
        categoryLabel: cx(
          'ais-CurrentRefinements-categoryLabel',
          classNames.categoryLabel
        ),
        delete: cx('ais-CurrentRefinements-delete', classNames.delete),
      }}
      hasRefinements={canRefine}
      items={items}
      onRemove={refine}
    />
  );
}
