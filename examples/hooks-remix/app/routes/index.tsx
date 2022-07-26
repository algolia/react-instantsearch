import algoliasearch from 'algoliasearch/lite';
import type { InstantSearchServerState } from 'react-instantsearch-hooks-web';
import {
  DynamicWidgets,
  Hits,
  InstantSearch,
  InstantSearchSSRProvider,
  Pagination,
  RefinementList,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import { getServerState } from 'react-instantsearch-hooks-server';
import { history } from 'instantsearch.js/cjs/lib/routers/index.js';
import instantSearchStyles from 'instantsearch.css/themes/satellite-min.css';

import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Hit } from '../../components/Hit';
import { Panel } from '../../components/Panel';
import { ScrollTo } from '../../components/ScrollTo';
import { NoResultsBoundary } from '../../components/NoResultsBoundary';
import { SearchErrorToast } from '../../components/SearchErrorToast';

import tailwindStyles from '../tailwind.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: instantSearchStyles },
  { rel: 'stylesheet', href: tailwindStyles },
];

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url;
  const serverState = await getServerState(<Search serverUrl={serverUrl} />);

  return json({
    serverState,
    serverUrl,
  });
};

type SearchProps = {
  serverState?: InstantSearchServerState;
  serverUrl?: string;
};

function Search({ serverState, serverUrl }: SearchProps) {
  return (
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
        <SearchErrorToast />

        <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
          <div>
            <DynamicWidgets fallbackComponent={FallbackComponent} />
          </div>

          <div className="flex flex-col w-full gap-8">
            <SearchBox />
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
                  item: 'p-2 w-full',
                }}
              />
              <Pagination className="flex self-center" />
            </NoResultsBoundary>
          </div>
        </ScrollTo>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  );
}

export default function HomePage() {
  const { serverState, serverUrl } = useLoaderData();

  return <Search serverState={serverState} serverUrl={serverUrl} />;
}
