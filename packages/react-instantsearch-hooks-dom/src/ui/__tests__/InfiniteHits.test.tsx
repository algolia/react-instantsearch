import { render } from '@testing-library/react';
import React from 'react';

import { InfiniteHits } from '../InfiniteHits';

import type { InfiniteHitsProps } from '../InfiniteHits';
import type { Hit } from 'instantsearch.js';

describe('InfiniteHits', () => {
  function createProps<THit extends Hit = Hit>(
    props: Partial<InfiniteHitsProps<THit>>
  ) {
    return {
      hits: [
        { objectID: 'abc', __position: 1 },
        { objectID: 'def', __position: 2 },
      ],
      isFirstPage: true,
      isLastPage: false,
      showPrevious: jest.fn(),
      showMore: jest.fn(),
      ...props,
    };
  }

  test('renders with default props', () => {
    const props = createProps({});

    const { container } = render(<InfiniteHits {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
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
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"abc","__position":1}
                …
              </div>
            </li>
            <li
              class="ais-InfiniteHits-item"
            >
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"def","__position":2}
                …
              </div>
            </li>
          </ol>
          <button
            class="ais-InfiniteHits-loadMore"
          >
            Show more results
          </button>
        </div>
      </div>
    `);
  });

  test('renders custom className', () => {
    const props = createProps({
      className: 'extra',
    });

    const { container } = render(<InfiniteHits {...props} />);

    expect(container.querySelector('.ais-InfiniteHits')!.className).toBe(
      'ais-InfiniteHits extra'
    );
  });

  test('renders with custom hitComponent', () => {
    const props = createProps({
      hitComponent: ({ hit }) => <strong>{hit.objectID}</strong>,
    });

    const { container } = render(<InfiniteHits {...props} />);

    expect(container.querySelectorAll('strong')).toHaveLength(2);

    expect(container).toMatchInlineSnapshot(`
      <div>
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
                abc
              </strong>
            </li>
            <li
              class="ais-InfiniteHits-item"
            >
              <strong>
                def
              </strong>
            </li>
          </ol>
          <button
            class="ais-InfiniteHits-loadMore"
          >
            Show more results
          </button>
        </div>
      </div>
    `);
  });

  test('renders without showPrevious if disabled', () => {
    const props = createProps({
      showPrevious: undefined,
    });

    const { container } = render(<InfiniteHits {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-InfiniteHits"
        >
          <ol
            class="ais-InfiniteHits-list"
          >
            <li
              class="ais-InfiniteHits-item"
            >
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"abc","__position":1}
                …
              </div>
            </li>
            <li
              class="ais-InfiniteHits-item"
            >
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"def","__position":2}
                …
              </div>
            </li>
          </ol>
          <button
            class="ais-InfiniteHits-loadMore"
          >
            Show more results
          </button>
        </div>
      </div>
    `);
  });
});
