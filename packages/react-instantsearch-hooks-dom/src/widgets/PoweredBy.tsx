import React from 'react';
import { usePoweredBy } from 'react-instantsearch-hooks';

import { PoweredBy as PoweredByUiComponent } from '../ui/PoweredBy';

import type { WidgetProps } from '../types';
import type { PoweredByProps as PoweredByUiComponentProps } from '../ui/PoweredBy';

export type PoweredByProps = WidgetProps<PoweredByUiComponentProps>;

export function PoweredBy(props: PoweredByProps) {
  const { url } = usePoweredBy();

  return <PoweredByUiComponent {...props} url={url} />;
}
