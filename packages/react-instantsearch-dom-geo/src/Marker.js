import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerEvents, createListenersPropType } from './utils';
import { GeolocHitPropType } from './propTypes';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

const eventTypes = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
};

class Marker extends Component {
  static propTypes = {
    ...createListenersPropType(eventTypes),
    hit: GeolocHitPropType.isRequired,
    options: PropTypes.object,
  };

  static contextTypes = {
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      google: PropTypes.object,
      instance: PropTypes.object,
    }),
  };

  static defaultProps = {
    options: {},
  };

  componentDidMount() {
    const { hit, options } = this.props;
    const { google, instance } = this.context[GOOGLE_MAPS_CONTEXT];

    this.instance = new google.maps.Marker({
      map: instance,
      position: hit._geoloc,
      ...options,
    });

    this.removeEventsListeners = registerEvents(
      eventTypes,
      this.props,
      this.instance
    );
  }

  componentDidUpdate() {
    this.removeEventsListeners();

    this.removeEventsListeners = registerEvents(
      eventTypes,
      this.props,
      this.instance
    );
  }

  componentWillUnmount() {
    this.instance.setMap(null);
  }

  render() {
    return null;
  }
}

export default Marker;
