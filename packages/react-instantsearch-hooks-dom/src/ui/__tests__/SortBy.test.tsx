import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { SortBy } from '../SortBy';

import type { SortByProps } from '../SortBy';

describe('SortBy', () => {
  function createProps(props: Partial<SortByProps>) {
    return {
      classNames: {
        root: 'ais-SortBy',
        select: 'ais-SortBy-select',
        option: 'ais-SortBy-option',
      },
      ...props,
    };
  }

  test('renders with items', () => {
    const props = createProps({});
    const { container } = render(
      <SortBy
        {...props}
        items={[
          { label: 'Featured', value: 'instant_search' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    );

    expect(document.querySelector('.ais-SortBy-select')).toHaveValue(
      'instant_search'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-SortBy"
        >
          <select
            class="ais-SortBy-select"
          >
            <option
              class="ais-SortBy-option"
              value="instant_search"
            >
              Featured
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_asc"
            >
              Price (asc)
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_desc"
            >
              Price (desc)
            </option>
          </select>
        </div>
      </div>
    `);
  });

  test('sets the value', () => {
    const props = createProps({});

    render(
      <SortBy
        {...props}
        value="instant_search_price_asc"
        items={[
          { label: 'Featured', value: 'instant_search' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    );

    expect(document.querySelector('.ais-SortBy-select')).toHaveValue(
      'instant_search_price_asc'
    );
  });

  test('calls an `onChange` callback when selecting an option', () => {
    const props = createProps({});

    const onChange = jest.fn();
    const { getByRole } = render(
      <SortBy
        {...props}
        onChange={onChange}
        items={[
          { label: 'Featured', value: 'instant_search' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    );

    userEvent.selectOptions(
      document.querySelector('.ais-SortBy-select') as HTMLSelectElement,
      getByRole('option', { name: 'Price (asc)' })
    );

    expect(document.querySelector('.ais-SortBy-select')).toHaveValue(
      'instant_search_price_asc'
    );
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('forwards a custom class name to the root element', () => {
    const props = createProps({});

    const { container } = render(
      <SortBy
        {...props}
        className="MySortBy"
        items={[
          { label: 'Featured', value: 'instant_search' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    );

    expect(document.querySelector('.ais-SortBy')).toHaveClass('MySortBy');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-SortBy MySortBy"
        >
          <select
            class="ais-SortBy-select"
          >
            <option
              class="ais-SortBy-option"
              value="instant_search"
            >
              Featured
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_asc"
            >
              Price (asc)
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_desc"
            >
              Price (desc)
            </option>
          </select>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const props = createProps({});

    const { container } = render(
      <SortBy
        {...props}
        title="Some custom title"
        items={[
          { label: 'Featured', value: 'instant_search' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    );

    expect(document.querySelector('.ais-SortBy')).toHaveAttribute(
      'title',
      'Some custom title'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-SortBy"
          title="Some custom title"
        >
          <select
            class="ais-SortBy-select"
          >
            <option
              class="ais-SortBy-option"
              value="instant_search"
            >
              Featured
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_asc"
            >
              Price (asc)
            </option>
            <option
              class="ais-SortBy-option"
              value="instant_search_price_desc"
            >
              Price (desc)
            </option>
          </select>
        </div>
      </div>
    `);
  });
});
