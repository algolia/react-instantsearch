import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { createSearchClient } from '../../../../../test/mock';
import {
  createMultiSearchResponse,
  createSingleSearchResponse,
} from '../../../../../test/mock/createAPIResponse';
import { InstantSearchHooksTestWrapper, wait } from '../../../../../test/utils';
import { InfiniteHits } from '../InfiniteHits';

type CustomHit = {
  somethingSpecial: string;
};

const searchClient = createSearchClient({
  search: (requests) =>
    Promise.resolve(
      createMultiSearchResponse(
        ...requests.map((request) => {
          const { hitsPerPage = 3, page = 0 } = request.params!;
          const hits = Array.from({ length: hitsPerPage }, (_, i) => {
            const offset = hitsPerPage * page;
            return {
              objectID: (i + offset).toString(),
              somethingSpecial: String.fromCharCode(
                'a'.charCodeAt(0) + i + offset
              ),
            };
          });

          return createSingleSearchResponse<CustomHit>({
            hits,
            page,
            nbPages: 10,
            hitsPerPage,
            index: request.indexName,
          });
        })
      )
    ),
});

describe('InfiniteHits', () => {
  test('renders with default props', async () => {
    const { container } = render(
      <InstantSearchHooksTestWrapper searchClient={searchClient}>
        <InfiniteHits />
      </InstantSearchHooksTestWrapper>
    );

    await waitFor(() => {
      expect(container.querySelector('.ais-InfiniteHits'))
        .toMatchInlineSnapshot(`
        <div
          class="ais-InfiniteHits"
        >
          <ol
            class="ais-InfiniteHits-list"
          />
          <button
            class="ais-InfiniteHits-loadMore ais-InfiniteHits-loadMore--disabled"
            disabled=""
          >
            Show more results
          </button>
        </div>
      `);
    });
  });

  test('renders with a non-default hit shape', async () => {
    const { container } = render(
      <InstantSearchHooksTestWrapper searchClient={searchClient}>
        <InfiniteHits<CustomHit>
          hitComponent={({ hit }) => (
            <strong>{`${hit.__position} - ${hit.somethingSpecial}`}</strong>
          )}
        />
      </InstantSearchHooksTestWrapper>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('strong')).toHaveLength(3);
      expect(container.querySelector('.ais-InfiniteHits'))
        .toMatchInlineSnapshot(`
        <div
          class="ais-InfiniteHits"
        >
          <button
            class="ais-InfiniteHits-loadPrevious ais-InfiniteHits-loadPrevious--disabled"
            disabled=""
          >
            Show previous results
          </button>
          <ol
            class="ais-InfiniteHits-list"
          >
            <li
              class="ais-InfiniteHits-item"
            >
              <strong>
                1 - a
              </strong>
            </li>
            <li
              class="ais-InfiniteHits-item"
            >
              <strong>
                2 - b
              </strong>
            </li>
            <li
              class="ais-InfiniteHits-item"
            >
              <strong>
                3 - c
              </strong>
            </li>
          </ol>
          <button
            class="ais-InfiniteHits-loadMore"
          >
            Show more results
          </button>
        </div>
      `);
    });
  });

  test('show more button refines', async () => {
    const { container } = render(
      <InstantSearchHooksTestWrapper searchClient={searchClient}>
        <InfiniteHits
          hitComponent={({ hit: { __position } }) => (
            <strong>{__position}</strong>
          )}
        />
      </InstantSearchHooksTestWrapper>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('strong')).toHaveLength(3);
    });

    act(() => {
      fireEvent.click(container.querySelector('.ais-InfiniteHits-loadMore')!);
    });

    await waitFor(() => {
      expect(container.querySelectorAll('strong')).toHaveLength(6);
    });
  });

  test('show previous button refines', async () => {
    const { container } = render(
      <InstantSearchHooksTestWrapper
        searchClient={searchClient}
        initialUiState={{ indexName: { page: 4 } }}
      >
        <InfiniteHits
          hitComponent={({ hit: { __position } }) => (
            <strong>{__position}</strong>
          )}
        />
      </InstantSearchHooksTestWrapper>
    );

    await wait(0);

    expect(container.querySelectorAll('strong')).toHaveLength(3);

    act(() => {
      fireEvent.click(
        container.querySelector('.ais-InfiniteHits-loadPrevious')!
      );
    });

    await wait(0);

    expect(container.querySelectorAll('strong')).toHaveLength(6);
  });

  test('show previous button hidden is showPrevious: false', async () => {
    const { container } = render(
      <InstantSearchHooksTestWrapper searchClient={searchClient}>
        <InfiniteHits showPrevious={false} />
      </InstantSearchHooksTestWrapper>
    );

    await waitFor(() => {
      expect(container.querySelector('.ais-InfiniteHits-loadPrevious')).toBe(
        null
      );
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="ais-InfiniteHits"
          >
            <ol
              class="ais-InfiniteHits-list"
            />
            <button
              class="ais-InfiniteHits-loadMore ais-InfiniteHits-loadMore--disabled"
              disabled=""
            >
              Show more results
            </button>
          </div>
        </div>
      `);
    });
  });
});
