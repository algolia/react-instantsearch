/* eslint-disable import/no-extraneous-dependencies */
/* global google */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

class GeoSearch extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRefinedWithMap: PropTypes.bool.isRequired,
    isRefineOnMapMove: PropTypes.bool.isRequired,
    hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    toggleRefineOnMapMove: PropTypes.func.isRequired,
    setMapMoveSinceLastRefine: PropTypes.func.isRequired,
  };

  isMapAlreadyLoaded = false;
  isPendingRefine = false;
  isUserInteraction = true;

  componentDidMount() {
    this.fitViewToBounds();
  }

  componentDidUpdate() {
    this.fitViewToBounds();
  }

  onChange = () => {
    const { setMapMoveSinceLastRefine } = this.props;

    if (this.isMapAlreadyLoaded && this.isUserInteraction) {
      this.isPendingRefine = true;
      setMapMoveSinceLastRefine();
    }
  };

  onIdle = () => {
    const { isRefineOnMapMove } = this.props;

    this.isMapAlreadyLoaded = true;

    if (this.isUserInteraction && this.isPendingRefine && isRefineOnMapMove) {
      this.refineWithMap();

      this.isPendingRefine = false;
    }
  };

  fitViewToBounds() {
    const { items, hasMapMoveSinceLastRefine, isRefinedWithMap } = this.props;

    if (!hasMapMoveSinceLastRefine && !isRefinedWithMap) {
      this.isUserInteraction = false;
      this.mapElement.fitBounds(
        items.reduce(
          (acc, item) =>
            acc.extend({ lat: item._geoloc.lat, lng: item._geoloc.lng }),
          new google.maps.LatLngBounds()
        )
      );
      this.isUserInteraction = true;
    }
  }

  refineWithMap = () => {
    const { refine } = this.props;

    const ne = this.mapElement.getBounds().getNorthEast();
    const sw = this.mapElement.getBounds().getSouthWest();

    refine({
      reset: false,
      bounds: {
        northEast: { lat: ne.lat(), lng: ne.lng() },
        southWest: { lat: sw.lat(), lng: sw.lng() },
      },
    });
  };

  clearMapRefinement = () => {
    const { refine } = this.props;

    refine({
      reset: true,
    });
  };

  render() {
    const {
      items,
      isRefineOnMapMove,
      isRefinedWithMap,
      hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove,
    } = this.props;

    return (
      <div>
        <GoogleMap
          ref={c => (this.mapElement = c)}
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            clickableIcons: false,
            zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP,
            },
          }}
          onDragStart={this.onChange}
          onCenterChanged={this.onChange}
          onZoomChanged={this.onChange}
          onIdle={this.onIdle}
        >
          {items.map(item => (
            <Marker key={item.objectID} position={item._geoloc} />
          ))}
        </GoogleMap>

        {isRefineOnMapMove || !hasMapMoveSinceLastRefine ? (
          <label>
            <input
              type="checkbox"
              checked={isRefineOnMapMove}
              onChange={toggleRefineOnMapMove}
            />
            Search as I move the map
          </label>
        ) : (
          <button onClick={this.refineWithMap}>Redo search here</button>
        )}

        {isRefinedWithMap && (
          <button onClick={this.clearMapRefinement}>
            Clear map refinement
          </button>
        )}
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(GeoSearch));
