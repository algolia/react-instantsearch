import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const GOOGLE_MAPS_CONTEXT = '__ais_geo_search__google_maps__';

const LatLngPropType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

class GoogleMaps extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    google: PropTypes.object.isRequired,
    initialZoom: PropTypes.number.isRequired,
    initialPosition: LatLngPropType.isRequired,
    mapOptions: PropTypes.object.isRequired,
    position: LatLngPropType,
    boundingBox: PropTypes.shape({
      northEast: LatLngPropType.isRequired,
      southWest: LatLngPropType.isRequired,
    }),
    children: PropTypes.node,
  };

  static childContextTypes = {
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      google: PropTypes.object,
      instance: PropTypes.object,
    }),
  };

  state = {
    isMapAlreadyRender: false,
  };

  getChildContext() {
    const { google } = this.props;

    return {
      [GOOGLE_MAPS_CONTEXT]: {
        instance: this.instance,
        google,
      },
    };
  }

  componentDidMount() {
    const { google, mapOptions } = this.props;

    this.instance = new google.maps.Map(this.element, {
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      clickableIcons: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
      ...mapOptions,
    });

    this.setState(() => ({
      isMapAlreadyRender: true,
    }));
  }

  componentDidUpdate() {
    const {
      google,
      initialZoom,
      initialPosition,
      boundingBox,
      position,
    } = this.props;

    if (boundingBox) {
      this.instance.fitBounds(
        new google.maps.LatLngBounds(
          boundingBox.southWest,
          boundingBox.northEast
        )
      );
    }

    if (!boundingBox) {
      const initialMapPosition = position || initialPosition;

      this.instance.setZoom(initialZoom);
      this.instance.setCenter(initialMapPosition);
    }
  }

  render() {
    const { cx, children } = this.props;
    const { isMapAlreadyRender } = this.state;

    return (
      <div ref={c => (this.element = c)} className={cx('')}>
        <div className={cx('map')} />
        {isMapAlreadyRender && children}
      </div>
    );
  }
}

export default GoogleMaps;
