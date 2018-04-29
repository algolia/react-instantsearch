import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType } from './propTypes';
import Provider from './Provider';
import GoogleMaps from './GoogleMaps';

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

  renderProviderChildren = ({
    hits,
    currentRefinement,
    position,
    isRefineOnMapMove,
    hasMapMoveSinceLastRefine,
    refine,
    setMapMoveSinceLastRefine,
  }) => {
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
        google={google}
        initialZoom={initialZoom}
        initialPosition={initialPosition}
        mapOptions={mapOptions}
        isRefineOnMapMove={isRefineOnMapMove}
        hasMapMoveSinceLastRefine={hasMapMoveSinceLastRefine}
        boundingBox={boundingBox}
        position={position}
        refine={refine}
        setMapMoveSinceLastRefine={setMapMoveSinceLastRefine}
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
