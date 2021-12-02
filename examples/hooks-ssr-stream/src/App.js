import React, { Suspense } from 'react';
import {
  InstantSearch,
  InstantSearchSSRProvider,
  Index,
} from 'react-instantsearch-hooks';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { history } from 'instantsearch.js/es/lib/routers';

import { searchClient } from './searchClient';

import {
  Configure,
  Highlight,
  Hits,
  RefinementList,
  SearchBox,
} from './components';
import { Html } from './Html';
import { ErrorBoundary } from 'react-error-boundary';

function Hit({ hit }) {
  return <Highlight hit={hit} attribute="name" />;
}

function Search({ location }) {
  return (
    <InstantSearch
      indexName="instant_search"
      searchClient={searchClient}
      routing={{
        stateMapping: simple(),
        router: history({
          getLocation() {
            if (typeof window === 'undefined') {
              return location;
            }

            return window.location;
          },
        }),
      }}
    >
      <Configure hitsPerPage={10} />

      <div
        style={{
          display: 'grid',
          alignItems: 'flex-start',
          gridTemplateColumns: '200px 1fr',
          gap: '0.5rem',
        }}
      >
        <div>
          <RefinementList
            attribute="brand"
            searchable={true}
            searchablePlaceholder="Search brands"
            showMore={true}
          />
        </div>
        <div style={{ display: 'grid', gap: '.5rem' }}>
          <SearchBox placeholder="Search" />
          <Hits hitComponent={Hit} />

          <Index indexName="instant_search_price_asc">
            <div
              style={{
                display: 'grid',
                alignItems: 'flex-start',
                gridTemplateColumns: '200px 1fr',
                gap: '0.5rem',
              }}
            >
              <div>
                <RefinementList
                  attribute="brand"
                  searchable={true}
                  searchablePlaceholder="Search brands"
                  showMore={true}
                />
                <RefinementList
                  attribute="categories"
                  searchable={true}
                  searchablePlaceholder="Search categories"
                  showMore={true}
                />
              </div>
              <div style={{ display: 'grid', gap: '.5rem' }}>
                <Hits hitComponent={Hit} />
              </div>
            </div>
          </Index>
        </div>
      </div>
    </InstantSearch>
  );
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  );
}

export default function App({ serverState, location }) {
  return (
    <Html title="React InstantSearch Hooks SSR" serverState={serverState}>
      <Suspense fallback="Loading...">
        <ErrorBoundary FallbackComponent={Error}>
          <InstantSearchSSRProvider {...serverState}>
            <Search location={location} />
          </InstantSearchSSRProvider>
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}
