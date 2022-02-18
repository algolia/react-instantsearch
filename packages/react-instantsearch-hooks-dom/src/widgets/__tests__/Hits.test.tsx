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
      expect(container.querySelectorAll('strong')).toHaveLength(3);
      expect(container.querySelector('.ais-Hits')).toMatchInlineSnapshot(`
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          >
            <li
              class="ais-Hits-item"
            >
              <strong>
                1
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                2
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                3
              </strong>
            </li>
          </ol>
        </div>
      `);
    });
  });

  test('renders with a non-default hit shape', async () => {
    type CustomHit = {
      somethingSpecial: number;
    };

    const client = createSearchClient({
      search: (requests) =>
        Promise.resolve(
          createMultiSearchResponse(
            ...requests.map((request) =>
              createSingleSearchResponse<CustomHit>({
                hits: [
                  { objectID: '1', somethingSpecial: 1 },
                  { objectID: '2', somethingSpecial: 2 },
                  { objectID: '3', somethingSpecial: 3 },
                ],
                index: request.indexName,
              })
            )
          )
        ),
    });

    const { container } = render(
      <SearchProvider searchClient={client}>
        <Hits<CustomHit>
          hitComponent={({ hit }) => <strong>{hit.somethingSpecial}</strong>}
        />
      </SearchProvider>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('strong')).toHaveLength(3);
      expect(container.querySelector('.ais-Hits')).toMatchInlineSnapshot(`
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          >
            <li
              class="ais-Hits-item"
            >
              <strong>
                1
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                2
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                3
              </strong>
            </li>
          </ol>
        </div>
      `);
    });
  });
});
