import Head from 'next/head';
import { GetServerSideProps } from 'next';
import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';
import { getServerState } from 'react-instantsearch-hooks-server';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { Panel } from '../components/Panel';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

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

type HomePageProps = {
  serverState?: InstantSearchServerState;
  serverUrl?: string;
};

export default function HomePage({ serverState, serverUrl }: HomePageProps) {
  return (
    <>
      <Head>
        <title>React InstantSearch Hooks - Next.js</title>
      </Head>

      <InstantSearchSSRProvider {...serverState}>
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search"
          routing={{
            router: history({
              getLocation() {
                if (typeof window === 'undefined') {
                  return new URL(serverUrl!) as unknown as Location;
                }

                return window.location;
              },
            }),
          }}
        >
          <div className="Container">
            <div>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
            <div>
              <SearchBox />
              <Hits hitComponent={Hit} />
            </div>
          </div>
        </InstantSearch>
      </InstantSearchSSRProvider>
    </>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps({ req }) {
    const protocol = req.headers.referer?.split('://')[0] || 'https';
    const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
    const serverState = await getServerState(
      <HomePage serverUrl={serverUrl} />
    );

    return {
      props: {
        serverState,
        serverUrl,
      },
    };
  };
