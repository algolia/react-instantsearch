import React, { useEffect, useState } from 'react';

import { useRange, UseRangeProps } from 'react-instantsearch-hooks';
import { cx } from '../cx';

export type RangeProps = React.ComponentProps<'div'> & UseRangeProps;

// if the default value is undefined, React considers the component uncontrolled initially, which we don't want 0 or NaN as the default value
const controlledUndefined = '' as unknown as number;

export function RangeInput(props: RangeProps) {
  const {
    range: { min, max },
    start: [minValue, maxValue],
    canRefine,
    refine,
  } = useRange(props);
  const values = {
    min:
      minValue !== -Infinity && minValue !== min
        ? minValue
        : controlledUndefined,
    max:
      maxValue !== Infinity && maxValue !== max
        ? maxValue
        : controlledUndefined,
  };
  const [{ from, to }, setState] = useState({
    from: values.min,
    to: values.max,
  });

  useEffect(() => {
    setState({ from: values.min, to: values.max });
  }, [values.min, values.max]);

  return (
    <div
      className={cx(
        'ais-RangeInput',
        !canRefine && 'ais-RangeInput-noRefinement',
        props.className
      )}
    >
      <form
        className={'ais-RangeInput-form'}
        onSubmit={(e) => {
          e.preventDefault();
          refine([from, to]);
        }}
      >
        <input
          className={'ais-RangeInput-input ais-RangeInput-input--min'}
          type="number"
          min={min}
          max={max}
          value={from}
          placeholder={min?.toString()}
          disabled={!canRefine}
          onChange={(e) =>
            setState({ from: Number(e.currentTarget.value), to })
          }
        />
        <span className={'ais-RangeInput-separator'}> - </span>
        <input
          className={'ais-RangeInput-input ais-RangeInput-input--max'}
          type="number"
          min={min}
          max={max}
          value={to}
          placeholder={max?.toString()}
          disabled={!canRefine}
          onChange={(e) =>
            setState({ from, to: Number(e.currentTarget.value) })
          }
        />
        <button className={'ais-RangeInput-submit'} type="submit">
          Apply
        </button>
      </form>
    </div>
  );
}
