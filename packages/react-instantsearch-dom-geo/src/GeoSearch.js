import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @TODO: Update this import when the package is correctly split:
// import { createClassNames } from 'react-instantsearch-dom';
import createClassNames from '../../react-instantsearch/src/components/createClassNames';
import Provider from './Provider';
import GoogleMaps from './GoogleMaps';

const cx = createClassNames('GeoSearch');

const LatLngPropType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

class GeoSearch extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    initialZoom: PropTypes.number,
    initialPosition: LatLngPropType,
  };

  static defaultProps = {
    initialZoom: 1,
    initialPosition: {
      lat: 0,
      lng: 0,
    },
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
    const { google, initialZoom, initialPosition, children } = this.props;

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
