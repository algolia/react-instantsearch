import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AutoHideContainer from './AutoHideContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('AutoHideContainer', () => {
  it('expect to render when canRefine is true & autoHideContainer is false', () => {
    const props = {
      canRefine: true,
      // use autoHideContainer defaultProps => false
    };

    const wrapper = shallow(
      <AutoHideContainer {...props}>
        <p>Hello from content</p>
      </AutoHideContainer>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render when canRefine is false & autoHideContainer is false', () => {
    const props = {
      canRefine: false,
      // use autoHideContainer defaultProps => false
    };

    const wrapper = shallow(
      <AutoHideContainer {...props}>
        <p>Hello from content</p>
      </AutoHideContainer>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render when canRefine is true & autoHideContainer is true', () => {
    const props = {
      canRefine: true,
      autoHideContainer: true,
    };

    const wrapper = shallow(
      <AutoHideContainer {...props}>
        <p>Hello from content</p>
      </AutoHideContainer>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to not render when canRefine is false & autoHideContainer is true', () => {
    const props = {
      canRefine: false,
      autoHideContainer: true,
    };

    const wrapper = shallow(
      <AutoHideContainer {...props}>
        <p>Hello from content</p>
      </AutoHideContainer>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
