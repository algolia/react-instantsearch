import React from 'react';
import { usePoweredBy } from 'react-instantsearch-hooks';

import { PoweredBy as PoweredByUiComponent } from '../ui/PoweredBy';

import type { ClassNames } from '../types';
import type { PoweredByProps as PoweredByUiComponentProps } from '../ui/PoweredBy';

export type PoweredByProps = Omit<ClassNames<PoweredByUiComponentProps>, 'url'>;

export function PoweredBy({ classNames = {}, ...props }: PoweredByProps) {
  const { url } = usePoweredBy();

  return <PoweredByUiComponent {...props} url={url} classNames={classNames} />;
}
