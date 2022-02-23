import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  InstantSearch,
  useCurrentRefinements,
  useRefinementList,
} from 'react-instantsearch-hooks';

import { createSearchClient } from '../../../../../test/mock';
import { wait } from '../../../../../test/utils';
import { ClearRefinements } from '../ClearRefinements';

import type {
  InstantSearchProps,
  UseRefinementListProps,
  UseCurrentRefinementsProps,
} from 'react-instantsearch-hooks';

const searchClient = createSearchClient();

type SearchProviderProps = {
  children: React.ReactNode;
} & Partial<InstantSearchProps>;

const consoleError = jest.spyOn(console, 'error');

beforeAll(() => {
  consoleError.mockImplementation(() => {});
});

afterAll(() => {
  consoleError.mockRestore();
});

describe('ClearRefinements', () => {
  test('renders with default props', async () => {
    const { container } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <ClearRefinements />
      </SearchProvider>
    );

    await wait(0);

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

  test('renders with a disabled button when there are no refinements', async () => {
    const { container } = render(
      <SearchProvider>
        <ClearRefinements />
      </SearchProvider>
    );

    await wait(0);

    const button = document.querySelector('.ais-ClearRefinements-button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('ais-ClearRefinements-button--disabled');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('renders with a custom label', async () => {
    const { container } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <ClearRefinements resetLabel="Clear" />
      </SearchProvider>
    );

    await wait(0);

    expect(
      document.querySelector('.ais-ClearRefinements-button')
    ).toHaveTextContent('Clear');
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
  });

  test('clears all refinements', async () => {
    const { container, queryAllByRole } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <CurrentRefinements />
        <ClearRefinements />
      </SearchProvider>
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(1);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
        </ul>
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

    userEvent.click(
      document.querySelector(
        '.ais-ClearRefinements-button'
      ) as HTMLButtonElement
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(0);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul />
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('inclusively restricts what refinements to clear', async () => {
    const { container, queryAllByRole } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
              categories: ['Audio'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <RefinementList attribute="categories" />
        <CurrentRefinements />
        <ClearRefinements includedAttributes={['categories']} />
      </SearchProvider>
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(2);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
          <li>
            <span>
              categories
              :
            </span>
            <button>
              Audio
            </button>
          </li>
        </ul>
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

    userEvent.click(
      document.querySelector(
        '.ais-ClearRefinements-button'
      ) as HTMLButtonElement
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(1);
    expect(queryAllByRole('listitem')[0]).toHaveTextContent('brand:Apple');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
        </ul>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('exclusively restricts what refinements to clear', async () => {
    const { container, queryAllByRole } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
              categories: ['Audio'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <RefinementList attribute="categories" />
        <CurrentRefinements />
        <ClearRefinements excludedAttributes={['categories']} />
      </SearchProvider>
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(2);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
          <li>
            <span>
              categories
              :
            </span>
            <button>
              Audio
            </button>
          </li>
        </ul>
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

    userEvent.click(
      document.querySelector(
        '.ais-ClearRefinements-button'
      ) as HTMLButtonElement
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(1);
    expect(queryAllByRole('listitem')[0]).toHaveTextContent('categories:Audio');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              categories
              :
            </span>
            <button>
              Audio
            </button>
          </li>
        </ul>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('restricts what refinements to clear with custom logic', async () => {
    const { container, queryAllByRole } = render(
      <SearchProvider
        initialUiState={{
          indexName: {
            refinementList: {
              brand: ['Apple'],
              categories: ['Audio'],
            },
          },
        }}
      >
        <RefinementList attribute="brand" />
        <RefinementList attribute="categories" />
        <CurrentRefinements />
        <ClearRefinements
          transformItems={(items) => items.filter((item) => item !== 'brand')}
        />
      </SearchProvider>
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(2);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
          <li>
            <span>
              categories
              :
            </span>
            <button>
              Audio
            </button>
          </li>
        </ul>
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

    userEvent.click(
      document.querySelector(
        '.ais-ClearRefinements-button'
      ) as HTMLButtonElement
    );

    await wait(0);

    expect(queryAllByRole('listitem')).toHaveLength(1);
    expect(queryAllByRole('listitem')[0]).toHaveTextContent('brand:Apple');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            <span>
              brand
              :
            </span>
            <button>
              Apple
            </button>
          </li>
        </ul>
        <div
          class="ais-ClearRefinements"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', async () => {
    const { container } = render(
      <SearchProvider>
        <ClearRefinements
          className="MyClearsRefinements"
          title="Some custom title"
        />
      </SearchProvider>
    );

    await wait(0);

    const root = document.querySelector('.ais-ClearRefinements');

    expect(root).toHaveClass('MyClearsRefinements');
    expect(root).toHaveAttribute('title', 'Some custom title');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-ClearRefinements MyClearsRefinements"
          title="Some custom title"
        >
          <button
            class="ais-ClearRefinements-button ais-ClearRefinements-button--disabled"
            disabled=""
          >
            Clear refinements
          </button>
        </div>
      </div>
    `);
  });
});

function SearchProvider({ children, ...props }: SearchProviderProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName="indexName" {...props}>
      {children}
    </InstantSearch>
  );
}

function CurrentRefinements(props: UseCurrentRefinementsProps) {
  const { items } = useCurrentRefinements(props);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.attribute}>
          <span>{item.attribute}:</span>
          {item.refinements.map(({ label }) => (
            <button key={label}>{label}</button>
          ))}
        </li>
      ))}
    </ul>
  );
}

function RefinementList(props: UseRefinementListProps) {
  useRefinementList(props);

  return null;
}
