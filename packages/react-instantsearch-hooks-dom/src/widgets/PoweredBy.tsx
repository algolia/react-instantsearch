import React from 'react';
import { usePoweredBy } from 'react-instantsearch-hooks';

import { PoweredBy as PoweredByUiComponent } from '../ui/PoweredBy';

import type { PoweredByWidgetProps } from '../ui/PoweredBy';

export type PoweredByProps = PoweredByWidgetProps;

export function PoweredBy(props: PoweredByProps) {
  const { url } = usePoweredBy();

  return <PoweredByUiComponent {...props} url={url} />;
}
