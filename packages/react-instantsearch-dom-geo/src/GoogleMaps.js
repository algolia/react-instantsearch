import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';
import { STATE_CONTEXT } from './Provider';

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

  static contextTypes = {
    [STATE_CONTEXT]: PropTypes.shape({
      isRefineOnMapMove: PropTypes.bool.isRequired,
      setMapMoveSinceLastRefine: PropTypes.func.isRequired,
    }).isRequired,
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

  getStateContext() {
    return this.context[STATE_CONTEXT];
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

    this.listeners.push(
      google.maps.event.addListenerOnce(
        this.instance,
        'idle',
        this.setupListenersWhenMapIsReady
      )
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

    const { isMapReady } = this.state;

    if (!isMapReady || this.isPendingRefine) {
      return;
    }

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

      return;
    }

    if (!boundingBox) {
      const initialMapPosition = position || initialPosition;

      this.lockUserInteration(() => {
        this.instance.setZoom(initialZoom);
        this.instance.setCenter(initialMapPosition);
      });

      return;
    }
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => {
      listener.remove();
    });

    this.listeners = [];
  }

  setupListenersWhenMapIsReady = () => {
    this.listeners = [];

    this.setState(() => ({
      isMapReady: true,
    }));

    const onChange = () => {
      const {
        isRefineOnMapMove,
        setMapMoveSinceLastRefine,
      } = this.getStateContext();

      if (this.isUserInteraction) {
        setMapMoveSinceLastRefine(true);

        if (isRefineOnMapMove) {
          this.isPendingRefine = true;
        }
      }
    };

    this.listeners.push(this.instance.addListener('center_changed', onChange));
    this.listeners.push(this.instance.addListener('zoom_changed', onChange));
    this.listeners.push(this.instance.addListener('dragstart', onChange));

    this.listeners.push(
      this.instance.addListener('idle', () => {
        if (this.isUserInteraction && this.isPendingRefine) {
          this.isPendingRefine = false;

          this.refineWithBoundingBox();
        }
      })
    );
  };

  lockUserInteration(functionThatAltersTheMapPosition) {
    this.isUserInteraction = false;
    functionThatAltersTheMapPosition();
    this.isUserInteraction = true;
  }

  refineWithBoundingBox() {
    const { refine } = this.props;

    const bounds = this.instance.getBounds();

    refine({
      northEast: bounds.getNorthEast().toJSON(),
      southWest: bounds.getSouthWest().toJSON(),
    });
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
