import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Pagination } from '../Pagination';

import type { PaginationProps } from '../Pagination';

describe('Pagination', () => {
  function createProps({ ...props }: Partial<PaginationProps>) {
    const onClick = jest.fn();

    return {
      items: [
        { label: '1', value: 0 },
        { label: '2', value: 1 },
      ],
      currentPage: 0,
      nbPages: 2,
      isFirstPage: true,
      isLastPage: false,
      createURL: (value: number) => `/?page=${value + 1}`,
      onClick,
      ...props,
    };
  }

  test('renders with items', () => {
    const props = createProps({
      currentPage: 1,
      nbPages: 6,
      isFirstPage: false,
      isLastPage: false,
    });

    const { container } = render(<Pagination {...props} />);

    const firstPageItem = document.querySelector(
      '.ais-Pagination-item--firstPage'
    );
    const firstPageLink = firstPageItem!.querySelector('.ais-Pagination-link');
    const previousPageItem = document.querySelector(
      '.ais-Pagination-item--previousPage'
    );
    const previousPageLink = previousPageItem!.querySelector(
      '.ais-Pagination-link'
    );
    const nextPageItem = document.querySelector(
      '.ais-Pagination-item--nextPage'
    );
    const nextPageLink = nextPageItem!.querySelector('.ais-Pagination-link');
    const lastPageItem = document.querySelector(
      '.ais-Pagination-item--lastPage'
    );
    const lastPageLink = lastPageItem!.querySelector('.ais-Pagination-link');

    expect(firstPageLink).toHaveAttribute('aria-label', 'First');
    expect(firstPageLink).toHaveAttribute('href', '/?page=1');
    expect(previousPageLink).toHaveAttribute('aria-label', 'Previous');
    expect(previousPageLink).toHaveAttribute('href', '/?page=1');

    expect(nextPageLink).toHaveAttribute('aria-label', 'Next');
    expect(nextPageLink).toHaveAttribute('href', '/?page=3');
    expect(lastPageLink).toHaveAttribute('aria-label', 'Last');
    expect(lastPageLink).toHaveAttribute('href', '/?page=6');

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--firstPage"
            >
              <a
                aria-label="First"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹‹
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--previousPage"
            >
              <a
                aria-label="Previous"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--nextPage"
            >
              <a
                aria-label="Next"
                class="ais-Pagination-link"
                href="/?page=3"
              >
                ›
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--lastPage"
            >
              <a
                aria-label="Last"
                class="ais-Pagination-link"
                href="/?page=6"
              >
                ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  test('enables first and previous page when current page is not the first page', () => {
    const props = createProps({
      currentPage: 1,
      isFirstPage: false,
      isLastPage: true,
    });

    const { container } = render(<Pagination {...props} />);

    const firstPageItem = document.querySelector(
      '.ais-Pagination-item--firstPage'
    );
    const previousPageItem = document.querySelector(
      '.ais-Pagination-item--previousPage'
    );

    expect(firstPageItem).not.toHaveClass('ais-Pagination-item--disabled');
    expect(previousPageItem).not.toHaveClass('ais-Pagination-item--disabled');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--firstPage"
            >
              <a
                aria-label="First"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹‹
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--previousPage"
            >
              <a
                aria-label="Previous"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--nextPage"
            >
              <span
                aria-label="Next"
                class="ais-Pagination-link"
              >
                ›
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--lastPage"
            >
              <span
                aria-label="Last"
                class="ais-Pagination-link"
              >
                ››
              </span>
            </li>
          </ul>
        </div>
      </div>
    `);

    userEvent.click(
      firstPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );
    userEvent.click(
      previousPageItem!.querySelector(
        '.ais-Pagination-link'
      ) as HTMLButtonElement
    );

    expect(props.onClick).toHaveBeenCalledTimes(2);
  });

  test('disables first and previous page when current page is the first page', () => {
    const props = createProps({});

    const { container } = render(<Pagination {...props} />);

    const firstPageItem = document.querySelector(
      '.ais-Pagination-item--firstPage'
    );
    const previousPageItem = document.querySelector(
      '.ais-Pagination-item--previousPage'
    );

    expect(firstPageItem).toHaveClass('ais-Pagination-item--disabled');
    expect(previousPageItem).toHaveClass('ais-Pagination-item--disabled');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--firstPage"
            >
              <span
                aria-label="First"
                class="ais-Pagination-link"
              >
                ‹‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--previousPage"
            >
              <span
                aria-label="Previous"
                class="ais-Pagination-link"
              >
                ‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--nextPage"
            >
              <a
                aria-label="Next"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ›
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--lastPage"
            >
              <a
                aria-label="Last"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);

    userEvent.click(
      firstPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );
    userEvent.click(
      previousPageItem!.querySelector(
        '.ais-Pagination-link'
      ) as HTMLButtonElement
    );

    expect(props.onClick).not.toHaveBeenCalled();
  });

  test('enables next and last page when current page is not the last page', () => {
    const props = createProps({});

    const { container } = render(<Pagination {...props} />);

    const nextPageItem = document.querySelector(
      '.ais-Pagination-item--nextPage'
    );
    const lastPageItem = document.querySelector(
      '.ais-Pagination-item--lastPage'
    );

    expect(nextPageItem).not.toHaveClass('ais-Pagination-item--disabled');
    expect(lastPageItem).not.toHaveClass('ais-Pagination-item--disabled');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--firstPage"
            >
              <span
                aria-label="First"
                class="ais-Pagination-link"
              >
                ‹‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--previousPage"
            >
              <span
                aria-label="Previous"
                class="ais-Pagination-link"
              >
                ‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--nextPage"
            >
              <a
                aria-label="Next"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ›
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--lastPage"
            >
              <a
                aria-label="Last"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);

    userEvent.click(
      nextPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );
    userEvent.click(
      lastPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );

    expect(props.onClick).toHaveBeenCalledTimes(2);
  });

  test('disables next and last page when current page is the last page', () => {
    const props = createProps({
      currentPage: 1,
      nbPages: 2,
      isFirstPage: false,
      isLastPage: true,
    });

    const { container } = render(<Pagination {...props} />);

    const nextPageItem = document.querySelector(
      '.ais-Pagination-item--nextPage'
    );
    const lastPageItem = document.querySelector(
      '.ais-Pagination-item--lastPage'
    );

    expect(nextPageItem).toHaveClass('ais-Pagination-item--disabled');
    expect(lastPageItem).toHaveClass('ais-Pagination-item--disabled');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--firstPage"
            >
              <a
                aria-label="First"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹‹
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--previousPage"
            >
              <a
                aria-label="Previous"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                ‹
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--nextPage"
            >
              <span
                aria-label="Next"
                class="ais-Pagination-link"
              >
                ›
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--lastPage"
            >
              <span
                aria-label="Last"
                class="ais-Pagination-link"
              >
                ››
              </span>
            </li>
          </ul>
        </div>
      </div>
    `);

    userEvent.click(
      nextPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );
    userEvent.click(
      lastPageItem!.querySelector('.ais-Pagination-link') as HTMLButtonElement
    );

    expect(props.onClick).not.toHaveBeenCalled();
  });

  test('forwards a custom class name to the root element', () => {
    const props = createProps({});

    const { container } = render(
      <Pagination {...props} className="MyPagination" />
    );

    expect(document.querySelector('.ais-Pagination')).toHaveClass(
      'MyPagination'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination MyPagination"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--firstPage"
            >
              <span
                aria-label="First"
                class="ais-Pagination-link"
              >
                ‹‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--previousPage"
            >
              <span
                aria-label="Previous"
                class="ais-Pagination-link"
              >
                ‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--nextPage"
            >
              <a
                aria-label="Next"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ›
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--lastPage"
            >
              <a
                aria-label="Last"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  test('forwards `div` props to the root element', () => {
    const props = createProps({});

    const { container } = render(
      <Pagination {...props} title="Some custom title" />
    );

    expect(document.querySelector('.ais-Pagination')).toHaveAttribute(
      'title',
      'Some custom title'
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Pagination"
          title="Some custom title"
        >
          <ul
            class="ais-Pagination-list"
          >
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--firstPage"
            >
              <span
                aria-label="First"
                class="ais-Pagination-link"
              >
                ‹‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--disabled ais-Pagination-item--previousPage"
            >
              <span
                aria-label="Previous"
                class="ais-Pagination-link"
              >
                ‹
              </span>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--selected"
            >
              <a
                aria-label="1"
                class="ais-Pagination-link"
                href="/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="ais-Pagination-item"
            >
              <a
                aria-label="2"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--nextPage"
            >
              <a
                aria-label="Next"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ›
              </a>
            </li>
            <li
              class="ais-Pagination-item ais-Pagination-item--lastPage"
            >
              <a
                aria-label="Last"
                class="ais-Pagination-link"
                href="/?page=2"
              >
                ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);
  });
});
