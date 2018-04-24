import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    position: LatLngPropType,
    boundingBox: PropTypes.shape({
      northEast: LatLngPropType.isRequired,
      southWest: LatLngPropType.isRequired,
    }),
    mapOptions: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    mapOptions: {},
  };

  state = {
    isMapAlreadyRender: false,
  };

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
