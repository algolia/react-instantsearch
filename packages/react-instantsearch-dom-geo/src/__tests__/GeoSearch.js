import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createFakeGoogleReference } from '../../test/fakeGoogleMaps';
import GeoSearch from '../GeoSearch';

Enzyme.configure({ adapter: new Adapter() });

describe('GeoSearch', () => {
  const ShallowWapper = ({ children }) => children;

  const defaultProps = {
    google: createFakeGoogleReference(),
  };

  const defaultRenderProvidedProps = {
    hits: [],
  };

  const renderProps = ({ props, renderProvidedProps, children = () => null }) =>
    shallow(<GeoSearch {...props}>{children}</GeoSearch>)
      .find('[testID="Provider"]')
      .props()
      .children(renderProvidedProps);

  it('expect to render', () => {
    const children = jest.fn(() => <div>Hello this is the children</div>);

    const props = {
      ...defaultProps,
    };

    const renderProvidedProps = {
      ...defaultRenderProvidedProps,
    };

    const renderPropsWrapper = shallow(
      <ShallowWapper>
        {renderProps({ props, renderProvidedProps, children })}
      </ShallowWapper>
    );

    expect(renderPropsWrapper).toMatchSnapshot();
    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({
      hits: [],
    });
  });

  it('expect to render with initialZoom & initialPosition', () => {
    const props = {
      ...defaultProps,
      initialZoom: 8,
      initialPosition: {
        lat: 10,
        lng: 12,
      },
    };

    const renderProvidedProps = {
      ...defaultRenderProvidedProps,
    };

    const renderPropsWrapper = shallow(
      <ShallowWapper>
        {renderProps({ props, renderProvidedProps })}
      </ShallowWapper>
    );

    const googleMapProps = renderPropsWrapper
      .find('[testID="GoogleMaps"]')
      .props();

    expect(googleMapProps.initialZoom).toBe(8);
    expect(googleMapProps.initialPosition).toEqual({
      lat: 10,
      lng: 12,
    });
  });

  it('expect to render with position', () => {
    const props = {
      ...defaultProps,
    };

    const renderProvidedProps = {
      ...defaultRenderProvidedProps,
      position: {
        lat: 10,
        lng: 12,
      },
    };

    const renderPropsWrapper = shallow(
      <ShallowWapper>
        {renderProps({ props, renderProvidedProps })}
      </ShallowWapper>
    );

    const googleMapProps = renderPropsWrapper
      .find('[testID="GoogleMaps"]')
      .props();

    expect(googleMapProps.position).toEqual({
      lat: 10,
      lng: 12,
    });
  });

  describe('boundingBox', () => {
    it('expect to use hits when currentRefinement is not defined and hits are not empty', () => {
      const google = createFakeGoogleReference();

      google.maps.LatLngBounds.mockImplementation(() => ({
        extend: jest.fn().mockReturnThis(),
        getNorthEast: () => ({
          toJSON: () => ({
            lat: 10,
            lng: 10,
          }),
        }),
        getSouthWest: () => ({
          toJSON: () => ({
            lat: 14,
            lng: 14,
          }),
        }),
      }));

      const props = {
        ...defaultProps,
        google,
      };

      const renderProvidedProps = {
        ...defaultRenderProvidedProps,
        hits: [
          { _geoloc: { lat: 10, lng: 12 } },
          { _geoloc: { lat: 12, lng: 14 } },
        ],
      };

      const renderPropsWrapper = shallow(
        <ShallowWapper>
          {renderProps({ props, renderProvidedProps })}
        </ShallowWapper>
      );

      const googleMapProps = renderPropsWrapper
        .find('[testID="GoogleMaps"]')
        .props();

      expect(googleMapProps.boundingBox).toEqual({
        northEast: {
          lat: 10,
          lng: 10,
        },
        southWest: {
          lat: 14,
          lng: 14,
        },
      });
    });

    it("expect to use currentRefinement when it's defined and hits are empty", () => {
      const props = {
        ...defaultProps,
      };

      const renderProvidedProps = {
        ...defaultRenderProvidedProps,
        currentRefinement: {
          northEast: {
            lat: 10,
            lng: 12,
          },
          southWest: {
            lat: 12,
            lng: 14,
          },
        },
      };

      const renderPropsWrapper = shallow(
        <ShallowWapper>
          {renderProps({ props, renderProvidedProps })}
        </ShallowWapper>
      );

      const googleMapProps = renderPropsWrapper
        .find('[testID="GoogleMaps"]')
        .props();

      expect(googleMapProps.boundingBox).toEqual({
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

    it("expect to use currentRefinement when it's defined and hits are not empty", () => {
      const props = {
        ...defaultProps,
      };

      const renderProvidedProps = {
        ...defaultRenderProvidedProps,
        hits: [
          { _geoloc: { lat: 10, lng: 12 } },
          { _geoloc: { lat: 12, lng: 14 } },
        ],
        currentRefinement: {
          northEast: {
            lat: 10,
            lng: 12,
          },
          southWest: {
            lat: 12,
            lng: 14,
          },
        },
      };

      const renderPropsWrapper = shallow(
        <ShallowWapper>
          {renderProps({ props, renderProvidedProps })}
        </ShallowWapper>
      );

      const googleMapProps = renderPropsWrapper
        .find('[testID="GoogleMaps"]')
        .props();

      expect(googleMapProps.boundingBox).toEqual({
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

    it("expect to use currentRefinement when it's not defined and hits are empty", () => {
      const props = {
        ...defaultProps,
      };

      const renderProvidedProps = {
        ...defaultRenderProvidedProps,
      };

      const renderPropsWrapper = shallow(
        <ShallowWapper>
          {renderProps({ props, renderProvidedProps })}
        </ShallowWapper>
      );

      const googleMapProps = renderPropsWrapper
        .find('[testID="GoogleMaps"]')
        .props();

      expect(googleMapProps.boundingBox).toBe(undefined);
    });
  });
});
