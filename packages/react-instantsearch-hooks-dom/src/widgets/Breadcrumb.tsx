import React from 'react';
import { useBreadcrumb } from 'react-instantsearch-hooks';

import { Breadcrumb as BreadcrumbUiComponent } from '../ui/Breadcrumb';

import type { WidgetProps } from '../types';
import type { BreadcrumbProps as BreadcrumbUiProps } from '../ui/Breadcrumb';
import type { UseBreadcrumbProps } from 'react-instantsearch-hooks';

export type BreadcrumbProps = WidgetProps<BreadcrumbUiProps> &
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
      separator={separator}
      translations={{
        root: 'Home',
      }}
    />
  );
}
