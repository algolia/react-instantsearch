import React from 'react';

import { cx } from './lib/cx';

export type ToggleRefinementClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the label element
   */
  label: string;
  /**
   * Class names to apply to the checkbox element
   */
  checkbox: string;
  /**
   * Class names to apply to the label text
   */
  labelText: string;
};

type WrapperProps = Omit<React.ComponentProps<'div'>, 'onChange'>;
type RequiredProps = Required<
  Pick<React.ComponentProps<'input'>, 'checked'> & {
    onChange(isChecked: boolean): void;
  }
>;
type OptionalProps = Partial<{
  classNames: Partial<ToggleRefinementClassNames>;
  label: string;
}>;

export type ToggleRefinementProps = WrapperProps &
  RequiredProps &
  OptionalProps;

export function ToggleRefinement({
  classNames = {},
  checked,
  onChange,
  label,
  ...props
}: ToggleRefinementProps) {
  return (
    <div
      {...props}
      className={cx('ais-ToggleRefinement', classNames.root, props.className)}
    >
      <label className={cx('ais-ToggleRefinement-label', classNames.label)}>
        <input
          className={cx('ais-ToggleRefinement-checkbox', classNames.checkbox)}
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
        />

        <span
          className={cx('ais-ToggleRefinement-labelText', classNames.labelText)}
        >
          {label}
        </span>
      </label>
    </div>
  );
}
