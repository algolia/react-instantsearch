import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ToggleRefinement } from '../ToggleRefinement';

import type { ToggleRefinementProps } from '../ToggleRefinement';

describe('ToggleRefinement', () => {
  function createProps(
    props: Partial<ToggleRefinementProps>
  ): ToggleRefinementProps {
    return {
      label: 'Free shipping',
      onChange: jest.fn(),
      classNames: {},
      ...props,
    };
  }

  test('renders with props', () => {
    const props = createProps({});
    const { container } = render(<ToggleRefinement {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ToggleRefinement"
        >
          <label
            class="ais-ToggleRefinement-label"
          >
            <input
              class="ais-ToggleRefinement-checkbox"
              type="checkbox"
            />
            <span
              class="ais-ToggleRefinement-labelText"
            >
              Free shipping
            </span>
          </label>
        </div>
      </div>
    `);
  });

  test('customizes the label', () => {
    const props = createProps({ label: 'Gluten free' });
    const { container } = render(<ToggleRefinement {...props} />);

    expect(
      container.querySelector('.ais-ToggleRefinement-labelText')
    ).toHaveTextContent('Gluten free');
  });

  test('sets the checkbox as checked', () => {
    const props = createProps({ checked: true });
    const { container } = render(<ToggleRefinement {...props} />);

    expect(
      (
        container.querySelector(
          '.ais-ToggleRefinement-checkbox'
        ) as HTMLInputElement
      ).checked
    ).toBe(true);
  });

  test('passes an `onChange` callback to the checkbox', () => {
    const props = createProps({});
    const { container } = render(<ToggleRefinement {...props} />);

    userEvent.click(
      container.querySelector<HTMLInputElement>(
        '.ais-ToggleRefinement-checkbox'
      )!
    );

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenLastCalledWith(true);
  });

  test('customizes the class names', () => {
    const props = createProps({
      classNames: {
        root: 'MyCustomToggleRefinement',
        label: 'MyCustomToggleRefinementLabel',
        checkbox: 'MyCustomToggleRefinementCheckbox',
        labelText: 'MyCustomToggleRefinementLabelText',
      },
    });
    const { container } = render(<ToggleRefinement {...props} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ToggleRefinement MyCustomToggleRefinement"
        >
          <label
            class="ais-ToggleRefinement-label MyCustomToggleRefinementLabel"
          >
            <input
              class="ais-ToggleRefinement-checkbox MyCustomToggleRefinementCheckbox"
              type="checkbox"
            />
            <span
              class="ais-ToggleRefinement-labelText MyCustomToggleRefinementLabelText"
            >
              Free shipping
            </span>
          </label>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const props = createProps({
      className: 'MyToggleRefinement',
      title: 'Some custom title',
    });
    const { container } = render(<ToggleRefinement {...props} />);

    expect(container.firstChild).toHaveClass('MyToggleRefinement');
    expect(container.firstChild).toHaveAttribute('title', 'Some custom title');
  });
});
