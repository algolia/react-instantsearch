import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Breadcrumb } from '../Breadcrumb';

import type { BreadcrumbProps } from '../Breadcrumb';

describe('Breadcrumb', () => {
  function createProps(props: Partial<BreadcrumbProps> = {}) {
    const createURL = jest.fn((value) => `#${value}`);
    const onNavigate = jest.fn();

    return {
      items: [
        { label: 'Audio', value: 'Audio' },
        { label: 'Home audio', value: 'Home audio' },
      ],
      createURL,
      onNavigate,
      ...props,
    };
  }

  test('renders with items', () => {
    const props = createProps();
    const { container } = render(<Breadcrumb {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Breadcrumb"
        >
          <ul
            class="ais-Breadcrumb-list"
          >
            <li
              class="ais-Breadcrumb-item"
            >
              <a
                class="ais-Breadcrumb-link"
                href="#null"
              >
                Home
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              <a
                class="ais-Breadcrumb-link"
                href="#Audio"
              >
                Audio
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item ais-Breadcrumb-item--selected"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              Home audio
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  test('renders with component slots', () => {
    const props = createProps({
      rootComponent: <span style={{ fontStyle: 'italic' }}>Home</span>,
      separatorComponent: '/',
    });
    const { container } = render(<Breadcrumb {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Breadcrumb"
        >
          <ul
            class="ais-Breadcrumb-list"
          >
            <li
              class="ais-Breadcrumb-item"
            >
              <a
                class="ais-Breadcrumb-link"
                href="#null"
              >
                <span
                  style="font-style: italic;"
                >
                  Home
                </span>
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                /
              </span>
              <a
                class="ais-Breadcrumb-link"
                href="#Audio"
              >
                Audio
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item ais-Breadcrumb-item--selected"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                /
              </span>
              Home audio
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  test('calls an `onNavigate` callback when selecting an item', () => {
    const props = createProps();
    render(<Breadcrumb {...props} />);

    userEvent.click(
      document.querySelector(
        '.ais-Breadcrumb-link[href="#Audio"]'
      ) as HTMLAnchorElement
    );

    expect(props.onNavigate).toHaveBeenCalledTimes(1);
  });

  test('forwards a custom class name to the root element', () => {
    const props = createProps();
    const { container } = render(
      <Breadcrumb className="MyBreadcrumb" {...props} />
    );

    expect(document.querySelector('.ais-Breadcrumb')).toHaveClass(
      'MyBreadcrumb'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Breadcrumb MyBreadcrumb"
        >
          <ul
            class="ais-Breadcrumb-list"
          >
            <li
              class="ais-Breadcrumb-item"
            >
              <a
                class="ais-Breadcrumb-link"
                href="#null"
              >
                Home
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              <a
                class="ais-Breadcrumb-link"
                href="#Audio"
              >
                Audio
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item ais-Breadcrumb-item--selected"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              Home audio
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const props = createProps();
    const { container } = render(
      <Breadcrumb title="Some custom title" {...props} />
    );

    expect(document.querySelector('.ais-Breadcrumb')).toHaveAttribute(
      'title',
      'Some custom title'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Breadcrumb"
          title="Some custom title"
        >
          <ul
            class="ais-Breadcrumb-list"
          >
            <li
              class="ais-Breadcrumb-item"
            >
              <a
                class="ais-Breadcrumb-link"
                href="#null"
              >
                Home
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              <a
                class="ais-Breadcrumb-link"
                href="#Audio"
              >
                Audio
              </a>
            </li>
            <li
              class="ais-Breadcrumb-item ais-Breadcrumb-item--selected"
            >
              <span
                aria-hidden="true"
                class="ais-Breadcrumb-separator"
              >
                &gt;
              </span>
              Home audio
            </li>
          </ul>
        </div>
      </div>
    `);
  });
});
