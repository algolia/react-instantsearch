import { Component } from 'react';
import PropTypes from 'prop-types';
import { createFilterProps } from './utils';
import { GeolocHitsPropType } from './propTypes';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

const excludes = ['children', 'hits'];
const filterProps = createFilterProps(excludes);

function hitsToLatLngData(hits = [], google) {
  return hits.map(hit => {
    const { lat, lng } = hit._geoloc;
    return new google.maps.LatLng(lat, lng);
  });
}

function arrayEqual(hits = [], otherHits = [], callback = () => {}) {
  if (hits.length !== otherHits.length) {
    return false;
  }

  for (let index = 0; index < hits.length; index++) {
    const hit = hits[index];
    const otherHit = otherHits[index];
    if (!callback(hit, otherHit)) {
      return false;
    }
  }

  return true;
}

function hitsAreEqual(hits = [], otherHits = []) {
  return arrayEqual(
    hits,
    otherHits,
    (hit, otherHit) => hit.objectID === otherHit.objectID
  );
}

const equal = (value, otherValue) => value === otherValue;

const heatMapOptions = [
  {
    key: 'dissipating',
    equal,
  },
  {
    key: 'maxIntensity',
    equal,
  },
  {
    key: 'opacity',
    equal,
  },
  {
    key: 'radius',
    equal,
  },
  {
    key: 'gradient',
    equal: (array1, array2) => arrayEqual(array1, array2, equal),
  },
];

class HeatmapLayer extends Component {
  static propTypes = {
    hits: GeolocHitsPropType.isRequired,
    dissipating: PropTypes.bool,
    gradient: PropTypes.arrayOf(PropTypes.string),
    maxIntensity: PropTypes.number,
    opacity: PropTypes.number,
    radius: PropTypes.number,
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

  componentDidUpdate() {
    const { hits, ...props } = this.props;

    const { google } = this.context[GOOGLE_MAPS_CONTEXT];

    this.instance.setData(hitsToLatLngData(hits, google));
    this.instance.setOptions(filterProps(props));
  }

  shouldComponentUpdate(nexProps) {
    const { hits } = this.props;
    if (!hitsAreEqual(hits, nexProps.hits)) {
      return true;
    }

    const options = filterProps(nexProps);

    const hasChange = heatMapOptions.reduce(
      (acc, value) =>
        !value.equal(options[value.key], this.props[value.key]) || acc,
      false
    );

    return hasChange;
  }

  componentWillUnmount() {
    this.instance.setMap(null);
  }

  render() {
    return null;
  }
}

export default HeatmapLayer;
