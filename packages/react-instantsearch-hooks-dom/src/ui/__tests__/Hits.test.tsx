import { render } from '@testing-library/react';
import React from 'react';

import { Hits } from '../Hits';

import type { HitsProps } from '../Hits';
import type { Hit } from 'instantsearch.js';

describe('Hits', () => {
  function createProps<THit extends Hit = Hit>(
    props: Partial<HitsProps<THit>>
  ): HitsProps<THit> {
    return {
      hits: [
        { objectID: 'abc', __position: 1 },
        { objectID: 'def', __position: 2 },
      ] as THit[],
      hitComponent: ({ hit }) => (
        <strong>{`${hit.objectID} - ${hit.__position}`}</strong>
      ),
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
              <strong>
                abc - 1
              </strong>
            </li>
            <li
              class="ais-Hits-item"
            >
              <strong>
                def - 2
              </strong>
            </li>
          </ol>
        </div>
      </div>
    `);
  });

  test('renders with custom className', () => {
    const props = createProps({ className: 'custom' });

    const { container } = render(<Hits {...props} />);

    expect(container.querySelector('.ais-Hits')!.className).toBe(
      'ais-Hits custom'
    );
  });

  test('allows custom class names', () => {
    const props = createProps({});
    const { container } = render(
      <Hits
        {...props}
        classNames={{
          root: 'ROOT',
          list: 'LIST',
          item: 'ITEM',
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Hits ROOT"
        >
          <ol
            class="ais-Hits-list LIST"
          >
            <li
              class="ais-Hits-item ITEM"
            >
              <strong>
                abc - 1
              </strong>
            </li>
            <li
              class="ais-Hits-item ITEM"
            >
              <strong>
                def - 2
              </strong>
            </li>
          </ol>
        </div>
      </div>
    `);
  });

  test('allows custom class names (empty)', () => {
    const props = createProps({ hits: [] });
    const { container } = render(
      <Hits
        {...props}
        classNames={{
          root: 'ROOT',
          emptyRoot: 'EMPTYROOT',
          list: 'LIST',
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Hits ROOT ais-Hits--empty EMPTYROOT"
        >
          <ol
            class="ais-Hits-list LIST"
          />
        </div>
      </div>
    `);
  });

  test('renders with custom div props', () => {
    const props = createProps({ hidden: true });

    const { container } = render(<Hits {...props} />);

    expect(container.querySelector<HTMLDivElement>('.ais-Hits')!.hidden).toBe(
      true
    );
  });
});
