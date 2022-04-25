import React from 'react';
import { useRange } from 'react-instantsearch-hooks';

import { RangeInput as RangeInputUiComponent } from '../ui/RangeInput';

import type { WidgetProps } from '../types';
import type { RangeInputProps as RangeInputUiProps } from '../ui/RangeInput';
import type { UseRangeProps } from 'react-instantsearch-hooks';

export type RangeInputProps = WidgetProps<RangeInputUiProps> & UseRangeProps;

export function RangeInput({
  attribute,
  min,
  max,
  precision,
  ...props
}: RangeInputProps) {
  const { range, start, canRefine, refine } = useRange(
    { attribute, min, max, precision },
    { $$widgetType: 'ais.rangeInput' }
  );

  const step = 1 / Math.pow(10, precision || 0);

  return (
    <RangeInputUiComponent
      {...props}
      range={range}
      start={start}
      step={step}
      disabled={!canRefine}
      onSubmit={refine}
      translations={{ separator: 'to', submit: 'Go' }}
    />
  );
}
