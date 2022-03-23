import React from 'react';
import { useHitsPerPage } from 'react-instantsearch-hooks';

import { HitsPerPage as HitsPerPageUiComponent } from '../ui/HitsPerPage';
import { cx } from '../ui/lib/cx';

import type { ClassNames } from '../types';
import type { HitsPerPageProps as HitsPerPageUiComponentProps } from '../ui/HitsPerPage';
import type { UseHitsPerPageProps } from 'react-instantsearch-hooks';

export type HitsPerPageProps = Omit<
  ClassNames<HitsPerPageUiComponentProps>,
  'items' | 'onChange' | 'currentValue'
> &
  UseHitsPerPageProps;

export function HitsPerPage({ classNames = {}, ...props }: HitsPerPageProps) {
  const { items, refine } = useHitsPerPage(props, {
    $$widgetType: 'ais.hitsPerPage',
  });
  const { value: currentValue } =
    items.find(({ isRefined }) => isRefined)! || {};

  return (
    <HitsPerPageUiComponent
      {...props}
      classNames={{
        root: cx('ais-HitsPerPage', classNames.root),
        select: cx('ais-HitsPerPage-select', classNames.select),
        option: cx('ais-HitsPerPage-option', classNames.option),
      }}
      items={items}
      currentValue={currentValue}
      onChange={(value) => {
        refine(value);
      }}
    />
  );
}
