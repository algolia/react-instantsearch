import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { STATE_CONTEXT } from '../Provider';
import { GOOGLE_MAPS_CONTEXT } from '../GoogleMaps';
import { Redo } from '../Redo';

Enzyme.configure({ adapter: new Adapter() });

describe('Redo', () => {
  const defaultProps = {
    translate: x => x,
  };

  const defaultContext = {
    [STATE_CONTEXT]: {
      isRefineOnMapMove: true,
      hasMapMoveSinceLastRefine: false,
      toggleRefineOnMapMove: () => {},
    },
    [GOOGLE_MAPS_CONTEXT]: {
      refineWithBoundingBox: () => {},
    },
  };

  const getStateContext = context => context[STATE_CONTEXT];
  const getGoogleMapsContext = context => context[GOOGLE_MAPS_CONTEXT];

  it('expect to render correctly', () => {
    const props = {
      ...defaultProps,
    };

    const context = {
      ...defaultContext,
    };

    const wrapper = shallow(<Redo {...props} />, {
      context,
    });

    expect(wrapper.find('button').prop('disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render correctly when map has moved', () => {
    const props = {
      ...defaultProps,
    };

    const context = {
      ...defaultContext,
      [STATE_CONTEXT]: {
        ...getStateContext(defaultContext),
        hasMapMoveSinceLastRefine: true,
      },
    };

    const wrapper = shallow(<Redo {...props} />, {
      context,
    });

    expect(wrapper.find('button').prop('disabled')).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('expect to disable refine on map move onDidMount', () => {
    const props = {
      ...defaultProps,
    };

    const context = {
      ...defaultContext,
      [STATE_CONTEXT]: {
        ...getStateContext(defaultContext),
        toggleRefineOnMapMove: jest.fn(),
      },
    };

    const wrapper = shallow(<Redo {...props} />, {
      disableLifecycleMethods: true,
      context,
    });

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(0);

    wrapper.instance().componentDidMount();

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(1);
  });

  it('expect to only disable refine on map move when value is true onDidMount', () => {
    const props = {
      ...defaultProps,
    };

    const context = {
      ...defaultContext,
      [STATE_CONTEXT]: {
        ...getStateContext(defaultContext),
        isRefineOnMapMove: false,
        toggleRefineOnMapMove: jest.fn(),
      },
    };

    const wrapper = shallow(<Redo {...props} />, {
      disableLifecycleMethods: true,
      context,
    });

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(0);

    wrapper.instance().componentDidMount();

    expect(
      getStateContext(context).toggleRefineOnMapMove
    ).toHaveBeenCalledTimes(0);
  });

  it('expect to call refineWithBoundingBox on button click', () => {
    const props = {
      ...defaultProps,
    };

    const context = {
      ...defaultContext,
      [GOOGLE_MAPS_CONTEXT]: {
        ...getGoogleMapsContext(defaultContext),
        refineWithBoundingBox: jest.fn(),
      },
    };

    const wrapper = shallow(<Redo {...props} />, {
      context,
    });

    wrapper.find('button').simulate('click');

    expect(
      getGoogleMapsContext(context).refineWithBoundingBox
    ).toHaveBeenCalledTimes(1);
  });
});
