import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ClearRefinements } from '../ClearRefinements';

describe('ClearRefinements', () => {
  test('renders with default props', () => {
    const { container } = render(<ClearRefinements />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button"
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('renders with custom props', () => {
    const onClick = jest.fn();

    const { container, getByRole } = render(
      <ClearRefinements onClick={onClick}>Clear</ClearRefinements>
    );

    userEvent.click(getByRole('button'));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button"
          >
            Clear
          </button>
        </div>
      </div>
    `);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('appends a custom class name to the root element', () => {
    const { container } = render(
      <ClearRefinements className="customClass">Clear</ClearRefinements>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements customClass"
        >
          <button
            class="ais-ClearRefinements-button"
          >
            Clear
          </button>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const { container } = render(
      <ClearRefinements title="Some custom title">Clear</ClearRefinements>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements"
          title="Some custom title"
        >
          <button
            class="ais-ClearRefinements-button"
          >
            Clear
          </button>
        </div>
      </div>
    `);
  });

  test('disables the button', () => {
    const { container } = render(
      <ClearRefinements disabled>Clear</ClearRefinements>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear
          </button>
        </div>
      </div>
    `);
  });
});
