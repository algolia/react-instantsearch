import { render } from '@testing-library/react';
import React from 'react';

import { Hits } from '../Hits';

import type { HitsProps } from '../Hits';
import type { Hit } from 'instantsearch.js';

describe('Hits', () => {
  function createProps<THit extends Hit = Hit>(
    props: Partial<HitsProps<THit>>
  ) {
    return {
      hits: [
        { objectID: 'abc', __position: 1 },
        { objectID: 'def', __position: 2 },
      ],
      ...props,
    };
  }

  test('renders with default props', () => {
    const props = createProps({});

    const { container } = render(<Hits {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Hits"
        >
          <ol
            class="ais-Hits-list"
          >
            <li
              class="ais-Hits-item"
            >
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"abc","__position":1}
                …
              </div>
            </li>
            <li
              class="ais-Hits-item"
            >
              <div
                style="border-bottom: 1px solid #bbb; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all;"
              >
                {"objectID":"def","__position":2}
                …
              </div>
            </li>
          </ol>
        </div>
      </div>
    `);
  });

  test('renders with custom hitComponent', () => {
    const props = createProps({
      hitComponent: ({ hit }) => <strong>{hit.objectID}</strong>,
    });

    const { container } = render(<Hits {...props} />);

    expect(container.querySelectorAll('strong')).toHaveLength(2);

    expect(container).toMatchInlineSnapshot(`
      <div>
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
                abc
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                def
              </strong>
            </li>
          </ol>
        </div>
      </div>
    `);
  });
});
