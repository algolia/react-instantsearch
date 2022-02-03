import React from 'react';

import { cx } from './lib/cx';

export type HitsProps<THit> = React.ComponentProps<'div'> & {
  hits: THit[];
  hitComponent: (props: { hit: THit }) => JSX.Element;
  getHitId: (hit: THit) => string;
};

export function Hits<THit>({
  hits,
  hitComponent: Hit,
  getHitId,
  ...rest
}: HitsProps<THit>) {
  return (
    <div {...rest} className={cx('ais-Hits', rest.className)}>
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={getHitId(hit)} className="ais-Hits-item">
            <Hit hit={hit} />
          </li>
        ))}
      </ol>
    </div>
  );
}
