import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-hooks';

import { createSearchClient } from '../../../../../test/mock';
import {
  createMultiSearchResponse,
  createSingleSearchResponse,
} from '../../../../../test/mock/createAPIResponse';
import { Hits } from '../Hits';

import type { InstantSearchProps } from 'react-instantsearch-hooks';

const searchClient = createSearchClient();

type SearchProviderProps = {
  children: React.ReactNode;
} & Partial<InstantSearchProps>;

function SearchProvider({ children, ...props }: SearchProviderProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName="indexName" {...props}>
      {children}
    </InstantSearch>
  );
}

describe('Hits', () => {
  test('renders with default props', async () => {
    const { container } = render(
      <SearchProvider>
        <Hits />
      </SearchProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('.ais-Hits')).toMatchInlineSnapshot(`
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          />
        </div>
      `);
    });
  });

  // TODO: assert with right search response
  test('renders with custom hitComponent', async () => {
    const client = createSearchClient({
      search: (requests) =>
        Promise.resolve(
          createMultiSearchResponse(
            ...requests.map((request) =>
              createSingleSearchResponse<Record<string, any>>({
                hits: [{ objectID: '1' }, { objectID: '2' }, { objectID: '3' }],
                index: request.indexName,
              })
            )
          )
        ),
    });

    const { container } = render(
      <SearchProvider searchClient={client}>
        <Hits hitComponent={({ hit }) => <strong>{hit.__position}</strong>} />
      </SearchProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('.ais-Hits')).toMatchInlineSnapshot(`
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          />
        </div>
      `);
    });
  });

  // TODO: assert with right search response
  test('renders with a non-default hit shape', async () => {
    const client = createSearchClient({
      search: (requests) =>
        Promise.resolve(
          createMultiSearchResponse(
            ...requests.map((request) =>
              createSingleSearchResponse<Record<string, any>>({
                hits: [{ objectID: '1' }, { objectID: '2' }, { objectID: '3' }],
                index: request.indexName,
              })
            )
          )
        ),
    });

    const { container } = render(
      <SearchProvider searchClient={client}>
        <Hits<{
          somethingSpecial: boolean;
        }>
          hitComponent={({ hit }) => <strong>{hit.somethingSpecial}</strong>}
        />
      </SearchProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('.ais-Hits')).toMatchInlineSnapshot(`
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          />
        </div>
      `);
    });
  });
});
