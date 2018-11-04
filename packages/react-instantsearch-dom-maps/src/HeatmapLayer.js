import { Component } from 'react';
import PropTypes from 'prop-types';
import { createFilterProps } from './utils';
import { GeolocHitsPropType } from './propTypes';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

const excludes = ['children'];
const filterProps = createFilterProps(excludes);

function hitsToLatLngData(hits = [], google) {
  return hits.map(hit => {
    const { lat, lng } = hit._geoloc;
    return new google.maps.LatLng(lat, lng);
  });
}

class HeatmapLayer extends Component {
  static propTypes = {
    hits: GeolocHitsPropType.isRequired,
  };

  static contextTypes = {
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      google: PropTypes.object,
      instance: PropTypes.object,
    }),
  };

  componentDidMount() {
    const { hits, ...props } = this.props;
    const { google, instance } = this.context[GOOGLE_MAPS_CONTEXT];

    this.instance = new google.maps.visualization.HeatmapLayer({
      ...filterProps(props),
      map: instance,
      data: hitsToLatLngData(hits, google),
    });
  }

  componentWillUnmount() {
    this.instance.setMap(null);
  }

  render() {
    return null;
  }
}

export default HeatmapLayer;
