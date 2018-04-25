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
    position: null,
    boundingBox: null,
    cx: x => `geo ${x}`.trim(),
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
      isMapAlreadyRender: false,
    });
  });

  it('expect render correctly with the map rendered', () => {
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
      isMapAlreadyRender: false,
    });

    // Simulate didMount
    wrapper.instance().componentDidMount();

    // Trigger the update
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state()).toEqual({
      isMapAlreadyRender: true,
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
      expect(mapInstance.fitBounds).toHaveBeenCalledWith({
        northEast: {
          lat: 10,
          lng: 10,
        },
        southWest: {
          lat: 14,
          lng: 14,
        },
      });

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
  });
});
