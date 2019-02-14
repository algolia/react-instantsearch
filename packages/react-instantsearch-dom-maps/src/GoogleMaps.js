import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createClassNames } from 'react-instantsearch-dom';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';
import GoogleMapsContext from './GoogleMapsContext';

const cx = createClassNames('GeoSearch');

export const GoogleMaps = React.forwardRef(({ isMapReady, children }, ref) => (
  <div className={cx('')}>
    <div ref={ref} className={cx('map')} />
    {isMapReady && children}
  </div>
));

GoogleMaps.propTypes = {
  isMapReady: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export class GoogleMapsWrapper extends Component {
  static displayName = 'GoogleMaps';

  static propTypes = {
    google: PropTypes.object.isRequired,
    initialZoom: PropTypes.number.isRequired,
    initialPosition: LatLngPropType.isRequired,
    mapOptions: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onIdle: PropTypes.func.isRequired,
    shouldUpdate: PropTypes.func.isRequired,
    boundingBox: BoundingBoxPropType,
    boundingBoxPadding: PropTypes.number,
    children: PropTypes.node,
  };

  isUserInteraction = true;
  isPendingRefine = false;
  listeners = [];
  mapRef = React.createRef();

  state = {
    isMapReady: false,
  };

  componentDidMount() {
    const { google, mapOptions } = this.props;

    this.instance = new google.maps.Map(this.mapRef.current, {
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
      boundingBoxPadding,
      shouldUpdate,
    } = this.props;

    if (!shouldUpdate()) {
      return;
    }

    if (boundingBox) {
      this.lockUserInteration(() => {
        this.instance.fitBounds(
          new google.maps.LatLngBounds(
            boundingBox.southWest,
            boundingBox.northEast
          ),
          boundingBoxPadding
        );
      });
    } else {
      this.lockUserInteration(() => {
        this.instance.setZoom(initialZoom);
        this.instance.setCenter(initialPosition);
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
    this.listeners = [];

    this.setState(() => ({
      isMapReady: true,
    }));

    const onChange = () => {
      if (this.isUserInteraction) {
        this.props.onChange();
      }
    };

    this.listeners.push(this.instance.addListener('center_changed', onChange));
    this.listeners.push(this.instance.addListener('zoom_changed', onChange));
    this.listeners.push(this.instance.addListener('dragstart', onChange));

    this.listeners.push(
      this.instance.addListener('idle', () => {
        if (this.isUserInteraction) {
          this.props.onIdle({
            instance: this.instance,
          });
        }
      })
    );
  };

  lockUserInteration(functionThatAltersTheMapPosition) {
    this.isUserInteraction = false;
    functionThatAltersTheMapPosition();
    this.isUserInteraction = true;
  }

  render() {
    const { google, children } = this.props;
    const { isMapReady } = this.state;

    return (
      <GoogleMapsContext.Provider value={{ google, instance: this.instance }}>
        <GoogleMaps isMapReady={isMapReady} ref={this.mapRef}>
          {children}
        </GoogleMaps>
      </GoogleMapsContext.Provider>
    );
  }
}

export default GoogleMapsWrapper;
