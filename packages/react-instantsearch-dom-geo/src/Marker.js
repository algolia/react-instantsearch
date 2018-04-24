import { Component } from 'react';
import PropTypes from 'prop-types';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

const LatLngPropType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

class Marker extends Component {
  static propTypes = {
    hit: PropTypes.shape({
      _geoloc: LatLngPropType.isRequired,
    }).isRequired,
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
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.setMap(null);
    }
  }

  render() {
    return null;
  }
}

export default Marker;
