import React from 'react';

import { cx } from './lib/cx';

import type { useRange } from 'react-instantsearch-hooks';

type RangeRenderState = ReturnType<typeof useRange>;

export type RangeInputProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSubmit'
> &
  Pick<RangeRenderState, 'range' | 'start'> & {
    classNames?: Partial<RangeInputClassNames>;
    disabled: boolean;
    onSubmit: RangeRenderState['refine'];
    step?: number;
    translations: RangeInputTranslations;
  };

export type RangeInputClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the root element when there are no refinements possible
   */
  rootNoRefinement: string;
  /**
   * Class names to apply to the form element
   */
  form: string;
  /**
   * Class name to apply to each label element
   */
  label: string;
  /**
   * Class names to apply to each input element
   */
  input: string;
  /**
   * Class names to apply to the minimum input element
   */
  inputMin: string;
  /**
   * Class names to apply to the maximum input element
   */
  inputMax: string;
  /**
   * Class names to apply to the separator element
   */
  separator: string;
  /**
   * Class names to apply to the submit button
   */
  submit: string;
};

export type RangeInputTranslations = {
  /**
   * The label of the separator, between the minimum and maximum inputs
   */
  separator: string;
  /**
   * The label of the submit button
   */
  submit: string;
};

// if the default value is undefined, React considers the component uncontrolled initially, which we don't want 0 or NaN as the default value
const unsetNumberInputValue = '' as unknown as number;

export function RangeInput({
  classNames = {},
  range: { min, max },
  start: [minValue, maxValue],
  step = 1,
  disabled,
  onSubmit,
  translations,
  ...props
}: RangeInputProps) {
  const values = {
    min:
      minValue !== -Infinity && minValue !== min
        ? minValue
        : unsetNumberInputValue,
    max:
      maxValue !== Infinity && maxValue !== max
        ? maxValue
        : unsetNumberInputValue,
  };

  const [{ from, to }, setRange] = React.useState({
    from: values.min,
    to: values.max,
  });

  React.useEffect(() => {
    setRange({ from: values.min, to: values.max });
  }, [values.min, values.max]);

  const onInput =
    (key: string) =>
    ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
      const value = Number(currentTarget.value);

      currentTarget.value = value.toString();
      setRange({ from, to, [key]: value });
    };

  return (
    <div
      {...props}
      className={cx(
        cx('ais-RangeInput', classNames.root),
        disabled &&
          cx('ais-RangeInput-noRefinement', classNames.rootNoRefinement),
        props.className
      )}
    >
      <form
        className={cx('ais-RangeInput-form', classNames.form)}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit([from, to]);
        }}
      >
        <label className={cx('ais-RangeInput-label', classNames.label)}>
          <input
            className={cx(
              cx('ais-RangeInput-input', classNames.input),
              cx('ais-RangeInput-input--min', classNames.inputMin)
            )}
            type="number"
            min={min}
            max={max}
            value={from}
            step={step}
            placeholder={min?.toString()}
            disabled={disabled}
            onInput={onInput('from')}
          />
        </label>
        <span className={cx('ais-RangeInput-separator', classNames.separator)}>
          {translations.separator}
        </span>
        <label className={cx('ais-RangeInput-label', classNames.label)}>
          <input
            className={cx(
              cx('ais-RangeInput-input', classNames.input),
              cx('ais-RangeInput-input--max', classNames.inputMax)
            )}
            type="number"
            min={min}
            max={max}
            value={to}
            step={step}
            placeholder={max?.toString()}
            disabled={disabled}
            onInput={onInput('to')}
          />
        </label>
        <button
          className={cx('ais-RangeInput-submit', classNames.submit)}
          type="submit"
        >
          {translations.submit}
        </button>
      </form>
    </div>
  );
}
