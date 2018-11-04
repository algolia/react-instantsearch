import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createFakeGoogleReference,
  createFakeMapInstance,
  createFakeHeatmapLayerInstance,
} from '../../test/mockGoogleMaps';
import { GOOGLE_MAPS_CONTEXT } from '../GoogleMaps';
import HeatmapLayer from '../HeatmapLayer';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../utils', () => {
  const module = require.requireActual('../utils');

  return {
    createFilterProps: module.createFilterProps,
    createListenersPropTypes: module.createListenersPropTypes,
  };
});

describe('HeatmapLayer', () => {
  const defaultProps = {
    hits: [
      {
        _geoloc: {
          lat: 10,
          lng: 12,
        },
      },
    ],
  };

  it('expect render correctly', () => {
    const mapInstance = createFakeMapInstance();
    const google = createFakeGoogleReference({
      mapInstance,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(<HeatmapLayer {...props} />, {
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
    it('expect to create the HeatmapLayer on didMount with default options', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<HeatmapLayer {...props} />, {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(google.maps.visualization.HeatmapLayer).not.toHaveBeenCalled();

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(google.maps.visualization.HeatmapLayer).toHaveBeenCalledTimes(1);
      expect(google.maps.visualization.HeatmapLayer).toHaveBeenCalledWith({
        map: mapInstance,
        data: [new google.maps.LatLng(10, 12)],
      });
    });

    it('expect to create the HeatmapLayer on didMount with given options', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<HeatmapLayer {...props} />, {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(google.maps.visualization.HeatmapLayer).not.toHaveBeenCalled();

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(google.maps.visualization.HeatmapLayer).toHaveBeenCalledTimes(1);
      expect(google.maps.visualization.HeatmapLayer).toHaveBeenCalledWith({
        map: mapInstance,
        data: [new google.maps.LatLng(10, 12)],
      });
    });
  });

  describe('delete', () => {
    it('expect to remove the HeatmapLayer on willUnmount', () => {
      const mapInstance = createFakeMapInstance();
      const heatmapLayerInstance = createFakeHeatmapLayerInstance();
      const google = createFakeGoogleReference({
        mapInstance,
        heatmapLayerInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(<HeatmapLayer {...props} />, {
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      wrapper.unmount();

      expect(heatmapLayerInstance.setMap).toHaveBeenCalledTimes(1);
      expect(heatmapLayerInstance.setMap).toHaveBeenCalledWith(null);
    });
  });
});
