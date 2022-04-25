import React from 'react';

import { cx } from './lib/cx';

import type { HitsPerPageConnectorParamsItem as HitsPerPageItem } from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage';

type WrapperProps = React.ComponentProps<'div'>;
type RequiredProps = Required<{
  items: HitsPerPageItem[];
  onChange: (value: number) => void;
  currentValue: number;
}>;
type OptionalProps = Partial<{
  classNames: Partial<HitsPerPageClassNames>;
}>;

export type HitsPerPageProps = WrapperProps & RequiredProps & OptionalProps;

export type HitsPerPageClassNames = {
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

export function HitsPerPage({
  items,
  onChange,
  currentValue,
  classNames = {},
  ...props
}: HitsPerPageProps) {
  return (
    <div
      {...props}
      className={cx('ais-HitsPerPage', classNames.root, props.className)}
    >
      <select
        className={cx('ais-HitsPerPage-select', classNames.select)}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        value={String(currentValue)}
      >
        {items.map((item) => (
          <option
            key={item.value}
            className={cx('ais-HitsPerPage-option', classNames.option)}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
