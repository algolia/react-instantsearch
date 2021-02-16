import React from 'react';
import renderer from 'react-test-renderer';
import SmartSort, { SmartSortComponentProps } from '../SmartSort';

const TextComponent = ({ isSmartSorted }: SmartSortComponentProps) => (
  <div>
    {isSmartSorted
      ? 'We removed some search results to show you the most relevant ones'
      : 'Currently showing all results'}
  </div>
);

const ButtonTextComponent = ({ isSmartSorted }: SmartSortComponentProps) => (
  <div>{isSmartSorted ? 'See all results' : 'See relevant results'}</div>
);

describe('SmartSort', () => {
  it("returns null if it's not a virtual replica", () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={ButtonTextComponent}
        isVirtualReplica={false}
        isSmartSorted={false}
        refine={() => {}}
        textComponent={TextComponent}
      />
    );

    expect(tree.toJSON()).toBeNull();
  });

  it('accepts a custom className', () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={ButtonTextComponent}
        className="MyCustomSmartSort"
        isVirtualReplica={true}
        isSmartSorted={false}
        refine={() => {}}
        textComponent={TextComponent}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('forward isSmartSorted to props components', () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={ButtonTextComponent}
        isVirtualReplica={true}
        isSmartSorted={true}
        refine={() => {}}
        textComponent={TextComponent}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
