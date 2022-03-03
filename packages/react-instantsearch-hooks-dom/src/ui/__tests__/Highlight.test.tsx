import { render } from '@testing-library/react';
import React from 'react';

import { Highlight } from '../Highlight';

describe('Highlight', () => {
  test('renders only wrapper with empty match', () => {
    const { container } = render(
      <Highlight baseClassName="ais-Highlight" parts={[]} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="ais-Highlight"
        />
      </div>
    `);
  });

  test('renders parts', () => {
    const { container } = render(
      <Highlight
        baseClassName="ais-Highlight"
        parts={[
          [
            { isHighlighted: true, value: 'te' },
            { isHighlighted: false, value: 'st' },
          ],
          [{ isHighlighted: false, value: 'nothing' }],
        ]}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="ais-Highlight"
        >
          <mark
            class="ais-Highlight-highlighted"
          >
            te
          </mark>
          <span
            class="ais-Highlight-nonHighlighted"
          >
            st
          </span>
          <span
            class="ais-Highlight-separator"
          >
            , 
          </span>
          <span
            class="ais-Highlight-nonHighlighted"
          >
            nothing
          </span>
        </span>
      </div>
    `);
  });

  test('renders with custom tag names and separator', () => {
    function Highlighted({ children }) {
      return <strong>{children}</strong>;
    }
    function NonHighlighted({ children }) {
      return <small>{children}</small>;
    }

    const { container } = render(
      <Highlight
        baseClassName="ais-Highlight"
        highlightedTagName={Highlighted}
        nonHighlightedTagName={NonHighlighted}
        separator={<strong> - </strong>}
        parts={[
          [
            { isHighlighted: true, value: 'te' },
            { isHighlighted: false, value: 'st' },
          ],
          [{ isHighlighted: false, value: 'nothing' }],
        ]}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="ais-Highlight"
        >
          <strong>
            te
          </strong>
          <small>
            st
          </small>
          <span
            class="ais-Highlight-separator"
          >
            <strong>
               - 
            </strong>
          </span>
          <small>
            nothing
          </small>
        </span>
      </div>
    `);
  });

  test('forwards `className` and root props', () => {
    const { container } = render(
      <Highlight
        baseClassName="ais-Highlight"
        parts={[]}
        className="custom-root"
        aria-hidden="true"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          aria-hidden="true"
          class="ais-Highlight custom-root"
        />
      </div>
    `);
  });
});
