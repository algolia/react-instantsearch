import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';

export const GOOGLE_MAPS_CONTEXT = '__ais_geo_search__google_maps__';

class GoogleMaps extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    google: PropTypes.object.isRequired,
    initialZoom: PropTypes.number.isRequired,
    initialPosition: LatLngPropType.isRequired,
    mapOptions: PropTypes.object.isRequired,
    refine: PropTypes.func.isRequired,
    position: LatLngPropType,
    boundingBox: BoundingBoxPropType,
    children: PropTypes.node,
  };

  static childContextTypes = {
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      google: PropTypes.object,
      instance: PropTypes.object,
    }),
  };

  isUserInteraction = true;
  isPendingRefine = false;
  listeners = [];

  state = {
    isMapReady: false,
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

    google.maps.event.addListenerOnce(
      this.instance,
      'idle',
      this.setupListenersWhenMapIsReady
    );
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
      this.lockUserInteration(() => {
        this.instance.fitBounds(
          new google.maps.LatLngBounds(
            boundingBox.southWest,
            boundingBox.northEast
          ),
          0
        );
      });
    }

    if (!boundingBox) {
      const initialMapPosition = position || initialPosition;

      this.lockUserInteration(() => {
        this.instance.setZoom(initialZoom);
        this.instance.setCenter(initialMapPosition);
      });
    }
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => {
      listener.remove();
    });

    this.listeners = [];
  }

  setupListenersWhenMapIsReady = () => {
    const { refine } = this.props;

    this.setState(() => ({
      isMapReady: true,
    }));

    const onChange = () => {
      if (this.isUserInteraction) {
        this.isPendingRefine = true;
      }
    };

    this.listeners.push(this.instance.addListener('center_changed', onChange));
    this.listeners.push(this.instance.addListener('zoom_changed', onChange));
    this.listeners.push(this.instance.addListener('dragstart', onChange));

    this.listeners.push(
      this.instance.addListener('idle', () => {
        if (this.isUserInteraction && this.isPendingRefine) {
          this.isPendingRefine = false;

          const bounds = this.instance.getBounds();

          refine({
            northEast: bounds.getNorthEast().toJSON(),
            southWest: bounds.getSouthWest().toJSON(),
          });
        }
      })
    );
  };

  lockUserInteration(functionThatAlterTheMapPosition) {
    this.isUserInteraction = false;
    functionThatAlterTheMapPosition();
    this.isUserInteraction = true;
  }

  render() {
    const { cx, children } = this.props;
    const { isMapReady } = this.state;

    return (
      <div className={cx('')}>
        <div ref={c => (this.element = c)} className={cx('map')} />
        {isMapReady && children}
      </div>
    );
  }
}

export default GoogleMaps;
