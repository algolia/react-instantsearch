import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createFakeGoogleReference,
  createFakeMapInstance,
} from '../../test/mockGoogleMaps';
import GoogleMaps, { GOOGLE_MAPS_CONTEXT } from '../GoogleMaps';

Enzyme.configure({ adapter: new Adapter() });

describe('GoogleMaps', () => {
  const defaultProps = {
    google: createFakeGoogleReference(),
    initialZoom: 1,
    initialPosition: {
      lat: 0,
      lng: 0,
    },
    mapOptions: {},
    refine: () => {},
    position: null,
    boundingBox: null,
    cx: x => `geo ${x}`.trim(),
  };

  const simulateMapReadyEvent = google => {
    google.maps.event.addListenerOnce.mock.calls[0][2]();
  };

  const simulateEvent = (fn, eventName, event) => {
    fn.addListener.mock.calls.find(call => call.includes(eventName))[1](event);
  };

  it('expect render correctly without the map rendered', () => {
    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(
      <GoogleMaps {...props}>
        <div>This is the children</div>
      </GoogleMaps>,
      {
        disableLifecycleMethods: true,
      }
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state()).toEqual({
      isMapReady: false,
    });
  });

  it('expect render correctly with the map rendered', () => {
    const google = createFakeGoogleReference();

    const props = {
      ...defaultProps,
      google,
    };

    const wrapper = shallow(
      <GoogleMaps {...props}>
        <div>This is the children</div>
      </GoogleMaps>,
      {
        disableLifecycleMethods: true,
      }
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state()).toEqual({
      isMapReady: false,
    });

    // Simulate didMount
    wrapper.instance().componentDidMount();

    simulateMapReadyEvent(google);

    // Trigger the update
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state()).toEqual({
      isMapReady: true,
    });
  });

  describe('creation', () => {
    it('expect to create the GoogleMaps on didMount with the default options', () => {
      const google = createFakeGoogleReference();

      const props = {
        ...defaultProps,
        google,
      };

      mount(<GoogleMaps {...props} />);

      expect(google.maps.Map).toHaveBeenCalledTimes(1);
      expect(google.maps.Map).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        zoomControlOptions: {
          position: 'left:top',
        },
      });
    });

    it('expect to create the GoogleMaps on didMount witht the given options', () => {
      const google = createFakeGoogleReference();

      const props = {
        ...defaultProps,
        mapOptions: {
          streetViewControl: true,
          otherOptionToPass: false,
        },
        google,
      };

      mount(<GoogleMaps {...props} />);

      expect(google.maps.Map).toHaveBeenCalledTimes(1);
      expect(google.maps.Map).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: true,
        clickableIcons: false,
        otherOptionToPass: false,
        zoomControlOptions: {
          position: 'left:top',
        },
      });
    });

    it('expect to listen "idle" event once to setup the rest of the listeners', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      expect(google.maps.event.addListenerOnce).toHaveBeenCalledTimes(1);
      expect(google.maps.event.addListenerOnce).toHaveBeenCalledWith(
        mapInstance,
        'idle',
        expect.any(Function)
      );

      expect(wrapper.instance().listeners).toHaveLength(1);
    });

    it('expect to setup the rest of the listener when the map is ready', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      simulateMapReadyEvent(google);

      expect(mapInstance.addListener).toHaveBeenCalledWith(
        'center_changed',
        expect.any(Function)
      );

      expect(mapInstance.addListener).toHaveBeenCalledWith(
        'zoom_changed',
        expect.any(Function)
      );

      expect(mapInstance.addListener).toHaveBeenCalledWith(
        'dragstart',
        expect.any(Function)
      );

      expect(mapInstance.addListener).toHaveBeenCalledWith(
        'idle',
        expect.any(Function)
      );

      expect(wrapper.instance().listeners).toHaveLength(4);
    });
  });

  describe('events', () => {
    it('expect to trigger refine on "idle"', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      mapInstance.getBounds.mockImplementation(() => ({
        getNorthEast: () => ({
          toJSON: () => ({
            lat: 10,
            lng: 12,
          }),
        }),
        getSouthWest: () => ({
          toJSON: () => ({
            lat: 12,
            lng: 14,
          }),
        }),
      }));

      const props = {
        ...defaultProps,
        google,
        refine: jest.fn(),
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      simulateMapReadyEvent(google);

      simulateEvent(mapInstance, 'center_changed');
      simulateEvent(mapInstance, 'idle');

      expect(wrapper.instance().isPendingRefine).toBe(false);
      expect(props.refine).toHaveBeenCalledTimes(1);
      expect(props.refine).toHaveBeenCalledWith({
        northEast: {
          lat: 10,
          lng: 12,
        },
        southWest: {
          lat: 12,
          lng: 14,
        },
      });
    });

    it('expect to not trigger refine on "idle" when refine is not schedule', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
        refine: jest.fn(),
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      simulateMapReadyEvent(google);

      simulateEvent(mapInstance, 'idle');

      expect(wrapper.instance().isPendingRefine).toBe(false);
      expect(props.refine).toHaveBeenCalledTimes(0);
    });

    it('expect to not trigger refine on "idle" on programmatic interaction', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
        refine: jest.fn(),
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      simulateMapReadyEvent(google);

      simulateEvent(mapInstance, 'center_changed');

      // Simulate fitBounds
      wrapper.instance().isUserInteraction = false;

      simulateEvent(mapInstance, 'idle');

      expect(wrapper.instance().isPendingRefine).toBe(true);
      expect(props.refine).toHaveBeenCalledTimes(0);
    });

    ['center_changed', 'zoom_changed', 'dragstart'].forEach(eventName => {
      it(`expect to schedule refine on "${eventName}"`, () => {
        const mapInstance = createFakeMapInstance();
        const google = createFakeGoogleReference({
          mapInstance,
        });

        const props = {
          ...defaultProps,
          google,
        };

        const wrapper = shallow(<GoogleMaps {...props} />);

        simulateMapReadyEvent(google);

        expect(wrapper.instance().isPendingRefine).toBe(false);

        simulateEvent(mapInstance, eventName);

        expect(wrapper.instance().isPendingRefine).toBe(true);
      });

      it(`expect to not schedule refine on "${eventName}" on programmatic interaction`, () => {
        const mapInstance = createFakeMapInstance();
        const google = createFakeGoogleReference({
          mapInstance,
        });

        const props = {
          ...defaultProps,
          google,
        };

        const wrapper = shallow(<GoogleMaps {...props} />);

        simulateMapReadyEvent(google);

        expect(wrapper.instance().isPendingRefine).toBe(false);

        // Simulate fitBounds
        wrapper.instance().isUserInteraction = false;

        simulateEvent(mapInstance, eventName);

        expect(wrapper.instance().isPendingRefine).toBe(false);
      });
    });
  });

  describe('context', () => {
    it('expect to expose the google object through context', () => {
      const google = createFakeGoogleReference();

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(<GoogleMaps {...props} />, {
        disableLifecycleMethods: true,
      });

      expect(wrapper.instance().getChildContext()).toEqual({
        [GOOGLE_MAPS_CONTEXT]: expect.objectContaining({
          google,
        }),
      });
    });

    it('expect to expose the map instance through context only when created', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(<GoogleMaps {...props} />, {
        disableLifecycleMethods: true,
      });

      expect(wrapper.instance().getChildContext()).toEqual({
        [GOOGLE_MAPS_CONTEXT]: expect.objectContaining({
          instance: undefined,
        }),
      });

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(wrapper.instance().getChildContext()).toEqual({
        [GOOGLE_MAPS_CONTEXT]: expect.objectContaining({
          instance: mapInstance,
        }),
      });
    });
  });

  describe('update', () => {
    it('expect to call fitBounds on didUpdate when boundingBox is provided', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      google.maps.LatLngBounds.mockImplementation((sw, ne) => ({
        northEast: ne,
        southWest: sw,
      }));

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(
        <GoogleMaps {...props}>
          <div>This is the children</div>
        </GoogleMaps>
      );

      simulateMapReadyEvent(google);

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);

      wrapper.setProps({
        boundingBox: {
          northEast: {
            lat: 10,
            lng: 10,
          },
          southWest: {
            lat: 14,
            lng: 14,
          },
        },
      });

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(1);
      expect(mapInstance.fitBounds).toHaveBeenCalledWith(
        {
          northEast: {
            lat: 10,
            lng: 10,
          },
          southWest: {
            lat: 14,
            lng: 14,
          },
        },
        0
      );

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);
    });

    it('expect to call setCenter & setZoom when boundingBox is not provided', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      google.maps.LatLngBounds.mockImplementation((sw, ne) => ({
        northEast: ne,
        southWest: sw,
      }));

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(
        <GoogleMaps {...props}>
          <div>This is the children</div>
        </GoogleMaps>
      );

      simulateMapReadyEvent(google);

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);

      wrapper.setProps();

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledWith(1);
      expect(mapInstance.setCenter).toHaveBeenCalledWith({
        lat: 0,
        lng: 0,
      });
    });

    it('expect to prevent the update when the map is not ready', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(
        <GoogleMaps {...props}>
          <div>This is the children</div>
        </GoogleMaps>
      );

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);

      wrapper.setProps();

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);
    });

    it('expect to prevent the update when there is a pending refinement', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(
        <GoogleMaps {...props}>
          <div>This is the children</div>
        </GoogleMaps>
      );

      simulateMapReadyEvent(google);
      simulateEvent(mapInstance, 'center_changed');

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);

      wrapper.setProps();

      expect(mapInstance.fitBounds).toHaveBeenCalledTimes(0);

      expect(mapInstance.setZoom).toHaveBeenCalledTimes(0);
      expect(mapInstance.setCenter).toHaveBeenCalledTimes(0);
    });
  });

  describe('delete', () => {
    it('expect to remove all the listeners', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        google,
      };

      const wrapper = shallow(<GoogleMaps {...props} />);

      simulateMapReadyEvent(google);

      expect(wrapper.instance().listeners).toHaveLength(4);

      const internalListeners = wrapper.instance().listeners.slice();

      wrapper.unmount();

      internalListeners.forEach(listener => {
        expect(listener.remove).toHaveBeenCalledTimes(1);
      });
    });
  });
});
