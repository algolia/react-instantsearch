import React from 'react';

import { cx } from './lib/cx';

import type { Hit } from 'instantsearch.js';
import type { JSXElementConstructor } from 'react';

export type HitsProps<THit> = React.ComponentProps<'div'> & {
  hits: THit[];
  hitComponent?: JSXElementConstructor<{ hit: THit }>;
};

function DefaultHitComponent({ hit }: { hit: Hit }) {
  return (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
        wordBreak: 'break-all',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}…
    </div>
  );
}

export function Hits<THit extends Hit>({
  hits,
  hitComponent: HitComponent = DefaultHitComponent,
  ...props
}: HitsProps<THit>) {
  return (
    <div {...props} className={cx('ais-Hits', props.className)}>
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <HitComponent hit={hit} />
          </li>
        ))}
      </ol>
    </div>
  );
}
