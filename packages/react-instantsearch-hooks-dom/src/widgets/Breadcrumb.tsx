import React from 'react';
import { useBreadcrumb } from 'react-instantsearch-hooks';

import { Breadcrumb as BreadcrumbUiComponent } from '../ui/Breadcrumb';

import type { BreadcrumbProps as BreadcrumbUiProps } from '../ui/Breadcrumb';
import type { UseBreadcrumbProps } from 'react-instantsearch-hooks';

export type BreadcrumbProps = Omit<
  BreadcrumbUiProps,
  'items' | 'createURL' | 'onNavigate'
> &
  UseBreadcrumbProps;

export function Breadcrumb({
  attributes,
  rootPath,
  separator,
  transformItems,
  ...props
}: BreadcrumbProps) {
  const { canRefine, createURL, items, refine } = useBreadcrumb(
    {
      attributes,
      rootPath,
      separator,
      transformItems,
    },
    { $$widgetType: 'ais.breadcrumb' }
  );

  return (
    <BreadcrumbUiComponent
      {...props}
      createURL={createURL}
      items={items}
      hasItems={canRefine}
      onNavigate={refine}
    />
  );
}
