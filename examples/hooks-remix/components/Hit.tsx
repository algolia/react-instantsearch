import type { Hit as AlgoliaHit } from 'instantsearch.js';
import { Highlight } from 'react-instantsearch-hooks-web';

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
    image: string;
    brand: string;
  }>;
};

export function Hit({ hit }: HitProps) {
  return (
    <div className="group relative">
      <div className="flex justify-center overflow-hidden">
        <img
          src={hit.image}
          alt={hit.name}
          className="object-center object-cover"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <span className="absolute inset-0" />
        <Highlight hit={hit} attribute="name" />
      </h3>
      <p className="mt-1 text-sm text-gray-500">{hit.brand}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">${hit.price}</p>
    </div>
  );
}
