import React from 'react';

import { cx } from './lib/cx';

import type { HitsPerPageConnectorParamsItem as HitsPerPageItem } from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage';

export type HitsPerPageProps = React.HTMLAttributes<HTMLDivElement> & {
  items: HitsPerPageItem[];
  onChange: (value: number) => void;
  currentValue: number;
  classNames: HitsPerPageClassNames;
};

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
  classNames,
  ...props
}: HitsPerPageProps) {
  return (
    <div {...props} className={cx(classNames.root, props.className)}>
      <select
        className={classNames.select}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        value={String(currentValue)}
      >
        {items.map((item) => (
          <option
            key={item.value}
            className={classNames.option}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
