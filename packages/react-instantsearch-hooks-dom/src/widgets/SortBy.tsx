import React from 'react';
import { useSortBy } from 'react-instantsearch-hooks';

import { cx } from '../../../../examples/hooks/cx';
import { SortBy as SortByUiComponent } from '../ui/SortBy';

import type { ClassNames } from '../types';
import type { SortByProps as SortByUiComponentProps } from '../ui/SortBy';
import type { UseSortByProps } from 'react-instantsearch-hooks';

export type SortByProps = Omit<
  ClassNames<SortByUiComponentProps>,
  'items' | 'value' | 'onSelect'
> &
  UseSortByProps;

export function SortBy({
  items,
  transformItems,
  classNames = {},
  ...props
}: SortByProps) {
  const { currentRefinement, options, refine } = useSortBy(
    {
      items,
      transformItems,
    },
    {
      $$widgetType: 'ais.sortBy',
    }
  );

  return (
    <SortByUiComponent
      {...props}
      classNames={{
        root: cx('ais-SortBy', classNames.root),
        select: cx('ais-SortBy-select', classNames.select),
        option: cx('ais-SortBy-option', classNames.option),
      }}
      value={currentRefinement}
      items={options}
      onChange={refine}
    />
  );
}
