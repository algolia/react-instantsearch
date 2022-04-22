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

export type ToggleRefinementProps = Omit<
  React.ComponentProps<'div'>,
  'onChange'
> & {
  classNames?: Partial<ToggleRefinementClassNames>;
  label: string;
};

export type ToggleRefinementInternalProps = ToggleRefinementProps &
  Pick<React.ComponentProps<'input'>, 'checked'> & {
    onChange(isChecked: boolean): void;
  };

export function ToggleRefinement({
  classNames = {},
  checked,
  onChange,
  label,
  ...props
}: ToggleRefinementInternalProps) {
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
