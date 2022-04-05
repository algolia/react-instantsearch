import React from 'react';
import { useRange } from 'react-instantsearch-hooks';

import { RangeInput as RangeInputUiComponent } from '../ui/RangeInput';

import type { RangeInputProps as RangeInputUiProps } from '../ui/RangeInput';
import type { UseRangeProps } from 'react-instantsearch-hooks';

export type RangeInputProps = Omit<
  RangeInputUiProps,
  'disabled' | 'onSubmit' | 'range' | 'start' | 'translations'
> &
  UseRangeProps;

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

  return (
    <RangeInputUiComponent
      {...props}
      range={range}
      start={start}
      disabled={!canRefine}
      onSubmit={refine}
      translations={{ separator: 'to', submit: 'Go' }}
    />
  );
}
