import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from '../Provider';

Enzyme.configure({ adapter: new Adapter() });

describe('Provider', () => {
  const defaultProps = {
    hits: [],
    position: null,
    currentRefinement: null,
    isRefinedWithMap: false,
  };

  it('expect to call children with props', () => {
    const children = jest.fn(x => x);

    const props = {
      ...defaultProps,
    };

    shallow(<Provider {...props}>{children}</Provider>);

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({
      hits: [],
      position: null,
      currentRefinement: null,
      isRefinedWithMap: false,
    });
  });
});
