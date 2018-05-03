import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createFakeGoogleReference,
  createFakeMapInstance,
} from '../../test/mockGoogleMaps';
import createHTMLMarker from '../utils/createHTMLMarker';
import { GOOGLE_MAPS_CONTEXT } from '../GoogleMaps';
import HTMLMarker from '../HTMLMarker';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../utils/createHTMLMarker', () => jest.fn());

describe('HTMLMarker', () => {
  const defaultProps = {
    hit: {
      _geoloc: {
        lat: 10,
        lng: 12,
      },
    },
  };

  const createFakeHTMLMarkerInstance = () => ({
    element: document.createElement('div'),
    setMap: jest.fn(),
  });

  it('expect to render correctly', () => {
    const mapInstance = createFakeMapInstance();
    const google = createFakeGoogleReference({
      mapInstance,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(
      <HTMLMarker {...props}>This is the children.</HTMLMarker>,
      {
        disableLifecycleMethods: true,
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      }
    );

    expect(wrapper.type()).toBe(null);
  });

  describe('creation', () => {
    it('expect to create the marker on didMount with default options', () => {
      const marker = createFakeHTMLMarkerInstance();
      const factory = jest.fn(() => marker);
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      createHTMLMarker.mockImplementationOnce(() => factory);

      const props = {
        ...defaultProps,
      };

      const wrapper = mount(
        <HTMLMarker {...props}>This is the children.</HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      expect(createHTMLMarker).toHaveBeenCalledWith(google);
      expect(wrapper.state('marker')).toBe(marker);

      expect(wrapper).toMatchSnapshot();

      expect(factory).toHaveBeenCalledTimes(1);
      expect(factory).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mapInstance,
          position: {
            lat: 10,
            lng: 12,
          },
        })
      );
    });

    it('expect to create the marker on didMount with given options', () => {
      const marker = createFakeHTMLMarkerInstance();
      const factory = jest.fn(() => marker);
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      createHTMLMarker.mockImplementationOnce(() => factory);

      const props = {
        ...defaultProps,
        options: {
          className: 'my-marker',
          anchor: {
            x: 10,
            y: 10,
          },
        },
      };

      shallow(<HTMLMarker {...props}>This is the children.</HTMLMarker>, {
        context: {
          [GOOGLE_MAPS_CONTEXT]: {
            instance: mapInstance,
            google,
          },
        },
      });

      expect(factory).toHaveBeenCalledWith(
        expect.objectContaining({
          className: 'my-marker',
          anchor: {
            x: 10,
            y: 10,
          },
        })
      );
    });
  });

  describe('delete', () => {
    it('expect to remove the Marker on willUnmount', () => {
      const marker = createFakeHTMLMarkerInstance();
      const factory = jest.fn(() => marker);
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      createHTMLMarker.mockImplementationOnce(() => factory);

      const props = {
        ...defaultProps,
        className: 'my-marker',
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>This is the children.</HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      wrapper.unmount();

      expect(marker.setMap).toHaveBeenCalledTimes(1);
      expect(marker.setMap).toHaveBeenCalledWith(null);
    });

    it("expect to remove the Marker on willUnmount only when it's created", () => {
      const marker = createFakeHTMLMarkerInstance();
      const factory = jest.fn(() => marker);
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      createHTMLMarker.mockImplementationOnce(() => factory);

      const props = {
        ...defaultProps,
        className: 'my-marker',
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>This is the children.</HTMLMarker>,
        {
          disableLifecycleMethods: true,
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      wrapper.unmount();

      expect(() => wrapper.unmount()).not.toThrow();
      expect(marker.setMap).not.toHaveBeenCalled();
    });
  });
});
