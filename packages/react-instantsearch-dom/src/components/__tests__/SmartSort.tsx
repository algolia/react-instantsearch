import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import SmartSort from '../SmartSort';

const textComponent = ({ isSmartSorted }) => (
  <div>
    {isSmartSorted
      ? 'We are filtering unrelevant results'
      : 'We are not filtering unrelevant results'}
  </div>
);

const buttonTextComponent = ({ isSmartSorted }) => (
  <div>{isSmartSorted ? 'See all results' : 'See relevant results'}</div>
);

textComponent.propTypes = {
  isSmartSorted: PropTypes.bool.isRequired,
};

buttonTextComponent.propTypes = {
  isSmartSorted: PropTypes.bool.isRequired,
};

describe('SmartSort', () => {
  it("returns null if it's not a virtual replica", () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={buttonTextComponent}
        isVirtualReplica={false}
        isSmartSorted={false}
        refine={() => {}}
        textComponent={textComponent}
      />
    );

    expect(tree.toJSON()).toBeNull();
  });

  it('accepts a custom className', () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={buttonTextComponent}
        className="MyCustomSmartSort"
        isVirtualReplica={true}
        isSmartSorted={false}
        refine={() => {}}
        textComponent={textComponent}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('forward isSmartSorted to props components', () => {
    const tree = renderer.create(
      <SmartSort
        buttonTextComponent={buttonTextComponent}
        isVirtualReplica={true}
        isSmartSorted={true}
        refine={() => {}}
        textComponent={textComponent}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
