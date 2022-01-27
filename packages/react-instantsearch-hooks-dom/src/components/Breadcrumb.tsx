import React from 'react';
import { useBreadcrumb } from 'react-instantsearch-hooks';

import { Breadcrumb as BreadcrumbUiComponent } from '../ui/Breadcrumb';

import type { UseBreadcrumbProps } from 'react-instantsearch-hooks';

export type BreadcrumbProps = React.ComponentProps<'div'> & UseBreadcrumbProps;

export function Breadcrumb(props: BreadcrumbProps) {
  const { items, refine, canRefine, createURL } = useBreadcrumb(props);

  return (
    <BreadcrumbUiComponent
      canRefine={canRefine}
      getItemUrl={(item) => createURL(item ? item.value : null)}
      items={items}
      onSelect={(item) => refine(item ? item.value : null)}
    />
  );
}
