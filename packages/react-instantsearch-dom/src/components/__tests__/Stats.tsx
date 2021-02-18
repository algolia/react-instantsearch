import React from 'react';
import renderer from 'react-test-renderer';
import Stats from '../Stats';

describe('Stats', () => {
  it('renders with default props', () => {
    const tree = renderer.create(
      <Stats nbHits={42} isSmartSorted={false} processingTimeMS={0} />
    );

    expect(tree.toJSON()).toMatchInlineSnapshot(`
      <div
        className="ais-Stats"
      >
        <span
          className="ais-Stats-text"
        >
          42 results found in 0ms
        </span>
      </div>
    `);
  });

  it('accepts a custom className', () => {
    const tree = renderer.create(
      <Stats
        isSmartSorted={false}
        className="MyCustomStats"
        nbHits={42}
        processingTimeMS={0}
      />
    );

    expect(tree.toJSON()).toMatchInlineSnapshot(`
      <div
        className="ais-Stats MyCustomStats"
      >
        <span
          className="ais-Stats-text"
        >
          42 results found in 0ms
        </span>
      </div>
    `);
  });

  it('renders rely on isSmartSorted', () => {
    const tree = renderer.create(
      <Stats
        isSmartSorted={true}
        nbHits={42}
        nbSortedHits={21}
        processingTimeMS={0}
      />
    );

    expect(tree.toJSON()).toMatchInlineSnapshot(`
      <div
        className="ais-Stats"
      >
        <span
          className="ais-Stats-text"
        >
          21 relevant results sorted out of 42 in 0ms
        </span>
      </div>
    `);
  });

  it('renders default implementation if nbHits is equal to nbSortedHits', () => {
    const tree = renderer.create(
      <Stats
        isSmartSorted={false}
        nbHits={42}
        nbSortedHits={42}
        processingTimeMS={0}
      />
    );

    expect(tree.toJSON()).toMatchInlineSnapshot(`
      <div
        className="ais-Stats"
      >
        <span
          className="ais-Stats-text"
        >
          42 results found in 0ms
        </span>
      </div>
    `);
  });
});
