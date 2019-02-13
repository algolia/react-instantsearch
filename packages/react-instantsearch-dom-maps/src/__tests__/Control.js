import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createFakeMapInstance } from '../../test/mockGoogleMaps';
import { Control } from '../Control';

Enzyme.configure({ adapter: new Adapter() });

describe('Control', () => {
  const getStateContext = context => ({ ...context });

  const defaultProps = {
    googleMapsInstance: createFakeMapInstance(),
    translate: x => x,
  };

  const defaultContext = {
    isRefineOnMapMove: true,
    hasMapMoveSinceLastRefine: false,
    toggleRefineOnMapMove: () => {},
    refineWithInstance: () => {},
  };

  it('expect to render correctly with refine on map move', () => {
    const context = {
      ...defaultContext,
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Control {...props} />, {
      context,
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').props().checked).toBe(true);
  });

  it('expect to render correctly without refine on map move', () => {
    const context = {
      ...defaultContext,
      ...getStateContext(defaultContext),
      isRefineOnMapMove: false,
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Control {...props} />, {
      context,
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').props().checked).toBe(false);
  });

  it('expect to render correctly without refine on map move when the map has moved', () => {
    const context = {
      ...defaultContext,
      ...getStateContext(defaultContext),
      isRefineOnMapMove: false,
      hasMapMoveSinceLastRefine: true,
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Control {...props} />, {
      context,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to call toggleRefineOnMapMove on input change', () => {
    const context = {
      ...defaultContext,
      ...getStateContext(defaultContext),
      toggleRefineOnMapMove: jest.fn(),
    };

    const props = {
      ...defaultProps,
      context,
    };

    const wrapper = shallow(<Control {...props} />, {
      context,
    });

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('change');

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(1);
  });

  it('expect to call refineWithInstance on button click', () => {
    const mapInstance = createFakeMapInstance();

    const context = {
      ...defaultContext,
      ...getStateContext(defaultContext),
      isRefineOnMapMove: false,
      hasMapMoveSinceLastRefine: true,
      refineWithInstance: jest.fn(),
    };

    const props = {
      ...defaultProps,
      googleMapsInstance: mapInstance,
      context,
    };

    const wrapper = shallow(<Control {...props} />, {
      context,
    });

    const { refineWithInstance } = getStateContext(context);

    expect(refineWithInstance).toHaveBeenCalledTimes(0);

    wrapper.find('button').simulate('click');

    expect(refineWithInstance).toHaveBeenCalledTimes(1);
    expect(refineWithInstance).toHaveBeenCalledWith(mapInstance);
  });
});
