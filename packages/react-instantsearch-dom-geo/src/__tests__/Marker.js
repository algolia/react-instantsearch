import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createFakeGoogleReference,
  createFakeMapInstance,
  createFakeMarkerInstance,
} from '../../test/mockGoogleMaps';
import { GOOGLE_MAPS_CONTEXT } from '../GoogleMaps';
import Marker from '../Marker';

Enzyme.configure({ adapter: new Adapter() });

describe('Marker', () => {
  const defaultProps = {
    hit: {
      _geoloc: {
        lat: 10,
        lng: 12,
      },
    },
  };

  it('expect render correctly', () => {
    const mapInstance = createFakeMapInstance();
    const google = createFakeGoogleReference({
      mapInstance,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(<Marker {...props} />, {
      context: {
        [GOOGLE_MAPS_CONTEXT]: {
          instance: mapInstance,
          google,
        },
      },
    });

    expect(wrapper.type()).toBe(null);
  });

  describe('creation', () => {
    it('expect to create the Marker on didMount with default options', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<Marker {...props} />, {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(google.maps.Marker).not.toHaveBeenCalled();

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(google.maps.Marker).toHaveBeenCalledTimes(1);
      expect(google.maps.Marker).toHaveBeenCalledWith({
        map: mapInstance,
        position: {
          lat: 10,
          lng: 12,
        },
      });
    });

    it('expect to create the Marker on didMount with given options', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        options: {
          title: 'My Marker',
        },
      };

      const wrapper = shallow(<Marker {...props} />, {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(google.maps.Marker).not.toHaveBeenCalled();

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(google.maps.Marker).toHaveBeenCalledTimes(1);
      expect(google.maps.Marker).toHaveBeenCalledWith({
        title: 'My Marker',
        map: mapInstance,
        position: {
          lat: 10,
          lng: 12,
        },
      });
    });
  });

  describe('delete', () => {
    it('expect to remove the Marker on willUnmount', () => {
      const mapInstance = createFakeMapInstance();
      const markerInstance = createFakeMarkerInstance();
      const google = createFakeGoogleReference({
        mapInstance,
        markerInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<Marker {...props} />, {
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      wrapper.unmount();

      expect(markerInstance.setMap).toHaveBeenCalledTimes(1);
      expect(markerInstance.setMap).toHaveBeenCalledWith(null);
    });

    it("expect to remove the Marker on willUnmount only when it's created", () => {
      const mapInstance = createFakeMapInstance();
      const markerInstance = createFakeMarkerInstance();
      const google = createFakeGoogleReference({
        mapInstance,
        markerInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<Marker {...props} />, {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(() => wrapper.unmount()).not.toThrow();
      expect(markerInstance.setMap).not.toHaveBeenCalled();
    });
  });
});
