import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createFakeMapInstance } from '../../test/mockGoogleMaps';
import { Redo } from '../Redo';

Enzyme.configure({ adapter: new Adapter() });

describe('Redo', () => {
  const getStateContext = context => ({ ...context });

  const defaultProps = {
    googleMapsInstance: createFakeMapInstance(),
    translate: x => x,
  };

  const defaultContext = {
    hasMapMoveSinceLastRefine: false,
    refineWithInstance: () => {},
  };

  it('expect to render correctly', () => {
    const context = {
      ...defaultContext,
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Redo {...props} />);

    expect(wrapper.find('button').prop('disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render correctly when map has moved', () => {
    const context = {
      ...defaultContext,
      hasMapMoveSinceLastRefine: true,
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Redo {...props} />);

    expect(wrapper.find('button').prop('disabled')).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('expect to call refineWithInstance on button click', () => {
    const mapInstance = createFakeMapInstance();

    const context = {
      ...defaultContext,
      ...getStateContext(defaultContext),
      refineWithInstance: jest.fn(),
    };

    const props = {
      ...defaultProps,
      googleMapsInstance: mapInstance,
      context,
    };

    const wrapper = shallow(<Redo {...props} />);

    const { refineWithInstance } = context;

    expect(refineWithInstance).toHaveBeenCalledTimes(0);

    wrapper.find('button').simulate('click');

    expect(refineWithInstance).toHaveBeenCalledTimes(1);
    expect(refineWithInstance).toHaveBeenCalledWith(mapInstance);
  });
});
