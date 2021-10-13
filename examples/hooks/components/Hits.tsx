import type { Hit as AlgoliaHit } from '@algolia/client-search';
import React from 'react';
import type { UseHitsProps } from 'react-instantsearch-hooks';
import { useHits } from 'react-instantsearch-hooks';

export type HitsProps = UseHitsProps & {
  hitComponent: <THit extends AlgoliaHit<Record<string, unknown>>>(props: {
    hit: THit;
  }) => JSX.Element;
};

export function Hits({ hitComponent: Hit, ...props }: HitsProps) {
  const { hits } = useHits(props);

  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <Hit hit={hit} />
          </li>
        ))}
      </ol>
    </div>
  );
}
