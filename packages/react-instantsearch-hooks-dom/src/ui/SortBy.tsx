import React from 'react';

import { cx } from './lib/cx';

import type { UseSortByProps } from 'react-instantsearch-hooks';

type WrapperProps = Omit<React.ComponentProps<'div'>, 'onChange'>;
type RequiredProps = Required<
  Pick<UseSortByProps, 'items'> & {
    value: React.ComponentProps<'select'>['value'];
    onChange(value: string): void;
  }
>;
type OptionalProps = Partial<{
  classNames: Partial<SortByClassNames>;
}>;

export type SortByProps = WrapperProps & RequiredProps & OptionalProps;

export type SortByClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the select element
   */
  select: string;
  /**
   * Class names to apply to the option element
   */
  option: string;
};

export function SortBy({
  items,
  value,
  onChange,
  classNames = {},
  ...props
}: SortByProps) {
  return (
    <div
      {...props}
      className={cx('ais-SortBy', classNames.root, props.className)}
    >
      <select
        className={cx('ais-SortBy-select', classNames.select)}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {items.map((item) => (
          <option
            className={cx('ais-SortBy-option', classNames.option)}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
