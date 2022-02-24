import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CurrentRefinements } from '../CurrentRefinements';

describe('CurrentRefinements', () => {
  test('renders with default props', () => {
    const { container } = render(<CurrentRefinements />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-CurrentRefinements ais-CurrentRefinements--noRefinement"
        >
          <ul
            class="ais-CurrentRefinements-list ais-CurrentRefinements-list--noRefinement"
          />
        </div>
      </div>
    `);
  });

  test('renders with clickable refinements', () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    const { container } = render(
      <CurrentRefinements
        items={[
          {
            label: 'Brand',
            category: [
              { label: 'Apple', onClick: onClick1 },
              { label: 'Samsung', onClick: onClick2 },
            ],
          },
        ]}
        hasRefinements={true}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-CurrentRefinements"
        >
          <ul
            class="ais-CurrentRefinements-list"
          >
            <li
              class="ais-CurrentRefinements-item"
            >
              <span
                class="ais-CurrentRefinements-label"
              >
                Brand
                :
              </span>
              <span
                class="ais-CurrentRefinements-category"
              >
                <span
                  class="ais-CurrentRefinements-categoryLabel"
                >
                  Apple
                </span>
                <button
                  class="ais-CurrentRefinements-delete"
                >
                  ✕
                </button>
              </span>
              <span
                class="ais-CurrentRefinements-category"
              >
                <span
                  class="ais-CurrentRefinements-categoryLabel"
                >
                  Samsung
                </span>
                <button
                  class="ais-CurrentRefinements-delete"
                >
                  ✕
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    `);

    const [button1, button2] = document.querySelectorAll(
      '.ais-CurrentRefinements-delete'
    );

    userEvent.click(button1);

    expect(onClick1).toHaveBeenCalledTimes(1);

    userEvent.click(button2);

    expect(onClick2).toHaveBeenCalledTimes(1);
  });

  test('forwards a custom class name to the root element', () => {
    const { container } = render(
      <CurrentRefinements className="MyCurrentRefinements" />
    );

    expect(document.querySelector('.ais-CurrentRefinements')).toHaveClass(
      'MyCurrentRefinements'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-CurrentRefinements ais-CurrentRefinements--noRefinement MyCurrentRefinements"
        >
          <ul
            class="ais-CurrentRefinements-list ais-CurrentRefinements-list--noRefinement"
          />
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const { container } = render(
      <CurrentRefinements title="Some custom title" />
    );

    expect(document.querySelector('.ais-CurrentRefinements')).toHaveAttribute(
      'title',
      'Some custom title'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-CurrentRefinements ais-CurrentRefinements--noRefinement"
          title="Some custom title"
        >
          <ul
            class="ais-CurrentRefinements-list ais-CurrentRefinements-list--noRefinement"
          />
        </div>
      </div>
    `);
  });
});
