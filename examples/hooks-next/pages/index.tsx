import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks';
import { getServerState } from 'react-instantsearch-hooks-server';
import { Highlight } from '../components/Highlight';
import { Hits } from '../components/Hits';
import { SearchBox } from '../components/SearchBox';
import { history } from 'instantsearch.js/es/lib/routers/index.js';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

export default function Home({
  serverState,
  url,
}: {
  serverState?: InstantSearchServerState;
  url?: string;
}) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={client}
        indexName="instant_search"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(url, 'https://example.com') as unknown as Location;
              }

              return window.location;
            },
          }),
        }}
      >
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export async function getServerSideProps({ req }) {
  const serverState = await getServerState(<Home url={req.url} />);
  return {
    props: {
      serverState,
      url: req.url,
    },
  };
}
