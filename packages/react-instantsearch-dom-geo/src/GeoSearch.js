import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @TODO: Update this import when the package is correctly split:
// import { createClassNames } from 'react-instantsearch-dom';
import createClassNames from '../../react-instantsearch/src/components/createClassNames';
import { LatLngPropType } from './propTypes';
import Provider from './Provider';
import GoogleMaps from './GoogleMaps';

const cx = createClassNames('GeoSearch');

class GeoSearch extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    initialZoom: PropTypes.number,
    initialPosition: LatLngPropType,
    mapOptions: PropTypes.object,
  };

  static defaultProps = {
    initialZoom: 1,
    initialPosition: {
      lat: 0,
      lng: 0,
    },
    mapOptions: {},
  };

  createBoundingBoxFromHits(hits) {
    const { google } = this.props;

    const latLngBounds = hits.reduce(
      (acc, hit) => acc.extend(hit._geoloc),
      new google.maps.LatLngBounds()
    );

    return {
      northEast: latLngBounds.getNorthEast().toJSON(),
      southWest: latLngBounds.getSouthWest().toJSON(),
    };
  }

  renderProviderChildren = ({ hits, currentRefinement, position }) => {
    const {
      google,
      initialZoom,
      initialPosition,
      mapOptions,
      children,
    } = this.props;

    const boundingBox =
      !currentRefinement && Boolean(hits.length)
        ? this.createBoundingBoxFromHits(hits)
        : currentRefinement;

    return (
      <GoogleMaps
        testID="GoogleMaps"
        cx={cx}
        google={google}
        initialZoom={initialZoom}
        initialPosition={initialPosition}
        mapOptions={mapOptions}
        boundingBox={boundingBox}
        position={position}
      >
        {children({ hits })}
      </GoogleMaps>
    );
  };

  render() {
    return <Provider testID="Provider">{this.renderProviderChildren}</Provider>;
  }
}

export default GeoSearch;
