import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createFakeGoogleReference,
  createFakeMapInstance,
  createFakeHTMLMarkerInstance,
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

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

      shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

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
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
        className: 'my-marker',
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

  describe('with portal', () => {
    it('expect to render correctly', () => {
      const unstableRenderSubtreeIntoContainer = jest.spyOn(
        ReactDOM,
        'unstable_renderSubtreeIntoContainer'
      );

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

      // Use `mount` instead of `shallow` to trigger the render
      // of createPortal otherwise the Snapshot is empty
      const wrapper = mount(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      expect(wrapper).toMatchSnapshot();

      expect(unstableRenderSubtreeIntoContainer).not.toHaveBeenCalled();

      unstableRenderSubtreeIntoContainer.mockReset();
      unstableRenderSubtreeIntoContainer.mockRestore();
    });

    it('expect to render correctly without a marker', () => {
      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

    it('expect to not render on didUpdate', () => {
      const unstableRenderSubtreeIntoContainer = jest.spyOn(
        ReactDOM,
        'unstable_renderSubtreeIntoContainer'
      );

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

      // Use `mount` instead of `shallow` to trigger didUpdate
      const wrapper = mount(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      expect(unstableRenderSubtreeIntoContainer).not.toHaveBeenCalled();

      wrapper.instance().componentDidUpdate();

      expect(unstableRenderSubtreeIntoContainer).not.toHaveBeenCalled();

      unstableRenderSubtreeIntoContainer.mockReset();
      unstableRenderSubtreeIntoContainer.mockRestore();
    });

    it('expect to not call unmountComponentAtNode on willUnmount', () => {
      const unmountComponentAtNode = jest.spyOn(
        ReactDOM,
        'unmountComponentAtNode'
      );

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

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

      expect(unmountComponentAtNode).not.toHaveBeenCalled();

      unmountComponentAtNode.mockReset();
      unmountComponentAtNode.mockRestore();
    });
  });

  describe('with unstable_renderSubtreeIntoContainer', () => {
    it('expect to render correctly', () => {
      const unstableRenderSubtreeIntoContainer = jest.spyOn(
        ReactDOM,
        'unstable_renderSubtreeIntoContainer'
      );

      const isReact16 = jest
        .spyOn(HTMLMarker, 'isReact16')
        .mockImplementation(() => false);

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
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      expect(wrapper).toMatchSnapshot();

      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledTimes(1);
      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledWith(
        wrapper.instance(),
        <span>This is the children.</span>,
        marker.element
      );

      unstableRenderSubtreeIntoContainer.mockReset();
      unstableRenderSubtreeIntoContainer.mockRestore();

      isReact16.mockReset();
      isReact16.mockRestore();
    });

    it('expect to render correctly without a marker', () => {
      const isReact16 = jest
        .spyOn(HTMLMarker, 'isReact16')
        .mockImplementation(() => false);

      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

      isReact16.mockReset();
      isReact16.mockRestore();
    });

    it('expect to render on didUpdate', () => {
      const unstableRenderSubtreeIntoContainer = jest.spyOn(
        ReactDOM,
        'unstable_renderSubtreeIntoContainer'
      );

      const isReact16 = jest
        .spyOn(HTMLMarker, 'isReact16')
        .mockImplementation(() => false);

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

      // Use `mount` instead of `shallow` to trigger didUpdate
      const wrapper = mount(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
        {
          context: {
            [GOOGLE_MAPS_CONTEXT]: {
              instance: mapInstance,
              google,
            },
          },
        }
      );

      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledTimes(1);
      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledWith(
        wrapper.instance(),
        <span>This is the children.</span>,
        marker.element
      );

      wrapper.instance().componentDidUpdate();

      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledTimes(2);
      expect(unstableRenderSubtreeIntoContainer).toHaveBeenCalledWith(
        wrapper.instance(),
        <span>This is the children.</span>,
        marker.element
      );

      unstableRenderSubtreeIntoContainer.mockReset();
      unstableRenderSubtreeIntoContainer.mockRestore();

      isReact16.mockReset();
      isReact16.mockRestore();
    });

    it('expect to not render on didUpdate without marker', () => {
      const unstableRenderSubtreeIntoContainer = jest.spyOn(
        ReactDOM,
        'unstable_renderSubtreeIntoContainer'
      );

      const isReact16 = jest
        .spyOn(HTMLMarker, 'isReact16')
        .mockImplementation(() => false);

      const mapInstance = createFakeMapInstance();
      const google = createFakeGoogleReference({
        mapInstance,
      });

      const props = {
        ...defaultProps,
      };

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

      expect(unstableRenderSubtreeIntoContainer).not.toHaveBeenCalled();

      wrapper.instance().componentDidUpdate();

      expect(unstableRenderSubtreeIntoContainer).not.toHaveBeenCalled();

      unstableRenderSubtreeIntoContainer.mockReset();
      unstableRenderSubtreeIntoContainer.mockRestore();

      isReact16.mockReset();
      isReact16.mockRestore();
    });

    it('expect to call unmountComponentAtNode on willUnmount', () => {
      const unmountComponentAtNode = jest.spyOn(
        ReactDOM,
        'unmountComponentAtNode'
      );

      const isReact16 = jest
        .spyOn(HTMLMarker, 'isReact16')
        .mockImplementation(() => false);

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

      const wrapper = shallow(
        <HTMLMarker {...props}>
          <span>This is the children.</span>
        </HTMLMarker>,
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

      expect(unmountComponentAtNode).toHaveBeenCalledTimes(1);
      expect(unmountComponentAtNode).toHaveBeenCalledWith(marker.element);

      unmountComponentAtNode.mockReset();
      unmountComponentAtNode.mockRestore();

      isReact16.mockReset();
      isReact16.mockRestore();
    });
  });
});
