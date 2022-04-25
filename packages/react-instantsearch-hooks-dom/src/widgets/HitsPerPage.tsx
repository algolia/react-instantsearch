import React from 'react';
import { useHitsPerPage } from 'react-instantsearch-hooks';

import { HitsPerPage as HitsPerPageUiComponent } from '../ui/HitsPerPage';

import type { WidgetProps } from '../types';
import type { HitsPerPageProps as HitsPerPageUiComponentProps } from '../ui/HitsPerPage';
import type { UseHitsPerPageProps } from 'react-instantsearch-hooks';

export type HitsPerPageProps = WidgetProps<HitsPerPageUiComponentProps> &
  UseHitsPerPageProps;

export function HitsPerPage(props: HitsPerPageProps) {
  const { items, refine } = useHitsPerPage(props, {
    $$widgetType: 'ais.hitsPerPage',
  });
  const { value: currentValue } =
    items.find(({ isRefined }) => isRefined)! || {};

  return (
    <HitsPerPageUiComponent
      {...props}
      items={items}
      currentValue={currentValue}
      onChange={(value) => {
        refine(value);
      }}
    />
  );
}
