import React, { useCallback } from 'react';
import { useHitsPerPage, UseHitsPerPageProps } from 'react-instantsearch-hooks';
import { cx } from '../cx';

export type HitsPerPageProps = React.ComponentProps<'div'> &
  UseHitsPerPageProps;

export function HitsPerPage(props: HitsPerPageProps) {
  const { items, refine } = useHitsPerPage(props);
  const { value: currentValue } =
    items.find(({ isRefined }) => isRefined) || {};

  const handleChange = useCallback(
    (event) => {
      refine(event.target.value);
    },
    [refine]
  );
  return (
    <div className={cx('ais-HitsPerPage', props.className)}>
      <select
        className="ais-HitsPerPage-select"
        onChange={handleChange}
        value={String(currentValue)}
      >
        {items.map((item) => (
          <option
            key={item.label + item.value}
            className="ais-HitsPerPage-option"
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
